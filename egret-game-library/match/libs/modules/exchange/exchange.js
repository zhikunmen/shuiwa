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
var exchange;
(function (exchange) {
    var ExchangeConst = (function () {
        function ExchangeConst() {
        }
        ExchangeConst.RES_JSON = "resource/exchange/exchange.res_eb231b17.json";
        ExchangeConst.THM_JSON = "resource/exchange/gameEui_1a6380c4.json";
        /**
         * 公共loading需要加载的资源组
         */
        ExchangeConst.PUB_EXCHANGE = "pub_exchange";
        //兑换话费券
        ExchangeConst.EXCHANGE_FARE = "EXCHANGE_FARE";
        //兑换话费信息
        ExchangeConst.FARE_INFO = "FARE_INFO";
        //红包提现
        ExchangeConst.DRAW_INFO = "DRAW_INFO";
        return ExchangeConst;
    }());
    exchange.ExchangeConst = ExchangeConst;
    __reflect(ExchangeConst.prototype, "exchange.ExchangeConst");
})(exchange || (exchange = {}));
var exchange;
(function (exchange) {
    var ExchangeItem = (function (_super) {
        __extends(ExchangeItem, _super);
        function ExchangeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ExchangeItemSkin";
            return _this;
        }
        ExchangeItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.name = info.shopId.toString();
            this.click_btn["des_lbl"].text = info.shopName;
            this.click_btn["cost_blbl"].text = info.price;
            var type = info["type"];
            if (type == 2) {
                this.click_btn["icon_img"].source = "dh_hongbao_" + info.shopId + "_png";
                this.tip_lbl.visible = false;
                this.tpsBg_img.visible = false;
            }
            else if (type == 1) {
                this.click_btn["icon_img"].source = "dh_jinbi_" + info.shopId + "_png";
                this.tip_lbl.visible = false;
                this.tpsBg_img.visible = false;
            }
            else if (type == 3) {
                this.click_btn["icon_img"].source = "exchange_fare_10_png";
                this.tip_lbl.visible = true;
                this.tpsBg_img.visible = true;
            }
        };
        return ExchangeItem;
    }(eui.ItemRenderer));
    exchange.ExchangeItem = ExchangeItem;
    __reflect(ExchangeItem.prototype, "exchange.ExchangeItem");
})(exchange || (exchange = {}));
var exchange;
(function (exchange) {
    var ExchangeVC = (function (_super) {
        __extends(ExchangeVC, _super);
        function ExchangeVC(selectIndex) {
            if (selectIndex === void 0) { selectIndex = 0; }
            var _this = _super.call(this) || this;
            _this._selectIndex = selectIndex;
            _this.width = uniLib.Global.screenWidth;
            _this.skinName = "ExchangeVCSkin";
            return _this;
        }
        ExchangeVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            this.tips_lbl.textFlow = [{ text: "（兑换可能有几分钟延时，请耐心等待。如未到账，请", style: { textColor: 0xffffff } }, { text: "联系客服", style: { underline: true, textColor: 0x1450A7 } }, { text: "）", style: { textColor: 0xffffff } }];
            this.send();
            this.addEvent();
            this._collArr = new eui.ArrayCollection();
            this.exchange_lst.itemRenderer = exchange.ExchangeItem;
            this.exchange_lst.dataProvider = this._collArr;
            if (uniLib.Global.isNative) {
                this.package_rbtn.visible = false;
                this.ticket_rbtn.visible = true;
            }
            else {
                this.package_rbtn.visible = true;
                this.ticket_rbtn.visible = false;
            }
            /**小游戏审核模式屏蔽福卡兑换 */
            if (uniLib.Global.isWxGame() && (uniLib.Global.is_sandbox == 1 || uniLib.UserInfo.giftCoupon < uniLib.Global.defaultConfig["exchange"])) {
                this._selectIndex = 0;
                this.package_rbtn.visible = false;
            }
            /**ios提审包 */
            if (uniLib.Global.isNative && uniLib.Utils.isIOS && uniLib.Global.is_sandbox == 1) {
                this._selectIndex = 0;
                this.package_rbtn.visible = false;
                this.ticket_rbtn.visible = false;
            }
            if (this._selectIndex == 0) {
                this.diamond_rbtn.selected = true;
            }
            else if (this._selectIndex == 1) {
                this.package_rbtn.visible && (this.package_rbtn.selected = true);
                this.ticket_rbtn.visible && (this.ticket_rbtn.selected = true);
            }
            this.refreshList();
        };
        ExchangeVC.prototype.send = function () {
            var req = new Cmd.GetExchangeGiftVoucherInfo_C();
            NetMgr.tcpSend(req);
        };
        //刷新剩余兑换次数
        ExchangeVC.prototype.updateIndex = function (evt) {
            // if (evt) {
            //     this._giftVoucher = evt.param;
            // }
            // if (this._giftVoucher) {
            //     for (let i = 0; i < this._giftVoucher.infos.length; i++) {
            //         let item = this.exchange_lst.getChildByName(this._giftVoucher.infos[i].goodsId.toString()) as ExchangeItem;
            //         if (item) {
            //             if (this._giftVoucher.infos[i].remainder != undefined)
            //                 item.tip_lbl.text = "今日可兑换次数：" + this._giftVoucher.infos[i].remainder;
            //         }
            //     }
            // }
            // else {
            //     this.send();
            // }
        };
        ExchangeVC.prototype.onTouchHander = function (evt) {
            if (evt.target == this.tips_lbl) {
                wxgame.Global.instance.openCustomerServiceConversation(true, wxgame.CustomerServiceConst.DEFAULTTITLE, wxgame.Global.instance.shareIconUrl + "shareIcons/common.jpg");
            }
            else if (evt.target == this._closeBtn) {
                this.closeInfo();
            }
        };
        ExchangeVC.prototype.refreshList = function () {
            var type = 1;
            var lobbyConfig = ConfigMgr.getInstance().getGameListCfgById(MJLobbyData.getInstance().lobbyId);
            var config = lobbyConfig.diamondshopList;
            if (this.diamond_rbtn.selected) {
                type = 1;
                config = lobbyConfig.diamondshopList;
            }
            else if (this.package_rbtn.selected) {
                type = 2;
                config = lobbyConfig.newshopList;
            }
            else if (this.ticket_rbtn.selected) {
                type = 3;
                config = lobbyConfig.channelExchange;
            }
            var arr = [];
            for (var i = 0; i < config.length; i++) {
                var cf = ConfigMgr.getInstance().getShopCfgById(config[i]);
                cf["type"] = type;
                arr.push(cf);
            }
            this._collArr.replaceAll(arr);
            this.exchange_lst.validateNow();
            this.updateIndex();
        };
        ExchangeVC.prototype.onItemTapHandler = function (evt) {
            var info = this.exchange_lst.selectedItem;
            if (info.price > uniLib.UserInfo.giftCoupon) {
                uniLib.TipsUtils.showTipsDownToUp("福卡不足,请去赢取更多福卡");
            }
            else {
                var type = info["type"];
                if (type == 1) {
                    var req = new Cmd.BuyGoodsLobbyCmd_C();
                    req.shopId = info.shopId;
                    req.shopNbr = 1;
                    NetMgr.tcpSend(req);
                }
                else if (type == 2 || type == 3) {
                    //兑换微信红包或者话费兑换
                    if (!uniLib.UserInfo.phonenumber) {
                        this.openBind();
                    }
                    else {
                        if (uniLib.Global.isWxGame() && MJLobbyData.getInstance().userInfoSynLobby.loginByOpenId == true) {
                            LobbyModuleMgr.getInstance().showAuthonPanel();
                        }
                        else {
                            var req = new Cmd.BuyGoodsLobbyCmd_C();
                            req.shopId = info.shopId;
                            req.shopNbr = 1;
                            NetMgr.tcpSend(req);
                        }
                    }
                }
            }
        };
        //打开手机绑定页面
        ExchangeVC.prototype.openBind = function () {
            uniLib.PopUpMgr.addPopUp(myInfo.BindPhoneVC, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, uniLib.UserInfo.phonenumber ? uniLib.UserInfo.phonenumber : null);
        };
        //监听按钮
        ExchangeVC.prototype.addEvent = function () {
            uniLib.Global.addEventListener(exchange.ExchangeConst.FARE_INFO, this.updateIndex, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.tips_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.diamond_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.refreshList, this);
            this.exchange_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        };
        //移除监听
        ExchangeVC.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(exchange.ExchangeConst.FARE_INFO, this.updateIndex, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.tips_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.diamond_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.refreshList, this);
            this.exchange_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        };
        //关闭当前面板
        ExchangeVC.prototype.closeInfo = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        ExchangeVC.prototype.destory = function () {
            this.removeEvent();
            this._collArr = null;
            this._giftVoucher = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeAllChildren(this);
        };
        return ExchangeVC;
    }(eui.Component));
    exchange.ExchangeVC = ExchangeVC;
    __reflect(ExchangeVC.prototype, "exchange.ExchangeVC");
})(exchange || (exchange = {}));
var Cmd;
(function (Cmd) {
    //兑换礼品券记录个人信息
    function OnExchangeGiftVoucherRecordUserInfoLobby_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(exchange.ExchangeConst.EXCHANGE_FARE, rev);
            wxgame.Global.instance.aldSendEvent("周边系统", "兑换话费shopId" + rev.shopId + "成功");
        }
    }
    Cmd.OnExchangeGiftVoucherRecordUserInfoLobby_S = OnExchangeGiftVoucherRecordUserInfoLobby_S;
    //兑换话费信息
    function OnGetExchangeGiftVoucherInfo_S(rev) {
        uniLib.Global.dispatchEvent(exchange.ExchangeConst.FARE_INFO, rev);
    }
    Cmd.OnGetExchangeGiftVoucherInfo_S = OnGetExchangeGiftVoucherInfo_S;
    /**商城购买相关 埋点*/
    function OnBuyGoodsLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            wxgame.Global.instance.aldSendEvent("周边系统", "兑换钻石shopId" + rev.shopId + "成功");
        }
    }
    Cmd.OnBuyGoodsLobbyCmd_S = OnBuyGoodsLobbyCmd_S;
    /**
     * 提现到公众号
     */
    function OnOpenRedPackLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(exchange.ExchangeConst.DRAW_INFO, rev);
        }
    }
    Cmd.OnOpenRedPackLobbyCmd_S = OnOpenRedPackLobbyCmd_S;
})(Cmd || (Cmd = {}));
