module eui {
    export class WxButton extends eui.Button {
        public constructor() {
            super();
        }
        private colorMatrix = [
            0.7, 0, 0, 0, 70,
            0, 0.7, 0, 0, 70,
            0, 0, 0.7, 0, 70,
            0, 0, 0, 1, 0
        ];
        private isFilter = false;

        protected childrenCreated() {
            super.childrenCreated();
            if (this.anchorOffsetX == 0) {
                this.anchorOffsetX = this.width >> 1;
                this.x += this.width >> 1;
            }
            if (this.anchorOffsetY == 0) {
                this.anchorOffsetY = this.height >> 1;
                this.y += this.height >> 1;
            }
            this.init();
        }

        private init() {
            this.touchEnabled = true;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            let gameConsts = egret.getDefinitionByName("GameConsts");
            if (gameConsts && GameConsts.LABEL_STYLE && this.label) {
                this.labelDisplay["style"] = GameConsts.LABEL_STYLE;
            }
        }

        protected removeTouchEvent() {
            if (this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            }
        }
        protected onTouchBegin(evt: egret.TouchEvent) {
            super.onTouchBegin(evt);
            if (this.isFilter) {
                this.filters = [new egret.ColorMatrixFilter(this.colorMatrix)];
            } else {
                this.scaleX = 0.9;
                this.scaleY = 0.9;
            }
            if (!this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            }
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        }
        protected onTouchEnd() {
            this.filters = [];
            this.scaleX = 1;
            this.scaleY = 1;
            this.removeTouchEvent();
        }
        protected onTouchCancel(evt: egret.TouchEvent) {
            this.filters = [];
            this.scaleX = 1;
            this.scaleY = 1;
            this.removeTouchEvent();
        }
        protected onTouchMove() {
            this.scaleX = 1;
            this.scaleY = 1;
        }

        protected onTouchReleaseOutside() {
            this.filters = [];
            this.scaleX = 1;
            this.scaleY = 1;
            this.removeTouchEvent();
        }

        public setColorMatrix(matrix?: number[]) {
            if (matrix) {
                this.colorMatrix = matrix;
            }
            this.isFilter = true;
        }
        public dispose() {
            this.filters = null;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            this.removeTouchEvent();
        }
    }
}