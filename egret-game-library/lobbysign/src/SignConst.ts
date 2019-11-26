module lobbysign {

	export class SignConst {

		public static RES_JSON = "resource/lobbysign.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static LOBBY_SIGN: string = "lobby_sign";


		/**金币场用户签到信息返回 */
		public static SIGN_INFO: string = "SIGNINFO_RETURN";
		/**金币场用户签到返回 */
		public static SIGN_TODAY: string = "SIGNTODAY_DATA";
		/**金币场累积签到奖励 */
		public static SIGN_CONTINUE: string = "SIGN_CONTINUE";
	}


}
