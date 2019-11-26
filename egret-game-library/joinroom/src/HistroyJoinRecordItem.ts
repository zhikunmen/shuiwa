module joinroom {
	/**
	 * 单个历史记录
	 */
	export class HistroyJoinRecordItem extends eui.ItemRenderer {
		private roomInfo: eui.Label;
		private detailsBtn: eui.WxButton;
		private joinBtn: eui.WxButton;
		private _boo: boolean = false;
		constructor() {
			super();
			this.skinName = "HistroyJoinItemSkin";
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandle, this);
		}
		protected dataChanged() {
			let data: Cmd.MatchGroupInfo = this.data;
			var name = data.matchName != null ? data.matchName : data.matchId;
			this.roomInfo.text = "老友圈ID:" + data.matchId + "\n老友圈名称:" + name;
		}
		private showInfo() {
			this._boo = !this._boo;
			let data: Cmd.MatchGroupInfo = this.data;
			var name = data.matchName != null ? data.matchName : data.matchId;
			if (this._boo) {
				this.roomInfo.text = data.desc;
			} else {
				this.roomInfo.text = "老友圈ID:" + data.matchId + "\n老友圈名称:" + name;
			}
		}
		private clickHandle(e: egret.TouchEvent) {
			if (e.target == this.detailsBtn) {
				this.showInfo();
			} else if (e.target == this.joinBtn) {
				MsgSendMgr.enterRoom(this.data.matchId, -1);
				uniLib.PopUpMgr.removePopUp(JoinRoomPanel);
			}
		}
	}
}