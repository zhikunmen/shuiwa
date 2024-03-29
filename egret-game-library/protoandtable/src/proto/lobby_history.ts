﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_history.proto
/// <reference path="common.ts" />

module Cmd {
	/**
	 * 各个玩家战绩数据
	 */
	export class UserGameHistory {
		/**
		 * 玩家昵称
		 */
		nickName: string;
		/**
		 * 积分可能为负 所以为int32
		 */
		integral: number;
		/**
		 * 头像,茶馆用
		 */
		headUrl: string;
		/**
		 * 手牌,扑克牌用,牛牛等
		 */
		cardList: number[];
		/**
		 * 飞车把uid也传下去吧
		 */
		uid: number;
		/**
		 * 新增输赢红花数据
		 */
		flower: number;
		/**
		 * 是否大赢家 0:不是 1:是
		 */
		isWinner: number;
		GetType(): string { return 'Cmd.UserGameHistory'; }
	}
	/**
	 * 比赛场战绩数据
	 */
	export class MatchGameHistory {
		/**
		 * 名次
		 */
		rank: number;
		/**
		 * 第几轮
		 */
		round: number;
		/**
		 * 比赛场次id
		 */
		playId: number;
		/**
		 * 奖励
		 */
		award: string;
		GetType(): string { return 'Cmd.MatchGameHistory'; }
	}
	/**
	 * 战绩数据
	 */
	export class GameHistory {
		/**
		 * 全局唯一的房间id 用于索引战绩数据 （不用于显示）
		 */
		globalRoomId: number;
		/**
		 * 该战绩的房间号(组建房间时 随机的房间号)
		 */
		roomId: number;
		/**
		 * 对战时间
		 */
		timeStamp: number;
		/**
		 * 四个玩家的对战积分详情
		 */
		userGameHistorys: UserGameHistory[];
		/**
		 * 比赛场的相关数据
		 */
		matchGameHistory: MatchGameHistory;
		/**
		 * 发送gameId
		 */
		gameId: number;
		/**
		 * 如果是匹配号,则
		 */
		matchId: number;
		/**
		 * 对赌场 1:金币 2:钻石
		 */
		gambleType: number;
		/**
		 * 对赌场 底注
		 */
		basePoint: number;
		/**
		 * 漳州新俱乐部战绩面板新增字段
		 */
		gameName: string;
		/**
		 * 房间创建游戏局数  非实际游戏局数
		 */
		gameNbr: number;
		/**
		 * 房间创建人数
		 */
		userNbr: number;
		/**
		 * 是否已结算 nil/1/2 默认老数据不显示、未结算、已结算
		 */
		settlement: number;
		/**
		 * 是否有疲劳明细按钮 nil:没有 1:有
		 */
		flowerBtn: number;
		/**
		 * 房间耗钻
		 */
		diamondFee: number;
		/**
		 * 游戏实际打完的局数
		 */
		playNbr: number;
		GetType(): string { return 'Cmd.GameHistory'; }
	}
	/**
	 * 详细战绩数据
	 */
	export class GameHistoryDetail {
		/**
		 * 具体游戏时间
		 */
		timeStamp: number;
		/**
		 * 四个玩家的对战积分详情
		 */
		userGameHistoryDetails: UserGameHistory[];
		/**
		 * 分享数据
		 */
		shareInfo: Cmd.ShareInfo;
		/**
		 * 本局对局数据的md5码
		 */
		md5Code: string;
		GetType(): string { return 'Cmd.GameHistoryDetail'; }
	}
	/**
	 * 删除战绩,避免家庭矛盾
	 */
	export class DelPlayedDataHistoryCmd_C {
		/**
		 * 某一个房间号的战绩,0表示全部
		 */
		roomId: number;
		GetType(): string { return 'Cmd.DelPlayedDataHistoryCmd_C'; }
	}
	/**
	 * 战绩统计数据获取
	 */
	export class GetGameDataHistoryCmd_C {
		/**
		 * 分页处理 当前请求第几页 默认一页返回10个数据
		 */
		curPage: number;
		/**
		 * 某一个匹配号的战绩
		 */
		matchId: number;
		/**
		 * 某一个房间号的战绩
		 */
		roomId: number;
		/**
		 * 请求类型 nil/1/2 默认为以前的战绩请求、漳州群战绩面板、漳州成员详情面板
		 */
		typ: number;
		/**
		 * 漳州俱乐部 群主请求指定成员战绩数据
		 */
		uid: number;
		/**
		 * 楼层id
		 */
		floorId: number;
		/**
		 * 是否为SZ大联盟模式 1：表示为SZ大联盟模式
		 */
		isSZLeague: number;
		GetType(): string { return 'Cmd.GetGameDataHistoryCmd_C'; }
	}
	export class GetGameDataHistoryCmd_S {
		/**
		 * 返回码 默认0为操作成功
		 */
		resultCode: number;
		/**
		 * 当前第几页
		 */
		curPage: number;
		/**
		 * 总共几页
		 */
		maxPage: number;
		/**
		 * 战绩统计数据
		 */
		gameHistroys: GameHistory[];
		/**
		 * 某一个匹配号的战绩
		 */
		matchId: number;
		typ: number;
		userInfo: Cmd.UserBaseInfo;
		GetType(): string { return 'Cmd.GetGameDataHistoryCmd_S'; }
	}
	/**
	 * 针对漳州 俱乐部内的战绩统计数据获取 单独提出来 漳州的战绩面板较多 避免混淆原先老逻辑
	 */
	export class GetGameDataHistoryForMatchCmd_C {
		/**
		 * 俱乐部id
		 */
		matchId: number;
		/**
		 * 分页处理 当前请求第几页 默认一页返回10个数据
		 */
		curPage: number;
		/**
		 * 操作那一项 1/2/3 今日、昨日、前日
		 */
		which: number;
		/**
		 * 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/管理员界面获取指定成员的战绩/合伙人界面获取指定成员战绩
		 */
		typ: number;
		/**
		 * 群主请求指定成员战绩数据
		 */
		uid: number;
		GetType(): string { return 'Cmd.GetGameDataHistoryForMatchCmd_C'; }
	}
	export class GetGameDataHistoryForMatchCmd_S {
		/**
		 * 返回码 默认0为操作成功
		 */
		resultCode: number;
		/**
		 * 当前第几页
		 */
		curPage: number;
		/**
		 * 总共几页
		 */
		maxPage: number;
		/**
		 * 战绩统计数据
		 */
		gameHistroys: GameHistory[];
		matchId: number;
		typ: number;
		/**
		 * 操作那一项 1/2/3 今日、昨日、前日
		 */
		which: number;
		/**
		 * 群主请求指定成员战绩数据
		 */
		userInfo: Cmd.UserBaseInfo;
		/**
		 * typ为3时返回该数据 成员的统计数据
		 */
		userStatisticInfo: Cmd.MatchGroupMemberInfo;
		/**
		 * typ为1/2时返回该数据 整个俱乐部的统计数据
		 */
		matchStatisticInfo: Cmd.MathGroupstatisticInfo;
		/**
		 * typ为1时返回该数据 指定日期 大赢家摘花数量汇总 -- 当前俱乐部不存在红花的时候 该字段不传
		 */
		totalWinnerFlower: number;
		GetType(): string { return 'Cmd.GetGameDataHistoryForMatchCmd_S'; }
	}
	/**
	 * 获取指定 globalRoomId 的 所有具体牌局详细数据
	 */
	export class GetGameDetailHistoryCmd_C {
		/**
		 * 全局唯一的房间id 用于索引战绩数据
		 */
		globalRoomId: number;
		GetType(): string { return 'Cmd.GetGameDetailHistoryCmd_C'; }
	}
	export class GetGameDetailHistoryCmd_S {
		/**
		 * 返回码 默认0为操作成功
		 */
		resultCode: number;
		/**
		 * 全局唯一的房间内的 所有游戏数据
		 */
		gameHistroyDetails: GameHistoryDetail[];
		/**
		 * 房主小费数据
		 */
		gameHostTip: GameHistoryDetail;
		/**
		 * 发送gameId
		 */
		gameId: number;
		/**
		 * 1代表大菠萝，不填或者0位其他
		 */
		hisType: number;
		GetType(): string { return 'Cmd.GetGameDetailHistoryCmd_S'; }
	}
	/**
	 * 房间日志
	 */
	export class RoomLogHistory {
		/**
		 * 时间
		 */
		sec: number;
		/**
		 * 时间
		 */
		round: number;
		/**
		 * 描述
		 */
		desc: string;
		GetType(): string { return 'Cmd.RoomLogHistory'; }
	}
	/**
	 * 请求房间日志信息
	 */
	export class GetRoomLogHistoryCmd_C {
		/**
		 * 房间id,matchId
		 */
		roomId: number;
		/**
		 * 全局唯一的房间id 用于索引战绩数据
		 */
		globalRoomId: number;
		GetType(): string { return 'Cmd.GetRoomLogHistoryCmd_C'; }
	}
	/**
	 * 返回请求房间日志信息
	 */
	export class GetRoomLogHistoryCmd_S {
		/**
		 * 房间id,matchId
		 */
		roomId: number;
		/**
		 * 全局唯一的房间id 用于索引战绩数据
		 */
		globalRoomId: number;
		/**
		 * 全局唯一的房间id 用于索引战绩数据
		 */
		list: RoomLogHistory[];
		GetType(): string { return 'Cmd.GetRoomLogHistoryCmd_S'; }
	}
	/**
	 * 获取对赌场战绩
	 */
	export class GetGambleDataHistoryCmd_C {
		/**
		 * 分页处理 当前请求第几页 默认一页返回10个数据
		 */
		curPage: number;
		GetType(): string { return 'Cmd.GetGambleDataHistoryCmd_C'; }
	}
	export class GetGambleDataHistoryCmd_S {
		/**
		 * 返回码 默认0为操作成功
		 */
		resultCode: number;
		/**
		 * 当前第几页
		 */
		curPage: number;
		/**
		 * 总共几页
		 */
		maxPage: number;
		gambleHistorys: GameHistory[];
		GetType(): string { return 'Cmd.GetGambleDataHistoryCmd_S'; }
	}
	/**
	 * 结算某个房间数据
	 */
	export class SettlementHistoryCmd_CS {
		/**
		 * 俱乐部id
		 */
		matchId: number;
		/**
		 * 房间id
		 */
		globalRoomId: number;
		/**
		 * 返回码 默认0为操作成功
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.SettlementHistoryCmd_CS'; }
	}
	/**
	 * 牌局中的疲劳值变化明细
	 */
	export class GetGameFlowerDetailHistoryCmd_C {
		/**
		 * 全局唯一的房间id 用于索引战绩数据
		 */
		globalRoomId: number;
		curPage: number;
		/**
		 * 如果uid不为nil表示查看指定玩家 否则表示查看自己
		 */
		uid: number;
		GetType(): string { return 'Cmd.GetGameFlowerDetailHistoryCmd_C'; }
	}
	export class GetGameFlowerDetailHistoryCmd_S {
		curPage: number;
		maxPage: number;
		gameFlowerDetail: GameFlowerDetail[];
		GetType(): string { return 'Cmd.GetGameFlowerDetailHistoryCmd_S'; }
	}
	export class GameFlowerDetail {
		/**
		 * 第几次
		 */
		nbr: number;
		/**
		 * 关联uid
		 */
		targetUid: number;
		/**
		 * 疲劳变化
		 */
		change: number;
		/**
		 * 当前疲劳值
		 */
		curFlower: number;
		/**
		 * 0:游戏开始 1:中间次数 2:游戏结束
		 */
		state: number;
		GetType(): string { return 'Cmd.GameFlowerDetail'; }
	}
}
