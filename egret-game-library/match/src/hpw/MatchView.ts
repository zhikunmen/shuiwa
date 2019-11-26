module match {
	/**
	 * 主场景的红包赛界面
	 */
	export class MatchView extends eui.Component {

		public parttake_btn: eui.Button;
		public point_lbl: eui.Label;
		public rank_lbl: eui.Label;
		public gamtType_lbl: eui.Label;

		constructor() {
			super();
			this.skinName = "MatchViewSkin";
		}

		private addEvents(): void {
			this.parttake_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		}

		private removeEvents(): void {
			this.parttake_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		}

		private onTouchHandle(evt: egret.TouchEvent): void {
			if (evt.target == this.parttake_btn) {
				uniLib.PopUpMgr.addPopUp(HpwRank, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
				OnRequestRankInfoHpMatchCmd_C(1);
				uniLib.PopUpMgr.addPopUp(HpwBindPhone);
			}
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEvents();
		}

		public setViewData(data: Cmd.PersonalHpRankInfo) {
			if (data.state == 1) {
				this.point_lbl.text = data.point.toString();
				this.rank_lbl.text = data.rank.toString();
				this.gamtType_lbl.text = "跑得快";
			}
		}

		public destroy(): void {
			this.removeEvents();
			uniLib.DragonUtils.removeFastDragonbyContainer(this);
		}
	}
}
