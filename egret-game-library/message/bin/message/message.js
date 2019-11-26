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
var message;
(function (message) {
    var EmailVC = (function (_super) {
        __extends(EmailVC, _super);
        function EmailVC() {
            var _this = _super.call(this) || this;
            _this.listX = [[322.5], [225, 445]];
            _this.skinName = "EmailVCSkin";
            return _this;
        }
        EmailVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
        };
        EmailVC.prototype.initData = function (data) {
            this.data = data;
            this._prizeTxt.text = data.subject;
            this._msgTxt.text = data.content;
            this._fromTxt.text = data.sendName;
            this._timeTxt.text = this.initTime(data.stamp);
            if (data.attachment) {
                this._getBtn.visible = true;
                for (var i = 0; i < data.attachment.length; i++) {
                    var list = new message.PrizeItem();
                    list.x = this.listX[data.attachment.length - 1][i];
                    list.y = this._msgTxt.height + this._msgTxt.y + 10;
                    this._group.addChild(list);
                    list.initData(data.attachment[i]);
                    this._fromTxt.y = list.y + list.height + 10;
                }
                this._scroll.height = 302;
            }
            else {
                this._getBtn.visible = false;
                this._scroll.height = 205;
                this._fromTxt.y = this._msgTxt.height + this._msgTxt.y + 10;
            }
            this._timeTxt.y = this._fromTxt.y + 30;
        };
        //时间戳转化为 YY-MM-DD 
        EmailVC.prototype.initTime = function (time) {
            var date = new Date(time * 1000);
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
            var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            return Y + M + D + h + m;
        };
        EmailVC.prototype.addEvent = function () {
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        };
        //获取奖励
        EmailVC.prototype.getPrize = function () {
            var req_1 = new Cmd.GetMailRewardCmd_C();
            req_1.id = this.data.id;
            NetMgr.tcpSend(req_1);
            var req_2 = new Cmd.GetListMailCmd_C();
            req_2.mailtype = 0;
            NetMgr.tcpSend(req_2);
            this._getBtn.visible = false;
        };
        //关闭当前面板
        EmailVC.prototype.closeEmail = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        EmailVC.prototype.removeEvent = function () {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        };
        EmailVC.prototype.destroy = function () {
            var req = new Cmd.DeleteMailCmd_C();
            req.ids = [this.data.id];
            NetMgr.tcpSend(req);
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return EmailVC;
    }(eui.Component));
    message.EmailVC = EmailVC;
    __reflect(EmailVC.prototype, "message.EmailVC");
})(message || (message = {}));
var message;
(function (message) {
    var FriendItem = (function (_super) {
        __extends(FriendItem, _super);
        function FriendItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "FriendItemSkin";
            _this.addEvent();
            return _this;
        }
        //事件监听
        FriendItem.prototype.addEvent = function () {
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        };
        //领取奖励
        FriendItem.prototype.getPrize = function () {
            var req = new Cmd.GetMailRewardCmd_C();
            req.id = this.mailData.id;
            NetMgr.tcpSend(req);
        };
        FriendItem.prototype.dataChanged = function () {
            var data = this.data;
            // this._head.source = data.cdkey;
            this.mailData = data;
            this._nickName.text = data.sendName;
            this._msg.text = data.content;
            this._typeTxt.text = "x" + data.chips;
            if (data.state == 1 || data.state == 2) {
                this._getBtn.visible = true;
                this._noGet.visible = false;
            }
            else {
                this._getBtn.visible = false;
                this._noGet.visible = true;
            }
        };
        FriendItem.prototype.removeEvent = function () {
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getPrize, this);
        };
        FriendItem.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return FriendItem;
    }(eui.ItemRenderer));
    message.FriendItem = FriendItem;
    __reflect(FriendItem.prototype, "message.FriendItem");
})(message || (message = {}));
var message;
(function (message) {
    var MainVC = (function (_super) {
        __extends(MainVC, _super);
        function MainVC() {
            var _this = _super.call(this) || this;
            _this._friendData = new eui.ArrayCollection();
            _this._sysData = new eui.ArrayCollection();
            _this.mailType = 0;
            _this.skinName = "MainVCSkin";
            return _this;
        }
        MainVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
            this.addEvent();
            this.sendReq();
        };
        //发送请求
        MainVC.prototype.sendReq = function () {
            var req = new Cmd.GetListMailCmd_C();
            req.mailtype = this.mailType;
            NetMgr.tcpSend(req);
        };
        MainVC.prototype.init = function () {
            this._friendList.itemRenderer = message.FriendItem;
            this._friendList.dataProvider = this._friendData;
            this._friendScroll.viewport = this._friendList;
            this._sysList.itemRenderer = message.SysItem;
            this._sysList.dataProvider = this._sysData;
            this._sysScroll.viewport = this._sysList;
            this._friendScroll.horizontalScrollBar = null;
            this._friendScroll.verticalScrollBar = null;
            this._sysScroll.horizontalScrollBar = null;
            this._sysScroll.verticalScrollBar = null;
        };
        //事件监听
        MainVC.prototype.addEvent = function () {
            uniLib.Global.addEventListener(message.MessageConst.GET_MAILLIST, this.setMail, this);
            uniLib.Global.addEventListener(message.MessageConst.REMOVE_ALL_MAIL, this.showSys, this);
            uniLib.Global.addEventListener(message.MessageConst.GET_PRIZE, this.showFriend, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
            this._friendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFriend, this);
            this._sysBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showSys, this);
            this._lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
        };
        //打开好友信息
        MainVC.prototype.showFriend = function () {
            this._friendPanel.visible = true;
            this._sysPanel.visible = false;
            this.mailType = 1;
            this.sendReq();
        };
        //打开系统信息
        MainVC.prototype.showSys = function () {
            this._friendPanel.visible = false;
            this._sysPanel.visible = true;
            this.mailType = 0;
            this.sendReq();
        };
        //渲染邮箱消息
        MainVC.prototype.setMail = function (evt) {
            this._friendData.source = [];
            this._friendData.refresh();
            this._sysData.source = [];
            this._sysData.refresh();
            var data = evt.param;
            if (data.mailInfo.length > 0) {
                this._noMail.visible = false;
                if (this.mailType == 1) {
                    this._getBtn.visible = true;
                    this._friendData.source = data.mailInfo;
                    this._friendData.refresh();
                }
                else {
                    this._lookBtn.visible = true;
                    this._sysData.source = data.mailInfo;
                    this._sysData.refresh();
                }
            }
            else {
                this._lookBtn.visible = false;
                this._getBtn.visible = false;
                this._noMail.visible = true;
            }
        };
        //全部消息处理
        MainVC.prototype.mailHandle = function () {
            var req = new Cmd.BulkOperationMailCmd_C();
            req.opType = this.mailType;
            NetMgr.tcpSend(req);
        };
        //关闭当前面板
        MainVC.prototype.closeEmail = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        MainVC.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(message.MessageConst.GET_MAILLIST, this.setMail, this);
            uniLib.Global.removeEventListener(message.MessageConst.REMOVE_ALL_MAIL, this.showSys, this);
            uniLib.Global.removeEventListener(message.MessageConst.GET_PRIZE, this.showFriend, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeEmail, this);
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
            this._friendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFriend, this);
            this._sysBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showSys, this);
            this._lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.mailHandle, this);
        };
        MainVC.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return MainVC;
    }(eui.Component));
    message.MainVC = MainVC;
    __reflect(MainVC.prototype, "message.MainVC");
})(message || (message = {}));
var message;
(function (message) {
    var MessageConst = (function () {
        function MessageConst() {
        }
        MessageConst.RES_JSON = "resource/message/message.res_a9de5b2e.json";
        MessageConst.THM_JSON = "resource/message/gameEui_cfeb8e07.json";
        /**
         * 公共loading需要加载的资源组
         */
        MessageConst.PUB_MESSAGE = "pub_message";
        //请求邮件列表
        MessageConst.GET_MAILLIST = "Get_MailList";
        //删除全部邮件
        MessageConst.REMOVE_ALL_MAIL = "REMOVE_ALL_MAIL";
        //领取奖励
        MessageConst.GET_PRIZE = "GET_PRIZE";
        return MessageConst;
    }());
    message.MessageConst = MessageConst;
    __reflect(MessageConst.prototype, "message.MessageConst");
})(message || (message = {}));
var message;
(function (message) {
    var PrizeItem = (function (_super) {
        __extends(PrizeItem, _super);
        function PrizeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PrizeItemSkin";
            return _this;
        }
        PrizeItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PrizeItem.prototype.initData = function (data) {
            if (data.itemid == 99) {
                this._type.source = "msg_icon_1";
            }
            else {
                this._type.source = "msg_icon_2";
            }
            this._numTxt.text = "x" + data.itemnum;
            this._type.anchorOffsetX = this._type.width / 2;
            this._type.anchorOffsetY = this._type.height / 2;
        };
        PrizeItem.prototype.destroy = function () {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return PrizeItem;
    }(eui.Component));
    message.PrizeItem = PrizeItem;
    __reflect(PrizeItem.prototype, "message.PrizeItem");
})(message || (message = {}));
var message;
(function (message) {
    var SysItem = (function (_super) {
        __extends(SysItem, _super);
        function SysItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "EmailItemSkin";
            _this.addEvent();
            return _this;
        }
        //事件监听
        SysItem.prototype.addEvent = function () {
            this._getBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
            this._lookBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
        };
        //领取奖励
        SysItem.prototype.getPrize = function () {
            var req = new Cmd.GetListMailCmd_C();
            req.mailtype = 0;
            NetMgr.tcpSend(req);
        };
        //查看邮箱
        SysItem.prototype.openEmail = function () {
            var mailPanel = new message.EmailVC();
            uniLib.PopUpMgr.addPopUp(mailPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            mailPanel.initData(this.mailData);
        };
        SysItem.prototype.dataChanged = function () {
            var data = this.data;
            if (data.attachment) {
                this._lookBtn.visible = false;
                this._getBtn.visible = true;
            }
            else {
                this._lookBtn.visible = true;
                this._getBtn.visible = false;
            }
            this._titleTxt.text = data.subject;
            this._msg.text = data.outline;
            this._timeTxt.text = this.changeHour(data.stamp);
            this.mailData = data;
        };
        //时间戳转化为XX小时之前
        SysItem.prototype.changeHour = function (time) {
            var date = new Date().getTime();
            var str;
            var index = (date / 1000 - time) / (60 * 60);
            if (index < 0.1) {
                str = "0小时之前";
            }
            else {
                if (index >= 24) {
                    str = (index / 24).toFixed(1) + "天之前";
                }
                else {
                    str = index.toFixed(1) + "小时之前";
                }
            }
            return str;
        };
        SysItem.prototype.removeEvent = function () {
            this._getBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
            this._lookBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openEmail, this);
        };
        SysItem.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return SysItem;
    }(eui.ItemRenderer));
    message.SysItem = SysItem;
    __reflect(SysItem.prototype, "message.SysItem");
})(message || (message = {}));
/**
 * 消息接收
 */
var Cmd;
(function (Cmd) {
    //请求邮件列表
    function OnGetListMailCmd_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(message.MessageConst.GET_MAILLIST, rev);
        }
    }
    Cmd.OnGetListMailCmd_S = OnGetListMailCmd_S;
    //处理全部邮件
    function OnBulkOperationMailCmd_S(rev) {
        if (rev.resultCode == 0) {
            if (rev.opType == 1) {
                //领取奖励
                uniLib.Global.dispatchEvent(message.MessageConst.GET_PRIZE, rev);
            }
            else {
                //删除邮件
                uniLib.Global.dispatchEvent(message.MessageConst.REMOVE_ALL_MAIL, rev);
            }
        }
    }
    Cmd.OnBulkOperationMailCmd_S = OnBulkOperationMailCmd_S;
    //领取奖励
    function OnGetMailRewardCmd_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(message.MessageConst.GET_PRIZE, rev);
        }
    }
    Cmd.OnGetMailRewardCmd_S = OnGetMailRewardCmd_S;
    //删除邮件
    function OnDeleteMailCmd_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(message.MessageConst.REMOVE_ALL_MAIL, rev);
        }
    }
    Cmd.OnDeleteMailCmd_S = OnDeleteMailCmd_S;
})(Cmd || (Cmd = {}));
