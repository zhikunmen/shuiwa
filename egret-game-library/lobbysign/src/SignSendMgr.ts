module lobbysign {
    export class SignSendMgr {
        /**请求签到数据 */
        public static getUserSignInfo(): void {
            let req = new Cmd.UserSignInfoLobbyCmd_C();
            req.lobbyId = MJLobbyData.getInstance().lobbyId;
            NetMgr.tcpSend(req);
        }
        /**
         * 每日签到
         * 是否为每日签到
         *  */
        public static getSignToday(today: boolean, continueSignId?: number): void {
            let req;
            if (today) {
                req = new Cmd.UserSignTodayLobbyCmd_C();
            } else {
                req = new Cmd.UserSignContinueLobbyCmd_C();
                req.continueSignId = continueSignId;
            }
            req.lobbyId = MJLobbyData.getInstance().lobbyId;
            NetMgr.tcpSend(req);
        }
    }
}