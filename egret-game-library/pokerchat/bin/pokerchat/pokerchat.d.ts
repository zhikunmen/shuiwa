declare module pokerchat {
    /**
     * 快捷聊天 id：20-25   房卡
     */
    class ChatItem_fangka extends eui.ItemRenderer {
        private chatid;
        private chatItem;
        constructor();
        protected dataChanged(): void;
        private onClick(e);
    }
}
declare module pokerchat {
    /**
     * 快捷聊天 id：20-25  金币
     */
    class ChatItem_jinbi extends eui.ItemRenderer {
        private chatid;
        private chatItem;
        constructor();
        protected dataChanged(): void;
        private onClick(e);
    }
}
declare module pokerchat {
    /**
     * 动画 聊天
     */
    class ChatPanel extends eui.Component {
        private close_btn;
        private face_list;
        private fangka_chat_list;
        private jinbi_chat_list;
        private chat_send;
        private chat_input;
        private arrCol1;
        private arrCol2;
        private _isClick;
        private _type;
        private room_type;
        private fangka_group;
        private jinbi_group;
        constructor();
        protected createChildren(): void;
        private init();
        setRoomType(index: number): void;
        private onFocusIn();
        setType(type: number): void;
        private onFocusOut();
        private onSend();
        private commonChatHandler(e);
        private commonTalkHandler(e);
        private sendMsg(type, data);
        private onClose();
        destory(): void;
    }
    class ChatEventDispatcher extends egret.EventDispatcher {
        constructor();
        private static _instance;
        static readonly instance: ChatEventDispatcher;
    }
}
declare module pokerchat {
    /**
     * 动画 聊天id：11-118
     */
    class FaceItem extends eui.ItemRenderer {
        private faceid;
        private faceItem;
        constructor();
        protected dataChanged(): void;
        protected childrenCreated(): void;
        private onClick(e);
    }
}
declare module pokerchat {
    class pokerchatConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        /**聊天面板资源 */
        static POKER_CHAT: string;
        /**表情资源 */
        static POKER_FACE: string;
        /**表情，快捷语音 */
        static SEND_COMMON_CHAT: string;
        /**输入聊天 */
        static SEND_COMMON_TALK: string;
        /**
         * 通用聊天ID接收
         */
        static NOTIFY_COMMON_CHAT: string;
    }
}
declare module Cmd {
    function Onddz_CommonChat_Brd(rev: Cmd.ddz_CommonChat_Brd): void;
}
