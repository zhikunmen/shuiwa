module eui {
    export class WxContain extends eui.Group {
        public constructor() {
            super();
            this.init();
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
            this.x += this.width >> 1;
            this.y += this.height >> 1;
        }

        private init() {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        }
        protected onTouchBegin() {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        }
        protected onTouchEnd() {
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

        protected onTouchReleaseOutside() {
            this.scaleX = 1;
            this.scaleY = 1;
        }

        public dispose() {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
        }
    }
}