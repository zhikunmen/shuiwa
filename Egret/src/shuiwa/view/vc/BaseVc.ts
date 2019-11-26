namespace SWGAME {
	export class BaseVc extends eui.Component{


		public constructor() {
			super();
		}

		protected createChildren(){
            super.createChildren();
            this.initUI();
		}

		protected initUI():void{
    	}

		public destroy():void{

            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}