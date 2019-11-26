module chessCommonLib {
	export class ConfigMgr {
		public constructor() {
		}

		private static _instance: ConfigMgr;

		public static getInstance(): ConfigMgr {
			if (!this._instance) {
				this._instance = new ConfigMgr();
			}
			return this._instance;
		}

		private loginData: any;

		/**
		 * 获取登录配置
		 */
		public getLoginCfg(tag: string = "default"): any {
			if (this.loginData == null) {
				if (uniLib.Global.gameConfig) {
					if (!uniLib.Global.gameConfig.lobbyId) {
						uniLib.Global.gameConfig.lobbyId = 31;
					}
					this.loginData = uniLib.Global.gameConfig;
				}
				else {
					this.loginData = RES.getRes("config_json")[tag];
				}
			}
			return this.loginData;
		}

		// /**暂存数据 管理对应的表数据 */
		// /**每日签到 */
		public sign: any = {};
		/**道具表 */
		public goods: any = {};
		/**商城物品 */
		public shop: any = {};
		/**每日任务 充值任务等 */
		public task: any = {};
		/**游戏配置列表 */
		public lobbyGameList: any = {};
		/**游戏列表 */
		public gameList: any = {};
		/**限时活动 */
		public limit: any = {};
		/**幸运翻翻翻 */
		public luck: any = {};
		/**游戏玩法列表 */
		public playTypeList: any = {};
		public headMc: any = {};
		/**
		 * vip配置
		 */
		public vip: any = {};

		private _tableInited: boolean = false;

		/**游戏内周边功能显示控制 */
		public gameOptions: gameOptions = new gameOptions();

		public tableInited(): boolean{
			return this._tableInited;
		}
		/**
		 * 初始化配置
		 */
		public initTables(): void {
			if (this._tableInited == true) {
				return;
			}
			this._tableInited = true;
			//加载表中数据
			let signTableData = <Array<table.TableSignIn>>RES.getRes("TableSignIn_json");
			if (signTableData) {
				signTableData.forEach(f => {
					this.sign[f.lobbyId] = f;
				})
			}

			let taskTableData = <Array<table.LobbyTaskConfig>>RES.getRes("LobbyTaskConfig_json");
			if (taskTableData) {
				taskTableData.forEach(f => {
					this.task[f.id] = f;
				})
			}
			let goodsTableData = <Array<table.TableGoodsConfig>>RES.getRes("TableGoodsConfig_json");
			if (goodsTableData) {
				goodsTableData.forEach(f => {
					this.goods[f.goodId] = f;
				})
			}

			let gamelistTableData = <Array<table.TableLobbyGameList>>RES.getRes("TableLobbyGameList_json");
			if (gamelistTableData) {
				gamelistTableData.forEach(f => {
					this.lobbyGameList[f.id] = f;
				})
			}

			let gameConfigTableData = <Array<table.gameList>>RES.getRes("gameList_json");
			if (gameConfigTableData) {
				gameConfigTableData.forEach(f => {
					this.gameList[f.gameId] = f;
				})
			}

			let shopTableData = <Array<table.TableShopConfig>>RES.getRes("TableShopConfig_json");
			if (shopTableData) {
				shopTableData.forEach(f => {
					this.shop[f.shopId] = f;
				})
			}

			let limitTableData = <Array<table.TableLimitOfferConfig>>RES.getRes("TableLimitOfferConfig_json");//限时优惠
			if (limitTableData) {
				limitTableData.forEach(f => {
					this.limit[f.id] = f;
				})
			}

			let vipTable = <Array<table.TableVip>>RES.getRes("TableVip_json");//vip配置
			if (vipTable) {
				vipTable.forEach(f => {
					if (!this.vip[f.level] || (this.vip[f.level] && this.vip[f.level].lobbyId == 0)) {
						this.vip[f.level] = f;
					}
				})
			}

			let headTable = <Array<table.headMc>>RES.getRes("headMc_json");//头像资源配置
			if (headTable) {
				headTable.forEach(f => {
					this.headMc[f.id] = f;
				})
			}

			let playtypeTable = <Array<table.headMc>>RES.getRes("TablePlayTypeList_json");//头像资源配置
			if (playtypeTable) {
				playtypeTable.forEach(f => {
					this.playTypeList[f.id] = f;
				})
			}
			//@autohr garr 冻结一下，兼容性应该没问题
			Object.freeze(this.sign)
			Object.freeze(this.task)
			Object.freeze(this.goods)
			Object.freeze(this.lobbyGameList)
			Object.freeze(this.gameList)
			Object.freeze(this.shop)
			Object.freeze(this.limit)
			Object.freeze(this.vip)
			Object.freeze(this.headMc)
			Object.freeze(this.playTypeList)

			console.log("table load success");
		}
     /**获取玩法列表 */
		public getPlayTypeDes = function (id: number): string {
			if (this.playTypeList[id]) {
				return this.playTypeList[id].desc;
			} else {
				return "";
			}
		}

			/**所有玩法id 转换desc  这个传入的参数就是玩法列表，目前的使用方法是
			 * chessCommonLib.ConfigMgr.getInstance().getPlayTypeByList(game.RoomInfo.getInstance().playTypeList);
			 * 其中game是mahjongClientLib里面的
			 * @author garr
			 * 2018-5-28
			*/
		public getPlayTypeByList(playTypeList:number[]): string {
			if (!RES.hasRes("TablePlayTypeList_json")) return "";
			var desc: string = "";
			//
			if (!playTypeList || !playTypeList.length || playTypeList.length == 0) {
				playTypeList = [];
			}
			playTypeList.sort(function (a: any, b: any): number {
				if (a > b) return 1;
				else if (a == b) return 0;
				return -1;
			});
			for (let i: number = 0; i < playTypeList.length; i++) {
				//兼容漳浦抓花 插花特殊玩法 俩如抓花玩法是464 抓花16 那么玩法为464.161 最后的1是方便排除10 20这样服务器小数点后为0识别不出
				if(playTypeList[i].toString().indexOf(".") != -1){
					let playStr = playTypeList[i].toString().split(".");
					let name = this.getPlayTypeDes(Number(playStr[0])) + playStr[1].substr(0,playStr[1].length - 1);
					desc = desc +  name;
				}
				let name: string = this.getPlayTypeDes(playTypeList[i]);
				desc = desc + name + "   ";
			}
			return desc;
		}

		/**
		 * 通过签到ID获取任务配置
		 */
		public getSignCfgById(lobbyId: number): table.TableSignIn {
			if (this.sign[lobbyId]) {
				return this.sign[lobbyId];
			} else {
				return null;
			}
		}

		/**
		 * 通过任务ID获取任务配置
		 */
		public getTaskCfgById(taskId: number): table.LobbyTaskConfig {
			if (this.task[taskId]) {
				return this.task[taskId];
			} else {
				return null;
			}
		}

		/**
		 * 通过shopID获取商城配置
		 */
		public getShopCfgById(shopId: number): table.TableShopConfig {
			if (this.shop[shopId]) {
				return this.shop[shopId];
			} else {
				return null;
			}
		}

		/**
		 * 通过goodId获取物品配置
		 */
		public getGoodCfgById(goodId: number): table.TableGoodsConfig {
			if (this.goods[goodId]) {
				return this.goods[goodId];
			} else {
				return null;
			}
		}

		/**
		 * 通过goodId获取限时优惠配置
		 */
		public getLimitCfgById(limitId: number): table.TableLimitOfferConfig {
			if (this.limit[limitId]) {
				return this.limit[limitId];
			} else {
				return null;
			}
		}

		/**
		 * 通过gameId获取游戏列表配置
		 */
		public getGameListCfgById(gameId: number): table.TableLobbyGameList {
			if (this.lobbyGameList[gameId]) {
				return this.lobbyGameList[gameId];
			} else {
				return null;
			}
		}

		/**
		 * 通过游戏ID获得游戏配置项
		 */
		public getGameCfgById(gameId: number): table.gameList {
			if (this.gameList[gameId]) {
				return this.gameList[gameId];
			} else {
				return null;
			}
		}

		/**
		 * 通过vip等级获得vip
		 */
		public getVipByLevel(level: number = 0): table.TableVip {
			if (this.vip[level]) {
				return this.vip[level];
			} else {
				return null;
			}
		}

		/**
		 * 通过id获取头像动画
		 */
		public getheadMcById(id: number = 0): table.headMc {
			if (this.headMc[id]) {
				return this.headMc[id];
			} else {
				return null;
			}
		}

		public getNameColor(level: number): number {
			// if (this.vip[level]) {
			// 	return Number(this.vip[level].nickNameColor);
			// } else {
			// 	return 0xffffff;
			// }
			if (level == 9)
				return 0xff0000;
			else
				return 0xffffff;
		}

		/**
		 * 获取gamelist配置
		 */
		public getGameListCfg(remoteBack?: Function, thisObj?: any): table.gameList {
			let gameList: table.gameList;
			try {
				gameList = JSON.parse(uniLib.Utils.getLocalStorage("gameList_cfg"));
			} catch (e) {

			}
			if (!gameList) {
				gameList = RES.getRes("gameList_json");
			}
			let configUrl: string;
			if (uniLib.Global.CdnDomains && uniLib.GameModuleUtils.gameRemotePaths) {
				configUrl = uniLib.Global.CdnDomains[0] + uniLib.GameModuleUtils.gameRemotePaths[0] + "gameList.json?v=" + Math.random();
			}

			let ret = uniLib.ResUtils.getRes(configUrl, (data) => {
				let jsonStr: string = JSON.stringify(uniLib.Utils.sortJson(data));
				if (uniLib.StringUtils.MD5(jsonStr) != uniLib.StringUtils.MD5(JSON.stringify(uniLib.Utils.sortJson(gameList)))) {
					uniLib.Utils.setLocalStorage("gameList_cfg", jsonStr);
					if (remoteBack) {
						remoteBack.call(thisObj, data);
					}
				}
			}, this, RES.ResourceItem.TYPE_JSON);
			return gameList;
		}
	}
}