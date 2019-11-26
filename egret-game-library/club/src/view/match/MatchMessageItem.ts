module club {
	/**
	 * 消息列表item
	 */
	export class MatchMessageItem extends eui.ItemRenderer {
		private contenLabel: eui.Label;
		private contenRemarks: eui.Label;
		private disAgreeButton: eui.WxButton;
		private agreeButton: eui.WxButton;
		private blackButton: eui.WxButton;
		private whiteButton: eui.WxButton;
		constructor() {
			super();
			this.skinName = "MatchMessageItemSkin";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected dataChanged(): void {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			this.contenLabel.text = "玩家" + data.nickname + "请求加入老友圈？";
			if (data.note) {
				this.contenRemarks.text = "备注：" + data.note + "";
			} else {
				this.contenRemarks.text = "备注：无";
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			if (e.target == this.disAgreeButton) {
				let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
				cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
				cmd.reply = 0;
				cmd.uid = data.uid;
				NetMgr.tcpSend(cmd);
			}
			else if (e.target == this.agreeButton) {
				let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
				cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
				cmd.reply = 1;
				cmd.uid = data.uid;
				NetMgr.tcpSend(cmd);
			}
			else if (e.target == this.blackButton) {
				let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
				cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
				cmd.reply = 3;
				cmd.uid = data.uid;
				NetMgr.tcpSend(cmd);
			}
			else if (e.target == this.whiteButton) {
				let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
				cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
				cmd.reply = 2;
				cmd.uid = data.uid;
				NetMgr.tcpSend(cmd);
			}
		}
	}
}