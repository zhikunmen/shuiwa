module turntable {
    export class NewTurntableItem extends egret.DisplayObjectContainer {

        constructor() {
            super();
        }

        /**第一个转盘 */
        public init(num: number, goodId: number) {
            let txt = new egret.BitmapText();
            txt.font = RES.getRes("turntable_font_fnt");
            txt.text = num > 10000 ? (num / 10000 + "万") : num + "";
            let item = new egret.Bitmap(RES.getRes("game_prop_json.bag_daoju_"+goodId));
            commonConfirm.ResUtil.limitImageSize(item,60);

            txt.x = (item.width - txt.width) >> 1;
            this.addChild(txt);

            item.y = txt.height;
            this.addChild(item);

            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
        }

        // /**
        //  * 第二个转盘
        //  */
        // public init2(time: number) {
        //     let item = new egret.Bitmap(RES.getRes(`lb_zp2_${time}_png`));
        //     this.addChild(item);
        //     this.anchorOffsetX = this.width >> 1;
        //     this.anchorOffsetY = this.height >> 1;
        // }
    }
}