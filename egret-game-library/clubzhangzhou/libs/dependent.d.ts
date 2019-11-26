
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

declare class LobbyDataCache {
    static bundleInfo;
}

declare class MJLobbyData {
    static getInstance(): MJLobbyData;
    lobbyId;
    lobbyConfig: table.TableLobbyGameList;
    /**全局查看录像房间id */
    globalRoomId: number;
    getGameCreateConfig(gameId: number): table.TableCreateConfigList;
}

declare class ComponentUtil {
    static getInstance(): ComponentUtil;
    public showConfirm(info: string, title?: string, oktxt?: string, okFunc?: Function, caltxt?: string, calFunc?: Function, thisObj?: any, removeFunc?: Function)
}

declare class LoadPanelTipMgr {
    static getInstance(): LoadPanelTipMgr;
    loadRes(resouceId?: string, succ?: Function)
}

declare class LobbyModuleMgr {
    static getInstance(): LobbyModuleMgr;
    showJoinRoomPanel(callBack: Function)
    showRecordPanel(): void
    showRecordDetail(callBack: Function)
    showLookVideoPanel(): void;
}

declare class CreateGamePanel {
    constructor(param?: CreatePanelParam)
}

declare class ResGroupConsts {
    static MJL_CREATEPANEL;
    static MJL_USERINFO;
    static MJL_RECORD;
}

declare class LobbyUtils {
    static changeTimeToStr(num: number): string;
    static changeTimeToStrTwoLine(num: number): string;
    static changeTimeToStrDay(num: number): string;
}

declare class CreatePanelParam {
    constructor(type?: number, data?: Cmd.ChangeMatchGroupCmd_S)
    /**type 0/普通 1俱乐部创建 创建类型 */
    type: number;
    data: Cmd.ChangeMatchGroupCmd_S;
}

declare class MsgSendMgr {
    static getNormalGameList(isClub?: number): void;
    static getGetNewShareInfo(globalRoomId: number): void;
}


declare class CmdConstant {
    public static HISTORY_DATA: string;
}