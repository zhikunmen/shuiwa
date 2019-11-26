module chessCommonLib {
	/**
	 * 动画 聊天
	 */
    export class zm_ChatPanel extends BaseEuiPanel {
        private _root: egret.Bitmap;
        private _content: egret.Sprite;
        private sendBtn: eui.Button;
        private textField: eui.EditableText;
        private chatScroller: eui.Scroller;
        private chatGroup: eui.Group;
        private faceScroller: eui.Scroller;
        private faceGroup: eui.Group;
        private _ShortTalkArr: string[];
        constructor(ShortTalkArr: string[]) {
            super("zm_chat_title_png");
            this._ShortTalkArr = ShortTalkArr;
            this.skinName = "chessCommonLib.zm_ChatSkin";
        }
        protected initUI(): void {
            for (var i: number = 1; i <= 18; i++) {
                let face = new eui.RadioButton();
                face.skinName = "chessCommonLib.zm_FaceButtonSkin";
                face.iconDisplay.texture = RES.getRes("zmgame_face" + i);
                face.groupName = "face";
                face.value = i;
                this.faceGroup.addChild(face);
            }
            for (var i: number = 0; i < this._ShortTalkArr.length; i++) {
                let chat = new eui.RadioButton();
                chat.skinName = "chessCommonLib.zm_ChatRadioButtonSkin";
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
            this.textField.addEventListener(egret.TextEvent.FOCUS_OUT,uniLib.ZQGameSdk.hideVk,this);
        }
        public onChatGroupTap(e: egret.TouchEvent) {
            if (!chessCommonLib.UserInfoMgr.isClick) {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
                return;
            }
            let target = e.target;
            if (target instanceof eui.RadioButton) {
                var name: string = "2" + target.value;
                var req = new Cmd.CommonChat_C();
                req.voiceId = Number(name);
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
                chessCommonLib.UserInfoMgr.isClick = false;
                setTimeout(function (): void {
                    chessCommonLib.UserInfoMgr.isClick = true;
                }, 3000);
            }
        }
        public onFaceGroupTap(e: egret.TouchEvent) {
            if (!chessCommonLib.UserInfoMgr.isClick) {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
                return;
            }
            let target = e.target;
            if (target instanceof eui.RadioButton) {
                var req = new Cmd.CommonChat_C();
                var id: string = "1" + target.value;
                req.voiceId = Number(id);
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
                chessCommonLib.UserInfoMgr.isClick = false;
                setTimeout(function (): void {
                    chessCommonLib.UserInfoMgr.isClick = true;
                }, 3000);
            }
        }
        private onTouchTap(e: egret.TouchEvent) {
            if (e.target == this.textField) {
                e.target.setFocus();
            }
        }
        private sendClickHandler(e: egret.TouchEvent) {
            var self: any = this;
            var content: string = this.textField.text;
            if (content == "") {
                chessCommonLib.UserInfoMgr.isClick = true;
                uniLib.TipsUtils.showTipsDownToUp("聊天内容不能为空", true);
                return;
            }
            var req = new Cmd.CommonChat_C();
            req.words = this.textField.text;
            uniLib.NetMgr.tcpSend(req);
            this.textField.text = "";
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destroy(): void {
            this.textField.removeEventListener(egret.TextEvent.FOCUS_OUT,uniLib.ZQGameSdk.hideVk,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.faceGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceGroupTap, this);
            this.chatGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatGroupTap, this);
            this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.sendBtn = null;
            this.textField.text = "";
            uniLib.DisplayUtils.removeAllChildren(this._content);
            uniLib.DisplayUtils.removeFromParent(this._content);
            super.destroy();
        }

    }
}