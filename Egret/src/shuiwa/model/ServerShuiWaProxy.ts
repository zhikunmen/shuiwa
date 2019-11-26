namespace SWGAME {
	/**
	 *
	 * @author 
	 *
	 */
	export class ServerShuiWaProxy extends puremvc.Proxy {
		public static NAME: string = "ServerSanGongProxy";
		// /**经度 */
		// private _longitude: any;
		// /**纬度 */
		// private _latitude: any;
		// private _location:uniLib.Location;
		// private loopback: any;
		public constructor() {
			super(ServerShuiWaProxy.NAME);
		}
		public onRegister(): void {
		}
		private _config: any;
		public initServer(): void {
			console.warn("ServerSanGongProxy:" + "initServer");
			uniLib.UIMgr.instance.showProcessBar(null, 99, 100, "正在连接游戏服务器...", "", true);
			let gameId: number = Number(uniLib.BrowersUtils.GetRequest("gameId"));
			let zoneId: number = Number(uniLib.BrowersUtils.GetRequest("zoneId"));
			if (DataCache.gameInfo == null || DataCache.gameInfo.zoneInfo == null) {
				this._config = RES.getRes("sw_config_json");
				uniLib.NetMgr.init(this._config.LoginUrl, gameId ? gameId : this._config.GameID, zoneId ? zoneId : this._config.ZoneID, this.onHttpInitSucc, this.onHttpInitFail, this);
			} else {
				uniLib.NetMgr.init(uniLib.Global.defaultConfig.login_url, DataCache.gameInfo.zoneInfo.gameid, DataCache.gameInfo.zoneInfo.zoneid, this.onHttpInitSucc, this.onHttpInitFail, this);
			}
		}
        /**
         * http平台登录完成
         */
		private onHttpInitSucc(obj: any): void {
            console.warn("ServerSanGongProxy:" + "onHttpInitSucc");
            uniLib.NetMgr.initSocket(this.onSockInitSucc, this.onSockInitFail, this, "", "", "", false, true);//初始化平台socket
		}

		private onHttpInitFail(back?: any): boolean {
            console.warn("ServerSanGongProxy:" + "onHttpInitFail");
            if (back) {
                uniLib.TipsUtils.showTipsDownToUp("游戏登录失败:" + JSON.stringify(back));
			} else {
                uniLib.TipsUtils.showTipsDownToUp("游戏登录失败");
			}
			this.facade.sendNotification(AppFacadeConst.EXIT_GAME);
            uniLib.UIMgr.instance.hideLoading();
			return true;
		}

        /**
         * socket连接完成
         */
		private onSockInitSucc(): void {
            console.warn("ServerSanGongProxy:" + "onSockInitSucc");
			uniLib.UIMgr.instance.showProcessBar(null, 100, 100, "正在进入房间...", "", true);
		  	var data = new Cmd.SWEnterRoomCmd_C();
            var roomId = Number(uniLib.BrowersUtils.GetRequest("roomId"));
            var gameId = Number(uniLib.BrowersUtils.GetRequest("SWGAME"));
            var robotId = Number(uniLib.BrowersUtils.GetRequest("robotId"));
            var robotNum = Number(uniLib.BrowersUtils.GetRequest("robotNum"));

            data.roomId = roomId ? roomId : 0;
            data.globalRoomId = roomId ? roomId : 111111;
            // if (robotId > 0) {
            //     data.robotId = robotId;
            // }
            if (robotNum > 0) {
                data.robotNum = robotNum;
            }
            // if (gameId > 0) {
            //     data.gameId = gameId;
            // }
            if (SWGAME.DataCache.platParam) {
                data.globalRoomId = SWGAME.DataCache.platParam.globalRoomId;
                data.roomId = SWGAME.DataCache.platParam.roomId;
            }

            /* 调试*/
            // 只有在本地模式下才发送房间配置
            if(DEBUG) {
                var cfg:any = RES.getRes("sw_roomCfg_json");
                if (cfg) {
                    // data.roomCfg = cfg;
                    // data.robotId = 0;
                    data.robotNum = 0;
                    data.roomId = 0;
                }
            }
            this.sendData(data);

		}
	
		private onSockInitFail(back?: any): boolean {
            console.warn("ServerSanGongProxy:" + "onSockInitFail");
			if (back) {
                uniLib.TipsUtils.showTipsDownToUp("游戏服务器连接失败:" + JSON.stringify(back));
			} else {
                uniLib.TipsUtils.showTipsDownToUp("游戏服务器连接失败");
			}
			this.facade.sendNotification(AppFacadeConst.EXIT_GAME);
            uniLib.UIMgr.instance.hideLoading();
            return true;
		}
		public sendData(obj: any): void {
			// console.trace("sendData:" + JSON.stringify(obj));
			uniLib.NetMgr.tcpSend(obj);
			uniLib.NetMgr.setMsgTimeout(8, "ServerMJProxy.sendData");
		}
		public onRemove(): void {
			super.onRemove();
			uniLib.NetMgr.closeSocket();
			GameData.getInstance().destroy();
			uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSockInitSucc, this);
		}
		public closeSocket(): void {
			console.trace("closeSocket");
			uniLib.NetMgr.closeSocket();
		}
	}
}
