module match {
    /**
     * 好牌网比赛战绩条目
     */
    export class HpwGameRecordItem extends eui.ItemRenderer {

        public name_lbl: eui.Label;
        public matchId_lbl: eui.Label;
        public time_lbl: eui.Label;
        public rank_lbl: eui.Label;
        public point_lbl: eui.Label;
        public packet_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "HpwGameRecordItemSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RankHistory = this.data;
            this.matchId_lbl.text = info.matchId.toString();
            this.name_lbl.text = info.matchName;
            this.time_lbl.text = formatTime(info.timestamp, '/');
            this.rank_lbl.text = info.rank ? info.rank.toString() : " 未上榜";
            for(let i = 0; i < info.rewards.length; i++){
                let item = info.rewards[i];
                let config = ConfigMgr.getInstance().getGoodCfgById(item.goodId);
                if(config){
                    if(item.goodId == 296){//296红包id
                        this.packet_lbl.text = item.goodNbr + config.goodName;
                    }
                    else if(item.goodId == 297){//297积分id
                        this.point_lbl.text = item.goodNbr + config.goodName;
                    }
                }
            }
        }
    }
}