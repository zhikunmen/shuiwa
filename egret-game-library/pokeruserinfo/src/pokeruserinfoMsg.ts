module Cmd {
	export function OnSendGiftPokerCmd_Brd(rev: Cmd.SendGiftPokerCmd_Brd) {
		uniLib.Global.dispatchEvent(pokeruserinfo.pokeruserinfoConst.SEND_GIFTS_NOTICE, rev);
	}
}