module match {
    export class HpwBindPhone extends eui.Component {

        public close_btn: match.BaseButton;
        public commit_btn: match.BaseButton;
        public send_btn: match.BaseButton;
        public phone_etxt: eui.EditableText;
        public code_etxt: eui.EditableText;

        private _timer: egret.Timer;

        constructor() {
            super();
            this.skinName = "HpwBindPhoneSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._timer = new egret.Timer(1000, 60);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.commit_btn) {
                let phone = this.phone_etxt.text.trim();
                let code = this.code_etxt.text.trim();
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号码");
                    return false;
                }
                else if (!(/^\d{6}$/.test(phone))) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入验证码");
                    return false;
                }
                else {
                    let req: Cmd.BindingMobilePhoneLobbyCmd_C = new Cmd.BindingMobilePhoneLobbyCmd_C();
                    req.code = parseInt(code);
                    req.phoneNumber = parseInt(phone);
                    req.opType = 1;
                    NetMgr.tcpSend(req);
                }
            }
            else if (evt.target == this.send_btn) {
                let phone = this.phone_etxt.text.trim();
                if (!(/^1[34578]\d{9}$/.test(phone))) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号码");
                    return false;
                }
                let req: Cmd.GetIdentifyingCodeLobbyCmd_C = new Cmd.GetIdentifyingCodeLobbyCmd_C();
                req.phoneNumber = parseInt(phone);
                NetMgr.tcpSend(req);
                this._timer.start();
                this.send_btn.touchEnabled = false;
            }
        }

        private onTimerHandler(evt: egret.TimerEvent) {
            this.send_btn.label = this._timer.repeatCount - this._timer.currentCount + "s";
            if(this._timer.repeatCount == this._timer.currentCount){
                this.send_btn.label = "发送";
                this.send_btn.touchEnabled = true;
                this._timer.stop();
                this._timer.reset();
            }
        }

        public destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
            uniLib.PopUpMgr.removePopUp(this);
        }
    }
}