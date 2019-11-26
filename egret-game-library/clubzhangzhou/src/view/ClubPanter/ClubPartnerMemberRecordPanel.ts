module club {

    /**合作群 成员战绩 */
    export class ClubPartnerMemberRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /**成员参与总房数  单位：房*/
        private _palyRoomText: eui.Label;
        /**总大赢家数 单位：次*/
        private _bigWinText: eui.Label;
        /**成员参与总人数 单位：人*/
        private _playMemberText: eui.Label;
        /**共有成员数 单位：人 */
        private _allMemberText: eui.Label;
        /** 导入成员按钮*/
        private _importBtn: eui.Button;
        /** 手动添加按钮*/
        private _addBtn: eui.Button;
        /**数据LIST */
        private _list: eui.List;
        /**选择日子按钮 */
        private _choseDayBtn: eui.Button;
        /**选择日group */
        private _dayTypeGroup: eui.Group;
        /**选择日背景*/
        private _choseRect: eui.Rect;
        /** 选择日 今日数据*/
        private _todayBtn: eui.Button;
        /**选择日 昨日数据 */
        private _yesterdayBtn: eui.Button;
        /**选择日 前日数据 */
        private _qianBtn: eui.Button;
        /** */
        private _data: Cmd.GetMemberRecordsMatchGroupCmd_CS;
        /**各个成员的战绩数据*/
        private _partnerMemberRecordInfo: Cmd.PartnerMemberRecordInfo[];
        /**集合器*/
        private _listArr: eui.ArrayCollection;
        constructor() {
            super();
            this.skinName = "ClubPartnerMemberRecordSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(ClubConst.RemoveMemberMatchGroup, this.updateDate, this);

            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        //初始化
        protected initUI(): void {
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            ClubData.getInstance().clubDayChose = 1;
            this._list.itemRenderer = ClubPartnerMemberRecordItemPanel;
            this._choseDayBtn.currentState = "up";
        }
        /**传数据 */
        public setDate(evt: uniLib.ZqEvent): void {
            this._data = evt.param as Cmd.GetMemberRecordsMatchGroupCmd_CS;
            this._partnerMemberRecordInfo = this._data.records;
            this._allMemberText.text = "" + this._data.statistics.memberNbr;
            this.update();
            this.updateList();
        }
        /**传数据 */
        public updateDate(evt: uniLib.ZqEvent): void {
            let data = evt.param as Cmd.RemoveMemberMatchGroupCmd_CS;
            this._partnerMemberRecordInfo.forEach(element => {
                if (element.member.uid == data.uid) {
                    element.member.partnerState = 1;
                }
            });

            this._partnerMemberRecordInfo = this._data.records;
            this._allMemberText.text = "" + this._data.statistics.memberNbr;
            this.update();
            this.updateList();
        }
        /**更新视图 */
        private update(): void {
            this._palyRoomText.text = "" + this._data.statistics.roomNbrs[ClubData.getInstance().clubDayChose - 1];
            this._bigWinText.text = "" + this._data.statistics.winNbrs[ClubData.getInstance().clubDayChose - 1];
            this._playMemberText.text = "" + this._data.statistics.playUserNbrs[ClubData.getInstance().clubDayChose - 1];
        }
        /**更新数据 */
        private updateList(): void {
            if (!Array.isArray(this._partnerMemberRecordInfo)) {
                return;
            }
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
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    ClubData.getInstance().clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.update();
                    this.updateList();
                    break;
                case this._yesterdayBtn:
                    ClubData.getInstance().clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.update();
                    this.updateList();
                    break;
                case this._qianBtn:
                    ClubData.getInstance().clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.update();
                    this.updateList();
                    break;
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
                case this._addBtn:
                    ClubModuleMgr.getInstance().showClubPartnerImportAddPanel();
                    let cmd = new Cmd.GetCanImportMemberList2MatchGroupCmd_CS();
                    cmd.curMatchId = ClubData.getInstance().clubmatchid;
                    NetMgr.tcpSend(cmd);
                    break;
                case this._importBtn:
                    ClubModuleMgr.getInstance().showClubPartnerImportPanel(() => {
                        let cmd = new Cmd.GetCanImportMemberList2MatchGroupCmd_CS();
                        cmd.curMatchId = ClubData.getInstance().clubmatchid;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
            }
        }

    }
}