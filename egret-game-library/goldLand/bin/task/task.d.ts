declare module task {
    class GameTaskItem extends eui.ItemRenderer {
        private desc_text;
        private reward_text;
        private progress_text;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module task {
    class GameTaskPanel extends eui.Component {
        private task_list;
        private _gameId;
        constructor(gameId: number);
        protected childrenCreated(): void;
        private initData();
        private addEvents();
        private removeEvents();
        /**
         * 刷新页面数据
         */
        private updata(e);
        destroy(): void;
    }
}
declare module task {
    class TaskConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 需要加载的游戏内任务资源组
         */
        static PUB_GAME_TASK: string;
    }
}
declare module task {
    class CmdConstant {
        /**游戏内任务列表*/
        static GAME_TASK_LIST_DATA: string;
    }
}
declare class TaskReciveMgr {
    constructor();
}
declare module Cmd {
    /**摇钱树-请求数据 */
    function OnGetGameTaskListLobbyCmd_S(rev: Cmd.GetGameTaskListLobbyCmd_S): void;
}
