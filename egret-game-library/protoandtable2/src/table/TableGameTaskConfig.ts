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
	 * FILE: 游戏每日任务.xlsx SHEET: task
	 */
	export class TableGameTaskConfig {
		/**
		 * 序列
		 */
		id: number;
		/**
		 * 任务标题
		 */
		taskTitle: string;
		/**
		 * 任务描述
		 */
		taskDesc: string;
		/**
		 * 任务类型
		 */
		taskType: number;
		/**
		 * 是否显示进度条
		 */
		progressType: number;
		/**
		 * 游戏ID
		 */
		gameId: number[];
		/**
		 * 任务参数
		 */
		taskCondition: number;
		/**
		 * 前置任务
		 */
		preTask: number[];
		/**
		 * 暴击局数
		 */
		criticalNum: number;
		/**
		 * 场次ID
		 */
		seasonID: number[];
		/**
		 * 领取次数
		 */
		rewardNum: number;
		/**
		 * 领取消耗钻石
		 */
		getpaidDiamond: number;
		/**
		 * 图标
		 */
		taskIcon: string;
		/**
		 * 奖励
		 */
		taskReward: TableGameTaskConfig.TaskRewardItem[];
		/**
		 * 是否显示
		 */
		isOnList: number;
		/**
		 * 房间类型
		 */
		sceneid: number;

		GetType(): string { return 'table.TableGameTaskConfig'; }
	}
	export module TableGameTaskConfig {
		export class TaskRewardItem {
			goodId: number;
			goodNbr: number;
		}
	}
}
