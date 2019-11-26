class ShopReciveMgr {
	public constructor() {
	}
}
module Cmd {
	export function OnCreatePlatOrderReturnSdkPmd_S(rev: Pmd.CreatePlatOrderReturnSdkPmd_S) {
		uniLib.TipsUtils.showTipsDownToUp("获取订单号成功，等待支付");
		// uniLib.UIMgr.instance.hideLoading(HaoCaiTipLoading, "recharge");
		if (rev.result != 0) {
			if (rev.result == 2)
				uniLib.TipsUtils.showTipsDownToUp("今日已达最大充值限额(3千)", true);
			else
				uniLib.TipsUtils.showTipsDownToUp("下订单失败!", true);
			return;
		}
		rev.roleid = NetMgr.getThirdPlatId();
		uniLib.PayMgr.Instance.payByPmd(rev);
		return true;
	}

	export function OnNotifyRechargeRequestSdkPmd_S(rev: Pmd.NotifyRechargeRequestSdkPmd_S) {
		// Cmd.trace(rev, "支付成功返回，NotifyRechargeRequestSdkPmd_S");
		uniLib.TipsUtils.showTipsDownToUp("充值成功");
		uniLib.UserInfo.chips = Number(rev.extdata);
		// Cmd.dispatch(MJLobby.MahJongLobbyFacadeConsts.COIN_FIRSTRECHARGE, rev.goodid);
	}

	/**首充信息 */
	export function OnGetFirstchargeInfoHpMatchCmd_S(rev: Cmd.GetFirstchargeInfoHpMatchCmd_S) {
		uniLib.Global.dispatchEvent(shop.FIRST_RECHARGE_INFO, rev);
	}

}