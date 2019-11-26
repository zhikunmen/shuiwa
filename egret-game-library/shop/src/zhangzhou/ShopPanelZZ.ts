module shop {
    export class ShopPanelZZ extends commonpanel.LobbyBaseEuiPanel {

        private scroller: eui.Scroller;
        private _list: eui.List;
        private _desc: eui.Label;
        private _shopList: Array<number>;
        constructor() {
            super("mjl_buy_title2", 1100, 550);
            this.skinName = "ShopPanelZZSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._desc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyTxt, this);
        }

        protected removeEvent(): void {
            this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._desc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.copyTxt, this);
        }

        protected initUI(): void {
            this._list.itemRenderer = ShopItemZZ;
            var config: table.TableLobbyGameList = ConfigMgr.getInstance().getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
            if (uniLib.Global.isWxGame()) {
                this._shopList = config.wechatshopList;
            } else {
                this._shopList = config.shopList;
            }
            this._list.dataProvider = new eui.ArrayCollection(this._shopList);
        }

        private itemTap(evt: eui.ItemTapEvent) {
            let shop = ConfigMgr.getInstance().getShopCfgById(this._list.selectedItem);
            ShopControl.checkSession(shop);
        }

        public get desc(): eui.Label {
            return this._desc;
        }

        private copyTxt() {
            uniLib.ZQGameSdk.nativeCopyStr("lyzzqp");
            if (!uniLib.Global.isWxGame())
                uniLib.TipsUtils.showTipsDownToUp("公众号已复制！");
        }
    }
}