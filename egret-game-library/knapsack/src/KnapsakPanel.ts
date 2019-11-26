module knapsack {


    /**背包页面 */
    export class KnapsakPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /**右边详情区域 */
        private _detailGroup: eui.Group;
        /**右边 代金券图标 */
        private _couponImg: eui.Image;
        /**右边 代金券名称文本 */
        private _couponText: eui.Label;
        /**右边 物品详情 */
        private _explainText: eui.Label;
        /**右边 兑换金币按钮 */
        private _exchangeBtn: eui.Button;
        /**右边 提示 */
        private _detailTips: eui.Label;
        /**左边提示 */
        private _couponTips: eui.Label;
        /**左侧 代金券区域 */
        private _couponGroup: eui.Scroller;
        /**左侧 代金券列表 */
        private _couponList: eui.List;
        /** 代金券列表容器*/
        private _couponListArray: eui.ArrayCollection;
        /** 代金券数据 */
        private _backpackList: Cmd.BackpackInfo[];
        /** 代金券数据 */
        private _newbackpackList: Cmd.BackpackInfo[];
        constructor() {
            super();
            this.skinName = "KnapsackSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        //初始化
        protected initUI(): void {
            let goodsTableData = <Array<table.TableGoodsConfig>>RES.getRes("TableGoodsConfig_json");
            goodsTableData.forEach(f => {
                Data.goods[f.goodId] = f;
            });
            this._couponList.itemRenderer = KnapsakItemPanel;
            KnapsackData.getInstance().knapaskGoodId = 0;

        }
        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(KnapsackConst.BackpackInfoReturnBackpack, this.showData, this);
            uniLib.Global.addEventListener(KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
            this._couponList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected removeEvent(): void {
            uniLib.Global.removeEventListener(KnapsackConst.BackpackInfoReturnBackpack, this.showData, this);
            uniLib.Global.removeEventListener(KnapsackConst.BackpackExchangeReturnBackpack, this.updateData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._couponList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);

        }
        /**传数据 */
        private showData(e: uniLib.ZqEvent): void {
            let data = e.param as Cmd.BackpackInfoReturnBackpackCmd_S;
            this._backpackList = data.backpackList;
            this.updateList();
            this._detailGroup.visible = false;
            if (Array.isArray(this._backpackList)) {
                this._couponTips.visible = false;
            }
        }
        /**兑换金币后剩余数量 */
        private updateData(e: uniLib.ZqEvent): void {
            this._newbackpackList = [];
            let data = e.param as Cmd.BackpackExchangeReturnBackpackCmd_S;
            let backpackInfo = data.backpackInfo;
            this._backpackList.forEach(element => {
                if (element.goodId == backpackInfo.goodId) {
                    element.number = backpackInfo.number;
                }
                if (element.number != 0) {
                    this._newbackpackList.push(element);
                }
            });
            this._backpackList = this._newbackpackList
            if (data.backpackInfo.number == 0) {
                KnapsackData.getInstance().knapaskGoodId = 0;
            }
            this.showdetailGroup();
            this.updateList();
            if (this._backpackList.length != 0) {
                this._couponTips.visible = false;
            } else {
                this._couponTips.visible = true;
            }
        }
        private onClick(evt: egret.TouchEvent): void {
            switch (evt.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
                case this._exchangeBtn:
                    KnapsackModuleMgr.getInstance().showExchangeGoldPanel();
                    break;
            }
        }
        /**选中玩家*/
        private itemTap(evt: eui.ItemTapEvent): void {
            if (this._couponList.selectedItem) {
                let item = this._couponList.selectedItem as Cmd.BackpackInfo;
                if (KnapsackData.getInstance().knapaskGoodId == item.goodId) {
                    KnapsackData.getInstance().knapaskGoodId = 0;
                } else {
                    KnapsackData.getInstance().knapaskGoodId = item.goodId
                    KnapsackData.getInstance().knapaskGoodnumber = item.number;
                }
            }
            this.updateList();
            this.showdetailGroup();
        }
        /**点击更新数据 */
        private updateList(): void {
            if (!this._couponListArray) {
                this._couponListArray = new eui.ArrayCollection(this._backpackList);
                this._couponList.dataProvider = this._couponListArray;
            } else {
                if (Array.isArray(this._couponListArray.source)) {
                    this._couponListArray.removeAll();
                }
                this._couponListArray.replaceAll(this._backpackList);
            }
        }
        /**显示右侧代金券详情信息 */
        private showdetailGroup(): void {
            if (KnapsackData.getInstance().knapaskGoodId != 0) {
                this._detailGroup.visible = true;
                this._couponText.text = Data.goods[KnapsackData.getInstance().knapaskGoodId].goodName;
                this._explainText.text = Data.goods[KnapsackData.getInstance().knapaskGoodId].goodIntroduction;
                this._explainText.text = this._explainText.text.replace(/\\n/g, "\n");
                this._couponImg.source = "mjl_knapsack_json.mjl_knapsack_" + KnapsackData.getInstance().knapaskGoodId;
                this._detailTips.visible = false;
                if (KnapsackData.getInstance().knapaskGoodnumber < 1) {
                    this._exchangeBtn.visible = false;
                } else {
                    this._exchangeBtn.visible = true;
                }
            } else {
                this._detailGroup.visible = false;
                this._detailTips.visible = true;
            }
        }


        protected destroy(): void {
            super.destroy();
        }
    }
}