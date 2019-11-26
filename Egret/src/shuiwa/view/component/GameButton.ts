module SWGAME {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameButton extends egret.Sprite{
        private lable: egret.TextField;
        private srcArr: Array<string>;
        private _icon: egret.Bitmap;
        private _labelTxt: egret.TextField;
        private _label: string;
        private _area:egret.Sprite;
        private _autoDestory:boolean;
        public constructor(arr: Array<string>,label:string=null,autoDestory:boolean=true) {
            super();
            this.srcArr = arr;
            this._label = label;
            this._autoDestory=autoDestory;
            this.initUI();
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
		}

        public iconTexture(res:string[]){
            this.srcArr = res;
            this._icon.texture = RES.getRes(res[0]);
        }
        private onRemove(evt:egret.Event):void{
            if(this._autoDestory){
                this.destory();
            }
        }
        private initUI(): void {
            var src: string;
            src = this.srcArr[0];
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            if(!this._icon) {
                this._icon = uniLib.DisplayUtils.createBitmapByName(src);
                this.addChild(this._icon);
            } else {
                this._icon.texture = RES.getRes(src);
            }
            if(this._label){
                this._labelTxt = uniLib.DisplayUtils.createTextLabel(0xFFFFFF,egret.HorizontalAlign.CENTER,this._label,25,0,8,this._icon.width);
                this.addChild(this._labelTxt);
            }
        }
        private onTouchBegin(evt:egret.TouchEvent):void{
            this._icon.texture = RES.getRes(this.srcArr[1]);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this); 
            // uniLib.SoundMgr.instance.playSound(SGGAME.SoundConsts.BUTTON_CLICK);
        }
        private onTouchEnd(evt: egret.TouchEvent): void {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this); 
            this._icon.texture = RES.getRes(this.srcArr[0]);
           
        }
        public addClickArea(num:number):void{
            if(!this._area){
                this._area=new egret.Sprite();
                this._area.touchEnabled=true;
                this.addChild(this._area)
            }
            this._area.graphics.clear();
			this._area.graphics.beginFill(0xff0000,0);
			this._area.graphics.drawRect(-num,-num,this._icon.width+num*2,this._icon.height+num*2);
            this._area.graphics.endFill();
        }
        public destory():void{
            this.touchEnabled = false;
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END,this.onTouchEnd,this); 
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE,this.onRemove,this);
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN,this.onTouchBegin,this);
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            this._area=null;
            this._icon=null;
            this._label=null;
            this._labelTxt=null;
         
        }
	}
}
