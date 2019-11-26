module shop {
	/**首充信息 */
	export const FIRST_RECHARGE_INFO = "firstRechargeInfo";

	export class ShopConsts {

		public static RES_JSON = "resource/shop.res.json";
		public static RESZZ_JSON = "resource/shopZZ.res.json";
		public static RES_MAHJONG_JSON = "resource/shop_mahjong.res.json";
		public static THM_JSON = "resource/gameEui.json";

		/**
		 * 公共shop需要加载的资源组
		 */
		public static PUB_SHOP: string = "pub_shop";

		/**首充和vip */
		public static SHOP_RECHARGE: string = "shop_recharge";

		/**代付款 */
		public static SHOP_DAIFU: string = "shop_daifu";

		/**每日充值礼包 */
		public static SHOP_GIFTDAILY: string = "shop_giftDaily";
	}
}