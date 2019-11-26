/**gameRadionButton */
module playlist {
	export class RadioButton extends eui.ItemRenderer {
		private labelDisplay: eui.Label;
		public constructor() {
			super();
			this.skinName = "playlist.RadioButtonSkin";
			this.touchChildren = false;
			this.touchEnabled = true;
		}
		protected dataChanged() {
			let data = this.data;
			let gameData = MJLobbyData.getInstance().getGameCreateConfig(data);
			this.labelDisplay.text = gameData.gameName;
		}
	}
}