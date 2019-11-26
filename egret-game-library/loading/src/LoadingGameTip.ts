module loading {

	export class LoadingGameTip extends eui.Component implements uniLib.IUI {

		private turn: egret.tween.TweenGroup;
		private image: eui.Image;
		private process_lb: eui.Label;

		constructor() {
			super();
			this.skinName = "loading.LoadGameTipSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			uniLib.DisplayUtils.playTweenGroup(this.turn, true);
		}

		public updateUIData(data: any): void {
			if (this.process_lb)
				this.process_lb.text = data + "%";
		}

		public resize(): void {

		}

		public destroy() {
			uniLib.DisplayUtils.stopTweenGroup(this.turn);
		}
	}
}
