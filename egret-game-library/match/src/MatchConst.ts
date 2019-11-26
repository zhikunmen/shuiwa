module match {

	/**匹配等待界面 */
	export var matchWaitPanel: WxMatchWait | WxEliminateWait;

	export var sceneInfoMap: Map<number, Cmd.GetSceneInfoHpMatchCmd_S> = new Map();

	export class MatchConst {

		public static RES_JSON = "resource/wxmatch.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 主界面需要加载的资源
		 */
		public static PUB_LOGIN: string = "bs_login";

		/**
		 * 好牌网比赛资源组
		 */
		public static HPW_MATCH: string = "wxmatch";
		/**
		 * 金币资源组
		 */
		public static HPW_GOLD: string = "bs_gold";

		/**
		 * 金猪资源组
		 */
		public static HPW_PIG: string = "bs_pig";

		/**
		 * 捕鱼资源组
		 */
		public static BUYU: string = "buyu";

		public static BUYU_REWARD: string = "buyu_reward";

		/**
		 * 闯关报名界面
		 */
		public static HPW_RUSH: string = "bs_rush";
	}

	/**
	 * 游戏Id
	 */
	export enum GameId {
		/**跑得快比赛和金猪*/
		ID_MATCH_PIG = 4231,
		/**跑得快金币场和福卡闯关 */
		ID_COIN_FOUCA = 4239,
		/**跑得快房卡 */
		ID_CARD = 4207,
		/**二人麻将 */
		ID_ERMJ = 4249,
		/**捕鱼 */
		ID_BUYU = 150
	}

	/**
	 * 大类型 以前没有定义 现在枚举一个 
	 *1:金币场 2:金银猪 3:闯关 4:比赛
	 */
	export enum BigSceneType {
		/**金币场*/
		TYPE_COIN = 1,
		/**金银猪 */
		TYPE_PIG = 2,
		/**闯关 */
		TYPE_RUSH = 3,
		/**比赛 */
		TYPE_MATCH = 4
	}

	/**
	 * 比赛类型
	 */
	export enum GameType {
		/**参赛卡赛*/
		TYPE_CARD = 1,
		/**红包淘汰赛 */
		TYPE_OUT = 7,
		/**钻石淘汰赛 */
		TYPE_DIAMOND = 8
	}

	/**
	 * 道具类型
	 */
	export enum GoodType {
		/**房卡 */
		TYPE_CARD = 1,
		/**钻石*/
		TYPE_DIAMOND = 6,
		/**金币 */
		TYPE_GOLD = 32,
		/**福卡 */
		TYPE_FUKA = 336,
		/**彩蛋 */
		TYPE_EGG = 340
	}

	export enum SceneType {
		/**比赛场 */
		TYPE_MATCH = 0,
		/**经典场 必出*/
		TYPE_CALSSIC = 1,
		/**跑八张 */
		TYPE_EIGHT_CARD = 2,
		/**疯狂场 */
		TYPE_CRAZY = 3,
		/**经典场 非必出*/
		TYPE_CLASSIC2 = 4,
		/**金猪 */
		TYPE_PIG = 5,
		/**换三张 */
		TYPE_EXCHANGE = 6,
		/**福卡闯关 */
		TYPE_FUKA = 7,
		/**游戏更新公告 */
		TYPE_NOTICE = 8,
	}

	/**排行榜信息 */
	export var EVENT_RANKINFO = "event_rankinfo";

	/**比赛列表 */
	export var EVENT_GAMELIST = "event_gamelist";

	/**红包赛房满进入房间*/
	export var EVENT_MATCH_RNTER_ROOM = "event_match_enter_room";

	/**获奖记录 */
	export var EVENT_REWARDRECORD = "event_rewardrecord";

	/**战绩记录 */
	export var EVENT_HISTORY = "event_history";

	/**红包奖励 */
	export var EVENT_PACKAGEREWARD = "event_packagereward";

	/**主界面刷新 */
	export var EVENT_FLUSH = "event_flash";

	/**报名人数更新*/
	export var EVENT_REPORT_NUM = "event_report_num";

	/**匹配人数更新*/
	export var EVENT_MATCH_NUM = "event_match_num";

	/**退出界面时间*/
	export var EVENT_CLOSE_PANEL = "event_close_panel";

	/**退出界面时间*/
	export var EVENT_CLOSE_PANEL = "event_close_panel";

	/**金猪银猪数据*/
	export var EVENT_PIG_DATA = "event_pig_data";
}