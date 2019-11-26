/**
 *
 * @author 
 *
 */
module chessCommonLib {
    export class ChatWordItem extends eui.Component {
        private content: string
        private labeTxt: eui.Label;

        public constructor(content: any, isSpecil: boolean = false) {
            super();
            this.labeTxt = this.createTextLabel("left", 27);
            if (!isSpecil) {
                //这里是因为服务器发送<1>这种无需显示的字段时候，进行过滤，防止对宽度进行影响
                this.labeTxt.text = content.replace(/<\d{1}>/g, "");
                this.labeTxt["text1"] = content;
            }
            else {
                // console.error("---------ChatWordItem", content);
                let styleArr = <Array<egret.ITextElement>>[];
                for (let i = 0; i < content.length; i++) {
                    styleArr.push({ text: content[i].text, style: { "textColor": content[i].color } })
                }
                this.labeTxt.textFlow = styleArr;
            }
            this.addChild(this.labeTxt);
        }


        private createTextLabel(ale: string, size: number): eui.Label {
            var tf: eui.Label = new eui.Label();
            tf.fontFamily = "null1"
            tf.textAlign = ale;
            tf.lineSpacing = 10;
            tf.size = size;
            return tf;
        }

           public destory(){
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            delete this.labeTxt;
            
        }

    }
}