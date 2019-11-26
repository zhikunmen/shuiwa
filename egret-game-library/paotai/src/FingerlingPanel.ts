module paotai {
    export class FingerlingPanel extends eui.Component {

        public closeBtn: eui.WxButton;
        public fishGroup: eui.Group;

        constructor() {
            super();
            this.skinName = "FingerlingSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvents();
            this.initUI();
        }

        private initUI():void{
            var tableFish = ConfigMgr.getInstance().tableFish;
            var fishs:table.TableFish[] = [];
             for (var key in tableFish){
                 fishs.push(tableFish[key]);
            }
            fishs.sort((a:table.TableFish,b:table.TableFish):number=>{
                if(a.fishType > b.fishType)
                    return -1;
                else if(a.fishType < b.fishType)
                    return 1;
                else
                    return 0;
            })

            fishs.forEach((f,i)=>{
                var item:FingerItem = new FingerItem(f);
                this.fishGroup.addChild(item);
                item.x = Math.floor(i%5) * 161 + 11;
                item.y = Math.floor(i/5) * 210;
            })
            this.fishGroup.height = 8 * 210;
        }

        private addEvents(): void {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private removeEvents(): void {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

         private onTouchHandle(e: egret.TouchEvent): void {
             if(e.target == this.closeBtn)
                uniLib.PopUpMgr.removePopUp(this);
         }

        public destroy(): void {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }

    export class FingerItem extends egret.DisplayObjectContainer{

        constructor(info:table.TableFish) {
            super();
            this.initUI(info);
        }

        private initUI(info:table.TableFish):void{

            var bg:egret.Bitmap = new egret.Bitmap();
            bg.texture = RES.getRes("fingerling_json.fish_item_bg"+info.fishType);
            this.addChild(bg);

            var fishName:egret.TextField = uniLib.DisplayUtils.createTextLabel(0xffffff,"left",info.fishName,20,137,30,0x2f5b9d,2,68,16);
            fishName.x = (137 - fishName.textWidth)>>1;
            this.addChild(fishName);

            var fish:egret.Bitmap = new egret.Bitmap();
            fish.texture = RES.getRes("fish_common_json.fish_"+info.fishID);
            fish.x = (137 - fish.width)>>1;
            fish.y = (192 - fish.height)>>1;
            this.addChild(fish);

            var reward:egret.TextField;
            var beilv:string = info.minTime == info.maxTime ? info.minTime+"" : info.minTime + " - "+ info.maxTime
            if(info.fishType == 1)
                reward = uniLib.DisplayUtils.createTextLabel(0xfff587,"left",beilv,24,137,30,0xd85735,2,68,154);
            else if(info.fishType == 2)
                reward = uniLib.DisplayUtils.createTextLabel(0xffffff,"left","特殊奖励",20,137,30,0x2f5b9d,2,68,156);
            else if(info.fishType == 3)
                reward = uniLib.DisplayUtils.createTextLabel(0xfff587,"left",beilv,20,137,30,0xd85735,2,68,156);
            reward.x = (137 - reward.textWidth)>>1;
            this.addChild(reward);
        }
    }
}