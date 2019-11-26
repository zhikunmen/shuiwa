module FlopMachine {
    /**
     * 翻牌机触发奖池
     */
    export class FlopMachineBonusPool extends eui.Component {

        public btn_grp: eui.Group;
        public one_btn: eui.Button;
        public two_btn: eui.Button;
        public three_btn: eui.Button;
        public four_btn: eui.Button;
        public five_btn: eui.Button;

        public open: egret.tween.TweenGroup;

        private _info: Cmd.LotteryInfo;
        /**彩金大奖动画 */
        private _bonusPoolArmature: dragonBones.Armature;
        /**洗牌动画 */
        private _rubCard: dragonBones.Armature;

        constructor(info: Cmd.LotteryInfo) {
            super();
            this._info = info;
            this.skinName = "FlopMachineBonusPoolSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
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
        }

        /**
         * 彩金大奖动画播放完毕
         */
        private onBonusPoolComplete() {
            uniLib.DisplayUtils.removeFromParent(this._bonusPoolArmature.display);
            this._bonusPoolArmature.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onBonusPoolComplete, this);
            uniLib.DragonUtils.destoryDragonBonesArmature(this._bonusPoolArmature, "newAnimation");
            this._bonusPoolArmature = null;
            this.open.addEventListener('complete', this.onTweenGroupComplete, this);
            this.open.play(0);
        }

        /**
         * 动画组播放完成
         */
        private onTweenGroupComplete(): void {
            egret.Tween.get(this.five_btn).to({ scaleX: 0 }, 200).to({ enabled: true }).call(() => { this.five_btn["max"].visible = false; }, this).to({ scaleX: 1 }, 200).wait(900).to({ x: 642, y: 225, rotation: 0 }, 300);
            egret.Tween.get(this.three_btn).wait(100).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200).wait(800).to({ x: 642, y: 225, rotation: 0 }, 200);
            egret.Tween.get(this.one_btn).wait(200).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200);
            egret.Tween.get(this.two_btn).wait(300).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200).wait(600).to({ x: 642, y: 225, rotation: 0 }, 200);
            egret.Tween.get(this.four_btn).wait(400).to({ scaleX: 0 }, 200).to({ enabled: true }).to({ scaleX: 1 }, 200).wait(500).to({ x: 642, y: 225, rotation: 0 }, 300).call(this.playRubbingCards, this);
        }

        /**播放洗牌动画 */
        private playRubbingCards() {
            this.setVisible(false);
            this.addChild(this._rubCard.display);
            uniLib.DragonUtils.runDragonBonesArmature(this._rubCard, "newAnimation");
        }

        /**
         * 洗牌动画动画播放完成
         */
        private onComplete() {
            uniLib.DisplayUtils.removeFromParent(this._rubCard.display);
            this._rubCard.removeEventListener(dragonBones.EgretEvent.LOOP_COMPLETE, this.onComplete, this);
            uniLib.DragonUtils.destoryDragonBonesArmature(this._rubCard, "newAnimation");
            this._rubCard = null;
            this.setVisible(true);
            egret.Tween.get(this.two_btn).to({ x: 801, y: 252, rotation: 10 }, 200);
            egret.Tween.get(this.three_btn).to({ x: 478, y: 252, rotation: -10 }, 200);
            egret.Tween.get(this.four_btn).to({ x: 958, y: 298, rotation: 20 }, 300);
            egret.Tween.get(this.five_btn).to({ x: 320, y: 298, rotation: -20 }, 300).call(() => {
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            }, this);
        }


        private onTouch(evt: egret.TouchEvent) {
            let target = evt.target;
            if (target == this.one_btn || target == this.two_btn || target == this.three_btn || target == this.four_btn || target == this.five_btn) {
                this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);

                let max = Math.max(...this._info.chips);
                let index = this._info.chips.indexOf(this._info.rewardchips);
                this._info.chips.splice(index, 1);
                this._info.chips.sort((a: number, b: number) => {
                    return Math.random() > .5 ? -1 : 1;
                });
                target.label = this._info.rewardchips + "";
                this._info.rewardchips == max && target["max"] && (target["max"].visible = true);

                egret.Tween.get(target).to({ scaleX: 0 }, 200).to({ enabled: false }).to({ scaleX: 1 }, 200).wait(200).call(() => {
                    uniLib.UserInfo.goldChips += this._info.rewardchips;
                    target["kuang"] && (target["kuang"].visible = true);
                    let k = 0;
                    for (let i = 0; i < this.btn_grp.numChildren; i++) {
                        let child = <eui.Button>this.btn_grp.getChildByName(i + "");
                        if (child && child != target) {
                            child.label = this._info.chips[k] + "";
                            this._info.chips[k] == max && child["max"] && (child["max"].visible = true);
                            k++;
                            egret.Tween.get(child).to({ scaleX: 0 }, 200).to({ enabled: false }).to({ scaleX: 1 }, 200);
                        }
                    }
                    egret.Tween.get(this).wait(2000).call(() => { uniLib.PopUpMgr.removePopUp(this) }, this);
                }, this);
            }
        }

        private setVisible(vis: boolean) {
            this.one_btn.visible = vis;
            this.two_btn.visible = vis;
            this.three_btn.visible = vis;
            this.four_btn.visible = vis;
            this.five_btn.visible = vis;
        }

        public destroy(): void {
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
        }

    }
}