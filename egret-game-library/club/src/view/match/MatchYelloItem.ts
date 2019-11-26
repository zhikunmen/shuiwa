module club {
	/**黄名单 */
	export class MatchYelloItem extends eui.ItemRenderer {
		//玩家1
		private nameLabel: eui.Label;
		private nameLabel_1: eui.Label;
		//玩家2
		private playerID: eui.Label;
		private playerID_1: eui.Label;

		//移除
		private removeButton: eui.WxButton
		constructor() {
			super();
			this.skinName = "MatchYelloItemSkin";
			this.removeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeHandel, this);
		}
		protected dataChanged(): void {
			let data: Cmd.YellowMemberInfo = this.data;
			if (!data)
				return;
			this.nameLabel.text = data.nickName ? data.nickName.toString() : "";
			this.playerID.text = data.uid ? data.uid.toString() : "";
			this.nameLabel_1.text = data.nickName2 ? data.nickName2.toString() : "";
			this.playerID_1.text = data.uid2 ? data.uid2.toString() : "";
		}
		/**移除黄名单 */
		private removeHandel(e: egret.TouchEvent): void {
			var req: Cmd.OperateYellowMemberListMatchGroupCmd_C = new Cmd.OperateYellowMemberListMatchGroupCmd_C();
			req.reply = 0;
			req.uid = Number(this.playerID.text);
			req.uid2 = Number(this.playerID_1.text);
			req.matchId = MatchManagePanel.Instanc.selectMatchId;
			NetMgr.tcpSend(req);
		}
	}
}