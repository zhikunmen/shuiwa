module match {
    export class HpwRankItem extends eui.ItemRenderer {

        public rank_img: eui.Image;
        public nickName_lbl: eui.Label;
        public id_lbl: eui.Label;
        public point_lbl: eui.Label;
        public head_img: eui.Image;
        public rank_blbl: eui.BitmapLabel;

        constructor() {
            super();
            this.skinName = "HpwRankItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.HpRankInfo = this.data;
            if(info.rank < 4){
                this.rank_img.visible = true;
                this.rank_img.source = "PHB-rank" + info.rank + "_png"; 
                this.rank_blbl.text = "";
            }
            else{
                this.rank_img.visible = false;
                this.rank_blbl.text = info.rank.toString();
            }
            this.nickName_lbl.text = info.nickName;
            this.id_lbl.text = info.uid.toString();
            this.point_lbl.text = info.point.toString();
            this.head_img.source = info.headUrl;
        }
    }
}