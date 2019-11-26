//适配主层
//只适用于FixedHeight
namespace SWGAME{
    export class AdaptLayer extends egret.DisplayObjectContainer implements ScreenChangeObserver{

        constructor(){
            super();

            ScreenAdaptMgr.getInstance().registerObserver(this);
            this.stageSizeChange();
            this.width = ScreenAdaptMgr.getInstance().defaultWidth;
            this.height = ScreenAdaptMgr.getInstance().defaultHeight;
        }

        public destroy():void{
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }

        //初始化/屏幕适配
        public stageSizeChange():void{


            if(ScreenAdaptMgr.getInstance().stageWidth > ScreenAdaptMgr.getInstance().defaultWidth){
                //屏幕变细长
                let offsetX = (ScreenAdaptMgr.getInstance().stageWidth - ScreenAdaptMgr.getInstance().defaultWidth) / 2;

                this.width = ScreenAdaptMgr.getInstance().defaultWidth;
                this.anchorOffsetX = -offsetX;
            }else{

                //屏幕是标准宽度，或者比标准宽度高
                this.width = ScreenAdaptMgr.getInstance().stageWidth;
                this.anchorOffsetX = 0;
            }
        }

    }
}