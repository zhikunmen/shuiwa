module shop {
    /**
     * 领取月卡
     */
    export class MonthlyCardRecv extends eui.Component {

        public rev_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public reward_lst: eui.List;
        public remain_lbl: eui.Label;
        public renew_lbl: eui.Label;

        private _info: Cmd.GetMonthCardInfoLobbyCmd_S;
        private _type: number = 0

        constructor(info: Cmd.GetMonthCardInfoLobbyCmd_S) {
            super();
            this._info = info;
            this.skinName = "MonthlyCardRecvSkin";
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        childrenCreated() {
            super.childrenCreated();
            this.remain_lbl.text = this._info.remainDay.toString();
            this.renew_lbl.textFlow = <Array<egret.IWTextElement>>[{ text: this._type == 0 ? "月卡续费" : "周卡续费", style: { underline: true, textColor: 0xFF6600 } }];
            if (this._info.state == 2) {
                this.rev_btn.currentState = "disabled";
                this.rev_btn.touchEnabled = false;
            }
            this.reward_lst.itemRenderer = RechargeItem;
            this.reward_lst.dataProvider = new eui.ArrayCollection(this._info.dailyRewards);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.renew_lbl) {
                if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                    LobbyModuleMgr.getInstance().showCustomer();
                    uniLib.PopUpMgr.removePopUp(this);
                }
                else {
                    let instance = ConfigMgr.getInstance();
                    let lobbyConfig = instance.getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
                    let shopConfig = instance.getShopCfgById(lobbyConfig.monthCard[0]);
                    shop.ShopControl.checkSession(shopConfig);
                }
            }
            else if (evt.target == this.rev_btn) {
                let req = new Cmd.GetMonthCardRewardLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
        }

        destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._info = null;
        }
    }
}