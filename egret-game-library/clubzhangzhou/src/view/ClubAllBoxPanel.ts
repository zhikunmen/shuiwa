module club {
    /**老友圈所有房间面板 */
    export class ClubAllBoxPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 数据列表*/
        private boxList: eui.List;
        /**右侧区域 */
        private _leftGroup: eui.Group;
        /** 创建房间*/
        private _createBtn: eui.WxButton;
        /** 加入房间*/
        private _joinBtn: eui.WxButton;
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /** 背景蒙版*/
        private _bgRect: eui.Rect;

        private _clubList: Cmd.MatchGroupInfo[];
        constructor() {
            super();
            this.skinName = "ClubAllBoxSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            // this.width = uniLib.Global.screenWidth;
            // this.height = uniLib.Global.screenHeight;
        }
        protected destroy() {
            ClubModuleMgr.getInstance().removeAllClubListPanel();
            super.destroy();
        }
        protected initUI() {
            this.OnOpen();
        }
        protected addEvent() {
            uniLib.Global.addEventListener(ClubConst.HistoryClubList, this.setData, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(ClubConst.HistoryClubList, this.setData, this);
        }

        /**设置按钮开关 */
        private OnOpen() {
            this._leftGroup.x = -1143;
            this._closeBtn.x = 0;
            egret.Tween.get(this._leftGroup).to({ x: 0 }, 300);
            egret.Tween.get(this._closeBtn).to({ x: 1137 }, 300);
        }
        private OnClose() {
            egret.Tween.get(this._closeBtn).to({ x: 0 }, 300);
            egret.Tween.get(this._leftGroup).to({ x: -1143 }, 300).call(() =>
                super.removePop());
        }
        public setData(evt: uniLib.ZqEvent) {
            let date = evt.param as Cmd.HistoryMatchIdListMatchGroupCmd_S;
            if (!date)
                return;
            this._clubList = date.list;
            for (let i = 0; i < this._clubList.length; i++) {
                this._clubList[i].index = i + 1;
            }
            this.boxList.itemRenderer = ClubBoxItem;
            this.boxList.dataProvider = new eui.ArrayCollection(this._clubList);
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                case this._bgRect:
                    this.OnClose()
                    break;
                case this._createBtn:
                    this.OnClose()
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    ClubModuleMgr.getInstance().showCreateClubPanel();
                    break;
                case this._joinBtn:
                    this.OnClose()
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