module chessCommonLib {
	export class TabBarItemCenter extends eui.ItemRenderer {
		public labelDisplay: eui.Label;
		public blabelDisplay: eui.BitmapLabel;
		constructor() {
			super();
			this.skinName = "TabItemCenterSkin";
		}

		public dataChanged(): void {

		}
	}
}