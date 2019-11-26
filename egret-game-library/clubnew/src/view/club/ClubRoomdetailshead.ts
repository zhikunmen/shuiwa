module clubnew {
	/**
	 * 单个房间详情 玩家头像
	 */
	export class ClubRoomdetailshead extends eui.ItemRenderer {
		private head: eui.Image;
		private _name: eui.Label;
		constructor() {
			super();
			this.skinName = "ClubRoomdetailsheadSkin";
		}
		protected dataChanged(): void {
			var info = <Cmd.MatchGroupMemberInfo>this.data;
			this.head.source = info.headUrl;
			this._name.text = info.nickname;
		}
	}
}