module club {
	/**老友圈所有房间面板 */
	export class ClubAllBoxPanel extends commonpanel.LobbyBaseEuiPanel {
		private msgImg2: eui.Image;  //提示
		private boxList: eui.List;
		private closeBtn: eui.WxButton;
		private joinBtn: eui.WxButton;
		private createBtn: eui.WxButton;
		private _clubList: Cmd.MatchGroupInfo[];
		constructor() {
			super("mjl_club_title_png",1150,650);
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
			this.msgImg2.visible = true;
			this.boxList.useVirtualLayout = false;
			uniLib.Global.addEventListener(ClubConst.HistoryMatchIdList, this.setData, this);
		}
		protected addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
			// this.boxList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
		}
		protected removeEvent() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
			// this.boxList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
		}
		public setData(evt: uniLib.ZqEvent) {
			let date = evt.param as Cmd.HistoryMatchIdListMatchGroupCmd_S;
			if (!date)
				return;
			if (date.list.length >= 1) {
				this.msgImg2.visible = false;
			} else {
				this.msgImg2.visible = true;
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
				// uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
				ClubModuleMgr.getInstance().removeClubDeskPanel();
				ClubModuleMgr.getInstance().showCreateClubPanel();
			}
			else if (e.target == this.joinBtn) {
				super.removePop();
				// uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
				ClubModuleMgr.getInstance().removeClubDeskPanel();
				LobbyModuleMgr.getInstance().showJoinRoomPanel(() => {
					let req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
					NetMgr.tcpSend(req);
				});
			}
		}
		// private itemTap(evt: eui.ItemTapEvent) {
		//     let item = this.boxList.selectedItem as Cmd.MatchGroupInfo;
		//     let cmd = new Cmd.RequestMatchGroupCmd_C();
		//     cmd.matchId = item.matchId;
		//     cmd.isClub = 1;
		//     NetMgr.tcpSend(cmd);
		// }

	}
}