namespace SWGAME {
    //屏幕适配控制 by luchun

    export interface ScreenChangeObserver{
        stageSizeChange():void
    }

    export class ScreenAdaptMgr extends egret.DisplayObject{

        //单例
        private static _instance:ScreenAdaptMgr;
        public static getInstance(){
            if(ScreenAdaptMgr._instance){
                return ScreenAdaptMgr._instance;
            }

            ScreenAdaptMgr._instance = new ScreenAdaptMgr();
            return ScreenAdaptMgr._instance;
        }

        //退出游戏删除实例
        public static destroy(){

            if(ScreenAdaptMgr._instance){

                if(ScreenAdaptMgr._instance.parent){

                    ScreenAdaptMgr._instance.stage.removeEventListener(egret.Event.RESIZE,ScreenAdaptMgr._instance.onScreenSizeCh,ScreenAdaptMgr._instance);

                    ScreenAdaptMgr._instance.parent.removeChild(ScreenAdaptMgr._instance);

                }

                ScreenAdaptMgr._instance = null;

            }
        }

        //egret 屏幕适配模式
        private _scaleMode:string;

        //本控制器已支持的适配模式
        private _supportScaleArr:string[] = [
            egret.StageScaleMode.FIXED_WIDTH,
            egret.StageScaleMode.FIXED_HEIGHT
        ];

        //egret屏幕默认宽/高
        private _defaultWidth:number = 1280;
        private _defaultHeight:number = 720;

        public get defaultWidth(){
            return this._defaultWidth;
        }

        public get defaultHeight(){
            return this._defaultHeight
        }

        //当前stage宽/高
        public stageWidth:number;
        public stageHeight:number;

        constructor(){
            super();

            this.name = "ScreenAdaptMgr";
            this.addEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);

        }

        //屏幕变化比例
        private _factor:number;

        public get factor(){
            return this._factor;
        };

        //添加到舞台
        private onAdd():void{
            this.removeEventListener(egret.Event.ADDED_TO_STAGE,this.onAdd,this);

            this._scaleMode = this.stage.scaleMode;

            //判断支持的适配模式
            if(this._supportScaleArr.indexOf(this._scaleMode) == -1){
                console.warn(`[ScreenAdaptMgr]当前egret适配模式(${this._scaleMode})未做支持`);
                return;
            }

            if(this._scaleMode == egret.StageScaleMode.FIXED_WIDTH){
                if(this.stage.stageWidth != this._defaultWidth){
                    console.warn(`[ScreenAdaptMgr]在${this._scaleMode}下，stage宽度与_defaultWidth不匹配`);
                    return;
                }
            }

            if(this._scaleMode == egret.StageScaleMode.FIXED_HEIGHT){
                if(this.stage.stageHeight != this._defaultHeight){
                    console.warn(`[ScreenAdaptMgr]在${this._scaleMode}下，stage高度与_defaultHeight不匹配`);
                    return;
                }
            }


            this.stage.addEventListener(egret.Event.RESIZE,this.onScreenSizeCh,this);
            this.onScreenSizeCh();
        }

        //屏幕大小变化
        private onScreenSizeCh():void{
            //计算屏幕变化比例
            let factor:number = 0;

            this.stageWidth = this.stage.stageWidth;
            this.stageHeight = this.stage.stageHeight;

            console.warn(this.stage.stageWidth);
            console.warn(this.stage.stageHeight);

            switch (this._scaleMode){
                case egret.StageScaleMode.FIXED_WIDTH:

                    factor = this.stage.stageHeight/this._defaultHeight;
                    break;

                case egret.StageScaleMode.FIXED_HEIGHT:
                    factor = this.stageWidth / this._defaultWidth;
                    break;
            }

            if(!factor){
                return;
            }

            console.warn('my factor:'+factor);
            this._factor = factor;

            //通知观察者
            this.notifyObserver();

        }

        //通知观察者
        private notifyObserver():void{
            if(!this.observerArr.length){
                return;
            }


            for (let observer of this.observerArr){

                if(!(observer.stageSizeChange && typeof(observer.stageSizeChange) == 'function')){
                    throw new Error(`[ScreenAdaptMgr]类${observer.constructor.name}，没有观察者屏幕适配方法stageSizeChange`);
                }

                observer.stageSizeChange();
            }

        }


        private observerArr:ScreenChangeObserver[] = [];
        //注册观察者
        public registerObserver(obj:ScreenChangeObserver){
            if(this.observerArr.indexOf(obj) != -1){
                return;
            }

            this.observerArr.push(obj);
        }


    }
}