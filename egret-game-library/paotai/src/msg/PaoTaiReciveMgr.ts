class PaoTaiReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**VIP-请求数据 */
	export function OnSetFishCannonCmd_CS(rev: Cmd.SetFishCannonCmd_CS) {
		uniLib.Global.dispatchEvent(paotai.CmdConstant.SET_FISH_CANNON, rev, true);
		MJLobbyData.getInstance().userInfoSynLobby.userInfo.fishcannon = rev.id;
	}

	/**VIP-请求数据 */
	export function OnGetFishCannonCmd_CS(rev: Cmd.GetFishCannonCmd_CS) {
		uniLib.Global.dispatchEvent(paotai.CmdConstant.GET_FISH_CANNON, rev, true);
		MJLobbyData.getInstance().userInfoSynLobby.userInfo.fishcannon = rev.id;
	}

	/**抽奖信息 */
	export function OnGetFishLuckyDrawInfoLobbyCmd_S(rev: Cmd.GetFishLuckyDrawInfoLobbyCmd_S) {
		uniLib.Global.dispatchEvent(paotai.CmdConstant.GET_FISH_LUCKYDRAW, rev, true);
	}

	/**抽奖结果*/
	export function OnGetFishLuckyDrawPrizeLobbyCmd_S(rev: Cmd.GetFishLuckyDrawPrizeLobbyCmd_S) {
		uniLib.Global.dispatchEvent(paotai.CmdConstant.GET_FISH_LUCKYPRIZE, rev, true);
	}
}