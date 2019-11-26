/**申请列表 */
module club {
    export class ClubApplyListPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /**数据表*/
        private messageList: eui.List;
        /** 全部拒绝*/
        private _noBtn: eui.WxButton;
        /** 全部同意*/
        private _yesBtn: eui.WxButton;
        /**审批记录 */
        private _recordBtn: eui.Button;
        /**提示字 */
        private _tipsText: eui.Label;
        /**列表数据容器 */
        private messageListArr: eui.ArrayCollection;
        /** 所有玩家Uid 批量操作使用*/
        private _allUidList: number[];
        constructor() {
            super();
            this.skinName = "ClubApplyListSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        //初始化
        protected initUI(): void {
            this.messageList.itemRenderer = MatchMessageItem;
            if (ClubData.getInstance().JoinMemberList) {
                this.updateApplyList(ClubData.getInstance().JoinMemberList.list);
            }
        }
        /**事件监听 */
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(ClubConst.JoinMemberListMatch, this.updateList, this);
        }

        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.JoinMemberListMatch, this.updateList, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        }
        protected destroy(): void {
            super.destroy();
        }
        private onClick(evt: egret.TouchEvent) {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._yesBtn:
                    if (this._allUidList.length > 0) {
                        ClubSendMgr.ReplyJoinMemberListMatchGroupCmdBatch(ClubData.getInstance().clubmatchid, 1, this._allUidList);
                    }
                    break;
                case this._noBtn:
                    if (this._allUidList.length > 0) {
                        ClubSendMgr.ReplyJoinMemberListMatchGroupCmdBatch(ClubData.getInstance().clubmatchid, 0, this._allUidList);
                    }
                    break;
                case this._recordBtn:
                    ClubSendMgr.requestGetApproveRecordMatchGroupCmd_C(ClubData.getInstance().clubmatchid, 0, null);
                    ClubModuleMgr.getInstance().showClubApplyRecordPanel();
                    break;
            }

        }
        private updateList(evt: uniLib.ZqEvent): void {
            ClubData.getInstance().JoinMemberList = evt.param as Cmd.JoinMemberListMatchGroupCmd_S;
            this.updateApplyList(ClubData.getInstance().JoinMemberList.list);
        }

        /** 更新申请数据*/
        private updateApplyList(list: Cmd.MatchGroupMemberInfo[]): void {
            this._allUidList = [];
            if (list.length > 0) {
                this._tipsText.visible = false;
                list.forEach(element => {
                    this._allUidList.push(element.uid);
                });
            } else {
                this._tipsText.visible = true;
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
    }
}