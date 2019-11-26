module friendsclub {
	/**
	 * 单个房间详情
	 */
	export class ClubRoomdetails extends commonpanel.LobbyBaseEuiPanel {
		private gameText: eui.Label;
		private pnumberText: eui.Label;
		private playText: eui.Label;
		private closeBtn: eui.Button;
		private enterRoomBtn: eui.Button;
		private info: Cmd.MathGroup;
		private userInfo: Cmd.MathGroupRoomInfo;
		private headList: eui.List;
		private _head: Cmd.MatchGroupMemberInfo[] = [];
		constructor() {
			super();
			this.skinName = "ClubRoomdetailsSkin";
		}
		protected initUI() {
		}

		protected addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected removeEvent() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public setDate(date: Cmd.MathGroup) {
			if (!date)
				return;
			this.info = date;
			this.gameText.text = this.info.gameName;
			this.playText.text = this.info.playTypeDesc;
			this.pnumberText.text = "0/" + this.info.userNbr;
		}
		public setUserDate(userDate: Cmd.MathGroupRoomInfo) {
			if (!userDate)
				return;
			this.userInfo = userDate;
			this._head = userDate.list;
			if (Array.isArray(this._head)) {
				this.headList.itemRenderer = ClubRoomdetailshead;
				this.headList.dataProvider = new eui.ArrayCollection(this._head);
				this.pnumberText.text = this._head.length + "/" + this.userInfo.userNbr;
				if (this.userInfo.playTypeDesc) {
					this.playText.text = this.userInfo.playTypeDesc;
				}
				if (this.userInfo.userNbr == this._head.length) {
					this.enterRoomBtn.visible = false;
				}
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			if (e.target == this.closeBtn) {
				super.removePop();
			}
			else if (e.target == this.enterRoomBtn) {
				this.dispatchEventWith(ClubUIEventConst.JOIN_CLUBROOM);
				let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
				if (this.userInfo.roomId) {
					req.preBestRoomId = this.userInfo.roomId;
				}
				else {
					req.preBestRoomId = 0;
				}
				req.floorId = this.info.floorId;
				req.roomId = this.info.matchId;
				NetMgr.tcpSend(req);
				super.removePop();
			}
		}
	}
}