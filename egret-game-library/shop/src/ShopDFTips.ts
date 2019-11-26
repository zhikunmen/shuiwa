module shop {
	/**代付提示 分享给好友*/
	export class ShopDFTips extends eui.Component {

		public send_btn: eui.WxButton;
		public close_btn: eui.WxButton;
		public shopName_lbl: eui.Label;
		public price_lbl: eui.Label;

		private _shopId: number;

		public constructor(shopId: number) {
			super();
			this._shopId = shopId;
			this.skinName = "ShopDFTipsSkin";
		}

		public childrenCreated() {
			super.childrenCreated();
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.send_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

			let shopC = ConfigMgr.getInstance().getShopCfgById(this._shopId);
			let goodConfig = ConfigMgr.getInstance().getGoodCfgById(shopC.shopGoods.goodId);
			if (goodConfig) {
				this.shopName_lbl.text = goodConfig.goodName;
				this.price_lbl.text = "X" + Math.floor(shopC.price / 100);
			}
		}

		private onTouch(evt: egret.TouchEvent) {
			if (evt.target == this.close_btn) {
				uniLib.PopUpMgr.removePopUp(this);
			}
			else if (evt.target == this.send_btn) {
				let share = new uniLib.WXShareVo();
				share.opType = Cmd.ShareOpType.share;
				share.shareType = Cmd.ShareType.payOther;
				let config = MJLobbyData.getInstance().lobbyConfig;
				if (config) {
					share.title = config.newshareContent[config.newshareContent.length - 1];
					share.shareImageUrl = wxgame.Global.instance.shareIconUrl + "shareIcons/" + config.newsharepicture[config.newsharepicture.length - 1];
				}
				share.wgShareData = JSON.stringify({ shopId: this._shopId, uid: uniLib.UserInfo.uid, nickName: uniLib.UserInfo.nickName, headUrl: uniLib.UserInfo.headUrl });
				uniLib.ZQGameSdk.share(share);
			}
		}

		public destroy() {
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.send_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this._shopId = null;
		}
	}
}