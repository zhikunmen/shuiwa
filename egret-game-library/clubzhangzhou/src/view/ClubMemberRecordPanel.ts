module club {

    /**老友圈 成员自己看自己战绩  */
    export class ClubMemberRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /** 选择今日昨日前日输赢*/
        private _choseDayBtn: eui.Button;
        /**看回放 */
        private _lookRecordBtn: eui.Button;
        /** 容器*/
        private _scroller: eui.Scroller;
        /**选择日期 */
        private _dayTypeGroup: eui.Group;
        /**选择蒙版 */
        private _choseRect: eui.Rect;
        /** 今日输赢按钮*/
        private _todayBtn: eui.Button;
        /** 昨日输赢按钮*/
        private _yesterdayBtn: eui.Button;
        /** 前日输赢按钮*/
        private _qianBtn: eui.Button;
        /**战绩列表 */
        private _recordsList: eui.List;
        /** 战绩分数*/
        private _sorceText: eui.Label;
        /** 房间数*/
        private _roomText: eui.Label;
        /** 大赢家次数*/
        private _bigWinText: eui.Label;
        /** 提示*/
        private _tipsText: eui.Label;
        /**集合器*/
        private _recordslistArr: eui.ArrayCollection;
        /** */
        private _data: Cmd.GetGameDataHistoryForMatchCmd_S;
        /**数据 */
        private _AllRecordArr: Array<Cmd.GameHistory>;
        /**当前页数 */
        private _curPage: number = 0;
        /**总页数 */
        private _totalPage: number;
        /**当前俱乐部matchid */
        private _matchId: number;
        /**当前页面的 今日 昨日 前日选项 */
        private _clubDayChose: number;
        /**记录当前数据记录的 日  */
        private _dayChose: number = 0; constructor() {
            super();
            this.skinName = "ClubMemberRecordSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.MATCH_HISTORY_FOR_MYSELF, this.setDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.MATCH_HISTORY_FOR_MYSELF, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        //初始化
        protected initUI(): void {
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            this._clubDayChose = 1;
            this._AllRecordArr = [];
            this._recordsList.itemRenderer = ClubMemberRecordItemPanel;
            this.addListen();
            this._choseDayBtn.currentState = "up";
        }
        /**传数据 */
        public setDate(evt: uniLib.ZqEvent): void {
            this._data = evt.param as Cmd.GetGameDataHistoryForMatchCmd_S;
            this._matchId = this._data.matchId;
            this._totalPage = this._data.maxPage;
            this._curPage = this._data.curPage;
            if (this._data.curPage == 1 && !this._data.gameHistroys[0]) {
                this._tipsText.visible = true;
                if (this._dayChose != this._clubDayChose) {
                    this._dayChose = this._clubDayChose;
                    this._AllRecordArr = [];
                    if (this._recordslistArr) {
                        if (Array.isArray(this._recordslistArr.source)) {
                            this._recordslistArr.removeAll();
                        }
                        this._recordslistArr.replaceAll(this._AllRecordArr);
                    }
                }
            } else {
                this._tipsText.visible = false;
                this.addData(this._data.gameHistroys);
            }
            this.updatePoint();
        }
        /**添加数据*/
        private addData(arr: Array<Cmd.GameHistory>): void {
            if (!arr || !arr[0]) {
                return;
            }
            if (this._dayChose == this._clubDayChose) {
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            } else {
                this._dayChose = this._clubDayChose;
                this._AllRecordArr = [];
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            if (!this._recordslistArr) {
                this._recordslistArr = new eui.ArrayCollection(this._AllRecordArr);
                this._recordsList.dataProvider = this._recordslistArr;
            } else {
                if (Array.isArray(this._recordslistArr.source)) {
                    this._recordslistArr.removeAll();
                }
                this._recordslistArr.replaceAll(this._AllRecordArr);
                if (this._curPage == 1) {
                    this._recordslistArr.refresh();
                }
            }
        }
        /**获取战绩消息 */
        public getData(): void {
            if (this._clubDayChose == this._dayChose) {
                ClubSendMgr.getGameDataHistoryForMatch(this._matchId, this._curPage, this._clubDayChose, ClubConst1.MATCH_HISTORY_FOR_MYSELF);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            } else {
                ClubSendMgr.getGameDataHistoryForMatch(this._matchId, 1, this._clubDayChose, ClubConst1.MATCH_HISTORY_FOR_MYSELF);
            }
        }
        /**单独加 */
        private addListen(): void {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        }
        /**滑到底加载其他页数据 */
        private checkTop(evt: egret.TouchEvent): void {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this);//2秒不返回继续可以请求
                }
            }
        }
        /**点每日输赢更新数据 */
        private updateView(): void {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
            this.updatePoint();
        }
        /**更新视图 */
        private updatePoint(): void {
            if (this._data.userStatisticInfo) {
                this._roomText.text = "" + this._data.userStatisticInfo.roomNbrs[this._clubDayChose - 1];
                this._bigWinText.text = "" + this._data.userStatisticInfo.winNums[this._clubDayChose - 1];
                this._sorceText.text = "" + this._data.userStatisticInfo.scores[this._clubDayChose - 1];
            } else {
                this._roomText.text = "0";
                this._bigWinText.text = "0";
                this._sorceText.text = "0";
            }

        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._yesterdayBtn:
                    this._clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._qianBtn:
                    this._clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
                case this._lookRecordBtn:
                    LobbyModuleMgr.getInstance().showLookVideoPanel();
                    break;
            }
        }
        protected destroy(): void {
            super.destroy();
        }
    }
}