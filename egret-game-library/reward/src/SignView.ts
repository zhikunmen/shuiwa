module reward {
    export class SignView extends eui.Component {

        private POSX: number[] = [0, 193, 386, 579, 0, 193, 386];
        private POSY: number[] = [40, 40, 40, 40, 200, 200, 200];
        private items: SignItem[] = [];
        private noviceInfo: Cmd.NoviceItem[];

        public viewVideo_btn: eui.WxButton;
        public receive_lbl: eui.Label;

        public constructor() {
            super();
            this.skinName = "SignViewSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initData();
            if (uniLib.Global.isNative) {
                this.receive_lbl.visible = false;
            }
            else {
                this.receive_lbl.textFlow = (new egret.HtmlTextParser).parse('<font fontfamily="Microsoft YaHei"><u>直接领取</u></font>');
                this.receive_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.viewVideo_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private initData(): void {
            uniLib.Global.addEventListener(CmdConstant.NOVICEREWARD, this.onNoviceReward, this);
            var req: Cmd.GetNoviceInfodLobbyCmd_C = new Cmd.GetNoviceInfodLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);
        }

        public onNoviceInfo(param: Cmd.NoviceItem[]): void {
            this.noviceInfo = param;
            let canReceive: boolean = false;
            for (var i: number = 0; i < this.noviceInfo.length; i++) {
                var item: SignItem = new SignItem();
                item.data = this.noviceInfo[i];
                item.x = this.POSX[i]
                item.y = this.POSY[i];
                this.addChild(item);
                this.items.push(item);
                if (this.noviceInfo[i].status == 3)
                    canReceive = true;
            }
            !uniLib.Global.isNative && (this.receive_lbl.visible = canReceive);
        }

        private onNoviceReward(evt: uniLib.ZqEvent): void {
            var data: Cmd.GetNoviceRewarddLobbyCmd_S = evt.param;
            this.items[data.day - 1].setReceived(data.day);
            this.receive_lbl.visible = false;
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this.receive_lbl) {
                var req: Cmd.GetNoviceRewarddLobbyCmd_C = new Cmd.GetNoviceRewarddLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                req.typ = 1;
                NetMgr.tcpSend(req);
                wxgame.Global.instance.aldSendEvent("周边系统", "登录奖励直接领取");
            }
            else if (evt.target == this.viewVideo_btn) {
                if (uniLib.Global.isWxGame()) {
                    if (wxgame.Global.instance.videoAdCanUse) {
                        wxgame.Global.instance.createRewardedVideoAd("", this.getRewardDouble, this);
                    }
                    else {
                        let vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.common;
                        wxgame.ShareMessage.instance.shareAppMessage(vo, this.getRewardDouble, null, this);
                    }
                }
                else {
                   this.getRewardDouble();
                }
            }
        }

        public getRewardDouble() {
            var req: Cmd.GetNoviceRewarddLobbyCmd_C = new Cmd.GetNoviceRewarddLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.typ = 2;
            NetMgr.tcpSend(req);
        }

        public destroy(): void {
            this.items = null;
            this.receive_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.NOVICEREWARD, this.onNoviceReward, this);
            this.viewVideo_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        }
    }
}