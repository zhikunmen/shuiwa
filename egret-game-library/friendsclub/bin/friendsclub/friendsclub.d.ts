declare module friendsclub {
    class ClubNewBoxItemPanel extends eui.ItemRenderer {
        private _closeBtn;
        private _createBtn;
        private _switchBtn;
        private _setBtn;
        private _detailsBtn;
        private _msgTxt;
        private _gameTypeTxt;
        private _personNumTxt;
        private _gameIconImg;
        info: Cmd.FloorInfo;
        constructor();
        addListener(): void;
        removeListener(): void;
        protected childrenCreated(): void;
        protected dataChanged(): void;
        private onClickTap(e);
        /**包厢详情 */
        private clubFloordetails;
        private showClubFloordetails();
        private removeClubFloordetails();
    }
}
declare module friendsclub {
    class ClubConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_FRIENDSCLUB: string;
        /** */
        static ActiveDetailRoom: string;
        /**历史匹配记录 */
        static HistoryMatchIdList: string;
        /**匹配号数据 */
        static ReturnMatchGroup: string;
        /**匹配号管理数据 */
        static ReturnMatchGroupManage: string;
        /**俱乐部广播当前桌子最新状况事件 */
        static LatestMatchRoom: string;
        /**白名单消息列表 */
        static JoinMemberListMatch: string;
        /**申请进入房间 */
        static NotifyImportNoteCmd: string;
        /**返回亲友圈公告信息 */
        static CLUB_NOTICE: string;
        /**返回黑白名单 */
        static MemberInfoMatchGroup: string;
        /**大厅查找玩家信息*/
        static UserInfoSearchLobby: string;
        /**返回黄名单列表 */
        static ReturnYellowList: string;
        /**离开匹配组返回  */
        static LEAVE_MATCHGROUP2: string;
        /**包厢管理消息列表 */
        static JoinMemberListManage: string;
    }
}
declare module Cmd {
    function clubDispatch(cmd: string, obj?: any, bubbles?: boolean): void;
    function OnActiveDetailRoomCmd_S(rev: Cmd.ActiveDetailRoomCmd_S): void;
    /**
     * 历史匹配组列表
     */
    function OnHistoryMatchIdListMatchGroupCmd_S(rev: Cmd.HistoryMatchIdListMatchGroupCmd_S): void;
    /**返回自己的所有匹配号 */
    function OnReturnMatchGroupCmd_S(rev: Cmd.ReturnMatchGroupCmd_S): void;
    /**
     * 广播当前桌子最新状况
     */
    function OnLatestMatchRoomInfoGroupCmd_Brd(rev: Cmd.LatestMatchRoomInfoGroupCmd_Brd): void;
    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    function OnJoinMemberListMatchGroupCmd_S(rev: Cmd.JoinMemberListMatchGroupCmd_S): void;
    /**进房审核 */
    function OnNotifyImportNoteCmd_S(rev: Cmd.NotifyImportNoteCmd_S): void;
    /**返回公告信息 */
    function OnClubNoticeMatchGroupCmd_CS(rev: Cmd.ClubNoticeMatchGroupCmd_CS): void;
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnMemberInfoMatchGroupCmd_S): void;
    /**返回查找个人信息 */
    function OnUserInfoSearchLobbyCmd_S(rev: Cmd.UserInfoSearchLobbyCmd_S): void;
    /**
     * 获取黄名单列表
     */
    function OnReturnYellowMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnYellowMemberInfoMatchGroupCmd_S): void;
    /**
     * 改变匹配号属性
     */
    /**
     * 离开匹配组返回
     */
    function OnLeaveMatchGroup2Cmd_S(rev: Cmd.LeaveMatchGroup2Cmd_S): void;
    function OnRequestJoinMemberMatchGroupCmd_S(rev: Cmd.RequestJoinMemberMatchGroupCmd_S): void;
}
declare module friendsclub {
    class ClubModuleMgr {
        private static _instance;
        private _clubDeskPanel;
        private _clubManagePanel;
        private _clubNewBoxPanel;
        private _clubPlayerListPanel;
        private _isShowClub;
        static getInstance(): ClubModuleMgr;
        /**亲友圈列表界面 */
        showAllClubListPanel(callBack: Function): void;
        /**亲友圈管理员界面单个房间详情 */
        showActiveDetailRoomtPanel(callBack: Function): void;
        /**删除亲友圈管理员界面单个房间详情 */
        removeActiveDetailRoomtPanel(): void;
        /**亲友圈玩家列表功能 */
        showClubPlayerListPanel(callBack: Function): void;
        removeClubPlayerListPanel(): void;
        /**亲友圈桌面界面 */
        showClubDeskPanel(callBack: Function): void;
        /**移除亲友圈桌面 */
        removeClubDeskPanel(): void;
        /**亲友圈公告界面 */
        showClubNoticePanel(): void;
        /**玩家第一次进入房间加备注 */
        shoClubEnterRemarks(callBack: Function): void;
        /**创建亲友圈房间面板 */
        showCreateClubPanel(game?: Cmd.ChangeMatchGroupCmd_S): void;
        /**亲友圈管理界面 */
        showClubManagePanel(callBack: Function): void;
        closeClubManagePanel(): void;
        removeClubManagePanel(): void;
        /**亲友圈左侧包厢功能 */
        ClubNewBoxPanel(data: Cmd.MathGroup): void;
        closeClubNewBoxPanel(): void;
        removeClubNewBoxPanel(): void;
        /**显示亲友圈查看个人信息面板 */
        showClubUserInfoPanel(callBack: Function): void;
        /**
         * 俱乐部创建、修改设置页面
         */
        showCreateMatchSetPanel(data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S): void;
    }
}
declare module friendsclub {
    class ClubSendMgr {
        /**
         * 请求匹配号信息
         * */
        static requestMatchData(isClub?: number): void;
        /**
         * 房主请求亲友圈信息
         */
        static requestRequestMatchGroupCmd(matchId: number): void;
    }
}
declare class ClubUIEventConst {
    static JOIN_CLUBROOM: string;
}
/**
 * 已创建活跃房间面板
 */
declare module friendsclub {
    class ActiveRoomInformationPanel extends commonpanel.LobbyBaseEuiPanel {
        private _activeRoomListOb;
        private playerGroup;
        private topTableNumber;
        private itemList;
        /**取消按钮 */
        private cancelBtn;
        /**解散房间按钮 */
        private dissolveBtn;
        /**确认按钮 */
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        destory(): void;
        initData(evt: uniLib.ZqEvent): void;
        private btnClick(e);
    }
}
declare module friendsclub {
    class ActiveRoomListItem extends eui.Component {
        private eliminate;
        private playerNameLaber;
        private playerName;
        private playerScoreLaber;
        private playerScore;
        private _data;
        private _roomId;
        constructor();
        protected childrenCreated(): void;
        setData(data: Cmd.MatchGroupMemberInfo, roomId: number): void;
        private eliminatePlayer(e);
        setEliminateVisible(show: boolean): void;
        destory(): void;
    }
}
declare module friendsclub {
    /**亲友圈所有房间面板 */
    class ClubAllBoxPanel extends commonpanel.LobbyBaseEuiPanel {
        private msgText;
        private boxList;
        private closeBtn;
        private joinBtn;
        private createBtn;
        private _clubList;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setData(evt: uniLib.ZqEvent): void;
        private onClickTap(e);
    }
}
declare module friendsclub {
    /**
    * 单个亲友圈选项
    */
    class ClubBoxItem extends eui.ItemRenderer {
        private head;
        private bg;
        private roomNameText;
        private idText;
        private nameText;
        private boxNameText;
        private info;
        private startRoomText;
        private waitRoomText;
        private numberText;
        private junumberText;
        private inBtn;
        private outBtn;
        constructor();
        addListener(): void;
        removeListener(): void;
        destory(): void;
        protected dataChanged(): void;
        private onClickTap(e);
        /**
        * 红点
        */
        addRedPoint(): void;
        removeRedPoint(): void;
        /**名字长度截取，避免长度过长造成溢出显示或重叠 */
        private getStrRealLength(str);
    }
}
declare module friendsclub {
    /**
     * 亲友圈桌子面板
     */
    class ClubDeskPanel extends commonpanel.LobbyBaseEuiPanel {
        private deskList;
        private closeBtn;
        private swtichBtn;
        private createBtn;
        private boxManageBtn;
        private fastEnterBtn;
        private shareBtn;
        private memberListBtn;
        private applyListBtn;
        private noticeBtn;
        private queryFightingBtn;
        private play;
        private gameplay;
        private title;
        private switchFloorBtn;
        private floorUpBtn;
        private floorDownBtn;
        private floorNumTxt;
        private personNum;
        private zaixian;
        private gameTypeTxt;
        private gameIconImg;
        private detailsBtn;
        private detailsBtn0;
        private bg;
        /**跑马灯 */
        private _clubMsgMcPanel;
        private _deskList;
        private _ztimer;
        private _curMath;
        private _scroll;
        /**桌子信息*/
        private _dataArr;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        private destroyTimer();
        /**图跟着移动 */
        private movelistmove(e);
        setDate(evt: uniLib.ZqEvent): void;
        private timerFunc(event);
        /**显示红点 */
        private joinMember;
        showRedPoint(evt: uniLib.ZqEvent): void;
        /**
          * 红点
          */
        addRedPoint(): void;
        removeRedPoint(): void;
        private copyid(e);
        private onClickTap(e);
        /**包厢详情 */
        private clubFloordetails;
        private showClubFloordetails();
        private removeClubFloordetails();
        private shareInfo;
        private onShareTap();
        private itemTap(evt);
        private clubRoomdetails;
        private showClubRoomdetails();
        private removeClubRoomdetails();
        private removeTimer();
    }
}
declare module friendsclub {
    /**
   *第一次进入亲友圈的玩家检验，加备注
   */
    class ClubEnterRemarks extends commonpanel.LobbyBaseEuiPanel {
        private clubText;
        private remarksText;
        private roomId;
        private lobbyId;
        private preBestRoomId;
        private yesBtn;
        constructor();
        protected addEvent(): void;
        protected removeEvent(): void;
        setDate(evt: uniLib.ZqEvent): void;
        private onClickTap(e);
    }
}
declare module friendsclub {
    /**楼层房间信息 */
    class ClubFloordetails extends commonpanel.LobbyBaseEuiPanel {
        private gameText;
        private pnumberText;
        private gnumberText;
        private playText;
        private closeBtn;
        private enterRoomBtn;
        private info;
        private deskInfo;
        private headList;
        constructor();
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setDate(date: Cmd.FloorInfo): void;
        setdeskDate(date: Cmd.MathGroup): void;
        private onClickTap(e);
    }
}
declare module friendsclub {
    /**
     * 每个亲友圈中的桌子
     */
    class ClubItemDesk extends eui.ItemRenderer {
        private deskGroup;
        private personTxet;
        private head;
        private headbg1;
        private headbg2;
        private headbg3;
        private headbg4;
        private kuang1;
        private kuang2;
        private kuang3;
        private kuang4;
        private state;
        info: Cmd.MathGroupRoomInfo;
        private gamesNumberText;
        constructor();
        protected dataChanged(): void;
    }
}
declare module friendsclub {
    class ClubManageChangeBWPanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn;
        private idTxt;
        private nameTxt;
        private sureBtn;
        private youkeBtn;
        private blackBtn;
        private whiteBtn;
        private chosenum;
        private playerinfo;
        constructor(player: Cmd.MatchGroupMemberInfo);
        protected childrenCreated(): void;
        destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        updateDate(): void;
        private onClickTap(e);
        private switch();
    }
}
declare module friendsclub {
    class ClubManagePanel extends commonpanel.LobbyBaseEuiPanel {
        static Instanc: ClubManagePanel;
        private rectbg;
        /**左侧 */
        private _leftGroup;
        private _closeBtn;
        private _refreshbtn;
        private _clubtypebtn;
        private _dissclubbtn;
        private _setbtn;
        private morelistImg;
        private _matchList;
        private _detailsGroup;
        private _matchTableList;
        private roommsgImg;
        private _memberGroup;
        private memeberList;
        private _messageGroup;
        private msgImg;
        private _messageList;
        private _fightingGroup;
        private todaynum;
        private yesterdaynum;
        private sevendaynum;
        private thirtydaynum;
        private fightingList;
        private _blackandwhiteGroup;
        private uidEditableText;
        private addWhiteButton;
        private addBlackButton;
        /**右侧 */
        private _rightGroup;
        private redPoint;
        private detailsButton;
        private memberButton;
        private messageButton;
        private fightingButton;
        private blackwhiteBtn;
        private ownerid;
        /**房间信息 */
        private _dataArr;
        protected childrenCreated(): void;
        destroy(): void;
        constructor();
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**设置按钮开关 */
        OnOpen(): void;
        OnClose(): void;
        updataMatchList(): void;
        updataMessageList(): void;
        updataFightingList(): void;
        updataMemeberList(): void;
        private roomList;
        updataTableList(): void;
        /**
         * 红点
         */
        addRedPoint(): void;
        removeRedPoint(): void;
        updataDetails(curMath: Cmd.MathGroup): void;
        private matchIdList;
        private waitList;
        initReturnMatchGroup(evt: uniLib.ZqEvent): void;
        updataButtonEnabled(): void;
        private member;
        private sharingMember;
        initMemberList(evt: uniLib.ZqEvent): void;
        private gameHistroys;
        initHistory(history: Cmd.GetGameDataHistoryCmd_S): void;
        /**
         * 请求加入匹配场的玩家
         */
        private joinMember;
        private joinNewMember;
        JoinMemberListMatch(evt: uniLib.ZqEvent): void;
        private switchWindow();
        private onClickTap(e);
        /**
         * 显示匹配等待列表
         */
        private showWaitPlayerList();
        private onShare();
        private shareInfo;
        private onShareTap();
        readonly selectMatchId: number;
        private onMatchListTap(e);
        private onTableListTap(e);
    }
}
declare module friendsclub {
    class ClubMsgMcPanel extends commonpanel.LobbyBaseEuiPanel {
        private _msgTxt;
        private _noticeArr;
        private _msgContain;
        private _noticePanel;
        private _buffer;
        private _defaultMsg;
        private _loop;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        initUI(): void;
        setLoop(value: boolean): void;
        private noticeTest();
        private startScroll();
        private scrollEnd();
        getclubmsg(data: string): void;
        destroy(): void;
        createTextFeild(): egret.TextField;
    }
}
declare module friendsclub {
    class ClubData {
        private static _instance;
        static getInstance(): ClubData;
        /**亲友圈桌面操作 1:管理  2:成员列表 3:申请列表 4:战况查询*/
        clubChoice: number;
        /**亲友圈管理操作 记录当前打开的桌面的亲友圈ID */
        clubmatchid: number;
        /**亲友圈管理操作 管理页面中所选的的亲友圈ID */
        matchid: number;
        /**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
        clubDayChose: number;
        /**亲友圈 判断是否房主或副房主 */
        isclubmanagor: number;
        /**亲友圈 判断是否切换楼层 */
        isclubchangefloor: number;
        /**亲友圈 是否新创楼层（包厢） */
        isnewfloor: number;
        /**亲友圈 新楼层是第几层 */
        newfloor: number;
    }
}
declare module friendsclub {
    class ClubNewBoxPanel extends commonpanel.LobbyBaseEuiPanel {
        private onefloor;
        private twofloor;
        private threefloor;
        private fourfloor;
        private fivefloor;
        private bgRect;
        private floorList;
        private floorGroup;
        private closeBtn;
        private _curMath;
        private _choice;
        private _floorList;
        constructor(floor: Cmd.MathGroup);
        protected childrenCreated(): void;
        destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        updateDate(): void;
        private onClickTap(e);
        /**设置按钮开关 */
        OnOpen(): void;
        OnClose(): void;
    }
}
declare module friendsclub {
    /**
     * 亲友圈公告界面
     */
    class ClubNoticePanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn;
        private modifyBtn;
        private noticeTxt;
        private notice;
        private _matchid;
        private _bUpdate;
        constructor();
        protected childrenCreated(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        showNotice(evt: uniLib.ZqEvent): void;
        private onClick(evt);
    }
}
declare module friendsclub {
    /**
    * 单个房间详情 玩家头像
    */
    class ClubPlayerListHeadPanel extends eui.ItemRenderer {
        private headImg;
        private nameTxt;
        private ownerGroup;
        private ownerImg;
        private onlinestate;
        private ownerTxt;
        private info;
        constructor();
        protected dataChanged(): void;
        /**限制昵称长度 */
        private getStrRealLength(str);
    }
}
declare module friendsclub {
    /**
     * 亲友圈成员列表界面
     */
    class ClubPlayerListPanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn;
        private listGroup;
        private headList;
        private bgRect;
        private _matchId;
        private _list;
        constructor();
        protected childrenCreated(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        showList(evt: uniLib.ZqEvent): void;
        private itemTap(evt);
        private onClick(evt);
        /**设置按钮开关 */
        OnOpen(): void;
        OnClose(): void;
    }
}
declare module friendsclub {
    /**
     * 单个房间详情
     */
    class ClubRoomdetails extends commonpanel.LobbyBaseEuiPanel {
        private gameText;
        private pnumberText;
        private playText;
        private closeBtn;
        private enterRoomBtn;
        private info;
        private userInfo;
        private headList;
        private _head;
        constructor();
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setDate(date: Cmd.MathGroup): void;
        setUserDate(userDate: Cmd.MathGroupRoomInfo): void;
        private onClickTap(e);
    }
}
declare module friendsclub {
    /**
     * 单个房间详情 玩家头像
     */
    class ClubRoomdetailshead extends eui.ItemRenderer {
        private head;
        private info;
        constructor();
        protected dataChanged(): void;
    }
}
declare module friendsclub {
    /**
     * 查看玩家个人信息面板
     */
    class ClubUserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn;
        private nameTxt;
        private idTxt;
        private ipTxt;
        private womanImg;
        private headImg;
        private manImg;
        private headList;
        private info;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        setdata(evt: uniLib.ZqEvent): void;
        private onClick(evt);
    }
}
declare module friendsclub {
    class CreateMatchSetPanel extends commonpanel.LobbyBaseEuiPanel {
        private _gameNameLabel;
        private _clubNameInput;
        private _matchid;
        private _userIdInput;
        private _modifyBtn;
        private _creatBtn;
        private _sureSetBtn;
        private _permissionCheck;
        private _permissionLabel;
        private _req;
        private _clubmss;
        private _changeMatchId;
        private _state;
        private _checkType;
        private _data;
        constructor(data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S);
        protected childrenCreated(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        showMatchData(data: Cmd.ChangeMatchGroupCmd_S): void;
        private onClickTap(e);
        private modifyPlay();
        private createMatchReq();
        private settingHandel();
        /**
         *获取创建房间的信息！
         */
        private setCreatReq(data);
    }
}
declare module friendsclub {
    class DataManage {
        static MatchMemberTypeToString(type: number): "游  客" | "白名单" | "黑名单" | "黄名单" | "VIP";
        static MatchMemberTypeToColor(type: number): 4746562 | 4783872 | 13313060 | 12216577 | 16041845;
    }
}
declare module friendsclub {
    /**
     * 免责申明
     */
    class MatchMsgBox extends eui.Component {
        private title;
        private info;
        private confirm;
        private _closebtn;
        private cancel;
        private _backFn;
        private _backObject;
        constructor();
        setData(title: string, msg: string, labelArr: Array<any>, backFn?: Array<Function>, backObject?: any): void;
        private onClose();
        destory(): void;
    }
}
declare module friendsclub {
    /**
     * 战况item
     */
    class MatchFightingItem extends eui.ItemRenderer {
        private tableIdLabel;
        private timeLabel;
        private nameGroup;
        private scoreGroup;
        private nameandscore;
        constructor();
        protected dataChanged(): void;
    }
}
declare module friendsclub {
    /**玩家战绩单个信息 */
    class MatchFightingNSPanel extends eui.ItemRenderer {
        private names;
        private score;
        private info;
        constructor();
        protected dataChanged(): void;
    }
}
declare module friendsclub {
    /**
     * 成员列表item
     */
    class MatchMemberItem extends eui.ItemRenderer {
        private nameLabel;
        private playertype;
        private playerID;
        private num;
        private headImg;
        private bg;
        private changeBtn;
        constructor();
        protected dataChanged(): void;
        private onLabelTap(e);
    }
}
declare module friendsclub {
    /**
     * 消息列表item
     */
    class MatchMessageItem extends eui.ItemRenderer {
        private bg;
        private contenLabel;
        private contenRemarks;
        private headImg;
        private sonid;
        private disAgreeButton;
        private agreeButton;
        constructor();
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module friendsclub {
    /**
     * 游戏列表
     */
    class MatchRadioButton extends eui.ItemRenderer {
        private label;
        constructor();
        protected dataChanged(): void;
    }
}
declare module friendsclub {
    /**
     * 每个匹配场中的桌子
     */
    class MatchTableItem extends eui.ItemRenderer {
        private contentLabel;
        private _gamename;
        private _gametype;
        private _gamenum;
        info: Cmd.MathGroupRoomInfo;
        constructor();
        protected dataChanged(): void;
    }
}
