module club {
	/**
	 * 单个房间详情 玩家头像
	 */
	export class ClubRoomdetailshead extends eui.ItemRenderer {
		private info: Cmd.MatchGroupMemberInfo;
		/** 状态图片*/
		private _typeImg: eui.Image;
		/** 玩家头像*/
		private _headImg: eui.Image;
		/** 玩家姓名*/
		private _nameText: eui.Label;
		/** 玩家ID*/
		private _idText: eui.Label;
		/**进房时间 */
		private _timeText: eui.Label;

		constructor() {
			super();
			this.skinName = "ClubRoomdetailsheadSkin"
		}
		protected dataChanged(): void {
			this.info = this.data;
			if (this.info.state == ClubConst.DESK_NOUSER) {
				this._idText.text = "";
				this._nameText.text = "";
				this._typeImg.source = "club_new_menage_json.club_deskitem_free";
				this._timeText.text = "";

			} else {
				this._headImg.source = this.info.headUrl;
				this._idText.text = "ID:" + this.info.uid;
				this._nameText.text = this.info.nickname;
				if (this.info.state == 0) {
					this._typeImg.source = "club_new_menage_json.club_deskitem_leave2";
				} else {
					this._typeImg.source = "club_new_menage_json.club_deskitem_online";
				}
				this._timeText.text = "进入时间:" + LobbyUtils.changeTimeToStrDay(this.info.time);
			}

		}
	}
}
