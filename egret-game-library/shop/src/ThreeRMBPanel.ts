module shop {
    /**3元充值 */
    export class ThreeRMBPanel extends eui.Component {

        public purchase_btn: eui.WxButton;
        public pay_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public reward_lst: eui.List;
        public coinNum_blbl: eui.BitmapLabel;

        private _shopId: number;

        constructor() {
            super();
            this.skinName = "ThreeRMBSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
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

        private onInfo(evt: uniLib.ZqEvent) {
            let info: Cmd.GetFirstchargeInfoHpMatchCmd_S = evt.param;
            this._shopId = info.goodid;
            this.reward_lst.itemRenderer = ThreeRMBItem;
            for (let i = 0; i < info.rewads.length; i++) {
                if (info.rewads[i].goodId == 32) {
                    this.coinNum_blbl.text = info.rewads[i].goodNbr > 10000 ? info.rewads[i].goodNbr / 10000 + "万" : info.rewads[i].goodNbr + "";
                    info.rewads.splice(i, 1);
                }
                else {
                    info.rewads[i]["type"] = 1;
                }
            }
            this.reward_lst.dataProvider = new eui.ArrayCollection(info.rewads);
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
                    uniLib.PopUpMgr.addPopUp(ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, this._shopId);
                }).catch((reason) => {
                    uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                });
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

    export class ThreeRMBItem extends eui.ItemRenderer {

        public icon_img: eui.Image;
        public give_img: eui.Image;
        public mask_img: eui.Image;
        public name_lbl: eui.Label;
        public num_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "ThreeRMBItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RewardItem = this.data;
            let goodCfg = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.name_lbl.text = goodCfg.goodName + "x" + info.goodNbr;
            this.num_lbl.text = info.goodNbr > 10000 ? info.goodNbr / 10000 + "万" : info.goodNbr + "";
            this.icon_img.source = "lb_giftDaily_json." + goodCfg.goodIcon;
            if (info["type"] == 1) {
                this.name_lbl.visible = true;
                this.num_lbl.visible = false;
                this.mask_img.visible = false;
            }
            else {
                this.name_lbl.visible = false;
                this.num_lbl.visible = true;
                this.mask_img.visible = true;
            }
            if (info.goodType == 0) {
                this.give_img.visible = false;
            }
            else if (info.goodType == 1) {
                this.give_img.visible = true;
            }
            else if (info.goodType == 2) {
                this.give_img.visible = true;
            }
            else {
                this.give_img.visible = false;
            }
        }
    }
}