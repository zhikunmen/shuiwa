
module match {
    export class WxBuyuReward extends eui.Component {

        public _closeBtn: eui.WxButton;
        private buyu_icon:eui.Image;
        private buyu_txt:eui.Image;
        private unlock_level:eui.Label;
        private _enterBtn:eui.WxButton;
        private fishContain:eui.List;
        private rewardContain:eui.List;

        private _data:table.TableCoinHundredConfig|number;
        private _isNumber:boolean;

        private fishZH:string[] = ["人鱼海湾","哪吒闹海","大闹天宫","凌霄宝殿"];
        private fishTag:string[] = ["ryhw","lznh","dntg","lxbd"];

        constructor(data: any) {
            super();
            this._data = data;
            this.skinName = "WxBuyuRewardSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();

            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.fishContain.addEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemHandle,this);

            var fishType:table.TableFishPlay
            if(typeof this._data  === 'number'){
                this._isNumber = true;
                fishType = ConfigMgr.getInstance().getFishPlayByType(this._data);
            }else{
                fishType = ConfigMgr.getInstance().getFishPlayByType(this._data.roomType);
            }

           var index:number = this.fishZH.indexOf(fishType.playName);
           if(index>-1){
               this.buyu_icon.source = "buyu_reward_json.buyu_"+this.fishTag[index]+"_icon";
               this.buyu_txt.source = "buyu_reward_json.buyu_"+this.fishTag[index]+"_txt";
           }
           this.unlock_level.text = "解锁"+fishType.unlockTime+"倍炮";

           if(this._isNumber){
               this._enterBtn.visible = false;
           }else{
               this._enterBtn.visible = true;
               if(fishType.unlockTime > MJLobbyData.getInstance().fishGunBei){
                    this._enterBtn["bg_img"].source = "buyu_reward_json.buyu_unenter_game";
                    this._enterBtn.enabled = false;
                }else{
                    this._enterBtn["bg_img"].source = "buyu_reward_json.buyu_enter_game";
                    this._enterBtn.enabled = true;
                }
           }

           this.fishContain.itemRenderer = FishTypeItem;
           this.fishContain.dataProvider = new eui.ArrayCollection(fishType.fishType);
           this.fishContain.selectedIndex = 0;
           this.onItemHandle(null);

           this.rewardContain.itemRenderer = WxBuyuGoodItem;
        //    this.rewardContain.dataProvider = new eui.ArrayCollection(fishType.rewardNumber);
        }

        private onTouchHandle(e: egret.TouchEvent): void {
            if(e.target == this._closeBtn){
                uniLib.PopUpMgr.removePopUp(this);
            }else if(e.target == this._enterBtn){
                this.enterGame(this._data["id"],this._data["roomType"]);
            }
         }

         private updateItem():void{
             
         }

         private onItemHandle(e:eui.PropertyEvent):void{
            var fish:table.TableFish = ConfigMgr.getInstance().getFishByfishID(this.fishContain.selectedItem);
            this.rewardContain.dataProvider = new eui.ArrayCollection(fish.fishAward);
         }

         private enterGame(senceId: number,roomType:number): void {
            LoadGameTipUtil.loadGame(this._data["gameId"], (gameData: uniLib.IGameConfig) => {
                MsgSendMgr.enterGame(gameData.gameId, senceId,2,roomType);
            })
        }

        public destroy() {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.fishContain.removeEventListener(eui.ItemTapEvent.ITEM_TAP,this.onItemHandle,this);
        }
    }

    export class FishTypeItem extends eui.ItemRenderer{

        private fish :egret.Bitmap;
        private nameTxt:egret.TextField;

        constructor() {
            super();
            this.skinName = "FishTypeItemSkin"
        }

        public dataChanged() {
            super.dataChanged();

            this.fish.texture = RES.getRes("fish_common_json.fish_"+this.data);
            this.fish.anchorOffsetX = this.fish.width>>1;
            this.fish.anchorOffsetY = this.fish.height>>1;
            
            var conf:table.TableFish =  ConfigMgr.getInstance().getFishByfishID(this.data);
            if(this.data > 27){
                this.nameTxt.size = 20;
                this.nameTxt.text = conf.fishName;
            }else{
                if(conf.minTime == conf.maxTime){
                    this.nameTxt.text = conf.minTime+"倍";
                    this.nameTxt.size = 22;
                }else{
                    this.nameTxt.text = conf.minTime+"-"+conf.maxTime+"倍";
                    this.nameTxt.size = 20;
                }
            }
            
            // this.nameTxt.x = (122 - this.nameTxt.width)/2;
        }
    }

    export class WxBuyuGoodItem extends eui.ItemRenderer{
        
        private goodIcon:egret.Bitmap;
        private nameTxt:egret.TextField;
        private numTxt:egret.TextField;
   
        constructor() {
            super();
            this.width = 102;
            this.initUI();
        }

        private initUI():void{
             var bg:egret.Bitmap = new  egret.Bitmap();
             bg.texture = RES.getRes("buyu_reward_json.buyu_goods_bg");
             this.addChild(bg);

             this.goodIcon = new  egret.Bitmap();
             this.addChild(this.goodIcon);

             this.nameTxt = new egret.TextField();
             this.nameTxt.y = 106;
             this.nameTxt.fontFamily = "微软雅黑";
             this.nameTxt.textColor = 0xff2200;
             this.nameTxt.size = 20;
             this.addChild(this.nameTxt);

             this.numTxt = new egret.TextField();
             this.numTxt.y = 80;
             this.numTxt.fontFamily = "微软雅黑";
             this.numTxt.textColor = 0xfdf0c7;
             this.numTxt.size = 20;
             this.numTxt.stroke = 2;
             this.numTxt.strokeColor = 0xb65022;
             this.addChild(this.numTxt);
             
        }

         public dataChanged() {
            super.dataChanged();
            var good:table.TableFish.FishAwardItem = this.data;

            this.goodIcon.texture = RES.getRes("game_prop_json.bag_daoju_"+good.goodId);
            if(this.goodIcon.width > 102 || this.goodIcon.height > 102 ){
                this.goodIcon.width = 92;
                this.goodIcon.height = 92;
            }
            this.goodIcon.x = (102 - this.goodIcon.width)/2;
            this.goodIcon.y = (102 - this.goodIcon.height)/2;

            var conf:table.TableGoodsConfig =  ConfigMgr.getInstance().getGoodCfgById(good.goodId);
            this.nameTxt.text = conf.goodName;
            this.nameTxt.x = (102 - this.nameTxt.width)/2;

            if(good.goodNbr>= 10000)
                this.numTxt.text = good.goodNbr/10000+"万";
            else
                this.numTxt.text = good.goodNbr+"";
            this.numTxt.x = 95 - this.numTxt.width;
         }

    }
}