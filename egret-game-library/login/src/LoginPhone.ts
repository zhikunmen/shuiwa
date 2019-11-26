module login {
    export class LoginPhone extends eui.Component {

        public ret_btn: eui.Button;
        public resetPassword_btn: eui.Button;
        public login_btn: eui.Button;
        public account_etxt: eui.EditableText;
        public password_etxt: eui.EditableText;
        public rem_cbox: eui.CheckBox;

        private _phone: string;
        private _password: string = "";

        public constructor() {
            super();
            this.skinName = "LoginPhoneSkin";
        }

        public childrenCreated(): void {
            super.childrenCreated();

            this.account_etxt.text = "";
            this.account_etxt.restrict = "0-9";
            this.account_etxt.maxChars = 11;

            this.password_etxt.text = "";
            this.password_etxt.restrict = "a-zA-Z0-9!@#%\\^&*()_+";

            uniLib.Utils.getLocalStorage("yyrem", (rev) => {
                if (rev) {
                    let data = JSON.parse(rev);
                    this._phone = data.account;
                    this._password = data.password;
                    this.account_etxt.text = data.account;
                    this.password_etxt.text = data.password;
                }
            })

            this.account_etxt.addEventListener(egret.Event.CHANGE, this.verifyPhone, this);
            this.password_etxt.addEventListener(egret.Event.CHANGE, this.verifyPassword, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this.ret_btn) {
                this.visible = false;
                if (this.parent && this.parent["_btnContain"]) {
                    this.parent["_btnContain"].visible = true;
                    NetMgr.logout();
                }
            }
            else if (evt.target == this.resetPassword_btn) {
                uniLib.PopUpMgr.addPopUp(LobbyUserInfoBindPhonePanel, null, true, true, 0, uniLib.PopUpEffect.NOMAL, 0, 0);
            }
            else if (evt.target == this.login_btn) {
                if (!this._phone) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号");
                }
                else if (this._password.length < 6) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的密码");
                }
                else {
                    let config = uniLib.Global.gameConfig ? uniLib.Global.gameConfig : NetMgr.getLoginCfg();
                    NetMgr.init(config.login_url, config.gameid, config.zoneid);
                    NetMgr.LoginByTel(this._phone, uniLib.StringUtils.MD5(this._password), this.loginPhoneSuccess, this.loginFaol, this);
                }
            }
        }

        private loginFaol(param) {
            egret.warn("param.desc" + param.desc);
            uniLib.TipsUtils.showTipsDownToUp(param.desc);
            return true;
        }

        private loginPhoneSuccess(msg?: any) {
            LogingUtils.loginType = 3;
            uniLib.Utils.clearLocalStorage();
            if (this.rem_cbox.selected) {
                uniLib.Utils.setLocalStorage("yyrem", JSON.stringify({ "account": this._phone, "password": this._password }));
            }
            else {
                uniLib.Utils.clearLocalStorage("yyrem");
            }
            uniLib.ZQGameSdk.trackPoint("login_back")
            NetMgr.platLogin();
        }

        /*验证手机号*/
        private verifyPhone() {
            var phone: string = this.account_etxt.text.trim();
            if (/^1[3456789]\d{9}$/.test(phone)) {
                this._phone = phone;
            }
            else {
                this._phone = null;
            }
        }

        /*验证密码*/
        private verifyPassword() {
            if (this.password_etxt.text && this.password_etxt.text.length > 5) {
                this._password = this.password_etxt.text;
            }
            else {
                this._password = "";
            }
        }
    }
}