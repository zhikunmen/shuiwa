module message {
    export class PrizeItem extends eui.Component {
        private _type: eui.Image;
        private _numTxt: eui.BitmapLabel;
        constructor() {
            super();
            this.skinName = "PrizeItemSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public initData(data: Cmd.Attachment): void {
            if (data.itemid == 99) {
                this._type.source = "msg_icon_1";
            } else {
                this._type.source = "msg_icon_2";
            }
            this._numTxt.text = "x" + data.itemnum;
            this._type.anchorOffsetX = this._type.width / 2;
            this._type.anchorOffsetY = this._type.height / 2;
        }
        public destroy(): void {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
