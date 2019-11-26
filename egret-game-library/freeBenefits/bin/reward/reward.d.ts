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
    class DiamondsPanel extends eui.Component {
        private _closeBtn;
        private itme1;
        private itme2;
        private itme3;
        private itme4;
        private itme5;
        private groups;
        private effects;
        private _funs;
        private _arg;
        constructor();
        protected childrenCreated(): void;
        private initData(type);
        private platformOper(obj);
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
        private _viewGroup;
        private _btnGroup;
        /**
        * 默认菜单
        */
        private _defaultMenu;
        constructor(defaultMenu?: number);
        protected childrenCreated(): void;
        private showTabContent(evt);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module reward {
    /**月卡 */
    class MonthlyCard extends eui.Component {
        purchase_btn: eui.WxButton;
        close_btn: eui.WxButton;
        desc_lbl: eui.Label;
        iosDes_lbl: eui.Label;
        private _timeIndex;
        constructor();
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module reward {
    /**
     * 领取月卡
     */
    class MonthlyCardRecv extends eui.Component {
        close_btn: eui.WxButton;
        left_lbl: eui.Label;
        renew_lbl: eui.Label;
        rev_btn: eui.WxButton;
        private _data;
        constructor(data: Cmd.GetMonthCardInfoLobbyCmd_S);
        childrenCreated(): void;
        private onTouchHandler(evt);
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
         * 福利的资源组
        */
        static REWARD_VIP: string;
    }
}
declare module reward {
    class DiamondsReceivePanel extends eui.Component {
        private _closeBtn;
        private desc;
        private _shareBtn;
        private diamond_lst;
        private _count;
        private scroll;
        private empty_group;
        private _shareBtn2;
        private index;
        private info;
        constructor();
        protected childrenCreated(): void;
        private scrollChange(evt);
        private loadRankData();
        private onIosInviteInfoLittle(evt);
        private operateText(yet, total);
        private onIosInviteRewardLittle(evt);
        private onTouchHandler(evt);
        destroy(): void;
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
        private onNoviceInfo(evt);
        private operateNum();
        private onNoviceReward(evt);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module reward {
    class TaskItem extends eui.ItemRenderer {
        progress_img: eui.Image;
        good_icon: eui.Image;
        good_num: eui.Label;
        good_content: eui.Label;
        go_btn: eui.WxButton;
        rev_btn: eui.WxButton;
        constructor();
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module reward {
    class TaskView extends eui.Component {
        task_lst: eui.List;
        constructor();
        protected childrenCreated(): void;
        private initData();
        private onDailyTask(evt);
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
}
