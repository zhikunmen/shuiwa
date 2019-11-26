module chessCommonLib {
	export class TabBarItemRight extends eui.ItemRenderer {
		public labelDisplay: eui.Label;
		public blabelDisplay: eui.BitmapLabel;
		constructor() {
			super();
			this.skinName = "TabItemRightSkin";
		}

		public dataChanged(): void {

		}
	}
}
