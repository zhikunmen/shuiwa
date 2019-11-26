var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var login;
(function (login) {
    var LoginConsts = (function () {
        function LoginConsts() {
        }
        LoginConsts.RES_JSON = "resource/login.res.json";
        LoginConsts.THM_JSON = "resource/login.thm.json";
        /**
         * 公共login需要加载的资源组
         */
        LoginConsts.PUB_LOGIN = "pub_login";
        return LoginConsts;
    }());
    login.LoginConsts = LoginConsts;
    __reflect(LoginConsts.prototype, "login.LoginConsts");
})(login || (login = {}));
var login;
(function (login) {
    /**
     * 登录
     */
    var LogingUtils = (function () {
        function LogingUtils() {
        }
        LogingUtils.accountLogin = function () {
            this._currenPlat = 0;
            uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this);
        };
        LogingUtils.qqLogin = function () {
            var data = {};
            data.platid = 263;
            this._currenPlat = data.platid;
            uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this, data);
        };
        LogingUtils.wxLogin = function () {
            this._currenPlat = 0;
            if (uniLib.Global.platId == 100000) {
                var data = {};
                data.platid = 264;
                this._currenPlat = data.platid;
            }
            uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this, data);
        };
        /**游客登录 */
        LogingUtils.youkeLogin = function () {
            this._currenPlat = 0;
            uniLib.ZQGameSdk.Login(this.onLogin, this.onLogout, this, -1);
        };
        /**账号登录 */
        LogingUtils.onLogin = function (msg) {
            console.error("login back" + JSON.stringify(msg));
            console.error("game config1:" + uniLib.Global.gameConfig.wx_appid);
            var a = {};
            console.error(" Object.isFrozen(a);", Object.isFrozen(a));
            if (msg.code == 0) {
                var plt = new Pmd.PlatInfo();
            }
            ;
            plt.platid = msg.data.platid;
            if (this._currenPlat == 263 || this._currenPlat == 264) {
                uniLib.Global.payPlatId = this._currenPlat;
            }
            else {
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
        };
        LogingUtils.onLogout = function () {
            uniLib.NetMgr.logout();
            // LobbyInfoMgr.getInstance().userInfo = null;
            console.log("注销游戏进入" + uniLib.Global.gameId + ":" + uniLib.Global.getPlatId());
            uniLib.GameModuleUtils.ExitGame(false);
            uniLib.SceneMgr.instance.changeScene(login.LoginScene);
        };
        /**登录类型  游客1 微信2 账号3 */
        LogingUtils.loginType = 1;
        LogingUtils._currenPlat = 0;
        return LogingUtils;
    }());
    login.LogingUtils = LogingUtils;
    __reflect(LogingUtils.prototype, "login.LogingUtils");
})(login || (login = {}));
var login;
(function (login) {
    var LoginPhone = (function (_super) {
        __extends(LoginPhone, _super);
        function LoginPhone() {
            var _this = _super.call(this) || this;
            _this._password = "";
            _this.skinName = "LoginPhoneSkin";
            return _this;
        }
        LoginPhone.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this.account_etxt.text = "";
            this.account_etxt.restrict = "0-9";
            this.account_etxt.maxChars = 11;
            this.password_etxt.text = "";
            this.password_etxt.restrict = "a-zA-Z0-9!@#%\\^&*()_+";
            uniLib.Utils.getLocalStorage("yyrem", function (rev) {
                if (rev) {
                    var data = JSON.parse(rev);
                    _this._phone = data.account;
                    _this._password = data.password;
                    _this.account_etxt.text = data.account;
                    _this.password_etxt.text = data.password;
                }
            });
            this.account_etxt.addEventListener(egret.Event.CHANGE, this.verifyPhone, this);
            this.password_etxt.addEventListener(egret.Event.CHANGE, this.verifyPassword, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        LoginPhone.prototype.onTouchHandler = function (evt) {
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
                    var config = uniLib.Global.gameConfig ? uniLib.Global.gameConfig : NetMgr.getLoginCfg();
                    NetMgr.init(config.login_url, config.gameid, config.zoneid);
                    NetMgr.LoginByTel(this._phone, uniLib.StringUtils.MD5(this._password), this.loginPhoneSuccess, this.loginFaol, this);
                }
            }
        };
        LoginPhone.prototype.loginFaol = function (param) {
            egret.warn("param.desc" + param.desc);
            uniLib.TipsUtils.showTipsDownToUp(param.desc);
            return true;
        };
        LoginPhone.prototype.loginPhoneSuccess = function (msg) {
            login.LogingUtils.loginType = 3;
            uniLib.Utils.clearLocalStorage();
            if (this.rem_cbox.selected) {
                uniLib.Utils.setLocalStorage("yyrem", JSON.stringify({ "account": this._phone, "password": this._password }));
            }
            else {
                uniLib.Utils.clearLocalStorage("yyrem");
            }
            uniLib.ZQGameSdk.trackPoint("login_back");
            NetMgr.platLogin();
        };
        /*验证手机号*/
        LoginPhone.prototype.verifyPhone = function () {
            var phone = this.account_etxt.text.trim();
            if (/^1[3456789]\d{9}$/.test(phone)) {
                this._phone = phone;
            }
            else {
                this._phone = null;
            }
        };
        /*验证密码*/
        LoginPhone.prototype.verifyPassword = function () {
            if (this.password_etxt.text && this.password_etxt.text.length > 5) {
                this._password = this.password_etxt.text;
            }
            else {
                this._password = "";
            }
        };
        return LoginPhone;
    }(eui.Component));
    login.LoginPhone = LoginPhone;
    __reflect(LoginPhone.prototype, "login.LoginPhone");
})(login || (login = {}));
var login;
(function (login) {
    var LoginScene = (function (_super) {
        __extends(LoginScene, _super);
        function LoginScene() {
            return _super.call(this) || this;
        }
        LoginScene.prototype.awake = function () {
            this._view = new login.LoginView();
            this.uiLayer.addChild(this._view);
        };
        LoginScene.prototype.start = function () {
            uniLib.ZQGameSdk.getNetStateType();
        };
        LoginScene.prototype.destroy = function () {
            this._view.destroy();
        };
        return LoginScene;
    }(uniLib.GameScene));
    login.LoginScene = LoginScene;
    __reflect(LoginScene.prototype, "login.LoginScene");
})(login || (login = {}));
var login;
(function (login) {
    /**
     * 登录界面
     */
    var LoginView = (function (_super) {
        __extends(LoginView, _super);
        function LoginView() {
            var _this = _super.call(this) || this;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this.skinName = "LoginSkin";
            return _this;
        }
        LoginView.prototype.addEvents = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        LoginView.prototype.removeEvents = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        LoginView.prototype.onTouchHandle = function (e) {
            var _this = this;
            var target = e.target;
            switch (target) {
                case this._accountLogin:
                    this.phone_login.visible = true;
                    this._btnContain.visible = false;
                    break;
                case this.wx_btn:
                    login.LogingUtils.wxLogin();
                    login.LogingUtils.loginType = 2;
                    break;
                case this._youkeLogin:
                    uniLib.Utils.getLocalStorage("yyrem", function (rev) {
                        if (rev) {
                            var config = uniLib.Global.gameConfig ? uniLib.Global.gameConfig : NetMgr.getLoginCfg();
                            NetMgr.init(config.login_url, config.gameid, config.zoneid);
                            var data = JSON.parse(rev);
                            NetMgr.LoginByTel(data.account, uniLib.StringUtils.MD5(data.password), _this.loginPhoneSuccess, _this.loginFaol, _this);
                        }
                        else {
                            login.LogingUtils.youkeLogin();
                            login.LogingUtils.loginType = 1;
                        }
                    });
                    break;
            }
        };
        LoginView.prototype.loginFaol = function (param) {
            egret.warn("param.desc" + param.desc);
            uniLib.TipsUtils.showTipsDownToUp(param.desc);
            return true;
        };
        LoginView.prototype.loginPhoneSuccess = function (msg) {
            egret.warn("loginPhoneSuccess back" + JSON.stringify(msg));
            login.LogingUtils.loginType = 3;
            NetMgr.platLogin();
        };
        LoginView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.bg_img.width = uniLib.Global.screenWidth;
            this.addEvents();
            if (!uniLib.Global.isH5 && (uniLib.Global.bundleId == "iOS-FengChiGame_1.0.2" || uniLib.Global.bundleId == "")) {
                this.operateBtns([this._youkeLogin, this._accountLogin]);
            }
            else {
                this.operateBtns([this._youkeLogin, this.wx_btn, this._accountLogin]);
            }
        };
        LoginView.prototype.operateBtns = function (btns) {
            this.wx_btn.parent.removeChild;
            var all = [this._youkeLogin, this.wx_btn, this._accountLogin];
            for (var i = 0; i < all.length; i++) {
                if (btns.indexOf(all[i]) == -1) {
                    all[i].parent.removeChild(all[i]);
                }
            }
            var layout = this._btnContain.layout;
            layout.gap = 100 - btns.length * 20;
            this._btnContain.layout = layout;
        };
        LoginView.prototype.destroy = function () {
            this.removeEvents();
            uniLib.DragonUtils.removeFastDragonbyContainer(this);
        };
        return LoginView;
    }(eui.Component));
    login.LoginView = LoginView;
    __reflect(LoginView.prototype, "login.LoginView");
})(login || (login = {}));
