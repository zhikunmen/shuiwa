module friendsclub {
	export class CreateMatchSetPanel extends commonpanel.LobbyBaseEuiPanel {
		private _gameNameLabel: eui.Label;      //游戏名称
		private _clubNameInput: eui.EditableText;     //亲友圈名称
		private _matchid: eui.EditableText;     //亲友圈id
		private _userIdInput: eui.EditableText;     //副房主ID
		private _modifyBtn: eui.WxButton;          //修改按钮 两种情况
		private _creatBtn: eui.WxButton;           //创建俱乐部
		private _sureSetBtn: eui.WxButton;         //确认修改俱乐部
		private _permissionCheck: eui.RadioButton;         //房主授权
		private _permissionLabel: eui.Label;         //房主授权
		private _req: Cmd.CreateRoomCmd_C;
		private _clubmss: Cmd.ChangeMatchGroupCmd_S;
		private _changeMatchId: number;//需要修改的匹配号ID
		private _state: number;   //1 创建  2 修改
		private _checkType: boolean;     //是否选中房主授权
		private _data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S
		constructor(data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S) {
			super();
			this.skinName = "CreateMatchSetSkin";
			this._data = data;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
		protected initUI() {
			if (this._data instanceof Cmd.CreateRoomCmd_C) {
				this._req = this._data;
				this._state = 1;
			} else {
				this._clubmss = this._data;
				this._req = this._data.createRoom;
				this._changeMatchId = this._data.matchId;
				this._state = 2;
			}
			this.setCreatReq(this._req);
			if (MJLobbyData.getInstance().lobbyConfig["clubPower"] == 1) {
				this._permissionCheck.selected = true;
				this._checkType = true;
			}
			if (this._state == 2) {
				this._sureSetBtn.visible = true;
				this._creatBtn.visible = false;
				this.showMatchData(this._clubmss)
			} else {
				this._sureSetBtn.visible = false;
				this._creatBtn.visible = true;
			}
		}
		protected addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected removeEvent() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public showMatchData(data: Cmd.ChangeMatchGroupCmd_S) {
			if (data == null)
				return;
			this._userIdInput.text = data.otherManagerId != null ? data.otherManagerId + "" : "";
			this._clubNameInput.text = data.matchName != null ? data.matchName : "";
			this._permissionCheck.selected = data.needAgree != null && data.needAgree == 1 ? true : false;
			this._checkType = this._permissionCheck.selected;
		}

		private onClickTap(e: egret.TouchEvent) {
			if (e.target == this._modifyBtn) {
				this.modifyPlay();
			}
			else if (e.target == this._creatBtn) {
				this.createMatchReq()
			}
			else if (e.target == this._sureSetBtn) {
				this.settingHandel();
			}
			else if (e.target == this._permissionCheck || e.target == this._permissionLabel) {
				this._checkType = this._permissionCheck.selected = !this._checkType;
			}
		}

		// 修改玩法按钮 1 返回全创建列表  2 显示单独修改的创建列表 
		private modifyPlay(): void {
			if (this._state == 1) {
				uniLib.PopUpMgr.removePopUp(this);
				ClubModuleMgr.getInstance().showCreateClubPanel();
			} else {
				uniLib.PopUpMgr.removePopUp(this);
				ClubModuleMgr.getInstance().showCreateClubPanel(this._clubmss);
			}
		}

		//创建俱乐部按钮
		private createMatchReq() {
			var req: Cmd.CreateMatchGroupCmd_C = new Cmd.CreateMatchGroupCmd_C();
			if (this._req) {
				req.createRoom = this._req;
				req.isClub = 1;
			}
			req.needAgree = this._permissionCheck.selected ? 1 : 0;
			if (this._clubNameInput) {
				req.matchName = this._clubNameInput.text;
			}
			let editableText = this._matchid != null ? this._matchid.text : "";
			if (this._matchid) {
				req.roomId = Number(editableText);
			}
			if (this._userIdInput) {
				req.otherManagerId = (Number)(this._userIdInput.text)
			}
			NetMgr.tcpSend(req);
			uniLib.PopUpMgr.removePopUp(this);
		}
		//确认修改按钮
		private settingHandel(): void {
			var req: Cmd.ChangeMatchGroupCmd_C = new Cmd.ChangeMatchGroupCmd_C();
			req.needAgree = this._permissionCheck.selected ? 1 : 0;
			req.matchId = this._changeMatchId != null ? this._changeMatchId : 0;
			if (this._clubNameInput) {
				req.matchName = this._clubNameInput.text;
			}
			let editableText = this._matchid != null ? this._matchid.text : "";
			if (this._matchid) {
				req.matchId = Number(editableText);
			}
			if (this._userIdInput) {
				req.otherManagerId = (Number)(this._userIdInput.text)
			}
			if (this._req) {
				req.createRoom = this._req;
			}
			NetMgr.tcpSend(req);
			uniLib.PopUpMgr.removePopUp(this);

		}
		/**
		 *获取创建房间的信息！
		 */
		private setCreatReq(data: Cmd.CreateRoomCmd_C): void {
			if (data) {
				this._req = data;
				if (data.gameId) {
					let config = MJLobbyData.getInstance().getGameCreateConfig(data.gameId);
					if (config)
						this._gameNameLabel.text = config.gameName;
				}
			}
		}
	}
}