
module match {

    export class WxGoldSelectTypeItem extends eui.ItemRenderer {

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
            this.skinName = "WxGoldSelectTypeItemSkin";
        }

        childrenCreated() {
            super.childrenCreated();
        }

        dataChanged() {
            super.dataChanged();
            let info: Cmd.SceneItem = this.data;
            this.name = info.type.toString();
            this.touch_btn["bg_img"].source = "lb_jinbi_grade" + info.type + "_png";
            // if (info.type == 1) {
            //     this.touch_btn["desc_lbl"].text = `${info.gameNbr}局送${info.money}元`;
            // }
            // else {
            //     this.touch_btn["desc_lbl"].text = `赢${info.gameNbr}局送${info.money}元`;
            // }
            this.touch_btn["num_lbl"].text = info.curUserNbr.toString();
            if (info.maxCarry)
                this.touch_btn["lowestCarry_lbl"].text = `${info.lowestCarry > 10000 ? info.lowestCarry / 10000 + "万" : info.lowestCarry}~${info.maxCarry > 10000 ? info.maxCarry / 10000 + "万" : info.maxCarry}准入`;
            else {
                this.touch_btn["lowestCarry_lbl"].text = `${info.lowestCarry > 10000 ? info.lowestCarry / 10000 + "万" : info.lowestCarry}准入`;
            }
            if (info.bottomPoint < 10000) {
                this.touch_btn["point_lbl"].text = info.bottomPoint.toString();
            }
            else {
                this.touch_btn["point_lbl"].text = info.bottomPoint / 10000 + "万";
            }
        }
    }
}