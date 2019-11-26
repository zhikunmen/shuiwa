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
    /**代付信息 帮好友代付*/
    var ShopDFInfo = (function (_super) {
        __extends(ShopDFInfo, _super);
        function ShopDFInfo() {
            var _this = _super.call(this) || this;
            _this.skinName = "ShopDFInfoSkin";
            return _this;
        }
        ShopDFInfo.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.pay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.refuse_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        ShopDFInfo.prototype.setData = function (wgShareData) {
            this._wgShareData = wgShareData;
            var data = JSON.parse(this._wgShareData);
            if (data) {
                this.id_lbl.text = data.uid;
                this.nickName_lbl.text = data.nickName;
                this.head_img.source = data.headUrl;
                var shopId = data.shopId;
                var shopCfg = ConfigMgr.getInstance().getShopCfgById(shopId);
                var goodCfg = ConfigMgr.getInstance().getGoodCfgById(shopCfg.shopGoods.goodId);
                if (goodCfg) {
                    this.goodName_lbl.text = goodCfg.goodName;
                    this.price_lbl.text = Math.floor(shopCfg.price / 100) + "元";
                }
            }
        };
        ShopDFInfo.prototype.onTouch = function (evt) {
            var _this = this;
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            if (evt.target == this.pay_btn) {
                var data = JSON.parse(this._wgShareData);
                if (data && data.shopId) {
                    if (this._timeIndex) {
                        uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
                    }
                    else {
                        var shopCfg = ConfigMgr.getInstance().getShopCfgById(data.shopId);
                        shopCfg && shop.ShopControl.checkSession(shopCfg, { recvuid: data.uid });
                        this._timeIndex = egret.setTimeout(function () { egret.clearTimeout(_this._timeIndex); _this._timeIndex = null; }, this, 5000);
                    }
                }
            }
            else if (evt.target == this.refuse_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        ShopDFInfo.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.refuse_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._wgShareData = null;
            egret.clearTimeout(this._timeIndex);
            this._timeIndex = null;
        };
        return ShopDFInfo;
    }(eui.Component));
    shop.ShopDFInfo = ShopDFInfo;
    __reflect(ShopDFInfo.prototype, "shop.ShopDFInfo");
})(shop || (shop = {}));
var shop;
(function (shop) {
    /**首充 */
    var FirstRecharge = (function (_super) {
        __extends(FirstRecharge, _super);
        function FirstRecharge() {
            var _this = _super.call(this) || this;
            _this.skinName = "FirstRechargeSkin";
            return _this;
        }
        FirstRecharge.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.addEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            NetMgr.tcpSend(new Cmd.GetFirstchargeInfoHpMatchCmd_C());
            this.purchase_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                this.pay_btn.visible = true;
                this.purchase_btn.visible = false;
            }
        };
        FirstRecharge.prototype.onInfo = function (evt) {
            var info = evt.param;
            this._shopId = info.goodid;
            this.price_blbl.text = info.price / 100 + "元";
            this.titlePrice_blbl.text = info.price / 100 + "";
            this.reward_lst.itemRenderer = RechargeItem;
            this.reward_lst.dataProvider = new eui.ArrayCollection(info.rewads);
            if (info.countDownSec) {
                this.purchase_btn.visible = false;
                this.pay_btn.visible = false;
                this.time_btn.visible = true;
                this.time_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.setLabel(info.countDownSec);
                this._timer = new egret.Timer(1000, info.countDownSec);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer.start();
            }
            this.desc_lbl.text = "";
            if (info.qhStone) {
                var cfg = ConfigMgr.getInstance().getGoodCfgById(info.qhStone.goodId);
                this.desc_lbl.text = "若炮倍≥100倍后购买，则获得" + info.qhStone.goodNbr + cfg.goodName;
            }
        };
        FirstRecharge.prototype.onTimer = function () {
            if (this._timer.repeatCount == this._timer.currentCount) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else {
                this.setLabel(this._timer.repeatCount - this._timer.currentCount);
            }
        };
        FirstRecharge.prototype.setLabel = function (count) {
            var h = Math.floor(count / 3600) + "";
            var m = Math.floor((count % 3600) / 60) + "";
            var s = count % (3600 * 60) + "";
            this.time_btn.label = "\uFF08" + (h.length < 2 ? "0" + h : h) + "\uFF1A" + (m.length < 2 ? "0" + m : m) + "}\uFF1A" + (s.length < 2 ? "0" + s : s) + "}\uFF09";
        };
        FirstRecharge.prototype.onTouchHandler = function (evt) {
            var _this = this;
            if (evt.target == this.purchase_btn) {
                shop.ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._shopId));
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.pay_btn) {
                RES.loadGroup(shop.ShopConsts.SHOP_DAIFU).then(function () {
                    uniLib.PopUpMgr.addPopUp(shop.ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, _this._shopId);
                }).catch(function (reason) {
                    uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                });
            }
            else if (evt.target == this.time_btn) {
                if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                    RES.loadGroup(shop.ShopConsts.SHOP_DAIFU).then(function () {
                        uniLib.PopUpMgr.addPopUp(shop.ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, _this._shopId);
                    }).catch(function (reason) {
                        uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                    });
                }
                else {
                    shop.ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._shopId));
                    uniLib.PopUpMgr.removePopUp(this);
                }
            }
        };
        FirstRecharge.prototype.destroy = function () {
            this._shopId = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer = null;
            }
            this.time_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            this.purchase_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return FirstRecharge;
    }(eui.Component));
    shop.FirstRecharge = FirstRecharge;
    __reflect(FirstRecharge.prototype, "shop.FirstRecharge");
    var RechargeItem = (function (_super) {
        __extends(RechargeItem, _super);
        function RechargeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "RechargeItemSkin";
            return _this;
        }
        RechargeItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var goodCfg = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.desc_lbl.text = goodCfg.goodName + "x" + info.goodNbr;
            this.icon_img.source = "reward_vip_json." + goodCfg.goodIcon;
            if (info.goodType == 0) {
                this.desc_img.visible = false;
            }
            else if (info.goodType == 1) {
                this.desc_img.source = "reward_vip_json.lb_huiyuan_send";
            }
            else if (info.goodType == 2) {
                this.desc_img.source = "reward_vip_json.lb_huiyuan_special";
            }
            else {
                this.desc_img.visible = false;
            }
        };
        return RechargeItem;
    }(eui.ItemRenderer));
    shop.RechargeItem = RechargeItem;
    __reflect(RechargeItem.prototype, "shop.RechargeItem");
})(shop || (shop = {}));
var shop;
(function (shop) {
    /**月卡 */
    var MonthlyCard = (function (_super) {
        __extends(MonthlyCard, _super);
        function MonthlyCard(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "MonthlyCardSkin";
            return _this;
        }
        MonthlyCard.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                this.purchase_btn.visible = false;
                this.df_btn.visible = true;
            }
            else {
                this.df_btn.visible = false;
                this.purchase_btn.visible = true;
            }
            this.price_img.source = "reward_vip_json.lb_huiyuan_" + this._info.price / 100;
            this.reward_lst.itemRenderer = shop.RechargeItem;
            this.reward_lst.dataProvider = new eui.ArrayCollection(this._info.totalRewards);
            var im = "", ev = "";
            for (var i = 0; i < this._info.onceRewards.length; i++) {
                im += im ? "、" : "";
                var cfg = ConfigMgr.getInstance().getGoodCfgById(this._info.onceRewards[i].goodId);
                var num = this._info.onceRewards[i].goodNbr;
                im += "" + (num > 10000 ? num / 10000 + "万" : num) + cfg.goodName;
            }
            for (var i = 0; i < this._info.dailyRewards.length; i++) {
                ev += ev ? "、" : "";
                var cfg = ConfigMgr.getInstance().getGoodCfgById(this._info.dailyRewards[i].goodId);
                var num = this._info.dailyRewards[i].goodNbr;
                ev += "" + (num > 10000 ? num / 10000 + "万" : num) + cfg.goodName;
            }
            this.desc_lbl.text = "1.\u8D2D\u4E70\u540E\u7ACB\u5373\u83B7\u5F97" + im + "\u3002  2.\u8D2D\u4E70\u540E" + this._info.totalDay + "\u5929\u5185\uFF0C\u6BCF\u5929\u53EF\u4EE5\u9886\u53D6" + ev + "\uFF01";
        };
        MonthlyCard.prototype.onTouchHandler = function (evt) {
            var _this = this;
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.purchase_btn) {
                if (this._timeIndex) {
                    uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
                }
                else {
                    shop.ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._info.shopId));
                    this._timeIndex = egret.setTimeout(function () { egret.clearTimeout(_this._timeIndex); _this._timeIndex = null; }, this, 5000);
                }
            }
            else if (evt.target == this.df_btn) {
                RES.loadGroup(shop.ShopConsts.SHOP_DAIFU).then(function () {
                    uniLib.PopUpMgr.addPopUp(shop.ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, _this._info.shopId);
                }).catch(function (reason) {
                    uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                });
            }
        };
        MonthlyCard.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            egret.clearTimeout(this._timeIndex);
            this._timeIndex = null;
        };
        return MonthlyCard;
    }(eui.Component));
    shop.MonthlyCard = MonthlyCard;
    __reflect(MonthlyCard.prototype, "shop.MonthlyCard");
})(shop || (shop = {}));
var shop;
(function (shop) {
    /**
     * 领取月卡
     */
    var MonthlyCardRecv = (function (_super) {
        __extends(MonthlyCardRecv, _super);
        function MonthlyCardRecv(info) {
            var _this = _super.call(this) || this;
            _this._type = 0;
            _this._info = info;
            _this.skinName = "MonthlyCardRecvSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchHandler, _this);
            return _this;
        }
        MonthlyCardRecv.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.remain_lbl.text = this._info.remainDay.toString();
            this.renew_lbl.textFlow = [{ text: this._type == 0 ? "月卡续费" : "周卡续费", style: { underline: true, textColor: 0xFF6600 } }];
            if (this._info.state == 2) {
                this.rev_btn.currentState = "disabled";
                this.rev_btn.touchEnabled = false;
            }
            this.reward_lst.itemRenderer = shop.RechargeItem;
            this.reward_lst.dataProvider = new eui.ArrayCollection(this._info.dailyRewards);
        };
        MonthlyCardRecv.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.renew_lbl) {
                if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                    LobbyModuleMgr.getInstance().showCustomer();
                    uniLib.PopUpMgr.removePopUp(this);
                }
                else {
                    var instance = ConfigMgr.getInstance();
                    var lobbyConfig = instance.getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
                    var shopConfig = instance.getShopCfgById(lobbyConfig.monthCard[0]);
                    shop.ShopControl.checkSession(shopConfig);
                }
            }
            else if (evt.target == this.rev_btn) {
                var req = new Cmd.GetMonthCardRewardLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        MonthlyCardRecv.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._info = null;
        };
        return MonthlyCardRecv;
    }(eui.Component));
    shop.MonthlyCardRecv = MonthlyCardRecv;
    __reflect(MonthlyCardRecv.prototype, "shop.MonthlyCardRecv");
})(shop || (shop = {}));
var shop;
(function (shop) {
    /**首充信息 */
    shop.FIRST_RECHARGE_INFO = "firstRechargeInfo";
    var ShopConsts = (function () {
        function ShopConsts() {
        }
        ShopConsts.RES_JSON = "resource/shop/shop.res_ec3761f8.json";
        ShopConsts.RESZZ_JSON = "resource/shopZZ.res.json";
        ShopConsts.RES_MAHJONG_JSON = "resource/shop_mahjong.res.json";
        ShopConsts.THM_JSON = "resource/shop/gameEui_96128b9e.json";
        /**
         * 公共shop需要加载的资源组
         */
        ShopConsts.PUB_SHOP = "pub_shop";
        /**首充和vip */
        ShopConsts.SHOP_RECHARGE = "shop_recharge";
        /**代付款 */
        ShopConsts.SHOP_DAIFU = "shop_daifu";
        return ShopConsts;
    }());
    shop.ShopConsts = ShopConsts;
    __reflect(ShopConsts.prototype, "shop.ShopConsts");
})(shop || (shop = {}));
var shop;
(function (shop) {
    var ShopControl = (function () {
        function ShopControl() {
        }
        ShopControl.checkSession = function (data, extObj) {
            var _this = this;
            if (!uniLib.Global.isWxGame()) {
                var extStr = void 0;
                if (extObj) {
                    extStr = JSON.stringify(extObj);
                }
                this.createOrder(data, extStr);
            }
            else {
                wx.login({
                    success: function (res) {
                        if (extObj) {
                            extObj["code"] = res.code;
                            _this.createOrder(data, JSON.stringify(extObj));
                        }
                        else {
                            _this.createOrder(data, JSON.stringify({ code: res.code }));
                        }
                    },
                    fail: function () {
                        console.log("wx.login失败");
                    }
                });
            }
        };
        /**
     * 下订单
     */
        ShopControl.createOrder = function (data, extData) {
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
            if (uniLib.Global.isNative && uniLib.Utils.isIOS && uniLib.Global.is_sandbox == 1) {
                msg.payplatid = 17; //苹果内购
            }
            else {
                msg.payplatid = uniLib.Global.payPlatId;
            }
            // uniLib.UIMgr.instance.showLoadingTimeout(LoadSecondPanel, "recharge");
            // LobbyResUtil.trace(JSON.stringify(msg));
            NetMgr.tcpSend(msg);
        };
        return ShopControl;
    }());
    shop.ShopControl = ShopControl;
    __reflect(ShopControl.prototype, "shop.ShopControl");
})(shop || (shop = {}));
var shop;
(function (shop) {
    /**首充 */
    var FirstRechargeBuYu = (function (_super) {
        __extends(FirstRechargeBuYu, _super);
        function FirstRechargeBuYu() {
            var _this = _super.call(this) || this;
            _this.skinName = "FirstRechargeBuYuSkin";
            return _this;
        }
        FirstRechargeBuYu.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
            uniLib.Global.addEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            NetMgr.tcpSend(new Cmd.GetFirstchargeInfoHpMatchCmd_C());
            this.purchase_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                this.pay_btn.visible = true;
                this.purchase_btn.visible = false;
            }
        };
        FirstRechargeBuYu.prototype.initUI = function () {
            this.reward_itme1.source = "game_prop_json.bag_daoju_32";
            this.reward_itme2.source = "game_prop_json.bag_daoju_352";
            this.reward_itme3.source = "game_prop_json.bag_daoju_351";
            this.reward_itme4.source = "game_prop_json.bag_daoju_354";
            commonConfirm.ResUtil.limitImageSize(this.reward_itme1, 140);
            commonConfirm.ResUtil.limitImageSize(this.reward_itme2, 140);
            commonConfirm.ResUtil.limitImageSize(this.reward_itme3, 140);
        };
        FirstRechargeBuYu.prototype.onInfo = function (evt) {
            var info = evt.param;
            this._shopId = info.goodid;
        };
        FirstRechargeBuYu.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.purchase_btn) {
                shop.ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._shopId));
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.pay_btn) {
                RES.loadGroup(shop.ShopConsts.SHOP_DAIFU).then(function () {
                    var lobbyConfig = ConfigMgr.getInstance().getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
                    uniLib.PopUpMgr.addPopUp(shop.ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, lobbyConfig.firstCharge[0]);
                }).catch(function (reason) {
                    uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                });
            }
        };
        FirstRechargeBuYu.prototype.destroy = function () {
            this._shopId = null;
            uniLib.Global.removeEventListener(shop.FIRST_RECHARGE_INFO, this.onInfo, this);
            this.purchase_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.pay_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return FirstRechargeBuYu;
    }(eui.Component));
    shop.FirstRechargeBuYu = FirstRechargeBuYu;
    __reflect(FirstRechargeBuYu.prototype, "shop.FirstRechargeBuYu");
})(shop || (shop = {}));
var shop;
(function (shop) {
    /**代付提示 分享给好友*/
    var ShopDFTips = (function (_super) {
        __extends(ShopDFTips, _super);
        function ShopDFTips(shopId) {
            var _this = _super.call(this) || this;
            _this._shopId = shopId;
            _this.skinName = "ShopDFTipsSkin";
            return _this;
        }
        ShopDFTips.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.send_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            var shopC = ConfigMgr.getInstance().getShopCfgById(this._shopId);
            var goodConfig = ConfigMgr.getInstance().getGoodCfgById(shopC.shopGoods.goodId);
            if (goodConfig) {
                this.shopName_lbl.text = goodConfig.goodName;
                this.price_lbl.text = "X" + Math.floor(shopC.price / 100);
            }
        };
        ShopDFTips.prototype.onTouch = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.send_btn) {
                var share = new uniLib.WXShareVo();
                share.opType = Cmd.ShareOpType.share;
                share.shareType = Cmd.ShareType.payOther;
                var config = MJLobbyData.getInstance().lobbyConfig;
                if (config) {
                    share.title = config.newshareContent[config.newshareContent.length - 1];
                    share.shareImageUrl = wxgame.Global.instance.shareIconUrl + "shareIcons/" + config.newsharepicture[config.newsharepicture.length - 1];
                }
                share.wgShareData = JSON.stringify({ shopId: this._shopId, uid: uniLib.UserInfo.uid, nickName: uniLib.UserInfo.nickName, headUrl: uniLib.UserInfo.headUrl });
                uniLib.ZQGameSdk.share(share);
            }
        };
        ShopDFTips.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.send_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._shopId = null;
        };
        return ShopDFTips;
    }(eui.Component));
    shop.ShopDFTips = ShopDFTips;
    __reflect(ShopDFTips.prototype, "shop.ShopDFTips");
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
            this.touch_btn["get_lbl"].text = info.shopName;
            if (uniLib.Global.isWxGame() && wxgame.Utils.isIos && info.shopType == 4) {
                this.touch_btn["ios_img"].visible = true;
                this.touch_btn["price_lbl"].visible = false;
            }
            else {
                this.touch_btn["ios_img"].visible = false;
                this.touch_btn["price_lbl"].visible = true;
            }
            if (info.shopType == 1) {
                this.touch_btn["price_lbl"].text = info.price + "钻";
                this.touch_btn["icon_img"].source = "lb_shangcheng_jinbi" + info.iconId + "_png";
            }
            else if (info.shopType == 2) {
                this.touch_btn["price_lbl"].text = info.price + "钻";
                this.touch_btn["icon_img"].source = "game_prop_json.bag_daoju_" + info.shopGoods.goodId;
            }
            else if (info.shopType == 4) {
                this.touch_btn["price_lbl"].text = info.price / 100 + "元";
                this.touch_btn["icon_img"].source = "shop_icon" + info.iconId + "_png";
            }
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
        function ShopPanel(selectIndex, haProp) {
            if (selectIndex === void 0) { selectIndex = 0; }
            if (haProp === void 0) { haProp = false; }
            var _this = _super.call(this) || this;
            /**钻石 */
            _this._diamondArr = [];
            /**金币 */
            _this._goldArr = [];
            /**道具 */
            _this._propArr = [];
            _this._haProp = false;
            _this._selectIndex = selectIndex;
            _this._haProp = haProp;
            _this.skinName = "ShopPanelSkin";
            return _this;
        }
        ShopPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (!this._haProp) {
                uniLib.DisplayUtils.removeFromParent(this.prop_rbtn);
            }
            else {
                this.prop_rbtn.label = "购买金币";
                this.gold_rbtn.label = "购买道具";
                this.prop_rbtn.value = 1;
                this.gold_rbtn.value = 2;
            }
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.desc_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.shop_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.diamond_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChangeHander, this);
            this.shop_lst.itemRenderer = shop_1.ShopItem;
            if (uniLib.Global.isWxGame() && uniLib.Global.is_sandbox == 1) {
                this.diamond_rbtn.visible = false;
                this.gold_rbtn.visible = false;
                this._selectIndex = 1;
            }
            var config = ConfigMgr.getInstance().getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
            for (var i = 0; i < config.wechatshopList.length; i++) {
                var shop = ConfigMgr.getInstance().getShopCfgById(config.wechatshopList[i]);
                if (shop && shop.shopType == 1) {
                    this._goldArr.push(shop);
                }
                else if (shop && shop.shopType == 2) {
                    this._propArr.push(shop);
                }
                else if (shop && shop.shopType == 4) {
                    this._diamondArr.push(shop);
                }
            }
            if (this._selectIndex == 0) {
                this._arrColl = new eui.ArrayCollection(this._diamondArr);
                this.diamond_rbtn.selected = true;
            }
            else if (this._selectIndex == 1) {
                this._arrColl = new eui.ArrayCollection(this._goldArr);
                this.diamond_rbtn.selected = false;
                if (this._haProp)
                    this.prop_rbtn.selected = true;
                else
                    this.gold_rbtn.selected = true;
            }
            else if (this._selectIndex == 2) {
                this._arrColl = new eui.ArrayCollection(this._propArr);
                this.diamond_rbtn.selected = false;
                this.gold_rbtn.selected = true;
            }
            else {
                this._arrColl = new eui.ArrayCollection(this._diamondArr);
                this.diamond_rbtn.selected = true;
            }
            this.shop_lst.dataProvider = this._arrColl;
            this.shop_lst.dataProviderRefreshed();
        };
        ShopPanel.prototype.onItemTapHandler = function (evt) {
            var _this = this;
            var shop = this.shop_lst.selectedItem;
            if (shop.shopType == 1 || shop.shopType == 2) {
                if (uniLib.UserInfo.chips < shop.price) {
                    uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                }
                else {
                    var req = new Cmd.BuyGoodsLobbyCmd_C();
                    req.shopId = shop.shopId;
                    req.shopNbr = 1;
                    NetMgr.tcpSend(req);
                }
            }
            else if (shop.shopType == 4) {
                if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                    RES.loadGroup(shop_1.ShopConsts.SHOP_DAIFU).then(function () {
                        uniLib.PopUpMgr.addPopUp(shop_1.ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, shop.shopId);
                    }).catch(function (reason) {
                        uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                    });
                }
                else {
                    if (this._timeIndex) {
                        uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
                    }
                    else {
                        shop_1.ShopControl.checkSession(shop);
                        this._timeIndex = egret.setTimeout(function () { egret.clearTimeout(_this._timeIndex); _this._timeIndex = null; }, this, 5000);
                    }
                }
            }
        };
        ShopPanel.prototype.onChangeHander = function (evt) {
            var index = parseInt(this.diamond_rbtn.group.selectedValue);
            if (index == 1) {
                this._arrColl.source = this._goldArr;
                this._arrColl.refresh();
            }
            else if (index == 4) {
                this._arrColl.source = this._diamondArr;
                this._arrColl.refresh();
            }
            else if (index == 2) {
                this._arrColl.source = this._propArr;
                this._arrColl.refresh();
            }
        };
        ShopPanel.prototype.onTouchHandler = function (evt) {
            if (evt.currentTarget == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.currentTarget == this.desc_lbl) {
                uniLib.ZQGameSdk.nativeCopyStr("haocaipdk");
                uniLib.TipsUtils.showTipsDownToUp("公众号(haocaipdk)已复制！");
            }
        };
        ShopPanel.prototype.destroy = function () {
            this.shop_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.desc_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.diamond_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChangeHander, this);
            egret.clearTimeout(this._timeIndex);
            this._timeIndex = null;
            this._arrColl = null;
            this._diamondArr = null;
            this._propArr = null;
            this._goldArr = null;
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
    /**首充信息 */
    function OnGetFirstchargeInfoHpMatchCmd_S(rev) {
        uniLib.Global.dispatchEvent(shop.FIRST_RECHARGE_INFO, rev);
    }
    Cmd.OnGetFirstchargeInfoHpMatchCmd_S = OnGetFirstchargeInfoHpMatchCmd_S;
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
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
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
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
        };
        return WxGroup;
    }(eui.Group));
    eui.WxGroup = WxGroup;
    __reflect(WxGroup.prototype, "eui.WxGroup");
})(eui || (eui = {}));
