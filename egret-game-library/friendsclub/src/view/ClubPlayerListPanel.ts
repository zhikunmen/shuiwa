module friendsclub {
    /**
     * 亲友圈成员列表界面
     */
    export class ClubPlayerListPanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn: eui.Button;
        // private breakBtn: eui.Button;
        private listGroup: eui.Group;
        private headList: eui.List;
        private bgRect: eui.Rect;
        private _matchId: number;
        private _list: Cmd.MatchGroupMemberInfo[] = [];
        constructor() {
            super();
            this.skinName = "ClubPlayerListSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
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
            if (evt.target == this.bgRect || evt.target == this.closeBtn) {
                this.OnClose();
            }
        }
        /**设置按钮开关 */
        public OnOpen() {
            this.listGroup.x = -600;
            egret.Tween.get(this.listGroup).to({ x: 0 }, 300);
        }
        public OnClose() {
            egret.Tween.get(this.listGroup).to({ x: -600 }, 300).call(() =>
                ClubModuleMgr.getInstance().removeClubPlayerListPanel());
        }
    }
}