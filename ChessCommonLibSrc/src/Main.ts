module chessCommonLib {

	var _isInited: boolean = false;
	var _msgAdd: boolean = false;
	/**
    * 初始化库
    * @method commonLib.init
    * @param param {any} 初始化参数
    */
	export function init(param?: initOptions, callBack?: Function, thisObj?: any): void {
		if (_isInited == true) {
			return;
		}

		_isInited = true;
		var self = this;
		var thmLoaded: boolean;
		var resLoaded: boolean;
		if (!param) {
			param = new initOptions();
		}
		if (param.resConfig==null) {
			param.resRoot = "chessCommonLib/resource/";
			param.resConfig = "chessCommonLib/resource/chessCommonLib.res.json";
			param.thmConfig = "chessCommonLib/resource/chessCommonLib.thm.json";
			param.gameEui = "chessCommonEui.json";
			if (param.remoteMode != true)
				param.remoteMode = false;
		}

		if (uniLib.Global.isH5 == true) {
			param.remoteMode = true;
		}

		if (param.remoteMode == true) {
			let cdnDomain: string = uniLib.Global.CdnDomains[0];
			param.resConfig = cdnDomain + param.resConfig;
			param.resRoot = cdnDomain + param.resRoot;
			param.thmConfig = cdnDomain + param.thmConfig;
		}

		var loadedthm = function (event: RES.ResourceEvent = null): void {
			// if (egret.Capabilities.engineVersion < "5.1.0") {
			// 	thmLoaded = true;
			// 	if (resLoaded == true) {
			// 		callBack.call(thisObj);
			// 	}
			// } else {
			thmLoaded = true;
			if (resLoaded == true) {
				callBack.call(thisObj);
			}
			// }
		}


		var loadthemeOld = function (): void {
			uniLib.ResUtils.getTheme(param.thmConfig, () => {
				loadedthm();
			}, () => {
				if (egret.Capabilities.engineVersion < "5.1.0") {
					uniLib.TipsUtils.showConfirm("chessCommon 皮肤初始化失败,是否重试？取消将返回大厅", "提示", "确定", loadthemeOld);
				} else {
					loadthmeNew();
				}
			}, this, "", "content");
		}

		var loadthmeNew = function (): void {
			uniLib.ResUtils.getTheme(param.resConfig.substring(0, param.resConfig.lastIndexOf("\/") + 1) + param.gameEui, () => {
				loadedthm();
			}, () => {
				if (window["DEBUG"]) {
					console.error("找不到游戏的gameEui文件,请检查该游戏引擎是否已经升级到5.1.x以上版本！！！")
					loadthemeOld();
				} else {
					uniLib.TipsUtils.showConfirm("chessCommon 皮肤初始化失败,是否重试？取消将返回大厅", "提示", "确定", loadthmeNew);
				}
			}, this);
		}

		var loadedres = function (event: RES.ResourceEvent): void {
			resLoaded = true;
			if (param.thmConfig && param.thmConfig != "") {
				if (egret.Capabilities.engineVersion < "5.1.0") {
					loadthemeOld();
				} else {
					if (window && window["JSONParseClass"] != undefined) {
						loadthmeNew();
					} else {
						loadthemeOld();
					}
				}

				// } else {
				// 	loadthm();
				// }
			} else {
				thmLoaded = true;
			}
			if (thmLoaded == true) {
				callBack.call(thisObj);
			}
		}

		// let loadthm = function () {
		// 	uniLib.ResUtils.getTheme(param.thmConfig, loadedthm, () => {
		// 		ModuleMgr.getInstance().showConfirm("chessCommon thm 初始化失败,是否重试？", "提示", "确定", loadthm);
		// 	}, thisObj);
		// }

		console.log("## chessConfig ##" + param.resConfig + ":" + param.resRoot);

		uniLib.ResLoadMgr.instance.loadConfig(param.resConfig, param.resConfig.substring(0, param.resConfig.lastIndexOf("\/") + 1), loadedres, thisObj);//这里需要加入加载失败回调时切换cdn处理


		uniLib.Global.addEventListener(uniLib.ZqEvent.NATIVE_TO_EGERET, this.onExiteGame, this);//返回键统一处理
	}

	export function onExiteGame(e: uniLib.ZqEvent): void {
		//资源还没有加载完成的时候不响应返回按钮
		if (!ConfigMgr.getInstance().tableInited()) {
			return;
		}
		var data = e.param;
		if (data.cmd == uniLib.ZQGameSdk.EXITGAME && !_msgAdd) {
			_msgAdd = true;
			let okTxt = "退出";
			let calTxt = "取消";
			if (!LoadGameTipUtil.showExitConfrimTxt) {//兼容一下房卡大厅，这边字和按钮切在一起 顾不需要显示字
				okTxt = " ";
				calTxt = " ";
			}
			let msg: uniLib.MsgBox = new uniLib.MsgBox(chessCommonLib.LoadGameTipUtil.ExitTipText, "提示", okTxt, () => { uniLib.ZQGameSdk.exit(); _msgAdd = false; },
				calTxt, () => { _msgAdd = false; });
			uniLib.PopUpMgr.addPopUp(msg, null, true, true, 0, uniLib.PopUpEffect.CENTER);
		}
	}
}