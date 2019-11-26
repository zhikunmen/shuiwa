declare module club {
    /**
    * 单个房间详情 玩家头像
    */
    class ClubPlayerListHeadPanel extends eui.ItemRenderer {
        private info;
        /**玩家名称 */
        private _nameTxt;
        /** 玩家ID*/
        private _idTxt;
        /** 玩家头像资源*/
        private _headImg;
        /** 群主图标*/
        private _ownerImg;
        /** 管理员图标*/
        private _adminImg;
        /** 在线图标*/
        private _onlineImg;
        /** 删除按钮*/
        private _deleteBtn;
        constructor();
        protected dataChanged(): void;
        /**限制昵称长度 */
        private getStrRealLength(str);
    }
}
declare module club {
    class ClubConst {
        static RES_JSON: string;
        static RES_JSON_GUANGDONG: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_CLUB: string;
        /**数据无误 */
        static SUCCESS: number;
        /** */
        static ActiveDetailRoom: string;
        /**历史匹配记录 */
        static HistoryMatchIdList: string;
        /**老友圈用历史匹配记录 */
        static HistoryClubList: string;
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
        /**获取清空的操作记录 */
        static GetCleanRecordMatchGroup: string;
        /**返回老友圈公告信息 */
        static CLUB_NOTICE: string;
        /**返回黑白名单 */
        static MemberInfoMatchGroup: string;
        /**大厅查找玩家信息*/
        static UserInfoSearchLobby: string;
        /**返回黄名单列表 */
        static ReturnYellowList: string;
        /**离开匹配组返回  */
        static LEAVE_MATCHGROUP2: string;
        /** 战绩数据按页返回*/
        static HISTORY_DATA: string;
        /**获取可邀请成员列表 */
        static GetCanInviteMemberList: string;
        /**邀请指定玩家到俱乐部中 */
        static InviteMemberMatchGroup: string;
        /**邀请指定玩家到俱乐部中 广播 */
        static InviteMemberMatchGroupBrd: string;
        /**俱乐部添加、清除备注分数 */
        static RemarkPointMatchGroup: string;
        /**俱乐部 添加、清除昵称备注*/
        static RemarkNickNameMatchGroup: string;
        /** 清除数据返回*/
        static CleanMemberWinPointMatchGroup: string;
        /** 俱乐部获取可导入群列表 */
        static GetCanImportMemberListMatchGroup: string;
        /**俱乐部 成员导入*/
        static ImportMemberListMatchGroup: string;
        /**群主进入合伙人界面 获取合伙人数据 */
        static GetPartnerRecordsMatchGroup: string;
        /**操作指定合伙人 */
        static OperatePartnerMatchGroup: string;
        /**群主申请解除合伙人 发送给合伙人的广播 */
        static RemovePartnerMatchGroup: string;
        /**合伙人 回复是否解除合伙关系 */
        static ReplyRemovePartnerMatchGroup: string;
        /**获取组员战绩 */
        static GetMemberRecordsMatchGroup: string;
        /**获取可导入组员列表 */
        static GetCanImportMemberList2MatchGroup: string;
        /**添加指定组员到俱乐部中 */
        static ImportMember2MatchGroup: string;
        /**移除指定组员 */
        static RemoveMemberMatchGroup: string;
        /**老友圈战绩  管理界面战况查询*/
        static MATCH_HISTORY_FOR_MANAGE: string;
        /**老友圈战绩  管理员点击俱乐部桌面群战绩*/
        static MATCH_HISTORY_FOR_DESK: string;
        /**老友圈战绩  管理员点击我的战绩或群员点击本群战绩*/
        static MATCH_HISTORY_FOR_MYSELF: string;
        /**老友圈战绩  获取指定成员的战绩*/
        static MATCH_HISTORY_FOR_UID: string;
        /**老友圈战绩   合伙人那里点玩家详情跟管理员那里点玩家详情*/
        static MATCH_HISTORY_FOR_PARTNER: string;
        /**审核记录列表 */
        static GET_APPLYRECORD_LIST: string;
        /**俱乐部桌面桌子创建房间选项*/
        static CLUB_CREATEDESK: number;
        /**俱乐部桌面桌子前八张桌子显示*/
        static CLUB_DESKSHOW: number;
        /**俱乐部桌面桌 无人座位*/
        static DESK_NOUSER: number;
        /**俱乐部邀请玩家的状态 离线*/
        static OnlineState_Offline: number;
        /**俱乐部邀请玩家的状态 在线 空闲状态*/
        static OnlineState_Online: number;
        /**俱乐部邀请玩家的状态 网络差*/
        static OnlineState_Slow: number;
        /**俱乐部邀请玩家的状态 离开,切后台*/
        static OnlineState_Leave: number;
        /**俱乐部邀请玩家的状态 电话中*/
        static OnlineState_Calling: number;
        /**俱乐部邀请玩家的状态 托管状态*/
        static OnlineState_Hosting: number;
        /**俱乐部邀请玩家的状态 排队中,匹配号用*/
        static OnlineState_Waiting: number;
        /**俱乐部邀请玩家的状态 游戏中,匹配号用*/
        static OnlineState_Gameing: number;
        /**俱乐部邀请玩家的状态 观战状态*/
        static OnlineState_Watching: number;
        /**俱乐部邀请玩家的状态 已邀请状态,漳州匹配号用*/
        static OnlineState_Invited: number;
        /**老友圈 成员列表玩家的状态 0表示游客 */
        static CLUB_TOURIST: number;
        /**老友圈 成员列表玩家的状态 1表示白名单 */
        static CLUB_WHITE: number;
        /**老友圈 成员列表玩家的状态 2表示黑名单 */
        static CLUB_BLACK: number;
        /**老友圈 成员列表玩家的状态 3表示黄名单 */
        static CLUB_YELLOW: number;
    }
    class ClubConst1 {
        /**老友圈战绩  管理界面战况查询 1*/
        static MATCH_HISTORY_FOR_MANAGE: number;
        /**老友圈战绩  管理员点击俱乐部桌面群战绩2 */
        static MATCH_HISTORY_FOR_DESK: number;
        /**老友圈战绩  管理员点击我的战绩或群员点击本群战绩3*/
        static MATCH_HISTORY_FOR_MYSELF: number;
        /**老友圈战绩  获取指定成员的战绩4*/
        static MATCH_HISTORY_FOR_UID: number;
        /**老友圈战绩 合伙人那里点玩家详情跟管理员那里点玩家详情5*/
        static MATCH_HISTORY_FOR_PARTNER: number;
    }
}
declare module Cmd {
    function clubDispatch(cmd: string, obj?: any, bubbles?: boolean): void;
    function OnActiveDetailRoomCmd_S(rev: Cmd.ActiveDetailRoomCmd_S): void;
    /**
     * 历史匹配组列表
     */
    function OnHistoryMatchIdListMatchGroupCmd_S(rev: Cmd.HistoryMatchIdListMatchGroupCmd_S): void;
    /**老友圈战绩 */
    function OnGetGameDataHistoryForMatchCmd_S(rev: Cmd.GetGameDataHistoryForMatchCmd_S): void;
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
    /**返回 添加、清除备注分数 */
    function OnRemarkPointMatchGroupCmd_CS(rev: Cmd.RemarkPointMatchGroupCmd_CS): void;
    /**返回 添加、清除昵称备注 */
    function OnRemarkNickNameMatchGroupCmd_CS(rev: Cmd.RemarkNickNameMatchGroupCmd_CS): void;
    /**返回 获取可导入群列表*/
    function OnGetCanImportMemberListMatchGroupCmd_CS(rev: Cmd.GetCanImportMemberListMatchGroupCmd_CS): void;
    /**返回 成员导入 */
    function OnImportMemberListMatchGroupCmd_CS(rev: Cmd.ImportMemberListMatchGroupCmd_CS): void;
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnMemberInfoMatchGroupCmd_S): void;
    /**获取可邀请成员列表 */
    function OnGetCanInviteMemberListMatchGroupCmd_CS(rev: Cmd.GetCanInviteMemberListMatchGroupCmd_CS): void;
    /**邀请指定玩家到俱乐部中 广播 */
    function OnInviteMemberMatchGroupCmd_Brd(rev: Cmd.InviteMemberMatchGroupCmd_Brd): void;
    /**返回查找个人信息 */
    function OnUserInfoSearchLobbyCmd_S(rev: Cmd.UserInfoSearchLobbyCmd_S): void;
    /**邀请指定玩家到俱乐部中 */
    function OnInviteMemberMatchGroupCmd_CS(rev: Cmd.InviteMemberMatchGroupCmd_CS): void;
    /**
     * 获取黄名单列表
     */
    function OnReturnYellowMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnYellowMemberInfoMatchGroupCmd_S): void;
    /**
     * 改变匹配号属性
     */
    function OnChangeMatchGroupCmd_S(rev: Cmd.ChangeMatchGroupCmd_S): void;
    /**
     * 离开匹配组返回
     */
    function OnLeaveMatchGroup2Cmd_S(rev: Cmd.LeaveMatchGroup2Cmd_S): void;
    function OnRequestJoinMemberMatchGroupCmd_S(rev: Cmd.RequestJoinMemberMatchGroupCmd_S): void;
    /** 群主进入合伙人界面 获取合伙人数据 */
    function OnGetPartnerRecordsMatchGroupCmd_CS(rev: Cmd.GetPartnerRecordsMatchGroupCmd_CS): void;
    /** 操作指定合伙人 */
    function OnOperatePartnerMatchGroupCmd_CS(rev: Cmd.OperatePartnerMatchGroupCmd_CS): void;
    /** 群主申请解除合伙人 发送给合伙人的广播 */
    function OnRemovePartnerMatchGroupCmd_Brd(rev: Cmd.RemovePartnerMatchGroupCmd_Brd): void;
    /** 合伙人 回复是否解除合伙关系 */
    function OnReplyRemovePartnerMatchGroupCmd_CS(rev: Cmd.ReplyRemovePartnerMatchGroupCmd_CS): void;
    /** 获取组员战绩 */
    function OnGetMemberRecordsMatchGroupCmd_CS(rev: Cmd.GetMemberRecordsMatchGroupCmd_CS): void;
    /** 获取可导入组员列表*/
    function OnGetCanImportMemberList2MatchGroupCmd_CS(rev: Cmd.GetCanImportMemberList2MatchGroupCmd_CS): void;
    /** 添加指定组员到俱乐部中 */
    function OnImportMember2MatchGroupCmd_CS(rev: Cmd.ImportMember2MatchGroupCmd_CS): void;
    /** 移除指定组员 */
    function OnRemoveMemberMatchGroupCmd_CS(rev: Cmd.RemoveMemberMatchGroupCmd_CS): void;
    /** 返回定时器*/
    function OnSetPauseTimerMatchGroupCmd_CS(rev: Cmd.SetPauseTimerMatchGroupCmd_CS): void;
    /**返回 添加、清除昵称备注 */
    function OnCleanMemberWinPointMatchGroupCmd_CS(rev: Cmd.CleanMemberWinPointMatchGroupCmd_CS): void;
    /**获取清空的操作记录 */
    function OnGetCleanRecordMatchGroupCmd_CS(rev: Cmd.GetCleanRecordMatchGroupCmd_CS): void;
    /**审核列表返回 */
    function OnGetApproveRecordMatchGroupCmd_S(rev: Cmd.GetApproveRecordMatchGroupCmd_S): void;
}
declare module club {
    class ClubModuleMgr {
        private static _instance;
        private _clubDeskPanel;
        private _activeRoomInformationPanel;
        private _clubAllBoxPanel;
        private _isShowClub;
        static getInstance(): ClubModuleMgr;
        /**移除老友圈列表界面 */
        removeAllClubListPanel(): void;
        /**老友圈列表界面 */
        showAllClubListPanel(callBack: Function): void;
        /**老友圈  清空的操作记录*/
        showClubCleanRecordPanel(callBack: Function): void;
        /**老友圈列表界面 无数据  */
        showClubListPanel(): void;
        /**老友圈管理员界面单个房间详情 */
        showActiveDetailRoomtPanel(callBack: Function): void;
        /**显示老友圈玩法面板 */
        showClubDetailsPanel(data: Cmd.MathGroup): void;
        /**显示俱乐部分享界面
         * @param roomId 房间ID
        */
        showClubInvitePanel(data?: uniLib.ZqEvent | number): void;
        /**删除老友圈管理员界面单个房间详情 */
        removeActiveDetailRoomtPanel(): void;
        /**老友圈新手指引面板 */
        showClubGuidePanel(): void;
        /**老友圈管理 房主备注玩家分数 */
        showClubRemarksScorePanel(uid: number): void;
        /**老友圈管理 查看单个玩家详情 */
        showClubMemberInfoPanel(data: Cmd.MatchGroupMemberInfo): void;
        /**老友圈导入成员列表页面 */
        showClubImportPanel(callBack: Function): void;
        /**老友圈桌面界面 */
        showClubDeskPanel(callBack: Function): void;
        /**移除老友圈桌面 */
        removeClubDeskPanel(): void;
        /**老友圈管理界面 */
        showClubManagePanel(): void;
        /**老友圈成员列表界面   1管理员页面 2 普通各成员页面*/
        showClubPlayerListPanel(isOwner: boolean): void;
        /**显示俱乐部 单个俱乐部所有战绩 */
        showClubAllRecordPanel(callBack: Function): void;
        /**显示老友圈 查看自己的战绩 */
        showClubMemberRecordPanel(callBack: Function): void;
        /**审核记录 */
        showClubApplyRecordPanel(): void;
        /**老友圈公告界面 */
        showClubNoticePanel(): void;
        /**玩家第一次进入房间加备注 */
        shoClubEnterRemarks(callBack: Function): void;
        /**创建老友圈房间面板 */
        showCreateClubPanel(game?: Cmd.ChangeMatchGroupCmd_S): void;
        /**显示老友圈查看个人信息面板 */
        showClubUserInfoPanel(data: Cmd.MatchGroupMemberInfo): void;
        /**显示老友圈搜索成员面板 */
        showClubSearchMemberPanel(): void;
        /**显示老友圈手动添加成员面板 */
        showClubAddMemberPanel(): void;
        /**
         * 俱乐部创建、修改设置页面
         */
        showCreateMatchSetPanel(data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S): void;
        /**显示老友圈审批面板 */
        showClubUserApplyPanel(): void;
        /** 邀请指定玩家到俱乐部中 广播 */
        showClubInviteBrdPanel(callBack: Function): void;
        /**获取可邀请成员列表 */
        showClubInvitePlayerPanel(callBack: Function): void;
        /** 群主进入合伙人界面 */
        showClubPartnerRecordPanel(callBack: Function): void;
        /**群主合作群添加成员 */
        showClubPartnerAddPanel(): void;
        /**群主 看合伙人信息 */
        showClubPartnerMemberDetailPanel(callBack: Function): void;
        /**群主解除合伙人关系  */
        showClubPartnerRemovePanterPanel(data: Cmd.MatchGroupMemberInfo): void;
        /** 合伙人 获取组员战绩*/
        showClubPartnerMemberRecordPanel(callBack: Function): void;
        /** 合伙人 获取可导入组员列表*/
        showClubPartnerImportPanel(callBack: Function): void;
        /**合伙人 手动添加成员 */
        showClubPartnerImportAddPanel(): void;
        /**合伙人 查看单个玩家详情 */
        showClubPartnerRecordDetailPanel(data: Cmd.MatchGroupMemberInfo): void;
        /**合伙人 移出单个玩家 */
        showClubPartnerRemoveMemberPanel(data: Cmd.MatchGroupMemberInfo): void;
        /**老友圈管理 计时器面板*/
        showClubMemberTimerPanel(): void;
    }
}
declare module club {
    class ClubSendMgr {
        /**
         * 请求匹配号信息
         * */
        static requestMatchData(isClub?: number): void;
        /**请求老友圈列表 */
        static requestClubMatchList(): void;
        /**
         * 房主请求老友圈信息
         */
        static requestRequestMatchGroupCmd(matchId: number): void;
        /**邀请指定玩家到俱乐部中 */
        static InviteMemberMatchGroupCmd(matchId: number, uids: number[]): void;
        /**
         * 请求战绩
         * @param globalRoomId 全局游戏房间id
         *  */
        static getGameDetailHistory(globalRoomId: number): void;
        /**
         * 战绩获取
         * @param matchId 单个俱乐部的战绩
         * @param curPage 第几页数据
         * @param typ 请求类型 1/2/3/4 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩
         * @param which 操作那一项 1/2/3 今日、昨日、前日
         */
        static getGameDataHistoryForMatch(matchId: number, curPage: number, which: number, typ: number): void;
        /**
         * 俱乐部管理页面 单个玩家数据
         * @param matchId 单个俱乐部的战绩
         * @param UId 玩家Id
         * @param curPage 第几页数据
         * @param typ 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩/合伙人那里点玩家详情跟管理员那里点玩家详情
         * @param which 操作那一项 1/2/3 今日、昨日、前日
         *  */
        static getGameDataHistoryToUId(matchId: number, UId: number, curPage: number, typ: number, which: number): void;
        /**
         * 俱乐部管理页面 单个玩家数据 合伙人
         * @param matchId 单个俱乐部的战绩
         * @param UId 玩家Id
         * @param curPage 第几页数据
         * @param typ 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩/合伙人那里点玩家详情跟管理员那里点玩家详情
        
         * */
        static getGameDataHistoryToUIdgForPartner(matchId: number, UId: number, curPage: number, typ: number): void;
        /**
         * 战绩统计获取 看在此老友圈自己的战绩
         * @param curPage 分页处理 当前请求的第几页
         * @param matchId 单个俱乐部的战绩
         */
        static getGameDataHistorytoMatchMyself(matchId: number, curPage: number): void;
        /**
         *  老友圈管理 成员列表 添加、清除备注分数
         * @param matchId 老友圈ID
         * @param targetUid  对象id
         * @param opType  操作类型 1、2 添加、清除
         * @param point  具体操作哪一天的数据 0、1、2 今天、昨天、前天
         * @param which  备注分数
         */
        static RemarkPointMatchGroupCmd(matchId: number, targetUid: number, opType: number, point: number, which: number): void;
        /**
         * 老友圈玩家列表批量管理操作
         * @param matchId 老友圈ID
         * @param reply 操作选项 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
         * @param uids 所有需要操作的玩家列表
         */
        static ReplyJoinMemberListMatchGroupCmdBatch(matchId: number, reply: number, uids: number[]): void;
        /**老友圈审核列表 */
        static requestGetApproveRecordMatchGroupCmd_C(matchId: number, page: number, uid: number): void;
        /**
         * 老友圈玩家列表单个玩家管理操作
         * @param matchId 老友圈ID
         * @param reply 操作选项 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
         * @param uid 被操作的玩家Id
         */
        static ReplyJoinMemberListMatchGroupCmd(matchId: number, reply: number, uid: number): void;
    }
}
declare class ClubUIEventConst {
    static JOIN_CLUBROOM: string;
}
/**
 * 已创建活跃房间面板
 */
declare module club {
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
declare module club {
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
declare module club {
    /**俱乐部添加外部成员 */
    class ClubAddMemberPanel extends commonpanel.LobbyBaseEuiPanel {
        /**搜索按钮 */
        private _searchBtn;
        /**输入框 */
        private _searchEditableText;
        /**关闭按钮 */
        private _closeBtn;
        /** 用户列表*/
        private _menberList;
        /** 用户列表容器*/
        private _menberListArray;
        /** 暂无数据提示*/
        private _tishiText;
        /**构造玩家局数据 */
        private _list;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        setdata(evt: uniLib.ZqEvent): void;
        private onClick(evt);
        /**输入框判断 */
        private onTextFieldFocusOut(event);
    }
}
declare module club {
    /**老友圈所有房间面板 */
    class ClubAllBoxPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 数据列表*/
        private boxList;
        /**右侧区域 */
        private _leftGroup;
        /** 创建房间*/
        private _createBtn;
        /** 加入房间*/
        private _joinBtn;
        /** 关闭按钮*/
        private _closeBtn;
        /** 背景蒙版*/
        private _bgRect;
        private _clubList;
        constructor();
        protected childrenCreated(): void;
        protected destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**设置按钮开关 */
        private OnOpen();
        private OnClose();
        setData(evt: uniLib.ZqEvent): void;
        private onClickTap(e);
    }
}
declare module club {
    /**老友圈群战绩Item */
    class ClubAllRecordItemPanel extends eui.ItemRenderer {
        /**标号*/
        private _indextText;
        /**时间 */
        private _timeText;
        /**房间ID */
        private _roomIdText;
        /**大赢家名称 */
        private _nameText;
        /** 大赢家id*/
        private _uidText;
        /** 大赢家战绩*/
        private _recordText;
        /** 游戏名称*/
        private _gameNameText;
        /**局数 */
        private _gameNumText;
        /** 详情按钮*/
        private _detailBtn;
        /**头像 */
        private _headImg;
        /**数据 */
        private info;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        destory(): void;
        private onClickTap(e);
        protected dataChanged(): void;
        /**限制昵称长度 */
        private getStrRealLength(str);
    }
}
/**单个老友圈 所有战绩 */
declare module club {
    class ClubAllRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /**滑块 */
        private _scroll;
        /**数据面板 */
        private _recordList;
        /**提示字 */
        private _tipsText;
        /**当前页数 */
        private _curPage;
        /**总页数 */
        private _totalPage;
        /**当前俱乐部matchid */
        private _matchId;
        /**当前记录Uid */
        private _uid;
        /**我的战绩按钮 */
        private _myRecordBtn;
        /**记录数据容器 */
        private _AllRecordListArr;
        /**数据 */
        private _AllRecordArr;
        /** 选择今日昨日前日输赢*/
        private _choseDayBtn;
        /**选择日期 */
        private _dayTypeGroup;
        /**选择蒙版 */
        private _choseRect;
        /** 今日输赢按钮*/
        private _todayBtn;
        /** 昨日输赢按钮*/
        private _yesterdayBtn;
        /** 前日输赢按钮*/
        private _qianBtn;
        /** 房间数*/
        private _roomText;
        /**当前页面的 今日 昨日 前日选项 */
        private _clubDayChose;
        /**记录当前数据记录的 日  */
        private _dayChose;
        /**typ为2时请求的填充为：总房数(今日、昨日、前日) */
        private _matchStatisticInfo;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        private onClickTap(e);
        /**接收数据 */
        showData(evt: uniLib.ZqEvent): void;
        /**单独加 */
        private addListen();
        /**添加数据*/
        private addData(arr);
        /**点每日输赢更新数据 */
        private updateView();
        /**更新视图 */
        private updatePoint();
        /**获取战绩消息 */
        getData(): void;
        /**滑到底加载其他页数据 */
        private checkTop(evt);
        destroy(): void;
    }
}
/**申请列表 */
declare module club {
    class ClubApplyListPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /**数据表*/
        private messageList;
        /** 全部拒绝*/
        private _noBtn;
        /** 全部同意*/
        private _yesBtn;
        /**审批记录 */
        private _recordBtn;
        /**提示字 */
        private _tipsText;
        /**列表数据容器 */
        private messageListArr;
        /** 所有玩家Uid 批量操作使用*/
        private _allUidList;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        private onClick(evt);
        private updateList(evt);
        /** 更新申请数据*/
        private updateApplyList(list);
    }
}
declare module club {
    /**申请列表 */
    class ClubApplyRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /**数据表*/
        private messageList;
        /**提示字 */
        private _tipsText;
        private _scroller;
        /**列表数据容器 */
        private messageListArr;
        /** 所有玩家Uid 批量操作使用*/
        private _allUidList;
        /**搜索按钮 */
        private _searchBtn;
        /**输入框 */
        private _searchEditableText;
        /**当前页数 */
        private _curPage;
        /**总页数 */
        private _totalPage;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        private updateList(evt);
        protected destroy(): void;
        private onClick(evt);
        /**输入框判断 */
        private onTextFieldFocusOut(event);
        /** 更新申请数据*/
        private updateApplyList(list);
        /**单独加 */
        private addListen();
        /**获取战绩消息 */
        getData(): void;
        /**滑到底加载其他页数据 */
        private checkTop(evt);
    }
}
declare module club {
    /**
    * 单个老友圈选项
    */
    class ClubBoxItem extends eui.ItemRenderer {
        /**头像资源 */
        private head;
        /**背景 */
        private bg;
        /**游戏和局数 */
        private roomNameText;
        /**老友圈ID */
        private idText;
        /** 圈主名字*/
        private nameText;
        /** 老友圈名字*/
        private boxNameText;
        /**老友圈数据 */
        private info;
        /** 几桌开始*/
        private startRoomText;
        /**等待房间数据*/
        private waitRoomText;
        /**编号 */
        private numberText;
        /** 进入按钮*/
        private inBtn;
        /** 退出按钮*/
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
/**老友圈所有房间面板 */
declare module club {
    class ClubBoxPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 创建房间*/
        private _createBtn;
        /** 加入房间*/
        private _joinBtn;
        /** 关闭按钮*/
        private _closeBtn;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**老友清除记录页面 ItemRenderer*/
    class ClubCleanRecordItemPanel extends eui.ItemRenderer {
        /** 时间*/
        private _timeText;
        /**日期 */
        private _dayText;
        /**操作人 */
        private _nameText;
        /** 数据*/
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare module club {
    /**老友清除记录页面 */
    class ClubCleanRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /** 提示*/
        private _tishiText;
        /** */
        private _list;
        private _listArr;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        private showDate(evt);
        private onClickTap(e);
        protected destroy(): void;
    }
}
declare module club {
    /**
     * 老友圈桌子面板
     */
    class ClubDeskPanel extends commonpanel.LobbyBaseEuiPanel {
        /**桌子列表 */
        private deskList;
        /**关闭按钮 */
        private _closeBtn;
        /**切换老友圈按钮 */
        private _swtichBtn;
        /**创建俱老友圈按钮 */
        private createBtn;
        /**老友圈管理按钮 */
        private _boxManageBtn;
        /**分享按钮 */
        private _shareBtn;
        /**在线玩家数 */
        private menberNum;
        /**成员列表按钮 */
        private _memberListBtn;
        /**审批按钮 */
        private _applyListBtn;
        /**老友圈号 */
        private _clubIdText;
        /**游戏玩法 */
        private _clubPlayText;
        /**合作群按钮 */
        private _partnerBtn;
        /**成员按钮 */
        private _partnerMemberBtn;
        /**老友圈标题 */
        private _titleText;
        /**刮奖按钮 */
        private _scratchBtn;
        /**公告按钮 */
        private _noticeBtn;
        /**跑马灯 */
        private _clubMsgMcPanel;
        /**玩家头像 */
        private _userHeadImg;
        private _headBg;
        /**玩法详情 */
        private _clubDetailBtn;
        /**快速加入 */
        private _fastPlayBtn;
        /**战绩按钮 */
        private _queryFightingBtn;
        /**群战绩按钮 */
        private _queryAllFightingBtn;
        /**用户昵称 */
        private _userNameText;
        /**用户ID*/
        private _userIdText;
        /**群主Id*/
        private _clubOwnerText;
        /**桌子列表数据 */
        private _deskList;
        /**老友圈数据 */
        private _curMath;
        private _curMathlist;
        /**显示房间详情 */
        private clubRoomdetails;
        /**是否管理员 */
        private isOwner;
        /**桌子容器 */
        private deskListArray;
        /**构造后显示的数据 */
        private _showList;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**房主修改玩法后 修改桌面数据 */
        private updateplayTypeDesc(evt);
        /**更新桌子数据 */
        private updateDesk(list);
        /**构造桌子数据 */
        private getDeskList(roomlist);
        /**显示弹窗修改页面 */
        private showNotice();
        setDate(evt: uniLib.ZqEvent): void;
        /**更新老友圈数据 */
        private updatedesklist(evt);
        /**更新公告 */
        private updateNotice(evt);
        /**断线重连 重新发协议 */
        private onSendmsg();
        /**头像蒙版 圆形 */
        private setPlayerIconMask(image);
        /**显示红点 */
        private joinMember;
        private showRedPoint(evt);
        /**
          * 红点
          */
        private addRedPoint();
        /**删除红点 */
        private removeRedPoint();
        /**复制老友圈号 */
        private copyid(e);
        private onClickTap(e);
        /**分享 */
        private shareInfo;
        private onShareTap();
        /**桌子列表操作 */
        private itemTap(evt);
        private showClubRoomdetails();
        private removeClubRoomdetails();
        private removeDesk();
    }
}
/**
 * 俱乐部玩法详情
 */
declare module club {
    class ClubDetailsPanel extends commonpanel.LobbyBaseEuiPanel {
        /**游戏名称 */
        private gameText;
        /**几人房 */
        private pnumberText;
        /** 多少局*/
        private gnumberText;
        /** 玩法描述*/
        private playText;
        /**关闭按钮 */
        private closeBtn;
        private info;
        /**大赢家设置  */
        private bigWinText;
        constructor(data: Cmd.MathGroup);
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setDetailDate(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**
   *第一次进入老友圈的玩家检验，加备注
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
declare module club {
    /**
     * 新手指引 群主
     */
    class ClubGuidePanel extends commonpanel.LobbyBaseEuiPanel {
        /**背景图 */
        private _rectBg;
        /** 提示一*/
        private _guideGroup1;
        /** 提示二*/
        private _guideGroup2;
        /** 提示三*/
        private _guideGroup3;
        /** 提示四*/
        private _guideGroup4;
        /** 计数器*/
        private _counter;
        private group1;
        private image;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        /**背景光旋转 */
        private guangtween(val);
        private onClick();
    }
}
declare module club {
    /**导入成员 */
    class ClubImportPanel extends commonpanel.LobbyBaseEuiPanel {
        /**导入按钮 */
        private _importBtn;
        /**关闭按钮*/
        private _closeBtn;
        /** 数据列表*/
        private _clubList;
        /** 数据列表容器*/
        private _clubListArr;
        /**可导入俱乐部数据 */
        private _matchArr;
        /**老友圈昵称 */
        private _matchName;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private showdate(evt);
        private onClick(evt);
        private itemTap(evt);
        /**更新显示 */
        private updateList();
    }
    /**导入成员Item */
    class ClubImportItemPanel extends eui.ItemRenderer {
        /** 选中图标*/
        private _selectImg;
        /**俱乐部昵称 */
        private _clubNameText;
        /**俱乐部Id */
        private _clubIdText;
        /** 成员人数*/
        private _numText;
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
/** */
declare module club {
    class ClubInviteBrdPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮*/
        private _closeBtn;
        /** 头像资源 */
        private _headImg;
        /** 邀请人昵称*/
        private _nameText;
        /**邀请人ID */
        private _uidText;
        /** 老友圈名称*/
        private _clubNameText;
        /** 老友圈ID*/
        private _clubIdText;
        /** 老友圈玩法介绍*/
        private _playText;
        /** 拒绝按钮*/
        private _noBtn;
        /** 同意按钮*/
        private _yesBtn;
        /**房间号 */
        private inviteData;
        constructor();
        protected childrenCreated(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private showDate(evt);
        private onClick(e);
    }
}
/**俱乐部内部分享界面 */
declare module club {
    class ClubInvitePanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /**微信按钮 */
        private _wXinIcon;
        /**邀请老友内部成员按钮 */
        private _clubIcon;
        private _roomId;
        private _data;
        constructor(data?: uniLib.WXShareVo | number);
        protected childrenCreated(): void;
        protected destroy(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private btnClick(evt);
        private shareInfo;
        /**公共分享 */
        private share(plat?);
        /**分享成功回调 */
        private shareBack(back);
        private delayShareBack(code);
    }
}
declare module club {
    class ClubInvitePlayerItemPanel extends eui.ItemRenderer {
        /**头像资源 */
        private _headImg;
        /**昵称 */
        private _nameText;
        /** _idText*/
        private _idText;
        /** 状态*/
        private _typeText;
        /** 邀请按钮*/
        private _inviteBtn;
        /**搜索玩家数据 */
        private searchInfo;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    class ClubInvitePlayerPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /**老友圈名称 */
        private _clubNameText;
        /**在线人 */
        private _onlineText;
        /**俱乐部ID */
        private _clubIdText;
        /**搜索输入框 */
        private _searchEditableText;
        /**搜索按钮 */
        private _searchBtn;
        /**全部邀请按钮 */
        private _allInviteBtn;
        /** 玩家列表*/
        private _playerList;
        /**数据集合器 */
        private _playerListArray;
        /** 暂无数据提示*/
        private _tishiText;
        /** 玩家列表*/
        private _memberList;
        /** 可以邀请列表列表*/
        private _canInviteList;
        /** 搜索出来的数组*/
        private searchArray;
        constructor();
        protected childrenCreated(): void;
        protected destroy(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        private showData(evt);
        /**操作后 更新玩家状态 */
        private updateList(evt);
        /**更新数据 */
        private updateplayerListArray(list);
        /**搜索数据 */
        private searchMember(value);
        private onClick(evt);
    }
}
declare module club {
    /**
     * 每个老友圈中的桌子
     */
    class ClubItemDesk extends eui.ItemRenderer {
        private deskGroup;
        /**玩家人数 */
        private personTxet;
        /**桌面小人 */
        private head;
        /**座位框和头像 */
        private headbg1;
        private headbg2;
        private headbg3;
        private headbg4;
        private kuang1;
        private kuang2;
        private kuang3;
        private kuang4;
        private leave1;
        private leave2;
        private leave3;
        private leave4;
        /**游戏状态 */
        private state;
        /**局数 */
        private gamesNumberText;
        info: Cmd.MathGroupRoomInfo;
        constructor();
        protected dataChanged(): void;
    }
}
declare module club {
    /**俱乐部成员列表详情 */
    class ClubMemberInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /** 头像*/
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** id*/
        private _uidText;
        /** 备注*/
        private _remarksText;
        /**归属人 */
        private _belongText;
        /**提示信息 */
        private _tishiText;
        /**分数战绩 */
        private _scoreText;
        /**房间数*/
        private _roomText;
        /**大赢家次数 */
        private _bigWinText;
        /**清零按钮 */
        private _cleanBtn;
        /**清零记录按钮 */
        private _recordBtn;
        /**选择按钮 */
        private _choseDayBtn;
        /**选日子区域 */
        private _dayTypeGroup;
        /**选日子蒙版 */
        private _choseRect;
        /**今日输赢选项*/
        private _todayBtn;
        /**昨日输赢选项 */
        private _yesterdayBtn;
        /**前日输赢选项 */
        private _qianBtn;
        /**滑块 */
        private _scroller;
        /**列表 */
        private _list;
        private _listArr;
        /**玩家数据 */
        private _info;
        /**选择日 选项 今日（1）、昨日 （2）、前日（3）*/
        private _clubDayChose;
        /** 战绩数据*/
        private _memberinfo;
        /**当前页数 */
        private _curPage;
        /**总页数 */
        private _totalPage;
        /**数据 */
        private _AllRecordArr;
        /**记录当前数据记录的 日  */
        private _dayChose;
        constructor(parm: Cmd.MatchGroupMemberInfo);
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**输入框判断 */
        private onTextFieldFocusOut(event);
        private onClickTap(e);
        /**清楚玩家指定输赢数据 */
        private day;
        private cleanWinPoint(which);
        /**更新清楚数据*/
        private updateWinPoint(evt);
        /**点每日输赢更新数据 */
        private updateView();
        /**更新清楚数据视图*/
        private updatePoint();
        /**接收数据 */
        showData(evt: uniLib.ZqEvent): void;
        /**添加数据*/
        private addData(arr);
        /**单独加 */
        private addListen();
        /**获取战绩消息 */
        getData(): void;
        /**滑到底加载其他页数据 */
        private checkTop(evt);
    }
    /**成员战绩 */
    class ClubMemberInfoItemPanel extends eui.ItemRenderer {
        /** 时间*/
        private _timeText;
        /**房间信息*/
        private _roomTxt;
        /** 分数*/
        private _gradeText;
        /** 详情按钮*/
        private _detailBtn;
        /** 战绩数据*/
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        /**查看详情 */
        private showDetail();
    }
}
declare module club {
    /**搜索玩家的数据显示  */
    class ClubSearchMemberItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** 玩家id*/
        private _idText;
        /** 添加成员页面所用按钮*/
        private _addBtn;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn;
        /** 搜索成员按钮状态*/
        private _typeText;
        /**搜索玩家数据 */
        private searchInfo;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
    }
    /**手动添加玩家的数据显示  */
    class ClubAddMemberItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** 玩家id*/
        private _idText;
        /** 添加成员页面所用按钮*/
        private _addBtn;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn;
        /** 搜索成员按钮状态*/
        private _typeText;
        /**已添加提示 */
        private _tishiText;
        /**添加玩家数据 */
        private addInfo;
        /** 搜索出来的结果 */
        private search;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**老友圈 成员战绩item  */
    class ClubMemberRecordItemPanel extends eui.ItemRenderer {
        /** 编号*/
        private _indexText;
        /** 游戏名称*/
        private _gameNameText;
        /** 房间号*/
        private _roomText;
        /** 时间*/
        private _timeText;
        /** 时间和分数List*/
        private nameandscore;
        /** 详情按钮*/
        private _detailBtn;
        /** 复制战绩按钮*/
        private _copyBtn;
        /**数据 */
        private info;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        destory(): void;
        private onClickTap(e);
        protected dataChanged(): void;
        /**限制昵称长度 */
        private getStrRealLength(str);
    }
    /**玩家战绩单个信息 */
    class MemberRecordItemNSPanel extends eui.ItemRenderer {
        /** 昵称*/
        private names;
        /** 分数*/
        private score;
        private info;
        constructor();
        protected dataChanged(): void;
    }
}
declare module club {
    /**老友圈 成员自己看自己战绩  */
    class ClubMemberRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /** 选择今日昨日前日输赢*/
        private _choseDayBtn;
        /**看回放 */
        private _lookRecordBtn;
        /** 容器*/
        private _scroller;
        /**选择日期 */
        private _dayTypeGroup;
        /**选择蒙版 */
        private _choseRect;
        /** 今日输赢按钮*/
        private _todayBtn;
        /** 昨日输赢按钮*/
        private _yesterdayBtn;
        /** 前日输赢按钮*/
        private _qianBtn;
        /**战绩列表 */
        private _recordsList;
        /** 战绩分数*/
        private _sorceText;
        /** 房间数*/
        private _roomText;
        /** 大赢家次数*/
        private _bigWinText;
        /** 提示*/
        private _tipsText;
        /**集合器*/
        private _recordslistArr;
        /** */
        private _data;
        /**数据 */
        private _AllRecordArr;
        /**当前页数 */
        private _curPage;
        /**总页数 */
        private _totalPage;
        /**当前俱乐部matchid */
        private _matchId;
        /**当前页面的 今日 昨日 前日选项 */
        private _clubDayChose;
        /**记录当前数据记录的 日  */
        private _dayChose;
        constructor();
        protected childrenCreated(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**传数据 */
        setDate(evt: uniLib.ZqEvent): void;
        /**添加数据*/
        private addData(arr);
        /**获取战绩消息 */
        getData(): void;
        /**单独加 */
        private addListen();
        /**滑到底加载其他页数据 */
        private checkTop(evt);
        /**点每日输赢更新数据 */
        private updateView();
        /**更新视图 */
        private updatePoint();
        private onClickTap(e);
        protected destroy(): void;
    }
}
declare module club {
    /**俱乐部跑马灯 */
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
declare module club {
    /**
     * 老友圈公告界面
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
declare module club {
    class ClubData {
        private static _instance;
        static getInstance(): ClubData;
        /**老友圈桌面操作 1:管理  2:成员列表 3:申请列表 4:战况查询*/
        clubChoice: number;
        /**老友圈管理操作 记录当前打开的桌面的老友圈ID */
        clubmatchid: number;
        /**老友圈管理操作 管理页面中所选的的老友圈ID */
        matchid: number;
        /**老友圈管理操作 定时器暂停时间 */
        suspendTimer: number;
        /**老友圈管理操作  定时器恢复时间 */
        renewTimer: number;
        /**存进入的当前房间的老友圈ID 如果有*/
        EnterClubId: number;
        /**存进入的当前房间的房间ID */
        EnterRoomId: number;
        /**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
        clubDayChose: number;
        /**老友圈管理操作 当前的老友圈桌面是否为房主 */
        isClubOwner: boolean;
        /**默认服务器刷新俱乐部数据  1为5秒前端发送请求数据 */
        clubRefresh: number;
        /**显示刮刮乐 */
        isShowScratch: number;
        /**俱乐部风格 默认漳州风格 */
        clubStyle: CLUBSTYLE;
        /**俱乐部管理玩家列表 是否选择踢出玩家*/
        clubDeleteUser: boolean;
        /**俱乐部桌面 申请列表 */
        JoinMemberList: Cmd.JoinMemberListMatchGroupCmd_S;
        /**俱乐部所有玩家列表 */
        ClubMemberList: Cmd.MatchGroupMemberInfo[];
        /**俱乐部所有玩家列表 仅有部分数据*/
        ClubMemberMiniList: Cmd.MatchGroupMemberInfo[];
        /** 老友圈 邀请老友圈成员的房间ID 如果有存*/
        InviteRoomId: number;
        /**老友圈分享数据 */
        clubShareInfo: Cmd.ShareInfo;
        /**老友圈管理操作 当前的老友圈桌面是否为房主 或者管理员 */
        isClubManage: boolean;
        /**导入成员列表 选中的matchid */
        ClubImportMatchId: number;
        /** 导入成员列表选中的UID */
        PartnerImportUidList: number[];
        /** 合伙人 获取当前选择老友圈包含的成员*/
        PartnerImportList: Cmd.MatchGroupMemberInfo[];
        /** 合伙人 默认返回的matchid*/
        PartnerMatchId: number;
        /**审核列表 */
        applyRecordList: Cmd.GetApproveRecordMatchGroupCmd_S;
    }
    enum CLUBSTYLE {
        ZHANGZHOU = 0,
        GUANGDONG = 1,
    }
}
declare module club {
    /**
     * 老友圈成员列表界面
     */
    class ClubPlayerListPanel extends commonpanel.LobbyBaseEuiPanel {
        static Instanc: ClubPlayerListPanel;
        /**底部蒙版 */
        private _rect;
        /**所有玩家列表 */
        private _list;
        /**在线玩家列表 */
        private _onlinelist;
        /**左侧用户容器 */
        private _UserGroup;
        /** 所有玩家选项*/
        private allUserButton;
        /** 显示所有玩家的文本 */
        private alluserText;
        /**在线玩家选项 */
        private onlineUserButton;
        /** 在线玩家文本*/
        private onlineText;
        /** 关闭按钮*/
        private closeBtn;
        /** 所有玩家容器*/
        private allScroller;
        /** 所有玩家列表*/
        private allList;
        /** 在线玩家容器*/
        private onlineScroller;
        /** 在线玩家列表*/
        private onlineList;
        /** 右侧管理员容器 非管理员不显示*/
        private _managerGroup;
        /** 申请加入按钮*/
        private _applyBtn;
        /** 手动添加按钮 */
        private _addBtn;
        /** 搜索成员按钮*/
        private _searchBtn;
        /** 踢人按钮 */
        private _kickBtn;
        /**是否管理员 */
        private isOwner;
        /**数组集合器 */
        private _onlineListArr;
        private _allListArr;
        constructor(isOwner: boolean);
        protected childrenCreated(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        /**设置按钮开关 */
        private OnOpen();
        private OnClose();
        showList(evt: uniLib.ZqEvent): void;
        private itemTap(evt);
        /** 更新所有玩家数据*/
        private updateAllList();
        /** 更新在线数据*/
        private updateOnlineList();
        private onClick(evt);
    }
}
declare module club {
    /**老友圈备注分数页面 */
    class ClubRemarksScorePanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /** 输出显示*/
        private _inputText;
        private _num1;
        private _num2;
        private _num3;
        private _num4;
        private _num5;
        private _num6;
        private _num7;
        private _num8;
        private _num9;
        private _num0;
        /** 删除按钮*/
        private _deleteBtn;
        /**减按钮 */
        private _reduceBtn;
        /** 加按钮*/
        private _addBtn;
        /** 确认按钮*/
        private _sureBtn;
        /**记录字段 */
        private _curNumStr;
        /**记录被操作玩家ID */
        private _uid;
        /** */
        private _symbol;
        constructor(uid: number);
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private btnClick(evt);
        private changeTxt(num);
        /**更改分数 */
        private changeRemarks();
    }
}
declare module club {
    /**
     * 单个房间详情
     */
    class ClubRoomdetails extends commonpanel.LobbyBaseEuiPanel {
        private info;
        private roomInfo;
        /**邀请按钮 */
        private _inviteBtn;
        /**加入按钮 */
        private _enterRoomBtn;
        /**关闭按钮 */
        private _closeBtn;
        /**玩家list */
        private _userList;
        /**桌号 */
        private _deskIdText;
        /**时间 */
        private _timeText;
        constructor();
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setDate(date: Cmd.MathGroup): void;
        setUserDate(userDate: Cmd.MathGroupRoomInfo): void;
        private onClickTap(e);
    }
}
declare module club {
    /**
     * 单个房间详情 玩家头像
     */
    class ClubRoomdetailshead extends eui.ItemRenderer {
        private info;
        /** 状态图片*/
        private _typeImg;
        /** 玩家头像*/
        private _headImg;
        /** 玩家姓名*/
        private _nameText;
        /** 玩家ID*/
        private _idText;
        /**进房时间 */
        private _timeText;
        constructor();
        protected dataChanged(): void;
    }
}
declare module club {
    /**老友圈搜索该俱乐部玩家 */
    class ClubSearchMemberPanel extends commonpanel.LobbyBaseEuiPanel {
        /**搜索按钮 */
        private _searchBtn;
        /**输入框 */
        private _searchEditableText;
        /**关闭按钮 */
        private _closeBtn;
        /** 用户列表*/
        private _menberList;
        /** 用户列表容器*/
        private _menberListArray;
        /** 暂无数据提示*/
        private _tishiText;
        /** 搜索出来的数组*/
        private searchArray;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**更新搜索数据 */
        showList(evt: uniLib.ZqEvent): void;
        private onClick(evt);
        /**搜索数据 */
        private searchMember(value);
        /**更新数据*/
        setdata(list: Cmd.MatchGroupMemberInfo[]): void;
    }
}
declare module club {
    /**
     * 查看玩家个人信息面板
     */
    class ClubUserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /**踢出按钮 */
        private _kickBtn;
        /** 昵称*/
        private nameTxt;
        /**ID */
        private idTxt;
        /**头像 */
        private headImg;
        private info;
        constructor(Data: Cmd.MatchGroupMemberInfo);
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private onClick(evt);
    }
}
declare module club {
    class CreateMatchSetPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 游戏名称*/
        private _gameNameLabel;
        /**老友圈名称 */
        private _clubNameInput;
        /**副房主ID */
        private _userIdInput;
        /** 管理员ID*/
        private _user2IdInput;
        /**修改按钮 两种情况 */
        private _modifyBtn;
        /**创建俱乐部 */
        private _creatBtn;
        /**确认修改俱乐部 */
        private _sureSetBtn;
        /** 房主授权*/
        private _permissionCheck;
        /**房主授权 */
        private _permissionLabel;
        /** 游戏玩法属性*/
        private _req;
        /**改变老友圈游戏属性 */
        private _clubmss;
        /**需要修改的匹配号ID */
        private _changeMatchId;
        /** 1 创建  2 修改*/
        private _state;
        /**是否选中房主授权 */
        private _checkType;
        /**当前游戏ID 云霄和跑得快暂时需要加大赢家*/
        private _gameId;
        /** 大赢家区域*/
        private _bigWinGroup;
        /** 大赢家输入*/
        private _bigWinInput;
        /**大赢家提示 */
        private _tipsBtn;
        /** 管理员可清除战绩 */
        private _cleanRcordCheck;
        /** 管理员可清除战绩*/
        private _cleanRcordLabel;
        /**是否选中管理员可清除战绩 */
        private _cleancheckType;
        private _data;
        constructor(data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S);
        protected childrenCreated(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /** 修改玩法显示已有数据*/
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
declare module club {
    class DataManage {
        static MatchMemberTypeToString(type: number): "游  客" | "白名单" | "黑名单" | "同桌限制" | "VIP";
        static MatchMemberTypeToColor(type: number): 4746562 | 4783872 | 13313060 | 12216577 | 16041845;
    }
}
declare module club {
    /**手动添加玩家的数据显示  */
    class ClubPartnerAddItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** 玩家id*/
        private _idText;
        /** 添加成员页面所用按钮*/
        private _addBtn;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn;
        /** 搜索成员按钮状态*/
        private _typeText;
        /**已添加提示 */
        private _tishiText;
        /**搜索玩家数据 */
        private searchInfo;
        /** 搜索出来的结果 */
        private search;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**群主 合作群添加合伙人*/
    class ClubPartnerAddPanel extends commonpanel.LobbyBaseEuiPanel {
        /**搜索按钮 */
        private _searchBtn;
        /**输入框 */
        private _searchEditableText;
        /**关闭按钮 */
        private _closeBtn;
        /** 用户列表*/
        private _menberList;
        /** 用户列表容器*/
        private _menberListArray;
        /** 暂无数据提示*/
        private _tishiText;
        /**构造玩家局数据 */
        private _list;
        /** 搜索出来的数组*/
        private searchArray;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private onClick(evt);
        /**搜索数据 */
        private searchMember(value);
        /**更新数据*/
        setdata(list: Cmd.MatchGroupMemberInfo[]): void;
        /**输入框判断 */
        private onTextFieldFocusOut(event);
    }
}
declare module club {
    /**合伙人 手动添加玩家的数据显示  */
    class ClubPartnerImportAddItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** 玩家id*/
        private _idText;
        /** 添加成员页面所用按钮*/
        private _addBtn;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn;
        /** 搜索成员按钮状态*/
        private _typeText;
        /**已添加提示 */
        private _tishiText;
        /**搜索玩家数据 */
        private searchInfo;
        /** 搜索出来的结果 */
        private search;
        constructor();
        protected childrenCreated(): void;
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**合伙人 添加成员*/
    class ClubPartnerImportAddPanel extends commonpanel.LobbyBaseEuiPanel {
        /**搜索按钮 */
        private _searchBtn;
        /**输入框 */
        private _searchEditableText;
        /**关闭按钮 */
        private _closeBtn;
        /** 用户列表*/
        private _menberList;
        /** 用户列表容器*/
        private _menberListArray;
        /** 暂无数据提示*/
        private _tishiText;
        /**构造玩家局数据 */
        private _list;
        /** 搜索出来的数组*/
        private searchArray;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private onClick(evt);
        /**搜索数据 */
        private searchMember(value);
        /**更新数据*/
        setdata(list: Cmd.MatchGroupMemberInfo[]): void;
        /**输入框判断 */
        private onTextFieldFocusOut(event);
    }
}
declare module club {
    /**导入成员 玩家ITem */
    class ClubPartnerImportItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /**昵称 */
        private _nameText;
        /**ID */
        private _idText;
        /** 选中图标*/
        private _selectImg;
        /**玩家数据 */
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare module club {
    /**可导入成员列表 */
    class ClubPartnerImportPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /** 提交申请*/
        private _sureBtn;
        /**全选按钮 */
        private _allBtn;
        /**数据LIST */
        private _list;
        /** 选择俱乐部*/
        private _choseClubBtn;
        /**选俱乐部group */
        private _matchGroup;
        /** 选俱乐部蒙版*/
        private _choseRect;
        /** 选俱乐部背景*/
        private _choseClubBg;
        /** 俱乐部列表Scroller*/
        private _matchScroller;
        /** 俱乐部列表*/
        private matchList;
        /** */
        private _data;
        /** 列表数据*/
        private _recordsdata;
        /**集合器*/
        private _listArr;
        /**集合器*/
        private _matchListArr;
        /**老友圈列表 */
        private matchIdList;
        /**成员数组 */
        private _memberList;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        /**传数据 */
        setDate(evt: uniLib.ZqEvent): void;
        /**老友圈选项 选择老友圈 */
        private onMatchListTap(e);
        /**选中玩家*/
        private itemTap(evt);
        /**	全选 */
        private allChose();
        /**更新数据 */
        private updateList(data);
        /**更新数据 */
        private updateMatchIdList();
        private onClickTap(e);
    }
}
declare module club {
    /**群主看合伙人 成员战绩 ItemRenderer */
    class ClubPartnerMemberDetailItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /** 昵称 */
        private _nameText;
        /** 房间数*/
        private _roomNumText;
        /** 大赢家数 */
        private _winNumText;
        /**ID */
        private _uidText;
        /**x详情按钮 */
        private _detailBtn;
        /** 删除按钮*/
        private _deleteBtn;
        private _info;
        /**置灰按钮 */
        private _removeImg;
        constructor();
        protected childrenCreated(): void;
        private addListener();
        private removeListener();
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**查看战绩页面 群主看其他合伙人的战绩 */
    class ClubPartnerMemberDetailPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭 */
        private _closeBtn;
        /**列表 */
        private _list;
        /**数据 */
        private _data;
        /**各个成员的战绩数据*/
        private _partnerMemberRecordInfo;
        /**集合器*/
        private _listArr;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        /**更新数据 */
        private updateList();
        /**传数据 */
        setDate(evt: uniLib.ZqEvent): void;
        private onClickTap(e);
    }
}
/**合作群 成员战绩item */
declare module club {
    class ClubPartnerMemberRecordItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /**昵称 */
        private _nameText;
        /**id */
        private _uidText;
        /** 总房间*/
        private _roomNumText;
        /** 大赢家*/
        private _bigWinText;
        /** 战绩*/
        private _recordText;
        /** 详情按钮*/
        private _detailBtn;
        /** 删除按钮*/
        private _deleteBtn;
        /**置灰按钮 */
        private _removeImg;
        private _info;
        constructor();
        protected childrenCreated(): void;
        private addListener();
        private removeListener();
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**合作群 成员战绩 */
    class ClubPartnerMemberRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /**成员参与总房数  单位：房*/
        private _palyRoomText;
        /**总大赢家数 单位：次*/
        private _bigWinText;
        /**成员参与总人数 单位：人*/
        private _playMemberText;
        /**共有成员数 单位：人 */
        private _allMemberText;
        /** 导入成员按钮*/
        private _importBtn;
        /** 手动添加按钮*/
        private _addBtn;
        /**数据LIST */
        private _list;
        /**选择日子按钮 */
        private _choseDayBtn;
        /**选择日group */
        private _dayTypeGroup;
        /**选择日背景*/
        private _choseRect;
        /** 选择日 今日数据*/
        private _todayBtn;
        /**选择日 昨日数据 */
        private _yesterdayBtn;
        /**选择日 前日数据 */
        private _qianBtn;
        /** */
        private _data;
        /**各个成员的战绩数据*/
        private _partnerMemberRecordInfo;
        /**集合器*/
        private _listArr;
        constructor();
        protected childrenCreated(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**传数据 */
        setDate(evt: uniLib.ZqEvent): void;
        /**传数据 */
        updateDate(evt: uniLib.ZqEvent): void;
        /**更新视图 */
        private update();
        /**更新数据 */
        private updateList();
        private onClickTap(e);
    }
}
declare module club {
    /**俱乐部成员列表详情 */
    class ClubPartnerRecordDetailPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /** 头像*/
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** id*/
        private _uidText;
        /** 备注*/
        private _remarksText;
        /**提示信息 */
        private _tishiText;
        /**归属人 */
        private _belongText;
        /**备注 */
        private _remark;
        /**滑块 */
        private _scroller;
        /**列表 */
        private _list;
        private _listArr;
        /**玩家数据 */
        private _info;
        /**当前页数 */
        private _curPage;
        /**总页数 */
        private _totalPage;
        /**数据 */
        private _AllRecordArr;
        constructor(parm: Cmd.MatchGroupMemberInfo);
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private onClickTap(e);
        /**接收数据 */
        showData(evt: uniLib.ZqEvent): void;
        /**添加数据*/
        private addData(arr);
        /**单独加 */
        private addListen();
        /**获取战绩消息 */
        getData(): void;
        /**滑到底加载其他页数据 */
        private checkTop(evt);
    }
}
declare module club {
    /**合作群 合作群战绩 群主页面 合伙人数据*/
    class ClubPartnerRecordItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg;
        /**昵称 */
        private _nameText;
        /**id */
        private _uidText;
        /** 总房间数*/
        private _roomNumText;
        /**总人次 */
        private _palyerText;
        /** 总大赢家*/
        private _bigWinText;
        /**成员数 */
        private _numText;
        /** 详情按钮*/
        private _detailBtn;
        /**删除按钮 */
        private _deleteBtn;
        private _info;
        /**置灰按钮 */
        private _removeImg;
        constructor();
        protected childrenCreated(): void;
        private addListener();
        private removeListener();
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**合作群 合作群战绩 群主页面 */
    class ClubPartnerRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮*/
        private _closeBtn;
        /**合作人数*/
        private _partnerNumText;
        /**添加合伙人按钮 */
        private _addPartnerBtn;
        /**数据LIST */
        private _list;
        /**选择日子按钮 */
        private _choseDayBtn;
        /**选择日group */
        private _dayTypeGroup;
        /**选择日背景*/
        private _choseRect;
        /** 选择日 今日数据*/
        private _todayBtn;
        /**选择日 昨日数据 */
        private _yesterdayBtn;
        /**选择日 前日数据 */
        private _qianBtn;
        /** */
        private _data;
        /** 列表数据*/
        private _recordsdata;
        /**集合器*/
        private _listArr;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        /**传数据 */
        setDate(evt: uniLib.ZqEvent): void;
        /**更新数据 */
        private updateList();
        private onClickTap(e);
    }
}
declare module club {
    /**移出成员页面 */
    class ClubPartnerRemoveMemberPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        private _sureBtn;
        /** */
        private _text;
        /** 头像资源*/
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** id*/
        private _idText;
        /**提示文字 */
        private _tipsText;
        private _info;
        constructor(member: Cmd.MatchGroupMemberInfo);
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**移出合伙人页面 */
    class ClubPartnerRemovePanterPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        private _sureBtn;
        /** */
        private _text;
        /** 头像资源*/
        private _headImg;
        /** 昵称*/
        private _nameText;
        /** id*/
        private _idText;
        /**提示文字 */
        private _tipsText;
        private _info;
        constructor(member: Cmd.MatchGroupMemberInfo);
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**定时器 */
    class ClubMemberTimerPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /**确定按钮*/
        private _sureBtn;
        /**暂停 小时 */
        private _suspendHour;
        /**暂停 分钟*/
        private _suspendMinute;
        /**恢复 小时 */
        private _renewHour;
        /**恢复 分钟 */
        private _renewMinute;
        /**重置暂停 */
        private _resetSuspendBtn;
        /**重置恢复*/
        private _resetRenewBtn;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        private onClick(evt);
        /**输入框判断 */
        private onHourTextFocusOut(event);
        /**输入框判断 */
        private onMinuteTextFocusOut(event);
        /**发送时间 */
        private sendTimer();
    }
}
declare module club {
    class MatchAddYelloPanel extends commonpanel.LobbyBaseEuiPanel {
        private uidEditableText;
        private yesBtn;
        private cancleBtn;
        private uid;
        private matchId;
        /**
         *绑定黄名单面板
         */
        constructor(matchId: number, uid: number);
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        private onClick(e);
        destroy(): void;
    }
}
declare module club {
    /**
     * 战况item
     */
    class MatchFightingItem extends eui.ItemRenderer {
        /**index编号 */
        private _tableNoText;
        /**桌号 */
        private _tableIdText;
        /**时间 */
        private _timeText;
        /**战绩列表 */
        private nameandscore;
        /** 查看按钮*/
        private _detailBtn;
        private _info;
        constructor();
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**玩家战绩单个信息 */
    class MatchFightingNSPanel extends eui.ItemRenderer {
        /** 昵称*/
        private names;
        /** 分数*/
        private score;
        private info;
        constructor();
        protected dataChanged(): void;
    }
}
declare module club {
    /**
     * 匹配号管理
     */
    class MatchManagePanel extends commonpanel.LobbyBaseEuiPanel {
        static Instanc: MatchManagePanel;
        /**输入玩家账号 添加黑白名单 输入栏 */
        private uidEditableText;
        /** 添加至白名单*/
        private addWhiteButton;
        /** 添加至黑名单*/
        private addBlackButton;
        /** 关闭按钮*/
        private closeButton;
        /**设置老友圈玩法 */
        private setting;
        /**刷新按钮 */
        private refrshBtn;
        /**选择俱乐部按钮 */
        private _choseClubBtn;
        /** 老友圈房间列表*/
        private matchList;
        /**选择俱乐部号group */
        private _matchGroup;
        /**选择俱乐部号背景 */
        private _choseClubBg;
        /**选择俱乐部号Rect */
        private _choseRect;
        /** 选择俱乐部号滑动区域*/
        private _matchScroller;
        /**导入按钮 */
        private _importBtn;
        /**清除战绩按钮 */
        private _deleteRecordBtn;
        /** 房间详情*/
        private detailsButton;
        /** 成员列表*/
        private memberButton;
        /** 战况查询*/
        private fightingButton;
        /** 同桌限制*/
        private yelloListButton;
        /**数据容器 */
        private matchListArray;
        private fightingListArray;
        private memeberListArray;
        private yelloListArray;
        private matchTableListArray;
        /** 房间详情group*/
        private detailsGroup;
        /**当前游戏人数 */
        private gameMemberLabel;
        /**老友圈名称 */
        private matchName;
        /**房主名 */
        private ownerLabel;
        /**老友圈ID */
        private matchIdLabel;
        /** 已开房间数*/
        private waitMemberLabel;
        /**不限时 */
        private delTimeLabel;
        /** 暂停、恢复开房按钮 */
        private terminationButton;
        /** 解散老友圈按钮*/
        private dissolutionButton;
        /** 分享按钮 */
        private shareButton;
        /** 加入房间按钮*/
        private joinMatchButton;
        /**老友圈桌子 */
        private matchTableList;
        /** 计时器按钮*/
        private timerButton;
        /**成员列表GROUP */
        private memberGroup;
        /**成员列表 */
        private memeberList;
        /**输赢显示状态图 */
        private _dayTypeImg;
        private _dayTypeBg;
        private _dayTypeDownImg;
        /**输赢下拉框区域 */
        private _morewinloseGroup;
        /**输赢蒙版 */
        private _winloseRect;
        /**今日输赢选项 */
        private _todaywin;
        /**昨日输赢选项 */
        private _yesterdaywin;
        /**前天输赢选项 */
        private _qianwin;
        /**输入框 */
        private _searchIdText;
        /**搜索ID按钮 */
        private _searchBtn;
        /** 搜索出来的数组*/
        private searchArray;
        /** 战况查询group*/
        private fightingGroup;
        /**战绩列表 */
        private fightingList;
        /**数据 */
        private _fightRecordArr;
        /**今日开房 */
        private todaynum;
        /**昨日开房 */
        private yesterdaynum;
        /**7天开房 */
        private sevendaynum;
        /**30天开房 */
        private thirtydaynum;
        /**当前页数 */
        private _curPage;
        /**总页数 */
        private _totalPage;
        /**当前俱乐部matchid */
        private _matchId;
        /** 选择今日昨日前日输赢*/
        private _choseDayBtn;
        /**选择日期 */
        private _dayTypeGroup;
        /**选择蒙版 */
        private _choseRect1;
        /** 今日输赢按钮*/
        private _todayBtn;
        /** 昨日输赢按钮*/
        private _yesterdayBtn;
        /** 前日输赢按钮*/
        private _qianBtn;
        /** 房间数*/
        private _roomText;
        /**战况查询 今日 昨日 前日选项 */
        private _clubDayChose;
        /**战况查询 记录当前数据记录的 日  */
        private _dayChose;
        /**滑块 */
        private _scroll;
        /**提示字 */
        private _tipsText;
        /**同桌限制group */
        private yelloListGroup;
        /**同桌限制列表 */
        private yelloList;
        /**房间数据 */
        private roomList;
        /**选择房间详情 */
        private _choseDetailBtn;
        /**房间详情 房间信息 */
        private _roomDetailGroup;
        /**选择蒙版 */
        private _roomDetailRect;
        private _roomTableBtn;
        private _roomInfoBtn;
        /**数据 */
        private matchDetailList;
        /**原 桌子信息 */
        private _tableScroller;
        /**新 桌子详情 */
        private _detailScroller;
        private _tipTxt;
        protected childrenCreated(): void;
        constructor();
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**更新俱乐部房间 */
        updataMatchList(): void;
        /** 更新成员列表*/
        updataMemeberList(): void;
        /**把0分放后面 */
        private key;
        /** 0数组*/
        private zeroArr;
        /** 0位置*/
        private zeroIndex;
        /**给成员列表排序 群主和管理员在最前面，接下去是输最多到输最少，然后赢最少赢最多，然后接下去才是0分的*/
        private sortMemberList();
        /**更新同桌限制 */
        private updateYelloList();
        /**更新桌子 */
        updataTableList(): void;
        /**更新房间详情 */
        updataDetails(curMath: Cmd.MathGroup): void;
        private matchIdList;
        private waitList;
        initReturnMatchGroup(evt: uniLib.ZqEvent): void;
        /**更新按钮视图 */
        updataButtonEnabled(): void;
        private member;
        private sharingMember;
        initMemberList(evt: uniLib.ZqEvent): void;
        /**修改备注分数 成功更新成员列表数据 */
        private updateRemarkPoint(evt);
        /**修改备注昵称 成功更新成员列表数据 */
        private updateRemarkNickName(evt);
        /**更新清楚数据视图*/
        private updateWinPoint(evt);
        /**黄名单列表 */
        private yelloIndoList;
        initYelloList(evt: uniLib.ZqEvent): void;
        private gameHistroys;
        initHistory(history: Cmd.GetGameDataHistoryCmd_S): void;
        private switchWindow();
        /**
         * 显示输赢状态
         */
        private switchDayType();
        private onClickTap(e);
        showFightData(evt: uniLib.ZqEvent): void;
        /**添加数据*/
        private addData(arr);
        /**点每日输赢更新数据 */
        private updateView();
        /**获取战绩消息 */
        getData(): void;
        /**单独加 */
        private addListen();
        /**滑到底加载其他页数据 */
        private checkTop(evt);
        readonly selectMatchId: number;
        /**老友圈选项 选择老友圈 */
        private onMatchListTap(e);
        /**房间详情 点击桌子 */
        private onTableListTap(e);
        private onShare();
        private shareInfo;
        private onShareTap();
    }
}
declare class MatchTableInfoItem extends eui.ItemRenderer {
    /**index编号 */
    private _tableNoText;
    /**桌号 */
    private _tableIdText;
    /**时间 */
    private _timeText;
    /**战绩列表 */
    private nameandscore;
    /**局数 */
    private _tableNum;
    private _info;
    constructor();
    protected dataChanged(): void;
}
/**玩家战绩单个信息 */
declare class MatchInfotem extends eui.ItemRenderer {
    /** 昵称*/
    private names;
    /** 分数*/
    private score;
    private info;
    constructor();
    protected dataChanged(): void;
}
declare module club {
    /**
     * 成员列表item
     */
    class MatchMemberItem extends eui.ItemRenderer {
        /**玩家ID */
        private _uidText;
        /** 姓名*/
        private _nametext;
        /** 备注*/
        private _remarksText;
        /** 今、昨、前日输赢*/
        private _winloseText;
        /**大赢家次数 */
        private _winNumText;
        /**查看按钮 */
        private _detailBtn;
        /**清除备注按钮 */
        private _cleanRemarksBtn;
        /**点击备注按钮 */
        private _writeRemarksbtn;
        /**操作 */
        private operationGroup;
        /**操作显示 */
        private MatchMemberTypeToString;
        /**操作显示颜色 */
        private MatchMemberTypeToColor;
        private info;
        constructor();
        addListener(): void;
        removeListener(): void;
        protected dataChanged(): void;
        private onClickTap(e);
        private onLabelTap(e);
    }
}
declare module club {
    /**
     * 消息列表item
     */
    class MatchMessageItem extends eui.ItemRenderer {
        /**时间 */
        private _timeText;
        /**同意按钮 */
        private _agreeButton;
        /**拒绝按钮 */
        private _disAgreeButton;
        /**玩家昵称 */
        private _nameText;
        /**备注信息 */
        private _contenRemarksText;
        /**玩家Id */
        private _idText;
        /**玩家头像 */
        private _headImg;
        /**合作群组员Id */
        private _partnerIdText;
        /**合作群组员头像 */
        private _partnerHeadImg;
        /**合作群组员昵称 */
        private _partnerNameText;
        /** 合作群group*/
        private _partnerGroup;
        /** 没有合作群信息*/
        private _nopartnerTips;
        constructor();
        protected dataChanged(): void;
        private onClickTap(e);
    }
}
declare module club {
    /**
     * 游戏列表
     */
    class MatchRadioButton extends eui.ItemRenderer {
        /**俱乐部号 */
        private _clubId;
        /**背景图 */
        private _itemBg;
        constructor();
        protected dataChanged(): void;
    }
}
declare module club {
    /**
     * 每个匹配场中的桌子
     */
    class MatchTableItem extends eui.ItemRenderer {
        private contentLabel;
        info: Cmd.MathGroupRoomInfo;
        constructor();
        protected dataChanged(): void;
    }
}
declare module club {
    /**黄名单 */
    class MatchYelloItem extends eui.ItemRenderer {
        /**玩家1 昵称*/
        private _nameText;
        /**玩家1 id */
        private _uidText;
        /** 玩家2 昵称*/
        private _nameText1;
        /** 玩家2 id*/
        private _uidText1;
        private _removeButton;
        constructor();
        protected dataChanged(): void;
        /**移除黄名单 */
        private removeHandel(e);
    }
}
