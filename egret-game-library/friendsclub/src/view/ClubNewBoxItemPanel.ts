module friendsclub {
    export class ClubNewBoxItemPanel extends eui.ItemRenderer {
        private _closeBtn: eui.Button;
        private _createBtn: eui.Button;
        private _switchBtn: eui.Button;
        private _setBtn: eui.Button;
        private _detailsBtn: eui.Button;
        private _msgTxt: eui.Label;
        private _gameTypeTxt: eui.Label;
        private _personNumTxt: eui.Label;
        // private _gameNumTxt: eui.Label;
        private _gameIconImg: eui.Image;
        public info: Cmd.FloorInfo;

        constructor() {
            super();
            this.skinName = "ClubNewBoxItemSkin";
            this.addListener();
        }
        public addListener() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public removeListener() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected dataChanged(): void {
            this.info = this.data;
            if (this.info.gameId) {
                this._gameIconImg.source = "club_gameicon_" + this.info.gameId;
                this._gameTypeTxt.text = this.info.gameName;
                this._personNumTxt.text = this.info.userNbr + "人";
                this._createBtn.visible = false;
                this._switchBtn.visible = true;
                this._msgTxt.visible = false;
                this._detailsBtn.visible = true;
                this._setBtn.visible = false;
                this._closeBtn.visible = false;
                if (ClubData.getInstance().isclubmanagor == 1) {
                    this._detailsBtn.visible = false;
                    this._setBtn.visible = true;
                    this._closeBtn.visible = true;
                }
            }
            else {
                this._gameIconImg.visible = false;
                this._gameTypeTxt.visible = false
                this._personNumTxt.visible = false
                this._createBtn.visible = true;
                this._switchBtn.visible = false;
                this._msgTxt.visible = true;
                this._detailsBtn.visible = false;
                this._setBtn.visible = false;
                this._closeBtn.visible = false;
            }
        }
        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this._createBtn) {
                let cmd = new Cmd.GetNormalGameListRoomCmd_C();
                cmd.isClub = 1;
                cmd.lobbyId = MJLobbyData.getInstance().lobbyId;
                NetMgr.tcpSend(cmd);
                ClubData.getInstance().isnewfloor = 1;
                ClubData.getInstance().newfloor = this.info.floorId;
            }
            else if (e.target == this._switchBtn) {
                let cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = ClubData.getInstance().clubmatchid;
                cmd.isClub = 1;
                cmd.floorId = this.info.floorId;
                ClubData.getInstance().isclubchangefloor = 1;
                NetMgr.tcpSend(cmd);
                ClubModuleMgr.getInstance().closeClubNewBoxPanel();
            }
            else if (e.target == this._detailsBtn) {
                this.showClubFloordetails();
                if (this.clubFloordetails) {
                    this.clubFloordetails.setDate(this.info);
                }
            }
            else if (e.target == this._setBtn) {
                let req: Cmd.OperateFloorMatchGroupCmd_CS = new Cmd.OperateFloorMatchGroupCmd_CS;
                req.matchId = ClubData.getInstance().clubmatchid;
                req.floorId = this.info.floorId;
                req.opType = 2;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this._closeBtn) {
                let self = this;
                let deleteFun = function () {
                    let req: Cmd.OperateFloorMatchGroupCmd_CS = new Cmd.OperateFloorMatchGroupCmd_CS;
                    req.matchId = ClubData.getInstance().clubmatchid;
                    req.floorId = self.info.floorId;
                    req.opType = 4;
                    NetMgr.tcpSend(req);
                    ClubModuleMgr.getInstance().closeClubNewBoxPanel();
                }
                let msgBox = new MatchMsgBox();
                msgBox.setData("温馨提示", "是否确认删除该包厢吗？", ["确定", "取消"], [deleteFun]);
                uniLib.PopUpMgr.addPopUp(msgBox, null, true);
            }
        }
        /**包厢详情 */
        private clubFloordetails: ClubFloordetails;
        private showClubFloordetails() {
            this.clubFloordetails = new ClubFloordetails();
            uniLib.PopUpMgr.addPopUp(this.clubFloordetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
        private removeClubFloordetails() {
            if (this.clubFloordetails) {
                uniLib.PopUpMgr.removePopUp(this.clubFloordetails);
                this.clubFloordetails = null;
            }
        }
    }

}