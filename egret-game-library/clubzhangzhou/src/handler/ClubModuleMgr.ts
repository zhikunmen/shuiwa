module club {
	export class ClubModuleMgr {
		private static _instance: ClubModuleMgr;
		private _clubDeskPanel: ClubDeskPanel;
		private _activeRoomInformationPanel: ActiveRoomInformationPanel;
		private _clubAllBoxPanel: ClubAllBoxPanel;
		private _isShowClub: number = 0;
		public static getInstance(): ClubModuleMgr {
			if (!this._instance) {
				this._instance = new ClubModuleMgr();
			}
			return this._instance;
		}
		/**移除老友圈列表界面 */
		public removeAllClubListPanel(): void {
			if (this._clubAllBoxPanel) {
				uniLib.PopUpMgr.removePopUp(this._clubAllBoxPanel);
				this._clubAllBoxPanel = null;
			}
		}
		/**老友圈列表界面 */
		public showAllClubListPanel(callBack: Function): void {
			if (!this._clubAllBoxPanel) {
				this._clubAllBoxPanel = new ClubAllBoxPanel();
				LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
					uniLib.PopUpMgr.addPopUp(this._clubAllBoxPanel, null, true, true, 0);
					callBack();
				});
			} else {
				callBack();
			}
		}
		/**老友圈  清空的操作记录*/
		public showClubCleanRecordPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubCleanRecordPanel, null, true, true);
				callBack();
			});
		}
		/**老友圈列表界面 无数据  */
		public showClubListPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
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
		/**显示老友圈玩法面板 */
		public showClubDetailsPanel(data: Cmd.MathGroup): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubDetailsPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}
		/**显示俱乐部分享界面 
		 * @param roomId 房间ID 
		*/
		public showClubInvitePanel(data?: uniLib.ZqEvent | number): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				var vo;
				if (data) {
					if (data instanceof uniLib.ZqEvent) {
						vo = data.param as uniLib.WXShareVo;
					}
				}
				uniLib.PopUpMgr.addPopUp(ClubInvitePanel, uniLib.SceneMgr.instance.currentScene.tipsLayer, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, vo)
			});
		}
		/**删除老友圈管理员界面单个房间详情 */
		public removeActiveDetailRoomtPanel(): void {
			if (this._activeRoomInformationPanel) {
				uniLib.PopUpMgr.removePopUp(this._activeRoomInformationPanel);
				this._activeRoomInformationPanel = null;
			}
		}
		/**老友圈新手指引面板 */
		public showClubGuidePanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubGuidePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**老友圈管理 房主备注玩家分数 */
		public showClubRemarksScorePanel(uid: number): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubRemarksScorePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, uid);
			});
		}
		/**老友圈管理 查看单个玩家详情 */
		public showClubMemberInfoPanel(data: Cmd.MatchGroupMemberInfo): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubMemberInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}
		/**老友圈导入成员列表页面 */
		public showClubImportPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubImportPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
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

		/**老友圈成员列表界面   1管理员页面 2 普通各成员页面*/
		public showClubPlayerListPanel(isOwner: boolean): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPlayerListPanel, null, true, true, 0, 0, 0, 0, isOwner);
			});
		}
		/**显示俱乐部 单个俱乐部所有战绩 */
		public showClubAllRecordPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubAllRecordPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**显示老友圈 查看自己的战绩 */
		public showClubMemberRecordPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_RECORD, () => {
				uniLib.PopUpMgr.addPopUp(ClubMemberRecordPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**审核记录 */
		public showClubApplyRecordPanel() {
			uniLib.PopUpMgr.addPopUp(ClubApplyRecordPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
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
		public showClubUserInfoPanel(data: Cmd.MatchGroupMemberInfo): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubUserInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}
		/**显示老友圈搜索成员面板 */
		public showClubSearchMemberPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubSearchMemberPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**显示老友圈手动添加成员面板 */
		public showClubAddMemberPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubAddMemberPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
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
		/**显示老友圈审批面板 */
		public showClubUserApplyPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubApplyListPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/** 邀请指定玩家到俱乐部中 广播 */
		public showClubInviteBrdPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubInviteBrdPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**获取可邀请成员列表 */
		public showClubInvitePlayerPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubInvitePlayerPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();

			});
		}

		/** 群主进入合伙人界面 */
		public showClubPartnerRecordPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerRecordPanel, null, true, true, 0);
				callBack();
			});
		}
		/**群主合作群添加成员 */
		public showClubPartnerAddPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerAddPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**群主 看合伙人信息 */
		public showClubPartnerMemberDetailPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerMemberDetailPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
				callBack();
			});
		}
		/**群主解除合伙人关系  */
		public showClubPartnerRemovePanterPanel(data: Cmd.MatchGroupMemberInfo): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerRemovePanterPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}

		/** 合伙人 获取组员战绩*/
		public showClubPartnerMemberRecordPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerMemberRecordPanel, null, true, true, 0);
				callBack();
			});
		}
		/** 合伙人 获取可导入组员列表*/
		public showClubPartnerImportPanel(callBack: Function): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerImportPanel, null, true, true, 0);
				callBack();
			});
		}
		/**合伙人 手动添加成员 */
		public showClubPartnerImportAddPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerImportAddPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			});
		}
		/**合伙人 查看单个玩家详情 */
		public showClubPartnerRecordDetailPanel(data: Cmd.MatchGroupMemberInfo): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerRecordDetailPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}
		/**合伙人 移出单个玩家 */
		public showClubPartnerRemoveMemberPanel(data: Cmd.MatchGroupMemberInfo): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubPartnerRemoveMemberPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
			});
		}
		/**老友圈管理 计时器面板*/
		public showClubMemberTimerPanel(): void {
			LoadPanelTipMgr.getInstance().loadRes(ClubConst.PUB_CLUB, () => {
				uniLib.PopUpMgr.addPopUp(ClubMemberTimerPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
			});
		}
	}
}