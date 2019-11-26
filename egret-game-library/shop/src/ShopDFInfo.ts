module shop {
	/**代付信息 帮好友代付*/
	export class ShopDFInfo extends eui.Component {

		public refuse_btn: eui.WxButton;
		public pay_btn: eui.WxButton;
		public close_btn: eui.WxButton;
		public id_lbl: eui.Label;
		public nickName_lbl: eui.Label;
		public goodName_lbl: eui.Label;
		public price_lbl: eui.Label;
		public head_img: eui.Image;

		private _timeIndex: number;
		private _wgShareData: string;
		public constructor() {
			super();

			this.skinName = "ShopDFInfoSkin";
		}

		public childrenCreated() {
			super.childrenCreated();
			this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.pay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.refuse_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
		}

		public setData(wgShareData: string) {
			this._wgShareData = wgShareData;
			let data = JSON.parse(this._wgShareData);
			if (data) {
				this.id_lbl.text = data.uid;
				this.nickName_lbl.text = data.nickName;
				this.head_img.source = data.headUrl;
				let shopId = data.shopId;
				let shopCfg = ConfigMgr.getInstance().getShopCfgById(shopId);
				let goodCfg = ConfigMgr.getInstance().getGoodCfgById(shopCfg.shopGoods.goodId);
				if (goodCfg) {
					this.goodName_lbl.text = goodCfg.goodName;
					this.price_lbl.text = Math.floor(shopCfg.price / 100) + "元";
				}
			}
		}

		private onTouch(evt: egret.TouchEvent) {
			if (evt.target == this.close_btn) {
				uniLib.PopUpMgr.removePopUp(this);
			}
			if (evt.target == this.pay_btn) {
				let data = JSON.parse(this._wgShareData);
				if (data && data.shopId) {
					if (this._timeIndex) {
						uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
					}
					else {
						let shopCfg = ConfigMgr.getInstance().getShopCfgById(data.shopId);
						shopCfg && shop.ShopControl.checkSession(shopCfg, { recvuid: data.uid });
						this._timeIndex = egret.setTimeout(() => { egret.clearTimeout(this._timeIndex); this._timeIndex = null; }, this, 5000);
					}
				}
			}
			else if (evt.target == this.refuse_btn) {
				uniLib.PopUpMgr.removePopUp(this);
			}
		}

		public destroy() {
			this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this.refuse_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
			this._wgShareData = null;
			egret.clearTimeout(this._timeIndex);
			this._timeIndex = null;
		}
	}
}