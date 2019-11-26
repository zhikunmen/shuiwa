var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var pokeruserinfo;
(function (pokeruserinfo) {
    var pokeruserinfoConst = (function () {
        function pokeruserinfoConst() {
        }
        pokeruserinfoConst.RES_JSON = "resource/pokeruserinfo/pokeruserinfo.res_494d7194.json";
        pokeruserinfoConst.THM_JSON = "resource/pokeruserinfo/gameEui_d22be9c1.json";
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        pokeruserinfoConst.POKER_USERINFO = "poker_userinfo";
        /**送礼动画资源 */
        pokeruserinfoConst.POKER_GIFT = "poker_gift";
        /**二级面板资源 */
        pokeruserinfoConst.POKER_FRAME = "poker_frame";
        /**公共资源 */
        pokeruserinfoConst.POKER_COMMON = "poker_common";
        /**送礼通知 */
        pokeruserinfoConst.SEND_GIFTS_NOTICE = "send_gifts_notice";
        /**用户信息数据 */
        pokeruserinfoConst.USERINFO_DATA = "USERINFO_DATA";
        return pokeruserinfoConst;
    }());
    pokeruserinfo.pokeruserinfoConst = pokeruserinfoConst;
    __reflect(pokeruserinfoConst.prototype, "pokeruserinfo.pokeruserinfoConst");
})(pokeruserinfo || (pokeruserinfo = {}));
var Cmd;
(function (Cmd) {
    function OnSendGiftPokerCmd_Brd(rev) {
        uniLib.Global.dispatchEvent(pokeruserinfo.pokeruserinfoConst.SEND_GIFTS_NOTICE, rev);
    }
    Cmd.OnSendGiftPokerCmd_Brd = OnSendGiftPokerCmd_Brd;
})(Cmd || (Cmd = {}));
var pokeruserinfo;
(function (pokeruserinfo) {
    var UserInfoPanel = (function (_super) {
        __extends(UserInfoPanel, _super);
        function UserInfoPanel() {
            var _this = _super.call(this) || this;
            _this._isClick = true;
            _this.skinName = "poker_userinfoSkin";
            return _this;
        }
        UserInfoPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initUI();
        };
        UserInfoPanel.prototype.setType = function (index) {
            this.type = index;
            if (this.type == 2) {
                this.ip_lbl.visible = false;
                this.diomand_lbl.visible = false;
                this.point_lbl.visible = false;
            }
        };
        UserInfoPanel.prototype.initUI = function () {
            this.giftGroup = [this.gift_1, this.gift_2, this.gift_3, this.gift_4, this.gift_5, this.gift_6];
            for (var i = 0; i < this.giftGroup.length; i++) {
                this.giftGroup[i].name = (i + 1).toString();
                this.giftGroup[i].touchEnabled = true;
                this.giftGroup[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickGift, this);
            }
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickClose, this);
            uniLib.Global.addEventListener(pokeruserinfo.pokeruserinfoConst.USERINFO_DATA, this.setData, this);
        };
        UserInfoPanel.prototype.onClickClose = function (evt) {
            uniLib.PopUpMgr.removePopUp(this);
        };
        UserInfoPanel.prototype.onClickGift = function (evt) {
            var item = evt.currentTarget;
            var userNum = 1;
            if (userNum <= 0) {
                uniLib.PopUpMgr.removePopUp(this);
                return;
            }
            var info = new Cmd.GiftsInfo();
            if (this._data.uid == uniLib.UserInfo.uid) {
                info.toUid = 0;
                info.fromUid = this._data.uid;
            }
            else {
                info.toUid = this._data.uid;
                info.fromUid = uniLib.UserInfo.uid;
            }
            info.giftsId = Number(item.name);
            info.giftsNum = 1;
            this.sendMsg(info);
        };
        UserInfoPanel.prototype.sendMsg = function (rev) {
            if (this._isClick) {
                var req = new Cmd.SendGiftPokerCmd_C();
                req.gift = rev;
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
            }
        };
        UserInfoPanel.prototype.setData = function (rev) {
            // let rev: Cmd.UserBaseInfo = evt.param;
            this._data = rev;
            this.ip_lbl.text = "地址:" + this._data.ip;
            if (this._data.headUrl) {
                this.head_img.source = this._data.headUrl;
            }
            if (this._data.headurl) {
                this.head_img.source = this._data.headurl;
            }
            this.id_lbl.text = "帐号:" + this._data.uid;
            if (this.type == 2) {
                this.id_lbl.text = "金币:" + this._data.chips;
            }
            this.point_lbl.text = "积分:" + this._data.points;
            if (this._data.nickName) {
                this.nick_name.text = "昵称:" + this._data.nickName;
            }
            if (this._data.nickname) {
                this.nick_name.text = "昵称:" + this._data.nickname;
            }
            this.diomand_lbl.text = "钻石:" + this._data.diamond;
            if (this._data.gender == "男") {
                this.sex_img.source = "userInfo_male";
            }
            else {
                this.sex_img.source = "userInfo_female";
            }
        };
        UserInfoPanel.prototype.destory = function () {
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
        };
        return UserInfoPanel;
    }(eui.Component));
    pokeruserinfo.UserInfoPanel = UserInfoPanel;
    __reflect(UserInfoPanel.prototype, "pokeruserinfo.UserInfoPanel");
})(pokeruserinfo || (pokeruserinfo = {}));
