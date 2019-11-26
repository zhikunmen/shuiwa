module match {

    export class WxTopOpBtn extends eui.Component {

        public diamond_btn: eui.WxButton;
        public gold_btn: eui.WxButton;
        public ticket_btn: eui.WxButton;
        public static HAS_HPW_MATCH: boolean = true;

        constructor() {
            super();
            this.skinName = "WxTopOpBtnSkin";
        }


        public gold2str(gold: number) {
            if (gold > 100000000) {
                return Math.floor(gold / 10000000) / 10 + "亿";
            }
            else if (gold > 10000000) {
                return Math.floor(gold / 1000) / 10 + "万";
            }
            else if (gold > 100000) {
                return Math.floor(gold / 100) / 100 + "万";
            }
            else {
                return gold.toString();
            }
        }


        public childrenCreated() {
            super.childrenCreated();
            this.diamond_btn.label = uniLib.UserInfo.chips.toString();
            this.ticket_btn.label = uniLib.UserInfo.giftCoupon.toString();
            this.gold_btn.label = this.gold2str(uniLib.UserInfo.goldChips);

            /**好牌网 */
            if (MJLobbyData.getInstance().lobbyId == 41) {
                this.gold_btn.label = uniLib.UserInfo.fangka.toString();
            }

            if(uniLib.Global.is_sandbox != 0)
                this.ticket_btn.visible = false;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
        }

        private onUserInfoChanged(evt: uniLib.ZqEvent): void {
            if (this.diamond_btn) {
                this.diamond_btn.label = uniLib.UserInfo.chips.toString();
            }
            if (this.ticket_btn) {
                this.ticket_btn.label = uniLib.UserInfo.giftCoupon.toString();
            }
            if (MJLobbyData.getInstance().lobbyId == 41) //好牌网没有金币 有房卡
                this.gold_btn.label = uniLib.UserInfo.fangka.toString();
            else
                this.gold_btn.label = this.gold2str(uniLib.UserInfo.goldChips);
        }

        protected onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.diamond_btn) {
                LobbyModuleMgr.getInstance().showMarketPanel(0);
            }
            else if (evt.target == this.ticket_btn) {
                if (WxTopOpBtn.HAS_HPW_MATCH == false)
                    return;
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_MATCH, () => { OnGetSceneInfoHpMatchCmd_C(BigSceneType.TYPE_MATCH, GameId.ID_MATCH_PIG); });
            }
            else if (evt.target == this.gold_btn) {
                LobbyModuleMgr.getInstance().showMarketPanel(1);
            }
        }

        public destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
        }
    }
}