module club {
    /**搜索玩家的数据显示  */
    export class ClubSearchMemberItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg: eui.Image;
        /** 昵称*/
        private _nameText: eui.Label;
        /** 玩家id*/
        private _idText: eui.Label;
        /** 添加成员页面所用按钮*/
        private _addBtn: eui.WxButton;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn: eui.WxButton;
        /** 搜索成员按钮状态*/
        private _typeText: eui.Label;

        /**搜索玩家数据 */
        private searchInfo: Cmd.MatchGroupMemberInfo;

        constructor() {
            super();
            this.skinName = "ClubMemberItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addListener();
        }

        public addListener() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public removeListener() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected dataChanged(): void {
            this._searchBtn.visible = true;
            this._addBtn.visible = false;
            this.searchInfo = this.data;
            this._idText.text = this.searchInfo.uid + "";
            this._nameText.text = this.searchInfo.nickname;
            this._headImg.source = this.searchInfo.headUrl;
            if (this.searchInfo.membertype == 1) {
                this._searchBtn.currentState = "disabled";
                this._searchBtn.touchEnabled = false;
                this._searchBtn.skin["_typeText"].text = "圈主"
                this._searchBtn.skin["_typeText"].strokeColor = "0x434343";
            } else if (this.searchInfo.membertype == 2) {
                this._searchBtn.currentState = "disabled";
                this._searchBtn.touchEnabled = false;
                this._searchBtn.skin["_typeText"].text = "管理员"
                this._searchBtn.skin["_typeText"].strokeColor = "0x434343";
            }

        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._searchBtn:
                    if (this.searchInfo.membertype != 1 && this.searchInfo.membertype != 2) {
                        ClubModuleMgr.getInstance().showClubUserInfoPanel(this.searchInfo);
                    }
                    break;
            }
        }
    }
    /**手动添加玩家的数据显示  */
    export class ClubAddMemberItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg: eui.Image;
        /** 昵称*/
        private _nameText: eui.Label;
        /** 玩家id*/
        private _idText: eui.Label;
        /** 添加成员页面所用按钮*/
        private _addBtn: eui.WxButton;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn: eui.WxButton;
        /** 搜索成员按钮状态*/
        private _typeText: eui.Label;
        /**已添加提示 */
        private _tishiText: eui.Label;
        /**添加玩家数据 */
        private addInfo: Cmd.UserInfoSearchLobbyCmd_S;
        /** 搜索出来的结果 */
        private search: boolean = false;
        constructor() {
            super();
            this.skinName = "ClubMemberItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addListener();
        }

        public addListener() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public removeListener() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected dataChanged(): void {
            this._searchBtn.visible = false;
            this._addBtn.visible = true;
            this.addInfo = this.data;
            this._idText.text = this.addInfo.userInfo.uid + "";
            this._nameText.text = this.addInfo.userInfo.nickName;
            let ClubMemberList = ClubData.getInstance().ClubMemberMiniList;
            if (!Array.isArray(ClubMemberList)) return;
            ClubMemberList.forEach(element => {
                if (element.uid == this.addInfo.userInfo.uid) {
                    this.search = true;
                }
            });
            if (this.search) {
                this._tishiText.visible = true;
                this._addBtn.visible = false;
            }
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._addBtn:
                    let cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                    cmd.reply = 2;
                    cmd.uid = this.addInfo.userInfo.uid;
                    cmd.matchId = ClubData.getInstance().clubmatchid;
                    NetMgr.tcpSend(cmd);
                    this._tishiText.visible = true;
                    this._addBtn.visible = false;
                    break;
            }
        }
    }
}