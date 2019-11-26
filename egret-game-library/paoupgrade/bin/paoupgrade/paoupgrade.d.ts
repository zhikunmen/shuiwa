/**
 * 游戏内任务面板
 */
declare module paoupgrade {
    class PaoBeiPanel extends eui.ItemRenderer {
        private paobei_lst;
        private pao_bar;
        private progress_txt;
        private _closeBtn;
        private _upBtn;
        private _guninfo;
        constructor(guninfo?: Cmd.FishGunInfo);
        protected childrenCreated(): void;
        private touchChange(evt);
        private onMsgReceiveHandler(e);
        private gunTimeChange(guninfo);
        destroy(): void;
    }
}
/**
 * 炮台升级面板
 */
declare module paoupgrade {
    class FishPerComponent extends egret.DisplayObjectContainer {
        private award;
        private upgrade;
        private redpack;
        private turntable;
        constructor();
        private initUI();
        destroy(): void;
    }
}
/**
 * 游戏内任务面板
 */
declare module paoupgrade {
    class GameInTaskPanel extends eui.Component {
        private item1;
        private item2;
        private left_btn;
        private right_btn;
        private scroll;
        private group;
        private close_btn;
        private open_btn;
        private _wanchengEffect;
        private allTasks;
        private index;
        private posX;
        private taskItems;
        private item_index;
        private isTween;
        private _curTaskId;
        private _receivedTaskId;
        private _reqType;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private initData(type);
        private onMsgReceiveHandler(evt);
        private updateTaskList(tasks);
        private getIndex(taskId);
        private onTouchTapHandler(evt);
        private effectType;
        playWanchenEffect(type: number): void;
        private effectComplete(e);
        private effectStop();
        private removeEvents();
        destroy(): void;
    }
}
/**
 * 游戏内红包
 */
declare module paoupgrade {
    class GameInTurnTable extends eui.Component {
        private turn_table;
        private receive;
        private countDown;
        private timer;
        private _info;
        private zhuanpan_btn;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private removeEvents();
        private onUpdateInfo(evt);
        private initTime(count);
        private addAnim();
        private onTouchHandle(e);
        private onTimerHandler(evt);
        private getReward(opType);
        destroy(): void;
    }
}
/**
 * 游戏内红包
 */
declare module paoupgrade {
    class NoviceRedPackageBtn extends eui.Component {
        private pro_lbl;
        private novice_bar;
        constructor();
        protected childrenCreated(): void;
        private onUpRedPack(evt);
        private updateData();
        destroy(): void;
    }
}
/**
 * 游戏内任务面板
 */
declare module paoupgrade {
    class PaoBeiItem extends eui.ItemRenderer {
        private pao_text;
        private reward_num;
        private need_icon;
        private need_num;
        constructor();
        dataChanged(): void;
    }
}
/**
 * 游戏内任务面板
 */
declare module paoupgrade {
    class GameInTaskItem extends eui.Component {
        private reward_icon;
        private reward_num;
        private task_title;
        private task_progress;
        private task_bar;
        constructor();
        protected childrenCreated(): void;
        setInfo(info: Cmd.DaysTaskItem): boolean;
        destroy(): void;
    }
}
declare module paoupgrade {
    class PaopgradeConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共guide需要加载的资源组
         */
        static PUB_PAOUPGRADE: string;
        static PUB_GAMEINTASK: string;
        static PUB_PAOBEI: string;
    }
}
/**
 * 炮台升级面板
 */
declare module paoupgrade {
    class PaoTaiUpgrade extends eui.Component {
        private open_btn;
        private group;
        private progress_group;
        private progress_txt;
        private pro_bar;
        private unlock_gun;
        private unlock_gold;
        private _opening;
        private _guninfo;
        private _finishEffect;
        private _canReward;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private initData();
        private onUserInfoChanged(e);
        private onMsgReceiveHandler(e);
        playFinishEffect(): void;
        private updateReward();
        private _tweening;
        private onTouchTapHandler(evt);
        private removeEvents();
        destroy(): void;
    }
}
/**
 * 炮台升级面板
 */
declare module paoupgrade {
    class TakeRedPack extends eui.Component {
        private open_btn;
        private group;
        private progress_group;
        private progress_txt;
        private pro_bar;
        private unlock_gun;
        private unlock_gold;
        private _opening;
        private _fishinfo;
        private _finishEffect;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private initData();
        private onMsgReceiveHandler(e);
        playFinishEffect(): void;
        private updateReward();
        private _tweening;
        private onTouchTapHandler(evt);
        private removeEvents();
        destroy(): void;
    }
}
/**
 * 游戏内任务面板
 */
declare module paoupgrade {
    class UpgradeOtherAward extends eui.Component {
        private paopao;
        private goodIcon;
        private goodGroup;
        private goodItem;
        private goodName;
        private goodNum;
        private goodNum1;
        private goodDesc;
        private fishGunBei;
        private tableFishGuns;
        private groupRect;
        constructor();
        protected childrenCreated(): void;
        private initUI();
        private addEvents();
        private gunTimeChange(gunbei);
        private changeReward(info);
        private onTouchTapHandler(evt);
        private stageTouchHandler(e);
        private onMsgReceiveHandler(e);
        private removeEvents();
        destroy(): void;
    }
}
declare module paoupgrade {
    class CmdConstant {
        /**返回子弹信息*/
        static GET_FISH_GUNINFO: string;
        /**解锁高倍子弹*/
        static UNLOCK_FISHGUN: string;
    }
}
declare class PaoUpgradeReciveMgr {
    constructor();
}
declare module Cmd {
    /**VIP-请求数据 */
    function OnRequestFishGunInfoCmd_S(rev: Cmd.RequestFishGunInfoCmd_S): void;
    function OnUnlockFishGunCmd_S(rev: Cmd.UnlockFishGunCmd_S): void;
}
