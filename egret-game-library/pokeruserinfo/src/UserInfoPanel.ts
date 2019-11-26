module pokeruserinfo {
    export class UserInfoPanel extends eui.Component {
        private gift_1: eui.Image;
        private gift_2: eui.Image;
        private gift_3: eui.Image;
        private gift_4: eui.Image;
        private gift_5: eui.Image;
        private gift_6: eui.Image;
        private giftGroup: eui.Image[];
        private nick_name: eui.Label;
        private head_img: eui.Image;
        private id_lbl: eui.Label;
        private ip_lbl: eui.Label;
        private sex_img: eui.Image;
        private point_lbl: eui.Label;
        private diomand_lbl: eui.Label;
        private close_btn: eui.WxButton;
        private _data: any;
        private _isClick: boolean = true;
        private type: number; //1.房卡 2.金币
        public constructor() {
            super();
            this.skinName = "poker_userinfoSkin";
        }
        protected createChildren() {
            super.createChildren();
            this.initUI();
        }
        public setType(index: number): void {
            this.type = index;
            if (this.type == 2) {
                this.ip_lbl.visible = false;
                this.diomand_lbl.visible = false;
                this.point_lbl.visible = false;
            }
        }
        public initUI(): void {
            this.giftGroup = [this.gift_1, this.gift_2, this.gift_3, this.gift_4, this.gift_5, this.gift_6];
            for (var i = 0; i < this.giftGroup.length; i++) {
                this.giftGroup[i].name = (i + 1).toString();
                this.giftGroup[i].touchEnabled = true;
                this.giftGroup[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            }
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
            uniLib.Global.addEventListener(pokeruserinfo.pokeruserinfoConst.USERINFO_DATA, this.setData, this);
        }

        private onClickClose(evt: egret.TouchEvent) {
            uniLib.PopUpMgr.removePopUp(this);
        }

        private onClickGift(evt: egret.TouchEvent): void {
            var item = evt.currentTarget;
            var userNum: number = 1;
            if (userNum <= 0) {
                uniLib.PopUpMgr.removePopUp(this);
                return;
            }
            var info: Cmd.GiftsInfo = new Cmd.GiftsInfo();
            if (this._data.uid == uniLib.UserInfo.uid) {
                info.toUid = 0;
                info.fromUid = this._data.uid;
            } else {
                info.toUid = this._data.uid;
                info.fromUid = uniLib.UserInfo.uid;
            }
            info.giftsId = Number(item.name);
            info.giftsNum = 1;
            this.sendMsg(info);
        }
        private sendMsg(rev): void {
            if (this._isClick) {
                var req: Cmd.SendGiftPokerCmd_C = new Cmd.SendGiftPokerCmd_C();
                req.gift = rev;
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
            }
        }
        public setData(rev): void {
            // let rev: Cmd.UserBaseInfo = evt.param;
            this._data = rev;
            this.ip_lbl.text = "地址:" + this._data.ip;
            if(this._data.headUrl){
                this.head_img.source = this._data.headUrl;
            }
            if(this._data.headurl){
                this.head_img.source = this._data.headurl;
            }
            this.id_lbl.text = "帐号:" + this._data.uid;
            if (this.type == 2) {
                this.id_lbl.text = "金币:" + this._data.chips;
            }
            this.point_lbl.text = "积分:" + this._data.points;
            if(this._data.nickName ){
                this.nick_name.text = "昵称:" + this._data.nickName;
            }
            if(this._data.nickname){
                this.nick_name.text = "昵称:" + this._data.nickname;
            }
            this.diomand_lbl.text = "钻石:" + this._data.diamond;
            if (this._data.gender == "男") {
                this.sex_img.source = "userInfo_male";
            }
            else {
                this.sex_img.source = "userInfo_female";
            }
        }

        public destory(): void {
            if (this.close_btn) {
                this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
            }
            for (var i = 0; i < this.giftGroup.length; i++) {
                this.giftGroup[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            }
            uniLib.Global.removeEventListener(pokeruserinfo.pokeruserinfoConst.USERINFO_DATA, this.setData, this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._data = null;
        }
    }
}
