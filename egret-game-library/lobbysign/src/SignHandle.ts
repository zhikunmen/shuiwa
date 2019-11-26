module Cmd {

    export function signDispatch(cmd: string, obj?: any, bubbles = true): void {
        uniLib.Global.dispatchEvent(cmd, obj, bubbles)
    }

    /**金币场用户今日签到返回 */
    export function OnUserSignTodayLobbyCmd_S(rev: Cmd.UserSignTodayLobbyCmd_S) {
        signDispatch(lobbysign.SignConst.SIGN_TODAY, rev);
    }
    /**用户累计签到奖励 */
    export function OnUserSignContinueLobbyCmd_S(rev: Cmd.UserSignContinueLobbyCmd_S) {
        signDispatch(lobbysign.SignConst.SIGN_CONTINUE, rev);

    }
}