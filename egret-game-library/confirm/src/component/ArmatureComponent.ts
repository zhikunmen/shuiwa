module eui {
	/**
	 * 通用基础控件
	 */
	export class ArmatureComponent extends eui.Component {

		public resName: string = null;
		public ncName: string = null;
		public mcType: string = null;
		public center: boolean = false;
		public touchAble:number = 1;
		private _armature: dragonBones.Armature;
		public constructor() {
			super();
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
			this.update();
		}

		private onRemoveFromStage(evt: egret.Event): void {
			this.destroy();
		}

		public update(): void {
			if (this.resName) {
				if (!this.ncName)
					this.ncName = "newAnimation";
				if (!this.mcType)
					this.mcType = uniLib.DragonType.ARMATURE;
				this._armature = uniLib.DragonUtils.createDragonBonesDisplay(this.resName + "_ske_json", this.resName + "_tex_json", this.resName + "_tex_png", this.mcType);
				if (!!this._armature) {
					this.addChildAt(this._armature.display, 0);
					uniLib.DragonUtils.runDragonBonesArmature(this._armature, this.ncName, 0);
				}
				if (this.center) {
					this._armature.display.x = this._armature.display.width / 2;
					this._armature.display.y = this._armature.display.height / 2;
				}
				this.touchEnabled = this.touchAble == 1;
				this.touchChildren = this.touchAble == 1;
			}
		}

		/**
		 * 替换插槽
		 * @param slotName 插槽名称 原材料
		 * @param textureName 图片名  xxx_png
		 * @param 偏移量
		 */
		public setNewSlot(slotName:string, textureName:string ,offsetX:number=0, offsetY:number=0):void{
			var slot:dragonBones.Slot = this._armature.getSlot(slotName);
			var b:egret.Bitmap = new egret.Bitmap();
			b.texture = RES.getRes(textureName);
			b.x = slot.display.x+ offsetX;
			b.y = slot.display.y+ offsetY;
			b.anchorOffsetX = b.width/2 ;
    		b.anchorOffsetY = b.height/2 ;
			slot.setDisplay( b );
		}


		public destroy(): void {
			if (this._armature) {
				this._armature.animation.stop();
				uniLib.DragonUtils.destoryDragonBonesArmature(this._armature, this.ncName);
			}
			this._armature = null;
			this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		}
	}
}