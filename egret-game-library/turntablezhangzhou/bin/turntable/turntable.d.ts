declare module turntable {
    class TurnTable extends commonpanel.LobbyBaseEuiPanel {
        /**中间旋转区域 */
        private turnTable;
        /**转盘结束获奖动画*/
        private sgEffect;
        /**转盘闪光1 */
        private turntable;
        /**转盘闪光2 */
        private turntable1;
        /**抽奖按钮 */
        private cjImg;
        /**关闭按钮 */
        private _closebtn;
        /** 页面数据 剩余积分 金额 任务完成度*/
        private data;
        /**当前积分 */
        private _integralText;
        /**当前金额 */
        private _moneyText;
        /**无抽奖记录提示 */
        private _tipsText;
        /**抽奖记录按钮 */
        private _drawRecordBtn;
        /**每日任务按钮 */
        private _dailyTasksBtn;
        /** 每日任务显示数据*/
        private _taskGroup;
        /** 每日任务list*/
        private _taskList;
        /** 每日任务list集合器*/
        private _taskListAC;
        /**抽奖记录 */
        private _recordGroup;
        /**抽奖记录list */
        private _recordList;
        /**抽奖记录list集合器*/
        private _recordListAC;
        /**抽奖记录数据储存 */
        private _recordData;
        /**红包提现按钮*/
        private _receiveBtn;
        protected constructor();
        protected createChildren(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**进入页面 显示 */
        private setData(evt);
        /**更新任务数据 */
        private updateTaskList();
        /**可以抽奖咯 我要中888现金大奖！*/
        private goLuckDraw(evt);
        private RedPack(evt);
        /**请求抽奖记录 */
        private getRecord();
        /**获得并显示抽奖记录 */
        private showRecord(evt);
        /**更新抽奖记录*/
        private updateRecordList();
        /**开始转盘 */
        private beginTurnTable(data);
        private onTouchEvent(e);
        /**更新右侧显示 */
        private updateShow();
        protected destroy(): void;
    }
}
declare module turntable {
    /**抽奖记录 */
    class TurnTableRecordItemPanel extends eui.ItemRenderer {
        /**背景 */
        private _bg;
        /**时间 */
        private _timeText;
        /** 奖品*/
        private _prizeText;
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare module turntable {
    /**转盘 任务列表 */
    class TurnTableTaskItemPanel extends eui.ItemRenderer {
        /** 任务名称*/
        private _taskText;
        /** */
        private _integralImg;
        /**背景 */
        private _bg;
        /** */
        private _taskNumText;
        /** 进度*/
        private _processText;
        /** */
        private _info;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}
declare module turntable {
    class TurntableConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_TURNTABLE: string;
        /**数据无误 */
        static SUCCESS: number;
        /** 漳州新增转盘  进入转盘界面*/
        static IntoZZTurnTableLobby: string;
        /** 漳州新增转盘 转动转盘*/
        static ZZTurnTableLobby: string;
        /** 漳州新增转盘 获奖记录*/
        static GetZZTurnTableRecordsLobby: string;
        /** 领取红包钱*/
        static OpenRedPackLobby: string;
        /**是否当前可转转盘*/
        static CANTURNTABLE: string;
    }
}
declare module turntable {
    class TurntableData {
        private static _instance;
        static getInstance(): TurntableData;
        /**是否当前可以转转盘 */
        canTurnTable: Boolean;
    }
}
declare module Cmd {
    function TurntableDispatch(cmd: string, obj?: any, bubbles?: boolean): void;
    /**领取红包钱*/
    function OnOpenRedPackLobbyCmd_S(rev: Cmd.OpenRedPackLobbyCmd_S): void;
    /** 漳州新增转盘 转动转盘 */
    function OnZZTurnTableLobbyCmd_CS(rev: Cmd.ZZTurnTableLobbyCmd_CS): void;
    /**漳州新增转盘  进入转盘界面 */
    function OnIntoZZTurnTableLobbyCmd_CS(rev: Cmd.IntoZZTurnTableLobbyCmd_CS): void;
    /**漳州新增转盘 获奖记录 */
    function OnGetZZTurnTableRecordsLobbyCmd_CS(rev: Cmd.GetZZTurnTableRecordsLobbyCmd_CS): void;
}
declare module turntable {
    class TurntableModuleMgr {
        private static _instance;
        static getInstance(): TurntableModuleMgr;
    }
}
declare module turntable {
    class TurntableSendMgr {
        /**请求使用物品
        * @param goodId 兑换物品id
        * @param num 兑换数量
        */
        static ExchangeRequest(num: number, goodId: number): void;
    }
}
