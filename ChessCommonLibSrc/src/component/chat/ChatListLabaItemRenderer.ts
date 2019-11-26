module chessCommonLib {
	/**
	 * 聊天LIST喇叭ITEM
	 */
	export class ChatListLabaItemRenderer extends eui.ItemRenderer {

		private notice_lb: eui.Label;
		private chat_laba_vip_img: eui.Image;

		constructor() {
			super();
			// this.skinName = chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatLabaItemExml;
			this.skinName = "chessCommonLib.ChatLabaItemSkin"+chessCommonLib.ModuleMgr.getInstance().skinType;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}

		protected dataChanged(): void {
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

			this.notice_lb.text = "\u3000\u3000" + this.data.data.words;
			this.notice_lb.textFlow = <Array<egret.ITextElement>>[
				{ text: this.data.data.nickName+"：", style: { "textColor": ConfigMgr.getInstance().getNameColor(levle)} },
				{ text: this.data.data.words, style: { "textColor": 0xffffff } }
			];
			this.chat_laba_vip_img.source = "vip_small" + levle+"_png";

		}

	}
}