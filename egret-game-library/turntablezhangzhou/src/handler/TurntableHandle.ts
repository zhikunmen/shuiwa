module Cmd {

    export function TurntableDispatch(cmd: string, obj?: any, bubbles = true): void {
        uniLib.Global.dispatchEvent(cmd, obj, bubbles)
    }

    /**领取红包钱*/
    export function OnOpenRedPackLobbyCmd_S(rev: Cmd.OpenRedPackLobbyCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.OpenRedPackLobby, rev);
        }
    }
    /** 漳州新增转盘 转动转盘 */
    export function OnZZTurnTableLobbyCmd_CS(rev: Cmd.ZZTurnTableLobbyCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.ZZTurnTableLobby, rev);
            if (rev.integral == 0) {
                turntable.TurntableData.getInstance().canTurnTable = false;
                TurntableDispatch(turntable.TurntableConst.CANTURNTABLE);
            }
        }
    }

    /**漳州新增转盘  进入转盘界面 */
    export function OnIntoZZTurnTableLobbyCmd_CS(rev: Cmd.IntoZZTurnTableLobbyCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.IntoZZTurnTableLobby, rev);
        }
    }

    /**漳州新增转盘 获奖记录 */
    export function OnGetZZTurnTableRecordsLobbyCmd_CS(rev: Cmd.GetZZTurnTableRecordsLobbyCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = turntable.TurntableConst.SUCCESS;
        }
        if (rev.resultCode == turntable.TurntableConst.SUCCESS) {
            TurntableDispatch(turntable.TurntableConst.GetZZTurnTableRecordsLobby, rev);
        }
    }

}