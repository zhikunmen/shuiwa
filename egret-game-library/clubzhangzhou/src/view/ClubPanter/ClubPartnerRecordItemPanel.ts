module club {

	/**合作群 合作群战绩 群主页面 合伙人数据*/
	export class ClubPartnerRecordItemPanel extends eui.ItemRenderer {
		/**头像 */
		private _headImg: eui.Image;
		/**昵称 */
		private _nameText: eui.Label;
		/**id */
		private _uidText: eui.Label;
		/** 总房间数*/
		private _roomNumText: eui.Label;
		/**总人次 */
		private _palyerText: eui.Label;
		/** 总大赢家*/
		private _bigWinText: eui.Label;
		/**成员数 */
		private _numText: eui.Label;
		/** 详情按钮*/
		private _detailBtn: eui.Button;
		/**删除按钮 */
		private _deleteBtn: eui.Button;
		private _info: Cmd.PartnerRecordInfo;
		/**置灰按钮 */
		private _removeImg: eui.Image;
		constructor() {
			super();
			this.skinName = "ClubPartnerRecordItemSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addListener();
		}

		private addListener() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		private removeListener() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
			this._removeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}

		protected dataChanged(): void {
			this._info = this.data;
			this._headImg.source = this._info.partner.headUrl;
			this._nameText.text = this._info.partner.nickname;
			this._uidText.text = "ID:" + this._info.partner.uid;
			this._roomNumText.text = "" + this._info.roomNbrs[ClubData.getInstance().clubDayChose - 1];
			this._palyerText.text = "" + this._info.playUserNbrs[ClubData.getInstance().clubDayChose - 1];
			this._bigWinText.text = "" + this._info.winNbrs[ClubData.getInstance().clubDayChose - 1];
			this._numText.text = "" + this._info.memberNbr;
			if (this._info.partner.partnerState && this._info.partner.partnerState == 1) {
				this._removeImg.visible = true;
				this._removeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
				this._deleteBtn.visible = false;
			} else {
				this._removeImg.visible = false;
				this._deleteBtn.visible = true;
			}
		}

		private onClickTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this._deleteBtn:
					ClubModuleMgr.getInstance().showClubPartnerRemovePanterPanel(this._info.partner);
					break;
				case this._detailBtn:
					ClubModuleMgr.getInstance().showClubPartnerMemberDetailPanel(() => {
						let cmd = new Cmd.GetMemberRecordsMatchGroupCmd_CS();
						cmd.matchId = ClubData.getInstance().clubmatchid;
						cmd.targetUid = this._info.partner.uid;
						cmd.typ = 2;
						NetMgr.tcpSend(cmd);
					});
					break;
				case this._removeImg:
					uniLib.TipsUtils.showTipsDownToUp("此玩家已经解除合伙关系，记录保留24小时！");
					break;
			}
		}

	}
}