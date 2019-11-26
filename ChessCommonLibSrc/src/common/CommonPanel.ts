
module chessCommonLib {
    export class CommonPanel extends eui.Component {

        public static exml = "chessCommonLib.CommonPanelSkin";
        /**标题 */
        private _title: eui.Image;
        /**关闭按钮 */
        private _closeBtn: eui.Button;

        private _titleStr: string;
        private _width: number;
        private _height: number;
        constructor(title?: string, width?: number, height?: number, skin?: string) {
            super();
            if (skin)
                this.skinName = skin;
            else
                this.skinName = CommonPanel.exml;
            this._titleStr = title;
            this._width = width;
            this._height = height;

        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initUI();
            this.addEvent();
        }

        protected initUI(): void {
            if (this._width)
                this.width = this._width;
            if (this._height)
                this.height = this._height;
            if (this._titleStr) {
                if (RES.getRes(this._titleStr)) {
                    this._title.source = this._titleStr;
                } else if (RES.getRes(this._titleStr + "_png")) {
                    this._title.source = this._titleStr + "_png";
                } else if (RES.getRes(this._titleStr + "_jpg")) {
                    this._title.source = this._titleStr + "_jpg";
                }
            }
            // this._closeBtn.x = this._panelBg.width - this._closeBtn.width;
        }

        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }

        protected destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }

        protected btnClick(evt: egret.TouchEvent) {
            switch (evt.target) {
                case this._closeBtn:
                    /**调用unilib的removePop会自动调用基类中的destroy方法 */
                    uniLib.PopUpMgr.removePopUp(this.parent);
                    break;
            }
        }

        public static setDefaultSkin(skin: any) {
            CommonPanel.exml = skin;
        }

    }
}
