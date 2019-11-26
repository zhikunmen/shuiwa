module chessCommonLib {
	export class ChatListItemRenderer extends eui.ItemRenderer {

		private avar_img: eui.Image;
		private vip_img: eui.Image;
		private name_txt: eui.Label;
		private time_txt: eui.Label;
		private chat_txt: eui.Label;

		constructor() {
			super();
			// this.skinName = chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatItemExml;
			this.skinName = "chessCommonLib.ChatListItemSkin"+chessCommonLib.ModuleMgr.getInstance().skinType;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.avar_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
			this.vip_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
			this.vip_img.x = -9;
			this.vip_img.y = -1;
			this.vip_img.width = 105;
			this.vip_img.height = 90;
			
			this.once(egret.Event.REMOVED_FROM_STAGE, this.removeListen, this);
		}

		private showUserinfoPanel() {
			 uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.USERINFO,{"uid":this.data.data.uid,"gameId":0});
		}

		private removeListen(){
			this.vip_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
			
			this.avar_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
		}

		protected dataChanged(): void {
			// this.time_txt.text = uniLib.StringUtils.formatDDHHMMSS(this.data.data.time);
			// console.error("-----dataChanged",this.data);



			var _data: Cmd.UI_CommonChat_Brd = this.data.data;
			this.time_txt.text = this.changeTimeToStr(this.data.data.time) ;
			let vipLevel = this.data.data.vipLevel;
			let levle:number

			if(typeof vipLevel === 'number'){
				levle = vipLevel;
			}else if(typeof vipLevel === 'string'){
				if(vipLevel.indexOf("mjl_vip_icon") == -1)
					levle = Number(vipLevel);
				else{
					levle = Number(vipLevel.substr(12,vipLevel.length));
				}
			}

			this.name_txt.textColor = ConfigMgr.getInstance().getNameColor(levle);
			let vipCfg: table.TableVip = ConfigMgr.getInstance().getVipByLevel(levle);
			// this.vip_img.source = vipCfg.head_frame;
			this.vip_img.source = "info_img_bg_png";
			this.vip_img.width = 50;
			this.vip_img.height = 47;
			this.vip_img.x = 20;
			this.vip_img.y = 19;
		}

		private changeTimeToStr = function (num) {
            if (num == null)
                return "";
            num = num.toString().length == 10 ? num * 1000 : num;
            var date = new Date();
            date.setTime(num);
            // var str = date.getFullYear() + "-" + this.getNumStr(date.getMonth() + 1) + "-" + this.getNumStr(date.getDate()) + "  " + this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
             var str =  this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
			return str;
        };

		   private getNumStr = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        };

	}
}