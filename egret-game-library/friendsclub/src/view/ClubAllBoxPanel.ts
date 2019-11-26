module friendsclub {
	/**亲友圈所有房间面板 */
	export class ClubAllBoxPanel extends commonpanel.LobbyBaseEuiPanel {
		private msgText: eui.Image;  //提示
		private boxList: eui.List;
		private closeBtn: eui.WxButton;
		private joinBtn: eui.WxButton;
		private createBtn: eui.WxButton;
		private _clubList: Cmd.MatchGroupInfo[];
		constructor() {
			super();
			this.skinName = "ClubAllBoxSkin";
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		public destroy() {
			super.destroy();
			uniLib.Global.removeEventListener(ClubConst.HistoryMatchIdList, this.setData, this);

		}
		public initUI() {
			this.msgText.visible = true;
			this.boxList.useVirtualLayout = false;
			uniLib.Global.addEventListener(ClubConst.HistoryMatchIdList, this.setData, this);
		}
		protected addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected removeEvent() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public setData(evt: uniLib.ZqEvent) {
			let date = evt.param as Cmd.HistoryMatchIdListMatchGroupCmd_S;
			if (!date)
				return;
			if (date.list.length >= 1) {
				this.msgText.visible = false;
			} else {
				this.msgText.visible = true;
			}
			this._clubList = date.list;
			for (let i = 0; i < this._clubList.length; i++) {
				this._clubList[i].index = i + 1;
			}
			this.boxList.itemRenderer = ClubBoxItem;
			this.boxList.dataProvider = new eui.ArrayCollection(this._clubList);
		}
		private onClickTap(e: egret.TouchEvent) {
			if (e.target == this.closeBtn) {
				super.removePop();
			}
			else if (e.target == this.createBtn) {
				super.removePop();
				ClubModuleMgr.getInstance().removeClubDeskPanel();
				let cmd = new Cmd.GetNormalGameListRoomCmd_C();
				cmd.isClub = 1;
				cmd.lobbyId = MJLobbyData.getInstance().lobbyId;
				NetMgr.tcpSend(cmd);
			}
			else if (e.target == this.joinBtn) {
				super.removePop();
				ClubModuleMgr.getInstance().removeClubDeskPanel();
				LobbyModuleMgr.getInstance().showJoinRoomPanel(() => {
					let req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
					NetMgr.tcpSend(req);
				});
			}
		}
	}
}