class GoldLandReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**请求数据 */
	export function OnGetHeavenAwardHistoryHpMatchCmd_S(rev: Cmd.GetHeavenAwardHistoryHpMatchCmd_S) {
		uniLib.Global.dispatchEvent(goldLand.CmdConstant.HEAVEN_AWARD_HISTORY, rev, true);
	}

	/**通知获奖 */
	export function OnGoldFromHeavenHpMatchCmd_S(rev: Cmd.GoldFromHeavenHpMatchCmd_S) {
		uniLib.Global.dispatchEvent(goldLand.CmdConstant.HEAVEN_AWARD_GOLD, rev, true);
	}
	

}