module club {
	/**
	 * 每个老友圈中的桌子
	 */
	export class ClubItemDesk extends eui.ItemRenderer {
		private deskGroup: eui.Group;
		/**玩家人数 */
		private personTxet: eui.Label;
		/**桌面小人 */
		private head: eui.Image;
		/**座位框和头像 */
		private headbg1: eui.Image;
		private headbg2: eui.Image;
		private headbg3: eui.Image;
		private headbg4: eui.Image;
		private kuang1: eui.Image;
		private kuang2: eui.Image;
		private kuang3: eui.Image;
		private kuang4: eui.Image;
		private leave1: eui.Image;
		private leave2: eui.Image;
		private leave3: eui.Image;
		private leave4: eui.Image;
		/**游戏状态 */
		private state: eui.Image;
		/**局数 */
		private gamesNumberText: eui.Label;
		public info: Cmd.MathGroupRoomInfo;
		constructor() {
			super();
			this.skinName = "ClubItemDeskSkin";
		}
		protected dataChanged(): void {
			this.info = this.data;
			if (this.info.state && this.info.state == ClubConst.CLUB_DESKSHOW || this.info.state == ClubConst.CLUB_CREATEDESK) {
				this.deskGroup.visible = true;
				this.personTxet.visible = false;
				this.state.visible = false;
				this.head.visible = false;
				this.gamesNumberText.visible = false;
			}
			else {
				this.deskGroup.visible = true;
				this.gamesNumberText.visible = false;
				let member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
				this.personTxet.text = member + "/" + this.info.userNbr;
				if (this.info.list && Array.isArray(this.info.list)) {
					for (let i = 0; i < this.info.list.length; i++) {
						/**只显示四位头像 */
						if (i == 4) {
							break;
						}
						this[`headbg${i + 1}`].source = this.info.list[i].headUrl;
						this[`headbg${i + 1}`].visible = this.info.list[i].headUrl ? true : false;
						this[`kuang${i + 1}`].visible = this.info.list[i].headUrl ? true : false;
						if (this.info.list[i].state == 0) {
							this[`leave${i + 1}`].visible = true;
						} else {
							this[`leave${i + 1}`].visible = false;
						}
					}
				}
				if (!this.info.state) {//准备中
					this.state.source = "club_new_menage_json.club_waiting";
				} else if (this.info.state == 1) {//已开局
					this.state.source = "club_new_menage_json.club_ingame";
					this.gamesNumberText.visible = true;
					this.gamesNumberText.text = "第" + this.info.curGameNbr + "/" + this.info.gameNbr + "局";
					if (this.info.gameNbr >= 49) {
						this.gamesNumberText.text = "第" + this.info.curGameNbr + "课";
					}
				}
			}
		}
	}
}