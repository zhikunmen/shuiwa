module club {
	/**
	 * 成员列表item
	 */
	export class MatchMemberItem extends eui.ItemRenderer {
		private nameLabel: eui.Label;     //玩家姓名
		private winloseLabel: eui.Label;    //今、昨、前日输赢
		private winNumLabel: eui.Label;     //大赢家次数
		private playerID: eui.Label;
		private operationGroup: eui.Group;

		constructor() {
			super();
			this.skinName = "MatchMemberItemSkin";
		}
		protected dataChanged(): void {
			let data: Cmd.MatchGroupMemberInfo = this.data;
			let index = ClubData.getInstance().clubDayChose - 1;
			if (ClubData.getInstance().clubStyle == CLUBSTYLE.ZHANGZHOU) {
				if (ClubData.getInstance().clubRefresh == 1) {
					this.winloseLabel.visible = false;
					this.winNumLabel.visible = false;
				} else {
					this.winloseLabel.text = data.scores[index].toString();
					this.winNumLabel.text = data.winNums[index].toString();
				}
			}
			this.nameLabel.text = data.nickname;
			this.playerID.text = data.uid.toString();
			this.operationGroup.removeChildren();
			for (let i: number = 0; i < 4; i++) {
				if (i == data.type)
					continue;
				let label = new eui.Label();
				let textColor = DataManage.MatchMemberTypeToColor(i);
				label.textFlow = [{ text: DataManage.MatchMemberTypeToString(i), style: { textColor: textColor, underline: true } }];
				label.size = 22;
				label.name = i + "";
				this.operationGroup.addChild(label);
				label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTap, this);
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