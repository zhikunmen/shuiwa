module paotai {
    export class TakePhonePanel extends eui.Component {

        private closeBtn: eui.WxButton;
        private tabbtn1: eui.RadioButton;
        private tabbtn2: eui.RadioButton;
        private tabbtn3: eui.RadioButton;
        private tabbtn4: eui.RadioButton;
        private tabbtn5: eui.RadioButton;
        private tabbtn6: eui.RadioButton;
        private tabbtns:eui.RadioButton[];
       
        private rewardGroup: eui.Group;
        private rewardPool:eui.BitmapLabel;
        private goldText:eui.BitmapLabel;
        private rewardMore:eui.Label;
        private rewardNext:eui.Label;
        private killFish:eui.Label;
        private chouGroup: eui.Group;
        private goldPro:eui.ProgressBar;
        private luckBtn:eui.Button;
        private fishBtn:eui.Button;
        private rewardMask:eui.Rect;
        private itmes:Array<takeRewardItem>;
        private currentIndex:number;

        private _info:Cmd.GetFishLuckyDrawInfoLobbyCmd_S;
        private _short:number;

        constructor(info?:Cmd.GetFishLuckyDrawInfoLobbyCmd_S) {
            super();
            if(info) 
                this._info = info;
            this.skinName = "TakePhoneSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.tabbtns = [this.tabbtn1,this.tabbtn2,this.tabbtn3,this.tabbtn4,this.tabbtn5,this.tabbtn6];
            this.addEvents();
            this.initUI();
            this.initData();
        }

        private addEvents(): void {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.fishBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.tabbtn1.group.addEventListener(egret.Event.CHANGE, this.onGroupChange, this);
            uniLib.Global.addEventListener(CmdConstant.GET_FISH_LUCKYDRAW, this.onFishReceive, this);
            uniLib.Global.addEventListener(CmdConstant.GET_FISH_LUCKYPRIZE, this.onFishReceive, this);
        }

        private initData():void{
            if(this._info == null){
                let req:Cmd.GetFishLuckyDrawInfoLobbyCmd_C = new Cmd.GetFishLuckyDrawInfoLobbyCmd_C();
                NetMgr.tcpSend(req);
            }else{
                this.rewardPool.text = this._info.bonus+"";
                this.currentIndex = this.findFishDraw(this._info.bonus);
                this.tabbtn1.selected = false;
                this.tabbtns[this.currentIndex-1].selected = true;
                this.setTab(this.currentIndex);
            }
        }

        private initUI():void{
            this.rewardMask.visible = false;
           this.itmes = [];

           for(var i:number=0;i<6;i++){
               var item:takeRewardItem  = new takeRewardItem();
               this.rewardGroup.addChildAt(item,0);
               item.x = i*143 - 10;
               this.itmes.push(item);
           }
        //    this.setTab(1);
        }

        private onFishReceive(evt:uniLib.ZqEvent):void{
            if(evt.type == CmdConstant.GET_FISH_LUCKYDRAW){
                this._info = evt.param;
                this.rewardPool.text = this._info.bonus+"";
                if(this.currentIndex)
                    this.tabbtns[this.currentIndex-1].selected = false;
                else
                    this.tabbtn1.selected = false;
                this.currentIndex = this.findFishDraw(this._info.bonus);
                this.tabbtns[this.currentIndex-1].selected = true;
                this.setTab(this.currentIndex);
               
            }else if(evt.type == CmdConstant.GET_FISH_LUCKYPRIZE){
                var rev:Cmd.GetFishLuckyDrawPrizeLobbyCmd_S = evt.param;
                var rewadItem:Cmd.RewardItem = new Cmd.RewardItem();
                rewadItem.goodId = rev.rewards[0].goodId;
                rewadItem.goodNbr = rev.rewards[0].goodNbr;
                this.playAwardAnim(rewadItem);
            }
        }

        private anim:Object = {};
        private playing:boolean = false;
        private playAwardAnim(rewadItem:Cmd.RewardItem):void{
            
            var index:number = -1;
            for(var i:number= 0;i<this.itmes.length;i++){
                var info:table.TableFishDraw.Award1Item = this.itmes[i].getInfo(); 
                if(info.goodId == rewadItem.goodId  && info.goodNbr == rewadItem.goodNbr){
                    index = i;
                    break;
                }
            }
            if(index == -1){
                console.error(rewadItem.goodId+" "+rewadItem.goodNbr+" 返回的奖品不在当前列表中！");
                return;
            }
            egret.Tween.removeTweens(this.anim);
            this.luckBtn.enabled = false;
            this.rewardMask.visible = true;
            var pp:number = 0;
            this.rewardGroup.addChild(this.itmes[pp]);

            this.anim["a"] = 0;
           egret.Tween.get(this.anim,{onChange:()=>{
               var ind = Math.floor(this.anim["a"]/3);
               if(pp != ind){
                   this.rewardGroup.addChildAt(this.itmes[pp],0);
                   pp = ind;
                   this.rewardGroup.addChild(this.itmes[pp]);
               }
            }}).to({ a: 17 }, 1000).to({ a: 0 }, 2000).to({ a: index*3 }, index*350).wait(400).call(()=>{
                this.rewardGroup.addChildAt(this.itmes[pp],0);
                this.rewardMask.visible = false;
                if(rewadItem.goodId == 336){
                    let panel:FuKaPanel = new FuKaPanel(rewadItem.goodNbr);
                    panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                    LoadPanelTipMgr.getInstance().loadRes(PaoTaiConsts.PUB_FUKA_DESC, () => { uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.NOMAL) })
                }else{
                    var panel = new commonConfirm.RewardPanel();
                    panel.initData2([rewadItem]);
                    panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                    uniLib.PopUpMgr.addPopUp(panel, null, true, true,0, uniLib.PopUpEffect.NOMAL,1280*panel.scaleX,720);
                }
                let req:Cmd.GetFishLuckyDrawInfoLobbyCmd_C = new Cmd.GetFishLuckyDrawInfoLobbyCmd_C();
                NetMgr.tcpSend(req);
            });
        }   

        private removeEvents(): void {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.fishBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.tabbtn1.group.removeEventListener(egret.Event.CHANGE, this.onGroupChange, this);
            uniLib.Global.removeEventListener(CmdConstant.GET_FISH_LUCKYDRAW, this.onFishReceive, this);
            uniLib.Global.removeEventListener(CmdConstant.GET_FISH_LUCKYPRIZE, this.onFishReceive, this);
        }

       private onGroupChange(e:egret.Event):void{
           var rbGroup:eui.RadioButtonGroup = e.target;
           this.setTab(Number(rbGroup.selectedValue));
       }

       /**
        *当前档次>选中档次时，不显示进度显示文字
        *当前档次=选中档次时，显示下一档所需进度
        *当前档次<选中档次时，显示选中档次所需进度 
        **/
       private setTab(index:number):void{
           var conf:table.TableFishDraw = ConfigMgr.getInstance().getFishDrawById(index);
           for(var i:number=0;i<6;i++){
               this.itmes[i].setInfo(conf.award1[i]);
           }

           if(this._info.killNum >= conf.killNumber){
                this.killFish.text = "击杀黄金鱼可继续积累奖池！"

                if(index < this.currentIndex){
                    this.chouGroup.visible = false;
                    this.rewardMore.visible = true;
                }else{
                    if(this.currentIndex == index){
                        if(this.currentIndex < 6)
                            conf = ConfigMgr.getInstance().getFishDrawById(index+1);
                        this.luckBtn.enabled = true;
                    }else{
                        this.luckBtn.enabled = false;
                    }
                    this.chouGroup.visible = true;
                    this.rewardMore.visible = false;

                    this.luckBtn.visible = true;
                    this.fishBtn.visible = false;

                    this.rewardNext.x = 8;
                    this.goldPro.x = 112;
                    this.goldPro.width = 260;
                    this.goldText.x = 242;
                    this.rewardNext.text = conf.drawType;
                    this.goldPro.minimum = 0;
                    this.goldPro.maximum = conf.needGold;
                    this.goldPro.value = Number(this.rewardPool.text);
                    this.goldText.text = this.rewardPool.text+"/"+conf.needGold;
                    this._short = conf.needGold - this._info.bonus;
                    this.goldText.anchorOffsetX = this.goldText.width>>1;
                }
            }else{
                this.killFish.text = "当前击杀黄金鱼数量不足！";
                this.rewardNext.text = "黄金鱼";
                this.rewardNext.x = 60;
                this.goldPro.x = 145;
                this.goldPro.width = 150;
                this.goldText.x = 220;
                this.goldText.text = this._info.killNum+"/"+conf.killNumber;
                this.goldPro.minimum = 0;
                this.goldPro.maximum = conf.killNumber;
                this.goldPro.value = this._info.killNum;
                this.luckBtn.visible = false;
                this.fishBtn.visible = true;
                this.goldText.anchorOffsetX = this.goldText.width>>1;
            }
            
       }

        private onTouchHandle(e: egret.TouchEvent): void {
            if(e.target == this.closeBtn){
                uniLib.PopUpMgr.removePopUp(this);
            }else if(e.target == this.luckBtn){
                let msg: uniLib.MsgBox = new uniLib.MsgBox("您仅差"+this._short+"奖池就能进行更高档次抽奖哦，是否继续抽奖？", "", "确定", ()=>{
                    let req:Cmd.GetFishLuckyDrawPrizeLobbyCmd_C = new Cmd.GetFishLuckyDrawPrizeLobbyCmd_C();
                    NetMgr.tcpSend(req);
                },"取消");
                uniLib.PopUpMgr.addPopUp(msg, null, true, true, false, uniLib.PopUpEffect.CENTER);
            }else if(e.target == this.fishBtn){
                LoadPanelTipMgr.getInstance().loadRes(paotai.PaoTaiConsts.PUB_FINGERLING, () => {
                    let panel:paotai.FingerlingPanel = new paotai.FingerlingPanel();
                    if(uniLib.Global.isInGame){
                        var panelScaleX:number = LobbyModuleMgr.getInstance().panelScaleX;
                        panel.scaleX = panelScaleX;
                        uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.CENTER,874*panelScaleX,543) 
                    }else
                        uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                });
            }
        }

        private findFishDraw(bonus:number):number{
            var obj:any =  ConfigMgr.getInstance().fishDraw;
            var mak:number[] = [];
            for (var key in obj){
                if(obj[key].needGold <= bonus){
                    mak.push(Number(key));
                }
            }
            if(mak.length == 0)
                return 1
            else{
                var max:number = 0
                mak.forEach((item)=>{
                    if(item > max)
                        max = item;
                })
                return max;
            }
        }

        public destroy(): void {
            for(var i:number=0;i<6;i++){
               uniLib.DisplayUtils.removeFromParent(this.itmes[i]);
               this.itmes[i] = null;
            }
            this.itmes = null;
            egret.Tween.removeTweens(this.anim);
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }

    export class takeRewardItem extends eui.Component{

        private goodIcon:eui.Image;
        private goodNum:eui.BitmapLabel;
        private _info:table.TableFishDraw.Award1Item;

        constructor(info?:table.TableFishDraw.Award1Item) {
            super();
            if(info)
                this._info = info;
            this.skinName = "takeRewardItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            
            if(this._info)
                this.setInfo(this._info);
        }

        public setInfo(info:table.TableFishDraw.Award1Item):void{
            this._info = info;
            this.goodIcon.source = "game_prop_json.bag_daoju_"+this._info.goodId;
            commonConfirm.ResUtil.limitImageSize(this.goodIcon,80);
            this.goodIcon.y = 104;
            if(this._info.goodNbr > 10000)
                this.goodNum.text = "x"+this._info.goodNbr/10000 +"万";
            else
                this.goodNum.text = "x"+this._info.goodNbr;
        }

        public getInfo():table.TableFishDraw.Award1Item{
            return this._info;
        }
    }
}