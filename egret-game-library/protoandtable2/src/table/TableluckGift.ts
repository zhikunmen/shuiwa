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
	 * FILE: 周边系统.xlsx SHEET: 幸运翻翻翻
	 */
	export class TableluckGift {
		/**
		 * 抽奖次数
		 */
		luckNum: number;
		/**
		 * 抽奖条件
		 */
		luckLimit: number;
		/**
		 * 条件类型
		 */
		costType: number;
		/**
		 * 开始时间
		 */
		startTime: string;
		/**
		 * 结束时间
		 */
		endTime: string;
		/**
		 * 奖励配置
		 */
		allocationReward: TableluckGift.AllocationRewardItem[];

		GetType(): string { return 'table.TableluckGift'; }
	}
	export module TableluckGift {
		export class AllocationRewardItem {
			rewardNum: number;
			/**
			 * rewardType
			 */
			reward: TableluckGift.AllocationRewardItem.RewardItem;
		}
	}
	export module TableluckGift {
		export module AllocationRewardItem {
			/**
			 * rewardType
			 */
			export class RewardItem {
				ratio: number;
				type: number;
			}
		}
	}
}
