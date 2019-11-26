module match {
    /**匹配等待界面 */
    export class WxMatchWait extends eui.Component {
        public bg_img: eui.Image;
        public expectTime_lbl: eui.Label;
        public condition_lbl: eui.Label;
        public title_lbl: eui.Label;
        public time_lbl: eui.BitmapLabel;
        public num_grp: eui.Group;
        public close_btn: eui.WxButton;

        private _matchType: number;

        private _timer: egret.Timer;
        private _data: Cmd.WaitListHpMatchCmd_Brd

        constructor(data: Cmd.WaitListHpMatchCmd_Brd) {
            super();
            this._data = data;
            this.width = uniLib.Global.screenWidth;
            this._matchType = table.getMatchConfigBySceneId(this._data.sceneId).HaoPaiMatchType;
            this.skinName = "WxMatchWaitSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);
            wxgame.Global.instance.createBannerAd("", { left: 0 });
            this.update(this._data);
        }

        /**更新 */
        public update(data: Cmd.WaitListHpMatchCmd_Brd) {
            this._data = data;
            if (data) {
                let config = table.getMatchConfigBySceneId(data.sceneId);
                this.title_lbl.text = config.HaoPaiMatchName;

                for (let i = 0; i < this.num_grp.numChildren; i++) {
                    let btn = <eui.WxButton>this.num_grp.getChildAt(i);
                    if (i < data.curUserNbr) {
                        /**自己 */
                        if (i == 0) {
                            btn.skin["head_img"].source = uniLib.UserInfo.headUrl;
                            btn.skin["mask_img"].source = "bs_pipei_kuang1_png";
                            btn.label = uniLib.UserInfo.nickName;
                            btn.skin["labelDisplay"].textColor = 0xffffff;
                        }
                        else {
                            btn.skin["head_img"].source = "bs_pipei_touxiang1_png";
                            btn.skin["mask_img"].source = "bs_pipei_kuang1_png";
                            btn.label = "玩家" + (i + 1);
                            btn.skin["labelDisplay"].textColor = 0xffffff;
                        }
                    }
                    else {
                        btn.skin["head_img"].source = "bs_pipei_touxiang_png";
                        btn.skin["mask_img"].source = "bs_pipei_kuang_png";
                        btn.label = "匹配中...";
                        btn.skin["labelDisplay"].textColor = 0xffcc00;
                    }
                }
                if (config.MatchPlayerNumber == 6) {
                    this.condition_lbl.text = "满6人开赛";
                }
                else {
                    this.condition_lbl.text = "限时赛";
                }
                if (!this._timer) {
                    this._timer = new egret.Timer(1000, 120);
                    this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
                    this._timer.start();
                }
            }
        }

        private onTimerHandler(evt: egret.TimerEvent) {
            this.time_lbl.text = this._timer.currentCount + 's';
            if (this._timer.currentCount == this._timer.repeatCount) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
        }

        private onExitHandler(evt: egret.TouchEvent) {
            let confirm = new commonConfirm.ConfirmPanel("返回大厅将会取消报名，是否要返回？", null, null, OnRequestExitHpMatchCmd_C, () => { });
            uniLib.PopUpMgr.addPopUp(confirm, egret.MainContext.instance.stage, true, true, 0, uniLib.PopUpEffect.CENTER);
        }

        private onEventHandler(evt: uniLib.ZqEvent) {
            if (evt.type == uniLib.ZqEvent.ON_RECONNEC) {
                OnRequestExitHpMatchCmd_C(1);
            }
            else if (evt.type == uniLib.ZqEvent.WX_ONSHOW) {
                OnRequestExitHpMatchCmd_C(2);
            }
        }

        public numberFullHandler() {

        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        public destroy() {
            wxgame.Global.instance.destroyBannerAd();
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimerHandler, this);
            }
            this._timer = null;
            this._data = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onExitHandler, this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}