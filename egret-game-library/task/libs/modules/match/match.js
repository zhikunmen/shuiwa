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
var match;
(function (match) {
    var WxGameList = (function (_super) {
        __extends(WxGameList, _super);
        function WxGameList(param) {
            var _this = _super.call(this) || this;
            /**
             * 五元红包赛
             */
            _this._beginSceneId = 7001;
            _this._param = param;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this.skinName = "WxGameListSkin";
            return _this;
        }
        WxGameList.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(match.EVENT_GAMELIST, this.onGameListHandler, this);
            this.ticketGame_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.ticketGame_lst.itemRenderer = match.WxGameListItem;
            this.ticketGame_lst.dataProvider = new eui.ArrayCollection(this._param.matchList);
            this.top_skin.ticket_btn.touchEnabled = false;
            /**界面动画 */
            var sX = (uniLib.Global.screenWidth - this.ticketGame_scr.width) >> 1;
            this.ticketGame_scr.x = uniLib.Global.screenWidth;
            egret.Tween.get(this.ticketGame_scr).to({ x: sX }, 400, egret.Ease.quintOut);
            this.begin_btn.y = uniLib.Global.screenHeight + this.begin_btn.height;
            egret.Tween.get(this.begin_btn).to({ y: uniLib.Global.screenHeight - this.begin_btn.height * 0.5 }, 400, egret.Ease.quintOut).call(function () {
                _this.begin_btn.bottom = 0;
                _this.begin_btn.visible = false;
                _this.begin_ac.visible = true;
            }, this);
        };
        WxGameList.prototype.onGameListHandler = function (evt) {
            var param = evt.param;
            this.ticketGame_lst.dataProvider = new eui.ArrayCollection(param.matchList);
        };
        WxGameList.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                /**6钻石 32金币 快速开始*/
                var config = table.getMatchConfigBySceneId(this._beginSceneId);
                if (Array.isArray(config.HaoPaiMatchCost) && config.HaoPaiMatchCost[0].goodId == 6) {
                    if (uniLib.UserInfo.chips >= config.HaoPaiMatchCost[0].goodNbr) {
                        wxgame.Global.instance.aldSendEvent("淘汰赛", "点击快速开始");
                        match.OnRequestJoinHpMatchCmd_C(this._beginSceneId);
                    }
                    else {
                        LobbyModuleMgr.getInstance().showDiamondsPanel();
                    }
                }
                else {
                    /**消耗金币有可能有破产补助 */
                    match.OnRequestJoinHpMatchCmd_C(this._beginSceneId);
                }
            }
        };
        WxGameList.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxGameList.prototype.onItemTapHandler = function (evt) {
            var data = this.ticketGame_lst.selectedItem;
            if (data.unLocked == 0) {
                uniLib.PopUpMgr.addPopUp(match.WxUnlockGame, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            }
            else {
                /**暂时只消耗钻石 所以没有做多的处理 */
                var config = table.getMatchConfigBySceneId(data.sceneId);
                if (config.HaoPaiMatchCost[0].goodId == match.GoodType.TYPE_DIAMOND) {
                    if (config.HaoPaiMatchCost[0].goodNbr > uniLib.UserInfo.chips) {
                        uniLib.PopUpMgr.removePopUp(this);
                        LobbyModuleMgr.getInstance().showDiamondsPanel();
                    }
                    else {
                        wxgame.Global.instance.aldSendEvent("淘汰赛", "点击");
                        match.OnRequestJoinHpMatchCmd_C(data.sceneId);
                    }
                }
                else if (config.HaoPaiMatchCost[0].goodId == match.GoodType.TYPE_GOLD) {
                    if (config.HaoPaiMatchCost[0].goodNbr > uniLib.UserInfo.goldChips) {
                        var confirm_1 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                            LobbyModuleMgr.getInstance().showMarketPanel(1);
                        }, function () { }, this);
                        uniLib.PopUpMgr.addPopUp(confirm_1, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                    }
                    else {
                        wxgame.Global.instance.aldSendEvent("免费钻石赛", "钻石淘汰赛点击");
                        match.OnRequestJoinHpMatchCmd_C(data.sceneId);
                    }
                }
                else {
                    if (config.HaoPaiMatchType == match.GameType.TYPE_CARD) {
                        wxgame.Global.instance.aldSendEvent("免费钻石赛", "免费钻石赛点击");
                        match.OnRequestJoinHpMatchCmd_C(data.sceneId);
                    }
                }
            }
        };
        WxGameList.prototype.destroy = function () {
            this._param = null;
            egret.Tween.removeTweens(this.ticketGame_scr);
            egret.Tween.removeTweens(this.begin_btn);
            uniLib.Global.dispatchEvent(commonConfirm.EVENT_PANEL_CLOSE);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(match.EVENT_GAMELIST, this.onGameListHandler, this);
            this.ticketGame_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        };
        return WxGameList;
    }(eui.Component));
    match.WxGameList = WxGameList;
    __reflect(WxGameList.prototype, "match.WxGameList");
})(match || (match = {}));
var match;
(function (match) {
    var MatchConst = (function () {
        function MatchConst() {
        }
        MatchConst.RES_JSON = "resource/match/wxmatch.res_3162535b.json";
        MatchConst.THM_JSON = "resource/match/gameEui_c973cb17.json";
        /**
         * 主界面需要加载的资源
         */
        MatchConst.PUB_LOGIN = "bs_login";
        /**
         * 好牌网比赛资源组
         */
        MatchConst.HPW_MATCH = "wxmatch";
        /**
         * 奖品一览资源组
         */
        MatchConst.HPW_JPYL = "bs_jpyl";
        /**
         * 金币资源组
         */
        MatchConst.HPW_GOLD = "bs_gold";
        return MatchConst;
    }());
    match.MatchConst = MatchConst;
    __reflect(MatchConst.prototype, "match.MatchConst");
    /**
     * 比赛类型
     */
    var GameType;
    (function (GameType) {
        /**参赛卡赛*/
        GameType[GameType["TYPE_CARD"] = 1] = "TYPE_CARD";
        /**红包淘汰赛 */
        GameType[GameType["TYPE_OUT"] = 7] = "TYPE_OUT";
        /**钻石淘汰赛 */
        GameType[GameType["TYPE_DIAMOND"] = 8] = "TYPE_DIAMOND";
    })(GameType = match.GameType || (match.GameType = {}));
    /**
     * 道具类型
     */
    var GoodType;
    (function (GoodType) {
        /**钻石*/
        GoodType[GoodType["TYPE_DIAMOND"] = 6] = "TYPE_DIAMOND";
        /**金币 */
        GoodType[GoodType["TYPE_GOLD"] = 32] = "TYPE_GOLD";
    })(GoodType = match.GoodType || (match.GoodType = {}));
    /**
     * 1:欢乐场 2:跑八张 3:疯狂场
     */
    var SceneType;
    (function (SceneType) {
        /**经典场 必出*/
        SceneType[SceneType["TYPE_CALSSIC"] = 1] = "TYPE_CALSSIC";
        /**跑八张 */
        SceneType[SceneType["TYPE_EIGHT_CARD"] = 2] = "TYPE_EIGHT_CARD";
        /**疯狂场 */
        SceneType[SceneType["TYPE_CRAZY"] = 3] = "TYPE_CRAZY";
        /**经典场 非必出*/
        SceneType[SceneType["TYPE_CLASSIC2"] = 4] = "TYPE_CLASSIC2";
    })(SceneType = match.SceneType || (match.SceneType = {}));
    /**排行榜信息 */
    match.EVENT_RANKINFO = "event_rankinfo";
    /**比赛列表 */
    match.EVENT_GAMELIST = "event_gamelist";
    /**获奖记录 */
    match.EVENT_REWARDRECORD = "event_rewardrecord";
    /**战绩记录 */
    match.EVENT_HISTORY = "event_history";
    /**红包奖励 */
    match.EVENT_PACKAGEREWARD = "event_packagereward";
    /**主界面刷新 */
    match.EVENT_FLUSH = "event_flash";
    /**报名人数更新*/
    match.EVENT_REPORT_NUM = "event_report_num";
    /**匹配人数更新*/
    match.EVENT_MATCH_NUM = "event_match_num";
    /**退出界面时间*/
    match.EVENT_CLOSE_PANEL = "event_close_panel";
})(match || (match = {}));
var match;
(function (match) {
    var BaseButton = (function (_super) {
        __extends(BaseButton, _super);
        function BaseButton() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        BaseButton.prototype.init = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        };
        BaseButton.prototype.onTouchBegin = function () {
            this.currentState = "down";
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        };
        BaseButton.prototype.onTouchEnd = function () {
            this.currentState = "up";
            this.scaleX = 1;
            this.scaleY = 1;
        };
        BaseButton.prototype.onTouchCancel = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        BaseButton.prototype.onTouchMove = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        BaseButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchEnd, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
        };
        return BaseButton;
    }(eui.Button));
    match.BaseButton = BaseButton;
    __reflect(BaseButton.prototype, "match.BaseButton");
})(match || (match = {}));
var match;
(function (match) {
    /**
     * 金币场选场
     */
    var WxGoldSelectScene = (function (_super) {
        __extends(WxGoldSelectScene, _super);
        function WxGoldSelectScene(sceneInfo) {
            var _this = _super.call(this) || this;
            _this._sceneInfo = sceneInfo;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this.skinName = "WxGoldSelectSceneSkin";
            return _this;
        }
        WxGoldSelectScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.select_lst.itemRenderer = match.WxGoldSelectSceneItem;
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchanHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchanHandler, this);
            uniLib.Global.addEventListener(match.EVENT_CLOSE_PANEL, this.animationShow, this);
            this.onDataUpdate();
            !this._sceneInfo.defType && this.animationShow();
        };
        /**
        * 界面动画
        */
        WxGoldSelectScene.prototype.animationShow = function () {
            var _this = this;
            var sX = (uniLib.Global.screenWidth - this.scene_scr.width) >> 1;
            this.scene_scr.x = uniLib.Global.screenWidth;
            this.begin_btn.y = uniLib.Global.screenHeight + this.begin_btn.height;
            egret.Tween.get(this.scene_scr).to({ x: sX }, 400, egret.Ease.quintOut);
            egret.Tween.get(this.begin_btn).to({ y: uniLib.Global.screenHeight - this.begin_btn.height * 0.5 }, 400, egret.Ease.quintOut).call(function () { _this.begin_btn.bottom = 0; }, this);
        };
        WxGoldSelectScene.prototype.onDataUpdate = function () {
            this.select_lst.dataProvider = new eui.ArrayCollection(this._sceneInfo.infos);
            this.select_lst.dataProviderRefreshed();
            if (this._sceneInfo.defType) {
                for (var i = 0; i < this._sceneInfo.infos.length; i++) {
                    if (this._sceneInfo.infos[i].type == this._sceneInfo.defType) {
                        uniLib.PopUpMgr.addPopUp(match.WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, this._sceneInfo.infos[i]);
                        break;
                    }
                }
            }
        };
        WxGoldSelectScene.prototype.onItemTapHandler = function (evt) {
            var data = this.select_lst.selectedItem;
            uniLib.PopUpMgr.addPopUp(match.WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, data);
        };
        WxGoldSelectScene.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxGoldSelectScene.prototype.onTouchanHandler = function (evt) {
            if (evt.target == this.begin_btn) {
                if (this._sceneInfo) {
                    var items = this._sceneInfo[0].items;
                    for (var i = items.length - 1; i >= 0; i--) {
                        if (uniLib.UserInfo.goldChips >= items[i].lowestCarry) {
                            match.OnEnterMatchRoomCmd_C(items[i].gameId, items[i].sceneId);
                            return;
                        }
                    }
                    var confirm_2 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                        LobbyModuleMgr.getInstance().showMarketPanel(1);
                    }, function () { }, this);
                    uniLib.PopUpMgr.addPopUp(confirm_2, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                }
            }
            else if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        WxGoldSelectScene.prototype.destroy = function () {
            egret.Tween.removeTweens(this.scene_scr);
            egret.Tween.removeTweens(this.begin_btn);
            uniLib.Global.dispatchEvent(commonConfirm.EVENT_PANEL_CLOSE);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchanHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchanHandler, this);
            uniLib.Global.removeEventListener(match.EVENT_CLOSE_PANEL, this.animationShow, this);
            this._sceneInfo = null;
        };
        return WxGoldSelectScene;
    }(eui.Component));
    match.WxGoldSelectScene = WxGoldSelectScene;
    __reflect(WxGoldSelectScene.prototype, "match.WxGoldSelectScene");
})(match || (match = {}));
var match;
(function (match) {
    var WxGoldSelectSceneItem = (function (_super) {
        __extends(WxGoldSelectSceneItem, _super);
        function WxGoldSelectSceneItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGoldSelectSceneItemSkin";
            return _this;
        }
        WxGoldSelectSceneItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        WxGoldSelectSceneItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.touch_btn["bg_img"].source = "lb_jinbi_wanfa" + info.type + "_png";
            this.touch_btn["red_lbl"].text = "\u73A9" + info.curUserNbr + "\u5C40\u62FF\u514D\u8D39\u7EA2\u5305";
            var lbl = this.touch_btn["desc_lbl"];
            if (info.type == 1) {
                lbl.textColor = 0x01732c;
                lbl.text = "经典休闲玩法";
            }
            else if (info.type == 2) {
                lbl.textColor = 0x0766A0;
                lbl.text = "去掉3、4、5更刺激";
            }
            else if (info.type == 3) {
                lbl.textColor = 0xbf4611;
                lbl.text = "狂欢炸炸炸";
            }
        };
        return WxGoldSelectSceneItem;
    }(eui.ItemRenderer));
    match.WxGoldSelectSceneItem = WxGoldSelectSceneItem;
    __reflect(WxGoldSelectSceneItem.prototype, "match.WxGoldSelectSceneItem");
})(match || (match = {}));
var match;
(function (match) {
    /**
     * 金币场选场
     */
    var WxGoldSelectType = (function (_super) {
        __extends(WxGoldSelectType, _super);
        function WxGoldSelectType(data) {
            var _this = _super.call(this) || this;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this._data = data;
            _this.skinName = "WxGoldSelectTypeSkin";
            return _this;
        }
        WxGoldSelectType.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.ret_btn["ret_img"].source = "lb_jinbi_title" + this._data.type + "_png";
            this.select_lst.itemRenderer = match.WxGoldSelectTypeItem;
            this.select_lst.dataProvider = new eui.ArrayCollection(this._data.items);
            this.select_lst.dataProviderRefreshed();
            this.select_lst.validateNow();
            /**检测最适合进入哪个房间 */
            this.checkEnterRoom();
            /**界面动画 */
            var sX = (uniLib.Global.screenWidth - this.type_scr.width) >> 1;
            this.type_scr.x = uniLib.Global.screenWidth;
            this.begin_btn.y = uniLib.Global.screenHeight + this.begin_btn.height;
            egret.Tween.get(this.type_scr).to({ x: sX }, 400, egret.Ease.quintOut);
            egret.Tween.get(this.begin_btn).to({ y: uniLib.Global.screenHeight - this.begin_btn.height * 0.5 }, 400, egret.Ease.quintOut).call(function () {
                _this.begin_btn.bottom = 0;
                _this.begin_btn.visible = false;
                _this.begin_ac.visible = true;
            }, this);
        };
        WxGoldSelectType.prototype.onItemTapHandler = function (evt) {
            var _this = this;
            var data = this.select_lst.selectedItem;
            if (uniLib.UserInfo.goldChips >= data.lowestCarry) {
                wxgame.Global.instance.aldSendEvent("金币场", "\u70B9\u51FB" + this._data.type + "_" + data.type + "\u573A");
                match.OnEnterMatchRoomCmd_C(data.gameId, data.sceneId);
            }
            else {
                var obj = { "1": "初级场", "2": "中级场", "3": "高级场" };
                var _loop_1 = function (i) {
                    if (uniLib.UserInfo.goldChips >= this_1._data.items[i].lowestCarry) {
                        var confirm_3 = new commonConfirm.ConfirmPanel("\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BF7\u524D\u5F80" + obj[this_1._data.items[i].type] + "\u8FDB\u884C\u6E38\u620F!", null, null, function () {
                            wxgame.Global.instance.aldSendEvent("金币场", "\u70B9\u51FB" + _this._data.type + "_" + _this._data.items[i].type + "\u573A");
                            match.OnEnterMatchRoomCmd_C(_this._data.items[i].gameId, _this._data.items[i].sceneId);
                        }, function () { }, this_1);
                        uniLib.PopUpMgr.addPopUp(confirm_3, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                        return { value: void 0 };
                    }
                };
                var this_1 = this;
                for (var i = this._data.items.length - 1; i >= 0; i--) {
                    var state_1 = _loop_1(i);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                /**服务器请求进入 破产补助 客户端没有破产补助的状态 */
                match.OnEnterMatchRoomCmd_C(data.gameId, data.sceneId);
            }
        };
        WxGoldSelectType.prototype.onUserInfo = function (evt) {
            if (evt.param == uniLib.UserInfoEnum.GOLDCHIPS) {
                this.checkEnterRoom();
            }
        };
        WxGoldSelectType.prototype.checkEnterRoom = function () {
            var check = false;
            for (var i = this._data.items.length - 1; i >= 0; i--) {
                var child = this.select_lst.getChildByName(this._data.items[i].type.toString());
                if (child) {
                    if (!check && uniLib.UserInfo.goldChips >= this._data.items[i].lowestCarry) {
                        child.touch_btn.skin["type_ac"].visible = true;
                        check = true;
                    }
                    else {
                        child.touch_btn.skin["type_ac"].visible = false;
                    }
                }
            }
            /**没有找到则提示进入初级场 */
            if (!check) {
                var child = this.select_lst.getChildByName(this._data.items[0].type.toString());
                child && (child.touch_btn.skin["type_ac"].visible = true);
            }
        };
        WxGoldSelectType.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxGoldSelectType.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                var items = this._data.items;
                for (var i = items.length - 1; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= items[i].lowestCarry) {
                        wxgame.Global.instance.aldSendEvent("金币场", "\u70B9\u51FB\u5FEB\u901F\u5F00\u59CB" + this._data.type + "_" + items[i].type + "\u573A");
                        match.OnEnterMatchRoomCmd_C(items[i].gameId, items[i].sceneId);
                        return;
                    }
                }
                var confirm_4 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                    LobbyModuleMgr.getInstance().showMarketPanel(1);
                }, function () { }, this);
                uniLib.PopUpMgr.addPopUp(confirm_4, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
                uniLib.Global.dispatchEvent(match.EVENT_CLOSE_PANEL);
            }
        };
        WxGoldSelectType.prototype.destroy = function () {
            egret.Tween.removeTweens(this.type_scr);
            egret.Tween.removeTweens(this.begin_btn);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this._data = null;
        };
        return WxGoldSelectType;
    }(eui.Component));
    match.WxGoldSelectType = WxGoldSelectType;
    __reflect(WxGoldSelectType.prototype, "match.WxGoldSelectType");
})(match || (match = {}));
var match;
(function (match) {
    var WxGoldSelectTypeItem = (function (_super) {
        __extends(WxGoldSelectTypeItem, _super);
        function WxGoldSelectTypeItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGoldSelectTypeItemSkin";
            return _this;
        }
        WxGoldSelectTypeItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        WxGoldSelectTypeItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.name = info.type.toString();
            this.touch_btn["bg_img"].source = "lb_jinbi_grade" + info.type + "_png";
            if (info.type == 1) {
                this.touch_btn["desc_lbl"].text = info.gameNbr + "\u5C40\u9001" + info.money + "\u5143";
            }
            else {
                this.touch_btn["desc_lbl"].text = "\u8D62" + info.gameNbr + "\u5C40\u9001" + info.money + "\u5143";
            }
            this.touch_btn["num_lbl"].text = info.curUserNbr.toString();
            this.touch_btn["lowestCarry_lbl"].text = info.lowestCarry + " 准入";
            if (info.bottomPoint < 10000) {
                this.touch_btn["point_lbl"].text = info.bottomPoint.toString();
            }
            else {
                this.touch_btn["point_lbl"].text = info.bottomPoint / 10000 + "万";
            }
        };
        return WxGoldSelectTypeItem;
    }(eui.ItemRenderer));
    match.WxGoldSelectTypeItem = WxGoldSelectTypeItem;
    __reflect(WxGoldSelectTypeItem.prototype, "match.WxGoldSelectTypeItem");
})(match || (match = {}));
/**
 * 消息接收
 */
var Cmd;
(function (Cmd) {
    /**
     * 比赛排行榜
     */
    function OnRequestRankInfoHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_RANKINFO, rev);
        }
    }
    Cmd.OnRequestRankInfoHpMatchCmd_S = OnRequestRankInfoHpMatchCmd_S;
    /**
     * 比赛列表
     */
    function OnRequestRankListHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            if (uniLib.PopUpMgr.hasPopup(match.WxGameList)) {
                uniLib.Global.dispatchEvent(match.EVENT_GAMELIST, rev);
            }
            else {
                uniLib.PopUpMgr.addPopUp(match.WxGameList, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, rev);
            }
        }
    }
    Cmd.OnRequestRankListHpMatchCmd_S = OnRequestRankListHpMatchCmd_S;
    /**
     * 大厅主界面刷新
     */
    function OnFlushUserHpMatchInfoHpMatchCmd_Brd(rev) {
        uniLib.Global.dispatchEvent(match.EVENT_FLUSH, rev);
    }
    Cmd.OnFlushUserHpMatchInfoHpMatchCmd_Brd = OnFlushUserHpMatchInfoHpMatchCmd_Brd;
    /**
     * 参加比赛回复
     */
    function OnRequestJoinHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.PopUpMgr.removePopUp(match.WxGameDetail);
            egret.log("报名成功");
        }
        else {
            egret.error("报名失败");
        }
    }
    Cmd.OnRequestJoinHpMatchCmd_S = OnRequestJoinHpMatchCmd_S;
    /**
     * 参加比赛广播
     */
    function OnWaitListHpMatchCmd_Brd(rev) {
        uniLib.PopUpMgr.removePopUp(match.WxGameDetail);
        var config = table.getMatchConfigBySceneId(rev.sceneId);
        if (match.matchWaitPanel) {
            match.matchWaitPanel.update(rev);
        }
        else {
            if (config.HaoPaiMatchType == match.GameType.TYPE_OUT || config.HaoPaiMatchType == match.GameType.TYPE_DIAMOND) {
                match.matchWaitPanel = new match.WxEliminateWait(rev);
            }
            else {
                match.matchWaitPanel = new match.WxMatchWait(rev);
            }
            egret.MainContext.instance.stage.addChild(match.matchWaitPanel);
        }
    }
    Cmd.OnWaitListHpMatchCmd_Brd = OnWaitListHpMatchCmd_Brd;
    /**
     * 取消匹配等待
     */
    function OnRequestExitHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            if (match.matchWaitPanel) {
                match.matchWaitPanel.destroy();
                match.matchWaitPanel = null;
            }
        }
    }
    Cmd.OnRequestExitHpMatchCmd_S = OnRequestExitHpMatchCmd_S;
    /**
     * 获奖记录
     */
    function OnRequestRewardRecordHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_REWARDRECORD, rev);
        }
    }
    Cmd.OnRequestRewardRecordHpMatchCmd_S = OnRequestRewardRecordHpMatchCmd_S;
    /**
     * 战绩
     */
    function OnRequestHistoryHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_HISTORY, rev);
        }
    }
    Cmd.OnRequestHistoryHpMatchCmd_S = OnRequestHistoryHpMatchCmd_S;
    /**
     * 当前红包奖励
     */
    function OnGetRedPackRewardInfoLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_PACKAGEREWARD, rev);
        }
    }
    Cmd.OnGetRedPackRewardInfoLobbyCmd_S = OnGetRedPackRewardInfoLobbyCmd_S;
    function OnRequestUnLockHpMatchCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.PopUpMgr.removePopUp(match.WxUnlockGame);
            uniLib.TipsUtils.showTipsDownToUp("解锁成功");
        }
    }
    Cmd.OnRequestUnLockHpMatchCmd_S = OnRequestUnLockHpMatchCmd_S;
    function OnGetTimerMatchUserHpMatchCmd_S(rev) {
        if (!rev.resultCode)
            uniLib.Global.dispatchEvent(match.EVENT_REPORT_NUM, rev.nbr);
    }
    Cmd.OnGetTimerMatchUserHpMatchCmd_S = OnGetTimerMatchUserHpMatchCmd_S;
    /**
     * 金币场选场数据
     */
    function OnGetGoldCoinSceneInfoHpMatchCmd_S(rev) {
        uniLib.PopUpMgr.addPopUp(match.WxGoldSelectScene, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, rev);
    }
    Cmd.OnGetGoldCoinSceneInfoHpMatchCmd_S = OnGetGoldCoinSceneInfoHpMatchCmd_S;
    function OnEnterMatchRoomCmd_S(rev) {
        if (rev.resultCode == 6) {
            var confirm_5 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                LobbyModuleMgr.getInstance().showMarketPanel(1);
            }, function () { }, this);
            uniLib.PopUpMgr.addPopUp(confirm_5, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
    }
    Cmd.OnEnterMatchRoomCmd_S = OnEnterMatchRoomCmd_S;
})(Cmd || (Cmd = {}));
/**
 * 消息发送
 */
var match;
(function (match) {
    /**
     * 请求排行榜
     */
    function OnRequestRankInfoHpMatchCmd_C(curPage, gameId) {
        if (gameId === void 0) { gameId = 4231; }
        var req = new Cmd.RequestRankInfoHpMatchCmd_C();
        req.curPage = curPage;
        req.gameId = gameId;
        NetMgr.tcpSend(req);
    }
    match.OnRequestRankInfoHpMatchCmd_C = OnRequestRankInfoHpMatchCmd_C;
    /**
   * 请求比赛列表
   */
    function OnRequestRankListHpMatchCmd_C(gameId) {
        if (gameId === void 0) { gameId = 4231; }
        var req = new Cmd.RequestRankListHpMatchCmd_C();
        req.gameId = gameId;
        NetMgr.tcpSend(req);
    }
    match.OnRequestRankListHpMatchCmd_C = OnRequestRankListHpMatchCmd_C;
    /**
     * 报名 参加比赛
     */
    function OnRequestJoinHpMatchCmd_C(sceneId, gameId) {
        if (gameId === void 0) { gameId = 4231; }
        var req = new Cmd.RequestJoinHpMatchCmd_C();
        req.gameId = gameId;
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }
    match.OnRequestJoinHpMatchCmd_C = OnRequestJoinHpMatchCmd_C;
    function OnRequestExitHpMatchCmd_C(type) {
        var req = new Cmd.RequestExitHpMatchCmd_C();
        req.opType = type;
        NetMgr.tcpSend(req);
    }
    match.OnRequestExitHpMatchCmd_C = OnRequestExitHpMatchCmd_C;
    /**
     * 请求获奖记录
     */
    function OnRequestRewardRecordHpMatchCmd_C(curPage, sceneId) {
        var req = new Cmd.RequestRewardRecordHpMatchCmd_C();
        req.curPage = curPage;
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }
    match.OnRequestRewardRecordHpMatchCmd_C = OnRequestRewardRecordHpMatchCmd_C;
    /**
     * 战绩记录
     */
    function OnRequestHistoryHpMatchCmd_C(curPage, type, gameId) {
        if (type === void 0) { type = 0; }
        if (gameId === void 0) { gameId = 4231; }
        var req = new Cmd.RequestHistoryHpMatchCmd_C();
        req.gameId = gameId;
        req.typ = 0;
        req.curPage = curPage;
        NetMgr.tcpSend(req);
    }
    match.OnRequestHistoryHpMatchCmd_C = OnRequestHistoryHpMatchCmd_C;
    /**
     * 打开红包界面
     */
    function OnGetRedPackRewardInfoLobbyCmd_C(lobbyId) {
        if (lobbyId === void 0) { lobbyId = 41; }
        var req = new Cmd.GetRedPackRewardInfoLobbyCmd_C();
        req.lobbyId = lobbyId;
        NetMgr.tcpSend(req);
    }
    match.OnGetRedPackRewardInfoLobbyCmd_C = OnGetRedPackRewardInfoLobbyCmd_C;
    /**
     * 钻石解锁
     */
    function OnRequestUnLockHpMatchCmd_C(sceneId) {
        var req = new Cmd.RequestUnLockHpMatchCmd_C();
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }
    match.OnRequestUnLockHpMatchCmd_C = OnRequestUnLockHpMatchCmd_C;
    /**
     * 获取限时赛报名人数
     */
    function OnGetTimerMatchUserHpMatchCmd_C(sceneId) {
        var req = new Cmd.GetTimerMatchUserHpMatchCmd_C();
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }
    match.OnGetTimerMatchUserHpMatchCmd_C = OnGetTimerMatchUserHpMatchCmd_C;
    /**
     * 进入匹配场
     */
    function OnEnterMatchRoomCmd_C(gameId, scene) {
        var req = new Cmd.EnterMatchRoomCmd_C();
        req.lobbyId = MJLobbyData.getInstance().lobbyId;
        req.gameId = gameId;
        req.scene = scene;
        req.gambleType = 1;
        NetMgr.tcpSend(req);
    }
    match.OnEnterMatchRoomCmd_C = OnEnterMatchRoomCmd_C;
    /**
     * 获取金币场选场数据
     */
    function OnGetGoldCoinSceneInfoHpMatchCmd_C() {
        var req = new Cmd.GetGoldCoinSceneInfoHpMatchCmd_C();
        NetMgr.tcpSend(req);
    }
    match.OnGetGoldCoinSceneInfoHpMatchCmd_C = OnGetGoldCoinSceneInfoHpMatchCmd_C;
})(match || (match = {}));
var table;
(function (table) {
    /**
     * 通过sceneId获取配置
     */
    function getMatchConfigBySceneId(matchId) {
        var config = RES.getRes("TableMatchReward_json");
        if (config) {
            for (var i = 0; i < config.length; i++) {
                if (config[i].HaoPaiSceneId == matchId) {
                    return config[i];
                }
            }
        }
        else {
            egret.error("TableMatchReward.json获取失败");
        }
    }
    table.getMatchConfigBySceneId = getMatchConfigBySceneId;
})(table || (table = {}));
var match;
(function (match) {
    /**淘汰赛匹配等待界面 */
    var WxEliminateWait = (function (_super) {
        __extends(WxEliminateWait, _super);
        function WxEliminateWait(data) {
            var _this = _super.call(this) || this;
            _this._indexArr = [];
            /**当前人数 */
            _this._curNum = 0;
            _this._data = data;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this.skinName = "WxEliminateWaitSkin";
            return _this;
        }
        WxEliminateWait.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);
            var config = table.getMatchConfigBySceneId(this._data.sceneId);
            this.num_lbl.text = config.MatchPlayerNumber.toString();
            this.title_lbl.text = "\u6EE1" + config.MatchPlayerNumber + "\u4EBA\u5F00\u8D5B";
            for (var i = 0; i < config.riseRank.length; i++) {
                this["num" + i] && (this["num" + i].text = config.riseRank[i]);
            }
            this.timer_lbl.text = "\u6B63\u5728\u9632\u4F5C\u5F0A\u5339\u914D\u4E2D..." + this._data.timestamp;
            this._timer = new egret.Timer(1000, this._data.timestamp);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();
            this._mask = new egret.Shape();
            this.eliminate_grp.addChild(this._mask);
            this.update(this._data);
        };
        WxEliminateWait.prototype.onTimer = function (evt) {
            this.timer_lbl.text = "\u6B63\u5728\u9632\u4F5C\u5F0A\u5339\u914D\u4E2D..." + (this._timer.repeatCount - this._timer.currentCount);
            if (this._timer.currentCount == this._timer.repeatCount) {
                this._timer.stop();
            }
        };
        /**更新 */
        WxEliminateWait.prototype.update = function (data) {
            this._data = data;
            this.num_blbl.text = data.curUserNbr.toString();
            var config = table.getMatchConfigBySceneId(data.sceneId);
            if (data.curUserNbr >= config.MatchPlayerNumber) {
                this._indexArr.forEach(function (value) { egret.clearTimeout(value); });
                this._indexArr = [];
                this._mask.graphics.clear();
                this._mask.visible = false;
                this.pro_img.mask = null;
            }
            else {
                var endAngle = (data.curUserNbr / config.MatchPlayerNumber) * Math.PI * 2 - Math.PI / 2;
                for (var i = this._curNum; i < data.curUserNbr; i++) {
                    endAngle = (i / config.MatchPlayerNumber) * Math.PI * 2 - Math.PI / 2;
                    this._indexArr.push(egret.setTimeout(this.drawMask, this, 40 * i, [endAngle]));
                }
            }
            this._curNum = data.curUserNbr;
        };
        WxEliminateWait.prototype.drawMask = function (endAngle) {
            var config = table.getMatchConfigBySceneId(this._data.sceneId);
            var r = this.pro_img.width / 2;
            var gc = this._mask.graphics;
            gc.clear();
            gc.beginFill(0xff0000);
            gc.moveTo(this.eliminate_grp.width / 2, this.pro_img.y + r);
            gc.lineTo(this.eliminate_grp.width / 2, this.pro_img.y);
            gc.drawArc(this.eliminate_grp.width / 2, this.pro_img.y + r, r, -Math.PI / 2, endAngle, false);
            gc.lineTo(this.eliminate_grp.width / 2, this.pro_img.y + r);
            gc.endFill();
            this.pro_img.mask = this._mask;
        };
        WxEliminateWait.prototype.onExitHandler = function (evt) {
            var confirm = new match.WxMsgBox("返回大厅将会取消报名，是否要返回？", match.OnRequestExitHpMatchCmd_C, function () { });
            uniLib.PopUpMgr.addPopUp(confirm, egret.MainContext.instance.stage, true, true, 0, uniLib.PopUpEffect.CENTER);
        };
        WxEliminateWait.prototype.onEventHandler = function (evt) {
            if (evt.type == uniLib.ZqEvent.ON_RECONNEC) {
                match.OnRequestExitHpMatchCmd_C(1);
            }
            else if (evt.type == uniLib.ZqEvent.WX_ONSHOW) {
                match.OnRequestExitHpMatchCmd_C(2);
            }
        };
        WxEliminateWait.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxEliminateWait.prototype.destroy = function () {
            this._indexArr.forEach(function (value) { egret.clearTimeout(value); });
            this._indexArr = [];
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer = null;
            }
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            this._data = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onExitHandler, this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return WxEliminateWait;
    }(eui.Component));
    match.WxEliminateWait = WxEliminateWait;
    __reflect(WxEliminateWait.prototype, "match.WxEliminateWait");
})(match || (match = {}));
var match;
(function (match) {
    /**
     * 比赛详情
     */
    var WxGameDetail = (function (_super) {
        __extends(WxGameDetail, _super);
        function WxGameDetail(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this.skinName = "WxGameDetailSkin";
            return _this;
        }
        WxGameDetail.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.addEventListener(match.EVENT_REPORT_NUM, this.onUpdateNum, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (this._data) {
                var config = table.getMatchConfigBySceneId(this._data.sceneId);
                this.rule_pal.setType(config.HaoPaiMatchType);
                /**钻石赛和人满开赛没有获奖记录 */
                if (config.HaoPaiMatchType == match.GameType.TYPE_CARD) {
                    this.record_btn.visible = false;
                    this.signUp_btn.horizontalCenter = 0;
                    this.share_btn.horizontalCenter = 0;
                }
                this.signUp_btn.visible = true;
                this.share_btn.visible = false;
                for (var i = 0; i < this._data.rewards.length; i++) {
                    var reward = this._data.rewards[i].rewards;
                    for (var k = 0; k < reward.length; k++) {
                        var goodConfig = ConfigMgr.getInstance().getGoodCfgById(reward[k].goodId);
                        this["reward" + i + k + "_lbl"].text = reward[k].goodNbr + goodConfig.goodName;
                    }
                }
                if (config) {
                    this.title_lbl.text = config.HaoPaiMatchName;
                    var goodConfig = ConfigMgr.getInstance().getGoodCfgById(config.HaoPaiMatchCost[0].goodId);
                    if (goodConfig) {
                        this.signUpCost_lbl.text = config.HaoPaiMatchCost[0].goodNbr + goodConfig.goodName;
                    }
                    else {
                        this.signUpCost_lbl.text = "免费";
                    }
                    if (config.MatchPlayerNumber == 6) {
                        this.beginCondition_lbl.text = "满6人开赛";
                    }
                    else {
                        this.beginCondition_lbl.text = "限时赛";
                    }
                    var begin = match.add0(Math.floor(this._data.beginTime / 3600)) + ":" + match.add0(Math.floor(this._data.beginTime % 3600 / 60));
                    var endTime = this._data.beginTime;
                    var end = match.add0(Math.floor(endTime / 3600)) + ":" + match.add0(Math.floor(endTime % 3600 / 60));
                    this.signUpCondition_lbl.text = begin + "--" + end;
                }
                if (this._data.sceneId == 2001 && ([3, 4].indexOf(uniLib.UserInfo.progress) > -1)) {
                    if (this.stage == null)
                        this.once(egret.Event.ADDED_TO_STAGE, this.addStageHandle, this);
                    else
                        this.addStageHandle();
                }
            }
        };
        WxGameDetail.prototype.addStageHandle = function () {
            var _this = this;
            setTimeout(function () {
                if (!(_this.signUp_btn && _this.signUp_btn.stage))
                    return;
                //新手引导
                if (uniLib.UserInfo.progress == 3) {
                    guide.GuideUtils.addGuide(3, _this.localToGlobal(_this.signUp_btn.x, _this.signUp_btn.y), _this.parent);
                }
                else if (uniLib.UserInfo.progress == 4) {
                    var config = table.getMatchConfigBySceneId(2001);
                    var goodConfig = ConfigMgr.getInstance().getGoodCfgById(config.HaoPaiMatchCost[0].goodId);
                    if (goodConfig) {
                        if (config.HaoPaiMatchCost[0].goodNbr > uniLib.UserInfo.chips) {
                            guide.GuideUtils.addGuide(4, _this.localToGlobal(_this.signUp_btn.x, _this.signUp_btn.y), _this.parent);
                        }
                    }
                }
            }, 420);
        };
        WxGameDetail.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.share_btn) {
                // let req = new Cmd.UploadShareInfoLittleGameLobbyCmd_CS();
                // req.shareType = Cmd.ShareType.match;
                // req.opType = 1;
                // req.extData = JSON.stringify({ "sceneId": this._data.sceneId });
                // NetMgr.tcpSend(req);
                if (uniLib.Global.is_sandbox == 1) {
                    var req = new Cmd.UploadShareInfoLittleGameLobbyCmd_CS();
                    req.shareType = Cmd.ShareType.match;
                    req.opType = 1;
                    req.extData = JSON.stringify({ "sceneId": this._data.sceneId });
                    NetMgr.tcpSend(req);
                }
                else {
                    if (uniLib.Global.isWxGame()) {
                        var vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.match;
                        vo.wgKvData = "{\"sceneId\": " + this._data.sceneId + "}";
                        uniLib.ZQGameSdk.share(vo);
                    }
                    else {
                        share.shareNativeMessage(Cmd.ShareType.match, 0, Cmd.ShareType.match.toString(), JSON.stringify("{\"sceneId\": " + this._data.sceneId + "}"));
                    }
                }
            }
            else if (evt.target == this.record_btn) {
                match.OnRequestRewardRecordHpMatchCmd_C(1, this._data.sceneId);
                uniLib.PopUpMgr.addPopUp(match.WxGameRecord, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._data.sceneId);
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.rule_btn) {
                this.rule_pal.visible = !this.rule_pal.visible;
            }
            else if (evt.target == this.signUp_btn) {
                var config = table.getMatchConfigBySceneId(this._data.sceneId);
                var goodConfig = ConfigMgr.getInstance().getGoodCfgById(config.HaoPaiMatchCost[0].goodId);
                if (goodConfig) {
                    if (config.HaoPaiMatchCost[0].goodNbr > uniLib.UserInfo.chips) {
                        if (uniLib.Global.is_sandbox == 1) {
                            uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                        }
                        else {
                            uniLib.PopUpMgr.removePopUp(this);
                            LobbyModuleMgr.getInstance().showDiamondsPanel();
                        }
                    }
                    else {
                        match.OnRequestJoinHpMatchCmd_C(this._data.sceneId);
                    }
                }
                else {
                    match.OnRequestJoinHpMatchCmd_C(this._data.sceneId);
                }
            }
        };
        WxGameDetail.prototype.onUpdateNum = function (evt) {
            this.beginCondition_lbl.text = evt.param;
        };
        WxGameDetail.prototype.destroy = function () {
            if (this._data.sceneId == 2001 && ([3, 4].indexOf(uniLib.UserInfo.progress) > -1))
                guide.GuideUtils.remove();
            uniLib.Global.removeEventListener(match.EVENT_REPORT_NUM, this.onUpdateNum, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._data = null;
        };
        return WxGameDetail;
    }(eui.Component));
    match.WxGameDetail = WxGameDetail;
    __reflect(WxGameDetail.prototype, "match.WxGameDetail");
})(match || (match = {}));
var match;
(function (match) {
    /**
     * 添0操作
     */
    function add0(num) {
        return num < 10 ? "0" + num : num;
    }
    match.add0 = add0;
    /**
     * 格式化时间戳
     * @time 时间戳
     * @split 分隔符
     * @returns 1990-08-08 09:20
     */
    function formatTime(time, split) {
        var str = "";
        var date = new Date(time);
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        var h = date.getHours();
        var mm = date.getMinutes();
        return y + split + add0(m) + split + add0(d) + " " + add0(h) + ':' + add0(mm);
    }
    match.formatTime = formatTime;
    /**
     * 把秒转换成天小时分钟和秒
     */
    function formatTime2(time) {
        var str = "";
        var ah = Math.floor(time / 60 / 60);
        var d = Math.floor(ah / 24);
        var h = ah % 24;
        // let mm = Math.floor(time / 60 / 60 / 24 / 60);
        // let s = time % 60;
        return add0(d) + "天" + add0(h) + '小时';
    }
    match.formatTime2 = formatTime2;
    /**
     * 把今天的秒数转换成对应的时间
     */
    function formatTime3(time) {
        var h = Math.floor(time / 3600);
        var m = Math.floor(time / 3600 / 60);
        var s = time % 60;
        return add0(h) + "点" + (m > 0 ? add0(m) + "分" : "") + (s > 0 ? add0(s) + "秒" : "");
    }
    match.formatTime3 = formatTime3;
})(match || (match = {}));
var match;
(function (match) {
    var WxGameListItem = (function (_super) {
        __extends(WxGameListItem, _super);
        function WxGameListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGameListItemSkin";
            return _this;
        }
        WxGameListItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        WxGameListItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var skin = this.tick_btn.skin;
            var config = table.getMatchConfigBySceneId(info.sceneId);
            if (config) {
                if (config.HaoPaiMatchType == match.GameType.TYPE_OUT) {
                    skin["desc_lbl"].textFlow = [{ text: "前" }, { text: config.mainrewardRank, style: { textColor: 0xFA4F42 } }, { text: "名可获得红包奖励" }];
                    skin["desc_lbl"].visible = true;
                }
                else if (config.HaoPaiMatchType == match.GameType.TYPE_DIAMOND) {
                    skin["desc_lbl"].textFlow = [{ text: "前" }, { text: config.mainrewardRank, style: { textColor: 0xFA4F42 } }, { text: "名可获得钻石奖励" }];
                    skin["desc_lbl"].visible = true;
                }
                else {
                    skin["desc_lbl"].visible = false;
                }
                /**是否解锁 */
                if (info.unLocked == 0) {
                    skin["black_img"].visible = true;
                    skin["lock_img"].visible = true;
                    skin["lockDesc_lbl"].visible = true;
                    skin["lockDesc_lbl"].text = "\u9080\u8BF7" + config.unlockNumber + "\u4E2A\u597D\u53CB\u89E3\u9501";
                }
                else {
                    skin["black_img"].visible = false;
                    skin["lock_img"].visible = false;
                    skin["lockDesc_lbl"].visible = false;
                }
                if (config.HaoPaiMatchType == match.GameType.TYPE_CARD || config.HaoPaiMatchType == match.GameType.TYPE_DIAMOND) {
                    skin["icon_img"].source = "lb_bisai_type" + match.GameType.TYPE_CARD + "_png";
                }
                else {
                    skin["icon_img"].source = "lb_bisai_type" + config.HaoPaiMatchType + "_png";
                }
                /**报名消耗 */
                if (config.HaoPaiMatchCost[0].goodNbr) {
                    skin["mf_img"].visible = false;
                    skin["diamond_blbl"].text = config.HaoPaiMatchCost[0].goodNbr;
                    if (config.HaoPaiMatchType == match.GameType.TYPE_OUT) {
                        skin["diamond_img"].source = "bs_diamond_png";
                    }
                    else if (config.HaoPaiMatchType == match.GameType.TYPE_DIAMOND) {
                        skin["diamond_img"].source = "bs_jibi_png";
                    }
                }
                else {
                    skin["diamond_img"].visible = false;
                    skin["diamond_blbl"].text = "";
                    skin["mf_img"].visible = true;
                }
                /**比赛奖励 */
                if (config.matchName) {
                    skin["money_lbl"].text = config.matchName.toString();
                    if (config.matchName < 10) {
                        skin["money_lbl"].size = 80;
                    }
                    else if (config.matchName < 100) {
                        skin["money_lbl"].size = 60;
                    }
                    else {
                        skin["money_lbl"].size = 46;
                    }
                }
                else {
                    skin["money_lbl"].text = "";
                }
            }
        };
        return WxGameListItem;
    }(eui.ItemRenderer));
    match.WxGameListItem = WxGameListItem;
    __reflect(WxGameListItem.prototype, "match.WxGameListItem");
})(match || (match = {}));
var match;
(function (match) {
    var WxGameRecord = (function (_super) {
        __extends(WxGameRecord, _super);
        function WxGameRecord(sceneId) {
            var _this = _super.call(this) || this;
            _this._sub1Index = 0;
            _this._sceneId = sceneId;
            _this.skinName = "WxGameRecordSkin";
            return _this;
        }
        WxGameRecord.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.record_lst.itemRenderer = match.WxGameRecordItem;
            this._recordColl = new eui.ArrayCollection([]);
            this.record_lst.dataProvider = this._recordColl;
            uniLib.Global.addEventListener(match.EVENT_REWARDRECORD, this.onDataHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
        };
        WxGameRecord.prototype.onDataHandler = function (evt) {
            var param = evt.param;
            if (!Array.isArray(param.records))
                param.records = [];
            var lst = [];
            if (this._data) {
                lst = this._data.records;
            }
            this._data = param;
            this._data.records = lst.concat(this._data.records);
            this.nextPage();
        };
        WxGameRecord.prototype.nextPage = function () {
            var record = this._data.records;
            if (record.length > (this._sub1Index + 1) * 5) {
                this._recordColl.replaceAll(record.slice(this._sub1Index * 5, this._sub1Index * 5 + 5));
                this._recordColl.refresh();
                this._sub1Index++;
            }
            else {
                if (this._data.isLastPage) {
                    if (record.length > this._sub1Index * 5) {
                        this._recordColl.replaceAll(record.slice(this._sub1Index * 5));
                        this._recordColl.refresh();
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("已到尾页");
                    }
                }
                else {
                    match.OnRequestRewardRecordHpMatchCmd_C(this._data.curPage + 1, this._sceneId);
                }
            }
        };
        WxGameRecord.prototype.prePage = function () {
            if (this._sub1Index >= 1) {
                this._sub1Index--;
                this._recordColl.replaceAll(this._data.records.slice(this._sub1Index * 5, this._sub1Index * 5 + 5));
                this._recordColl.refresh();
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("已到首页");
            }
        };
        WxGameRecord.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.nextPage_btn) {
                this.nextPage();
            }
            else if (evt.target == this.prePage_btn) {
                this.prePage();
            }
        };
        WxGameRecord.prototype.destroy = function () {
            uniLib.Global.removeEventListener(match.EVENT_REWARDRECORD, this.onDataHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
            this._data = null;
            this._recordColl = null;
            this._sceneId = null;
            this._sub1Index = null;
        };
        return WxGameRecord;
    }(eui.Component));
    match.WxGameRecord = WxGameRecord;
    __reflect(WxGameRecord.prototype, "match.WxGameRecord");
})(match || (match = {}));
var match;
(function (match) {
    var WxGameRecordItem = (function (_super) {
        __extends(WxGameRecordItem, _super);
        function WxGameRecordItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGameRecordItemSkin";
            return _this;
        }
        WxGameRecordItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.one_lbl.text = info.rankList[0];
            this.two_lbl.text = info.rankList[1];
            this.third_lbl.text = info.rankList[2];
            if (info.myRank == -1)
                this.rank_lbl.text = "未参加";
            else if (info.myRank == 0)
                this.rank_lbl.text = "未上榜";
            else
                this.rank_lbl.text = info.myRank.toString();
            var time = match.formatTime(info.beginTime * 1000, "/").split(" ");
            this.min_lbl.text = time[0];
            this.sec_lbl.text = time[1];
        };
        return WxGameRecordItem;
    }(eui.ItemRenderer));
    match.WxGameRecordItem = WxGameRecordItem;
    __reflect(WxGameRecordItem.prototype, "match.WxGameRecordItem");
})(match || (match = {}));
var match;
(function (match) {
    /**
     * 奖品一览
     */
    var WxGameReward = (function (_super) {
        __extends(WxGameReward, _super);
        function WxGameReward() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGameRewardSkin";
            return _this;
        }
        WxGameReward.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        };
        WxGameReward.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.share_btn) {
                if (uniLib.Global.isWxGame()) {
                    var vo = new uniLib.WXShareVo();
                    vo.opType = Cmd.ShareOpType.share;
                    uniLib.ZQGameSdk.share(vo);
                }
                else {
                    //这个功能暂时已经没有了
                    // share.shareNativeMessage()
                }
            }
        };
        WxGameReward.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        };
        return WxGameReward;
    }(eui.Component));
    match.WxGameReward = WxGameReward;
    __reflect(WxGameReward.prototype, "match.WxGameReward");
})(match || (match = {}));
var match;
(function (match) {
    var WxGameRule = (function (_super) {
        __extends(WxGameRule, _super);
        function WxGameRule() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGameRuleSkin";
            return _this;
        }
        WxGameRule.prototype.setType = function (type) {
            this.rule_lbl.text = "每人打三局，三局之后根据得分进行排名。每局赢家积2分，剩余牌数较少者积1分，剩余牌数最多者积0分。剩余牌数相同，比较玩家的出牌时间";
        };
        return WxGameRule;
    }(eui.Component));
    match.WxGameRule = WxGameRule;
    __reflect(WxGameRule.prototype, "match.WxGameRule");
})(match || (match = {}));
var match;
(function (match) {
    /**匹配等待界面 */
    var WxMatchWait = (function (_super) {
        __extends(WxMatchWait, _super);
        function WxMatchWait(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this._matchType = table.getMatchConfigBySceneId(_this._data.sceneId).HaoPaiMatchType;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this.skinName = "WxMatchWaitSkin";
            return _this;
        }
        WxMatchWait.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);
            wxgame.Global.instance.createBannerAd("", { left: 0 });
            this.update(this._data);
        };
        /**更新 */
        WxMatchWait.prototype.update = function (data) {
            this._data = data;
            if (data) {
                var config = table.getMatchConfigBySceneId(data.sceneId);
                this.title_lbl.text = config.HaoPaiMatchName;
                for (var i = 0; i < this.num_grp.numChildren; i++) {
                    var btn = this.num_grp.getChildAt(i);
                    if (i < data.curUserNbr) {
                        /**自己 */
                        if (i == 0) {
                            btn.skin["head_img"].source = uniLib.UserInfo.headUrl;
                            btn.skin["mask_img"].source = "bs_pipei_kuang1_png";
                            btn.label = uniLib.UserInfo.nickName;
                            btn.skin["labelDisplay"].textColor = 0xffffff;
                        }
                        else {
                            btn.skin["head_img"].source = "bs_pipei_touxiang1_png";
                            btn.skin["mask_img"].source = "bs_pipei_kuang1_png";
                            btn.label = "玩家" + (i + 1);
                            btn.skin["labelDisplay"].textColor = 0xffffff;
                        }
                    }
                    else {
                        btn.skin["head_img"].source = "bs_pipei_touxiang_png";
                        btn.skin["mask_img"].source = "bs_pipei_kuang_png";
                        btn.label = "匹配中...";
                        btn.skin["labelDisplay"].textColor = 0xffcc00;
                    }
                }
                if (config.MatchPlayerNumber == 6) {
                    this.condition_lbl.text = "满6人开赛";
                }
                else {
                    this.condition_lbl.text = "限时赛";
                }
                if (!this._timer) {
                    this._timer = new egret.Timer(1000, 120);
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
                    this._timer.start();
                }
            }
        };
        WxMatchWait.prototype.onTimerHandler = function (evt) {
            this.time_lbl.text = this._timer.currentCount + 's';
            if (this._timer.currentCount == this._timer.repeatCount) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
        };
        WxMatchWait.prototype.onExitHandler = function (evt) {
            var confirm = new match.WxMsgBox("返回大厅将会取消报名，是否要返回？", match.OnRequestExitHpMatchCmd_C, function () { });
            uniLib.PopUpMgr.addPopUp(confirm, egret.MainContext.instance.stage, true, true, 0, uniLib.PopUpEffect.CENTER);
        };
        WxMatchWait.prototype.onEventHandler = function (evt) {
            if (evt.type == uniLib.ZqEvent.ON_RECONNEC) {
                match.OnRequestExitHpMatchCmd_C(1);
            }
            else if (evt.type == uniLib.ZqEvent.WX_ONSHOW) {
                match.OnRequestExitHpMatchCmd_C(2);
            }
        };
        WxMatchWait.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxMatchWait.prototype.destroy = function () {
            wxgame.Global.instance.destroyBannerAd();
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
            this._timer = null;
            this._data = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onExitHandler, this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return WxMatchWait;
    }(eui.Component));
    match.WxMatchWait = WxMatchWait;
    __reflect(WxMatchWait.prototype, "match.WxMatchWait");
})(match || (match = {}));
var match;
(function (match) {
    var WxMsgBox = (function (_super) {
        __extends(WxMsgBox, _super);
        function WxMsgBox(content, confirmCall, cancelCall, callObj, textAlign) {
            if (textAlign === void 0) { textAlign = "left"; }
            var _this = _super.call(this) || this;
            _this._content = content;
            _this._textAlign = textAlign;
            _this._confirmCall = confirmCall;
            _this._cancelCall = cancelCall;
            _this._callObj = callObj;
            _this.skinName = "WxMsgBoxSkin";
            return _this;
        }
        WxMsgBox.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.confirm_text.textAlign = this._textAlign;
            if (this._content.length && Object.prototype.toString.call(this._content).toLowerCase() == "[object array]") {
                this.confirm_text.textFlow = this._content;
            }
            else {
                this.confirm_text.text = this._content + '';
            }
            if (!this._cancelCall) {
                this.confirm_cancel_btn.visible = false;
                this.confirm_confirm_btn.horizontalCenter = 0;
            }
        };
        WxMsgBox.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.confirm_cancel_btn) {
                this._cancelCall && this._cancelCall.call(this._callObj);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.confirm_confirm_btn) {
                this._confirmCall && this._confirmCall.call(this._callObj);
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        WxMsgBox.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this._content = null;
            this._textAlign = null;
            this._confirmCall = null;
            this._cancelCall = null;
            this._callObj = null;
        };
        return WxMsgBox;
    }(eui.Component));
    match.WxMsgBox = WxMsgBox;
    __reflect(WxMsgBox.prototype, "match.WxMsgBox");
})(match || (match = {}));
var match;
(function (match) {
    var WxTopOpBtn = (function (_super) {
        __extends(WxTopOpBtn, _super);
        function WxTopOpBtn() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxTopOpBtnSkin";
            return _this;
        }
        WxTopOpBtn.prototype.gold2str = function (gold) {
            if (gold > 100000000) {
                return (gold / 100000000).toFixed(1) + "亿";
            }
            else if (gold > 10000000) {
                return (gold / 10000).toFixed(1) + "万";
            }
            else if (gold > 100000) {
                return (gold / 10000).toFixed(2) + "万";
            }
            else {
                return gold.toString();
            }
        };
        WxTopOpBtn.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.x = 248;
            this.diamond_btn.label = uniLib.UserInfo.chips.toString();
            this.ticket_btn.label = uniLib.UserInfo.giftCoupon.toString();
            this.gold_btn.label = this.gold2str(uniLib.UserInfo.goldChips);
            if (uniLib.Global.is_sandbox == 1) {
                this.diamond_btn.touchEnabled = false;
                this.gold_btn.touchEnabled = false;
                this.ticket_btn.visible = false;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
        };
        WxTopOpBtn.prototype.onUserInfoChanged = function (e) {
            if (this.diamond_btn) {
                this.diamond_btn.label = uniLib.UserInfo.chips.toString();
            }
            if (this.ticket_btn) {
                this.ticket_btn.label = uniLib.UserInfo.giftCoupon.toString();
            }
            if (this.gold_btn) {
                this.gold_btn.label = this.gold2str(uniLib.UserInfo.goldChips);
            }
        };
        WxTopOpBtn.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.diamond_btn) {
                LobbyModuleMgr.getInstance().showMarketPanel(0);
            }
            else if (evt.target == this.ticket_btn) {
                RES.loadGroup(match.MatchConst.HPW_MATCH).then(function () {
                    match.OnRequestRankListHpMatchCmd_C();
                    uniLib.PopUpMgr.addPopUp(match.WxGameList, null, true, false);
                }, function () {
                    var confirm = new commonConfirm.ConfirmPanel("资源加载失败，请检查网络后重试");
                    uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                });
            }
            else if (evt.target == this.gold_btn) {
                LobbyModuleMgr.getInstance().showMarketPanel(1);
            }
        };
        WxTopOpBtn.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
        };
        return WxTopOpBtn;
    }(eui.Component));
    match.WxTopOpBtn = WxTopOpBtn;
    __reflect(WxTopOpBtn.prototype, "match.WxTopOpBtn");
})(match || (match = {}));
var match;
(function (match) {
    var WxUnlockGame = (function (_super) {
        __extends(WxUnlockGame, _super);
        function WxUnlockGame(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this.skinName = "WxUnlockGameSkin";
            return _this;
        }
        WxUnlockGame.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.head_grp.removeChildren();
            var config = table.getMatchConfigBySceneId(this._data.sceneId);
            this.unlock_btn.label = 'x' + config.unlockdiamond;
            for (var i = 0; i < config.unlockNumber; i++) {
                var img = new eui.Image("bs_unlock_jia_png");
                img.width = img.height = 100;
                this.head_grp.addChild(img);
            }
            for (var i = 0; i < this._data.unLockList.length; i++) {
                var img = this.head_grp.getChildAt(i);
                img.source = this._data.unLockList[i];
            }
        };
        WxUnlockGame.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.share_btn) {
                if (uniLib.Global.isWxGame()) {
                    var vo = new uniLib.WXShareVo();
                    vo.shareType = Cmd.ShareType.unlock;
                    var obj = { sceneId: this._data.sceneId };
                    vo.wgShareData = JSON.stringify(obj);
                    uniLib.ZQGameSdk.share(vo);
                }
                else {
                    share.shareNativeMessage(Cmd.ShareType.unlock, 0, Cmd.ShareType.unlock + "_" + this._data.sceneId, JSON.stringify({ sceneId: this._data.sceneId }));
                }
            }
            else if (evt.target == this.unlock_btn) {
                var config = table.getMatchConfigBySceneId(this._data.sceneId);
                if (uniLib.UserInfo.chips >= config.unlockdiamond) {
                    match.OnRequestUnLockHpMatchCmd_C(this._data.sceneId);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                }
            }
        };
        WxUnlockGame.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this._data = null;
        };
        return WxUnlockGame;
    }(eui.Component));
    match.WxUnlockGame = WxUnlockGame;
    __reflect(WxUnlockGame.prototype, "match.WxUnlockGame");
})(match || (match = {}));
