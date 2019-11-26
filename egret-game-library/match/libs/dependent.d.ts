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

    /**
	 * 通过shopID获取任务配置
	 */
    getCoinHunderedById(id: number): table.TableCoinHundredConfig

    /**
	 * 通过gameId获取游戏列表配置
	 */
    getGameListCfgById(gameId: number): table.TableLobbyGameList;
    getFishPlayByType(fishType: number): table.TableFishPlay;
    getFishByfishID(fishID: number): table.TableFish;
}

declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;

    /**
	 * 显示商城 
	 * @ selectIndex 选中哪一项 0钻石充值 1金币兑换
	 * */
    showMarketPanel(selectIndex: number);

    /**显示获取钻石面板 */
    showDiamondsPanel();

    /**显示领钻石 */
    showReceiveDiamonds();
    showDailyRecharge();
    loadGame(gameId:number,senceId: number,roomType:number);
}

declare class LoadPanelTipMgr {
    private static _instance;

    static getInstance(): LoadPanelTipMgr;

    loadRes(resouceId?: string, succ?: Function);
}

/**
 * 大厅数据
 */
declare class MJLobbyData {

    static getInstance(): MJLobbyData;

    lobbyId: number;

    myBaseInfo: Cmd.UserBaseInfo;

    userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;

    fishGunBei:number; //捕鱼子弹当前最高倍
}

declare class LoadGameTipUtil {
    static loadGame(gameId: any, succ?: Function, fail?: Function, process?: Function, thisObj?: any)
}

declare class MsgSendMgr {
    static enterGame(gameId: number, senceId: number,enter?:number,roomType?:number)
}

