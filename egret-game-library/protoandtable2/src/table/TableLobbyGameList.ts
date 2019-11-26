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
	 * FILE: a房卡-创建房间选项.xlsx SHEET: 麻将大厅设置
	 */
	export class TableLobbyGameList {
		/**
		 * 大厅ID
		 */
		id: number;
		/**
		 * 描述
		 */
		desc: string;
		/**
		 * 好彩系列
		 */
		isHaocai: number;
		/**
		 * 好牌网系列
		 */
		isHaopaiwang: number;
		/**
		 * 是否开启比赛
		 */
		openHpMatch: number;
		/**
		 * 封红包剩余金额
		 */
		redEnvelopeBalance: number;
		/**
		 * 来吧系列
		 */
		isLaiba: number;
		/**
		 * 俱乐部默认授权
		 */
		clubPower: number;
		/**
		 * 俱乐部种类
		 */
		clubType: number;
		/**
		 * 俱乐部代理商检测
		 */
		clubMaster: number;
		/**
		 * 无好友房的游戏
		 */
		friendRoom: number[];
		/**
		 * 防作弊游戏
		 */
		cheatproofRoom: number[];
		/**
		 * 俱乐部备注
		 */
		clubRemark: number;
		/**
		 * 保险箱最低金额
		 */
		bankLimit: number;
		/**
		 * 红包开奖提现额度
		 */
		openLimit: number;
		/**
		 * 创建面板全屏
		 */
		createFullscreen: number;
		/**
		 * 创建面板标签
		 */
		createTag: number;
		/**
		 * 新游戏
		 */
		newGame: number[];
		/**
		 * 2.5D
		 */
		twoPointFive: number[];
		/**
		 * 区域选择
		 */
		areaChoice: number[];
		/**
		 * 返回大厅需要钻石
		 */
		lobbyDiamond: number;
		/**
		 * 初始金币
		 */
		iniGold: number;
		/**
		 * 初始钻石
		 */
		iniDiamond: number;
		/**
		 * 房间管理
		 */
		roomManage: number;
		/**
		 * 定位开启
		 */
		PositioningOpen: number;
		/**
		 * 初始房卡
		 */
		iniRoomCard: number;
		/**
		 * 喇叭消耗
		 */
		speakerCost: number[];
		/**
		 * 需下载游戏
		 */
		downloadGame: number[];
		/**
		 * 转充值局数
		 */
		changeRoundNum: number;
		/**
		 * 推荐返钻
		 */
		returnDiamond: number;
		/**
		 * 大厅麻将资源名
		 */
		lobbyMahjongSourceName: string;
		/**
		 * 邀请码送钻
		 */
		inviteDiamond: number;
		/**
		 * 代理商类型
		 */
		agentType: number;
		/**
		 * 充值实名
		 */
		chargeRealname: number;
		/**
		 * 任务ID
		 */
		missionId: number[];
		/**
		 * 新手七日
		 */
		newSevenday: TableLobbyGameList.NewSevendayItem[];
		/**
		 * 是否开启金币分享
		 */
		openShareCoin: number;
		/**
		 * 破产补助
		 */
		brokeRelieve: TableLobbyGameList.BrokeRelieveItem[];
		/**
		 * 百人场
		 */
		hundredList: number[];
		/**
		 * 练习场类型
		 */
		exerciseType: number;
		/**
		 * 金币场
		 */
		coinList: TableLobbyGameList.CoinListItem[];
		/**
		 * 游戏任务
		 */
		gameTask: TableLobbyGameList.GameTaskItem[];
		/**
		 * 游戏选择
		 */
		mahjongList: number[];
		/**
		 * 小程序游戏
		 */
		applets: number[];
		/**
		 * 隐藏的游戏
		 */
		invisibleList: number[];
		/**
		 * 练习场场次数据
		 */
		exerciseList: TableLobbyGameList.ExerciseListItem[];
		/**
		 * 绑定优惠
		 */
		bindList: number[];
		/**
		 * 商品
		 */
		shopList: number[];
		/**
		 * 微信商品
		 */
		wechatshopList: number[];
		/**
		 * 首充礼包
		 */
		firstCharge: number[];
		/**
		 * 领取方式
		 */
		payment: number;
		/**
		 * 礼物
		 */
		giftList: number[];
		/**
		 * 练习场场次展示
		 */
		exerciseLabelList: TableLobbyGameList.ExerciseLabelListItem[];
		/**
		 * 大厅签到
		 */
		sign: number[];
		/**
		 * 分享送钻
		 */
		share: number[];
		/**
		 * 免费游戏
		 */
		freeList: number[];
		/**
		 * 好彩图标
		 */
		haocaiIcon: number[];
		/**
		 * 老友图标
		 */
		laoyouIcon: number[];
		/**
		 * 分享标题
		 */
		shareTitle: string;
		/**
		 * 小程序话费兑换
		 */
		newshopList: number[];
		/**
		 * 小程序话费兑换钻石
		 */
		diamondshopList: number[];
		/**
		 * 小程序月卡
		 */
		monthCard: number[];
		/**
		 * 游戏内分享
		 */
		gameShare: number[];
		/**
		 * 小程序分享送钻
		 */
		newShare: TableLobbyGameList.NewShareItem[];
		/**
		 * 小程序分享大礼包
		 */
		newSharegift: TableLobbyGameList.NewSharegiftItem[];
		/**
		 * 小程序分享内容
		 */
		newshareContent: string[];
		/**
		 * 小程序分享图
		 */
		newsharepicture: string[];
		/**
		 * 新链接
		 */
		newLink: string;
		/**
		 * 小程序收藏奖励
		 */
		subscribeAward: TableLobbyGameList.SubscribeAwardItem[];
		/**
		 * 闲聊appId
		 */
		xianliaoAppid: string;
		/**
		 * 闲聊的url
		 */
		xianliaoUrl: string;
		/**
		 * 不要练习场
		 */
		noPractice: number;
		/**
		 * 练习场扣钻
		 */
		pracFee: number;
		/**
		 * 托管模式
		 */
		autoMode: number;
		/**
		 * 礼物付费
		 */
		giftCost: number;
		/**
		 * 复制分享
		 */
		copyShare: number;
		/**
		 * 分享头
		 */
		shareFirst: string;
		/**
		 * 分享内容
		 */
		shareContent: string;

		GetType(): string { return 'table.TableLobbyGameList'; }
	}
	export module TableLobbyGameList {
		export class NewSevendayItem {
			day: number;
			gift: number[];
		}
	}
	export module TableLobbyGameList {
		export class BrokeRelieveItem {
			time: number;
			goodId: number[];
		}
	}
	export module TableLobbyGameList {
		export class CoinListItem {
			gameId: number;
			sceneId: number[];
		}
	}
	export module TableLobbyGameList {
		export class GameTaskItem {
			gameId: number;
			taskId: number[];
		}
	}
	export module TableLobbyGameList {
		export class ExerciseListItem {
			id: number;
			bet: number;
			type: number;
			minLimit: number;
			maxLimit: number;
			cost: number;
		}
	}
	export module TableLobbyGameList {
		export class ExerciseLabelListItem {
			id: number;
			name: string;
			bet: string;
			limit: string;
		}
	}
	export module TableLobbyGameList {
		export class NewShareItem {
			goodId: number;
			goodNumber: number;
		}
	}
	export module TableLobbyGameList {
		export class NewSharegiftItem {
			goodId: number;
			goodNumber: number;
		}
	}
	export module TableLobbyGameList {
		export class SubscribeAwardItem {
			goodId: number;
			goodNumber: number;
		}
	}
}