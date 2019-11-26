module chessCommonLib {
	/**
	 * 公用模块
	 */
	export class ModuleMgr {
		public constructor() {
		}

		private static _instance: ModuleMgr;

		private _loadingCls: uniLib.ILoading;
		public skinType: number = 3;
		//是否全屏
		public isFullScreen: boolean = false;

		public static getInstance(): ModuleMgr {
			if (!this._instance) {
				this._instance = new ModuleMgr();
			}
			return this._instance;
		}


		/**
		 * 打开确认框
		 */
		public showConfirm(info: string, title?: string, oktxt?: string, okFunc?: Function, caltxt?: string, calFunc?: Function, thisObj?: any, cotainer?: egret.DisplayObjectContainer): void {
			if (oktxt != undefined && oktxt.trim() == "") {
				oktxt = "确定"
			}
			if (caltxt == "") {
				caltxt = "取消";
			}
			let msg: uniLib.MsgBox = new uniLib.MsgBox(info, title, oktxt, okFunc, caltxt, calFunc, thisObj);
			cotainer = cotainer || null
			uniLib.PopUpMgr.addPopUp(msg, cotainer, true, true, false, uniLib.PopUpEffect.CENTER);
		}


	}
}