
module match {

    export class WxGoldSelectSceneItem extends eui.ItemRenderer {

        public touch_btn: eui.WxButton;

        public bg_img: eui.Image;
        public desc_lbl: eui.Label;
        public red_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "WxGoldSelectSceneItemSkin";
        }

        childrenCreated() {
            super.childrenCreated();
        }

        dataChanged() {
            super.dataChanged();
            let info: Cmd.SceneInfo = this.data;
            this.touch_btn["bg_img"].source = "lb_jinbi_wanfa" + info.type + "_png";
            this.touch_btn["red_lbl"].text = `玩${info.curUserNbr}局拿免费红包`;
            let lbl = this.touch_btn["desc_lbl"];
            if (info.type == 1) {
                lbl.textColor = 0x01732c;
                lbl.text = "经典休闲玩法";
            }
            else if (info.type == 2) {
                lbl.textColor = 0x0766A0;
                lbl.text = "去掉3、4、5更刺激";
            }
            else if (info.type == 3) {
                lbl.textColor = 0xbf4611;
                lbl.text = "狂欢炸炸炸";
            }
        }
    }
}