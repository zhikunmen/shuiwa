/**老友圈所有房间面板 */
module club {
    export class ClubBoxPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 创建房间*/
        private _createBtn: eui.WxButton;
        /** 加入房间*/
        private _joinBtn: eui.WxButton;
        /** 关闭按钮*/
        private _closeBtn: eui.Button;

        constructor() {
            super();
            this.skinName = "ClubBoxSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public destroy() {
            super.destroy();
        }
        public initUI() {
        }
        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._createBtn:
                    super.removePop();
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    ClubModuleMgr.getInstance().showCreateClubPanel();
                    break;
                case this._joinBtn:
                    super.removePop();
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    LobbyModuleMgr.getInstance().showJoinRoomPanel(() => {
                        let req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        NetMgr.tcpSend(req);
                    });
                    break;
            }
        }
    }
}