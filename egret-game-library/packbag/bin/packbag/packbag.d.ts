declare module packbag {
    /**
     * 购买或者出售  暂时只要出售
     */
    class BagBuyOrSellPanel extends eui.Component {
        icon_img: eui.Image;
        typeIcon1_img: eui.Image;
        typeIcon2_img: eui.Image;
        _reduceBtn: eui.WxButton;
        _minBtn: eui.WxButton;
        _addBtn: eui.WxButton;
        _maxBtn: eui.WxButton;
        _confirmBtn: eui.WxButton;
        _closeBtn: eui.WxButton;
        num_tex: eui.EditableText;
        iconName_lbl: eui.Label;
        allPrice_lbl: eui.Label;
        price_lbl: eui.Label;
        private _info;
        private _count;
        constructor(info: Cmd.BackpackInfo);
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        /**设置数量 */
        private setNum(num);
        private getNum();
        destroy(): void;
    }
}
declare module packbag {
    class BagPresentPanel extends eui.Component {
        private _closeBtn;
        private _reduceBtn;
        private _addBtn;
        private _confirmBtn;
        private daoju_name;
        private daoju_icon;
        private num_tex;
        private friend_id;
        private _info;
        private _count;
        constructor(info: Cmd.BackpackInfo);
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        private getNum();
        destroy(): void;
    }
}
declare module packbag {
    class PackBagConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 需要加载背包的资源组
         */
        static PUB_PACKBAG: string;
        static PUB_BAGPRESENT: string;
        /**
        * 所有公共道具资源
        * 获取资源方式: "game_prop_json.bag_daoju_"+goodId
        */
        static PUB_PROP: string;
    }
}
declare module packbag {
    class PackBagItem extends eui.ItemRenderer {
        bag_bg: eui.Image;
        bag_icon: eui.Image;
        bag_num: eui.BitmapLabel;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        private operateWidth(str);
    }
}
declare module packbag {
    class PackBagPanel extends eui.Component {
        private _closeBtn;
        private _buyBtn;
        private _useBtn;
        private _sendBtn;
        private _composeBtn;
        private _sellBtn;
        private select_name;
        private select_icon;
        private select_desc;
        private _bag_lst;
        private _bagInfo;
        private _actual_total;
        private _info;
        private goodIds;
        private monthCards;
        private _comBtns;
        private _comContain;
        constructor();
        protected childrenCreated(): void;
        private initData();
        private backPackListHandler(evt);
        private backPackExchangeHandler(evt);
        private getIndexByGoodId(goodId);
        private backPackPresentHandler(evt);
        private onItemTapHandler(evt);
        private setSelectItem(info);
        private goodZero(goodId);
        private goodBtnOper(type);
        private onTouchHandler(evt);
        private operateList(parameter);
        destroy(): void;
    }
}
declare module packbag {
    class CmdConstant {
        /**
        * 获取背包列表
        */
        static BACKPACK_INFO_RETURN: string;
        /**
        * 获取背包道具使用
        */
        static BACKPACK_EXCHANGE: string;
        /**
        * 获取背包道具赠送
        */
        static BACKPACK_PRESENT: string;
    }
}
declare class PackBagReciveMgr {
    constructor();
}
declare module Cmd {
    /**
 *
 */
    function OnBackpackInfoReturnBackpackCmd_S(rev: Cmd.BackpackInfoReturnBackpackCmd_S): void;
    /**
     *
     */
    function OnBackpackExchangeReturnBackpackCmd_S(rev: Cmd.BackpackExchangeReturnBackpackCmd_S): void;
    function OnBackpackPresentReturnBackpackCmd_S(rev: Cmd.BackpackPresentReturnBackpackCmd_S): void;
}
