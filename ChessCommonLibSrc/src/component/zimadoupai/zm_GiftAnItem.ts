module chessCommonLib {
	export class zm_GiftAnItem extends egret.DisplayObjectContainer{
		private _giftId:number;
		private _effectMc:dragonBones.Armature;
		public constructor() {
			super();
		}
		public initUI():void{
		}
		public set giftId(id:number){
			this._giftId=id;
			if(!this._effectMc){
				this._effectMc=uniLib.DragonUtils.createDragonBonesDisplay("gift_effect_drag_ske_json", "gift_effect_drag_tex_json","gift_effect_drag_tex_png","MovieClip");
				dragonBones.WorldClock.clock.add(this._effectMc);	
				this._effectMc.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE,this.onAnimationEvent,this);			
			}
			this._effectMc.animation.gotoAndStopByFrame("gift"+this._giftId,0);
			this.addChild(this._effectMc.display);
		}
		private onAnimationEvent(){
			this.index++;
			if(!this._effectMc)return;
			this._effectMc.animation.stop("gift"+this._giftId);
			this.destory();
			this.index = 0;
		}
        private index:number = 0;
		public play():void{
			if(this._effectMc == null)return;
			if(!dragonBones.WorldClock.clock.contains(this._effectMc)){
                 dragonBones.WorldClock.clock.add(this._effectMc);
			}
			this._effectMc.animation.play("gift"+this._giftId);
			var sound = "zm_GiftSound" + this._giftId + "_mp3";
			if(sound != ""){
				uniLib.SoundMgr.instance.playSound(sound);
			}
		}
		public destory():void{
			if(this._effectMc){
				this._effectMc.animation.stop();
				this._effectMc.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE,this.onAnimationEvent,this);
				uniLib.DragonUtils.destoryDragonBonesArmature(this._effectMc,"gift"+this._giftId);
				if(this._effectMc.display){
					this.removeChild(this._effectMc.display);
				}
			}
			this._effectMc = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}