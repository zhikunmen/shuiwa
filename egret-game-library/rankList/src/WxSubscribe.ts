
module rankList {
    /**
     * 收藏
     */
    export class WxSubscribe extends eui.Component {

        public close_btn: eui.WxButton;
        private skins:string[] = ["WxSubscribeSkin","WxBuyuSubscribeSkin"];

        constructor(type:number = 0) {
            super();
            this.skinName = this.skins[type];
        }

        childrenCreated() {
            super.childrenCreated();
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
        }

        public destroy() {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            uniLib.PopUpMgr.removePopUp(this);
        }
    }
}