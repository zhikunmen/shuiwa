module reward {
    export class ActiveBoxPanel extends eui.Component {

    
       private goods:eui.Group;
       private _taskReward:table.LobbyTaskConfig.TaskRewardItem[];
       private _items:RewardItem[];


        public constructor(taskReward: table.LobbyTaskConfig.TaskRewardItem[]) {
            super();
            this._taskReward = taskReward;
            this.skinName = "ActiveBoxPanelSkin"
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._items = [];
            for(var i:number = 0;i<this._taskReward.length;i++){
                var item :RewardItem = new RewardItem(this._taskReward[i]);
                this.goods.addChild(item);
                item.x = i%2 * 189;
                if(this._taskReward.length == 2)
                    item.y = 88;
                else
                    item.y = Math.floor(i/2)*177;
            }
        }
        

        public destroy(): void {
            if(this._items){
                for(var j:number=0;j<this._items.length;j++){
                   this._items[j].destroy();
                }
                this._items = null;
            }
            this.removeChildren();
        }
    }

    export class RewardItem extends egret.DisplayObjectContainer{

        private gift:egret.Bitmap;
        public info:table.LobbyTaskConfig.TaskRewardItem;

        public constructor($info:table.LobbyTaskConfig.TaskRewardItem) {
            super();
            this.initUI($info);
            this.touchEnabled = true;
        }

        private initUI($info:table.LobbyTaskConfig.TaskRewardItem):void{
            this.info = $info;

            this.gift = new egret.Bitmap();
            this.gift.texture = RES.getRes("active_reward_json.active_item_bg");
            this.addChild(this.gift);

            var icon = new egret.Bitmap();
            icon.texture = RES.getRes("game_prop_json.bag_daoju_"+this.info.goodId);
            this.addChild(icon);
            commonConfirm.ResUtil.limitImageSize(icon,110);
            icon.x = (this.gift.width - icon.width)>>1;
            icon.y = (this.gift.height - icon.height - 34)>>1;

            let tf = new egret.TextField();
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xffffff;
            tf.size = 24;
            this.addChild(tf);

            let goodConfig = ConfigMgr.getInstance().getGoodCfgById(this.info.goodId);
            tf.text = goodConfig.goodName +"x"+ this.info.goodNbr;
            tf.x = (this.gift.width - tf.width)/2;
            tf.y = this.gift.height - tf.height - 4;
        }

       

        public destroy(): void {
            if(this.gift){
                egret.Tween.removeTweens(this.gift);
                this.gift = null;
            }
        }

    }
}