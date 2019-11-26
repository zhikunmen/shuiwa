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
var rankList;
(function (rankList) {
    var ListItem = (function (_super) {
        __extends(ListItem, _super);
        function ListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ListItemSkin";
            return _this;
        }
        ListItem.prototype.dataChanged = function () {
            var data = this.data;
            this.rankData = data;
            this._head.source = data.headUrl;
            if (data.rank < 4) {
                this._rankImg.source = "rank_num_" + data.rank;
                this._rankTxt.visible = false;
            }
            else {
                this._rankImg.source = "rank_num_4";
                this._rankTxt.visible = true;
                this._rankTxt.text = data.rank + "";
            }
        };
        ListItem.prototype.destroy = function () {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return ListItem;
    }(eui.ItemRenderer));
    rankList.ListItem = ListItem;
    __reflect(ListItem.prototype, "rankList.ListItem");
})(rankList || (rankList = {}));
var rankList;
(function (rankList) {
    var ListVC = (function (_super) {
        __extends(ListVC, _super);
        function ListVC() {
            var _this = _super.call(this) || this;
            _this._rankData = new eui.ArrayCollection();
            _this.skinName = "ListVCSkin";
            return _this;
        }
        ListVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.init();
            this.addEvent();
            this.sendReq();
        };
        //发送请求
        ListVC.prototype.sendReq = function () {
            var req = new Cmd.RequestRankInfoHpMatchCmd_C();
            req.gameId = 4231;
            req.curPage = 1;
            NetMgr.tcpSend(req);
        };
        ListVC.prototype.init = function () {
            this._rankList.itemRenderer = rankList.ListItem;
            this._rankList.dataProvider = this._rankData;
            this._rankScroll.viewport = this._rankList;
            this._rankScroll.scrollPolicyH = "off";
            this._rankScroll.scrollPolicyV = "off";
            this._rankScroll.horizontalScrollBar = null;
            this._rankScroll.verticalScrollBar = null;
        };
        //事件监听
        ListVC.prototype.addEvent = function () {
            uniLib.Global.addEventListener(match.EVENT_RANKINFO, this.setRank, this);
            this._rankGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
            this.subscribe_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subscribeHandle, this);
        };
        //打开排行榜
        ListVC.prototype.showRank = function () {
            this.rankVC = new rankList.RankVC;
            // this.rankVC.setSelf(this.myData);
            uniLib.PopUpMgr.addPopUp(this.rankVC, null, false, true, 0, uniLib.PopUpEffect.LEFT);
        };
        //渲染大厅排行榜
        ListVC.prototype.setRank = function (evt) {
            var data = evt.param;
            if (data.curPage == 1) {
                this._rankData.source = data.rankInfos;
                this._rankData.refresh();
            }
            this.myData = data.myRank;
            if (this.rankVC) {
                // this.rankVC.setSelf(this.myData);
            }
        };
        //收藏小游戏
        ListVC.prototype.subscribeHandle = function () {
            LoadPanelTipMgr.getInstance().loadRes(rankList.RankConst.LB_SUBSCRIBE, function () {
                uniLib.PopUpMgr.addPopUp(rankList.WxSubscribe, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        ListVC.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(match.EVENT_RANKINFO, this.setRank, this);
            this._rankGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
            this.subscribe_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subscribeHandle, this);
        };
        ListVC.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return ListVC;
    }(eui.Component));
    rankList.ListVC = ListVC;
    __reflect(ListVC.prototype, "rankList.ListVC");
})(rankList || (rankList = {}));
var rankList;
(function (rankList) {
    var RankConst = (function () {
        function RankConst() {
        }
        RankConst.RES_JSON = "resource/rankList/rankList.res_3f0a5509.json";
        RankConst.THM_JSON = "resource/rankList/gameEui_f55441e8.json";
        /**
         * 公共排行榜需要加载的资源组
         */
        RankConst.PUB_MESSAGE = "pub_rank";
        /**
         * 收藏需要加载的资源组
         */
        RankConst.LB_SUBSCRIBE = "lb_subscribe";
        /**
         * 排行榜数据
         */
        RankConst.RANK_DATA = "rank_data";
        /**
         * 捕鱼收藏需要加载的资源组
         */
        RankConst.BUYU_SUBSCRIBE = "buyu_subscribe";
        return RankConst;
    }());
    rankList.RankConst = RankConst;
    __reflect(RankConst.prototype, "rankList.RankConst");
})(rankList || (rankList = {}));
var Cmd;
(function (Cmd) {
    function OnGetRankListLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(rankList.RankConst.RANK_DATA, rev);
    }
    Cmd.OnGetRankListLobbyCmd_S = OnGetRankListLobbyCmd_S;
})(Cmd || (Cmd = {}));
var rankList;
(function (rankList) {
    var RankItem = (function (_super) {
        __extends(RankItem, _super);
        function RankItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "RankItemSkin";
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.destroy, _this);
            return _this;
        }
        RankItem.prototype.dataChanged = function () {
            var data = this.data;
            this.head_img.source = data.headUrl;
            if (data.rank < 10) {
                this._rankTxt.font = "rank_big_num_fnt";
            }
            else {
                this._rankTxt.font = "rank_small_num_fnt";
            }
            this._rankTxt.text = data.rank + "";
            if (data.nickName.length > 10) {
                this.nickName_lbl.text = (data.nickName).substring(0, 10) + "...";
            }
            else {
                this.nickName_lbl.text = data.nickName;
            }
            if (data.rType == 3) {
                this.type_img.source = "rank_game_res_1_json.paihang_jinzhu";
            }
            else if (data.rType == 4) {
                this.type_img.source = "rank_game_res_1_json.paihang_yinzhu";
            }
            else if (data.rType == 5) {
                this.type_img.source = "game_prop_json.bag_daoju_364";
                commonConfirm.ResUtil.limitImageSize(this.type_img, 60);
            }
            this.num_lbl.text = data.allChips + "";
        };
        RankItem.prototype.destroy = function () {
            // RES.destroyRes(<string>this.head_img.source);
            this.head_img = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return RankItem;
    }(eui.ItemRenderer));
    rankList.RankItem = RankItem;
    __reflect(RankItem.prototype, "rankList.RankItem");
})(rankList || (rankList = {}));
var rankList;
(function (rankList) {
    var RankVC = (function (_super) {
        __extends(RankVC, _super);
        function RankVC(type) {
            var _this = _super.call(this) || this;
            _this._type = 3;
            if (type)
                _this._type = type;
            _this.skinName = "RankVCSkin";
            return _this;
        }
        RankVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
            this._arrColl = new eui.ArrayCollection();
            this._rankList.itemRenderer = rankList.RankItem;
            this._rankList.dataProvider = this._arrColl;
            this.nickName_lbl.text = uniLib.UserInfo.nickName;
            this.head_img.source = uniLib.UserInfo.headUrl;
            if (this._type == 5) {
                this.silverPig_btn.visible = false;
                this._friendBtn.source = "rank_game_res_1_json.paihang_dantoubang";
                this.type_img.source = "game_prop_json.bag_daoju_364";
                commonConfirm.ResUtil.limitImageSize(this.type_img, 60);
                this.goldPig_btn.touchEnabled = false;
            }
            this.getData(this._type);
        };
        //事件监听
        RankVC.prototype.addEvent = function () {
            uniLib.Global.addEventListener(rankList.RankConst.RANK_DATA, this.getWorld, this);
            this.goldPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.silverPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
            this._rankList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        };
        RankVC.prototype.getData = function (type) {
            var req = new Cmd.GetRankListLobbyCmd_C();
            req.rType = type;
            NetMgr.tcpSend(req);
        };
        RankVC.prototype.onTouch = function (evt) {
            if (evt.target == this.goldPig_btn) {
                this.goldPig_btn.touchEnabled = false;
                this.silverPig_btn.touchEnabled = true;
                this._friendBg.source = "rank_title_bg_2";
                this._groupBg.source = "rank_title_bg_1";
                this.type_img.source = "rank_game_res_1_json.paihang_jinzhu";
                if (this._goldData) {
                    this.setView(this._goldData);
                }
                else {
                    this.getData(3);
                }
            }
            else if (evt.target == this.silverPig_btn) {
                this.silverPig_btn.touchEnabled = false;
                this.goldPig_btn.touchEnabled = true;
                this._groupBg.source = "rank_title_bg_2";
                this._friendBg.source = "rank_title_bg_1";
                this.type_img.source = "rank_game_res_1_json.paihang_yinzhu";
                if (this._silverData) {
                    this.setView(this._silverData);
                }
                else {
                    this.getData(4);
                }
            }
        };
        //渲染世界排行榜
        RankVC.prototype.getWorld = function (evt) {
            var data = evt.param;
            /**3金猪 4银猪*/
            if (data.rType == 3) {
                this._goldData = data;
            }
            else if (data.rType == 4) {
                this._silverData = data;
            }
            this.setView(data);
        };
        RankVC.prototype.setView = function (data) {
            this._arrColl.removeAll();
            this._arrColl.replaceAll(data.rankInfo);
            this._arrColl.refresh();
            if (data.myRank) {
                if (data.myRank < 10) {
                    this.rank_blbl.font = "rank_big_num_fnt";
                }
                else {
                    this.rank_blbl.font = "rank_small_num_fnt";
                }
                this.rank_blbl.text = data.myRank + "";
                this.rank_img.visible = false;
            }
            else {
                this.rank_blbl.text = "";
                this.rank_img.visible = true;
            }
            this.num_lbl.text = data.myChips + "";
        };
        //移除该面板
        RankVC.prototype.removeSelf = function () {
            uniLib.PopUpMgr.removePopUp(this, uniLib.PopUpEffect.LEFT);
        };
        RankVC.prototype.onItemTap = function () {
            var info = this._rankList.selectedItem;
            var req = new Cmd.UserInfoSearchLobbyCmd_C();
            req.uid = info.uid;
            NetMgr.tcpSend(req);
        };
        RankVC.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(rankList.RankConst.RANK_DATA, this.getWorld, this);
            this.goldPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.silverPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.removeSelf, this);
            this._rankList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        };
        RankVC.prototype.destroy = function () {
            this.removeEvent();
            this._arrColl = null;
            this._goldData = null;
            this._silverData = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return RankVC;
    }(eui.Component));
    rankList.RankVC = RankVC;
    __reflect(RankVC.prototype, "rankList.RankVC");
})(rankList || (rankList = {}));
var rankList;
(function (rankList) {
    /**
     * 收藏
     */
    var WxSubscribe = (function (_super) {
        __extends(WxSubscribe, _super);
        function WxSubscribe(type) {
            if (type === void 0) { type = 0; }
            var _this = _super.call(this) || this;
            _this.skins = ["WxSubscribeSkin", "WxBuyuSubscribeSkin"];
            _this.skinName = _this.skins[type];
            return _this;
        }
        WxSubscribe.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
        };
        WxSubscribe.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            uniLib.PopUpMgr.removePopUp(this);
        };
        return WxSubscribe;
    }(eui.Component));
    rankList.WxSubscribe = WxSubscribe;
    __reflect(WxSubscribe.prototype, "rankList.WxSubscribe");
})(rankList || (rankList = {}));
