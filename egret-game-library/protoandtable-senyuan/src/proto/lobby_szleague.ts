﻿//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
/// Generated from: lobby_szleague.proto
/// <reference path="common.ts" />
/// <reference path="lobby_room.ts" />
/// <reference path="lobby_match.ts" />

module Cmd {
	/**
	 * 俱乐部界面点击大联盟按钮 请求已加入的大联盟数据
	 */
	export class RequestJoinedSZLeagueCmd_CS {
		/**
		 * 当前俱乐部id
		 */
		matchId: number;
		resultCode: number;
		/**
		 * 大联盟的基础数据 -- 若不存在数据则显示创建、加入界面
		 */
		curLeague: Cmd.MatchGroupInfo;
		GetType(): string { return 'Cmd.RequestJoinedSZLeagueCmd_CS'; }
	}
	/**
	 * 搜索大联盟
	 */
	export class SearchSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		resultCode: number;
		/**
		 * 大联盟的基础数据
		 */
		curLeague: Cmd.MathGroup;
		GetType(): string { return 'Cmd.SearchSZLeagueCmd_CS'; }
	}
	/**
	 * 申请加入某个大联盟
	 */
	export class JoinSZLeagueCmd_CS {
		/**
		 * 俱乐部id
		 */
		matchId: number;
		/**
		 * 联盟id
		 */
		leagueId: number;
		/**
		 * 备注
		 */
		note: number;
		resultCode: number;
		GetType(): string { return 'Cmd.JoinSZLeagueCmd_CS'; }
	}
	/**
	 * 盟主审批申请
	 */
	export class ReplyJoinSZLeagueCmd_CS {
		matchId: number;
		leagueId: number;
		/**
		 * 0表示拒绝,1表示同意
		 */
		reply: number;
		resultCode: number;
		GetType(): string { return 'Cmd.ReplyJoinSZLeagueCmd_CS'; }
	}
	/**
	 * 大联盟内的俱乐部信息
	 */
	export class MatchInfoInSZLeague {
		/**
		 * 匹配号
		 */
		matchId: number;
		/**
		 * 群主id
		 */
		uid: number;
		/**
		 * 群主昵称
		 */
		nickname: string;
		/**
		 * 头像url
		 */
		headUrl: string;
		/**
		 * 备注
		 */
		note: string;
		/**
		 * 成员数量
		 */
		memberNbr: number;
		/**
		 * 时间戳
		 */
		timestamp: number;
		/**
		 * 历史总局数
		 */
		gameNbr: number;
		GetType(): string { return 'Cmd.MatchInfoInSZLeague'; }
	}
	/**
	 * 有申请加入大联盟的时候 推送下审批列表
	 */
	export class JoinMatchListSZLeagueCmd_S {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		list: MatchInfoInSZLeague[];
		GetType(): string { return 'Cmd.JoinMatchListSZLeagueCmd_S'; }
	}
	/**
	 * 获取当前大联盟所存在的老友圈列表
	 */
	export class GetMatchListSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		resultCode: number;
		list: MatchInfoInSZLeague[];
		GetType(): string { return 'Cmd.GetMatchListSZLeagueCmd_CS'; }
	}
	/**
	 * 备注大联盟内的指定俱乐部
	 */
	export class RemarkMatchSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 俱乐部id
		 */
		matchId: number;
		/**
		 * 具体备注内容
		 */
		remark: string;
		resultCode: number;
		GetType(): string { return 'Cmd.RemarkMatchSZLeagueCmd_CS'; }
	}
	/**
	 * 踢出指定俱乐部
	 */
	export class KickOutMatchSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 俱乐部id
		 */
		matchId: number;
		resultCode: number;
		GetType(): string { return 'Cmd.KickOutMatchSZLeagueCmd_CS'; }
	}
	/**
	 * 玩家主动退出大联盟
	 */
	export class ActiveExitSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		resultCode: number;
		GetType(): string { return 'Cmd.ActiveExitSZLeagueCmd_CS'; }
	}
	export class CreatePlayFloorSZLeagueCmd_CS {
		resultCode: number;
		GetType(): string { return 'Cmd.CreatePlayFloorSZLeagueCmd_CS'; }
	}
	/**
	 * 操作楼层内的玩法层
	 */
	export class OperatePlayFloorSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 楼层id
		 */
		floorId: number;
		/**
		 * 玩法层id
		 */
		playFloorId: number;
		/**
		 * 操作类型 1、2、3、4  新增、请求获取指定玩法层当前玩法详情信息、修改、删除
		 */
		opType: number;
		/**
		 * 创建房间相关数据
		 */
		createRoom: Cmd.CreateRoomCmd_C;
		/**
		 * 1分几朵花 -- 若存在该参数表示为红花房
		 */
		baseFlower: number;
		/**
		 * 进房最低下限
		 */
		lowerLimitFlower: number;
		/**
		 * 每局消耗
		 */
		consumeFlower: number;
		/**
		 * 离房下限
		 */
		leaveLimitFlower: number;
		/**
		 * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
		 */
		resultCode: number;
		/**
		 * 抽水类型 1:AA抽水 2:大赢家抽水
		 */
		consumeType: number;
		/**
		 * 大赢家抽水时 大赢家最低分
		 */
		winnerConditions: number;
		/**
		 * 玩法名称
		 */
		gameName: string;
		GetType(): string { return 'Cmd.OperatePlayFloorSZLeagueCmd_CS'; }
	}
	/**
	 * 钻石补充
	 */
	export class AddDiamondSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 钻石数
		 */
		addDiamond: number;
		/**
		 * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
		 */
		resultCode: number;
		/**
		 * 加完后俱乐部当前钻石数
		 */
		curDiamond: number;
		GetType(): string { return 'Cmd.AddDiamondSZLeagueCmd_CS'; }
	}
	export class MemberInfoSZLeague {
		/**
		 * 玩家id
		 */
		uid: number;
		/**
		 * 昵称
		 */
		nickName: string;
		/**
		 * 当前疲劳值
		 */
		curFlower: number;
		/**
		 * 总增加疲劳值
		 */
		allAddFlower: number;
		/**
		 * 总扣除疲劳值
		 */
		allSubFlower: number;
		/**
		 * 游戏局数
		 */
		gameNbr: number;
		/**
		 * 消耗钻石
		 */
		consumeDiamond: number;
		/**
		 * 疲劳损耗
		 */
		consumeFlower: number;
		/**
		 * 赢
		 */
		winNbr: number;
		/**
		 * 输
		 */
		loseNbr: number;
		/**
		 * 是否禁止进入 nil/0/1 无操作权限、未禁入、已禁入
		 */
		forbid: number;
		/**
		 * 返利比例
		 */
		proportion: number;
		/**
		 * 总剩余疲劳值
		 */
		allSurplusFlower: number;
		/**
		 * 头像url
		 */
		headUrl: string;
		GetType(): string { return 'Cmd.MemberInfoSZLeague'; }
	}
	/**
	 * 疲劳值设置列表。。其实就是玩家的成员列表
	 */
	export class GetMemberListSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 指定uid
		 */
		targetUid: string;
		/**
		 * 打开这个页面的第一次请求
		 */
		first: number;
		/**
		 * 请求哪一页
		 */
		curPage: number;
		/**
		 * nil/1 默认规则排序、疲劳值由小到大排序
		 */
		typ: number;
		/**
		 * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
		 */
		resultCode: number;
		/**
		 * 玩家数据列表
		 */
		memberList: MemberInfoSZLeague[];
		/**
		 * 当前最大页数
		 */
		maxPage: number;
		/**
		 * 每页条数
		 */
		perPage: number;
		GetType(): string { return 'Cmd.GetMemberListSZLeagueCmd_CS'; }
	}
	/**
	 * 操作玩家疲劳值
	 */
	export class ChangeMemberFlowerSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 指定uid
		 */
		targetUid: number;
		/**
		 * 改变数量
		 */
		change: number;
		/**
		 * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
		 */
		resultCode: number;
		/**
		 * 当前疲劳值
		 */
		curFlower: number;
		/**
		 * 操作人的当前疲劳值(副盟主/群主操作时)
		 */
		curFlower2: number;
		/**
		 * 操作人uid(副盟主/群主操作时)
		 */
		operateUid: number;
		GetType(): string { return 'Cmd.ChangeMemberFlowerSZLeagueCmd_CS'; }
	}
	/**
	 * 获取包厢列表(点击俱乐部左下方切换包厢按钮)
	 */
	export class GetFloorListSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
		 */
		resultCode: number;
		/**
		 * 包厢列表
		 */
		leagueFloorList: Cmd.LeagueFloorInfo[];
		GetType(): string { return 'Cmd.GetFloorListSZLeagueCmd_CS'; }
	}
	/**
	 * 疲劳值变化信息
	 */
	export class FlowerRecordInSZLeague {
		/**
		 * 变动时间
		 */
		timestamp: number;
		/**
		 * 房间号
		 */
		roomId: number;
		/**
		 * 变化前
		 */
		pre: number;
		/**
		 * 变化值
		 */
		change: number;
		/**
		 * 变化后
		 */
		cur: number;
		/**
		 * 操作人id
		 */
		opUserId: number;
		/**
		 * 操作人
		 */
		opUserName: string;
		/**
		 * 对象id
		 */
		targetUserId: number;
		/**
		 * 对象昵称
		 */
		targetUserName: string;
		GetType(): string { return 'Cmd.FlowerRecordInSZLeague'; }
	}
	/**
	 * 消耗统计数据
	 */
	export class ConsumeStatisticsInSZLeague {
		/**
		 * 游戏名称
		 */
		gameName: string;
		/**
		 * 消耗钻石
		 */
		consumeDiamond: number;
		/**
		 * 疲劳损耗
		 */
		consumeFlower: number;
		GetType(): string { return 'Cmd.ConsumeStatisticsInSZLeague'; }
	}
	/**
	 * 获取24小时内的疲劳值操作记录 -- 这个应该是获取当前操作者的操作数据吧 避免误操作
	 */
	export class GetChangeMemberFlowerRecordSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 指定查询玩家id
		 */
		searchUid: number;
		/**
		 * 请求哪一页
		 */
		curPage: number;
		/**
		 * 返回码 存在返回码则是有误 操作成功了 该协议不回复 直接回复有用协议
		 */
		resultCode: number;
		/**
		 * 最大页数
		 */
		maxPage: number;
		/**
		 * 变化数据
		 */
		records: FlowerRecordInSZLeague[];
		GetType(): string { return 'Cmd.GetChangeMemberFlowerRecordSZLeagueCmd_CS'; }
	}
	/**
	 * 统计查询：疲劳值查询界面
	 */
	export class GetFlowerStatisticsSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 以哪个玩家为查询主体 为nil时，默认为发起请求的玩家为该searchUid
		 */
		searchUid: number;
		/**
		 * 指定查询玩家id
		 */
		targetUid: number;
		/**
		 * 打开这个页面的第一次请求
		 */
		first: number;
		/**
		 * 请求哪一天的数据 发该天零点时间戳 -- 暂时不传表示请求7天内的
		 */
		timestamp: number;
		/**
		 * 请求哪一页
		 */
		curPage: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 最大页数
		 */
		maxPage: number;
		/**
		 * 当前请求发起者的身份  -- 用于客户端选择查询对象显示用
		 */
		identity: number;
		/**
		 * 下属列表  -- 用于客户端选择查询对象显示用
		 */
		childList: number[];
		/**
		 * 总计
		 */
		total: MemberInfoSZLeague;
		/**
		 * 玩家数据列表
		 */
		memberList: MemberInfoSZLeague[];
		/**
		 * 每页条数
		 */
		perPage: number;
		GetType(): string { return 'Cmd.GetFlowerStatisticsSZLeagueCmd_CS'; }
	}
	/**
	 * 获取疲劳值变动记录 -- 暂时只有操作记录
	 */
	export class GetFlowerRecordSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 对象玩家id
		 */
		targetUid: number;
		/**
		 * 请求哪一天的数据 发该天零点时间戳 -- 7天内的不用传该字段
		 */
		timestamp: number;
		/**
		 * 请求哪一页
		 */
		curPage: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 当前最大页数
		 */
		maxPage: number;
		/**
		 * 变化列表
		 */
		records: FlowerRecordInSZLeague[];
		GetType(): string { return 'Cmd.GetFlowerRecordSZLeagueCmd_CS'; }
	}
	/**
	 * 统计查询：玩家明细界面
	 */
	export class GetUserStatisticsSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 以哪个玩家为查询主体 为nil时，默认为发起请求的玩家为该searchUid
		 */
		searchUid: number;
		/**
		 * 指定查询玩家id
		 */
		targetUid: number;
		/**
		 * 指定某些游戏
		 */
		gameList: number[];
		/**
		 * 打开这个页面的第一次请求
		 */
		first: number;
		/**
		 * 请求哪一天的数据 发该天零点时间戳 -- 暂时不传表示请求7天内的
		 */
		timestamp: number;
		/**
		 * 请求哪一页
		 */
		curPage: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 最大页数
		 */
		maxPage: number;
		/**
		 * 当前请求发起者的身份  -- 用于客户端选择查询对象显示用
		 */
		identity: number;
		/**
		 * 下属列表  -- 用于客户端选择查询对象显示用
		 */
		childList: number[];
		/**
		 * 总计
		 */
		total: MemberInfoSZLeague;
		/**
		 * 玩家数据列表
		 */
		memberList: MemberInfoSZLeague[];
		/**
		 * 每页条数
		 */
		perPage: number;
		GetType(): string { return 'Cmd.GetUserStatisticsSZLeagueCmd_CS'; }
	}
	export class ChildListInfo {
		/**
		 * 群主id
		 */
		managerId: number;
		/**
		 * 下属队长
		 */
		partnerList: number[];
		GetType(): string { return 'Cmd.ChildListInfo'; }
	}
	/**
	 * 统计查询：消耗统计
	 */
	export class GetConsumeStatisticsSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 以哪个玩家为查询主体 为nil时，默认为发起请求的玩家为该searchUid
		 */
		searchUid: number;
		/**
		 * 打开这个页面的第一次请求
		 */
		first: number;
		/**
		 * 请求哪一天的数据 发该天零点时间戳 -- 暂时不传表示请求7天内的
		 */
		timestamp: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 当前请求发起者的身份  -- 用于客户端选择查询对象显示用
		 */
		identity: number;
		/**
		 * 下属列表 -- 盟主、副盟主读这个字段
		 */
		childList: ChildListInfo[];
		/**
		 * 下属列表 -- 群主读这个字段
		 */
		childList2: number[];
		/**
		 * 总计
		 */
		total: ConsumeStatisticsInSZLeague;
		/**
		 * 消耗统计列表
		 */
		consumeList: ConsumeStatisticsInSZLeague[];
		GetType(): string { return 'Cmd.GetConsumeStatisticsSZLeagueCmd_CS'; }
	}
	/**
	 * 禁入、解禁
	 */
	export class ForbitUserSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 对象id
		 */
		targetUid: number;
		/**
		 * 0/1 解禁、禁入
		 */
		opType: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.ForbitUserSZLeagueCmd_CS'; }
	}
	/**
	 * 获取疲劳恢复界面数据 -- 下属列表数据量不大的 不做服务器分页了 前端自己分页处理吧
	 */
	export class GetFlowerRestoreInfoSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 当前身份 0/1/2/3/4 成员、盟主、副盟主、群主、队长
		 */
		identity: number;
		/**
		 * 你的上属给到你的分成比例 即是你能给你的下属分配的上限值
		 */
		proportion: number;
		/**
		 * 下属玩家各自分成比例数据
		 */
		memberList: MemberInfoSZLeague[];
		GetType(): string { return 'Cmd.GetFlowerRestoreInfoSZLeagueCmd_CS'; }
	}
	/**
	 * 进行疲劳恢复设置
	 */
	export class SetFlowerRestoreSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 对象id
		 */
		targetUid: number;
		/**
		 * 比例
		 */
		proportion: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.SetFlowerRestoreSZLeagueCmd_CS'; }
	}
	/**
	 * 获取疲劳恢复可领取的疲劳值
	 */
	export class GetCurFlowerRestoreSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 可领疲劳值
		 */
		flower: number;
		/**
		 * 比例
		 */
		proportion: number;
		/**
		 * 昨日、前日、近三日
		 */
		flowerList: number[];
		/**
		 * 当前请求发起者的身份  -- 用于客户端选择查询对象显示用
		 */
		identity: number;
		GetType(): string { return 'Cmd.GetCurFlowerRestoreSZLeagueCmd_CS'; }
	}
	/**
	 * 领取疲劳恢复的疲劳值
	 */
	export class RecvFlowerRestoreSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		/**
		 * 当前疲劳值
		 */
		curFlower: number;
		GetType(): string { return 'Cmd.RecvFlowerRestoreSZLeagueCmd_CS'; }
	}
	/**
	 * 修改玩法层游戏名称
	 */
	export class UpdatePlayFloorGameNameSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 楼层id
		 */
		floorId: number;
		/**
		 * 玩法层id
		 */
		playFloorId: number;
		/**
		 * 游戏名称
		 */
		name: string;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.UpdatePlayFloorGameNameSZLeagueCmd_CS'; }
	}
	export class GetRankInfoSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 大赢家前三
		 */
		bigWinUids: number[];
		/**
		 * 局数前三
		 */
		gameNbrUids: number[];
		/**
		 * 盈利前三
		 */
		winUids: number[];
		/**
		 * 哪一天数据 1:今日 2:昨日
		 */
		which: number;
		GetType(): string { return 'Cmd.GetRankInfoSZLeagueCmd_CS'; }
	}
	/**
	 * 设置凑桌模式
	 */
	export class SetMatchDeskSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 楼层id
		 */
		floorId: number;
		/**
		 * 0:坐桌模式 1:匹配模式
		 */
		matchDesk: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.SetMatchDeskSZLeagueCmd_CS'; }
	}
	/**
	 * 加入匹配
	 */
	export class JoinMatchDeskSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 楼层id
		 */
		floorId: number;
		/**
		 * 指定玩法层 可多选
		 */
		playFloorIdLists: number[];
		lobbyId: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.JoinMatchDeskSZLeagueCmd_CS'; }
	}
	/**
	 * 取消匹配
	 */
	export class ExitMatchDeskSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.ExitMatchDeskSZLeagueCmd_CS'; }
	}
	export class JoinMemberListSZLeagueCmd_CS {
		/**
		 * 大联盟id
		 */
		leagueId: number;
		list: Cmd.MatchGroupMemberInfo[];
		GetType(): string { return 'Cmd.JoinMemberListSZLeagueCmd_CS'; }
	}
	/**
	 * 黑白名单操作
	 */
	export class OperateWhiteBlackSZLeagueCmd_CS {
		uid: number;
		/**
		 * 1:添加白名单 2:表示添加黑名单
		 */
		opType: number;
		/**
		 * 联盟id
		 */
		leagueId: number;
		/**
		 * 返回码
		 */
		resultCode: number;
		GetType(): string { return 'Cmd.OperateWhiteBlackSZLeagueCmd_CS'; }
	}
	/**
	 * 玩家申请进入老友圈/大联盟记录
	 */
	export class RequestUserApplyRecordSZLeagueCmd_CS {
		/**
		 * 1:老友圈记录 2大联盟记录
		 */
		opType: number;
		list: ApplyRecordSZLeague[];
		GetType(): string { return 'Cmd.RequestUserApplyRecordSZLeagueCmd_CS'; }
	}
	export class ApplyRecordSZLeague {
		/**
		 * 老友圈/大联盟id
		 */
		matchId: number;
		/**
		 * 老友圈/大联盟名称
		 */
		matchName: string;
		/**
		 * 群主/盟主昵称
		 */
		nickname: string;
		/**
		 * 成员人数
		 */
		memberNbr: number;
		/**
		 * 在线人数
		 */
		onlineNbr: number;
		/**
		 * 申请时间
		 */
		timestamp: number;
		/**
		 * 1:待审核 2:已通过
		 */
		state: number;
		GetType(): string { return 'Cmd.ApplyRecordSZLeague'; }
	}
	/**
	 * 黑名单信息
	 */
	export class RequestBlackListSZLeagueCmd_CS {
		matchId: number;
		/**
		 * 是否为SZ大联盟模式 1：表示为SZ大联盟模式
		 */
		isSZLeague: number;
		blacklist: Cmd.MatchGroupMemberInfo[];
		GetType(): string { return 'Cmd.RequestBlackListSZLeagueCmd_CS'; }
	}
}