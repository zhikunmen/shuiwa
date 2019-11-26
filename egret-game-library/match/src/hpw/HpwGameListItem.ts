module match {
    export class HpwGameListItem extends eui.ItemRenderer {

        public iconType_img: eui.Image;
        public signUp_btn: eui.Button;
        public gameType_lbl: eui.Label;
        public time_lbl: eui.Label;
        public condition_lbl: eui.Label;
        public explain_lbl: eui.Label;
        public num_lbl: eui.Label;
        public cost_lbl: eui.Label;
        public ticket_img: eui.Image;

        constructor() {
            super();
            this.skinName = "HpwGameListItemSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.signUp_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            uniLib.PopUpMgr.addPopUp(HpwGameDetail, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this.data);
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.HpMatchInfo = this.data;
            let config: table.TableMatchReward = table.getMatchConfigBySceneId(info.sceneId);
            if (config.HaoPaiMatchType == 1) {
                this.iconType_img.source = "BSLB-juan_png";
            }
            else {
                this.iconType_img.source = "BSLB-hb_png";
            }
            if (config.HaoPaiMatchCost && config.HaoPaiMatchCost[0].goodId > 0) {
                this.ticket_img.visible = true;
                this.cost_lbl.text = config.HaoPaiMatchCost[0].goodNbr.toString();
            }
            else {
                this.ticket_img.visible = false;
                this.cost_lbl.text = "免费";
            }
            this.gameType_lbl.text = config.HaoPaiMatchName;
            if (config.MatchPlayerNumber == 6) {
                this.num_lbl.text = config.MatchPlayerNumber.toString();
                this.time_lbl.text = "循环赛";
                this.condition_lbl.text = "满6人开赛";
            }
            else {
                this.num_lbl.text = "不限";
                if (info.week.length == 7) {
                    this.time_lbl.text = "今日";
                }
                else {
                    var str = "";
                    for (var i = 0; i < info.week.length; i++) {
                        let week = info.week[i];
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
                    this.time_lbl.text = "周" + str;
                }
                let h = Math.floor(info.beginTime / 3600);
                let m = Math.floor(info.beginTime % 3600 / 60);
                this.condition_lbl.text = (h < 10 ? "0" + h : h) + ":" + (m < 10 ? "0" + m : m);
            }

            function getStr(rewards: Cmd.RewardItem[]): string {
                let str = "";
                for (let j = 0; j < rewards.length; j++) {
                    let config = ConfigMgr.getInstance().getGoodCfgById(rewards[j].goodId);
                    str += rewards[j].goodNbr ? (rewards[j].goodNbr + config.goodName + "、") : "";
                }
                return str.substring(0, str.length - 1);
            }

            let expStr = "";
            if (info.rewards[0] && info.rewards[0].rewards) {
                expStr += "冠军奖励" + getStr(info.rewards[0].rewards);
            }
            // if (info.rewards[1] && info.rewards[1].rewards) {
            //     expStr += "\n第二名奖励" + getStr(info.rewards[0].rewards);
            // }
            // if (info.rewards[2] && info.rewards[2].rewards) {
            //     expStr += "\n第三名奖励" + getStr(info.rewards[0].rewards);
            // }
            this.explain_lbl.text = expStr;
        }

        public destroy() {
            this.signUp_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}