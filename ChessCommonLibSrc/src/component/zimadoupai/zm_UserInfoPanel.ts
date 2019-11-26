
module chessCommonLib {
    export class zm_UserInfoPanel extends BaseEuiPanel {
        private _uid:number;
        private _head_img: eui.Image;
        private _head:eui.Group;
        private _ip_lbl:eui.Label;
        private _id_lbl:eui.Label;
        private _gps_lbl:eui.Label;
        private _bean_lbl:eui.Label;     
        private _name_lbl:eui.Label;
        private _diamond_lbl:eui.Label;
        private _gender_img:eui.Image; 
        private _giftId: number;
        private _gift_group:eui.Group;
        private _data:Cmd.UserBaseInfo;
        constructor(uid:number) {
            super("zm_userinfo_title_png");
            this._uid = uid;
			this.skinName = "chessCommonLib.zm_UserInfoSKin";
        }

        protected childrenCreated(): void {
		    super.childrenCreated();
        }

        protected initUI() {
            this._gift_group = new eui.Group;
            this._gift_group.x = 39;
            this._gift_group.y = 323;
            this._gift_group.width = 712;
            this._gift_group.height = 169;
            this.addChild(this._gift_group);
            var item:chessCommonLib.zm_GiftItem;
            var arr: Array<table.TableGift_haocai> = this.loadTable();
            for (var i = 0; i < arr.length; i++) {
				item=new chessCommonLib.zm_GiftItem();
				item.data=arr[i];
				item.x=6+120*i;
				item.y=0;
				this._gift_group.addChild(item);
                item.name = arr[i].giftId+"";
				item.touchEnabled=true;
				item.addEventListener(egret.TouchEvent.TOUCH_TAP,this.sendGiftHandle,this);
			}

        }
        private loadTable():table.TableGift_haocai[]{
			return RES.getRes("TableGift_json");
		}

        protected addEvent() {
            uniLib.Global.addEventListener(chessCommonLib.ZhiMaEventConsts.GET_USERINFO, this.showUserInfo, this);
            let info:Cmd.GetPersonalPanel_C = new Cmd.GetPersonalPanel_C;
			info.uid = this._uid;
			uniLib.NetMgr.tcpSend(info);
        }

        protected removeEvent() {
            uniLib.Global.removeEventListener(chessCommonLib.ZhiMaEventConsts.GET_USERINFO, this.showUserInfo, this);
        }

        private showUserInfo(data:uniLib.ZqEvent){
            this._data = data.param;
            if(this._data.nickname){
                this._name_lbl.text = this._data.nickname;
            }
            if(this._data.uid){
                this._id_lbl.text = "帐号："+this._data.uid+"";
            }
            if(this._data.gender == "nv"){
                this._gender_img.source = "zm_userinfo_famale_png";
            }
            else{
                this._gender_img.source = "zm_userinfo_male_png";
            }
            if(this._data.ip){
                this._ip_lbl.text = "地址："+this._data.ip;
            }
            else{
                this._ip_lbl.text = "未获取IP信息";
            }
            if(this._data.headurl){
                this._head_img.source = this._data.headurl;
            }
            if(this._data.diamond){
                if (this._data.chips >= 100000) {
					this._diamond_lbl.text = NumberUtil.numFormat2(this._data.diamond);
				} else {
					this._diamond_lbl.text = this._data.diamond + "";
				}
            }
            else{
                this._diamond_lbl.text = "0";
            }
            if(this._data.chips){
                if (this._data.chips >= 100000) {
					this._bean_lbl.text = NumberUtil.numFormat2(this._data.chips);
				} else {
					this._bean_lbl.text = this._data.chips + "";
				}
            }
            else{
                this._bean_lbl.text = "0";
            }
            if(this._data.address){
                this._gps_lbl.text = this._data.address;
            }
            else{
                this._gps_lbl.text = "";
            }
        }
        private sendGiftHandle(evt:eui.ItemTapEvent): void {
			var giftId =evt.currentTarget.name;
			if (this._data == null) return;
			if (this._data.uid == uniLib.UserInfo.uid) {
				var info: Cmd.GiftsInfo = new Cmd.GiftsInfo();
				info.giftsId = Number(giftId);
				info.toUid = 0;
				info.fromUid = this._data.uid;
				info.giftsNum = 1;
			} else {
				var info: Cmd.GiftsInfo = new Cmd.GiftsInfo();
				info.giftsId = Number(giftId);
				info.toUid = this._data.uid;
				info.fromUid = uniLib.UserInfo.uid;
				info.giftsNum = 1;
			}
            var req:Cmd.SendGiftRoomCmd_C=new Cmd.SendGiftRoomCmd_C();
            req.gift=info;
            uniLib.NetMgr.tcpSend(req);

            this.destory();
		}

        public destory(): void {
            uniLib.PopUpMgr.removePopUp(this);
			this.removeEvent()
            this._head_img = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._data = null;
			this._id_lbl = null;
			this._ip_lbl = null;
            this._gps_lbl = null;
			this._name_lbl = null;
			this._gender_img = null;
			this._bean_lbl = null;
            this._diamond_lbl = null;
		}

    }
    export class zm_GiftItem extends eui.ItemRenderer {
        private _gift_img: eui.Image;
        private _gift_name: eui.Label;
        constructor() {
            super();
            this.skinName = "chessCommonLib.zm_GiftItemSkin";
        }

        protected dataChanged() {
            let data: table.TableGift_haocai = this.data;
            this.name = data.giftId.toString();
            this._gift_img.texture = RES.getRes("zm_userinfo_gift" + data.giftId+"_png");
            this._gift_name.text = data.giftName != null ? data.giftName : "";
        }

        public destory() {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    } 
}