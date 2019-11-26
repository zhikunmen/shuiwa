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
var packbag;
(function (packbag) {
    /**
     * 购买或者出售  暂时只要出售
     */
    var BagBuyOrSellPanel = (function (_super) {
        __extends(BagBuyOrSellPanel, _super);
        function BagBuyOrSellPanel(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "BagBuyOrSellSkin";
            return _this;
        }
        BagBuyOrSellPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._minBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._maxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            var goods = ConfigMgr.getInstance().getGoodCfgById(this._info.goodId);
            this.iconName_lbl.text = goods.goodName;
            this.icon_img.source = "game_prop_json.bag_daoju_" + this._info.goodId;
            if (goods.giftGoods && goods.giftGoods[0]) {
                /**金币 */
                if (goods.giftGoods[0].goodId == 32) {
                    this.typeIcon1_img.source = "bagpresent_json.bag_coin";
                    this.typeIcon2_img.source = "bagpresent_json.bag_coin";
                } //钻石
                else if (goods.giftGoods[0].goodId == 6) {
                    this.typeIcon1_img.source = "bagpresent_json.bag_diamond";
                    this.typeIcon2_img.source = "bagpresent_json.bag_diamond";
                }
            }
            this.setNum(1);
        };
        BagBuyOrSellPanel.prototype.onTouchHandler = function (evt) {
            if (evt.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._confirmBtn) {
                this._count = this.getNum();
                if (this._count > this._info.number) {
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量");
                    return;
                }
                else if (this._count < 1) {
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个");
                    return;
                }
                var req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = this._count;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._reduceBtn) {
                this._count = this.getNum();
                if (this._count > 1) {
                    this._count--;
                    this.setNum(this._count);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个");
                }
            }
            else if (evt.target == this._addBtn) {
                this._count = this.getNum();
                if (this._count < this._info.number) {
                    this._count++;
                    this.setNum(this._count);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量");
                }
            }
            else if (evt.target == this._minBtn) {
                this.setNum(1);
            }
            else if (evt.target == this._maxBtn) {
                this.setNum(this._info.number);
            }
        };
        /**设置数量 */
        BagBuyOrSellPanel.prototype.setNum = function (num) {
            this._count = 1;
            this.num_tex.text = num + "";
            var goods = ConfigMgr.getInstance().getGoodCfgById(this._info.goodId);
            if (goods.giftGoods && goods.giftGoods[0]) {
                this.price_lbl.text = "\u5355\u4EF7\uFF1A    " + goods.giftGoods[0].goodNbr;
                this.allPrice_lbl.text = "\u603B\u4EF7\uFF1A    " + goods.giftGoods[0].goodNbr * num;
            }
        };
        BagBuyOrSellPanel.prototype.getNum = function () {
            var num = Number(this.num_tex.text);
            if (num == null)
                return -1;
            else
                return num;
        };
        BagBuyOrSellPanel.prototype.destroy = function () {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._minBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._maxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return BagBuyOrSellPanel;
    }(eui.Component));
    packbag.BagBuyOrSellPanel = BagBuyOrSellPanel;
    __reflect(BagBuyOrSellPanel.prototype, "packbag.BagBuyOrSellPanel");
})(packbag || (packbag = {}));
var packbag;
(function (packbag) {
    var BagPresentPanel = (function (_super) {
        __extends(BagPresentPanel, _super);
        function BagPresentPanel(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "BagPresentSkin";
            return _this;
        }
        BagPresentPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            var goods = ConfigMgr.getInstance().getGoodCfgById(this._info.goodId);
            this.daoju_name.text = goods.goodName;
            this.daoju_name.anchorOffsetX = this.daoju_name.width >> 1;
            this.daoju_icon.source = "game_prop_json.bag_daoju_" + this._info.goodId;
            this._count = 1;
            this.num_tex.text = this._count + "";
        };
        BagPresentPanel.prototype.onTouchHandler = function (evt) {
            if (evt.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._confirmBtn) {
                this._count = this.getNum();
                if (this._count > this._info.number) {
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量");
                    return;
                }
                else if (this._count < 1) {
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个");
                    return;
                }
                var friend = Number(this.friend_id.text);
                if (friend == 0) {
                    uniLib.TipsUtils.showTipsDownToUp("请正确填写对方的ID");
                    return;
                }
                var req = new Cmd.BackpackPresentRequestBackpackCmd_C();
                var packInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = this._count;
                req.backpackInfo = packInfo;
                req.uid = friend;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._reduceBtn) {
                this._count = this.getNum();
                if (this._count > 1) {
                    this._count--;
                    this.num_tex.text = this._count + "";
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个");
                }
            }
            else if (evt.target == this._addBtn) {
                this._count = this.getNum();
                if (this._count < this._info.number) {
                    this._count++;
                    this.num_tex.text = this._count + "";
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量");
                }
            }
        };
        BagPresentPanel.prototype.getNum = function () {
            var num = Number(this.num_tex.text);
            if (num == null)
                return -1;
            else
                return num;
        };
        BagPresentPanel.prototype.destroy = function () {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return BagPresentPanel;
    }(eui.Component));
    packbag.BagPresentPanel = BagPresentPanel;
    __reflect(BagPresentPanel.prototype, "packbag.BagPresentPanel");
})(packbag || (packbag = {}));
var packbag;
(function (packbag) {
    var PackBagConsts = (function () {
        function PackBagConsts() {
        }
        PackBagConsts.RES_JSON = "resource/packbag/packbag.res_8220b5e.json";
        PackBagConsts.THM_JSON = "resource/packbag/gameEui_e667ea2.json";
        /**
         * 需要加载背包的资源组
         */
        PackBagConsts.PUB_PACKBAG = "pub_packbag";
        PackBagConsts.PUB_BAGPRESENT = "pub_bagpresent";
        /**
        * 所有公共道具资源
        * 获取资源方式: "game_prop_json.bag_daoju_"+goodId
        */
        PackBagConsts.PUB_PROP = "pub_prop";
        return PackBagConsts;
    }());
    packbag.PackBagConsts = PackBagConsts;
    __reflect(PackBagConsts.prototype, "packbag.PackBagConsts");
})(packbag || (packbag = {}));
var packbag;
(function (packbag) {
    var PackBagItem = (function (_super) {
        __extends(PackBagItem, _super);
        function PackBagItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PackBagItemSkin";
            return _this;
        }
        PackBagItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        PackBagItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            if (info == null) {
                this.bag_num.text = "";
                this.bag_icon.source = null;
                this.touchEnabled = false;
                this.touchChildren = false;
                return;
            }
            this.touchEnabled = true;
            this.touchChildren = true;
            var texWidth = 0;
            if (info.lefttime == undefined) {
                this.bag_num.text = info.number + "";
            }
            else {
                var day = Math.floor(info.lefttime / (3600 * 24));
                this.bag_num.text = day + "天";
            }
            this.bag_num.width = this.operateWidth(this.bag_num.text);
            ;
            this.bag_icon.source = "game_prop_json.bag_daoju_" + info.goodId;
        };
        PackBagItem.prototype.operateWidth = function (str) {
            var length = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charAt(i) == ".")
                    length += 7;
                else if (str.charAt(i) == "4")
                    length += 18;
                else if (str.charAt(i) == "天")
                    length += 26;
                else
                    length += 17;
            }
            return length;
        };
        return PackBagItem;
    }(eui.ItemRenderer));
    packbag.PackBagItem = PackBagItem;
    __reflect(PackBagItem.prototype, "packbag.PackBagItem");
})(packbag || (packbag = {}));
var packbag;
(function (packbag) {
    var PackBagPanel = (function (_super) {
        __extends(PackBagPanel, _super);
        function PackBagPanel() {
            var _this = _super.call(this) || this;
            _this.goodIds = [334, 335, 336]; //银猪，金猪,福卡
            _this.monthCards = [329, 324, 298];
            _this.skinName = "PackBagPanelSkin";
            return _this;
        }
        PackBagPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._comBtns = [this._closeBtn, this._buyBtn, this._useBtn, this._sendBtn, this._composeBtn, this._sellBtn];
            this._bag_lst.itemRenderer = packbag.PackBagItem;
            for (var i = 0; i < this._comBtns.length; i++) {
                this._comBtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this._bag_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            uniLib.Global.addEventListener(packbag.CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.addEventListener(packbag.CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
            uniLib.Global.addEventListener(packbag.CmdConstant.BACKPACK_PRESENT, this.backPackPresentHandler, this);
            this.initData();
        };
        PackBagPanel.prototype.initData = function () {
            var req = new Cmd.BackpackInfoRequestBackpackCmd_C();
            NetMgr.tcpSend(req);
        };
        PackBagPanel.prototype.backPackListHandler = function (evt) {
            var curData = evt.param;
            var backpackList = curData.backpackList;
            if (backpackList && backpackList.length > 0) {
                backpackList = this.operateList(backpackList);
                this._bagInfo = new eui.ArrayCollection(backpackList);
                this._bag_lst.dataProvider = this._bagInfo;
                this._bag_lst.selectedIndex = 0;
                this.setSelectItem(backpackList[0]);
            }
            else {
                backpackList = [];
                this._actual_total = backpackList.length;
                backpackList = this.operateList(backpackList);
                this._bagInfo = new eui.ArrayCollection(backpackList);
                this._bag_lst.dataProvider = this._bagInfo;
            }
        };
        PackBagPanel.prototype.backPackExchangeHandler = function (evt) {
            var curData = evt.param;
            var index = this.getIndexByGoodId(curData.backpackInfo.goodId);
            if (index > -1) {
                this._bagInfo.replaceItemAt(curData.backpackInfo, index);
                this._info = curData.backpackInfo;
                if (this._info.number == 0) {
                    this.goodZero(curData.backpackInfo.goodId);
                }
            }
        };
        PackBagPanel.prototype.getIndexByGoodId = function (goodId) {
            if (this._bagInfo) {
                for (var i = 0; i < this._actual_total; i++) {
                    if (this._bagInfo.source[i].goodId == goodId) {
                        return i;
                    }
                }
            }
            return -1;
        };
        PackBagPanel.prototype.backPackPresentHandler = function (evt) {
            var curData = evt.param;
            var index = this.getIndexByGoodId(curData.backpackInfo.goodId);
            if (index > -1) {
                this._bagInfo.replaceItemAt(curData.backpackInfo, index);
                this._info = curData.backpackInfo;
                if (this._info.number == 0) {
                    this.goodZero(curData.backpackInfo.goodId);
                }
            }
            else {
                this._bagInfo.replaceItemAt(curData.backpackInfo, this._actual_total);
                this._actual_total++;
            }
        };
        PackBagPanel.prototype.onItemTapHandler = function (evt) {
            this.setSelectItem(this._bag_lst.selectedItem);
        };
        PackBagPanel.prototype.setSelectItem = function (info) {
            this._info = info;
            var goods = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.select_name.text = goods.goodName;
            this.select_icon.source = "game_prop_json.bag_daoju_" + info.goodId;
            this.select_desc.text = goods.goodIntroduction;
            this.goodBtnOper(goods.goodBotton);
        };
        PackBagPanel.prototype.goodZero = function (goodId) {
            if (this.goodIds.indexOf(goodId) > -1) {
                var goods = ConfigMgr.getInstance().getGoodCfgById(goodId);
                this.goodBtnOper(goods.goodBotton);
            }
        };
        PackBagPanel.prototype.goodBtnOper = function (type) {
            for (var i = 1; i < this._comBtns.length; i++) {
                if (type.indexOf(i) > -1) {
                    this._comContain.addChild(this._comBtns[i]);
                    if (this._info.number == 0 && this.goodIds.indexOf(this._info.goodId) > -1) {
                        this._comBtns[i].enabled = false;
                    }
                    else {
                        this._comBtns[i].enabled = true;
                    }
                }
                else {
                    uniLib.DisplayUtils.removeFromParent(this._comBtns[i]);
                }
            }
        };
        PackBagPanel.prototype.onTouchHandler = function (evt) {
            var _this = this;
            if (evt.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._sendBtn) {
                LoadPanelTipMgr.getInstance().loadRes(packbag.PackBagConsts.PUB_BAGPRESENT, function () { uniLib.PopUpMgr.addPopUp(packbag.BagPresentPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, _this._info); });
            }
            else if (evt.target == this._useBtn) {
                if (this._info.goodId == 336) {
                    LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
                    uniLib.PopUpMgr.removePopUp(this);
                    return;
                }
                var req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = 1;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
            }
            else if (evt.target == this._buyBtn) {
                if (this._info.goodId == 329 || this._info.goodId == 298) {
                    var req = new Cmd.GetMonthCardInfoLobbyCmd_C();
                    req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                    NetMgr.tcpSend(req);
                }
                else if (this._info.goodId >= 348 && this._info.goodId <= 355) {
                    LobbyModuleMgr.getInstance().showMarketPanel(2);
                }
            }
            else if (evt.target == this._composeBtn) {
                var req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = 1;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
            }
            else if (evt.target == this._sellBtn) {
                LoadPanelTipMgr.getInstance().loadRes(packbag.PackBagConsts.PUB_BAGPRESENT, function () { uniLib.PopUpMgr.addPopUp(packbag.BagBuyOrSellPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, _this._info); });
            }
        };
        PackBagPanel.prototype.operateList = function (parameter) {
            var infos = [];
            if (uniLib.Global.isWxGame() && uniLib.Global.is_sandbox != 0) {
                for (var j = 0; j < parameter.length; j++) {
                    if (this.monthCards.indexOf(parameter[j].goodId) == -1) {
                        infos.push(parameter[j]);
                    }
                }
            }
            else {
                infos = parameter;
            }
            this._actual_total = infos.length;
            var offset = 12 - infos.length;
            if (offset > 0) {
                for (var i = 0; i < offset; i++) {
                    infos.push(null);
                }
            }
            else if (offset < 0) {
                var que = infos.length % 12;
                for (var i = 0; i < que; i++) {
                    infos.push(null);
                }
            }
            return infos;
        };
        PackBagPanel.prototype.destroy = function () {
            for (var i = 0; i < this._comBtns.length; i++) {
                this._comBtns[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this._comBtns = null;
            this._bag_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            uniLib.Global.removeEventListener(packbag.CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.removeEventListener(packbag.CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
            uniLib.Global.removeEventListener(packbag.CmdConstant.BACKPACK_PRESENT, this.backPackPresentHandler, this);
            this.removeChildren();
        };
        return PackBagPanel;
    }(eui.Component));
    packbag.PackBagPanel = PackBagPanel;
    __reflect(PackBagPanel.prototype, "packbag.PackBagPanel");
})(packbag || (packbag = {}));
var packbag;
(function (packbag) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**
        * 获取背包列表
        */
        CmdConstant.BACKPACK_INFO_RETURN = "backpack_info_return";
        /**
        * 获取背包道具使用
        */
        CmdConstant.BACKPACK_EXCHANGE = "backpack_exchange";
        /**
        * 获取背包道具赠送
        */
        CmdConstant.BACKPACK_PRESENT = "backpack_present";
        return CmdConstant;
    }());
    packbag.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "packbag.CmdConstant");
})(packbag || (packbag = {}));
var PackBagReciveMgr = (function () {
    function PackBagReciveMgr() {
    }
    return PackBagReciveMgr;
}());
__reflect(PackBagReciveMgr.prototype, "PackBagReciveMgr");
var Cmd;
(function (Cmd) {
    /**
 *
 */
    function OnBackpackInfoReturnBackpackCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_INFO_RETURN, rev);
        }
        else {
            if (rev.desc)
                uniLib.TipsUtils.showTipsDownToUp(rev.desc);
        }
    }
    Cmd.OnBackpackInfoReturnBackpackCmd_S = OnBackpackInfoReturnBackpackCmd_S;
    /**
     *
     */
    function OnBackpackExchangeReturnBackpackCmd_S(rev) {
        if (rev.resultCode == 0 || rev.resultCode == 10001) {
            if (rev.resultCode == 10001) {
                var msg = new uniLib.MsgBox("恭喜您成功合成现金红包，请前往”兑换“界面提现", "", "确定", function () {
                    LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
                }, "取消", null, this);
                uniLib.PopUpMgr.addPopUp(msg, null, true, true, false, uniLib.PopUpEffect.CENTER);
            }
            uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_EXCHANGE, rev);
        }
        else {
            if (rev.desc)
                uniLib.TipsUtils.showTipsDownToUp(rev.desc);
        }
    }
    Cmd.OnBackpackExchangeReturnBackpackCmd_S = OnBackpackExchangeReturnBackpackCmd_S;
    function OnBackpackPresentReturnBackpackCmd_S(rev) {
        if (rev.resultCode == undefined) {
            uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_PRESENT, rev);
        }
        else if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_PRESENT, rev);
            uniLib.TipsUtils.showTipsDownToUp("赠送成功！");
        }
        else {
            if (rev.desc)
                uniLib.TipsUtils.showTipsDownToUp(rev.desc);
        }
    }
    Cmd.OnBackpackPresentReturnBackpackCmd_S = OnBackpackPresentReturnBackpackCmd_S;
})(Cmd || (Cmd = {}));
