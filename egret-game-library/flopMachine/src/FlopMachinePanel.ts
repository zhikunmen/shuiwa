module FlopMachine {
    /**
     * 翻牌机
     */
    export class FlopMachinePanel extends eui.Component {

        public top_skin: match.WxTopOpBtn;
        /**筹码按钮 */
        public chip1_btn: eui.Button;
        public chip2_btn: eui.Button;
        public chip3_btn: eui.Button;
        public chip4_btn: eui.Button;
        public chip5_btn: eui.Button;
        public chip6_btn: eui.Button;

        public bg_img: eui.Image;
        public rule_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public image: eui.Image;
        public cancelHang_btn: eui.Button;
        public begin_btn: eui.Button;
        public hang_btn: eui.Button;
        public guess_btn: eui.Button;

        public flop_grp: eui.Group;

        /**扑克牌 */
        public poker1: eui.Image;
        public poker2: eui.Image;
        public poker3: eui.Image;
        public poker4: eui.Image;
        public poker5: eui.Image;
        public light1: eui.Image;
        public light2: eui.Image;
        public light3: eui.Image;
        public light4: eui.Image;
        public light5: eui.Image;
        public retain1: eui.Image;
        public retain2: eui.Image;
        public retain3: eui.Image;
        public retain4: eui.Image;
        public retain5: eui.Image;

        public coinPond_blbl: eui.BitmapLabel;
        public lottery_grp: eui.Group;
        public lottery_img: eui.Image;
        public chipsDesc_lbl: eui.Label;
        public win_lbl: eui.Label;

        public cardType_grp: eui.Group;
        public cardType_lbl: eui.Label;

        /**编辑动画 */
        public sendcard_tween: egret.tween.TweenGroup;
        public open_tween: egret.tween.TweenGroup;
        public close_tween: egret.tween.TweenGroup;
        public win_tween: egret.tween.TweenGroup;
        public cardType_tween: egret.tween.TweenGroup;

        private _notice: LobbyNotice;
        /**金币动画 */
        private _coinArmature: dragonBones.Armature;
        /**是否在播放tween动画 解决tween回调优先点击事件执行的问题 */
        private _isTween: boolean = false;
        private _chipsBtnIsOpen: boolean = false;
        /**牌型奖金 */
        private _lotchips: number = 0;

        constructor() {
            super();
            this.skinName = "FlopMachinePanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            uniLib.SoundMgr.instance.pauseBgMusic();
            this.addEvents();
            NetMgr.tcpSend(new Cmd.GetJackpotLobbyCmd_C());
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            this.top_skin.ticket_btn.touchEnabled = false;
            this._notice = new LobbyNotice();
            this._notice.visible = false;
            this._notice.y = 88;
            this._notice.x = (this.width - this._notice.width) >> 1;
            this.addChild(this._notice);

            let chips = uniLib.Utils.getLocalStorage("fpjChips");
            this.chip5_btn.label = chips ? chips : "500";
            uniLib.Utils.setLocalStorage("fpjChips", this.chip5_btn.label);

            this.reset();
        }

        private reset() {
            for (let i = 1; i <= 5; i++) {
                this["retain" + i].visible = false;
                this["poker" + i].source = "flopMachine_json.fpj_card_back";
                this["poker" + i].name = i + "";
                this["poker" + i].touchEnabled = false;
                egret.Tween.removeTweens(this["light" + i]);
                this["light" + i].visible = false;
            }
            this.lottery_img.visible = false;
            this.guess_btn.visible = false;
            this.begin_btn.skin["type"].source = "flopMachine_json.fpj_word_start";
            this.begin_btn.name = "begin";
            this.begin_btn.enabled = false;
            this.chip5_btn.enabled = false;
            this.cardType_grp.visible = false;
            this.hang_btn.enabled = false;
            this.sendcard_tween.play(0);
        }

        private addEvents(): void {
            uniLib.Global.addEventListener(CLOSE_GUESS, this.reset, this);
            uniLib.Global.addEventListener(FlopMachine.JACKPOT, this.onUpJackPot, this);
            this.sendcard_tween.addEventListener(egret.Event.COMPLETE, this.onSendCardComplete, this);
            this.open_tween.addEventListener(egret.Event.COMPLETE, this.onOpen, this);
            this.close_tween.addEventListener(egret.Event.COMPLETE, this.onClose, this);
            uniLib.Global.addEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.addEventListener(FlopMachine.TURN, this.onTurn, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private removeEvents(): void {
            uniLib.Global.removeEventListener(CLOSE_GUESS, this.reset, this);
            uniLib.Global.removeEventListener(FlopMachine.JACKPOT, this.onUpJackPot, this);
            this.sendcard_tween.removeEventListener(egret.Event.COMPLETE, this.onSendCardComplete, this);
            this.open_tween.removeEventListener(egret.Event.COMPLETE, this.onOpen, this);
            this.close_tween.removeEventListener(egret.Event.COMPLETE, this.onClose, this);
            uniLib.Global.removeEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.removeEventListener(FlopMachine.TURN, this.onTurn, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private onUpJackPot(evt: uniLib.ZqEvent) {
            let info: Cmd.GetJackpotLobbyCmd_S = evt.param;
            this.coinPond_blbl.text = ("0000000000" + info.jackpot).slice(-10);
        }

        /**发牌动画结束 */
        private onSendCardComplete() {
            this.hang_btn.enabled = true;
            this.hang_btn.visible && (this.begin_btn.enabled = true);
            this.chip5_btn.enabled = true;
        }

        private onOpen() {
            this._chipsBtnIsOpen = true;
        }

        private onClose() {
            this.chipsDesc_lbl.visible = true;
            this._chipsBtnIsOpen = false;
        }

        /**取分 */
        private onGetChips(evt: uniLib.ZqEvent) {
            let info: Cmd.GetLotchipsLobbyCmd_S = evt.param;
            this.win_lbl.text = "+" + info.chips;
            this.win_tween.play(0);
            this.begin_btn.enabled = false;
            this.guess_btn.visible = false;
            if (!uniLib.PopUpMgr.hasPopup(FlopMachineGuess)) {
                if (!this._coinArmature) {
                    this._coinArmature = uniLib.DragonUtils.createDragonBonesDisplay("jinbi_ske_json", "jinbi_tex_json", "jinbi_tex_png", uniLib.DragonType.ARMATURE);
                    this._coinArmature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                    this._coinArmature.display.x = this.width >> 1;
                    this._coinArmature.display.y = this.height >> 1;
                }
                this.addChild(this._coinArmature.display);
                uniLib.DisplayUtils.runDragonBonesArmature(this._coinArmature, "newAnimation");
                uniLib.SoundMgr.instance.playSound(SOUND_COIN);
            }
        }

        private onComplete() {
            this.reset();
            uniLib.DisplayUtils.removeFromParent(this._coinArmature.display);
            this._coinArmature.animation.stop();
        }

        /**
         * 发牌 换牌
         */
        private onTurn(evt: uniLib.ZqEvent) {
            let info: Cmd.TurnLobbyCmd_S = evt.param;
            if (info.type == 1) {
                this._chipsBtnIsOpen && this.close_tween.play(0);
                this.chip5_btn.enabled = false;
                this.begin_btn.enabled = false;
                this.hang_btn.enabled = false;
                for (let i = 0; i < info.cards.length; i++) {
                    let img: eui.Image = this["poker" + (i + 1)];
                    if (img) {
                        let str = info.cards[i].toString();
                        this._isTween = true;
                        egret.Tween.get(img).wait(i * 200).call(() => { uniLib.SoundMgr.instance.playSound(SOUND_FANPAI) }, this).to({ scaleX: 0 }, 200).to({ source: `Poker_${str.slice(1, str.length)}` }).to({ scaleX: 1 }, 200).call(() => {
                            if (i + 1 == info.cards.length) {
                                this._isTween = false;
                                this.begin_btn.skin["type"].source = "flopMachine_json.fpj_word_jixu";
                                this.begin_btn.name = "continue";
                                this.hang_btn.enabled = true;
                                this.hang_btn.visible && (this.begin_btn.enabled = true);
                            }
                            img.touchEnabled = true;
                            if (info.autostay && info.autostay.indexOf(info.cards[i]) != -1) {
                                this["retain" + img.name] && (this["retain" + img.name].visible = true);
                            }
                            img.name = info.cards[i] + "";
                            this["light" + (i + 1)] && (this["light" + (i + 1)].name = "light" + img.name);
                        }, this);
                    }
                }
            }
            else if (info.type == 2) {
                this._isTween = true;
                this.hang_btn.enabled = false;
                this.begin_btn.enabled = false;
                let time: number = 1000;
                if (Array.isArray(info.cards)) {
                    time = info.cards.length * 200 + 550;
                    let k = 1;
                    for (let i = 0; i < info.cards.length; i++) {
                        for (; k <= 5; k++) {
                            let img: eui.Image = this["retain" + k];
                            if (!img.visible) {
                                let str = info.cards[i].toString();
                                this["poker" + k].source = "flopMachine_json.fpj_card_back";
                                egret.Tween.get(this["poker" + k]).wait(i * 200 + 150).call(() => { uniLib.SoundMgr.instance.playSound(SOUND_FANPAI) }, this).to({ scaleX: 0 }, 200).to({ source: `Poker_${str.slice(1, str.length)}` }).to({ scaleX: 1 }, 200);
                                this["poker" + k].name = info.cards[i] + "";
                                this["light" + k] && (this["light" + k].name = "light" + info.cards[i]);
                                k++;
                                break;
                            }
                        }
                    }
                }
                egret.Tween.get(this).wait(time).call(this.lotteryInfo, this, [info.lotteryInfo]);
            }
        }

        /**
         * 开奖信息
         */
        private lotteryInfo(info: Cmd.LotteryInfo) {
            if (info.cardtype == Cmd.CARD_TYPE.Scattered) {
                uniLib.SoundMgr.instance.playSound(SOUND_FANPAI_LOSE);
                this.reset();
            }
            else {
                uniLib.SoundMgr.instance.playSound(SOUND_FANPAI_WIN);
                this._lotchips = info.lotchips;

                this.cardType_grp.visible = true;
                this.cardType_lbl.text = this.getCardType(info.cardtype);
                this.cardType_tween.play(0);

                for (let i = 0; i < info.cards.length; i++) {
                    let light = this.flop_grp.getChildByName("light" + info.cards[i]);
                    light && egret.Tween.get(light, { loop: true }).to({ visible: true }).wait(500).to({ visible: false }).wait(500);
                }

                let lb = this.lottery_grp.getChildByName("type" + info.cardtype);
                this.lottery_img.x = lb.x - 24;
                this.lottery_img.y = lb.y;
                this.lottery_img.visible = true;
                /**猜大小或者取分 */
                this.begin_btn.skin["type"].source = "flopMachine_json.fpj_word_qufen";
                this.begin_btn.name = "qufen";
                this._isTween = false;
                this.hang_btn.visible && (this.begin_btn.enabled = true);
                this.hang_btn.enabled = true;
                this.guess_btn.visible = true;
                //触发彩金 自动取消挂机
                if (info.rewardchips && Array.isArray(info.chips)) {
                    LoadPanelTipMgr.getInstance().loadRes(FlopMachineConsts.BONUS_POOL, () => {
                        this.hang_btn.visible = true;
                        this.cancelHang_btn.visible = false;
                        uniLib.PopUpMgr.addPopUp(FlopMachineBonusPool, null, true, true, false, uniLib.PopUpEffect.NOMAL, 0, 0, info);
                    })
                }
            }
        }

        private getCardType(type: Cmd.CARD_TYPE) {
            let typeArr = ["", "", "一对10以上", "两对", "三条", "顺子", "同花", "葫芦", "四条", "同花顺", "同花大顺", "五条"];
            return typeArr[type] ? typeArr[type] : "";
        }

        /**
         * 点击事件
         */
        private onTouchHandle(evt: egret.TouchEvent): void {
            let target: any = evt.target;
            if (target == this.chip5_btn) {
                this._chipsBtnIsOpen ? this.close_tween.play(0) : (this.open_tween.play(0), this.chipsDesc_lbl.visible = false);
            }
            else if (target == this.close_btn) {
                let req = new Cmd.ExitSalvoLobbyCmd_C();
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.guess_btn) {
                uniLib.PopUpMgr.addPopUp(FlopMachineGuess, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, this._lotchips);
            }
            else if (target == this.chip1_btn || target == this.chip2_btn || target == this.chip3_btn || target == this.chip4_btn || target == this.chip6_btn) {
                this.chip5_btn.label = target.name;
                uniLib.Utils.setLocalStorage("fpjChips", this.chip5_btn.label);
                this.close_tween.play(0);
            }
            else if (target == this.poker1 || target == this.poker2 || target == this.poker3 || target == this.poker4 || target == this.poker5) {
                uniLib.SoundMgr.instance.playSound(SOUND_BAOLIU);
                target == this.poker1 && (this.retain1.visible = !this.retain1.visible)
                target == this.poker2 && (this.retain2.visible = !this.retain2.visible)
                target == this.poker3 && (this.retain3.visible = !this.retain3.visible)
                target == this.poker4 && (this.retain4.visible = !this.retain4.visible)
                target == this.poker5 && (this.retain5.visible = !this.retain5.visible)
            }
            else if (target == this.hang_btn) {
                this.hang_btn.visible = false;
                this.cancelHang_btn.visible = true;
                this.chip5_btn.enabled = false;
                let hang = new Cmd.HangUpLobbyCmd_C();
                hang.type = 1;
                hang.betchips = Number.parseInt(this.chip5_btn.label);
                NetMgr.tcpSend(hang);
            }
            else if (target == this.cancelHang_btn) {
                this.cancelHang_btn.visible = false;
                this.hang_btn.visible = true;
                !this._isTween && (this.begin_btn.enabled = true);
                let hang = new Cmd.HangUpLobbyCmd_C();
                hang.type = 2;
                NetMgr.tcpSend(hang);
            }
            else if (target == this.begin_btn) {
                uniLib.SoundMgr.instance.playSound(SOUND_START_BTN);
                if (target.name == "begin") {
                    if (uniLib.UserInfo.goldChips < Number.parseInt(this.chip5_btn.label)) {
                        uniLib.TipsUtils.showTipsDownToUp("您的金币已不足");
                    }
                    else {
                        let req = new Cmd.TurntLobbyCmd_C();
                        req.betchips = Number.parseInt(this.chip5_btn.label);
                        NetMgr.tcpSend(req);
                    }
                }
                else if (target.name == "qufen") {
                    NetMgr.tcpSend(new Cmd.GetLotchipsLobbyCmd_C());
                }
                else if (target.name == "continue") {
                    let req = new Cmd.TurntLobbyCmd_C();
                    req.stay = [];
                    for (let i = 1; i <= 5; i++) {
                        this["retain" + i].visible && req.stay.push(Number.parseInt(this["poker" + i].name));
                        this["poker" + i].touchEnabled = false;
                    }
                    NetMgr.tcpSend(req);
                }
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(FlopMachineRule, null, true, true, true, uniLib.PopUpEffect.CENTER);
            }
        }


        public destroy(): void {
            uniLib.SoundMgr.instance.resumeBgMusic();
            this.removeEvents();
            this._notice.destroy();
            this._notice = null;
            this.win_tween && this.win_tween.stop();
            egret.Tween.removeTweens(this.win_lbl);
            this.sendcard_tween && this.sendcard_tween.stop();
            this.open_tween && this.open_tween.stop();
            this.close_tween && this.close_tween.stop();
            this.cardType_tween && this.cardType_tween.stop();
            egret.Tween.removeTweens(this);
            for (let i = 1; i <= 5; i++) {
                egret.Tween.removeTweens(this["poker" + i]);
                egret.Tween.removeTweens(this["light" + i]);
            }
            if (this._coinArmature) {
                this._coinArmature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                uniLib.DisplayUtils.destoryDragonBonesArmature(this._coinArmature, "newAnimation");
            }
            this._coinArmature = null;
            this._chipsBtnIsOpen = null;
            this._lotchips = null;
            this._isTween = null;
        }
    }
}