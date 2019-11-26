module club {
    /**
     * 匹配号管理
     */
    export class MatchManagePanel extends commonpanel.LobbyBaseEuiPanel {
        public static Instanc: MatchManagePanel;
        /**输入玩家账号 添加黑白名单 输入栏 */
        private uidEditableText: egret.TextField;
        /** 添加至白名单*/
        private addWhiteButton: eui.Button;
        /** 添加至黑名单*/
        private addBlackButton: eui.Button;
        /** 关闭按钮*/
        private closeButton: eui.Button;
        /**设置老友圈玩法 */
        private setting: eui.Button;
        /**刷新按钮 */
        private refrshBtn: eui.Button;
        /**选择俱乐部按钮 */
        private _choseClubBtn: eui.Button;
        /** 老友圈房间列表*/
        private matchList: eui.List;
        /**选择俱乐部号group */
        private _matchGroup: eui.Group;
        /**选择俱乐部号背景 */
        private _choseClubBg: eui.Image;
        /**选择俱乐部号Rect */
        private _choseRect: eui.Rect;
        /** 选择俱乐部号滑动区域*/
        private _matchScroller: eui.Scroller;
        /**导入按钮 */
        private _importBtn: eui.WxButton;
        /**清除战绩按钮 */
        private _deleteRecordBtn: eui.Button;
        /** 房间详情*/
        private detailsButton: eui.RadioButton;
        /** 成员列表*/
        private memberButton: eui.RadioButton;
        /** 战况查询*/
        private fightingButton: eui.RadioButton;
        /** 同桌限制*/
        private yelloListButton: eui.RadioButton;

        /**数据容器 */
        private matchListArray: eui.ArrayCollection;
        private fightingListArray: eui.ArrayCollection;
        private memeberListArray: eui.ArrayCollection;
        private yelloListArray: eui.ArrayCollection;
        private matchTableListArray: eui.ArrayCollection;

        /** 房间详情group*/
        private detailsGroup: eui.Group;
        /**当前游戏人数 */
        private gameMemberLabel: eui.Label;
        /**老友圈名称 */
        private matchName: eui.Label;
        /**房主名 */
        private ownerLabel: eui.Label;
        /**老友圈ID */
        private matchIdLabel: eui.Label;
        /** 已开房间数*/
        private waitMemberLabel: eui.Label;
        /**不限时 */
        private delTimeLabel: eui.Label;
        /** 暂停、恢复开房按钮 */
        private terminationButton: eui.Button;
        /** 解散老友圈按钮*/
        private dissolutionButton: eui.Button;
        /** 分享按钮 */
        private shareButton: eui.Button;
        /** 加入房间按钮*/
        private joinMatchButton: eui.Button;
        /**老友圈桌子 */
        private matchTableList: eui.List;
        /** 计时器按钮*/
        private timerButton: eui.Button;

        /**成员列表GROUP */
        private memberGroup: eui.Group;
        /**成员列表 */
        private memeberList: eui.List;
        /**输赢显示状态图 */
        private _dayTypeImg: eui.Image;
        private _dayTypeBg: eui.Image;
        private _dayTypeDownImg: eui.Image;
        /**输赢下拉框区域 */
        private _morewinloseGroup: eui.Group;
        /**输赢蒙版 */
        private _winloseRect: eui.Rect;
        /**今日输赢选项 */
        private _todaywin: eui.Image;
        /**昨日输赢选项 */
        private _yesterdaywin: eui.Image;
        /**前天输赢选项 */
        private _qianwin: eui.Image;
        /**输入框 */
        private _searchIdText: eui.EditableText;
        /**搜索ID按钮 */
        private _searchBtn: eui.Button;
        /** 搜索出来的数组*/
        private searchArray: Cmd.MatchGroupMemberInfo[];

        /** 战况查询group*/
        private fightingGroup: eui.Group;
        /**战绩列表 */
        private fightingList: eui.List;
        /**数据 */
        private _fightRecordArr: Array<Cmd.GameHistory>;
        /**今日开房 */
        private todaynum: eui.Label;
        /**昨日开房 */
        private yesterdaynum: eui.Label;
        /**7天开房 */
        private sevendaynum: eui.Label;
        /**30天开房 */
        private thirtydaynum: eui.Label;
        /**当前页数 */
        private _curPage: number = 0;
        /**总页数 */
        private _totalPage: number;
        /**当前俱乐部matchid */
        private _matchId: number;
        /** 选择今日昨日前日输赢*/
        private _choseDayBtn: eui.Button;
        /**选择日期 */
        private _dayTypeGroup: eui.Group;
        /**选择蒙版 */
        private _choseRect1: eui.Rect;
        /** 今日输赢按钮*/
        private _todayBtn: eui.Button;
        /** 昨日输赢按钮*/
        private _yesterdayBtn: eui.Button;
        /** 前日输赢按钮*/
        private _qianBtn: eui.Button;
        /** 房间数*/
        private _roomText: eui.Label;
        /**战况查询 今日 昨日 前日选项 */
        private _clubDayChose: number;
        /**战况查询 记录当前数据记录的 日  */
        private _dayChose: number = 0;
        /**滑块 */
        private _scroll: eui.Scroller;
        /**提示字 */
        private _tipsText: eui.Label;
        /**同桌限制group */
        private yelloListGroup: eui.Group;
        /**同桌限制列表 */
        private yelloList: eui.List;

        /**房间数据 */
        private roomList: Cmd.MathGroupRoomInfo[];
        /**选择房间详情 */
        private _choseDetailBtn:eui.Button;
        /**房间详情 房间信息 */
        private _roomDetailGroup:eui.Group;
        /**选择蒙版 */
        private _roomDetailRect:eui.Rect;
        private _roomTableBtn:eui.Button;
        private _roomInfoBtn:eui.Button;
        /**数据 */
        private matchDetailList:eui.List;
        /**原 桌子信息 */
        private _tableScroller:eui.Scroller;
        /**新 桌子详情 */
        private _detailScroller:eui.Scroller;
        private _tipTxt:eui.Label;
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        constructor() {
            super();
            this.skinName = "MatchManageSkin";
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.addEventListener(ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.addEventListener(ClubConst.MATCH_HISTORY_FOR_MANAGE, this.showFightData, this);
            uniLib.Global.addEventListener(ClubConst.ReturnYellowList, this.initYelloList, this);
            uniLib.Global.addEventListener(ClubConst.RemarkPointMatchGroup, this.updateRemarkPoint, this);
            uniLib.Global.addEventListener(ClubConst.RemarkNickNameMatchGroup, this.updateRemarkNickName, this);
            uniLib.Global.addEventListener(ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);

        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.removeEventListener(ClubConst.MATCH_HISTORY_FOR_MANAGE, this.showFightData, this);
            uniLib.Global.removeEventListener(ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.removeEventListener(ClubConst.ReturnYellowList, this.initYelloList, this);
            uniLib.Global.removeEventListener(ClubConst.RemarkPointMatchGroup, this.updateRemarkPoint, this);
            uniLib.Global.removeEventListener(ClubConst.RemarkNickNameMatchGroup, this.updateRemarkNickName, this);
            uniLib.Global.removeEventListener(ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
        }

        protected initUI(): void {
            ClubData.getInstance().clubDayChose = 1;
            MatchManagePanel.Instanc = this;
            this.detailsGroup.visible = false;
            this.memberGroup.visible = false;
            this.fightingGroup.visible = false;
            this.yelloListGroup.visible = false;
            this.uidEditableText.restrict = "0-9";
            this.uidEditableText.inputType = egret.TextFieldInputType.TEL;

            this.matchList.itemRenderer = MatchRadioButton;
            this.fightingList.itemRenderer = MatchFightingItem;
            this.memeberList.itemRenderer = MatchMemberItem;
            this.yelloList.itemRenderer = MatchYelloItem;
            this.matchTableList.itemRenderer = MatchTableItem;
            this.matchDetailList.itemRenderer = MatchTableInfoItem;

            this._choseDetailBtn.skin["_detailTxt"].text = "房间详情";
            this._detailScroller.visible = false;
            this._tableScroller.visible = true;
            this._roomDetailGroup.visible = false;
            this.addListen();
        }

        /**更新俱乐部房间 */
        public updataMatchList() {
            if (!this.matchListArray) {
                this.matchListArray = new eui.ArrayCollection(this.matchIdList);
                this.matchList.dataProvider = this.matchListArray;
            } else {
                if (Array.isArray(this.matchListArray.source)) {
                    this.matchListArray.removeAll();
                }
                this.matchListArray.replaceAll(this.matchIdList);
            }
        }
        /** 更新成员列表*/
        public updataMemeberList() {
            if (!this.memeberListArray) {
                this.memeberListArray = new eui.ArrayCollection(this.member);
                this.memeberList.dataProvider = this.memeberListArray;
            } else {
                if (this.memeberListArray.source) {
                    this.memeberListArray.removeAll();
                }
                this.memeberListArray.replaceAll(this.member);
            }
        }

        /**把0分放后面 */
        private key = new Cmd.MatchGroupMemberInfo();
        /** 0数组*/
        private zeroArr: Cmd.MatchGroupMemberInfo[] = [];
        /** 0位置*/
        private zeroIndex: number[] = [];
        /**给成员列表排序 群主和管理员在最前面，接下去是输最多到输最少，然后赢最少赢最多，然后接下去才是0分的*/
        private sortMemberList(): void {
            let sortMemberList = this.member.concat();
            /**降序排序 */
            sortMemberList.sort(function (a, b) {
                return a.scores[ClubData.getInstance().clubDayChose - 1] - b.scores[ClubData.getInstance().clubDayChose - 1];
            })
            /**0放次后 */
            this.zeroArr = [];
            this.zeroIndex = [];
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].scores[ClubData.getInstance().clubDayChose - 1] == 0) {
                    this.zeroArr.push(sortMemberList[i]);
                    this.zeroIndex.push(i);
                }
            }
            this.zeroIndex.sort((a, b) => b - a);
            this.zeroIndex.forEach(element => {
                sortMemberList.splice(element, 1);
            });
            sortMemberList = sortMemberList.concat(this.zeroArr);

            /**黑名单和游客放最后 */
            this.zeroArr = [];
            this.zeroIndex = [];
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].type == ClubConst.CLUB_BLACK) {
                    this.zeroArr.push(sortMemberList[i]);
                    this.zeroIndex.push(i);
                }
            }
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].type == ClubConst.CLUB_TOURIST) {
                    this.zeroArr.push(sortMemberList[i]);
                    this.zeroIndex.push(i);
                }
            }
            this.zeroIndex.sort((a, b) => b - a);
            this.zeroIndex.forEach(element => {
                sortMemberList.splice(element, 1);
            });
            sortMemberList = sortMemberList.concat(this.zeroArr);

            /**把管理员放最前面 */
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].membertype == 2) {
                    this.key = null;
                    this.key = sortMemberList[i];
                    sortMemberList.splice(i, 1);
                    sortMemberList.unshift(this.key);
                }
            }

            /**把房主放最前面 */
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].membertype == 1) {
                    this.key = null;
                    this.key = sortMemberList[i];
                    sortMemberList.splice(i, 1);
                    sortMemberList.unshift(this.key);
                }
            }

            this.member = sortMemberList;
        }
        /**更新同桌限制 */
        private updateYelloList() {
            if (!this.yelloListArray) {
                this.yelloListArray = new eui.ArrayCollection(this.yelloIndoList);
                this.yelloList.dataProvider = this.yelloListArray;
            } else {
                if (Array.isArray(this.yelloListArray.source)) {
                    this.yelloListArray.removeAll();
                }
                this.yelloListArray.replaceAll(this.yelloIndoList);
            }
        }

        /**更新桌子 */
        public updataTableList() {
            this.roomList.forEach((f) => {
                if (!Array.isArray(f.list)) {
                    f.list = [];
                }
            });
            if (!this.matchTableListArray) {
                this.matchTableListArray = new eui.ArrayCollection(this.roomList);
                this.matchTableList.dataProvider = this.matchTableListArray;
                this.matchDetailList.dataProvider = this.matchTableListArray;
            } else {
                if (Array.isArray(this.matchTableListArray.source)) {
                    this.matchTableListArray.removeAll();
                }
                this.matchTableListArray.replaceAll(this.roomList);
            }
        }
        /**更新房间详情 */
        public updataDetails(curMath: Cmd.MathGroup) {
            if (!curMath)
                return;
            let state = (curMath && curMath.state == 1) ? 1 : 0;
            this.terminationButton.currentState = state == 1 ? "down" : "up";
            this.ownerLabel.text = "房主名:" + (curMath ? curMath.ownername : "");
            this.gameMemberLabel.text = "当前游戏人数：" + (curMath ? curMath.gameingUserNum : "");
            this.matchIdLabel.text = "老友圈:" + (curMath ? curMath.matchId : "");
            if (curMath.matchName) {
                this.matchName.visible = true;
                this.matchName.text = "老友圈名:" + curMath.matchName;
            } else {
                this.matchName.visible = false;
            }
            this.waitMemberLabel.text = "已开房间数：" + (curMath ? curMath.curRoomNbr : "");
            this.delTimeLabel.text = "不限时"
            this.roomList = (curMath && curMath.roomList instanceof Array) ? curMath.roomList : [];
            this.updataTableList();
            let curMatchId = (curMath ? curMath.matchId : null)
            for (let i: number = 0; i < this.matchIdList.length; i++) {
                if (this.matchIdList[i] == curMatchId) {
                    this.matchList.selectedIndex = i;
                    break;
                }
            }
            this.shareInfo = curMath ? curMath.shareInfo : null;
        }

        private matchIdList: number[] = [];
        private waitList: Cmd.MatchGroupMemberInfo[] = new Array<Cmd.MatchGroupMemberInfo>();
        public initReturnMatchGroup(evt: uniLib.ZqEvent): void {
            let data = evt.param as Cmd.ReturnMatchGroupCmd_S
            if (!Array.isArray(data.matchIdList)) {
                uniLib.PopUpMgr.removePopUp(this);
                return;
            }
            ClubData.getInstance().isClubOwner = data.curMath.ownerid == uniLib.UserInfo.uid ? true : false;
            ClubData.getInstance().matchid = data.curMath.matchId;
            ClubData.getInstance().suspendTimer = data.curMath.pauseTimer ? data.curMath.pauseTimer : null;
            ClubData.getInstance().renewTimer = data.curMath.restoreTimer ? data.curMath.restoreTimer : null;
            if (uniLib.UserInfo.uid == data.curMath.ownerid) {
                this._deleteRecordBtn.visible = true;
            } else {
                this._deleteRecordBtn.visible = false;
            }
            this.waitList = [];
            this.matchIdList = data && data.matchIdList && data.matchIdList instanceof Array ? data.matchIdList : [];
            this.waitList = data != null && data.curMath != null && data.curMath.waitUserList != null && data.curMath.waitUserList instanceof Array && data.curMath.waitUserList.length > 0 ? data.curMath.waitUserList : [];
            this._choseClubBtn.skin["_matchIdText"].text = data.curMath.matchId;
            this._choseClubBtn.currentState = "up";
            if (data.matchIdList.length < 10) {
                this._choseClubBg.height = 2 + 49 * data.matchIdList.length;
                this._matchScroller.height = 49 * data.matchIdList.length;
            } else {
                this._choseClubBg.height = 456;
                this._matchScroller.height = 454;
            }
            this._matchGroup.visible = false;
            this.updataMatchList();
            this.updataDetails((data ? data.curMath : null));
            if (data && data.matchIdList && data.matchIdList.length > 0) {
                switch (ClubData.getInstance().clubChoice) {
                    case 1: this.detailsButton.selected = true; break;
                    case 2: this.memberButton.selected = true;
                        let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                        cmd.matchId = this.selectMatchId;
                        NetMgr.tcpSend(cmd); break;
                    case 4: this.fightingButton.selected = true; break;
                }
                this.switchWindow();
            }
            this.updataButtonEnabled();
        }
        /**更新按钮视图 */
        public updataButtonEnabled() {
            let bool = this.matchIdList && this.matchIdList.length > 0 ? true : false;
            this.detailsButton.enabled = this.memberButton.enabled
                = this.fightingButton.enabled = this.joinMatchButton.enabled = this.yelloListButton.enabled = bool;
            if (bool == false) {
                this.detailsGroup.visible = this.memberGroup.visible
                    = this.fightingGroup.visible = this.yelloListGroup.visible = bool;
            }
        }
        private member: Cmd.MatchGroupMemberInfo[];
        private sharingMember: Cmd.MatchGroupMemberInfo[];//保存前6名以分享
        public initMemberList(evt: uniLib.ZqEvent) {
            var member = evt.param as Cmd.ReturnMemberInfoMatchGroupCmd_S
            member.whitelist = (member.whitelist && member.whitelist instanceof Array) ? member.whitelist : [];
            member.blacklist = (member.blacklist && member.blacklist instanceof Array) ? member.blacklist : [];
            member.guestlist = (member.guestlist && member.guestlist instanceof Array) ? member.guestlist : [];
            for (let item of member.whitelist) {
                item.type = 1;
            }
            for (let item of member.blacklist) {
                item.type = 2;
            }
            for (let item of member.guestlist) {
                item.type = 0;
            }
            this.member = member.whitelist.concat(member.blacklist);
            this.member = this.member.concat(member.guestlist);
            this.sortMemberList();
            this.updataMemeberList();
        }
        /**修改备注分数 成功更新成员列表数据 */
        private updateRemarkPoint(evt: uniLib.ZqEvent): void {
            var pointData = evt.param as Cmd.RemarkPointMatchGroupCmd_CS;
            this.member.forEach(element => {
                if (element.uid == pointData.targetUid) {
                    element.remarkPoints[pointData.which] = pointData.point;
                }
            });
            this.updataMemeberList();
        }
        /**修改备注昵称 成功更新成员列表数据 */
        private updateRemarkNickName(evt: uniLib.ZqEvent): void {
            var nickNameData = evt.param as Cmd.RemarkNickNameMatchGroupCmd_CS;
            this.member.forEach(element => {
                if (element.uid == nickNameData.targetUid) {
                    element.remark = nickNameData.remark;
                }
            });
            this.updataMemeberList();

        }
        /**更新清楚数据视图*/
        private updateWinPoint(evt: uniLib.ZqEvent): void {
            let vo = evt.param as Cmd.CleanMemberWinPointMatchGroupCmd_CS;
            this.member.forEach(element => {
                if (element.uid == vo.targetUid) {
                    element.scores[vo.which - 1] = 0;
                    element.winNums[vo.which - 1] = 0;
                }
            });
            this.updataMemeberList();
        }
        /**黄名单列表 */
        private yelloIndoList: Cmd.YellowMemberInfo[];
        public initYelloList(evt: uniLib.ZqEvent) {
            let yelloList = evt.param as Cmd.ReturnYellowMemberInfoMatchGroupCmd_S
            yelloList.list = (yelloList.list && yelloList.list instanceof Array) ? yelloList.list : [];
            this.yelloIndoList = yelloList.list;
            this.updateYelloList();
        }
        private gameHistroys: Cmd.GameHistory[];
        public initHistory(history: Cmd.GetGameDataHistoryCmd_S) {
            if (!history || history.matchId != this.selectMatchId) {
                return;
            }
        }
        private switchWindow() {
            this.detailsGroup.visible = this.memberGroup.visible = this.fightingGroup.visible = this.yelloListGroup.visible = false;
            this.setting.visible = true;
            if (this.detailsButton.selected) {
                this.detailsGroup.visible = true;
            }
            else if (this.memberButton.selected) {
                this.memberGroup.visible = true;
            }
            else if (this.fightingButton.selected) {
                this.fightingGroup.visible = true;
            } else if (this.yelloListButton.selected) {
                this.yelloListGroup.visible = true;
                this.setting.visible = false;
            }
        }
        /**
         * 显示输赢状态
         */
        private switchDayType() {
            this._dayTypeImg.source = "club_winlose" + ClubData.getInstance().clubDayChose;
            this._morewinloseGroup.visible = false;
        }
        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.detailsButton
                || e.target == this.memberButton
                || e.target == this.fightingButton
                || e.target == this.yelloListButton) {
                (<eui.RadioButton>e.target).selected = true;
                this.switchWindow();
                if(e.target == this.detailsButton){
                    this._choseDetailBtn.skin["_detailTxt"].text = "房间详情";
                    this._detailScroller.visible = false;
                    this._tableScroller.visible = true;
                    this._roomDetailGroup.visible = false;
                    this._tipTxt.visible = true;
                }
                if (e.target == this.memberButton) {
                    let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this.selectMatchId;
                    NetMgr.tcpSend(cmd);
                }
                else if (e.target == this.yelloListButton) {
                    let self = this;
                    let reqYelloList: Cmd.RequestYellowMemberInfoMatchGroupCmd_C = new Cmd.RequestYellowMemberInfoMatchGroupCmd_C();
                    reqYelloList.matchId = this.selectMatchId;
                    NetMgr.tcpSend(reqYelloList);
                }
                else if (e.target == this.fightingButton) {
                    ClubSendMgr.getGameDataHistoryForMatch(ClubData.getInstance().matchid, 1, 1, ClubConst1.MATCH_HISTORY_FOR_MANAGE);
                    this._dayChose = 0;
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日战绩";
                }
            }
            else if (e.target == this.closeButton) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.terminationButton) {
                let self = this;
                let okFunc = function () {
                    let cmd = new Cmd.OperateMatchGroupCmd_C();
                    if (self.terminationButton.currentState == "up")
                        cmd.state = 1;
                    else
                        cmd.state = 0;
                    cmd.matchId = self.selectMatchId;
                    NetMgr.tcpSend(cmd)
                }
                let info = "";
                if (this.terminationButton.currentState == "up") {
                    info = "您确定要暂停该老友圈吗？"
                }
                else {
                    info = "您确定要恢复该老友圈吗？"
                }
                ComponentUtil.getInstance().showConfirm(info, "温馨提示", "确定", okFunc, "取消")
                return;
            }
            else if (e.target == this.dissolutionButton) {
                let self = this;
                let okFunc = function () {
                    let MatchId = self.selectMatchId;
                    if (MatchId == ClubData.getInstance().clubmatchid) {
                        ClubModuleMgr.getInstance().removeClubDeskPanel();
                    }
                    let cmd = new Cmd.RequestDeleteMatchGroupCmd_C();
                    cmd.matchId = self.selectMatchId;
                    NetMgr.tcpSend(cmd);
                    uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
                }
                ComponentUtil.getInstance().showConfirm("您确定要解散该老友圈吗？", "温馨提示", "确定", okFunc, "取消")
            }
            else if (e.target == this.shareButton) {
                this.onShareTap();
            }
            else if (e.target == this.addWhiteButton
                || e.target == this.addBlackButton) {
                let text = this.uidEditableText.text;
                let uid = Number(text);
                if (uid == NaN || !uid) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家账号");
                    return;
                }
                let cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                let reply = Number((<eui.Label>e.target).name);
                cmd.reply = e.target == this.addWhiteButton ? 2 : 3;
                cmd.uid = uid;
                cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.joinMatchButton) {
                var req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                req.roomId = this.matchIdList[this.matchList.selectedIndex];
                NetMgr.tcpSend(req);
                ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            else if (e.target == this.setting) {
                let req = new Cmd.RequestChangeMatchGroupCmd_C();
                req.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this.refrshBtn) {
                this.onMatchListTap(null);
            }
            else if (e.target == this._dayTypeBg || e.target == this._dayTypeDownImg || e.target == this._dayTypeImg) {
                this._morewinloseGroup.visible = true;
            }
            else if (e.target == this._todaywin || e.target == this._yesterdaywin || e.target == this._qianwin || e.target == this._winloseRect) {
                if (e.target == this._todaywin) {
                    ClubData.getInstance().clubDayChose = 1;
                }
                else if (e.target == this._yesterdaywin) {
                    ClubData.getInstance().clubDayChose = 2;
                }
                else if (e.target == this._qianwin) {
                    ClubData.getInstance().clubDayChose = 3;
                }
                this.switchDayType();
                this.sortMemberList();
                this.updataMemeberList();
            }
            else if (e.target == this._choseClubBtn || e.target == this._choseRect) {
                if (this._choseClubBtn.currentState == "up") {
                    this._choseClubBtn.currentState = "down";
                    this._matchGroup.visible = true;
                } else {
                    this._choseClubBtn.currentState = "up";
                    this._matchGroup.visible = false;
                }
            } else if (e.target == this._importBtn) {
                let req = new Cmd.GetCanImportMemberListMatchGroupCmd_CS();
                req.matchId = ClubData.getInstance().matchid;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this._deleteRecordBtn) {
                if (this.terminationButton.currentState == "up") {
                    uniLib.TipsUtils.showConfirm("暂停开房后可清除开房数！", "温馨提示", "确定", null);
                }
                else {
                    uniLib.TipsUtils.showConfirm("确定要将已开房数清零吗？", "", "确定", () => {
                        let req = new Cmd.ClearRecordMatchGroupCmd_CS();
                        req.matchId = ClubData.getInstance().matchid;
                        NetMgr.tcpSend(req);
                    }, "取消", null);
                }
            }
            else if (e.target == this._searchBtn) {
                if (this._searchIdText.text.length < 8) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家账号");
                    return;
                }
                let uidText = this._searchIdText.text;
                let ClubMemberList = ClubData.getInstance().ClubMemberList;
                if (!Array.isArray(ClubMemberList)) {
                    return;
                }
                this.searchArray = [];
                this.searchArray = ClubMemberList.filter(function (a) {
                    return a.uid.toString().indexOf(uidText) != -1;
                });
                if (this.searchArray.length != 0) {
                    ClubModuleMgr.getInstance().showClubMemberInfoPanel(this.searchArray[0]);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("本老友圈不存在该玩家");
                }
            }
            else if (e.target == this.timerButton) {
                ClubModuleMgr.getInstance().showClubMemberTimerPanel();
            }
            else if (e.target == this._choseDayBtn) {
                this._choseDayBtn.currentState = "down";
                this._dayTypeGroup.visible = true;
            }
            else if (e.target == this._todayBtn) {
                this._clubDayChose = 1;
                this._choseDayBtn.skin["_dayTypeText"].text = "今日战绩";
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
                this.updateView();
            }
            else if (e.target == this._yesterdayBtn) {
                this._clubDayChose = 2;
                this._choseDayBtn.skin["_dayTypeText"].text = "昨日战绩";
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
                this.updateView();
            }
            else if (e.target == this._qianBtn) {
                this._clubDayChose = 3;
                this._choseDayBtn.skin["_dayTypeText"].text = "前日战绩";
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
                this.updateView();
            }
            else if (e.target == this._choseRect1) {
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
            }
            else if(e.target == this._choseDetailBtn){
            this._choseDetailBtn.currentState = "down";
            this._roomDetailGroup.visible = true;
        }
        else if(e.target == this._roomDetailRect){
            this._choseDetailBtn.currentState = "up";
            this._roomDetailGroup.visible = false;
        }
        else if(e.target == this._roomTableBtn){
             this._choseDetailBtn.skin["_detailTxt"].text = "房间详情";
             this._roomDetailGroup.visible = false;
             this._detailScroller.visible = false;
             this._tableScroller.visible = true;
             this._tipTxt.visible = true;
        }
        else if(e.target == this._roomInfoBtn){
            this._choseDetailBtn.skin["_detailTxt"].text = "房间信息";
            this._roomDetailGroup.visible = false;
            this._detailScroller.visible = true;
            this._tableScroller.visible = false;
            this._tipTxt.visible = false;
        }
        }  /**接收数据 */
        public showFightData(evt: uniLib.ZqEvent): void {
            var vo = evt.param as Cmd.GetGameDataHistoryForMatchCmd_S;
            if (vo.typ) {
                this._matchId = vo.matchId;
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                if (vo.matchStatisticInfo && vo.matchStatisticInfo.openNbrs) {
                    this.todaynum.text = "今日：" + vo.matchStatisticInfo.openNbrs[0];
                    this.yesterdaynum.text = "昨日：" + vo.matchStatisticInfo.openNbrs[1];
                    this.sevendaynum.text = "七日：" + vo.matchStatisticInfo.openNbrs[2];
                    this.thirtydaynum.text = "30日：" + vo.matchStatisticInfo.openNbrs[3];
                }
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tipsText.visible = true;
                    if (this._dayChose != this._clubDayChose) {
                        this._dayChose = this._clubDayChose;
                        this._fightRecordArr = [];
                        if (this.fightingListArray) {
                            if (Array.isArray(this.fightingListArray.source)) {
                                this.fightingListArray.removeAll();
                            }
                            this.fightingListArray.replaceAll(this._fightRecordArr);
                        }
                    }
                } else {
                    this._tipsText.visible = false;
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
                this._fightRecordArr = this._fightRecordArr.concat(arr);
            } else {
                this._dayChose = this._clubDayChose;
                this._fightRecordArr = [];
                this._fightRecordArr = this._fightRecordArr.concat(arr);
            }
            if (!this.fightingListArray) {
                this.fightingListArray = new eui.ArrayCollection(this._fightRecordArr);
                this.fightingList.dataProvider = this.fightingListArray;
            } else {
                if (Array.isArray(this.fightingListArray.source)) {
                    this.fightingListArray.removeAll();
                }
                this.fightingListArray.replaceAll(this._fightRecordArr);
                if (this._curPage == 1) {
                    this.fightingListArray.refresh();
                }
            }
        }
        /**点每日输赢更新数据 */
        private updateView(): void {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
        }

        /**获取战绩消息 */
        public getData(): void {
            if (this._clubDayChose == this._dayChose) {
                ClubSendMgr.getGameDataHistoryForMatch(ClubData.getInstance().matchid, this._curPage, this._clubDayChose, ClubConst1.MATCH_HISTORY_FOR_MANAGE);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            } else {
                ClubSendMgr.getGameDataHistoryForMatch(ClubData.getInstance().matchid, 1, this._clubDayChose, ClubConst1.MATCH_HISTORY_FOR_MANAGE);
            }
        }
        /**单独加 */
        private addListen(): void {
            this._scroll.addEventListener(egret.Event.CHANGE, this.checkTop, this);
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

        public get selectMatchId() {
            return this.matchIdList[this.matchList.selectedIndex];
        }
        /**老友圈选项 选择老友圈 */
        private onMatchListTap(e: eui.ItemTapEvent) {
            let cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }
        /**房间详情 点击桌子 */
        private onTableListTap(e: eui.ItemTapEvent) {
            ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            let item = this.matchTableList.selectedItem as Cmd.MathGroupRoomInfo;
            let cmd = new Cmd.ActiveDetailRoomCmd_C();
            cmd.roomId = item.roomId;
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }

        //截图分享
        private onShare(): void {
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            var tx: egret.Bitmap = new egret.Bitmap(uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(this.memberGroup.x, this.memberGroup.y, this.memberGroup.width, this.memberGroup.height), 0.6));
            vo.shareImageData = uniLib.DisplayUtils.catchScreen(tx, new egret.Rectangle(this.memberGroup.x, this.memberGroup.y, this.memberGroup.width, this.memberGroup.height));
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        }
        private shareInfo: Cmd.ShareInfo;
        private onShareTap() {
            let codeId = this.selectMatchId;
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                var nick: string = uniLib.UserInfo.nickName;
                if (nick.length > 8) {
                    nick = nick.slice(0, 8);
                }
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wq.laoyouwan.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            } else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "老友圈") : "";
            if (!uniLib.Global.isWxGame()) {
                vo.roomId = JSON.stringify({ "matchId": codeId });
            } else {
                vo.shareType = Cmd.ShareType.enterRoom;
                vo.wgShareData = JSON.stringify({ "roomId": codeId });
            }
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        }

    }
}

class MatchTableInfoItem extends eui.ItemRenderer{
    /**index编号 */
    private _tableNoText: eui.Label;
    /**桌号 */
    private _tableIdText: eui.Label;
    /**时间 */
    private _timeText: eui.Label;
    /**战绩列表 */
    private nameandscore: eui.List;
    /**局数 */
    private _tableNum:eui.Label;
    private _info: Cmd.MathGroupRoomInfo;
    constructor(){
        super();
        this.skinName = "MatchTableInfoItemSkin";
    }

    protected dataChanged(): void {
        this._info = this.data;
        this._tableNoText.text = String(this.itemIndex+1);
        this._tableIdText.text = "桌号:"+this._info.roomId;
        if(!this._info.curGameNbr){
            this._tableNum.text = "准备中";
        }
        else{
            this._tableNum.text = "局数："+this._info.curGameNbr+"/"+this._info.gameNbr;
        }
        this._timeText.text = LobbyUtils.changeTimeToStr(this._info.beginTime);
        let item = this._info.list;
        this.nameandscore.itemRenderer = MatchInfotem;
        this.nameandscore.dataProvider = new eui.ArrayCollection(item);
    }
}

/**玩家战绩单个信息 */
class MatchInfotem extends eui.ItemRenderer {
    /** 昵称*/
    private names: eui.Label;
    /** 分数*/
    private score: eui.Label;
    private info: Cmd.MatchGroupMemberInfo;
    constructor() {
        super();
        this.skinName = "MatchFightingNSSkin";
    }
    protected dataChanged(): void {
        this.info = this.data;
        this.names.text = this.info.nickname;
        if (this.info.score != null) {
            this.score.text = this.info.score + "";
            if (this.info.score < 0) {
                this.score.textColor = 0x0c7113;
            }
        }
    }
}

