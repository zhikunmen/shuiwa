module club {
	/**
	 * 查看玩家个人信息面板
	 */
	export class ClubUserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
		/** 关闭按钮*/
		private _closeBtn: eui.Button;
		/**踢出按钮 */
		private _kickBtn: eui.Button;
		/** 昵称*/
		private nameTxt: eui.Label;
		/**ID */
		private idTxt: eui.Label;
		/**头像 */
		private headImg: eui.Image;
		private info: Cmd.MatchGroupMemberInfo;
		constructor(Data: Cmd.MatchGroupMemberInfo) {
			super();
			this.skinName =  "ClubUserInfoSkin";
			this.info = Data;
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		protected addEvent(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}

		protected removeEvent(): void {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
		}
		protected initUI(): void {
			this.headImg.source = this.info.headUrl;
			this.nameTxt.text = this.info.nickname;
			this.idTxt.text = "ID：" + this.info.uid;
		}
		private onClick(evt: egret.TouchEvent): void {
			switch (evt.target) {
				case this._closeBtn:
					super.removePop();
					break;
				case this._kickBtn:
					let cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
					cmd.reply = 0;
					cmd.uid = this.info.uid;
					cmd.matchId = ClubData.getInstance().clubmatchid;
					NetMgr.tcpSend(cmd);
					super.removePop();
					break;
			}
		}
	}
}