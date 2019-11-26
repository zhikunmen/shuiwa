/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
}
declare class ConfigMgr {
    public static getInstance(): ConfigMgr;
    public getGoodCfgById(goodId: number): table.TableGoodsConfig;
    public getTaskCfgById(taskId: number): table.LobbyTaskConfig;
    public getShopCfgById(shopId: number): table.TableShopConfig ;
    public getGameListCfgById(gameId: number): table.TableLobbyGameList;
}

declare class LobbyUserInfoBindPhonePanel extends eui.Component { }

declare class LoginScene extends uniLib.GameScene { }

declare class GameConsts{
    static LABEL_STYLE;
}