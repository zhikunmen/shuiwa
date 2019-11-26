declare module gameshare {
    class ShareConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_SHARE: string;
    }
}
declare module gameshare {
    /**
     * 小程序分享截图
     * 传的数据如下
     * 成绩数据：排好（头像资源，昵称字段，赢局数，赢总分数）
     * 玩法数据
     * 麻将还是扑克
     */
    class SharePanel extends eui.Component {
        private itemList;
        private playLabel;
        private _totaldata;
        private _playText;
        private list;
        private _sharedate;
        constructor(totaldata: totaldata[], playText: string);
        protected childrenCreated(): void;
        protected initUI(): void;
        private setTimeFormat(value);
    }
    class shareItemPanel extends eui.ItemRenderer {
        private rankImg;
        private headImg;
        private nameLabel;
        private idLabel;
        private totalLabel;
        private totaldata;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
    class totaldata {
        constructor();
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
