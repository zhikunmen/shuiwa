module club {
    /**老友圈群战绩Item */
    export class ClubAllRecordItemPanel extends eui.ItemRenderer {
        /**标号*/
        private _indextText: eui.Label;
        /**时间 */
        private _timeText: eui.Label;
        /**房间ID */
        private _roomIdText: eui.Label;
        /**大赢家名称 */
        private _nameText: eui.Label;
        /** 大赢家id*/
        private _uidText: eui.Label;
        /** 大赢家战绩*/
        private _recordText: eui.Label;
        /** 游戏名称*/
        private _gameNameText: eui.Label;
        /**局数 */
        private _gameNumText: eui.Label;
        /** 详情按钮*/
        private _detailBtn: eui.WxButton;
        /**头像 */
        private _headImg: eui.Image;
        /**数据 */
        private info: Cmd.GameHistory;

        constructor() {
            super();
            this.skinName = "ClubAllRecordItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addListener();

        }
        public addListener() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public removeListener() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public destory(): void {
            this.removeListener();
        }
        private onClickTap(e: egret.TouchEvent): void {
            switch (e.target) {
                case this._detailBtn:
                    LobbyModuleMgr.getInstance().showRecordDetail(() => {
                        ClubSendMgr.getGameDetailHistory(this.info.globalRoomId);
                    });
                    MJLobbyData.getInstance().globalRoomId = this.info.globalRoomId;
                    break;
            }
        }
        protected dataChanged(): void {
            this.info = this.data;
            this._indextText.text = this.itemIndex + 1 + "";
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this.info.timeStamp);
            this._roomIdText.text = this.info.roomId + "";
            this._headImg.source = this.info.userGameHistorys[0].headUrl;
            var name = this.info.userGameHistorys[0].nickName;
            var strLength: number;
            var wei: string;
            if (this.getStrRealLength(name) > 10) {
                wei = "...";
            } else {
                wei = "";;
            }
            while (this.getStrRealLength(name) > 10) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            this._nameText.text = name + wei;
            this._uidText.text = this.info.userGameHistorys[0].uid + "";
            this._recordText.text = this.info.userGameHistorys[0].integral + "";
            this._gameNameText.text = this.info.gameName;
            this._gameNumText.text = this.info.gameNbr + "";
        }
        /**限制昵称长度 */
        private getStrRealLength(str: string): number {
            var jmz = { GetLength: null };
            jmz.GetLength = function (str) {
                return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length);  //先把中文替换成两个字节的英文，再计算长度
            };
            return jmz.GetLength(str);
        }
    }
}