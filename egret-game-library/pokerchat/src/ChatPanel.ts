module pokerchat {
	/**
	 * 动画 聊天
	 */
    export class ChatPanel extends eui.Component {
        private close_btn: eui.WxButton;
        private face_list: eui.List;
        private fangka_chat_list: eui.List;
        private jinbi_chat_list: eui.List;
        private chat_send: eui.WxButton;
        private chat_input: eui.EditableText;
        private arrCol1: eui.ArrayCollection;
        private arrCol2: eui.ArrayCollection;
        //快捷聊天
        private _isClick: boolean = true;
        private _type: number = 0;
        private room_type: number; //1.房卡 2.金币
        private fangka_group: eui.Group;
        private jinbi_group: eui.Group;
        public constructor() {
            super();
            this.skinName = "poker_ChatSkin";
        }
        protected createChildren() {
            super.createChildren();
        }
        private init() {
            let shortArr = [
                "又断线了，网络怎么这么差啊！",
                "各位，真不好意思，我要离开一会",
                "你的牌打得也忒好了！",
                "下次咱们再玩吧！",
                "不要走，决战到天亮！",
                "快点吧，都等得我花都谢了！"
            ];
            let faceArr: number[] = [];
            let chatArr: number[] = [];

            for (let i = 1; i <= 15; i++) {
                faceArr.push(i)
            }

            for (let i = 0; i < shortArr.length; i++) {
                chatArr.push(i)
            }

            this.face_list.itemRenderer = FaceItem;
            this.arrCol1 = new eui.ArrayCollection(faceArr);
            this.face_list.dataProvider = this.arrCol1;
            if (this.room_type == 1) {
                this.fangka_chat_list.itemRenderer = ChatItem_fangka;
                this.arrCol2 = new eui.ArrayCollection(chatArr);
                this.fangka_chat_list.dataProvider = this.arrCol2;
            } else {
                this.jinbi_chat_list.itemRenderer = ChatItem_jinbi;
                this.arrCol2 = new eui.ArrayCollection(chatArr);
                this.jinbi_chat_list.dataProvider = this.arrCol2;
            }


            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.chat_send.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSend, this);
            this.chat_input.addEventListener(egret.TextEvent.FOCUS_IN, this.onFocusIn, this);
            this.chat_input.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onFocusOut, this);
            ChatEventDispatcher.instance.addEventListener(pokerchat.pokerchatConst.SEND_COMMON_CHAT, this.commonChatHandler, this);
            ChatEventDispatcher.instance.addEventListener(pokerchat.pokerchatConst.SEND_COMMON_TALK, this.commonTalkHandler, this);
        }
        //设置房间类型
        public setRoomType(index: number): void {
            this.room_type = index;
            if (this.room_type == 1) {
                this.fangka_group.visible = true;
                this.jinbi_group.visible = false;
            }else{
                this.fangka_group.visible = false;
                this.jinbi_group.visible = true;
            }
            this.init();
        }
        private onFocusIn() {
            var content: string = this.chat_input.text;
            if (content.indexOf("请输入聊天内容") != -1) {
                this.chat_input.text = "";
            }
        }
        public setType(type: number): void {
            this._type = type;
        }
        private onFocusOut() {
            if (this.chat_input.text == "") {
                this.chat_input.text = "请输入聊天内容";
            }
        }
        private onSend() {
            let msg = this.chat_input.text;
            if (msg == "" || msg == "请输入聊天内容") {
                uniLib.TipsUtils.showTipsDownToUp("不能发送空消息！");
                return;
            }
            else {
                ChatEventDispatcher.instance.dispatchEventWith(pokerchat.pokerchatConst.SEND_COMMON_TALK, false, msg);
                this.chat_input.text = "";
            }
        }
        private commonChatHandler(e: egret.Event) {
            this.sendMsg(1, e.data);
        }
        private commonTalkHandler(e: egret.Event) {
            this.sendMsg(2, e.data);
        }
        private sendMsg(type: number, data: any): void {
            var self: any = this;
            if (!this._isClick) {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
                return;
            }
            var content: string = data;
            var req;
            if (this._type == 1) {
                req = new Cmd.ddz_CommonChat_C();
            } else {
                req = new Cmd.CommonChat_C();
            }
            if (type == 1) {
                req.voiceId = Number(content);
            } else {
                req.words = content;
            }
            uniLib.NetMgr.tcpSend(req);
            this._isClick = false;
            setTimeout(function (): void {
                self._isClick = true;
            }, 3000);
            this.onClose();
        }
        private onClose() {
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destory() {
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
        }
    }

    export class ChatEventDispatcher extends egret.EventDispatcher {
        public constructor() {
            super();
        }
        private static _instance: ChatEventDispatcher;

        public static get instance(): ChatEventDispatcher {
            if (!this._instance) {
                this._instance = new ChatEventDispatcher();
            }
            return this._instance;
        }
    }
}