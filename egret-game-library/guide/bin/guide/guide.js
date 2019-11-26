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
var guide;
(function (guide) {
    var FirstGuidePanel = (function (_super) {
        __extends(FirstGuidePanel, _super);
        function FirstGuidePanel(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "FirstGuidePanelSkin";
            return _this;
        }
        FirstGuidePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.desc_lbl.textFlow = [{ text: "2.每日随机领取1元以上奖券，游戏" }, { text: "五分钟", style: { textColor: 0xff0000 } },
                { text: "后领取，可获得更高奖励" }];
            uniLib.Global.addEventListener(guide.GuideConsts.REDPACK_DATA, this.onUpdate, this);
            this.exchange_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            this.sign_lst.itemRenderer = GuideItem;
            if (this._info) {
                this.setData(this._info);
            }
            else {
                NetMgr.tcpSend(new Cmd.GetNewRedPackdInfoHpMatchCmd_C());
            }
        };
        FirstGuidePanel.prototype.setData = function (info) {
            this.sign_lst.dataProvider = new eui.ArrayCollection(info.infos);
            this.sign_lst.dataProviderRefreshed();
            this.todayReward_lbl.text = info.todayNum + "奖券";
            this.reward_blbl.text = info.totalNum.toFixed(1) + "元";
        };
        FirstGuidePanel.prototype.onTouchHandler = function (evt) {
            var _this = this;
            if (this._info.bChange == 0) {
                var confim = new commonConfirm.ConfirmPanel("第七日签到完成后才可以兑换红包哦");
                uniLib.PopUpMgr.addPopUp(confim, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (this._info.bChange == 1) {
                if (this._info.totalNum > 0) {
                    var confim = new commonConfirm.ConfirmPanel("满10元才可提现，是否兑换成等额金币", null, null, function () {
                        NetMgr.tcpSend(new Cmd.ExchangeNewRedPackHpMatchCmd_C());
                        uniLib.PopUpMgr.removePopUp(_this);
                    }, function () { });
                    uniLib.PopUpMgr.addPopUp(confim, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                }
            }
        };
        FirstGuidePanel.prototype.onItemTap = function () {
            var info = this.sign_lst.selectedItem;
            info.status == 3 && NetMgr.tcpSend(new Cmd.GetNewRedPackRewardHpMatch_C());
        };
        FirstGuidePanel.prototype.onUpdate = function (evt) {
            this._info = evt.param;
            this.setData(evt.param);
        };
        FirstGuidePanel.prototype.destroy = function () {
            this._info = null;
            uniLib.Global.removeEventListener(guide.GuideConsts.REDPACK_DATA, this.onUpdate, this);
            this.exchange_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            this.removeChildren();
        };
        return FirstGuidePanel;
    }(eui.Component));
    guide.FirstGuidePanel = FirstGuidePanel;
    __reflect(FirstGuidePanel.prototype, "guide.FirstGuidePanel");
    var GuideItem = (function (_super) {
        __extends(GuideItem, _super);
        function GuideItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GuideItemSkin";
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.destroy, _this);
            return _this;
        }
        GuideItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.day_lbl.text = "\u7B2C" + info.day + "\u5929";
            if (info.status == 1) {
                this.light_img.visible = false;
                this.rev_img.visible = true;
                this.rev_img.source = "guide_sign_json.lb_xinshou_weilingqu";
            }
            else if (info.status == 2) {
                this.light_img.visible = false;
                this.rev_img.visible = true;
                this.rev_img.source = "guide_sign_json.lb_xinshou_yilingqu";
            }
            else if (info.status == 3) {
                this.light_img.visible = true;
                egret.Tween.get(this.light_img, { loop: true }).to({ rotation: 360 }, 1000);
                this.rev_img.visible = false;
            }
            else if (info.status == 4) {
                this.light_img.visible = false;
                this.rev_img.visible = false;
            }
        };
        GuideItem.prototype.destroy = function () {
            egret.Tween.removeTweens(this.light_img);
            this.light_img = null;
        };
        return GuideItem;
    }(eui.ItemRenderer));
    __reflect(GuideItem.prototype, "GuideItem");
})(guide || (guide = {}));
var guide;
(function (guide) {
    var GuideConsts = (function () {
        function GuideConsts() {
        }
        GuideConsts.RES_JSON = "resource/guide/guide.res_17adde55.json";
        GuideConsts.THM_JSON = "resource/guide/gameEui_9e9cb79f.json";
        GuideConsts.REDPACK_DATA = "redpack_data";
        GuideConsts.GUIDE_TASK_DATA = "guide_task_data";
        GuideConsts.CLOSE_GUIDE_TASK = "close_guide_task";
        /**
         * 新的新手指引 -- 签到
         */
        GuideConsts.PUB_GUIDE_NEW = "pub_guide_new";
        /**新手任务 */
        GuideConsts.GUIDE_TASK = "guide_task";
        /**新手比赛 */
        GuideConsts.GUIDE_GAME = "guide_game";
        return GuideConsts;
    }());
    guide.GuideConsts = GuideConsts;
    __reflect(GuideConsts.prototype, "guide.GuideConsts");
})(guide || (guide = {}));
var Cmd;
(function (Cmd) {
    function OnGetNewRedPackdInfoHpMatchCmd_S(rev) {
        if (uniLib.PopUpMgr.hasPopup(guide.FirstGuidePanel)) {
            uniLib.Global.dispatchEvent(guide.GuideConsts.REDPACK_DATA, rev);
        }
        else {
            uniLib.PopUpMgr.addPopUp(guide.FirstGuidePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, rev);
        }
    }
    Cmd.OnGetNewRedPackdInfoHpMatchCmd_S = OnGetNewRedPackdInfoHpMatchCmd_S;
    function OnGetGrowTaskInfoHpMatchCmd_S(rev) {
        if (uniLib.PopUpMgr.hasPopup(guide.GuideTaskPanel)) {
            uniLib.Global.dispatchEvent(guide.GuideConsts.GUIDE_TASK_DATA, rev);
        }
        else {
            uniLib.PopUpMgr.addPopUp(guide.GuideTaskPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, rev);
        }
    }
    Cmd.OnGetGrowTaskInfoHpMatchCmd_S = OnGetGrowTaskInfoHpMatchCmd_S;
})(Cmd || (Cmd = {}));
var guide;
(function (guide) {
    var GuideGuideGame = (function (_super) {
        __extends(GuideGuideGame, _super);
        function GuideGuideGame(type, fun) {
            if (type === void 0) { type = 0; }
            if (fun === void 0) { fun = null; }
            var _this = _super.call(this) || this;
            _this.skins = ["GuideGuideGameSkin", "GuideFishGameSkin"];
            if (fun)
                _this._fun = fun;
            if (type == 0) {
                if (uniLib.Global.isNative && uniLib.Global.is_sandbox != 0)
                    _this.skinName = "GuideGuideCheckSkin";
                else
                    _this.skinName = "GuideGuideGameSkin";
            }
            else
                _this.skinName = _this.skins[type];
            return _this;
        }
        GuideGuideGame.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.click_btn.once(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        GuideGuideGame.prototype.onTouch = function () {
            if (this._fun) {
                this._fun.call(this);
            }
            else {
                var req = new Cmd.RequestJoinHpMatchCmd_C();
                req.gameId = match.GameId.ID_MATCH_PIG;
                req.sceneId = 7004;
                NetMgr.tcpSend(req);
            }
        };
        return GuideGuideGame;
    }(eui.Component));
    guide.GuideGuideGame = GuideGuideGame;
    __reflect(GuideGuideGame.prototype, "guide.GuideGuideGame");
})(guide || (guide = {}));
var guide;
(function (guide) {
    /**
     * 新手七日成长任务
     */
    var GuideTaskPanel = (function (_super) {
        __extends(GuideTaskPanel, _super);
        function GuideTaskPanel(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "GuideTaskPanelSkin";
            return _this;
        }
        GuideTaskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (uniLib.Global.isInGame) {
                this.proBg_img.visible = true;
                this.pro_img.visible = true;
                this.pro_img.width = uniLib.UserInfo.giftCoupon >= 500 ? 240 : Math.floor((uniLib.UserInfo.giftCoupon / 500) * 240);
            }
            uniLib.Global.addEventListener(guide.GuideConsts.GUIDE_TASK_DATA, this.onUpdate, this);
            this.exchange_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.light_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.addEventListener(guide.GuideConsts.CLOSE_GUIDE_TASK, this.close, this);
            this.task_lst.itemRenderer = GuideTaskItem;
            this._taskCollArr = new eui.ArrayCollection();
            this.task_lst.dataProvider = this._taskCollArr;
            this.day_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            this.day_lst.itemRenderer = GuideTaskBtn;
            if (this._info) {
                this.setData(this._info);
            }
            else {
                NetMgr.tcpSend(new Cmd.GetGrowTaskInfoHpMatchCmd_C());
            }
        };
        GuideTaskPanel.prototype.setData = function (info) {
            this.giftCount_lbl.text = info.rewards + "福卡";
            this.day_lst.selectedIndex = info.day - 1;
            this._selectIndex = this.day_lst.selectedIndex;
            if (info.open == 0) {
                this.light_img.visible = false;
                this.pro_lbl.text = "\u8FDB\u5EA6:" + info.current + "/" + info.taskInfos.length;
            }
            else if (info.open == 1) {
                this.light_img.visible = true;
                this.pro_lbl.text = "可领取";
                egret.Tween.get(this.light_img, { loop: true }).to({ rotation: 360 }, 1000);
            }
            else if (info.open == 2) {
                this.light_img.visible = false;
                this.pro_lbl.text = "已领取";
            }
            this.reward_lbl.text = info.dayInfos[info.day - 1].reward + "福卡";
            this.day_lst.dataProvider = new eui.ArrayCollection(info.dayInfos);
            info.taskInfos.forEach(function (value, index) { value["index"] = index; });
            this._taskCollArr.source = info.taskInfos;
            this._taskCollArr.refresh();
        };
        GuideTaskPanel.prototype.onItemTap = function (evt) {
            var info = this.day_lst.selectedItem;
            if (info.day < this._info.day) {
                return;
            }
            else if (info.day == this._info.day) {
                if (this._info.open == 0) {
                    this.pro_lbl.text = "\u8FDB\u5EA6:" + this._info.current + "/" + this._info.taskInfos.length;
                }
                else if (this._info.open == 1) {
                    this.pro_lbl.text = "可领取";
                }
                else if (this._info.open == 2) {
                    this.pro_lbl.text = "已领取";
                }
                this.reward_lbl.text = info.reward + "福卡";
                this._info.taskInfos.forEach(function (value, index) { value["index"] = index; });
                this._taskCollArr.source = this._info.taskInfos;
                this._taskCollArr.refresh();
            }
            else if (info.day > this._info.day) {
                this.pro_lbl.text = "\u7B2C" + info.day + "\u5929\u89E3\u9501";
                this.reward_lbl.text = info.reward + "福卡";
                var config = ConfigMgr.getInstance().getTaskCfgByDay(info.day);
                var arr_1 = [];
                config.forEach(function (value, index) {
                    var a = new Cmd.GrowItem();
                    a.taskId = value.id;
                    a.status = 4;
                    a["index"] = index;
                    arr_1.push(a);
                });
                this._taskCollArr.source = arr_1;
                this._taskCollArr.refresh();
            }
            var child = this.day_lst.getChildAt(this._selectIndex);
            child.setBg(4);
            this._selectIndex = this.day_lst.selectedIndex;
            child = this.day_lst.getChildAt(this._selectIndex);
            child.setBg(3);
        };
        GuideTaskPanel.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.exchange_btn) {
                uniLib.PopUpMgr.removePopUp(this);
                LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
            }
            else if (evt.target == this.light_img) {
                var req = new Cmd.GetGrowTaskRewardHpMatchCmd_C();
                req.type = 2;
                NetMgr.tcpSend(req);
            }
        };
        GuideTaskPanel.prototype.onUpdate = function (evt) {
            this._info = evt.param;
            this.setData(evt.param);
        };
        GuideTaskPanel.prototype.close = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        GuideTaskPanel.prototype.destroy = function () {
            this._info = null;
            this._taskCollArr = null;
            this._selectIndex = null;
            egret.Tween.removeTweens(this.light_img);
            this.day_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            uniLib.Global.removeEventListener(guide.GuideConsts.GUIDE_TASK_DATA, this.onUpdate, this);
            this.exchange_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.light_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.light_img = null;
            this.removeEventListener(guide.GuideConsts.CLOSE_GUIDE_TASK, this.close, this);
            this.removeChildren();
        };
        return GuideTaskPanel;
    }(eui.Component));
    guide.GuideTaskPanel = GuideTaskPanel;
    __reflect(GuideTaskPanel.prototype, "guide.GuideTaskPanel");
    var GuideTaskItem = (function (_super) {
        __extends(GuideTaskItem, _super);
        function GuideTaskItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GuideTaskItemSkin";
            _this.once(egret.Event.REMOVED_FROM_STAGE, _this.destroy, _this);
            return _this;
        }
        GuideTaskItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.got_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.finish_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        GuideTaskItem.prototype.onTouch = function (evt) {
            if (evt.target == this.got_btn) {
                var config = ConfigMgr.getInstance().getTaskCfgById(this.data.taskId);
                LobbyModuleMgr.getInstance().openPanelBySkipType(config.skipType);
                this.dispatchEventWith(guide.GuideConsts.CLOSE_GUIDE_TASK, true);
            }
            else if (evt.target == this.finish_btn) {
                var req = new Cmd.GetGrowTaskRewardHpMatchCmd_C();
                req.type = 1;
                req.taskId = this.data.taskId;
                NetMgr.tcpSend(req);
            }
        };
        GuideTaskItem.prototype.getFreeReward = function () {
            var req = new Cmd.GetFreeDiamondLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        GuideTaskItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var config = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            var str = "";
            info.current != undefined && info.current != null && (str = "<font>(" + info.current + "/" + config.taskCondition + ")</font>");
            this.desc_lbl.textFlow = (new egret.HtmlTextParser).parser(config.taskDesc.indexOf("%a") == -1 ? config.taskDesc + str : config.taskDesc.replace("%a", config.taskCondition + "") + str);
            this.bg_img.source = info["index"] % 2 ? "guide_task_json.lb_cz_task_bg_2" : "guide_task_json.lb_cz_task_bg_1";
            this.icon_img.source = "guide_task_json." + config.taskIcon;
            this.num_lbl.text = config.taskReward[0].goodNbr + "";
            if (info.status == 1) {
                this.got_btn.visible = !uniLib.Global.isInGame;
                this.finish_btn.visible = false;
            }
            else if (info.status == 2) {
                this.got_btn.visible = false;
                this.finish_btn.enabled = true;
                this.finish_btn.visible = true;
            }
            else if (info.status == 3) {
                this.got_btn.visible = false;
                this.finish_btn.visible = true;
                this.finish_btn.enabled = false;
            }
            else if (info.status == 4) {
                this.got_btn.visible = false;
                this.finish_btn.visible = false;
            }
        };
        GuideTaskItem.prototype.destroy = function () {
            this.got_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.finish_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        return GuideTaskItem;
    }(eui.ItemRenderer));
    __reflect(GuideTaskItem.prototype, "GuideTaskItem");
    var GuideTaskBtn = (function (_super) {
        __extends(GuideTaskBtn, _super);
        function GuideTaskBtn() {
            var _this = _super.call(this) || this;
            _this.skinName = "GuideTaskBtnSkin";
            return _this;
        }
        GuideTaskBtn.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.reward_lbl.text = info.reward + "福卡";
            if (info.status == 1) {
                this.bg_img.source = "guide_task_json.lb_cz_day_3";
                this.day_lbl.text = "未完成";
                this.day_lbl.textColor = 0x8c8b8b;
                this.day_lbl.bold = false;
            }
            else if (info.status == 2) {
                this.bg_img.source = "guide_task_json.lb_cz_day_3";
                this.day_lbl.text = "\u5DF2\u9886\u53D6";
                this.day_lbl.textColor = 0x8c8b8b;
                this.day_lbl.bold = false;
            }
            else if (info.status == 3) {
                this.bg_img.source = "guide_task_json.lb_cz_day_1";
                this.day_lbl.text = "\u7B2C" + info.day + "\u5929";
                this.day_lbl.textColor = 0xff0f0f;
                this.day_lbl.bold = true;
            }
            else if (info.status == 4) {
                this.bg_img.source = "guide_task_json.lb_cz_day_2";
                this.day_lbl.text = "\u7B2C" + info.day + "\u5929";
                this.day_lbl.textColor = 0xbb6927;
                this.day_lbl.bold = false;
            }
        };
        GuideTaskBtn.prototype.setBg = function (status) {
            if (status == 3) {
                this.bg_img.source = "guide_task_json.lb_cz_day_1";
            }
            else if (status == 4) {
                this.bg_img.source = "guide_task_json.lb_cz_day_2";
            }
        };
        return GuideTaskBtn;
    }(eui.ItemRenderer));
    __reflect(GuideTaskBtn.prototype, "GuideTaskBtn");
})(guide || (guide = {}));
