/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
}



declare class LobbyModuleMgr {

    static getInstance(): LobbyModuleMgr;

    showDiamondsPanel();
    showMarketPanel(selectIndex: number);
}

declare class MJLobbyData  {
    public static getInstance(): MJLobbyData;
    public userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
}

declare class ConfigMgr {

    static getInstance(): ConfigMgr;
    public getFishVipByLv(vipLv: number):table.TableFishVIP;
    public getFishGunTypeByID(id: number): table.TableFishGunType;
}

