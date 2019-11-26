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
	 * FILE: 标准场房间配置表.xlsx SHEET: Sheet1 KEY: gameId*0xFF + roomType
	 */
	export class TableRoomConfig {
		/**
		 * 序列
		 */
		roomType: number;
		/**
		 * 游戏ID
		 */
		gameId: number;
		/**
		 * 房间名称
		 */
		name: string;
		/**
		 * 最大人数
		 */
		maxplayNum: number;
		/**
		 * 最小人数
		 */
		minplayNum: number;
		/**
		 * 解散房间超时
		 */
		dissolveTimeout: number;
		/**
		 * 手牌数量
		 */
		initCardNum: number;
		/**
		 * 最大轮数
		 */
		highRound: number;
		/**
		 * 底注
		 */
		basePoint: number;
		/**
		 * 加注
		 */
		addOne: number[];
		/**
		 * 可看牌轮数
		 */
		canlookTimes: number;
		/**
		 * 可比牌轮数
		 */
		cancompareTimes: number;
		/**
		 * 行动时间
		 */
		operaTime: number;
		/**
		 * 比牌时间
		 */
		PKTime: number;
		/**
		 * 游戏开始延时
		 */
		readyTime: number;
		/**
		 * 发牌延时
		 */
		sendcardTime: number;
		/**
		 * 结算延时
		 */
		winTime: number;
		/**
		 * 场次抽水
		 */
		tax: number;

		GetType(): string { return 'table.TableRoomConfig'; }
	}
}