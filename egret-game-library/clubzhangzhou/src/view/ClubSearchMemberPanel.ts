module club {

    /**老友圈搜索该俱乐部玩家 */
    export class ClubSearchMemberPanel extends commonpanel.LobbyBaseEuiPanel {
        /**搜索按钮 */
        private _searchBtn: eui.WxButton;
        /**输入框 */
        private _searchEditableText: eui.EditableText;
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /** 用户列表*/
        private _menberList: eui.List;
        /** 用户列表容器*/
        private _menberListArray: eui.ArrayCollection;
        /** 暂无数据提示*/
        private _tishiText: eui.Label;
        /** 搜索出来的数组*/
        private searchArray: Cmd.MatchGroupMemberInfo[];
        constructor() {
            super();
            this.skinName = "ClubSearchMemberSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(ClubConst.MemberInfoMatchGroup, this.showList, this);

        }
        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(ClubConst.MemberInfoMatchGroup, this.showList, this);
        }

        protected initUI(): void {
            this._menberList.itemRenderer = ClubSearchMemberItemPanel;
        }

        /**更新搜索数据 */
        public showList(evt: uniLib.ZqEvent): void {
            this.searchMember(this._searchEditableText.text);
        }
        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._searchBtn:
                    this.searchMember(this._searchEditableText.text);
                    break;
            }
        }
        /**搜索数据 */
        private searchMember(value: string): void {
            let ClubMemberList = ClubData.getInstance().ClubMemberMiniList;
            if (!Array.isArray(ClubMemberList)) return;
            this.searchArray = [];
            if (value != "") {
                this.searchArray = ClubMemberList.filter(function (a) {
                    return a.nickname.toString().indexOf(value) != -1 || a.uid.toString().indexOf(value) != -1;
                });
            }
            this.setdata(this.searchArray);
        }
        /**更新数据*/
        public setdata(list: Cmd.MatchGroupMemberInfo[]): void {
            if (list.length == 0) {
                this._tishiText.visible = true;
            } else {
                this._tishiText.visible = false;
            }
            if (!this._menberListArray) {
                this._menberListArray = new eui.ArrayCollection(list);
                this._menberList.dataProvider = this._menberListArray;
            } else {
                if (Array.isArray(this._menberListArray.source)) {
                    this._menberListArray.removeAll();
                }
                this._menberListArray.replaceAll(list);
            }
        }
    }
}