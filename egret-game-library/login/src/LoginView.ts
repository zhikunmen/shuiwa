module login {
	/**
	 * 登录界面
	 */
	export class LoginView extends eui.Component {

		public bg_img: eui.Image;
		public _versionTxt: eui.Label;
		public phone_login: LoginPhone;
		public _btnContain: eui.Group;
		public _youkeLogin: eui.Button;
		public wx_btn: eui.Button;
		public _accountLogin: eui.Button;

		constructor() {
			super();
			this.width = uniLib.Global.screenWidth;
			this.height = uniLib.Global.screenHeight;
			this.skinName = "LoginSkin";
		}

		private addEvents(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		}

		private removeEvents(): void {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		}

		private onTouchHandle(e: egret.TouchEvent): void {
			let target: any = e.target;
			switch (target) {
				case this._accountLogin:
					this.phone_login.visible = true;
					this._btnContain.visible = false;
					break;
				case this.wx_btn:
					LogingUtils.wxLogin();
					LogingUtils.loginType = 2;
					break;
				case this._youkeLogin:
					uniLib.Utils.getLocalStorage("yyrem", (rev) => {
						if (rev) {
							let config = uniLib.Global.gameConfig ? uniLib.Global.gameConfig : NetMgr.getLoginCfg();
							NetMgr.init(config.login_url, config.gameid, config.zoneid);
							let data = JSON.parse(rev);
							NetMgr.LoginByTel(data.account, uniLib.StringUtils.MD5(data.password), this.loginPhoneSuccess, this.loginFaol, this);
						}
						else {
							LogingUtils.youkeLogin();
							LogingUtils.loginType = 1;
						}
					});
					break;
			}
		}

		private loginFaol(param) {
			egret.warn("param.desc" + param.desc);
			uniLib.TipsUtils.showTipsDownToUp(param.desc);
			return true;
		}

		private loginPhoneSuccess(msg?: any) {
			egret.warn("loginPhoneSuccess back" + JSON.stringify(msg));
			LogingUtils.loginType = 3;
			NetMgr.platLogin();
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.bg_img.width = uniLib.Global.screenWidth;
			this.addEvents();
			if (!uniLib.Global.isH5 && (uniLib.Global.bundleId == "iOS-FengChiGame_1.0.2" || uniLib.Global.bundleId == "")) {
				this.operateBtns([this._youkeLogin, this._accountLogin]);
			}
			else {
				this.operateBtns([this._youkeLogin, this.wx_btn, this._accountLogin]);
			}
		}

		private operateBtns(btns: any[]): void {
			this.wx_btn.parent.removeChild
			var all: any[] = [this._youkeLogin, this.wx_btn, this._accountLogin];
			for (var i: number = 0; i < all.length; i++) {
				if (btns.indexOf(all[i]) == -1) {
					all[i].parent.removeChild(all[i]);
				}
			}
			var layout: eui.HorizontalLayout = this._btnContain.layout as eui.HorizontalLayout;
			layout.gap = 100 - btns.length * 20;
			this._btnContain.layout = layout;
		}

		public destroy(): void {
			this.removeEvents();
			uniLib.DragonUtils.removeFastDragonbyContainer(this);
		}
	}
}
