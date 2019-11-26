module club {

    /**老友圈 成员战绩item  */
    export class ClubMemberRecordItemPanel extends eui.ItemRenderer {
        /** 编号*/
        private _indexText: eui.Label;
        /** 游戏名称*/
        private _gameNameText: eui.Label;
        /** 房间号*/
        private _roomText: eui.Label;
        /** 时间*/
        private _timeText: eui.Label;
        /** 时间和分数List*/
        private nameandscore: eui.List;
        /** 详情按钮*/
        private _detailBtn: eui.Button;
        /** 复制战绩按钮*/
        private _copyBtn: eui.Button;
        /**数据 */
        private info: Cmd.GameHistory;
        constructor() {
            super();
            this.skinName = "ClubMemberRecordItemSkin";
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

                case this._copyBtn:
                    MsgSendMgr.getGetNewShareInfo(this.info.globalRoomId);

            }
        }
        protected dataChanged(): void {
            this.info = this.data;
            this._indexText.text = this.itemIndex + 1 + "";
            this._timeText.text = LobbyUtils.changeTimeToStr(this.info.timeStamp);
            this._roomText.text = this.info.roomId + "号房间";
            if (this.info.gameId) {
                if (MJLobbyData.getInstance().getGameCreateConfig(this.info.gameId))
                    this._gameNameText.text = MJLobbyData.getInstance().getGameCreateConfig(this.info.gameId)["gameName"];
                else
                    this._gameNameText.text = "";
            }
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
            let item = this.info.userGameHistorys;
            this.nameandscore.itemRenderer = MemberRecordItemNSPanel;
            this.nameandscore.dataProvider = new eui.ArrayCollection(item);
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
    /**玩家战绩单个信息 */
    export class MemberRecordItemNSPanel extends eui.ItemRenderer {
        /** 昵称*/
        private names: eui.Label;
        /** 分数*/
        private score: eui.Label;
        private info: Cmd.UserGameHistory;
        constructor() {
            super();
            this.skinName = "MatchFightingNSSkin";
        }
        protected dataChanged(): void {
            this.info = this.data;
            this.names.text = this.info.nickName;
            if (this.info.integral != null) {
                this.score.text = this.info.integral + "";
                if (this.info.integral < 0) {
                    this.score.textColor = 0x0c7113;
                }
            }
        }
    }
}