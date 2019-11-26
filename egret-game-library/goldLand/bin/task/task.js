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
            var task = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            this.desc_text.text = task.taskDesc;
            this.progress_text.text = info.current + "/" + task.taskCondition;
            if (task.taskReward) {
                this.progress_text.text = task.taskReward[0].goodNbr + "";
            }
        };
        GameTaskItem.prototype.destroy = function () {
        };
        return GameTaskItem;
    }(eui.ItemRenderer));
    task_1.GameTaskItem = GameTaskItem;
    __reflect(GameTaskItem.prototype, "task.GameTaskItem");
})(task || (task = {}));
var task;
(function (task) {
    var GameTaskPanel = (function (_super) {
        __extends(GameTaskPanel, _super);
        function GameTaskPanel(gameId) {
            var _this = _super.call(this) || this;
            _this._gameId = gameId;
            _this.skinName = "GameTaskSkin";
            return _this;
        }
        GameTaskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            this.task_list.itemRenderer = task.GameTaskItem;
            this.initData();
        };
        GameTaskPanel.prototype.initData = function () {
            var req = new Cmd.GetGameTaskListLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.gameId = this._gameId;
            NetMgr.tcpSend(req);
        };
        GameTaskPanel.prototype.addEvents = function () {
            uniLib.Global.addEventListener(task.CmdConstant.GAME_TASK_LIST_DATA, this.updata, this);
        };
        GameTaskPanel.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener(task.CmdConstant.GAME_TASK_LIST_DATA, this.updata, this);
        };
        /**
         * 刷新页面数据
         */
        GameTaskPanel.prototype.updata = function (e) {
            var curData = e.param;
            var taskItems = curData.gameTaskInfo;
            if (taskItems && taskItems.length > 0) {
                if (taskItems.length > 3)
                    taskItems = taskItems.slice(0, 2);
                this.task_list.dataProvider = new eui.ArrayCollection(taskItems);
            }
        };
        GameTaskPanel.prototype.destroy = function () {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GameTaskPanel;
    }(eui.Component));
    task.GameTaskPanel = GameTaskPanel;
    __reflect(GameTaskPanel.prototype, "task.GameTaskPanel");
})(task || (task = {}));
var task;
(function (task) {
    var TaskConsts = (function () {
        function TaskConsts() {
        }
        TaskConsts.RES_JSON = "resource/task.res.json";
        TaskConsts.THM_JSON = "resource/gameEui.json";
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
    /**摇钱树-请求数据 */
    function OnGetGameTaskListLobbyCmd_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(task.CmdConstant.GAME_TASK_LIST_DATA, rev, true);
        }
    }
    Cmd.OnGetGameTaskListLobbyCmd_S = OnGetGameTaskListLobbyCmd_S;
})(Cmd || (Cmd = {}));
