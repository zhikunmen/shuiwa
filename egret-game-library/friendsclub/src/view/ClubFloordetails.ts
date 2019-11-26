module friendsclub {
    /**楼层房间信息 */
    export class ClubFloordetails extends commonpanel.LobbyBaseEuiPanel {
        private gameText: eui.Label;
        private pnumberText: eui.Label;
        private gnumberText: eui.Label;
        private playText: eui.Label;
        private closeBtn: eui.Button;
        private enterRoomBtn: eui.Button;
        private info: Cmd.FloorInfo;       //切换房间的详情信息
        private deskInfo: Cmd.MathGroup;   //桌面的详情信息
        private headList: eui.List;
        constructor() {
            super();
            this.skinName = "ClubRoomdetailsSkin"
        }
        protected initUI() {
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public setDate(date: Cmd.FloorInfo) {
            if (!date)
                return;
            this.info = date;
            this.gameText.text = this.info.gameName;
            this.playText.text = this.info.playTypeDesc;
            this.pnumberText.text = this.info.userNbr + "人";
            this.enterRoomBtn.visible = false;
        }

        public setdeskDate(date: Cmd.MathGroup) {
            if (!date)
                return;
            this.deskInfo = date;
            this.gameText.text = this.deskInfo.gameName;
            this.playText.text = this.deskInfo.playTypeDesc;
            this.pnumberText.text = this.deskInfo.userNbr + "人";
            this.enterRoomBtn.visible = false;
        }
        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.closeBtn) {
                super.removePop();
            }
        }
    }
}
