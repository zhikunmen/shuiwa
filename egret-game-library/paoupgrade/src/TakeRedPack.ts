/**
 * 炮台升级面板
 */
module paoupgrade {

	export class TakeRedPack extends eui.Component {

        private open_btn: eui.WxButton;
        private group: eui.Group;
        private progress_group:eui.Group;
        private progress_txt:eui.Label;
        private pro_bar:eui.ProgressBar
        
        private unlock_gun: eui.Label;
        private unlock_gold: eui.Label;
        private _opening:boolean = true;
        private _fishinfo: Cmd.GetFishLuckyDrawInfoLobbyCmd_S;
        private _finishEffect:dragonBones.Movie;

        public constructor() {
            super();
            this.skinName = "TakeRedPackSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.addEvents();
            this.initData();
            this.group.touchChildren = false;
            this.group.touchEnabled = true;
        }

         private addEvents(): void {
            this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener("get_fish_luckydraw", this.onMsgReceiveHandler, this);
         }

        private initData():void{
            let req:Cmd.GetFishLuckyDrawInfoLobbyCmd_C = new Cmd.GetFishLuckyDrawInfoLobbyCmd_C();
            NetMgr.tcpSend(req);
        }

        private onMsgReceiveHandler(e: uniLib.ZqEvent):void{
            this._fishinfo = e.param;
            var bonus:string = this._fishinfo.bonus+""
            if(this._fishinfo.bonus > 10000)
                bonus = this._fishinfo.bonus/10000+"万";
            this.unlock_gun.text = bonus;
            this.updateReward();
        }

        public playFinishEffect():void{
            if(this._finishEffect == null){
                this._finishEffect = uniLib.DragonUtils.createDragonBonesDisplay("finish_ske_json", "finish_tex_json","finish_tex_png",uniLib.DragonType.ARMATURE);
                this._finishEffect.touchEnabled = false;
            }
            this._finishEffect.display.x = 95;
            this._finishEffect.display.y = 35;
            this.group.addChild(this._finishEffect.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._finishEffect,"newAnimation",0);
        }

        private updateReward():void{
            if(this._fishinfo.killNum >= 5){
                this.unlock_gold.visible = true
                this.playFinishEffect();
                this.progress_group.visible = false;
                if(!this._opening){
                    this.group.visible = true;
                    egret.Tween.get(this.group).to({scaleX:1,scaleY:1},200).call(()=>{this._opening=true;this._tweening = false;});
                }
            }else{
                if(this._finishEffect){
                    this._finishEffect.animation.stop();
                    uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                }
                this.unlock_gold.visible = false
                this.progress_group.visible = true;
                this.progress_txt.text = this._fishinfo.killNum+"/"+5
                this.pro_bar.minimum = 0;
                this.pro_bar.maximum = 5;
                this.pro_bar.value = this._fishinfo.killNum;
            }
        }

        private _tweening:boolean = false;

        private onTouchTapHandler(evt: egret.TouchEvent): void {
            if(evt.target == this.open_btn){
                if(this._tweening)
                    return;
                this._tweening = true;
                if(this._opening){
                    egret.Tween.get(this.group).to({scaleX:0.01,scaleY:0.01},200).call(()=>{
                        this._opening=false;this._tweening = false;this.group.visible = false;
                    });
                }else{
                    this.group.visible = true;
                    egret.Tween.get(this.group).to({scaleX:1,scaleY:1},200).call(()=>{this._opening=true;this._tweening = false;});
                }
            }else if(evt.target == this.group){
                LobbyModuleMgr.getInstance().showFishDraw(this._fishinfo);
            }
        }

        private removeEvents(): void {
            this.open_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener("get_fish_luckydraw", this.onMsgReceiveHandler, this);
        }

        public destroy(): void {
            if(this._finishEffect){
                uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                uniLib.DragonUtils.destoryDragonBonesArmature(this._finishEffect,"newAnimation");
                this._finishEffect = null;
            }
            this._tweening = false;
            this.removeEvents();
            egret.Tween.removeTweens(this.group);
            this.removeChildren();
        }
    }
    
} 