module gameshare {
    /**
     * 小程序分享截图
     * 传的数据如下
     * 成绩数据：排好（头像资源，昵称字段，赢局数，赢总分数）
     * 玩法数据
     * 麻将还是扑克
     */
    export class SharePanel extends eui.Component {

        private itemList: eui.List;          //数据表显示
        private playLabel: eui.Label;     //玩法
        private _totaldata: totaldata[];
        private _playText: string;
        private list: eui.ArrayCollection;
        private _sharedate: string;

        constructor(totaldata: totaldata[], playText: string) {
            super();
            this.skinName = "shareSkin";
            this._totaldata = totaldata;
            this._playText = playText;
            this.initUI();
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected initUI() {
            var date: Date = new Date();
            var dateStr: string = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
            this._sharedate = dateStr + "  " + this.setTimeFormat(date.getHours()) + ":" + this.setTimeFormat(date.getMinutes()) + ":" + this.setTimeFormat(date.getSeconds());
            this.playLabel.textFlow = new Array<egret.ITextElement>(
                { text: this._playText, style: { "textColor": 0xffff00 } }
                , { text: this._sharedate, style: { "textColor": 0xffffff } }
            )
            this.itemList.itemRenderer = shareItemPanel;
            this.list = new eui.ArrayCollection(this._totaldata);
            this.itemList.dataProvider = this.list;
        }
        private setTimeFormat(value: number) {
            var txt: string = "";
            if (value < 10) {
                txt = "0" + value;
            }
            else {
                txt = value + "";
            }
            return txt;
        }
    }

    export class shareItemPanel extends eui.ItemRenderer {

        private rankImg: eui.Image;
        private headImg: eui.Image;     //头像资源
        private nameLabel: eui.Label;  //昵称
        private idLabel: eui.Label;  //昵称
        private totalLabel: eui.Label;    //总分
        private totaldata: totaldata;
        constructor() {
            super();
            this.skinName = "shareItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged() {
            super.dataChanged();
            this.totaldata = this.data;
            let index = this.itemIndex + 1;
            if (this.itemIndex <= 2) {
                this.rankImg.source = "gameshare_json.gameshare_" + index;
            } else {
                this.rankImg.visible = false;
            }
            this.headImg.source = this.totaldata.headurl;
            this.nameLabel.text = this.totaldata.name;
            this.idLabel.text = this.totaldata.id.toString();
            this.totalLabel.text = this.totaldata.totaltext.toString();
        }
    }
    export class totaldata {
        constructor() { }
        /**头像资源 */
        headurl: string;
        /**名字 */
        name: string;
        /**ID */
        id: number;
        /**赢次数 */
        wintext: number;
        /**总成绩 */
        totaltext: number;
    }
}