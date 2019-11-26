module rankList {
    export class ListItem extends eui.ItemRenderer {
        private _head: eui.Image;
        private _rankTxt: eui.Label;
        private _rankImg: eui.Image;
        private rankData: Cmd.HpRankInfo;
        public constructor() {
            super();
            this.skinName = "ListItemSkin";
        }
        protected dataChanged(): void {
            let data: Cmd.HpRankInfo = this.data;
            this.rankData = data;
            this._head.source = data.headUrl;
            if (data.rank < 4) {
                this._rankImg.source = "rank_num_" + data.rank;
                this._rankTxt.visible = false;
            } else {
                this._rankImg.source = "rank_num_4";
                this._rankTxt.visible = true;
                this._rankTxt.text = data.rank + "";
            }
        }
        public destroy(): void {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}