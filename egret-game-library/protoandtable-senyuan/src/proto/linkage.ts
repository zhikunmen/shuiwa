﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: linkage.proto
/// <reference path="common.ts" />

module Cmd {
	/**
	 * 绑定
	 */
	export class BindOtherLobbyUidLobbyCmd_CS {
		/**
		 * 房卡uid
		 */
		uid: number;
		/**
		 * 联动方uid
		 */
		otherUid: number;
		/**
		 * 原样带回给联动方
		 */
		gameId: number;
		/**
		 * 原样带回给联动方
		 */
		gameName: string;
		/**
		 * 签名 md5(uid+otherUid+gameId+key) 暂写死key为:D610E171E47DB69B
		 */
		signature: string;
		/**
		 * 若uid玩家存在则返回其个人数据(头像、昵称)
		 */
		userInfo: Cmd.UserBaseInfo;
		/**
		 * 返回码
		 */
		retCode: number;
		/**
		 * 返回描述
		 */
		retDesc: string;
		GetType(): string { return 'Cmd.BindOtherLobbyUidLobbyCmd_CS'; }
	}
	/**
	 * 发放奖励
	 */
	export class IssueRewardLobbyCmd_CS {
		/**
		 * 订单id（防止多次发放）
		 */
		orderId: number;
		/**
		 * 房卡uid
		 */
		uid: number;
		/**
		 * 联动方uid
		 */
		otherUid: number;
		/**
		 * 物品id -- 单独定义 暂定 1/钻石
		 */
		goodId: number;
		/**
		 * 物品数量
		 */
		goodNbr: number;
		/**
		 * 签名 md5(orderId+uid+otherUid+goodId+goodNbr+key) 暂写死key为:79e3afd0d610e171e4
		 */
		signature: string;
		/**
		 * 返回码
		 */
		retCode: number;
		/**
		 * 返回描述
		 */
		retDesc: string;
		GetType(): string { return 'Cmd.IssueRewardLobbyCmd_CS'; }
	}
}
