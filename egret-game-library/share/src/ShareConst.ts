module share {
	export class ShareConst {
		public static RES_JSON = "resource/share.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共loading需要加载的资源组
		 */
		public static PUB_SHARE: string = "pub_share";
		/**邀请有礼界面 */
		public static SHARE_INVITEDATA: string = "share_invitedata";
		/**领取奖励 */
		public static SHARE_INVITEAWARD: string = "share_inviteaward";
	}

	/**
	 * 打包成app之后的分享 不支持分享图片
	 * @shareType 分享类型
	 * @state 跳转公众号需要携带的参数 多个参数以_分割 发送给平台的参数
	 * @extData 发送给服务器的扩展字段 json字符串
	 * @roomId 房间号id
	 * @title 标题
	 * @description 描述
	 * @callBack 分享回调
	 * @callObj 回调函数域
	 * @shareWay 0好友 1 朋友圈 默认为好友
	 */
	export function shareNativeMessage(shareType: Cmd.ShareType, roomId = 0, state = "", extData: string = "", title = "", description = "", callBack: Function = null, callObj: any = null, shareWay = 0) {
		if (uniLib.Global.isNative) {
			var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
			vo.shareWay = shareWay;
			let lobbyConfig = MJLobbyData.getInstance().lobbyConfig;
			if (LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.wx_wbappid) {
				var nick: string = uniLib.UserInfo.nickName;
				if (nick.length > 5) {
					nick = nick.slice(0, 5);
				}
				vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.wx_wbappid + "&redirect_uri=http://" + lobbyConfig.newLink + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.wx_wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + (roomId ? roomId : 0) + "|" + nick + "|" + Cmd.ShareOpType.click + "_" + state) + "&connect_redirect=1#wechat_redirect";
			}
			else {
				vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
			}
			vo.title = !!title ? title : lobbyConfig.shareTitle;
			vo.description = !!description ? description : lobbyConfig.shareContent;
			uniLib.ZQGameSdk.share(vo, (msg) => {
				if (msg && msg.code == 0) {
					let req = new Cmd.UploadShareInfoLittleGameLobbyCmd_CS();
					req.opType = Cmd.ShareOpType.share;
					req.shareType = shareType;
					req.extData = extData;
					NetMgr.tcpSend(req);
					callBack && callBack.call(callObj);
				}
				else if (msg.code == 1) {
					uniLib.TipsUtils.showTipsDownToUp("分享取消");
				}
				else if (msg.code == 2) {
					uniLib.TipsUtils.showTipsDownToUp("分享被拒绝");
				}
			}, this);
		}
	}
}