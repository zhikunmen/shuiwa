module knapsack {

    /**兑换金币页面 */
    export class ExchangeGoldPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /**代金券名称 */
        private _couponText: eui.Label;
        /**兑换按钮 */
        private _exchangeBtn: eui.Button;
        /**代金券图  */
        private _couponImg: eui.Image;
        /**兑换数量 */
        private _numText: eui.Label;
        /**-按钮 */
        private _reduceBtn: eui.Button;
        /** +按钮 */
        private _addBtn: eui.Button;
        /**选择的代金券数量 */
        private _num: number;
        /**显示换的金币量 */
        private _goldText: eui.Label;
        constructor() {
            super();
            this.skinName = "ExchangeGoldSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**事件监听 */
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
        }
        //初始化
        protected initUI(): void {
            this._couponImg.source = "mjl_knapsack_json.mjl_knapsack_" + KnapsackData.getInstance().knapaskGoodId;
            this._num = 1;
            this.updateNum();
            this._couponText.text = Data.goods[KnapsackData.getInstance().knapaskGoodId].goodName;
        }
        /**兑换金币后剩余数量 */
        private updateData(e: uniLib.ZqEvent): void {
            let data = e.param as Cmd.BackpackExchangeReturnBackpackCmd_S;
            /**领奖 */
            let award = new Cmd.RewardItem;
            award.goodId = 32;
            award.goodNbr = this._num * 100;
            LobbyModuleMgr.getInstance().showAwardPanel2(award);
            let backpackInfo = data.backpackInfo;
            KnapsackData.getInstance().knapaskGoodnumber = data.backpackInfo.number;
            if (Math.trunc(KnapsackData.getInstance().knapaskGoodnumber) == 0) {
                super.removePop();
            }
            KnapsackData.getInstance().knapaskGoodnumber = data.backpackInfo.number;
            this._num = 1;
            this.updateNum();
        }
        /**更新显示数量 */
        private updateNum(): void {
            this._numText.text = this._num + "";
            this._goldText.text = this._num * 100 + "";
        }
        private onClick(e: egret.TouchEvent): void {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._exchangeBtn:
                    KnapsackSendMgr.ExchangeRequest(this._num, KnapsackData.getInstance().knapaskGoodId);
                    break;
                case this._reduceBtn:
                    if (this._num > 1) {
                        this._num--;
                        this.updateNum();
                    }
                    break;
                case this._addBtn:
                    if (this._num < Math.trunc(KnapsackData.getInstance().knapaskGoodnumber)) {
                        this._num++;
                        this.updateNum();
                    }
                    break;
            }

        }
        protected destroy(): void {
            super.destroy();
        }
    }
}