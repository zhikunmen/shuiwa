module myInfo {
    export class BindPhoneVC extends eui.Component {
        public _sendCaptcha: eui.WxButton;
        public _confirm: eui.WxButton;
        public _back: eui.WxButton;
        private _relieve: eui.WxButton;
        // public _phoneNumWarn: eui.Label;
        // public _captchaWarn: eui.Label;
        public _phoneNum: eui.EditableText;
        public _captcha: eui.EditableText;
        public _count: eui.Label;
        private phone: string;
        private password: string;
        private code: number;
        private _phoneTxt: eui.Label;
        private _phone_bg: eui.Image;

        private _phone: number;
        public constructor(phone: number) {
            super();
            this._phone = phone;
            this.skinName = "BindPhoneVCSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvent();
            this.init();
            this.setData(this._phone);
        }
        private setData(phoneNum: number): void {
            let bool = phoneNum ? false : true;
            this._phoneNum.visible = bool;
            this._phoneTxt.visible = !bool;
            this._confirm.visible = bool;
            this._relieve.visible = !bool;
            this._phone_bg.visible = bool;
            this._sendCaptcha.enabled = !bool;
            this._phoneTxt.text = phoneNum ? phoneNum + "" : "";
        }
        public destory() {
            this.removeEvent();
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        }

        /*初始化面板*/
        private init() {
            // this._phoneNumWarn.visible = true;
            // this._captchaWarn.visible = false;
            this._phoneNum.text = "";
            this._phoneNum.restrict = "0-9"
            this._captcha.text = "";
            this._captcha.restrict = "0-9";
            this.timer = null;
            this.count = 60;
            this._sendCaptcha.enabled = false;
            this.phone = null;
            this.password = null;
        }

        /*监听按钮*/
        protected addEvent() {
            uniLib.Global.addEventListener(myInfo.MyInfoConst.GET_INFO, this.onBind, this);
            uniLib.Global.addEventListener(myInfo.MyInfoConst.PHONE_BIND, this.backHander, this);
            this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHander, this);
            this._confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._relieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._sendCaptcha.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getCaptcha, this);
            this._phoneNum.addEventListener(egret.Event.CHANGE, this.verifyPhone, this);
            this._captcha.addEventListener(egret.Event.CHANGE, this.verifyCaptcha, this);
            this._phoneNum.addEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            this._captcha.addEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
        }
        //绑定解绑手机
        private onBind(evt: uniLib.ZqEvent): void {
            let data: Cmd.UserInfoGetLobbyCmd_S = evt.param;
            if (data.userInfo.phonenumber) {
                this.setData(Number(data.userInfo.phonenumber));
                uniLib.UserInfo.phonenumber = Number(data.userInfo.phonenumber);
            } else {
                this.setData(0);
                uniLib.UserInfo.phonenumber = undefined;
            }
        }
        /*移除监听*/
        protected removeEvent() {
            uniLib.Global.removeEventListener(myInfo.MyInfoConst.GET_INFO, this.onBind, this);
            uniLib.Global.removeEventListener(myInfo.MyInfoConst.PHONE_BIND, this.backHander, this);
            this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHander, this);
            this._confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._relieve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._sendCaptcha.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCaptcha, this);
            this._phoneNum.removeEventListener(egret.Event.CHANGE, this.verifyPhone, this);
            this._captcha.removeEventListener(egret.Event.CHANGE, this.verifyCaptcha, this);
            this._phoneNum.removeEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            this._captcha.removeEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
        }
        /*验证手机号*/
        private verifyPhone() {
            var phone: string = this._phoneNum.text.trim();
            // this._sendCaptcha.enabled = false;
            this.phone = null;
            if (/^1[3456789]\d{9}$/.test(phone)) {
                this.phone = phone;
                // this._phoneNumWarn.visible = false;
                this._sendCaptcha.enabled = true;
            } else {
                // this._phoneNumWarn.visible = true;
                this.phone = null;
            }
            this._sendCaptcha.enabled = true;
        }
        /*验证验证码*/
        private verifyCaptcha() {
            let code = this._captcha.text.trim();
            if ((/^\d{6}$/).test(code)) {
                // this._captchaWarn.visible = false;
                this.code = Number(this._captcha.text.trim());
            } else {
                // this._captchaWarn.visible = true;
                this.code = 0;
            }
        }
        /**确认*/
        private confirmHandle(evt: egret.TouchEvent) {
            let type = 1;
            if (evt.target == this._relieve) {
                type = 2;
            }
            // if (this._phoneNumWarn.visible) {
            //     uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号");
            // }else
            if (this.code == 0) {
                uniLib.TipsUtils.showTipsDownToUp("请重新输入验证码");
            }
            else {
                if (!NetMgr.ws) {
                    uniLib.TipsUtils.showTipsDownToUp("请先获取验证码");
                }
                else {
                    let req: Cmd.BindingMobilePhoneLobbyCmd_C = new Cmd.BindingMobilePhoneLobbyCmd_C();
                    req.opType = type;
                    req.phoneNumber = Number(this.phone);
                    req.code = this.code;
                    NetMgr.tcpSend(req);
                }
            }
        }

        /*请求验证码*/
        private getCaptcha() {
            if (this._confirm.visible) {
                var phone: string = this._phoneNum.text.trim();
                if (/^1[3456789]\d{9}$/.test(phone)) {
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号");
                    return;
                }
            }
            if (this.phone || Number(this._phoneTxt.text) != 0) {
                /*** 登录时修改密码*/
                if (!NetMgr.ws) {
                    let config = uniLib.Global.gameConfig;
                    NetMgr.init(config.login_url, config.gameid, config.zoneid)
                    NetMgr.GetPhoneCode(this.phone, "", (rev) => {
                        if (rev && rev.retcode == 0) {
                            uniLib.TipsUtils.showTipsDownToUp("发送成功");
                        }
                        else {
                            uniLib.TipsUtils.showTipsDownToUp("短信发送速度过快,请稍等");
                        }
                        return true;
                    }, this)
                }
                else {
                    let req: Cmd.GetIdentifyingCodeLobbyCmd_C = new Cmd.GetIdentifyingCodeLobbyCmd_C();
                    if (Number(this._phoneTxt.text) != 0) {
                        req.phoneNumber = Number(this._phoneTxt.text);
                        req.opType = 2;
                    } else {
                        req.phoneNumber = parseInt(this.phone);
                        req.opType = 1;
                    }
                    NetMgr.tcpSend(req);
                }
                this.startCount();
            }
        }

        /**关闭当前面板 */
        private backHander() {
            uniLib.PopUpMgr.removePopUp(this);
        }

        /*验证码计时*/
        private count: number = 60;
        private timer: egret.Timer;
        public startCount() {
            this.code = 0;
            this._captcha.text = "";
            // this._captchaWarn.visible = true;
            this._sendCaptcha.enabled = false;
            this._sendCaptcha.visible = false;
            this._count.visible = true;

            this.timer = new egret.Timer(1000);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.start();
        }
        private timerFunc() {
            if (this.count > 0) {
                this.count--;
                this._count.text = "验证码已发送(" + this.count + ")";
            } else {
                this.timer.stop();
                this.timer = null;
                this._sendCaptcha.visible = true;
                this._sendCaptcha.enabled = true;
                this._count.visible = false;
                this.count = 60;
            }
        }

        private hidephonevc() {
            uniLib.ZQGameSdk.hideVk();
        }
    }
}
