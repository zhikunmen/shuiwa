declare module exchange {
    class ExchangeConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_EXCHANGE: string;
        static EXCHANGE_FARE: string;
        static FARE_INFO: string;
        static DRAW_INFO: string;
    }
}
declare module exchange {
    class ExchangeItem extends eui.ItemRenderer {
        click_btn: eui.WxButton;
        tpsBg_img: eui.Image;
        tip_lbl: eui.Label;
        des_lbl: eui.Label;
        icon_img: eui.Image;
        cost_blbl: eui.BitmapLabel;
        constructor();
        dataChanged(): void;
    }
}
declare module exchange {
    class ExchangeVC extends eui.Component {
        bg_img: eui.Image;
        _closeBtn: eui.WxButton;
        package_rbtn: eui.RadioButton;
        diamond_rbtn: eui.RadioButton;
        ticket_rbtn: eui.RadioButton;
        exchange_lst: eui.List;
        tips_lbl: eui.Label;
        private _giftVoucher;
        private _collArr;
        private _selectIndex;
        private _customerQQ;
        constructor(selectIndex?: number, customerQQ?: string);
        protected childrenCreated(): void;
        private send();
        private updateIndex(evt?);
        private onTouchHander(evt);
        private refreshList();
        private onItemTapHandler(evt);
        private openBind();
        private addEvent();
        private removeEvent();
        private closeInfo();
        destory(): void;
    }
}
declare module Cmd {
    function OnExchangeGiftVoucherRecordUserInfoLobby_S(rev: Cmd.ExchangeGiftVoucherRecordUserInfoLobby_S): void;
    function OnGetExchangeGiftVoucherInfo_S(rev: Cmd.GetExchangeGiftVoucherInfo_S): void;
    /**商城购买相关 埋点*/
    function OnBuyGoodsLobbyCmd_S(rev: Cmd.BuyGoodsLobbyCmd_S): void;
    /**
     * 提现到公众号
     */
    function OnOpenRedPackLobbyCmd_S(rev: Cmd.OpenRedPackLobbyCmd_S): void;
}
