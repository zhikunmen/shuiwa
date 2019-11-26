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
var reward;
(function (reward) {
    var TaskView = (function (_super) {
        __extends(TaskView, _super);
        function TaskView() {
            var _this = _super.call(this) || this;
            if (NetMgr.getLoginCfg().lobbyId == 60) {
                _this.skinName = "TaskView1Skin";
            }
            else {
                _this.skinName = "TaskViewSkin";
            }
            return _this;
        }
        TaskView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData();
        };
        TaskView.prototype.initData = function () {
            this.task_lst.itemRenderer = reward.TaskItem;
            uniLib.Global.addEventListener(reward.CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            uniLib.Global.addEventListener(reward.CmdConstant.DAYSTASKREWARD, this.taskNext, this);
            var req = new Cmd.IntoFreeGoldLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        TaskView.prototype.onDailyTask = function (evt) {
            var curData = evt.param;
            if (curData.otherTaskInfo && curData.otherTaskInfo.length > 0) {
                this._taskInfo = new eui.ArrayCollection(curData.otherTaskInfo);
                this.task_lst.dataProvider = this._taskInfo;
            }
        };
        TaskView.prototype.taskNext = function (e) {
            var rewardData = e.param;
            var followTasks = rewardData.followTasks;
            if (followTasks && followTasks.length > 0) {
                for (var i = 0; i < this._taskInfo.source.length; i++) {
                    if (rewardData.taskId == this._taskInfo.source[i].taskId) {
                        this._taskInfo.replaceItemAt(followTasks[0], i);
                        break;
                    }
                }
            }
            else {
                for (var j = 0; j < this._taskInfo.source.length; j++) {
                    if (rewardData.taskId == this._taskInfo.source[j].taskId) {
                        this._taskInfo.source[j].taskStatus = Cmd.TaskStatus.Task_Status_Received;
                        this._taskInfo.replaceItemAt(this._taskInfo.source[j], j);
                        break;
                    }
                }
            }
            // this._lastV = this.scroll.viewport.scrollV;
            // this.task_lst.dataProvider = new eui.ArrayCollection(this._taskInfo);
            // this.task_lst.dataProviderRefreshed();
            // this.scroll.viewport.scrollV = this._lastV;
        };
        TaskView.prototype.destroy = function () {
            for (var i = 0; i < this.task_lst.numChildren; i++) {
                var child = this.task_lst.getChildAt(i);
                child && child.destroy();
            }
            this.task_lst = null;
            uniLib.Global.removeEventListener(reward.CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.DAYSTASKREWARD, this.taskNext, this);
            this.removeChildren();
        };
        return TaskView;
    }(eui.Component));
    reward.TaskView = TaskView;
    __reflect(TaskView.prototype, "reward.TaskView");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var DiamondsPanel = (function (_super) {
        __extends(DiamondsPanel, _super);
        function DiamondsPanel() {
            var _this = _super.call(this) || this;
            _this.effects = [];
            _this.skinName = "DiamondsPanelSkin";
            return _this;
        }
        DiamondsPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.groups = [this.itme1, this.itme2, this.itme3, this.itme4];
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            uniLib.Global.addEventListener(reward.CmdConstant.DIAMONDINTERFACETIPS, this.onDiamondInterfaceTips, this);
            this.initData();
        };
        DiamondsPanel.prototype.initData = function (type) {
            if (type === void 0) { type = 2; }
            var req = new Cmd.GetDiamondInterfaceTips_C();
            req.typ = type;
            NetMgr.tcpSend(req);
        };
        DiamondsPanel.prototype.onDiamondInterfaceTips = function (evt) {
            var rev = evt.param;
            var tips = rev.tips;
            if (tips == null || tips.length == 0)
                return;
            this.clearEffect();
            for (var i = 0; i < tips.length; i++) {
                this.addEffect(tips[i] - 1);
            }
        };
        DiamondsPanel.prototype.clearEffect = function () {
            for (var i = 0; i < this.effects.length; i++) {
                this.effects[i].dispose();
                this.effects[i].removeChildren();
                uniLib.DisplayUtils.removeFromParent(this.effects[i]);
            }
            this.effects = [];
        };
        DiamondsPanel.prototype.addEffect = function (index) {
            var group = new eui.WxContain();
            group.x = group.y = 0;
            var anim = new eui.ArmatureComponent();
            anim.resName = "yuanquan";
            anim.update();
            anim.x = 88;
            anim.y = 89;
            group.addChild(anim);
            var iconNum = index + 1;
            var icon = new egret.Bitmap(RES.getRes("reward_icon" + iconNum + "_png"));
            icon.x = (175 - icon.width) / 2;
            icon.y = (178 - icon.height) / 2;
            ;
            group.addChild(icon);
            var tuijian = new egret.Bitmap(RES.getRes("reward_tuijian_png"));
            tuijian.x = 93;
            tuijian.y = -2;
            group.addChild(tuijian);
            this.groups[index].removeChildAt(0);
            this.groups[index].addChildAt(group, 0);
            this.effects.push(group);
        };
        /**
         * 设置回调函数
         * 数组第一个：分享有礼
         *  第二个：每日任务
         * 第三个：免费钻石赛
         * 第四个：领钻石
         * 第五个：商城
        */
        DiamondsPanel.prototype.setBackFuns = function (funs, arg) {
            this._funs = funs;
            this._arg = arg;
        };
        DiamondsPanel.prototype.onTouchHandler = function (evt) {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this.itme1:
                    this.callFun(0);
                    break;
                case this.itme2:
                    this.callFun(1);
                    break;
                case this.itme3:
                    this.callFun(2);
                    break;
                case this.itme4:
                    this.callFun(3);
                    break;
            }
        };
        DiamondsPanel.prototype.callFun = function (index) {
            if (this._funs && this._funs.length >= index && this._funs[index])
                this._funs[index].apply(this, [this._arg[index]]);
            else {
                console.error("没配置第" + index + "个的回调函数");
            }
        };
        DiamondsPanel.prototype.destroy = function () {
            this._funs = null;
            this.clearEffect();
            uniLib.Global.removeEventListener(reward.CmdConstant.DIAMONDINTERFACETIPS, this.onDiamondInterfaceTips, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.groups[i] = null;
            this.removeChildren();
        };
        return DiamondsPanel;
    }(eui.Component));
    reward.DiamondsPanel = DiamondsPanel;
    __reflect(DiamondsPanel.prototype, "reward.DiamondsPanel");
})(reward || (reward = {}));
var reward;
(function (reward) {
    /**
     * 大厅福利界面
     */
    var FuLiPanel = (function (_super) {
        __extends(FuLiPanel, _super);
        function FuLiPanel(defaultMenu, introduce) {
            if (defaultMenu === void 0) { defaultMenu = 0; }
            if (introduce === void 0) { introduce = null; }
            var _this = _super.call(this) || this;
            _this._defaultMenu = defaultMenu;
            _this._introduce = introduce;
            _this.skinName = "FuliPanelSkin";
            return _this;
        }
        FuLiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.introduce_grp.visible = false;
            this.sign_view.visible = false;
            this.task_view.visible = false;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_rbtn.group.addEventListener(egret.Event.CHANGE, this.showTabContent, this);
            this.sign_rbtn.group.selectedValue = this._defaultMenu;
            if (this._introduce) {
                this.content.text = this._introduce[0];
                this.operate.y = this.content.y + this.content.textHeight + 28;
                this.operate.text = this._introduce[1];
            }
            this._viewGroup = [this.sign_view, this.task_view, this.introduce_grp];
            this._viewGroup[this._defaultMenu].visible = true;
            this._btnGroup = [this.sign_rbtn, this.task_rbtn, this.introduce_rbtn];
            this._btnGroup[this._defaultMenu].selected = true;
            this.addRedPoint();
            uniLib.Global.addEventListener(reward.CmdConstant.NOVICEINFO, this.onNoviceInfo, this);
        };
        FuLiPanel.prototype.addRedPoint = function () {
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Task_EveryDay, [[this.red2]]);
        };
        FuLiPanel.prototype.removeRedPoint = function () {
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Act_DaySign);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Task_EveryDay);
        };
        FuLiPanel.prototype.showTabContent = function (evt) {
            this._viewGroup[this._defaultMenu].visible = false;
            var rbGroup = evt.target;
            this._defaultMenu = parseInt(rbGroup.selectedValue);
            this._viewGroup[this._defaultMenu].visible = true;
        };
        FuLiPanel.prototype.onTouchHandler = function (evt) {
            uniLib.PopUpMgr.removePopUp(this);
        };
        /**
         * 签到领取了之后直接显示任务
         */
        FuLiPanel.prototype.onNoviceInfo = function (evt) {
            this.sign_view.onNoviceInfo(evt.param);
            var canReceive = false;
            for (var i = 0; i < evt.param.length; i++) {
                if (evt.param[i].status == 3)
                    canReceive = true;
            }
            if (canReceive) {
            }
            else {
                this._viewGroup[this._defaultMenu].visible = false;
                this._defaultMenu = 1;
                this._viewGroup[this._defaultMenu].visible = true;
                this._btnGroup[this._defaultMenu].selected = true;
            }
        };
        FuLiPanel.prototype.destroy = function () {
            this._introduce = null;
            uniLib.Global.removeEventListener(reward.CmdConstant.NOVICEINFO, this.onNoviceInfo, this);
            this._viewGroup = null;
            this._btnGroup = null;
            this.removeRedPoint();
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_rbtn.group.removeEventListener(egret.Event.CHANGE, this.showTabContent, this);
            this.sign_view.destroy();
            this.task_view.destroy();
            this.removeChildren();
        };
        return FuLiPanel;
    }(eui.Component));
    reward.FuLiPanel = FuLiPanel;
    __reflect(FuLiPanel.prototype, "reward.FuLiPanel");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var ReceiveDiamondsItem = (function (_super) {
        __extends(ReceiveDiamondsItem, _super);
        function ReceiveDiamondsItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ReceiveItemSkin";
            return _this;
        }
        ReceiveDiamondsItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ReceiveDiamondsItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.user_head.source = info.headUrl;
            this.user_name.text = info.nickName;
            if (info.status == 2) {
                this._receiveBtn.visible = true;
                this._receiveed.visible = false;
                this._receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            else if (info.status == 3) {
                this._receiveBtn.visible = false;
                this._receiveed.visible = true;
            }
        };
        ReceiveDiamondsItem.prototype.onTouchHandler = function (evt) {
            var req = new Cmd.GetIosInviteRewardLittleGameLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.uid = this.data.uid;
            NetMgr.tcpSend(req);
        };
        return ReceiveDiamondsItem;
    }(eui.ItemRenderer));
    reward.ReceiveDiamondsItem = ReceiveDiamondsItem;
    __reflect(ReceiveDiamondsItem.prototype, "reward.ReceiveDiamondsItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var RewardConsts = (function () {
        function RewardConsts() {
        }
        RewardConsts.RES_JSON = "resource/reward/reward.res_ef5d825f.json";
        RewardConsts.THM_JSON = "resource/reward/gameEui_5c085bcc.json";
        /**
         * 奖励钻石方面的资源组
         */
        RewardConsts.PUB_REWARD = "pub_reward";
        /**
         * 福利的资源组
         */
        RewardConsts.PUB_FULI = "pub_fuli";
        /**
         * 捕鱼福利的资源组
         */
        RewardConsts.PUB_BUYU_FULI = "pub_buyu_fuli";
        /**
         * 活跃宝箱
         */
        RewardConsts.ACTIVE_BOX = "active_box";
        return RewardConsts;
    }());
    reward.RewardConsts = RewardConsts;
    __reflect(RewardConsts.prototype, "reward.RewardConsts");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var SignItem = (function (_super) {
        __extends(SignItem, _super);
        function SignItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "SignItemSkin";
            return _this;
        }
        SignItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var goods = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.sign_day.text = "第" + info.day + "天";
            this.sign_icon.source = "lb_fuli_json." + goods.goodIcon;
            this.sign_good_name.text = goods.goodName + "x" + info.goodNbr;
            if (info.day == 7) {
                this.sign_bg.width = 386;
                /**红包 */
                if (info.goodId == 336) {
                    this.sign_good_name.text = "\u6700\u9AD8\u53EF\u5F97" + info.goodNbr + "\u798F\u5361";
                }
            }
            var day = info.day == 7 ? 1 : 2;
            if (info.status == 1) {
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle";
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = true;
                this.sign_icon.source = "sign_miss";
            }
            else if (info.status == 2) {
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle";
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = true;
                this.sign_icon.source = "sign_receive";
            }
            else if (info.status == 3) {
                this.sign_bg.source = "sign_getbg" + day;
                this.sign_corn.source = "sign_gettitle";
                this.sign_good_name.textColor = 0xffffff;
                this.sign_mask.visible = false;
            }
            else if (info.status == 4) {
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle";
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = false;
            }
        };
        SignItem.prototype.setReceived = function (day) {
            var days = day == 7 ? 1 : 2;
            this.sign_bg.source = "sign_missbg" + days;
            this.sign_corn.source = "sign_misstitle";
            this.sign_good_name.textColor = 0xa46359;
            this.sign_mask.visible = true;
            this.sign_icon.source = "sign_receive";
        };
        return SignItem;
    }(eui.ItemRenderer));
    reward.SignItem = SignItem;
    __reflect(SignItem.prototype, "reward.SignItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var SignView = (function (_super) {
        __extends(SignView, _super);
        function SignView() {
            var _this = _super.call(this) || this;
            _this.POSX = [0, 193, 386, 579, 0, 193, 386];
            _this.POSY = [40, 40, 40, 40, 200, 200, 200];
            _this.items = [];
            _this.skinName = "SignViewSkin";
            return _this;
        }
        SignView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData();
            if (uniLib.Global.isNative) {
                this.receive_lbl.visible = false;
            }
            else {
                this.receive_lbl.textFlow = (new egret.HtmlTextParser).parse('<font fontfamily="Microsoft YaHei"><u>直接领取</u></font>');
                this.receive_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.viewVideo_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        SignView.prototype.initData = function () {
            uniLib.Global.addEventListener(reward.CmdConstant.NOVICEREWARD, this.onNoviceReward, this);
            var req = new Cmd.GetNoviceInfodLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);
        };
        SignView.prototype.onNoviceInfo = function (param) {
            this.noviceInfo = param;
            var canReceive = false;
            for (var i = 0; i < this.noviceInfo.length; i++) {
                var item = new reward.SignItem();
                item.data = this.noviceInfo[i];
                item.x = this.POSX[i];
                item.y = this.POSY[i];
                this.addChild(item);
                this.items.push(item);
                if (this.noviceInfo[i].status == 3)
                    canReceive = true;
            }
            !uniLib.Global.isNative && (this.receive_lbl.visible = canReceive);
        };
        SignView.prototype.onNoviceReward = function (evt) {
            var data = evt.param;
            this.items[data.day - 1].setReceived(data.day);
            this.receive_lbl.visible = false;
        };
        SignView.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.receive_lbl) {
                var req = new Cmd.GetNoviceRewarddLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                req.typ = 1;
                NetMgr.tcpSend(req);
                wxgame.Global.instance.aldSendEvent("周边系统", "登录奖励直接领取");
            }
            else if (evt.target == this.viewVideo_btn) {
                if (uniLib.Global.isWxGame()) {
                    if (wxgame.Global.instance.videoAdCanUse) {
                        wxgame.Global.instance.createRewardedVideoAd("", this.getRewardDouble, this);
                    }
                    else {
                        var vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.common;
                        wxgame.ShareMessage.instance.shareAppMessage(vo, this.getRewardDouble, null, this);
                    }
                }
                else {
                    this.getRewardDouble();
                }
            }
        };
        SignView.prototype.getRewardDouble = function () {
            var req = new Cmd.GetNoviceRewarddLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.typ = 2;
            NetMgr.tcpSend(req);
        };
        SignView.prototype.destroy = function () {
            this.items = null;
            this.receive_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.NOVICEREWARD, this.onNoviceReward, this);
            this.viewVideo_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return SignView;
    }(eui.Component));
    reward.SignView = SignView;
    __reflect(SignView.prototype, "reward.SignView");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var TaskItem = (function (_super) {
        __extends(TaskItem, _super);
        function TaskItem() {
            var _this = _super.call(this) || this;
            _this.skipType = 0;
            _this.skinName = "TaskItemlSkin";
            return _this;
        }
        TaskItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.progress_img.mask = this.progress_mask;
            this.rev_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        TaskItem.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.rev_btn) {
                this.go_btn.currentState = "disabled";
                this.go_btn.visible = true;
                this.go_btn.touchEnabled = false;
                this.rev_btn.visible = false;
                var req = new Cmd.GetDaysTaskRewardLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                req.taskId = this.data.taskId;
                NetMgr.tcpSend(req);
                wxgame.Global.instance.aldSendEvent("周边系统", "每日任务: " + this.data.taskID + "领取");
            }
            else if (evt.target == this.go_btn) {
                if (this.skipType > 0)
                    LobbyModuleMgr.getInstance().openPanelBySkipType(this.skipType);
            }
        };
        TaskItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var task = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            var contentStr = task.taskDesc;
            this.skipType = task.skipType;
            contentStr = contentStr.replace(new RegExp("%a", "gm"), task.taskCondition + "");
            this.good_content.text = contentStr;
            this.good_gress.text = info.current + "/" + task.taskCondition;
            this.progress_mask.width = 360 * (info.current / task.taskCondition);
            if (task.taskReward) {
                var goodConfig = ConfigMgr.getInstance().getGoodCfgById(task.taskReward[0].goodId);
                this.good_num.text = task.taskReward[0].goodNbr + goodConfig.goodName;
                this.good_icon.source = "game_prop_json.bag_daoju_" + task.taskReward[0].goodId;
                commonConfirm.ResUtil.limitImageSize(this.good_icon, 66);
            }
            if (info.taskStatus <= Cmd.TaskStatus.Task_Status_Progress) {
                this.go_btn.visible = this.skipType > 0;
                this.go_btn.currentState = "";
                this.rev_btn.visible = false;
            }
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                this.go_btn.visible = false;
                this.rev_btn.visible = true;
            }
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Received) {
                this.rev_btn.visible = false;
                this.go_btn.visible = true;
                this.go_btn.currentState = "disabled";
                this.go_btn.touchEnabled = false;
            }
        };
        TaskItem.prototype.destroy = function () {
            this.rev_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return TaskItem;
    }(eui.ItemRenderer));
    reward.TaskItem = TaskItem;
    __reflect(TaskItem.prototype, "reward.TaskItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var DiamondsReceivePanel = (function (_super) {
        __extends(DiamondsReceivePanel, _super);
        function DiamondsReceivePanel() {
            var _this = _super.call(this) || this;
            _this.index = 1;
            _this.skinName = "DiamondsReceiveSkin";
            return _this;
        }
        DiamondsReceivePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.scroll.addEventListener(egret.Event.CHANGE, this.scrollChange, this);
            this.diamond_lst.itemRenderer = reward.ReceiveDiamondsItem;
            uniLib.Global.addEventListener(reward.CmdConstant.IOSINVITEINFOLITTLE, this.onIosInviteInfoLittle, this);
            uniLib.Global.addEventListener(reward.CmdConstant.IOSINVITEREWARDLITTLE, this.onIosInviteRewardLittle, this);
            this.loadRankData();
        };
        DiamondsReceivePanel.prototype.scrollChange = function (evt) {
            if (this.index < 4 && this.scroll.viewport.scrollV + this.scroll.height > this.scroll.viewport.contentHeight + 100) {
                this.scroll.viewport.scrollV = this.scroll.viewport.contentHeight - this.scroll.height;
                this.index++;
                this.loadRankData();
            }
        };
        DiamondsReceivePanel.prototype.loadRankData = function () {
            var req = new Cmd.GetIosInviteInfoLittleGameLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.index = this.index;
            NetMgr.tcpSend(req);
        };
        DiamondsReceivePanel.prototype.onIosInviteInfoLittle = function (evt) {
            this.empty_group.visible = false;
            var rev = evt.param;
            if (rev.info == null || !(rev.info && rev.info instanceof Array)) {
                if (this.info == null)
                    this.empty_group.visible = true;
                return;
            }
            if (rev.index == 1)
                this.info = rev.info;
            else
                this.info = this.info.concat(rev.info);
            this.diamond_lst.dataProvider = new eui.ArrayCollection(this.info);
        };
        DiamondsReceivePanel.prototype.onIosInviteRewardLittle = function (evt) {
            var rev = evt.param;
            for (var i = 0; i < this.info.length; i++) {
                if (this.info[i].uid == rev.single.uid) {
                    this.info[i] = rev.single;
                }
            }
            this.diamond_lst.dataProvider = new eui.ArrayCollection(this.info);
        };
        DiamondsReceivePanel.prototype.onTouchHandler = function (evt) {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this._shareBtn:
                case this._shareBtn2:
                    if (uniLib.Global.isWxGame()) {
                        var vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.ios;
                        uniLib.ZQGameSdk.share(vo);
                        wxgame.Global.instance.aldSendEvent("周边系统", "领钻石跳转分享");
                    }
                    else {
                        share.shareNativeMessage(Cmd.ShareType.ios, 0, Cmd.ShareType.ios.toString());
                    }
                    break;
            }
        };
        DiamondsReceivePanel.prototype.destroy = function () {
            uniLib.Global.removeEventListener(reward.CmdConstant.IOSINVITEINFOLITTLE, this.onIosInviteInfoLittle, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.IOSINVITEREWARDLITTLE, this.onIosInviteRewardLittle, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return DiamondsReceivePanel;
    }(eui.Component));
    reward.DiamondsReceivePanel = DiamondsReceivePanel;
    __reflect(DiamondsReceivePanel.prototype, "reward.DiamondsReceivePanel");
})(reward || (reward = {}));
var eui;
(function (eui) {
    var WxContain = (function (_super) {
        __extends(WxContain, _super);
        function WxContain() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        WxContain.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
            this.x += this.width >> 1;
            this.y += this.height >> 1;
        };
        WxContain.prototype.init = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        };
        WxContain.prototype.onTouchBegin = function () {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        };
        WxContain.prototype.onTouchEnd = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.onTouchCancel = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.onTouchMove = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.onTouchReleaseOutside = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
        };
        return WxContain;
    }(eui.Group));
    eui.WxContain = WxContain;
    __reflect(WxContain.prototype, "eui.WxContain");
})(eui || (eui = {}));
var reward;
(function (reward) {
    var ActiveBoxPanel = (function (_super) {
        __extends(ActiveBoxPanel, _super);
        function ActiveBoxPanel(taskReward) {
            var _this = _super.call(this) || this;
            _this._taskReward = taskReward;
            _this.skinName = "ActiveBoxPanelSkin";
            return _this;
        }
        ActiveBoxPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._items = [];
            for (var i = 0; i < this._taskReward.length; i++) {
                var item = new RewardItem(this._taskReward[i]);
                this.goods.addChild(item);
                item.x = i % 2 * 189;
                if (this._taskReward.length == 2)
                    item.y = 88;
                else
                    item.y = Math.floor(i / 2) * 177;
            }
        };
        ActiveBoxPanel.prototype.destroy = function () {
            if (this._items) {
                for (var j = 0; j < this._items.length; j++) {
                    this._items[j].destroy();
                }
                this._items = null;
            }
            this.removeChildren();
        };
        return ActiveBoxPanel;
    }(eui.Component));
    reward.ActiveBoxPanel = ActiveBoxPanel;
    __reflect(ActiveBoxPanel.prototype, "reward.ActiveBoxPanel");
    var RewardItem = (function (_super) {
        __extends(RewardItem, _super);
        function RewardItem($info) {
            var _this = _super.call(this) || this;
            _this.initUI($info);
            _this.touchEnabled = true;
            return _this;
        }
        RewardItem.prototype.initUI = function ($info) {
            this.info = $info;
            this.gift = new egret.Bitmap();
            this.gift.texture = RES.getRes("active_reward_json.active_item_bg");
            this.addChild(this.gift);
            var icon = new egret.Bitmap();
            icon.texture = RES.getRes("game_prop_json.bag_daoju_" + this.info.goodId);
            this.addChild(icon);
            commonConfirm.ResUtil.limitImageSize(icon, 110);
            icon.x = (this.gift.width - icon.width) >> 1;
            icon.y = (this.gift.height - icon.height - 34) >> 1;
            var tf = new egret.TextField();
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xffffff;
            tf.size = 24;
            this.addChild(tf);
            var goodConfig = ConfigMgr.getInstance().getGoodCfgById(this.info.goodId);
            tf.text = goodConfig.goodName + "x" + this.info.goodNbr;
            tf.x = (this.gift.width - tf.width) / 2;
            tf.y = this.gift.height - tf.height - 4;
        };
        RewardItem.prototype.destroy = function () {
            if (this.gift) {
                egret.Tween.removeTweens(this.gift);
                this.gift = null;
            }
        };
        return RewardItem;
    }(egret.DisplayObjectContainer));
    reward.RewardItem = RewardItem;
    __reflect(RewardItem.prototype, "reward.RewardItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var EnergyView = (function (_super) {
        __extends(EnergyView, _super);
        function EnergyView() {
            var _this = _super.call(this) || this;
            _this.maxValue = 0;
            _this.skinName = "EnergyViewSkin";
            return _this;
        }
        EnergyView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData();
        };
        EnergyView.prototype.initData = function () {
            uniLib.Global.addEventListener(reward.CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            uniLib.Global.addEventListener(reward.CmdConstant.UPDATE_DAYS_TASK_LOBBY, this.onUpdateDaysTask, this);
        };
        EnergyView.prototype.onDailyTask = function (evt) {
            var curData = evt.param;
            this.taskInfo = curData.taskInfo;
            if (this.taskInfo == null || !(this.taskInfo instanceof Array))
                return;
            this.items = [];
            var currentMax = 0;
            for (var i = 0; i < this.taskInfo.length; i++) {
                var item = new EnergyItem(this.taskInfo[i], i + 1);
                this.reward_contain.addChild(item);
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.items.push(item);
                if (this.maxValue < item.condition)
                    this.maxValue = item.condition;
                if (currentMax < this.taskInfo[i].current)
                    currentMax = this.taskInfo[i].current;
            }
            this.maxValue = this.maxValue + 5;
            this.updateProgress(currentMax);
            for (var j = 0; j < this.items.length; j++) {
                this.items[j].x = (this.items[j].condition / this.maxValue) * 550;
                this.items[j].y = 25;
            }
        };
        EnergyView.prototype.onUpdateDaysTask = function (e) {
            var rewardData = e.param;
            this.taskInfo = rewardData.taskInfo;
            var currentMax = 0;
            for (var j = 0; j < this.taskInfo.length; j++) {
                for (var i = 0; i < this.items.length; i++) {
                    if (this.items[i].taskId == this.taskInfo[j].taskId) {
                        this.items[i].setRewardState(this.taskInfo[j].taskStatus);
                    }
                }
                if (currentMax < this.taskInfo[j].current)
                    currentMax = this.taskInfo[j].current;
            }
            this.updateProgress(currentMax);
        };
        EnergyView.prototype.updateProgress = function (current) {
            this.energy_total.text = current == null ? "0" : current + "";
            if (current > this.maxValue)
                current = this.maxValue;
            this.energy_pro.width = (current / this.maxValue) * 550;
        };
        EnergyView.prototype.onTouchHandler = function (evt) {
            var _this = this;
            var index = this.items.indexOf(evt.target);
            if (index > -1) {
                if (this.items[index].taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                    var req = new Cmd.GetDaysTaskRewardLobbyCmd_C();
                    req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                    req.taskId = this.taskInfo[index].taskId;
                    NetMgr.tcpSend(req);
                    this.taskInfo[index].taskStatus = Cmd.TaskStatus.Task_Status_Received;
                    this.items[index].setRewardState(Cmd.TaskStatus.Task_Status_Received);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(reward.RewardConsts.ACTIVE_BOX, function () {
                        var task = ConfigMgr.getInstance().getTaskCfgById(_this.items[index].taskId);
                        uniLib.PopUpMgr.addPopUp(reward.ActiveBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, task.taskReward);
                    });
                }
            }
        };
        EnergyView.prototype.destroy = function () {
            if (this.items) {
                for (var j = 0; j < this.items.length; j++) {
                    this.items[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                }
                this.items = null;
            }
            uniLib.Global.removeEventListener(reward.CmdConstant.UPDATE_DAYS_TASK_LOBBY, this.onUpdateDaysTask, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            this.removeChildren();
        };
        return EnergyView;
    }(eui.Component));
    reward.EnergyView = EnergyView;
    __reflect(EnergyView.prototype, "reward.EnergyView");
    var EnergyItem = (function (_super) {
        __extends(EnergyItem, _super);
        function EnergyItem(info, index) {
            var _this = _super.call(this) || this;
            _this.initUI(info, index);
            _this.touchEnabled = true;
            return _this;
        }
        EnergyItem.prototype.initUI = function (info, index) {
            this._index = index;
            this.taskId = info.taskId;
            this.taskStatus = info.taskStatus;
            this.gift = new egret.Bitmap();
            this.gift.texture = RES.getRes("energy_json.gift_" + this._index);
            this.gift.anchorOffsetX = this.gift.width >> 1;
            this.gift.anchorOffsetY = 20;
            this.addChild(this.gift);
            this.txt = new egret.BitmapText();
            this.txt.font = RES.getRes("energy_progress_fnt");
            var task = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            this.condition = task.taskCondition;
            this.txt.text = task.taskCondition + "";
            this.addChild(this.txt);
            this.txt.y = 40;
            this.txt.x = -this.txt.width >> 1;
            this.setRewardState(info.taskStatus);
        };
        EnergyItem.prototype.setRewardState = function (taskStatus) {
            egret.Tween.removeTweens(this.gift);
            this.gift.rotation = 0;
            this.taskStatus = taskStatus;
            if (taskStatus == Cmd.TaskStatus.Task_Status_Unstart) {
                this.gift.texture = RES.getRes("energy_json.gift_" + this._index);
            }
            else if (taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                this.gift.texture = RES.getRes("energy_json.gift_" + this._index);
                egret.Tween.get(this.gift, { loop: true }).to({ rotation: 15 }, 100).to({ rotation: 0 }, 100).to({ rotation: -15 }, 100).to({ rotation: 0 }, 100).wait(400);
            }
            else if (taskStatus == Cmd.TaskStatus.Task_Status_Received) {
                this.gift.texture = RES.getRes("energy_json.gift_100");
            } //任务进行中 暂时不显示按钮
            else if (taskStatus == Cmd.TaskStatus.Task_Status_Progress) {
                this.gift.texture = RES.getRes("energy_json.gift_" + this._index);
            }
        };
        EnergyItem.prototype.destroy = function () {
            if (this.gift) {
                egret.Tween.removeTweens(this.gift);
                this.gift = null;
            }
        };
        return EnergyItem;
    }(egret.DisplayObjectContainer));
    reward.EnergyItem = EnergyItem;
    __reflect(EnergyItem.prototype, "reward.EnergyItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    /**
     * 大厅福利界面
     */
    var NewFuLiPanel = (function (_super) {
        __extends(NewFuLiPanel, _super);
        function NewFuLiPanel(taskId) {
            var _this = _super.call(this) || this;
            if (taskId)
                _this._taskId = taskId;
            _this.skinName = "NewFuliPanelSkin";
            return _this;
        }
        NewFuLiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._viewGroup = [this.task_view1, this.task_view2, this.task_view3];
            // this._viewGroup[this._defaultMenu].visible = true;
            this._btnGroup = [this.men_rbtn1, this.men_rbtn2, this.men_rbtn3];
            // this._btnGroup[this._defaultMenu].selected = true;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.men_rbtn1.group.addEventListener(egret.Event.CHANGE, this.showTabContent, this);
            uniLib.Global.addEventListener(reward.CmdConstant.NEW_ONCETASK_LOBBY, this.onOnceTaskHandler, this);
            uniLib.Global.addEventListener(reward.CmdConstant.NEW_ONCEREWARD_LOBBY, this.onOnceRewardHandler, this);
            // this.men_rbtn1.group.selectedValue = this._defaultMenu;
            // this.addRedPoint();
            this.initData();
        };
        NewFuLiPanel.prototype.initData = function () {
            var req = new Cmd.RequestOnceTaskLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        NewFuLiPanel.prototype.onOnceTaskHandler = function (evt) {
            var curData = evt.param;
            this.task_view1.setData(curData.fktasks);
            this.task_view2.setData(curData.qhtasks);
            this.task_view3.setData(curData.diamondtasks);
            if (this._taskId) {
                if (this.findTask(curData.fktasks) > -1) {
                    this.setMenu(0);
                }
                else if (this.findTask(curData.qhtasks) > -1) {
                    this.setMenu(1);
                }
                else if (this.findTask(curData.diamondtasks) > -1) {
                    this.setMenu(2);
                }
                else {
                    this.setMenu(0);
                }
            }
            else {
                this.setMenu(0);
            }
        };
        NewFuLiPanel.prototype.setMenu = function (defaultMenu) {
            this._defaultMenu = defaultMenu;
            this._viewGroup[this._defaultMenu].visible = true;
            this._btnGroup[this._defaultMenu].selected = true;
            this.men_rbtn1.group.selectedValue = this._defaultMenu;
            if (this._pos > 3) {
                this._viewGroup[this._defaultMenu].scrollTTo(this._pos * 147);
            }
        };
        NewFuLiPanel.prototype.findTask = function (tasks) {
            if (tasks == null || tasks.length == 0)
                return -1;
            else {
                for (var i = 0; i < tasks.length; i++) {
                    if (tasks[i].taskId == this._taskId) {
                        this._pos = i;
                        return i;
                    }
                }
            }
        };
        NewFuLiPanel.prototype.onOnceRewardHandler = function (evt) {
            var curData = evt.param;
            this.task_view1.updateTask(curData.taskId);
            this.task_view2.updateTask(curData.taskId);
            this.task_view3.updateTask(curData.taskId);
        };
        // private addRedPoint() {
        //     LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
        //     LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Task_EveryDay, [[this.red2]]);
        // }
        // private removeRedPoint() {
        //     LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Act_DaySign);
        //     LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Task_EveryDay);
        // }
        NewFuLiPanel.prototype.showTabContent = function (evt) {
            this._viewGroup[this._defaultMenu].visible = false;
            var rbGroup = evt.target;
            this._defaultMenu = parseInt(rbGroup.selectedValue);
            this._viewGroup[this._defaultMenu].visible = true;
        };
        NewFuLiPanel.prototype.onTouchHandler = function (evt) {
            uniLib.PopUpMgr.removePopUp(this);
        };
        NewFuLiPanel.prototype.destroy = function () {
            // this.removeRedPoint();
            uniLib.Global.removeEventListener(reward.CmdConstant.NEW_ONCETASK_LOBBY, this.onOnceTaskHandler, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.NEW_ONCEREWARD_LOBBY, this.onOnceRewardHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.men_rbtn1.group.removeEventListener(egret.Event.CHANGE, this.showTabContent, this);
            for (var i = 0; i < this._viewGroup.length; i++) {
                this._viewGroup[i].destroy();
            }
            this._viewGroup = null;
            this._btnGroup = null;
            this.removeChildren();
        };
        return NewFuLiPanel;
    }(eui.Component));
    reward.NewFuLiPanel = NewFuLiPanel;
    __reflect(NewFuLiPanel.prototype, "reward.NewFuLiPanel");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var TaskItem2 = (function (_super) {
        __extends(TaskItem2, _super);
        function TaskItem2() {
            var _this = _super.call(this) || this;
            _this.skipType = 0;
            _this.skinName = "TaskItem2Skin";
            return _this;
        }
        TaskItem2.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.progress_img.mask = this.progress_mask;
            this.rev_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        TaskItem2.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.rev_btn) {
                this.go_btn.currentState = "disabled";
                this.go_btn.visible = true;
                this.go_btn.touchEnabled = false;
                this.rev_btn.visible = false;
                var req = new Cmd.GetOnceRewardLobbyCmd_C();
                req.taskId = this.data.taskId;
                NetMgr.tcpSend(req);
                wxgame.Global.instance.aldSendEvent("周边系统", "每日任务: " + this.data.taskID + "领取");
            }
            else if (evt.target == this.go_btn) {
                if (this.skipType > 0)
                    LobbyModuleMgr.getInstance().openPanelBySkipType(this.skipType);
            }
        };
        TaskItem2.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var task = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            var contentStr = task.taskDesc;
            this.skipType = task.skipType;
            contentStr = contentStr.replace(new RegExp("%a", "gm"), task.taskCondition + "");
            this.good_content.text = contentStr;
            this.good_gress.text = info.current + "/" + task.taskCondition;
            if (task.frontTaskCondition && task.frontTaskCondition.length > 0)
                this.good_icon.source = "fish_common_json.fish_" + task.frontTaskCondition[0];
            else
                this.good_icon.source = "fish_common_json.fish_0";
            this.good_icon.x = 76 - this.good_icon.width / 2;
            this.progress_mask.width = 286 * (info.current / task.taskCondition);
            if (task.taskReward) {
                var goodConfig = ConfigMgr.getInstance().getGoodCfgById(task.taskReward[0].goodId);
                this.reward_num.text = "x" + task.taskReward[0].goodNbr;
                this.reward_icon.source = "game_prop_json.bag_daoju_" + task.taskReward[0].goodId;
                commonConfirm.ResUtil.limitImageSize(this.reward_icon, 50);
            }
            if (info.taskStatus <= Cmd.TaskStatus.Task_Status_Progress) {
                this.go_btn.visible = this.skipType > 0 && !uniLib.Global.isInGame;
                this.go_btn.currentState = "";
                this.rev_btn.visible = false;
            }
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                this.go_btn.visible = false;
                this.rev_btn.visible = true;
            }
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Received) {
                this.rev_btn.visible = false;
                this.go_btn.visible = true;
                this.go_btn.currentState = "disabled";
                this.go_btn.touchEnabled = false;
            }
        };
        TaskItem2.prototype.destroy = function () {
            this.rev_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return TaskItem2;
    }(eui.ItemRenderer));
    reward.TaskItem2 = TaskItem2;
    __reflect(TaskItem2.prototype, "reward.TaskItem2");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var TaskView2 = (function (_super) {
        __extends(TaskView2, _super);
        function TaskView2() {
            var _this = _super.call(this) || this;
            _this.skinName = "TaskView2Skin";
            return _this;
        }
        TaskView2.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.task_lst.itemRenderer = reward.TaskItem2;
        };
        TaskView2.prototype.setData = function (tasks) {
            this._taskInfo = new eui.ArrayCollection(tasks);
            this.task_lst.dataProvider = this._taskInfo;
        };
        TaskView2.prototype.updateTask = function (taskId) {
            for (var j = 0; j < this._taskInfo.source.length; j++) {
                if (taskId == this._taskInfo.source[j].taskId) {
                    this._taskInfo.source[j].taskStatus = Cmd.TaskStatus.Task_Status_Received;
                    this._taskInfo.replaceItemAt(this._taskInfo.source[j], j);
                    break;
                }
            }
        };
        // private onDailyTask(evt: uniLib.ZqEvent): void {
        //     var curData: Cmd.RequestOnceTaskLobbyCmd_S = evt.param;
        //     if (curData.otherTaskInfo && curData.otherTaskInfo.length > 0) {
        //         this._taskInfo = new eui.ArrayCollection(curData.otherTaskInfo)
        //         this.task_lst.dataProvider = this._taskInfo;
        //     }
        // }
        // private taskNext(e:uniLib.ZqEvent):void{
        //     let rewardData: Cmd.GetDaysTaskRewardLobbyCmd_S = e.param;
        //     var followTasks:Cmd.DaysTaskItem[] = rewardData.followTasks
        //     if(followTasks && followTasks.length>0){
        //         for(var i:number=0;i<this._taskInfo.source.length;i++){
        //             if(rewardData.taskId == this._taskInfo.source[i].taskId){
        //                 this._taskInfo.replaceItemAt(followTasks[0],i);
        //                 break;
        //             }
        //         }
        //     }else{
        //         for(var j:number=0;j<this._taskInfo.source.length;j++){
        //             if(rewardData.taskId == this._taskInfo.source[j].taskId){
        //                 this._taskInfo.source[j].taskStatus = Cmd.TaskStatus.Task_Status_Received;
        //                 this._taskInfo.replaceItemAt(this._taskInfo.source[j],j);
        //                 break;
        //             }
        //         }
        //     }
        //     // this._lastV = this.scroll.viewport.scrollV;
        //     // this.task_lst.dataProvider = new eui.ArrayCollection(this._taskInfo);
        //     // this.task_lst.dataProviderRefreshed();
        //     // this.scroll.viewport.scrollV = this._lastV;
        // }
        TaskView2.prototype.scrollTTo = function (y) {
            this.scroll.viewport.scrollV = y;
        };
        TaskView2.prototype.destroy = function () {
            for (var i = 0; i < this.task_lst.numChildren; i++) {
                var child = this.task_lst.getChildAt(i);
                child && child.destroy();
            }
            this.task_lst = null;
            this.removeChildren();
        };
        return TaskView2;
    }(eui.Component));
    reward.TaskView2 = TaskView2;
    __reflect(TaskView2.prototype, "reward.TaskView2");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**
        * 获取新手奖励信息
        */
        CmdConstant.NOVICEINFO = "NoviceInfo";
        /**
        * 领取新手奖励
        */
        CmdConstant.NOVICEREWARD = "NoviceReward";
        /**
        * 返回每日任务
        */
        CmdConstant.INTOFREEGOLD = "IntoFreeGold";
        /**
        * 领取每日任务
        */
        CmdConstant.DAYSTASKREWARD = "DaysTaskReward";
        /**
        * ios领钻石列表
        */
        CmdConstant.IOSINVITEINFOLITTLE = "IosInviteInfoLittle";
        /**
        * ios领钻石
        */
        CmdConstant.IOSINVITEREWARDLITTLE = "IosInviteRewardLittle";
        /**
        * 获取钻石推荐信息
        */
        CmdConstant.DIAMONDINTERFACETIPS = "DiamondInterfaceTips";
        /**
        * 新人福利任务
        */
        CmdConstant.NEW_ONCETASK_LOBBY = "OnceTaskLobby";
        /**
        * 新人福利领取奖励
        */
        CmdConstant.NEW_ONCEREWARD_LOBBY = "OnceRewardLobby";
        /**
        * 服务器推送任务状态更新
        */
        CmdConstant.UPDATE_DAYS_TASK_LOBBY = "UpdateDaysTaskLobby";
        return CmdConstant;
    }());
    reward.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "reward.CmdConstant");
})(reward || (reward = {}));
var RewardReciveMgr = (function () {
    function RewardReciveMgr() {
    }
    return RewardReciveMgr;
}());
__reflect(RewardReciveMgr.prototype, "RewardReciveMgr");
var Cmd;
(function (Cmd) {
    /**
 * 获取新手奖励信息
 */
    function OnGetNoviceInfodLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(reward.CmdConstant.NOVICEINFO, rev.noviceInfo);
        }
    }
    Cmd.OnGetNoviceInfodLobbyCmd_S = OnGetNoviceInfodLobbyCmd_S;
    /**
     * 领取新手奖励
     */
    function OnGetNoviceRewarddLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.PopUpMgr.removePopUp(reward.FuLiPanel);
            // uniLib.Global.dispatchEvent(reward.CmdConstant.NOVICEREWARD, rev);
        }
    }
    Cmd.OnGetNoviceRewarddLobbyCmd_S = OnGetNoviceRewarddLobbyCmd_S;
    /**
     * 返回每日任务
     */
    function OnIntoFreeGoldLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(reward.CmdConstant.INTOFREEGOLD, rev);
        }
    }
    Cmd.OnIntoFreeGoldLobbyCmd_S = OnIntoFreeGoldLobbyCmd_S;
    /**
     * 领取奖励
     */
    function OnGetDaysTaskRewardLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.DAYSTASKREWARD, rev);
        var config = ConfigMgr.getInstance().getTaskCfgById(rev.taskId);
        if (config && config.taskReward) {
            var ary = [];
            for (var i = 0; i < config.taskReward.length; i++) {
                var vo = new Cmd.RewardItem();
                vo.goodId = config.taskReward[i].goodId;
                vo.goodNbr = config.taskReward[i].goodNbr;
                ary.push(vo);
            }
            var panel = new commonConfirm.RewardPanel();
            panel.initData2(ary);
            if (uniLib.Global.isInGame && LobbyModuleMgr.getInstance().panelScaleX) {
                panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.NOMAL, 1280 * panel.scaleX, 720);
            }
            else {
                uniLib.PopUpMgr.addPopUp(panel, null, true, false);
            }
        }
    }
    Cmd.OnGetDaysTaskRewardLobbyCmd_S = OnGetDaysTaskRewardLobbyCmd_S;
    /**
     * 领钻石列表数据
     */
    function OnGetIosInviteInfoLittleGameLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.IOSINVITEINFOLITTLE, rev);
    }
    Cmd.OnGetIosInviteInfoLittleGameLobbyCmd_S = OnGetIosInviteInfoLittleGameLobbyCmd_S;
    /**
     * 领钻石
     */
    function OnGetIosInviteRewardLittleGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(reward.CmdConstant.IOSINVITEREWARDLITTLE, rev);
            var goods = rev.single.goods;
            if (goods) {
                var vo = new commonConfirm.ReWardDataVo();
                vo.getDataByGoodId(goods.goodsId, goods.goodsNum);
                var panel = new commonConfirm.RewardPanel();
                panel.initData([vo]);
                if (uniLib.Global.isInGame && LobbyModuleMgr.getInstance().panelScaleX) {
                    panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                    uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.NOMAL, 1280 * panel.scaleX, 720);
                }
                else {
                    uniLib.PopUpMgr.addPopUp(panel, null, true, false);
                }
                wxgame.Global.instance.aldSendEvent("周边系统", "领钻石领取成功");
            }
        }
    }
    Cmd.OnGetIosInviteRewardLittleGameLobbyCmd_S = OnGetIosInviteRewardLittleGameLobbyCmd_S;
    function OnGetDiamondInterfaceTips_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.DIAMONDINTERFACETIPS, rev);
    }
    Cmd.OnGetDiamondInterfaceTips_S = OnGetDiamondInterfaceTips_S;
    /**
     * 新人福利任务
     */
    function OnRequestOnceTaskLobbyCmd_S(rev) {
        if (rev.resultCode == null)
            rev.resultCode = 0;
        if (rev.resultCode == 0)
            uniLib.Global.dispatchEvent(reward.CmdConstant.NEW_ONCETASK_LOBBY, rev);
    }
    Cmd.OnRequestOnceTaskLobbyCmd_S = OnRequestOnceTaskLobbyCmd_S;
    /**
     * 新人福利领取奖励
     */
    function OnGetOnceRewardLobbyCmd_S(rev) {
        if (rev.resultCode == null)
            rev.resultCode = 0;
        if (rev.resultCode == 0)
            uniLib.Global.dispatchEvent(reward.CmdConstant.NEW_ONCEREWARD_LOBBY, rev);
    }
    Cmd.OnGetOnceRewardLobbyCmd_S = OnGetOnceRewardLobbyCmd_S;
    /**
     * 新人福利领取奖励
     */
    function OnUpdateDaysTaskLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.UPDATE_DAYS_TASK_LOBBY, rev);
    }
    Cmd.OnUpdateDaysTaskLobbyCmd_S = OnUpdateDaysTaskLobbyCmd_S;
})(Cmd || (Cmd = {}));
