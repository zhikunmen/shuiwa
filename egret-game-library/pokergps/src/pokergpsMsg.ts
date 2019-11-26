module Cmd {
	export function OnReturnIpAndGPSPokerCmd_S(rev: Cmd.ReturnIpAndGPSPokerCmd_S) {
		uniLib.Global.dispatchEvent(pokergps.pokergpsConst.UPDATE_GPS_DATA, rev.list);
	}
}