module match {
    /**
     * 比赛详情
     */
    export class WxGameDetail extends eui.Component {

        public costType_img: eui.Image;
        public sign_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public reward_lst: eui.List;
        public title_lbl: eui.Label;
        public num_lbl: eui.Label;
        public cost_lbl: eui.Label;
        public sign_lbl: eui.Label;

        private _data: Cmd.HpMatchInfo;

        constructor(data: Cmd.HpMatchInfo) {
            super();
            this._data = data;
            this.skinName = "WxGameDetailSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (this._data) {
                let config = table.getMatchConfigBySceneId(this._data.sceneId);
                if (config) {
                    this.title_lbl.text = config.HaoPaiMatchName;
                    this.num_lbl.text = config.MatchPlayerNumber + "人";
                    let goodConfig = ConfigMgr.getInstance().getGoodCfgById(config.HaoPaiMatchCost[0].goodId);
                    if (goodConfig) {
                        this.cost_lbl.text = config.HaoPaiMatchCost[0].goodNbr ? "x" + config.HaoPaiMatchCost[0].goodNbr : "免费";
                    }
                    if (config.HaoPaiMatchCost[0].goodId == GoodType.TYPE_DIAMOND) {
                        this.costType_img.source = "wx_lb_res_json.lb_diamond_png";
                    }
                    else if (config.HaoPaiMatchCost[0].goodId == GoodType.TYPE_GOLD) {
                        this.costType_img.source = "wx_lb_res_json.lb_jinbi_jinbi_png";
                    }
                    else if (config.HaoPaiMatchCost[0].goodId == GoodType.TYPE_CARD) {
                        this.costType_img.source = "wx_lb_res_json.mjl_lobby_card";
                    }
                }

                if (this._data.signLimit) {
                    this.sign_lbl.text = `${this._data.signNum}/${this._data.signLimit}`
                }
                else {
                    this.sign_lbl.text = "无限制";
                }

                this.reward_lst.itemRenderer = WxGameDetailItem;
                config.RankReward.forEach((value, index) => { value["rank"] = index + 1 });
                this.reward_lst.dataProvider = new eui.ArrayCollection(config.RankReward);
            }
        }


        public onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.sign_btn) {
                let config = table.getMatchConfigBySceneId(this._data.sceneId);
                if (Array.isArray(config.HaoPaiMatchCost) && judgeItemIsEnough(config.HaoPaiMatchCost[0].goodId, config.HaoPaiMatchCost[0].goodNbr)) {
                    OnRequestJoinHpMatchCmd_C(this._data.sceneId);
                }
                else {
                    uniLib.PopUpMgr.removePopUp(this);
                }
            }
        }

        public destroy() {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._data = null;
        }
    }
}