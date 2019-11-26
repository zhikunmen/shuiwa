module club {
    /**俱乐部添加外部成员 */
    export class ClubAddMemberPanel extends commonpanel.LobbyBaseEuiPanel {

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
        /**构造玩家局数据 */
        private _list: Cmd.UserInfoSearchLobbyCmd_S[] = [];

        constructor() {
            super();
            this.skinName = "ClubAddmemberSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            uniLib.Global.addEventListener(ClubConst.UserInfoSearchLobby, this.setdata, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(ClubConst.UserInfoSearchLobby, this.setdata, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        }

        protected initUI(): void {
            this._menberList.itemRenderer = ClubAddMemberItemPanel;
        }

        public setdata(evt: uniLib.ZqEvent): void {
            var data = evt.param as Cmd.UserInfoSearchLobbyCmd_S;
            this._list = [];
            this._list.push(data);
            if (this._list.length == 0) {
                this._tishiText.visible = true;
            } else {
                this._tishiText.visible = false;
            }
            if (!this._menberListArray) {
                this._menberListArray = new eui.ArrayCollection(this._list);
                this._menberList.dataProvider = this._menberListArray;
            } else {
                if (Array.isArray(this._menberListArray.source)) {
                    this._menberListArray.removeAll();
                }
                this._menberListArray.replaceAll(this._list);
            }
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
                        let seq: Cmd.UserInfoSearchLobbyCmd_C = new Cmd.UserInfoSearchLobbyCmd_C;
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
    }
}