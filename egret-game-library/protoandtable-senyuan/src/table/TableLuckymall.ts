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
	 * FILE: 好彩商城.xlsx SHEET: 好彩 KEY: lobbyId
	 */
	export class TableLuckymall {
		/**
		 * 大厅ID
		 */
		lobbyId: number;
		/**
		 * 金币道具
		 */
		goldProps: number[];
		/**
		 * 头像框
		 */
		avatarBox: number[];
		/**
		 * 金币赠送
		 */
		goldCoin: TableLuckymall.GoldCoinItem[];

		GetType(): string { return 'table.TableLuckymall'; }
	}
	export module TableLuckymall {
		export class GoldCoinItem {
			shopId: number;
			rate: number;
			mutex: number[];
		}
	}
}
