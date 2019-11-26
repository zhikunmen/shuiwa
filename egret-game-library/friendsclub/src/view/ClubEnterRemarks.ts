module friendsclub {
	/**
   *第一次进入亲友圈的玩家检验，加备注
   */
	export class ClubEnterRemarks extends commonpanel.LobbyBaseEuiPanel {
		private clubText: eui.Label;
		private remarksText: eui.EditableText;
		private roomId: number;
		private lobbyId: number;
		private preBestRoomId: number;
		private yesBtn: eui.Button;
		constructor() {
			super();
			this.skinName = "ClubEnterRemarksSkin";
		}
		protected addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
			uniLib.Global.addEventListener(ClubConst.NotifyImportNoteCmd, this.setDate, this);
			this.remarksText.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
		}
		protected removeEvent() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
			uniLib.Global.removeEventListener(ClubConst.NotifyImportNoteCmd, this.setDate, this);
			this.remarksText.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
		}
		public setDate(evt: uniLib.ZqEvent): void {
			var Data = evt.param as Cmd.NotifyImportNoteCmd_S;
			this.roomId = Data.roomId;
			this.lobbyId = Data.lobbyId;
			this.preBestRoomId = Data.preBestRoomId;
			this.clubText.text = "您正在申请进入亲友圈“" + this.roomId + "”";
		}
		private onClickTap(e: egret.TouchEvent) {
			if (e.target == this.yesBtn) {
				let cmd = new Cmd.EnterRoomCmd_C();
				cmd.lobbyId = this.lobbyId;
				cmd.roomId = this.roomId;
				cmd.preBestRoomId = this.preBestRoomId;
				let text = this.remarksText.text;
				if (this.remarksText) {
					cmd.note = text;
				}
				else {
					cmd.note = "";
				}
				NetMgr.tcpSend(cmd);
				this.removePop();
			}
		}
	}
}