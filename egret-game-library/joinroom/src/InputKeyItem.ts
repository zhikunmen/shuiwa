module joinroom {
	export class InputKeyItem extends eui.Button {
		private _inputTxt: LobbyBitmapText;
		private _value: number;
		public constructor() {
			super();
			this.skinName = "MJ_JoinRoomButtonSkin";
			// this.width = 216;
			// this.height = 80;
			this.initUI();
		}
		public initUI(): void {
			this._inputTxt = LobbyUtils.getBitmapFontTxt("mjl_input_fn2_fnt", 210, egret.HorizontalAlign.CENTER, 1, 25);
			this.addChild(this._inputTxt);
			this._inputTxt.touchEnabled = false;
		}
		public set value(num: number) {
			this._value = num;
			if (this._value == 9 || this._value == 11) {
				// this._inputTxt.y=14;
			}
			this._inputTxt.text = LobbyDataCache.langObj.uiTxt.JoinRoomPanel["key" + this._value];
		}
		public get value(): number {
			return this._value;
		}
		public destory(): void {

		}
	}
}