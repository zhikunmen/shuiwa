declare module myInfo {
    class BindPhoneVC extends eui.Component {
        _sendCaptcha: eui.WxButton;
        _confirm: eui.WxButton;
        _back: eui.WxButton;
        private _relieve;
        _phoneNum: eui.EditableText;
        _captcha: eui.EditableText;
        _count: eui.Label;
        private phone;
        private password;
        private code;
        private _phoneTxt;
        private _phone_bg;
        private _phone;
        constructor(phone: number);
        protected childrenCreated(): void;
        private setData(phoneNum);
        destory(): void;
        private init();
        protected addEvent(): void;
        private onBind(evt);
        protected removeEvent(): void;
        private verifyPhone();
        private verifyCaptcha();
        /**确认*/
        private confirmHandle(evt);
        private getCaptcha();
        /**关闭当前面板 */
        private backHander();
        private count;
        private timer;
        startCount(): void;
        private timerFunc();
        private hidephonevc();
    }
}
declare module myInfo {
    class MyInfoConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_MYINFO: string;
        static PHONE_BIND: string;
        static GET_INFO: string;
    }
}
declare module Cmd {
    /**绑定手机成功 */
    function OnBindingMobilePhoneLobbyCmd_S(rev: Cmd.BindingMobilePhoneLobbyCmd_S): void;
}
declare module myInfo {
    /**
     * 个人信息
     */
    class MyInfoVC extends eui.Component {
        girl_rbtn: eui.RadioButton;
        boy_rbtn: eui.RadioButton;
        phone_btn: eui.WxButton;
        close_btn: eui.WxButton;
        sign_btn: eui.WxButton;
        rank_btn: eui.Button;
        eliminate_btn: eui.Button;
        reward_btn: eui.Button;
        rushNum_btn: eui.Button;
        head_img: eui.Image;
        nickName_lbl: eui.Label;
        position_lbl: eui.Label;
        sign_etxt: eui.EditableText;
        account_lbl: eui.Label;
        tips_lbl: eui.Label;
        allNum_lbl: eui.Label;
        rate_lbl: eui.Label;
        winStreak_lbl: eui.Label;
        todayWin_lbl: eui.Label;
        gift_grp: eui.Group;
        private _info;
        constructor(info: Cmd.UserInfoSearchLobbyCmd_S);
        protected childrenCreated(): void;
        private init();
        private openBind();
        private addEvent();
        private removeEvent();
        /**送礼 */
        private onGift(evt);
        private closeInfo();
        destory(): void;
    }
}
