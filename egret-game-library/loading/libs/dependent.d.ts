
declare class NetMgr extends uniLib.NetMgr { }

declare class MJLobbyData {
    private static _instance;

    static getInstance(): MJLobbyData;
    /**loading界面是否显示红包 判断依据就是用户是否点击登录按钮*/
    isNovice: boolean;
}
