module lobbysign {
	export class LobbySignPanel extends commonpanel.LobbyBaseEuiPanel {

		private _expBr: eui.Image;                     //签到进度条
		private _signRewardItemList: eui.List;         //累计签到奖励
		private _signDayOfWeekItemList: eui.List;      //每日签到奖励
		private _signBtn: eui.Button;     //签到按钮
		private _totalTxt: eui.Label;    //总签到数

		private _data: Cmd.UserSignInfoLobbyCmd_S;
		private _rewardlist: Cmd.ContinueSignInfo[];              //累计奖励
		private _dayofweeklsit: Cmd.UserSignInfoLobbyCmd_S[];   //每天数据
		/**当前要领取的礼包id */
		public static rewardId = -1;
		constructor() {
			super();
			this.skinName = "LobbySignSkin";

		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		public destroy(): void {
			super.destroy();
		}
		protected initUI() {
			SignSendMgr.getUserSignInfo();
			//加载表中数据
			let signTableData = <Array<table.TableSignIn>>RES.getRes("TableSignIn_json");
			let index = 0;
			signTableData.forEach(f => {
				if (f.lobbyId == MJLobbyData.getInstance().lobbyId) {
					MJLobbyData.getInstance().sign[index++] = f;
				}
			});
			let goodsTableData = <Array<table.TableGoodsConfig>>RES.getRes("TableGoodsConfig_json");
			goodsTableData.forEach(f => {
				MJLobbyData.getInstance().goods[f.goodId] = f;
			});
		}

		protected addEvent() {
			this._signBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sign, this);

			uniLib.Global.addEventListener(SignConst.SIGN_INFO, this.setData, this);
			uniLib.Global.addEventListener(SignConst.SIGN_TODAY, this.signDayOfWeek, this);
			uniLib.Global.addEventListener(SignConst.SIGN_CONTINUE, this.getReward, this);
		}
		protected removeEvent() {
			uniLib.Global.removeEventListener(SignConst.SIGN_INFO, this.setData, this);
			uniLib.Global.removeEventListener(SignConst.SIGN_TODAY, this.signDayOfWeek, this);
			uniLib.Global.removeEventListener(SignConst.SIGN_CONTINUE, this.getReward, this);
			this._signBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sign, this);

		}

		public setData(evt: uniLib.ZqEvent): void {
			let vo = evt.param as Cmd.UserSignInfoLobbyCmd_S;
			if (!vo) return;
			this._data = vo;
			if (this._data.bTodayReceived) {
				this._signBtn.enabled = false;
			}
			this._rewardlist = this._data.continue;
			this._signRewardItemList.itemRenderer = SignRewardItemPanel;
			this._signRewardItemList.dataProvider = new eui.ArrayCollection(this._rewardlist);
			this._dayofweeklsit = [];
			for (let i = 0; i < 7; i++) {
				this._dayofweeklsit.push(this._data);
			}
			this._signDayOfWeekItemList.itemRenderer = SignDayOfWeekItemPanel;
			this._signDayOfWeekItemList.dataProvider = new eui.ArrayCollection(this._dayofweeklsit);

			this.update();
		}
		/**签到 */
		public update() {
			if (!this._data) return;
			this._totalTxt.text = "累计签到" + this._data.continueDay + "天";
			if (this._data.continueDay <= 3) {
				this._expBr.width = this._data.continueDay / 3 * 130;
			} else if (this._data.continueDay <= 5) {
				this._expBr.width = 200 + (this._data.continueDay - 3) / 2 * 100;
			} else if (this._data.continueDay <= 7) {
				this._expBr.width = 380 + (this._data.continueDay - 5) / 2 * 105;
			} else {
				let result = (this._data.continueDay - 7) * 110 / (28 - 7);
				result = result > 110 ? 110 : result;
				this._expBr.width = 560 + result;
			}
		}
		/**签到 */
		public sign() {
			if (this._data.bTodayReceived) {
				uniLib.TipsUtils.showTipsDownToUp("今日已签到");
				return;
			}
			SignSendMgr.getSignToday(true);
		}
		public getReward(evt: uniLib.ZqEvent) {
			let info = evt.param as Cmd.UserSignContinueLobbyCmd_S;
			LobbyModuleMgr.getInstance().showAwardPanel(info.continueSignId, 2);
			SignSendMgr.getUserSignInfo();
		}
		public signDayOfWeek(evt: uniLib.ZqEvent) {
			let signInfo = evt.param as Cmd.UserSignTodayLobbyCmd_S;
			LobbyModuleMgr.getInstance().showAwardPanel(signInfo.curWeek, 1);
			SignSendMgr.getUserSignInfo();
		}
	}


}