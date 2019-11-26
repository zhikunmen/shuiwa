/**
 * 俱乐部玩法详情
 */
module club {

    export class ClubDetailsPanel extends commonpanel.LobbyBaseEuiPanel {
        /**游戏名称 */
        private gameText: eui.Label;
        /**几人房 */
        private pnumberText: eui.Label;
        /** 多少局*/
        private gnumberText: eui.Label;
        /** 玩法描述*/
        private playText: eui.Label;
        /**关闭按钮 */
        private closeBtn: eui.Button;
        private info: Cmd.MathGroup;
        /**大赢家设置  */
        private bigWinText: eui.Label;
        constructor(data: Cmd.MathGroup) {
            super();
            this.skinName = "ClubDetailsSkin";
            this.info = data;
        }
        protected initUI() {
            this.setDetailDate();
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public setDetailDate() {
            this.gameText.text = this.info.gameName;
            this.gnumberText.text = this.info.gameNbr.toString() + "局";
            if (this.info.gameNbr >= 49) {
                this.gnumberText.text = Math.round(this.info.gameNbr) + "课";
            }
            this.playText.text = this.info.playTypeDesc;
            this.pnumberText.text = + this.info.userNbr + "人房";
            if (this.info.gameId == 4124 || this.info.gameId == 4207 || this.info.gameId == 4149 || this.info.gameId == 4275 || this.info.gameId == 4123) {
                if (this.info.winnerConditions) {
                    this.bigWinText.text = "大赢家最低分数设置：" + this.info.winnerConditions;
                    this.bigWinText.visible = true;
                } else {
                    this.bigWinText.visible = false;
                }
            } else {
                this.bigWinText.visible = false;
            }
        }
        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.closeBtn) {
                super.removePop();
            }
        }
    }
}