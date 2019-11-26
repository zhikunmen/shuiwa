module club {
	/**
	 * 游戏列表
	 */
	export class MatchRadioButton extends eui.ItemRenderer {
		/**俱乐部号 */
		private _clubId: eui.Label;
		/**背景图 */
		private _itemBg: eui.Image;
		constructor() {
			super();
			this.skinName = "MatchRadioButtonSkin";
		}
		protected dataChanged(): void {
			let data = this.data;
			this._clubId.text = data + "";
			if (this.itemIndex % 2 == 0) {
				this._itemBg.source = "club_new_menage_json.club_matchlist_item2";
			} else {
				this._itemBg.source = "club_new_menage_json.club_matchlist_item1";
			}
		}
	}
}