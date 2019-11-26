module match {
    export class HpwMsgBox extends eui.Component {

        public title_lbl: eui.Label;
        public close_btn: match.BaseButton;
        public confirm_btn: match.BaseButton;
        public content_lbl: eui.Label;

        private _title: string;
        private _content: string | Array<egret.ITextElement>;
        private _textAlign: string;

        constructor(title: string, content: string | Array<egret.ITextElement>, textAlign: string = "left") {
            super();
            this._title = title;
            this._content = content;
            this._textAlign = textAlign;
            this.skinName = "HpwMsgBoxSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (!!this._title)
                this.title_lbl.text = this._title;
            this.content_lbl.textAlign = this._textAlign;
            if (this._content.length && Object.prototype.toString.call(this._content).toLowerCase() == "[object array]") {
                this.content_lbl.textFlow = <Array<egret.ITextElement>>this._content;
            }
            else {
                this.content_lbl.text = this._content + '';
            }
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn || evt.target == this.confirm_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        }

        public destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}