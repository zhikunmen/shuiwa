﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
module table {
	/**
	 * FILE: a房卡-道具.xlsx SHEET: 商城
	 */
	export class TableShopConfig {
		/**
		 * 序号
		 */
		shopId: number;
		/**
		 * 商城类型
		 */
		shopType: number;
		/**
		 * 物品名称
		 */
		shopName: string;
		/**
		 * 物品
		 */
		shopGoods: TableShopConfig.ShopGoodsItem;
		/**
		 * 售价类别
		 */
		priceType: number;
		/**
		 * 售价
		 */
		price: number;
		/**
		 * 首充奖励
		 */
		firstShopGoods: TableShopConfig.FirstShopGoodsItem;
		/**
		 * 是否上架
		 */
		onShelve: number;
		iconId: number;
		/**
		 * 是否在商城显示
		 */
		isShow: number;
		/**
		 * 购买次数
		 */
		buyNbr: number;
		iapppayId: number;
		payPlatId: number;

		GetType(): string { return 'table.TableShopConfig'; }
	}
	export module TableShopConfig {
		/**
		 * 物品
		 */
		export class ShopGoodsItem {
			goodId: number;
			goodNbr: number;
		}
	}
	export module TableShopConfig {
		/**
		 * 首充奖励
		 */
		export class FirstShopGoodsItem {
			goodId: number;
			goodNbr: number;
		}
	}
}
