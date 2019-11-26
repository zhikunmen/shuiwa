module login {
	export class LoginScene extends uniLib.GameScene {

		private _view: LoginView;
		public constructor() {
			super();
		}

		public awake(): void {
			this._view = new LoginView();
			this.uiLayer.addChild(this._view);
		}

		public start(): void {
			uniLib.ZQGameSdk.getNetStateType();
		}

		public destroy(): void {
			this._view.destroy();
		}
	}
}