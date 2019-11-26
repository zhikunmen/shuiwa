module customer {
	export class customerPanel extends eui.Component {
		constructor() {
			super();
			this.skinName = "LobbyCustomerlSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.width = uniLib.Global.screenWidth;
			this.height = uniLib.Global.screenHeight;
			this.addEvent();
		}

		private addEvent(): void{
			this.addEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				uniLib.PopUpMgr.removePopUp(this);
			},this);
		}

		private destroy(): void{
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP,()=>{
				uniLib.PopUpMgr.removePopUp(this);
			},this);
		}
	}
}