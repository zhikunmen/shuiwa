module chessCommonLib {
	class ModuleEnume {
		public constructor() {
		}
	}

	/**
	 * 公共模块
	 */
	export class CommonModelEvent {
		/**
		 * 用户信息模块
		 */
		public static USERINFO:string = "userInfo";
		/**
		 * 商城
		 */
		public static SHOP:string = "shop";
		/**
		 * 福利
		 */
		public static FULI:string = "fuli";
		/**
		 * 活动
		 */
		public static ACTIVITY:string = "activity";
		/**
		 * 任务
		 */
		public static TASK:string = "task";
		/**
		 * 保险箱
		 */
		public static SAFEBOX:string = "safebox";
		/**
		 * 邮件
		 */
		public static MAIL:string = "mail";
		/**
		 * VIP
		 */
		public static VIP:string = "vipinfo";
		/**
		 * 公告牌
		 */
		public static NOTICE:string = "notice";
		/**
		 * 聊天
		 */
		public static CHAT:string = "chat";
		/**
		 * 救济金
		 */
		public static FREECHIP:string = "freeChip";
		/**
		 * 红包
		 */
		public static REDPACKAGE:string = "redpackage";
		/**
		 * 好友
		 */
		public static FRIEND:string = "friend";

		/**
		 * 排行榜
		 */
		public static RANK:string = "rank";

		/**
		 *请求游戏进度数据
		 */
		public static REQUEST_TASK_SCHEDULE:string = "request_task_schedule";

		/**
		 *返回游戏进度数据
		 */
		public static RESPOND_TASK_SCHEDULE:string = "respond_task_schedule";

		/**
		 *请求时时彩信息
		 */
		public static REQUEST_SHISHICAI_INFO:string = "request_shishicai_info";

		/**
		 *返回时时彩信息
		 */
		public static RESPOND_SHISHICAI_INFO:string = "respond_shishicai_info";

		/**
		 * 广告牌点击
		 */
		public static SYSMSG_CLICK:string = "sysmsg_click";

		/**
		 * 对局流水
		 */
		public static GAME_WATER:string = "game_water";

		/**
		 * 游戏帮助
		 */
		public static GAME_HELP:string = "game_help";

		/**
		 * 时时彩
		 */
		public static SSC:string = "ssc";

		/**
		 *喜从天降活动广播
		 */
		public static SUPRISE_GIFT_CMD_BRD:string = "suprise_gift_cmd_Brd";

		/**
		 *喜从天降充值成功
		 */
		public static SUPRISE_GIFT_RECHARGED:string = "suprise_gift_recharged";
		/**
		 *打开福袋暴击红包
		 */
		public static BAOJI_REDPACK:string = "baoji_redpack";
		/**
		 *打开无座玩家面板
		 */
		public static NO_SEAT_USER:string = "no_seat_user";
		/**
		 *游戏调用大厅设置
		 */
		public static GAME_SETTING:string = "game_setting";

		/**
		 *游戏记录  两个参数{gameId:175,skin:0}
		 * skin 0:默认皮肤  1：绿色  2：蓝色  3紫色
		 */
		public static GAME_RECORD:string = "game_record";

		// /**
		//  * 在线礼包
		//  */
		// ONLINE_GIFT = 2,
		// /**
		//  * 背包
		//  */
		// BAG = 3,
		// /**
		//  * 活动中心
		//  */
		// ACTIVITY = 4,
		// /**
		//  * 个人信息
		//  */
		// MY = 5,
		// /**
		//  * 大厅底部菜单
		//  */
		// LOBBY_MAIN_MENU = 6,
		// /**
		//  * 游戏头部聊天
		//  */
		// TOP_CHAT = 7,

		// /**
		//  * 兑换话费卡
		//  */
		// EXCHANGE_PHONECARD = 9,
		// /**
		//  * 大厅公告
		//  */
		// LOBBY_NOTICE = 10,
		// /**
		//  * 设置
		//  */
		// LOBBY_SETTING = 11
	}
}


