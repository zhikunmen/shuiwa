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
var shop;
(function (shop) {
    var ShopConsts = (function () {
        function ShopConsts() {
        }
        ShopConsts.RES_JSON = "resource/shop/shop.res_f57dd3e4.json";
        ShopConsts.THM_JSON = "resource/shop/gameEui_326981d9.json";
        /**
         * 公共shop需要加载的资源组
         */
        ShopConsts.PUB_SHOP = "pub_shop";
        return ShopConsts;
    }());
    shop.ShopConsts = ShopConsts;
    __reflect(ShopConsts.prototype, "shop.ShopConsts");
})(shop || (shop = {}));
var shop;
(function (shop) {
    var ShopItem = (function (_super) {
        __extends(ShopItem, _super);
        function ShopItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ShopItemSkin";
            return _this;
        }
        ShopItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            // this.diamond.text = ConfigMgr.getInstance().getGoodCfgById(info.shopGoods.goodId).goodName;
            this.diamond.text = info.shopName;
            this.price.text = info.price / 100 + "";
            if (RES.getRes("shop_icon" + info.iconId + "_png"))
                this.good_icon.source = "shop_icon" + info.iconId + "_png";
        };
        ShopItem.prototype.destroy = function () {
            this.removeChildren();
        };
        return ShopItem;
    }(eui.ItemRenderer));
    shop.ShopItem = ShopItem;
    __reflect(ShopItem.prototype, "shop.ShopItem");
})(shop || (shop = {}));
var shop;
(function (shop_1) {
    var ShopPanel = (function (_super) {
        __extends(ShopPanel, _super);
        function ShopPanel() {
            var _this = _super.call(this) || this;
            _this.btnAry = [];
            _this.skinName = "ShopPanelSkin";
            return _this;
        }
        ShopPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.scroller.horizontalScrollBar = null;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.desc.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            var config = ConfigMgr.getInstance().getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
            for (var i = 0; i < config.wechatshopList.length; i++) {
                var shopid = config.wechatshopList[i];
                var shop = ConfigMgr.getInstance().getShopCfgById(shopid);
                var item = new shop_1.ShopItem();
                shop.iconId = i + 1;
                item.data = shop;
                item.x = 260 * i;
                this.itemGroup.addChild(item);
                this.btnAry.push(item);
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            var wechatshopList = config.wechatshopList;
        };
        ShopPanel.prototype.onTouchHandler = function (evt) {
            if (evt.currentTarget == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.currentTarget == this.desc) {
                uniLib.ZQGameSdk.nativeCopyStr("haopaokf");
                if (!uniLib.Global.isWxGame())
                    uniLib.TipsUtils.showTipsDownToUp("公众号已复制！");
            }
            else {
                var index = this.btnAry.indexOf(evt.currentTarget);
                if (index > -1)
                    // this.createOrder(this.btnAry[index].data);
                    this.checkSession(this.btnAry[index].data);
            }
        };
        ShopPanel.prototype.checkSession = function (data) {
            var _this = this;
            if (!uniLib.Global.isWxGame()) {
                this.createOrder(data);
                return;
            }
            // wx.checkSession({
            //     success: () => {
            //         this.createOrder(data);
            //     },
            //     fail: () => {
            //         wx.login({
            //             success: (res) => {
            //                 let extData = JSON.stringify({ code: res.code });
            //                 this.createOrder(data,extData);
            //             },
            //             fail: () => {
            //                 console.log("wx.login失败");
            //             }
            //         });
            //     }
            // });
            wx.login({
                success: function (res) {
                    var extData = JSON.stringify({ code: res.code });
                    // console.log("wx.login   extData"+extData);
                    _this.createOrder(data, extData);
                },
                fail: function () {
                    console.log("wx.login失败");
                }
            });
        };
        /**
     * 下订单
     */
        ShopPanel.prototype.createOrder = function (data, extData) {
            var msg = new Pmd.CreatePlatOrderRequestSdkPmd_C();
            msg.roleid = Number(NetMgr.UID);
            msg.rolename = "";
            msg.originalmoney = data.price / 100;
            msg.ordermoney = data.price / 100;
            msg.goodid = data.shopId;
            msg.goodnum = 1;
            var good = ConfigMgr.getInstance().getGoodCfgById(data.shopGoods.goodId);
            msg.goodname = good.goodName;
            msg.gooddesc = good.goodName;
            msg.redirecturl = uniLib.BrowersUtils.getLocationUrl();
            if (extData)
                msg.extdata = extData;
            else
                msg.extdata = "";
            // if (uniLib.Global.payPlatId != NaN || uniLib.Global.payPlatId != undefined || uniLib.Global.payPlatId != 0) {
            // 	msg.payplatid = uniLib.Global.payPlatId;
            // }
            msg.payplatid = 326;
            // uniLib.UIMgr.instance.showLoadingTimeout(LoadSecondPanel, "recharge");
            // LobbyResUtil.trace(JSON.stringify(msg));
            NetMgr.tcpSend(msg);
        };
        ShopPanel.prototype.destroy = function () {
            for (var i = 0; i < this.btnAry.length; i++) {
                this.btnAry[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.btnAry[i].destroy();
            }
            this.btnAry = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.desc.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return ShopPanel;
    }(eui.Component));
    shop_1.ShopPanel = ShopPanel;
    __reflect(ShopPanel.prototype, "shop.ShopPanel");
})(shop || (shop = {}));
var ShopReciveMgr = (function () {
    function ShopReciveMgr() {
    }
    return ShopReciveMgr;
}());
__reflect(ShopReciveMgr.prototype, "ShopReciveMgr");
var Cmd;
(function (Cmd) {
    function OnCreatePlatOrderReturnSdkPmd_S(rev) {
        uniLib.TipsUtils.showTipsDownToUp("获取订单号成功，等待支付");
        // uniLib.UIMgr.instance.hideLoading(HaoCaiTipLoading, "recharge");
        if (rev.result != 0) {
            if (rev.result == 2)
                uniLib.TipsUtils.showTipsDownToUp("今日已达最大充值限额(3千)", true);
            else
                uniLib.TipsUtils.showTipsDownToUp("下订单失败!", true);
            return;
        }
        rev.roleid = NetMgr.getThirdPlatId();
        uniLib.PayMgr.Instance.payByPmd(rev);
        return true;
    }
    Cmd.OnCreatePlatOrderReturnSdkPmd_S = OnCreatePlatOrderReturnSdkPmd_S;
    function OnNotifyRechargeRequestSdkPmd_S(rev) {
        // Cmd.trace(rev, "支付成功返回，NotifyRechargeRequestSdkPmd_S");
        uniLib.TipsUtils.showTipsDownToUp("充值成功");
        uniLib.UserInfo.chips = Number(rev.extdata);
        // Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_FIRSTRECHARGE, rev.goodid);
    }
    Cmd.OnNotifyRechargeRequestSdkPmd_S = OnNotifyRechargeRequestSdkPmd_S;
})(Cmd || (Cmd = {}));
var eui;
(function (eui) {
    var WxGroup = (function (_super) {
        __extends(WxGroup, _super);
        function WxGroup() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        WxGroup.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
            this.x += this.width >> 1;
            this.y += this.height >> 1;
        };
        WxGroup.prototype.init = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        };
        WxGroup.prototype.onTouchBegin = function () {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        };
        WxGroup.prototype.onTouchEnd = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxGroup.prototype.onTouchCancel = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxGroup.prototype.onTouchMove = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxGroup.prototype.onTouchReleaseOutside = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxGroup.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
        };
        return WxGroup;
    }(eui.Group));
    eui.WxGroup = WxGroup;
    __reflect(WxGroup.prototype, "eui.WxGroup");
})(eui || (eui = {}));
