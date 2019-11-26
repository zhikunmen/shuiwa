module chessCommonLib {
	export class UserList extends eui.Component {

		private noseat_lst: eui.List;

		private _data: Cmd.RoomUserInfo[];

		private loading_img: eui.Image;

		public loadingTip: egret.tween.TweenGroup;

		constructor() {
			super();
			this.skinName = "chessCommonLib.UserListSkin"+chessCommonLib.ModuleMgr.getInstance().skinType;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			// var testData: any = [
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当1", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当2", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当3", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" }
			// ];
			// this.data = testData;

			this.update();
			this.noseat_lst.itemRenderer = UserItemRenderer;
		}

		public set data($data: Cmd.RoomUserInfo[]) {
			this._data = $data;
			this.refreshView();
		}

		private refreshView(): void {
			if (this._data) {
				this.noseat_lst.dataProvider = new eui.ArrayCollection(this._data);
				this.noseat_lst.visible = true;
				this.loading_img.visible = false;
				uniLib.DisplayUtils.stopTweenGroup(this.loadingTip);
				uniLib.Global.dispatchEvent(ChatUserEvent.CHAT_USER_COUNT, this._data.length);
			} else {
				//这里需要显示转圈loading
				this.noseat_lst.visible = false;
				this.loading_img.visible = true;
				uniLib.DisplayUtils.playTweenGroup(this.loadingTip, true);
			}

		}

		/**
		 * 更新用户列表
		 */
		public update(): void {
			this.data = [];
			//发送请求获取最新数据
			this.getUserList();
		}

		public reset(): void {
			this.noseat_lst.dataProvider = new eui.ArrayCollection([]);
		}

		private getUserList(): void {
			let req: Cmd.UI_GetNotSeatUserListRoomCmd_C = new Cmd.UI_GetNotSeatUserListRoomCmd_C();
			req.curPage = 1;
			uniLib.NetMgr.httpSend(req, (rev: Cmd.UI_GetNotSeatUserListRoomCmd_S) => {
				if (rev && rev.resultCode != 0) {
					uniLib.TipsUtils.showTipsDownToUp(rev.desc);
					return;
				}
				this.data = rev.users;
			});
		}

		public destroy(): void {
			if (this.loadingTip) {
				uniLib.DisplayUtils.stopTweenGroup(this.loadingTip);
			}

		}
	}
}