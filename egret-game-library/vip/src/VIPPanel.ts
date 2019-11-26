module vip {
    export class VIPPanel extends eui.Component {

        private _closeBtn: eui.WxButton;
    
        private _progressTex: eui.Label;
        private vip_start:eui.Image;
        private vip_end:eui.Image;
        private _rechargeCur:eui.Image;
        private _rechargeMask:eui.Rect;
        private _needTex:eui.Label;
        private vip_list:eui.List;
        private scrol:eui.Scroller;

        private _recharge: eui.WxButton;
        private _leftBtn: eui.WxButton;
        private _rightBtn: eui.WxButton;
        private paoEffect:egret.MovieClip;

        private _level:number = -1;
        private _maxLevel:number;
        private _extra:number = -1;
        private _dataList:eui.ArrayCollection;

        constructor(level?:number) {
            super();
            if(level)
                this._extra = level;
            this.skinName = "VipPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._rechargeCur.mask = this._rechargeMask;
            this.addEvents();
            let req:Cmd.GetFishVipInfoCmd_C = new Cmd.GetFishVipInfoCmd_C();
            NetMgr.tcpSend(req);
        }

        private addEvents(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(CmdConstant.FISHVIP_INFO, this.onFishVipInfo, this);
            uniLib.Global.addEventListener(CmdConstant.FISHVIP_REWARD, this.onFishVipReward, this);
        }

        private initUI(noget:number[],vipLevel:number):void{
            if(this._extra>-1){
                vipLevel = this._extra;
            }
            
            let vips:VipReward[] = this.getVIPLvList(noget);
            this._maxLevel = vips[vips.length-1].level;
            
            for(var i:number=0;i<vips.length;i++){
                if(vips[i].level == vipLevel){
                    this._level = vipLevel;
                    break;
                }
            }
            if(this._level == -1)
                this._level = vips[0].level;

            this.vip_list.itemRenderer = VIPItemView;
            this._dataList = new eui.ArrayCollection(vips);
           this.vip_list.dataProvider = this._dataList;
           this.vip_list.validateNow();
           this.scrol.viewport.scrollH = ((this._level-1)*785); //因为vip从1级开始的
        }

        private onFishVipInfo(e: uniLib.ZqEvent):void{
            let rev: Cmd.GetFishVipInfoCmd_S = e.param;
            this.setVip2(rev);
            if(rev.noget == null)
                rev.noget = [];
            this.initUI(rev.noget,rev.level);
            // if(this._extra==-1){
            //     this.setVip1(rev.level);
            // }
        }

        private onFishVipReward(e: uniLib.ZqEvent):void{
            let rev: Cmd.GetFishVipRewardCmd_CS = e.param;
            for(var i:number=0;i<this._dataList.length;i++){
                if(this._dataList.source[i].level == rev.level){
                    this._dataList.source[i].unReceived = false;
                    this._dataList.replaceItemAt(this._dataList.source[i],i);
                }
            }
            
        }

        private setVip2(rev: Cmd.GetFishVipInfoCmd_S):void{
            this.vip_start.source = "vip_small_"+rev.level;
            var curVip:table.TableFishVIP = ConfigMgr.getInstance().getFishVipByLv(rev.level);
            var newVip:table.TableFishVIP = ConfigMgr.getInstance().getFishVipByLv(rev.level+1);
            if(newVip){
                this.vip_end.source = "vip_small_"+newVip.vipLv;
                
                this._progressTex.text = rev.curnum +"/"+rev.totalnum;
                this._rechargeMask.width = (rev.curnum/rev.totalnum)*420;
                this._needTex.textFlow = <Array<egret.ITextElement>>[{ text: "再充值", style: { textColor: 0x8E2A06} },
                                         { text: rev.diamond+"元", style: {textColor: 0xFC00FF} },
                                        { text: "即可升级", style: { textColor: 0x8E2A06  }}];
                this._needTex.x = 300 - this._needTex.width/2;
            }else{
                this.vip_end.source = "vip_small_"+rev.level;
                this._progressTex.text = curVip.recharge +"/"+curVip.recharge;
                this._rechargeMask.width = 420;
                this._needTex.text = "";
            }
        }

        private removeEvents(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.removeEventListener(CmdConstant.FISHVIP_INFO, this.onFishVipInfo, this);
            uniLib.Global.removeEventListener(CmdConstant.FISHVIP_REWARD, this.onFishVipReward, this);
        }

        private onTouchHandle(e: egret.TouchEvent): void {
            let target: any = e.target;
            if (target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }else if (target == this._leftBtn) {
                this._level--;
                if(this._level<= 0)
                    this._level = 1;
                else{
                     this.scrollVip();
                    // this.scrol.viewport.scrollH 
                    // this.setVip1(this._level);
                }
            }else if (target == this._rightBtn) {
                this._level++;
                if(this._level > this._maxLevel)
                    this._level = this._maxLevel;
                else{
                    // this.setVip1(this._level);
                    this.scrollVip();
                }
            }else if ( target == this._recharge) {
                LobbyModuleMgr.getInstance().showMarketPanel(0);
            }
        }

        private scrollVip():void{
            if(this.scrol.viewport.scrollH != ((this._level-1)*785)){
                egret.Tween.removeTweens(this.scrol.viewport);
                egret.Tween.get(this.scrol.viewport).to({scrollH:(this._level-1)*785},200);
            }
        }

        private getVIPLvList(noget:number[]):VipReward[]{
            let tableFishVipData = <Array<table.TableFishVIP>>RES.getRes("TableFishVIP_json");
            let list:VipReward[]= [];
            tableFishVipData.forEach(f => {
                var vv = new VipReward();
                vv.level = f.vipLv;
                vv.unReceived = noget.indexOf(f.vipLv) > -1;
                list.push(vv);
            })
            return list;
        }

       

        public static createMovieClicp(groupName: string, keyName?: string): egret.MovieClip {
            var data = RES.getRes(groupName + "_json");//获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png");//获取动画文件的图片

            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName));//创建MovieClip
            return mc;
        }

        public destroy(): void {
            egret.Tween.removeTweens(this.scrol.viewport);
            if(this.paoEffect){
                this.paoEffect.stop();
                uniLib.DisplayUtils.removeFromParent(this.paoEffect);
                this.paoEffect = null;
            }
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }

    export class VipReward{
        public level:number;
        public unReceived:boolean;
    }
}