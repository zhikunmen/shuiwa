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
var gamechat;
(function (gamechat) {
    var ChatConst = (function () {
        function ChatConst() {
        }
        ChatConst.RES_JSON = "resource/gamechat.res.json";
        ChatConst.THM_JSON = "resource/gameEui.json";
        /**
         * 公共loading需要加载的资源组
         */
        ChatConst.GAME_CHAT = "game_chat";
        return ChatConst;
    }());
    gamechat.ChatConst = ChatConst;
    __reflect(ChatConst.prototype, "gamechat.ChatConst");
})(gamechat || (gamechat = {}));
var gamechat;
(function (gamechat) {
    /**
     * 动画 聊天
     */
    var ChatPanel = (function (_super) {
        __extends(ChatPanel, _super);
        function ChatPanel(ShortTalkArr) {
            var _this = _super.call(this, "game_chat_json.chat_title", 825, 554) || this;
            _this._ShortTalkArr = ShortTalkArr;
            _this.skinName = "ChatSkin";
            return _this;
        }
        ChatPanel.prototype.initUI = function () {
            for (var i = 1; i <= 18; i++) {
                var face = new eui.RadioButton();
                face.skinName = "FaceButtonSkin";
                face.iconDisplay.texture = RES.getRes("game_face" + i);
                face.groupName = "face";
                face.value = i;
                this.faceGroup.addChild(face);
            }
            for (var i = 0; i < this._ShortTalkArr.length; i++) {
                var chat = new eui.RadioButton();
                chat.skinName = "ChatRadioButtonSkin";
                chat.groupName = "chat";
                chat.value = i;
                chat.label = (i + 1) + "." + this._ShortTalkArr[i];
                chat.y = 56 * i;
                this.chatGroup.addChild(chat);
            }
            this.faceScroller.visible = true;
            this.chatScroller.visible = true;
            this.faceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceGroupTap, this);
            this.chatGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatGroupTap, this);
            this.touchEnabled = true;
            this.sendBtn.name = "short_send";
            this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.textField.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        ChatPanel.prototype.onChatGroupTap = function (e) {
            // if (!chessCommonLib.UserInfoMgr.isClick) {
            //     uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
            //     return;
            // }
            var target = e.target;
            if (target instanceof eui.RadioButton) {
                var name = "2" + target.value;
                var req = new Cmd.CommonChat_C();
                req.voiceId = Number(name);
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
                // chessCommonLib.UserInfoMgr.isClick = false;
                // setTimeout(function (): void {
                //     chessCommonLib.UserInfoMgr.isClick = true;
                // }, 3000);
            }
        };
        ChatPanel.prototype.onFaceGroupTap = function (e) {
            // if (!chessCommonLib.UserInfoMgr.isClick) {
            //     uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
            //     return;
            // }
            var target = e.target;
            if (target instanceof eui.RadioButton) {
                var req = new Cmd.CommonChat_C();
                var id = "1" + target.value;
                req.voiceId = Number(id);
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
                // chessCommonLib.UserInfoMgr.isClick = false;
                // setTimeout(function (): void {
                //     // chessCommonLib.UserInfoMgr.isClick = true;
                // }, 3000);
            }
        };
        ChatPanel.prototype.onTouchTap = function (e) {
            if (e.target == this.textField) {
                e.target.setFocus();
            }
        };
        ChatPanel.prototype.sendClickHandler = function (e) {
            var self = this;
            var content = this.textField.text;
            if (content == "") {
                // chessCommonLib.UserInfoMgr.isClick = true;
                uniLib.TipsUtils.showTipsDownToUp("聊天内容不能为空", true);
                return;
            }
            var req = new Cmd.CommonChat_C();
            req.words = this.textField.text;
            uniLib.NetMgr.tcpSend(req);
            this.textField.text = "";
            uniLib.PopUpMgr.removePopUp(this);
        };
        ChatPanel.prototype.destroy = function () {
            this.textField.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.faceGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceGroupTap, this);
            this.chatGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatGroupTap, this);
            this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.sendBtn = null;
            this.textField.text = "";
            uniLib.DisplayUtils.removeAllChildren(this._content);
            uniLib.DisplayUtils.removeFromParent(this._content);
            _super.prototype.destroy.call(this);
        };
        return ChatPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    gamechat.ChatPanel = ChatPanel;
    __reflect(ChatPanel.prototype, "gamechat.ChatPanel");
})(gamechat || (gamechat = {}));
