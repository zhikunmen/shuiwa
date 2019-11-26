module lobbysign {
    export class SignRewardItemPanel extends eui.ItemRenderer {

        private guang: egret.tween.TweenGroup;
        private _guangImg: eui.Image;
        private dayTxt: eui.Label;
        private bg: eui.Image;
        private goldTxt: eui.Label;
        private tick: eui.Image;
        private _id: number = -1;

        public info: Cmd.ContinueSignInfo;
        private _cRewardTabledata: table.TableSignIn.CumulativeRewardItem;
        constructor() {
            super();
            this.skinName = "SignRewardItemSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            if (!this.data) return;
            this.info = this.data;
            this._id = this.data.id;
            if (!MJLobbyData.getInstance().sign[0] || !MJLobbyData.getInstance().sign[0].cumulativeReward[this.itemIndex]) return;
            this._cRewardTabledata = MJLobbyData.getInstance().sign[0].cumulativeReward[this.itemIndex];
            if (this.info.bCouldReceive && !this.info.bReceived) {
                this.guangtween(true);
            } else {
                this.guangtween(false);
            }
            this.dayTxt.text = "累计" + this.info.continueDay + "天";
            this.goldTxt.text = this._cRewardTabledata.reward.count + MJLobbyData.getInstance().goods[this._cRewardTabledata.reward.goodsId].goodName;
            this.bg.source = "mjl_sign_rewards" + this._id;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
        }
        public getReward(evt: egret.Event) {
            if (!this.data.bCouldReceive) {
                uniLib.TipsUtils.showTipsDownToUp("当前礼包不可领");
                return;
            }
            LobbySignPanel.rewardId = this._id;
            SignSendMgr.getSignToday(false, this.data.continueDay);
        }
        /**背景光旋转 */
        private guangtween(val: boolean) {
            uniLib.DisplayUtils.stopTweenGroup(this.guang);
            this._guangImg.visible = false;
            if (val) {
                this._guangImg.visible = true;
                uniLib.DisplayUtils.playTweenGroup(this.guang, true);
            }
        }
    }
}