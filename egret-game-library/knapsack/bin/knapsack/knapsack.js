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
var knapsack;
(function (knapsack) {
    /**兑换金币页面 */
    var ExchangeGoldPanel = (function (_super) {
        __extends(ExchangeGoldPanel, _super);
        function ExchangeGoldPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ExchangeGoldSkin";
            return _this;
        }
        ExchangeGoldPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**事件监听 */
        ExchangeGoldPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(knapsack.KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
        };
        ExchangeGoldPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(knapsack.KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
        };
        //初始化
        ExchangeGoldPanel.prototype.initUI = function () {
            this._couponImg.source = "mjl_knapsack_json.mjl_knapsack_" + knapsack.KnapsackData.getInstance().knapaskGoodId;
            this._num = 1;
            this.updateNum();
            this._couponText.text = knapsack.Data.goods[knapsack.KnapsackData.getInstance().knapaskGoodId].goodName;
        };
        /**兑换金币后剩余数量 */
        ExchangeGoldPanel.prototype.updateData = function (e) {
            var data = e.param;
            /**领奖 */
            var award = new Cmd.RewardItem;
            award.goodId = 32;
            award.goodNbr = this._num * 100;
            LobbyModuleMgr.getInstance().showAwardPanel2(award);
            var backpackInfo = data.backpackInfo;
            knapsack.KnapsackData.getInstance().knapaskGoodnumber = data.backpackInfo.number;
            if (Math.trunc(knapsack.KnapsackData.getInstance().knapaskGoodnumber) == 0) {
                _super.prototype.removePop.call(this);
            }
            knapsack.KnapsackData.getInstance().knapaskGoodnumber = data.backpackInfo.number;
            this._num = 1;
            this.updateNum();
        };
        /**更新显示数量 */
        ExchangeGoldPanel.prototype.updateNum = function () {
            this._numText.text = this._num + "";
            this._goldText.text = this._num * 100 + "";
        };
        ExchangeGoldPanel.prototype.onClick = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._exchangeBtn:
                    knapsack.KnapsackSendMgr.ExchangeRequest(this._num, knapsack.KnapsackData.getInstance().knapaskGoodId);
                    break;
                case this._reduceBtn:
                    if (this._num > 1) {
                        this._num--;
                        this.updateNum();
                    }
                    break;
                case this._addBtn:
                    if (this._num < Math.trunc(knapsack.KnapsackData.getInstance().knapaskGoodnumber)) {
                        this._num++;
                        this.updateNum();
                    }
                    break;
            }
        };
        ExchangeGoldPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return ExchangeGoldPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    knapsack.ExchangeGoldPanel = ExchangeGoldPanel;
    __reflect(ExchangeGoldPanel.prototype, "knapsack.ExchangeGoldPanel");
})(knapsack || (knapsack = {}));
var knapsack;
(function (knapsack) {
    /**背包代金券Item */
    var KnapsakItemPanel = (function (_super) {
        __extends(KnapsakItemPanel, _super);
        function KnapsakItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "KnapsackItemSkin";
            return _this;
        }
        KnapsakItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        KnapsakItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._numText.text = "x" + this._info.number;
            this._couponImg.source = "mjl_knapsack_json.mjl_knapsack_" + this._info.goodId;
            this._gameText.text = knapsack.Data.goods[this._info.goodId].goodName;
            if (knapsack.KnapsackData.getInstance().knapaskGoodId == this._info.goodId) {
                this._selectImg.visible = true;
            }
            else {
                this._selectImg.visible = false;
            }
        };
        return KnapsakItemPanel;
    }(eui.ItemRenderer));
    knapsack.KnapsakItemPanel = KnapsakItemPanel;
    __reflect(KnapsakItemPanel.prototype, "knapsack.KnapsakItemPanel");
})(knapsack || (knapsack = {}));
var knapsack;
(function (knapsack) {
    /**背包页面 */
    var KnapsakPanel = (function (_super) {
        __extends(KnapsakPanel, _super);
        function KnapsakPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "KnapsackSkin";
            return _this;
        }
        KnapsakPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        KnapsakPanel.prototype.initUI = function () {
            var goodsTableData = RES.getRes("TableGoodsConfig_json");
            goodsTableData.forEach(function (f) {
                knapsack.Data.goods[f.goodId] = f;
            });
            this._couponList.itemRenderer = knapsack.KnapsakItemPanel;
            knapsack.KnapsackData.getInstance().knapaskGoodId = 0;
        };
        /**事件监听 */
        KnapsakPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(knapsack.KnapsackConst.BackpackInfoReturnBackpack, this.showData, this);
            uniLib.Global.addEventListener(knapsack.KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
            this._couponList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        KnapsakPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(knapsack.KnapsackConst.BackpackInfoReturnBackpack, this.showData, this);
            uniLib.Global.removeEventListener(knapsack.KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._couponList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        /**传数据 */
        KnapsakPanel.prototype.showData = function (e) {
            var data = e.param;
            this._backpackList = data.backpackList;
            this.updateList();
            this._detailGroup.visible = false;
            if (Array.isArray(this._backpackList)) {
                this._couponTips.visible = false;
            }
        };
        /**兑换金币后剩余数量 */
        KnapsakPanel.prototype.updateData = function (e) {
            var _this = this;
            this._newbackpackList = [];
            var data = e.param;
            var backpackInfo = data.backpackInfo;
            this._backpackList.forEach(function (element) {
                if (element.goodId == backpackInfo.goodId) {
                    element.number = backpackInfo.number;
                }
                if (element.number != 0) {
                    _this._newbackpackList.push(element);
                }
            });
            this._backpackList = this._newbackpackList;
            if (data.backpackInfo.number == 0) {
                knapsack.KnapsackData.getInstance().knapaskGoodId = 0;
            }
            this.showdetailGroup();
            this.updateList();
            if (this._backpackList.length != 0) {
                this._couponTips.visible = false;
            }
            else {
                this._couponTips.visible = true;
            }
        };
        KnapsakPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._exchangeBtn:
                    knapsack.KnapsackModuleMgr.getInstance().showExchangeGoldPanel();
                    break;
            }
        };
        /**选中玩家*/
        KnapsakPanel.prototype.itemTap = function (evt) {
            if (this._couponList.selectedItem) {
                var item = this._couponList.selectedItem;
                if (knapsack.KnapsackData.getInstance().knapaskGoodId == item.goodId) {
                    knapsack.KnapsackData.getInstance().knapaskGoodId = 0;
                }
                else {
                    knapsack.KnapsackData.getInstance().knapaskGoodId = item.goodId;
                    knapsack.KnapsackData.getInstance().knapaskGoodnumber = item.number;
                }
            }
            this.updateList();
            this.showdetailGroup();
        };
        /**点击更新数据 */
        KnapsakPanel.prototype.updateList = function () {
            if (!this._couponListArray) {
                this._couponListArray = new eui.ArrayCollection(this._backpackList);
                this._couponList.dataProvider = this._couponListArray;
            }
            else {
                if (Array.isArray(this._couponListArray.source)) {
                    this._couponListArray.removeAll();
                }
                this._couponListArray.replaceAll(this._backpackList);
            }
        };
        /**显示右侧代金券详情信息 */
        KnapsakPanel.prototype.showdetailGroup = function () {
            if (knapsack.KnapsackData.getInstance().knapaskGoodId != 0) {
                this._detailGroup.visible = true;
                this._couponText.text = knapsack.Data.goods[knapsack.KnapsackData.getInstance().knapaskGoodId].goodName;
                this._explainText.text = knapsack.Data.goods[knapsack.KnapsackData.getInstance().knapaskGoodId].goodIntroduction;
                this._explainText.text = this._explainText.text.replace(/\\n/g, "\n");
                this._couponImg.source = "mjl_knapsack_json.mjl_knapsack_" + knapsack.KnapsackData.getInstance().knapaskGoodId;
                this._detailTips.visible = false;
                if (knapsack.KnapsackData.getInstance().knapaskGoodnumber < 1) {
                    this._exchangeBtn.visible = false;
                }
                else {
                    this._exchangeBtn.visible = true;
                }
            }
            else {
                this._detailGroup.visible = false;
                this._detailTips.visible = true;
            }
        };
        KnapsakPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return KnapsakPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    knapsack.KnapsakPanel = KnapsakPanel;
    __reflect(KnapsakPanel.prototype, "knapsack.KnapsakPanel");
})(knapsack || (knapsack = {}));
var knapsack;
(function (knapsack) {
    var KnapsackConst = (function () {
        function KnapsackConst() {
        }
        KnapsackConst.RES_JSON = "resource/knapsack/knapsack.res_13712f73.json";
        KnapsackConst.THM_JSON = "resource/knapsack/gameEui_e1968589.json";
        /**
         * 公共loading需要加载的资源组
         */
        KnapsackConst.PUB_KNAPSACK = "pub_knapsack";
        /**数据无误 */
        KnapsackConst.SUCCESS = 0;
        /** 背包*/
        KnapsackConst.BackpackInfoReturnBackpack = "BackpackInfoReturnBackpack";
        /** 领取红包钱*/
        KnapsackConst.OpenRedPackLobby = "OpenRedPackLobby";
        /** 换物品后返回*/
        KnapsackConst.BackpackExchangeReturnBackpack = "BackpackExchangeReturnBackpack";
        return KnapsackConst;
    }());
    knapsack.KnapsackConst = KnapsackConst;
    __reflect(KnapsackConst.prototype, "knapsack.KnapsackConst");
    /**暂存数据 对应表数据 */
    var Data = (function () {
        function Data() {
        }
        /**道具表 */
        Data.goods = {};
        return Data;
    }());
    knapsack.Data = Data;
    __reflect(Data.prototype, "knapsack.Data");
})(knapsack || (knapsack = {}));
var knapsack;
(function (knapsack) {
    var KnapsackData = (function () {
        function KnapsackData() {
            /** 合伙人 默认返回的matchid*/
            this.PartnerMatchId = 0;
            /**背包选中项代金券物品ID */
            this.knapaskGoodId = 0;
            /**背包选中项代金券数量 */
            this.knapaskGoodnumber = 0;
        }
        KnapsackData.getInstance = function () {
            if (!this._instance) {
                this._instance = new KnapsackData();
            }
            return this._instance;
        };
        return KnapsackData;
    }());
    knapsack.KnapsackData = KnapsackData;
    __reflect(KnapsackData.prototype, "knapsack.KnapsackData");
})(knapsack || (knapsack = {}));
var Cmd;
(function (Cmd) {
    function KnapsackDispatch(cmd, obj, bubbles) {
        if (bubbles === void 0) { bubbles = true; }
        uniLib.Global.dispatchEvent(cmd, obj, bubbles);
    }
    Cmd.KnapsackDispatch = KnapsackDispatch;
    /**更新物品数据 */
    function OnBackpackExchangeReturnBackpackCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = knapsack.KnapsackConst.SUCCESS;
        }
        if (rev.resultCode == knapsack.KnapsackConst.SUCCESS) {
            KnapsackDispatch(knapsack.KnapsackConst.BackpackExchangeReturnBackpack, rev);
        }
    }
    Cmd.OnBackpackExchangeReturnBackpackCmd_S = OnBackpackExchangeReturnBackpackCmd_S;
    /**返回背包数据*/
    function OnBackpackInfoReturnBackpackCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = knapsack.KnapsackConst.SUCCESS;
        }
        if (rev.resultCode == knapsack.KnapsackConst.SUCCESS) {
            KnapsackDispatch(knapsack.KnapsackConst.BackpackInfoReturnBackpack, rev);
        }
    }
    Cmd.OnBackpackInfoReturnBackpackCmd_S = OnBackpackInfoReturnBackpackCmd_S;
})(Cmd || (Cmd = {}));
var knapsack;
(function (knapsack) {
    var KnapsackModuleMgr = (function () {
        function KnapsackModuleMgr() {
        }
        KnapsackModuleMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new KnapsackModuleMgr();
            }
            return this._instance;
        };
        /**显示背包界面 */
        KnapsackModuleMgr.prototype.showKnapsakPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(knapsack.KnapsackConst.PUB_KNAPSACK, function () {
                uniLib.PopUpMgr.addPopUp(knapsack.KnapsakPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**显示兑换金币页面 */
        KnapsackModuleMgr.prototype.showExchangeGoldPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(knapsack.KnapsackConst.PUB_KNAPSACK, function () {
                uniLib.PopUpMgr.addPopUp(knapsack.ExchangeGoldPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        return KnapsackModuleMgr;
    }());
    knapsack.KnapsackModuleMgr = KnapsackModuleMgr;
    __reflect(KnapsackModuleMgr.prototype, "knapsack.KnapsackModuleMgr");
})(knapsack || (knapsack = {}));
var knapsack;
(function (knapsack) {
    var KnapsackSendMgr = (function () {
        function KnapsackSendMgr() {
        }
        /**请求使用物品
             * @param goodId 兑换物品id
             * @param num 兑换数量
             */
        KnapsackSendMgr.ExchangeRequest = function (num, goodId) {
            var req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
            var backpackInfo = new Cmd.BackpackInfo;
            backpackInfo.goodId = goodId;
            backpackInfo.number = num;
            req.backpackInfo = backpackInfo;
            NetMgr.tcpSend(req);
        };
        return KnapsackSendMgr;
    }());
    knapsack.KnapsackSendMgr = KnapsackSendMgr;
    __reflect(KnapsackSendMgr.prototype, "knapsack.KnapsackSendMgr");
})(knapsack || (knapsack = {}));
