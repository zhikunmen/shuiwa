module match {
    export class HpwGameDetail extends eui.Component {

        public close_btn: match.BaseButton;
        public signUp_btn: match.BaseButton;
        public gameRule_btn: match.BaseButton;
        public record_btn: match.BaseButton;

        public beginCondition_lbl: eui.Label;
        public signUpCondition_lbl: eui.Label;
        public signUpCost_lbl: eui.Label;

        private _info: Cmd.HpMatchInfo;

        constructor(data: Cmd.HpMatchInfo) {
            super();
            this._info = data;
            this.width = uniLib.Global.screenWidth;
            this.skinName = "HpwGameDetailSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            if (this._info) {
                for (let i = 0; i < this._info.rewards.length; i++) {
                    let reward: Cmd.RewardItem[] = this._info.rewards[i].rewards;
                    for (let k = 0; k < reward.length; k++) {
                        let goodConfig = ConfigMgr.getInstance().getGoodCfgById(reward[k].goodId);
                        this["reward" + i + k + "_lbl"].text = reward[k].goodNbr + goodConfig.goodName;
                    }
                }
                let config = table.getMatchConfigBySceneId(this._info.sceneId);
                if (config) {
                    let goodConfig = ConfigMgr.getInstance().getGoodCfgById(config.HaoPaiMatchCost[0].goodId);
                    if (goodConfig) {
                        this.signUpCost_lbl.text = config.HaoPaiMatchCost[0].goodNbr + goodConfig.goodName;
                    }
                    else{
                        this.signUpCost_lbl.text = "免费";
                    }
                    if (config.MatchPlayerNumber == 6) {
                        this.beginCondition_lbl.text = "满6人开赛";
                    }
                    else {
                        this.beginCondition_lbl.text = "限时赛";
                    }
                    if (!config.deadLine) {
                        this.signUpCondition_lbl.text = "无";
                    }
                    else{
                        let begin = add0(Math.floor(this._info.beginTime / 3600)) + ":" + add0(Math.floor(this._info.beginTime % 3600 / 60));
                        let endTime = this._info.endTime - config.deadLine;
                        let end = add0(Math.floor(endTime / 3600)) + ":" + add0(Math.floor(endTime % 3600 / 60));
                        this.signUpCondition_lbl.text = begin + "--" + end;
                    }
                }
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.signUp_btn) {
                OnRequestJoinHpMatchCmd_C(this._info.sceneId);
            }
            else if (evt.target == this.gameRule_btn) {
                uniLib.PopUpMgr.addPopUp(HpwGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._info.sceneId);
            }
            else if (evt.target == this.record_btn) {
                OnRequestRewardRecordHpMatchCmd_C(1, this._info.sceneId);
                uniLib.PopUpMgr.addPopUp(HpwRewardRecord, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._info.sceneId);
            }
        }
    }
}