module club {

    /**俱乐部成员列表详情 */
    export class ClubMemberInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /** 头像*/
        private _headImg: eui.Image;
        /** 昵称*/
        private _nameText: eui.Label;
        /** id*/
        private _uidText: eui.Label;
        /** 备注*/
        private _remarksText: eui.EditableText;
        /**归属人 */
        private _belongText: eui.Label;
        /**提示信息 */
        private _tishiText: eui.Label;
        /**分数战绩 */
        private _scoreText: eui.Label;
        /**房间数*/
        private _roomText: eui.Label;
        /**大赢家次数 */
        private _bigWinText: eui.Label;
        /**清零按钮 */
        private _cleanBtn: eui.Button;
        /**清零记录按钮 */
        private _recordBtn: eui.Button;
        /**选择按钮 */
        private _choseDayBtn: eui.Button;
        /**选日子区域 */
        private _dayTypeGroup: eui.Group;
        /**选日子蒙版 */
        private _choseRect: eui.Rect;
        /**今日输赢选项*/
        private _todayBtn: eui.Button;
        /**昨日输赢选项 */
        private _yesterdayBtn: eui.Button;
        /**前日输赢选项 */
        private _qianBtn: eui.Button;
        /**滑块 */
        private _scroller: eui.Scroller;
        /**列表 */
        private _list: eui.List;
        private _listArr: eui.ArrayCollection;
        /**玩家数据 */
        private _info: Cmd.MatchGroupMemberInfo;
        /**选择日 选项 今日（1）、昨日 （2）、前日（3）*/
        private _clubDayChose: number;
        /** 战绩数据*/
        private _memberinfo: Cmd.MatchGroupMemberInfo;
        /**当前页数 */
        private _curPage: number = 0;
        /**总页数 */
        private _totalPage: number;
        /**数据 */
        private _AllRecordArr: Array<Cmd.GameHistory>;
        /**记录当前数据记录的 日  */
        private _dayChose: number = 0;
        constructor(parm: Cmd.MatchGroupMemberInfo) {
            super();
            this.skinName = "ClubMemberInfoSkin";
            this._info = parm;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.MATCH_HISTORY_FOR_UID, this.showData, this);
            uniLib.Global.addEventListener(ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
            this._remarksText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }

        protected removeEvent(): void {
            this._remarksText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            uniLib.Global.removeEventListener(ClubConst.MATCH_HISTORY_FOR_UID, this.showData, this);
            uniLib.Global.removeEventListener(ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        //初始化
        protected initUI(): void {
            this._AllRecordArr = [];
            this._list.itemRenderer = ClubMemberInfoItemPanel;
            ClubSendMgr.getGameDataHistoryToUId(ClubData.getInstance().matchid, this._info.uid, 1, ClubConst1.MATCH_HISTORY_FOR_UID, 1);
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            this._clubDayChose = 1;
            this._choseDayBtn.currentState = "up";
        }
        /**输入框判断 */
        private onTextFieldFocusOut(event: egret.FocusEvent): void {
            let cmd = new Cmd.RemarkNickNameMatchGroupCmd_CS();
            cmd.matchId = ClubData.getInstance().matchid;
            cmd.targetUid = this._info.uid;
            cmd.remark = (<eui.EditableText>event.target).text;
            NetMgr.tcpSend(cmd);
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._cleanBtn:
                    this.cleanWinPoint(this._clubDayChose);
                    break;
                case this._recordBtn:
                    let req: Cmd.GetCleanRecordMatchGroupCmd_CS = new Cmd.GetCleanRecordMatchGroupCmd_CS;
                    req.matchId = ClubData.getInstance().matchid;
                    req.targetUid = this._info.uid;
                    NetMgr.tcpSend(req);
                    break;
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
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
            }
        }
        /**清楚玩家指定输赢数据 */
        private day = ["今日", "昨日", "前日"]
        private cleanWinPoint(which: number) {
            let self = this;
            let okFunc = function () {
                let cmd = new Cmd.CleanMemberWinPointMatchGroupCmd_CS();
                cmd.matchId = ClubData.getInstance().matchid;
                cmd.targetUid = self._info.uid;
                cmd.which = which;
                NetMgr.tcpSend(cmd);
            }
            ComponentUtil.getInstance().showConfirm("确认要将" + this.day[which - 1] + "分数清零吗？\n清零后成员列表的" + this.day[which - 1] + "分数和大赢家次数也将清零！", "温馨提示", "确定", okFunc, "取消")
        }
        /**更新清楚数据*/
        private updateWinPoint(evt: uniLib.ZqEvent): void {
            let vo = evt.param as Cmd.CleanMemberWinPointMatchGroupCmd_CS;
            this._memberinfo.scores[vo.which - 1] = 0;
            this._memberinfo.roomNbrs[vo.which - 1] = 0;
            this._memberinfo.winNums[vo.which - 1] = 0;
            this.updatePoint();
        }
        /**点每日输赢更新数据 */
        private updateView(): void {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
            this.updatePoint();
        }
        /**更新清楚数据视图*/
        private updatePoint(): void {
            this._scoreText.text = "战绩:" + this._memberinfo.scores[this._clubDayChose - 1];
            this._roomText.text = "房间数:" + this._memberinfo.roomNbrs[this._clubDayChose - 1];
            this._bigWinText.text = "大赢家次数:" + this._memberinfo.winNums[this._clubDayChose - 1];
        }
        /**接收数据 */
        public showData(evt: uniLib.ZqEvent): void {
            var vo = evt.param as Cmd.GetGameDataHistoryForMatchCmd_S;
            this._headImg.source = vo.userInfo.headurl;
            this._nameText.text = vo.userInfo.nickname;
            this._uidText.text = vo.userInfo.uid + "";
            this._remarksText.text = vo.userInfo.remark ? vo.userInfo.remark : "";
            if (vo.userInfo.partner) {
                this._belongText.text = "归属人：" + vo.userInfo.partner.nickname;
                this._belongText.visible = true;
            } else {
                this._belongText.visible = false;
            }
            if (vo.userStatisticInfo) {
                this._memberinfo = vo.userStatisticInfo;
                this.updatePoint()
            }
            if (vo.typ) {
                this.addListen();
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                this._totalPage = vo.maxPage;
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tishiText.visible = true;
                    if (this._dayChose != this._clubDayChose) {
                        this._dayChose = this._clubDayChose;
                        this._AllRecordArr = [];
                        if (this._listArr) {
                            if (Array.isArray(this._listArr.source)) {
                                this._listArr.removeAll();
                            }
                            this._listArr.replaceAll(this._AllRecordArr);
                        }
                    }
                } else {
                    this._tishiText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
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
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._AllRecordArr);
                this._list.dataProvider = this._listArr;
            } else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._AllRecordArr);
                if (this._curPage == 1) {
                    this._listArr.refresh();
                }
            }
        }
        /**单独加 */
        private addListen(): void {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        }
        /**获取战绩消息 */
        public getData(): void {
            if (this._clubDayChose == this._dayChose) {
                ClubSendMgr.getGameDataHistoryToUId(ClubData.getInstance().matchid, this._info.uid, this._curPage, ClubConst1.MATCH_HISTORY_FOR_UID, this._clubDayChose);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            } else {
                ClubSendMgr.getGameDataHistoryToUId(ClubData.getInstance().matchid, this._info.uid, 1, ClubConst1.MATCH_HISTORY_FOR_UID, this._clubDayChose);
            }
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
    }

    /**成员战绩 */
    export class ClubMemberInfoItemPanel extends eui.ItemRenderer {
        /** 时间*/
        private _timeText: eui.Label;
        /**房间信息*/
        private _roomTxt: eui.Label;
        /** 分数*/
        private _gradeText: eui.Label;
        /** 详情按钮*/
        private _detailBtn: eui.WxButton;
        /** 战绩数据*/
        private _info: Cmd.GameHistory;

        constructor() {
            super();
            this.skinName = "ClubMemberInfoItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDetail, this);
        }
        protected dataChanged(): void {
            this._info = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this._info.timeStamp);
            this._roomTxt.text = "房间号：" + this._info.roomId + "\n" + this._info.gameName + " " + this._info.gameNbr + "局 " + this._info.userNbr + "人参与";
            this._gradeText.text = "" + this._info.userGameHistorys[0].integral;
        }
        /**查看详情 */
        private showDetail(): void {
            LobbyModuleMgr.getInstance().showRecordDetail(() => {
                ClubSendMgr.getGameDetailHistory(this._info.globalRoomId);
            });
            MJLobbyData.getInstance().globalRoomId = this._info.globalRoomId;
        }
    }
}