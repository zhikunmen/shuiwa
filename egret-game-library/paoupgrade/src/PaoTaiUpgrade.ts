/**
 * 炮台升级面板
 */
module paoupgrade {

	export class PaoTaiUpgrade extends eui.Component {

    
        private open_btn: eui.WxButton;
        private group: eui.Group;
        private progress_group:eui.Group;
        private progress_txt:eui.Label;
        private pro_bar:eui.ProgressBar
        
        private unlock_gun: eui.Label;
        private unlock_gold: eui.Label;
        private _opening:boolean = true;
        private _guninfo: Cmd.FishGunInfo;
        private _finishEffect:dragonBones.Movie;
        private _canReward:boolean;

        public constructor() {
            super();
            this.skinName = "PaoTaiUpgradeSkin";
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
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
            uniLib.Global.addEventListener(CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
            uniLib.Global.addEventListener(CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
         }

        private initData():void{
            let req:Cmd.RequestFishGunInfoCmd_C = new Cmd.RequestFishGunInfoCmd_C();
            NetMgr.tcpSend(req);
        }

        private onUserInfoChanged(e: uniLib.ZqEvent): void {
            if(this._guninfo)
                this.updateReward();
        }

        private onMsgReceiveHandler(e: uniLib.ZqEvent):void{
            if(e.type == CmdConstant.GET_FISH_GUNINFO){
                let rev: Cmd.RequestFishGunInfoCmd_S = e.param;
                this._guninfo = rev.guninfo;
                this.unlock_gun.text = "解锁"+this._guninfo.ntimes+"倍炮";
                this.unlock_gun.anchorOffsetX = this.unlock_gun.width>>1;
                this.updateReward();
            }else if(e.type == CmdConstant.UNLOCK_FISHGUN){
                let rev1: Cmd.UnlockFishGunCmd_S = e.param;
                this._guninfo = rev1.guninfo;
                this.unlock_gun.text = "解锁"+this._guninfo.ntimes+"倍炮";
                this.unlock_gun.anchorOffsetX = this.unlock_gun.width>>1;
                this.updateReward();
                //飞金币 rev1.reward
            }
            if(this._guninfo.ntimes == undefined){
                uniLib.DisplayUtils.removeFromParent(this);
                this.destroy();
                return;
            }
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
            if(this._guninfo.itemnum >= this._guninfo.cost){
                this.unlock_gold.text = "领取"+this._guninfo.reward+"金币";
                
                this.playFinishEffect();
                this.progress_group.visible = false;
                this._canReward = true;
            }else{
                if(this._finishEffect){
                    this._finishEffect.animation.stop();
                    uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                }
                this.unlock_gold.text = "";
                this.progress_group.visible = true;
                this.progress_txt.text = this._guninfo.itemnum+"/"+this._guninfo.cost
                this.pro_bar.minimum = 0;
                this.pro_bar.maximum = this._guninfo.cost;
                this.pro_bar.value = this._guninfo.itemnum;
                this._canReward = false;
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
                if(this._canReward){
                    let req:Cmd.UnlockFishGunCmd_C = new Cmd.UnlockFishGunCmd_C();
                    NetMgr.tcpSend(req);
                }else{
                    LoadPanelTipMgr.getInstance().loadRes(paoupgrade.PaopgradeConsts.PUB_PAOBEI, () => {
                        let panel :PaoBeiPanel = new PaoBeiPanel(this._guninfo);
                        panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                        uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.CENTER,874*panel.scaleX,544);
                    })
                }
            }
        }

        private removeEvents(): void {
            this.open_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
            uniLib.Global.removeEventListener(CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
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