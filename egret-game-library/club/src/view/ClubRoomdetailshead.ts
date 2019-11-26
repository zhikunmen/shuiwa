module club {
	/**
	 * 单个房间详情 玩家头像
	 */
	export class ClubRoomdetailshead extends eui.ItemRenderer {
		private head: eui.Image;
		private info: Cmd.MatchGroupMemberInfo;
		constructor() {
			super();
			this.skinName = "ClubRoomdetailsheadSkin";
		}
		protected dataChanged(): void {
			this.info = this.data;
			this.head.source = this.info.headUrl;
		}
	}
}