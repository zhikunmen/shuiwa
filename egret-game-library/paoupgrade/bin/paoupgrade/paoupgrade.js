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
/**
 * 游戏内任务面板
 */
var paoupgrade;
(function (paoupgrade) {
    var PaoBeiPanel = (function (_super) {
        __extends(PaoBeiPanel, _super);
        function PaoBeiPanel(guninfo) {
            var _this = _super.call(this) || this;
            if (guninfo)
                _this._guninfo = guninfo;
            _this.skinName = "PaoBeiPanelSkin";
            return _this;
        }
        PaoBeiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.Global.addEventListener(paoupgrade.CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
            this._upBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
            this.paobei_lst.itemRenderer = paoupgrade.PaoBeiItem;
            if (this._guninfo)
                this.gunTimeChange(this._guninfo);
            else {
                uniLib.Global.addEventListener(paoupgrade.CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
                var req = new Cmd.RequestFishGunInfoCmd_C();
                NetMgr.tcpSend(req);
            }
        };
        PaoBeiPanel.prototype.touchChange = function (evt) {
            if (evt.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._upBtn) {
                var difference = this._guninfo.cost - this._guninfo.itemnum;
                var desc = "是否使用" + difference + "钻石替代" + difference + "升级水晶进行炮台升级？";
                if (uniLib.UserInfo.chips < difference) {
                    desc = "还差" + difference + "个钻石才能替代升级水晶进行炮倍升级，是否前往购买？";
                }
                var confirm_1 = new commonConfirm.ConfirmPanel(desc, null, null, function () {
                    if (uniLib.UserInfo.chips < difference) {
                        LobbyModuleMgr.getInstance().showMarketPanel(0);
                    }
                    else {
                        var req = new Cmd.UnlockFishGunCmd_C();
                        NetMgr.tcpSend(req);
                    }
                }, function () { }, this);
                uniLib.PopUpMgr.addPopUp(confirm_1, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
        };
        PaoBeiPanel.prototype.onMsgReceiveHandler = function (e) {
            if (e.type == paoupgrade.CmdConstant.GET_FISH_GUNINFO) {
                var rev = e.param;
                this._guninfo = rev.guninfo;
                this.gunTimeChange(this._guninfo);
            }
            else if (e.type == paoupgrade.CmdConstant.UNLOCK_FISHGUN) {
                var rev = e.param;
                this._guninfo = rev.guninfo;
                this.gunTimeChange(this._guninfo);
            }
        };
        PaoBeiPanel.prototype.gunTimeChange = function (guninfo) {
            var list = [];
            var tableFishGunData = RES.getRes("TableFishGun_json");
            for (var i = 0; i < tableFishGunData.length; i++) {
                if (tableFishGunData[i].gunTime > guninfo.ctimes) {
                    var gun = new table.TableFishGun();
                    gun.unlockDiamon = tableFishGunData[i - 1].unlockDiamon;
                    gun.unlockGold = tableFishGunData[i - 1].unlockGold;
                    gun.gunTime = tableFishGunData[i].gunTime;
                    list.push(gun);
                    if (list.length == 3)
                        break;
                }
            }
            this.paobei_lst.dataProvider = new eui.ArrayCollection(list);
            this.pao_bar.minimum = 0;
            this.pao_bar.maximum = guninfo.cost;
            this.pao_bar.value = guninfo.itemnum;
            this.progress_txt.text = guninfo.itemnum + "/" + guninfo.cost;
            this.progress_txt.anchorOffsetX = this.progress_txt.width >> 1;
        };
        PaoBeiPanel.prototype.destroy = function () {
            uniLib.Global.removeEventListener(paoupgrade.CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
            uniLib.Global.removeEventListener(paoupgrade.CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
            this._upBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchChange, this);
        };
        return PaoBeiPanel;
    }(eui.ItemRenderer));
    paoupgrade.PaoBeiPanel = PaoBeiPanel;
    __reflect(PaoBeiPanel.prototype, "paoupgrade.PaoBeiPanel");
})(paoupgrade || (paoupgrade = {}));
/**
 * 炮台升级面板
 */
var paoupgrade;
(function (paoupgrade) {
    var FishPerComponent = (function (_super) {
        __extends(FishPerComponent, _super);
        function FishPerComponent() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        FishPerComponent.prototype.initUI = function () {
            if (this.upgrade == null) {
                this.upgrade = new paoupgrade.PaoTaiUpgrade();
                this.upgrade.y = 93;
                this.addChild(this.upgrade);
            }
            if (this.redpack == null && uniLib.Global.is_sandbox == 0) {
                this.redpack = new paoupgrade.TakeRedPack();
                this.addChild(this.redpack);
                this.redpack.y = 207;
            }
            if (this.turntable == null && uniLib.Global.is_sandbox == 0) {
                this.turntable = new paoupgrade.GameInTurnTable();
                this.addChild(this.turntable);
                this.turntable.y = 320;
            }
            if (this.award == null && uniLib.Global.is_sandbox == 0) {
                this.award = new paoupgrade.UpgradeOtherAward();
                this.award.x = 37;
                this.addChild(this.award);
            }
        };
        FishPerComponent.prototype.destroy = function () {
            if (this.award) {
                this.award.destroy();
                this.award = null;
            }
            if (this.upgrade) {
                this.upgrade.destroy();
                this.upgrade = null;
            }
            if (this.redpack) {
                this.redpack.destroy();
                this.redpack = null;
            }
            if (this.turntable) {
                this.turntable.destroy();
                this.turntable = null;
            }
            this.removeChildren();
        };
        return FishPerComponent;
    }(egret.DisplayObjectContainer));
    paoupgrade.FishPerComponent = FishPerComponent;
    __reflect(FishPerComponent.prototype, "paoupgrade.FishPerComponent");
})(paoupgrade || (paoupgrade = {}));
/**
 * 游戏内任务面板
 */
var paoupgrade;
(function (paoupgrade) {
    var GameInTaskPanel = (function (_super) {
        __extends(GameInTaskPanel, _super);
        function GameInTaskPanel() {
            var _this = _super.call(this) || this;
            _this.posX = [-239, 0, 239];
            _this._reqType = 0;
            _this.effectType = 0;
            _this.skinName = "GameInTaskSkin";
            return _this;
        }
        GameInTaskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.taskItems = [this.item1, this.item2];
            this.addEvents();
            this.initData(1);
        };
        GameInTaskPanel.prototype.addEvents = function () {
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.left_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.right_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.scroll.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener("OnceTaskLobby", this.onMsgReceiveHandler, this);
            uniLib.Global.addEventListener("IntoFreeGold", this.onMsgReceiveHandler, this);
        };
        GameInTaskPanel.prototype.initData = function (type) {
            if (type == 1) {
                var req1 = new Cmd.RequestOnceTaskLobbyCmd_C();
                NetMgr.tcpSend(req1);
            }
            else if (type == 2) {
                var req2 = new Cmd.IntoFreeGoldLobbyCmd_C();
                NetMgr.tcpSend(req2);
            }
            this._reqType = type;
        };
        GameInTaskPanel.prototype.onMsgReceiveHandler = function (evt) {
            if (evt.type == "OnceTaskLobby") {
                var curData = evt.param;
                var tasks = curData.fktasks.concat(curData.qhtasks).concat(curData.diamondtasks);
                this.updateTaskList(tasks);
            }
            else if (evt.type == "IntoFreeGold") {
                var curData1 = evt.param;
                if (curData1.otherTaskInfo && curData1.otherTaskInfo.length > 0) {
                    this.updateTaskList(curData1.otherTaskInfo);
                }
                else {
                    this.destroy();
                }
            }
        };
        GameInTaskPanel.prototype.updateTaskList = function (tasks) {
            this.allTasks = [];
            for (var i = 0; i < tasks.length; i++) {
                if (tasks[i] && tasks[i].taskStatus < 3)
                    this.allTasks.push(tasks[i]);
            }
            this.allTasks.sort(function (a, b) {
                if (a.taskStatus == 2)
                    if (a.taskId > b.taskId)
                        return -2;
                    else
                        return -3;
                else {
                    if (a.taskId > b.taskId)
                        return 1;
                    else if (a.taskId == b.taskId)
                        return 0;
                    return -1;
                }
            });
            if (this.allTasks.length > 0) {
                if (this._curTaskId) {
                    var ind = this.getIndex(this._curTaskId);
                    this.index = ind == -1 ? 0 : ind;
                }
                else {
                    this.index = 0;
                    this.item_index = 0;
                }
                this._curTaskId = this.allTasks[this.index].taskId;
                var finish = this.taskItems[this.item_index].setInfo(this.allTasks[this.index]);
                if (finish) {
                    if (this._receivedTaskId == this._curTaskId) {
                        if (this.effectType != 2)
                            this.playWanchenEffect(2);
                    }
                    else {
                        this._receivedTaskId = this._curTaskId;
                        this.playWanchenEffect(1);
                    }
                }
                else
                    this.effectStop();
            }
            else {
                if (this._reqType == 1)
                    this.initData(2);
                else if (this._reqType == 2)
                    this.destroy();
            }
        };
        GameInTaskPanel.prototype.getIndex = function (taskId) {
            for (var i = 0; i < this.allTasks.length; i++) {
                if (this.allTasks[i].taskId == taskId)
                    return i;
            }
            return -1;
        };
        GameInTaskPanel.prototype.onTouchTapHandler = function (evt) {
            var _this = this;
            var target = evt.currentTarget;
            if (target == this.left_btn) {
                if (this.index == 0 || this.isTween) {
                    return;
                }
                this.index--;
                this.item_index = 1 - this.item_index;
                this.taskItems[this.item_index].x = this.posX[2];
                this._curTaskId = this.allTasks[this.index].taskId;
                var finish1 = this.taskItems[this.item_index].setInfo(this.allTasks[this.index]);
                this.isTween = true;
                egret.Tween.get(this.taskItems[this.item_index]).to({ x: this.posX[1] }, 200).call(function () {
                    _this.isTween = false;
                    finish1 ? _this.playWanchenEffect(2) : _this.effectStop();
                });
                egret.Tween.get(this.taskItems[1 - this.item_index]).to({ x: this.posX[0] }, 200);
            }
            else if (target == this.right_btn) {
                if (this.allTasks.length < 2 || this.index == this.allTasks.length - 1 || this.isTween) {
                    return;
                }
                this.index++;
                this.item_index = 1 - this.item_index;
                this.taskItems[this.item_index].x = this.posX[0];
                this._curTaskId = this.allTasks[this.index].taskId;
                var finish2 = this.taskItems[this.item_index].setInfo(this.allTasks[this.index]);
                this.isTween = true;
                this.effectStop();
                egret.Tween.get(this.taskItems[this.item_index]).to({ x: this.posX[1] }, 200).call(function () {
                    _this.isTween = false;
                    finish2 ? _this.playWanchenEffect(2) : _this.effectStop();
                });
                egret.Tween.get(this.taskItems[1 - this.item_index]).to({ x: this.posX[2] }, 200);
            }
            else if (target == this.scroll) {
                LobbyModuleMgr.getInstance().showNewFuliPanel(this.allTasks[this.index].taskId);
            }
            else if (target == this.close_btn) {
                egret.Tween.get(this.group).to({ y: -112 }, 200).call(function () { _this.open_btn.visible = true; });
            }
            else if (target == this.open_btn) {
                this.open_btn.visible = false;
                egret.Tween.get(this.group).to({ y: 0 }, 200);
            }
        };
        GameInTaskPanel.prototype.playWanchenEffect = function (type) {
            if (this._wanchengEffect == null) {
                this._wanchengEffect = uniLib.DragonUtils.createDragonBonesDisplay("renwuwancheng_ske_json", "renwuwancheng_tex_json", "renwuwancheng_tex_png", uniLib.DragonType.ARMATURE);
                this._wanchengEffect.touchEnabled = false;
            }
            if (this.effectType == 1)
                this._wanchengEffect.removeEventListener(egret.Event.LOOP_COMPLETE, this.effectComplete, this);
            this.effectType = type;
            this._wanchengEffect.display.x = 135;
            this._wanchengEffect.display.y = 42;
            this.group.addChild(this._wanchengEffect.display);
            if (this.effectType == 1)
                this._wanchengEffect.addEventListener(egret.Event.LOOP_COMPLETE, this.effectComplete, this);
            uniLib.DragonUtils.runDragonBonesArmature(this._wanchengEffect, this.effectType + "", this.effectType == 1 ? 1 : 0);
        };
        GameInTaskPanel.prototype.effectComplete = function (e) {
            this._wanchengEffect.removeEventListener(egret.Event.LOOP_COMPLETE, this.effectComplete, this);
            this.effectType = 2;
            uniLib.DragonUtils.runDragonBonesArmature(this._wanchengEffect, this.effectType + "", 0);
        };
        GameInTaskPanel.prototype.effectStop = function () {
            if (this._wanchengEffect) {
                this._wanchengEffect.animation.stop();
                uniLib.DisplayUtils.removeFromParent(this._wanchengEffect.display);
            }
        };
        GameInTaskPanel.prototype.removeEvents = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.open_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.left_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.right_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.scroll.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener("OnceTaskLobby", this.onMsgReceiveHandler, this);
            uniLib.Global.removeEventListener("IntoFreeGold", this.onMsgReceiveHandler, this);
        };
        GameInTaskPanel.prototype.destroy = function () {
            this.taskItems = null;
            this.isTween = false;
            if (this._wanchengEffect) {
                uniLib.DisplayUtils.removeFromParent(this._wanchengEffect.display);
                uniLib.DragonUtils.destoryDragonBonesArmature(this._wanchengEffect, this.effectType + "");
                this._wanchengEffect = null;
            }
            egret.Tween.removeTweens(this.item1);
            egret.Tween.removeTweens(this.item2);
            egret.Tween.removeTweens(this.group);
            this.removeEvents();
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GameInTaskPanel;
    }(eui.Component));
    paoupgrade.GameInTaskPanel = GameInTaskPanel;
    __reflect(GameInTaskPanel.prototype, "paoupgrade.GameInTaskPanel");
})(paoupgrade || (paoupgrade = {}));
/**
 * 游戏内红包
 */
var paoupgrade;
(function (paoupgrade) {
    var GameInTurnTable = (function (_super) {
        __extends(GameInTurnTable, _super);
        function GameInTurnTable() {
            var _this = _super.call(this) || this;
            _this.skinName = "GameInTurnTableSkin";
            return _this;
        }
        GameInTurnTable.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.touchEnabled = true;
            this.receive.touchEnabled = false;
            this.addEvents();
            this.getReward(3);
        };
        GameInTurnTable.prototype.addEvents = function () {
            uniLib.Global.addEventListener("turntableinfo", this.onUpdateInfo, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        GameInTurnTable.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener("turntableinfo", this.onUpdateInfo, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            if (this.timer)
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
        };
        GameInTurnTable.prototype.onUpdateInfo = function (evt) {
            this._info = evt.param;
            this.countDown = this._info.countDownSec;
            if (this.countDown <= 0) {
                if (this.timer)
                    this.timer.stop();
                if (this.countDown == -1) {
                    this.destroy();
                }
                else if (this.countDown == 0) {
                    // this.turn_table.label = "免费抽奖";
                    this.addAnim();
                    this.turn_table.visible = false;
                }
            }
            else {
                this.turn_table.visible = true;
                this.initTime(this.countDown);
                if (this.zhuanpan_btn) {
                    this.zhuanpan_btn.animation.stop();
                    uniLib.DisplayUtils.removeFromParent(this.zhuanpan_btn.display);
                    this.receive.visible = false;
                }
            }
        };
        GameInTurnTable.prototype.initTime = function (count) {
            if (this.timer == null) {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
            this.timer.reset();
            this.timer.start();
            this.turn_table.label = uniLib.StringUtils.formatMMSS(this.countDown);
        };
        GameInTurnTable.prototype.addAnim = function () {
            if (this.zhuanpan_btn == null) {
                var resName = "game_zhuanpan";
                this.zhuanpan_btn = uniLib.DragonUtils.createDragonBonesDisplay(resName + "_ske_json", resName + "_tex_json", resName + "_tex_png", uniLib.DragonType.ARMATURE);
            }
            this.addChildAt(this.zhuanpan_btn.display, 0);
            this.zhuanpan_btn.display.x = 37;
            this.zhuanpan_btn.display.y = 42;
            uniLib.DragonUtils.runDragonBonesArmature(this.zhuanpan_btn, "newAnimation", 0);
            this.receive.visible = true;
        };
        GameInTurnTable.prototype.onTouchHandle = function (e) {
            if (this.countDown == 0)
                LobbyModuleMgr.getInstance().showGameInTurn(this._info);
            else
                uniLib.TipsUtils.showTipsDownToUp("多玩一会儿游戏才能抽奖哦！");
        };
        GameInTurnTable.prototype.onTimerHandler = function (evt) {
            if (this.countDown > 0) {
                this.countDown--;
                this.turn_table.label = uniLib.StringUtils.formatMMSS(this.countDown);
            }
            else {
                this.timer.stop();
                // this.turn_table.label = "免费抽奖";
                this.addAnim();
                this.turn_table.visible = false;
                this.receive.visible = true;
            }
        };
        GameInTurnTable.prototype.getReward = function (opType) {
            var req = new Cmd.GetInfoTurnTableCmd_C();
            req.opType = opType;
            NetMgr.tcpSend(req);
        };
        GameInTurnTable.prototype.destroy = function () {
            if (this.zhuanpan_btn) {
                uniLib.DragonUtils.destoryDragonBonesArmature(this.zhuanpan_btn, "newAnimation");
                uniLib.DisplayUtils.removeFromParent(this.zhuanpan_btn.display);
            }
            this.removeEvents();
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GameInTurnTable;
    }(eui.Component));
    paoupgrade.GameInTurnTable = GameInTurnTable;
    __reflect(GameInTurnTable.prototype, "paoupgrade.GameInTurnTable");
})(paoupgrade || (paoupgrade = {}));
/**
 * 游戏内红包
 */
var paoupgrade;
(function (paoupgrade) {
    var NoviceRedPackageBtn = (function (_super) {
        __extends(NoviceRedPackageBtn, _super);
        function NoviceRedPackageBtn() {
            var _this = _super.call(this) || this;
            _this.skinName = "NoviceRedPackageBtnSkin";
            return _this;
        }
        NoviceRedPackageBtn.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.touchEnabled = true;
            this.touchChildren = false;
            this.updateData();
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUpRedPack, this);
        };
        NoviceRedPackageBtn.prototype.onUpRedPack = function (evt) {
            if (evt.param == uniLib.UserInfoEnum.GIFTCOUPON) {
                this.updateData();
            }
        };
        NoviceRedPackageBtn.prototype.updateData = function () {
            this.novice_bar.minimum = 0;
            var giftCoupon = uniLib.UserInfo.giftCoupon;
            this.novice_bar.value = giftCoupon;
            if (giftCoupon > 3000) {
                this.novice_bar.maximum = giftCoupon;
                this.pro_lbl.text = "3000/3000";
            }
            else {
                this.novice_bar.maximum = 3000;
                this.pro_lbl.text = giftCoupon + "/3000";
            }
        };
        NoviceRedPackageBtn.prototype.destroy = function () {
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUpRedPack, this);
            this.removeChildren();
        };
        return NoviceRedPackageBtn;
    }(eui.Component));
    paoupgrade.NoviceRedPackageBtn = NoviceRedPackageBtn;
    __reflect(NoviceRedPackageBtn.prototype, "paoupgrade.NoviceRedPackageBtn");
})(paoupgrade || (paoupgrade = {}));
/**
 * 游戏内任务面板
 */
var paoupgrade;
(function (paoupgrade) {
    var PaoBeiItem = (function (_super) {
        __extends(PaoBeiItem, _super);
        function PaoBeiItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "PaoBeiItemSkin";
            return _this;
        }
        PaoBeiItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var conf = this.data;
            this.pao_text.text = conf.gunTime + "倍";
            this.reward_num.text = "x" + conf.unlockGold;
            this.need_num.text = "x" + conf.unlockDiamon;
        };
        return PaoBeiItem;
    }(eui.ItemRenderer));
    paoupgrade.PaoBeiItem = PaoBeiItem;
    __reflect(PaoBeiItem.prototype, "paoupgrade.PaoBeiItem");
})(paoupgrade || (paoupgrade = {}));
/**
 * 游戏内任务面板
 */
var paoupgrade;
(function (paoupgrade) {
    var GameInTaskItem = (function (_super) {
        __extends(GameInTaskItem, _super);
        function GameInTaskItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GameInTaskItemSkin";
            return _this;
        }
        GameInTaskItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.task_bar.minimum = 0;
        };
        GameInTaskItem.prototype.setInfo = function (info) {
            var task = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            this.reward_icon.source = "game_prop_json.bag_daoju_" + task.taskReward[0].goodId;
            commonConfirm.ResUtil.limitImageSize(this.reward_icon, 63);
            if (task.taskReward[0].goodNbr >= 10000)
                this.reward_num.text = (task.taskReward[0].goodNbr / 10000).toFixed(2) + "万";
            else
                this.reward_num.text = task.taskReward[0].goodNbr + "";
            this.task_title.text = task.taskDesc;
            this.task_progress.text = info.current + "/" + task.taskCondition;
            // this.task_bar.width = (info.current/task.taskCondition)*168;
            this.task_bar.maximum = task.taskCondition;
            this.task_bar.value = info.current;
            return info.taskStatus == Cmd.TaskStatus.Task_Status_Complete;
        };
        GameInTaskItem.prototype.destroy = function () {
            this.removeChildren();
        };
        return GameInTaskItem;
    }(eui.Component));
    paoupgrade.GameInTaskItem = GameInTaskItem;
    __reflect(GameInTaskItem.prototype, "paoupgrade.GameInTaskItem");
})(paoupgrade || (paoupgrade = {}));
var paoupgrade;
(function (paoupgrade) {
    var PaopgradeConsts = (function () {
        function PaopgradeConsts() {
        }
        PaopgradeConsts.RES_JSON = "resource/paoupgrade/paoupgrade.res_7c3fb449.json";
        PaopgradeConsts.THM_JSON = "resource/paoupgrade/gameEui_b8de3802.json";
        /**
         * 公共guide需要加载的资源组
         */
        PaopgradeConsts.PUB_PAOUPGRADE = "pub_paoupgrade";
        PaopgradeConsts.PUB_GAMEINTASK = "pub_gameintask";
        PaopgradeConsts.PUB_PAOBEI = "pub_paobei";
        return PaopgradeConsts;
    }());
    paoupgrade.PaopgradeConsts = PaopgradeConsts;
    __reflect(PaopgradeConsts.prototype, "paoupgrade.PaopgradeConsts");
})(paoupgrade || (paoupgrade = {}));
/**
 * 炮台升级面板
 */
var paoupgrade;
(function (paoupgrade) {
    var PaoTaiUpgrade = (function (_super) {
        __extends(PaoTaiUpgrade, _super);
        function PaoTaiUpgrade() {
            var _this = _super.call(this) || this;
            _this._opening = true;
            _this._tweening = false;
            _this.skinName = "PaoTaiUpgradeSkin";
            return _this;
        }
        PaoTaiUpgrade.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            this.initData();
            this.group.touchChildren = false;
            this.group.touchEnabled = true;
        };
        PaoTaiUpgrade.prototype.addEvents = function () {
            this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
            uniLib.Global.addEventListener(paoupgrade.CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
            uniLib.Global.addEventListener(paoupgrade.CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
        };
        PaoTaiUpgrade.prototype.initData = function () {
            var req = new Cmd.RequestFishGunInfoCmd_C();
            NetMgr.tcpSend(req);
        };
        PaoTaiUpgrade.prototype.onUserInfoChanged = function (e) {
            if (this._guninfo)
                this.updateReward();
        };
        PaoTaiUpgrade.prototype.onMsgReceiveHandler = function (e) {
            if (e.type == paoupgrade.CmdConstant.GET_FISH_GUNINFO) {
                var rev = e.param;
                this._guninfo = rev.guninfo;
                this.unlock_gun.text = "解锁" + this._guninfo.ntimes + "倍炮";
                this.unlock_gun.anchorOffsetX = this.unlock_gun.width >> 1;
                this.updateReward();
            }
            else if (e.type == paoupgrade.CmdConstant.UNLOCK_FISHGUN) {
                var rev1 = e.param;
                this._guninfo = rev1.guninfo;
                this.unlock_gun.text = "解锁" + this._guninfo.ntimes + "倍炮";
                this.unlock_gun.anchorOffsetX = this.unlock_gun.width >> 1;
                this.updateReward();
                //飞金币 rev1.reward
            }
            if (this._guninfo.ntimes == undefined) {
                uniLib.DisplayUtils.removeFromParent(this);
                this.destroy();
                return;
            }
        };
        PaoTaiUpgrade.prototype.playFinishEffect = function () {
            if (this._finishEffect == null) {
                this._finishEffect = uniLib.DragonUtils.createDragonBonesDisplay("finish_ske_json", "finish_tex_json", "finish_tex_png", uniLib.DragonType.ARMATURE);
                this._finishEffect.touchEnabled = false;
            }
            this._finishEffect.display.x = 95;
            this._finishEffect.display.y = 35;
            this.group.addChild(this._finishEffect.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._finishEffect, "newAnimation", 0);
        };
        PaoTaiUpgrade.prototype.updateReward = function () {
            if (this._guninfo.itemnum >= this._guninfo.cost) {
                this.unlock_gold.text = "领取" + this._guninfo.reward + "金币";
                this.playFinishEffect();
                this.progress_group.visible = false;
                this._canReward = true;
            }
            else {
                if (this._finishEffect) {
                    this._finishEffect.animation.stop();
                    uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                }
                this.unlock_gold.text = "";
                this.progress_group.visible = true;
                this.progress_txt.text = this._guninfo.itemnum + "/" + this._guninfo.cost;
                this.pro_bar.minimum = 0;
                this.pro_bar.maximum = this._guninfo.cost;
                this.pro_bar.value = this._guninfo.itemnum;
                this._canReward = false;
            }
        };
        PaoTaiUpgrade.prototype.onTouchTapHandler = function (evt) {
            var _this = this;
            if (evt.target == this.open_btn) {
                if (this._tweening)
                    return;
                this._tweening = true;
                if (this._opening) {
                    egret.Tween.get(this.group).to({ scaleX: 0.01, scaleY: 0.01 }, 200).call(function () {
                        _this._opening = false;
                        _this._tweening = false;
                        _this.group.visible = false;
                    });
                }
                else {
                    this.group.visible = true;
                    egret.Tween.get(this.group).to({ scaleX: 1, scaleY: 1 }, 200).call(function () { _this._opening = true; _this._tweening = false; });
                }
            }
            else if (evt.target == this.group) {
                if (this._canReward) {
                    var req = new Cmd.UnlockFishGunCmd_C();
                    NetMgr.tcpSend(req);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(paoupgrade.PaopgradeConsts.PUB_PAOBEI, function () {
                        var panel = new paoupgrade.PaoBeiPanel(_this._guninfo);
                        panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                        uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 874 * panel.scaleX, 544);
                    });
                }
            }
        };
        PaoTaiUpgrade.prototype.removeEvents = function () {
            this.open_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
            uniLib.Global.removeEventListener(paoupgrade.CmdConstant.GET_FISH_GUNINFO, this.onMsgReceiveHandler, this);
            uniLib.Global.removeEventListener(paoupgrade.CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
        };
        PaoTaiUpgrade.prototype.destroy = function () {
            if (this._finishEffect) {
                uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                uniLib.DragonUtils.destoryDragonBonesArmature(this._finishEffect, "newAnimation");
                this._finishEffect = null;
            }
            this._tweening = false;
            this.removeEvents();
            egret.Tween.removeTweens(this.group);
            this.removeChildren();
        };
        return PaoTaiUpgrade;
    }(eui.Component));
    paoupgrade.PaoTaiUpgrade = PaoTaiUpgrade;
    __reflect(PaoTaiUpgrade.prototype, "paoupgrade.PaoTaiUpgrade");
})(paoupgrade || (paoupgrade = {}));
/**
 * 炮台升级面板
 */
var paoupgrade;
(function (paoupgrade) {
    var TakeRedPack = (function (_super) {
        __extends(TakeRedPack, _super);
        function TakeRedPack() {
            var _this = _super.call(this) || this;
            _this._opening = true;
            _this._tweening = false;
            _this.skinName = "TakeRedPackSkin";
            return _this;
        }
        TakeRedPack.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            this.initData();
            this.group.touchChildren = false;
            this.group.touchEnabled = true;
        };
        TakeRedPack.prototype.addEvents = function () {
            this.open_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener("get_fish_luckydraw", this.onMsgReceiveHandler, this);
        };
        TakeRedPack.prototype.initData = function () {
            var req = new Cmd.GetFishLuckyDrawInfoLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        TakeRedPack.prototype.onMsgReceiveHandler = function (e) {
            this._fishinfo = e.param;
            var bonus = this._fishinfo.bonus + "";
            if (this._fishinfo.bonus > 10000)
                bonus = this._fishinfo.bonus / 10000 + "万";
            this.unlock_gun.text = bonus;
            this.updateReward();
        };
        TakeRedPack.prototype.playFinishEffect = function () {
            if (this._finishEffect == null) {
                this._finishEffect = uniLib.DragonUtils.createDragonBonesDisplay("finish_ske_json", "finish_tex_json", "finish_tex_png", uniLib.DragonType.ARMATURE);
                this._finishEffect.touchEnabled = false;
            }
            this._finishEffect.display.x = 95;
            this._finishEffect.display.y = 35;
            this.group.addChild(this._finishEffect.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._finishEffect, "newAnimation", 0);
        };
        TakeRedPack.prototype.updateReward = function () {
            var _this = this;
            if (this._fishinfo.killNum >= 5) {
                this.unlock_gold.visible = true;
                this.playFinishEffect();
                this.progress_group.visible = false;
                if (!this._opening) {
                    this.group.visible = true;
                    egret.Tween.get(this.group).to({ scaleX: 1, scaleY: 1 }, 200).call(function () { _this._opening = true; _this._tweening = false; });
                }
            }
            else {
                if (this._finishEffect) {
                    this._finishEffect.animation.stop();
                    uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                }
                this.unlock_gold.visible = false;
                this.progress_group.visible = true;
                this.progress_txt.text = this._fishinfo.killNum + "/" + 5;
                this.pro_bar.minimum = 0;
                this.pro_bar.maximum = 5;
                this.pro_bar.value = this._fishinfo.killNum;
            }
        };
        TakeRedPack.prototype.onTouchTapHandler = function (evt) {
            var _this = this;
            if (evt.target == this.open_btn) {
                if (this._tweening)
                    return;
                this._tweening = true;
                if (this._opening) {
                    egret.Tween.get(this.group).to({ scaleX: 0.01, scaleY: 0.01 }, 200).call(function () {
                        _this._opening = false;
                        _this._tweening = false;
                        _this.group.visible = false;
                    });
                }
                else {
                    this.group.visible = true;
                    egret.Tween.get(this.group).to({ scaleX: 1, scaleY: 1 }, 200).call(function () { _this._opening = true; _this._tweening = false; });
                }
            }
            else if (evt.target == this.group) {
                LobbyModuleMgr.getInstance().showFishDraw(this._fishinfo);
            }
        };
        TakeRedPack.prototype.removeEvents = function () {
            this.open_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            this.group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener("get_fish_luckydraw", this.onMsgReceiveHandler, this);
        };
        TakeRedPack.prototype.destroy = function () {
            if (this._finishEffect) {
                uniLib.DisplayUtils.removeFromParent(this._finishEffect.display);
                uniLib.DragonUtils.destoryDragonBonesArmature(this._finishEffect, "newAnimation");
                this._finishEffect = null;
            }
            this._tweening = false;
            this.removeEvents();
            egret.Tween.removeTweens(this.group);
            this.removeChildren();
        };
        return TakeRedPack;
    }(eui.Component));
    paoupgrade.TakeRedPack = TakeRedPack;
    __reflect(TakeRedPack.prototype, "paoupgrade.TakeRedPack");
})(paoupgrade || (paoupgrade = {}));
/**
 * 游戏内任务面板
 */
var paoupgrade;
(function (paoupgrade) {
    var UpgradeOtherAward = (function (_super) {
        __extends(UpgradeOtherAward, _super);
        function UpgradeOtherAward() {
            var _this = _super.call(this) || this;
            _this.skinName = "UpgradeOtherAwardSkin";
            return _this;
        }
        UpgradeOtherAward.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
            this.addEvents();
            this.groupRect = new egret.Rectangle(0, 0, this.goodGroup.width, this.goodGroup.height);
            this.paopao.touchEnabled = true;
            this.goodGroup.touchEnabled = false;
            this.goodGroup.touchChildren = false;
        };
        UpgradeOtherAward.prototype.initUI = function () {
            this.tableFishGuns = [];
            var tableFishData = RES.getRes("TableFishGun_json");
            for (var i = 0; i < tableFishData.length; i++) {
                if (tableFishData[i].otherAward.length > 0)
                    this.tableFishGuns.push(tableFishData[i]);
            }
            var info = this.gunTimeChange(MJLobbyData.getInstance().fishGunBei);
            this.changeReward(info);
        };
        UpgradeOtherAward.prototype.addEvents = function () {
            this.paopao.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.addEventListener(paoupgrade.CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
        };
        UpgradeOtherAward.prototype.gunTimeChange = function (gunbei) {
            var length = this.tableFishGuns.length;
            if (gunbei <= this.tableFishGuns[0].gunTime) {
                return this.tableFishGuns[0].otherAward[0];
            }
            else if (gunbei > this.tableFishGuns[length - 1].gunTime) {
                return null;
            }
            else {
                for (var i = 0; i < this.tableFishGuns.length - 2; i++) {
                    if (this.tableFishGuns[i].gunTime < gunbei && gunbei <= this.tableFishGuns[i + 1].gunTime) {
                        return this.tableFishGuns[i + 1].otherAward[0];
                    }
                }
            }
        };
        UpgradeOtherAward.prototype.changeReward = function (info) {
            if (info == null) {
                this.destroy();
                return;
            }
            this.goodIcon.source = "game_prop_json.bag_daoju_" + info.goodId;
            commonConfirm.ResUtil.limitImageSize(this.goodIcon, 60);
            this.goodIcon.anchorOffsetX = this.goodIcon.width >> 1;
            this.goodIcon.anchorOffsetY = this.goodIcon.height >> 1;
            this.goodItem.source = "game_prop_json.bag_daoju_" + info.goodId;
            commonConfirm.ResUtil.limitImageSize(this.goodItem, 100);
            this.goodItem.anchorOffsetX = this.goodItem.width >> 1;
            this.goodItem.anchorOffsetY = this.goodItem.height >> 1;
            var conf = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.goodName.text = conf.goodName;
            this.goodNum.text = "x" + info.goodNbr;
            this.goodDesc.text = conf.goodIntroduction;
            this.goodNum1.text = info.goodNbr + "";
            this.goodNum1.anchorOffsetX = this.goodNum1.width >> 1;
        };
        UpgradeOtherAward.prototype.onTouchTapHandler = function (evt) {
            var _this = this;
            this.goodGroup.visible = !this.goodGroup.visible;
            if (this.goodGroup.visible) {
                egret.setTimeout(function () {
                    egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.stageTouchHandler, _this);
                }, this, 10);
            }
        };
        UpgradeOtherAward.prototype.stageTouchHandler = function (e) {
            var point = this.goodGroup.globalToLocal(e.stageX, e.stageY);
            if (!this.groupRect.containsPoint(point)) {
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageTouchHandler, this);
                this.goodGroup.visible = false;
            }
        };
        UpgradeOtherAward.prototype.onMsgReceiveHandler = function (e) {
            var rev1 = e.param;
            var info = this.gunTimeChange(rev1.guninfo.ctimes);
            this.changeReward(info);
        };
        UpgradeOtherAward.prototype.removeEvents = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.stageTouchHandler, this);
            this.paopao.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTapHandler, this);
            uniLib.Global.removeEventListener(paoupgrade.CmdConstant.UNLOCK_FISHGUN, this.onMsgReceiveHandler, this);
        };
        UpgradeOtherAward.prototype.destroy = function () {
            this.removeEvents();
            this.removeChildren();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return UpgradeOtherAward;
    }(eui.Component));
    paoupgrade.UpgradeOtherAward = UpgradeOtherAward;
    __reflect(UpgradeOtherAward.prototype, "paoupgrade.UpgradeOtherAward");
})(paoupgrade || (paoupgrade = {}));
var paoupgrade;
(function (paoupgrade) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**返回子弹信息*/
        CmdConstant.GET_FISH_GUNINFO = "get_fish_guninfo";
        /**解锁高倍子弹*/
        CmdConstant.UNLOCK_FISHGUN = "unlock_fishgun";
        return CmdConstant;
    }());
    paoupgrade.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "paoupgrade.CmdConstant");
})(paoupgrade || (paoupgrade = {}));
var PaoUpgradeReciveMgr = (function () {
    function PaoUpgradeReciveMgr() {
    }
    return PaoUpgradeReciveMgr;
}());
__reflect(PaoUpgradeReciveMgr.prototype, "PaoUpgradeReciveMgr");
var Cmd;
(function (Cmd) {
    /**VIP-请求数据 */
    function OnRequestFishGunInfoCmd_S(rev) {
        MJLobbyData.getInstance().fishGunBei = rev.guninfo.ctimes;
        uniLib.Global.dispatchEvent(paoupgrade.CmdConstant.GET_FISH_GUNINFO, rev, true);
    }
    Cmd.OnRequestFishGunInfoCmd_S = OnRequestFishGunInfoCmd_S;
    function OnUnlockFishGunCmd_S(rev) {
        MJLobbyData.getInstance().fishGunBei = rev.guninfo.ctimes;
        uniLib.Global.dispatchEvent(paoupgrade.CmdConstant.UNLOCK_FISHGUN, rev, true);
    }
    Cmd.OnUnlockFishGunCmd_S = OnUnlockFishGunCmd_S;
})(Cmd || (Cmd = {}));
