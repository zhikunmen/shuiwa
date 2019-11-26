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
	 * FILE: a房卡-好牌网比赛奖励.xlsx SHEET: 奖励
	 */
	export class TableMatchReward {
		/**
		 * 比赛ID
		 */
		HaoPaiSceneId: number;
		/**
		 * 比赛名称
		 */
		HaoPaiMatchName: string;
		/**
		 * 比赛类型
		 */
		HaoPaiMatchType: number;
		/**
		 * 游戏ID
		 */
		gameId: number;
		/**
		 * 游戏人数
		 */
		gameUserNbr: number;
		/**
		 * 解锁人数
		 */
		unlockNumber: number;
		/**
		 * 排名奖励
		 */
		RankReward: TableMatchReward.RankRewardItem[][];
		/**
		 * 比赛总奖励
		 */
		matchName: number;
		/**
		 * 解锁钻石数
		 */
		unlockdiamond: number;
		/**
		 * 晋级人数
		 */
		riseRank: number[];
		/**
		 * 次数限制
		 */
		numberLimit: number;
		/**
		 * 主要奖励名次
		 */
		mainrewardRank: number;
		/**
		 * 是否开启
		 */
		close: number;
		/**
		 * 游戏玩法
		 */
		playType: number[];
		/**
		 * 开启日期
		 */
		week: number[];
		/**
		 * 报名费用
		 */
		HaoPaiMatchCost: TableMatchReward.HaoPaiMatchCostItem[];
		/**
		 * 开局人数
		 */
		MatchPlayerNumber: number;

		GetType(): string { return 'table.TableMatchReward'; }
	}
	export module TableMatchReward {
		export class RankRewardItem {
			goodId: number;
			goodNbr: number;
		}
	}
	export module TableMatchReward {
		export class HaoPaiMatchCostItem {
			goodId: number;
			goodNbr: number;
		}
	}
}