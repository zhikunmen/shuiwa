declare module knapsack {
    /**兑换金币页面 */
    class ExchangeGoldPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn;
        /**代金券名称 */
        private _couponText;
        /**兑换按钮 */
        private _exchangeBtn;
        /**代金券图  */
        private _couponImg;
        /**兑换数量 */
        private _numText;
        /**-按钮 */
        private _reduceBtn;
        /** +按钮 */
        private _addBtn;
        /**选择的代金券数量 */
        private _num;
        /**显示换的金币量 */
        private _goldText;
        constructor();
        protected childrenCreated(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**兑换金币后剩余数量 */
        private updateData(e);
        /**更新显示数量 */
        private updateNum();
        private onClick(e);
        protected destroy(): void;
    }
}
declare module knapsack {
    /**背包代金券Item */
    class KnapsakItemPanel extends eui.ItemRenderer {
        /**代金券图 */
        private _couponImg;
        /**选中图 */
        private _selectImg;
        /**代金券数量 */
        private _numText;
        /**代金券游戏种类名称 */
        private _gameText;
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare module knapsack {
    /**背包页面 */
    class KnapsakPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn;
        /**右边详情区域 */
        private _detailGroup;
        /**右边 代金券图标 */
        private _couponImg;
        /**右边 代金券名称文本 */
        private _couponText;
        /**右边 物品详情 */
        private _explainText;
        /**右边 兑换金币按钮 */
        private _exchangeBtn;
        /**右边 提示 */
        private _detailTips;
        /**左边提示 */
        private _couponTips;
        /**左侧 代金券区域 */
        private _couponGroup;
        /**左侧 代金券列表 */
        private _couponList;
        /** 代金券列表容器*/
        private _couponListArray;
        /** 代金券数据 */
        private _backpackList;
        /** 代金券数据 */
        private _newbackpackList;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        /**传数据 */
        private showData(e);
        /**兑换金币后剩余数量 */
        private updateData(e);
        private onClick(evt);
        /**选中玩家*/
        private itemTap(evt);
        /**点击更新数据 */
        private updateList();
        /**显示右侧代金券详情信息 */
        private showdetailGroup();
        protected destroy(): void;
    }
}
declare module knapsack {
    class KnapsackConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_KNAPSACK: string;
        /**数据无误 */
        static SUCCESS: number;
        /** 背包*/
        static BackpackInfoReturnBackpack: string;
        /** 领取红包钱*/
        static OpenRedPackLobby: string;
        /** 换物品后返回*/
        static BackpackExchangeReturnBackpack: string;
    }
    /**暂存数据 对应表数据 */
    class Data {
        /**道具表 */
        static goods: Dictionary<table.TableGoodsConfig>;
    }
}
declare module knapsack {
    class KnapsackData {
        private static _instance;
        static getInstance(): KnapsackData;
        PartnerImportList: Cmd.MatchGroupMemberInfo[];
        /** 合伙人 默认返回的matchid*/
        PartnerMatchId: number;
        /**背包选中项代金券物品ID */
        knapaskGoodId: number;
        /**背包选中项代金券数量 */
        knapaskGoodnumber: number;
    }
}
declare module Cmd {
    function KnapsackDispatch(cmd: string, obj?: any, bubbles?: boolean): void;
    /**更新物品数据 */
    function OnBackpackExchangeReturnBackpackCmd_S(rev: Cmd.BackpackExchangeReturnBackpackCmd_S): void;
    /**返回背包数据*/
    function OnBackpackInfoReturnBackpackCmd_S(rev: Cmd.BackpackInfoReturnBackpackCmd_S): void;
}
declare module knapsack {
    class KnapsackModuleMgr {
        private static _instance;
        static getInstance(): KnapsackModuleMgr;
        /**显示背包界面 */
        showKnapsakPanel(callBack: Function): void;
        /**显示兑换金币页面 */
        showExchangeGoldPanel(): void;
    }
}
declare module knapsack {
    class KnapsackSendMgr {
        /**请求使用物品
             * @param goodId 兑换物品id
             * @param num 兑换数量
             */
        static ExchangeRequest(num: number, goodId: number): void;
    }
}
