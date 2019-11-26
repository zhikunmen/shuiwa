module Cmd {
	// export function OnCommonChat_Brd(rev: Cmd.CommonChat_Brd) {
    //     uniLib.Global.dispatchEvent(pokerchat.pokerchatConst.NOTIFY_COMMON_CHAT, rev);
    // }
    export function Onddz_CommonChat_Brd(rev: Cmd.ddz_CommonChat_Brd) {
        uniLib.Global.dispatchEvent(pokerchat.pokerchatConst.NOTIFY_COMMON_CHAT, rev);
    }
}