/**
 *
 * @author  garr
 *这个是用来进行布局计算的类，不承担显示对象的指责，大幅度减少性能消耗
 */
module chessCommonLib {
    export class ChatWordCalculateItem {
        private content: string
        private labeTxt: eui.Label;
        private _width: number
        private isSpecil: boolean = false
        public text1: string = ""
        public text: string = ""

        public constructor(content: any, isSpecil: boolean = false) {
            this.isSpecil = isSpecil;
            if (!isSpecil) {
                //这里是因为服务器发送<1>这种无需显示的字段时候，进行过滤，防止对宽度进行影响
                // this.labeTxt.text = content.replace(/<\d{1}>/g, "");
                this.text = content.replace(/<\d{1}>/g, "");
                this._width = egret.sys.measureText(this.text, "", 27, false, false)
                this.text1 = content;
            }
            else {
                this.labeTxt = this.createTextLabel("left", 27);
                // console.error("---------ChatWordItem", content);
                let styleArr = <Array<egret.ITextElement>>[];
                for (let i = 0; i < content.length; i++) {
                    styleArr.push({ text: content[i].text, style: { "textColor": content[i].color } })
                }
                this.labeTxt.textFlow = styleArr;
                // this.addChild(this.labeTxt);
            }
        }


        public get width() {
            if (!this.isSpecil) {
                return this._width
            }
            else {
                return this.labeTxt.measuredWidth
            }
        }

        private createTextLabel(ale: string, size: number): eui.Label {
            var tf: eui.Label = new eui.Label();
            tf.fontFamily = "null1"
            tf.textAlign = ale;
            tf.lineSpacing = 10;
            tf.size = size;
            return tf;
        }

        public destory() {
            delete this.labeTxt;
        }

    }
}