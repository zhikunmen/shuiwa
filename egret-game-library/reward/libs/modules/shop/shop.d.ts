declare module shop {
    /**代付信息 帮好友代付*/
    class ShopDFInfo extends eui.Component {
        refuse_btn: eui.WxButton;
        pay_btn: eui.WxButton;
        close_btn: eui.WxButton;
        id_lbl: eui.Label;
        nickName_lbl: eui.Label;
        goodName_lbl: eui.Label;
        price_lbl: eui.Label;
        head_img: eui.Image;
        private _timeIndex;
        private _wgShareData;
        constructor();
        childrenCreated(): void;
        setData(wgShareData: string): void;
        private onTouch(evt);
        destroy(): void;
    }
}
declare module shop {
    /**首充 */
    class FirstRecharge extends eui.Component {
        purchase_btn: eui.WxButton;
        pay_btn: eui.WxButton;
        close_btn: eui.WxButton;
        time_btn: eui.WxButton;
        reward_lst: eui.List;
        titlePrice_blbl: eui.BitmapLabel;
        price_blbl: eui.BitmapLabel;
        desc_lbl: eui.Label;
        private _timer;
        private _shopId;
        constructor();
        protected childrenCreated(): void;
        private onInfo(evt);
        private onTimer();
        private setLabel(count);
        private onTouchHandler(evt);
        destroy(): void;
    }
    class RechargeItem extends eui.ItemRenderer {
        icon_img: eui.Image;
        desc_img: eui.Image;
        desc_lbl: eui.Label;
        constructor();
        dataChanged(): void;
    }
}
declare module shop {
    /**月卡 */
    class MonthlyCard extends eui.Component {
        purchase_btn: eui.WxButton;
        df_btn: eui.WxButton;
        close_btn: eui.WxButton;
        price_img: any;
        reward_lst: eui.List;
        desc_lbl: eui.Label;
        private _timeIndex;
        private _info;
        constructor(info: Cmd.GetMonthCardInfoLobbyCmd_S);
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module shop {
    /**
     * 领取月卡
     */
    class MonthlyCardRecv extends eui.Component {
        rev_btn: eui.WxButton;
        close_btn: eui.WxButton;
        reward_lst: eui.List;
        remain_lbl: eui.Label;
        renew_lbl: eui.Label;
        private _info;
        private _type;
        constructor(info: Cmd.GetMonthCardInfoLobbyCmd_S);
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module shop {
    /**首充信息 */
    const FIRST_RECHARGE_INFO = "firstRechargeInfo";
    class ShopConsts {
        static RES_JSON: string;
        static RESZZ_JSON: string;
        static RES_MAHJONG_JSON: string;
        static THM_JSON: string;
        /**
         * 公共shop需要加载的资源组
         */
        static PUB_SHOP: string;
        /**首充和vip */
        static SHOP_RECHARGE: string;
        /**代付款 */
        static SHOP_DAIFU: string;
    }
}
declare module shop {
    class ShopControl {
        static checkSession(data: table.TableShopConfig, extObj?: Object): void;
        /**
     * 下订单
     */
        private static createOrder(data, extData?);
    }
}
declare module shop {
    /**首充 */
    class FirstRechargeBuYu extends eui.Component {
        purchase_btn: eui.WxButton;
        pay_btn: eui.WxButton;
        close_btn: eui.WxButton;
        private reward_itme1;
        private reward_itme2;
        private reward_itme3;
        private reward_itme4;
        private _shopId;
        constructor();
        protected childrenCreated(): void;
        private initUI();
        private onInfo(evt);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module shop {
    /**代付提示 分享给好友*/
    class ShopDFTips extends eui.Component {
        send_btn: eui.WxButton;
        close_btn: eui.WxButton;
        shopName_lbl: eui.Label;
        price_lbl: eui.Label;
        private _shopId;
        constructor(shopId: number);
        childrenCreated(): void;
        private onTouch(evt);
        destroy(): void;
    }
}
declare module shop {
    class ShopItem extends eui.ItemRenderer {
        touch_btn: eui.WxButton;
        icon_img: eui.Image;
        get_lbl: eui.Label;
        price_lbl: eui.BitmapLabel;
        ios_img: eui.Image;
        constructor();
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module shop {
    class ShopPanel extends eui.Component {
        scroller: eui.Scroller;
        shop_lst: eui.List;
        desc_lbl: eui.Label;
        close_btn: eui.WxButton;
        gold_rbtn: eui.RadioButton;
        diamond_rbtn: eui.RadioButton;
        prop_rbtn: eui.RadioButton;
        private _arrColl;
        /**钻石 */
        private _diamondArr;
        /**金币 */
        private _goldArr;
        /**道具 */
        private _propArr;
        private _selectIndex;
        private _timeIndex;
        private _haProp;
        constructor(selectIndex?: number, haProp?: boolean);
        childrenCreated(): void;
        private onItemTapHandler(evt);
        private onChangeHander(evt);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare class ShopReciveMgr {
    constructor();
}
declare module Cmd {
    function OnCreatePlatOrderReturnSdkPmd_S(rev: Pmd.CreatePlatOrderReturnSdkPmd_S): boolean;
    function OnNotifyRechargeRequestSdkPmd_S(rev: Pmd.NotifyRechargeRequestSdkPmd_S): void;
    /**首充信息 */
    function OnGetFirstchargeInfoHpMatchCmd_S(rev: Cmd.GetFirstchargeInfoHpMatchCmd_S): void;
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
