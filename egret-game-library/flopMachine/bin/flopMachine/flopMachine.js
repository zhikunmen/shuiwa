var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var FlopMachine;
(function (FlopMachine) {
    /**
     * 翻牌机触发奖池
     */
    var FlopMachineBonusPool = (function (_super) {
        __extends(FlopMachineBonusPool, _super);
        function FlopMachineBonusPool(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "FlopMachineBonusPoolSkin";
            return _this;
        }
        FlopMachineBonusPool.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._rubCard = uniLib.DragonUtils.createDragonBonesDisplay("xipai_ske_json", "xipai_tex_json", "xipai_tex_png", uniLib.DragonType.ARMATURE);
            this._rubCard.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
            this._rubCard.display.x = 642;
            this._rubCard.display.y = 225;
            this._bonusPoolArmature = uniLib.DragonUtils.createDragonBonesDisplay("caijindajiang_ske_json", "caijindajiang_tex_json", "caijindajiang_tex_png", uniLib.DragonType.ARMATURE);
            this._bonusPoolArmature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onBonusPoolComplete, this);
            this._bonusPoolArmature.display.x = this.width >> 1;
            this._bonusPoolArmature.display.y = this.height >> 1;
            this.addChild(this._bonusPoolArmature.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._bonusPoolArmature, "newAnimation");
            if (this._info.chips.length >= 5) {
                this.one_btn.label = this._info.chips[0].toString();
                this.two_btn.label = this._info.chips[1].toString();
                this.three_btn.label = this._info.chips[2].toString();
                this.four_btn.label = this._info.chips[3].toString();
                this.five_btn.label = this._info.chips[4].toString();
                this.five_btn["max"].visible = true;
            }
        };
        /**
         * 彩金大奖动画播放完毕
         */
        FlopMachineBonusPool.prototype.onBonusPoolComplete = function () {
            uniLib.DisplayUtils.removeFromParent(this._bonusPoolArmature.display);
            this._bonusPoolArmature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onBonusPoolComplete, this);
            uniLib.DragonUtils.destoryDragonBonesArmature(this._bonusPoolArmature, "newAnimation");
            this._bonusPoolArmature = null;
            this.open.addEventListener('complete', this.onTweenGroupComplete, this);
            this.open.play(0);
        };
        /**
         * 动画组播放完成
         */
        FlopMachineBonusPool.prototype.onTweenGroupComplete = function () {
            var _this = this;
            egret.Tween.get(this.five_btn).to({ scaleX: 0 }, 200).to({ enabled: true }).call(function () { _this.five_btn["max"].visible = false; }, this).to({ scaleX: 1 }, 200).wait(900).to({ x: 642, y: 225, rotation: 0 }, 300);
            egret.Tween.get(this.three_btn).wait(100).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200).wait(800).to({ x: 642, y: 225, rotation: 0 }, 200);
            egret.Tween.get(this.one_btn).wait(200).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200);
            egret.Tween.get(this.two_btn).wait(300).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200).wait(600).to({ x: 642, y: 225, rotation: 0 }, 200);
            egret.Tween.get(this.four_btn).wait(400).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200).wait(500).to({ x: 642, y: 225, rotation: 0 }, 300).call(this.playRubbingCards, this);
        };
        /**播放洗牌动画 */
        FlopMachineBonusPool.prototype.playRubbingCards = function () {
            this.setVisible(false);
            this.addChild(this._rubCard.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._rubCard, "newAnimation");
        };
        /**
         * 洗牌动画动画播放完成
         */
        FlopMachineBonusPool.prototype.onComplete = function () {
            var _this = this;
            uniLib.DisplayUtils.removeFromParent(this._rubCard.display);
            this._rubCard.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
            uniLib.DragonUtils.destoryDragonBonesArmature(this._rubCard, "newAnimation");
            this._rubCard = null;
            this.setVisible(true);
            egret.Tween.get(this.two_btn).to({ x: 801, y: 252, rotation: 10 }, 200);
            egret.Tween.get(this.three_btn).to({ x: 478, y: 252, rotation: -10 }, 200);
            egret.Tween.get(this.four_btn).to({ x: 958, y: 298, rotation: 20 }, 300);
            egret.Tween.get(this.five_btn).to({ x: 320, y: 298, rotation: -20 }, 300).call(function () {
                _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouch, _this);
            }, this);
        };
        FlopMachineBonusPool.prototype.onTouch = function (evt) {
            var _this = this;
            var target = evt.target;
            if (target == this.one_btn || target == this.two_btn || target == this.three_btn || target == this.four_btn || target == this.five_btn) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
                var max_1 = Math.max.apply(Math, this._info.chips);
                var index = this._info.chips.indexOf(this._info.rewardchips);
                this._info.chips.splice(index, 1);
                this._info.chips.sort(function (a, b) {
                    return Math.random() > .5 ? -1 : 1;
                });
                target.label = this._info.rewardchips + "";
                this._info.rewardchips == max_1 && target["max"] && (target["max"].visible = true);
                egret.Tween.get(target).to({ scaleX: 0 }, 200).to({ enabled: false }).to({ scaleX: 1 }, 200).wait(200).call(function () {
                    uniLib.UserInfo.goldChips += _this._info.rewardchips;
                    target["kuang"] && (target["kuang"].visible = true);
                    var k = 0;
                    for (var i = 0; i < _this.btn_grp.numChildren; i++) {
                        var child = _this.btn_grp.getChildByName(i + "");
                        if (child && child != target) {
                            child.label = _this._info.chips[k] + "";
                            _this._info.chips[k] == max_1 && child["max"] && (child["max"].visible = true);
                            k++;
                            egret.Tween.get(child).to({ scaleX: 0 }, 200).to({ enabled: false }).to({ scaleX: 1 }, 200);
                        }
                    }
                    egret.Tween.get(_this).wait(2000).call(function () { uniLib.PopUpMgr.removePopUp(_this); }, _this);
                }, this);
            }
        };
        FlopMachineBonusPool.prototype.setVisible = function (vis) {
            this.one_btn.visible = vis;
            this.two_btn.visible = vis;
            this.three_btn.visible = vis;
            this.four_btn.visible = vis;
            this.five_btn.visible = vis;
        };
        FlopMachineBonusPool.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.open.removeEventListener('complete', this.onTweenGroupComplete, this);
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.one_btn);
            egret.Tween.removeTweens(this.two_btn);
            egret.Tween.removeTweens(this.three_btn);
            egret.Tween.removeTweens(this.four_btn);
            egret.Tween.removeTweens(this.five_btn);
            if (this._rubCard) {
                this._rubCard.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                uniLib.DisplayUtils.destoryDragonBonesArmature(this._rubCard, "newAnimation");
            }
            this._rubCard = null;
            if (this._bonusPoolArmature) {
                this._bonusPoolArmature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                uniLib.DisplayUtils.destoryDragonBonesArmature(this._bonusPoolArmature, "newAnimation");
            }
            this._bonusPoolArmature = null;
        };
        return FlopMachineBonusPool;
    }(eui.Component));
    FlopMachine.FlopMachineBonusPool = FlopMachineBonusPool;
    __reflect(FlopMachineBonusPool.prototype, "FlopMachine.FlopMachineBonusPool");
})(FlopMachine || (FlopMachine = {}));
var FlopMachine;
(function (FlopMachine) {
    var FlopMachineConsts = (function () {
        function FlopMachineConsts() {
        }
        FlopMachineConsts.RES_JSON = "resource/flopMachine/flopMachine.res_1a3c4cd.json";
        FlopMachineConsts.THM_JSON = "resource/flopMachine/gameEui_72b9276a.json";
        /**
         * 翻牌机
         */
        FlopMachineConsts.FLOP_MACHIN = "flopMachine";
        /**
         * 彩金
         */
        FlopMachineConsts.BONUS_POOL = "bonusPool";
        return FlopMachineConsts;
    }());
    FlopMachine.FlopMachineConsts = FlopMachineConsts;
    __reflect(FlopMachineConsts.prototype, "FlopMachine.FlopMachineConsts");
    /**开始按钮 */
    FlopMachine.SOUND_START_BTN = "start_btn_mp3";
    /**点击牌保留 */
    FlopMachine.SOUND_BAOLIU = "baoliu_btn_mp3";
    /**飞金币 */
    FlopMachine.SOUND_COIN = "coinAni_mp3";
    /**比大小 */
    FlopMachine.SOUND_BIDAXIAO_BG = "bidaxiao_bg_mp3";
    FlopMachine.SOUND_BIDAXIAO_LOSE = "daxiao_lose_mp3";
    FlopMachine.SOUND_BIDAXIAO_PING = "daxiao_ping_mp3";
    FlopMachine.SOUND_BIDAXIAO_WIN = "daxiao_win_mp3";
    /**翻牌声 */
    FlopMachine.SOUND_FANPAI = "fanpai_mp3";
    FlopMachine.SOUND_FANPAI_LOSE = "fanpai_lose_mp3";
    FlopMachine.SOUND_FANPAI_WIN = "fanpai_win_mp3";
})(FlopMachine || (FlopMachine = {}));
var FlopMachine;
(function (FlopMachine) {
    /**
     * 翻牌机猜大小
     */
    var FlopMachineGuess = (function (_super) {
        __extends(FlopMachineGuess, _super);
        function FlopMachineGuess(lotchips) {
            if (lotchips === void 0) { lotchips = 0; }
            var _this = _super.call(this) || this;
            _this._lotchips = lotchips;
            _this.skinName = "FlopMachineGuessSkin";
            return _this;
        }
        FlopMachineGuess.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_BIDAXIAO_BG, 0);
            this.addEvents();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            this.top_skin.ticket_btn.touchEnabled = false;
            this._notice = new LobbyNotice();
            this._notice.visible = false;
            this._notice.y = 88;
            this._notice.x = (this.width - this._notice.width) >> 1;
            this.addChild(this._notice);
            this.win_lbl.text = this._lotchips + "";
            this._timer = new egret.Timer(200, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this.reset();
        };
        FlopMachineGuess.prototype.reset = function () {
            this.result_img.visible = false;
            this.big_btn.enabled = true;
            this.small_btn.enabled = true;
            this.over_btn.enabled = true;
            this.poker_img.x = 515;
            this.poker_img.y = 270;
            this.poker_img.scaleX = this.poker_img.scaleY = 1.0;
            this.poker_img.source = "flopMachine_json.fpj_card_back";
            // egret.Tween.removeTweens(this.curRush_img);
            // this.curRush_img.visible = false;
            this._timer.start();
        };
        FlopMachineGuess.prototype.onTimer = function () {
            this.poker_img.source = "Poker_" + (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 13) + 1);
        };
        FlopMachineGuess.prototype.addEvents = function () {
            uniLib.Global.addEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.addEventListener(FlopMachine.GUESS, this.onGuess, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FlopMachineGuess.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.removeEventListener(FlopMachine.GUESS, this.onGuess, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FlopMachineGuess.prototype.onGuess = function (evt) {
            var _this = this;
            var info = evt.param;
            this.big_btn.enabled = false;
            this.small_btn.enabled = false;
            this.over_btn.enabled = false;
            var str = info.guessInfo.card.toString();
            this._timer.stop();
            this.poker_img.source = "Poker_" + str.slice(1, str.length);
            this.win_lbl.text = info.guessInfo.lotchips.toString();
            if (info.guessInfo.lotret == 1) {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_BIDAXIAO_WIN);
                // this.curRush_img.x = 543 + 88 * (info.guessInfo.round - 1);
                // egret.Tween.get(this.curRush_img, { loop: true }).to({ visible: true }).wait(500).to({ visible: false }).wait(200);
                this.result_img.source = "flopMachine_json.fpj_cdx_win";
                var img = this["card" + info.guessInfo.round];
                img.source = "Poker_" + str.slice(1, str.length);
                egret.Tween.get(this.poker_img).to({ x: img.x, y: img.y, scaleX: img.scaleX, scaleY: img.scaleY }, 700).call(this.onCall, this, [img, info.guessInfo.round]);
            }
            else if (info.guessInfo.lotret == 2) {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_BIDAXIAO_LOSE);
                this.result_img.source = "flopMachine_json.fpj_cdx_lose";
                var img = this["card" + info.guessInfo.round];
                img.source = "Poker_" + str.slice(1, str.length);
                egret.Tween.get(this).wait(1200).call(function () { uniLib.PopUpMgr.removePopUp(_this); uniLib.Global.dispatchEvent(FlopMachine.CLOSE_GUESS); }, this);
            }
            else if (info.guessInfo.lotret == 3) {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_BIDAXIAO_PING);
                this.result_img.source = "flopMachine_json.fpj_cdx_ping";
                egret.Tween.get(this).wait(1200).call(this.reset, this);
            }
            this.result_img.visible = true;
            this.result_tween.play(0);
        };
        FlopMachineGuess.prototype.onGetChips = function (evt) {
            var info = evt.param;
            this.qufen_lbl.text = "+" + info.chips;
            this.win_tween.play(0);
            this.big_btn.enabled = false;
            this.small_btn.enabled = false;
            this.over_btn.enabled = false;
            if (!this._coinArmature) {
                this._coinArmature = uniLib.DragonUtils.createDragonBonesDisplay("jinbi_ske_json", "jinbi_tex_json", "jinbi_tex_png", uniLib.DragonType.ARMATURE);
                this._coinArmature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                this._coinArmature.display.x = this.width >> 1;
                this._coinArmature.display.y = this.height >> 1;
            }
            this.addChild(this._coinArmature.display);
            uniLib.DisplayUtils.runDragonBonesArmature(this._coinArmature, "newAnimation");
            uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_COIN);
        };
        FlopMachineGuess.prototype.onComplete = function () {
            uniLib.DisplayUtils.removeFromParent(this._coinArmature.display);
            this._coinArmature.animation.stop();
            uniLib.PopUpMgr.removePopUp(this);
            uniLib.Global.dispatchEvent(FlopMachine.CLOSE_GUESS);
        };
        /**
         * 下一关或者通关
         */
        FlopMachineGuess.prototype.onCall = function (img, round) {
            img.visible = true;
            this.result_img.visible = false;
            var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
            this.round_lbl.text = "\u7B2C" + chnNumChar[round] + "\u5173";
            var s = this.rush_grp.getChildAt((round - 1) * 2);
            s && (s.visible = true);
            s = this.rush_grp.getChildAt((round - 1) * 2 + 1);
            s && (s.visible = true);
            this.reset();
            /**最后一关 */
            if (round == 7) {
                this._timer && this._timer.stop();
                this.big_btn.visible = false;
                this.small_btn.visible = false;
                this.pass_img.visible = true;
                this.poker_img.visible = false;
            }
        };
        FlopMachineGuess.prototype.onTouchHandle = function (evt) {
            var target = evt.target;
            if (target == this.close_btn) {
                var req = new Cmd.ExitSalvoLobbyCmd_C();
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(FlopMachine.FlopMachinePanel);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.big_btn) {
                var req = new Cmd.GuessLobbyCmd_C();
                req.guesstype = 1;
                NetMgr.tcpSend(req);
            }
            else if (target == this.small_btn) {
                var req = new Cmd.GuessLobbyCmd_C();
                req.guesstype = 2;
                NetMgr.tcpSend(req);
            }
            else if (target == this.over_btn) {
                NetMgr.tcpSend(new Cmd.GetLotchipsLobbyCmd_C());
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(FlopMachine.FlopMachineRule, null, true, true, true, uniLib.PopUpEffect.CENTER);
            }
        };
        FlopMachineGuess.prototype.destroy = function () {
            uniLib.SoundMgr.instance.stopSound(FlopMachine.SOUND_BIDAXIAO_BG);
            egret.Tween.removeTweens(this);
            egret.Tween.removeTweens(this.poker_img);
            // egret.Tween.removeTweens(this.curRush_img);
            this.removeEvents();
            this._notice.destroy();
            this._notice = null;
            this.win_tween && this.win_tween.stop();
            this.result_tween && this.result_tween.stop();
            egret.Tween.removeTweens(this.qufen_lbl);
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            }
            this._timer = null;
            if (this._coinArmature) {
                this._coinArmature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                uniLib.DisplayUtils.destoryDragonBonesArmature(this._coinArmature, "newAnimation");
            }
            this._coinArmature = null;
        };
        return FlopMachineGuess;
    }(eui.Component));
    FlopMachine.FlopMachineGuess = FlopMachineGuess;
    __reflect(FlopMachineGuess.prototype, "FlopMachine.FlopMachineGuess");
})(FlopMachine || (FlopMachine = {}));
var FlopMachine;
(function (FlopMachine) {
    /**
     * 翻牌机
     */
    var FlopMachinePanel = (function (_super) {
        __extends(FlopMachinePanel, _super);
        function FlopMachinePanel() {
            var _this = _super.call(this) || this;
            /**是否在播放tween动画 解决tween回调优先点击事件执行的问题 */
            _this._isTween = false;
            _this._chipsBtnIsOpen = false;
            /**牌型奖金 */
            _this._lotchips = 0;
            _this.skinName = "FlopMachinePanelSkin";
            return _this;
        }
        FlopMachinePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
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
            var chips = uniLib.Utils.getLocalStorage("fpjChips");
            this.chip5_btn.label = chips ? chips : "500";
            uniLib.Utils.setLocalStorage("fpjChips", this.chip5_btn.label);
            this.reset();
        };
        FlopMachinePanel.prototype.reset = function () {
            for (var i = 1; i <= 5; i++) {
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
        };
        FlopMachinePanel.prototype.addEvents = function () {
            uniLib.Global.addEventListener(FlopMachine.CLOSE_GUESS, this.reset, this);
            uniLib.Global.addEventListener(FlopMachine.JACKPOT, this.onUpJackPot, this);
            this.sendcard_tween.addEventListener(egret.Event.COMPLETE, this.onSendCardComplete, this);
            this.open_tween.addEventListener(egret.Event.COMPLETE, this.onOpen, this);
            this.close_tween.addEventListener(egret.Event.COMPLETE, this.onClose, this);
            uniLib.Global.addEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.addEventListener(FlopMachine.TURN, this.onTurn, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FlopMachinePanel.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener(FlopMachine.CLOSE_GUESS, this.reset, this);
            uniLib.Global.removeEventListener(FlopMachine.JACKPOT, this.onUpJackPot, this);
            this.sendcard_tween.removeEventListener(egret.Event.COMPLETE, this.onSendCardComplete, this);
            this.open_tween.removeEventListener(egret.Event.COMPLETE, this.onOpen, this);
            this.close_tween.removeEventListener(egret.Event.COMPLETE, this.onClose, this);
            uniLib.Global.removeEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.removeEventListener(FlopMachine.TURN, this.onTurn, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FlopMachinePanel.prototype.onUpJackPot = function (evt) {
            var info = evt.param;
            this.coinPond_blbl.text = ("0000000000" + info.jackpot).slice(-10);
        };
        /**发牌动画结束 */
        FlopMachinePanel.prototype.onSendCardComplete = function () {
            this.hang_btn.enabled = true;
            this.hang_btn.visible && (this.begin_btn.enabled = true);
            this.chip5_btn.enabled = true;
        };
        FlopMachinePanel.prototype.onOpen = function () {
            this._chipsBtnIsOpen = true;
        };
        FlopMachinePanel.prototype.onClose = function () {
            this.chipsDesc_lbl.visible = true;
            this._chipsBtnIsOpen = false;
        };
        /**取分 */
        FlopMachinePanel.prototype.onGetChips = function (evt) {
            var info = evt.param;
            this.win_lbl.text = "+" + info.chips;
            this.win_tween.play(0);
            this.begin_btn.enabled = false;
            this.guess_btn.visible = false;
            if (!uniLib.PopUpMgr.hasPopup(FlopMachine.FlopMachineGuess)) {
                if (!this._coinArmature) {
                    this._coinArmature = uniLib.DragonUtils.createDragonBonesDisplay("jinbi_ske_json", "jinbi_tex_json", "jinbi_tex_png", uniLib.DragonType.ARMATURE);
                    this._coinArmature.addEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
                    this._coinArmature.display.x = this.width >> 1;
                    this._coinArmature.display.y = this.height >> 1;
                }
                this.addChild(this._coinArmature.display);
                uniLib.DisplayUtils.runDragonBonesArmature(this._coinArmature, "newAnimation");
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_COIN);
            }
        };
        FlopMachinePanel.prototype.onComplete = function () {
            this.reset();
            uniLib.DisplayUtils.removeFromParent(this._coinArmature.display);
            this._coinArmature.animation.stop();
        };
        /**
         * 发牌 换牌
         */
        FlopMachinePanel.prototype.onTurn = function (evt) {
            var _this = this;
            var info = evt.param;
            if (info.type == 1) {
                this._chipsBtnIsOpen && this.close_tween.play(0);
                this.chip5_btn.enabled = false;
                this.begin_btn.enabled = false;
                this.hang_btn.enabled = false;
                var _loop_1 = function (i) {
                    var img = this_1["poker" + (i + 1)];
                    if (img) {
                        var str = info.cards[i].toString();
                        this_1._isTween = true;
                        egret.Tween.get(img).wait(i * 200).call(function () { uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_FANPAI); }, this_1).to({ scaleX: 0 }, 200).to({ source: "Poker_" + str.slice(1, str.length) }).to({ scaleX: 1 }, 200).call(function () {
                            if (i + 1 == info.cards.length) {
                                _this._isTween = false;
                                _this.begin_btn.skin["type"].source = "flopMachine_json.fpj_word_jixu";
                                _this.begin_btn.name = "continue";
                                _this.hang_btn.enabled = true;
                                _this.hang_btn.visible && (_this.begin_btn.enabled = true);
                            }
                            img.touchEnabled = true;
                            if (info.autostay && info.autostay.indexOf(info.cards[i]) != -1) {
                                _this["retain" + img.name] && (_this["retain" + img.name].visible = true);
                            }
                            img.name = info.cards[i] + "";
                            _this["light" + (i + 1)] && (_this["light" + (i + 1)].name = "light" + img.name);
                        }, this_1);
                    }
                };
                var this_1 = this;
                for (var i = 0; i < info.cards.length; i++) {
                    _loop_1(i);
                }
            }
            else if (info.type == 2) {
                this._isTween = true;
                this.hang_btn.enabled = false;
                this.begin_btn.enabled = false;
                var time = 1000;
                if (Array.isArray(info.cards)) {
                    time = info.cards.length * 200 + 550;
                    var k = 1;
                    for (var i = 0; i < info.cards.length; i++) {
                        for (; k <= 5; k++) {
                            var img = this["retain" + k];
                            if (!img.visible) {
                                var str = info.cards[i].toString();
                                this["poker" + k].source = "flopMachine_json.fpj_card_back";
                                egret.Tween.get(this["poker" + k]).wait(i * 200 + 150).call(function () { uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_FANPAI); }, this).to({ scaleX: 0 }, 200).to({ source: "Poker_" + str.slice(1, str.length) }).to({ scaleX: 1 }, 200);
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
        };
        /**
         * 开奖信息
         */
        FlopMachinePanel.prototype.lotteryInfo = function (info) {
            var _this = this;
            if (info.cardtype == Cmd.CARD_TYPE.Scattered) {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_FANPAI_LOSE);
                this.reset();
            }
            else {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_FANPAI_WIN);
                this._lotchips = info.lotchips;
                this.cardType_grp.visible = true;
                this.cardType_lbl.text = this.getCardType(info.cardtype);
                this.cardType_tween.play(0);
                for (var i = 0; i < info.cards.length; i++) {
                    var light = this.flop_grp.getChildByName("light" + info.cards[i]);
                    light && egret.Tween.get(light, { loop: true }).to({ visible: true }).wait(500).to({ visible: false }).wait(500);
                }
                var lb = this.lottery_grp.getChildByName("type" + info.cardtype);
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
                    LoadPanelTipMgr.getInstance().loadRes(FlopMachine.FlopMachineConsts.BONUS_POOL, function () {
                        _this.hang_btn.visible = true;
                        _this.cancelHang_btn.visible = false;
                        uniLib.PopUpMgr.addPopUp(FlopMachine.FlopMachineBonusPool, null, true, true, false, uniLib.PopUpEffect.NOMAL, 0, 0, info);
                    });
                }
            }
        };
        FlopMachinePanel.prototype.getCardType = function (type) {
            var typeArr = ["", "", "一对10以上", "两对", "三条", "顺子", "同花", "葫芦", "四条", "同花顺", "同花大顺", "五条"];
            return typeArr[type] ? typeArr[type] : "";
        };
        /**
         * 点击事件
         */
        FlopMachinePanel.prototype.onTouchHandle = function (evt) {
            var target = evt.target;
            if (target == this.chip5_btn) {
                this._chipsBtnIsOpen ? this.close_tween.play(0) : (this.open_tween.play(0), this.chipsDesc_lbl.visible = false);
            }
            else if (target == this.close_btn) {
                var req = new Cmd.ExitSalvoLobbyCmd_C();
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.guess_btn) {
                uniLib.PopUpMgr.addPopUp(FlopMachine.FlopMachineGuess, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, this._lotchips);
            }
            else if (target == this.chip1_btn || target == this.chip2_btn || target == this.chip3_btn || target == this.chip4_btn || target == this.chip6_btn) {
                this.chip5_btn.label = target.name;
                uniLib.Utils.setLocalStorage("fpjChips", this.chip5_btn.label);
                this.close_tween.play(0);
            }
            else if (target == this.poker1 || target == this.poker2 || target == this.poker3 || target == this.poker4 || target == this.poker5) {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_BAOLIU);
                target == this.poker1 && (this.retain1.visible = !this.retain1.visible);
                target == this.poker2 && (this.retain2.visible = !this.retain2.visible);
                target == this.poker3 && (this.retain3.visible = !this.retain3.visible);
                target == this.poker4 && (this.retain4.visible = !this.retain4.visible);
                target == this.poker5 && (this.retain5.visible = !this.retain5.visible);
            }
            else if (target == this.hang_btn) {
                this.hang_btn.visible = false;
                this.cancelHang_btn.visible = true;
                this.chip5_btn.enabled = false;
                var hang = new Cmd.HangUpLobbyCmd_C();
                hang.type = 1;
                hang.betchips = Number.parseInt(this.chip5_btn.label);
                NetMgr.tcpSend(hang);
            }
            else if (target == this.cancelHang_btn) {
                this.cancelHang_btn.visible = false;
                this.hang_btn.visible = true;
                !this._isTween && (this.begin_btn.enabled = true);
                var hang = new Cmd.HangUpLobbyCmd_C();
                hang.type = 2;
                NetMgr.tcpSend(hang);
            }
            else if (target == this.begin_btn) {
                uniLib.SoundMgr.instance.playSound(FlopMachine.SOUND_START_BTN);
                if (target.name == "begin") {
                    if (uniLib.UserInfo.goldChips < Number.parseInt(this.chip5_btn.label)) {
                        uniLib.TipsUtils.showTipsDownToUp("您的金币已不足");
                    }
                    else {
                        var req = new Cmd.TurntLobbyCmd_C();
                        req.betchips = Number.parseInt(this.chip5_btn.label);
                        NetMgr.tcpSend(req);
                    }
                }
                else if (target.name == "qufen") {
                    NetMgr.tcpSend(new Cmd.GetLotchipsLobbyCmd_C());
                }
                else if (target.name == "continue") {
                    var req = new Cmd.TurntLobbyCmd_C();
                    req.stay = [];
                    for (var i = 1; i <= 5; i++) {
                        this["retain" + i].visible && req.stay.push(Number.parseInt(this["poker" + i].name));
                        this["poker" + i].touchEnabled = false;
                    }
                    NetMgr.tcpSend(req);
                }
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(FlopMachine.FlopMachineRule, null, true, true, true, uniLib.PopUpEffect.CENTER);
            }
        };
        FlopMachinePanel.prototype.destroy = function () {
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
            for (var i = 1; i <= 5; i++) {
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
        };
        return FlopMachinePanel;
    }(eui.Component));
    FlopMachine.FlopMachinePanel = FlopMachinePanel;
    __reflect(FlopMachinePanel.prototype, "FlopMachine.FlopMachinePanel");
})(FlopMachine || (FlopMachine = {}));
var FlopMachine;
(function (FlopMachine) {
    var FlopMachineRule = (function (_super) {
        __extends(FlopMachineRule, _super);
        function FlopMachineRule() {
            var _this = _super.call(this) || this;
            _this.skinName = "FlopMachineRuleSkin";
            return _this;
        }
        FlopMachineRule.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.cj_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            this.lhp_rbtn.selected = true;
            this.setLabel(1);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        };
        FlopMachineRule.prototype.onChange = function (evt) {
            var rg = evt.target;
            this.setLabel(Number.parseInt(rg.selectedValue));
        };
        FlopMachineRule.prototype.setLabel = function (index) {
            if (index == 1) {
                this.rule_lbl.text = "开始游戏后系统自动发放5张牌，可选择任意牌进行保留，点继续后，保留牌不变，不保留牌重新随机，如果最终出现奖励牌型，则获得对应倍数奖励。当出现大小王时，大小王可以代替任意牌。";
            }
            else if (index == 2) {
                this.rule_lbl.text = "1.获得五条，同花大顺，同花顺时获得投入金额的10-120倍奖励。\n2.当系统彩金不足以发放时，将发放当前所有彩金。";
            }
            else if (index == 3) {
                this.rule_lbl.text = "1.游戏共分为7关，每一关都要猜随机牌的大小，猜对则进入下一关，猜错将失去所有奖励。\n2.在游戏的过程中随时可以取分离开。\n3.2、3、4、5、6、7为小，8为平，9、10、J、Q、K、A为大。";
            }
        };
        FlopMachineRule.prototype.onTouch = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        FlopMachineRule.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.cj_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        };
        return FlopMachineRule;
    }(eui.Component));
    FlopMachine.FlopMachineRule = FlopMachineRule;
    __reflect(FlopMachineRule.prototype, "FlopMachine.FlopMachineRule");
})(FlopMachine || (FlopMachine = {}));
var FlopMachine;
(function (FlopMachine) {
    FlopMachine.TURN = "turn";
    FlopMachine.GET_CHIPS = "getChips";
    FlopMachine.GUESS = "guess";
    FlopMachine.JACKPOT = "jackPot";
    FlopMachine.CLOSE_GUESS = "closeGuess";
    FlopMachine.HANG_UP = "hang_up";
})(FlopMachine || (FlopMachine = {}));
var Cmd;
(function (Cmd) {
    /**
     * 发牌 换牌
     */
    function OnTurnLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(FlopMachine.TURN, rev);
    }
    Cmd.OnTurnLobbyCmd_S = OnTurnLobbyCmd_S;
    /**
     * 取分
     */
    function OnGetLotchipsLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(FlopMachine.GET_CHIPS, rev);
    }
    Cmd.OnGetLotchipsLobbyCmd_S = OnGetLotchipsLobbyCmd_S;
    /**
     * 猜大小
     */
    function OnGuessLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(FlopMachine.GUESS, rev);
    }
    Cmd.OnGuessLobbyCmd_S = OnGuessLobbyCmd_S;
    /**彩金更新 */
    function OnGetJackpotLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(FlopMachine.JACKPOT, rev);
    }
    Cmd.OnGetJackpotLobbyCmd_S = OnGetJackpotLobbyCmd_S;
    /**挂机 */
    function OnHangUpLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(FlopMachine.HANG_UP, rev);
    }
    Cmd.OnHangUpLobbyCmd_S = OnHangUpLobbyCmd_S;
})(Cmd || (Cmd = {}));
