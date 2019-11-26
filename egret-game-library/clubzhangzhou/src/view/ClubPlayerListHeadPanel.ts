module club {
	/**
	* 单个房间详情 玩家头像
	*/
	export class ClubPlayerListHeadPanel extends eui.ItemRenderer {
		private info: Cmd.MatchGroupMemberInfo;
		/**玩家名称 */
		private _nameTxt: eui.Label;
		/** 玩家ID*/
		private _idTxt: eui.Label;
		/** 玩家头像资源*/
		private _headImg: eui.Image;
		/** 群主图标*/
		private _ownerImg: eui.Image;
		/** 管理员图标*/
		private _adminImg: eui.Image;
		/** 在线图标*/
		private _onlineImg: eui.Image;
		/** 删除按钮*/
		private _deleteBtn: eui.Image;

		constructor() {
			super();
			this.skinName = "ClubPlayerListHeadSkin";
			this._ownerImg.visible = false;
			this._adminImg.visible = false;
		}
		protected dataChanged(): void {
			this.info = this.data;
			this._headImg.source = this.info.headUrl;
			if (this.info.state == 1) {
				this._onlineImg.visible = true;
			} else {
				this._onlineImg.visible = false;
			}
			if (this.info.membertype == 1) {
				this._onlineImg.visible = false;
				this._ownerImg.visible = true;
			}
			if (this.info.membertype == 2) {
				this._onlineImg.visible = false;
				this._adminImg.visible = true;
			}
			if (this.info.membertype != 1 && this.info.membertype != 2) {
				if (ClubData.getInstance().clubDeleteUser) {
					this._deleteBtn.visible = true;
				} else {
					this._deleteBtn.visible = false;
				}
			}
			var name = this.info.nickname;
			var strLength: number;
			var wei: string;
			if (this.getStrRealLength(name) > 8) {
				wei = "...";
			} else {
				wei = "";;
			}
			while (this.getStrRealLength(name) > 8) {
				strLength = name.length;
				name = name.substr(0, strLength - 1);
			}
			this._nameTxt.text = name + wei;
			this._idTxt.text = this.info.uid + "";

		}
		/**限制昵称长度 */
		private getStrRealLength(str: string): number {
			var jmz = { GetLength: null };
			jmz.GetLength = function (str) {
				return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length);  //先把中文替换成两个字节的英文，再计算长度
			};
			return jmz.GetLength(str);
		}

	}
}