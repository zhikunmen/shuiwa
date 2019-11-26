module knapsack {
	export class KnapsackModuleMgr {
		private static _instance: KnapsackModuleMgr;

		public static getInstance(): KnapsackModuleMgr {
			if (!this._instance) {
				this._instance = new KnapsackModuleMgr();
			}
			return this._instance;
		}
		/**显示背包界面 */
		public showKnapsakPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(KnapsackConst.PUB_KNAPSACK, () => {
				uniLib.PopUpMgr.addPopUp(KnapsakPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**显示兑换金币页面 */
		public showExchangeGoldPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(KnapsackConst.PUB_KNAPSACK, () => {
				uniLib.PopUpMgr.addPopUp(ExchangeGoldPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
	}
}