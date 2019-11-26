module friendsclub {
	/**
	 * 游戏列表
	 */
	export class MatchRadioButton extends eui.ItemRenderer {
		private label: eui.Label;
		constructor() {
			super();
			this.skinName = "MatchRadioButtonSkin";
		}
		protected dataChanged(): void {
			let data = this.data;
			this.label.text = data + "";
		}
	}
}