module club {

    /**老友清除记录页面 ItemRenderer*/


    export class ClubCleanRecordItemPanel extends eui.ItemRenderer {
        /** 时间*/
        private _timeText: eui.Label;
        /**日期 */
        private _dayText: eui.Label;
        /**操作人 */
        private _nameText: eui.Label;
        /** 数据*/
        private _info: Cmd.CleanRecord;
        constructor() {
            super();
            this.skinName = "ClubCleanRecordItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            let days = ["今日输赢", "昨日输赢", "前日输赢"]
            this._info = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this._info.timestamp);
            this._dayText.text = days[this._info.which - 1] + " " + this._info.nbr;
            this._nameText.text = this._info.opUser;
        }
    }
}