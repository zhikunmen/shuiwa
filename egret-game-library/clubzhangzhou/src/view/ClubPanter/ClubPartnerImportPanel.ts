
module club {

	/**可导入成员列表 */
	export class ClubPartnerImportPanel extends commonpanel.LobbyBaseEuiPanel {
		/** 关闭按钮*/
		private _closeBtn: eui.Button;
		/** 提交申请*/
		private _sureBtn: eui.Button;
		/**全选按钮 */
		private _allBtn: eui.Button;
		/**数据LIST */
		private _list: eui.List;
		/** 选择俱乐部*/
		private _choseClubBtn: eui.Button;
		/**选俱乐部group */
		private _matchGroup: eui.Group;
		/** 选俱乐部蒙版*/
		private _choseRect: eui.Rect;
		/** 选俱乐部背景*/
		private _choseClubBg: eui.Image;
		/** 俱乐部列表Scroller*/
		private _matchScroller: eui.Scroller;
		/** 俱乐部列表*/
		private matchList: eui.List;
		/** */
		private _data: Cmd.GetCanImportMemberList2MatchGroupCmd_CS;
		/** 列表数据*/
		private _recordsdata: Cmd.PartnerRecordInfo[];
		/**集合器*/
		private _listArr: eui.ArrayCollection;
		/**集合器*/
		private _matchListArr: eui.ArrayCollection;
		/**老友圈列表 */
		private matchIdList: number[] = [];
		/**成员数组 */
		private _memberList: Cmd.MatchGroupMemberInfo[];

		constructor() {
			super();
			this.skinName = "ClubPartnerImportSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
		//初始化
		protected initUI(): void {
			this.matchIdList = [];
			this._memberList = [];
			this._list.itemRenderer = ClubPartnerImportItemPanel;
			this.matchList.itemRenderer = MatchRadioButton;
			this._choseClubBtn.currentState = "up";
			this._allBtn.currentState = "up";
			this._choseClubBtn.skin["_matchIdText"].text = "";
		}
		/**事件监听 */
		protected addEvent(): void {
			uniLib.Global.addEventListener(ClubConst.GetCanImportMemberList2MatchGroup, this.setDate, this);
			this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
			this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected removeEvent(): void {
			uniLib.Global.removeEventListener(ClubConst.GetCanImportMemberList2MatchGroup, this.setDate, this);
			this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
			this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		/**传数据 */
		public setDate(evt: uniLib.ZqEvent): void {
			this._data = evt.param as Cmd.GetCanImportMemberList2MatchGroupCmd_CS;
			this._choseClubBtn.skin["_matchIdText"].text = "" + this._data.matchId;
			this.matchIdList = this._data.matchIdList;
			if (this._data.matchIdList.length < 10) {
				this._choseClubBg.height = 2 + 49 * this._data.matchIdList.length;
				this._matchScroller.height = 49 * this._data.matchIdList.length;
			} else {
				this._choseClubBg.height = 456;
				this._matchScroller.height = 454;
			}
			this._memberList = this._data.memberList;
			this.updateList(this._data.memberList);
			this.updateMatchIdList();
		}
		/**老友圈选项 选择老友圈 */
		private onMatchListTap(e: eui.ItemTapEvent) {
			let cmd = new Cmd.GetCanImportMemberList2MatchGroupCmd_CS();
			cmd.curMatchId = ClubData.getInstance().clubmatchid;
			cmd.matchId = this.matchIdList[this.matchList.selectedIndex];
			NetMgr.tcpSend(cmd);
			if (this._choseClubBtn.currentState == "up") {
				this._choseClubBtn.currentState = "down";
				this._matchGroup.visible = true;
			} else {
				this._choseClubBtn.currentState = "up";
				this._matchGroup.visible = false;
			}
		}
		/**选中玩家*/
		private itemTap(evt: eui.ItemTapEvent): void {
			if (this._list.selectedItem) {
				let item = this._list.selectedItem as Cmd.MatchGroupMemberInfo;
				if (ClubData.getInstance().PartnerImportUidList.indexOf(item.uid) != -1) {
					ClubData.getInstance().PartnerImportUidList.splice(ClubData.getInstance().PartnerImportUidList.indexOf(item.uid), 1);
				} else {
					ClubData.getInstance().PartnerImportUidList.push(item.uid);
				}
			}
			this.updateList(this._memberList);
		}
		/**	全选 */
		private allChose() {
			ClubData.getInstance().PartnerImportUidList = [];
			if (this._allBtn.currentState == "up") {
				if (Array.isArray(this._memberList)) {
					this._memberList.forEach(element => {
						ClubData.getInstance().PartnerImportUidList.push(element.uid);
					});
				}
				this._allBtn.currentState = "down";
			} else {
				this._allBtn.currentState = "up";
			}
			if (this._memberList.length > 0) {
				this.updateList(this._memberList);
			}
		}
		/**更新数据 */
		private updateList(data: Cmd.MatchGroupMemberInfo[]) {
			if (ClubData.getInstance().PartnerImportUidList.length == this._memberList.length) {
				this._allBtn.currentState = "down";
			} else {
				this._allBtn.currentState = "up";
			}
			if (!this._listArr) {
				this._listArr = new eui.ArrayCollection(data);
				this._list.dataProvider = this._listArr;
			} else {
				if (Array.isArray(this._listArr.source)) {
					this._listArr.removeAll();
				}
				this._listArr.replaceAll(data);
			}
		}
		/**更新数据 */
		private updateMatchIdList() {
			if (!this._matchListArr) {
				this._matchListArr = new eui.ArrayCollection(this.matchIdList);
				this.matchList.dataProvider = this._matchListArr;
			} else {
				if (Array.isArray(this._matchListArr.source)) {
					this._matchListArr.removeAll();
				}
				this._matchListArr.replaceAll(this.matchIdList);
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this._choseClubBtn:
					if (this._choseClubBtn.currentState == "up") {
						this._choseClubBtn.currentState = "down";
						this._matchGroup.visible = true;
					} else {
						this._choseClubBtn.currentState = "up";
						this._matchGroup.visible = false;
					}
					break;
				case this._closeBtn:
					super.removePop();
					break;
				case this._choseRect:
					if (this._choseClubBtn.currentState == "up") {
						this._choseClubBtn.currentState = "down";
						this._matchGroup.visible = true;
					} else {
						this._choseClubBtn.currentState = "up";
						this._matchGroup.visible = false;
					}
					break;
				case this._allBtn:
					this.allChose();
					break;
				case this._sureBtn:
					if (ClubData.getInstance().PartnerImportUidList.length == 0) {
						uniLib.TipsUtils.showConfirm("请选择需要导入的成员！", "", "确定", null);
					} else {
						uniLib.TipsUtils.showConfirm("确认将成员导入" + ClubData.getInstance().clubmatchid + "老友圈！", "", "确定", () => {
							let cmd = new Cmd.ImportMember2MatchGroupCmd_CS();
							cmd.matchId = ClubData.getInstance().clubmatchid;
							cmd.fromMatchId = ClubData.getInstance().PartnerMatchId;
							cmd.uids = ClubData.getInstance().PartnerImportUidList;
							NetMgr.tcpSend(cmd);
							ClubData.getInstance().PartnerImportUidList = [];
							super.removePop();
						}, "取消", null);
					}
					break;
			}
		}
	}
}