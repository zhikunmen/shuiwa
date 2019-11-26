module turntable {
	export class TurntableConst {
		public static RES_JSON = "resource/turntable.res.json";
		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static PUB_TURNTABLE: string = "pub_turntable";
		/**数据无误 */
		public static SUCCESS: number = 0;

		/** 漳州新增转盘  进入转盘界面*/
		public static IntoZZTurnTableLobby = "IntoZZTurnTableLobby";
		/** 漳州新增转盘 转动转盘*/
		public static ZZTurnTableLobby = "ZZTurnTableLobby";
		/** 漳州新增转盘 获奖记录*/
		public static GetZZTurnTableRecordsLobby = "GetZZTurnTableRecordsLobby";
		/** 领取红包钱*/
		public static OpenRedPackLobby = "OpenRedPackLobby";
		/**是否当前可转转盘*/
		public static CANTURNTABLE: string = "canTurnTable";
	}

}