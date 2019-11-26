module club {
	export class ClubConst {
		public static RES_JSON = "resource/club.res.json";
		public static RES_JSON_GUANGDONG = "resource/club_guangdong.res.json"
		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static PUB_CLUB: string = "pub_club";
		/**数据无误 */
		public static SUCCESS: number = 0;
		/** */
		public static ActiveDetailRoom: string = "ActiveDetailRoom";
		/**历史匹配记录 */
		public static HistoryMatchIdList = "HistoryMatchIdList";
		/**老友圈用历史匹配记录 */
		public static HistoryClubList = "HistoryClubList";
		/**匹配号数据 */
		public static ReturnMatchGroup = "ReturnMatchGroup";
		/**匹配号管理数据 */
		public static ReturnMatchGroupManage = "ReturnMatchGroupManage";
		/**俱乐部广播当前桌子最新状况事件 */
		public static LatestMatchRoom = "LatestMatchRoom";
		/**白名单消息列表 */
		public static JoinMemberListMatch = "JoinMemberListMatch";
		/**申请进入房间 */
		public static NotifyImportNoteCmd = "NotifyImportNoteCmd";
		/**获取清空的操作记录 */
		public static GetCleanRecordMatchGroup = "GetCleanRecordMatchGroup";
		/**返回老友圈公告信息 */
		public static CLUB_NOTICE = "CLUB_NOTICE";
		/**返回黑白名单 */
		public static MemberInfoMatchGroup = "MemberInfoMatchGroup";
		/**大厅查找玩家信息*/
		public static UserInfoSearchLobby = "UserInfoSearchLobby";
		/**返回黄名单列表 */
		public static ReturnYellowList = "ReturnYellowList";
		/**离开匹配组返回  */
		public static LEAVE_MATCHGROUP2 = "LEAVEMATCHGROUP2";
		/** 战绩数据按页返回*/
		public static HISTORY_DATA = "HISTORY_DATA";
		/**获取可邀请成员列表 */
		public static GetCanInviteMemberList = "GetCanInviteMemberList";
		/**邀请指定玩家到俱乐部中 */
		public static InviteMemberMatchGroup = "InviteMemberMatchGroup";
		/**邀请指定玩家到俱乐部中 广播 */
		public static InviteMemberMatchGroupBrd = "InviteMemberMatchGroupBrd";
		/**俱乐部添加、清除备注分数 */
		public static RemarkPointMatchGroup = "RemarkPointMatchGroup";
		/**俱乐部 添加、清除昵称备注*/
		public static RemarkNickNameMatchGroup = "RemarkNickNameMatchGroup";
		/** 清除数据返回*/
		public static CleanMemberWinPointMatchGroup = "CleanMemberWinPointMatchGroup";
		/** 俱乐部获取可导入群列表 */
		public static GetCanImportMemberListMatchGroup = "GetCanImportMemberListMatchGroup";
		/**俱乐部 成员导入*/
		public static ImportMemberListMatchGroup = "ImportMemberListMatchGroup";

		/**群主进入合伙人界面 获取合伙人数据 */
		public static GetPartnerRecordsMatchGroup = "GetPartnerRecordsMatchGroup";
		/**操作指定合伙人 */
		public static OperatePartnerMatchGroup = "OperatePartnerMatchGroup";
		/**群主申请解除合伙人 发送给合伙人的广播 */
		public static RemovePartnerMatchGroup = "RemovePartnerMatchGroup";
		/**合伙人 回复是否解除合伙关系 */
		public static ReplyRemovePartnerMatchGroup = "ReplyRemovePartnerMatchGroup";
		/**获取组员战绩 */
		public static GetMemberRecordsMatchGroup = "GetMemberRecordsMatchGroup";
		/**获取可导入组员列表 */
		public static GetCanImportMemberList2MatchGroup = "GetCanImportMemberList2MatchGroup";
		/**添加指定组员到俱乐部中 */
		public static ImportMember2MatchGroup = "ImportMember2MatchGroup";
		/**移除指定组员 */
		public static RemoveMemberMatchGroup = "RemoveMemberMatchGroup";
		/**老友圈战绩  管理界面战况查询*/
		public static MATCH_HISTORY_FOR_MANAGE: string = "MATCH_HISTORY_FOR_MANAGE";
		/**老友圈战绩  管理员点击俱乐部桌面群战绩*/
		public static MATCH_HISTORY_FOR_DESK: string = "MATCH_HISTORY_FOR_DESK";
		/**老友圈战绩  管理员点击我的战绩或群员点击本群战绩*/
		public static MATCH_HISTORY_FOR_MYSELF: string = "MATCH_HISTORY_FOR_MYSELF";
		/**老友圈战绩  获取指定成员的战绩*/
		public static MATCH_HISTORY_FOR_UID: string = "MATCH_HISTORY_FOR_UID";
		/**老友圈战绩   合伙人那里点玩家详情跟管理员那里点玩家详情*/
		public static MATCH_HISTORY_FOR_PARTNER: string = "MATCH_HISTORY_FOR_PARTNER";
		/**审核记录列表 */
		public static GET_APPLYRECORD_LIST: string = "get_applyrecord_list";
		
		/**俱乐部桌面桌子创建房间选项*/
		public static CLUB_CREATEDESK: number = 9;
		/**俱乐部桌面桌子前八张桌子显示*/
		public static CLUB_DESKSHOW: number = 8;
		/**俱乐部桌面桌 无人座位*/
		public static DESK_NOUSER: number = 8;
		/**俱乐部邀请玩家的状态 离线*/
		public static OnlineState_Offline: number = 0;
		/**俱乐部邀请玩家的状态 在线 空闲状态*/
		public static OnlineState_Online: number = 1;
		/**俱乐部邀请玩家的状态 网络差*/
		public static OnlineState_Slow: number = 2;
		/**俱乐部邀请玩家的状态 离开,切后台*/
		public static OnlineState_Leave: number = 3;
		/**俱乐部邀请玩家的状态 电话中*/
		public static OnlineState_Calling: number = 4;
		/**俱乐部邀请玩家的状态 托管状态*/
		public static OnlineState_Hosting: number = 5;
		/**俱乐部邀请玩家的状态 排队中,匹配号用*/
		public static OnlineState_Waiting: number = 6;
		/**俱乐部邀请玩家的状态 游戏中,匹配号用*/
		public static OnlineState_Gameing: number = 7;
		/**俱乐部邀请玩家的状态 观战状态*/
		public static OnlineState_Watching: number = 8;
		/**俱乐部邀请玩家的状态 已邀请状态,漳州匹配号用*/
		public static OnlineState_Invited: number = 9;

		/**老友圈 成员列表玩家的状态 0表示游客 */
		public static CLUB_TOURIST: number = 0;
		/**老友圈 成员列表玩家的状态 1表示白名单 */
		public static CLUB_WHITE: number = 1;
		/**老友圈 成员列表玩家的状态 2表示黑名单 */
		public static CLUB_BLACK: number = 2;
		/**老友圈 成员列表玩家的状态 3表示黄名单 */
		public static CLUB_YELLOW: number = 3;
	}
	export class ClubConst1 {
		/**老友圈战绩  管理界面战况查询 1*/
		public static MATCH_HISTORY_FOR_MANAGE: number = 1;
		/**老友圈战绩  管理员点击俱乐部桌面群战绩2 */
		public static MATCH_HISTORY_FOR_DESK: number = 2;
		/**老友圈战绩  管理员点击我的战绩或群员点击本群战绩3*/
		public static MATCH_HISTORY_FOR_MYSELF: number = 3;
		/**老友圈战绩  获取指定成员的战绩4*/
		public static MATCH_HISTORY_FOR_UID: number = 4;
		/**老友圈战绩 合伙人那里点玩家详情跟管理员那里点玩家详情5*/
		public static MATCH_HISTORY_FOR_PARTNER: number = 5;
	}
}