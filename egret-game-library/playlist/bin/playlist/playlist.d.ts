declare module playlist {
    class PlayListConst {
        static RES_JSON: string;
        static RES_JSON_QUANZHOU: string;
        static RES_JSON_GUANGDONG: string;
        static RES_JSON_NINGBO: string;
        static RES_JSON_LY: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_SETTING: string;
    }
}
declare module playlist {
    class LobbyHelpPanel extends commonpanel.LobbyBaseEuiPanel {
        private _closeBtn;
        private _gameList;
        private _menu0;
        private _menu1;
        private _menu2;
        private _menu3;
        private _scroll;
        private _sysMsgTxt;
        private _menuArr;
        /**存放玩法 */
        private _ruleArr;
        /**当前选择的标签索引 */
        private _menuIndex;
        private _gameId;
        constructor(gameId?: number);
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        private btnClick(evt);
        private itemTap(evt);
        private refreshHelpTxt();
    }
}
/**gameRadionButton */
declare module playlist {
    class RadioButton extends eui.ItemRenderer {
        private labelDisplay;
        constructor();
        protected dataChanged(): void;
    }
}
