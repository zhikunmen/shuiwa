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
	 * FILE: 百宝箱概率奖励表.xlsx SHEET: Sheet1 KEY: lotteryId
	 */
	export class TableTreasureBoxLottery {
		/**
		 * 奖励id
		 */
		lotteryId: number;
		/**
		 * 奖励
		 */
		lotterys: TableTreasureBoxLottery.LotterysItem[];

		GetType(): string { return 'table.TableTreasureBoxLottery'; }
	}
	export module TableTreasureBoxLottery {
		export class LotterysItem {
			chance: number;
			lottery: TableTreasureBoxLottery.LotterysItem.LotteryItem;
		}
	}
	export module TableTreasureBoxLottery {
		export module LotterysItem {
			export class LotteryItem {
				lType: number;
				goodsId: number;
				goodsNum: number;
				rmb: number;
			}
		}
	}
}
