/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
}

declare class ConfigMgr {
    public static getInstance(): ConfigMgr;
    /**
    * 通过lobbyId获取配置
    */
    public getGameListCfgById(lobbyId: number): table.TableLobbyGameList;
    /**
    * 通过shopID获取商城配置
    */
    public getShopCfgById(shopId: number): table.TableShopConfig;
    public getGoodCfgById(goodId: number): table.TableGoodsConfig;
    public getTaskCfgById(taskId: number): table.LobbyTaskConfig;
    public getGameTaskCfgById(taskId: number): table.TableGameTaskConfig;
}



