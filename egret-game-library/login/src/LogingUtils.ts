module login {
	/**
	 * 登录
	 */
	export class LogingUtils {
		/**登录类型  游客1 微信2 账号3 */
		public static loginType: number = 1;
		private static _currenPlat: number = 0;

		public static accountLogin(): void {
			this._currenPlat = 0;
			uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this);
		}

		public static qqLogin(): void {
			var data: any = {};
			data.platid = 263;
			this._currenPlat = data.platid;
			uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this, data);
		}

		public static wxLogin(): void {
			this._currenPlat = 0;
			if (uniLib.Global.platId == 100000) {
				var data: any = {};
				data.platid = 264;
				this._currenPlat = data.platid;
			}
			uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this, data);
		}

		/**游客登录 */
		public static youkeLogin(): void {
			this._currenPlat = 0;
			uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this, -1);
		}


		/**账号登录 */
		private static onLogin(msg?: any): void {
			console.error("login back" + JSON.stringify(msg));
			console.error("game config1:" + uniLib.Global.gameConfig.wx_appid);
			let a = {};
			console.error(" Object.isFrozen(a);", Object.isFrozen(a));

			if (msg.code == 0) {
				var plt: Pmd.PlatInfo = new Pmd.PlatInfo();
			};
			plt.platid = msg.data.platid;
			if (this._currenPlat == 263 || this._currenPlat == 264) {
				uniLib.Global.payPlatId = this._currenPlat;
			} else {
				if (msg.data.payplatid) {
					uniLib.Global.payPlatId = msg.data.payplatid;
				}
			}
			if (msg.data.uid)
				plt.uid = msg.data.uid;
			if (msg.data.session)
				plt.sign = msg.data.session;
			if (msg.data.extData)
				plt.extdata = msg.data.extData;
			if (msg.data.deviceToken) {
				plt.imei = msg.data.deviceToken + ":" + uniLib.Global.bundleId.substring(0, uniLib.Global.bundleId.indexOf("_"));
			}
			plt.osname = egret.Capabilities.os;
			uniLib.Global.initPlatInfo(plt);
			NetMgr.platLogin();
		}

		public static onLogout(): void {
			uniLib.NetMgr.logout();
			// LobbyInfoMgr.getInstance().userInfo = null;
			console.log("注销游戏进入" + uniLib.Global.gameId + ":" + uniLib.Global.getPlatId());
			uniLib.GameModuleUtils.ExitGame(false);
			uniLib.SceneMgr.instance.changeScene(LoginScene);
		}

	}
}