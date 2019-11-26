module club {
	/**
	* 单个房间详情 玩家头像
	*/
	export class ClubPlayerListHeadPanel extends eui.ItemRenderer {
		private headImg: eui.Image;
		private nameTxt: eui.Label;
		private ownerImg: eui.Image;
		private adminImg: eui.Image;
		private info: Cmd.MatchGroupMemberInfo;
		constructor() {
			super();
			this.skinName = "ClubPlayerListHeadSkin";
			this.ownerImg.visible = false;
			this.adminImg.visible = false;
		}
		protected dataChanged(): void {
			this.info = this.data;
			this.headImg.source = this.info.headUrl;
			if (this.info.membertype == 1) {
				this.ownerImg.visible = true;
			}
			if (this.info.membertype == 2) {
				this.adminImg.visible = true;
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
			this.nameTxt.text = name + wei;
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