module club {

    /**俱乐部成员列表详情 */
    export class ClubPartnerRecordDetailPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /** 头像*/
        private _headImg: eui.Image;
        /** 昵称*/
        private _nameText: eui.Label;
        /** id*/
        private _uidText: eui.Label;
        /** 备注*/
        private _remarksText: eui.EditableText;
        /**提示信息 */
        private _tishiText: eui.Label;
        /**归属人 */
        private _belongText: eui.Label;
        /**备注 */
        private _remark: eui.Label;
        /**滑块 */
        private _scroller: eui.Scroller;
        /**列表 */
        private _list: eui.List;
        private _listArr: eui.ArrayCollection;
        /**玩家数据 */
        private _info: Cmd.MatchGroupMemberInfo;
        /**当前页数 */
        private _curPage: number = 0;
        /**总页数 */
        private _totalPage: number;
        /**数据 */
        private _AllRecordArr: Array<Cmd.GameHistory>;
        constructor(parm: Cmd.MatchGroupMemberInfo) {
            super();
            this.skinName = "ClubPartnerRecordDetailSkin";
            this._info = parm;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.MATCH_HISTORY_FOR_PARTNER, this.showData, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }

        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.MATCH_HISTORY_FOR_PARTNER, this.showData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        //初始化
        protected initUI(): void {
            this.addListen();
            this._AllRecordArr = [];
            this._list.itemRenderer = ClubMemberInfoItemPanel;
            this._remarksText.touchEnabled = false;
            ClubSendMgr.getGameDataHistoryToUIdgForPartner(ClubData.getInstance().clubmatchid, this._info.uid, 1, ClubConst1.MATCH_HISTORY_FOR_PARTNER);
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
            }
        }
        /**接收数据 */
        public showData(evt: uniLib.ZqEvent): void {
            var vo = evt.param as Cmd.GetGameDataHistoryForMatchCmd_S;
            this._headImg.source = vo.userInfo.headurl;
            this._nameText.text = vo.userInfo.nickname;
            this._uidText.text = vo.userInfo.uid + "";
            this._remarksText.text = vo.userInfo.remark ? vo.userInfo.remark : "";
            if (vo.userInfo.partner) {
                this._belongText.text = "归属人：" + vo.userInfo.partner.nickname;
                this._belongText.visible = true;
            } else {
                this._belongText.visible = false;
            }
            if (vo.typ) {
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                this._totalPage = vo.maxPage;
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tishiText.visible = true;
                } else {
                    this._tishiText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
        }
        /**添加数据*/
        private addData(arr: Array<Cmd.GameHistory>): void {
            if (!arr || !arr[0]) {
                return;
            }
            this._AllRecordArr = this._AllRecordArr.concat(arr);
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._AllRecordArr);
                this._list.dataProvider = this._listArr;
            } else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._AllRecordArr);
            }
        }
        /**单独加 */
        private addListen(): void {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        }
        /**获取战绩消息 */
        public getData(): void {
            uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            ClubSendMgr.getGameDataHistoryToUIdgForPartner(ClubData.getInstance().clubmatchid, this._info.uid, this._curPage, ClubConst1.MATCH_HISTORY_FOR_PARTNER);
        }
        /**滑到底加载其他页数据 */
        private checkTop(evt: egret.TouchEvent): void {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this);//2秒不返回继续可以请求
                }
            }
        }
    }
}
