module club {
	/**
	 * 每个匹配场中的桌子
	 */
	export class MatchTableItem extends eui.ItemRenderer {
		private contentLabel: eui.Label;
		public info: Cmd.MathGroupRoomInfo;
		constructor() {
			super();
			this.skinName = "MatchTableItemSkin";
		}
		protected dataChanged(): void {
			this.info = this.data;
			let member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
			let text = "桌" + this.info.roomId + "\n";
			if (this.info.endTime != undefined) {//已结束
				text += "(牌局结束)"
			} else {
				if (!this.info.state) {//准备中
					text += "(准备中)";
				} else if (this.info.state == 1) {//已开局
					text += "(游戏" + this.info.curGameNbr + "/" + this.info.gameNbr + ")";
				}
			}
			text += "\n人数" + member + "/" + this.info.userNbr;

			this.contentLabel.text = text;
		}
	}
}