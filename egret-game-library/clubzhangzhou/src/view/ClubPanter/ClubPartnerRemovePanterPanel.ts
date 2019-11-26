module club {

    /**移出合伙人页面 */
    export class ClubPartnerRemovePanterPanel extends commonpanel.LobbyBaseEuiPanel {
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
            this._tipsText.text = "解除合伙人需要合伙人同意才能解除！";
            this._sureBtn.skin["_text"].text = "确认解除"
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
                    let cmd = new Cmd.OperatePartnerMatchGroupCmd_CS();
                    cmd.matchId = ClubData.getInstance().clubmatchid;
                    cmd.partnerUid = this._info.uid;
                    cmd.typ = 2;
                    NetMgr.tcpSend(cmd);
                    super.removePop();
                    break;
            }
        }

    }
}