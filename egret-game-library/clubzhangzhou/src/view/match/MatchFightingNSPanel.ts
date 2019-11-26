module club {
	/**玩家战绩单个信息 */
	export class MatchFightingNSPanel extends eui.ItemRenderer {
		/** 昵称*/
		private names: eui.Label;
		/** 分数*/
		private score: eui.Label;
		private info: Cmd.UserGameHistory;
		constructor() {
			super();
			this.skinName = "MatchFightingNSSkin";
		}
		protected dataChanged(): void {
			this.info = this.data;
			this.names.text = this.info.nickName;
			if (this.info.integral != null) {
				this.score.text = this.info.integral + "";
				if (this.info.integral < 0) {
					this.score.textColor = 0x0c7113;
				}
			}
		}
	}
}