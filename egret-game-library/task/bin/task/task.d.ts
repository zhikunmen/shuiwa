declare module task {
    class GameTaskItem extends eui.ItemRenderer {
        private desc_text;
        private reward_text;
        private progress_text;
        private reward_icon;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        private clear();
        destroy(): void;
    }
}
declare module task {
    class GameTaskPanel extends eui.Component {
        private task_list;
        private _gameId;
        private _sceneId;
        private _currentTasks;
        private _anim;
        private _bombNum;
        constructor(gameId: number, sceneId: number);
        protected childrenCreated(): void;
        private initData();
        private addEvents();
        private removeEvents();
        /**
         * 刷新页面数据
         */
        private listUpdata(e);
        /**
        * 刷新页面数据
        */
        private itemUpdata(e);
        /**
        * 刷新页面数据
        */
        private itemNext(e);
        private playAnim(taskId, index);
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
        /**更新任务*/
        static UPDATE_GAME_TASK_DATA: string;
        /**更新下个任务*/
        static NEXT_GAME_TASK_DATA: string;
    }
}
declare class TaskReciveMgr {
    constructor();
}
declare module Cmd {
    /**任务列表-请求数据 */
    function OnGetGameTaskListLobbyCmd_S(rev: Cmd.GetGameTaskListLobbyCmd_S): void;
    /**任务更新 */
    function OnGetGameTaskScheduleLobbyCmd_S(rev: Cmd.GetGameTaskScheduleLobbyCmd_S): void;
    /**任务更新 */
    function OnGetGameTaskRewardLobbyCmd_S(rev: Cmd.GetGameTaskRewardLobbyCmd_S): void;
}
