module turntable {

    /**抽奖记录 */
    export class TurnTableRecordItemPanel extends eui.ItemRenderer {
        /**背景 */
        private _bg: eui.Image;
        /**时间 */
        private _timeText: eui.Label;
        /** 奖品*/
        private _prizeText: eui.Label;
        private _info: Cmd.ZZTurnTableRecord;
        constructor() {
            super();
            this.skinName = "TurnTableRecordItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged(): void {
            this._info = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStr(this._info.time) + "获得";
            this._prizeText.text = 	MJLobbyData.getInstance().goods[this._info.goodId].goodDesc + this._info.goodNbr;
            this._prizeText.x = this._timeText.x + this._timeText.width;
            if (this.itemIndex % 2 == 0) {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item1";
            } else {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item2";
            }
        }
    }
}