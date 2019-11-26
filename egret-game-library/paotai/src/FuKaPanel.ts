module paotai {
    export class FuKaPanel extends eui.Component {

        public closeBtn: eui.WxButton;
        public rewardBtn: eui.WxButton;
        private gift1:eui.Image;
        private gift2:eui.Image;
        private gift3:eui.Image;
        private rewardNum:eui.Label;
        private _number:number = 0;

        constructor(num:number) {
            super();
            this._number = num;
            this.skinName = "fukaDescSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvents();
            this.setWD(this.gift1);
            this.setWD(this.gift2);
            this.setWD(this.gift3);
            this.rewardNum.text = "x"+this._number;
        }

        private setWD(gift:eui.Image):void{
            commonConfirm.ResUtil.limitImageSize(gift,100);
            gift.anchorOffsetX =  gift.width>>1;
            gift.anchorOffsetY =  gift.height>>1;
        }

        private addEvents(): void {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private removeEvents(): void {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

         private onTouchHandle(e: egret.TouchEvent): void {
             if(e.target == this.closeBtn)
                uniLib.PopUpMgr.removePopUp(this);
            else if(e.target == this.rewardBtn){
                LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
            }
         }

        public destroy(): void {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}