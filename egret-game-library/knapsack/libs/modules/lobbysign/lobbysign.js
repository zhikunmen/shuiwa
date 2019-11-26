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
var lobbysign;
(function (lobbysign) {
    var LobbySignPanel = (function (_super) {
        __extends(LobbySignPanel, _super);
        function LobbySignPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "LobbySignSkin";
            return _this;
        }
        LobbySignPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LobbySignPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        LobbySignPanel.prototype.initUI = function () {
            lobbysign.SignSendMgr.getUserSignInfo();
            //加载表中数据
            var signTableData = RES.getRes("TableSignIn_json");
            var index = 0;
            signTableData.forEach(function (f) {
                if (f.lobbyId == MJLobbyData.getInstance().lobbyId) {
                    lobbysign.Data.sign[index++] = f;
                }
            });
            var goodsTableData = RES.getRes("TableGoodsConfig_json");
            goodsTableData.forEach(function (f) {
                lobbysign.Data.goods[f.goodId] = f;
            });
        };
        LobbySignPanel.prototype.addEvent = function () {
            this._signBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sign, this);
            uniLib.Global.addEventListener(lobbysign.SignConst.SIGN_INFO, this.setData, this);
            uniLib.Global.addEventListener(lobbysign.SignConst.SIGN_TODAY, this.signDayOfWeek, this);
            uniLib.Global.addEventListener(lobbysign.SignConst.SIGN_CONTINUE, this.getReward, this);
        };
        LobbySignPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(lobbysign.SignConst.SIGN_INFO, this.setData, this);
            uniLib.Global.removeEventListener(lobbysign.SignConst.SIGN_TODAY, this.signDayOfWeek, this);
            uniLib.Global.removeEventListener(lobbysign.SignConst.SIGN_CONTINUE, this.getReward, this);
            this._signBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sign, this);
        };
        LobbySignPanel.prototype.setData = function (evt) {
            var vo = evt.param;
            if (!vo)
                return;
            this._data = vo;
            if (this._data.bTodayReceived) {
                this._signBtn.enabled = false;
            }
            this._rewardlist = this._data.continue;
            this._signRewardItemList.itemRenderer = lobbysign.SignRewardItemPanel;
            this._signRewardItemList.dataProvider = new eui.ArrayCollection(this._rewardlist);
            this._dayofweeklsit = [];
            for (var i = 0; i < 7; i++) {
                this._dayofweeklsit.push(this._data);
            }
            this._signDayOfWeekItemList.itemRenderer = lobbysign.SignDayOfWeekItemPanel;
            this._signDayOfWeekItemList.dataProvider = new eui.ArrayCollection(this._dayofweeklsit);
            this.update();
        };
        /**签到 */
        LobbySignPanel.prototype.update = function () {
            if (!this._data)
                return;
            this._totalTxt.text = "累计签到" + this._data.continueDay + "天";
            if (this._data.continueDay <= 3) {
                this._expBr.width = this._data.continueDay / 3 * 130;
            }
            else if (this._data.continueDay <= 5) {
                this._expBr.width = 200 + (this._data.continueDay - 3) / 2 * 100;
            }
            else if (this._data.continueDay <= 7) {
                this._expBr.width = 380 + (this._data.continueDay - 5) / 2 * 105;
            }
            else {
                var result = (this._data.continueDay - 7) * 110 / (28 - 7);
                result = result > 110 ? 110 : result;
                this._expBr.width = 560 + result;
            }
        };
        /**签到 */
        LobbySignPanel.prototype.sign = function () {
            if (this._data.bTodayReceived) {
                uniLib.TipsUtils.showTipsDownToUp("今日已签到");
                return;
            }
            lobbysign.SignSendMgr.getSignToday(true);
        };
        LobbySignPanel.prototype.getReward = function (evt) {
            var info = evt.param;
            this.showAwardPanel(info.continueSignId, 2);
            lobbysign.SignSendMgr.getUserSignInfo();
        };
        LobbySignPanel.prototype.signDayOfWeek = function (evt) {
            var signInfo = evt.param;
            this.showAwardPanel(signInfo.curWeek, 1);
            lobbysign.SignSendMgr.getUserSignInfo();
        };
        /**展示领取金币动画 */
        LobbySignPanel.prototype.showAwardPanel = function (id, type) {
            var item;
            if (type == 1) {
                for (var i = 0; i < lobbysign.Data.sign[0].signReward.length; i++) {
                    if (lobbysign.Data.sign[0].signReward[i].dayNum == id) {
                        item = lobbysign.Data.sign[0].signReward[i].reward;
                        break;
                    }
                }
            }
            else if (type == 2) {
                for (var i = 0; i < lobbysign.Data.sign[0].cumulativeReward.length; i++) {
                    if (lobbysign.Data.sign[0].cumulativeReward[i].cumulativeNum == id) {
                        item = lobbysign.Data.sign[0].cumulativeReward[i].reward;
                        break;
                    }
                }
            }
            var awardPanel = new lobbyaward.LobbyGetAwardPanel();
            awardPanel.setData(item["count"], item["goodsId"]);
            uniLib.PopUpMgr.addPopUp(awardPanel, null, true, true);
        };
        /**当前要领取的礼包id */
        LobbySignPanel.rewardId = -1;
        return LobbySignPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    lobbysign.LobbySignPanel = LobbySignPanel;
    __reflect(LobbySignPanel.prototype, "lobbysign.LobbySignPanel");
})(lobbysign || (lobbysign = {}));
var lobbysign;
(function (lobbysign) {
    var SignConst = (function () {
        function SignConst() {
        }
        SignConst.RES_JSON = "resource/lobbysign/lobbysign.res_aed230a3.json";
        SignConst.THM_JSON = "resource/lobbysign/gameEui_30eeace4.json";
        /**
         * 公共loading需要加载的资源组
         */
        SignConst.LOBBY_SIGN = "lobby_sign";
        /**金币场用户签到信息返回 */
        SignConst.SIGN_INFO = "SIGNINFO_RETURN";
        /**金币场用户签到返回 */
        SignConst.SIGN_TODAY = "SIGNTODAY_DATA";
        /**金币场累积签到奖励 */
        SignConst.SIGN_CONTINUE = "SIGN_CONTINUE";
        return SignConst;
    }());
    lobbysign.SignConst = SignConst;
    __reflect(SignConst.prototype, "lobbysign.SignConst");
    /**暂存数据 对应表数据 */
    var Data = (function () {
        function Data() {
        }
        /**每日签到 */
        Data.sign = {};
        /**道具表 */
        Data.goods = {};
        /**任务 免费金币 */
        Data.task = {};
        return Data;
    }());
    lobbysign.Data = Data;
    __reflect(Data.prototype, "lobbysign.Data");
})(lobbysign || (lobbysign = {}));
var lobbysign;
(function (lobbysign) {
    var SignDayOfWeekItemPanel = (function (_super) {
        __extends(SignDayOfWeekItemPanel, _super);
        function SignDayOfWeekItemPanel() {
            var _this = _super.call(this) || this;
            _this._id = -1;
            _this.skinName = "SignDayOfWeekItemSkin";
            return _this;
        }
        SignDayOfWeekItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        SignDayOfWeekItemPanel.prototype.dataChanged = function () {
            this.info = this.data;
            if (!this.data)
                return;
            this._id = this.itemIndex;
            if (!lobbysign.Data.sign[0] || !lobbysign.Data.sign[0].signReward[this.itemIndex])
                return;
            this._sRewardTabledata = lobbysign.Data.sign[0].signReward[this.itemIndex];
            var weekArr = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
            this.dayTxt.text = weekArr[this.itemIndex];
            this.goldTxt.text = this._sRewardTabledata.reward.count + "";
            var imgDic = { 1000: 1, 2000: 2, 5000: 3, 6000: 4 };
            this.icon.source = "mjl_rewards" + imgDic[this._sRewardTabledata.reward.count];
            this.tick.visible = false;
            if (this.info.signWeek && this.info.signWeek.length > 0 && this.info.signWeek.indexOf(this.itemIndex + 1) != -1) {
                this.tick.visible = true;
            }
        };
        return SignDayOfWeekItemPanel;
    }(eui.ItemRenderer));
    lobbysign.SignDayOfWeekItemPanel = SignDayOfWeekItemPanel;
    __reflect(SignDayOfWeekItemPanel.prototype, "lobbysign.SignDayOfWeekItemPanel");
})(lobbysign || (lobbysign = {}));
var Cmd;
(function (Cmd) {
    function signDispatch(cmd, obj, bubbles) {
        if (bubbles === void 0) { bubbles = true; }
        uniLib.Global.dispatchEvent(cmd, obj, bubbles);
    }
    Cmd.signDispatch = signDispatch;
    /**金币场用户今日签到返回 */
    function OnUserSignTodayLobbyCmd_S(rev) {
        signDispatch(lobbysign.SignConst.SIGN_TODAY, rev);
    }
    Cmd.OnUserSignTodayLobbyCmd_S = OnUserSignTodayLobbyCmd_S;
    /**用户累计签到奖励 */
    function OnUserSignContinueLobbyCmd_S(rev) {
        signDispatch(lobbysign.SignConst.SIGN_CONTINUE, rev);
    }
    Cmd.OnUserSignContinueLobbyCmd_S = OnUserSignContinueLobbyCmd_S;
})(Cmd || (Cmd = {}));
var lobbysign;
(function (lobbysign) {
    var SignRewardItemPanel = (function (_super) {
        __extends(SignRewardItemPanel, _super);
        function SignRewardItemPanel() {
            var _this = _super.call(this) || this;
            _this._id = -1;
            _this.skinName = "SignRewardItemSkin";
            return _this;
        }
        SignRewardItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        SignRewardItemPanel.prototype.dataChanged = function () {
            if (!this.data)
                return;
            this.info = this.data;
            this._id = this.data.id;
            if (!lobbysign.Data.sign[0] || !lobbysign.Data.sign[0].cumulativeReward[this.itemIndex])
                return;
            this._cRewardTabledata = lobbysign.Data.sign[0].cumulativeReward[this.itemIndex];
            if (this.info.bCouldReceive && !this.info.bReceived) {
                this.guangtween(true);
            }
            else {
                this.guangtween(false);
            }
            this.dayTxt.text = "累计" + this.info.continueDay + "天";
            this.goldTxt.text = this._cRewardTabledata.reward.count + lobbysign.Data.goods[this._cRewardTabledata.reward.goodsId].goodName;
            this.bg.source = "mjl_rewards" + this._id;
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getReward, this);
        };
        SignRewardItemPanel.prototype.getReward = function (evt) {
            if (!this.data.bCouldReceive) {
                uniLib.TipsUtils.showTipsDownToUp("当前礼包不可领");
                return;
            }
            lobbysign.LobbySignPanel.rewardId = this._id;
            lobbysign.SignSendMgr.getSignToday(false, this.data.continueDay);
        };
        /**背景光旋转 */
        SignRewardItemPanel.prototype.guangtween = function (val) {
            uniLib.DisplayUtils.stopTweenGroup(this.guang);
            this._guangImg.visible = false;
            if (val) {
                this._guangImg.visible = true;
                uniLib.DisplayUtils.playTweenGroup(this.guang, true);
            }
        };
        return SignRewardItemPanel;
    }(eui.ItemRenderer));
    lobbysign.SignRewardItemPanel = SignRewardItemPanel;
    __reflect(SignRewardItemPanel.prototype, "lobbysign.SignRewardItemPanel");
})(lobbysign || (lobbysign = {}));
var lobbysign;
(function (lobbysign) {
    var SignSendMgr = (function () {
        function SignSendMgr() {
        }
        /**请求签到数据 */
        SignSendMgr.getUserSignInfo = function () {
            var req = new Cmd.UserSignInfoLobbyCmd_C();
            req.lobbyId = MJLobbyData.getInstance().lobbyId;
            NetMgr.tcpSend(req);
        };
        /**
         * 每日签到
         * 是否为每日签到
         *  */
        SignSendMgr.getSignToday = function (today, continueSignId) {
            var req;
            if (today) {
                req = new Cmd.UserSignTodayLobbyCmd_C();
            }
            else {
                req = new Cmd.UserSignContinueLobbyCmd_C();
                req.continueSignId = continueSignId;
            }
            req.lobbyId = MJLobbyData.getInstance().lobbyId;
            NetMgr.tcpSend(req);
        };
        return SignSendMgr;
    }());
    lobbysign.SignSendMgr = SignSendMgr;
    __reflect(SignSendMgr.prototype, "lobbysign.SignSendMgr");
})(lobbysign || (lobbysign = {}));
