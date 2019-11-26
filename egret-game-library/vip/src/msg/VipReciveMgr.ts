class VipReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**VIP-请求数据 */
	export function OnGetFishVipInfoCmd_S(rev: Cmd.GetFishVipInfoCmd_S) {
		uniLib.Global.dispatchEvent(vip.CmdConstant.FISHVIP_INFO, rev, true);
	}

	export function OnGetFishVipRewardCmd_CS(rev: Cmd.GetFishVipRewardCmd_CS) {
		uniLib.Global.dispatchEvent(vip.CmdConstant.FISHVIP_REWARD, rev, true);
	}

}