module turntable {
    export class NewTurntablePanel extends eui.Component {

        public turn_grp: eui.Group;
        public left_img: eui.Image;
        public right_img: eui.Image;
        public top_img: eui.Image;
        public luckDraw_btn: eui.WxButton;
        public close_btn: eui.WxButton;

        private _info: Cmd.GetInfoTurnTableCmd_S;
        private _time: number;

        private _timer: egret.Timer;

        constructor(info?: Cmd.GetInfoTurnTableCmd_S) {
            super();
            this._info = info;
            this.skinName = "NewTurntablePanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvents();
            let tableData: table.TableluckyTurntable[] = RES.getRes("TableluckyTurntable_json");
            if (tableData) {
                for (let i = 0; i < tableData.length; i++) {
                    if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                        let reward = tableData[i].onlineReward;
                        let point = new egret.Point(this.turn_grp.width >> 1, this.turn_grp.height >> 1);
                        for (let j = 0; j < reward.length; j++) {

                            let ro = j * 360 / 8;
                            let radian = Math.PI / 180 * (-ro + 90);

                            let item = new NewTurntableItem();
                            item.init(reward[j].count, reward[j].goodsId);
                            item.rotation = ro;
                            item.x = point.x + Math.cos(radian) * 130;
                            item.y = point.y - Math.sin(radian) * 130;
                            this.turn_grp.addChild(item);

                        }
                        break;
                    }
                }
            }

            this._timer = new egret.Timer(400, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();

            if (this._info == null) {
                this.getReward(3);
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
            if (info.turnId) {
                this.luckDraw_btn.enabled = false;
                let rt = 360 - (info.turnId - 1) * 45;
                egret.Tween.get(this.turn_grp).to({ rotation: 360 * 3 + rt }, 3000, egret.Ease.quartInOut).call(() => {
                    this.turn_grp.rotation = this.turn_grp.rotation % 360;

                    let tableData: table.TableluckyTurntable[] = RES.getRes("TableluckyTurntable_json");
                    if (tableData) {
                        for (let i = 0; i < tableData.length; i++) {
                            if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                                let rewards = tableData[i].onlineReward;
                                let vo: Cmd.RewardItem = new Cmd.RewardItem();
                                vo.goodId = rewards[info.turnId - 1].goodsId;
                                vo.goodNbr = rewards[info.turnId - 1].count;
                                let panel: commonConfirm.RewardPanel = new commonConfirm.RewardPanel();
                                panel.initData2([vo]);
                                if(uniLib.Global.isInGame){
                                    panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                                    uniLib.PopUpMgr.addPopUp(panel, null, true, true,0, uniLib.PopUpEffect.NOMAL,1280*panel.scaleX,720);
                                }else{
                                    uniLib.PopUpMgr.addPopUp(panel, null, true, true,0);
                                }

                                egret.setTimeout(()=>{
                                    if(this._info)
                                        uniLib.PopUpMgr.removePopUp(this)
                                },this,1200)
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
        }

        private onTouchHandle(e: egret.TouchEvent): void {
            let target: any = e.target;
            if (target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.luckDraw_btn) {
                this.getReward(4);
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
            this.removeEvents();
        }
    }
}