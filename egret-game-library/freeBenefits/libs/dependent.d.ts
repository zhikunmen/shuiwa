/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
    /**授权登出 */
    static authoLogout();
}


declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;

    public showCustomer();
}

declare class MJLobbyData {
    public static getInstance(): MJLobbyData;
    /**小游戏远程路径 */
    public static wxGameResPath: string;
    public dtlaunchaward: boolean;

    /**小程序当前渠道 */
    public qudao: number;

    /**获取登录消息 */
    public userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
    // public set userInfoSynLobby(data: Cmd.UserInfoSynLobbyCmd_S);
}


declare class LoadPanelTipMgr {
    public static getInstance(): LoadPanelTipMgr;
    public loadRes(resouceId?: string, succ?: Function): void
}

/**红点 */
declare class LobbyRedPointMgr {
    public static instance: LobbyRedPointMgr;

    /**注册红点 
    * @param key 注册码
    * @param value 二维数组 0红点 1要显示的数字label
   */
    public registerRedPoint(key: number, displayArr: Array<Array<egret.DisplayObject>>);

    /**
    * 取消注册红点 这里需要把所有的红点重新刷新一次
    */
    public unregisterRedPoint(key: number);
}

declare class CmdConstant {
    /**页面信息（通用）*/
    public static GET_PAGE_INFO;
}

declare class ConfigMgr {
    public static getInstance(): ConfigMgr;
    public getGoodCfgById(goodId: number): table.TableGoodsConfig;
}

declare class LobbyUtils {
    public static instance: LobbyUtils;
    public dealLoadError(desc: string, callBack?: Function, callObj?: any);
    public enterLobbyLoadGroup();
}

