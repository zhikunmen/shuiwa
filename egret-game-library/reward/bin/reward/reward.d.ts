declare module reward {
    class TaskView extends eui.Component {
        task_lst: eui.List;
        private _taskInfo;
        private scroll;
        private _lastV;
        constructor();
        protected childrenCreated(): void;
        private initData();
        private onDailyTask(evt);
        private filterExamine(otherTaskInfo);
        private taskNext(e);
        destroy(): void;
    }
}
declare module reward {
    class DiamondsPanel extends eui.Component {
        private _closeBtn;
        private itme1;
        private itme2;
        private itme3;
        private itme4;
        private groups;
        private effects;
        private _funs;
        private _arg;
        constructor();
        protected childrenCreated(): void;
        private initData(type?);
        private onDiamondInterfaceTips(evt);
        private clearEffect();
        private addEffect(index);
        /**
         * 设置回调函数
         * 数组第一个：分享有礼
         *  第二个：每日任务
         * 第三个：免费钻石赛
         * 第四个：领钻石
         * 第五个：商城
        */
        setBackFuns(funs: Function[], arg: any[]): void;
        private onTouchHandler(evt);
        private callFun(index);
        destroy(): void;
    }
}
declare module reward {
    /**
     * 大厅福利界面
     */
    class FuLiPanel extends eui.Component {
        sign_rbtn: eui.RadioButton;
        task_rbtn: eui.RadioButton;
        introduce_rbtn: eui.RadioButton;
        close_btn: eui.WxButton;
        introduce_grp: eui.Group;
        sign_view: reward.SignView;
        task_view: reward.TaskView;
        red1: eui.Image;
        red2: eui.Image;
        private content;
        private operate;
        private _viewGroup;
        private _btnGroup;
        /**
        * 默认菜单
        */
        private _defaultMenu;
        private _introduce;
        constructor(defaultMenu?: number, introduce?: string[]);
        protected childrenCreated(): void;
        private addRedPoint();
        private removeRedPoint();
        private showTabContent(evt);
        private onTouchHandler(evt);
        /**
         * 签到领取了之后直接显示任务
         */
        private onNoviceInfo(evt);
        destroy(): void;
    }
}
declare module reward {
    class ReceiveDiamondsItem extends eui.ItemRenderer {
        private user_head;
        private user_name;
        private _receiveBtn;
        private _receiveed;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        private onTouchHandler(evt);
    }
}
declare module reward {
    class RewardConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 奖励钻石方面的资源组
         */
        static PUB_REWARD: string;
        /**
         * 福利的资源组
         */
        static PUB_FULI: string;
        /**
         * 捕鱼福利的资源组
         */
        static PUB_BUYU_FULI: string;
        /**
         * 活跃宝箱
         */
        static ACTIVE_BOX: string;
    }
}
declare module reward {
    class SignItem extends eui.ItemRenderer {
        private sign_bg;
        private sign_corn;
        private sign_day;
        private sign_good_name;
        private sign_mask;
        private sign_icon;
        constructor();
        protected dataChanged(): void;
        setReceived(day: number): void;
    }
}
declare module reward {
    class SignView extends eui.Component {
        private POSX;
        private POSY;
        private items;
        private noviceInfo;
        viewVideo_btn: eui.WxButton;
        receive_lbl: eui.Label;
        constructor();
        protected childrenCreated(): void;
        private initData();
        onNoviceInfo(param: Cmd.NoviceItem[]): void;
        private onNoviceReward(evt);
        private onTouchHandler(evt);
        getRewardDouble(): void;
        destroy(): void;
    }
}
declare module reward {
    class TaskItem extends eui.ItemRenderer {
        progress_img: eui.Image;
        progress_mask: eui.Rect;
        good_icon: eui.Image;
        good_num: eui.Label;
        good_content: eui.Label;
        private good_gress;
        go_btn: eui.WxButton;
        rev_btn: eui.WxButton;
        private skipType;
        constructor();
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module reward {
    class DiamondsReceivePanel extends eui.Component {
        _shareBtn: eui.WxButton;
        scroll: eui.Scroller;
        diamond_lst: eui.List;
        _closeBtn: eui.WxButton;
        empty_group: eui.Group;
        _shareBtn2: eui.WxButton;
        private index;
        private info;
        constructor();
        protected childrenCreated(): void;
        private scrollChange(evt);
        private loadRankData();
        private onIosInviteInfoLittle(evt);
        private onIosInviteRewardLittle(evt);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module eui {
    class WxContain extends eui.Group {
        constructor();
        protected childrenCreated(): void;
        private init();
        protected onTouchBegin(): void;
        protected onTouchEnd(): void;
        protected onTouchCancel(): void;
        protected onTouchMove(): void;
        protected onTouchReleaseOutside(): void;
        dispose(): void;
    }
}
declare module reward {
    class ActiveBoxPanel extends eui.Component {
        private goods;
        private _taskReward;
        private _items;
        constructor(taskReward: table.LobbyTaskConfig.TaskRewardItem[]);
        protected childrenCreated(): void;
        destroy(): void;
    }
    class RewardItem extends egret.DisplayObjectContainer {
        private gift;
        info: table.LobbyTaskConfig.TaskRewardItem;
        constructor($info: table.LobbyTaskConfig.TaskRewardItem);
        private initUI($info);
        destroy(): void;
    }
}
declare module reward {
    class EnergyView extends eui.Component {
        private reward_contain;
        private energy_total;
        private energy_pro;
        private items;
        private taskInfo;
        private maxValue;
        constructor();
        protected childrenCreated(): void;
        private initData();
        private onDailyTask(evt);
        private onUpdateDaysTask(e);
        private updateProgress(current);
        private onTouchHandler(evt);
        destroy(): void;
    }
    class EnergyItem extends egret.DisplayObjectContainer {
        private gift;
        private txt;
        private _index;
        condition: number;
        taskId: number;
        taskStatus: number;
        constructor(info: Cmd.DaysTaskItem, index: number);
        private initUI(info, index);
        setRewardState(taskStatus: Cmd.TaskStatus): void;
        destroy(): void;
    }
}
declare module reward {
    /**
     * 大厅福利界面
     */
    class NewFuLiPanel extends eui.Component {
        men_rbtn1: eui.RadioButton;
        men_rbtn2: eui.RadioButton;
        men_rbtn3: eui.RadioButton;
        close_btn: eui.WxButton;
        task_view1: reward.TaskView2;
        task_view2: reward.TaskView2;
        task_view3: reward.TaskView2;
        red1: eui.Image;
        red2: eui.Image;
        private _viewGroup;
        private _btnGroup;
        private _defaultMenu;
        /**
        * 默认任务
        */
        private _taskId;
        private _pos;
        constructor(taskId?: number);
        protected childrenCreated(): void;
        private initData();
        private onOnceTaskHandler(evt);
        private setMenu(defaultMenu);
        private findTask(tasks);
        private onOnceRewardHandler(evt);
        private showTabContent(evt);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module reward {
    class TaskItem2 extends eui.ItemRenderer {
        progress_img: eui.Image;
        progress_mask: eui.Rect;
        good_icon: eui.Image;
        good_content: eui.Label;
        private good_gress;
        private reward_icon;
        private reward_num;
        go_btn: eui.WxButton;
        rev_btn: eui.WxButton;
        private skipType;
        constructor();
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module reward {
    class TaskView2 extends eui.Component {
        task_lst: eui.List;
        private _taskInfo;
        private scroll;
        private _lastV;
        constructor();
        protected childrenCreated(): void;
        setData(tasks: Cmd.DaysTaskItem[]): void;
        updateTask(taskId: number): void;
        scrollTTo(y: number): void;
        destroy(): void;
    }
}
declare module reward {
    class CmdConstant {
        /**
        * 获取新手奖励信息
        */
        static NOVICEINFO: string;
        /**
        * 领取新手奖励
        */
        static NOVICEREWARD: string;
        /**
        * 返回每日任务
        */
        static INTOFREEGOLD: string;
        /**
        * 领取每日任务
        */
        static DAYSTASKREWARD: string;
        /**
        * ios领钻石列表
        */
        static IOSINVITEINFOLITTLE: string;
        /**
        * ios领钻石
        */
        static IOSINVITEREWARDLITTLE: string;
        /**
        * 获取钻石推荐信息
        */
        static DIAMONDINTERFACETIPS: string;
        /**
        * 新人福利任务
        */
        static NEW_ONCETASK_LOBBY: string;
        /**
        * 新人福利领取奖励
        */
        static NEW_ONCEREWARD_LOBBY: string;
        /**
        * 服务器推送任务状态更新
        */
        static UPDATE_DAYS_TASK_LOBBY: string;
    }
}
declare class RewardReciveMgr {
    constructor();
}
declare module Cmd {
    /**
 * 获取新手奖励信息
 */
    function OnGetNoviceInfodLobbyCmd_S(rev: Cmd.GetNoviceInfodLobbyCmd_S): void;
    /**
     * 领取新手奖励
     */
    function OnGetNoviceRewarddLobbyCmd_S(rev: Cmd.GetNoviceRewarddLobbyCmd_S): void;
    /**
     * 返回每日任务
     */
    function OnIntoFreeGoldLobbyCmd_S(rev: Cmd.IntoFreeGoldLobbyCmd_S): void;
    /**
     * 领取奖励
     */
    function OnGetDaysTaskRewardLobbyCmd_S(rev: Cmd.GetDaysTaskRewardLobbyCmd_S): void;
    /**
     * 领钻石列表数据
     */
    function OnGetIosInviteInfoLittleGameLobbyCmd_S(rev: Cmd.GetIosInviteInfoLittleGameLobbyCmd_S): void;
    /**
     * 领钻石
     */
    function OnGetIosInviteRewardLittleGameLobbyCmd_S(rev: Cmd.GetIosInviteRewardLittleGameLobbyCmd_S): void;
    function OnGetDiamondInterfaceTips_S(rev: Cmd.GetDiamondInterfaceTips_S): void;
    /**
     * 新人福利任务
     */
    function OnRequestOnceTaskLobbyCmd_S(rev: Cmd.RequestOnceTaskLobbyCmd_S): void;
    /**
     * 新人福利领取奖励
     */
    function OnGetOnceRewardLobbyCmd_S(rev: Cmd.GetOnceRewardLobbyCmd_S): void;
    /**
     * 新人福利领取奖励
     */
    function OnUpdateDaysTaskLobbyCmd_S(rev: Cmd.UpdateDaysTaskLobbyCmd_S): void;
}
