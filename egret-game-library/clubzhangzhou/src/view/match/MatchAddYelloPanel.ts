module club {
	export class MatchAddYelloPanel extends commonpanel.LobbyBaseEuiPanel {
		private uidEditableText: eui.EditableText//输入框
		private yesBtn: eui.Button;
		private cancleBtn: eui.Button;
		private uid: number;//需要绑定的玩家的uid
		private matchId: number
		/**
		 *绑定黄名单面板
		 */
		constructor(matchId: number, uid: number) {
			super("", 635, 391);
			this.skinName = "MatchAddYelloPanelSkin";
			this.matchId = matchId;
			this.uid = uid;
		}

		protected initUI() {
			this.uidEditableText.restrict = "0-9";
			this.uidEditableText.inputType = egret.TextFieldInputType.TEL;
		}

		protected addEvent() {
			this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.uidEditableText.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
		}

		protected removeEvent(): void {
			this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
			this.uidEditableText.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
		}

		//点击事件
		private onClick(e: egret.TouchEvent): void {
			if (e.target == this.yesBtn) {
				let text = this.uidEditableText.text;
				let uid = Number(text);
				if (uid == NaN || !uid) {
					uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID");
					return;
				}
				var req: Cmd.OperateYellowMemberListMatchGroupCmd_C = new Cmd.OperateYellowMemberListMatchGroupCmd_C();
				req.uid = this.uid;
				req.uid2 = uid;
				req.matchId = this.matchId;
				req.reply = 1;
				this.removePop();
				NetMgr.tcpSend(req);
			} else {
				this.removePop();
			}
		}

		public destroy(): void {
			super.destroy();
			this.uidEditableText = null;
		}
	}
}