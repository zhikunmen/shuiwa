/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
}



declare class LobbyModuleMgr {
    static getInstance(): LobbyModuleMgr;
    showNewFuliPanel(index?: number)
    showMarketPanel(selectIndex: number);
    /**游戏内转盘 */
	showGameInTurn(rev?: Cmd.GetInfoTurnTableCmd_S)
    panelScaleX:number;
    showFishDraw(info?:Cmd.GetFishLuckyDrawInfoLobbyCmd_S);
}

declare class ConfigMgr  {
    public static getInstance(): ConfigMgr;
    public getTaskCfgById(taskId: number): table.LobbyTaskConfig;
    getGoodCfgById(goodId: number): table.TableGoodsConfig
}

/**
 * 大厅数据
 */
declare class MJLobbyData {

    static getInstance(): MJLobbyData;

    fishGunBei:number; //捕鱼子弹当前最高倍
}

declare class LoadPanelTipMgr {
    private static _instance;

    static getInstance(): LoadPanelTipMgr;

    loadRes(resouceId?: string, succ?: Function);
}




