module commonConfirm {
	export class RewardPanel extends eui.Component {

		////////////////////////////exml2class:开始替换声明区域///////////////////////////////
		private guangquan: egret.tween.TweenGroup;
		private light: egret.tween.TweenGroup;
		private quan1: eui.Image;
		private quan2: eui.Image;
		private image: eui.Image;
		private sure_btn: eui.Button;
		private item_grp: eui.Group;
		private panel_mask:eui.Rect;

		////////////////////////////exml2class:结束替换声明区域///////////////////////////////

		private _data: commonConfirm.ReWardDataVo[] | Cmd.RewardItem[];
		private _isCmd:boolean = false;

		constructor(data?: commonConfirm.ReWardDataVo[]) {
			super();
			this._data = data;
			this.width = uniLib.Global.screenWidth;
			this.height = uniLib.Global.screenHeight;
			this.skinName = "RewardPanelSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			if(this._data){
				if(this._isCmd)
					this.initData2();
				else
					this.initData();
			}
			this.sure_btn.once(egret.TouchEvent.TOUCH_TAP, this.onSureHandle, this);
			this.quan1.visible = true;
			this.quan2.visible = true;
			this.item_grp.touchEnabled = false;
			this.item_grp.touchChildren = false;
			uniLib.DisplayUtils.playTweenGroup(this.guangquan, false);
			uniLib.DisplayUtils.playTweenGroup(this.light, true);
		}

		public initData(data?: commonConfirm.ReWardDataVo[]) {
			if (data) {
				this._isCmd = false;
				this._data = data;
			}
			if (this._data) {
				for (var i = 0; i < this._data.length; i++) {
					var item = new commonConfirm.RewardItem(this._data[i]);
					this.item_grp.addChild(item);
					item.x = i * 164;
				}
			}
		}

		public initData2(data?: Cmd.RewardItem[]) {
			this.panel_mask.visible = false;
			if (data) {
				this._isCmd = true;
				this._data = data;
			}
			if (this._data) {
				for (var i = 0; i < this._data.length; i++) {
					var item = new commonConfirm.RewardItem2(this._data[i]);
					this.item_grp.addChild(item);
					item.x = i * 164;
				}
			}
			
		}

		private onSureHandle(e: egret.TouchEvent): void {
			uniLib.DisplayUtils.stopTweenGroup(this.guangquan);
			uniLib.DisplayUtils.stopTweenGroup(this.light);
			egret.Tween.removeTweens(this.guangquan);
			egret.Tween.removeTweens(this.light);
			uniLib.DisplayUtils.removeFromParent(this);
			uniLib.PopUpMgr.removePopUp(this);
		}
	}
}