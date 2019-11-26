module club {
	/**
	 * 每个老友圈中的桌子
	 */
	export class ClubItemDesk extends eui.ItemRenderer {
		private deskGroup: eui.Group;
		private personTxet: eui.Label;
		private createGroup: eui.Group;
		private head: eui.Image;
		private headbg1: eui.Image;
		private headbg2: eui.Image;
		private headbg3: eui.Image;
		private headbg4: eui.Image;
		private kuang1: eui.Image;
		private kuang3: eui.Image;
		private kuang4: eui.Image;
		private kuang2: eui.Image;
		private state: eui.Image;
		public info: Cmd.MathGroupRoomInfo;
		private gamesNumberText: eui.Label;
		constructor() {
			super();
			this.skinName = ClubData.getInstance().clubStyle == CLUBSTYLE.ZHANGZHOU ? "ClubItemDeskSkin" : "gd_ClubItemDeskSkin";
		}
		protected dataChanged(): void {
			this.info = this.data;
			let style = ClubData.getInstance().clubStyle
			if (this.info.state && this.info.state == 9) {
				if (!style) {//漳州那套
					this.createGroup.visible = true;
					this.deskGroup.visible = false;
				} else {
					this.personTxet.visible = this.state.visible = this.head.visible = this.gamesNumberText.visible = false;
				}
			}
			else if (this.info.state && this.info.state == 8) {
				style == CLUBSTYLE.ZHANGZHOU && (this.createGroup.visible = false);
				this.deskGroup.visible = true;
				this.personTxet.visible = this.state.visible = this.head.visible = this.gamesNumberText.visible = false;
			}
			else {
				style == CLUBSTYLE.ZHANGZHOU && (this.createGroup.visible = false);
				this.deskGroup.visible = true;
				this.gamesNumberText.visible = false;
				let member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
				this.personTxet.text = member + "/" + this.info.userNbr;
				if (this.info.list && Array.isArray(this.info.list)) {
					for (let i = 0; i < this.info.list.length; i++) {
						if (i == 4) {
							break;
						}
						this[`headbg${i + 1}`].visible = true;
						this[`headbg${i + 1}`].source = this.info.list[i].headUrl;
						style == CLUBSTYLE.GUANGDONG && (this[`kuang${i + 1}`].visible = true);
					}
				}
				if (!this.info.state) {//准备中
					this.state.source = "club_waiting";
				} else if (this.info.state == 1) {//已开局
					this.state.source = "club_ingame";
					this.state.y -= 15;
					this.head.y -= 10;
					this.personTxet.y -= 10;
					this.gamesNumberText.visible = true;
					this.gamesNumberText.text = "第" + this.info.curGameNbr + "/" + this.info.gameNbr + "局";
					if (this.info.gameNbr >= 49) {
						this.gamesNumberText.text = "第" + this.info.curGameNbr + "局";
					}
				}
			}

		}
	}
}