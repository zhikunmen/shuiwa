module club {
	export class ClubConst {
		public static RES_JSON = "resource/club.res.json";
		public static RES_JSON_GUANGDONG = "resource/club_guangdong.res.json"
		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static PUB_CLUB: string = "pub_club";
		/** */
		public static ActiveDetailRoom: string = "ActiveDetailRoom";
		/**历史匹配记录 */
		public static HistoryMatchIdList = "HistoryMatchIdList";
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
	}
}