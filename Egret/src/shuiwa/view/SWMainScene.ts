
namespace SWGAME {

    import LifecycleContext = egret.lifecycle.LifecycleContext;

    export class SWMainScene extends uniLib.GameScene {
		public _adaptLayer: AdaptLayer;
		public _gameVc: GameVc;
        public _seatPlayVc: SeatPlayVc;
        public _betVc: BetVc;
        public _effectVc: EffectVc;
        public _chatPopVc: ChatPopVc;
        public _operateVc: OperateVc;
        public _menuVc: MenuVc;
		public _voiceVc: VoiceVc;
		public _noitfyVc: NotifyVc;

		public constructor() {
			super();
		}
		public start(): void {
			super.start();

			this.stage.scaleMode = egret.StageScaleMode.FIXED_HEIGHT;

			//加载UI配置说明
			if (DataCache.gameInfo && DataCache.gameInfo.defaultOrientation != egret.OrientationMode.LANDSCAPE) {
				uniLib.ScreenUtils.landscape = true;
			}

			GameInfo.scence = this;

			GameInfo.uiLayer = this.uiLayer;
			GameInfo.mainUILayer = this.mainUILayer;
			GameInfo.topLayer = this.topLayer;
			GameInfo.main = this.tipsLayer;
			GameInfo.stage = this.stage;

			//添加层次名
			GameInfo.uiLayer.name = 'uiLayer';
			GameInfo.mainUILayer.name = 'mainUILayer';
			GameInfo.topLayer.name = 'topLayer';
			GameInfo.main.name = 'tipsLayer';

            //启动屏适配控制
            this.stage.addChild(ScreenAdaptMgr.getInstance());

            //启动pureMVC
            SWGAME.AppFacade.getInstance().startUp(this);

            this.initGameSpecialData();
            this.initSound();
			SWGAME.AppFacade.getInstance().sendNotification(SWGAME.AppFacadeConst.SEND_DATA, null, SWGAME.DataRequestCommand.CONNECT_GAME_SERVER);

        }
		public destroy(): void {

			super.destroy();

			if (this._adaptLayer){
				this._adaptLayer.destroy();
                this._adaptLayer = null;
			}

			if (this._gameVc) {
				this._gameVc.destroy();
				this._gameVc = null;
			}
            if (this._seatPlayVc) {
                this._seatPlayVc.destroy();
                this._seatPlayVc = null;
            }
			if (this._betVc) {
				this._betVc.destroy();
				this._betVc = null;
			}
			if(this._effectVc){
                this._effectVc.destroy();
                this._effectVc = null;
			}
            if(this._chatPopVc){
                this._chatPopVc.destroy();
                this._chatPopVc = null;
            }
			if (this._operateVc) {
				this._operateVc.destroy();
				this._operateVc = null;
			}
			if(this._menuVc){
                this._menuVc.destroy();
                this._menuVc = null;
			}
			if(this._voiceVc){
                this._voiceVc.destroy();
                this._voiceVc = null;
			}
            if(this._noitfyVc){
                this._noitfyVc.destroy();
                this._noitfyVc = null;
            }

            egret.Tween.removeAllTweens();
            uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			AppFacade.getInstance().sendNotification(AppFacadeConst.DESTORY);

            ScreenAdaptMgr.destroy();
			HeadLoader.destroy();
            EffectFactory.destroy();
            GameInfo.destroy();

        }
		/**初始化游戏设置 */
		private initGameSpecialData(): void {

			//在uiLayer和游戏中Vc中添加一层做屏幕适配
			this._adaptLayer = new AdaptLayer();
			GameInfo.adaptLayer = this._adaptLayer;
            GameInfo.uiLayer.addChild(this._adaptLayer);

			this._gameVc = new GameVc();
			GameInfo.adaptLayer.addChild(this._gameVc);
            AppFacade.getInstance().registerMediator(new GameMediator(this._gameVc));


            this._seatPlayVc = new SeatPlayVc();
            GameInfo.adaptLayer.addChild(this._seatPlayVc);
            AppFacade.getInstance().registerMediator(new SeatPlayMediator(this._seatPlayVc));

            this._betVc = new BetVc();
            GameInfo.adaptLayer.addChild(this._betVc);
            AppFacade.getInstance().registerMediator(new BetMediator(this._betVc));

            this._effectVc = new EffectVc();
            GameInfo.adaptLayer.addChild(this._effectVc);
            AppFacade.getInstance().registerMediator(new EffectMediator(this._effectVc));

            this._chatPopVc = new ChatPopVc();
            GameInfo.adaptLayer.addChild(this._chatPopVc);
            AppFacade.getInstance().registerMediator(new ChatPopMediator(this._chatPopVc));

            this._operateVc = new OperateVc();
			GameInfo.adaptLayer.addChild(this._operateVc);
            AppFacade.getInstance().registerMediator(new OperateMediator(this._operateVc));

            this._noitfyVc = new NotifyVc();
            GameInfo.adaptLayer.addChild(this._noitfyVc);
            AppFacade.getInstance().registerMediator(new NotifyMediator(this._noitfyVc));

            this._menuVc = new MenuVc();
            GameInfo.adaptLayer.addChild(this._menuVc);
            AppFacade.getInstance().registerMediator(new MenuMediator(this._menuVc));

            this._voiceVc = new VoiceVc();
            GameInfo.adaptLayer.addChild(this._voiceVc);
            AppFacade.getInstance().registerMediator(new VoiceMediator(this._voiceVc));

            this.width = uniLib.Global.screenWidth;
			this.height = uniLib.Global.screenHeight;

			//本地协议Cmd测试
			if(DEBUG){
				let test = new LocalTestCommand();
				test.runTest();
			}

		}

		//初始化声音
		private initSound(){
            //根据大厅的参数来判断声音的开关
            if (Number(uniLib.Utils.getLocalStorage("MusicVolime"))) {
                uniLib.SoundMgr.instance.musicVolume = uniLib.Utils.getLocalStorage("MusicVolime");
                uniLib.SoundMgr.instance.musicOpen = true;

                //延迟播放
                let timer:egret.Timer = new egret.Timer(100, 1);
                timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{

                    timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,null,this);
                    uniLib.SoundMgr.instance.playBgMusic([SoundConsts.BACKGROUND]);

                },this);
                timer.start();

            } else {
                uniLib.SoundMgr.instance.musicVolume = 0;
                uniLib.SoundMgr.instance.musicOpen = false;
            }


            if (Number(uniLib.Utils.getLocalStorage("SoundVolime"))) {
                uniLib.SoundMgr.instance.soundVolume = uniLib.Utils.getLocalStorage("SoundVolime");
                uniLib.SoundMgr.instance.soundOpen = true;
            }else {
                uniLib.SoundMgr.instance.soundVolume = 0;
                uniLib.SoundMgr.instance.soundOpen = false;
            }
		}

		public shareWx(): void {
			let vo: uniLib.WXShareVo = new uniLib.WXShareVo();
			vo.shareWay = 0;
			let point: egret.Point = this.globalToLocal(0, 0);
			let tx: egret.Bitmap = new egret.Bitmap(uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(0, 0, DataCache.defaultWidth, DataCache.defaultHeight), 0.6));
			vo.shareImageData = uniLib.DisplayUtils.catchScreen(tx, new egret.Rectangle(0, 0, DataCache.defaultWidth, DataCache.defaultHeight));
			uniLib.ZQGameSdk.share(vo, null, null);
		}
	}
}