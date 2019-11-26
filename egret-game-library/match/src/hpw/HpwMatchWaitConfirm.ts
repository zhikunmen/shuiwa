module match {
    export class HpwMatchWaitConfirm extends eui.Component {

        public confirm_btn: match.BaseButton;
        public cancel_btn: match.BaseButton;

        constructor() {
            super();
            this.skinName = "HpwMatchWaitConfirmSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.confirm_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cancel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.cancel_btn) {
               this.destroy();
            }
            else if (evt.target == this.confirm_btn) {
                OnRequestExitHpMatchCmd_C();
            }
        }

        public destroy() {
            this.confirm_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cancel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.PopUpMgr.removePopUp(this);
        }
    }
}