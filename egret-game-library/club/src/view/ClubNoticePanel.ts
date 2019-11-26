module club {
    /**
     * 老友圈公告界面
     */
    export class ClubNoticePanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn: eui.WxButton;
        private modifyBtn: eui.WxButton;
        private noticeTxt: eui.EditableText;
        private notice: eui.Label;
        private _matchid: number;
        private _bUpdate: number;
        constructor() {
            super("club_notice_title",700,478);
            this.skinName = "ClubNoticeSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.CLUB_NOTICE, this.showNotice, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.noticeTxt.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(ClubConst.CLUB_NOTICE, this.showNotice, this);
            this.noticeTxt.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        }
        protected destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
        public showNotice(evt: uniLib.ZqEvent): void {
            var data = evt.param as Cmd.ClubNoticeMatchGroupCmd_CS;
            if (data.content) {
                this.noticeTxt.text = data.content;
                this.notice.text = data.content;
            } else {
                this.noticeTxt.text = "";
                this.notice.text = "暂无公告";
            }
            if (data.bUpdate == 1) {
                this.noticeTxt.visible = true;
                this.notice.visible = false;
            } else {
                this.noticeTxt.visible = false;
                this.notice.visible = true;
                // this.modifyBtn.visible = false;
            }
            this._bUpdate = data.bUpdate;
            this._matchid = data.matchId;
        }
        private onClick(evt: egret.TouchEvent): void {
            if (evt.target == this.closeBtn) {
                super.removePop();
            }
            else if (evt.target == this.modifyBtn) {
                if (this._bUpdate == 1) {
                    let cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                    cmd.matchId = this._matchid;
                    cmd.content = this.noticeTxt.text;
                    NetMgr.tcpSend(cmd);
                }
                super.removePop();
            }
        }

    }

}