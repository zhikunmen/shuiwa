module club {

    export class ClubInvitePlayerPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /**老友圈名称 */
        private _clubNameText: eui.Label;
        /**在线人 */
        private _onlineText: eui.Label;
        /**俱乐部ID */
        private _clubIdText: eui.Label;
        /**搜索输入框 */
        private _searchEditableText: eui.EditableText;
        /**搜索按钮 */
        private _searchBtn: eui.Button;
        /**全部邀请按钮 */
        private _allInviteBtn: eui.Button;
        /** 玩家列表*/
        private _playerList: eui.List;
        /**数据集合器 */
        private _playerListArray: eui.ArrayCollection;
        /** 暂无数据提示*/
        private _tishiText: eui.Label;
        /** 玩家列表*/
        private _memberList: Cmd.MatchGroupMemberInfo[];
        /** 可以邀请列表列表*/
        private _canInviteList: number[];
        /** 搜索出来的数组*/
        private searchArray: Cmd.MatchGroupMemberInfo[];
        constructor() {
            super();
            this.skinName = "ClubInvitePlayerSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected destroy(): void {
            super.destroy();
        }
        //初始化
        protected initUI(): void {
            this._playerList.itemRenderer = ClubInvitePlayerItemPanel;
        }
        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.GetCanInviteMemberList, this.showData, this);
            uniLib.Global.addEventListener(ClubConst.InviteMemberMatchGroup, this.updateList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.InviteMemberMatchGroup, this.updateList, this);
            uniLib.Global.removeEventListener(ClubConst.GetCanInviteMemberList, this.showData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        private showData(evt: uniLib.ZqEvent): void {
            let date = evt.param as Cmd.GetCanInviteMemberListMatchGroupCmd_CS;
            if (!date) {
                return;
            }
            this._clubNameText.text = "群名：" + date.curMatch.matchName;
            this._clubIdText.text = "ID：" + date.curMatch.matchId;
            this._onlineText.text = "在线：" + date.curMatch.onlineUserNum;
            this._memberList = date.memberList;
            if (date.roomId) {
                ClubData.getInstance().InviteRoomId = date.roomId;
            } else {
                ClubData.getInstance().InviteRoomId = 0;
            }
            this._canInviteList = [];
            if (Array.isArray(this._memberList)) {
                this._memberList.forEach(element => {
                    if (element.state == ClubConst.OnlineState_Online) {
                        this._canInviteList.push(element.uid);
                    }
                });
            }
            this.updateplayerListArray(this._memberList);

        }
        /**操作后 更新玩家状态 */
        private updateList(evt: uniLib.ZqEvent): void {
            let date = evt.param as Cmd.InviteMemberMatchGroupCmd_CS;
            if (!date) {
                return;
            }
            if (Array.isArray(this._memberList)) {
                this._memberList.forEach(element => {
                    if (Array.isArray(date.uids)) {
                        if (date.uids.indexOf(element.uid) != -1) {
                            element.state = ClubConst.OnlineState_Invited;
                        }
                    }
                });
            }
            this._canInviteList = [];
            if (Array.isArray(this._memberList)) {
                this._memberList.forEach(element => {
                    if (element.state == ClubConst.OnlineState_Online) {
                        this._canInviteList.push(element.uid);
                    }
                });
            }
            this.updateplayerListArray(this._memberList);

        }
        /**更新数据 */
        private updateplayerListArray(list: Cmd.MatchGroupMemberInfo[]): void {
            if (list.length == 0) {
                this._tishiText.visible = true;
            } else {
                this._tishiText.visible = false;
            }
            if (!Array.isArray(list)) {
                this._tishiText.visible = true;
            }
            if (!this._playerListArray) {
                this._playerListArray = new eui.ArrayCollection(list);
                this._playerList.dataProvider = this._playerListArray;
            } else {
                if (Array.isArray(this._playerListArray.source)) {
                    this._playerListArray.removeAll();
                }
                this._playerListArray.replaceAll(list);
            }
        }
        /**搜索数据 */
        private searchMember(value: string): void {
            let ClubMemberList = this._memberList;
            this.searchArray = [];
            if (Array.isArray(ClubMemberList)) {
                if (value != "") {
                    this.searchArray = ClubMemberList.filter(function (a) {
                        return a.nickname.toString().indexOf(value) != -1 || a.uid.toString().indexOf(value) != -1;
                    });
                }
            }
            this.updateplayerListArray(this.searchArray);
        }
        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._allInviteBtn:

                    if (this._canInviteList.length > 0) {
                        if (uniLib.Global.isInGame) {
                            ClubSendMgr.InviteMemberMatchGroupCmd(ClubData.getInstance().EnterClubId, this._canInviteList);
                        } else {
                            ClubSendMgr.InviteMemberMatchGroupCmd(ClubData.getInstance().clubmatchid, this._canInviteList);
                        }
                    }
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text) {
                        this.searchMember(this._searchEditableText.text);
                    }
                    break;
            }

        }
    }
}