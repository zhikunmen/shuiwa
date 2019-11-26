

declare class MahjongFourFacadeConst {
    public static USERINFO_DATA;
}
declare class NetMgr extends uniLib.NetMgr { }

declare class MJLobbyData {
    static getInstance(): MJLobbyData;
    lobbyId;
    lobbyConfig: table.TableLobbyGameList;
    getGameCreateConfig(gameId: number): table.TableCreateConfigList;
    /**每日签到 */
    sign: Dictionary<table.TableSignIn>;
    /**道具表 */
    goods: Dictionary<table.TableGoodsConfig>;
    /**任务 免费金币 */
    task: Dictionary<table.TableGameTaskConfig>;
}


declare class Dictionary<TValue>  {
    [key: string]: TValue;
    [key: number]: TValue;
}
