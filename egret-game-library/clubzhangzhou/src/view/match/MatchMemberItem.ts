module club {
	/**
	 * 成员列表item
	 */
	export class MatchMemberItem extends eui.ItemRenderer {
		/**玩家ID */
		private _uidText: eui.Label;
		/** 姓名*/
		private _nametext: eui.Label;
		/** 备注*/
		private _remarksText: eui.Label;
		/** 今、昨、前日输赢*/
		private _winloseText: eui.Label;
		/**大赢家次数 */
		private _winNumText: eui.Label;
		/**查看按钮 */
		private _detailBtn: eui.WxButton;
		/**清除备注按钮 */
		private _cleanRemarksBtn: eui.WxButton;
		/**点击备注按钮 */
		private _writeRemarksbtn: eui.WxButton;
		/**操作 */
		private operationGroup: eui.Group;
		/**操作显示 */
		private MatchMemberTypeToString = ["游客", "白名单", "黑名单", "同桌限制", "VIP"];
		/**操作显示颜色 */
		private MatchMemberTypeToColor = [0x486d42, 0x48FF00, 0xcb2424, 0xba6901, 0xF4C775]
		private info: Cmd.MatchGroupMemberInfo;
		constructor() {
			super();
			this.skinName = "MatchMemberItemSkin"
			this.addListener();
		}

		public addListener() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		public removeListener() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
		}
		protected dataChanged(): void {
			this.info = this.data;
			if (!this.info) return;
			let index = ClubData.getInstance().clubDayChose - 1;
			this._winNumText.text = this.info.winNums[index].toString();
			this._nametext.text = this.info.nickname;
			this._uidText.text = this.info.uid.toString();
			this._remarksText.text = this.info.remark ? this.info.remark : "暂无备注";
			this._winloseText.text = this.info.scores[index] + "(" + this.info.remarkPoints[index] + ")";
			if (this.info.remarkPoints[index] != 0) {
				this._cleanRemarksBtn.visible = true;
				this._writeRemarksbtn.visible = false;
			} else {
				this._cleanRemarksBtn.visible = false;
				this._writeRemarksbtn.visible = true;
			}
			this.operationGroup.removeChildren();
			//显示操作
			for (let i: number = 0; i < 4; i++) {
				if (i == this.info.type)
					continue;
				let label = new eui.Label();
				let textColor = this.MatchMemberTypeToColor[i];
				label.textFlow = [{ text: this.MatchMemberTypeToString[i], style: { textColor: textColor, underline: true } }];
				label.size = 22;
				label.name = i + "";
				this.operationGroup.addChild(label);
				label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTap, this);
			}
		}
		private onClickTap(e: egret.TouchEvent) {
			switch (e.target) {
				case this._detailBtn:
					ClubModuleMgr.getInstance().showClubMemberInfoPanel(this.info);
					break;
				case this._cleanRemarksBtn:
					uniLib.TipsUtils.showConfirm("是否清除备注分数？", "", "是", () => {
						ClubSendMgr.RemarkPointMatchGroupCmd(ClubData.getInstance().matchid, this.info.uid, 2, 0, ClubData.getInstance().clubDayChose - 1);
					}, "否", null);
					break;
				case this._writeRemarksbtn:
					ClubModuleMgr.getInstance().showClubRemarksScorePanel(this.info.uid);
					break;
			}
		}
		private onLabelTap(e: egret.TouchEvent) {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			let reply = Number((<eui.Label>e.target).name);
			if (reply == 3) {
				var inputPanel: MatchAddYelloPanel = new MatchAddYelloPanel(MatchManagePanel.Instanc.selectMatchId, data.uid);
				uniLib.PopUpMgr.addPopUp(inputPanel, null, true, true);
				return;
			}
			//2 变成白名单， 3 变为黑名单
			let cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
			cmd.reply = (reply == 1 || reply == 2) ? reply + 1 : 0;
			cmd.uid = data.uid;
			cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
			NetMgr.tcpSend(cmd);
		}
	}
}