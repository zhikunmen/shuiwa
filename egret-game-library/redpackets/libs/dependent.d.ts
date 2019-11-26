
declare class NetMgr extends uniLib.NetMgr {
    public static getLoginCfg(): any;
}

/**配置表 */
declare class ConfigMgr {
    private static _instance;

    static getInstance(): ConfigMgr;
    /**
	 * 通过goodId获取物品配置
	 */
    getGoodCfgById(goodId: number): table.TableGoodsConfig;
}

declare class LobbyDataCache {
    static bundleInfo: any;//原生层发来的info
}

declare class MJLobbyData {
    private static _instance;

    static getInstance(): MJLobbyData;

    lobbyConfig: table.TableLobbyGameList;
}
