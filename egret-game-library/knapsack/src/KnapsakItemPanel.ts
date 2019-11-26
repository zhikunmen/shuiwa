module knapsack {
    /**背包代金券Item */
    export class KnapsakItemPanel extends eui.ItemRenderer {
        /**代金券图 */
        private _couponImg: eui.Image;
        /**选中图 */
        private _selectImg: eui.Image;
        /**代金券数量 */
        private _numText: eui.Label;
        /**代金券游戏种类名称 */
        private _gameText: eui.Label;
        private _info: Cmd.BackpackInfo;
        constructor() {
            super();
            this.skinName = "KnapsackItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged(): void {
            this._info = this.data;
            this._numText.text = "x" + this._info.number;
            this._couponImg.source = "mjl_knapsack_json.mjl_knapsack_" + this._info.goodId;
            this._gameText.text = Data.goods[this._info.goodId].goodName;
            if (KnapsackData.getInstance().knapaskGoodId == this._info.goodId) {
                this._selectImg.visible = true;
            } else {
                this._selectImg.visible = false;
            }
        }
    }
}