module Cmd {

	/**
	* 个人信息数据返回
	*/
	export function OnGetPersonalPanel_S(rev: Cmd.GetPersonalPanel_S) {
		if(rev.resultCode){
			return;
		}
		uniLib.Global.dispatchEvent(chessCommonLib.ZhiMaEventConsts.GET_USERINFO, rev.userInfo);
	}
	/**
	 * 礼物广播
	 */
	export function OnSendGiftRoomCmd_Brd(rev: Cmd.SendGiftRoomCmd_Brd) {
        uniLib.Global.dispatchEvent(chessCommonLib.ZhiMaEventConsts.SEND_GIFT_NOTICE, rev);
    }
	/**
	 * 礼物失败返回
	 */
    export function OnSendGiftRoomCmd_S(rev: Cmd.SendGiftRoomCmd_S) {
        if(rev.resultCode) {
        //    chessCommonLib.PublicTipMgr.getInstance().showMildWarnShow("礼物发送失败，返回码"+rev.resultCode);
        }
    }

	export function OnVoiceChat_Brd(rev: Cmd.VoiceChat_Brd) {
        uniLib.Global.dispatchEvent(chessCommonLib.ZhiMaEventConsts.VOICE_NOTICE, rev);
    }
}
