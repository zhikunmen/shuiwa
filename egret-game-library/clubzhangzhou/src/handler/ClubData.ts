module club {
	export class ClubData {
		private static _instance: ClubData;
		public static getInstance(): ClubData {
			if (!this._instance) {
				this._instance = new ClubData();
			}
			return this._instance;
		}

		/**老友圈桌面操作 1:管理  2:成员列表 3:申请列表 4:战况查询*/
		clubChoice: number;
		/**老友圈管理操作 记录当前打开的桌面的老友圈ID */
		clubmatchid: number;
		/**老友圈管理操作 管理页面中所选的的老友圈ID */
		matchid: number;
		/**老友圈管理操作 定时器暂停时间 */
		public suspendTimer: number = 0;
		/**老友圈管理操作  定时器恢复时间 */
		public renewTimer: number = 0;
		/**存进入的当前房间的老友圈ID 如果有*/
		public EnterClubId: number;
		/**存进入的当前房间的房间ID */
		public EnterRoomId: number;
		/**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
		public clubDayChose: number = 1;
		/**老友圈管理操作 当前的老友圈桌面是否为房主 */
		public isClubOwner: boolean = false;
		/**默认服务器刷新俱乐部数据  1为5秒前端发送请求数据 */
		clubRefresh: number = 0;
		/**显示刮刮乐 */
		public isShowScratch: number;
		/**俱乐部风格 默认漳州风格 */
		public clubStyle = CLUBSTYLE.ZHANGZHOU;
		/**俱乐部管理玩家列表 是否选择踢出玩家*/
		public clubDeleteUser: boolean;
		/**俱乐部桌面 申请列表 */
		public JoinMemberList: Cmd.JoinMemberListMatchGroupCmd_S;
		/**俱乐部所有玩家列表 */
		public ClubMemberList: Cmd.MatchGroupMemberInfo[];
		/**俱乐部所有玩家列表 仅有部分数据*/
		public ClubMemberMiniList: Cmd.MatchGroupMemberInfo[];
		/** 老友圈 邀请老友圈成员的房间ID 如果有存*/
		public InviteRoomId: number = 0;
		/**老友圈分享数据 */
		public clubShareInfo: Cmd.ShareInfo;
		/**老友圈管理操作 当前的老友圈桌面是否为房主 或者管理员 */
		public isClubManage: boolean = false;
		/**导入成员列表 选中的matchid */
		public ClubImportMatchId: number = 0;
		/** 导入成员列表选中的UID */
		public PartnerImportUidList: number[] = [];
		/** 合伙人 获取当前选择老友圈包含的成员*/
		public PartnerImportList: Cmd.MatchGroupMemberInfo[];
		/** 合伙人 默认返回的matchid*/
		public PartnerMatchId: number = 0;
		/**审核列表 */
		public applyRecordList: Cmd.GetApproveRecordMatchGroupCmd_S;
	}

	export enum CLUBSTYLE {
		ZHANGZHOU,
		GUANGDONG
	}


}