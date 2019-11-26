/**
 *
 * @author 
 *
 */
module chessCommonLib {
    export class ChatImageItem extends egret.Sprite {
        private content: string
        private labeTxt: egret.Bitmap;

        public constructor(name: string) {
            super();
            this.labeTxt = this.createBitmap(name);
            this.addChild(this.labeTxt);
        }


        private createBitmap(name: string): egret.Bitmap {
            var bit: egret.Bitmap = new egret.Bitmap();
            bit.texture = RES.getRes(name);
            return bit;
        }

        public destory(){
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            delete this.labeTxt;
            
        }

    }
}