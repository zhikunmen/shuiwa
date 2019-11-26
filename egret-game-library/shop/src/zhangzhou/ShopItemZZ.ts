module shop {
    export class ShopItemZZ extends eui.ItemRenderer {

        private itme1: eui.WxGroup;
        private _good_icon: eui.Image;
        private _diamond: eui.Label;
        private _chipsTxt: eui.Label;
        private _buyBtn: eui.WxButton;
        private _giveImg: eui.Image;
        private _giveTxt: eui.Label;
        private _info: table.TableShopConfig;
        constructor() {
            super();
            this.skinName = "ShopItemZZSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged(): void {
            if (this.data) {
                this._info = ConfigMgr.getInstance().getShopCfgById(this.data);
                this._good_icon.source = "mjl_buy_good" + this._info.iconId
                this._diamond.text = this._info.shopName;
                this._chipsTxt.text = String(this._info.price / 100) + "元";
            }
        }

        public showBindRechargeRet(): void {
            if (MJLobbyData.getInstance().bindRechargeRet == 1) {
                let config = MJLobbyData.getInstance().lobbyConfig;
                let index = config.shopList.indexOf(this._info.shopId);
                if (config.bindList[index] == 0) return;
                this._giveImg.visible = true;
                this._giveTxt.visible = true;
                this._giveTxt.text = config.bindList[index] + "钻";
            }
        }
    }
}