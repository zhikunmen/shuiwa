
module gameuserinfo {
    export class UserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        private _head_img: eui.Image;
        private _head: eui.Group;
        private _ip_lbl: eui.Label;
        private _id_lbl: eui.Label;
        private _bean_lbl: eui.Label;
        private _name_lbl: eui.Label;
        private _diamond_lbl: eui.Label;
        private _gender_img: eui.Image;
        private _giftId: number;
        private _gift_group: eui.Group;
        private _data: Cmd.UserBaseInfo;
        private _pinbigift: eui.WxButton;  //屏蔽礼物按钮
        private _cancelPingbi: eui.WxButton;  //取消屏蔽礼物按钮
        private _id: number;
        constructor() {
            super("zhangzhou_userinfo_json.userinfo_title", 800, 500);
            this.skinName = "UserInfoSKin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent() {
            this._pinbigift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPinbiGift, this);
            this._cancelPingbi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPingbi, this);
        }
        protected initUI() {
            this._gift_group = new eui.Group;
            this._gift_group.x = 39;
            this._gift_group.y = 281;
            this._gift_group.width = 712;
            this._gift_group.height = 169;
            this.addChild(this._gift_group);
            var item: GiftItem;
            var arr: Array<any> = this.loadTable();
            for (var i = 0; i < arr.length; i++) {
                item = new GiftItem();
                item.data = arr[i];
                item.x = 6 + 120 * i;
                item.y = 0;
                this._gift_group.addChild(item);
                item.name = arr[i].giftId + "";
                item.touchEnabled = true;
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendGiftHandle, this);
            }

        }
        private loadTable(): any[] {
            return RES.getRes("TableGift_json");
        }

        public showUserInfo(data: any) {
            if (data) {
                this._data = data;
            }
            this._id = this._data.uid;
            if (this._id != uniLib.UserInfo.uid) {
                if (gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id) == -1) {
                    this._cancelPingbi.visible = false;
                    this._pinbigift.visible = true;
                } else {
                    this._cancelPingbi.visible = true;
                    this._pinbigift.visible = false;
                }
            } else {
                this._cancelPingbi.visible = false;
                this._pinbigift.visible = false;
            }

            if (this._data.nickname) {
                this._name_lbl.text = this._data.nickname;
            }
            if (this._data.uid) {
                this._id_lbl.text = "帐号：" + this._data.uid + "";
            }
            if (this._data.gender == "nv") {
                this._gender_img.source = "userinfo_famale";
            }
            else {
                this._gender_img.source = "userinfo_male";
            }
            if (this._data.ip) {
                this._ip_lbl.text = "地址：" + this._data.ip;
            }
            else {
                this._ip_lbl.text = "未获取IP信息";
            }
            if (this._data.headurl) {
                this._head_img.source = this._data.headurl;
            }
            if (this._data.diamond) {
                if (this._data.chips >= 100000) {
                    this._diamond_lbl.text = this.numberFormat(this._data.diamond);
                } else {
                    this._diamond_lbl.text = this._data.diamond + "";
                }
            }
            else {
                this._diamond_lbl.text = "0";
            }
            if (this._data.chips) {
                if (this._data.chips >= 100000) {
                    this._bean_lbl.text = this.numberFormat(this._data.chips);
                } else {
                    this._bean_lbl.text = this._data.chips + "";
                }
            }
            else {
                this._bean_lbl.text = "0";
            }

        }
        private sendGiftHandle(evt: eui.ItemTapEvent): void {
            var giftId = evt.currentTarget.name;
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
            var req: Cmd.SendGiftMahjongCmd_C = new Cmd.SendGiftMahjongCmd_C();
            req.gift = info;
            uniLib.NetMgr.tcpSend(req);
            this.destory();
        }
        /**存被屏蔽的玩家列表 */
        private onPinbiGift(): void {
            if (this._id != uniLib.UserInfo.uid) {
                if (gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id) == -1) {
                    gameuserinfo.UserInfoData.getInstance().pingbiPlayer.push(this._id);
                    this._cancelPingbi.visible = true;
                    this._pinbigift.visible = false;
                }
            }
        }
        /**删除屏蔽的玩家列表 */
        private onCancelPingbi(): void {
            if (gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id) != -1) {
                gameuserinfo.UserInfoData.getInstance().pingbiPlayer.splice(gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id), 1);
                this._cancelPingbi.visible = false;
                this._pinbigift.visible = true;
            }
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
            this._name_lbl = null;
            this._gender_img = null;
            this._bean_lbl = null;
            this._diamond_lbl = null;
        }
        public numberFormat(num): string {
            let str: string;
            if (num < 1e5) {
                str = "" + num;
            } else if (num >= 1e5 && num < 1e6) {
                str = (num / 1e4).toFixed(0) + "万";
            } else if (num >= 1e6 && num < 1e7) {
                str = (num / 1e4).toFixed(0) + "万";
            } else if (num >= 1e7 && num < 1e8) {
                str = (num / 1e4).toFixed(0) + "万";
            } else if (num >= 1e8 && num < 1e10) {
                str = (num / 1e8).toFixed(2) + "亿";
            } else {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            return str;
        }

    }
    export class GiftItem extends eui.ItemRenderer {
        private _gift_img: eui.Image;
        private _gift_name: eui.Label;
        constructor() {
            super();
            this.skinName = "GiftItemSkin";
        }

        protected dataChanged() {
            let data: any = this.data;
            this.name = data.giftId.toString();
            this._gift_img.texture = RES.getRes("userinfo_gift" + data.giftId);
            this._gift_name.text = data.giftName != null ? data.giftName : "";
        }

        public destory() {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}