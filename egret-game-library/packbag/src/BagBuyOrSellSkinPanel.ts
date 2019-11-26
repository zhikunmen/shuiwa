module packbag {
    /**
     * 购买或者出售  暂时只要出售
     */
    export class BagBuyOrSellPanel extends eui.Component {

        public icon_img: eui.Image;
        public typeIcon1_img: eui.Image;
        public typeIcon2_img: eui.Image;
        public _reduceBtn: eui.WxButton;
        public _minBtn: eui.WxButton;
        public _addBtn: eui.WxButton;
        public _maxBtn: eui.WxButton;
        public _confirmBtn: eui.WxButton;
        public _closeBtn: eui.WxButton;
        public num_tex: eui.EditableText;
        public iconName_lbl: eui.Label;
        public allPrice_lbl: eui.Label;
        public price_lbl: eui.Label;

        private _info: Cmd.BackpackInfo;
        private _count: number;


        public constructor(info: Cmd.BackpackInfo) {
            super();
            this._info = info;
            this.skinName = "BagBuyOrSellSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();

            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._minBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._maxBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

            let goods: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(this._info.goodId);
            this.iconName_lbl.text = goods.goodName;
            this.icon_img.source = "game_prop_json.bag_daoju_" + this._info.goodId;
            if (goods.giftGoods && goods.giftGoods[0]) {
                /**金币 */
                if (goods.giftGoods[0].goodId == 32) {
                    this.typeIcon1_img.source = "bagpresent_json.bag_coin";
                    this.typeIcon2_img.source = "bagpresent_json.bag_coin";

                }//钻石
                else if (goods.giftGoods[0].goodId == 6) {
                    this.typeIcon1_img.source = "bagpresent_json.bag_diamond";
                    this.typeIcon2_img.source = "bagpresent_json.bag_diamond";
                }
            }
            this.setNum(1);
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            } else if (evt.target == this._confirmBtn) {
                this._count = this.getNum();
                if (this._count > this._info.number) {
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量");
                    return;
                } else if (this._count < 1) {
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个");
                    return;
                }
                let req: Cmd.BackpackExchangeRequestBackpackCmd_C = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo: Cmd.BackpackInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = this._count;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this._reduceBtn) {
                this._count = this.getNum();
                if (this._count > 1) {
                    this._count--;
                    this.setNum(this._count);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("道具数量最少有一个")
                }
            } else if (evt.target == this._addBtn) {
                this._count = this.getNum();
                if (this._count < this._info.number) {
                    this._count++;
                    this.setNum(this._count);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("不能大于拥有的道具数量")
                }
            }
            else if (evt.target == this._minBtn) {
                this.setNum(1);
            }
            else if (evt.target == this._maxBtn) {
                this.setNum(this._info.number);
            }
        }

        /**设置数量 */
        private setNum(num: number) {
            this._count = 1;
            this.num_tex.text = num + "";
            let goods: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(this._info.goodId);
            if (goods.giftGoods && goods.giftGoods[0]) {
                this.price_lbl.text = `单价：    ${goods.giftGoods[0].goodNbr}`;
                this.allPrice_lbl.text = `总价：    ${goods.giftGoods[0].goodNbr * num}`;
            }
        }

        private getNum(): number {
            var num: number = Number(this.num_tex.text)
            if (num == null)
                return -1;
            else
                return num;
        }

        public destroy(): void {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._reduceBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._addBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._minBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._maxBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        }
    }
}