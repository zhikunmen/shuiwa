module knapsack {
	export class KnapsackConst {
		public static RES_JSON = "resource/knapsack.res.json";
		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static PUB_KNAPSACK: string = "pub_knapsack";
		/**数据无误 */
		public static SUCCESS: number = 0;

		/** 背包*/
		public static BackpackInfoReturnBackpack = "BackpackInfoReturnBackpack";
		/** 领取红包钱*/
		public static OpenRedPackLobby = "OpenRedPackLobby";
		/** 换物品后返回*/
		public static BackpackExchangeReturnBackpack = "BackpackExchangeReturnBackpack";

	}
	/**暂存数据 对应表数据 */
	export class Data {
		/**道具表 */
		public static goods: Dictionary<table.TableGoodsConfig> = {};
	}

}