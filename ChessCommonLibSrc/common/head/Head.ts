/**
 * 通用头像组件
 */
module chessCommonLib {

	export class Head extends eui.Component implements eui.UIComponent {

		public static PersonalImageAble:boolean = true;
		public static DefaultHead:string = "default_avar_png";
		public static DefaultIcon:boolean = true;
		public static DefaulVip:boolean = true;
		public static DefaulInfoBg:boolean = false;

		protected _headUrl: string;
		protected _frame: string;
		protected _vipAnim: string;
		protected avar_img: eui.Image;
		protected avarFrame_img: eui.Image;
		protected gift_icon: eui.Image;
		protected info_bg: eui.Image;
		protected anim: dragonBones.Movie;

		// 		private exmls: string = `<e:Skin class="chessCommonLib.HeadSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" >
		// 	<e:Image id="avar_img" source="default_avar_png" left="0" right="0" top="0" bottom="0"/>
		// 	<e:Image id="avarFrame_img" horizontalCenter="0" verticalCenter="0" source=""/>
		// </e:Skin>`;

		private static DefaultWH: number = 106;
		public constructor(skin?: string, w: number = 100, h: number = 100) {
			super();
			if (skin) {
				this.skinName = skin;
			} else {
				// this.skinName = this.exmls;
				this.skinName = "chessCommonLib.HeadSkin";
			}
			this.width = w;
			this.height = h;
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}

		public set headUrl(url: string) {
			this._headUrl = url;
			try {
				if (this.avar_img)
					this.avar_img.source = this._headUrl;
			} catch (e) {
				this.avar_img.source = Head.DefaultHead;
			}

		}

		public get headUrl(): string {
			return this._headUrl;
		}

		public set frame(url: string) {
			if(Head.DefaulVip){
				this._frame = url;
				if (this.avarFrame_img) {
					this.avarFrame_img.source = this._frame;
					this.avarFrame_img.scaleX = this.avarFrame_img.scaleY = this.headScale;
				}
			}
			this.avarFrame_img.visible = Head.DefaulVip;			
		}

		public get frame(): string {
			return this._frame;
		}

		public setVipAnim(resName: string, playName?: string, x?: number, y?: number) {
			this._vipAnim = resName;
			if (!x)
				x = this.width / 2;
			if (!y)
				y = this.height / 2;
			if(this.anim != undefined){
				uniLib.DragonUtils.removeFastDragonbyContainer(this);
				this.anim = null;
			}

			if(playName == "vip9")
				this.anim = uniLib.DragonUtils.showFastDragon(this._vipAnim, playName, uniLib.DragonType.ARMATURE, x, y, this);
			else{
				this.anim = uniLib.DragonUtils.showFastDragon(this._vipAnim, "newAnimation", uniLib.DragonType.MovieClip, x, y, this);
				if (playName){
					this.anim.play(playName, 0);
				}
			}	
			
			this.anim.scaleX = this.anim.scaleY = this.headScale;
			this.anim.touchEnabled = false;
		}

		public setHeadFrame(level: number, personInfo?: Cmd.PersonalImage[]): void {
			var mcId;
			if(personInfo && Head.PersonalImageAble)
				mcId = chessCommonLib.FashionDataUtils.getPersonVipLevel(personInfo);

			if(mcId == undefined){
				this.vipLevel = level;
			}else{
				if(mcId<30){ //vip等级
					this.vipLevel = mcId;
				}else{
					let headMc = ConfigMgr.getInstance().getheadMcById(mcId);
					if (headMc) {
						this.setVipAnim(headMc.head_mc[0], headMc.head_mc[1]);
					}
				}
			}
		}

		public set vipLevel(level: number) {
			if (!level) level = 0;
			let vipCfg: table.TableVip = ConfigMgr.getInstance().getVipByLevel(level);

			if (vipCfg) {
				if (vipCfg.head_mc && Head.PersonalImageAble) {
					let headMc = ConfigMgr.getInstance().getheadMcById(vipCfg.head_mc);
					if (headMc) {
						this.setVipAnim(headMc.head_mc[0], headMc.head_mc[1]);
					}
				} else {
					this.frame = vipCfg.head_frame;
				}
			}
		}

		private headScale: number;
		protected childrenCreated(): void {
			super.childrenCreated();
			this.headScale = this.width / Head.DefaultWH;
			if (this._headUrl) {
				try {
					if (this.avar_img)
						this.avar_img.source = this._headUrl;
					else{
						this.avar_img.source = Head.DefaultHead;
					}
				} catch (e) {
					console.error(this._headUrl + " error..");
					this.avar_img.source = Head.DefaultHead;
				}
			}else
				this.avar_img.source = Head.DefaultHead;
			if (this._frame) {
				this.avarFrame_img.source = this._frame;
				this.avarFrame_img.scaleX = this.avarFrame_img.scaleY = this.headScale;
			}
			if(!Head.DefaultIcon){
				this.gift_icon.visible = false;
			}
			if(Head.DefaulInfoBg){
				this.info_bg.visible = true;
				this.info_bg.scaleX = this.info_bg.scaleY = this.headScale;
			}
			this.touchChildren = true;
			this.touchEnabled = false;
			this.avar_img.touchEnabled = true;
			this.avarFrame_img.touchEnabled = false;
			this.gift_icon.scaleX = this.gift_icon.scaleY = this.headScale;
			this.gift_icon.x = this.gift_icon.y = this.headScale*-20;
		}

		public destroy(): void {
			this.frame = null;
			if (this.anim){
				uniLib.DragonUtils.removeFastDragonbyContainer(this);
			}
		}

	}
}