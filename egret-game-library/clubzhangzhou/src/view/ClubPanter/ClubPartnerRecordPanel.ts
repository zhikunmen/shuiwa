module club {

	/**合作群 合作群战绩 群主页面 */
	export class ClubPartnerRecordPanel extends commonpanel.LobbyBaseEuiPanel {
		/**关闭按钮*/
		private _closeBtn: eui.Button;
		/**合作人数*/
		private _partnerNumText: eui.Label;
		/**添加合伙人按钮 */
		private _addPartnerBtn: eui.Button;
		/**数据LIST */
		private _list: eui.List;
		/**选择日子按钮 */
		private _choseDayBtn: eui.Button;
		/**选择日group */
		private _dayTypeGroup: eui.Group;
		/**选择日背景*/
		private _choseRect: eui.Rect;
		/** 选择日 今日数据*/
		private _todayBtn: eui.Button;
		/**选择日 昨日数据 */
		private _yesterdayBtn: eui.Button;
		/**选择日 前日数据 */
		private _qianBtn: eui.Button;
		/** */
		private _data: Cmd.GetPartnerRecordsMatchGroupCmd_CS;
		/** 列表数据*/
		private _recordsdata: Cmd.PartnerRecordInfo[];
		/**集合器*/
		private _listArr: eui.ArrayCollection;
		constructor() {
			super();
			this.skinName = "ClubPartnerRecordSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
		//初始化
		protected initUI(): void {
			this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
			ClubData.getInstance().clubDayChose = 1;
			this._list.itemRenderer = ClubPartnerRecordItemPanel;
			this._choseDayBtn.currentState = "up";
		}
		/**事件监听 */
		protected addEvent(): void {
			uniLib.Global.addEventListener(ClubConst.GetPartnerRecordsMatchGroup, this.setDate, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected removeEvent(): void {
			uniLib.Global.removeEventListener(ClubConst.GetPartnerRecordsMatchGroup, this.setDate, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		/**传数据 */
		public setDate(evt: uniLib.ZqEvent): void {
			this._data = evt.param as Cmd.GetPartnerRecordsMatchGroupCmd_CS;
			this._recordsdata = this._data.records;
			if (!Array.isArray(this._recordsdata)) {
				this._partnerNumText.text = "合伙人人数：0";
			} else {
				this._partnerNumText.text = "合伙人人数：" + this._recordsdata.length;
			}
			this.updateList();
		}
		/**更新数据 */
		private updateList() {
			if (!Array.isArray(this._recordsdata)) {
				return;
			}
			if (!this._listArr) {
				this._listArr = new eui.ArrayCollection(this._recordsdata);
				this._list.dataProvider = this._listArr;
			} else {
				if (Array.isArray(this._listArr.source)) {
					this._listArr.removeAll();
				}
				this._listArr.replaceAll(this._recordsdata);
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this._choseDayBtn:
					this._choseDayBtn.currentState = "down";
					this._dayTypeGroup.visible = true;
					break;
				case this._todayBtn:
					ClubData.getInstance().clubDayChose = 1;
					this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
					this._choseDayBtn.currentState = "up";
					this._dayTypeGroup.visible = false;
					this.updateList();
					break;
				case this._yesterdayBtn:
					ClubData.getInstance().clubDayChose = 2;
					this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
					this._choseDayBtn.currentState = "up";
					this._dayTypeGroup.visible = false;
					this.updateList();
					break;
				case this._qianBtn:
					ClubData.getInstance().clubDayChose = 3;
					this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
					this._choseDayBtn.currentState = "up";
					this._dayTypeGroup.visible = false;
					this.updateList();
					break;
				case this._closeBtn:
					super.removePop();
					break;
				case this._choseRect:
					this._choseDayBtn.currentState = "up";
					this._dayTypeGroup.visible = false;
					break;
				case this._addPartnerBtn:
					let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
					cmd.matchId = ClubData.getInstance().clubmatchid;
					cmd.typ = 1;
					NetMgr.tcpSend(cmd);
					ClubModuleMgr.getInstance().showClubPartnerAddPanel();
					break;
			}
		}

	}
}