declare module lobbyaward {
    class AwardConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static LOBBY_AWARD: string;
    }
}
declare module lobbyaward {
    class LobbyGetAwardPanel extends eui.Component {
        private guang;
        private bgRect;
        private image;
        private awardimage;
        private okBtn;
        private jinbiText;
        private _freeGoldMc;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        setData(jinbi: number, type: number): void;
    }
}
