
declare class NetMgr extends uniLib.NetMgr {
    static getLoginCfg(): any;
}

/**配置表 */
declare class ConfigMgr {
    private static _instance;
    static getInstance(): ConfigMgr;
}

declare class MJLobbyData {
    static getInstance(): MJLobbyData;
    lobbyId;
    /**每日签到 */
    sign: Dictionary<table.TableSignIn>;
    /**道具表 */
    goods: Dictionary<table.TableGoodsConfig>;
    /**任务 免费金币 */
    task: Dictionary<table.TableGameTaskConfig>;
    tableturn: Dictionary<table.TableTurnPro>;
    tabletask: Dictionary<table.TabletTask>;
}

declare class ComponentUtil {
    static getInstance(): ComponentUtil;
    public showConfirm(info: string, title?: string, oktxt?: string, okFunc?: Function, caltxt?: string, calFunc?: Function, thisObj?: any, removeFunc?: Function)
}

declare class LoadPanelTipMgr {
    static getInstance(): LoadPanelTipMgr;
    loadRes(resouceId?: string, succ?: Function)
}

declare class LobbyUtils {
    static changeTimeToStr(num: number): string;
}

declare class LobbyModuleMgr {
    static getInstance(): LobbyModuleMgr;
    showAwardPanel2(rewardItem: Cmd.RewardItem): void;
}

declare class Dictionary<TValue>  {
    [key: string]: TValue;
    [key: number]: TValue;
}
