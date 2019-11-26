module match {
    /**淘汰赛匹配等待界面 */
    export class WxEliminateWait extends eui.Component {
        public bg_img: eui.Image;
        public title_lbl: eui.Label;
        public pro_img: eui.Image;
        public num_blbl: eui.BitmapLabel;
        public close_btn: eui.WxButton;
        public eliminate_grp: eui.Group;
        public num_lbl: eui.Label;
        public timer_lbl: eui.Label;
        public reward_grp: eui.Group;

        private _mask: egret.Shape;
        private _data: Cmd.WaitListHpMatchCmd_Brd;
        private _indexArr: number[] = [];
        /**当前人数 */
        private _curNum: number = 0;

        private _timer: egret.Timer;

        constructor(data: Cmd.WaitListHpMatchCmd_Brd) {
            super();
            this._data = data;
            this.width = uniLib.Global.screenWidth;
            this.skinName = "WxEliminateWaitSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            uniLib.Global.addEventListener(match.EVENT_MATCH_RNTER_ROOM, this.numberFullHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onExitHandler, this);

            let data = this._data;
            if (Array.isArray(data.rewards)) {
                for (let i = 0; i < this.reward_grp.numChildren; i++) {
                    let btn = <eui.Button>this.reward_grp.getChildAt(i);
                    if (data.rewards[i] && data.rewards[i].goodNbr) {
                        if (i + 1 == this.reward_grp.numChildren)
                            btn.label = data.rewards[i].goodNbr + "+";
                        else
                            btn.label = "x" + data.rewards[i].goodNbr;
                    }
                    else
                        btn.visible = false;
                }
            }

            let config = table.getMatchConfigBySceneId(data.sceneId);
            this.num_lbl.text = config.MatchPlayerNumber.toString();
            this.title_lbl.text = `满${config.MatchPlayerNumber}人开赛`;
            for (let i = 0; i < config.riseRank.length; i++) {
                this["num" + i] && (this["num" + i].text = config.riseRank[i]);
            }

            this.timer_lbl.text = `正在防作弊匹配中...${data.timestamp}`;
            this._timer = new egret.Timer(1000, data.timestamp);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();

            this._mask = new egret.Shape();
            this.eliminate_grp.addChild(this._mask);
            this.update(data);
        }

        private onTimer(evt: egret.Timer) {
            this.timer_lbl.text = `正在防作弊匹配中...${this._timer.repeatCount - this._timer.currentCount}`;
            if (this._timer.currentCount == this._timer.repeatCount) {
                this._timer.stop();
            }
        }

        /**更新 */
        public update(data: Cmd.WaitListHpMatchCmd_Brd) {
            this._data = data;
            this.num_blbl.text = data.curUserNbr.toString();
            let config = table.getMatchConfigBySceneId(data.sceneId);
            if (data.curUserNbr >= config.MatchPlayerNumber) {
                this._indexArr.forEach((value) => { egret.clearTimeout(value) });
                this._indexArr = [];
                this._mask.graphics.clear();
                this._mask.visible = false;
                this.pro_img.mask = null;
            }
            else {
                if (this._curNum > 0) {
                    let endAngle = (data.curUserNbr / config.MatchPlayerNumber) * Math.PI * 2 - Math.PI / 2;
                    this._indexArr.forEach((value) => { egret.clearTimeout(value) });
                    this._indexArr = [];
                    this.drawMask(endAngle);
                }
                else {
                    for (let i = this._curNum; i < data.curUserNbr; i++) {
                        let endAngle = (i / config.MatchPlayerNumber) * Math.PI * 2 - Math.PI / 2;
                        this._indexArr.push(egret.setTimeout(this.drawMask, this, 40 * i, [endAngle]));
                    }
                }
            }
            this._curNum = data.curUserNbr;
        }

        private drawMask(endAngle: number) {
            let config = table.getMatchConfigBySceneId(this._data.sceneId);
            let r = this.pro_img.width / 2;
            let gc = this._mask.graphics;
            gc.clear();
            gc.beginFill(0xff0000);
            gc.moveTo(this.eliminate_grp.width / 2, this.pro_img.y + r);
            gc.lineTo(this.eliminate_grp.width / 2, this.pro_img.y);
            gc.drawArc(this.eliminate_grp.width / 2, this.pro_img.y + r, r, -Math.PI / 2, endAngle, false);
            gc.lineTo(this.eliminate_grp.width / 2, this.pro_img.y + r);
            gc.endFill();
            this.pro_img.mask = this._mask;
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

        /**进入房间直接显示人数已满 */
        public numberFullHandler() {
            this._indexArr.forEach((value) => { egret.clearTimeout(value) });
            this._indexArr = [];
            this._mask.graphics.clear();
            this._mask.visible = false;
            this.pro_img.mask = null;
            let config = table.getMatchConfigBySceneId(this._data.sceneId);
            this.num_blbl.text = config.MatchPlayerNumber.toString();
        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        public destroy() {
            this._indexArr.forEach((value) => { egret.clearTimeout(value) });
            this._indexArr = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer = null;
            }
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onEventHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.WX_ONSHOW, this.onEventHandler, this);
            uniLib.Global.removeEventListener(match.EVENT_MATCH_RNTER_ROOM, this.numberFullHandler, this);
            this._data = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onExitHandler, this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}