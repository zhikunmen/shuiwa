/**
 * 依赖申明文件
 */
declare class NetMgr extends uniLib.NetMgr {
    static getLoginCfg(tag?);
}

declare class ConfigMgr {
    public static getInstance(): ConfigMgr;
    /**
    * 通过lobbyId获取配置
    */
    public getGameListCfgById(lobbyId: number): table.TableLobbyGameList;
    /**
    * 通过shopID获取商城配置
    */
    public getShopCfgById(shopId: number): table.TableShopConfig;
    public getGoodCfgById(goodId: number): table.TableGoodsConfig;
    public getTaskCfgById(taskId: number): table.LobbyTaskConfig;
}

declare class LobbyModuleMgr {
    private static _instance;

    static getInstance(): LobbyModuleMgr;
    panelScaleX:number;
    showCustomer();
    wxScreenWidthHeight:egret.Point;
    /**
	 * 按照skipType打开面板
	 * 1.金币 2.换三张 3.炸弹场 4.闯关 5.转盘 6.比赛
	 * 7.月卡 8.兑换道具 9.小程序收藏 10.免费领钻看视频
	 * 11.大厅个人信息界面 12.每日首充 13.红包兑换界面
	 * 14.经典场 15.签到界面 16.大厅任务界面 17.捕鱼初级场
	 * 18.捕鱼中级场 19.捕鱼高级场 20.捕鱼神级场
	 */
    openPanelBySkipType(skipType:number)
}


declare class LobbyUserInfoBindPhonePanel extends eui.Component { }

declare class LoginScene extends uniLib.GameScene { }

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

declare class LoadPanelTipMgr {
    public static getInstance(): LoadPanelTipMgr;
    public loadRes(resouceId?: string, succ?: Function);
}
