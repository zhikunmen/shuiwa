declare module goldLand {
    class GoldLandConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 需要加载的游戏内任务资源组
         */
        static PUB_GOLD_LAND: string;
    }
}
declare module goldLand {
    class GoldLandItem extends eui.ItemRenderer {
        static CardTypes: string[];
        static time2str(num: number): string;
        private static getNumStr(num);
        private card_type;
        private nick_name;
        private num_txt;
        private time_txt;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module goldLand {
    class GoldLandPanel extends eui.Component {
        private close_btn;
        private caijin_lst;
        private scroll;
        private total_label;
        private liansheng;
        private leiji;
        private _gameId;
        private _sceneId;
        private _pageIndex;
        private _dataList;
        constructor(gameId: number, sceneId: number);
        protected childrenCreated(): void;
        private loadData();
        addEvents(): void;
        private removeEvents();
        private scrollChange(evt);
        private closeHandler();
        /**
         * 刷新页面数据
         */
        private historyData(e);
        destroy(): void;
    }
}
declare module goldLand {
    class CmdConstant {
        /**获得奖励列表*/
        static HEAVEN_AWARD_HISTORY: string;
        /**获奖*/
        static HEAVEN_AWARD_GOLD: string;
    }
}
declare class GoldLandReciveMgr {
    constructor();
}
declare module Cmd {
    /**请求数据 */
    function OnGetHeavenAwardHistoryHpMatchCmd_S(rev: Cmd.GetHeavenAwardHistoryHpMatchCmd_S): void;
    /**通知获奖 */
    function OnGoldFromHeavenHpMatchCmd_S(rev: Cmd.GoldFromHeavenHpMatchCmd_S): void;
}
