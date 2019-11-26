module chessCommonLib {
	export class SysMsgImportant extends eui.Component {

		private _msgTxt: egret.TextField;
		private _noticeArr: Pmd.CommonChatUserPmd_CS[] = [];
		private _msgContain: egret.DisplayObjectContainer;
		private _noticePanel: egret.DisplayObjectContainer;
		private _vipIcon : eui.Image;
		private _worldchat:eui.Image;
		private _buffer: number;
		private _defaultMsg:string;
		private _loop:boolean;
		public _isHundred:boolean = true;
		private _isDestroy:boolean = false;
		public constructor(isHundred?:boolean) {
			super();
			this.visible = false;
			this.skinName = "chessCommonLib.SysMsgMcSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.initUI();
		}

		public initUI(): void {
			this._buffer = 30;
			this.touchEnabled = false;
			this.touchChildren = true;
			this._worldchat.visible= false;
			uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
			
			this._msgContain = new egret.DisplayObjectContainer();
			this._msgContain.x = 10;
			this._msgContain.y = 7;
			this.addChild(this._msgContain);
			this._msgContain.scrollRect = new egret.Rectangle(0, 0, 540, 25);

			this._noticePanel = new egret.DisplayObjectContainer();
			this._msgContain.addChild(this._noticePanel);

			this._msgTxt = this.createTextFeild();
			this._noticePanel.addChild(this._msgTxt);

			this._vipIcon.parent.removeChild(this._vipIcon);
			this._noticePanel.addChild(this._vipIcon);
			this._noticeArr = []
			// this._msgTxt.scrollRect = new egret.Rectangle(0, 0, 540, 25);
			/********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
			// var self = this;
			// setTimeout(function () {
			// 	self.noticeTest();
			// }, 200);
		}

		private removeListen(){
			uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
		}

		private clickHandle(evt: egret.TouchEvent):void{
			uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SYSMSG_CLICK);
		}

		public setDefaultMsg(msg:string):void{
			this._defaultMsg = msg;
			this.noticeTest();
		}

		public setLoop(value:boolean):void{
			this._loop = value;
		}

		private noticeTest(): void {
			if(!this._msgTxt || !chessCommonLib.ConfigMgr.getInstance().gameOptions.notice){
				return;
			}
			if(this._defaultMsg){
				var notice: Pmd.CommonChatUserPmd_CS = new Pmd.CommonChatUserPmd_CS();
				notice.info = this._defaultMsg;
				notice.name = "系统公告";
				this._noticeArr.push(notice);
				this.visible = true;
				this.scrollNext();
			}
		}
		private startScroll(): void {
			egret.Tween.removeTweens(this._noticePanel);
			this._noticePanel.x = 540 + this._buffer;
			var w: number = this._noticePanel.width < 540 ? 540 : this._noticePanel.width;
			egret.Tween.get(this._noticePanel).to({ x: -(this._noticePanel.width + this._buffer) }, 10 * (w + this._buffer)).call(this.scrollNext, this);
		}

		private scrollNext():void{
			if(this._noticeArr.length >0){
				this.operateText(this._noticeArr.shift());
				this.startScroll();
			}else{
				if(this._loop){
					this.noticeTest();
				}else{
					this.scrollEnd();
				}
			}
		}

		private scrollEnd(): void {
			egret.Tween.removeTweens(this._noticePanel);
			this.visible = false;
		}

		private onNoticeCome(e: uniLib.ZqEvent): void {
			var notice: Pmd.CommonChatUserPmd_CS = e.param;
			this._noticeArr.push(notice);
			if(!this.visible){
				this.visible = true;
			}
			this.scrollNext();
		}

		private operateText(notice: Pmd.CommonChatUserPmd_CS):void{
			let str:string = notice.info;
			let strArr = str.split("@!$#%^");
			let strUIR = decodeURIComponent(strArr[0]);
			let color = 0xFF00EE;//字体颜色 人物喇叭和系统公告不一样
			if(strArr.length > 1 && !isNaN(Number(strArr[1]))){
				this._vipIcon.visible = true;
				this._vipIcon.source = "vip_small"+Number(strArr[1])+"_png";
				this._vipIcon.x = 0;
				this._noticePanel.addChild(this._vipIcon);
				this._msgTxt.x = this._vipIcon.x + this._vipIcon.width - 10;
				color = 0xffff7e;
			}else{
				this._vipIcon.visible = false;
				this._msgTxt.x = 0;
			}
			this._noticePanel.addChild(this._msgTxt);
			this._msgTxt.textFlow = new Array<egret.ITextElement>(
				{text:"【" + notice.name + "】：",style:{"textColor":color}},
				{text:strUIR}
			);
			// this._noticePanel.$invalidate(true);
		}
		
		public destroy(): void {
			if(this._isDestroy)
				return;
			this._isDestroy = true;
			uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
			this.scrollEnd();
			this._msgTxt = null;
			this._noticeArr = null;
			this._msgContain = null;
			this._vipIcon = null;
			this._noticePanel = null;
		}

		public createTextFeild(): egret.TextField {
            var tf: egret.TextField = new egret.TextField();
        
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xffffff;
            tf.textAlign = egret.HorizontalAlign.LEFT;
            tf.size = 24;
            tf.multiline = false;
			tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            return tf;
        }
	}
}