module sharepanel {
	export class LobbySharePanel extends commonpanel.LobbyBaseEuiPanel {
		public _pyqIcon: eui.WxButton;
		public _wXinIcon: eui.WxButton;
		private _data: uniLib.WXShareVo;
		/**是否是朋友圈 */
		private _isPyq: boolean = false;
		public constructor(data?: uniLib.WXShareVo) {
			super('mjl_share_title', 630, 360);
			this.skinName = 'LobbySharePanelSkin'
			this._data = data;
		}
		protected addEvent() {
			this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}

		protected removeEvent() {
			this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
		}

		private btnClick(evt: egret.TouchEvent) {
			let data;
			if (this._data) {
				data = this._data;
			} else {
				data = new uniLib.WXShareVo();
				if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin.wbappid) {
					var nick: string = uniLib.UserInfo.nickName;
					if (nick.length > 8) {
						nick = nick.slice(0, 8);
					}
					data.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + MJLobbyData.getInstance().lobbyConfig.newLink + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + 0 + "|" + nick) + "&connect_redirect=1#wechat_redirect";
				} else {
					data.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
				}
			}
			switch (evt.target) {
				case this._pyqIcon:
					this._isPyq = true;
					data.shareWay = 1;
					break
				case this._wXinIcon:
					this._isPyq = false;
					data.shareWay = 0;
					break;
			}
			this.share(data);
		}


		private share(data: uniLib.WXShareVo) {
			uniLib.ZQGameSdk.share(data, this.shareBack, this);
		}

		private shareBack(back: any): void {
			if (this._isPyq) {
				// ResUtil.trace("微信返回"+JSON.stringify(back));
				if (back) {
					if (back.code == 0) {
						var req: Cmd.ShareLobbyCmd_C = new Cmd.ShareLobbyCmd_C();
						req.lobbyId = uniLib.Global.gameConfig.lobbyId;
						NetMgr.tcpSend(req);
					}
					egret.Tween.get(this).wait(100).call(this.delayShareBack, this, [back.code]);
				}
			}
		}
		private delayShareBack(code: number): void {
			if (code == 0) {
				uniLib.TipsUtils.showTipsDownToUp("分享成功!");
			} else if (code == 1) {
				uniLib.TipsUtils.showTipsDownToUp("分享已取消");
			} else if (code == 2) {
				uniLib.TipsUtils.showTipsDownToUp("分享被拒绝");
			}
		}
	}
}