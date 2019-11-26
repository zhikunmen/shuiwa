module knapsack {
	export class KnapsackSendMgr {

		/**请求使用物品
			 * @param goodId 兑换物品id
			 * @param num 兑换数量
			 */
		public static ExchangeRequest(num: number, goodId: number): void {
			let req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
			let backpackInfo = new Cmd.BackpackInfo;
			backpackInfo.goodId = goodId;
			backpackInfo.number = num;
			req.backpackInfo = backpackInfo;
			NetMgr.tcpSend(req);
		}
	}
}