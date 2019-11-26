declare module gamehelp {
    class HelpConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_HELP: string;
    }
}
declare module gamehelp {
    class HelpPanel extends commonpanel.LobbyBaseEuiPanel {
        private _titleTxt;
        private _typeTxt;
        private _contentTxt;
        private _typetext;
        private _contenttext;
        private _titletext;
        constructor(titletxt: string, typetxt: string, contentTxt: string);
        protected childrenCreated(): void;
        protected initUI(): void;
        destory(): void;
    }
}
