module shop {
    /**首充 */
    export class FirstRechargeBuYu extends eui.Component {

        public purchase_btn: eui.WxButton;
        public pay_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        private reward_itme1:eui.Image;
        private reward_itme2:eui.Image;
        private reward_itme3:eui.Image;
        private reward_itme4:eui.Image;

        private _shopId: number;

        constructor() {
            super();
            this.skinName = "FirstRechargeBuYuSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.initUI();
            uniLib.Global.addEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            NetMgr.tcpSend(new Cmd.GetFirstchargeInfoHpMatchCmd_C());
            this.purchase_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            // if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
            //     this.pay_btn.visible = true;
            //     this.purchase_btn.visible = false;
            // }
        }

        private initUI():void{
            this.reward_itme1.source = "game_prop_json.bag_daoju_32";
            this.reward_itme2.source = "game_prop_json.bag_daoju_352";
            this.reward_itme3.source = "game_prop_json.bag_daoju_351";
            this.reward_itme4.source = "game_prop_json.bag_daoju_354";
            commonConfirm.ResUtil.limitImageSize(this.reward_itme1,140);
            commonConfirm.ResUtil.limitImageSize(this.reward_itme2,140);
            commonConfirm.ResUtil.limitImageSize(this.reward_itme3,140);
        }

        private onInfo(evt: uniLib.ZqEvent) {
            let info: Cmd.GetFirstchargeInfoHpMatchCmd_S = evt.param;
            this._shopId = info.goodid;
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.purchase_btn) {
                ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._shopId));
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.pay_btn) {
                RES.loadGroup(shop.ShopConsts.SHOP_DAIFU).then(() => {
                    let lobbyConfig = ConfigMgr.getInstance().getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
                    uniLib.PopUpMgr.addPopUp(ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, lobbyConfig.firstCharge[0]);
                }).catch((reason) => {
                    uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                })
            }
        }

        public destroy() {
            this._shopId = null;
            uniLib.Global.removeEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            this.purchase_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}