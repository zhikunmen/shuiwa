module lobbyaward {
	/**领取奖励动画 公用 
	* type ：
	* 1、2：签到领取  id：奖品id；
	* 3：现金红包    id：现金金额
	*/
	export class LobbyGetAwardPanel extends commonpanel.LobbyBaseEuiPanel {

		private guang: egret.tween.TweenGroup;
		private bgRect: eui.Rect;
		private image: eui.Image;
		private awardimage: eui.Image;
		private okBtn: eui.Button;
		private jinbiText: eui.BitmapLabel;
		private _freeGoldMc: dragonBones.Armature;

		constructor() {
			super();
			this.skinName = "LobbyGetAwardSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
		}
		protected initUI() {
			uniLib.DisplayUtils.playTweenGroup(this.guang, true);   //光转动画
			this._freeGoldMc = uniLib.DragonUtils.createDragonBonesDisplay("mjlb_freegold_effect_ske_json", "mjlb_freegold_effect_tex_json", "mjlb_freegold_effect_tex_png", "MovieClip");
			dragonBones.WorldClock.clock.add(this._freeGoldMc);
			this._freeGoldMc.display.x = uniLib.Global.designWidth / 2 - this._freeGoldMc.display.width;
			this._freeGoldMc.display.y = uniLib.Global.designHeight / 2 - this._freeGoldMc.display.height;
			this.addChildAt(this._freeGoldMc.display, 1);
			if (this._freeGoldMc) {
				this._freeGoldMc.animation.play("freegold", 1);
			}
			this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
		}
		public destroy(): void {
			uniLib.PopUpMgr.removePopUp(this);
			uniLib.DisplayUtils.stopTweenGroup(this.guang);
		}

		public setData(id: number, type: number) {
			let item: any;
			if (type == 1) {
				for (let i = 0; i < MJLobbyData.getInstance().sign[0].signReward.length; i++) {
					if (MJLobbyData.getInstance().sign[0].signReward[i].dayNum == id) {
						item = MJLobbyData.getInstance().sign[0].signReward[i].reward;
						break;
					}
				}
			} else if (type == 2) {
				for (let i = 0; i < MJLobbyData.getInstance().sign[0].cumulativeReward.length; i++) {
					if (MJLobbyData.getInstance().sign[0].cumulativeReward[i].cumulativeNum == id) {
						item = MJLobbyData.getInstance().sign[0].cumulativeReward[i].reward;
						break;
					}
				}
			}
			if (type == 3) {
				this.awardimage.source = "mjl_redpackets_json.mjl_redpackets_award";
				this.jinbiText.text = id + "元";     //奖励钱
			} else {
				let str;
				for (let parm in MJLobbyData.getInstance().goods) {
					if (parm == item["goodsId"]) {
						str = MJLobbyData.getInstance().goods[parm].goodIcon;
						break;
					}
				}
				this.awardimage.source = str;    //奖品图片
				let num;
				num = item["count"];
				this.jinbiText.text = num;     //奖励金币数
			}
		}

		/** 物品通用 */
		public setRewardItemData(rewardItem: Cmd.RewardItem) {
			let str = MJLobbyData.getInstance().goods[rewardItem.goodId].goodIcon;
			this.awardimage.source = str;    //奖品图片
			if (rewardItem.goodId == 353) {
				this.jinbiText.text = rewardItem.goodNbr + "元";     //奖励金币数
			} else {
				this.jinbiText.text = rewardItem.goodNbr + "";     //奖励金币数
			}
		}
	}
}
