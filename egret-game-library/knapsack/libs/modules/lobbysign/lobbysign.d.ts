declare module lobbysign {
    class LobbySignPanel extends commonpanel.LobbyBaseEuiPanel {
        private _expBr;
        private _signRewardItemList;
        private _signDayOfWeekItemList;
        private _signBtn;
        private _totalTxt;
        private _data;
        private _rewardlist;
        private _dayofweeklsit;
        /**当前要领取的礼包id */
        static rewardId: number;
        constructor();
        protected childrenCreated(): void;
        destroy(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        setData(evt: uniLib.ZqEvent): void;
        /**签到 */
        update(): void;
        /**签到 */
        sign(): void;
        getReward(evt: uniLib.ZqEvent): void;
        signDayOfWeek(evt: uniLib.ZqEvent): void;
        /**展示领取金币动画 */
        private showAwardPanel(id, type);
    }
}
declare module lobbysign {
    class SignConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static LOBBY_SIGN: string;
        /**金币场用户签到信息返回 */
        static SIGN_INFO: string;
        /**金币场用户签到返回 */
        static SIGN_TODAY: string;
        /**金币场累积签到奖励 */
        static SIGN_CONTINUE: string;
    }
    /**暂存数据 对应表数据 */
    class Data {
        /**每日签到 */
        static sign: Dictionary<table.TableSignIn>;
        /**道具表 */
        static goods: Dictionary<table.TableGoodsConfig>;
        /**任务 免费金币 */
        static task: Dictionary<table.LobbyTaskConfig>;
    }
}
declare module lobbysign {
    class SignDayOfWeekItemPanel extends eui.ItemRenderer {
        private bg;
        private dayTxt;
        private goldTxt;
        private icon;
        private tick;
        private _id;
        private _sRewardTabledata;
        info: Cmd.UserSignInfoLobbyCmd_S;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare module Cmd {
    function signDispatch(cmd: string, obj?: any, bubbles?: boolean): void;
    /**金币场用户今日签到返回 */
    function OnUserSignTodayLobbyCmd_S(rev: Cmd.UserSignTodayLobbyCmd_S): void;
    /**用户累计签到奖励 */
    function OnUserSignContinueLobbyCmd_S(rev: Cmd.UserSignContinueLobbyCmd_S): void;
}
declare module lobbysign {
    class SignRewardItemPanel extends eui.ItemRenderer {
        private guang;
        private _guangImg;
        private dayTxt;
        private bg;
        private goldTxt;
        private tick;
        private _id;
        info: Cmd.ContinueSignInfo;
        private _cRewardTabledata;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        getReward(evt: egret.Event): void;
        /**背景光旋转 */
        private guangtween(val);
    }
}
declare module lobbysign {
    class SignSendMgr {
        /**请求签到数据 */
        static getUserSignInfo(): void;
        /**
         * 每日签到
         * 是否为每日签到
         *  */
        static getSignToday(today: boolean, continueSignId?: number): void;
    }
}
