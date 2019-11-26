module match {
    export class BaseButton extends eui.Button {
        public constructor() {
            super();
            this.init();
        }
        private init() {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        }
        protected onTouchBegin() {
            this.currentState = "down";
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        }
        protected onTouchEnd() {
            this.currentState = "up";
            this.scaleX = 1;
            this.scaleY = 1;
        }
        protected onTouchCancel() {
            this.scaleX = 1;
            this.scaleY = 1;
        }
        protected onTouchMove() {
            this.scaleX = 1;
            this.scaleY = 1;
        }
        public dispose() {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
        }
    }
}