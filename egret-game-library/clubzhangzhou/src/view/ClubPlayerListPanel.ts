module club {
    /**
     * 老友圈成员列表界面
     */
    export class ClubPlayerListPanel extends commonpanel.LobbyBaseEuiPanel {
        public static Instanc: ClubPlayerListPanel;
        /**底部蒙版 */
        private _rect: eui.Rect;
        /**所有玩家列表 */
        private _list: Cmd.MatchGroupMemberInfo[] = [];
        /**在线玩家列表 */
        private _onlinelist: Cmd.MatchGroupMemberInfo[] = [];
        /**左侧用户容器 */
        private _UserGroup: eui.Group;
        /** 所有玩家选项*/
        private allUserButton: eui.RadioButton;
        /** 显示所有玩家的文本 */
        private alluserText: eui.Label;
        /**在线玩家选项 */
        private onlineUserButton: eui.RadioButton;
        /** 在线玩家文本*/
        private onlineText: eui.Label;
        /** 关闭按钮*/
        private closeBtn: eui.Button;
        /** 所有玩家容器*/
        private allScroller: eui.Scroller;
        /** 所有玩家列表*/
        private allList: eui.List;
        /** 在线玩家容器*/
        private onlineScroller: eui.Scroller;
        /** 在线玩家列表*/
        private onlineList: eui.List;
        /** 右侧管理员容器 非管理员不显示*/
        private _managerGroup: eui.Group;
        /** 申请加入按钮*/
        private _applyBtn: eui.Button;
        /** 手动添加按钮 */
        private _addBtn: eui.Button;
        /** 搜索成员按钮*/
        private _searchBtn: eui.Button;
        /** 踢人按钮 */
        private _kickBtn: eui.Button;
        /**是否管理员 */
        private isOwner: boolean;

        /**数组集合器 */
        private _onlineListArr: eui.ArrayCollection;
        private _allListArr: eui.ArrayCollection;
        constructor(isOwner: boolean) {
            super();
            this.skinName = "ClubPlayerListSkin";
            this.isOwner = isOwner;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected initUI() {
            if (this.isOwner) {
                this._managerGroup.visible = true;
            } else {
                this._managerGroup.visible = false;
            }
            ClubData.getInstance().clubDeleteUser = false;
            this.allList.itemRenderer = ClubPlayerListHeadPanel;
            this.onlineList.itemRenderer = ClubPlayerListHeadPanel;
            this._kickBtn.currentState = "up";
            this.OnOpen();
            this.allUserButton.selected = true;
            this.onlineScroller.visible = false;
        }
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.allList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.onlineList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        }
        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.allList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.onlineList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        }
        protected destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
        /**设置按钮开关 */
        private OnOpen() {
            this._UserGroup.x = -622;
            this._managerGroup.x = 1280;
            egret.Tween.get(this._managerGroup).to({ x: 984 }, 300);
            egret.Tween.get(this._UserGroup).to({ x: 0 }, 300);
        }
        private OnClose() {
            egret.Tween.get(this._managerGroup).to({ x: 1280 }, 300);
            egret.Tween.get(this._UserGroup).to({ x: -622 }, 300).call(() =>
                super.removePop());
        }
        public showList(evt: uniLib.ZqEvent): void {
            var member = evt.param as Cmd.ReturnMemberInfoMatchGroupCmd_S;
            this._list = member.whitelist;
            this.allUserButton.skin["alluserText"].text = "全部(" + this._list.length + ")";
            let onlineNum = 0;
            this._onlinelist = [];
            this._list.forEach(element => {
                if (element.state == 1) {
                    onlineNum++;
                    this._onlinelist.push(element);
                }
            });
            this.onlineUserButton.skin["onlineText"].text = "在线(" + onlineNum + ")";
            if (Array.isArray(this._list)) {
                this.updateAllList();
            }
            if (Array.isArray(this._onlinelist)) {
                this.updateOnlineList();
            }
            if (this.onlineScroller.visible == true) {
                this.onlineUserButton.selected = true;
            }
        }

        private itemTap(evt: eui.ItemTapEvent): void {
            if (ClubData.getInstance().clubDeleteUser) {
                if (this.allList.selectedItem) {
                    let item = this.allList.selectedItem as Cmd.MatchGroupMemberInfo;
                    if (item.membertype != 1 && item.membertype != 2) {
                        ClubModuleMgr.getInstance().showClubUserInfoPanel(item);
                    }
                } else if (this.onlineList.selectedItem) {
                    let item = this.onlineList.selectedItem as Cmd.MatchGroupMemberInfo;
                    if (item.membertype != 1 && item.membertype != 2) {
                        ClubModuleMgr.getInstance().showClubUserInfoPanel(item);
                    }
                }
            }
        }
        /** 更新所有玩家数据*/
        private updateAllList(): void {
            if (!this._allListArr) {
                this._allListArr = new eui.ArrayCollection(this._list);
                this.allList.dataProvider = this._allListArr;
            } else {
                if (Array.isArray(this._allListArr.source)) {
                    this._allListArr.removeAll();
                }
                this._allListArr.replaceAll(this._list);
            }
        }
        /** 更新在线数据*/
        private updateOnlineList(): void {
            if (!this._onlineListArr) {
                this._onlineListArr = new eui.ArrayCollection(this._onlinelist);
                this.onlineList.dataProvider = this._onlineListArr;
            } else {
                if (Array.isArray(this._onlineListArr.source)) {
                    this._onlineListArr.removeAll();
                }
                this._onlineListArr.replaceAll(this._onlinelist);
            }
        }

        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._rect:
                case this.closeBtn:
                    this.OnClose();
                    break;
                case this.allUserButton:
                    this.onlineScroller.visible = false;
                    this.allScroller.visible = true;
                    break;
                case this.onlineUserButton:
                    this.onlineScroller.visible = true;
                    this.allScroller.visible = false;
                    break;
                case this._addBtn:
                    ClubModuleMgr.getInstance().showClubAddMemberPanel();
                    break;
                case this._applyBtn:
                    ClubModuleMgr.getInstance().showClubUserApplyPanel();
                    break;
                case this._kickBtn:
                    if (this._kickBtn.currentState == "up") {
                        this._kickBtn.currentState = "down";
                        ClubData.getInstance().clubDeleteUser = true;
                    } else {
                        this._kickBtn.currentState = "up"
                        ClubData.getInstance().clubDeleteUser = false;
                    }
                    this.updateAllList();
                    this.updateOnlineList();
                    break;
                case this._searchBtn:
                    ClubModuleMgr.getInstance().showClubSearchMemberPanel();
                    break;
            }
        }

    }
}