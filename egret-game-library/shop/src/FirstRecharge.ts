module shop {
    /**首充 */
    export class FirstRecharge extends eui.Component {

        public purchase_btn: eui.WxButton;
        public pay_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public time_btn: eui.WxButton;
        public reward_lst: eui.List;
        public titlePrice_blbl: eui.BitmapLabel;
        public price_blbl: eui.BitmapLabel;
        public desc_lbl: eui.Label;

        private _timer: egret.Timer;
        private _shopId: number;

        constructor() {
            super();
            this.skinName = "FirstRechargeSkin";
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
            this.price_blbl.text = info.price / 100 + "元";
            this.titlePrice_blbl.text = info.price / 100 + "";
            this.reward_lst.itemRenderer = RechargeItem;
            info.rewads.length >= 5 && info.rewads.forEach((value, index) => { value["scale"] = 0.8 });
            this.reward_lst.dataProvider = new eui.ArrayCollection(info.rewads);
            if (info.countDownSec) {
                this.purchase_btn.visible = false;
                this.pay_btn.visible = false;
                this.time_btn.visible = true;
                this.time_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.setLabel(info.countDownSec);
                this._timer = new egret.Timer(1000, info.countDownSec);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer.start();
            }
            this.desc_lbl.text = "";
            if (info.qhStone) {
                let cfg = ConfigMgr.getInstance().getGoodCfgById(info.qhStone.goodId);
                this.desc_lbl.text = "若炮倍≥100倍后购买，则获得" + info.qhStone.goodNbr + cfg.goodName;
            }
        }


        private onTimer() {
            if (this._timer.repeatCount == this._timer.currentCount) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else {
                this.setLabel(this._timer.repeatCount - this._timer.currentCount);
            }
        }

        private setLabel(count: number) {
            let h = Math.floor(count / 3600) + "";
            let m = Math.floor((count % 3600) / 60) + "";
            let s = count % 60 + "";
            this.time_btn.label = `（${h.length < 2 ? "0" + h : h}：${m.length < 2 ? "0" + m : m}}：${s.length < 2 ? "0" + s : s}}）`;
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
            else if (evt.target == this.time_btn) {
                // if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                //     RES.loadGroup(shop.ShopConsts.SHOP_DAIFU).then(() => {
                //         uniLib.PopUpMgr.addPopUp(ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, this._shopId);
                //     }).catch((reason) => {
                //         uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                //     });
                // }
                // else {
                    ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._shopId));
                    uniLib.PopUpMgr.removePopUp(this);
                // }
            }
        }

        public destroy() {
            this._shopId = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer = null;
            }
            this.time_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            this.purchase_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }

    export class RechargeItem extends eui.ItemRenderer {

        public icon_img: eui.Image;
        public desc_img: eui.Image;
        public desc_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "RechargeItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RewardItem = this.data;
            let goodCfg = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.desc_lbl.text = `${goodCfg.goodName}x${info.goodNbr}`;
            this.icon_img.source = "reward_vip_json." + goodCfg.goodIcon;
            if (info.goodType == 0) {
                this.desc_img.visible = false;
            }
            else if (info.goodType == 1) {
                this.desc_img.source = "reward_vip_json.lb_huiyuan_send";
            }
            else if (info.goodType == 2) {
                this.desc_img.source = "reward_vip_json.lb_huiyuan_special";
            }
            else {
                this.desc_img.visible = false;
            }
            if (info["scale"]) {
                this.scaleX = this.scaleY = info["scale"];
            }
        }
    }
}