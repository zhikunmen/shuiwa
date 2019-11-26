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
var gameuserinfo;
(function (gameuserinfo) {
    var UserInfoConst = (function () {
        function UserInfoConst() {
        }
        UserInfoConst.RES_JSON = "resource/gameuserinfo/gameuserinfo.res_f7a47959.json";
        UserInfoConst.THM_JSON = "resource/gameuserinfo/gameEui_3e635315.json";
        /**
         * 公共loading需要加载的资源组
         */
        UserInfoConst.GAME_USERINFO = "game_userinfo";
        return UserInfoConst;
    }());
    gameuserinfo.UserInfoConst = UserInfoConst;
    __reflect(UserInfoConst.prototype, "gameuserinfo.UserInfoConst");
})(gameuserinfo || (gameuserinfo = {}));
var gameuserinfo;
(function (gameuserinfo) {
    var UserInfoData = (function () {
        function UserInfoData() {
            /**
           * 屏蔽玩家数组
           */
            this.pingbiPlayer = [];
        }
        UserInfoData.getInstance = function () {
            if (!this._instance) {
                this._instance = new UserInfoData();
            }
            return this._instance;
        };
        return UserInfoData;
    }());
    gameuserinfo.UserInfoData = UserInfoData;
    __reflect(UserInfoData.prototype, "gameuserinfo.UserInfoData");
})(gameuserinfo || (gameuserinfo = {}));
var gameuserinfo;
(function (gameuserinfo) {
    var UserInfoPanel = (function (_super) {
        __extends(UserInfoPanel, _super);
        function UserInfoPanel() {
            var _this = _super.call(this, "zhangzhou_userinfo_json.userinfo_title", 800, 500) || this;
            _this.skinName = "UserInfoSKin";
            return _this;
        }
        UserInfoPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        UserInfoPanel.prototype.addEvent = function () {
            this._pinbigift.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onPinbiGift, this);
            this._cancelPingbi.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onCancelPingbi, this);
        };
        UserInfoPanel.prototype.initUI = function () {
            this._gift_group = new eui.Group;
            this._gift_group.x = 39;
            this._gift_group.y = 281;
            this._gift_group.width = 712;
            this._gift_group.height = 169;
            this.addChild(this._gift_group);
            var item;
            var arr = this.loadTable();
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
        };
        UserInfoPanel.prototype.loadTable = function () {
            return RES.getRes("TableGift_json");
        };
        UserInfoPanel.prototype.showUserInfo = function (data) {
            if (data) {
                this._data = data;
            }
            this._id = this._data.uid;
            if (this._id != uniLib.UserInfo.uid) {
                if (gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id) == -1) {
                    this._cancelPingbi.visible = false;
                    this._pinbigift.visible = true;
                }
                else {
                    this._cancelPingbi.visible = true;
                    this._pinbigift.visible = false;
                }
            }
            else {
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
                }
                else {
                    this._diamond_lbl.text = this._data.diamond + "";
                }
            }
            else {
                this._diamond_lbl.text = "0";
            }
            if (this._data.chips) {
                if (this._data.chips >= 100000) {
                    this._bean_lbl.text = this.numberFormat(this._data.chips);
                }
                else {
                    this._bean_lbl.text = this._data.chips + "";
                }
            }
            else {
                this._bean_lbl.text = "0";
            }
        };
        UserInfoPanel.prototype.sendGiftHandle = function (evt) {
            var giftId = evt.currentTarget.name;
            if (this._data == null)
                return;
            if (this._data.uid == uniLib.UserInfo.uid) {
                var info = new Cmd.GiftsInfo();
                info.giftsId = Number(giftId);
                info.toUid = 0;
                info.fromUid = this._data.uid;
                info.giftsNum = 1;
            }
            else {
                var info = new Cmd.GiftsInfo();
                info.giftsId = Number(giftId);
                info.toUid = this._data.uid;
                info.fromUid = uniLib.UserInfo.uid;
                info.giftsNum = 1;
            }
            var req = new Cmd.SendGiftMahjongCmd_C();
            req.gift = info;
            uniLib.NetMgr.tcpSend(req);
            this.destory();
        };
        /**存被屏蔽的玩家列表 */
        UserInfoPanel.prototype.onPinbiGift = function () {
            if (this._id != uniLib.UserInfo.uid) {
                if (gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id) == -1) {
                    gameuserinfo.UserInfoData.getInstance().pingbiPlayer.push(this._id);
                    this._cancelPingbi.visible = true;
                    this._pinbigift.visible = false;
                }
            }
        };
        /**删除屏蔽的玩家列表 */
        UserInfoPanel.prototype.onCancelPingbi = function () {
            if (gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id) != -1) {
                gameuserinfo.UserInfoData.getInstance().pingbiPlayer.splice(gameuserinfo.UserInfoData.getInstance().pingbiPlayer.indexOf(this._id), 1);
                this._cancelPingbi.visible = false;
                this._pinbigift.visible = true;
            }
        };
        UserInfoPanel.prototype.destory = function () {
            uniLib.PopUpMgr.removePopUp(this);
            this.removeEvent();
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
        };
        UserInfoPanel.prototype.numberFormat = function (num) {
            var str;
            if (num < 1e5) {
                str = "" + num;
            }
            else if (num >= 1e5 && num < 1e6) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e6 && num < 1e7) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e7 && num < 1e8) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e8 && num < 1e10) {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            else {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            return str;
        };
        return UserInfoPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    gameuserinfo.UserInfoPanel = UserInfoPanel;
    __reflect(UserInfoPanel.prototype, "gameuserinfo.UserInfoPanel");
    var GiftItem = (function (_super) {
        __extends(GiftItem, _super);
        function GiftItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GiftItemSkin";
            return _this;
        }
        GiftItem.prototype.dataChanged = function () {
            var data = this.data;
            this.name = data.giftId.toString();
            this._gift_img.texture = RES.getRes("userinfo_gift" + data.giftId);
            this._gift_name.text = data.giftName != null ? data.giftName : "";
        };
        GiftItem.prototype.destory = function () {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GiftItem;
    }(eui.ItemRenderer));
    gameuserinfo.GiftItem = GiftItem;
    __reflect(GiftItem.prototype, "gameuserinfo.GiftItem");
})(gameuserinfo || (gameuserinfo = {}));
