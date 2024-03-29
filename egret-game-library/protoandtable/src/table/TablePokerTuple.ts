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
	 * FILE: 牌型配置表.xlsx SHEET: Sheet1
	 */
	export class TablePokerTuple {
		/**
		 * 牌型
		 */
		cardType: number;
		/**
		 * 描述
		 */
		name: string;
		/**
		 * 名称
		 */
		des: string;
		/**
		 * 特殊牌型
		 */
		ScardType: boolean;
		/**
		 * 倍率
		 */
		mult: TablePokerTuple.MultItem;
		/**
		 * 可比较牌型
		 */
		CanCompareType: number[];
		/**
		 * 参数
		 */
		para: number;
		/**
		 * 较大牌型
		 */
		BigType: number[];

		GetType(): string { return 'table.TablePokerTuple'; }
	}
	export module TablePokerTuple {
		/**
		 * 倍率
		 */
		export class MultItem {
			min: number;
			max: number;
		}
	}
}
