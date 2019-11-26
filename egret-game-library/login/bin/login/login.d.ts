declare module login {
    class LoginConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共login需要加载的资源组
         */
        static PUB_LOGIN: string;
    }
}
declare module login {
    /**
     * 登录
     */
    class LogingUtils {
        /**登录类型  游客1 微信2 账号3 */
        static loginType: number;
        private static _currenPlat;
        static accountLogin(): void;
        static qqLogin(): void;
        static wxLogin(): void;
        /**游客登录 */
        static youkeLogin(): void;
        /**账号登录 */
        private static onLogin(msg?);
        static onLogout(): void;
    }
}
declare module login {
    class LoginPhone extends eui.Component {
        ret_btn: eui.Button;
        resetPassword_btn: eui.Button;
        login_btn: eui.Button;
        account_etxt: eui.EditableText;
        password_etxt: eui.EditableText;
        rem_cbox: eui.CheckBox;
        private _phone;
        private _password;
        constructor();
        childrenCreated(): void;
        private onTouchHandler(evt);
        private loginFaol(param);
        private loginPhoneSuccess(msg?);
        private verifyPhone();
        private verifyPassword();
    }
}
declare module login {
    class LoginScene extends uniLib.GameScene {
        private _view;
        constructor();
        awake(): void;
        start(): void;
        destroy(): void;
    }
}
declare module login {
    /**
     * 登录界面
     */
    class LoginView extends eui.Component {
        bg_img: eui.Image;
        _versionTxt: eui.Label;
        phone_login: LoginPhone;
        _btnContain: eui.Group;
        _youkeLogin: eui.Button;
        wx_btn: eui.Button;
        _accountLogin: eui.Button;
        constructor();
        private addEvents();
        private removeEvents();
        private onTouchHandle(e);
        private loginFaol(param);
        private loginPhoneSuccess(msg?);
        protected childrenCreated(): void;
        private operateBtns(btns);
        destroy(): void;
    }
}
