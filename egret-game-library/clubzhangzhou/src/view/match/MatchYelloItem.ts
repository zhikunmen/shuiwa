module club {
	/**黄名单 */
	export class MatchYelloItem extends eui.ItemRenderer {
		/**玩家1 昵称*/
		private _nameText: eui.Label;
		/**玩家1 id */
		private _uidText: eui.Label;
		/** 玩家2 昵称*/
		private _nameText1: eui.Label;
		/** 玩家2 id*/
		private _uidText1: eui.Label;
		//移除
		private _removeButton: eui.WxButton;
		constructor() {
			super();
			this.skinName = "MatchYelloItemSkin";
			this._removeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeHandel, this);
		}
		protected dataChanged(): void {
			let data: Cmd.YellowMemberInfo = this.data;
			if (!data)
				return;
			this._nameText.text = data.nickName ? data.nickName.toString() : "";
			this._uidText.text = data.uid ? data.uid.toString() : "";
			this._nameText1.text = data.nickName2 ? data.nickName2.toString() : "";
			this._uidText1.text = data.uid2 ? data.uid2.toString() : "";
		}
		/**移除黄名单 */
		private removeHandel(e: egret.TouchEvent): void {
			var req: Cmd.OperateYellowMemberListMatchGroupCmd_C = new Cmd.OperateYellowMemberListMatchGroupCmd_C();
			req.reply = 0;
			req.uid = Number(this._uidText.text);
			req.uid2 = Number(this._uidText1.text);
			req.matchId = MatchManagePanel.Instanc.selectMatchId;
			NetMgr.tcpSend(req);
		}
	}
}