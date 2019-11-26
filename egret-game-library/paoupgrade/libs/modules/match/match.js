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
    /**闯关 */
    var WxPigRushThrough = (function (_super) {
        __extends(WxPigRushThrough, _super);
        function WxPigRushThrough(info) {
            var _this = _super.call(this) || this;
            _this._gameId = info.gameId;
            if (info.data && info.data[0].items) {
                _this._pigData = info.data;
            }
            else {
                _this._rushData = info.data;
            }
            _this.width = uniLib.Global.screenWidth;
            _this.skinName = "WxPigRushThroughSkin";
            return _this;
        }
        WxPigRushThrough.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(match.EVENT_PIG_DATA, this.onPigData, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.silverPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.diamondRush_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldRush_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onRbtnChange, this);
            this.setData(this._rushData ? this._rushData : this._pigData);
            this._rushData ? this.cardRush_rbtn.selected = true : this.goldRush_rbtn.selected = true;
            this.rule_btn.visible = match.WxTopOpBtn.HAS_HPW_MATCH;
            if (uniLib.Global.isWxGame()) {
                this.rbtnBg_img.visible = false;
                this.cardRush_rbtn.visible = false;
                this.goldRush_rbtn.visible = false;
            }
        };
        WxPigRushThrough.prototype.setData = function (data) {
            if (data && data[0].items) {
                this._pigData = data;
                this.goldPig_btn.visible = true;
                this.silverPig_btn.visible = true;
                this.cardRush_btn.visible = false;
                this.goldRush_btn.visible = false;
                this.diamondRush_btn.visible = false;
            }
            else {
                this._rushData = data;
                for (var i = 0; i < data.length; i++) {
                    var info = data[i];
                    if (info.type == 1) {
                        this.cardRush_btn.label = info.round ? "\u5F53\u524D\u5173\u6570\uFF1A" + info.round : "\u62A5\u540D\uFF1A\u798F\u5361x" + info.signFee[0].goodNbr;
                    }
                    else if (info.type == 2) {
                        this.goldRush_btn.label = info.round ? "\u5F53\u524D\u5173\u6570\uFF1A" + info.round : "\u62A5\u540D\uFF1A\u91D1\u5E01x" + info.signFee[0].goodNbr;
                        ;
                    }
                    else if (info.type == 3) {
                        this.diamondRush_btn.label = info.round ? "\u5F53\u524D\u5173\u6570\uFF1A" + info.round : "\u62A5\u540D\uFF1A\u94BB\u77F3x" + info.signFee[0].goodNbr;
                        ;
                    }
                }
                this.goldPig_btn.visible = false;
                this.silverPig_btn.visible = false;
                this.cardRush_btn.visible = true;
                this.goldRush_btn.visible = true;
                this.diamondRush_btn.visible = true;
            }
        };
        /**数据 */
        WxPigRushThrough.prototype.onPigData = function (evt) {
            this.setData(evt.param);
        };
        WxPigRushThrough.prototype.onRbtnChange = function (evt) {
            var target = evt.target;
            var value = parseInt(target.selectedValue);
            if (value == 1) {
                if (!this._rushData) {
                    match.OnGetSceneInfoHpMatchCmd_C(match.BigSceneType.TYPE_RUSH, match.GameId.ID_COIN_FOUCA);
                }
                else {
                    this.setData(this._rushData);
                }
            }
            else if (value == 2) {
                if (!this._pigData) {
                    match.OnGetSceneInfoHpMatchCmd_C(match.BigSceneType.TYPE_PIG, match.GameId.ID_MATCH_PIG);
                }
                else {
                    this.setData(this._pigData);
                }
            }
        };
        WxPigRushThrough.prototype.onTouchHandler = function (evt) {
            var _this = this;
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.silverPig_btn || evt.target == this.goldPig_btn) {
                var type = parseInt(evt.target.name);
                for (var i = 0; i < this._pigData.length; i++) {
                    if (this._pigData[i].type == type) {
                        uniLib.PopUpMgr.addPopUp(match.WxPigSelectPass, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { info: this._pigData[i], gameId: match.GameId.ID_MATCH_PIG });
                        break;
                    }
                }
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(match.WxGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this.cardRush_rbtn.selected ? match.SceneType.TYPE_FUKA : match.SceneType.TYPE_PIG);
            }
            else if (evt.target == this.cardRush_btn || evt.target == this.goldRush_btn || evt.target == this.diamondRush_btn) {
                var type = parseInt(evt.target.name);
                var _loop_1 = function (i) {
                    if (this_1._rushData[i].type == type) {
                        // if (this._rushData[i].round) {
                        //     OnEnterRushHpMatchCmd_C(type, GameId.ID_COIN_FOUCA);
                        // }
                        // else {
                        LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_RUSH, function () {
                            uniLib.PopUpMgr.addPopUp(match.WxRushGameDetail, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { info: _this._rushData[i], gameId: _this._gameId });
                        });
                        return "break";
                    }
                };
                var this_1 = this;
                for (var i = 0; i < this._rushData.length; i++) {
                    var state_1 = _loop_1(i);
                    if (state_1 === "break")
                        break;
                }
            }
        };
        WxPigRushThrough.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxPigRushThrough.prototype.destroy = function () {
            this._pigData = null;
            this._rushData = null;
            this.top_skin.destroy();
            this.top_skin = null;
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(match.EVENT_PIG_DATA, this.onPigData, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.silverPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.diamondRush_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldRush_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onRbtnChange, this);
        };
        return WxPigRushThrough;
    }(eui.Component));
    match.WxPigRushThrough = WxPigRushThrough;
    __reflect(WxPigRushThrough.prototype, "match.WxPigRushThrough");
})(match || (match = {}));
var match;
(function (match) {
    match.sceneInfoMap = new Map();
    var MatchConst = (function () {
        function MatchConst() {
        }
        MatchConst.RES_JSON = "resource/match/wxmatch.res_4bf24de9.json";
        MatchConst.THM_JSON = "resource/match/gameEui_9c456983.json";
        /**
         * 主界面需要加载的资源
         */
        MatchConst.PUB_LOGIN = "bs_login";
        /**
         * 好牌网比赛资源组
         */
        MatchConst.HPW_MATCH = "wxmatch";
        /**
         * 金币资源组
         */
        MatchConst.HPW_GOLD = "bs_gold";
        /**
         * 金猪资源组
         */
        MatchConst.HPW_PIG = "bs_pig";
        /**
         * 捕鱼资源组
         */
        MatchConst.BUYU = "buyu";
        MatchConst.BUYU_REWARD = "buyu_reward";
        /**
         * 闯关报名界面
         */
        MatchConst.HPW_RUSH = "bs_rush";
        return MatchConst;
    }());
    match.MatchConst = MatchConst;
    __reflect(MatchConst.prototype, "match.MatchConst");
    /**
     * 游戏Id
     */
    var GameId;
    (function (GameId) {
        /**跑得快比赛和金猪*/
        GameId[GameId["ID_MATCH_PIG"] = 4231] = "ID_MATCH_PIG";
        /**跑得快金币场和福卡闯关 */
        GameId[GameId["ID_COIN_FOUCA"] = 4239] = "ID_COIN_FOUCA";
        /**跑得快房卡 */
        GameId[GameId["ID_CARD"] = 4207] = "ID_CARD";
        /**二人麻将 */
        GameId[GameId["ID_ERMJ"] = 4249] = "ID_ERMJ";
        /**捕鱼 */
        GameId[GameId["ID_BUYU"] = 150] = "ID_BUYU";
    })(GameId = match.GameId || (match.GameId = {}));
    /**
     * 大类型 以前没有定义 现在枚举一个
     *1:金币场 2:金银猪 3:闯关 4:比赛
     */
    var BigSceneType;
    (function (BigSceneType) {
        /**金币场*/
        BigSceneType[BigSceneType["TYPE_COIN"] = 1] = "TYPE_COIN";
        /**金银猪 */
        BigSceneType[BigSceneType["TYPE_PIG"] = 2] = "TYPE_PIG";
        /**闯关 */
        BigSceneType[BigSceneType["TYPE_RUSH"] = 3] = "TYPE_RUSH";
        /**比赛 */
        BigSceneType[BigSceneType["TYPE_MATCH"] = 4] = "TYPE_MATCH";
    })(BigSceneType = match.BigSceneType || (match.BigSceneType = {}));
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
        /**福卡 */
        GoodType[GoodType["TYPE_FUKA"] = 336] = "TYPE_FUKA";
        /**彩蛋 */
        GoodType[GoodType["TYPE_EGG"] = 340] = "TYPE_EGG";
    })(GoodType = match.GoodType || (match.GoodType = {}));
    var SceneType;
    (function (SceneType) {
        /**比赛场 */
        SceneType[SceneType["TYPE_MATCH"] = 0] = "TYPE_MATCH";
        /**经典场 必出*/
        SceneType[SceneType["TYPE_CALSSIC"] = 1] = "TYPE_CALSSIC";
        /**跑八张 */
        SceneType[SceneType["TYPE_EIGHT_CARD"] = 2] = "TYPE_EIGHT_CARD";
        /**疯狂场 */
        SceneType[SceneType["TYPE_CRAZY"] = 3] = "TYPE_CRAZY";
        /**经典场 非必出*/
        SceneType[SceneType["TYPE_CLASSIC2"] = 4] = "TYPE_CLASSIC2";
        /**金猪 */
        SceneType[SceneType["TYPE_PIG"] = 5] = "TYPE_PIG";
        /**换三张 */
        SceneType[SceneType["TYPE_EXCHANGE"] = 6] = "TYPE_EXCHANGE";
        /**福卡闯关 */
        SceneType[SceneType["TYPE_FUKA"] = 7] = "TYPE_FUKA";
        /**游戏更新公告 */
        SceneType[SceneType["TYPE_NOTICE"] = 8] = "TYPE_NOTICE";
    })(SceneType = match.SceneType || (match.SceneType = {}));
    /**排行榜信息 */
    match.EVENT_RANKINFO = "event_rankinfo";
    /**比赛列表 */
    match.EVENT_GAMELIST = "event_gamelist";
    /**红包赛房满进入房间*/
    match.EVENT_MATCH_RNTER_ROOM = "event_match_enter_room";
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
    /**退出界面时间*/
    match.EVENT_CLOSE_PANEL = "event_close_panel";
    /**金猪银猪数据*/
    match.EVENT_PIG_DATA = "event_pig_data";
})(match || (match = {}));
var match;
(function (match) {
    var BuYuEvent = (function (_super) {
        __extends(BuYuEvent, _super);
        function BuYuEvent(type, $data) {
            var _this = _super.call(this, type) || this;
            _this.data = $data;
            return _this;
        }
        BuYuEvent.CLICK_ITEM_REWARD = "click_item_reward";
        BuYuEvent.CLICK_ITEM_GAME = "click_item_game";
        return BuYuEvent;
    }(egret.Event));
    match.BuYuEvent = BuYuEvent;
    __reflect(BuYuEvent.prototype, "match.BuYuEvent");
})(match || (match = {}));
var match;
(function (match) {
    var WxBuyuReward = (function (_super) {
        __extends(WxBuyuReward, _super);
        function WxBuyuReward(data) {
            var _this = _super.call(this) || this;
            _this.fishZH = ["人鱼海湾", "哪吒闹海", "大闹天宫", "凌霄宝殿"];
            _this.fishTag = ["ryhw", "lznh", "dntg", "lxbd"];
            _this._data = data;
            _this.skinName = "WxBuyuRewardSkin";
            return _this;
        }
        WxBuyuReward.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this._enterBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            var fishType;
            if (typeof this._data === 'number') {
                this._isNumber = true;
                fishType = ConfigMgr.getInstance().getFishPlayByType(this._data);
            }
            else {
                fishType = ConfigMgr.getInstance().getFishPlayByType(this._data.roomType);
            }
            var index = this.fishZH.indexOf(fishType.playName);
            if (index > -1) {
                this.buyu_icon.source = "buyu_reward_json.buyu_" + this.fishTag[index] + "_icon";
                this.buyu_txt.source = "buyu_reward_json.buyu_" + this.fishTag[index] + "_txt";
            }
            this.unlock_level.text = "解锁" + fishType.unlockTime + "倍炮";
            if (this._isNumber) {
                this._enterBtn.visible = false;
            }
            else {
                this._enterBtn.visible = true;
                if (fishType.unlockTime > MJLobbyData.getInstance().fishGunBei) {
                    this._enterBtn["bg_img"].source = "buyu_reward_json.buyu_unenter_game";
                    this._enterBtn.enabled = false;
                }
                else {
                    this._enterBtn["bg_img"].source = "buyu_reward_json.buyu_enter_game";
                    this._enterBtn.enabled = true;
                }
            }
            this.fishContain.itemRenderer = FishTypeItem;
            this.fishContain.dataProvider = new eui.ArrayCollection(fishType.fishType);
            this.rewardContain.itemRenderer = WxBuyuGoodItem;
            this.rewardContain.dataProvider = new eui.ArrayCollection(fishType.rewardNumber);
        };
        WxBuyuReward.prototype.onTouchHandle = function (e) {
            if (e.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this._enterBtn) {
                this.enterGame(this._data["id"], this._data["roomType"]);
            }
        };
        WxBuyuReward.prototype.enterGame = function (senceId, roomType) {
            LoadGameTipUtil.loadGame(this._data["gameId"], function (gameData) {
                MsgSendMgr.enterGame(gameData.gameId, senceId, 2, roomType);
            });
        };
        WxBuyuReward.prototype.destroy = function () {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this._enterBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        return WxBuyuReward;
    }(eui.Component));
    match.WxBuyuReward = WxBuyuReward;
    __reflect(WxBuyuReward.prototype, "match.WxBuyuReward");
    var FishTypeItem = (function (_super) {
        __extends(FishTypeItem, _super);
        function FishTypeItem() {
            var _this = _super.call(this) || this;
            _this.width = 130;
            _this.initUI();
            return _this;
        }
        FishTypeItem.prototype.initUI = function () {
            var bg = new egret.Bitmap();
            bg.texture = RES.getRes("buyu_reward_json.buyu_fish_bg");
            this.addChild(bg);
            this.fish = new egret.Bitmap();
            this.addChild(this.fish);
            this.nameTxt = new egret.TextField();
            this.nameTxt.y = bg.height + 5;
            this.nameTxt.fontFamily = "微软雅黑";
            this.nameTxt.textColor = 0xff2200;
            this.addChild(this.nameTxt);
        };
        FishTypeItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.fish.texture = RES.getRes("fish_common_json.fish_" + this.data);
            this.fish.x = (122 - this.fish.width) >> 1;
            this.fish.y = (95 - this.fish.height) >> 1;
            var conf = ConfigMgr.getInstance().getFishByfishID(this.data);
            if (this.data > 27) {
                this.nameTxt.size = 20;
                this.nameTxt.text = conf.fishName;
            }
            else {
                if (conf.minTime == conf.maxTime) {
                    this.nameTxt.text = conf.minTime + "倍";
                    this.nameTxt.size = 22;
                }
                else {
                    this.nameTxt.text = conf.minTime + "-" + conf.maxTime + "倍";
                    this.nameTxt.size = 20;
                }
            }
            this.nameTxt.x = (122 - this.nameTxt.width) / 2;
        };
        return FishTypeItem;
    }(eui.ItemRenderer));
    match.FishTypeItem = FishTypeItem;
    __reflect(FishTypeItem.prototype, "match.FishTypeItem");
    var WxBuyuGoodItem = (function (_super) {
        __extends(WxBuyuGoodItem, _super);
        function WxBuyuGoodItem() {
            var _this = _super.call(this) || this;
            _this.width = 102;
            _this.initUI();
            return _this;
        }
        WxBuyuGoodItem.prototype.initUI = function () {
            var bg = new egret.Bitmap();
            bg.texture = RES.getRes("buyu_reward_json.buyu_goods_bg");
            this.addChild(bg);
            this.goodIcon = new egret.Bitmap();
            this.addChild(this.goodIcon);
            this.nameTxt = new egret.TextField();
            this.nameTxt.y = 106;
            this.nameTxt.fontFamily = "微软雅黑";
            this.nameTxt.textColor = 0xff2200;
            this.nameTxt.size = 20;
            this.addChild(this.nameTxt);
        };
        WxBuyuGoodItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var goodId = this.data;
            this.goodIcon.texture = RES.getRes("game_prop_json.bag_daoju_" + goodId);
            if (this.goodIcon.width > 102 || this.goodIcon.height > 102) {
                this.goodIcon.width = 92;
                this.goodIcon.height = 92;
            }
            this.goodIcon.x = (102 - this.goodIcon.width) / 2;
            this.goodIcon.y = (102 - this.goodIcon.height) / 2;
            var conf = ConfigMgr.getInstance().getGoodCfgById(goodId);
            this.nameTxt.text = conf.goodName;
            this.nameTxt.x = (102 - this.nameTxt.width) / 2;
        };
        return WxBuyuGoodItem;
    }(eui.ItemRenderer));
    match.WxBuyuGoodItem = WxBuyuGoodItem;
    __reflect(WxBuyuGoodItem.prototype, "match.WxBuyuGoodItem");
})(match || (match = {}));
var match;
(function (match) {
    var WxBuYuSelect = (function (_super) {
        __extends(WxBuYuSelect, _super);
        function WxBuYuSelect(gameid) {
            var _this = _super.call(this) || this;
            _this.width = uniLib.Global.screenWidth;
            _this._gameId = gameid;
            _this.skinName = "WxBuYuSelectSkin";
            return _this;
        }
        WxBuYuSelect.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.initInfo(this._gameId);
            // this.select_lst.itemRenderer = WxBuYuSelectItem;
            // this.select_lst.dataProvider = new eui.ArrayCollection(this._data);
            // this.select_lst.dataProviderRefreshed();
            // this.select_lst.validateNow();
            /**检测最适合进入哪个房间 */
            // this.checkEnterRoom();
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
        WxBuYuSelect.prototype.initInfo = function (gameid) {
            var sences;
            var config = ConfigMgr.getInstance().getGameListCfgById(MJLobbyData.getInstance().lobbyId);
            for (var i = 0; i < config.coinList.length; i++) {
                if (config.coinList[i].gameId == gameid) {
                    sences = config.coinList[i].sceneId;
                    break;
                }
            }
            if (sences == null) {
                uniLib.TipsUtils.showTipsDownToUp("没配表！");
                return;
            }
            this.gameTypes = [];
            var list = new Array();
            var vx = 0;
            for (var i = 0; i < sences.length; i++) {
                var confi = ConfigMgr.getInstance().getCoinHunderedById(sences[i]);
                list.push(confi);
                var item = new match.WxBuYuSelectItem();
                item.setInfo(confi);
                this.select_lst.addChild(item);
                item.x = vx;
                vx += (item.width + 12);
                this.gameTypes.push(item);
                item.addEventListener(match.BuYuEvent.CLICK_ITEM_GAME, this.onGameHandler, this);
                item.addEventListener(match.BuYuEvent.CLICK_ITEM_REWARD, this.onRewardHandler, this);
            }
            this._data = list;
        };
        WxBuYuSelect.prototype.onGameHandler = function (evt) {
            var data = evt.data;
            if (uniLib.UserInfo.goldChips >= data.lowestCarry) {
                this.enterGame(data.id, data.roomType);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("金币不足以进该场次！");
            }
        };
        WxBuYuSelect.prototype.onRewardHandler = function (evt) {
            // uniLib.TipsUtils.showTipsDownToUp("功能玩命开发中，敬请期待");
            LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.BUYU_REWARD, function () {
                var data = evt.data;
                uniLib.PopUpMgr.addPopUp(match.WxBuyuReward, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        WxBuYuSelect.prototype.onUserInfo = function (evt) {
            // if (evt.param == uniLib.UserInfoEnum.GOLDCHIPS) {
            //     this.checkEnterRoom();
            // }
        };
        // private checkEnterRoom() {
        //     let check: boolean = false;
        //     for (let i = this._data.length - 1; i >= 0; i--) {
        //         let child = <WxMahjongSelectItem>this.select_lst.getChildByName(WxBuYuSelectItem.SELECT_BUYU_ICONS[this._data[i]["index"]]);
        //         if (child) {
        //             if (!check && uniLib.UserInfo.goldChips >= this._data[i].lowestCarry) {
        //                 child.touch_btn.skin["type_ac"].visible = true;
        //                 check = true;
        //             }
        //             else {
        //                 child.touch_btn.skin["type_ac"].visible = false;
        //             }
        //         }
        //     }
        //     /**没有找到则提示进入初级场 */
        //     if (!check) {
        //         let child = <WxMahjongSelectItem>this.select_lst.getChildByName(WxBuYuSelectItem.SELECT_BUYU_ICONS[this._data[0]["index"]]);
        //         child && (child.touch_btn.skin["type_ac"].visible = true);
        //     }
        // }
        WxBuYuSelect.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxBuYuSelect.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                for (var i = this._data.length - 1; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= this._data[i].lowestCarry) {
                        var fishType = ConfigMgr.getInstance().getFishPlayByType(this._data[i].roomType);
                        if (fishType.unlockTime <= MJLobbyData.getInstance().fishGunBei) {
                            this.enterGame(this._data[i].id, this._data[i].roomType);
                            return;
                        }
                    }
                }
                var confirm_1 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                    LobbyModuleMgr.getInstance().showMarketPanel(1);
                }, function () { }, this);
                uniLib.PopUpMgr.addPopUp(confirm_1, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        WxBuYuSelect.prototype.enterGame = function (senceId, roomType) {
            LoadGameTipUtil.loadGame(this._gameId, function (gameData) {
                MsgSendMgr.enterGame(gameData.gameId, senceId, 2, roomType);
            });
        };
        WxBuYuSelect.prototype.destroy = function () {
            // this.type_skin.destroy();
            // this.type_skin = null;
            egret.Tween.removeTweens(this.type_scr);
            egret.Tween.removeTweens(this.begin_btn);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(match.BuYuEvent.CLICK_ITEM_GAME, this.onGameHandler, this);
            this.select_lst.removeEventListener(match.BuYuEvent.CLICK_ITEM_REWARD, this.onRewardHandler, this);
            if (this.gameTypes) {
                for (var i = 0; i < this.gameTypes.length; i++) {
                    this.gameTypes[i].removeEventListener(match.BuYuEvent.CLICK_ITEM_GAME, this.onGameHandler, this);
                    this.gameTypes[i].removeEventListener(match.BuYuEvent.CLICK_ITEM_REWARD, this.onRewardHandler, this);
                    this.gameTypes[i].destroy();
                }
                this.gameTypes = null;
            }
            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this._data = null;
        };
        return WxBuYuSelect;
    }(eui.Component));
    match.WxBuYuSelect = WxBuYuSelect;
    __reflect(WxBuYuSelect.prototype, "match.WxBuYuSelect");
})(match || (match = {}));
var match;
(function (match) {
    var WxBuYuSelectItem = (function (_super) {
        __extends(WxBuYuSelectItem, _super);
        function WxBuYuSelectItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxBuYuSelectItemSkin";
            return _this;
        }
        WxBuYuSelectItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.touch_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.lock_desc.touchEnabled = false;
            this.lock_desc.touchChildren = false;
            this._created = true;
            if (this._info)
                this.setInfo(this._info);
        };
        WxBuYuSelectItem.prototype.setInfo = function (data) {
            this._info = data;
            if (this._created == false)
                return;
            this.name = WxBuYuSelectItem.SELECT_BUYU_ICONS[this._info.roomType - 1];
            this.touch_btn["bg_img"].source = "buyu_select_json." + this.name;
            if (this._info.lowestCarry < 10000) {
                this.touch_btn["lowestCarry_lbl"].text = this._info.lowestCarry + "金币准入";
            }
            else {
                this.touch_btn["lowestCarry_lbl"].text = this._info.lowestCarry / 10000 + "万金币准入";
            }
            // if (this._info.lowestBetChips < 10000) {
            //     this.touch_btn["point_lbl"].text = this._info.lowestBetChips.toString();
            // }
            // else {
            //     this.touch_btn["point_lbl"].text = this._info.lowestBetChips / 10000 + "万";
            // }
            var fishType = ConfigMgr.getInstance().getFishPlayByType(this._info.roomType);
            if (fishType.unlockTime > MJLobbyData.getInstance().fishGunBei) {
                this.lock_tex.text = fishType.unlockTime + "倍";
                this.lock_desc.visible = true;
            }
            else {
                this.lock_desc.visible = false;
            }
        };
        WxBuYuSelectItem.prototype.onTouchHander = function (event) {
            if (event.target == this.touch_btn) {
                if (this.lock_desc.visible)
                    LobbyModuleMgr.getInstance().showDailyRecharge();
                else
                    this.dispatchEvent(new match.BuYuEvent(match.BuYuEvent.CLICK_ITEM_GAME, this._info));
            }
            else if (event.target == this.reward_btn) {
                this.dispatchEvent(new match.BuYuEvent(match.BuYuEvent.CLICK_ITEM_REWARD, this._info));
            }
        };
        WxBuYuSelectItem.prototype.destroy = function () {
            this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.touch_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        WxBuYuSelectItem.SELECT_BUYU_ICONS = ["buyu_ryht", "buyu_lznh", "buyu_dntg", "buyu_lxbd"];
        return WxBuYuSelectItem;
    }(eui.Component));
    match.WxBuYuSelectItem = WxBuYuSelectItem;
    __reflect(WxBuYuSelectItem.prototype, "match.WxBuYuSelectItem");
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
            _this.skinName = "WxGoldSelectSceneSkin";
            return _this;
        }
        WxGoldSelectScene.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
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
            this.top_skin.destroy();
            this.top_skin = null;
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
        /**
      * @param type 1:经典场 3:疯狂场 6.换三张
      */
        function WxGoldSelectType(sceneInfo, type) {
            if (type === void 0) { type = 1; }
            var _this = _super.call(this) || this;
            _this._index = 1;
            _this.width = uniLib.Global.screenWidth;
            _this._index = type;
            _this._sceneInfo = sceneInfo;
            _this.skinName = "WxGoldSelectTypeSkin";
            return _this;
        }
        WxGoldSelectType.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.classic_rbtn.group.selectedValue = this._index;
            this.classic_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            this.select_lst.itemRenderer = match.WxGoldSelectTypeItem;
            this.setView(this._index);
            /**界面动画 */
            var sX = (uniLib.Global.screenWidth - this.type_scr.width) >> 1;
            this.type_scr.x = uniLib.Global.screenWidth;
            egret.Tween.get(this.type_scr).to({ x: sX }, 400, egret.Ease.quintOut);
        };
        WxGoldSelectType.prototype.setView = function (type) {
            for (var i = 0; i < this._sceneInfo.length; i++) {
                if (this._sceneInfo[i].type == type) {
                    this._data = this._sceneInfo[i];
                    this.select_lst.dataProvider = new eui.ArrayCollection(this._data.items);
                    this.select_lst.dataProviderRefreshed();
                    this.select_lst.validateNow();
                    break;
                }
            }
            /**检测最适合进入哪个房间 */
            this.checkEnterRoom();
        };
        WxGoldSelectType.prototype.onItemTapHandler = function (evt) {
            var _this = this;
            var data = this.select_lst.selectedItem;
            if (uniLib.UserInfo.goldChips >= data.lowestCarry) {
                if (!data.maxCarry || uniLib.UserInfo.goldChips <= data.maxCarry) {
                    wxgame.Global.instance.aldSendEvent("金币场", "\u70B9\u51FB" + this._data.type + "_" + data.type + "\u573A");
                    match.OnEnterMatchRoomCmd_C(data.gameId, data.sceneId);
                }
                else {
                    var confirm_3 = new commonConfirm.ConfirmPanel("金币超最大限制，快去挑战高级场次吧！", null, null, function () {
                        for (var i = _this._data.items.length - 1; i >= 0; i--) {
                            if (_this._data.items[i].lowestCarry <= uniLib.UserInfo.goldChips) {
                                match.OnEnterMatchRoomCmd_C(_this._data.items[i].gameId, _this._data.items[i].sceneId);
                                break;
                            }
                        }
                    }, function () { });
                    uniLib.PopUpMgr.addPopUp(confirm_3, egret.MainContext.instance.stage, true, true, 0, uniLib.PopUpEffect.CENTER);
                }
            }
            else {
                var obj = { "1": "初级场", "2": "中级场", "3": "高级场" };
                var _loop_2 = function (i) {
                    if (uniLib.UserInfo.goldChips >= this_2._data.items[i].lowestCarry) {
                        var confirm_4 = new commonConfirm.ConfirmPanel("\u91D1\u5E01\u4E0D\u8DB3\uFF0C\u8BF7\u524D\u5F80" + obj[this_2._data.items[i].type] + "\u8FDB\u884C\u6E38\u620F!", null, null, function () {
                            wxgame.Global.instance.aldSendEvent("金币场", "\u70B9\u51FB" + _this._data.type + "_" + _this._data.items[i].type + "\u573A");
                            match.OnEnterMatchRoomCmd_C(_this._data.items[i].gameId, _this._data.items[i].sceneId);
                        }, function () { }, this_2);
                        uniLib.PopUpMgr.addPopUp(confirm_4, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                        return { value: void 0 };
                    }
                };
                var this_2 = this;
                for (var i = this._data.items.length - 1; i >= 0; i--) {
                    var state_2 = _loop_2(i);
                    if (typeof state_2 === "object")
                        return state_2.value;
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
        WxGoldSelectType.prototype.onChange = function (evt) {
            var group = evt.target;
            this.setView(parseInt(group.selectedValue));
        };
        WxGoldSelectType.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
                uniLib.Global.dispatchEvent(match.EVENT_CLOSE_PANEL);
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(match.WxGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._data.type);
            }
        };
        WxGoldSelectType.prototype.destroy = function () {
            this.top_skin.destroy();
            this.top_skin = null;
            egret.Tween.removeTweens(this.type_scr);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.classic_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
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
            // if (info.type == 1) {
            //     this.touch_btn["desc_lbl"].text = `${info.gameNbr}局送${info.money}元`;
            // }
            // else {
            //     this.touch_btn["desc_lbl"].text = `赢${info.gameNbr}局送${info.money}元`;
            // }
            this.touch_btn["num_lbl"].text = info.curUserNbr.toString();
            if (info.maxCarry)
                this.touch_btn["lowestCarry_lbl"].text = (info.lowestCarry > 10000 ? info.lowestCarry / 10000 + "万" : info.lowestCarry) + "~" + (info.maxCarry > 10000 ? info.maxCarry / 10000 + "万" : info.maxCarry) + "\u51C6\u5165";
            else {
                this.touch_btn["lowestCarry_lbl"].text = (info.lowestCarry > 10000 ? info.lowestCarry / 10000 + "万" : info.lowestCarry) + "\u51C6\u5165";
            }
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
var match;
(function (match) {
    var WxMahjongSelect = (function (_super) {
        __extends(WxMahjongSelect, _super);
        function WxMahjongSelect(gameid) {
            var _this = _super.call(this) || this;
            _this.width = uniLib.Global.screenWidth;
            _this._gameId = gameid;
            _this.skinName = "WxMahjongSelectSkin";
            return _this;
        }
        WxMahjongSelect.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.initInfo(this._gameId);
            this.select_lst.itemRenderer = match.WxMahjongSelectItem;
            this.select_lst.dataProvider = new eui.ArrayCollection(this._data);
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
        WxMahjongSelect.prototype.initInfo = function (gameid) {
            var sences;
            var config = ConfigMgr.getInstance().getGameListCfgById(MJLobbyData.getInstance().lobbyId);
            for (var i = 0; i < config.coinList.length; i++) {
                if (config.coinList[i].gameId == gameid) {
                    sences = config.coinList[i].sceneId;
                    break;
                }
            }
            if (sences == null) {
                uniLib.TipsUtils.showTipsDownToUp("没配表！");
                return;
            }
            var list = new Array();
            for (var i = 0; i < sences.length; i++) {
                var confi = ConfigMgr.getInstance().getCoinHunderedById(sences[i]);
                confi["index"] = i + 1;
                list.push(confi);
            }
            this._data = list;
        };
        WxMahjongSelect.prototype.onItemTapHandler = function (evt) {
            var data = this.select_lst.selectedItem;
            if (uniLib.UserInfo.goldChips >= data.lowestCarry) {
                this.enterGame(data.id);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("金币不足以进该场次！");
            }
        };
        WxMahjongSelect.prototype.onUserInfo = function (evt) {
            if (evt.param == uniLib.UserInfoEnum.GOLDCHIPS) {
                this.checkEnterRoom();
            }
        };
        WxMahjongSelect.prototype.checkEnterRoom = function () {
            var check = false;
            for (var i = this._data.length - 1; i >= 0; i--) {
                var child = this.select_lst.getChildByName("lb_jinbi_grade" + this._data[i]["index"]);
                if (child) {
                    if (!check && uniLib.UserInfo.goldChips >= this._data[i].lowestCarry) {
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
                var child = this.select_lst.getChildByName("lb_jinbi_grade" + this._data[0]["index"]);
                child && (child.touch_btn.skin["type_ac"].visible = true);
            }
        };
        WxMahjongSelect.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxMahjongSelect.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                for (var i = this._data.length - 1; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= this._data[i].lowestCarry) {
                        this.enterGame(this._data[i].id);
                        return;
                    }
                }
                var confirm_5 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                    LobbyModuleMgr.getInstance().showMarketPanel(1);
                }, function () { }, this);
                uniLib.PopUpMgr.addPopUp(confirm_5, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        WxMahjongSelect.prototype.enterGame = function (senceId) {
            LoadGameTipUtil.loadGame(this._gameId, function (gameData) {
                MsgSendMgr.enterGame(gameData.gameId, senceId, 1, 2);
            });
        };
        WxMahjongSelect.prototype.destroy = function () {
            // this.type_skin.destroy();
            // this.type_skin = null;
            egret.Tween.removeTweens(this.type_scr);
            egret.Tween.removeTweens(this.begin_btn);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this._data = null;
        };
        return WxMahjongSelect;
    }(eui.Component));
    match.WxMahjongSelect = WxMahjongSelect;
    __reflect(WxMahjongSelect.prototype, "match.WxMahjongSelect");
})(match || (match = {}));
var match;
(function (match) {
    var WxMahjongSelectItem = (function (_super) {
        __extends(WxMahjongSelectItem, _super);
        function WxMahjongSelectItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxMahjongSelectItemSkin";
            return _this;
        }
        WxMahjongSelectItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        WxMahjongSelectItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.name = "lb_jinbi_grade" + info["index"];
            this.touch_btn["bg_img"].source = "lb_jinbi_grade" + info["index"] + "_png";
            // if (info.type == 1) {
            //     this.touch_btn["desc_lbl"].text = `${info.gameNbr}局送${info.money}元`;
            // }
            // else {
            //     this.touch_btn["desc_lbl"].text = `赢${info.gameNbr}局送${info.money}元`;
            // }
            this.touch_btn["num_lbl"].text = Math.ceil(Math.random() * 1000);
            this.touch_btn["lowestCarry_lbl"].text = info.lowestCarry + " 准入";
            if (info.lowestBetChips < 10000) {
                this.touch_btn["point_lbl"].text = info.lowestBetChips.toString();
            }
            else {
                this.touch_btn["point_lbl"].text = info.lowestBetChips / 10000 + "万";
            }
        };
        return WxMahjongSelectItem;
    }(eui.ItemRenderer));
    match.WxMahjongSelectItem = WxMahjongSelectItem;
    __reflect(WxMahjongSelectItem.prototype, "match.WxMahjongSelectItem");
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
     * 参加比赛广播 游戏里面点击再来一局服务器会直接下发这个消息
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
    function OnEnterMatchRoomCmd_S(rev) {
        if (rev.resultCode == 6) {
            var confirm_6 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                LobbyModuleMgr.getInstance().showMarketPanel(1);
            }, function () { }, this);
            uniLib.PopUpMgr.addPopUp(confirm_6, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
    }
    Cmd.OnEnterMatchRoomCmd_S = OnEnterMatchRoomCmd_S;
    /**所有场次信息 全部在这一条协议 */
    function OnGetSceneInfoHpMatchCmd_S(rev) {
        var scene = match.sceneInfoMap.get(rev.gameId);
        if (!scene) {
            match.sceneInfoMap.set(rev.gameId, rev);
        }
        else {
            rev.cInfos && (scene.cInfos = rev.cInfos);
            rev.rInfos && (scene.rInfos = rev.rInfos);
            rev.sInfos && (scene.sInfos = rev.sInfos);
            rev.mInfos && (scene.mInfos = rev.mInfos);
        }
        var pigRush = rev.cInfos || rev.rInfos;
        if (pigRush) {
            if (uniLib.PopUpMgr.hasPopup(match.WxPigRushThrough)) {
                uniLib.Global.dispatchEvent(match.EVENT_PIG_DATA, pigRush);
            }
            else {
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_PIG, function () {
                    uniLib.PopUpMgr.addPopUp(match.WxPigRushThrough, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { data: pigRush, gameId: rev.gameId });
                });
            }
        }
        else if (rev.sInfos) {
            LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_GOLD, function () {
                uniLib.PopUpMgr.addPopUp(match.WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, rev.sInfos);
            });
        }
        else if (rev.mInfos) {
            if (uniLib.PopUpMgr.hasPopup(match.WxGameList)) {
                uniLib.Global.dispatchEvent(match.EVENT_GAMELIST, rev.mInfos);
            }
            else {
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_MATCH, function () {
                    uniLib.PopUpMgr.addPopUp(match.WxGameList, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, rev.mInfos);
                });
            }
        }
    }
    Cmd.OnGetSceneInfoHpMatchCmd_S = OnGetSceneInfoHpMatchCmd_S;
})(Cmd || (Cmd = {}));
/**
 * 消息发送
 */
var match;
(function (match) {
    /**
     * @param type BigSceneType 1:金币场 2:金银猪 3:闯关 4:比赛
     * @param gameId mathch.GameId
     */
    function OnGetSceneInfoHpMatchCmd_C(type, gameId, lobbyId) {
        if (lobbyId === void 0) { lobbyId = MJLobbyData.getInstance().lobbyId; }
        var scene = match.sceneInfoMap.get(gameId);
        if (scene) {
            if (type == 1 && scene.sInfos) {
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_GOLD, function () {
                    uniLib.PopUpMgr.addPopUp(match.WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, scene.sInfos);
                });
                return;
            }
            else if (type == 2 && scene.cInfos) {
                if (uniLib.PopUpMgr.hasPopup(match.WxPigRushThrough)) {
                    uniLib.Global.dispatchEvent(match.EVENT_PIG_DATA, scene.cInfos);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_PIG, function () {
                        uniLib.PopUpMgr.addPopUp(match.WxPigRushThrough, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { data: scene.cInfos, gameId: scene.gameId });
                    });
                }
                return;
            }
            else if (type == 3 && scene.rInfos) {
                if (uniLib.PopUpMgr.hasPopup(match.WxPigRushThrough)) {
                    uniLib.Global.dispatchEvent(match.EVENT_PIG_DATA, scene.rInfos);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_PIG, function () {
                        uniLib.PopUpMgr.addPopUp(match.WxPigRushThrough, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { data: scene.rInfos, gameId: scene.gameId });
                    });
                }
                return;
            }
            else if (type == 4 && scene.mInfos) {
                if (uniLib.PopUpMgr.hasPopup(match.WxGameList)) {
                    uniLib.Global.dispatchEvent(match.EVENT_GAMELIST, scene.mInfos);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_MATCH, function () {
                        uniLib.PopUpMgr.addPopUp(match.WxGameList, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, scene.mInfos);
                    });
                }
                return;
            }
        }
        var req = new Cmd.GetSceneInfoHpMatchCmd_C();
        req.typ = type;
        if (lobbyId == 59)
            req.gameId = match.GameId.ID_ERMJ;
        else
            req.gameId = gameId;
        req.lobbyId = lobbyId;
        NetMgr.tcpSend(req);
    }
    match.OnGetSceneInfoHpMatchCmd_C = OnGetSceneInfoHpMatchCmd_C;
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
   * 进入金猪银猪闯关
   */
    function OnEnterChallengeHpMatchCmd_C(type, round, gameId) {
        var req = new Cmd.EnterChallengeHpMatchCmd_C();
        req.type = type;
        req.round = round;
        if (MJLobbyData.getInstance().lobbyId == 59)
            req.gameId = match.GameId.ID_ERMJ;
        else
            req.gameId = gameId;
        NetMgr.tcpSend(req);
    }
    match.OnEnterChallengeHpMatchCmd_C = OnEnterChallengeHpMatchCmd_C;
    /**请求闯关 */
    function OnEnterRushHpMatchCmd_C(type, gameId) {
        var req = new Cmd.EnterRushHpMatchCmd_C();
        if (MJLobbyData.getInstance().lobbyId == 59)
            req.gameId = match.GameId.ID_ERMJ;
        else
            req.gameId = gameId;
        req.type = type;
        NetMgr.tcpSend(req);
    }
    match.OnEnterRushHpMatchCmd_C = OnEnterRushHpMatchCmd_C;
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
    var WxPigPassItem = (function (_super) {
        __extends(WxPigPassItem, _super);
        function WxPigPassItem(data) {
            var _this = _super.call(this) || this;
            _this.skinName = "WxPigPassItemSkin";
            return _this;
        }
        WxPigPassItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            if (info.unlock == 1) {
                this.lock_img.visible = false;
                this.touchEnabled = true;
                this.touchChildren = true;
                this.pass_lbl.text = "\u7B2C" + info.round + "\u5173";
            }
            else {
                this.lock_img.visible = true;
                this.touchChildren = false;
                this.touchEnabled = false;
                this.pass_lbl.text = "";
            }
        };
        return WxPigPassItem;
    }(eui.ItemRenderer));
    match.WxPigPassItem = WxPigPassItem;
    __reflect(WxPigPassItem.prototype, "match.WxPigPassItem");
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
     * goodId转汉字
     */
    function getDescByGoodId(goodId) {
        if (goodId == match.GoodType.TYPE_DIAMOND) {
            return "钻石";
        }
        else if (goodId == match.GoodType.TYPE_GOLD) {
            return "金币";
        }
        else if (goodId == match.GoodType.TYPE_FUKA) {
            return "福卡";
        }
    }
    match.getDescByGoodId = getDescByGoodId;
    /**判断道具是否足够 */
    function judgeItemIsEnough(goodId, goodNum) {
        if (goodId == match.GoodType.TYPE_DIAMOND) {
            if (uniLib.UserInfo.chips < goodNum) {
                // LobbyModuleMgr.getInstance().showDiamondsPanel();
                LobbyModuleMgr.getInstance().showMarketPanel(0);
                uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                return false;
            }
            else {
                return true;
            }
        }
        else if (goodId == match.GoodType.TYPE_GOLD) {
            if (uniLib.UserInfo.goldChips < goodNum) {
                var confirm_7 = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, function () {
                    LobbyModuleMgr.getInstance().showMarketPanel(1);
                }, function () { }, this);
                uniLib.PopUpMgr.addPopUp(confirm_7, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                return false;
            }
            else {
                return true;
            }
        }
        else if (goodId == match.GoodType.TYPE_FUKA) {
            if (uniLib.UserInfo.giftCoupon < goodNum) {
                uniLib.TipsUtils.showTipsDownToUp("福卡不足");
                return false;
            }
            else {
                return true;
            }
        }
    }
    match.judgeItemIsEnough = judgeItemIsEnough;
})(match || (match = {}));
var match;
(function (match) {
    var WxPigSelectPass = (function (_super) {
        __extends(WxPigSelectPass, _super);
        function WxPigSelectPass(data) {
            var _this = _super.call(this) || this;
            _this._gameId = data.gameId;
            _this._data = data.info;
            _this.width = uniLib.Global.screenWidth;
            _this.skinName = "WxPigSelectPassSkin";
            return _this;
        }
        WxPigSelectPass.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.chall_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.againChall_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sel_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            var unlock = 0;
            var pass = 0;
            for (var i = 0, len = this._data.items.length; i < len; i++) {
                if (this._data.items[i].unlock) {
                    unlock++;
                }
                if (this._data.items[i].pass)
                    pass++;
            }
            this.pro_lbl.text = "\u6311\u6218\u8FDB\u5EA6" + unlock + "/" + this._data.items.length;
            this.sel_lst.itemRenderer = match.WxPigPassItem;
            this.sel_lst.dataProvider = new eui.ArrayCollection(this._data.items);
            /**已经通关 找金币最够得那一关 否则找能打的最大关*/
            if (pass == this._data.items.length) {
                var i = this._data.items.length - 1;
                for (; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= this._data.items[i].rewards[0].goodNbr) {
                        this.sel_lst.selectedIndex = i;
                        this.initComp(this._data.items[i]);
                        break;
                    }
                }
                if (i < 0) {
                    this.sel_lst.selectedIndex = 0;
                    this.initComp(this._data.items[0]);
                }
            }
            else {
                this.sel_lst.selectedIndex = unlock - 1;
                this.initComp(this._data.items[unlock - 1]);
            }
        };
        WxPigSelectPass.prototype.initComp = function (data) {
            this.title_lbl.text = "\u7B2C" + data.round + "\u5173";
            if (data.pass) {
                this.againChall_btn.visible = true;
                this.chall_btn.visible = false;
            }
            else {
                this.againChall_btn.visible = false;
                this.chall_btn.visible = true;
            }
            var goodNbr = data.signFee[0].goodNbr;
            this.gold_lbl.text = goodNbr > 10000 ? (Math.floor(goodNbr / 10000) + "万") : goodNbr.toString();
            if (this._data.type == 1) {
                this.reward_lbl.text = "银猪x" + data.rewards[0].goodNbr;
            }
            else if (this._data.type == 2) {
                this.reward_lbl.text = "金猪x" + data.rewards[0].goodNbr;
            }
        };
        WxPigSelectPass.prototype.onItemTap = function (evt) {
            var data = this.sel_lst.selectedItem;
            this.initComp(data);
        };
        WxPigSelectPass.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.chall_btn || evt.target == this.againChall_btn) {
                var data = this.sel_lst.selectedItem;
                var str = "";
                if (this._data.type == 2) {
                    str = "金猪";
                }
                else if (this._data.type == 1) {
                    str = "银猪";
                }
                var config = data.signFee;
                if (Array.isArray(config) && match.judgeItemIsEnough(config[0].goodId, config[0].goodNbr)) {
                    match.OnEnterChallengeHpMatchCmd_C(this._data.type, data.round, this._gameId);
                    wxgame.Global.instance.aldSendEvent("金币场", str);
                }
                else {
                    uniLib.PopUpMgr.removePopUp(this);
                }
            }
        };
        WxPigSelectPass.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxPigSelectPass.prototype.destroy = function () {
            this._gameId = null;
            this._data = null;
            this.top_skin.destroy();
            this.top_skin = null;
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.chall_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.againChall_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sel_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        };
        return WxPigSelectPass;
    }(eui.Component));
    match.WxPigSelectPass = WxPigSelectPass;
    __reflect(WxPigSelectPass.prototype, "match.WxPigSelectPass");
})(match || (match = {}));
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
            _this.skinName = "WxEliminateWaitSkin";
            return _this;
        }
        WxEliminateWait.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            uniLib.Global.addEventListener(match.EVENT_MATCH_RNTER_ROOM, this.numberFullHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);
            var data = this._data;
            if (Array.isArray(data.rewards)) {
                for (var i = 0; i < this.reward_grp.numChildren; i++) {
                    var btn = this.reward_grp.getChildAt(i);
                    if (data.rewards[i] && data.rewards[i].goodNbr) {
                        if (i + 1 == this.reward_grp.numChildren)
                            btn.label = data.rewards[i].goodNbr + "+";
                        else
                            btn.label = "x" + data.rewards[i].goodNbr;
                    }
                    else
                        btn.visible = false;
                }
            }
            var config = table.getMatchConfigBySceneId(data.sceneId);
            this.num_lbl.text = config.MatchPlayerNumber.toString();
            this.title_lbl.text = "\u6EE1" + config.MatchPlayerNumber + "\u4EBA\u5F00\u8D5B";
            for (var i = 0; i < config.riseRank.length; i++) {
                this["num" + i] && (this["num" + i].text = config.riseRank[i]);
            }
            this.timer_lbl.text = "\u6B63\u5728\u9632\u4F5C\u5F0A\u5339\u914D\u4E2D..." + data.timestamp;
            this._timer = new egret.Timer(1000, data.timestamp);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();
            this._mask = new egret.Shape();
            this.eliminate_grp.addChild(this._mask);
            this.update(data);
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
                if (this._curNum > 0) {
                    var endAngle = (data.curUserNbr / config.MatchPlayerNumber) * Math.PI * 2 - Math.PI / 2;
                    this._indexArr.forEach(function (value) { egret.clearTimeout(value); });
                    this._indexArr = [];
                    this.drawMask(endAngle);
                }
                else {
                    for (var i = this._curNum; i < data.curUserNbr; i++) {
                        var endAngle = (i / config.MatchPlayerNumber) * Math.PI * 2 - Math.PI / 2;
                        this._indexArr.push(egret.setTimeout(this.drawMask, this, 40 * i, [endAngle]));
                    }
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
            var confirm = new commonConfirm.ConfirmPanel("返回大厅将会取消报名，是否要返回？", null, null, match.OnRequestExitHpMatchCmd_C, function () { });
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
        /**进入房间直接显示人数已满 */
        WxEliminateWait.prototype.numberFullHandler = function () {
            this._indexArr.forEach(function (value) { egret.clearTimeout(value); });
            this._indexArr = [];
            this._mask.graphics.clear();
            this._mask.visible = false;
            this.pro_img.mask = null;
            var config = table.getMatchConfigBySceneId(this._data.sceneId);
            this.num_blbl.text = config.MatchPlayerNumber.toString();
        };
        WxEliminateWait.prototype.onResize = function () {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        WxEliminateWait.prototype.destroy = function () {
            this._indexArr.forEach(function (value) { egret.clearTimeout(value); });
            this._indexArr = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer = null;
            }
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            uniLib.Global.removeEventListener(match.EVENT_MATCH_RNTER_ROOM, this.numberFullHandler, this);
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
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (this._data) {
                var config = table.getMatchConfigBySceneId(this._data.sceneId);
                if (config) {
                    this.title_lbl.text = config.HaoPaiMatchName;
                    this.num_lbl.text = config.MatchPlayerNumber + "人";
                    var goodConfig = ConfigMgr.getInstance().getGoodCfgById(config.HaoPaiMatchCost[0].goodId);
                    if (goodConfig) {
                        this.cost_lbl.text = config.HaoPaiMatchCost[0].goodNbr ? "x" + config.HaoPaiMatchCost[0].goodNbr : "免费";
                    }
                    if (config.HaoPaiMatchCost[0].goodId == match.GoodType.TYPE_DIAMOND) {
                        this.costType_img.source = "wx_lb_res_json.lb_diamond_png";
                    }
                    else if (config.HaoPaiMatchCost[0].goodId == match.GoodType.TYPE_GOLD) {
                        this.costType_img.source = "wx_lb_res_json.lb_jinbi_jinbi_png";
                    }
                }
                if (this._data.signLimit) {
                    this.sign_lbl.text = this._data.signNum + "/" + this._data.signLimit;
                }
                else {
                    this.sign_lbl.text = "无限制";
                }
                this.reward_lst.itemRenderer = match.WxGameDetailItem;
                config.RankReward.forEach(function (value, index) { value["rank"] = index + 1; });
                this.reward_lst.dataProvider = new eui.ArrayCollection(config.RankReward);
            }
        };
        WxGameDetail.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.sign_btn) {
                var config = table.getMatchConfigBySceneId(this._data.sceneId);
                if (Array.isArray(config.HaoPaiMatchCost) && match.judgeItemIsEnough(config.HaoPaiMatchCost[0].goodId, config.HaoPaiMatchCost[0].goodNbr)) {
                    match.OnRequestJoinHpMatchCmd_C(this._data.sceneId);
                }
                else {
                    uniLib.PopUpMgr.removePopUp(this);
                }
            }
        };
        WxGameDetail.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
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
     * 比赛详情项
     */
    var WxGameDetailItem = (function (_super) {
        __extends(WxGameDetailItem, _super);
        function WxGameDetailItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "WxGameDetailItemSkin";
            return _this;
        }
        WxGameDetailItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            if (info["rank"] >= 1 && info["rank"] <= 3) {
                this.rank_img.visible = true;
                this.rank_lbl.visible = false;
                this.rank_img.source = "wx_lb_res_json.bs_xiangqing_" + info["rank"] + "_png";
            }
            else {
                this.rank_img.visible = false;
                this.rank_lbl.visible = true;
                this.rank_lbl.text = "\u7B2C" + info["rank"] + "\u540D";
            }
            this.reward0_lbl.text = info[0].goodNbr + match.getDescByGoodId(info[0].goodId);
            if (info[1]) {
                this.reward1_lbl.text = info[1].goodNbr + match.getDescByGoodId(info[1].goodId);
            }
            else {
                this.reward1_lbl.text = "";
            }
        };
        return WxGameDetailItem;
    }(eui.ItemRenderer));
    match.WxGameDetailItem = WxGameDetailItem;
    __reflect(WxGameDetailItem.prototype, "match.WxGameDetailItem");
})(match || (match = {}));
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
            _this.skinName = "WxGameListSkin";
            return _this;
        }
        WxGameList.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(match.EVENT_GAMELIST, this.onGameListHandler, this);
            this.ticketGame_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.ticketGame_lst.itemRenderer = match.WxGameListItem;
            this.ticketGame_lst.dataProvider = new eui.ArrayCollection(this._param);
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
            this.ticketGame_lst.dataProvider = new eui.ArrayCollection(param);
        };
        WxGameList.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                var config = table.getMatchConfigBySceneId(this._beginSceneId);
                if (Array.isArray(config.HaoPaiMatchCost) && match.judgeItemIsEnough(config.HaoPaiMatchCost[0].goodId, config.HaoPaiMatchCost[0].goodNbr)) {
                    wxgame.Global.instance.aldSendEvent("淘汰赛", "点击快速开始");
                    match.OnRequestJoinHpMatchCmd_C(this._beginSceneId);
                }
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(match.WxGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, match.SceneType.TYPE_MATCH);
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
                uniLib.PopUpMgr.addPopUp(match.WxGameDetail, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            }
        };
        WxGameList.prototype.destroy = function () {
            this._param = null;
            this.top_skin.destroy();
            this.top_skin = null;
            egret.Tween.removeTweens(this.ticketGame_scr);
            egret.Tween.removeTweens(this.begin_btn);
            uniLib.Global.dispatchEvent(commonConfirm.EVENT_PANEL_CLOSE);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
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
                if (config.HaoPaiMatchType == match.GameType.TYPE_OUT || config.HaoPaiMatchType == match.GameType.TYPE_DIAMOND) {
                    skin["desc_lbl"].textFlow = [{ text: "前" }, { text: config.mainrewardRank, style: { textColor: 0xFA4F42 } }, { text: "名可获得福卡奖励" }];
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
                    if (config.HaoPaiMatchCost[0].goodId == match.GoodType.TYPE_DIAMOND) {
                        skin["diamond_img"].source = "wx_lb_res_json.lb_diamond_png";
                    }
                    else if (config.HaoPaiMatchCost[0].goodId == match.GoodType.TYPE_GOLD) {
                        skin["diamond_img"].source = "wx_lb_res_json.lb_jinbi_jinbi_png";
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
        function WxGameRule(sceneType) {
            var _this = _super.call(this) || this;
            _this._sceneType = sceneType;
            _this.skinName = "WxGameRuleSkin";
            return _this;
        }
        WxGameRule.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._sceneType != null && this._sceneType != undefined && this.setData(this._sceneType);
        };
        WxGameRule.prototype.setData = function (sceneType) {
            this.title_img.source = "wx_lb_res_json.ruler_title_png";
            if (sceneType == match.SceneType.TYPE_NOTICE) {
                this.title_img.source = "wx_lb_res_json.lb_gonggao_title_png";
                this.title_lbl.text = "游戏更新公告";
                this.rule_lbl.textFlow = (new egret.HtmlTextParser).parse(RES.getRes("lb_notice_txt"));
            }
            else {
                if (RES.hasRes("hcpdk_rule_txt")) {
                    var ruleTxt = JSON.parse(RES.getRes("hcpdk_rule_txt"));
                    if (ruleTxt && ruleTxt[sceneType]) {
                        this.title_lbl.text = ruleTxt[sceneType].title;
                        this.rule_lbl.textFlow = (new egret.HtmlTextParser).parse(ruleTxt[sceneType].context);
                    }
                }
            }
        };
        WxGameRule.prototype.onTouch = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        WxGameRule.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            this.close_btn = null;
            this.title_img = null;
            this._sceneType = null;
            this.title_lbl = null;
            this.rule_lbl = null;
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
            _this.width = uniLib.Global.screenWidth;
            _this._matchType = table.getMatchConfigBySceneId(_this._data.sceneId).HaoPaiMatchType;
            _this.skinName = "WxMatchWaitSkin";
            return _this;
        }
        WxMatchWait.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
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
            var confirm = new commonConfirm.ConfirmPanel("返回大厅将会取消报名，是否要返回？", null, null, match.OnRequestExitHpMatchCmd_C, function () { });
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
        WxMatchWait.prototype.numberFullHandler = function () {
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
    /**
     * 闯关报名
     */
    var WxRushGameDetail = (function (_super) {
        __extends(WxRushGameDetail, _super);
        function WxRushGameDetail(data) {
            var _this = _super.call(this) || this;
            _this._gameId = data.gameId;
            _this._data = data.info;
            _this.skinName = "WxRushGameDetailSkin";
            return _this;
        }
        WxRushGameDetail.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.bg_img.width = uniLib.Global.screenWidth;
            this.bg_img.x = (this.width - uniLib.Global.screenWidth) >> 1;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.continue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            if (this._data) {
                this.title_img.source = "match_rush_json.cg_js_title_" + this._data.type;
                var round = void 0;
                for (var i = 0; i < this._data.details.length; i++) {
                    var det = this._data.details[i];
                    this["reward" + i].text = this.format(det.rewads);
                    this["zz" + i].source = det.pass ? "match_rush_json.cg_js_zhuzi_2" : "match_rush_json.cg_js_zhuzi_1";
                    this["tg" + i].visible = det.pass;
                    if (det.maxFokas) {
                        this["cd" + i] && (this["cd" + i].visible = !det.pass);
                        this["fk" + i] && (this["fk" + i].visible = !det.pass);
                        this["fkl" + i] && (this["fkl" + i].visible = !det.pass);
                        this["fkl" + i] && (this["fkl" + i].text = det.minFokas + "-" + det.maxFokas);
                    }
                    this["cg" + i].text = det.userNbr + "人闯关成功";
                    if (det.pass == 0 && round == undefined) {
                        round = i;
                    }
                }
                if (round != undefined) {
                    this.pass_db = uniLib.DragonUtils.createDragonBonesDisplay("jiangbei_ske_json", "jiangbei_tex_json", "jiangbei_tex_png", uniLib.DragonType.ARMATURE);
                    var slot = this.pass_db.getSlot("jiangbei");
                    var bmp = new egret.Bitmap(RES.getRes("match_rush_json.cg_js_jiangbei" + (round + 1)));
                    bmp.anchorOffsetX = bmp.width >> 1;
                    bmp.anchorOffsetY = bmp.height >> 1;
                    slot.display = bmp;
                    this.pass_db.display.x = this["round" + round].x + 54;
                    this.pass_db.display.y = this["round" + round].y + 54;
                    this["round" + round].visible = false;
                    uniLib.DragonUtils.runDragonBonesArmature(this.pass_db, "newAnimation", 0);
                    this.addChild(this.pass_db.display);
                }
                if (this._data.signFee) {
                    this.continue_btn.visible = false;
                    this.begin_btn.horizontalCenter = 0;
                    var signFee = this._data.signFee[0];
                    this.begin_btn.label = "x" + (signFee.goodNbr > 10000 ? signFee.goodNbr / 10000 + "万" : signFee.goodNbr);
                    if (signFee.goodId == match.GoodType.TYPE_DIAMOND) {
                        this.begin_btn["type"].source = "wx_lb_res_json.lb_diamond_png";
                    }
                    else if (signFee.goodId == match.GoodType.TYPE_FUKA) {
                        this.begin_btn["type"].source = "wx_lb_res_json.cg_baoming_BMfuka_png";
                    }
                    else if (signFee.goodId == match.GoodType.TYPE_GOLD) {
                        this.begin_btn["type"].source = "wx_lb_res_json.lb_jinbi_jinbi_png";
                    }
                    if (this._data.enterLimit) {
                        this.condition_lbl.textFlow = [{ text: "\u62A5\u540D\u6761\u4EF6:\u798F\u5361\u2265" + this._data.enterLimit, style: { underline: true } }];
                        this.condition_lbl.visible = true;
                    }
                }
                else {
                    this.begin_btn.visible = false;
                    this.continue_btn.horizontalCenter = 0;
                }
            }
        };
        WxRushGameDetail.prototype.format = function (items) {
            var egg = "";
            var str;
            for (var i = 0; i < items.length; i++) {
                str = str ? str + "\n" : "";
                var item = items[i];
                if (item.goodId == match.GoodType.TYPE_DIAMOND) {
                    str += item.goodNbr + "\u94BB\u77F3";
                }
                else if (item.goodId == match.GoodType.TYPE_FUKA) {
                    str += item.goodNbr + "\u798F\u5361";
                }
                else if (item.goodId == match.GoodType.TYPE_GOLD) {
                    str += item.goodNbr + "\u91D1\u5E01";
                }
                else if (item.goodId == match.GoodType.TYPE_EGG) {
                    egg = "福卡彩蛋";
                }
            }
            return str + egg;
        };
        WxRushGameDetail.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.begin_btn) {
                var signFee = this._data.signFee[0];
                if (match.judgeItemIsEnough(signFee.goodId, signFee.goodNbr)) {
                    match.OnEnterRushHpMatchCmd_C(this._data.type, this._gameId);
                }
            }
            else if (evt.target == this.continue_btn) {
                match.OnEnterRushHpMatchCmd_C(this._data.type, this._gameId);
            }
        };
        WxRushGameDetail.prototype.destroy = function () {
            uniLib.DragonUtils.destoryDragonBonesArmature(this.pass_db, "newAnimation");
            this.pass_db = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.continue_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._data = null;
        };
        return WxRushGameDetail;
    }(eui.Component));
    match.WxRushGameDetail = WxRushGameDetail;
    __reflect(WxRushGameDetail.prototype, "match.WxRushGameDetail");
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
                return Math.floor(gold / 10000000) / 10 + "亿";
            }
            else if (gold > 10000000) {
                return Math.floor(gold / 1000) / 10 + "万";
            }
            else if (gold > 100000) {
                return Math.floor(gold / 100) / 100 + "万";
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
                if (WxTopOpBtn.HAS_HPW_MATCH == false)
                    return;
                RES.loadGroup(match.MatchConst.HPW_MATCH).then(function () {
                    match.OnGetSceneInfoHpMatchCmd_C(match.BigSceneType.TYPE_MATCH, match.GameId.ID_MATCH_PIG);
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
        WxTopOpBtn.HAS_HPW_MATCH = true;
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
            if (uniLib.Global.isNative && uniLib.Utils.isIOS && uniLib.Global.is_sandbox == 1) {
                this.tips_lbl.visible = false;
            }
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
            if (uniLib.Global.isWxGame() || uniLib.Global.platId == 152) {
                this.share_btn.visible = true;
            }
            else {
                this.share_btn.visible = false;
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
