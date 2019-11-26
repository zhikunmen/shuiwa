module club {
	/**
	 * 战况item
	 */
	export class MatchFightingItem extends eui.ItemRenderer {
		private tableNoLabel: eui.Label;
		private tableIdLabel: eui.Label;
		private timeLabel: eui.Label;
		private nameGroup: eui.Group;
		private scoreGroup: eui.Group;
		private nameandscore: eui.List;
		constructor() {
			super();
			this.skinName = "MatchFightingItemSkin";
		}
		protected dataChanged(): void {
			let data: Cmd.MathGroupRoomInfo = this.data;
			this.tableNoLabel.text = (this.itemIndex + 1) + "";
			this.tableIdLabel.text = "桌号" + data.roomId + "";
			this.timeLabel.text = LobbyUtils.changeTimeToStr(data.beginTime) + "~" + LobbyUtils.changeTimeToStr(data.endTime);
			let item = data.list;
			this.nameandscore.itemRenderer = MatchFightingNSPanel;
			this.nameandscore.dataProvider = new eui.ArrayCollection(item);

		}
	}
}