class PackBagReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**
 * 
 */
	export function OnBackpackInfoReturnBackpackCmd_S(rev: Cmd.BackpackInfoReturnBackpackCmd_S) {
		if (!rev.resultCode) {
			uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_INFO_RETURN, rev);
		}else{
			if(rev.desc)
				uniLib.TipsUtils.showTipsDownToUp(rev.desc);
		}
	}
	/**
	 * 
	 */
	export function OnBackpackExchangeReturnBackpackCmd_S(rev: Cmd.BackpackExchangeReturnBackpackCmd_S) {
		if (rev.resultCode == 0 || rev.resultCode == 10001) {
			if(rev.resultCode == 10001){
				let msg: uniLib.MsgBox = new uniLib.MsgBox("恭喜您成功合成现金红包，请前往”兑换“界面提现", "", "确定", ()=>{
					LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
				}, "取消", null, this);
				uniLib.PopUpMgr.addPopUp(msg, null, true, true, false, uniLib.PopUpEffect.CENTER);
			}
			
			uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_EXCHANGE, rev);
		}else{
			if(rev.desc)
				uniLib.TipsUtils.showTipsDownToUp(rev.desc);
		}
	}

	export function OnBackpackPresentReturnBackpackCmd_S(rev: Cmd.BackpackPresentReturnBackpackCmd_S) {
		if(rev.resultCode == undefined){
			uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_PRESENT, rev);
		}else if (rev.resultCode == 0) {
			uniLib.Global.dispatchEvent(packbag.CmdConstant.BACKPACK_PRESENT, rev);
			uniLib.TipsUtils.showTipsDownToUp("赠送成功！");
		}else{
			if(rev.desc)
				uniLib.TipsUtils.showTipsDownToUp(rev.desc);
		}
	}

	

}