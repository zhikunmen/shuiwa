
module exchange {
    export class ExchangeItem extends eui.ItemRenderer {

        public click_btn: eui.WxButton;
        public tpsBg_img: eui.Image;
        public tip_lbl: eui.Label;

        public des_lbl: eui.Label;
        public icon_img: eui.Image;
        public cost_blbl: eui.BitmapLabel;

        constructor() {
            super();
            this.skinName = "ExchangeItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: table.TableShopConfig = this.data;
            this.name = info.shopId.toString();
            this.click_btn["des_lbl"].text = info.shopName;
            this.click_btn["cost_blbl"].text = info.price;
            let type = info["type"];
            if (type == 2) {
                this.click_btn["icon_img"].source = "dh_hongbao_" + info.shopId + "_png";
                this.tip_lbl.visible = false;
                this.tpsBg_img.visible = false;
            }
            else if (type == 1) {
                this.click_btn["icon_img"].source = "dh_jinbi_" + info.shopId + "_png";
                this.tip_lbl.visible = false;
                this.tpsBg_img.visible = false;
            }
            else if (type == 3) {
                this.click_btn["icon_img"].source = "exchange_fare_" + info.shopId + "_png";
                this.tip_lbl.visible = true;
                this.tpsBg_img.visible = true;
            }
        }
    }
}