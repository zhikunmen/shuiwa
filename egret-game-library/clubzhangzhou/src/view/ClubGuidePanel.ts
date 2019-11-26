module club {

    /**
     * 新手指引 群主
     */
    export class ClubGuidePanel extends commonpanel.LobbyBaseEuiPanel {
        /**背景图 */
        private _rectBg: eui.Rect;
        /** 提示一*/
        private _guideGroup1: eui.Group;
        /** 提示二*/
        private _guideGroup2: eui.Group;
        /** 提示三*/
        private _guideGroup3: eui.Group;
        /** 提示四*/
        private _guideGroup4: eui.Group;
        /** 计数器*/
        private _counter: number;
        private group1: egret.tween.TweenGroup;
        private image: eui.Image;

        constructor() {
            super();
            this.skinName = "ClubGuideSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        //初始化
        protected initUI(): void {
            this._counter = 0;
            this.onClick();
        }
        /**事件监听 */
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected removeEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        }
        /**背景光旋转 */
        private guangtween(val: boolean) {
            uniLib.DisplayUtils.stopTweenGroup(this.group1);
            if (val) {
                uniLib.DisplayUtils.playTweenGroup(this.group1, true);
            }
        }
        private onClick(): void {
            this._counter++;
            this._guideGroup1.visible = this._guideGroup2.visible
                = this._guideGroup3.visible = this._guideGroup4.visible = false;
            // this.guangtween(true);
            if (this._counter > 4) {
                super.removePop();
            } else {
                this[`_guideGroup${this._counter}`].visible = true;
            }
        }
    }
}