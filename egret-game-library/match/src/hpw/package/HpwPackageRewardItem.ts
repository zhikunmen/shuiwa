module match {
    /**
     * 红包奖励条目
     */
    export class HpwPackageRewardItem extends eui.ItemRenderer {

        public order_lbl: eui.Label;
        public sum_lbl: eui.Label;
        public time_lbl: eui.Label;
        public status_lbl: eui.Label;
        public detail_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "HpwPackageRewardItemSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RedPackInfo = this.data;
        }
    }
}