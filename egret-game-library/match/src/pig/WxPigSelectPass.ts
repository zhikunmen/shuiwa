module match {
    export class WxPigSelectPass extends eui.Component {
        public ret_btn: eui.WxButton;
        public top_skin: match.WxTopOpBtn;
        public chall_btn: eui.WxButton;
        public againChall_btn: eui.WxButton;
        public title_lbl: eui.Label;
        public reward_lbl: eui.Label;
        public gold_lbl: eui.Label;
        public pro_lbl: eui.Label;
        public sel_lst: eui.List;

        private _data: Cmd.ChallengeInfo;
        private _gameId: number;

        constructor(data: { info: Cmd.ChallengeInfo, gameId: number }) {
            super();
            this._gameId = data.gameId;
            this._data = data.info;
            this.width = uniLib.Global.screenWidth;
            this.skinName = "WxPigSelectPassSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.chall_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.againChall_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sel_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);

            let unlock = 0;
            let pass = 0;
            for (let i = 0, len = this._data.items.length; i < len; i++) {
                if (this._data.items[i].unlock) {
                    unlock++;
                }
                if (this._data.items[i].pass)
                    pass++;
            }

            this.pro_lbl.text = `挑战进度${unlock}/${this._data.items.length}`;
            this.sel_lst.itemRenderer = WxPigPassItem;
            this.sel_lst.dataProvider = new eui.ArrayCollection(this._data.items);
            /**已经通关 找金币最够得那一关 否则找能打的最大关*/
            if (pass == this._data.items.length) {
                let i = this._data.items.length - 1
                for (; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= this._data.items[i].rewards[0].goodNbr) {
                        this.sel_lst.selectedIndex = i;
                        this.initComp(this._data.items[i]);
                        break;
                    }
                }
                if (i < 0) {
                    this.sel_lst.selectedIndex = 0;
                    this.initComp(this._data.items[0]);
                }
            }
            else {
                this.sel_lst.selectedIndex = unlock - 1;
                this.initComp(this._data.items[unlock - 1]);
            }
        }

        private initComp(data: Cmd.RoundItem) {
            this.title_lbl.text = `第${data.round}关`;
            if (data.pass) {
                this.againChall_btn.visible = true;
                this.chall_btn.visible = false;
            }
            else {
                this.againChall_btn.visible = false;
                this.chall_btn.visible = true;
            }
            let goodNbr = data.signFee[0].goodNbr;
            this.gold_lbl.text = goodNbr > 10000 ? (Math.floor(goodNbr / 10000) + "万") : goodNbr.toString();
            if (this._data.type == 1) {
                this.reward_lbl.text = "银猪x" + data.rewards[0].goodNbr;
            }
            else if (this._data.type == 2) {
                this.reward_lbl.text = "金猪x" + data.rewards[0].goodNbr;
            }
        }

        private onItemTap(evt: eui.PropertyEvent) {
            let data: Cmd.RoundItem = this.sel_lst.selectedItem;
            this.initComp(data);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.chall_btn || evt.target == this.againChall_btn) {
                let data: Cmd.RoundItem = this.sel_lst.selectedItem;
                let str = "";
                if (this._data.type == 2) {
                    str = "金猪";
                }
                else if (this._data.type == 1) {
                    str = "银猪";
                }
                let config = data.signFee;
                if (Array.isArray(config) && judgeItemIsEnough(config[0].goodId, config[0].goodNbr)) {
                    OnEnterChallengeHpMatchCmd_C(this._data.type, data.round, this._gameId);
                    wxgame.Global.instance.aldSendEvent("金币场", str);
                }
                else {
                    uniLib.PopUpMgr.removePopUp(this);
                }
            }
        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        public destroy() {
            this._gameId = null;
            this._data = null;
            this.top_skin.destroy();
            this.top_skin = null;
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.chall_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.againChall_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sel_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
        }
    }
}