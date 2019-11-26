module club {
	/**
	* 单个老友圈选项
	*/
	export class ClubBoxItem extends eui.ItemRenderer {
		/**头像资源 */
		private head: eui.Image;
		/**背景 */
		private bg: eui.Image;
		/**游戏和局数 */
		private roomNameText: eui.Label;
		/**老友圈ID */
		private idText: eui.Label;
		/** 圈主名字*/
		private nameText: eui.Label;
		/** 老友圈名字*/
		private boxNameText: eui.Label;
		/**老友圈数据 */
		private info: Cmd.MatchGroupInfo;
		/** 几桌开始*/
		private startRoomText: eui.Label;
		/**等待房间数据*/
		private waitRoomText: eui.Label;
		/**编号 */
		private numberText: eui.Label;
		/** 进入按钮*/
		private inBtn: eui.WxButton;
		/** 退出按钮*/
		private outBtn: eui.WxButton;
		constructor() {
			super();
			this.skinName = "ClubBoxItemSkin";
			this.removeRedPoint();
			this.addListener();
		}
		public addListener() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public removeListener() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public destory(): void {
			this.removeListener();
		}
		protected dataChanged(): void {
			this.info = this.data;
			let userVo2 = this.info.ownerName;
			let strLength: number;
			while (this.getStrRealLength(userVo2) > 12) {
				strLength = userVo2.length;
				userVo2 = userVo2.substr(0, strLength - 1);
			}
			this.idText.text = this.info.matchId.toString();
			this.nameText.text = userVo2;
			this.roomNameText.text = this.info.gameName + "  " + this.info.gameNbr + "局";
			if (this.info.gameNbr >= 49) {
				this.roomNameText.text = this.info.gameName + "  " + Math.round(this.info.gameNbr) + "课";
			}
			this.boxNameText.text = this.info.matchName ? this.info.matchName : this.info.matchId.toString();
			this.waitRoomText.text = this.info.waitRoomNbr + "桌等待中";
			this.startRoomText.text = this.info.startRoomNbr + "桌开始";
			this.head.source = this.info.ownerHeadUrl;
			this.numberText.text = this.info.index + "";
			if (this.info.isNew && this.info.isNew == 1) {
				this.bg.source = "club_new_menage_json.mjl_club_my";
			}
			if (this.info.noHandle && this.info.noHandle == 1) {
				this.addRedPoint();
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			if (e.target == this.inBtn) {
				ClubModuleMgr.getInstance().removeClubDeskPanel();
				let cmd = new Cmd.RequestMatchGroupCmd_C();
				cmd.matchId = this.info.matchId;
				cmd.isClub = 1;
				NetMgr.tcpSend(cmd);
				uniLib.PopUpMgr.removePopUp(ClubAllBoxPanel);
			}
			else if (e.target == this.outBtn) {
				let club = this;
				let okFunc = function () {
					let cmd = new Cmd.LeaveMatchGroup2Cmd_C();
					cmd.matchId = club.info.matchId;
					if (ClubData.getInstance().clubmatchid == club.info.matchId) {
						ClubModuleMgr.getInstance().removeClubDeskPanel();
					}
					NetMgr.tcpSend(cmd);
					let req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
					req.isClub = 1;
					NetMgr.tcpSend(req);
				}
				ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
			} else if (e.target == this.bg) {
				ClubModuleMgr.getInstance().removeClubDeskPanel();
				let cmd = new Cmd.RequestMatchGroupCmd_C();
				cmd.matchId = this.info.matchId;
				cmd.isClub = 1;
				NetMgr.tcpSend(cmd);
				uniLib.PopUpMgr.removePopUp(ClubAllBoxPanel);
			}
		}
		/**
		* 红点
		*/
		public addRedPoint() {
			let redPoint: eui.Image = this.skin["redPoint"];
			redPoint.visible = true;
			egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
		}
		public removeRedPoint() {
			let redPoint = this.skin["redPoint"];
			redPoint.visible = false;
			egret.Tween.removeTweens(redPoint);
		}
		/**名字长度截取，避免长度过长造成溢出显示或重叠 */
		private getStrRealLength(str: string): number {
			var jmz = { GetLength: null };
			jmz.GetLength = function (str) {
				return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length);  //先把中文替换成两个字节的英文，在计算长度
			};
			return jmz.GetLength(str);
		}
	}
}