module turntable {
	export class TurnTable extends commonpanel.LobbyBaseEuiPanel {
		/**中间旋转区域 */
		private turnTable: eui.Group;
		/**转盘结束获奖动画*/
		private sgEffect: eui.Image;
		/**转盘闪光1 */
		private turntable: eui.Image;
		/**转盘闪光2 */
		private turntable1: eui.Image;
		/**抽奖按钮 */
		private cjImg: eui.Image;
		/**关闭按钮 */
		private _closebtn: eui.Button;
		/** 页面数据 剩余积分 金额 任务完成度*/
		private data: Cmd.IntoZZTurnTableLobbyCmd_CS;
		/**当前积分 */
		private _integralText: eui.Label;
		/**当前金额 */
		private _moneyText: eui.Label;
		/**无抽奖记录提示 */
		private _tipsText: eui.Label;
		/**抽奖记录按钮 */
		private _drawRecordBtn: eui.RadioButton;
		/**每日任务按钮 */
		private _dailyTasksBtn: eui.RadioButton;
		/** 每日任务显示数据*/
		private _taskGroup: eui.Group;
		/** 每日任务list*/
		private _taskList: eui.List;
		/** 每日任务list集合器*/
		private _taskListAC: eui.ArrayCollection;
		/**抽奖记录 */
		private _recordGroup: eui.Group;
		/**抽奖记录list */
		private _recordList: eui.List;
		/**抽奖记录list集合器*/
		private _recordListAC: eui.ArrayCollection;
		/**抽奖记录数据储存 */
		private _recordData: Cmd.ZZTurnTableRecord[];
		/**红包提现按钮*/
		private _receiveBtn: eui.Button;

		protected constructor() {
			super();
			this.skinName = "TurnTableSkin";
		}

		protected createChildren(): void {
			super.createChildren();
		}

		protected addEvent(): void {
			uniLib.Global.addEventListener(TurntableConst.IntoZZTurnTableLobby, this.setData, this);
			uniLib.Global.addEventListener(TurntableConst.ZZTurnTableLobby, this.goLuckDraw, this);
			uniLib.Global.addEventListener(TurntableConst.GetZZTurnTableRecordsLobby, this.showRecord, this);
			uniLib.Global.addEventListener(TurntableConst.OpenRedPackLobby, this.RedPack, this);
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
		}

		protected removeEvent(): void {
			uniLib.Global.removeEventListener(TurntableConst.IntoZZTurnTableLobby, this.setData, this);
			uniLib.Global.removeEventListener(TurntableConst.ZZTurnTableLobby, this.goLuckDraw, this);
			uniLib.Global.removeEventListener(TurntableConst.GetZZTurnTableRecordsLobby, this.showRecord, this);
			uniLib.Global.removeEventListener(TurntableConst.OpenRedPackLobby, this.RedPack, this);
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchEvent, this);
		}
		protected initUI(): void {
			let TabletTaskData = <Array<table.TabletTask>>RES.getRes("TabletTask_json");
			TabletTaskData.forEach(f => {
				MJLobbyData.getInstance().tabletask[f.id] = f;
			})
			let goodsTableData = <Array<table.TableGoodsConfig>>RES.getRes("TableGoodsConfig_json");
			goodsTableData.forEach(f => {
				MJLobbyData.getInstance().goods[f.goodId] = f;
			})
			this._dailyTasksBtn.selected = true;
			this.updateShow();
			this.turntable1.alpha = 0;
			egret.Tween.get(this.turntable, { loop: true }).to({ alpha: 0 }, 500).to({ alpha: 1 }, 500);
			egret.Tween.get(this.turntable1, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
			this._taskList.itemRenderer = TurnTableTaskItemPanel;
			this._recordList.itemRenderer = TurnTableRecordItemPanel;
		}

		/**进入页面 显示 */
		private setData(evt: uniLib.ZqEvent): void {
			this.data = evt.param;
			if (!this.data) return;
			this._integralText.text = this.data.integral + "";
			this._moneyText.text = "红包金额（满10元才能领取）：" + this.data.money + "元";
			this.updateTaskList();
		}
		/**更新任务数据 */
		private updateTaskList(): void {
			if (!this._taskListAC) {
				this._taskListAC = new eui.ArrayCollection(this.data.tasks);
				this._taskList.dataProvider = this._taskListAC;
			} else {
				if (Array.isArray(this._taskListAC.source)) {
					this._taskListAC.removeAll();
				}
				this._taskListAC.replaceAll(this.data.tasks);
			}
		}
		/**可以抽奖咯 我要中888现金大奖！*/
		private goLuckDraw(evt: uniLib.ZqEvent): void {
			let data: Cmd.ZZTurnTableLobbyCmd_CS = evt.param;
			this.data.integral = data.integral;
			this._integralText.text = this.data.integral + "";
			this.data.money = data.money;
			this._moneyText.text = "红包金额（满10元才能领取）：" + this.data.money + "元";
			this.beginTurnTable(data);
		}
		private RedPack(evt: uniLib.ZqEvent): void {
			let data: Cmd.OpenRedPackLobbyCmd_S = evt.param;
			this.data.money = this.data.money - data.info.reward;

			this._moneyText.text = "红包金额（满10元才能领取）：" + this.data.money.toFixed(2) + "元";
			let reward = new Cmd.RewardItem;
			reward.goodId = 353;
			reward.goodNbr = data.info.reward;
			LobbyModuleMgr.getInstance().showAwardPanel2(reward);
		}
		/**请求抽奖记录 */
		private getRecord(): void {
			let req: Cmd.GetZZTurnTableRecordsLobbyCmd_CS = new Cmd.GetZZTurnTableRecordsLobbyCmd_CS();
			NetMgr.tcpSend(req);
		}

		/**获得并显示抽奖记录 */
		private showRecord(evt: uniLib.ZqEvent): void {
			let data: Cmd.GetZZTurnTableRecordsLobbyCmd_CS = evt.param;
			this._recordData = data.records;
			this.updateRecordList();
		}
		/**更新抽奖记录*/
		private updateRecordList(): void {
			if (Array.isArray(this._recordData)) {
				this._tipsText.visible = false;
				if (!this._recordListAC) {
					this._recordListAC = new eui.ArrayCollection(this._recordData);
					this._recordList.dataProvider = this._recordListAC;
				} else {
					if (Array.isArray(this._recordListAC.source)) {
						this._recordListAC.removeAll();
					}
					this._recordListAC.replaceAll(this._recordData);
				}
			} else {
				this._tipsText.visible = true;
			}
		}
		/**开始转盘 */
		private beginTurnTable(data: Cmd.ZZTurnTableLobbyCmd_CS): void {
			this.cjImg.touchEnabled = false;
			/**抽奖到的物品位置ID */
			let selectIndex: number = 0;
			switch (data.reward.goodId) {
				case 341:
					selectIndex = 5;
					break;
				case 342:
					selectIndex = 3;
					break;
				case 343:
					selectIndex = 1;
					break;
				case 353:
					selectIndex = 4;
					break;
				case 32:
					if (data.reward.goodNbr == 388) {
						selectIndex = 6;
						break;
					} else {
						selectIndex = 2;
						break;
					}

			}
			// egret.Tween.removeTweens(this.turnTable);
			var roateAng = 2160 - 60 * selectIndex;
			egret.Tween.get(this.turnTable).to({ rotation: roateAng + 15 }, 5800, egret.Ease.sineInOut)
				.to({ rotation: roateAng - 10 }, 800, egret.Ease.sineInOut)
				.to({ rotation: roateAng }, 500, egret.Ease.sineInOut).call(() => {
					this.sgEffect.visible = true;
					egret.Tween.get(this.sgEffect).to({ rotation: 360 }, 400).to({ alpha: 0 }, 400).call(() => {
						this.sgEffect.visible = false;
						this.sgEffect.alpha = 1;
						this.cjImg.touchEnabled = true;
						LobbyModuleMgr.getInstance().showAwardPanel2(data.reward);
						let req: Cmd.UserInfoGetLobbyCmd_C = new Cmd.UserInfoGetLobbyCmd_C;
						req.uid = uniLib.NetMgr.UID;
						req.lobbyId = NetMgr.getLoginCfg().lobbyId;
						NetMgr.tcpSend(req);
					});
					// egret.setTimeout(() => {
					// 	egret.Tween.get(this.turnTable, { loop: true }).to({ rotation: 360 }, 36000);
					// }, this, 2000);
				});

		}

		private onTouchEvent(e: egret.TouchEvent): void {
			switch (e.target) {
				case this._closebtn:
					this.destroy();
					break;
				case this.cjImg:
					if (this.data.integral >= 10) {
						let req: Cmd.ZZTurnTableLobbyCmd_CS = new Cmd.ZZTurnTableLobbyCmd_CS();
						NetMgr.tcpSend(req);
					} else {
						uniLib.TipsUtils.showTipsDownToUp("积分不足，完成任务可获得积分！")
					}
					break;
				case this._receiveBtn:
					if (this.data.money >= 10) {
						let req: Cmd.OpenRedPackLobbyCmd_C = new Cmd.OpenRedPackLobbyCmd_C();
						req.lobbyId =  MJLobbyData.getInstance().lobbyId;
						req.typ = 3;
						NetMgr.tcpSend(req);
					} else {
						uniLib.TipsUtils.showTipsDownToUp("红包金额不满10元！")
					}
					break;
				case this._drawRecordBtn:
					this.getRecord();
					this.updateShow();
					break;
				case this._dailyTasksBtn:
					this.updateShow();
					break;
			}
		}
		/**更新右侧显示 */
		private updateShow(): void {
			if (this._drawRecordBtn.selected) {
				this._recordGroup.visible = true;
				this._taskGroup.visible = false;
			} else {
				this._recordGroup.visible = false;
				this._taskGroup.visible = true;
			}
		}
		protected destroy(): void {
			super.destroy();
			egret.Tween.removeTweens(this.turnTable);
			egret.Tween.removeTweens(this.turntable);
			egret.Tween.removeTweens(this.turntable1);
			egret.Tween.removeTweens(this.sgEffect);
			this.removeEvent();
			// uniLib.DisplayUtils.removeAllChildren(this);
			// uniLib.DisplayUtils.removeFromParent(this);
			uniLib.PopUpMgr.removePopUp(this, uniLib.PopUpEffect.NOMAL);
		}
	}
}