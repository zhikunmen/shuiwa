module clubnew {
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
		 * 房主请求老友圈信息
		 */
		public static requestRequestMatchGroupCmd(matchId: number): void {
			var req = new Cmd.RequestMatchGroupCmd_C();
			req.matchId = matchId
			NetMgr.tcpSend(req);
		}
		/**
		 * 操作楼层
		 */
		public static sendOFMGCmd_CS(matchId: number, floorId: number, opType: number, obj?: Cmd.CreateRoomCmd_C) {
			let req = new Cmd.OperateFloorMatchGroupCmd_CS();
			req.matchId = matchId;
			req.floorId = floorId;
			req.opType = opType;
			obj ? req.createRoom = obj : null;
			NetMgr.tcpSend(req);
		}
	}
}