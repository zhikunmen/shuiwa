module Cmd{
    /**绑定手机成功 */
	export function OnBindingMobilePhoneLobbyCmd_S(rev: Cmd.BindingMobilePhoneLobbyCmd_S) {
		if (rev.resultCode == 0) {
			uniLib.Global.dispatchEvent(myInfo.MyInfoConst.PHONE_BIND, rev);
			
		}
	}
}