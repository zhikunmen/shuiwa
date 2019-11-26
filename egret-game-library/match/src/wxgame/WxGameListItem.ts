module match {
    export class WxGameListItem extends eui.ItemRenderer {

        public tick_btn: eui.WxButton;

        public diamond_img: eui.Image;
        public icon_img: eui.Image;
        public diamond_blbl: eui.BitmapLabel;
        public money_lbl: eui.Label;
        public black_img: eui.Image;
        public lock_img: eui.Image;
        public lockDesc_lbl: eui.Label;
        public desc_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "WxGameListItemSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.HpMatchInfo = this.data;
            let skin = this.tick_btn.skin;
            let config = table.getMatchConfigBySceneId(info.sceneId);
            if (config) {
                if (config.HaoPaiMatchType == GameType.TYPE_OUT || config.HaoPaiMatchType == GameType.TYPE_DIAMOND) {
                    skin["desc_lbl"].textFlow = <Array<egret.ITextElement>>[{ text: "前" }, { text: config.mainrewardRank, style: { textColor: 0xFA4F42 } }, { text: "名可获得福卡奖励" }];
                    skin["desc_lbl"].visible = true;
                }
                else {
                    skin["desc_lbl"].visible = false;
                }
                /**是否解锁 */
                if (info.unLocked == 0) {
                    skin["black_img"].visible = true;
                    skin["lock_img"].visible = true;
                    skin["lockDesc_lbl"].visible = true;
                    skin["lockDesc_lbl"].text = `邀请${config.unlockNumber}个好友解锁`;
                }
                else {
                    skin["black_img"].visible = false;
                    skin["lock_img"].visible = false;
                    skin["lockDesc_lbl"].visible = false;
                }
                if (config.HaoPaiMatchType == GameType.TYPE_CARD || config.HaoPaiMatchType == GameType.TYPE_DIAMOND) {
                    skin["icon_img"].source = "lb_bisai_type" + GameType.TYPE_CARD + "_png";
                }
                else {
                    skin["icon_img"].source = "lb_bisai_type" + config.HaoPaiMatchType + "_png";
                }
                /**报名消耗 */
                if (config.HaoPaiMatchCost[0].goodNbr) {
                    skin["mf_img"].visible = false;
                    skin["diamond_blbl"].text = config.HaoPaiMatchCost[0].goodNbr;
                    if (config.HaoPaiMatchCost[0].goodId == GoodType.TYPE_DIAMOND) {
                        skin["diamond_img"].source = "wx_lb_res_json.lb_diamond_png";
                    }
                    else if (config.HaoPaiMatchCost[0].goodId == GoodType.TYPE_GOLD) {
                        skin["diamond_img"].source = "wx_lb_res_json.lb_jinbi_jinbi_png";
                    }
                    else if (config.HaoPaiMatchCost[0].goodId == GoodType.TYPE_CARD) {
                        skin["diamond_img"].source = "wx_lb_res_json.mjl_lobby_card";
                        skin["diamond_img"].x = 15;
                    }
                }
                else {
                    skin["diamond_img"].visible = false;
                    skin["diamond_blbl"].text = "";
                    skin["mf_img"].visible = true;
                }
                /**比赛奖励 */
                if (config.matchName) {
                    skin["money_lbl"].text = config.matchName.toString();
                    if (config.matchName < 10) {
                        skin["money_lbl"].size = 80;
                    }
                    else if (config.matchName < 100) {
                        skin["money_lbl"].size = 60;
                    }
                    else {
                        skin["money_lbl"].size = 46;
                    }
                }
                else {
                    skin["money_lbl"].text = "";
                }
            }
        }
    }
}