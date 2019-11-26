module club {


    /**移出成员页面 */
    export class ClubPartnerRemoveMemberPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /*确定按钮 */
        private _sureBtn: eui.Button;
        /** */
        private _text: eui.Label;
        /** 头像资源*/
        private _headImg: eui.Image;
        /** 昵称*/
        private _nameText: eui.Label;
        /** id*/
        private _idText: eui.Label;
        /**提示文字 */
        private _tipsText: eui.Label;

        private _info: Cmd.MatchGroupMemberInfo;

        constructor(member: Cmd.MatchGroupMemberInfo) {
            super();
            this.skinName = "ClubPartnerRemoveSkin";
            this._info = member;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        //初始化
        protected initUI(): void {
            this._idText.text = "" + this._info.uid;
            this._nameText.text = this._info.nickname;
            this._headImg.source = this._info.headUrl;
        }
        /**事件监听 */
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }

        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._sureBtn:
                    let cmd = new Cmd.RemoveMemberMatchGroupCmd_CS();
                    cmd.matchId = ClubData.getInstance().clubmatchid;
                    cmd.uid = this._info.uid;
                    NetMgr.tcpSend(cmd);
                    super.removePop();
                    break;
            }
        }

    }
}