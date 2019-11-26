module freeBenefits {
    export class DeskCollectionPanel extends eui.Component {

        private reward_btn: eui.WxButton;


        public constructor() {
            super();
            this.skinName = "DeskCollectionSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.reward_btn.visible = MJLobbyData.getInstance().dtlaunchaward;
            this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt:egret.TouchEvent):void{
            let req = new Cmd.GetDesktopLaunchAwardHpMatchCmd_C();
            NetMgr.tcpSend(req);
        }
       

        public destroy():void{
           this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}