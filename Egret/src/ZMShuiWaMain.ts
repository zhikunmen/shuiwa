class ZMShuiWaMain extends  uniLib.GameDoc {

    public constructor(param?:any) {
        super(param);
        if(this._gameInfo){
            SWGAME.DataCache.gameInfo=this._gameInfo;
        }
        if(param && param.destroyResOnExit){
            SWGAME.DataCache.destroyResOnExit = param.destroyResOnExit;
        }
        if(this._gameInfo && this._gameInfo.extData){
            SWGAME.DataCache.platParam= this._gameInfo.extData;
        }
        if(this._gameInfo && this._gameInfo.extData && this._gameInfo.extData.video){
            SWGAME.RoomInfo.getInstance().video = this._gameInfo.extData.video;
            SWGAME.RoomInfo.getInstance().videoUid = this._gameInfo.extData.videoUid;
        }else{
            SWGAME.RoomInfo.getInstance().video = 0;
            SWGAME.RoomInfo.getInstance().videoUid = 0;
        }

    }
    public start(e: egret.Event = null): void {
        egret.ImageLoader.crossOrigin = "anonymous";
        let initData: uniLib.initOptions = <uniLib.initOptions>{};
        initData.designWidth = 1280;
        initData.designHeight = 720;
        initData.debug = true;
        initData.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;
        uniLib.init(initData);
        RES.setMaxLoadingThread(10);
        RES.addEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);
        RES.loadConfig("resource/zmshuiwa.res.json", "resource/");
    }

    /**
     * 配置文件加载完成,开始预加载preload资源组。
     * configuration file loading is completed, start to pre-load the preload resource group
     */
    private onConfigComplete(event:RES.ResourceEvent):void {
        RES.removeEventListener(RES.ResourceEvent.CONFIG_COMPLETE, this.onConfigComplete, this);

        //注入自定义的素材解析器
        let assetAdapter = new AssetAdapter();
        egret.registerImplementation("eui.IAssetAdapter", assetAdapter);
        egret.registerImplementation("eui.IThemeAdapter", new ThemeAdapter());
        //加载皮肤主题配置文件,可以手动修改这个文件。替换默认皮肤。
        let theme = new eui.Theme("resource/zmshuiwa.thm.json", this.stage);
        theme.addEventListener(eui.UIEvent.COMPLETE, ()=>{
            //主题文件加载完毕
            this.preLoadEnd();

        }, this);

    }

    public preLoadEnd(): void {

        //资源加载失败回调
        RES.addEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.resLoadError, this );

        uniLib.UIMgr.instance.showProcessBar(null, 2, 100, "正在加载游戏资源...");

        if(uniLib.Global.lobbyMode){
            uniLib.ResLoadMgr.instance.load("zmshuiwa", this.createGameScene, null, this, null);
        }
        else{
            // uniLib.ResLoadMgr.instance.load("sg_gameCommon", this.loadGameRes, null, this, null);
            //暂时没有用到公共资源
            uniLib.ResLoadMgr.instance.load("zmshuiwa", this.loadGameRes, null, this, null);
        }

    }

    //资源加载失败处理
    private _countGroupError:number = 0;
    private resLoadError(event:RES.ResourceEvent){

        if( ++this._countGroupError < 3 ){
            console.error(`${event.groupName}资源组加载失败，重试第${this._countGroupError}次`);
            uniLib.ResLoadMgr.instance.load(event.groupName, this.createGameScene, null, this, null);

        }else{

            console.error(`${event.groupName}资源组加载失败,返回大厅`);

            RES.removeEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.resLoadError, this );
            if (SWGAME.DataCache.gameInfo && SWGAME.DataCache.gameInfo.defaultOrientation != egret.OrientationMode.LANDSCAPE) {
                uniLib.ScreenUtils.landscape = false;
            }
            uniLib.GameModuleUtils.ExitGame(false);
            RES.destroyRes(event.groupName, true);
            uniLib.ResUtils.clearResConfigByGroupName([event.groupName]);
            uniLib.UIMgr.instance.hideLoading();
        }
    }

    private loadGameRes(){

        // 本地加载chessCommonLib资源
        //  let option: chessCommonLib.initOptions;
        //  if (uniLib.Global.isH5) {
        //      option = new chessCommonLib.initOptions();
        //      option.resRoot = "chessCommonLib/resource/";
        //      option.resConfig = "chessCommonLib/resource/chessCommonLib.res_8ad22454.json";
        //      option.thmConfig = "chessCommonLib/resource/chessCommonLib.thm_6e97e34c.json";
        //  }
        //  else {
        //      option = new chessCommonLib.initOptions();
        //  }

        //  chessCommonLib.init(option, () => {

        //      RES.loadGroup(chessCommonLib.GrpConsts.CHESS_COMMON_ZHIMA);

        //      console.log("game chessCommonLib load success");
        //  }, this);


        uniLib.UIMgr.instance.showProcessBar(null, 2, 100, "正在加载游戏资源...");
        uniLib.ResLoadMgr.instance.load("zmshuiwa", this.createGameScene, null, this, null);
    }
    /**
     * 创建游戏场景
     * Create a SWGAME scene
     */

    private createGameScene():void {
        RES.removeEventListener( RES.ResourceEvent.GROUP_LOAD_ERROR, this.resLoadError, this );

        //启动Scene
        uniLib.SceneMgr.instance.changeScene(SWGAME.SWMainScene);

        //处理TableGift资源改名问题
        if(!RES.hasRes('TableGift_json') && DEBUG) {

            //chessCommonLib.zm_UserInfoPanel方法改写
            let prototype:any = chessCommonLib.zm_UserInfoPanel.prototype;
            prototype.loadTable = function(){
                return RES.getRes("sw_TableGift_json");
            };
        }

    }
    public resize(): void {
        // this.scaleY = uniLib.Global.screenHeight / SWGAME.DataCache.defaultHeight;
        // this.y = (uniLib.Global.screenHeight - SWGAME.DataCache.defaultHeight) / 2;
    }
}
