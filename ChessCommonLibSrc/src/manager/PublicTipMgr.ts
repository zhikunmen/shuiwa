module chessCommonLib {
	/**
	 * 轻提示
	 */
	export class PublicTipMgr {
		private static instance: PublicTipMgr;
		public constructor() {
		}
		public static getInstance():PublicTipMgr{
			if(!PublicTipMgr.instance){
				PublicTipMgr.instance = new PublicTipMgr();
			}
			return PublicTipMgr.instance;
		}
		/**
		 * 房费提示
		 */
		private _tipsPanel:egret.Sprite;
		public showTipsShow(msg:string){
			this._tipsPanel = new egret.Sprite;
			this.getContainer().addChild(this._tipsPanel);
			let tipsBg = uniLib.DisplayUtils.createBitmapByName("zm_notice_bg_png");
			this._tipsPanel.addChild(tipsBg);
			let tipsTxt = uniLib.DisplayUtils.createTextLabel(0xababab,egret.HorizontalAlign.CENTER,msg,20,tipsBg.width);
			tipsTxt.y = (tipsBg.height - tipsTxt.height)/2;
			this._tipsPanel.addChild(tipsTxt);
			this._tipsPanel.x = (uniLib.Global.screenWidth - tipsBg.width)/2;
			this._tipsPanel.y = -tipsBg.height;
			egret.Tween.get(this._tipsPanel).to({y:0},200).wait(1000).to({y:-tipsBg.height},200).call(this.destory, this);
		}
		public  destory(): void {
			if(this._tipsPanel){
				egret.Tween.removeTweens(this._tipsPanel);
				uniLib.DisplayUtils.removeAllChildren(this._tipsPanel);
				uniLib.DisplayUtils.removeFromParent(this._tipsPanel);		
			}
			this._tipsPanel= null;
		}
		private  getContainer():egret.DisplayObjectContainer{
			if (uniLib.SceneMgr.instance.currentScene.topLayer){
				return uniLib.SceneMgr.instance.currentScene.topLayer;
			}
			return uniLib.SceneMgr.instance.currentScene;
		}

		private  showList:Array<MildAlertVC> = [];
		public showMildWarnShow(msg:string):void{
			var alert: MildAlertVC = new MildAlertVC();
			alert.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
			alert.setText(msg);
			this.getContainer().addChild(alert);
			if(this.showList.length > 0) {
				for(var index = 0;index < this.showList.length;index++) {
					this.showList[index].y -= alert.height;
				}
			}
			this.showList.push(alert);
		}
		private removeStage(evt:egret.Event):void{
            var alert: MildAlertVC = evt.currentTarget as MildAlertVC;
            alert.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.removeStage,this);
            this.showList.splice(this.showList.indexOf(alert),1);
            alert.destory();
            alert = null;
        }
	}

	export class MildAlertVC extends egret.Sprite{
			private _bg: egret.Bitmap;
			private _text: egret.TextField;
			public constructor() {
				super();
				this.initUI();
			}
			private initUI():void{
				this._bg = uniLib.DisplayUtils.createBitmapByName("zm_notice_bg_png");
				this.addChild(this._bg);
				this._text = uniLib.DisplayUtils.createTextLabel(0xFFFFFF,egret.HorizontalAlign.CENTER,"",30,88,10,786);
				this._text.multiline = true;
				this.addChild(this._text);
			}
			/**
			 * 
			 * @param message
			 * 
			 */
			public setText(message:string):void
			{
				if(!message) {
					return;
				}
				this._text.text = message;
				this._bg.height = this._text.textHeight * 2;
				this.x = Math.round((uniLib.Global.screenWidth - this.width) / 2);
				this.y = uniLib.Global.screenHeight;
				egret.Tween.get(this).to({ y: Math.round((uniLib.Global.screenHeight - this.height) / 2)-60 },500,egret.Ease.circOut).call(this.showDelay,this);
			}
			private showDelay():void{
				egret.Tween.get(this).wait(2000).to({ y: -this.height },500,egret.Ease.circOut).call(this.destory,this);
			}
			public  destory(): void {
				egret.Tween.removeTweens(this);
				uniLib.DisplayUtils.removeAllChildren(this);
				uniLib.DisplayUtils.removeFromParent(this);
				this._bg = null;
				this._text = null;
			}
	}
}