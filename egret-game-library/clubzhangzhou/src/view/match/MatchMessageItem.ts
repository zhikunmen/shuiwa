module club {
	/**
	 * 消息列表item
	 */
	export class MatchMessageItem extends eui.ItemRenderer {
		/**时间 */
		private _timeText: eui.Label;
		/**同意按钮 */
		private _agreeButton: eui.Button;
		/**拒绝按钮 */
		private _disAgreeButton: eui.Button;
		/**玩家昵称 */
		private _nameText: eui.Label;
		/**备注信息 */
		private _contenRemarksText: eui.Label;
		/**玩家Id */
		private _idText: eui.Label;
		/**玩家头像 */
		private _headImg: eui.Image;

		/**合作群组员Id */
		private _partnerIdText: eui.Label;
		/**合作群组员头像 */
		private _partnerHeadImg: eui.Image;
		/**合作群组员昵称 */
		private _partnerNameText: eui.Label;
		/** 合作群group*/
		private _partnerGroup: eui.Group;
		/** 没有合作群信息*/
		private _nopartnerTips: eui.Label;
		constructor() {
			super();
			this.skinName = "MatchMessageItemSkin";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected dataChanged(): void {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(data.time);
			this._headImg.source = data.headUrl;
			this._nameText.text = data.nickname;
			this._idText.text = data.uid + "";
			if (data.partner) {
				this._partnerGroup.visible = true;
				this._nopartnerTips.visible = false;
				this._partnerHeadImg.source = data.partner.headUrl;
				this._partnerIdText.text = "" + data.partner.uid;
				this._partnerNameText.text = data.partner.nickname;
			} else {
				this._nopartnerTips.visible = true;
				this._partnerGroup.visible = false;
			}
			if (data.note) {
				this._contenRemarksText.text = "备注：" + data.note + "";
			} else {
				this._contenRemarksText.text = "备注：无";
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			switch (e.target) {
				case this._disAgreeButton:
					ClubSendMgr.ReplyJoinMemberListMatchGroupCmd(ClubData.getInstance().clubmatchid, 0, data.uid);
					break;
				case this._agreeButton:
					ClubSendMgr.ReplyJoinMemberListMatchGroupCmd(ClubData.getInstance().clubmatchid, 1, data.uid);
					break;
			}
		}
	}
}