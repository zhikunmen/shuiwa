/**单个老友圈 所有战绩 */
module club {

    export class ClubAllRecordPanel extends commonpanel.LobbyBaseEuiPanel {

        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /**滑块 */
        private _scroll: eui.Scroller;
        /**数据面板 */
        private _recordList: eui.List;
        /**提示字 */
        private _tipsText: eui.Label;
        /**当前页数 */
        private _curPage: number = 0;
        /**总页数 */
        private _totalPage: number;
        /**当前俱乐部matchid */
        private _matchId: number;
        /**当前记录Uid */
        private _uid: number;
        /**我的战绩按钮 */
        private _myRecordBtn: eui.WxButton;
        /**记录数据容器 */
        private _AllRecordListArr: eui.ArrayCollection;
        /**数据 */
        private _AllRecordArr: Array<Cmd.GameHistory>;
        /** 选择今日昨日前日输赢*/
        private _choseDayBtn: eui.Button;
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
        /** 房间数*/
        private _roomText: eui.Label;
        /**当前页面的 今日 昨日 前日选项 */
        private _clubDayChose: number;
        /**记录当前数据记录的 日  */
        private _dayChose: number = 0;
        /**typ为2时请求的填充为：总房数(今日、昨日、前日) */
        private _matchStatisticInfo: Cmd.MathGroupstatisticInfo;
        constructor() {
            super();
            this.skinName = "ClubAllRecordSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        //初始化
        protected initUI(): void {
            this._clubDayChose = 1;
            this._AllRecordArr = [];
            this._recordList.itemRenderer = ClubAllRecordItemPanel;
        }
        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.MATCH_HISTORY_FOR_DESK, this.showData, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.MATCH_HISTORY_FOR_DESK, this.showData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        private onClickTap(e: egret.TouchEvent): void {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._myRecordBtn:
                    ClubModuleMgr.getInstance().showClubMemberRecordPanel(() => {
                        ClubSendMgr.getGameDataHistoryForMatch(this._matchId, 1, 1, ClubConst1.MATCH_HISTORY_FOR_MYSELF);
                    });
                    break;
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日战绩";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._yesterdayBtn:
                    this._clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日战绩";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._qianBtn:
                    this._clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日战绩";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
            }
        }
        /**接收数据 */
        public showData(evt: uniLib.ZqEvent): void {
            var vo = evt.param as Cmd.GetGameDataHistoryForMatchCmd_S;
            if (vo.typ) {
                this.addListen();
                this._matchId = vo.matchId;
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                this._matchStatisticInfo = vo.matchStatisticInfo;
                this.updatePoint();
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tipsText.visible = true;
                    if (this._dayChose != this._clubDayChose) {
                        this._dayChose = this._clubDayChose;
                        this._AllRecordArr = [];
                        if (this._AllRecordListArr) {
                            if (Array.isArray(this._AllRecordListArr.source)) {
                                this._AllRecordListArr.removeAll();
                            }
                            this._AllRecordListArr.replaceAll(this._AllRecordArr);
                        }
                    }
                } else {
                    this._tipsText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
        }
        /**单独加 */
        private addListen(): void {
            this._scroll.addEventListener(egret.Event.CHANGE, this.checkTop, this);
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
            if (!this._AllRecordListArr) {
                this._AllRecordListArr = new eui.ArrayCollection(this._AllRecordArr);
                this._recordList.dataProvider = this._AllRecordListArr;
            } else {
                if (Array.isArray(this._AllRecordListArr.source)) {
                    this._AllRecordListArr.removeAll();
                }
                this._AllRecordListArr.replaceAll(this._AllRecordArr);
                if (this._curPage == 1) {
                    this._AllRecordListArr.refresh();
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
            if (this._matchStatisticInfo) {
                this._roomText.text = "" + this._matchStatisticInfo.openNbrs[this._clubDayChose - 1];
            } else {
                this._roomText.text = "0";
            }
        }
        /**获取战绩消息 */
        public getData(): void {
            if (this._clubDayChose == this._dayChose) {
                ClubSendMgr.getGameDataHistoryForMatch(this._matchId, this._curPage, this._clubDayChose, ClubConst1.MATCH_HISTORY_FOR_DESK);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            } else {
                ClubSendMgr.getGameDataHistoryForMatch(this._matchId, 1, this._clubDayChose, ClubConst1.MATCH_HISTORY_FOR_DESK);
            }
        }
        /**滑到底加载其他页数据 */
        private checkTop(evt: egret.TouchEvent): void {
            if (this._scroll.viewport.scrollV + this._scroll.viewport.height >= this._scroll.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroll.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this);//2秒不返回继续可以请求
                }
            }
        }
        public destroy(): void {
            super.destroy();
        }
    }
}