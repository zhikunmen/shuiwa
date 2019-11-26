/**
 * 游戏内任务面板
 */
module paoupgrade {

	export class UpgradeOtherAward extends eui.Component {

        private paopao:eui.Image;
        private goodIcon:eui.Image;
        private goodGroup:eui.Group;
        private goodItem:eui.Image;
        private goodName:eui.Label;
        private goodNum:eui.Label;
        private goodNum1:eui.Label;
        private goodDesc:eui.Label;

        private fishGunBei:number;
        private tableFishGuns:table.TableFishGun[];
        private groupRect:egret.Rectangle

        public constructor() {
            super();
            this.skinName = "UpgradeOtherAwardSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.initUI();
            this.addEvents();
            this.groupRect = new egret.Rectangle(0,0,this.goodGroup.width,this.goodGroup.height);
            this.paopao.touchEnabled = true;
            this.goodGroup.touchEnabled = false;
            this.goodGroup.touchChildren = false;
        }

        private initUI():void{
            this.tableFishGuns = [];
            let tableFishData = <Array<table.TableFishGun>>RES.getRes("TableFishGun_json");
            for(var i:number = 0;i<tableFishData.length;i++){
                if(tableFishData[i].otherAward.length > 0)
                    this.tableFishGuns.push(tableFishData[i]);
            }
            var info:table.TableFishGun.OtherAwardItem =  this.gunTimeChange(MJLobbyData.getInstance().fishGunBei);
            this.changeReward(info);
        }

        private addEvents(): void {
            this.paopao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener(CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
        }

        private gunTimeChange(gunbei:number):table.TableFishGun.OtherAwardItem{
            var length:number = this.tableFishGuns.length;
            if(gunbei <= this.tableFishGuns[0].gunTime){
                return this.tableFishGuns[0].otherAward[0];
            }else if(gunbei > this.tableFishGuns[length -1].gunTime){
                return null;
            }else{
                for(var i:number =0;i<this.tableFishGuns.length-2;i++){
                    if(this.tableFishGuns[i].gunTime < gunbei && gunbei <= this.tableFishGuns[i+1].gunTime){
                        return this.tableFishGuns[i+1].otherAward[0]; 
                    }
                }
            }
        }

        private changeReward(info:table.TableFishGun.OtherAwardItem):void{
            if(info == null){
                this.destroy();
                return;
            }
            this.goodIcon.source = "game_prop_json.bag_daoju_"+info.goodId;
            commonConfirm.ResUtil.limitImageSize(this.goodIcon,60);
            this.goodIcon.anchorOffsetX = this.goodIcon.width>>1;
            this.goodIcon.anchorOffsetY = this.goodIcon.height>>1;
            this.goodItem.source = "game_prop_json.bag_daoju_"+info.goodId;
            commonConfirm.ResUtil.limitImageSize(this.goodItem,100);
            this.goodItem.anchorOffsetX = this.goodItem.width>>1;
            this.goodItem.anchorOffsetY = this.goodItem.height>>1;
            var conf:table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.goodName.text = conf.goodName;
            this.goodNum.text = "x"+info.goodNbr;
            this.goodDesc.text = conf.goodIntroduction;
            this.goodNum1.text = info.goodNbr+"";
            this.goodNum1.anchorOffsetX = this.goodNum1.width>>1;
        }
        
        private onTouchTapHandler(evt: egret.TouchEvent): void {
            this.goodGroup.visible = !this.goodGroup.visible;
            if(this.goodGroup.visible){
                egret.setTimeout(()=>{
                    egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP,this.stageTouchHandler,this)
                },this,10)
            }
        }

        private stageTouchHandler(e:egret.TouchEvent):void{
            var point = this.goodGroup.globalToLocal(e.stageX, e.stageY);
            if(!this.groupRect.containsPoint(point)){
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.stageTouchHandler,this);
                this.goodGroup.visible = false;
            }
        }

        private onMsgReceiveHandler(e: uniLib.ZqEvent):void{
            let rev1: Cmd.UnlockFishGunCmd_S = e.param;
            var info:table.TableFishGun.OtherAwardItem = this.gunTimeChange(rev1.guninfo.ctimes);
            this.changeReward(info);
        }
       
         private removeEvents(): void {
             egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.stageTouchHandler,this);
             this.paopao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
        }

        public destroy(): void {
            this.removeEvents();
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        }

    }
    
} 