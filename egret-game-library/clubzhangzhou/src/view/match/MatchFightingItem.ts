module club {
	/**
	 * 战况item
	 */
	export class MatchFightingItem extends eui.ItemRenderer {
		/**index编号 */
		private _tableNoText: eui.Label;
		/**桌号 */
		private _tableIdText: eui.Label;
		/**时间 */
		private _timeText: eui.Label;
		/**战绩列表 */
		private nameandscore: eui.List;
		/** 查看按钮*/
		private _detailBtn: eui.WxButton;

		private _info: Cmd.GameHistory;
		constructor() {
			super();
			this.skinName = "MatchFightingItemSkin";
			this.addListener();
		}
		public addListener() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public removeListener() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected dataChanged(): void {
			this._info = this.data;
			this._tableNoText.text = (this.itemIndex + 1) + "";
			this._tableIdText.text = "桌号" + this._info.roomId + "";
			this._timeText.text = LobbyUtils.changeTimeToStr(this._info.timeStamp);
			let item = this._info.userGameHistorys;
			this.nameandscore.itemRenderer = MatchFightingNSPanel;
			this.nameandscore.dataProvider = new eui.ArrayCollection(item);
			this._detailBtn.visible = true;
		}
		private onClickTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this._detailBtn:
					LobbyModuleMgr.getInstance().showRecordDetail(() => {
						ClubSendMgr.getGameDetailHistory(this._info.roomId);
					});
					MJLobbyData.getInstance().globalRoomId = this._info.roomId;
					break;
			}
		}
	}
}