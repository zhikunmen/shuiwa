/**
 * 百人头像组件(暂时只是把头像公共显示统一，后续需要统一头像vo信息)
 */
module chessCommonLib {
	export class BrSeat extends eui.Component implements eui.UIComponent {
		/**
		 * 昵称文本框
		 */
		public nickName_lbl: eui.Label;
		/**
		 * 筹码文本框
		 */
		public chips_lbl: eui.BitmapLabel;
		/**
		 * 文字背景
		 */
		public lb_bg_img: eui.Image;
		/**
		 * 空座位时
		 */
		public empty_bg: eui.Image;

		public head: chessCommonLib.Head;
		public static CHIPCHANCE:boolean = false;

		// private _nickName: string;
		// private _chips: number;
		// private _vipLevel: number;

		private DEFAULT_BG: string = "br_seatHead_png";

		public constructor(skin: string = "chessCommonLib.BrSeatSkin", w: number = 100, h: number = 100) {
			super();
			if (skin != null) {
				this.skinName = skin;
			} else {
				this.skinName = "chessCommonLib.BrSeatSkin";
			}
			this.width = w;
			this.height = h;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			// this.vipLevel = this._vipLevel;
			// this.nickName = this._nickName;
			// this.chips = this._chips;

			this.touchChildren = true;
			this.touchEnabled = false;
			this.head.touchEnabled = false;
			this.head.touchChildren = true;
			this.lb_bg_img.touchEnabled = false;
			this.chips_lbl.y = 90;
			this.chips_lbl.x = this.width>>1;
		}

		public stand(): void {
			if (this.empty_bg)
				this.empty_bg.visible = true;
			if (this.lb_bg_img)
				this.lb_bg_img.visible = false;
			this.nickName = "";
			if (this.chips_lbl)
				this.chips_lbl.text = "";

			if (this.head)
				this.head.visible = false;
		}

		public sit(vo: BrSeatVo): void {
			if (vo.uid){
				this.updateSeat(vo);
			}
		}

		public updateSeat(vo: BrSeatVo): void {
			if (this.head) {
				this.head.visible = true;
				this.head.headUrl = vo.headUrl;
			}
			if (this.lb_bg_img)
				this.lb_bg_img.visible = true;
			if (this.empty_bg)
				this.empty_bg.visible = false;
			this.setHeadFrame(vo.vipLevel,vo.personalImage);
			this.nickName = vo.nickName;
			this.chips = vo.remainder;
		}

		public set nickName(str: string) {
			if (this.nickName_lbl) {
				this.nickName_lbl.visible = true;
				this.nickName_lbl.text = str;
			}
		}

		public set chips(num: number) {
			if(num == null){
				console.error("chips is underfind");
				return;
			}
				
			if (this.chips_lbl) {
				this.chips_lbl.visible = true;
				if(!BrSeat.CHIPCHANCE){
					if (num >= 100000) {
						this.chips_lbl.text = chessCommonLib.NumberUtil.numberFormat(num);
					} else {
						this.chips_lbl.text = num + "";
					}
				}else{
					this.chips_lbl.text = num.toFixed(2) +"元";
					// if(parseInt(num+"")==num){
					// 	this.chips_lbl.text = num+".00元";
					// }else{
					// 	this.chips_lbl.text = num+"0元";
					// }
					// this.chips_lbl.font = "jinbi_num_2_fnt";
				}
				this.chips_lbl.anchorOffsetX = this.chips_lbl.width>>1;
				console.log(12);
			}
		}

		// public set vipLevel(level: number) {
		// 	if (!level) level = 0;
		// 	this.head.vipLevel = level
		// 	let vipCfg: table.TableVip = ConfigMgr.getInstance().getVipByLevel(level);
		// 	if (vipCfg) {
		// 		if (this.nickName_lbl) {
		// 			this.nickName_lbl.textColor = Number(vipCfg.nickNameColor);
		// 		}
		// 		if (this.head) {
		// 			this.head.visible = true;
		// 			this.head.frame = vipCfg.head_frame;
		// 		}
		// 	}
		// }

		public setHeadFrame(level: number,personInfo?: Cmd.PersonalImage[]):void{
			if (this.head) {
				this.head.visible = true;
				this.head.destroy();
				if(personInfo){
					this.head.setHeadFrame(level,personInfo)
				}
				else
					this.head.vipLevel = level;
			}
			if(level == 9)
				this.nickName_lbl.textColor = 0xff0000;
			else
				this.nickName_lbl.textColor = 0xffffff;
		}
	}
}