module friendsclub {
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

		/**
		 * 房主请求亲友圈信息
		 */
		public static requestRequestMatchGroupCmd(matchId: number): void {
			var req = new Cmd.RequestMatchGroupCmd_C();
			req.matchId = matchId
			NetMgr.tcpSend(req);
		}
	}
}