module chessCommonLib {
	export class LoadGameTipUtil {
		// private static _instance: LoadGameTipUtil;

		private static _loadingCls: any = uniLib.UIMgr.instance.tipsLoadUI;

		public static fastGameId: number = 0;

		public static gameScaleY: number = 1;
		public static offsetX: number = 0;


		/*退出提示**/
		public static ExitTipText: string = "不想连本带利赢回来了吗？就这样退出游戏？";
		/**显示退出和取消按钮文字显示 */
		public static showExitConfrimTxt: boolean = true;

		// public static getInstance(): LoadGameTipUtil {
		// 	if (!this._instance) {
		// 		this._instance = new LoadGameTipUtil();
		// 		this._instance._positionDic = {};
		// 	}
		// 	return this._instance;
		// }

		private static _positionDic: any = {};

		/**
		 * 设置loadingUI
		 */
		public static set loadingCls(cls: any) {
			this._loadingCls = cls;
		}

		/**
		 * 游戏加载按钮注册响应事件
		 * @param ui
		 * @param gameId
		 * @param x
		 * @param y
		 * @param loadend  显示对象或者回调处理函数
		 */
		public static reg(ui: egret.DisplayObjectContainer, gameId?: number, x?: number, y?: number, loadend?: any, thisObj?: any): void {
			if (this._positionDic[ui.hashCode] == null) {
				this._positionDic[ui.hashCode] = new LoadGameVo();
			}
			if (x && x != null) {
				this._positionDic[ui.hashCode].position = new egret.Point(x, y);
			} else {
				this._positionDic[ui.hashCode].position = ui.parent.localToGlobal(ui.x, ui.y);
				// this._positionDic[ui.hashCode].position.x += this.offsetX;
			}

			this._positionDic[ui.hashCode].ui = ui;
			if (loadend)
				this._positionDic[ui.hashCode].loadend = loadend;
			if (thisObj) {
				this._positionDic[ui.hashCode].thisObj = thisObj;
			}

			if (gameId)
				this._positionDic[ui.hashCode].gameId = gameId;

			ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		}

		private static _loadingGameId: number = 0;

		public static get loadingGameId(): number {
			return this._loadingGameId;
		}

		public static loadGameById(ui: egret.DisplayObjectContainer,gameId: number,loadend?: any,x?:number,y?:number,d?:number): void {
			if (this.isLoadingOther()) {
				return;
			}
			
			this._currentLoadGame  = new LoadGameVo();
			this._currentLoadGame.gameId = gameId;
			this._currentLoadGame.loadend = loadend;
			this._currentLoadGame.position = ui.parent.localToGlobal(ui.x, ui.y);
			// this._currentLoadGame.position.x += this.offsetX;
			if(x)
				this._currentLoadGame.position.x = x + this.offsetX;
			if(y)
				this._currentLoadGame.position.y = y;
			
			this.loadGame(this._currentLoadGame.gameId, this.onLoadGame, this.onLoadFail, this.onProcess, this);
		}

		public static isLoadingOther():boolean{
			if (this._loadingGameId != 0) {
				uniLib.TipsUtils.showTipsDownToUp("当前正在加载游戏,请等待", false);
				return true;
			}
			if(chessCommonLib.LoadPanelTipMgr.getInstance().isLoading()){
				uniLib.TipsUtils.showTipsDownToUp("正在加载面板资源,请等待");
				return true;
			}
			if(chessCommonLib.ResLoadUitl.hasLoad() == false){
				uniLib.TipsUtils.showTipsDownToUp("正在加载公共资源,请等待");
				return true;
			}
			return false;
		}

		/**
		 * 加载游戏
		 */
		public static loadGame(gameId: number, succ: Function, fail: Function, process: Function, thisObj: any): void {
			if (gameId == 0 || !gameId) {
				if (this.fastGameId != 0) {
					gameId = this.fastGameId;
				}
			}
			
			if (this.isLoadingOther()) {
				return;
			}
			
			let gameData: any = ConfigMgr.getInstance().getGameCfgById(gameId);
			if (gameData == null) {
				uniLib.TipsUtils.showTipsDownToUp("游戏ID不存在");
				return;
			}
			let sucall = ()=>{
				console.log(this._loadingGameId+"下载完成！");
				this._loadingGameId = 0;
				if (succ)
					succ.call(thisObj, gameData);
			}
			let sureLoad = () => {
				if (process)
					process.call(thisObj, 0);
				if (gameData) {
					this._loadingGameId = gameData.gameId;
					if (this.fastGameId != 0) {
						this.fastGameId = gameData.gameId;
					}
					console.log(this._loadingGameId+"开始下载！");
				}
				if (uniLib.GameModuleUtils.gameDownloaded(gameData.gameCodeUrl) == false) {
					if (process)
						process.call(thisObj, 1);
					uniLib.GameModuleUtils.downloadGame(gameData, () => {
						sucall();
					}, (e: any) => {
						let percent = (e.itemsLoaded / e.itemsTotal * 100).toFixed(0);
						if (process)
							process.call(thisObj, percent);
					}, () => {
						if(egret.hasDefinition("egret_native"))
							egret_native["deleteUpdateFile"](gameData.gameCodeUrl);
						console.log(this._loadingGameId+"下载失败！");
						this._loadingGameId = 0;
						if (fail)
							fail.call(thisObj);
					
					}, this);
				} else {
					sucall();
				}
			}
			if (!uniLib.GameModuleUtils.gameDownloaded(gameData.gameCodeUrl) && uniLib.ZQGameSdk.netState != uniLib.NetState.WIFI && !uniLib.Global.isH5) {
				ModuleMgr.getInstance().showConfirm("您处于非wifi状态下，是否继续下载？", "", "确定", sureLoad, "取消", null, this);
			} else {
				sureLoad();
			}
		}

		private static _currentLoadGame: LoadGameVo;
		private static onTouchHandle(e: egret.TouchEvent): void {
			let target = e.target;
			if (this._loadingGameId != 0) {
				uniLib.TipsUtils.showTipsDownToUp("当前正在加载游戏,请等待", false);
				return;
			}
			if(chessCommonLib.LoadPanelTipMgr.getInstance().isLoading()){
				uniLib.TipsUtils.showTipsDownToUp("正在加载面板资源,请等待");
				return;
			}
			if (this._positionDic[target.hashCode]) {
				this._currentLoadGame = this._positionDic[target.hashCode];
				// MsgSendMgr.enterGame(this._currentLoadGame.gameId);
				this.loadGame(this._currentLoadGame.gameId, this.onLoadGame, this.onLoadFail, this.onProcess, this);
			}
		}

		private static onProcess(per: number): void {
			uniLib.UIMgr.instance.showUI(this._loadingCls, per, null, false, false, this._currentLoadGame.position.x, this._currentLoadGame.position.y * this.gameScaleY);
		}

		private static onLoadGame(): void {
			uniLib.UIMgr.instance.hideUI(this._loadingCls);
			// console.error(this._currentLoadGame);
			if (!this._currentLoadGame.gameId) {
				this._currentLoadGame.gameId = this.fastGameId;
			}
			if (this._currentLoadGame.loadend) {
				if (egret.is(this._currentLoadGame.loadend.prototype, "egret.DisplayObjectContainer")) {
					uniLib.PopUpMgr.addPopUp(this._currentLoadGame.loadend, null, true, true);
				} else {
					this._currentLoadGame.loadend.call(this._currentLoadGame.thisObj, this._currentLoadGame);
				}
			}
			// else {
			// 	MsgSendMgr.enterGame(this._currentLoadGame.gameId);
			// }
		}

		private static onLoadFail(): void {
			uniLib.ZQGameSdk.restart("资源下载失败,请检查网络连接", "确定");
			// ModuleMgr.getInstance().showConfirm("资源下载失败,请检查网络？", "", "确定", () => {
			// 	uniLib.UIMgr.instance.hideUI(this._loadingCls);
			// });
		}

		public static destroy(): void {
			for (var str in this._positionDic) {
				if (this._positionDic[str]) {
					this._positionDic[str].ui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
					this._positionDic[str] = null;
					delete this._positionDic[str];
				}
			}
			// this._cancelList = null;
		}
	}

	/**
	 * 加载位置
	 */
	export class LoadGameVo {
		ui: egret.DisplayObjectContainer;
		position: egret.Point;
		gameId: number;
		loadend: any;
		thisObj: any
	}
}