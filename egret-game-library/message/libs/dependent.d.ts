/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr { }

/**配置表 */
declare class ConfigMgr {
    private static _instance;

    static getInstance(): ConfigMgr;

    /**
	 * 通过goodId获取物品配置
	 */
    getGoodCfgById(goodId: number): table.TableGoodsConfig;
}

declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;

    showMarketPanel();
}

/**
 * 大厅数据
 */
declare class MJLobbyData {
    private static _instance;

    static getInstance(): MJLobbyData;

    myBaseInfo: Cmd.UserBaseInfo;
}