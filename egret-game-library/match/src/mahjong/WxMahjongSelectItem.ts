module match {
    export class WxMahjongSelectItem extends eui.ItemRenderer {

        public touch_btn: eui.WxButton;

        public bg_img: eui.Image;
        public labelDisplay: eui.Label;
        public num_lbl: eui.Label;
        public point_lbl: eui.Label;
        public lowestCarry_lbl: eui.Label;
        public desc_lbl: eui.Label;
        public type_ac: eui.ArmatureComponent;

        constructor() {
            super();
            this.skinName = "WxMahjongSelectItemSkin";
        }

        childrenCreated() {
            super.childrenCreated();
        }

        dataChanged() {
            super.dataChanged();
            let info: table.TableCoinHundredConfig = this.data;
            this.name = "lb_jinbi_grade" + info["index"];
            this.touch_btn["bg_img"].source = "lb_jinbi_grade" + info["index"] + "_png";
            // if (info.type == 1) {
            //     this.touch_btn["desc_lbl"].text = `${info.gameNbr}局送${info.money}元`;
            // }
            // else {
            //     this.touch_btn["desc_lbl"].text = `赢${info.gameNbr}局送${info.money}元`;
            // }
            this.touch_btn["num_lbl"].text = Math.ceil(Math.random() * 1000);
            this.touch_btn["lowestCarry_lbl"].text = info.lowestCarry + " 准入";
            if (info.lowestBetChips < 10000) {
                this.touch_btn["point_lbl"].text = info.lowestBetChips.toString();
            }
            else {
                this.touch_btn["point_lbl"].text = info.lowestBetChips / 10000 + "万";
            }
        }
    }
}
