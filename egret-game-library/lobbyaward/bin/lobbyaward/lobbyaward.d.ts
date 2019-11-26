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
    /**领取奖励动画 公用
    * type ：
    * 1、2：签到领取  id：奖品id；
    * 3：现金红包    id：现金金额
    */
    class LobbyGetAwardPanel extends commonpanel.LobbyBaseEuiPanel {
        private guang;
        private bgRect;
        private image;
        private awardimage;
        private okBtn;
        private jinbiText;
        private _freeGoldMc;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        destroy(): void;
        setData(id: number, type: number): void;
        /** 物品通用 */
        setRewardItemData(rewardItem: Cmd.RewardItem): void;
    }
}
