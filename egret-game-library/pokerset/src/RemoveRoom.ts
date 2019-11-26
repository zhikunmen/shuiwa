module pokerset {
	export class RemoveRoom extends eui.Component {
		private yesBtn: eui.WxButton;
		private noBtn: eui.WxButton;
		private txt: eui.Label;
		public constructor() {
			super();
			this.skinName = "poker_removeRoomSkin";
		}
		protected createChildren() {
			super.createChildren();
			this.initUI();
		}
		public setText(str:string): void{
			this.txt.text = str;
		}
		private initUI(): void {
			this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYes, this);
		}
		private removeEvent() {
			this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onYes, this);
		}
        private onYes(): void{
            uniLib.Global.dispatchEvent(pokerset.pokersetConst.DISMISS_GAME);
            this.onClose();
        }
		private onClose() {
			uniLib.PopUpMgr.removePopUp(this);
		}
		public destory(): void {
			this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}