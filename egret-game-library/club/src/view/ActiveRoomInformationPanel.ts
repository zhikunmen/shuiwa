/**
 * 已创建活跃房间面板
 */
module club {
	export class ActiveRoomInformationPanel extends commonpanel.LobbyBaseEuiPanel {
		//活跃房间列表对象
		private _activeRoomListOb: Cmd.ActiveDetailRoomCmd_S;
		//游戏房间列表
		private playerGroup: eui.Group;
		//房号Label
		private topTableNumber: eui.Label;
		//ItemList
		private itemList: eui.Group;
		/**取消按钮 */
		private cancelBtn: eui.WxButton;
		/**解散房间按钮 */
		private dissolveBtn: eui.WxButton;

		//战绩回放按钮
		// private recordButton: eui.WxButton;
		/**确认按钮 */
		// private sureButton: eui.WxButton;
		//初始化方法
		public constructor() {
			super("",720,400);
			this.skinName = "ActiveRoom";
		}
		protected childrenCreated(): void {
			super.childrenCreated();
		}
		//初始化监听
		protected addEvent() {
			this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			uniLib.Global.addEventListener(ClubConst.ActiveDetailRoom, this.initData, this);
		}
		//移除监听
		protected removeEvent() {
			this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			this.dissolveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			uniLib.Global.removeEventListener(ClubConst.ActiveDetailRoom, this.initData, this);
		}
		//销毁创建
		public destory(): void {
			super.destroy();
			uniLib.PopUpMgr.removePopUp(this);
			this._activeRoomListOb = null;
			if (this.playerGroup) {
				this.playerGroup.removeChildren();
				this.playerGroup = null;
			}
		}
		//初始化游戏列表赋值
		public initData(evt: uniLib.ZqEvent): void {
			let rev = evt.param as Cmd.ActiveDetailRoomCmd_S;
			if (rev.matchId) {
				this.dissolveBtn.visible = true;
				this.cancelBtn.visible = true;
			}
			for (let i = this.itemList.numChildren - 1; i >= 0; i--) {
				let item: ActiveRoomListItem = <ActiveRoomListItem>this.itemList.getChildAt(i);
				item.destory();
				item = null;
			}
			uniLib.DisplayUtils.removeAllChildren(this.itemList);
			this._activeRoomListOb = rev;
			this.topTableNumber.text = "房号：" + this._activeRoomListOb.roomId;
			if (!Array.isArray(rev.list) || rev.list.length == 0) return;
			for (let i = 0; i < rev.list.length; i++) {
				let item = new ActiveRoomListItem();
				item.setData(rev.list[i], rev.roomId);
				if (rev.matchId) {
					item.name = rev.matchId + "";
				}
				if (this._activeRoomListOb.state == 1 || this._activeRoomListOb.list[i].score) {
					item.setEliminateVisible(false);
					this.cancelBtn.visible = true;
					this.dissolveBtn.visible = true;
				} else {
					item.setEliminateVisible(true);
				}
				item.y = i * item.height + 10;
				this.itemList.addChild(item);
			}
		}
		//关闭面板方法
		private btnClick(e: egret.TouchEvent): void {
			if (e.currentTarget == this.cancelBtn) {
				this.removePop();
			} else if (e.currentTarget == this.dissolveBtn) {
				let req: Cmd.ActiveDissolveRoomCmd_C = new Cmd.ActiveDissolveRoomCmd_C();
				req.roomId = this._activeRoomListOb.roomId;
				req.matchId = this._activeRoomListOb.matchId;
				NetMgr.tcpSend(req);
				this.removePop();
			}
		}
	}
}
