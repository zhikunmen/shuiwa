
module Cmd {
	export function OnGetInfoTurnTableCmd_S(rev: Cmd.GetInfoTurnTableCmd_S) {
		if(rev.opType >2){
			uniLib.Global.dispatchEvent("turntableinfo", rev);
			return;
		}
		if (uniLib.PopUpMgr.hasPopup(turntable.TurntablePanel)) {
			uniLib.Global.dispatchEvent("turntableinfo", rev);
		}
		else {
			LoadPanelTipMgr.getInstance().loadRes(turntable.TurntableConsts.PUB_TURNTABLE, () => {
				uniLib.PopUpMgr.addPopUp(turntable.TurntablePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, rev);
			})
		}
	}
}