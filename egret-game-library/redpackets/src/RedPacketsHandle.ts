module Cmd {
    export function OnGetInviteInfoLittleGameLobbyCmd_S(rev: Cmd.GetInviteInfoLittleGameLobbyCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(redpackets.RedPacketsConst.SHARE_INVITEDATA, rev);
        }
    }

    export function OnGetInviteRewardLittleGameLobbyCmd_S(rev: Cmd.GetInviteRewardLittleGameLobbyCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(redpackets.RedPacketsConst.SHARE_INVITEAWARD, rev);
            wxgame.Global.instance.aldSendEvent("周边系统", "分享有礼领取钻石成功");
        }
    }
}