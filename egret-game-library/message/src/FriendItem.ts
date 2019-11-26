module message {
    export class FriendItem extends eui.ItemRenderer {
        private _head: eui.Image;
        private _nickName: eui.Label;
        private _msg: eui.Label;
        private _typeTxt: eui.Label;
        private _getBtn: eui.WxButton;
        private _noGet: eui.Image;
        private mailData: Cmd.MailInfo;
        public constructor() {
            super();
            this.skinName = "FriendItemSkin";
            this.addEvent();
        }
        //事件监听
        private addEvent(): void {
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        }
        //领取奖励
        private getPrize(): void {
            let req = new Cmd.GetMailRewardCmd_C();
            req.id = this.mailData.id;
            NetMgr.tcpSend(req);
        }
        protected dataChanged(): void {
            let data: Cmd.MailInfo = this.data;
            // this._head.source = data.cdkey;
            this.mailData = data;
            this._nickName.text = data.sendName;
            this._msg.text = data.content;
            this._typeTxt.text = "x" + data.chips;
            if (data.state == 1 || data.state == 2) {
                this._getBtn.visible = true;
                this._noGet.visible = false;
            } else {
                this._getBtn.visible = false;
                this._noGet.visible = true;
            }
        }
        private removeEvent(): void {
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        }
        public destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}