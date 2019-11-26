module friendsclub {
    export class ClubManageChangeBWPanel extends commonpanel.LobbyBaseEuiPanel {

        private closeBtn: eui.Button;
        private idTxt: eui.Label;
        private nameTxt: eui.Label;
        private sureBtn: eui.Button;
        private youkeBtn: eui.RadioButton;
        private blackBtn: eui.RadioButton;
        private whiteBtn: eui.RadioButton;
        private chosenum: number;
        private playerinfo: Cmd.MatchGroupMemberInfo;
        constructor(player: Cmd.MatchGroupMemberInfo) {
            super();
            this.skinName = "ClubManageChangeBWSkin";
            this.playerinfo = player;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public destroy(): void {
            super.destroy();

        }
        protected initUI() {
            this.updateDate();
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);

        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public updateDate(): void {
            this.idTxt.text = this.playerinfo.uid + "";
            this.nameTxt.text = this.playerinfo.nickname;
            switch (this.playerinfo.type) {
                case 0: this.youkeBtn.selected = true; break;
                case 1: this.whiteBtn.selected = true; break;
                case 2: this.blackBtn.selected = true; break;
            }
            this.switch();

        }
        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.sureBtn) {
                let cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                cmd.reply = this.chosenum;
                cmd.uid = this.playerinfo.uid;
                cmd.matchId = ClubManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.youkeBtn
                || e.target == this.whiteBtn
                || e.target == this.blackBtn) {
                (<eui.RadioButton>e.target).selected = true;
                this.switch();
            }
        }
        private switch() {
            if (this.youkeBtn.selected == true) {
                this.chosenum = 0;
            }
            else if (this.whiteBtn.selected == true) {
                this.chosenum = 2;

            }
            else if (this.blackBtn.selected == true) {
                this.chosenum = 3;

            }
        }
    }
}