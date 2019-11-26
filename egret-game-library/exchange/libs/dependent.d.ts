
declare class NetMgr extends uniLib.NetMgr { }

/**配置表 */
declare class ConfigMgr {
    private static _instance;

    static getInstance(): ConfigMgr;
    /**
     * 通过lobbyId获取配置
     */
    public getGameListCfgById(lobbyId: number): table.TableLobbyGameList;

    /**
	 * 通过shopID获取商城配置
	 */
    public getShopCfgById(shopId: number): table.TableShopConfig;
    /**
	 * 通过goodId获取物品配置
	 */
    getGoodCfgById(goodId: number): table.TableGoodsConfig;
}

declare class MJLobbyData {
    private static _instance;

    static getInstance(): MJLobbyData;

    public lobbyId: number;

    public userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
}

declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;
    /**授权面板 */
    public showAuthonPanel();
}

