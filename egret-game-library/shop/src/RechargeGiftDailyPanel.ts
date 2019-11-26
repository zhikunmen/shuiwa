module shop {
    /**每日充值礼包 */
    export class RechargeGiftDailyPanel extends eui.Component {

        public purchase_btn: eui.WxButton;
        public pay_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public againGift_lst: eui.List;
        public give_lst: eui.List;
        public gift_lst: eui.List;
        public btn_lst: eui.List;
        public time_lbl: eui.Label;

        private _shopId: number;
        private _timer: egret.Timer;

        constructor() {
            super();
            this.skinName = "RechargeGiftDailySkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            uniLib.Global.addEventListener("GET_PAGE_INFO", this.onInfo, this);
            let req = new Cmd.GetPageInfoHpMatchCmd_C();
            req.typ = Cmd.PAGE_TYPE.DAILY_GIFT
            NetMgr.tcpSend(req);
            this.gift_lst.itemRenderer = ThreeRMBItem;
            this.againGift_lst.itemRenderer = ThreeRMBItem;
            this.give_lst.itemRenderer = ThreeRMBItem;
            this.purchase_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            // if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
            //     this.pay_btn.visible = true;
            //     this.purchase_btn.visible = false;
            // }
        }

        private onInfo(evt: uniLib.ZqEvent) {
            let info: Cmd.DailyGift[] = evt.param;
            info.forEach((value, index) => { value["index"] = index + 1 });
            this.btn_lst.itemRenderer = RechargeGiftDailyItem;
            this.btn_lst.dataProvider = new eui.ArrayCollection(info);
            this.btn_lst.selectedIndex = 1;
            this.btn_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);

            this.setView(info[0]);
        }

        private onItemTap() {
            this.setView(this.btn_lst.selectedItem);
        }

        private setView(info: Cmd.DailyGift) {
            this._shopId = info.shopId;
            this.gift_lst.dataProvider = new eui.ArrayCollection(info.firstGift);
            this.againGift_lst.dataProvider = new eui.ArrayCollection(info.SecondGift);
            this.give_lst.dataProvider = new eui.ArrayCollection(info.extraGift);

            if (info.countDownSec) {
                if (this._timer) {
                    this._timer.reset();
                    this._timer.repeatCount = info.countDownSec;
                }
                else {
                    this._timer = new egret.Timer(1000, info.countDownSec);
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                }
                this._timer.start();
            }
            else {
                this.time_lbl.text = "间隔倒计时: 00：00";
            }
        }

        private onTimer() {
            if (this._timer.repeatCount == this._timer.currentCount) {
                this._timer.stop();
                this.time_lbl.text = "间隔倒计时: 00：00"
            }
            else{
                let m = Math.floor((this._timer.repeatCount - this._timer.currentCount) / 60) + "";
                let s = (this._timer.repeatCount - this._timer.currentCount) % 60 + "";
                this.time_lbl.text = `间隔倒计时: ${m.length < 2 ? "0" + m : m}：${s.length < 2 ? "0" + s : s}`;
            }
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
            uniLib.Global.removeEventListener("GET_PAGE_INFO", this.onInfo, this);
            this.purchase_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.btn_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        }
    }

    class RechargeGiftDailyItem extends eui.ItemRenderer {

        public btn_rbtn: eui.RadioButton;
        public icon_img: eui.Image;
        public desc_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "RechargeGiftDailyItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.DailyGift = this.data;
            this.desc_lbl.visible = false;
            this.btn_rbtn.label = `每日${info.price / 100}元`;
            this.icon_img.source = "lb_giftDaily_json.lb_giftDaily_icon" + info["index"];
            /**当按钮过多这里可以滑动时会有问题 */
            if (info["index"] == 1) {
                this.btn_rbtn.selected = true;
            }
            else {
                this.btn_rbtn.selected = false;
            }
        }
    }
}