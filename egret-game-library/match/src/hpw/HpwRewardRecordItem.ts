module match {
    export class HpwRewardRecordItem extends eui.ItemRenderer {

        public time_lbl: eui.Label;
        public first_lbl: eui.Label;
        public second_lbl: eui.Label;
        public third_lbl: eui.Label;
        public me_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "HpwRewardRecordItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RewardRecord = this.data;
            this.first_lbl.text = info.rankList[0];
            this.second_lbl.text = info.rankList[1];
            this.third_lbl.text = info.rankList[2];
            if (info.myRank == -1) {
                this.me_lbl.text = "未参加";
            }
            else if (info.myRank == 0) {
                this.me_lbl.text = "未上榜";
            }
            else {
                this.me_lbl.text = "第" + info.myRank + "名";
            }
            let end = new Date(info.endTime);
            let endH = end.getHours();
            let endM = end.getMinutes();
            this.time_lbl.text = formatTime(info.beginTime, '/') + '-' + add0(endH) + ':' + add0(endM);
        }
    }
}