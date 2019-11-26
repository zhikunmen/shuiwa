module match {
    /**闯关 */
    export class WxPigRushThrough extends eui.Component {
        public bg_img: eui.Image;
        public ret_btn: eui.WxButton;
        public top_skin: match.WxTopOpBtn;
        public rule_btn: eui.WxButton;
        public silverPig_btn: eui.WxButton;
        public goldPig_btn: eui.WxButton;
        public cardRush_btn: eui.WxButton;
        public diamondRush_btn: eui.WxButton;
        public goldRush_btn: eui.WxButton;
        public rbtnBg_img: eui.Image;
        public cardRush_rbtn: eui.RadioButton;
        public goldRush_rbtn: eui.RadioButton;

        /**这里保存gameId是为了区分麻将和跑得快 */
        private _gameId: number;
        /**金猪银猪 */
        private _pigData: Cmd.ChallengeInfo[];
        /**金币福卡钻石 */
        private _rushData: Cmd.RushInfo[];

        constructor(info: { data: any, gameId: number }) {
            super();
            this._gameId = info.gameId;
            if (info.data && info.data[0].items) {
                this._pigData = info.data;
            }
            else {
                this._rushData = info.data;
            }
            this.width = uniLib.Global.screenWidth;
            this.skinName = "WxPigRushThroughSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.addEventListener(match.EVENT_PIG_DATA, this.onPigData, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.silverPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldPig_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.diamondRush_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldRush_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onRbtnChange, this);

            this.setData(this._rushData ? this._rushData : this._pigData);
            this._rushData ? this.cardRush_rbtn.selected = true : this.goldRush_rbtn.selected = true;
            this.rule_btn.visible = match.WxTopOpBtn.HAS_HPW_MATCH;

            if (uniLib.Global.isWxGame()) {
                this.rbtnBg_img.visible = false;
                this.cardRush_rbtn.visible = false;
                this.goldRush_rbtn.visible = false;
            }else if(uniLib.Global.isNative){
                if(uniLib.Global.is_sandbox != 0){
                    this.goldRush_rbtn.visible = false;
                    this.cardRush_rbtn.visible = false;
                    this.rbtnBg_img.visible = false;
                }
            }

        }

        private setData(data) {
            if (data && data[0].items) {
                this._pigData = data;
                this.goldPig_btn.visible = true;
                this.silverPig_btn.visible = true;
                this.cardRush_btn.visible = false;
                this.goldRush_btn.visible = false;
                this.diamondRush_btn.visible = false;
            }
            else {
                this._rushData = data;
                for (let i = 0; i < data.length; i++) {
                    let info = data[i] as Cmd.RushInfo;
                    if (info.type == 1) {
                        this.cardRush_btn.label = info.round ? `当前关数：${info.round}` : `报名：福卡x${info.signFee[0].goodNbr}`;
                    }
                    else if (info.type == 2) {
                        this.goldRush_btn.label = info.round ? `当前关数：${info.round}` : `报名：金币x${info.signFee[0].goodNbr}`;;
                    }
                    else if (info.type == 3) {
                        this.diamondRush_btn.label = info.round ? `当前关数：${info.round}` : `报名：钻石x${info.signFee[0].goodNbr}`;;
                    }
                }
                this.goldPig_btn.visible = false;
                this.silverPig_btn.visible = false;
                this.cardRush_btn.visible = true;
                this.goldRush_btn.visible = true;
                this.diamondRush_btn.visible = true;
            }
        }

        /**数据 */
        private onPigData(evt?: uniLib.ZqEvent) {
            this.setData(evt.param);
        }

        private onRbtnChange(evt: eui.UIEvent) {
            let target: eui.RadioButtonGroup = evt.target
            let value = parseInt(target.selectedValue);
            if (value == 1) {
                if (!this._rushData) {
                    OnGetSceneInfoHpMatchCmd_C(BigSceneType.TYPE_RUSH, GameId.ID_COIN_FOUCA);
                }
                else {
                    this.setData(this._rushData);
                }
            }
            else if (value == 2) {
                if (!this._pigData) {
                    OnGetSceneInfoHpMatchCmd_C(BigSceneType.TYPE_PIG, GameId.ID_MATCH_PIG);
                }
                else {
                    this.setData(this._pigData);
                }
            }
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.silverPig_btn || evt.target == this.goldPig_btn) {
                let type = parseInt(evt.target.name);
                for (let i = 0; i < this._pigData.length; i++) {
                    if (this._pigData[i].type == type) {
                        uniLib.PopUpMgr.addPopUp(WxPigSelectPass, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { info: this._pigData[i], gameId: GameId.ID_MATCH_PIG });
                        break;
                    }
                }
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(WxGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this.cardRush_rbtn.selected ? SceneType.TYPE_FUKA : SceneType.TYPE_PIG);
            }
            else if (evt.target == this.cardRush_btn || evt.target == this.goldRush_btn || evt.target == this.diamondRush_btn) {
                let type = parseInt(evt.target.name);
                for (let i = 0; i < this._rushData.length; i++) {
                    if (this._rushData[i].type == type) {
                        // if (this._rushData[i].round) {
                        //     OnEnterRushHpMatchCmd_C(type, GameId.ID_COIN_FOUCA);
                        // }
                        // else {
                        LoadPanelTipMgr.getInstance().loadRes(MatchConst.HPW_RUSH, () => {
                            uniLib.PopUpMgr.addPopUp(WxRushGameDetail, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { info: this._rushData[i], gameId: this._gameId });
                        });
                        // }
                        break;
                    }
                }
            }
        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        public destroy() {
            this._pigData = null;
            this._rushData = null;
            this.top_skin.destroy();
            this.top_skin = null;
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            uniLib.Global.removeEventListener(match.EVENT_PIG_DATA, this.onPigData, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.silverPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldPig_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.diamondRush_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.goldRush_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.cardRush_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onRbtnChange, this);
        }
    }
}