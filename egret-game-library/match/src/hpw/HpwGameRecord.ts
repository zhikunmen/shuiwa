module match {
    /**
     * 好牌网比赛战绩
     */
    export class HpwGameRecord extends eui.Component {

        public gameRecord_rbtn: eui.RadioButton;
        public winRecord_rbtn: eui.RadioButton;
        public close_btn: match.BaseButton;
        public record_lst: eui.List;

        constructor() {
            super();
            this.skinName = "HpwGameRecordSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            uniLib.Global.addEventListener(match.EVENT_HISTORY, this.onEventHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent){
            if(evt.target == this.gameRecord_rbtn){

            }
            else if(evt.target == this.winRecord_rbtn){

            }
            else if(evt.target == this.close_btn){
                uniLib.PopUpMgr.removePopUp(this);
            }
        }

        private onEventHandler(evt: uniLib.ZqEvent) {
            let param: Cmd.RequestHistoryHpMatchCmd_S = evt.param;
            this.record_lst.dataProvider = new eui.ArrayCollection(param.historys.length ? param.historys : []);
            this.record_lst.dataProviderRefreshed();
        }

        public destroy() {
            uniLib.Global.removeEventListener(match.EVENT_HISTORY, this.onEventHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}