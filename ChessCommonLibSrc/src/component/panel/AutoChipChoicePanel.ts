module chessCommonLib {
    export class AutoChipChoicePanel extends eui.Component {
        private chipClose: eui.Button;
        private chip_1: eui.CheckBox;
        private chip_2: eui.CheckBox;
        private chip_5: eui.CheckBox;
        private chip_10: eui.CheckBox;
        private chip_50: eui.CheckBox;
        private chip_100: eui.CheckBox;
        private chip_250: eui.CheckBox;
        private chip_500: eui.CheckBox;
        private chip_1000: eui.CheckBox;
        private chip_2000: eui.CheckBox;
        private chip_5000: eui.CheckBox;
        private chip_10000: eui.CheckBox;
        private fiveChipValueArray: number[];
        private confirmBtn: eui.Button;
        public isFirstEnterGame: boolean;
        public closeFun:Function;

        constructor() {
            super();
            this.skinName = "AutoChipChoicePanel";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            //通过显示列表控制显示，保证不同规则的contentHeight适应
            this.init();
        }

        protected init() {
            this.fiveChipValueArray = [];
            if (this.isFirstEnterGame) {
                // this.fiveChipValueArray = [1, 10, 100, 500, 2000];
            }
            this.addEvent();
        }

        protected addEvent() {
            this.chipClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chipCloseHander, this);
            this.chip_1.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_50.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_100.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_250.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_500.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_1000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        }

        protected removeEvent() {
            this.chipClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chipCloseHander, this);
            this.chip_1.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_50.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_100.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_250.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_500.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_1000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        }

        /**关闭当前面板 */
        private chipCloseHander(evt: egret.TouchEvent) {
			if(this.closeFun){
                this.closeFun.apply(this);
            }
        }

        private chipOnChange(evt: eui.UIEvent) {
            if (this.fiveChipValueArray.length > 4 && evt.target.selected) {
                uniLib.TipsUtils.showTipsDownToUp("请选择5个下注筹码~", 0xffffff);
                if (evt.target.selected) {
                    evt.target.selected = false;
                }
               return;
            }
            switch(evt.target) {
                case this.chip_1:
					if (this.chip_1.selected) {
                        this.fiveChipValueArray.push(1);
                    } else {
                        this.removeObjectFromArray(1);
                    }
					break;
				case this.chip_2:
					if (this.chip_2.selected) {
                        this.fiveChipValueArray.push(2);
                    } else {
                        this.removeObjectFromArray(2);
                    }
					break;
				case this.chip_5:
					if (this.chip_5.selected) {
                        this.fiveChipValueArray.push(5);
                    } else {
                        this.removeObjectFromArray(5);
                    }
					break;
				case this.chip_10:
					if (this.chip_10.selected) {
                        this.fiveChipValueArray.push(10);
                    } else {
                        this.removeObjectFromArray(10);
                    }
					break;
                case this.chip_50:
					if (this.chip_50.selected) {
                        this.fiveChipValueArray.push(50);
                    } else {
                        this.removeObjectFromArray(50);
                    }
					break;
				case this.chip_100:
					if (this.chip_100.selected) {
                        this.fiveChipValueArray.push(100);
                    } else {
                        this.removeObjectFromArray(100);
                    }
					break;
				case this.chip_250:
					if (this.chip_250.selected) {
                        this.fiveChipValueArray.push(250);
                    } else {
                        this.removeObjectFromArray(250);
                    }
					break;
				case this.chip_500:
					if (this.chip_500.selected) {
                        this.fiveChipValueArray.push(500);
                    } else {
                        this.removeObjectFromArray(500);
                    }
					break;
                case this.chip_1000:
					if (this.chip_1000.selected) {
                        this.fiveChipValueArray.push(1000);
                    } else {
                        this.removeObjectFromArray(1000);
                    }
					break;
				case this.chip_2000:
					if (this.chip_2000.selected) {
                        this.fiveChipValueArray.push(2000);
                    } else {
                        this.removeObjectFromArray(2000);
                    }
					break;
				case this.chip_5000:
					if (this.chip_5000.selected) {
                        this.fiveChipValueArray.push(5000);
                    } else {
                        this.removeObjectFromArray(5000);
                    }
					break;
				case this.chip_10000:
					if (this.chip_10000.selected) {
                        this.fiveChipValueArray.push(10000);
                    } else {
                        this.removeObjectFromArray(10000);
                    }
					break;
				default:
					break;
            }
        }
        private confirmBtnClick(evt: egret.TouchEvent) {
            if (this.fiveChipValueArray.length < 5) {
                uniLib.TipsUtils.showTipsDownToUp("请选择5个下注筹码~", 0xffffff);
            } else if (this.fiveChipValueArray.length == 5) {
                let req = new Cmd.CustomBetChipsCmd_C();
                req.betchips = this.fiveChipValueArray;
                uniLib.NetMgr.tcpSend(req);
                if(this.closeFun){
                    this.closeFun.apply(this);
                }
            } else {
                uniLib.TipsUtils.showTipsDownToUp("请选择5个下注筹码~", 0xffffff);
            }
        }
        private removeObjectFromArray(chipNum :number): void {
            for(let i = 0; i < this.fiveChipValueArray.length; i++){
                if (chipNum == this.fiveChipValueArray[i]) {
                    this.fiveChipValueArray.splice(i, 1);
                }
            }
        }
        public destory() {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}