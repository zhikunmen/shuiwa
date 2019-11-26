/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
}



declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;
    panelScaleX:number;
    showDiamondsPanel();
    showMarketPanel(selectIndex: number);
}

declare class MJLobbyData {
    public static getInstance(): MJLobbyData;
    lobbyId: number;
    public userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
}

declare class LoadPanelTipMgr {
    public static getInstance(): LoadPanelTipMgr;
    loadRes(resouceId?: string, succ?: Function);
}

