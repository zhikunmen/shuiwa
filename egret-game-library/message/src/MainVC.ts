module message {
    export class MainVC extends eui.Component {
        private _closeBtn: eui.WxButton;
        private _friendPanel: eui.Group;
        private _sysPanel: eui.Group;
        private _friendBtn: eui.Group;
        private _sysBtn: eui.Group;
        private _lookBtn: eui.WxButton;
        private _getBtn: eui.WxButton;
        private _sysTxt: eui.Label;
        private _friendTxt: eui.Label;
        private _friendScroll: eui.Scroller;
        private _sysScroll: eui.Scroller;
        private _friendList: eui.List;
        private _sysList: eui.List;
        private _friendData: eui.ArrayCollection = new eui.ArrayCollection();
        private _sysData: eui.ArrayCollection = new eui.ArrayCollection();
        private _noMail: eui.Image;
        private mailType: number = 0;
        constructor() {
            super();
            this.skinName = "MainVCSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.init();
            this.addEvent();
            this.sendReq();
        }
        //发送请求
        private sendReq(): void {
            let req = new Cmd.GetListMailCmd_C();
            req.mailtype = this.mailType;
            NetMgr.tcpSend(req);
        }
        private init(): void {
            this._friendList.itemRenderer = FriendItem;
            this._friendList.dataProvider = this._friendData;
            this._friendScroll.viewport = this._friendList;
            this._sysList.itemRenderer = SysItem;
            this._sysList.dataProvider = this._sysData;
            this._sysScroll.viewport = this._sysList;
            this._friendScroll.horizontalScrollBar = null;
            this._friendScroll.verticalScrollBar = null;
            this._sysScroll.horizontalScrollBar = null;
            this._sysScroll.verticalScrollBar = null;
        }
        //事件监听
        private addEvent(): void {
            uniLib.Global.addEventListener(message.MessageConst.GET_MAILLIST, this.setMail, this);
            uniLib.Global.addEventListener(message.MessageConst.REMOVE_ALL_MAIL, this.showSys, this);
            uniLib.Global.addEventListener(message.MessageConst.GET_PRIZE, this.showFriend, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
            this._friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFriend, this);
            this._sysBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSys, this);
            this._lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
        }
        //打开好友信息
        private showFriend(): void {
            this._friendPanel.visible = true;
            this._sysPanel.visible = false;
            this.mailType = 1;
            this.sendReq();
        }
        //打开系统信息
        private showSys(): void {
            this._friendPanel.visible = false;
            this._sysPanel.visible = true;
            this.mailType = 0;
            this.sendReq();
        }
        //渲染邮箱消息
        private setMail(evt: uniLib.ZqEvent): void {
            this._friendData.source = [];
            this._friendData.refresh();
            this._sysData.source = [];
            this._sysData.refresh();
            let data: Cmd.GetListMailCmd_S = evt.param;
            if (data.mailInfo.length > 0) {
                this._noMail.visible = false;
                if (this.mailType == 1) {
                    this._getBtn.visible = true;
                    this._friendData.source = data.mailInfo;
                    this._friendData.refresh();
                } else {
                    this._lookBtn.visible = true;
                    this._sysData.source = data.mailInfo;
                    this._sysData.refresh();
                }
            } else {
                this._lookBtn.visible = false;
                this._getBtn.visible = false;
                this._noMail.visible = true;
            }
        }
        //全部消息处理
        private mailHandle(): void {
            let req = new Cmd.BulkOperationMailCmd_C();
            req.opType = this.mailType;
            NetMgr.tcpSend(req);
        }
        //关闭当前面板
        private closeEmail(): void {
            uniLib.PopUpMgr.removePopUp(this);
        }
        private removeEvent(): void {
            uniLib.Global.removeEventListener(message.MessageConst.GET_MAILLIST, this.setMail, this);
            uniLib.Global.removeEventListener(message.MessageConst.REMOVE_ALL_MAIL, this.showSys, this);
            uniLib.Global.removeEventListener(message.MessageConst.GET_PRIZE, this.showFriend, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
            this._friendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFriend, this);
            this._sysBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSys, this);
            this._lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
        }
        public destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
