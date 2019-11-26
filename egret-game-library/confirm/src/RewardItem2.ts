module commonConfirm {
	export class RewardItem2 extends eui.Component implements eui.UIComponent {
		private _data: Cmd.RewardItem;
		private giftIcon_img: eui.Image;
		private giftName_lb: eui.Label;
		public constructor($data: any) {
			super();
			this._data = $data;
			this.skinName = "RewardItemSkin";
		}

		protected partAdded(partName: string, instance: any): void {
			super.partAdded(partName, instance);
		}


		protected childrenCreated(): void {
			super.childrenCreated();
			this.initData(this._data);
		}

		private initData(vo: Cmd.RewardItem): void {
			this.giftIcon_img.source = "game_prop_json.bag_daoju_"+vo.goodId;
			ResUtil.limitImageSize(this.giftIcon_img,110);
			let reward = ConfigMgr.getInstance().getGoodCfgById(vo.goodId);
			if (vo.goodNbr) {
				var numstr:string = ResUtil.numFormat(vo.goodNbr);
				this.giftName_lb.text = `${reward.goodDesc}X${numstr}`;
			}
			else {
				// this.giftName_lb.text = vo.des;
				if (Array.isArray(reward.goodDesc)) {
					this.giftName_lb.textFlow = reward.goodDesc;
				} else {
					this.giftName_lb.text = reward.goodDesc;
				}
			}
		}

	}
}