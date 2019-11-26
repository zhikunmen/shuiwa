/**
 * 游戏内任务面板
 */
module paoupgrade {

	export class PaoBeiPanel extends eui.ItemRenderer {

        private paobei_lst:eui.List;
        private pao_bar:eui.ProgressBar;
        private progress_txt:eui.Label;
        private _closeBtn:eui.WxButton;
        private _upBtn:eui.WxButton;

        private _guninfo:Cmd.FishGunInfo;

        public constructor(guninfo?:Cmd.FishGunInfo) {
            super();
            if(guninfo)
                this._guninfo = guninfo;
            this.skinName = "PaoBeiPanelSkin";
        }

       protected childrenCreated() {
            super.childrenCreated();

            uniLib.Global.addEventListener(CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
            this._upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);

            this.paobei_lst.itemRenderer = PaoBeiItem;
            
            if(this._guninfo)
                this.gunTimeChange(this._guninfo);
            else{
                uniLib.Global.addEventListener(CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
                let req:Cmd.RequestFishGunInfoCmd_C = new Cmd.RequestFishGunInfoCmd_C();
                NetMgr.tcpSend(req);
            }
        }

        private touchChange(evt:egret.TouchEvent):void{
            if(evt.target == this._closeBtn){
                uniLib.PopUpMgr.removePopUp(this);
            }else if(evt.target == this._upBtn){
                var difference:number = this._guninfo.cost - this._guninfo.itemnum;
                var desc:string = "是否使用"+difference+"钻石替代"+difference+"升级水晶进行炮台升级？"
                if(uniLib.UserInfo.chips < difference){    //钻石足够升级
                    desc = "还差"+difference+"个钻石才能替代升级水晶进行炮倍升级，是否前往购买？"
                }
                let confirm = new commonConfirm.ConfirmPanel(desc, null, null, () => {
                    if(uniLib.UserInfo.chips < difference){
                        LobbyModuleMgr.getInstance().showMarketPanel(0);
                    }else{
                        let req:Cmd.UnlockFishGunCmd_C = new Cmd.UnlockFishGunCmd_C();
                        NetMgr.tcpSend(req);
                    }
                    
                }, () => { }, this);
				uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
        }

        private onMsgReceiveHandler(e: uniLib.ZqEvent):void{
            if(e.type == CmdConstant.GET_FISH_GUNINFO){
                let rev: Cmd.RequestFishGunInfoCmd_S = e.param;
                this._guninfo = rev.guninfo;
                this.gunTimeChange(this._guninfo);
            }else if(e.type == CmdConstant.UNLOCK_FISHGUN){
                let rev: Cmd.UnlockFishGunCmd_S = e.param;
                this._guninfo = rev.guninfo;
                this.gunTimeChange(this._guninfo);
            }
        }

        private gunTimeChange(guninfo:Cmd.FishGunInfo):void{
            var list:table.TableFishGun[] = [];
            let tableFishGunData = <Array<table.TableFishGun>>RES.getRes("TableFishGun_json");
            for(var i:number = 0;i<tableFishGunData.length;i++){
                if(tableFishGunData[i].gunTime > guninfo.ctimes){
                    var gun:table.TableFishGun = new table.TableFishGun();
                    gun.unlockDiamon = tableFishGunData[i-1].unlockDiamon;
                    gun.unlockGold = tableFishGunData[i-1].unlockGold;
                    gun.gunTime = tableFishGunData[i].gunTime;
                    list.push(gun);
                    if(list.length == 3)
                        break;
                }
            }
            this.paobei_lst.dataProvider = new eui.ArrayCollection(list);
            this.pao_bar.minimum = 0;
            this.pao_bar.maximum = guninfo.cost;
            this.pao_bar.value = guninfo.itemnum;
            this.progress_txt.text = guninfo.itemnum+"/"+guninfo.cost;
            this.progress_txt.anchorOffsetX = this.progress_txt.width>>1;
        }

        public destroy(): void {
            uniLib.Global.removeEventListener(CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
            this._upBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
        }
    }
    
} 