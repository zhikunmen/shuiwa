module club {
    /**申请列表 */
    export class ClubApplyRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.WxButton;
        /**数据表*/
        private messageList: eui.List;
        /**提示字 */
        private _tipsText: eui.Label;
        private _scroller: eui.Scroller;
        /**列表数据容器 */
        private messageListArr: eui.ArrayCollection;
        /** 所有玩家Uid 批量操作使用*/
        private _allUidList: number[];
        /**搜索按钮 */
        private _searchBtn: eui.WxButton;
        /**输入框 */
        private _searchEditableText: eui.EditableText;
        /**当前页数 */
        private _curPage: number = 0;
        /**总页数 */
        private _totalPage: number;
        constructor() {
            super();
            this.skinName = "ClubApplyRecordSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        //初始化
        protected initUI(): void {
            this.messageList.itemRenderer = ClubApplyRecordItem;
            // if (MJLobbyData.getInstance().applyRecordList) {
            //     this._curPage = MJLobbyData.getInstance().applyRecordList.curPage;
            //     this._totalPage = MJLobbyData.getInstance().applyRecordList.maxPage;
            //     this.updateApplyList(MJLobbyData.getInstance().applyRecordList.records);
            // }
        }
        /**事件监听 */
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(ClubConst.GET_APPLYRECORD_LIST, this.updateList, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(ClubConst.GET_APPLYRECORD_LIST, this.updateList, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);

        }
        private updateList(evt: uniLib.ZqEvent): void {
            ClubData.getInstance().applyRecordList = evt.param as Cmd.GetApproveRecordMatchGroupCmd_S;
            this._curPage = ClubData.getInstance().applyRecordList.curPage;
            this._totalPage = ClubData.getInstance().applyRecordList.maxPage;
            this.updateApplyList(ClubData.getInstance().applyRecordList.records);
        }
        protected destroy(): void {
            super.destroy();
        }
        private onClick(evt: egret.TouchEvent) {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text.length < 8) {
                        uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID!");
                        this._searchEditableText.text = "";
                    } else {
                        let seq: Cmd.GetApproveRecordMatchGroupCmd_C = new Cmd.GetApproveRecordMatchGroupCmd_C;
                        seq.matchId = ClubData.getInstance().clubmatchid;
                        seq.curPage = 1;
                        seq.uid = Number(this._searchEditableText.text);
                        NetMgr.tcpSend(seq);
                    }
                    break;
            }

        }
        /**输入框判断 */
        private onTextFieldFocusOut(event: egret.FocusEvent): void {
            if ((<eui.EditableText>event.target).text == "" || Number((<eui.EditableText>event.target).text) == 0) {
                (<eui.EditableText>event.target).text = "";
            }
        }

        /** 更新申请数据*/
        private updateApplyList(list: Cmd.ApproveRecord[]): void {
            this._allUidList = [];
            if (list.length > 0) {
                this._tipsText.visible = false;
                list.forEach(element => {
                    this._allUidList.push(element.uid);
                });
            } else {
                this._tipsText.visible = true;
            }
            if (!list || list.length <= 0 || !Array.isArray(list)) {
                return;
            }
            if (!this.messageListArr) {
                this.messageListArr = new eui.ArrayCollection(list);
                this.messageList.dataProvider = this.messageListArr;
            } else {
                if (Array.isArray(this.messageListArr.source)) {
                    this.messageListArr.removeAll();
                }
                this.messageListArr.replaceAll(list);
            }
        }

        /**单独加 */
        private addListen(): void {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        }
        /**获取战绩消息 */
        public getData(): void {
            uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            ClubSendMgr.requestGetApproveRecordMatchGroupCmd_C(ClubData.getInstance().clubmatchid, this._curPage, null);
        }
        /**滑到底加载其他页数据 */
        private checkTop(evt: egret.TouchEvent): void {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(1000).call(this.addListen, this);//2秒不返回继续可以请求
                }
            }
        }
    }

    class ClubApplyRecordItem extends eui.ItemRenderer {
        private _indextText: eui.Label;
        private _timeText: eui.Label;
        private _nameText1: eui.Label;
        private _uidText1: eui.Label;
        private _headImg1: eui.Image;
        private _nameText2: eui.Label;
        private _uidText2: eui.Label;
        private _headImg2: eui.Image;
        private _enterText: eui.Label;
        private _info: Cmd.ApproveRecord;
        constructor() {
            super();
            this.skinName = "ClubApplyRecordItemSkin";
        }
        protected dataChanged(): void {
            this._info = this.data;
            if (this._info == null) return;
            this._indextText.text = this.itemIndex + 1 + "";
            if (this._info.timestamp) {
                this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this._info.timestamp);
            }
            if (this._info.name) {
                if (uniLib.StringUtils.getStrRealLength(this._info.name) > 5) {
                    this._nameText1.text = this._info.name.substr(0, 5) + "...";
                }
                else {
                    this._nameText1.text = this._info.name;
                }
            }
            if (this._info.uid) {
                this._uidText1.text = this._info.uid + "";
            }
            if (this._info.headurl) {
                this._headImg1.source = this._info.headurl;
            }
            if (this._info.mastername) {
                if (uniLib.StringUtils.getStrRealLength(this._info.mastername) > 5) {
                    this._nameText2.text = this._info.mastername.substr(0, 5) + "...";
                }
                else {
                    this._nameText2.text = this._info.mastername;
                }
            }
            if (this._info.masteruid) {
                this._uidText2.text = this._info.masteruid + "";
            }
            if (this._info.masterheadurl) {
                this._headImg2.source = this._info.masterheadurl;
            }
            if (this._info.type == 1) {
                this._enterText.text = "玩家主动申请";
            }
            else if (this._info.type == 2) {
                this._enterText.text = "白名单加入";
            }
            else if (this._info.type == 3) {
                this._enterText.text = "合作群添加";
            }
        }
    }
}