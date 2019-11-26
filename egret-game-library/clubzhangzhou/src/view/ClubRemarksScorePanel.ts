module club {

    /**老友圈备注分数页面 */
    export class ClubRemarksScorePanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /** 输出显示*/
        private _inputText: eui.Label;
        private _num1: eui.Button;
        private _num2: eui.Button;
        private _num3: eui.Button;
        private _num4: eui.Button;
        private _num5: eui.Button;
        private _num6: eui.Button;
        private _num7: eui.Button;
        private _num8: eui.Button;
        private _num9: eui.Button;
        private _num0: eui.Button;
        /** 删除按钮*/
        private _deleteBtn: eui.Button;
        /**减按钮 */
        private _reduceBtn: eui.Button;
        /** 加按钮*/
        private _addBtn: eui.Button;
        /** 确认按钮*/
        private _sureBtn: eui.Button;
        /**记录字段 */
        private _curNumStr: string;
        /**记录被操作玩家ID */
        private _uid: number;
        /** */
        private _symbol: string;

        constructor(uid: number) {
            super();
            this.skinName = "ClubRemarksScoreSkin";
            this._uid = uid;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }

        protected removeEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }
        protected initUI(): void {
            this._curNumStr = "";
            this._symbol = "";
        }

        private btnClick(evt: egret.TouchEvent) {
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._deleteBtn:
                    this._curNumStr = this._curNumStr.trim();
                    this._curNumStr = this._curNumStr.slice(0, this._curNumStr.length - 1)
                    if (this._curNumStr.length == 0) {
                        this._symbol = "";
                    }
                    this._inputText.text = this._symbol + this._curNumStr;
                    break;
                case this._sureBtn:
                    this.changeRemarks();
                    super.removePop();
                    break;
                case this._num0:
                    this.changeTxt("0");
                    break;
                case this._num1:
                    this.changeTxt("1");
                    break;
                case this._num2:
                    this.changeTxt("2");
                    break;
                case this._num3:
                    this.changeTxt("3");
                    break;
                case this._num4:
                    this.changeTxt("4");
                    break;
                case this._num5:
                    this.changeTxt("5");
                    break;
                case this._num6:
                    this.changeTxt("6");
                    break;
                case this._num7:
                    this.changeTxt("7");
                    break;
                case this._num8:
                    this.changeTxt("8");
                    break;
                case this._num9:
                    this.changeTxt("9");
                    break;
                case this._addBtn:
                    this.changeTxt("+");
                    break;
                case this._reduceBtn:
                    this.changeTxt("-");
                    break;
            }
        }

        private changeTxt(num: string): void {
            this._curNumStr = this._curNumStr.trim();
            if (num == "-" || num == "+") {
                this._symbol = num;
            } else {
                if (num != "0" || this._curNumStr.length != 0) {
                    this._curNumStr += num;
                }
            }
            if (this._curNumStr.trim().length >= 4) {
                this._curNumStr = this._curNumStr.slice(0, this._curNumStr.length - 1)
            }
            this._inputText.text = this._symbol + this._curNumStr;
        }
        /**更改分数 */
        private changeRemarks(): void {
            ClubSendMgr.RemarkPointMatchGroupCmd(ClubData.getInstance().matchid, this._uid, 1, Number(this._inputText.text), ClubData.getInstance().clubDayChose - 1);
        }
    }
}