
declare class NetMgr extends uniLib.NetMgr { }

/**配置表 */
declare class ConfigMgr {
    private static _instance;
    static getInstance(): ConfigMgr;
}

declare class MJLobbyData {
    static getInstance(): MJLobbyData;

}

declare class ComponentUtil {
    static getInstance(): ComponentUtil;
    public showConfirm(info: string, title?: string, oktxt?: string, okFunc?: Function, caltxt?: string, calFunc?: Function, thisObj?: any, removeFunc?: Function)
}

declare class LoadPanelTipMgr {
    static getInstance(): LoadPanelTipMgr;
    loadRes(resouceId?: string, succ?: Function)
}

declare class LobbyModuleMgr {
    static getInstance(): LobbyModuleMgr;
    showAwardPanel2(rewardItem: Cmd.RewardItem): void;
}


declare class Dictionary<TValue>  {
    [key: string]: TValue;
    [key: number]: TValue;
}
