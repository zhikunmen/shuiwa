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
var pokergps;
(function (pokergps) {
    /**
     *玩家之间距离面板
     */
    var GPSPanel = (function (_super) {
        __extends(GPSPanel, _super);
        function GPSPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "poker_gpsPanelSkin";
            return _this;
        }
        GPSPanel.prototype.init = function () {
            this.addEvent();
        };
        GPSPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.init();
        };
        GPSPanel.prototype.setData = function (rev) {
            this._list = rev;
            if (this._list.length >= 1) {
                this._dissolve_btn.visible = true;
                this._continue_btn.visible = true;
            }
            else {
                this._dissolve_btn.visible = false;
                this._continue_btn.visible = false;
            }
            for (var i = 0; i < this._list.length; i++) {
                if (this._list[0]) {
                    this._user1 = this._list[0];
                }
                if (this._list[1]) {
                    this._user2 = this._list[1];
                }
                if (this._list[2]) {
                    this._user3 = this._list[2];
                }
            }
            var userDistance1;
            var userDistance2;
            var userDistance3;
            if (this._user1) {
                this._user_name1.text = this._user1.nickName;
                this._head_img1.source = this._user1.headUrl;
            }
            if (this._user2) {
                this._user_name2.text = this._user2.nickName;
                this._head_img2.source = this._user2.headUrl;
            }
            if (this._user1 && this._user2) {
                userDistance1 = uniLib.Utils.getDistance(this._user1.lat, this._user1.lng, this._user2.lat, this._user2.lng);
                if (userDistance1 <= 1000) {
                    this._distance_bg1.source = "pdk_gps_red";
                    this._distance_txt1.text = Math.ceil(userDistance1) + "米";
                }
                else if (isNaN(userDistance1)) {
                    this._distance_bg1.source = "pdk_gps_green";
                    this._distance_txt1.text = "无";
                }
                else {
                    this._distance_bg1.source = "pdk_gps_green";
                    this._distance_txt1.text = Math.ceil(userDistance1 / 1000) + "公里";
                }
            }
            if (this._user3) {
                this._user_name3.text = this._user3.nickName;
                this._head_img3.source = this._user3.headUrl;
            }
            if (this._user3 && this._user2) {
                userDistance2 = uniLib.Utils.getDistance(this._user2.lat, this._user2.lng, this._user3.lat, this._user3.lng);
                if (userDistance2 <= 1000) {
                    this._distance_bg2.source = "pdk_gps_red";
                    this._distance_txt2.text = Math.ceil(userDistance2) + "米";
                }
                else if (isNaN(userDistance2)) {
                    this._distance_bg2.source = "pdk_gps_green";
                    this._distance_txt2.text = "无";
                }
                else {
                    this._distance_bg2.source = "pdk_gps_green";
                    this._distance_txt2.text = Math.ceil(userDistance2 / 1000) + "公里";
                }
            }
            if (this._user3 && this._user1) {
                userDistance3 = uniLib.Utils.getDistance(this._user1.lat, this._user1.lng, this._user3.lat, this._user3.lng);
                if (userDistance3 <= 1000) {
                    this._distance_bg3.source = "pdk_gps_red";
                    this._distance_txt3.text = Math.ceil(userDistance3) + "米";
                }
                else if (isNaN(userDistance3)) {
                    this._distance_bg3.source = "pdk_gps_green";
                    this._distance_txt3.text = "无";
                }
                else {
                    this._distance_bg3.source = "pdk_gps_green";
                    this._distance_txt3.text = Math.ceil(userDistance3 / 1000) + "公里";
                }
            }
            if (userDistance1 < 1000 || userDistance2 < 1000 || userDistance3 < 1000) {
                this._tip_img.source = "pdk_gps_warn";
            }
            else {
                this._tip_img.source = "pdk_gps_normal";
            }
        };
        /**添加监听事件 */
        GPSPanel.prototype.addEvent = function () {
            this._close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._continue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._dissolve_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissolve, this);
        };
        GPSPanel.prototype.removeEvent = function () {
            this._close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._continue_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this._dissolve_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissolve, this);
        };
        GPSPanel.prototype.onClose = function (evt) {
            this.dispatchEventWith(pokergps.pokergpsConst.CLOSE);
        };
        GPSPanel.prototype.onDissolve = function (e) {
            this.dispatchEventWith(pokergps.pokergpsConst.DISMISS_GAME);
            this.dispatchEventWith(pokergps.pokergpsConst.CLOSE);
        };
        GPSPanel.prototype.destory = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GPSPanel;
    }(eui.Component));
    pokergps.GPSPanel = GPSPanel;
    __reflect(GPSPanel.prototype, "pokergps.GPSPanel");
})(pokergps || (pokergps = {}));
var pokergps;
(function (pokergps) {
    var pokergpsConst = (function () {
        function pokergpsConst() {
        }
        pokergpsConst.RES_JSON = "resource/pokergps/pokergps.res_6a57f7c3.json";
        pokergpsConst.THM_JSON = "resource/pokergps/gameEui_6ebe5c69.json";
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        pokergpsConst.POKER_GPS = "poker_gps";
        pokergpsConst.DISMISS_GAME = "dismiss_game";
        pokergpsConst.CLOSE = "close";
        /**
         * gps
         */
        pokergpsConst.UPDATE_GPS_DATA = "update_gps_data";
        return pokergpsConst;
    }());
    pokergps.pokergpsConst = pokergpsConst;
    __reflect(pokergpsConst.prototype, "pokergps.pokergpsConst");
})(pokergps || (pokergps = {}));
var Cmd;
(function (Cmd) {
    function OnReturnIpAndGPSPokerCmd_S(rev) {
        uniLib.Global.dispatchEvent(pokergps.pokergpsConst.UPDATE_GPS_DATA, rev.list);
    }
    Cmd.OnReturnIpAndGPSPokerCmd_S = OnReturnIpAndGPSPokerCmd_S;
})(Cmd || (Cmd = {}));
