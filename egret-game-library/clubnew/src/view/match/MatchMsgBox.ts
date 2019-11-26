module clubnew {
	/**
	 * 免责申明
	 */
	export class MatchMsgBox extends commonpanel.LobbyBaseEuiPanel {
		private title: eui.Label;
		private info: eui.Label;
		private confirm: eui.WxButton;
		private _closebtn: eui.WxButton;
		private cancel: eui.WxButton;
		private _backFn: Array<Function>;
		private _backObject: any;
		public constructor() {
			super();
			this.skinName = "MatchMsgBoxSkin";
		}

		protected initUI() {
			this._closebtn.setColorMatrix();
		}

		public setData(title: string, msg: string, labelArr: Array<any>, backFn?: Array<Function>, backObject?: any) {
			if (labelArr === void 0) { labelArr = null; }
			if (backFn === void 0) { backFn = null; }
			if (backObject === void 0) { backObject = null; }
			this.title.text = "温馨提示";
			this.info.text = msg;
			this._backFn = backFn;
			this._backObject = backObject;
			if (labelArr.length == 1) {
				this.confirm.x = 220;
				this.confirm.visible = true;
				this.cancel.visible = false;
			}
			else if (labelArr.length == 2) {
				this.confirm.x = 66;
				this.confirm.visible = true;
				this.cancel.visible = true;
			}
			if (backFn && backFn[0]) {
				this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, backFn[0], backObject);
			}
			if (this._backFn && this._backFn[1]) {
				this.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], backObject);
			}

			this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
			this.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
			this._closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
		}
		public destroy() {
			super.removePop();
			if (this._backFn && this._backFn[0]) {
				this.confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObject);
			}
			if (this._backFn && this._backFn[1]) {
				this.cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObject);
			}
			this.confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
			this.cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
			this._closebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
		}
	}
}