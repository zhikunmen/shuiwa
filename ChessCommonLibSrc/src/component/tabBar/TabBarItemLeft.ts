module chessCommonLib {
	export class TabBarItemLeft extends eui.ItemRenderer {
		public labelDisplay: eui.Label;
		public blabelDisplay: eui.BitmapLabel;
		constructor() {
			super();
			this.skinName = "TabItemLeftSkin";
		}

		public dataChanged(): void {

		}
	}
}