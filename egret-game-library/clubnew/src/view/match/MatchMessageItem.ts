module clubnew {
	/**
	 * 消息列表item
	 */
	export class MatchMessageItem extends eui.ItemRenderer {
		private bg: eui.Image;
		private contenLabel: eui.Label;
		private contenRemarks: eui.Label;
		private headImg: eui.Image;
		private sonid: eui.Label;
		private disAgreeButton: eui.WxButton;
		private agreeButton: eui.WxButton;
		constructor() {
			super();
			this.skinName = "MatchMessageItemSkin";
			this.addEvent();
		}

		private addEvent(){
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}

		public destroy(){
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}

		protected dataChanged(): void {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			this.contenLabel.text = data.nickname + "";
			if (data.note) {
				this.contenRemarks.text = "备注：" + data.note + "";
			} else {
				this.contenRemarks.text = "备注：无";
			}
			if (data.headUrl) {
				this.headImg.source = data.headUrl;
			}
			if (this.itemIndex % 2 == 0) {
				this.bg.source = "club_manage_applyitem2";
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			if (e.target == this.disAgreeButton) {
				let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
				cmd.matchId = ClubManagePanel.Instanc.selectMatchId;
				cmd.reply = 0;
				cmd.uid = data.uid;
				NetMgr.tcpSend(cmd);
			}
			else if (e.target == this.agreeButton) {
				let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
				cmd.matchId = ClubManagePanel.Instanc.selectMatchId;
				cmd.reply = 1;
				cmd.uid = data.uid;
				NetMgr.tcpSend(cmd);
			}
		}
	}
}