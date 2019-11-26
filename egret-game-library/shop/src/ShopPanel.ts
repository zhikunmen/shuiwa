module shop {
    export class ShopPanel extends eui.Component {

        public scroller: eui.Scroller;
        public shop_lst: eui.List;
        public desc_lbl: eui.Label;
        public close_btn: eui.WxButton;
        public gold_rbtn: eui.RadioButton;
        public diamond_rbtn: eui.RadioButton;
        public prop_rbtn: eui.RadioButton;

        private _arrColl: eui.ArrayCollection;
        /**钻石 */
        private _diamondArr: table.TableShopConfig[] = [];
        /**金币 */
        private _goldArr: table.TableShopConfig[] = [];
        /**道具 */
        private _propArr: table.TableShopConfig[] = [];
        private _selectIndex: number;

        private _timeIndex: number;
        private _haProp:boolean = false;

        public constructor(selectIndex: number = 0,haProp:boolean=false) {
            super();
            this._selectIndex = selectIndex;
            this._haProp = haProp;
            this.skinName = "ShopPanelSkin";
        }

        public childrenCreated(): void {
            super.childrenCreated();
            if(!this._haProp){
                uniLib.DisplayUtils.removeFromParent(this.prop_rbtn);
            }else{
                this.prop_rbtn.label ="购买金币";
                this.gold_rbtn.label ="购买道具";
                this.prop_rbtn.value = 1;
                this.gold_rbtn.value = 2;
            }

            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.desc_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.shop_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.diamond_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChangeHander, this);
            this.shop_lst.itemRenderer = ShopItem;

            if (uniLib.Global.isWxGame() && uniLib.Global.is_sandbox == 1) {
                this.diamond_rbtn.visible = false;
                this.gold_rbtn.visible = false;
                this._selectIndex = 1;
            }

            var config: table.TableLobbyGameList = ConfigMgr.getInstance().getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
            for (var i: number = 0; i < config.wechatshopList.length; i++) {
                var shop: table.TableShopConfig = ConfigMgr.getInstance().getShopCfgById(config.wechatshopList[i]);
                if (shop && shop.shopType == 1) {
                    this._goldArr.push(shop);
                }else if (shop && shop.shopType == 2) {
                    this._propArr.push(shop);
                }else if (shop && shop.shopType == 4) {
                    this._diamondArr.push(shop);
                }
            }
            if (this._selectIndex == 0) {
                this._arrColl = new eui.ArrayCollection(this._diamondArr);
                this.diamond_rbtn.selected = true;
            }
            else if (this._selectIndex == 1) {
                this._arrColl = new eui.ArrayCollection(this._goldArr);
                this.diamond_rbtn.selected = false;
                if(this._haProp)
                    this.prop_rbtn.selected = true;
                else
                    this.gold_rbtn.selected = true;
            }else if (this._selectIndex == 2) {
                this._arrColl = new eui.ArrayCollection(this._propArr);
                this.diamond_rbtn.selected = false;
                this.gold_rbtn.selected = true;
            }else {
                this._arrColl = new eui.ArrayCollection(this._diamondArr);
                this.diamond_rbtn.selected = true;
            }
            this.shop_lst.dataProvider = this._arrColl;
            this.shop_lst.dataProviderRefreshed();
        }

        private onItemTapHandler(evt: eui.PropertyEvent) {
            let shop: table.TableShopConfig = this.shop_lst.selectedItem;
            if (shop.shopType == 1 || shop.shopType == 2) {
                if (uniLib.UserInfo.chips < shop.price) {
                    uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                }
                else {
                    let req = new Cmd.BuyGoodsLobbyCmd_C();
                    req.shopId = shop.shopId;
                    req.shopNbr = 1;
                    NetMgr.tcpSend(req);
                }
            }else if (shop.shopType == 4) {
                // if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                //     RES.loadGroup(ShopConsts.SHOP_DAIFU).then(() => {
                //         uniLib.PopUpMgr.addPopUp(ShopDFTips, null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, shop.shopId);
                //     }).catch((reason) => {
                //         uniLib.TipsUtils.showTipsDownToUp("资源加载失败，请重试！");
                //     })
                // }
                // else {
                    if (this._timeIndex) {
                        uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
                    }
                    else {
                        ShopControl.checkSession(shop);
                        this._timeIndex = egret.setTimeout(() => { egret.clearTimeout(this._timeIndex); this._timeIndex = null; }, this, 5000);
                    }
                // }
            }
        }

        private onChangeHander(evt: eui.UIEvent) {
            let index = parseInt(this.diamond_rbtn.group.selectedValue);
            if (index == 1) {
                this._arrColl.source = this._goldArr;
                this._arrColl.refresh();
            }
            else if (index == 4) {
                this._arrColl.source = this._diamondArr;
                this._arrColl.refresh();
            }else if (index == 2) {
                this._arrColl.source = this._propArr;
                this._arrColl.refresh();
            }
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.currentTarget == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.currentTarget == this.desc_lbl) {
                uniLib.ZQGameSdk.nativeCopyStr("haocaipdk");
                uniLib.TipsUtils.showTipsDownToUp("公众号(haocaipdk)已复制！");
            }
        }

        public destroy(): void {
            this.shop_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.desc_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.diamond_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChangeHander, this);
            egret.clearTimeout(this._timeIndex);
            this._timeIndex = null;
            this._arrColl = null;
            this._diamondArr = null;
            this._propArr = null;
            this._goldArr = null;
            this.removeChildren();
        }
    }
}