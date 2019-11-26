module match {
    /**
     * 比赛详情项
     */
    export class WxGameDetailItem extends eui.ItemRenderer {

        public rank_img: eui.Image;
        public reward0_lbl: eui.Label;
        public reward1_lbl: eui.Label;
        public rank_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "WxGameDetailItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: table.TableMatchReward.RankRewardItem[] = this.data;
            if (info["rank"] >= 1 && info["rank"] <= 3) {
                this.rank_img.visible = true;
                this.rank_lbl.visible = false;
                this.rank_img.source = `wx_lb_res_json.bs_xiangqing_${info["rank"]}_png`
            }
            else {
                this.rank_img.visible = false;
                this.rank_lbl.visible = true;
                this.rank_lbl.text = `第${info["rank"]}名`
            }
            this.reward0_lbl.text = info[0].goodNbr + getDescByGoodId(info[0].goodId);
            if (info[1]) {
                this.reward1_lbl.text = info[1].goodNbr + getDescByGoodId(info[1].goodId);
            }
            else {
                this.reward1_lbl.text = "";
            }
        }

    }
}