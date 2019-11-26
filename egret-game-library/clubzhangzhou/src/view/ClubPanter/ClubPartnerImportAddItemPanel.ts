module club {

    /**合伙人 手动添加玩家的数据显示  */
    export class ClubPartnerImportAddItemPanel extends eui.ItemRenderer {
        /**头像 */
        private _headImg: eui.Image;
        /** 昵称*/
        private _nameText: eui.Label;
        /** 玩家id*/
        private _idText: eui.Label;
        /** 添加成员页面所用按钮*/
        private _addBtn: eui.Button;
        /** 搜索成员 页面所用按钮 */
        private _searchBtn: eui.Button;
        /** 搜索成员按钮状态*/
        private _typeText: eui.Label;
        /**已添加提示 */
        private _tishiText: eui.Label;
        /**搜索玩家数据 */
        private searchInfo: Cmd.MatchGroupMemberInfo;
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
            this._tishiText.visible = false;
            this.searchInfo = this.data;
            this._idText.text = this.searchInfo.uid + "";
            this._nameText.text = this.searchInfo.nickname;
            this._headImg.source = this.searchInfo.headUrl;
        }

        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._addBtn:
                    let cmd = new Cmd.ImportMember2MatchGroupCmd_CS();
                    cmd.matchId = ClubData.getInstance().clubmatchid;
                    cmd.fromMatchId = ClubData.getInstance().PartnerMatchId;
                    cmd.uids = [this.searchInfo.uid];
                    NetMgr.tcpSend(cmd);
                    this._tishiText.visible = true;
                    this._addBtn.visible = false;
                    break;
            }
        }
    }

}