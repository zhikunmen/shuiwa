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

    public showCustomer();
    /**话费兑换 
	 * ####### 这个函数名或者参数若有修改，请通知背包模块进行相应修改 ##########
	 * 0 兑换钻石
	 * 1 兑换现金红包
	*/
    public showLobbyActivePanel(selectIndex:number);
    showMarketPanel(selectIndex: number);
}



declare class ConfigMgr {
    public static getInstance(): ConfigMgr;
 
    public getGoodCfgById(goodId: number): table.TableGoodsConfig;
}

declare class LoadPanelTipMgr {
    public static getInstance(): LoadPanelTipMgr;
 
    public loadRes(resouceId?: string, succ?: Function): void;
}


