module match {
    /**
     * 广告位iten
     */
    export class HpwBannerItem extends eui.Component {
        public ticket_btn: eui.Button;
        public package_btn: eui.Button;
        public banner_img: eui.Image;
        public type_lbl: eui.Label;
        public time_lbl: eui.Label;

        public data: Cmd.HpMatchInfo;

        constructor(data: Cmd.HpMatchInfo) {
            super();
            this.data = data;
            this.skinName = "HpwBannerItemSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            let config = table.getMatchConfigBySceneId(this.data.sceneId);
            this.banner_img.source = "BSLB_banner_" + this.data.sceneId + "_png"
            if (config.MatchPlayerNumber == 6) {
                this.type_lbl.text = "满6人开赛";
                this.time_lbl.text = ""
            }
            else {
                var str = "";
                for (var i = 0; i < this.data.week.length; i++) {
                    let week = this.data.week[i];
                    if (week == 1) {
                        str += '一';
                    }
                    else if (week == 2) {
                        str += '二';
                    }
                    else if (week == 3) {
                        str += '三';
                    }
                    else if (week == 4) {
                        str += '四';
                    }
                    else if (week == 5) {
                        str += '五';
                    }
                    else if (week == 6) {
                        str += '六';
                    }
                    else if (week == 7) {
                        str += '日';
                    }
                }
                this.type_lbl.text = "每周" + str;
                let h = Math.floor(this.data.beginTime / 3600);
                let m = Math.floor(this.data.beginTime % 3600 / 60);
                this.time_lbl.text = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m) + "开始报名";
            }
            if (config.HaoPaiMatchType == 1) {
                this.ticket_btn.visible = true;
                this.package_btn.visible = false;
            }
            else {
                this.ticket_btn.visible = false;
                this.package_btn.visible = true;
            }
        }
    }
}