declare module shop {
    class ShopConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共shop需要加载的资源组
         */
        static PUB_SHOP: string;
    }
}
declare module shop {
    class ShopItem extends eui.ItemRenderer {
        good_icon: eui.Image;
        diamond: eui.Label;
        price: eui.BitmapLabel;
        constructor();
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module shop {
    class ShopPanel extends eui.Component {
        private close_btn;
        private itemGroup;
        private desc;
        private scroller;
        private btnAry;
        constructor();
        childrenCreated(): void;
        private onTouchHandler(evt);
        private checkSession(data);
        /**
     * 下订单
     */
        createOrder(data: table.TableShopConfig, extData?: string): void;
        destroy(): void;
    }
}
declare class ShopReciveMgr {
    constructor();
}
declare module Cmd {
    function OnCreatePlatOrderReturnSdkPmd_S(rev: Pmd.CreatePlatOrderReturnSdkPmd_S): boolean;
    function OnNotifyRechargeRequestSdkPmd_S(rev: Pmd.NotifyRechargeRequestSdkPmd_S): void;
}
declare module eui {
    class WxGroup extends eui.Group {
        constructor();
        protected childrenCreated(): void;
        private init();
        protected onTouchBegin(): void;
        protected onTouchEnd(): void;
        protected onTouchCancel(): void;
        protected onTouchMove(): void;
        protected onTouchReleaseOutside(): void;
        dispose(): void;
    }
}
