module match {
    export class WxBuYuSelectItem extends eui.Component {

        public touch_btn: eui.WxButton;
        public reward_btn:eui.WxButton;

        public lock_desc:eui.Group;
        public lock_tex:eui.BitmapLabel;

        private _info:table.TableCoinHundredConfig;
        public static SELECT_BUYU_ICONS:string[] = ["buyu_ryht","buyu_lznh","buyu_dntg","buyu_lxbd"];
        private _created:boolean;

        constructor() {
            super();
            this.skinName = "WxBuYuSelectItemSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            if(uniLib.Global.is_sandbox != 0)
                this.reward_btn.visible = false;
            this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.touch_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.lock_desc.touchEnabled = false;
            this.lock_desc.touchChildren = false;
            this._created = true;
            if(this._info)
                this.setInfo(this._info);
        }

        public setInfo(data:table.TableCoinHundredConfig) {
            this._info = data;
            if(this._created == false)
                return;
            this.name = WxBuYuSelectItem.SELECT_BUYU_ICONS[this._info.roomType -1];
            this.touch_btn["bg_img"].source = "buyu_select_json." + this.name;
         
            if (this._info.lowestCarry < 10000) {
                this.touch_btn["lowestCarry_lbl"].text = this._info.lowestCarry + "金币准入";
            }
            else {
                this.touch_btn["lowestCarry_lbl"].text = this._info.lowestCarry / 10000 + "万金币准入";
            }

            // if (this._info.lowestBetChips < 10000) {
            //     this.touch_btn["point_lbl"].text = this._info.lowestBetChips.toString();
            // }
            // else {
            //     this.touch_btn["point_lbl"].text = this._info.lowestBetChips / 10000 + "万";
            // }
            var fishType:table.TableFishPlay = ConfigMgr.getInstance().getFishPlayByType(this._info.roomType);
            

            if(fishType.unlockTime > MJLobbyData.getInstance().fishGunBei){
                this.lock_tex.text = fishType.unlockTime+"倍";
                this.lock_desc.visible = true;
            }else{
                this.lock_desc.visible = false;
            }
        }

        private onTouchHander(event:egret.TouchEvent):void{
            if(event.target == this.touch_btn){
                if(this.lock_desc.visible)
                    LobbyModuleMgr.getInstance().showDailyRecharge();
                else
                    this.dispatchEvent(new match.BuYuEvent(match.BuYuEvent.CLICK_ITEM_GAME,this._info))
            }else if(event.target == this.reward_btn){
                this.dispatchEvent(new match.BuYuEvent(match.BuYuEvent.CLICK_ITEM_REWARD,this._info))
            }
        }

        public destroy():void{
            this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.touch_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
