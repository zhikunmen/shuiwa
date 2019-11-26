/**
 * 游戏内红包
 */
module paoupgrade {

	export class NoviceRedPackageBtn extends eui.Component {

        private pro_lbl:eui.Label;
        private novice_bar:eui.ProgressBar;

        public constructor() {
            super();
            this.skinName = "NoviceRedPackageBtnSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.touchEnabled = true;
            this.touchChildren = false;
            this.updateData();
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUpRedPack, this);
        }

        private onUpRedPack(evt: uniLib.ZqEvent) {
			if (evt.param == uniLib.UserInfoEnum.GIFTCOUPON) {
                this.updateData();
			}
		}

        private updateData():void{
            this.novice_bar.minimum = 0;
            
            var giftCoupon:number = uniLib.UserInfo.giftCoupon;
            this.novice_bar.value = giftCoupon;
            if(giftCoupon > 3000){
                this.novice_bar.maximum = giftCoupon;
                this.pro_lbl.text = `3000/3000`;
            }else{
                this.novice_bar.maximum = 3000;
                this.pro_lbl.text = `${giftCoupon}/3000`;
            }
        }


        public destroy(): void {
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUpRedPack, this);
            this.removeChildren();
        }
    }
    
} 