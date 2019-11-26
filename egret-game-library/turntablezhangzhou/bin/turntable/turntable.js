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
var turntable;
(function (turntable) {
    var TurnTable = (function (_super) {
        __extends(TurnTable, _super);
        function TurnTable() {
            var _this = _super.call(this) || this;
            _this.skinName = "TurnTableSkin";
            return _this;
        }
        TurnTable.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        TurnTable.prototype.addEvent = function () {
            uniLib.Global.addEventListener(turntable.TurntableConst.IntoZZTurnTableLobby, this.setData, this);
            uniLib.Global.addEventListener(turntable.TurntableConst.ZZTurnTableLobby, this.goLuckDraw, this);
            uniLib.Global.addEventListener(turntable.TurntableConst.GetZZTurnTableRecordsLobby, this.showRecord, this);
            uniLib.Global.addEventListener(turntable.TurntableConst.OpenRedPackLobby, this.RedPack, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
        };
        TurnTable.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(turntable.TurntableConst.IntoZZTurnTableLobby, this.setData, this);
            uniLib.Global.removeEventListener(turntable.TurntableConst.ZZTurnTableLobby, this.goLuckDraw, this);
            uniLib.Global.removeEventListener(turntable.TurntableConst.GetZZTurnTableRecordsLobby, this.showRecord, this);
            uniLib.Global.removeEventListener(turntable.TurntableConst.OpenRedPackLobby, this.RedPack, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
        };
        TurnTable.prototype.initUI = function () {
            var TabletTaskData = RES.getRes("TabletTask_json");
            TabletTaskData.forEach(function (f) {
                MJLobbyData.getInstance().tabletask[f.id] = f;
            });
            var goodsTableData = RES.getRes("TableGoodsConfig_json");
            goodsTableData.forEach(function (f) {
                MJLobbyData.getInstance().goods[f.goodId] = f;
            });
            this._dailyTasksBtn.selected = true;
            this.updateShow();
            this.turntable1.alpha = 0;
            egret.Tween.get(this.turntable, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
            egret.Tween.get(this.turntable1, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
            this._taskList.itemRenderer = turntable.TurnTableTaskItemPanel;
            this._recordList.itemRenderer = turntable.TurnTableRecordItemPanel;
        };
        /**进入页面 显示 */
        TurnTable.prototype.setData = function (evt) {
            this.data = evt.param;
            if (!this.data)
                return;
            this._integralText.text = this.data.integral + "";
            this._moneyText.text = "红包金额（满10元才能领取）：" + this.data.money + "元";
            this.updateTaskList();
        };
        /**更新任务数据 */
        TurnTable.prototype.updateTaskList = function () {
            if (!this._taskListAC) {
                this._taskListAC = new eui.ArrayCollection(this.data.tasks);
                this._taskList.dataProvider = this._taskListAC;
            }
            else {
                if (Array.isArray(this._taskListAC.source)) {
                    this._taskListAC.removeAll();
                }
                this._taskListAC.replaceAll(this.data.tasks);
            }
        };
        /**可以抽奖咯 我要中888现金大奖！*/
        TurnTable.prototype.goLuckDraw = function (evt) {
            var data = evt.param;
            this.data.integral = data.integral;
            this._integralText.text = this.data.integral + "";
            this.data.money = data.money;
            this._moneyText.text = "红包金额（满10元才能领取）：" + this.data.money + "元";
            this.beginTurnTable(data);
        };
        TurnTable.prototype.RedPack = function (evt) {
            var data = evt.param;
            this.data.money = this.data.money - data.info.reward;
            this._moneyText.text = "红包金额（满10元才能领取）：" + this.data.money.toFixed(2) + "元";
            var reward = new Cmd.RewardItem;
            reward.goodId = 353;
            reward.goodNbr = data.info.reward;
            LobbyModuleMgr.getInstance().showAwardPanel2(reward);
        };
        /**请求抽奖记录 */
        TurnTable.prototype.getRecord = function () {
            var req = new Cmd.GetZZTurnTableRecordsLobbyCmd_CS();
            NetMgr.tcpSend(req);
        };
        /**获得并显示抽奖记录 */
        TurnTable.prototype.showRecord = function (evt) {
            var data = evt.param;
            this._recordData = data.records;
            this.updateRecordList();
        };
        /**更新抽奖记录*/
        TurnTable.prototype.updateRecordList = function () {
            if (Array.isArray(this._recordData)) {
                this._tipsText.visible = false;
                if (!this._recordListAC) {
                    this._recordListAC = new eui.ArrayCollection(this._recordData);
                    this._recordList.dataProvider = this._recordListAC;
                }
                else {
                    if (Array.isArray(this._recordListAC.source)) {
                        this._recordListAC.removeAll();
                    }
                    this._recordListAC.replaceAll(this._recordData);
                }
            }
            else {
                this._tipsText.visible = true;
            }
        };
        /**开始转盘 */
        TurnTable.prototype.beginTurnTable = function (data) {
            var _this = this;
            this.cjImg.touchEnabled = false;
            /**抽奖到的物品位置ID */
            var selectIndex = 0;
            switch (data.reward.goodId) {
                case 341:
                    selectIndex = 5;
                    break;
                case 342:
                    selectIndex = 3;
                    break;
                case 343:
                    selectIndex = 1;
                    break;
                case 353:
                    selectIndex = 4;
                    break;
                case 32:
                    if (data.reward.goodNbr == 388) {
                        selectIndex = 6;
                        break;
                    }
                    else {
                        selectIndex = 2;
                        break;
                    }
            }
            // egret.Tween.removeTweens(this.turnTable);
            var roateAng = 2160 - 60 * selectIndex;
            egret.Tween.get(this.turnTable).to({ rotation: roateAng + 15 }, 5800, egret.Ease.sineInOut)
                .to({ rotation: roateAng - 10 }, 800, egret.Ease.sineInOut)
                .to({ rotation: roateAng }, 500, egret.Ease.sineInOut).call(function () {
                _this.sgEffect.visible = true;
                egret.Tween.get(_this.sgEffect).to({ rotation: 360 }, 400).to({ alpha: 0 }, 400).call(function () {
                    _this.sgEffect.visible = false;
                    _this.sgEffect.alpha = 1;
                    _this.cjImg.touchEnabled = true;
                    LobbyModuleMgr.getInstance().showAwardPanel2(data.reward);
                    var req = new Cmd.UserInfoGetLobbyCmd_C;
                    req.uid = uniLib.NetMgr.UID;
                    req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                    NetMgr.tcpSend(req);
                });
                // egret.setTimeout(() => {
                // 	egret.Tween.get(this.turnTable, { loop: true }).to({ rotation: 360 }, 36000);
                // }, this, 2000);
            });
        };
        TurnTable.prototype.onTouchEvent = function (e) {
            switch (e.target) {
                case this._closebtn:
                    this.destroy();
                    break;
                case this.cjImg:
                    if (this.data.integral >= 10) {
                        var req = new Cmd.ZZTurnTableLobbyCmd_CS();
                        NetMgr.tcpSend(req);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("积分不足，完成任务可获得积分！");
                    }
                    break;
                case this._receiveBtn:
                    if (this.data.money >= 10) {
                        var req = new Cmd.OpenRedPackLobbyCmd_C();
                        req.lobbyId = MJLobbyData.getInstance().lobbyId;
                        req.typ = 3;
                        NetMgr.tcpSend(req);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("红包金额不满10元！");
                    }
                    break;
                case this._drawRecordBtn:
                    this.getRecord();
                    this.updateShow();
                    break;
                case this._dailyTasksBtn:
                    this.updateShow();
                    break;
            }
        };
        /**更新右侧显示 */
        TurnTable.prototype.updateShow = function () {
            if (this._drawRecordBtn.selected) {
                this._recordGroup.visible = true;
                this._taskGroup.visible = false;
            }
            else {
                this._recordGroup.visible = false;
                this._taskGroup.visible = true;
            }
        };
        TurnTable.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            egret.Tween.removeTweens(this.turnTable);
            egret.Tween.removeTweens(this.turntable);
            egret.Tween.removeTweens(this.turntable1);
            egret.Tween.removeTweens(this.sgEffect);
            this.removeEvent();
            // uniLib.DisplayUtils.removeAllChildren(this);
            // uniLib.DisplayUtils.removeFromParent(this);
            uniLib.PopUpMgr.removePopUp(this, uniLib.PopUpEffect.NOMAL);
        };
        return TurnTable;
    }(commonpanel.LobbyBaseEuiPanel));
    turntable.TurnTable = TurnTable;
    __reflect(TurnTable.prototype, "turntable.TurnTable");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    /**抽奖记录 */
    var TurnTableRecordItemPanel = (function (_super) {
        __extends(TurnTableRecordItemPanel, _super);
        function TurnTableRecordItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "TurnTableRecordItemSkin";
            return _this;
        }
        TurnTableRecordItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        TurnTableRecordItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStr(this._info.time) + "获得";
            this._prizeText.text = MJLobbyData.getInstance().goods[this._info.goodId].goodDesc + this._info.goodNbr;
            this._prizeText.x = this._timeText.x + this._timeText.width;
            if (this.itemIndex % 2 == 0) {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item1";
            }
            else {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item2";
            }
        };
        return TurnTableRecordItemPanel;
    }(eui.ItemRenderer));
    turntable.TurnTableRecordItemPanel = TurnTableRecordItemPanel;
    __reflect(TurnTableRecordItemPanel.prototype, "turntable.TurnTableRecordItemPanel");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    /**转盘 任务列表 */
    var TurnTableTaskItemPanel = (function (_super) {
        __extends(TurnTableTaskItemPanel, _super);
        function TurnTableTaskItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "TurnTableTaskItemSkin";
            return _this;
        }
        TurnTableTaskItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        TurnTableTaskItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._taskText.text = MJLobbyData.getInstance().tabletask[this._info.taskId].name;
            this._processText.text = this._info.nbr + "/" + MJLobbyData.getInstance().tabletask[this._info.taskId].frequency;
            if (this.itemIndex % 2 == 0) {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item1";
            }
            else {
                this._bg.source = "mjl_turntable_json.mjl_turntable_item2";
            }
        };
        return TurnTableTaskItemPanel;
    }(eui.ItemRenderer));
    turntable.TurnTableTaskItemPanel = TurnTableTaskItemPanel;
    __reflect(TurnTableTaskItemPanel.prototype, "turntable.TurnTableTaskItemPanel");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var TurntableConst = (function () {
        function TurntableConst() {
        }
        TurntableConst.RES_JSON = "resource/turntable/turntable.res_8a8cd4ed.json";
        TurntableConst.THM_JSON = "resource/turntable/gameEui_d44df6c8.json";
        /**
         * 公共loading需要加载的资源组
         */
        TurntableConst.PUB_TURNTABLE = "pub_turntable";
        /**数据无误 */
        TurntableConst.SUCCESS = 0;
        /** 漳州新增转盘  进入转盘界面*/
        TurntableConst.IntoZZTurnTableLobby = "IntoZZTurnTableLobby";
        /** 漳州新增转盘 转动转盘*/
        TurntableConst.ZZTurnTableLobby = "ZZTurnTableLobby";
        /** 漳州新增转盘 获奖记录*/
        TurntableConst.GetZZTurnTableRecordsLobby = "GetZZTurnTableRecordsLobby";
        /** 领取红包钱*/
        TurntableConst.OpenRedPackLobby = "OpenRedPackLobby";
        /**是否当前可转转盘*/
        TurntableConst.CANTURNTABLE = "canTurnTable";
        return TurntableConst;
    }());
    turntable.TurntableConst = TurntableConst;
    __reflect(TurntableConst.prototype, "turntable.TurntableConst");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var TurntableData = (function () {
        function TurntableData() {
            /**是否当前可以转转盘 */
            this.canTurnTable = false;
        }
        TurntableData.getInstance = function () {
            if (!this._instance) {
                this._instance = new TurntableData();
            }
            return this._instance;
        };
        return TurntableData;
    }());
    turntable.TurntableData = TurntableData;
    __reflect(TurntableData.prototype, "turntable.TurntableData");
})(turntable || (turntable = {}));
var Cmd;
(function (Cmd) {
    function TurntableDispatch(cmd, obj, bubbles) {
        if (bubbles === void 0) { bubbles = true; }
        uniLib.Global.dispatchEvent(cmd, obj, bubbles);
    }
    Cmd.TurntableDispatch = TurntableDispatch;
    /**领取红包钱*/
    function OnOpenRedPackLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.OpenRedPackLobby, rev);
        }
    }
    Cmd.OnOpenRedPackLobbyCmd_S = OnOpenRedPackLobbyCmd_S;
    /** 漳州新增转盘 转动转盘 */
    function OnZZTurnTableLobbyCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.ZZTurnTableLobby, rev);
            if (rev.integral == 0) {
                turntable.TurntableData.getInstance().canTurnTable = false;
                TurntableDispatch(turntable.TurntableConst.CANTURNTABLE);
            }
        }
    }
    Cmd.OnZZTurnTableLobbyCmd_CS = OnZZTurnTableLobbyCmd_CS;
    /**漳州新增转盘  进入转盘界面 */
    function OnIntoZZTurnTableLobbyCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.IntoZZTurnTableLobby, rev);
        }
    }
    Cmd.OnIntoZZTurnTableLobbyCmd_CS = OnIntoZZTurnTableLobbyCmd_CS;
    /**漳州新增转盘 获奖记录 */
    function OnGetZZTurnTableRecordsLobbyCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.GetZZTurnTableRecordsLobby, rev);
        }
    }
    Cmd.OnGetZZTurnTableRecordsLobbyCmd_CS = OnGetZZTurnTableRecordsLobbyCmd_CS;
})(Cmd || (Cmd = {}));
var turntable;
(function (turntable) {
    var TurntableModuleMgr = (function () {
        function TurntableModuleMgr() {
        }
        TurntableModuleMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new TurntableModuleMgr();
            }
            return this._instance;
        };
        return TurntableModuleMgr;
    }());
    turntable.TurntableModuleMgr = TurntableModuleMgr;
    __reflect(TurntableModuleMgr.prototype, "turntable.TurntableModuleMgr");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var TurntableSendMgr = (function () {
        function TurntableSendMgr() {
        }
        /**请求使用物品
        * @param goodId 兑换物品id
        * @param num 兑换数量
        */
        TurntableSendMgr.ExchangeRequest = function (num, goodId) {
            var req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
            var backpackInfo = new Cmd.BackpackInfo;
            backpackInfo.goodId = goodId;
            backpackInfo.number = num;
            req.backpackInfo = backpackInfo;
            NetMgr.tcpSend(req);
        };
        return TurntableSendMgr;
    }());
    turntable.TurntableSendMgr = TurntableSendMgr;
    __reflect(TurntableSendMgr.prototype, "turntable.TurntableSendMgr");
})(turntable || (turntable = {}));
