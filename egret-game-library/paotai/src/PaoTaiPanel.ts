module paotai {
    export class PaoTaiPanel extends eui.Component {

        public paotia_lst: eui.Group;
        public _closeBtn: eui.WxButton;
        private _paoList: PaoTaiItem[];

        constructor() {
            super();
            this.skinName = "PaoTaiPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            PaoTaiPanel.paodans = [];
            PaoTaiPanel.paoings = [];
            this.addEvents();
            this.initData();
            // this.initUI();
        }

        private addEvents(): void {
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(CmdConstant.SET_FISH_CANNON, this.onSetFishCannon, this);
            uniLib.Global.addEventListener(CmdConstant.GET_FISH_CANNON, this.onGetFishCannon, this);
        }

        private initData():void{
            let req:Cmd.GetFishCannonCmd_CS = new Cmd.GetFishCannonCmd_CS();
            NetMgr.tcpSend(req);
        }

        private initUI(usable: number[]):void{
            let list = <Array<table.TableFishGunType>>RES.getRes("TableFishGunType_json");
            this._paoList = [];
            for(var i:number=0;i<list.length;i++){
                var item:PaoTaiItem = new PaoTaiItem();
                item.setInfo(list[i],usable);
                this._paoList.push(item);
                this.paotia_lst.addChild(item);

                item.addEventListener(egret.Event.CHANGE,this.itemClickHandler,this);
            }
        }

        private removeEvents(): void {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.removeEventListener(CmdConstant.SET_FISH_CANNON, this.onSetFishCannon, this);
            uniLib.Global.removeEventListener(CmdConstant.GET_FISH_CANNON, this.onGetFishCannon, this);
        }

        private itemClickHandler(evt: egret.Event) {
            let info:table.TableFishGunType = evt.data;
            if(info.unlockType == 99){
                if(MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid){
                    let req:Cmd.SetFishCannonCmd_CS = new Cmd.SetFishCannonCmd_CS();
                    req.id = info.ID;
                    NetMgr.tcpSend(req);
                }else{
                    LobbyModuleMgr.getInstance().showMonthCard();
                }
            }else{
                let vip:number = MJLobbyData.getInstance().userInfoSynLobby.userInfo.vip;
                if(vip >= Number(info.unlockType)){
                    let req:Cmd.SetFishCannonCmd_CS = new Cmd.SetFishCannonCmd_CS();
                    req.id = info.ID;
                    NetMgr.tcpSend(req);
                }else{
                    // uniLib.TipsUtils.showTipsDownToUp("功能玩命开发中，敬请期待");
                    LobbyModuleMgr.getInstance().showVIPPanel(info.unlockType);
                }
            }
        }

        private onGetFishCannon(e: uniLib.ZqEvent):void{
            let rev: Cmd.GetFishCannonCmd_CS = e.param;
            this.initUI(rev.usable)
        }

        private onSetFishCannon(e: uniLib.ZqEvent):void{
            let rev: Cmd.SetFishCannonCmd_CS = e.param;
            for(var i:number=0;i<this._paoList.length;i++){
                if(this._paoList[i].select && rev.id !=this._paoList[i].ID){
                    this._paoList[i].select = false;
                }else if(rev.id == this._paoList[i].ID && !this._paoList[i].select){
                    this._paoList[i].select = true;
                }
            }
        }

         private onTouchHandle(e: egret.TouchEvent): void {
            uniLib.PopUpMgr.removePopUp(this);
         }

        public destroy(): void {
            for(var i:number=0;i<this._paoList.length;i++){
                this._paoList[i].removeEventListener(egret.Event.CHANGE,this.itemClickHandler,this);
                this._paoList[i].destroy();
            }
            this._paoList = null;
            PaoTaiPanel.destroy();
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }

        public static paodans:egret.Bitmap[];
        public static paoings:egret.Bitmap[] ;

        public static getPaoDan():egret.Bitmap{
            if(PaoTaiPanel.paodans.length>0){
                return PaoTaiPanel.paodans.pop();
            }else{
                var pao:egret.Bitmap = new egret.Bitmap();
                pao.texture = RES.getRes("paotai_json.hw_bullet_3");
                return pao;
            }
        }

        public static removePaoDa(pao:egret.Bitmap):void{
            if(PaoTaiPanel.paodans)
                PaoTaiPanel.paodans.push(pao);
        }

        public static destroy():void{
            PaoTaiPanel.paoings.forEach((f)=>{
                egret.Tween.removeTweens(f);
            })
            PaoTaiPanel.paoings = null;
            PaoTaiPanel.paodans = null;
        }
    }
}