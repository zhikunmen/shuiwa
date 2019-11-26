module match {
    export class HpwMatchWait extends eui.Component {

        public gameType_lbl: eui.Label;
        public condition_lbl: eui.Label;
        public exit_btn: match.BaseButton;
        public num_grp: eui.Group;
        public num_lbl: eui.Label;
        public time_lbl: eui.Label;

        private _timer: egret.Timer;
        private _info: Cmd.WaitListHpMatchCmd_Brd

        constructor(data: Cmd.WaitListHpMatchCmd_Brd) {
            super();
            this._info = data;
            this.skinName = "HpwMatchWaitSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.exit_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);
            this.update(this._info);
        }

        /**更新 */
        public update(data: Cmd.WaitListHpMatchCmd_Brd) {
            if (data) {
                let config = table.getMatchConfigBySceneId(data.sceneId);
                this.gameType_lbl.text = config.HaoPaiMatchName;
                this.num_lbl.text = config.MatchPlayerNumber == 6 ? data.curUserNbr + "/6" : config.MatchPlayerNumber.toString();
                for (let i = 0; i < data.curUserNbr; i++) {
                    if (i < this.num_grp.numChildren) {
                        let img = <eui.Image>this.num_grp.getChildAt(i);
                        img.source = "position_seat_png";
                    }
                }
                if (config.MatchPlayerNumber == 6) {
                    this.condition_lbl.text = "满6人开赛";
                }
                else {
                    this.condition_lbl.text = "限时赛";
                }

                this.time_lbl.text = data.timestamp.toString();
                if (this._timer) {
                    this._timer.stop();
                    this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
                    this._timer = null;
                }
                this._timer = new egret.Timer(1000, data.timestamp);
                this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
                this._timer.start();
            }
        }

        private onTimerHandler(evt: egret.TimerEvent) {
            this.time_lbl.text = this._timer.repeatCount - this._timer.currentCount + "";
            if (this._timer.currentCount == this._timer.repeatCount) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
        }

        private onExitHandler(evt: egret.TouchEvent){
            uniLib.PopUpMgr.addPopUp(HpwMatchWaitConfirm, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
        }

        public destroy() {
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
            this._timer = null;
            this.exit_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);
            uniLib.PopUpMgr.removePopUp(this);
        }
    }
}