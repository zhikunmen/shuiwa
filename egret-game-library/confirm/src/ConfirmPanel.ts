
module commonConfirm {
    export class ConfirmPanel extends eui.Component {

        public title_img: eui.Image;
        public okButton: eui.WxButton;
        public cacelButton: eui.WxButton;
        public contentText: eui.Label;
        public title_lbl: eui.Label;

        private _title: string;
        private _btnRes: string[];
        private _content: string | Array<egret.ITextElement>;
        private _callback1: Function;
        private _callback2: Function;
        private _callObj: any;

        /**
       * titleUrl 确认框标题 传个资源名或文字
       * btnUrl 自定义的按钮皮肤 传个资源名
       * text 确认框内容
       * callback1 确定按钮回调函数
       * callback2 取消按钮回调函数
       */
        public constructor(content: string | Array<egret.ITextElement>, title?: string, btnRes?: string[], callback1?: Function, callback2?: Function, callObj?: any) {
            super();
            this._content = content;
            this._title = title;
            this._btnRes = btnRes;
            this._callback1 = callback1;
            this._callback2 = callback2;
            this._callObj = callObj;
            this.skinName = "ConfirmPanelSkin";
        }

        public childrenCreated(): void {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            if (this._title) {
                if (RES.hasRes(this._title)) {
                    this.title_lbl.visible = false;
                    this.title_img.source = this._title;
                } else {
                    this.title_img.visible = false;
                    this.title_lbl.text = this._title;
                }
            }
            if (this._btnRes) {
                this.okButton.skin["img"].source = this._btnRes[0];
                if (this._btnRes[1])
                    this.cacelButton.skin["img"].source = this._btnRes[1];
            }
            if (this._content.length && Object.prototype.toString.call(this._content).toLowerCase() == "[object array]") {
                this.contentText.textFlow = <Array<egret.ITextElement>>this._content;
            }
            else {
                this.contentText.text = this._content + '';
            }
            if (this._callback2) {
                this.cacelButton.visible = true;
                this.okButton.horizontalCenter = -150;
            } else {
                this.cacelButton.visible = false;
                this.okButton.horizontalCenter = 0;
            }
        }

        private touchHandle(e: egret.TouchEvent): void {
            let target = e.target;
            switch (target) {
                case this.okButton:
                    uniLib.PopUpMgr.removePopUp(this);
                    this._callback1 && this._callback1.apply(this._callObj, []);
                    break;
                case this.cacelButton:
                    uniLib.PopUpMgr.removePopUp(this);
                    this._callback2 && this._callback2.apply(this._callObj, []);
                    break;
            }
        }

        public destroy(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            this._content = null;
            this._title = null;
            this._btnRes = null;
            this._callback1 = null;
            this._callback2 = null;
            this._callObj = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}