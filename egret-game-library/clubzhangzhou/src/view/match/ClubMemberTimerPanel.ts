
module club {
    /**定时器 */
    export class ClubMemberTimerPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /**确定按钮*/
        private _sureBtn: eui.Button;
        /**暂停 小时 */
        private _suspendHour: eui.EditableText;
        /**暂停 分钟*/
        private _suspendMinute: eui.EditableText;
        /**恢复 小时 */
        private _renewHour: eui.EditableText;
        /**恢复 分钟 */
        private _renewMinute: eui.EditableText;
        /**重置暂停 */
        private _resetSuspendBtn: eui.Button;
        /**重置恢复*/
        private _resetRenewBtn: eui.Button;

        constructor() {
            super();
            this.skinName = "ClubMemberTimerSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        //初始化
        protected initUI(): void {
            if (ClubData.getInstance().suspendTimer) {
                this._suspendHour.text = Math.floor(ClubData.getInstance().suspendTimer / 3600) < 10 ? "0" + Math.floor(ClubData.getInstance().suspendTimer / 3600) : Math.floor(ClubData.getInstance().suspendTimer / 3600) + "";
                this._suspendMinute.text = ((ClubData.getInstance().suspendTimer % 3600) / 60) < 10 ? "0" + (ClubData.getInstance().suspendTimer % 3600) / 60 : (ClubData.getInstance().suspendTimer % 3600) / 60 + "";
            }
            if (ClubData.getInstance().renewTimer) {
                this._renewHour.text = Math.floor(ClubData.getInstance().renewTimer / 3600) < 10 ? "0" + Math.floor(ClubData.getInstance().renewTimer / 3600) : Math.floor(ClubData.getInstance().renewTimer / 3600) + "";
                this._renewMinute.text = ((ClubData.getInstance().renewTimer % 3600) / 60) < 10 ? "0" + (ClubData.getInstance().renewTimer % 3600) / 60 : (ClubData.getInstance().renewTimer % 3600) / 60 + "";
            }
            if (!ClubData.getInstance().isClubOwner) {
                this._resetRenewBtn.visible = false;
                this._resetSuspendBtn.visible = false;
                this._sureBtn.visible = false;
            } else {
                this._resetRenewBtn.visible = true;
                this._resetSuspendBtn.visible = true;
                this._sureBtn.visible = true;
            }
        }

        /**事件监听 */
        protected addEvent(): void {
            this._suspendHour.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._suspendMinute.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this._renewHour.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._renewMinute.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected removeEvent(): void {
            this._suspendHour.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._suspendMinute.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this._renewHour.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._renewMinute.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected destroy(): void {
            super.destroy();
        }
        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._sureBtn:
                    this.sendTimer();
                    super.removePop();
                    break;
                case this._resetSuspendBtn:
                    this._suspendHour.text = "";
                    this._suspendMinute.text = "";
                    break;
                case this._resetRenewBtn:
                    this._renewHour.text = "";
                    this._renewMinute.text = "";
                    break;
            }
        }
        /**输入框判断 */
        private onHourTextFocusOut(event: egret.FocusEvent): void {
            if ((<eui.EditableText>event.target).text != "" && Number((<eui.EditableText>event.target).text) < 24) {
                if (Number((<eui.EditableText>event.target).text) < 10) {
                    (<eui.EditableText>event.target).text = "0" + Number((<eui.EditableText>event.target).text);
                }
            } else {
                (<eui.EditableText>event.target).text = "";
            }
        }
        /**输入框判断 */
        private onMinuteTextFocusOut(event: egret.FocusEvent): void {
            if ((<eui.EditableText>event.target).text != "" && Number((<eui.EditableText>event.target).text) < 60) {
                if (Number((<eui.EditableText>event.target).text) < 10) {
                    (<eui.EditableText>event.target).text = "0" + Number((<eui.EditableText>event.target).text);
                }
            } else {
                (<eui.EditableText>event.target).text = "";
            }
        }
        /**发送时间 */
        private sendTimer(): void {
            let seq: Cmd.SetPauseTimerMatchGroupCmd_CS = new Cmd.SetPauseTimerMatchGroupCmd_CS;
            seq.matchId = ClubData.getInstance().matchid;
            if (this._suspendHour.text != "" || this._suspendMinute.text != "") {
                seq.pauseTimer = Number(this._suspendHour.text) * 3600 + Number(this._suspendMinute.text) * 60
            }
            if (this._renewHour.text != "" || this._renewMinute.text != "") {
                seq.restoreTimer = Number(this._renewHour.text) * 3600 + Number(this._renewMinute.text) * 60
            }
            let timee = (seq.pauseTimer / 3600).toFixed(0) + "小时" + ((seq.pauseTimer % 3600) / 60) + "分钟";
            NetMgr.tcpSend(seq);
        }
    }
}