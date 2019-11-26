declare module gamedismiss {
    class GameDismissConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_DISMISS: string;
    }
}
declare module gamedismiss {
    class GameDismissPanel extends eui.Component {
        private yesBtn;
        private noBtn;
        private _timer;
        private _startTime;
        private _totalTime;
        private info;
        private _userList;
        private _timeTxt;
        private _colorArr;
        /**0 解散房间 1 切换房间人数 */
        private _dissGame;
        constructor();
        protected createChildren(): void;
    }
}
declare module gamedismiss {
    class GameDismissUIEventConsts {
        /**弃游 */
        static DISMISS_GAME: string;
    }
    class GameDismissData {
        private static _instance;
        static getInstance(): GameDismissData;
    }
}
