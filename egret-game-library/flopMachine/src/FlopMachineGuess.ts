module FlopMachine {
    /**
     * 翻牌机猜大小
     */
    export class FlopMachineGuess extends eui.Component {
        public top_skin: match.WxTopOpBtn;
        public bg_img: eui.Image;
        public round_lbl: eui.Label;
        public rule_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public over_btn: eui.Button;
        public big_btn: eui.Button;
        public small_btn: eui.Button;
        public poker_img: eui.Image;
        public result_img: eui.Image;
        public card_grp: eui.Group;
        public win_lbl: eui.Label;
        public rush_grp: eui.Group;
        public pass_img: eui.Image;
        // public curRush_img: eui.Image;

        public qufen_lbl: eui.Label;
        public win_tween: egret.tween.TweenGroup;
        public result_tween: egret.tween.TweenGroup;

        private _notice: LobbyNotice;


        /**金币动画 */
        private _coinArmature: dragonBones.Armature;
        private _timer: egret.Timer;
        private _lotchips: number;

        constructor(lotchips: number = 0) {
            super();
            this._lotchips = lotchips;
            this.skinName = "FlopMachineGuessSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            uniLib.SoundMgr.instance.playSound(SOUND_BIDAXIAO_BG, 0);
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
        }

        private reset() {
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
        }

        private onTimer() {
            this.poker_img.source = `Poker_` + (Math.floor(Math.random() * 4) + 1) + (Math.floor(Math.random() * 13) + 1);
        }

        private addEvents(): void {
            uniLib.Global.addEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.addEventListener(FlopMachine.GUESS, this.onGuess, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private removeEvents(): void {
            uniLib.Global.removeEventListener(FlopMachine.GET_CHIPS, this.onGetChips, this);
            uniLib.Global.removeEventListener(FlopMachine.GUESS, this.onGuess, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        }

        private onGuess(evt: uniLib.ZqEvent) {
            let info: Cmd.GuessLobbyCmd_S = evt.param;

            this.big_btn.enabled = false;
            this.small_btn.enabled = false;
            this.over_btn.enabled = false;

            let str = info.guessInfo.card.toString();
            this._timer.stop();
            this.poker_img.source = `Poker_${str.slice(1, str.length)}`;
            this.win_lbl.text = info.guessInfo.lotchips.toString();
            if (info.guessInfo.lotret == 1) {
                uniLib.SoundMgr.instance.playSound(SOUND_BIDAXIAO_WIN);

                // this.curRush_img.x = 543 + 88 * (info.guessInfo.round - 1);
                // egret.Tween.get(this.curRush_img, { loop: true }).to({ visible: true }).wait(500).to({ visible: false }).wait(200);

                this.result_img.source = "flopMachine_json.fpj_cdx_win";
                let img: eui.Image = this["card" + info.guessInfo.round];
                img.source = `Poker_${str.slice(1, str.length)}`;
                egret.Tween.get(this.poker_img).to({ x: img.x, y: img.y, scaleX: img.scaleX, scaleY: img.scaleY }, 700).call(this.onCall, this, [img, info.guessInfo.round]);
            }
            else if (info.guessInfo.lotret == 2) {
                uniLib.SoundMgr.instance.playSound(SOUND_BIDAXIAO_LOSE);
                this.result_img.source = "flopMachine_json.fpj_cdx_lose";
                let img: eui.Image = this["card" + info.guessInfo.round];
                img.source = `Poker_${str.slice(1, str.length)}`;
                egret.Tween.get(this).wait(1200).call(() => { uniLib.PopUpMgr.removePopUp(this); uniLib.Global.dispatchEvent(CLOSE_GUESS); }, this);
            }
            else if (info.guessInfo.lotret == 3) {
                uniLib.SoundMgr.instance.playSound(SOUND_BIDAXIAO_PING);
                this.result_img.source = "flopMachine_json.fpj_cdx_ping";
                egret.Tween.get(this).wait(1200).call(this.reset, this);
            }
            this.result_img.visible = true;
            this.result_tween.play(0);
        }

        private onGetChips(evt: uniLib.ZqEvent) {
            let info: Cmd.GetLotchipsLobbyCmd_S = evt.param;
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
            uniLib.SoundMgr.instance.playSound(SOUND_COIN);
        }

        private onComplete() {
            uniLib.DisplayUtils.removeFromParent(this._coinArmature.display);
            this._coinArmature.animation.stop();
            uniLib.PopUpMgr.removePopUp(this);
            uniLib.Global.dispatchEvent(CLOSE_GUESS);
        }

        /**
         * 下一关或者通关
         */
        private onCall(img: eui.Image, round: number) {
            img.visible = true;
            this.result_img.visible = false;
            var chnNumChar = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
            this.round_lbl.text = `第${chnNumChar[round]}关`;

            let s = this.rush_grp.getChildAt((round - 1) * 2);
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
        }

        private onTouchHandle(evt: egret.TouchEvent): void {
            let target: any = evt.target;
            if (target == this.close_btn) {
                let req = new Cmd.ExitSalvoLobbyCmd_C();
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(FlopMachinePanel);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.big_btn) {
                let req = new Cmd.GuessLobbyCmd_C();
                req.guesstype = 1;
                NetMgr.tcpSend(req);
            }
            else if (target == this.small_btn) {
                let req = new Cmd.GuessLobbyCmd_C();
                req.guesstype = 2;
                NetMgr.tcpSend(req);
            }
            else if (target == this.over_btn) {
                NetMgr.tcpSend(new Cmd.GetLotchipsLobbyCmd_C());
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(FlopMachineRule, null, true, true, true, uniLib.PopUpEffect.CENTER);
            }
        }


        public destroy(): void {
            uniLib.SoundMgr.instance.stopSound(SOUND_BIDAXIAO_BG);
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
        }

    }
}