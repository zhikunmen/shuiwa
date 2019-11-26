
module club {

    export class ClubInvitePlayerItemPanel extends eui.ItemRenderer {
        /**头像资源 */
        private _headImg: eui.Image;
        /**昵称 */
        private _nameText: eui.Label;
        /** _idText*/
        private _idText: eui.Label;
        /** 状态*/
        private _typeText: eui.Label;
        /** 邀请按钮*/
        private _inviteBtn: eui.WxButton;

        /**搜索玩家数据 */
        private searchInfo: Cmd.MatchGroupMemberInfo;
        constructor() {
            super();
            this.skinName = "ClubInvitePlayerItemSkin";
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
            this.searchInfo = this.data;
            this._headImg.source = this.searchInfo.headUrl;
            this._nameText.text = this.searchInfo.nickname;
            this._idText.text = "ID:" + this.searchInfo.uid;
            if (this.searchInfo.state == ClubConst.OnlineState_Online) {
                this._typeText.text = "空闲";
            }
            else if (this.searchInfo.state == ClubConst.OnlineState_Invited) {
                this._typeText.text = "已邀请";
                this._inviteBtn.currentState = "disabled";
                this._inviteBtn.touchEnabled = false;
                this._inviteBtn.skin["_typeText"].text = "已邀请"
                this._inviteBtn.skin["_typeText"].strokeColor = "0x434343";
            }
            else if (this.searchInfo.state == ClubConst.OnlineState_Offline) {
                this._typeText.text = "离线";
                this._typeText.textColor = 0x747171;
                this._inviteBtn.currentState = "disabled";
                this._inviteBtn.touchEnabled = false;
                this._inviteBtn.skin["_typeText"].text = "邀请"
                this._inviteBtn.skin["_typeText"].strokeColor = "0x434343";
            }
            else if (this.searchInfo.state == ClubConst.OnlineState_Gameing) {
                this._typeText.text = "游戏中";
                this._typeText.textColor = 0x747171;
                this._inviteBtn.currentState = "disabled";
                this._inviteBtn.touchEnabled = false;
                this._inviteBtn.skin["_typeText"].text = "邀请"
                this._inviteBtn.skin["_typeText"].strokeColor = "0x434343";
            }
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._inviteBtn:
                    if (uniLib.Global.isInGame) {
                        ClubSendMgr.InviteMemberMatchGroupCmd(ClubData.getInstance().EnterClubId, [this.searchInfo.uid]);
                    } else {
                        ClubSendMgr.InviteMemberMatchGroupCmd(ClubData.getInstance().clubmatchid, [this.searchInfo.uid]);
                    }

                    break;
            }
        }

    }
}