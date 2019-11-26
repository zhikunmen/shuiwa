module friendsclub {
	/**玩家战绩单个信息 */
	export class MatchFightingNSPanel extends eui.ItemRenderer {
		private names: eui.Label;
		private score: eui.Label;
		private info: Cmd.MatchGroupMemberInfo;
		constructor() {
			super();
			this.skinName = "MatchFightingNSSkin";
		}
		protected dataChanged(): void {
			this.info = this.data;
			this.names.text = this.info.nickname;
			if (this.info.score != null) {
				this.score.text = this.info.score + "";
			}
		}
	}
}