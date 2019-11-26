module clubnew {
	/**
	 * 每个老友圈中的桌子
	 */
	export class ClubItemDesk extends eui.ItemRenderer {
		private deskGroup: eui.Group;
		private personTxet: eui.Label;
		private head: eui.Image;
		private headbg1: eui.Image;
		private headbg2: eui.Image;
		private headbg3: eui.Image;
		private headbg4: eui.Image;
		private kuang1: eui.Image;
		private kuang2: eui.Image;
		private kuang3: eui.Image;
		private kuang4: eui.Image;
		private state: eui.Image;
		public info: Cmd.MathGroupRoomInfo;
		private gamesNumberText: eui.Label;
		constructor() {
			super();
			this.skinName = "ClubItemDeskSkin";
		}
		protected dataChanged(): void {
			for (let i = 0; i < this.deskGroup.numChildren; i++) {
				this.deskGroup.getChildAt(i).visible = false;
			}
			this.info = this.data;
			if (this.info.state && this.info.state == 8) {
				this.personTxet.visible = this.head.visible = false;
				this.state.visible = false;
				this.gamesNumberText.visible = false;
			}
			else {
				this.gamesNumberText.visible = false;
				let member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
				this.personTxet.text = member + "/" + this.info.userNbr;
				this.head.visible = this.personTxet.visible = true;
				if (this.info.list && Array.isArray(this.info.list)) {
					for (let i = 0; i < this.info.list.length; i++) {
						if (i == 4) {
							break;
						}
						if (i == 0) {
							this.headbg1.source = this.info.list[i].headUrl;
							this.headbg1.width = 46;
							this.headbg1.height = 46;
							this.headbg1.visible = true;
							this.kuang1.visible = true;
						} else if (i == 1) {
							this.headbg2.source = this.info.list[i].headUrl;
							this.headbg2.width = 46;
							this.headbg2.height = 46;
							this.headbg2.visible = true;
							this.kuang2.visible = true;
						} else if (i == 2) {
							this.headbg3.source = this.info.list[i].headUrl;
							this.headbg3.width = 46;
							this.headbg3.height = 46;
							this.headbg3.visible = true;
							this.kuang3.visible = true;
						} else if (i == 3) {
							this.headbg4.source = this.info.list[i].headUrl;
							this.headbg4.width = 46;
							this.headbg4.height = 46;
							this.headbg4.visible = true;
							this.kuang4.visible = true;
						}
					}
				}
				if (!this.info.state) {//准备中
					this.state.source = "club_json.club_waiting";
					this.state.visible = true;
				} else if (this.info.state == 1) {//已开局
					this.state.source = "club_json.club_ingame";
					this.state.visible = true;
					this.gamesNumberText.visible = true;
					this.gamesNumberText.text = "   第" + this.info.curGameNbr + "/" + this.info.gameNbr + "局";
					if (this.info.gameNbr >= 49) {
						this.gamesNumberText.text = "   第" + this.info.curGameNbr + "局";
					}
				}
			}

		}
	}
}