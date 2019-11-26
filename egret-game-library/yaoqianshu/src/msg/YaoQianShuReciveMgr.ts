class YaoQianShuReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**摇钱树-请求数据 */
	export function OnGetMoneyTreeDataLobby_S(rev: Cmd.GetMoneyTreeDataLobby_S) {
		uniLib.Global.dispatchEvent(yaoqianshu.CmdConstant.GLODELE_DATA, rev, true);
	}

	/**摇钱树-获取金币 */
	export function OnGetMoneyTreeGoldLobby_S(rev: Cmd.GetMoneyTreeGoldLobby_S) {
		if(rev.resultCode == 0){
			uniLib.Global.dispatchEvent(yaoqianshu.CmdConstant.GLODELE_GETREWARD, rev, true);
		}else{
			uniLib.TipsUtils.showTipsDownToUp(rev.desc);
		}
		
	}


}