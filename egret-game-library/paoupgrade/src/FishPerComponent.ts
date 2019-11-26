/**
 * 炮台升级面板
 */
module paoupgrade {

	export class FishPerComponent extends egret.DisplayObjectContainer {

       private award:UpgradeOtherAward;
       private upgrade:PaoTaiUpgrade;
       private redpack:TakeRedPack;
       private turntable:GameInTurnTable;

        public constructor() {
            super();
            this.initUI();
        }

        private initUI():void{
            if(this.upgrade == null){
                this.upgrade = new PaoTaiUpgrade();
                this.upgrade.y = 93;
                this.addChild(this.upgrade);
            }
            
            if(this.redpack == null && uniLib.Global.is_sandbox==0){
                this.redpack = new TakeRedPack();
                this.addChild(this.redpack);
                this.redpack.y = 207;
            }
            if(this.turntable == null && uniLib.Global.is_sandbox==0){
                this.turntable = new GameInTurnTable();
                this.addChild(this.turntable);
                this.turntable.y = 320;
            }
            if(this.award == null && uniLib.Global.is_sandbox==0){
                this.award = new UpgradeOtherAward();
                this.award.x = 37;
                this.addChild(this.award);
            }
        }

        public destroy(): void {
            if(this.award){
                this.award.destroy();
                this.award = null;
            }
            if(this.upgrade){
                this.upgrade.destroy();
                this.upgrade = null;
            }
            if(this.redpack){
                this.redpack.destroy();
                this.redpack = null;
            }
            if(this.turntable){
                this.turntable.destroy();
                this.turntable = null;
            }
            this.removeChildren();
        }
    }
    
} 