module FlopMachine {

    export class FlopMachineRule extends eui.Component {

        public close_btn: eui.WxButton;
        public rule_lbl: eui.Label;
        public lhp_rbtn: eui.RadioButton;
        public cj_rbtn: eui.RadioButton;
        public cdx_rbtn: eui.RadioButton;

        constructor() {
            super();
            this.skinName = "FlopMachineRuleSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.cj_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            this.lhp_rbtn.selected = true;
            this.setLabel(1);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private onChange(evt: eui.UIEvent) {
            let rg: eui.RadioButtonGroup = evt.target;
            this.setLabel(Number.parseInt(rg.selectedValue));
        }

        private setLabel(index: number) {
            if (index == 1) {
                this.rule_lbl.text = "开始游戏后系统自动发放5张牌，可选择任意牌进行保留，点继续后，保留牌不变，不保留牌重新随机，如果最终出现奖励牌型，则获得对应倍数奖励。当出现大小王时，大小王可以代替任意牌。"
            }
            else if (index == 2) {
                this.rule_lbl.text = "1.获得五条，同花大顺，同花顺时获得投入金额的10-120倍奖励。\n2.当系统彩金不足以发放时，将发放当前所有彩金。";
            }
            else if (index == 3) {
                this.rule_lbl.text = "1.游戏共分为7关，每一关都要猜随机牌的大小，猜对则进入下一关，猜错将失去所有奖励。\n2.在游戏的过程中随时可以取分离开。\n3.2、3、4、5、6、7为小，8为平，9、10、J、Q、K、A为大。";
            }
        }

        private onTouch() {
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destroy() {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.cj_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
        }
    }
}