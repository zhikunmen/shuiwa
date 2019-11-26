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
var task;
(function (task_1) {
    var GameTaskItem = (function (_super) {
        __extends(GameTaskItem, _super);
        function GameTaskItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "GameTaskItemSkin";
            return _this;
        }
        GameTaskItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        GameTaskItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var task = ConfigMgr.getInstance().getGameTaskCfgById(info.taskId);
            if (task == null) {
                this.clear();
                return;
            }
            this.desc_text.text = task.taskDesc;
            this.progress_text.text = info.current + "/" + task.taskCondition;
            if (info.taskStatus >= Cmd.TaskStatus.Task_Status_Complete)
                this.progress_text.text = "已完成";
            this.progress_text.anchorOffsetX = this.progress_text.width >> 1;
            if (task.taskReward) {
                if (task.taskReward[0].goodId == 6) {
                    this.reward_text.text = " x" + task.taskReward[0].goodNbr;
                    this.reward_icon.source = "game_task_json.renwu_zuanshi";
                }
                else if (task.taskReward[0].goodId == 32) {
                    this.reward_text.text = task.taskReward[0].goodNbr + "";
                    this.reward_icon.source = "game_task_json.renwu_jinbi";
                }
            }
        };
        GameTaskItem.prototype.clear = function () {
            this.desc_text.text = "";
            this.progress_text.text = "";
            this.reward_text.text = "";
            this.reward_icon.source = null;
        };
        GameTaskItem.prototype.destroy = function () {
        };
        return GameTaskItem;
    }(eui.ItemRenderer));
    task_1.GameTaskItem = GameTaskItem;
    __reflect(GameTaskItem.prototype, "task.GameTaskItem");
})(task || (task = {}));
var task;
(function (task_2) {
    var GameTaskPanel = (function (_super) {
        __extends(GameTaskPanel, _super);
        function GameTaskPanel(gameId, sceneId) {
            var _this = _super.call(this) || this;
            _this._gameId = gameId;
            _this._sceneId = sceneId;
            _this.skinName = "GameTaskSkin";
            return _this;
        }
        GameTaskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.visible = false;
            this.addEvents();
            this.x = -1;
            this.task_list.itemRenderer = task.GameTaskItem;
            this.initData();
        };
        GameTaskPanel.prototype.initData = function () {
            var req = new Cmd.GetGameTaskListLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.gameId = this._gameId;
            req.sceneId = this._sceneId;
            NetMgr.tcpSend(req);
        };
        GameTaskPanel.prototype.addEvents = function () {
            uniLib.Global.addEventListener(task_2.CmdConstant.GAME_TASK_LIST_DATA, this.listUpdata, this);
            uniLib.Global.addEventListener(task_2.CmdConstant.UPDATE_GAME_TASK_DATA, this.itemUpdata, this);
            uniLib.Global.addEventListener(task_2.CmdConstant.NEXT_GAME_TASK_DATA, this.itemNext, this);
        };
        GameTaskPanel.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener(task_2.CmdConstant.GAME_TASK_LIST_DATA, this.listUpdata, this);
            uniLib.Global.removeEventListener(task_2.CmdConstant.UPDATE_GAME_TASK_DATA, this.itemUpdata, this);
            uniLib.Global.removeEventListener(task_2.CmdConstant.NEXT_GAME_TASK_DATA, this.itemNext, this);
        };
        /**
         * 刷新页面数据
         */
        GameTaskPanel.prototype.listUpdata = function (e) {
            var curData = e.param;
            var taskItems = curData.gameTaskInfo;
            if (taskItems && taskItems.length > 0) {
                if (taskItems.length > 3)
                    taskItems = taskItems.slice(0, 2);
                this._currentTasks = new eui.ArrayCollection(taskItems);
                this.task_list.dataProvider = this._currentTasks;
                this.visible = true;
            }
        };
        /**
        * 刷新页面数据
        */
        GameTaskPanel.prototype.itemUpdata = function (e) {
            if (this._currentTasks == null) {
                this.initData();
                return;
            }
            var curData = e.param;
            for (var i = 0; i < this._currentTasks.source.length; i++) {
                if (this._currentTasks.source[i].taskId == curData.taskId) {
                    this._currentTasks.source[i].current = curData.pre;
                    this._currentTasks.source[i].taskStatus = curData.receive > 0 ? Cmd.TaskStatus.Task_Status_Received : Cmd.TaskStatus.Task_Status_Progress;
                    this._currentTasks.replaceItemAt(this._currentTasks.source[i], i);
                    break;
                }
            }
        };
        /**
        * 刷新页面数据
        */
        GameTaskPanel.prototype.itemNext = function (e) {
            if (this._currentTasks == null) {
                this.initData();
                return;
            }
            var curData = e.param;
            if (this._anim == null) {
                var movie = "rwdb";
                this._anim = uniLib.DragonUtils.createDragonBonesDisplay(movie + "_ske_json", movie + "_tex_json", movie + "_tex_png", uniLib.DragonType.ARMATURE);
                this._anim.display.x = 133;
                this._anim.display.y = 68;
            }
            this.addChild(this._anim.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._anim, "newAnimation", 1);
            if (curData.followTasks && curData.followTasks.length > 0) {
                for (var i = 0; i < this._currentTasks.source.length; i++) {
                    if (this._currentTasks.source[i].taskId == curData.taskId) {
                        this._currentTasks.replaceItemAt(curData.followTasks[0], i);
                        // this.playAnim(curData.taskId,i);
                        break;
                    }
                }
            }
        };
        GameTaskPanel.prototype.playAnim = function (taskId, index) {
            var _this = this;
            var task = ConfigMgr.getInstance().getGameTaskCfgById(taskId);
            var num = 0;
            if (task.taskReward) {
                num = task.taskReward[0].goodNbr;
            }
            else {
                return;
            }
            var posY = [46, 91, 136];
            if (this._bombNum == null) {
                this._bombNum = new egret.BitmapText();
                this._bombNum.font = RES.getRes("pdk_bomb1_fnt");
                this.addChild(this._bombNum);
                this._bombNum.x = 200;
            }
            this._bombNum.text = "+" + num;
            this._bombNum.y = posY[index];
            this._bombNum.visible = true;
            egret.Tween.removeTweens(this._bombNum);
            egret.Tween.get(this._bombNum).to({ y: posY[index] - 40 }, 120).call(function () {
                _this._bombNum.visible = false;
            }, this);
        };
        GameTaskPanel.prototype.destroy = function () {
            if (this._bombNum)
                egret.Tween.removeTweens(this._bombNum);
            if (this._anim)
                uniLib.DragonUtils.destoryDragonBonesArmature(this._anim, "newAnimation");
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GameTaskPanel;
    }(eui.Component));
    task_2.GameTaskPanel = GameTaskPanel;
    __reflect(GameTaskPanel.prototype, "task.GameTaskPanel");
})(task || (task = {}));
var task;
(function (task) {
    var TaskConsts = (function () {
        function TaskConsts() {
        }
        TaskConsts.RES_JSON = "resource/task/task.res_5ecda8af.json";
        TaskConsts.THM_JSON = "resource/task/gameEui_c07c7b98.json";
        /**
         * 需要加载的游戏内任务资源组
         */
        TaskConsts.PUB_GAME_TASK = "pub_game_task";
        return TaskConsts;
    }());
    task.TaskConsts = TaskConsts;
    __reflect(TaskConsts.prototype, "task.TaskConsts");
})(task || (task = {}));
var task;
(function (task) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**游戏内任务列表*/
        CmdConstant.GAME_TASK_LIST_DATA = "game_task_list_data";
        /**更新任务*/
        CmdConstant.UPDATE_GAME_TASK_DATA = "update_game_task_data";
        /**更新下个任务*/
        CmdConstant.NEXT_GAME_TASK_DATA = "next_game_task_data";
        return CmdConstant;
    }());
    task.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "task.CmdConstant");
})(task || (task = {}));
var TaskReciveMgr = (function () {
    function TaskReciveMgr() {
    }
    return TaskReciveMgr;
}());
__reflect(TaskReciveMgr.prototype, "TaskReciveMgr");
var Cmd;
(function (Cmd) {
    /**任务列表-请求数据 */
    function OnGetGameTaskListLobbyCmd_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(task.CmdConstant.GAME_TASK_LIST_DATA, rev, true);
        }
    }
    Cmd.OnGetGameTaskListLobbyCmd_S = OnGetGameTaskListLobbyCmd_S;
    /**任务更新 */
    function OnGetGameTaskScheduleLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(task.CmdConstant.UPDATE_GAME_TASK_DATA, rev, true);
    }
    Cmd.OnGetGameTaskScheduleLobbyCmd_S = OnGetGameTaskScheduleLobbyCmd_S;
    /**任务更新 */
    function OnGetGameTaskRewardLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(task.CmdConstant.NEXT_GAME_TASK_DATA, rev, true);
    }
    Cmd.OnGetGameTaskRewardLobbyCmd_S = OnGetGameTaskRewardLobbyCmd_S;
})(Cmd || (Cmd = {}));
