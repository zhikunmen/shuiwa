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
var goldLand;
(function (goldLand) {
    var GoldLandConsts = (function () {
        function GoldLandConsts() {
        }
        GoldLandConsts.RES_JSON = "resource/goldLand/goldLand.res_828d82d6.json";
        GoldLandConsts.THM_JSON = "resource/goldLand/gameEui_f4e38e8e.json";
        /**
         * 需要加载的游戏内任务资源组
         */
        GoldLandConsts.PUB_GOLD_LAND = "pub_gold_land";
        return GoldLandConsts;
    }());
    goldLand.GoldLandConsts = GoldLandConsts;
    __reflect(GoldLandConsts.prototype, "goldLand.GoldLandConsts");
})(goldLand || (goldLand = {}));
var goldLand;
(function (goldLand) {
    var GoldLandItem = (function (_super) {
        __extends(GoldLandItem, _super);
        function GoldLandItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GoldLandItemSkin";
            return _this;
        }
        GoldLandItem.time2str = function (num) {
            if (num == null)
                return "";
            num = num.toString().length == 10 ? num * 1000 : num;
            var date = new Date();
            date.setTime(num);
            var str = this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
            return str;
        };
        GoldLandItem.getNumStr = function (num) {
            if (num < 10) {
                return "0" + num;
            }
            return num.toString();
        };
        GoldLandItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        GoldLandItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            if (info.uid == uniLib.UserInfo.uid) {
                this.card_type.textColor = 0x131cd9;
                this.nick_name.textColor = 0x131cd9;
                this.num_txt.textColor = 0x131cd9;
                this.time_txt.textColor = 0x131cd9;
            }
            else {
                this.card_type.textColor = 0xD34A1A;
                this.nick_name.textColor = 0xD34A1A;
                this.num_txt.textColor = 0xD34A1A;
                this.time_txt.textColor = 0xD34A1A;
            }
            this.card_type.text = GoldLandItem.CardTypes[info.type - 1];
            this.card_type.anchorOffsetX = this.card_type.width >> 1;
            this.nick_name.text = info.nickName;
            this.nick_name.anchorOffsetX = this.nick_name.width >> 1;
            this.num_txt.text = info.chips + "";
            this.num_txt.anchorOffsetX = this.num_txt.width >> 1;
            this.time_txt.text = GoldLandItem.time2str(info.time);
            this.time_txt.anchorOffsetX = this.time_txt.width >> 1;
        };
        GoldLandItem.prototype.destroy = function () {
        };
        GoldLandItem.CardTypes = ["4炸弹", "12连顺并胜利", "3炸弹并胜利", "10连胜", "6连胜", "累积胜利100局", "双关"];
        return GoldLandItem;
    }(eui.ItemRenderer));
    goldLand.GoldLandItem = GoldLandItem;
    __reflect(GoldLandItem.prototype, "goldLand.GoldLandItem");
})(goldLand || (goldLand = {}));
var goldLand;
(function (goldLand) {
    var GoldLandPanel = (function (_super) {
        __extends(GoldLandPanel, _super);
        function GoldLandPanel(gameId, sceneId) {
            var _this = _super.call(this) || this;
            _this._pageIndex = 1;
            _this._gameId = gameId;
            _this._sceneId = sceneId;
            _this.skinName = "GoldLandSkin";
            return _this;
        }
        GoldLandPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.caijin_lst.itemRenderer = goldLand.GoldLandItem;
            this.addEvents();
        };
        GoldLandPanel.prototype.loadData = function () {
            var req = new Cmd.GetHeavenAwardHistoryHpMatchCmd_C();
            req.gameId = this._gameId;
            req.sceneId = this._sceneId;
            req.pagenum = this._pageIndex;
            req.pagecap = 10;
            NetMgr.tcpSend(req);
        };
        GoldLandPanel.prototype.addEvents = function () {
            this.scroll.addEventListener(egret.Event.CHANGE, this.scrollChange, this);
            uniLib.Global.addEventListener(goldLand.CmdConstant.HEAVEN_AWARD_HISTORY, this.historyData, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            this._pageIndex = 1;
            this.loadData();
        };
        GoldLandPanel.prototype.removeEvents = function () {
            this.scroll.removeEventListener(egret.Event.CHANGE, this.scrollChange, this);
            uniLib.Global.removeEventListener(goldLand.CmdConstant.HEAVEN_AWARD_HISTORY, this.historyData, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        };
        GoldLandPanel.prototype.scrollChange = function (evt) {
            if (this._pageIndex < 4 && this.scroll.viewport.scrollV + this.scroll.height > this.scroll.viewport.contentHeight + 100) {
                this.scroll.viewport.scrollV = this.scroll.viewport.contentHeight - this.scroll.height;
                this._pageIndex++;
                this.loadData();
            }
        };
        GoldLandPanel.prototype.closeHandler = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        /**
         * 刷新页面数据
         */
        GoldLandPanel.prototype.historyData = function (e) {
            var curData = e.param;
            if (curData.jackpot)
                this.total_label.text = curData.jackpot + "";
            if (curData.winstreak)
                this.liansheng.text = "当前连胜:" + curData.winstreak;
            if (curData.winsnum)
                this.leiji.text = "累积胜利:" + curData.winsnum;
            if (curData.awardInfos == null || !(curData.awardInfos instanceof Array) || curData.awardInfos.length == 0)
                return;
            if (curData.pagenum == 1) {
                this._dataList = new eui.ArrayCollection(curData.awardInfos);
                this.caijin_lst.dataProvider = this._dataList;
            }
            else {
                var awardInfos = curData.awardInfos;
                if (awardInfos && awardInfos.length > 0) {
                    for (var i = 0; i < awardInfos.length; i++) {
                        this._dataList.addItem(awardInfos[i]);
                    }
                    this._dataList.refresh();
                }
            }
        };
        GoldLandPanel.prototype.destroy = function () {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GoldLandPanel;
    }(eui.Component));
    goldLand.GoldLandPanel = GoldLandPanel;
    __reflect(GoldLandPanel.prototype, "goldLand.GoldLandPanel");
})(goldLand || (goldLand = {}));
var goldLand;
(function (goldLand) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**获得奖励列表*/
        CmdConstant.HEAVEN_AWARD_HISTORY = "Heaven_Award_History";
        /**获奖*/
        CmdConstant.HEAVEN_AWARD_GOLD = "Heaven_Award_Gold";
        return CmdConstant;
    }());
    goldLand.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "goldLand.CmdConstant");
})(goldLand || (goldLand = {}));
var GoldLandReciveMgr = (function () {
    function GoldLandReciveMgr() {
    }
    return GoldLandReciveMgr;
}());
__reflect(GoldLandReciveMgr.prototype, "GoldLandReciveMgr");
var Cmd;
(function (Cmd) {
    /**请求数据 */
    function OnGetHeavenAwardHistoryHpMatchCmd_S(rev) {
        uniLib.Global.dispatchEvent(goldLand.CmdConstant.HEAVEN_AWARD_HISTORY, rev, true);
    }
    Cmd.OnGetHeavenAwardHistoryHpMatchCmd_S = OnGetHeavenAwardHistoryHpMatchCmd_S;
    /**通知获奖 */
    function OnGoldFromHeavenHpMatchCmd_S(rev) {
        uniLib.Global.dispatchEvent(goldLand.CmdConstant.HEAVEN_AWARD_GOLD, rev, true);
    }
    Cmd.OnGoldFromHeavenHpMatchCmd_S = OnGoldFromHeavenHpMatchCmd_S;
})(Cmd || (Cmd = {}));
