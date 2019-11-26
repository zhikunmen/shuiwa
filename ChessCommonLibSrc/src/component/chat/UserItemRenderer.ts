module chessCommonLib {
	export class UserItemRenderer extends eui.ItemRenderer {
		private vip_img: eui.Image;
		private avar_img: eui.Image;
		private frame_img: eui.Image;
		private name_lb: eui.Label;
		private gold_lb: eui.Label;

		constructor() {
			super();
			var skinType = 
			this.skinName = "chessCommonLib.UserListItemSkin"+chessCommonLib.ModuleMgr.getInstance().skinType;
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			this.avar_img.touchEnabled = true;
			this.avar_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
			this.vip_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
			this.vip_img.x = -15;
			this.vip_img.y = -7;
			this.vip_img.width = 115;
			this.vip_img.height = 105;
			this.once(egret.Event.REMOVED_FROM_STAGE, this.removeListen, this);
		}

		private showUserinfoPanel() {
			 uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.USERINFO,{"uid":this.data.uid,"gameId":0});
		}

		private removeListen() {
			this.vip_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
			this.avar_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
		}

		protected dataChanged(): void {
			this.gold_lb.text = "" + uniLib.StringUtils.formatCurrencyByTotalLen((this.data.remainder), true, 6) + "";
			var vipLevel = this.data.vipLevel;
			let levle;

			if(typeof vipLevel === 'number'){
				levle = vipLevel;
			}else if(typeof vipLevel === 'string'){
				if(vipLevel.indexOf("mjl_vip_icon") == -1)
					levle = Number(vipLevel);
				else{
					levle = Number(vipLevel.substr(12,vipLevel.length));
				}
			}
			this.name_lb.textColor = ConfigMgr.getInstance().getNameColor(Number(levle));
			// this.vip_img.source = "vip_icon"+levle+"_png";
			this.vip_img.source = "info_img_bg_png";
			this.vip_img.width = 50;
			this.vip_img.height = 47;
			this.vip_img.x = 20;
			this.vip_img.y = 19;
		}

	}
}