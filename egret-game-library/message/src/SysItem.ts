module message {
    export class SysItem extends eui.ItemRenderer {
        private _type: eui.Image;
        private _titleTxt: eui.Label;
        private _msg: eui.Label;
        private _timeTxt: eui.Label;
        private _getBtn: eui.WxButton;
        private _lookBtn: eui.WxButton;
        private mailData: Cmd.MailInfo;
        public constructor() {
            super();
            this.skinName = "EmailItemSkin";
            this.addEvent();
        }
        //事件监听
        private addEvent(): void {
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
            this._lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
        }
        //领取奖励
        private getPrize(): void {
            let req = new Cmd.GetListMailCmd_C();
            req.mailtype = 0;
            NetMgr.tcpSend(req);
        }
        //查看邮箱
        private openEmail(): void {
            let mailPanel = new EmailVC();
            uniLib.PopUpMgr.addPopUp(mailPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            mailPanel.initData(this.mailData);
        }
        protected dataChanged(): void {
            let data: Cmd.MailInfo = this.data;
            if (data.attachment) {
                this._lookBtn.visible = false;
                this._getBtn.visible = true;
            } else {
                this._lookBtn.visible = true;
                this._getBtn.visible = false;
            }

            this._titleTxt.text = data.subject;
            this._msg.text = data.outline;
            this._timeTxt.text = this.changeHour(data.stamp);
            this.mailData = data;
        }
        //时间戳转化为XX小时之前
        private changeHour(time: number): string {
            let date = new Date().getTime();
            let str;
            let index = (date / 1000 - time) / (60 * 60);
            if (index < 0.1) {
                str = "0小时之前";
            } else {
                if (index >= 24) {
                    str = (index / 24).toFixed(1) + "天之前";
                } else {
                    str = index.toFixed(1) + "小时之前";
                }
            }
            return str;
        }
        private removeEvent(): void {
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
            this._lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
        }
        public destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}