module club {
	export class ClubModuleMgr {
		private static _instance: ClubModuleMgr;
		private _clubDeskPanel: ClubDeskPanel;
		private _activeRoomInformationPanel: ActiveRoomInformationPanel;

		private _isShowClub: number = 0;
		public static getInstance(): ClubModuleMgr {
			if (!this._instance) {
				this._instance = new ClubModuleMgr();
			}
			return this._instance;
		}

		/**老友圈列表界面 */
		public showAllClubListPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubAllBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**老友圈管理员界面单个房间详情 */
		public showActiveDetailRoomtPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				if (!this._activeRoomInformationPanel) {
					this._activeRoomInformationPanel = new ActiveRoomInformationPanel();
				}
				uniLib.PopUpMgr.addPopUp(this._activeRoomInformationPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**删除老友圈管理员界面单个房间详情 */
		public removeActiveDetailRoomtPanel(): void {
			if (this._activeRoomInformationPanel) {
				uniLib.PopUpMgr.removePopUp(this._activeRoomInformationPanel);
				this._activeRoomInformationPanel = null;
			}
		}

		/**老友圈桌面界面 */
		public showClubDeskPanel(callBack: Function): void {
			if (this._isShowClub == 1) {
				callBack();
			}
			if (!this._clubDeskPanel) {
				this._clubDeskPanel = new ClubDeskPanel();
				LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
					uniLib.PopUpMgr.addPopUp(this._clubDeskPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
					this._isShowClub = 1;
					callBack();
				});
			}
		}

		/**移除老友圈桌面 */
		public removeClubDeskPanel(): void {
			if (this._clubDeskPanel) {
				uniLib.PopUpMgr.removePopUp(this._clubDeskPanel);
				this._clubDeskPanel = null;
				this._isShowClub = 0;
				if (ClubData.getInstance().clubRefresh == 0) {
					let req: Cmd.ExitMatchGroupCmd_C = new Cmd.ExitMatchGroupCmd_C;
					NetMgr.tcpSend(req);
				}

			}
		}

		/**老友圈管理界面 */
		public showClubManagePanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(MatchManagePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}

		/**老友圈成员列表界面 */
		public showClubPlayerListPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPlayerListPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**老友圈公告界面 */
		public showClubNoticePanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubNoticePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**玩家第一次进入房间加备注 */
		public shoClubEnterRemarks(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubEnterRemarks, null, true, false, 0, );
				callBack();
			});
		}

		/**创建老友圈房间面板 */
		public showCreateClubPanel(game?: Cmd.ChangeMatchGroupCmd_S): void {
			LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_CREATEPANEL, () => {
				let info: CreatePanelParam = new CreatePanelParam(1);
				if (game) {
					info.data = game;
				} else {
					MsgSendMgr.getNormalGameList(1);
				}
				uniLib.PopUpMgr.addPopUp(CreateGamePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 1240, 640, info);
			});
		}

		/**显示老友圈查看个人信息面板 */
		public showClubUserInfoPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_USERINFO, () => {
				uniLib.PopUpMgr.addPopUp(ClubUserInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}

		/**
		 * 俱乐部创建、修改设置页面
		 */
		public showCreateMatchSetPanel(data: Cmd.CreateRoomCmd_C | Cmd.ChangeMatchGroupCmd_S): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.removePopUp(CreateGamePanel);
				uniLib.PopUpMgr.addPopUp(CreateMatchSetPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}
	}
}