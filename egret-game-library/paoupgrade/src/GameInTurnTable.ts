/**
 * 游戏内红包
 */
module paoupgrade {

	export class GameInTurnTable extends eui.Component {

        private turn_table:eui.WxButton;
        private receive:eui.Label;
        private countDown:number;
        private timer: egret.Timer;
        private _info:Cmd.GetInfoTurnTableCmd_S;
        private zhuanpan_btn:dragonBones.Armature;

        public constructor() {
            super();
            this.skinName = "GameInTurnTableSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.touchEnabled = true;
            this.receive.touchEnabled = false;
            this.addEvents();
            this.getReward(3);
        }

        private addEvents(): void {
            uniLib.Global.addEventListener("turntableinfo", this.onUpdateInfo, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private removeEvents(): void {
            uniLib.Global.removeEventListener("turntableinfo", this.onUpdateInfo, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            if(this.timer)
                this.timer.removeEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
        }

         private onUpdateInfo(evt: uniLib.ZqEvent) {
            this._info = evt.param;
            this.countDown = this._info.countDownSec;
            if(this.countDown <= 0){
                if(this.timer)
                    this.timer.stop();
                if(this.countDown == -1){
                    this.destroy();
                }else if(this.countDown == 0){
                    // this.turn_table.label = "免费抽奖";
                    this.addAnim();
                    this.turn_table.visible = false;
                }
            }else{
                this.turn_table.visible = true;
                this.initTime(this.countDown);
                if(this.zhuanpan_btn){
                    this.zhuanpan_btn.animation.stop();
                    uniLib.DisplayUtils.removeFromParent(this.zhuanpan_btn.display);
                    this.receive.visible = false;
                }
            }
         }

         private initTime(count:number):void{
             if(this.timer == null){
                 this.timer = new egret.Timer(1000);
                 this.timer.addEventListener(egret.TimerEvent.TIMER,this.onTimerHandler,this);
             }
             this.timer.reset();
             this.timer.start();
             this.turn_table.label = uniLib.StringUtils.formatMMSS(this.countDown);
         }

         private addAnim():void{
             if(this.zhuanpan_btn == null){
                 var resName:string = "game_zhuanpan"
                 this.zhuanpan_btn = uniLib.DragonUtils.createDragonBonesDisplay(resName + "_ske_json", resName + "_tex_json", resName + "_tex_png", uniLib.DragonType.ARMATURE);
             }
             this.addChildAt(this.zhuanpan_btn.display,0);
             this.zhuanpan_btn.display.x = 37;
             this.zhuanpan_btn.display.y = 42;
             uniLib.DragonUtils.runDragonBonesArmature(this.zhuanpan_btn, "newAnimation",0);
             this.receive.visible = true;

         }

         private onTouchHandle(e: egret.TouchEvent): void {
             if(this.countDown == 0)
                LobbyModuleMgr.getInstance().showGameInTurn(this._info);
            else
                uniLib.TipsUtils.showTipsDownToUp("多玩一会儿游戏才能抽奖哦！");
         }

        private onTimerHandler(evt:egret.TimerEvent):void{
            if(this.countDown > 0){
                this.countDown -- ;
                this.turn_table.label = uniLib.StringUtils.formatMMSS(this.countDown);
            }else{
                this.timer.stop();
                // this.turn_table.label = "免费抽奖";
                this.addAnim();
                this.turn_table.visible = false;
                this.receive.visible = true;
            }
        }

        private getReward(opType: number) {
            let req = new Cmd.GetInfoTurnTableCmd_C();
            req.opType = opType;
            NetMgr.tcpSend(req);
        }


        public destroy(): void {
            if(this.zhuanpan_btn){
                uniLib.DragonUtils.destoryDragonBonesArmature(this.zhuanpan_btn, "newAnimation");
                uniLib.DisplayUtils.removeFromParent(this.zhuanpan_btn.display);
            }
            this.removeEvents();
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
    
} 