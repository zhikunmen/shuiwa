module shop {
    export class ShopItem extends eui.ItemRenderer {

        public touch_btn: eui.WxButton

        public icon_img: eui.Image;
        public get_lbl: eui.Label;
        public price_lbl: eui.BitmapLabel;
        public ios_img: eui.Image;

        public constructor() {
            super();
            this.skinName = "ShopItemSkin";
        }

        protected dataChanged() {
            super.dataChanged();
            var info: table.TableShopConfig = this.data;
            this.touch_btn["get_lbl"].text = info.shopName;

            // if (uniLib.Global.isWxGame() && wxgame.Utils.isIos && info.shopType == 4) {
            //     this.touch_btn["ios_img"].visible = true;
            //     this.touch_btn["price_lbl"].visible = false;
            // }
            // else {
                this.touch_btn["ios_img"].visible = false;
                this.touch_btn["price_lbl"].visible = true;
            // }

            if (info.shopType == 1) {
                this.touch_btn["price_lbl"].text = info.price + "钻";
                this.touch_btn["icon_img"].source = "lb_shangcheng_jinbi" + info.iconId + "_png";
            }else if (info.shopType == 2) {
                this.touch_btn["price_lbl"].text = info.price + "钻";
                this.touch_btn["icon_img"].source = "game_prop_json.bag_daoju_"+info.shopGoods.goodId;
            } else if (info.shopType == 4) {
                this.touch_btn["price_lbl"].text = info.price / 100 + "元";
                this.touch_btn["icon_img"].source = "shop_icon" + info.iconId + "_png";
            }

        }

        public destroy(): void {
            this.removeChildren();
        }

    }
}