
module gamehelp {
    export class HelpPanel extends commonpanel.LobbyBaseEuiPanel {
        private _titleTxt: eui.Label;
        private _typeTxt: eui.Label;
        private _contentTxt: eui.Label;
        private _typetext: string;
        private _contenttext: string;
        private _titletext: string;
        constructor(titletxt: string, typetxt: string, contentTxt: string, ) {
            super("help_title_png", 824, 556);
            this._typetext = typetxt;
            this._contenttext = contentTxt;
            this._titletext = titletxt;
            this.skinName = "HelpSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected initUI() {
            this._titleTxt.text = this._titletext;
            this._typeTxt.text = this._typetext;
            this._contenttext = this._contenttext.replace(/#113780/g, "#e9dd1d");  //大厅批量替换规则字体贪色
            if (!this._contenttext) {
                this._contenttext = "暂无";
            }
            this._contentTxt.textFlow = (new egret.HtmlTextParser).parser(this._contenttext);
        }
        public destory(): void {
            this.removeEvent()
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._titleTxt = null;
            this._typeTxt = null;
            this._contentTxt = null;
            this._contenttext = null;
            this._typetext = null;
            this._titletext = null;

        }

    }
}
