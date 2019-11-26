module pokergps {

	/**
	 *玩家之间距离面板
	 */
	export class GPSPanel extends eui.Component {
		private _user1: Cmd.IpGPSPoker;
		private _user2: Cmd.IpGPSPoker;
		private _user3: Cmd.IpGPSPoker;
		private _list: Cmd.IpGPSPoker[];
		private _tip_img: eui.Image;
		private _line_img: eui.Image;
		private _close_btn: eui.Button;
		private _dissolve_btn: eui.WxButton;
		private _continue_btn: eui.WxButton;
		private _user_name1: eui.Label;
		private _user_name2: eui.Label;
		private _user_name3: eui.Label;
		private _head_img1: eui.Image;
		private _head_img2: eui.Image;
		private _head_img3: eui.Image;
		private _distance_bg1: eui.Image;
		private _distance_bg2: eui.Image;
		private _distance_bg3: eui.Image;
		private _distance_txt1: eui.Label;
		private _distance_txt2: eui.Label;
		private _distance_txt3: eui.Label;
		public constructor() {
			super();
			this.skinName = "poker_gpsPanelSkin";
		}

		protected init(): void {
			this.addEvent();
		}
		protected createChildren() {
			super.createChildren();
			this.init();
		}
		public setData(rev: Cmd.IpGPSPoker[]): void {
			this._list = rev;
			if (this._list.length >= 1) {
				this._dissolve_btn.visible = true;
				this._continue_btn.visible = true;
			}
			else {
				this._dissolve_btn.visible = false;
				this._continue_btn.visible = false;
			}
			for (let i = 0; i < this._list.length; i++) {
				if (this._list[0]) {
					this._user1 = this._list[0];
				}
				if (this._list[1]) {
					this._user2 = this._list[1];
				}
				if (this._list[2]) {
					this._user3 = this._list[2];
				}
			}
			let userDistance1;
			let userDistance2;
			let userDistance3;
			if (this._user1) {
				this._user_name1.text = this._user1.nickName;
				this._head_img1.source = this._user1.headUrl;
			}

			if (this._user2) {
				this._user_name2.text = this._user2.nickName;
				this._head_img2.source = this._user2.headUrl;
			}
			if (this._user1 && this._user2) {
				userDistance1 = uniLib.Utils.getDistance(this._user1.lat, this._user1.lng, this._user2.lat, this._user2.lng);
				if (userDistance1 <= 1000) {
					this._distance_bg1.source = "pdk_gps_red";
					this._distance_txt1.text = Math.ceil(userDistance1) + "米";
				}
				else if (isNaN(userDistance1)) {
					this._distance_bg1.source = "pdk_gps_green";
					this._distance_txt1.text = "无";
				}
				else {
					this._distance_bg1.source = "pdk_gps_green";
					this._distance_txt1.text = Math.ceil(userDistance1 / 1000) + "公里";
				}
			}

			if (this._user3) {
				this._user_name3.text = this._user3.nickName;
				this._head_img3.source = this._user3.headUrl;
			}

			if (this._user3 && this._user2) {
				userDistance2 = uniLib.Utils.getDistance(this._user2.lat, this._user2.lng, this._user3.lat, this._user3.lng);
				if (userDistance2 <= 1000) {
					this._distance_bg2.source = "pdk_gps_red";
					this._distance_txt2.text = Math.ceil(userDistance2) + "米";
				}
				else if (isNaN(userDistance2)) {
					this._distance_bg2.source = "pdk_gps_green";
					this._distance_txt2.text = "无";
				}
				else {
					this._distance_bg2.source = "pdk_gps_green";
					this._distance_txt2.text = Math.ceil(userDistance2 / 1000) + "公里";
				}
			}

			if (this._user3 && this._user1) {
				userDistance3 = uniLib.Utils.getDistance(this._user1.lat, this._user1.lng, this._user3.lat, this._user3.lng);
				if (userDistance3 <= 1000) {
					this._distance_bg3.source = "pdk_gps_red";
					this._distance_txt3.text = Math.ceil(userDistance3) + "米";
				}
				else if (isNaN(userDistance3)) {
					this._distance_bg3.source = "pdk_gps_green";
					this._distance_txt3.text = "无";
				}
				else {
					this._distance_bg3.source = "pdk_gps_green";
					this._distance_txt3.text = Math.ceil(userDistance3 / 1000) + "公里";
				}
			}

			if (userDistance1 < 1000 || userDistance2 < 1000 || userDistance3 < 1000) {
				this._tip_img.source = "pdk_gps_warn";
			}
			else {
				this._tip_img.source = "pdk_gps_normal";
			}
		}

		/**添加监听事件 */
		private addEvent(): void {
			this._close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this._continue_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this._dissolve_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissolve, this);
		}

		protected removeEvent(): void {
			this._close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this._continue_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this._dissolve_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDissolve, this);
		}

		private onClose(evt: egret.TouchEvent): void {
			this.dispatchEventWith(pokergps.pokergpsConst.CLOSE);
		}
		private onDissolve(e: egret.TouchEvent) {
			this.dispatchEventWith(pokergps.pokergpsConst.DISMISS_GAME);
			this.dispatchEventWith(pokergps.pokergpsConst.CLOSE);
		}
		public destory(): void {
			this.removeEvent();
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}