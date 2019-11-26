/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static platLogin(): void;;
    static getLoginCfg(tag?);
}

declare class ConfigMgr {
    static getInstance(): ConfigMgr;
    fishDraw: any;
    tableFish:any;
    getFishDrawById(id: number): table.TableFishDraw 
}

declare class LobbyModuleMgr {
    static getInstance(): LobbyModuleMgr;
    
    showDiamondsPanel();
    showMarketPanel(selectIndex: number);
    showVIPPanel(level?:number);
    showMonthCard();
    showLobbyActivePanel(selectIndex:number);
    panelScaleX:number;
}

declare class MJLobbyData  {
    public static getInstance(): MJLobbyData;
    public userInfoSynLobby: Cmd.UserInfoSynLobbyCmd_S;
}

declare class LoadPanelTipMgr {
    static getInstance(): LoadPanelTipMgr;
    loadRes(resouceId?: string, succ?: Function);
}

 



