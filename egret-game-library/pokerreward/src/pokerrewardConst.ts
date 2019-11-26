module pokerreward {

	export class pokerrewardConst {

		public static RES_JSON = "resource/pokerreward.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		/**个人信息面板资源 */
		public static POKER_REWARD: string = "poker_reward";
		/**
		 * 玩家战绩
		 */
		public static roundScore: Cmd.PokerRoundScore[] = [];
		//战绩显示
		public static ACTION_REWARD: string = "action_reward";
	}
}