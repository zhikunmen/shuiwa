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

    showDiamondsPanel();
    showMarketPanel(selectIndex: number);
}

declare class MJLobbyData  {
    public static getInstance(): MJLobbyData;
    public userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
    public lobbyId:number;
}

