declare module guide {
    class FirstGuidePanel extends eui.Component {
        exchange_btn: eui.WxButton;
        sign_lst: eui.List;
        todayReward_lbl: eui.Label;
        reward_blbl: eui.BitmapLabel;
        desc_lbl: eui.Label;
        private _info;
        constructor(info?: Cmd.GetNewRedPackdInfoHpMatchCmd_S);
        childrenCreated(): void;
        private setData(info);
        private onTouchHandler(evt);
        private onItemTap();
        private onUpdate(evt);
        destroy(): void;
    }
}
declare module guide {
    class GuideConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        static REDPACK_DATA: string;
        static GUIDE_TASK_DATA: string;
        static CLOSE_GUIDE_TASK: string;
        /**
         * 新的新手指引 -- 签到
         */
        static PUB_GUIDE_NEW: string;
        /**新手任务 */
        static GUIDE_TASK: string;
        /**新手比赛 */
        static GUIDE_GAME: string;
    }
}
declare module Cmd {
    function OnGetNewRedPackdInfoHpMatchCmd_S(rev: Cmd.GetNewRedPackdInfoHpMatchCmd_S): void;
    function OnGetGrowTaskInfoHpMatchCmd_S(rev: Cmd.GetGrowTaskInfoHpMatchCmd_S): void;
}
declare module guide {
    class GuideGuideGame extends eui.Component {
        click_btn: eui.WxButton;
        private skins;
        private _fun;
        constructor(type?: number, fun?: Function);
        childrenCreated(): void;
        private onTouch();
    }
}
declare module guide {
    /**
     * 新手七日成长任务
     */
    class GuideTaskPanel extends eui.Component {
        light_img: eui.Image;
        exchange_btn: eui.WxButton;
        task_lst: eui.List;
        day_lst: eui.List;
        reward_lbl: eui.Label;
        giftCount_lbl: eui.Label;
        pro_lbl: eui.Label;
        proBg_img: eui.Image;
        pro_img: eui.Image;
        private _selectIndex;
        private _taskCollArr;
        private _info;
        constructor(info?: Cmd.GetGrowTaskInfoHpMatchCmd_S);
        childrenCreated(): void;
        private setData(info);
        private onItemTap(evt);
        private onTouchHandler(evt);
        private onUpdate(evt);
        private close();
        destroy(): void;
    }
}
