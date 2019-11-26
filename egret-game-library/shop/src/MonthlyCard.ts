
module shop {
    /**月卡 */
    export class MonthlyCard extends eui.Component {

        public purchase_btn: eui.WxButton;
        public df_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public reward_lst: eui.List;
        public desc_lbl: eui.Label;
        public conti_lbl: eui.Label;
        public im_lbl: eui.Label;
        public price_blbl: eui.BitmapLabel;

        private _timeIndex: number;

        private _info: Cmd.GetMonthCardInfoLobbyCmd_S;

        constructor(info: Cmd.GetMonthCardInfoLobbyCmd_S) {
            super();
            this._info = info;
            this.skinName = "MonthlyCardSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            // if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
            //     this.purchase_btn.visible = false;
            //     this.df_btn.visible = true;
            // }
            // else {
                this.df_btn.visible = false;
                this.purchase_btn.visible = true;
            // }
            this.reward_lst.itemRenderer = RechargeItem;
            this._info.totalRewards.forEach((value, index) => { value["scale"] = 0.8 });
            this.reward_lst.dataProvider = new eui.ArrayCollection(this._info.totalRewards);
            this.price_blbl.text = this._info.price / 100 + "";
            this.conti_lbl.textFlow = <Array<egret.ITextElement>>[{ text: "连续", style: { size: 18, textColor: 0xffffff } },
            { text: this._info.totalDay + "天", style: { size: 18, textColor: 0xeaff00 } },
            { text: "，每日可领取以上奖励", style: { size: 18, textColor: 0xffffff } }];

            let im: any = [{ text: "购买立获：", style: { size: 28, textColor: 0xeaff00 } }];
            for (let i = 0; i < this._info.onceRewards.length; i++) {
                i != 0 && im.push({ text: "和", style: { size: 28, textColor: 0xeaff00 } });
                let cfg = ConfigMgr.getInstance().getGoodCfgById(this._info.onceRewards[i].goodId);
                let num = this._info.onceRewards[i].goodNbr;
                im.push({ text: `${num > 10000 ? num / 10000 + "万" : num}`, style: { size: 46, textColor: 0xffffff } });
                im.push({ text: cfg.goodName, style: { size: 38, textColor: 0xffffff } });
            }
            this.im_lbl.textFlow = <Array<egret.ITextElement>>im;

            if (this._info.firstGifts) {
                let desc = [{ text: "首次购买", style: { size: 32, textColor: 0xeaff00 } }, { text: "再送", style: { size: 28, textColor: 0xfee4ab } }];
                for (let i = 0; i < this._info.firstGifts.length; i++) {
                    i != 0 && desc.push({ text: "和", style: { size: 32, textColor: 0xeaff00 } });
                    let cfg = ConfigMgr.getInstance().getGoodCfgById(this._info.firstGifts[i].goodId);
                    let num = this._info.firstGifts[i].goodNbr;
                    desc.push({ text: `${num > 10000 ? num / 10000 + "万" : num}${cfg.goodName}`, style: { size: 28, textColor: 0xfee4a } });
                }
                this.desc_lbl.textFlow = <Array<egret.ITextElement>>desc;
            }
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.purchase_btn) {
                if (this._timeIndex) {
                    uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
                }
                else {
                    shop.ShopControl.checkSession(ConfigMgr.getInstance().getShopCfgById(this._info.shopId));
                    this._timeIndex = egret.setTimeout(() => { egret.clearTimeout(this._timeIndex); this._timeIndex = null; }, this, 5000);
                }
            }
            else if (evt.target == this.df_btn) {
                RES.loadGroup(ShopConsts.SHOP_DAIFU).then(() => {
                    uniLib.PopUpMgr.addPopUp(ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, this._info.shopId);
                }).catch((reason) => {
                    uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                })
            }
        }

        public destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            egret.clearTimeout(this._timeIndex);
            this._timeIndex = null;
        }
    }
}