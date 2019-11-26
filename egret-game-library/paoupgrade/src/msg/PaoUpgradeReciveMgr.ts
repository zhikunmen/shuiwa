class PaoUpgradeReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**VIP-请求数据 */
	export function OnRequestFishGunInfoCmd_S(rev: Cmd.RequestFishGunInfoCmd_S) {
		MJLobbyData.getInstance().fishGunBei = rev.guninfo.ctimes;
		uniLib.Global.dispatchEvent(paoupgrade.CmdConstant.GET_FISH_GUNINFO, rev, true);
	}

	export function OnUnlockFishGunCmd_S(rev: Cmd.UnlockFishGunCmd_S) {
		MJLobbyData.getInstance().fishGunBei = rev.guninfo.ctimes;
		uniLib.Global.dispatchEvent(paoupgrade.CmdConstant.UNLOCK_FISHGUN, rev, true);
	}

}