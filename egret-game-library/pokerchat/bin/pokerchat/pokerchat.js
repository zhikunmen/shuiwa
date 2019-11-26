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
var pokerchat;
(function (pokerchat) {
    /**
     * 快捷聊天 id：20-25   房卡
     */
    var ChatItem_fangka = (function (_super) {
        __extends(ChatItem_fangka, _super);
        function ChatItem_fangka() {
            var _this = _super.call(this) || this;
            _this.skinName = "poker_fangka_ChatItemSkin";
            return _this;
        }
        ChatItem_fangka.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.chatid = this.data;
            var shortArr = [
                "又断线了，网络怎么这么差啊！",
                "各位，真不好意思，我要离开一会",
                "你的牌打得也忒好了！",
                "下次咱们再玩吧！",
                "不要走，决战到天亮！",
                "快点吧，都等得我花都谢了！"
            ];
            this.chatItem.text = shortArr[this.data];
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ChatItem_fangka.prototype.onClick = function (e) {
            var name = "2" + this.chatid;
            pokerchat.ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_CHAT, false, name);
        };
        return ChatItem_fangka;
    }(eui.ItemRenderer));
    pokerchat.ChatItem_fangka = ChatItem_fangka;
    __reflect(ChatItem_fangka.prototype, "pokerchat.ChatItem_fangka");
})(pokerchat || (pokerchat = {}));
var pokerchat;
(function (pokerchat) {
    /**
     * 快捷聊天 id：20-25  金币
     */
    var ChatItem_jinbi = (function (_super) {
        __extends(ChatItem_jinbi, _super);
        function ChatItem_jinbi() {
            var _this = _super.call(this) || this;
            _this.skinName = "poker_jinbi_ChatItemSkin";
            return _this;
        }
        ChatItem_jinbi.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.chatid = this.data;
            var shortArr = [
                "又断线了，网络怎么这么差啊！",
                "各位，真不好意思，我要离开一会",
                "你的牌打得也忒好了！",
                "下次咱们再玩吧！",
                "不要走，决战到天亮！",
                "快点吧，都等得我花都谢了！"
            ];
            this.chatItem.text = shortArr[this.data];
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ChatItem_jinbi.prototype.onClick = function (e) {
            var name = "2" + this.chatid;
            pokerchat.ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_CHAT, false, name);
        };
        return ChatItem_jinbi;
    }(eui.ItemRenderer));
    pokerchat.ChatItem_jinbi = ChatItem_jinbi;
    __reflect(ChatItem_jinbi.prototype, "pokerchat.ChatItem_jinbi");
})(pokerchat || (pokerchat = {}));
var pokerchat;
(function (pokerchat) {
    /**
     * 动画 聊天
     */
    var ChatPanel = (function (_super) {
        __extends(ChatPanel, _super);
        function ChatPanel() {
            var _this = _super.call(this) || this;
            //快捷聊天
            _this._isClick = true;
            _this._type = 0;
            _this.skinName = "poker_ChatSkin";
            return _this;
        }
        ChatPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        ChatPanel.prototype.init = function () {
            var shortArr = [
                "又断线了，网络怎么这么差啊！",
                "各位，真不好意思，我要离开一会",
                "你的牌打得也忒好了！",
                "下次咱们再玩吧！",
                "不要走，决战到天亮！",
                "快点吧，都等得我花都谢了！"
            ];
            var faceArr = [];
            var chatArr = [];
            for (var i = 1; i <= 15; i++) {
                faceArr.push(i);
            }
            for (var i = 0; i < shortArr.length; i++) {
                chatArr.push(i);
            }
            this.face_list.itemRenderer = pokerchat.FaceItem;
            this.arrCol1 = new eui.ArrayCollection(faceArr);
            this.face_list.dataProvider = this.arrCol1;
            if (this.room_type == 1) {
                this.fangka_chat_list.itemRenderer = pokerchat.ChatItem_fangka;
                this.arrCol2 = new eui.ArrayCollection(chatArr);
                this.fangka_chat_list.dataProvider = this.arrCol2;
            }
            else {
                this.jinbi_chat_list.itemRenderer = pokerchat.ChatItem_jinbi;
                this.arrCol2 = new eui.ArrayCollection(chatArr);
                this.jinbi_chat_list.dataProvider = this.arrCol2;
            }
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.chat_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
            this.chat_input.addEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
            this.chat_input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
            ChatEventDispatcher.instance.addEventListener(pokerchat.pokerchatConst.SEND_COMMON_CHAT, this.commonChatHandler, this);
            ChatEventDispatcher.instance.addEventListener(pokerchat.pokerchatConst.SEND_COMMON_TALK, this.commonTalkHandler, this);
        };
        //设置房间类型
        ChatPanel.prototype.setRoomType = function (index) {
            this.room_type = index;
            if (this.room_type == 1) {
                this.fangka_group.visible = true;
                this.jinbi_group.visible = false;
            }
            else {
                this.fangka_group.visible = false;
                this.jinbi_group.visible = true;
            }
            this.init();
        };
        ChatPanel.prototype.onFocusIn = function () {
            var content = this.chat_input.text;
            if (content.indexOf("请输入聊天内容") != -1) {
                this.chat_input.text = "";
            }
        };
        ChatPanel.prototype.setType = function (type) {
            this._type = type;
        };
        ChatPanel.prototype.onFocusOut = function () {
            if (this.chat_input.text == "") {
                this.chat_input.text = "请输入聊天内容";
            }
        };
        ChatPanel.prototype.onSend = function () {
            var msg = this.chat_input.text;
            if (msg == "" || msg == "请输入聊天内容") {
                uniLib.TipsUtils.showTipsDownToUp("不能发送空消息！");
                return;
            }
            else {
                ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_TALK, false, msg);
                this.chat_input.text = "";
            }
        };
        ChatPanel.prototype.commonChatHandler = function (e) {
            this.sendMsg(1, e.data);
        };
        ChatPanel.prototype.commonTalkHandler = function (e) {
            this.sendMsg(2, e.data);
        };
        ChatPanel.prototype.sendMsg = function (type, data) {
            var self = this;
            if (!this._isClick) {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
                return;
            }
            var content = data;
            var req;
            if (this._type == 1) {
                req = new Cmd.ddz_CommonChat_C();
            }
            else {
                req = new Cmd.CommonChat_C();
            }
            if (type == 1) {
                req.voiceId = Number(content);
            }
            else {
                req.words = content;
            }
            uniLib.NetMgr.tcpSend(req);
            this._isClick = false;
            setTimeout(function () {
                self._isClick = true;
            }, 3000);
            this.onClose();
        };
        ChatPanel.prototype.onClose = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        ChatPanel.prototype.destory = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.chat_send.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
            this.chat_input.removeEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
            this.chat_input.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
            ChatEventDispatcher.instance.removeEventListener(pokerchat.pokerchatConst.SEND_COMMON_CHAT, this.commonChatHandler, this);
            ChatEventDispatcher.instance.removeEventListener(pokerchat.pokerchatConst.SEND_COMMON_TALK, this.commonTalkHandler, this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this.arrCol1 = null;
            this.arrCol2 = null;
        };
        return ChatPanel;
    }(eui.Component));
    pokerchat.ChatPanel = ChatPanel;
    __reflect(ChatPanel.prototype, "pokerchat.ChatPanel");
    var ChatEventDispatcher = (function (_super) {
        __extends(ChatEventDispatcher, _super);
        function ChatEventDispatcher() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChatEventDispatcher, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new ChatEventDispatcher();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return ChatEventDispatcher;
    }(egret.EventDispatcher));
    pokerchat.ChatEventDispatcher = ChatEventDispatcher;
    __reflect(ChatEventDispatcher.prototype, "pokerchat.ChatEventDispatcher");
})(pokerchat || (pokerchat = {}));
var pokerchat;
(function (pokerchat) {
    /**
     * 动画 聊天id：11-118
     */
    var FaceItem = (function (_super) {
        __extends(FaceItem, _super);
        function FaceItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "poker_FaceItemSkin";
            return _this;
        }
        FaceItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.faceItem.source = "face" + this.data;
            this.faceid = this.data;
            this.faceItem.scaleX = this.faceItem.scaleY = 0.8;
            this.faceItem.x = 13;
            this.faceItem.y = 10;
        };
        FaceItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.faceItem.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        FaceItem.prototype.onClick = function (e) {
            var id = "1" + this.faceid;
            pokerchat.ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_CHAT, false, id);
        };
        return FaceItem;
    }(eui.ItemRenderer));
    pokerchat.FaceItem = FaceItem;
    __reflect(FaceItem.prototype, "pokerchat.FaceItem");
})(pokerchat || (pokerchat = {}));
var pokerchat;
(function (pokerchat) {
    var pokerchatConst = (function () {
        function pokerchatConst() {
        }
        pokerchatConst.RES_JSON = "resource/pokerchat/pokerchat.res_375cb11e.json";
        pokerchatConst.THM_JSON = "resource/pokerchat/gameEui_9ecd161a.json";
        /**
         * 公共loading需要加载的资源组
         */
        /**聊天面板资源 */
        pokerchatConst.POKER_CHAT = "poker_chat";
        /**表情资源 */
        pokerchatConst.POKER_FACE = "poker_face";
        /**表情，快捷语音 */
        pokerchatConst.SEND_COMMON_CHAT = "send_common_chat"; //表情，快捷语音
        /**输入聊天 */
        pokerchatConst.SEND_COMMON_TALK = "send_common_talk"; //输入聊天
        /**
         * 通用聊天ID接收
         */
        pokerchatConst.NOTIFY_COMMON_CHAT = "notify_common_chat";
        return pokerchatConst;
    }());
    pokerchat.pokerchatConst = pokerchatConst;
    __reflect(pokerchatConst.prototype, "pokerchat.pokerchatConst");
})(pokerchat || (pokerchat = {}));
var Cmd;
(function (Cmd) {
    // export function OnCommonChat_Brd(rev: Cmd.CommonChat_Brd) {
    //     uniLib.Global.dispatchEvent(pokerchat.pokerchatConst.NOTIFY_COMMON_CHAT, rev);
    // }
    function Onddz_CommonChat_Brd(rev) {
        uniLib.Global.dispatchEvent(pokerchat.pokerchatConst.NOTIFY_COMMON_CHAT, rev);
    }
    Cmd.Onddz_CommonChat_Brd = Onddz_CommonChat_Brd;
})(Cmd || (Cmd = {}));
