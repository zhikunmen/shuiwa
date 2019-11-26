module turntable {
    export class TurntablePanel extends eui.Component {

        public turn_grp: eui.Group;
        public left_img: eui.Image;
        public right_img: eui.Image;
        public top_img: eui.Image;
        public luckDraw_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public left_lbl: eui.Label;

        public turn1_grp: eui.Group;
        public lock_img: eui.Image;
        public left1_img: eui.Image;
        public right1_img: eui.Image;
        public top1_img: eui.Image;
        public login_blbl: eui.BitmapLabel;

        private _info: Cmd.GetInfoTurnTableCmd_S;
        private _time: number;

        private _timer: egret.Timer;

        constructor(info?: Cmd.GetInfoTurnTableCmd_S) {
            super();
            this._info = info;
            this.skinName = "TurntablePanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvents();
            let tableData: table.TableluckyTurntable[] = RES.getRes("TableluckyTurntable_json");
            if (tableData) {
                for (let i = 0; i < tableData.length; i++) {
                    if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                        let reward = tableData[i].signReward;
                        let tReward = tableData[i].timeReward;
                        let point = new egret.Point(this.turn_grp.width >> 1, this.turn_grp.height >> 1);
                        let point2 = new egret.Point(this.turn1_grp.width >> 1, this.turn1_grp.height >> 1);
                        for (let j = 0; j < reward.length; j++) {

                            let ro = j * 360 / 8;
                            let radian = Math.PI / 180 * (-ro + 90);

                            let item = new TurntableItem();
                            item.init(reward[j].count, j + 1);
                            item.rotation = ro;
                            item.x = point.x + Math.cos(radian) * 130;
                            item.y = point.y - Math.sin(radian) * 130;
                            this.turn_grp.addChild(item);

                            let item2 = new TurntableItem();
                            item2.init2(tReward[j].time);
                            item2.rotation = ro;
                            item2.x = point2.x + Math.cos(radian) * 140;
                            item2.y = point2.y - Math.sin(radian) * 140;
                            this.turn1_grp.addChild(item2);
                        }
                        break;
                    }
                }
            }

            this._timer = new egret.Timer(400, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();

            if (this._info) {
                this.left_lbl.textFlow = <Array<egret.ITextElement>>[{ text: `剩余次数:${this._info.remainder}`, style: { underline: true } }];
                if (this._info.continueDay == 0) {
                    this.lock_img.visible = false;
                    this.login_blbl.visible = false;
                }
                else {
                    this.login_blbl.text = `第${this._info.continueDay}日登录`;
                    let sp = new egret.Sprite();
                    sp.graphics.beginFill(0x2a0021, 0.6);
                    sp.graphics.drawCircle(this.turn1_grp.width / 2, this.turn1_grp.height / 2, this.turn1_grp.width / 2);
                    sp.graphics.endFill();
                    this.turn1_grp.addChild(sp);
                }
            }
            else {
                this.getReward(1);
            }
        }

        private addEvents(): void {
            uniLib.Global.addEventListener("turntableinfo", this.onUpdateInfo, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckDraw_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private removeEvents(): void {
            uniLib.Global.removeEventListener("turntableinfo", this.onUpdateInfo, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckDraw_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private onUpdateInfo(evt: uniLib.ZqEvent) {
            let info: Cmd.GetInfoTurnTableCmd_S = evt.param;
            this.left_lbl.textFlow = <Array<egret.ITextElement>>[{ text: `剩余次数:${info.remainder}`, style: { underline: true } }];
            if (info.turnId) {
                this.luckDraw_btn.enabled = false;
                let rt = 360 - (info.turnId - 1) * 45;
                if (info.turnId2) {
                    let rt2 = 360 - (info.turnId2 - 1) * 45;
                    egret.Tween.get(this.turn1_grp).to({ rotation: 360 * 3 + rt2 }, 3000, egret.Ease.quadInOut);
                }
                egret.Tween.get(this.turn_grp).to({ rotation: 360 * 3 + rt }, 3000, egret.Ease.quartInOut).call(() => {
                    this.turn_grp.rotation = this.turn_grp.rotation % 360;
                    this.luckDraw_btn.enabled = true;

                    let tableData: table.TableluckyTurntable[] = RES.getRes("TableluckyTurntable_json");
                    if (tableData) {
                        for (let i = 0; i < tableData.length; i++) {
                            if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                                let rewards = tableData[i].signReward;
                                let vo: commonConfirm.ReWardDataVo = new commonConfirm.ReWardDataVo();
                                vo.getDataByGoodId(rewards[info.turnId - 1].goodsId, rewards[info.turnId - 1].count * (info.turnId2 ? tableData[i].timeReward[info.turnId2 - 1].time : 1));
                                let panel: commonConfirm.RewardPanel = new commonConfirm.RewardPanel();
                                panel.initData([vo]);
                                egret.MainContext.instance.stage.addChild(panel);
                                break;
                            }
                        }
                    }
                }, this);
            }
            this._info = info;
        }

        private onTimer(evt: egret.TimerEvent) {
            let count = this._timer.currentCount;
            this.top_img.source = `turntable_res_json.lb_zp_uplight${count % 2 ? "_1_" : "_"}png`;
            this.left_img.source = `turntable_res_json.lb_zp_sidelight${count % 2 ? "_" : "_1_"}png`;
            this.right_img.source = `turntable_res_json.lb_zp_sidelight${count % 2 ? "_" : "_1_"}png`;
            if (this._info && this._info.continueDay == 0) {
                this.top1_img.source = `turntable_res_json.lb_zp_uplight${count % 2 ? "_1_" : "_"}png`;
                this.left1_img.source = `turntable_res_json.lb_zp_sidelight${count % 2 ? "_" : "_1_"}png`;
                this.right1_img.source = `turntable_res_json.lb_zp_sidelight${count % 2 ? "_" : "_1_"}png`;
            }
        }

        private onTouchHandle(e: egret.TouchEvent): void {
            let target: any = e.target;
            if (target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.luckDraw_btn) {
                if (this._info.type == 1) {
                    this.getReward(2);
                }
                else if (this._info.type == 2) {
                    if (wxgame.Global.instance.videoAdCanUse)
                        wxgame.Global.instance.createRewardedVideoAd(null, () => { this.getReward(2) }, this);
                    else
                        this._info.type = 3;

                }
                if (this._info.type == 3) {
                    let vo = new uniLib.WXShareVo();
                    vo.shareType = Cmd.ShareType.luckyturn;
                    wxgame.ShareMessage.instance.shareAppMessage(vo, () => { this.getReward(2) }, null, this);
                }
            }
        }

        private getReward(opType: number) {
            let req = new Cmd.GetInfoTurnTableCmd_C();
            req.opType = opType;
            NetMgr.tcpSend(req);
        }

        public destroy(): void {
            this._info = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            }
            this._timer = null;
            this.turn_grp.removeChildren();
            egret.Tween.removeTweens(this.turn_grp);
            egret.Tween.removeTweens(this.turn1_grp);
            this.removeEvents();
        }
    }
}