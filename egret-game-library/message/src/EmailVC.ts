module message {
    export class EmailVC extends eui.Component {
        private _closeBtn: eui.WxButton;
        private _getBtn: eui.WxButton;
        private _prizeTxt: eui.Label;
        private _msgTxt: eui.Label;
        private _fromTxt: eui.Label;
        private _timeTxt: eui.Label;
        private data: Cmd.MailInfo;
        private _scroll: eui.Scroller;
        private _group: eui.Group;
        private listX: Array<Array<number>> = [[322.5],[225,445]];
        constructor() {
            super();
            this.skinName = "EmailVCSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvent();
        }
        public initData(data: Cmd.MailInfo): void {
            this.data = data;
            this._prizeTxt.text = data.subject;
            this._msgTxt.text = data.content;
            this._fromTxt.text = data.sendName;
            this._timeTxt.text = this.initTime(data.stamp);
            if(data.attachment){
                this._getBtn.visible = true;
                for(var i=0;i<data.attachment.length;i++){
                    let list = new PrizeItem();
                    list.x = this.listX[data.attachment.length - 1][i];
                    list.y = this._msgTxt.height + this._msgTxt.y + 10;
                    this._group.addChild(list);
                    list.initData(data.attachment[i]);
                    this._fromTxt.y = list.y + list.height + 10;
                }
                this._scroll.height = 302;
            }else{
                this._getBtn.visible = false;
                this._scroll.height = 205;
                this._fromTxt.y = this._msgTxt.height + this._msgTxt.y + 10;
            }
            this._timeTxt.y = this._fromTxt.y + 30;
        }
        //时间戳转化为 YY-MM-DD 
        private initTime(time: number): string {
            var date = new Date(time*1000);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate()< 10 ? '0' + date.getDate() : date.getDate() )+ ' ';
            var h = (date.getHours()< 10 ? '0' + date.getHours() : date.getHours() )+ ':';
            var m = date.getMinutes()< 10 ? '0' + date.getMinutes() : date.getMinutes() ;
            return Y + M + D + h + m ;
        }
        private addEvent(): void {
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        }
        //获取奖励
        private getPrize(): void {
            let req_1 = new Cmd.GetMailRewardCmd_C();
            req_1.id = this.data.id;
            NetMgr.tcpSend(req_1);
            let req_2 = new Cmd.GetListMailCmd_C();
            req_2.mailtype = 0;
            NetMgr.tcpSend(req_2);
            this._getBtn.visible = false;
        }
        //关闭当前面板
        private closeEmail(): void {
            uniLib.PopUpMgr.removePopUp(this);
        }
        private removeEvent(): void {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        }
        public destroy(): void {
            let req = new Cmd.DeleteMailCmd_C();
            req.ids = [this.data.id];
            NetMgr.tcpSend(req);
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
