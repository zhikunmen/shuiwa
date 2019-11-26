module club {

    /**查看战绩页面 群主看其他合伙人的战绩 */
    export class ClubPartnerMemberDetailPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭 */
        private _closeBtn: eui.Button;
        /**列表 */
        private _list: eui.List;
        /**数据 */
        private _data: Cmd.GetMemberRecordsMatchGroupCmd_CS;
        /**各个成员的战绩数据*/
        private _partnerMemberRecordInfo: Cmd.PartnerMemberRecordInfo[];
        /**集合器*/
        private _listArr: eui.ArrayCollection;
        constructor() {
            super();
            this.skinName = "ClubPartnerMemberDetailSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        //初始化
        protected initUI(): void {
            this._list.itemRenderer = ClubPartnerMemberDetailItemPanel;
        }
        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }

        /**更新数据 */
        private updateList(): void {
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._partnerMemberRecordInfo);
                this._list.dataProvider = this._listArr;
            } else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._partnerMemberRecordInfo);
            }
        }

        /**传数据 */
        public setDate(evt: uniLib.ZqEvent): void {
            this._data = evt.param as Cmd.GetMemberRecordsMatchGroupCmd_CS;
            this._partnerMemberRecordInfo = this._data.records;
            this.updateList();
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
            }
        }

    }
}