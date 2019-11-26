module clubnew {
	/**
	 * 每个匹配场中的桌子
	 */
	export class MatchTableItem extends eui.ItemRenderer {
		private contentLabel: eui.Label;
		private _gamename: eui.Label;
		private _gametype: eui.Label;
		private _gamenum: eui.Label;
		public info: Cmd.MathGroupRoomInfo;
		constructor() {
			super();
			this.skinName = "MatchTableItemSkin"
		}
		protected dataChanged(): void {
			this.info = this.data;
			let member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
			this.contentLabel.text = this.info.roomId + "";
			if (this.info.endTime != undefined) {//已结束
				this._gametype.text = "游戏结束";
				this._gametype.textColor = 0Xa1a1a1;
			} else {
				if (!this.info.state) {//准备中
					this._gametype.text = "等待中";
					this._gametype.textColor = 0X47db74;
				} else if (this.info.state == 1) {//已开局
					this._gametype.text = "游戏中";
					this._gametype.textColor = 0XFDBE85;
				}
			}
			this._gamename.text = "包厢" + this.info.floorId + "(" + this.info.gameName + ")"
			this._gamenum.text = member + "/" + this.info.userNbr;
		}
	}
}