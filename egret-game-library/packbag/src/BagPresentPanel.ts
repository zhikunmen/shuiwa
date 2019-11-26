module packbag {
    export class BagPresentPanel extends eui.Component {

        private _closeBtn: eui.WxButton;
        private _reduceBtn: eui.WxButton;
        private _addBtn: eui.WxButton;
        private _confirmBtn: eui.WxButton;
        private daoju_name:eui.Label;
        private daoju_icon:eui.Image;
        private num_tex:eui.EditableText;
        private friend_id:eui.EditableText;

        private _info:Cmd.BackpackInfo;
        private _count:number;


        public constructor(info:Cmd.BackpackInfo) {
            super();
            this._info = info;
            this.skinName = "BagPresentSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

            let goods: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(this._info.goodId);
            this.daoju_name.text = goods.goodName;
            this.daoju_name.anchorOffsetX = this.daoju_name.width>>1;
            this.daoju_icon.source = "game_prop_json.bag_daoju_"+this._info.goodId;
            this._count = 1;
            this.num_tex.text = this._count+"";
        }

        private onTouchHandler(evt:egret.TouchEvent):void{
            if(evt.target == this._closeBtn){
                uniLib.PopUpMgr.removePopUp(this);
            }else if(evt.target == this._confirmBtn){
                this._count = this.getNum();
                if(this._count > this._info.number){
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量");
                    return;
                }else if(this._count < 1){
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个");
                    return;
                }

                var friend:number = Number(this.friend_id.text);
                if(friend == 0){
                    uniLib.TipsUtils.showTipsDownToUp("请正确填写对方的ID");
                    return;
                }

                let req:Cmd.BackpackPresentRequestBackpackCmd_C = new Cmd.BackpackPresentRequestBackpackCmd_C();
                var packInfo:Cmd.BackpackInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = this._count;
                req.backpackInfo = packInfo; 
                req.uid = friend;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }else if(evt.target == this._reduceBtn){
                this._count = this.getNum();
                if(this._count>1){
                    this._count --;
                    this.num_tex.text = this._count+"";
                }else{
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个")
                }
            }else if(evt.target == this._addBtn){
                this._count = this.getNum();
                if(this._count < this._info.number){
                    this._count ++;
                    this.num_tex.text = this._count+"";
                }else{
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量")
                }
            }
        }

        private getNum():number{
            var num:number = Number(this.num_tex.text)
            if(num == null)
                return -1;
            else
                return num;
        }

        public destroy(): void {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        }
    }
}