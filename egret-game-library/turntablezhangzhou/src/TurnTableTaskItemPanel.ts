module turntable {

    /**转盘 任务列表 */
    export class TurnTableTaskItemPanel extends eui.ItemRenderer {
        /** 任务名称*/
        private _taskText: eui.Label;
        /** */
        private _integralImg: eui.Image;
        /**背景 */
        private _bg: eui.Image;
        /** */
        private _taskNumText: eui.Label;
        /** 进度*/
        private _processText: eui.Label;
        /** */
        private _info: Cmd.ZZTurnTableTask;

        constructor() {
            super();
            this.skinName = "TurnTableTaskItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            this._info = this.data;
            this._taskText.text = MJLobbyData.getInstance().tabletask[this._info.taskId].name;
            this._processText.text = this._info.nbr + "/" + MJLobbyData.getInstance().tabletask[this._info.taskId].frequency;
            if (this.itemIndex % 2 == 0) {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item1";
            } else {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item2";
            }
        }
    }
}