module clubnew {
	export class ClubModuleMgr {
		private static _instance: ClubModuleMgr;
		private _clubDeskPanel: ClubDeskPanel;
		private _isShowClub: number = 0;
		private _clubPlayerListPanel: ClubPlayerListPanel;
		private _clubNewBoxPanel: ClubNewBoxPanel;
		private _clubManagePanel: ClubManagePanel;
		public static getInstance(): ClubModuleMgr {
			if (!this._instance) {
				this._instance = new ClubModuleMgr();
			}
			return this._instance;
		}

		/**老友圈列表界面 */
		public showAllClubListPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				uniLib.PopUpMgr.addPopUp(ClubAllBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**老友圈管理员界面单个房间详情 */
		public showActiveDetailRoomtPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				uniLib.PopUpMgr.addPopUp(ActiveRoomInformationPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**删除老友圈管理员界面单个房间详情 */
		public removeActiveDetailRoomtPanel(): void {
			uniLib.PopUpMgr.removePopUp(ActiveRoomInformationPanel);
		}

		/**老友圈桌面界面 */
		public showClubDeskPanel(callBack: Function): void {
			if (this._isShowClub == 1) {
				callBack();
			}
			if (!this._clubDeskPanel) {
				this._clubDeskPanel = new ClubDeskPanel();
				LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
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
				let req: Cmd.ExitMatchGroupCmd_C = new Cmd.ExitMatchGroupCmd_C;
				NetMgr.tcpSend(req);
			}
		}

		/**老友圈管理界面 */
		public showClubManagePanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				if (!this._clubManagePanel) {
					this._clubManagePanel = new ClubManagePanel();
					uniLib.PopUpMgr.addPopUp(this._clubManagePanel, null, true, false, 0);
					this._clubManagePanel.OnOpen();
				}
				callBack();
			});
		}
		public closeClubManagePanel(): void {
			if (this._clubManagePanel) {
				this._clubManagePanel.OnClose();
			}
		}
		public removeClubManagePanel(): void {
			if (this._clubManagePanel) {
				uniLib.PopUpMgr.removePopUp(this._clubManagePanel);
				this._clubManagePanel = null;

			}
		}

		/**老友圈成员列表界面 */
		public showClubPlayerListPanel(callBack: Function): void {
			this._clubPlayerListPanel = new ClubPlayerListPanel();
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				uniLib.PopUpMgr.addPopUp(this._clubPlayerListPanel, null, true, false, 0);
				this._clubPlayerListPanel.OnOpen();
				callBack();
			});
		}

		public removeClubPlayerListPanel(): void {
			if (this._clubPlayerListPanel) {
				uniLib.PopUpMgr.removePopUp(this._clubPlayerListPanel);
				this._clubPlayerListPanel = null;
			}
		}
		/**老友圈公告界面 */
		public showClubNoticePanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				uniLib.PopUpMgr.addPopUp(ClubNoticePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**玩家第一次进入房间加备注 */
		public shoClubEnterRemarks(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				uniLib.PopUpMgr.addPopUp(ClubEnterRemarks, null, true, false, 0, );
				callBack();
			});
		}

		/**创建老友圈房间面板   修改*/
		public showCreateClubPanel(game?: Cmd.OperateFloorMatchGroupCmd_CS): void {
			LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_CREATEPANEL, () => {
				let info: CreatePanelParam = new CreatePanelParam(2);
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
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUBNEW, () => {
				uniLib.PopUpMgr.removePopUp(CreateGamePanel);
				uniLib.PopUpMgr.addPopUp(CreateMatchSetPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}

		/**老友圈左侧包厢功能 */
		public ClubNewBoxPanel(data: Cmd.MathGroup): void {
			this._clubNewBoxPanel = new ClubNewBoxPanel(data);
			uniLib.PopUpMgr.addPopUp(this._clubNewBoxPanel, null, true, false, 0);
			this._clubNewBoxPanel.OnOpen();
		}
		public closeClubNewBoxPanel(): void {
			if (this._clubNewBoxPanel) {
				this._clubNewBoxPanel.OnClose();
			}
		}
		public removeClubNewBoxPanel(): void {
			if (this._clubNewBoxPanel) {
				uniLib.PopUpMgr.removePopUp(this._clubNewBoxPanel);
				this._clubNewBoxPanel = null;
			}
		}
	}
}