module commonConfirm {
	export class RewardItem extends eui.Component implements eui.UIComponent {
		private _data: commonConfirm.ReWardDataVo;
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

		private initData(vo: commonConfirm.ReWardDataVo): void {
			this.giftIcon_img.source = vo.icon;
			if (vo.num) {
				var numstr:string = ResUtil.numFormat(vo.num);
				this.giftName_lb.text = `${vo.des}X${numstr}`;
			}
			else {
				// this.giftName_lb.text = vo.des;
				if (Array.isArray(vo.des)) {
					this.giftName_lb.textFlow = vo.des;
				} else {
					this.giftName_lb.text = vo.des;
				}
			}
		}

	}
}