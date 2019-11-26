module club {
    /**
     * 老友圈成员列表界面
     */
    export class ClubPlayerListPanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn: eui.WxButton;
        private breakBtn: eui.WxButton;
        private headList: eui.List;
        private _matchId: number;
        private _list: Cmd.MatchGroupMemberInfo[] = [];
        constructor() {
            super("mjl_club_list_title_png",1230,703);
            this.skinName = "ClubPlayerListSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.headList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.headList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        }
        protected destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
        public showList(evt: uniLib.ZqEvent): void {
            var member = evt.param as Cmd.ReturnMemberInfoMatchGroupCmd_S
            this._list = member.whitelist;
            this._matchId = member.matchId;
            if (Array.isArray(this._list)) {
                this.headList.itemRenderer = ClubPlayerListHeadPanel;
                this.headList.dataProvider = new eui.ArrayCollection(this._list);
            }
        }
        private itemTap(evt: eui.ItemTapEvent): void {
            let item = this.headList.selectedItem as Cmd.MatchGroupMemberInfo;
            let seq: Cmd.UserInfoSearchLobbyCmd_C = new Cmd.UserInfoSearchLobbyCmd_C;
            seq.uid = item.uid;
            NetMgr.tcpSend(seq);
        }
        private onClick(evt: egret.TouchEvent): void {
            if (evt.target == this.closeBtn) {
                super.removePop();
            }
            else if (evt.target == this.breakBtn) {
                let club = this;
                let okFunc = function () {
                    let cmd = new Cmd.LeaveMatchGroup2Cmd_C();
                    cmd.matchId = club._matchId;
                    NetMgr.tcpSend(cmd);
                    club.removePop();
                    // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    ClubModuleMgr.getInstance().showAllClubListPanel(() => {
                        let cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        cmd.isClub = 1;
                        NetMgr.tcpSend(cmd);
                    });
                }
                ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
            }
        }

    }
}