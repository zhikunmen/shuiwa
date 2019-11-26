module commonConfirm {
	export class ReWardDataVo {
		public icon: string;
		public num: number;
		public des: any;
		/**
		 * shopId
		 */
		public getDataByShopId(shopId: number, shopNum?: number): void {
			if(shopNum)
				this.num = shopNum;
			var goodId = ConfigMgr.getInstance().getShopCfgById(shopId).shopGoods.goodId;
			let reward = ConfigMgr.getInstance().getGoodCfgById(goodId);
			console.log(reward);
			this.icon = `${reward.goodIcon}_png`;
			this.des = reward.goodDesc;
		}
		/**
		 * goodId
		 */
		public getDataByGoodId(goodId: number, shopNum?: number): void {
			if(shopNum)
				this.num = shopNum;
			let reward = ConfigMgr.getInstance().getGoodCfgById(goodId);
			console.log(reward);
			this.icon = `${reward.goodIcon}_png`;
			this.des = reward.goodDesc;
		}
	}
}