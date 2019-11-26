module friendsclub {
	/**
	 * 成员列表item
	 */
	export class MatchMemberItem extends eui.ItemRenderer {
	   private nameLabel: eui.Label;
        private playertype: eui.Label;
        private playerID: eui.Label;
        private num: eui.Label;
        private headImg: eui.Image;
        private bg: eui.Image;
        private changeBtn: eui.Button;
        constructor() {
            super();
            this.skinName = "MatchMemberItemSkin";
        }
        protected dataChanged(): void {
            let data: Cmd.MatchGroupMemberInfo = this.data;
            this.nameLabel.text = data.nickname;
            this.playerID.text = data.uid.toString();
            this.playertype.text = DataManage.MatchMemberTypeToString(data.type);
            this.num.text = (this.itemIndex + 1) + "";
            if (this.itemIndex % 2 == 0) {
                this.bg.source = "club_manage_applyitem1";
            }
            if (data.headUrl) {
                this.headImg.source = data.headUrl;
            }
            this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTap, this);
        }
        private onLabelTap(e: egret.TouchEvent) {
            let data: Cmd.MatchGroupMemberInfo = this.data;
            var inputPanel: ClubManageChangeBWPanel = new ClubManageChangeBWPanel(data);
            uniLib.PopUpMgr.addPopUp(inputPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
	}
}