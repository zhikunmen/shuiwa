module club {
    /**俱乐部跑马灯 */
    export class ClubMsgMcPanel extends commonpanel.LobbyBaseEuiPanel {
        private _msgTxt: egret.TextField;
        private _noticeArr: string[] = [];
        private _msgContain: egret.DisplayObjectContainer;
        private _noticePanel: egret.DisplayObjectContainer;
        private _buffer: number;
        private _defaultMsg: string;
        private _loop: boolean;
        public constructor() {
            super();
            this.skinName = "ClubMsgMcSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected addEvent(): void {
        }

        protected removeEvent(): void {
        }

        public initUI(): void {
            this._buffer = 30;
            this.touchEnabled = false;
            this._msgContain = new egret.DisplayObjectContainer();
            this._msgContain.x = 140;
            this._msgContain.y = 7;
            this.addChild(this._msgContain);
            this._msgContain.scrollRect = new egret.Rectangle(0, 0, 400, 30);
            this._noticePanel = new egret.DisplayObjectContainer();
            this._msgContain.addChild(this._noticePanel);
            this._msgTxt = this.createTextFeild();
            this._noticePanel.addChild(this._msgTxt);
            this._noticeArr = [];
            this.visible = false;
            /********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
            var self = this;
            setTimeout(function () {
                self.noticeTest();
            }, 200);
        }

        public setLoop(value: boolean): void {
            this._loop = value;
        }

        private noticeTest(): void {
            if (!this._msgTxt) {
                return;
            }
            this.startScroll();
        }
        private startScroll(): void {
            this.visible = true;
            egret.Tween.removeTweens(this._noticePanel);
            this._noticePanel.x = 500 + this._buffer;
            var w: number = this._noticePanel.width < 500 ? 500 : this._noticePanel.width;
            egret.Tween.get(this._noticePanel).to({ x: -(this._noticePanel.width + this._buffer) }, 10 * (w + this._buffer)).call(this.noticeTest, this);
        }

        private scrollEnd(): void {
            egret.Tween.removeTweens(this._noticePanel);
            this.visible = false;
        }

        public getclubmsg(data: string): void {
            this._msgTxt.text = data;
        }

        public destroy(): void {
            super.destroy();
            this.scrollEnd();
        }

        public createTextFeild(): egret.TextField {
            var tf: egret.TextField = new egret.TextField();
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xf8e6c0;
            tf.textAlign = egret.HorizontalAlign.LEFT;
            tf.size = 25;
            tf.multiline = false;
            tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            return tf;
        }
    }
}