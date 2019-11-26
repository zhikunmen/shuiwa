module knapsack {
	export class KnapsackData {
		private static _instance: KnapsackData;
		public static getInstance(): KnapsackData {
			if (!this._instance) {
				this._instance = new KnapsackData();
			}
			return this._instance;
		}

		public PartnerImportList: Cmd.MatchGroupMemberInfo[];
		/** 合伙人 默认返回的matchid*/
		public PartnerMatchId: number = 0;
		/**背包选中项代金券物品ID */
		public knapaskGoodId: number = 0;
		/**背包选中项代金券数量 */
		public knapaskGoodnumber: number = 0;
	}


}