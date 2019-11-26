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
    /** 通过天数获取当天的所有任务*/
    public getTaskCfgByDay(day: number): table.LobbyTaskConfig[];
    public getShopCfgById(shopId: number): table.TableShopConfig;
    public getGameListCfgById(gameId: number): table.TableLobbyGameList;
}
declare class LobbyUserInfoBindPhonePanel extends eui.Component { }

declare class LoginScene extends uniLib.GameScene { }

declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;

    showDiamondsPanel();

    /**话费兑换 
      * ####### 这个函数名或者参数若有修改，请通知背包模块进行相应修改 ##########
      * 0 兑换钻石
      * 1 兑换现金红包
     */
    showLobbyActivePanel(selectIndex?: number);
    /**
	 * 按照skipType打开面板
	 * 1.金币 2.换三张 3.炸弹场 4.闯关 5.转盘 6.比赛
	 * 7.月卡 8.兑换道具 9.小程序收藏 10.免费领钻看视频
	 * 11.大厅个人信息界面 12.每日首充 13.红包兑换界面
	 * 14.经典场 15.签到界面 16.大厅任务界面 17.捕鱼初级场
	 * 18.捕鱼中级场 19.捕鱼高级场 20.捕鱼神级场 21.捕鱼选场界面
	 */
    openPanelBySkipType(skipType:number);
}

declare class LoadPanelTipMgr {
    private static _instance;

    static getInstance(): LoadPanelTipMgr;

    public loadRes(resouceId?: string, succ?: Function);

}