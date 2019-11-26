
declare class NetMgr extends uniLib.NetMgr{}

/**配置表 */
declare class ConfigMgr {
    private static _instance;

    static getInstance(): ConfigMgr;

    /**
	 * 通过goodId获取物品配置
	 */
    getGoodCfgById(goodId: number): table.TableGoodsConfig;
}