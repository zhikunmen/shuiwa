module joinroom {
	/**
	 * 进入房间面板
	 */
	export class JoinRoomPanel extends commonpanel.LobbyBaseEuiPanel {
		private _inputNArr: Array<InputNumItem>;
		private _curIndex: number;
		private _keyArr: Array<InputKeyItem>;
		private inputKeyGroup: eui.Group;
		private inputNumberGroup: eui.Group;
		private historyBtn: eui.RadioButton;;
		private historyGroup: eui.Group;
		private joinGroup: eui.Group;
		/**历史加入 */
		private _recordList: Cmd.MatchGroupInfo[] = new Array<Cmd.MatchGroupInfo>();
		/**历史加入 */
		private recordList: eui.List;
		/**未加入info */
		private neverInfo: eui.Label;
		/**是老友圈加入房间还是普通房间  1：老友圈 2：普通房间*/
		public constructor() {
			super("mjl_join_title", 1150, 650);
			this.skinName = "JoinRoomSkin";
		}
		public destroy(): void {
			super.destroy();
			uniLib.Global.removeEventListener(CmdConstant.HistoryMatchIdList, this.setData, this);
		}
		protected initUI() {
			uniLib.Global.addEventListener(CmdConstant.HistoryMatchIdList, this.setData, this);
			this._inputNArr = [];
			this._curIndex = 0;
			for (var i: number = 0; i < 6; i++) {
				let item = new InputNumItem();
				item.x = i * (item.width + 35);
				this.inputNumberGroup.addChild(item);
				this._inputNArr.push(item);
			}
			this._keyArr = [];
			for (var i: number = 0; i < 12; i++) {
				let key = new InputKeyItem();
				key.value = i;
				this.inputKeyGroup.addChild(key);
				this._keyArr.push(key);
			}
		}
		protected addEvent() {
			for (let item of this._keyArr) {
				item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInput, this);
			}
		}
		protected removeEvent() {
			for (let item of this._keyArr) {
				item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onInput, this);
			}
		}

		public setData(evt: uniLib.ZqEvent) {
			var record = evt.param as Cmd.HistoryMatchIdListMatchGroupCmd_S
			this._recordList = [];
			var list = record.list instanceof Array;
			if (!list) {
				this.neverInfo.visible = true;
				return;
			}
			this.neverInfo.visible = false;
			var records: Cmd.MatchGroupInfo[] = record.list != null && record.list instanceof Array ? record.list : [];
			this._recordList = records;
			this.recordList.itemRenderer = HistroyJoinRecordItem;
			this.recordList.dataProvider = new eui.ArrayCollection(records);
		}
		private reqMatchRecord(e: egret.TouchEvent) {

		}
		private onInput(e: egret.Event): void {
			if (RES.hasRes("buttonClick_mp3")) {
				uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
			}
			let target: InputKeyItem = e.target;
			var value: number = target.value;
			var num: number;
			if (value == 9) {
				this.reset();
				return;
			} else if (value == 11) {
				this.removeOneNum();
				return;
			} else if (value == 10) {
				num = 0;
			} else {
				num = value + 1;
			}
			this.addNun(num);
		}
		private reset(): void {
			for (var i: number = 0; i < 6; i++) {
				this._inputNArr[i].delete();
			}
			this._curIndex = 0;
		}
		private removeOneNum(): void {
			if (this._curIndex > 0) {
				this._inputNArr[this._curIndex - 1].delete();
				this._curIndex--;
			}
		}
		private addNun(num: number): void {
			if (this._curIndex < 6) {
				this._inputNArr[this._curIndex].value = num;
				this._curIndex++;
				if (this._curIndex == 6) {
					this.joinRoom();
				}
			}
		}
		private joinRoom(): void {
			var value: string = "";
			for (var i: number = 0; i < 6; i++) {
				value += this._inputNArr[i].value.toString();
			}
			MsgSendMgr.enterRoom(Number(value), -1);
			this.destroy();
			uniLib.PopUpMgr.removePopUp(this);
		}
	}
}
