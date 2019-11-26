module redpackets {
	/**现金红包 */
	export class RedPacketsPanel extends eui.Component {
		/**邀请按钮 */
		public btn_0: eui.Button;
		public btn_1: eui.Button;
		public btn_2: eui.Button;
		/**规则提示 */
		public tips_lbl: eui.Label;
		/**数据 */
		private _inviteInfo: Cmd.GetInviteInfoLittleGameLobbyCmd_S;
		/**判断是否还有未领取奖励 */
		private _isHaveAward: boolean;
		constructor() {
			super();
			this.skinName = "redpacketsSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEvent();
		}

		public destroy() {
			this._inviteInfo = null;
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			uniLib.Global.removeEventListener(RedPacketsConst.SHARE_INVITEAWARD, this.update, this);
			uniLib.Global.removeEventListener(RedPacketsConst.SHARE_INVITEDATA, this.init, this);
		}

		private addEvent(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			uniLib.Global.addEventListener(RedPacketsConst.SHARE_INVITEAWARD, this.update, this);
			uniLib.Global.addEventListener(RedPacketsConst.SHARE_INVITEDATA, this.init, this);
			let req = new Cmd.GetInviteInfoLittleGameLobbyCmd_C();
			NetMgr.tcpSend(req);
		}
		/**初次导入数据 */
		private init(evt: uniLib.ZqEvent): void {
			this.tips_lbl.textFlow = <Array<egret.ITextElement>>[{ text: "邀请", style: { textColor: 0xe9cdaf } }, { text: "新用户玩5局游戏", style: { textColor: 0xdeff00 } },
			{ text: "领", style: { textColor: 0xe9cdaf } }, { text: "1.66元", style: { textColor: 0xdeff00 } }, { text: "及以上随机现金，自动提现！", style: { textColor: 0xe9cdaf } }];
			let data = evt.param as Cmd.GetInviteInfoLittleGameLobbyCmd_S;
			this._inviteInfo = data;
			this.updateHead();
		}
		/**更新数据，领奖 */
		private update(evt: uniLib.ZqEvent) {
			this._isHaveAward = false;
			let data = evt.param as Cmd.GetInviteRewardLittleGameLobbyCmd_S;
			/**领取奖励动画 */
			var awardPanel = new lobbyaward.LobbyGetAwardPanel();
			awardPanel.setData(data.goods[0].goodsNum, 3);
			uniLib.PopUpMgr.addPopUp(awardPanel, null, true, true);
			let changedata = this._inviteInfo;
			changedata.info.forEach((f, index) => {
				if (f.id == data.id) {
					this._inviteInfo.info[index].status = 4;
				}
				if (this._inviteInfo.info[index].status == 3) {
					this._isHaveAward = true;
				}
			});
			if (this._isHaveAward == false) {
				uniLib.Global.dispatchEvent(RedPacketsConst.NOTCAN_GETINVITE);
			}
			this.updateHead();
			uniLib.TipsUtils.showTipsDownToUp("如有问题请联系客服");
		}
		/**更新数据 */
		private updateHead() {
			let data = this._inviteInfo.info;
			data.forEach((f, index) => {
				let good: table.TableGoodsConfig
				good = ConfigMgr.getInstance().getGoodCfgById(f.goods.goodsId);
				let btn: eui.Button = this["btn_" + index];
				if (btn) {
					if (f.goods.goodsId == 32) {
						btn.skin["awardTxt"].text = f.goods.goodsNum + "金币";
					}
					else if (f.goods.goodsId == 296) {
						btn.skin["awardTxt"].text = "最高" + f.goods.goodsNum + "元";
					}
					else if (f.goods.goodsId == 6) {
						btn.skin["awardTxt"].text = f.goods.goodsNum + "钻石";
					}
					/**漳州使用 当前状态 status
					 * 1：等待邀请(这时候不会有昵称和头像信息) 
					 * 2：已邀请但局数未满 
					 * 3: 已邀请且局数已满可领取奖励 
					 * 4：已邀请奖励已领取 */
					this.setPlayerIconMask(btn.skin["head"]);
					if (f.status == 1) {
						btn.touchEnabled = true;
					}
					else if (f.status == 2) {
						btn.touchEnabled = true;
						btn.skin["numTxt"].text = f.curGameNbr + "/" + f.allGameNbr + "局";
						btn.skin["head"].source = f.headUrl;
					}
					else if (f.status == 3) {
						btn.touchEnabled = true;
						btn.skin["numTxt"].text = f.curGameNbr + "/" + f.allGameNbr + "局";
						btn.skin["awardTxt"].text = "领取现金";
						btn.skin["head"].source = f.headUrl;
					}
					else if (f.status == 4) {
						btn.touchEnabled = false;
						btn.skin["numTxt"].text = f.curGameNbr + "/" + f.allGameNbr + "局";
						btn.skin["head"].source = f.headUrl;
						btn.skin["awardTxt"].text = "";
						btn.skin["type"].source = "mjl_redpackets_istrue";    //已领取
						btn.skin["type0"].source = "mjl_redpackets_istrue";
						btn.skin["get"].visible = true;
					}
				}
			});
		}
		/**蒙版 */
		private setPlayerIconMask(image: egret.Bitmap): void {
			let maskTexture: egret.Texture = RES.getRes("lb_lobby_headBg_png");
			let maskImg: egret.Bitmap = new egret.Bitmap();
			image.parent.addChild(maskImg);
			maskImg.texture = maskTexture;
			maskImg.width = 114;
			maskImg.height = 114;
			maskImg.x = (image.width - maskImg.width) / 2 + image.x;
			maskImg.y = (image.height - maskImg.height) / 2 + image.y;
			image.mask = maskImg;
		}

		private btnClick(evt: egret.TouchEvent) {
			switch (evt.target) {
				case this.btn_0:
				case this.btn_1:
				case this.btn_2:
					let index = parseInt(evt.target.name)
					if (this._inviteInfo && this._inviteInfo.info[index]) {
						let info = this._inviteInfo.info[index];
						if (info.status == 1) {
							this.clickShare();
						}
						else if (info.status == 2) {
							uniLib.TipsUtils.showTipsDownToUp("该玩家在任意游戏中完成5局即可领取！");
						}
						else if (info.status == 3) {
							let req = new Cmd.GetInviteRewardLittleGameLobbyCmd_C();
							req.id = this._inviteInfo.info[index].id;
							NetMgr.tcpSend(req);
						}
					}
					break;
			}
		}
		/**分享操作 */
		private clickShare() {
			if (uniLib.Global.isWxGame()) {
				let vo = new uniLib.WXShareVo();
				vo.shareType = Cmd.ShareType.invite;
				uniLib.ZQGameSdk.share(vo);
			}
			else {
				shareNativeMessage(Cmd.ShareType.invite, 0, Cmd.ShareType.invite.toString());
			}
		}
	}
} 
