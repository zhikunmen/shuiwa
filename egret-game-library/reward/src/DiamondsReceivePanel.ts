module reward {
    export class DiamondsReceivePanel extends eui.Component {

        public _shareBtn: eui.WxButton;
        public scroll: eui.Scroller;
        public diamond_lst: eui.List;
        public _closeBtn: eui.WxButton;
        public empty_group: eui.Group;
        public _shareBtn2: eui.WxButton;

        private index: number = 1;
        private info: Cmd.InviteInfoLitteGame[];

        public constructor() {
            super();
            this.skinName = "DiamondsReceiveSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.scroll.addEventListener(egret.Event.CHANGE, this.scrollChange, this);
            this.diamond_lst.itemRenderer = reward.ReceiveDiamondsItem;
            uniLib.Global.addEventListener(CmdConstant.IOSINVITEINFOLITTLE, this.onIosInviteInfoLittle, this);
            uniLib.Global.addEventListener(CmdConstant.IOSINVITEREWARDLITTLE, this.onIosInviteRewardLittle, this);

            this.loadRankData();
        }

        private scrollChange(evt: egret.Event) {
            if (this.index < 4 && this.scroll.viewport.scrollV + this.scroll.height > this.scroll.viewport.contentHeight + 100) {
                this.scroll.viewport.scrollV = this.scroll.viewport.contentHeight - this.scroll.height;
                this.index++;
                this.loadRankData();
            }
        }

        private loadRankData(): void {
            var req: Cmd.GetIosInviteInfoLittleGameLobbyCmd_C = new Cmd.GetIosInviteInfoLittleGameLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.index = this.index;
            NetMgr.tcpSend(req);
        }

        private onIosInviteInfoLittle(evt: uniLib.ZqEvent): void {
            this.empty_group.visible = false;
            let rev: Cmd.GetIosInviteInfoLittleGameLobbyCmd_S = evt.param;
            if (rev.info == null || !(rev.info && rev.info instanceof Array)) {
                if (this.info == null)
                    this.empty_group.visible = true;
                return;
            }
            if (rev.index == 1)
                this.info = rev.info;
            else
                this.info = this.info.concat(rev.info);
            this.diamond_lst.dataProvider = new eui.ArrayCollection(this.info);

        }

        private onIosInviteRewardLittle(evt: uniLib.ZqEvent): void {
            let rev: Cmd.GetIosInviteRewardLittleGameLobbyCmd_S = evt.param;
            for (var i: number = 0; i < this.info.length; i++) {
                if (this.info[i].uid == rev.single.uid) {
                    this.info[i] = rev.single;
                }
            }
            this.diamond_lst.dataProvider = new eui.ArrayCollection(this.info);
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this._shareBtn:
                case this._shareBtn2:
                    if (uniLib.Global.isWxGame()) {
                        let vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.ios;
                        uniLib.ZQGameSdk.share(vo);
                        wxgame.Global.instance.aldSendEvent("周边系统", "领钻石跳转分享")
                    }
                    else {
                        share.shareNativeMessage(Cmd.ShareType.ios, 0, Cmd.ShareType.ios.toString());
                    }
                    break;
            }
        }

        public destroy(): void {
            uniLib.Global.removeEventListener(CmdConstant.IOSINVITEINFOLITTLE, this.onIosInviteInfoLittle, this);
            uniLib.Global.removeEventListener(CmdConstant.IOSINVITEREWARDLITTLE, this.onIosInviteRewardLittle, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        }
    }
}