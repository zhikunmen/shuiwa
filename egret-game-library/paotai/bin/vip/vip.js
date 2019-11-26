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
var paotai;
(function (paotai) {
    var PaoTaiConsts = (function () {
        function PaoTaiConsts() {
        }
        PaoTaiConsts.RES_JSON = "resource/paotai/paotai.res_3360f220.json";
        PaoTaiConsts.THM_JSON = "resource/paotai/gameEui_638d9431.json";
        /**
         * 公共guide需要加载的资源组
         */
        PaoTaiConsts.PUB_PAOTAI_PANEL = "pub_paotai_panel";
        PaoTaiConsts.PUB_PAOTAI = "pub_paotai";
        return PaoTaiConsts;
    }());
    paotai.PaoTaiConsts = PaoTaiConsts;
    __reflect(PaoTaiConsts.prototype, "paotai.PaoTaiConsts");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var PaoTaiItem = (function (_super) {
        __extends(PaoTaiItem, _super);
        function PaoTaiItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PaoTaiItemSkin";
            return _this;
        }
        PaoTaiItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.pao_text.text = info.gunName;
            this.speed.width = (info.gunSpeed / 10) * 171;
            this.pao_img.source = "pao_tai_" + info.ID;
            if (info.unlockType == 99) {
                if (MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid) {
                    this.touch_btn["bg_img"].text = "paotai_button3";
                    this.touch_btn.enabled = false;
                }
                else {
                    this.touch_btn["bg_img"].text = "paotai_button2";
                    this.touch_btn.enabled = true;
                }
                this.touch_btn["bg_txt"].text = "";
                this.vip_level.source = "vip_small_" + 1;
            }
            else {
                var vip = MJLobbyData.getInstance().userInfoSynLobby.userInfo.vip;
                if (vip >= info.unlockType) {
                    this.touch_btn["bg_img"].text = "paotai_button3";
                    this.touch_btn["bg_txt"].text = "";
                    this.touch_btn.enabled = false;
                }
                else {
                    this.touch_btn["bg_img"].text = "paotai_button1";
                    this.touch_btn["bg_txt"].text = info.unlockDescribe + "元";
                    this.touch_btn.enabled = true;
                }
                this.vip_level.source = "vip_small_" + info.unlockType;
            }
        };
        PaoTaiItem.prototype.destroy = function () {
            this.removeChildren();
        };
        return PaoTaiItem;
    }(eui.ItemRenderer));
    paotai.PaoTaiItem = PaoTaiItem;
    __reflect(PaoTaiItem.prototype, "paotai.PaoTaiItem");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var PaoTaiPanel = (function (_super) {
        __extends(PaoTaiPanel, _super);
        function PaoTaiPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "PaoTaiPanelSkin";
            return _this;
        }
        PaoTaiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            this.initUI();
        };
        PaoTaiPanel.prototype.addEvents = function () {
            this.paotia_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        };
        PaoTaiPanel.prototype.initUI = function () {
            this.paotia_lst.itemRenderer = paotai.PaoTaiItem;
            this._paoInfo = new eui.ArrayCollection(RES.getRes("TableFishGunType_json"));
            this.paotia_lst.dataProvider = this._paoInfo;
        };
        PaoTaiPanel.prototype.removeEvents = function () {
            this.paotia_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        };
        PaoTaiPanel.prototype.onItemTapHandler = function (evt) {
        };
        PaoTaiPanel.prototype.destroy = function () {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return PaoTaiPanel;
    }(eui.Component));
    paotai.PaoTaiPanel = PaoTaiPanel;
    __reflect(PaoTaiPanel.prototype, "paotai.PaoTaiPanel");
})(paotai || (paotai = {}));
