module joinroom {
	export class InputNumItem extends egret.DisplayObjectContainer {
		private _inputTxt: LobbyBitmapText;
		private _value: number;
		public constructor() {
			super();
			this.initUI();
		}
		public initUI(): void {
			var bg: egret.Bitmap = LobbyResUtil.createBitmapByName("mjl_join_numbg");
			bg.scale9Grid = new egret.Rectangle(20, 19, 29, 24);
			this.addChild(bg);
			this.width = bg.width = 70
			this.height = bg.height = 63;
			this._inputTxt = LobbyUtils.getBitmapFontTxt("mjl_input_fn1_fnt", 62, egret.HorizontalAlign.CENTER, 1, 13);
			// LobbyResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.CENTER, "", 32, 3, 8, 45);
			this.addChild(this._inputTxt);
		}
		public set value(num: number) {
			this._inputTxt.text = num.toString();
			this._value = num;
		}
		public get value(): number {
			return this._value;
		}
		public delete(): void {
			this._inputTxt.text = "";
		}
	}
}