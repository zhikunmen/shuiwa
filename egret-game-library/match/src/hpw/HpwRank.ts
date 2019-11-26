module match {
    export class HpwRank extends eui.Component {

        public ticketGame_btn: match.BaseButton;
        public revPackage_btn: match.BaseButton;
        public packageGame_btn: match.BaseButton;
        public record_btn: match.BaseButton;
        public notice_btn: match.BaseButton;
        public ret_btn: match.BaseButton;
        public rank_lst: eui.List;

        public myRank_lbl: eui.Label;
        public myPoint_lbl: eui.Label;
        public head_img: eui.Image;

        constructor() {
            super();
            this.width = uniLib.Global.screenWidth;
            this.skinName = "HpwRankSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            uniLib.Global.addEventListener(EVENT_RANKINFO, this.onDataHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.rank_lst.itemRenderer = HpwRankItem;
            this.head_img.source = uniLib.UserInfo.headUrl;
        }

        private onTouchHandler(evt: egret.Event) {
            if (evt.target == this.ret_btn) {
                this.destroy();
            }
            else if (evt.target == this.ticketGame_btn) {
                OnRequestRankListHpMatchCmd_C();
                uniLib.PopUpMgr.addPopUp(HpwGameList, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, 1);
            }
            else if (evt.target == this.revPackage_btn) {
                OnGetRedPackRewardInfoLobbyCmd_C();
                uniLib.PopUpMgr.addPopUp(HpwPackageReward, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
            }
            else if (evt.target == this.packageGame_btn) {
                OnRequestRankListHpMatchCmd_C();
                uniLib.PopUpMgr.addPopUp(HpwGameList, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, 2);
            }
            else if (evt.target == this.record_btn) {
                OnRequestHistoryHpMatchCmd_C(1, 0);
                uniLib.PopUpMgr.addPopUp(HpwGameRecord, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
            }
            else if (evt.target == this.notice_btn) {

            }
        }

        private onDataHandler(evt: uniLib.ZqEvent) {
            let data: Cmd.RequestRankInfoHpMatchCmd_S = evt.param;
            this.myPoint_lbl.text = data.myRank.point ? data.myRank.point.toString() : "0";
            this.myRank_lbl.text = data.myRank.rank ? data.myRank.rank.toString() : "未上榜";
            this.rank_lst.dataProvider = new eui.ArrayCollection(data.rankInfos.length ? data.rankInfos : []);
            this.rank_lst.dataProviderRefreshed();
        }

        public destroy() {
            uniLib.Global.removeEventListener(EVENT_RANKINFO, this.onDataHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.PopUpMgr.removePopUp(this);
        }
    }
}