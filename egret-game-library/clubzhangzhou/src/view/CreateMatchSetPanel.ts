module club {
	export class CreateMatchSetPanel extends commonpanel.LobbyBaseEuiPanel {
		/** 游戏名称*/
		private _gameNameLabel: eui.Label;
		/**老友圈名称 */
		private _clubNameInput: eui.EditableText;
		/**副房主ID */
		private _userIdInput: eui.EditableText;
		/** 管理员ID*/
		private _user2IdInput: eui.EditableText;
		/**修改按钮 两种情况 */
		private _modifyBtn: eui.WxButton;
		/**创建俱乐部 */
		private _creatBtn: eui.WxButton;
		/**确认修改俱乐部 */
		private _sureSetBtn: eui.WxButton;
		/** 房主授权*/
		private _permissionCheck: eui.RadioButton;
		/**房主授权 */
		private _permissionLabel: eui.Label;
		/** 游戏玩法属性*/
		private _req: Cmd.CreateRoomCmd_C;
		/**改变老友圈游戏属性 */
		private _clubmss: Cmd.ChangeMatchGroupCmd_S;
		/**需要修改的匹配号ID */
		private _changeMatchId: number;//需要修改的匹配号ID
		/** 1 创建  2 修改*/
		private _state: number
		/**是否选中房主授权 */
		private _checkType: boolean;
		/**当前游戏ID 云霄和跑得快暂时需要加大赢家*/
		private _gameId: number;
		/** 大赢家区域*/
		private _bigWinGroup: eui.Group;
		/** 大赢家输入*/
		private _bigWinInput: eui.EditableText;
		/**大赢家提示 */
		private _tipsBtn: eui.Button;
		/** 管理员可清除战绩 */
		private _cleanRcordCheck: eui.RadioButton;
		/** 管理员可清除战绩*/
		private _cleanRcordLabel: eui.Label;
		/**是否选中管理员可清除战绩 */
		private _cleancheckType: boolean;
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
		/** 修改玩法显示已有数据*/
		public showMatchData(data: Cmd.ChangeMatchGroupCmd_S) {
			if (data == null)
				return;
			if (data.otherManagerId != null) {
				if (data.otherManagerId == uniLib.UserInfo.uid) {
					uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
					this._userIdInput.text = "";
				}
				else {
					this._userIdInput.text = data.otherManagerId + "";
				}
			}
			else {
				this._userIdInput.text = "";
			}
			if (data.otherManagerId2 != null) {
				if (data.otherManagerId2 == uniLib.UserInfo.uid) {
					uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
					this._user2IdInput.text = "";
				}
				else {
					this._user2IdInput.text = data.otherManagerId2 + "";
				}
			}
			else {
				this._user2IdInput.text = "";
			}
			if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4275 || this._gameId == 4035 || this._gameId == 4123) {
				this._bigWinInput.text = data.winnerConditions != null ? data.winnerConditions + "" : "";
			}
			this._clubNameInput.text = data.matchName != null ? data.matchName : "";
			this._permissionCheck.selected = data.needAgree != null && data.needAgree == 1 ? true : false;
			this._checkType = this._permissionCheck.selected;
			this._cleanRcordCheck.selected = data.masterClearRecord != null && data.masterClearRecord == 1 ? true : false;
			this._cleancheckType = this._cleanRcordCheck.selected;
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
			else if (e.target == this._cleanRcordCheck || e.target == this._cleanRcordLabel) {
				this._cleancheckType = this._cleanRcordCheck.selected = !this._cleancheckType;
			}
			else if (e.target == this._tipsBtn) {
				// ComponentUtil.getInstance().showConfirm("大赢家最低分数设置为0时，只要最高的分数就是大赢家，设置非0时，最高分大于等于设置的分数才算大赢家。", "大赢家分数说明", "确定", null);
				uniLib.TipsUtils.showConfirm("大赢家最低分数设置为0时，只要最高的分数就是大赢家，设置非0时，最高分大于等于设置的分数才算大赢家。", "大赢家分数说明", "确定", null);
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
			req.masterClearRecord = this._cleanRcordCheck.selected ? 1 : 0;
			if (this._clubNameInput) {
				req.matchName = this._clubNameInput.text;
			}
			if (this._userIdInput) {
				let m1 = (Number)(this._userIdInput.text);
				if (m1 != uniLib.UserInfo.uid) {
					req.otherManagerId = m1;
				} else if (m1 == uniLib.UserInfo.uid) {
					uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
					req.otherManagerId = 0;
				}
				else {
					req.otherManagerId = 0;
				}
			}
			if (this._user2IdInput) {
				let m2 = (Number)(this._user2IdInput.text);
				if (m2 != uniLib.UserInfo.uid) {
					req.otherManagerId2 = m2;
				} else if (m2 == uniLib.UserInfo.uid) {
					uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
					req.otherManagerId2 = 0;
				}
				else {
					req.otherManagerId2 = 0;
				}
			}
			if (this._bigWinInput) {
				if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4035 || this._gameId == 4275 || this._gameId == 4123) {
					req.winnerConditions = (Number)(this._bigWinInput.text)
				}
			}
			NetMgr.tcpSend(req);
			uniLib.PopUpMgr.removePopUp(this);
		}
		//确认修改按钮
		private settingHandel(): void {
			var req: Cmd.ChangeMatchGroupCmd_C = new Cmd.ChangeMatchGroupCmd_C();
			req.needAgree = this._permissionCheck.selected ? 1 : 0;
			req.masterClearRecord = this._cleanRcordCheck.selected ? 1 : 0;
			req.matchId = this._changeMatchId != null ? this._changeMatchId : 0;
			if (this._clubNameInput) {
				req.matchName = this._clubNameInput.text;
			}
			if (this._userIdInput) {
				req.otherManagerId = (Number)(this._userIdInput.text)
			}
			if (this._user2IdInput) {
				req.otherManagerId2 = (Number)(this._user2IdInput.text)
			}
			if (this._bigWinInput) {
				if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4035 || this._gameId == 4275 || this._gameId == 4123) {
					req.winnerConditions = (Number)(this._bigWinInput.text)
				}
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
					this._gameId = data.gameId;
				}
			}
			if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4035 || this._gameId == 4275 || this._gameId == 4123) {
				this._bigWinGroup.visible = true;
			} else {
				this._bigWinGroup.visible = false;
			}
		}
	}
}