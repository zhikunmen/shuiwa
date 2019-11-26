declare module gamechat {
    class ChatConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_CHAT: string;
    }
}
declare module gamechat {
    /**
     * 动画 聊天
     */
    class ChatPanel extends commonpanel.LobbyBaseEuiPanel {
        private _root;
        private _content;
        private sendBtn;
        private textField;
        private chatScroller;
        private chatGroup;
        private faceScroller;
        private faceGroup;
        private _ShortTalkArr;
        constructor(ShortTalkArr: string[]);
        protected initUI(): void;
        onChatGroupTap(e: egret.TouchEvent): void;
        onFaceGroupTap(e: egret.TouchEvent): void;
        private onTouchTap(e);
        private sendClickHandler(e);
        destroy(): void;
    }
}
