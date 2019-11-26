module clubnew {
	export class ActiveRoomListItem extends eui.Component {
		private eliminate: eui.WxButton;
		private playerNameLaber: eui.Label;
		private playerName: eui.Label;
		private playerScoreLaber: eui.Label;
		private playerScore: eui.Label;
		private _data: Cmd.MatchGroupMemberInfo;
		//房间号
		private _roomId: number;
		constructor() {
			super();
			this.skinName = "ActiveRoomListItemSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		public setData(data: Cmd.MatchGroupMemberInfo, roomId: number) {
			this._data = data;
			this._roomId = roomId;
			if (data.score != undefined)
				this.playerScore.text = data.score.toString();
			this.playerName.text = data.nickname;
			this.eliminate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eliminatePlayer, this);
		}

		//房主踢人方法
		private eliminatePlayer(e: egret.TouchEvent) {
			let rev: Cmd.KickLeaveRoomCmd_C = new Cmd.KickLeaveRoomCmd_C();
			rev.uid = this._data.uid;
			if (this.name != "") {
				rev.matchId = Number(this.name);
			}
			rev.roomId = this._roomId;
			NetMgr.tcpSend(rev);
			uniLib.PopUpMgr.removePopUp(ActiveRoomInformationPanel);

		}

		public setEliminateVisible(show: boolean) {
			this.eliminate.visible = show;
		}

		public destroy(): void {
			if (this.eliminate) {
				this.eliminate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.eliminatePlayer, this)
			}
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}