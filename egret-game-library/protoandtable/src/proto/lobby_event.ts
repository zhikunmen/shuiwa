﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_event.proto
/// <reference path="common.ts" />
/// <reference path="lobby_room.ts" />
/// <reference path="lobby_match.ts" />

module Cmd {
	/**
	 * 赛事状态
	 */
	export enum EventInfoEventState {
		/**
		 * 准备状态
		 */
		EventInfoEventState_Ready = 1,
		/**
		 * 游戏中
		 */
		EventInfoEventState_Playing = 2,
		/**
		 * 结算中
		 */
		EventInfoEventState_Result = 3,
		/**
		 * 匹配中
		 */
		EventInfoEventState_Matching = 4,
		/**
		 * 淘汰了
		 */
		EventInfoEventState_Out = 5
	}
	/**
	 * 请求赛事报名信息
	 */
	export class EntryInfoEventMatchGroupCmd_C {
		/**
		 * 匹配号id
		 */
		matchId: number;
		GetType(): string { return 'Cmd.EntryInfoEventMatchGroupCmd_C'; }
	}
	/**
	 * 请求赛事报名信息
	 */
	export class EntryInfoEventMatchGroupCmd_S {
		/**
		 * 匹配号id
		 */
		matchId: number;
		/**
		 * 当前报名数量
		 */
		curNum: number;
		/**
		 * 开赛人数 客户端读表就可以,以后用
		 */
		maxNum: number;
		/**
		 * 当前总共报名人数
		 */
		allNum: number;
		/**
		 * 我的状态,1表示已报名
		 */
		myState: number;
		GetType(): string { return 'Cmd.EntryInfoEventMatchGroupCmd_S'; }
	}
	/**
	 * 赛事信息
	 */
	export class EventInfoMatchGroupCmd_S {
		/**
		 * 匹配号id
		 */
		matchId: number;
		/**
		 * 比赛开始时间,从开局到当前的秒数
		 */
		time: number;
		/**
		 * 底分
		 */
		bottomPoint: number;
		/**
		 * 淘汰分
		 */
		leavingPoint: number;
		/**
		 * 剩余用户数
		 */
		userNumber: number;
		/**
		 * 当前排行
		 */
		myOrder: number;
		/**
		 * 当前到第几轮了
		 */
		level: number;
		/**
		 * 当前游戏在哪个状态EventInfoEventState
		 */
		curEventState: number;
		GetType(): string { return 'Cmd.EventInfoMatchGroupCmd_S'; }
	}
	/**
	 * 申请报名
	 */
	export class EntryEventMatchGroupCmd_C {
		/**
		 * 匹配号id
		 */
		matchId: number;
		GetType(): string { return 'Cmd.EntryEventMatchGroupCmd_C'; }
	}
	/**
	 * 退出报名
	 */
	export class LeaveEventMatchGroupCmd_C {
		/**
		 * 匹配号id
		 */
		matchId: number;
		/**
		 * 为1时不需要服务器返回消息
		 */
		noSend: number;
		GetType(): string { return 'Cmd.LeaveEventMatchGroupCmd_C'; }
	}
	/**
	 * 刷新当前人数和名次
	 */
	export class MyOrderEventMatchGroupCmd_S {
		/**
		 * 剩余用户数
		 */
		userNumber: number;
		/**
		 * 当前排行
		 */
		myOrder: number;
		GetType(): string { return 'Cmd.MyOrderEventMatchGroupCmd_S'; }
	}
	/**
	 * 弃权
	 */
	export class GiveUpEventMatchGroupCmd_C {
		/**
		 * 匹配号id
		 */
		matchId: number;
		GetType(): string { return 'Cmd.GiveUpEventMatchGroupCmd_C'; }
	}
}
