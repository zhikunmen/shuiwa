namespace SWGAME {
	/**
	 *
	 * @author 
	 *
	 */
	export class GameInfo {

		//屏幕适配层，所有Vc都在这层
        public static adaptLayer: egret.DisplayObjectContainer;

        public static main: egret.DisplayObjectContainer;
        public static stage: egret.Stage;
        public static mainUILayer: egret.DisplayObjectContainer;
        public static uiLayer: egret.DisplayObjectContainer;
        public static topLayer: egret.DisplayObjectContainer;
        public static scence: SWMainScene;

		public constructor() {
		}
		public static destroy():void{
			GameInfo.main=null;
			GameInfo.stage=null;
			GameInfo.mainUILayer=null;
			GameInfo.uiLayer=null;
			GameInfo.topLayer=null;
			GameInfo.scence = null;
		}
	}
}
