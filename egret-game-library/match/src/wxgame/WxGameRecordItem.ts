module match {

    export class WxGameRecordItem extends eui.ItemRenderer {

        public one_lbl: eui.Label;
        public min_lbl: eui.Label;
        public sec_lbl: eui.Label;
        public third_lbl: eui.Label;
        public two_lbl: eui.Label;
        public rank_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "WxGameRecordItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RewardRecord = this.data;
            this.one_lbl.text = info.rankList[0];
            this.two_lbl.text = info.rankList[1];
            this.third_lbl.text = info.rankList[2];
            if (info.myRank == -1)
                this.rank_lbl.text = "未参加";
            else if (info.myRank == 0)
                this.rank_lbl.text = "未上榜";
            else
                this.rank_lbl.text = info.myRank.toString();
            let time = formatTime(info.beginTime * 1000, "/").split(" ");
            this.min_lbl.text = time[0];
            this.sec_lbl.text = time[1];
        }
    }
}