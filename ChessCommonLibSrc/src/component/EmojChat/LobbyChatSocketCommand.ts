module Cmd {

	/**
 * 聊天信息初始化
 */
	export function OnGetCommonChatInfoLobby_S(rev: Cmd.GetCommonChatInfoLobby_S) {
		if (rev) {
			if (!Array.isArray(rev.info)) {
				rev.info = [];
			}
		}
		//这条消息在游戏内收到也截取，避免消息量太大卡顿，因为会同时向大厅服务器和游戏内服务器进行请求
		if (uniLib.Global.isInGame) {
			if (rev.info.length > 20) {
				rev.info.length = 20;
			}
		}

		// console.error("聊天信息初始化", rev.info);
		uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.CHAT_INIT, rev);
	}

	/**
 * 聊天返回只对自己
 */
	export function OnLobbyCommonChatLobby_S(rev: Cmd.LobbyCommonChatLobby_S) {
		if (rev.resultCode && rev.resultCode != 0) {
			// uniLib.TipsUtils.showTipsDownToUp("发送聊天信息失败,错误码:" + rev.resultCode);
			// uniLib.TipsUtils.showTipsDownToUp(rev.desc);
			if (rev.resultCode === 2) {
				uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF_FAIL, rev);
			}
		}
		else {
			uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF, rev);
		}
	}

	/**
	 * 聊天返回广播
	 */
	export function OnLobbyCommonChatLobby_Brd(rev: Cmd.LobbyCommonChatLobby_Brd) {
		if (rev && rev.type == 1) {
			uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG, rev.info);
		}
		else {
			chessCommonLib.CommonVariable.getInstance().chatInfo = rev.info;
			uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG_INGAME, rev.info);
		}
	}
}
