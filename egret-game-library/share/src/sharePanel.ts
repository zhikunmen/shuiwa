module share {
	export class sharePanel extends eui.Component {
		public open_img: eui.Image;
		public btn_0: eui.WxButton;
		public btn_1: eui.WxButton;
		public btn_2: eui.WxButton;
		public open_btn: eui.WxButton;
		public tips_lbl: eui.Label;

		private _inviteInfo: Cmd.GetInviteInfoLittleGameLobbyCmd_S;

		constructor() {
			super();
			this.skinName = "LobbySharePanelSkin";
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addEvent();
			this.tips_lbl.textFlow = <Array<egret.ITextElement>>[{ text: "邀请", style: { textColor: 0xe9cdaf } }, { text: "3名新用户", style: { textColor: 0xdeff00 } },
			{ text: "领", style: { textColor: 0xe9cdaf } }, { text: "0.66元", style: { textColor: 0xdeff00 } }, { text: "及以上随机现金，自动提现！", style: { textColor: 0xe9cdaf } }];
		}

		public destroy() {
			this._inviteInfo = null;
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			uniLib.Global.removeEventListener(ShareConst.SHARE_INVITEAWARD, this.update, this);
			uniLib.Global.removeEventListener(ShareConst.SHARE_INVITEDATA, this.init, this);
		}

		private addEvent(): void {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
			uniLib.Global.addEventListener(ShareConst.SHARE_INVITEAWARD, this.update, this);
			uniLib.Global.addEventListener(ShareConst.SHARE_INVITEDATA, this.init, this);
			let req = new Cmd.GetInviteInfoLittleGameLobbyCmd_C();
			NetMgr.tcpSend(req);
		}

		private init(evt: uniLib.ZqEvent): void {
			let data = evt.param as Cmd.GetInviteInfoLittleGameLobbyCmd_S;
			this.updateHead(data);
		}

		private update(evt: uniLib.ZqEvent) {
			let data = evt.param as Cmd.GetInviteRewardLittleGameLobbyCmd_S;
			this.updateHead(data);
		}

		private updateHead(infos: Cmd.GetInviteInfoLittleGameLobbyCmd_S) {
			this._inviteInfo = infos;
			let data = infos.info;
			data.forEach((f, index) => {
				let good: table.TableGoodsConfig
				good = ConfigMgr.getInstance().getGoodCfgById(f.goods.goodsId);
				let btn: eui.WxButton = this["btn_" + index];
				if (btn) {
					if (f.goods.goodsId == 32) {
						btn.label = f.goods.goodsNum + "金币";
					}
					else if (f.goods.goodsId == 296) {
						btn.label = "最高" + f.goods.goodsNum + "元";
					}
					else if (f.goods.goodsId == 6) {
						btn.label = f.goods.goodsNum + "钻石";
					}
					if (f.status == 1) {
						btn.touchEnabled = true;
					}
					else if (f.status == 2) {
						btn.touchEnabled = true;
						btn.skin["head"].mask = btn.skin["msk"];
						btn.skin["head"].source = f.headUrl;
					}
					else if (f.status == 3) {
						btn.touchEnabled = false;
						btn.skin["head"].mask = btn.skin["msk"];
						btn.skin["head"].source = f.headUrl;
						btn.skin["get"].visible = true;
					}

				}
			});
			if (infos.rewardStatus == 3) {
				this.open_btn.currentState = "disabled";
				this.open_btn.touchEnabled = false;
				this.open_img.visible = true;
			}
			else if (infos.rewardStatus == 2) {
				this.open_btn.currentState = "up";
			}
			else if (infos.rewardStatus == 1) {
				this.open_btn.currentState = "disabled";
				this.open_btn.touchEnabled = false;
			}
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
							if (!uniLib.UserInfo.phonenumber) {
								uniLib.PopUpMgr.addPopUp(myInfo.BindPhoneVC, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, null);
							}
							else {
								let req = new Cmd.GetInviteRewardLittleGameLobbyCmd_C();
								req.id = this._inviteInfo.info[index].id;
								NetMgr.tcpSend(req);
							}
						}
					}
					break;
				case this.open_btn:
					if (!uniLib.UserInfo.phonenumber) {
						uniLib.PopUpMgr.addPopUp(myInfo.BindPhoneVC, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, null);
					}
					else {
						if (this._inviteInfo && this._inviteInfo.info) {
							let req = new Cmd.GetInviteRewardLittleGameLobbyCmd_C();
							req.id = this._inviteInfo.info[this._inviteInfo.info.length - 1].id;
							NetMgr.tcpSend(req);
						}
					}
					break;
			}
		}

		private clickShare() {
			if (uniLib.Global.isWxGame()) {
				let vo = new uniLib.WXShareVo();
				vo.shareType = Cmd.ShareType.invite;
				uniLib.ZQGameSdk.share(vo);
				wxgame.Global.instance.aldSendEvent("周边系统", "分享有礼跳转分享");
			}
			else {
				shareNativeMessage(Cmd.ShareType.invite, 0, Cmd.ShareType.invite.toString());
			}
		}
	}
}