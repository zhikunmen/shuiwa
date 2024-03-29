﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: game.proto

module Cmd {
	/**
	 * 游戏状态
	 */
	export enum GameStatus {
		/**
		 * 准备
		 */
		Status_Ready = 1,
		/**
		 * 抢庄
		 */
		Status_Banker = 2,
		/**
		 * 藏子
		 */
		Status_HindCard = 3,
		/**
		 * 下注
		 */
		Status_Bet = 4,
		/**
		 * 开子
		 */
		Status_OpenCard = 5,
		/**
		 * 每局结算
		 */
		Status_RoundEnd = 6,
		/**
		 * 总结算
		 */
		Status_GameEnd = 7,
		/**
		 * 空闲阶段
		 */
		Status_LeisureTime = 8
	}
	/**
	 * /////////////////////////////公共定义////////////////////////////////////////
	 * 一组牌
	 */
	export class PokerTuple {
		/**
		 * 所有牌
		 */
		pokerCards: number[];
		/**
		 * 牌型
		 */
		tupleType: number;
		/**
		 * 倍率
		 */
		times: number;
		GetType(): string { return 'Cmd.PokerTuple'; }
	}
	/**
	 * 玩家单元结算
	 */
	export class GameUnitResult {
		chessId: number;
		/**
		 * 得分
		 */
		totalPoint: number;
		GetType(): string { return 'Cmd.GameUnitResult'; }
	}
	/**
	 * 每局结算
	 */
	export class GameRoundResult {
		/**
		 * 玩家id
		 */
		uid: number;
		/**
		 * 昵称
		 */
		name: string;
		/**
		 * 头像
		 */
		headurl: string;
		/**
		 * 单元得分
		 */
		unitPoint: GameUnitResult[];
		/**
		 * 本局总分
		 */
		totalPoint: number;
		/**
		 * 玩家总分
		 */
		userPoint: number;
		/**
		 * 玩家在该房间盈利
		 */
		roomPoint: number;
		GetType(): string { return 'Cmd.GameRoundResult'; }
	}
	export class SWBetSet {
		/**
		 * 投注棋子
		 */
		betChessId: number;
		/**
		 * 下注点数
		 */
		betPoint: number[];
		/**
		 * 玩家在该棋子总点数
		 */
		betCurPoint: number;
		/**
		 * 该棋子总点数
		 */
		betTotalPoint: number;
		GetType(): string { return 'Cmd.SWBetSet'; }
	}
	/**
	 * 玩家对局信息
	 */
	export class UserRoundInfo {
		/**
		 * 玩家ID
		 */
		uid: number;
		/**
		 * 是否进行过抢庄操作
		 */
		bBanker: boolean;
		/**
		 * 投注信息
		 */
		betSet: SWBetSet[];
		GetType(): string { return 'Cmd.UserRoundInfo'; }
	}
	/**
	 * 房间对局信息
	 */
	export class RoomRoundInfo {
		/**
		 * 前五局藏子
		 */
		hideCards: number[];
		/**
		 * 抢庄玩家
		 */
		getBankerId: number[];
		GetType(): string { return 'Cmd.RoomRoundInfo'; }
	}
	/**
	 * /////////////////////////////游戏主要流程////////////////////////////////////////
	 * 准备阶段
	 */
	export class SWGameReadyCmd_Brd {
		/**
		 * 限时
		 */
		readyTimeout: number;
		GetType(): string { return 'Cmd.SWGameReadyCmd_Brd'; }
	}
	/**
	 * 抢庄开始
	 */
	export class SWBankerStartCmd_Brd {
		/**
		 * 限时
		 */
		bankerTimeout: number;
		GetType(): string { return 'Cmd.SWBankerStartCmd_Brd'; }
	}
	/**
	 * 玩家抢庄
	 */
	export class SWBankerCmd_C {
		/**
		 * 是否抢庄
		 */
		bBanker: boolean;
		GetType(): string { return 'Cmd.SWBankerCmd_C'; }
	}
	export class SWBankerCmd_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 描述
		 */
		dec: string;
		/**
		 * 提示需要多少金额才能抢庄
		 */
		minCarry: number;
		GetType(): string { return 'Cmd.SWBankerCmd_S'; }
	}
	export class SWBankerCmd_Brd {
		/**
		 * 抢庄玩家
		 */
		uid: number;
		/**
		 * 是否抢庄
		 */
		bBanker: boolean;
		GetType(): string { return 'Cmd.SWBankerCmd_Brd'; }
	}
	/**
	 * 抢庄结束
	 */
	export class SWBankerEndCmd_Brd {
		/**
		 * 庄家id
		 */
		uid: number;
		GetType(): string { return 'Cmd.SWBankerEndCmd_Brd'; }
	}
	/**
	 * 开始藏子
	 */
	export class SWHideCardStartCmd_Brd {
		/**
		 * 限时
		 */
		hideCardTimeout: number;
		GetType(): string { return 'Cmd.SWHideCardStartCmd_Brd'; }
	}
	export class SWHideCardCmd_C {
		/**
		 * 选择藏子
		 */
		hideChessId: number;
		GetType(): string { return 'Cmd.SWHideCardCmd_C'; }
	}
	export class SWHideCardCmd_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 描述
		 */
		dec: string;
		/**
		 * 选择藏子
		 */
		hideChessId: number;
		GetType(): string { return 'Cmd.SWHideCardCmd_S'; }
	}
	export class SWHideCardCmd_Brd {
		GetType(): string { return 'Cmd.SWHideCardCmd_Brd'; }
	}
	/**
	 * 开始下注
	 */
	export class SWBetStartCmd_Brd {
		/**
		 * 限时
		 */
		betTimeout: number;
		GetType(): string { return 'Cmd.SWBetStartCmd_Brd'; }
	}
	/**
	 * 玩家下注
	 */
	export class SWBetCmd_C {
		/**
		 * 投注棋子
		 */
		betChessId: number;
		/**
		 * 点数
		 */
		betPoint: number;
		GetType(): string { return 'Cmd.SWBetCmd_C'; }
	}
	/**
	 * 玩家续投
	 */
	export class SWConBetCmd_C {
		GetType(): string { return 'Cmd.SWConBetCmd_C'; }
	}
	export class SWBetCmd_S {
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 描述
		 */
		dec: string;
		/**
		 * 投注棋子
		 */
		betChessId: number;
		/**
		 * 下注点数
		 */
		betPoint: number;
		/**
		 * 玩家在该棋子总点数
		 */
		betCurPoint: number;
		/**
		 * 该棋子总点数
		 */
		betTotalPoint: number;
		GetType(): string { return 'Cmd.SWBetCmd_S'; }
	}
	export class SWBetCmd_Brd {
		/**
		 * 玩家id
		 */
		uid: number;
		/**
		 * 投注棋子
		 */
		betChessId: number;
		/**
		 * 下注点数
		 */
		betPoint: number;
		/**
		 * 该棋子总点数
		 */
		betTotalPoint: number;
		GetType(): string { return 'Cmd.SWBetCmd_Brd'; }
	}
	/**
	 * 扣取服务费
	 */
	export class SWReduceServerCostCmd_Brd {
		uid: number;
		/**
		 * 服务费
		 */
		cost: number;
		/**
		 * 扣完玩家携带
		 */
		userPoint: number;
		GetType(): string { return 'Cmd.SWReduceServerCostCmd_Brd'; }
	}
	/**
	 * 开子
	 */
	export class SWOpenCardCmd_Brd {
		/**
		 * 开子
		 */
		hideChessId: number;
		/**
		 * 前五局藏子
		 */
		hideCards: number[];
		GetType(): string { return 'Cmd.SWOpenCardCmd_Brd'; }
	}
}
