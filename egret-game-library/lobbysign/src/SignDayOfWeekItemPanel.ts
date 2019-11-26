module lobbysign {
    export class SignDayOfWeekItemPanel extends eui.ItemRenderer {

        private bg: eui.Image;
        private dayTxt: eui.Label;
        private goldTxt: eui.Label;
        private icon: eui.Image;
        private tick: eui.Image;
        private _id: number = -1;
        private _sRewardTabledata: table.TableSignIn.SignRewardItem;

        public info: Cmd.UserSignInfoLobbyCmd_S;
        constructor() {
            super();
            this.skinName = "SignDayOfWeekItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            this.info = this.data;
            if (!this.data) return;
            this._id = this.itemIndex;
            if (!MJLobbyData.getInstance().sign[0] || !MJLobbyData.getInstance().sign[0].signReward[this.itemIndex]) return;
            this._sRewardTabledata = MJLobbyData.getInstance().sign[0].signReward[this.itemIndex];
            let weekArr: Array<string> = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
            this.dayTxt.text = weekArr[this.itemIndex];
            this.goldTxt.text = this._sRewardTabledata.reward.count + ""
            let imgDic: Dictionary<number> = { 1000: 1, 2000: 2, 5000: 3, 6000: 4 };
            this.icon.source = "mjl_sign_rewards" + imgDic[this._sRewardTabledata.reward.count];
            this.tick.visible = false;
            if (this.info.signWeek && this.info.signWeek.length > 0 && this.info.signWeek.indexOf(this.itemIndex + 1) != -1) {
                this.tick.visible = true;
            }
        }
    }
}