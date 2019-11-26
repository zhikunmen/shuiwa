module chessCommonLib {
	export class ChatUserView extends eui.Component {

		/**
		 * 聊天按钮
		 */
		private chat_btn: eui.ToggleButton;
		/**
		 * 无座玩家按钮
		 */
		private noseat_btn: eui.ToggleButton;
		private mess_count:eui.BitmapLabel;
		private chatAnim:dragonBones.Movie;
		/**
		 * 按钮组
		 */
		private btns: eui.ToggleButton[];

		/**
		 * 选中的按钮
		 */
		private _curentBtn: eui.ToggleButton;

		/**
		 * 正在显示的页
		 */
		private _currentView: any;

		/**
		 * 无座玩家UI
		 */
		private _userList: chessCommonLib.UserList;
		/**
		 * 聊天UI
		 */
		private _chatListView: chessCommonLib.ChatList;

		/**
		 * 当前显示页的枚举值
		 */
		private _currentPage: CHAT_PAGE;

		private _userListSkin: string;
		/** */
		private bg_layer: egret.Sprite;

		private _isMove: boolean = false;

		

		/**
		 * @description    参数列表
		 * @param {number} defaultPage默认打开页面，1聊天，2：无座列表
		 * @param {string} skin面板皮肤。
		 * @param {string} chatSkin聊天面板皮肤。
		 * @param {string} userListSkin无座列表面板皮肤。
		 */
		constructor(defaultPage?: CHAT_PAGE, skinType?:number) {
			super();
			if (defaultPage) {
				this._currentPage = defaultPage;
			}
			if(skinType)
				chessCommonLib.ModuleMgr.getInstance().skinType = skinType;
			this.skinName = "chessCommonLib.ChatUserSkin"+chessCommonLib.ModuleMgr.getInstance().skinType;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.scaleY = LoadGameTipUtil.gameScaleY;
			this.btns = [this.chat_btn, this.noseat_btn];
			this.touchChildren = true;

			uniLib.Global.addEventListener(ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
			uniLib.Global.addEventListener(ChatUserEvent.CHAT_USER_COUNT, this.onUserCount,this);
			this.chat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
			this.noseat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);

			this.bg_layer = uniLib.DisplayUtils.createMask(0, uniLib.Global.screenWidth * 1.5, uniLib.Global.screenHeight);
			this.bg_layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.bg_layer.touchEnabled = false;
			this.bg_layer.visible = false;
			
			this.addChildAt(this.bg_layer, 0);

			if (this._currentPage == null) {
				this._currentPage = CHAT_PAGE.CHAT;
			}
			this.onChatReady(this._currentPage);

			if(this._currentPage == CHAT_PAGE.CHAT && this.noseat_btn.visible)
				egret.setTimeout(()=>{this.getUserList();}, this, 800);
		}


		private getUserList(): void {
			let req: Cmd.UI_GetNotSeatUserListRoomCmd_C = new Cmd.UI_GetNotSeatUserListRoomCmd_C();
			req.curPage = 1;
			uniLib.NetMgr.httpSend(req, (rev: Cmd.UI_GetNotSeatUserListRoomCmd_S) => {
				if (rev && rev.resultCode != 0)
					return;
				var mess:number = rev.users.length;
				if(mess >0){
					// this.mess_count.text = mess+"";
				}
			});
		}

		public onChatReady(page: CHAT_PAGE): void {
			if (this._curentBtn) {
				this._curentBtn.selected = false;
				this._curentBtn.enabled = true;
			}
			if (this._currentView && this._currentView.parent) {
				this._currentView.parent.removeChild(this._currentView);
			}

			// for (var i: number = this.btns.length - 1; i > -1; --i) {
			// 	this.btns[i].enabled = !this.btns[i].selected;
			// }
			switch (page) {
				case CHAT_PAGE.CHAT:
					if (this._currentView) {
						if (this._currentView == this._chatListView) {//如果是刷新数据
						} else {//如果是从其他页切过来
							this._currentView.destroy();
						}
					}
					if (!this._chatListView) {
						this._chatListView = new chessCommonLib.ChatList();
					} else {
						this._chatListView.addEvents();
					}
					this._currentView = this._chatListView;
					this._curentBtn = this.chat_btn;
					if(this.chatAnim){
						this.chatAnim.visible = false;
						this.chatAnim.stop();	
					}
					break;
				case CHAT_PAGE.NOSEAT:
					if (this._currentView) {
						if (this._currentView == this._userList) {//如果是刷新数据

						} else {//如果是从其他页切过来
							this._currentView.destroy();
						}
					}
					if (!this._userList) {
						this._userList = new chessCommonLib.UserList();
					} else {
						this._userList.update();
					}
					this._currentView = this._userList;
					this._curentBtn = this.noseat_btn;
					break;
			}
			// this._curentBtn.enabled = false;
			this._curentBtn.selected = true;

			if (this._currentView) {
				this.addChild(this._currentView);
			}
		}

		private onGetChatInfo(e: uniLib.ZqEvent): void {
			if (this._currentView == this._chatListView && this.x == 0) 
				return;
			if(this.chatAnim == undefined){
				var type = "";
				var skinType = chessCommonLib.ModuleMgr.getInstance().skinType;
				if(skinType>1)
					type = skinType+"";

				this.chatAnim =	uniLib.DragonUtils.showFastDragon("chat_mess"+type, "newAnimation", uniLib.DragonType.MovieClip, this.chat_btn.x + (this.chat_btn.width >> 1), this.chat_btn.y + (this.chat_btn.height >> 1), this);
			}
			this.chatAnim.visible = true;
			this.chatAnim.play();	 
		}

		private onUserCount(e: uniLib.ZqEvent):void{
			var mess:number = e.param;
			if(mess >0){
				// this.mess_count.text = mess+"";
			}
		}

		private onChatBtnHandler(evt: egret.TouchEvent): void {
			this.onClick(evt);
			if (evt.currentTarget == this._curentBtn) {
				this._curentBtn.selected = true;
				if(this._curentBtn == this.chat_btn && this.chatAnim  && this.chatAnim.visible){
					this.chatAnim.stop();
					this.chatAnim.visible = false;
				}
				return;
			}
			switch (evt.currentTarget) {
				case this.chat_btn:
					this._currentPage = CHAT_PAGE.CHAT;
					break;
				case this.noseat_btn:
					this._currentPage = CHAT_PAGE.NOSEAT;
					break;

			}

			this.onChatReady(this._currentPage);
		}
		/**
		 * 设置喇叭数量
		 */
		public set hornNum(num: number) {
			if (this._chatListView == null) {
				this._chatListView = new chessCommonLib.ChatList();
			}
			this._chatListView.hornNum = num;
		}
		/**点击空白聊天框隐藏 */
		private onTouch(evt: egret.TouchEvent): void {
			console.error("点击空白聊天框隐藏",this.chat_btn.touchEnabled);
			this.bg_layer.touchEnabled = false;
			this.bg_layer.visible = false;
			this.dispatchEventWith(ChatUserEvent.MOVE_LEFT, false);
			this.moveLeft(evt);

		}
		/**点击按钮移动到舞台 */
		private onClick(evt: egret.Event): void {
			this.bg_layer.touchEnabled = true;
			this.bg_layer.visible = true;
			this.dispatchEventWith(ChatUserEvent.MOVE_RIGHT, false);
			this.moveRight(evt);
		}
		/**点击空白聊天框隐藏 */
		private moveLeft(evt: egret.Event): void {
			evt.stopPropagation();
			if (this._isMove) return;
			if (this.x == -408) {
				return;
			}
			if(this._userList){
			//this._userList.reset();
			}
			this.touchEnabled = false;
			this.touchChildren = false;
			this._isMove = true;
			egret.Tween.get(this).to({ x: -408 }, 300).call(() => {
				this.touchEnabled = true;
				this.touchChildren = true;
				this._isMove = false;
				egret.Tween.removeTweens(this);
			}, this);
		}
		/**点击按钮移动到舞台 */
		private moveRight(evt: egret.Event): void {
			evt.stopPropagation();
			if (this.x == 0) {
				return;
			}
			if (this._isMove) return;
			this.touchEnabled = false;
			this.touchChildren = false;
			this._isMove = true;
			egret.Tween.get(this).to({ x: 0 }, 300).call(() => {
				this.touchEnabled = true;
				this.touchChildren = true;
				this._isMove = false;
				this._curentBtn.enabled = true;
				egret.Tween.removeTweens(this);
				if(this._currentPage == CHAT_PAGE.NOSEAT){
					this._userList.update();
				}
			}, this);
		}

		public destroy() {
			uniLib.Global.removeEventListener(ChatUserEvent.CHAT_USER_COUNT, this.onUserCount,this);
			uniLib.Global.removeEventListener(ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
			this.bg_layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.chat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
			this.noseat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
			if (this._userList) {
				this._userList.destroy();
			}
			if (this._chatListView) {
				this._chatListView.destroy();
			}


		}

	}

	export enum CHAT_PAGE {
		/**
		 * 聊天
		 */
		CHAT = 1,

		/**
		 * 无座玩家
		 */
		NOSEAT = 2
	}

}


module Cmd {

	/**
	 * 发送聊天返回
	 */
	export function OnUI_CommonChat_S(rev: Cmd.UI_CommonChat_S) {
		if (rev.resultCode && rev.resultCode == 2) {//为了方便兼容，这个为2时，表示作为传递无座玩家人数改变的作用
			uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.SEATNUM_CHANGE, rev["noSeatUserNum"]);
			return;
		}
		if (rev.resultCode && rev.resultCode != 0) {
			// uniLib.TipsUtils.showTipsDownToUp("发送聊天信息失败,错误码:" + rev.resultCode);
			if(rev.resultCode != 2)
				uniLib.TipsUtils.showTipsDownToUp(rev.desc);
		}
		else{
			if(rev.horn != void 0 ){
		        uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.HORN_CHANGE, rev.horn);
			}
		}
	}
	/**
	 * 聊天消息
	 */
	export function OnUI_CommonChat_Brd(rev: Cmd.UI_CommonChat_Brd) {
		let chatInfo: chessCommonLib.ChatVo = new chessCommonLib.ChatVo();
		chatInfo.chatType = rev.brdType;// Cmd.CHAT_TYPE.ROOM;
		chatInfo.data = rev;
		uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.CHAT_INFO, chatInfo);
	}

	export function OnUI_VoiceChat_S(rev: Cmd.UI_VoiceChat_S) {
		if (rev.resultCode && rev.resultCode != 0) {
			uniLib.TipsUtils.showTipsDownToUp("发送语音信息失败,错误码:" + rev.resultCode);
		}
	}

	export function OnUI_VoiceChat_Brd(rev: Cmd.UI_VoiceChat_Brd) {
		let chatInfo: chessCommonLib.ChatVo = new chessCommonLib.ChatVo();
		chatInfo.chatType = Cmd.CHAT_TYPE.VOICE;
		chatInfo.data = rev;
		uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.CHAT_INFO, chatInfo);
	}
}
