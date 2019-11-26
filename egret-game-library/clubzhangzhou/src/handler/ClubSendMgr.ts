module club {
	export class ClubSendMgr {
		/**
		 * 请求匹配号信息
		 * */
		public static requestMatchData(isClub: number = 0): void {
			var req = new Cmd.RequestMatchGroupCmd_C();
			if (isClub)
				req.isClub = isClub
			NetMgr.tcpSend(req);
		}
		/**请求老友圈列表 */
		public static requestClubMatchList(): void {
			let cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
			cmd.isClub = 1;
			NetMgr.tcpSend(cmd);
		}
		/**
		 * 房主请求老友圈信息
		 */
		public static requestRequestMatchGroupCmd(matchId: number): void {
			var req = new Cmd.RequestMatchGroupCmd_C();
			req.matchId = matchId
			NetMgr.tcpSend(req);
		}
		/**邀请指定玩家到俱乐部中 */
		public static InviteMemberMatchGroupCmd(matchId: number, uids: number[]): void {
			let cmd = new Cmd.InviteMemberMatchGroupCmd_CS();
			cmd.matchId = matchId;
			cmd.uids = uids;
			if (ClubData.getInstance().InviteRoomId != 0 ? ClubData.getInstance().InviteRoomId : false) {
				cmd.roomId = ClubData.getInstance().InviteRoomId;
			}
			NetMgr.tcpSend(cmd);
		}
		/**
		 * 请求战绩
		 * @param globalRoomId 全局游戏房间id
		 *  */
		public static getGameDetailHistory(globalRoomId: number): void {
			var req = new Cmd.GetGameDetailHistoryCmd_C();
			req.globalRoomId = globalRoomId;
			NetMgr.tcpSend(req);
		}
		/**
		 * 战绩获取 
		 * @param matchId 单个俱乐部的战绩
		 * @param curPage 第几页数据
		 * @param typ 请求类型 1/2/3/4 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩
		 * @param which 操作那一项 1/2/3 今日、昨日、前日
		 */
		public static getGameDataHistoryForMatch(matchId: number, curPage: number, which: number, typ: number): void {
			let req = new Cmd.GetGameDataHistoryForMatchCmd_C();
			req.matchId = matchId;
			req.curPage = curPage;
			req.typ = typ;
			req.which = which;
			NetMgr.tcpSend(req);
		}
		/**
		 * 俱乐部管理页面 单个玩家数据
		 * @param matchId 单个俱乐部的战绩
		 * @param UId 玩家Id
		 * @param curPage 第几页数据
		 * @param typ 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩/合伙人那里点玩家详情跟管理员那里点玩家详情
		 * @param which 操作那一项 1/2/3 今日、昨日、前日
		 *  */
		public static getGameDataHistoryToUId(matchId: number, UId: number, curPage: number, typ: number, which: number): void {
			let req = new Cmd.GetGameDataHistoryForMatchCmd_C();
			req.matchId = matchId;
			req.uid = UId;
			req.curPage = curPage;
			req.which = which;
			req.typ = typ;
			NetMgr.tcpSend(req);
		}
		/**
		 * 俱乐部管理页面 单个玩家数据 合伙人
		 * @param matchId 单个俱乐部的战绩
		 * @param UId 玩家Id
		 * @param curPage 第几页数据
		 * @param typ 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩/合伙人那里点玩家详情跟管理员那里点玩家详情
		
		 * */
		public static getGameDataHistoryToUIdgForPartner(matchId: number, UId: number, curPage: number, typ: number): void {
			let req = new Cmd.GetGameDataHistoryForMatchCmd_C();
			req.matchId = matchId;
			req.uid = UId;
			req.curPage = curPage;
			req.typ = typ;
			NetMgr.tcpSend(req);
		}

		/**
		 * 战绩统计获取 看在此老友圈自己的战绩
		 * @param curPage 分页处理 当前请求的第几页
		 * @param matchId 单个俱乐部的战绩
		 */
		public static getGameDataHistorytoMatchMyself(matchId: number, curPage: number): void {
			let req = new Cmd.GetGameDataHistoryCmd_C();
			req.matchId = matchId;
			req.curPage = curPage;
			NetMgr.tcpSend(req);
		}
		/**
		 *  老友圈管理 成员列表 添加、清除备注分数
		 * @param matchId 老友圈ID
		 * @param targetUid  对象id
		 * @param opType  操作类型 1、2 添加、清除
		 * @param point  具体操作哪一天的数据 0、1、2 今天、昨天、前天
		 * @param which  备注分数
		 */
		public static RemarkPointMatchGroupCmd(matchId: number, targetUid: number, opType: number, point: number, which: number): void {
			let cmd = new Cmd.RemarkPointMatchGroupCmd_CS();
			cmd.matchId = matchId;
			cmd.targetUid = targetUid;
			cmd.opType = opType;
			cmd.point = point;
			cmd.which = which;
			NetMgr.tcpSend(cmd);
		}
		/**
		 * 老友圈玩家列表批量管理操作
		 * @param matchId 老友圈ID	
		 * @param reply 操作选项 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
		 * @param uids 所有需要操作的玩家列表
		 */
		public static ReplyJoinMemberListMatchGroupCmdBatch(matchId: number, reply: number, uids: number[]): void {
			var req = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
			req.matchId = ClubData.getInstance().clubmatchid;
			req.uids = uids;
			req.reply = reply;
			req.matchId = matchId
			NetMgr.tcpSend(req);
		}
		/**老友圈审核列表 */
		public static requestGetApproveRecordMatchGroupCmd_C(matchId: number, page: number, uid: number) {
			let req: Cmd.GetApproveRecordMatchGroupCmd_C = new Cmd.GetApproveRecordMatchGroupCmd_C;
			req.matchId = matchId;
			req.curPage = page;
			req.uid = uid;
			NetMgr.tcpSend(req);
		}
		/**
		 * 老友圈玩家列表单个玩家管理操作
		 * @param matchId 老友圈ID	
		 * @param reply 操作选项 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
		 * @param uid 被操作的玩家Id
		 */
		public static ReplyJoinMemberListMatchGroupCmd(matchId: number, reply: number, uid: number): void {
			var req = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
			req.matchId = ClubData.getInstance().clubmatchid;
			req.uid = uid;
			req.reply = reply;
			req.matchId = matchId
			NetMgr.tcpSend(req);
		}

	}
}