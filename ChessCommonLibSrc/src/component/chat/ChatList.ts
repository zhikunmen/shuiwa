module chessCommonLib {
	export class ChatList extends eui.Component {

		private chatType_btn: eui.Button;
		private labelDisplay: eui.Label;
		private send_bt: eui.Button;
		private chat_scr: eui.Scroller;
		private chat_etxt: eui.EditableText;
		private chat_lst: eui.List;
		// private voice_btn: eui.Button;

		private _data: eui.ArrayCollection;


		private _chatBtns: eui.Button[];
		private _chatDropBtns: eui.Button[];

		/**
		 * 选择按钮组
		 */
		private chat_select_grp: eui.Group;
		/**
		 * 喇叭按钮
		 */
		public labaDrop_btn: eui.Button;
		/**
		 * 房间按钮
		 */
		public roomDrop_btn: eui.Button;

		public labaType_btn: eui.Button;
		public roomType_btn: eui.Button;

		private _currentChatType: Cmd.CHAT_TYPE;
		/**
		 * 喇叭数量
		 */
		private _hornNum: number = 0;

		constructor() {
			super();
			// if (skin) {
			// 	this.skinName = skin;
			// 	chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatExml = skin;
			// } else {
			// 	this.skinName = chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatExml;
			// }
			this.skinName = "chessCommonLib.ChatListSkin"+chessCommonLib.ModuleMgr.getInstance().skinType;
		}

		protected childrenCreated(): void {
			super.childrenCreated();

			let b = ConfigMgr.getInstance().gameOptions.horn;
			this.chat_select_grp.visible = b;
			this.labaType_btn.visible = b;
			this.roomType_btn.touchEnabled = b;

			this.chat_etxt.maxChars = 60;
			this._chatBtns = [this.roomType_btn, this.labaType_btn];
			this._chatDropBtns = [this.roomDrop_btn, this.labaDrop_btn];
			this.hideChatTypeSelectGrp();

			//test数据
			// let testData: any = [
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当1", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当2", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当3", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
			// 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" }
			// ];
			// this.data = testData;
			this.data = [];
			this.chat_lst.itemRendererFunction = this.chatListItemRendererFunc;

			// this.chat_lst.itemRenderer = UserItemRenderer;
			this.addEvents();
			this.currentChatType = Cmd.CHAT_TYPE.ROOM;
		}

		private chatListItemRendererFunc(item: ChatVo): any {
			// console.error("chatListItemRendererFunc", item);
			if (item.chatType == Cmd.CHAT_TYPE.HORN) {
				return ChatListLabaItemRenderer;
			} else if (item.chatType == Cmd.CHAT_TYPE.ROOM) {
				return ChatListItemRenderer;
			} else if (item.chatType == Cmd.CHAT_TYPE.VOICE) {
				// return ChatListItemRenderer;
			}
		}

		private showChatTypeSelectGrp(page: Cmd.CHAT_TYPE): void {
			if (this.chat_select_grp.visible == true) {
				this.hideChatTypeSelectGrp();
				return;
			}
			if (page == Cmd.CHAT_TYPE.ROOM) {
				this.roomDrop_btn.visible = false;
				this.labaDrop_btn.visible = true;
			} else {
				this.roomDrop_btn.visible = true;
				this.labaDrop_btn.visible = false;
			}
			this.chat_select_grp.visible = true;
		}

		private hideChatTypeSelectGrp(): void {
			this.chat_select_grp.visible = false;
		}

		public set currentChatType(type: Cmd.CHAT_TYPE) {
			this._currentChatType = type;
			if (this._currentChatType == Cmd.CHAT_TYPE.ROOM) {
				this.roomType_btn.visible = true;
				this.labaType_btn.visible = false;
			} else {
				this.roomType_btn.visible = false;
				this.labaType_btn.visible = true;
			}
		}

		/**
		 * 更新用户列表
		 */
		public update(): void {

		}

		public reset(): void {
		}

		public addEvents(): void {
			uniLib.Global.addEventListener(ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
			uniLib.Global.addEventListener(ChatUserEvent.HORN_CHANGE, this.sethornNum, this);

			// uniLib.Global.addEventListener(ChatUserEvent.CHAT_HORN, this.onGetChatHorn, this);
			this.send_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendHandler, this);
			// this.voice_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onVoiceHandle, this);
			// this.voice_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onVoiceEndHandle, this);

			this.roomDrop_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
			this.labaDrop_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
			this.roomType_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
			this.labaType_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
			this.chat_etxt.addEventListener(egret.Event.CHANGE, this.onChang, this);


		}

		private onShowDropHandle(e: egret.TouchEvent): void {
			this.showChatTypeSelectGrp(this._currentChatType);
		}

		private onTouchChatTypeHandle(e: egret.TouchEvent): void {
			// let target:any = e.currentTarget;
			this.hideChatTypeSelectGrp();
			// let chatType:Cmd.CHAT_TYPE;
			// if(target == this.roomDrop_btn){
			// 	chatType = Cmd.CHAT_TYPE.ROOM;
			// }else if(target == this.labaDrop_btn){
			if (this._currentChatType == Cmd.CHAT_TYPE.ROOM) {
				this.currentChatType = Cmd.CHAT_TYPE.HORN;
				this.chat_etxt.prompt = "可免费发送" + this._hornNum + "次";
				this.chat_etxt.maxChars = 60;
				if(this._hornNum > 10){
				this.chat_etxt.prompt = "喇叭无限使用";
				}

			} else {
				this.currentChatType = Cmd.CHAT_TYPE.ROOM;
				this.chat_etxt.prompt = "请输入,最多60字";
				this.chat_etxt.maxChars = 60;

			}
			// }
			// this.showChatTypeSelectGrp(this._currentChatType);
		}

		/**
		 * 更新喇叭数量,这么写只是为了移除事件监听
		 */
		public sethornNum(e: uniLib.ZqEvent) {
			this.hornNum = e.param;
		}

		/**
		 * 更新喇叭数量
		 */
		public set hornNum(num: number) {
			this._hornNum = num;
			if (this._currentChatType == Cmd.CHAT_TYPE.HORN) {
				this.chat_etxt.prompt = "可免费发送" + this._hornNum + "次";
				if(this._hornNum > 10){
				this.chat_etxt.prompt = "喇叭无限使用";
					
				}
			}
		}

		/**
		 * 获取到聊天信息
		 */
		private onGetChatInfo(e: uniLib.ZqEvent): void {
			var chat: ChatVo = e.param;
			if (e.param.data.uid === uniLib.NetMgr.UID) {
				this.chat_etxt.text = "";
			}
			this._data.addItem(chat);
			this._data.refresh();
			// this.chat_lst.validateNow();
			this.scroll2Bottom();
		}

		private onSendHandler(e: egret.TouchEvent): void {
			let txt: string = this.chat_etxt.text;
			if (txt) {
				var req: Cmd.UI_CommonChat_C = new Cmd.UI_CommonChat_C();
				req.words = txt;
				if (this._currentChatType == Cmd.CHAT_TYPE.HORN) {//客户端发送时自动减
					if (this._hornNum < 0) {
						uniLib.TipsUtils.showTipsDownToUp("喇叭数量不够", true);
						return;
					}
				}
				req.brdType = this._currentChatType;
				// }
				uniLib.NetMgr.tcpSend(req);
			}
		}

		private onVoiceHandle(e: egret.TouchEvent): void {
			uniLib.TipsUtils.showTipsDownToUp("暂时没有语音效果图,后续再做", true);
			return;
			//这里开始录音
			// let voice: Cmd.UI_VoiceChat_C = new Cmd.UI_VoiceChat_C();
			// voice.time = "3000";
			// voice.url = "http://www.baidu.com";
			// voice.words = "你好happy";
			// uniLib.NetMgr.tcpSend(voice);
		}

		private onVoiceEndHandle(e: egret.TouchEvent): void {
			//录音结束发送语音消息给服务器
		}

		public set data($data: Cmd.UI_CommonChat_Brd[]) {
			this._data = new eui.ArrayCollection($data);
			this.refreshView();
		}

		private refreshView(): void {
			if (this._data) {
				this.chat_lst.dataProvider = this._data;
				this.chat_lst.visible = true;
				// this.loading_img.visible=false;
			} else {
				//这里需要显示转圈loading
				this.chat_lst.visible = false;
				// this.loading_img.visible=true;
			}
		}

		private changeChatType(): void {
			// this.chatType_btn
		}

		/**
		 * 滚动到底部
		 */
		private scroll2Bottom(): void {
			this.chat_scr.validateNow();
			if (this.chat_scr.viewport.contentHeight > 618) {
				this.chat_scr.viewport.scrollV = this.chat_scr.viewport.contentHeight - 395;//这里不太清楚为什么高度不准确
			}

		}

		private onChang(e: egret.Event) {
			if (e.target.text.length === 60) {
				uniLib.TipsUtils.showTipsDownToUp("字数超出限制");
			}
			// egret.error("onChang", e.target.text.length);
		}

		public destroy(): void {
			uniLib.Global.removeEventListener(ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
			// uniLib.Global.removeEventListener(ChatUserEvent.CHAT_HORN, this.onGetChatHorn, this);
			this.send_bt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendHandler, this);
			// this.voice_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onVoiceHandle, this);
			// this.voice_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onVoiceEndHandle, this);
			uniLib.Global.removeEventListener(ChatUserEvent.HORN_CHANGE, this.sethornNum, this);

			this.roomDrop_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
			this.labaDrop_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
			this.roomType_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
			this.labaType_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
			this.chat_etxt.removeEventListener(egret.Event.CHANGE, this.onChang, this);

		}

	}
}