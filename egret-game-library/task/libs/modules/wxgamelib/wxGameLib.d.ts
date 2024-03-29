/*!
 * wxGameLib - d.ts for Description
 * @licence wxGameLib - v0.1.0 (2018-10-29)
 * qq:93749937 | Licence: helojo
 */
declare module wxgame {
    /**小程序版本枚举 */
    class envVersionConst {
        /**开发版 */
        static DEVELOP: string;
        /**体验版 */
        static TRIAL: string;
        /**正式版 */
        static RELEASE: string;
    }
    class CustomerServiceConst {
        /**跳转客服默认标题 */
        static DEFAULTTITLE: string;
    }
}

declare module wxgame {
    class Global {
        private static _instance;
        appId: string;
        secret: string;
        private userInfoData;
        tableLobbyGameList: table.TableLobbyGameList;
        shareIconUrl: string;
        private isFirst;
        static readonly instance: Global;
        /**
         * @param appId 小游戏appid
         * @param secret 小游戏秘钥
         */
        init(): Promise<any>;
        /**退出当前小游戏 */
        exitMiniProgram(success?: Function, fail?: Function, complete?: Function): Promise<any>;
        /**跳转客服回话 */
        openCustomerServiceConversation(showCard: boolean, title?: string, imgUrl?: string): Promise<{}>;
        /**打开同一公众号下关联的另一个小程序 */
        navigateToMiniProgram(appid: string, path?: string, extraData?: any, envVersion?: string): Promise<{}>;
        /**调用设置交口 */
        openSetting(): Promise<any>;
        /**调用授权 */
        authorize(scopeStr: string): Promise<any>;
        /**banner unit id 数组*/
        bannerUnitIdArr: string[];
        private _sysInfo;
        private _bannerAd;
        private onLoadBanner;
        private onErrorBanner(err);
        /**销毁显示的广告 */
        destroyBannerAd(): void;
        /**获取广告banner */
        createBannerAd(adUnitId?: string, style?: Object): void;
        /**video unit id 数组*/
        videoUnitIdArr: string[];
        private _videoAd;
        private _videoCallFun;
        private _vidoeCallObj;
        private onErrorVideo;
        private onCloseVideo;
        /**获取激励视频video
         * sucCall 看完视频的回调
        */
        createRewardedVideoAd(adUnitId?: string, sucCall?: Function, callObj?: any): void;
    }
}

declare module wxgame {
    class Message {
        private static _instance;
        key: Array<string>;
        launchOption: any;
        static readonly instance: Message;
        init(): void;
        /**
         * 初始化启动参数
         */
        private initLaunchOption();
        /**监听小游戏回到前台的事件 */
        private addOnShowEvent();
        /** */
        private onShow(res?);
        private _rankBit;
        /**设置用户数据上报 */
        setUserCloudStorage(KVDataList: Array<any>): Promise<{}>;
    }
}

declare module wxgame {
    class OpenData {
        private static _instance;
        static readonly instance: OpenData;
        private _openDataContext;
        sendShareData(kvdata: any): void;
        createDisplayObject(type: any, width: any, height: any, offsetY: any): egret.Bitmap;
    }
}

declare module wxgame {
    class ShareMessage {
        private static _instance;
        private _data;
        static readonly instance: ShareMessage;
        /**监听被动转发 */
        onShareAppMessage(title?: string, imageUrl?: string, query?: string): void;
        /**
         * 显示转发按钮
         * @param ticket 是否带ticket 可以获取群id做群排行使用
         */
        showShareMenu(ticket?: boolean): Promise<any>;
        /**
         * 隐藏转发按钮
         */
        hideShareMenu(): Promise<any>;
        /**更新转发属性 */
        updateShareMenu(ticket: any): Promise<any>;
        /**
         * 消息分享 如果写死分享的话务必填写shareVo.title和shareVo.shareImageUrl
         * @param shareVo 分享数据
         */
        shareAppMessage(shareVo: uniLib.WXShareVo, success?: Function, fail?: Function): Promise<any>;
        /**
         * 获得分享
         */
        getShareInfo(ticket: string): Promise<any>;
        /**
         * 发送分享数据
         * @param opType  操作类型
         * @param jsonShare 是否分享群
         *  */
        sendShareMessage(shareVo?: uniLib.WXShareVo): Promise<any>;
        checkSession(): Promise<any>;
        private sendShare();
    }
}

declare module wxgame {
    class Utils {
        /**弹框 */
        static showConfirm(info: string, title?: string, oktxt?: string, okFunc?: Function, caltxt?: string, calFunc?: Function): void;
        /**时间戳 做版本控制 */
        static getVersionControlCode(): string;
        /**检查当前是否是微信小游戏 不能导致h5上报错 */
        static readonly isWxGame: boolean;
        /**获取定位 */
        static getPosition(callBack?: Function, thisObj?: any): void;
        /**小游戏获取手机信息 */
        static readonly isIos: boolean;
        static catchScreenToTexSync(width?: number, height?: number): string;
    }
}
