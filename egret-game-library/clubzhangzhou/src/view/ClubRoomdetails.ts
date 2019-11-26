module club {
	/**
	 * 单个房间详情
	 */
	export class ClubRoomdetails extends commonpanel.LobbyBaseEuiPanel {
		private info: Cmd.MathGroup;
		private roomInfo: Cmd.MathGroupRoomInfo;
		/**邀请按钮 */
		private _inviteBtn: eui.WxButton;
		/**加入按钮 */
		private _enterRoomBtn: eui.WxButton;
		/**关闭按钮 */
		private _closeBtn: eui.Button;
		/**玩家list */
		private _userList: eui.List;
		/**桌号 */
		private _deskIdText: eui.Label;
		/**时间 */
		private _timeText: eui.Label;

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
			this._timeText.text = "";
			this._deskIdText.text = "";

		}
		public setUserDate(userDate: Cmd.MathGroupRoomInfo) {
			if (!userDate)
				return;
			this.roomInfo = userDate;
			this._inviteBtn.visible = false;
			this._enterRoomBtn.x = 430;
			var timestamp = new Date().getTime();
			// if (this.roomInfo.beginTime) {
			//     this._timeText.text = "开房时间:" + LobbyUtils.changeTimeToStr(timestamp);
			// }

			if (this.roomInfo.roomId) {
				this._deskIdText.text = "桌号:" + this.roomInfo.roomId;
				this._timeText.text = "当前时间:" + LobbyUtils.changeTimeToStr(timestamp);
			}
			let list: Cmd.MatchGroupMemberInfo[] = [];
			if (ClubData.getInstance().isClubManage) {
				this._inviteBtn.visible = true;
				this._enterRoomBtn.x = 600;
			}
			if (Array.isArray(userDate.list)) {
				list = this.roomInfo.list.concat();
			}
			if (this.roomInfo.state == 1) {
				this._enterRoomBtn.visible = false;
				this._inviteBtn.visible = false;
				// this._timeText.text = "开局时间:" + LobbyUtils.changeTimeToStr(this.roomInfo.beginTime);
			} else {
				let listlength = list.length;
				for (let i = 0; i < this.roomInfo.userNbr - listlength; i++) {
					let user = new Cmd.MatchGroupMemberInfo();
					user.state = ClubConst.DESK_NOUSER;
					list.push(user);
				}
			}
			this._userList.itemRenderer = ClubRoomdetailshead;
			this._userList.dataProvider = new eui.ArrayCollection(list);
			this.roomInfo.beginTime;
		}
		private onClickTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this._closeBtn:
					super.removePop();
					break;
				case this._enterRoomBtn:
					this.dispatchEventWith(ClubUIEventConst.JOIN_CLUBROOM);
					let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
					if (this.roomInfo.roomId) {
						req.preBestRoomId = this.roomInfo.roomId;
					}
					else {
						req.preBestRoomId = 0;
					}
					req.roomId = this.info.matchId;
					NetMgr.tcpSend(req);
					super.removePop();
					break;
				case this._inviteBtn:
					if (this.roomInfo.roomId) {
						ClubModuleMgr.getInstance().showClubInvitePanel(this.roomInfo.roomId);
					} else {
						ClubModuleMgr.getInstance().showClubInvitePanel();
					}
					super.removePop();
					break;
			}
		}
	}
}