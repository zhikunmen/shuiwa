module club {

    /**群主 合作群添加合伙人*/
    export class ClubPartnerAddPanel extends commonpanel.LobbyBaseEuiPanel {
        /**搜索按钮 */
        private _searchBtn: eui.Button;
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
        /**构造玩家局数据 */
        private _list: Cmd.UserInfoSearchLobbyCmd_S[] = [];
        /** 搜索出来的数组*/
        private searchArray: Cmd.MatchGroupMemberInfo[];
        constructor() {
            super();
            this.skinName = "ClubAddPartnerSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        }

        protected initUI(): void {
            this._menberList.itemRenderer = ClubPartnerAddItemPanel;
        }

        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text.length < 8) {
                        uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID!");
                        this._searchEditableText.text = "";
                    } else {
                        this.searchMember(this._searchEditableText.text);
                    }
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
        /**输入框判断 */
        private onTextFieldFocusOut(event: egret.FocusEvent): void {
            if ((<eui.EditableText>event.target).text == "" || Number((<eui.EditableText>event.target).text) == 0) {
                (<eui.EditableText>event.target).text = "";
            }
        }
    }
}