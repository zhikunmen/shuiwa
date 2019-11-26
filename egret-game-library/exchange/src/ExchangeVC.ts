module exchange {
    export class ExchangeVC extends eui.Component {

        public bg_img: eui.Image;
        public _closeBtn: eui.WxButton;
        public package_rbtn: eui.RadioButton;
        public diamond_rbtn: eui.RadioButton;
        public ticket_rbtn: eui.RadioButton;
        public exchange_lst: eui.List;
        public tips_lbl: eui.Label;

        private _giftVoucher: Cmd.GetExchangeGiftVoucherInfo_S;
        private _collArr: eui.ArrayCollection;
        private _selectIndex: number;
        private _customerQQ:string;

        constructor(selectIndex: number = 0,customerQQ?:string) {
            super();
            this._selectIndex = selectIndex;
            this._customerQQ = customerQQ;
            this.width = uniLib.Global.screenWidth;
            this.skinName = "ExchangeVCSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);

            if(this._customerQQ)
                this.tips_lbl.textFlow = <Array<egret.ITextElement>>[{ text: "（兑换可能有几分钟延时，请耐心等待。如未到账，请", style: { textColor: 0xffffff } }, { text: "联系客服QQ："+this._customerQQ, style: { underline: true, textColor: 0x1450A7 } }, { text: "）", style: { textColor: 0xffffff } }];
            else
                this.tips_lbl.textFlow = <Array<egret.ITextElement>>[{ text: "（兑换可能有几分钟延时，请耐心等待。如未到账，请", style: { textColor: 0xffffff } }, { text: "联系客服", style: { underline: true, textColor: 0x1450A7 } }, { text: "）", style: { textColor: 0xffffff } }];

            this.send();
            this.addEvent();

            this._collArr = new eui.ArrayCollection();
            this.exchange_lst.itemRenderer = ExchangeItem;
            this.exchange_lst.dataProvider = this._collArr;

            if (uniLib.Global.isNative) {
                this.package_rbtn.visible = false;
                this.ticket_rbtn.visible = true;
            }
            else {
                this.package_rbtn.visible = true;
                this.ticket_rbtn.visible = false;
            }

            /**小游戏审核模式屏蔽福卡兑换 */
            if (uniLib.Global.isWxGame() && (uniLib.Global.is_sandbox == 1 || uniLib.UserInfo.giftCoupon < uniLib.Global.defaultConfig["exchange"])) {
                this._selectIndex = 0;
                this.package_rbtn.visible = false;
            }
            /**提审包都关闭 */
            if (uniLib.Global.isNative &&  uniLib.Global.is_sandbox != 0) {
                this._selectIndex = 0;
                this.package_rbtn.visible = false;
                this.ticket_rbtn.visible = false;
            }

            if (this._selectIndex == 0) {
                this.diamond_rbtn.selected = true;
            }
            else if (this._selectIndex == 1) {
                this.package_rbtn.visible && (this.package_rbtn.selected = true);
                this.ticket_rbtn.visible && (this.ticket_rbtn.selected = true);
            }
            this.refreshList();
        }

        private send(): void {
            let req = new Cmd.GetExchangeGiftVoucherInfo_C();
            NetMgr.tcpSend(req);
        }

        //刷新剩余兑换次数
        private updateIndex(evt?: uniLib.ZqEvent): void {
            // if (evt) {
            //     this._giftVoucher = evt.param;
            // }
            // if (this._giftVoucher) {
            //     for (let i = 0; i < this._giftVoucher.infos.length; i++) {
            //         let item = this.exchange_lst.getChildByName(this._giftVoucher.infos[i].goodsId.toString()) as ExchangeItem;
            //         if (item) {
            //             if (this._giftVoucher.infos[i].remainder != undefined)
            //                 item.tip_lbl.text = "今日可兑换次数：" + this._giftVoucher.infos[i].remainder;
            //         }
            //     }
            // }
            // else {
            //     this.send();
            // }
        }

        private onTouchHander(evt: egret.TouchEvent) {
            if (evt.target == this.tips_lbl) {
                if(this._customerQQ && uniLib.Global.isNative){
                    uniLib.ZQGameSdk.nativeCopyStr(this._customerQQ);
                    uniLib.TipsUtils.showTipsDownToUp("客服QQ复制成功");
                }else{
                    wxgame.Global.instance.openCustomerServiceConversation(true, wxgame.CustomerServiceConst.DEFAULTTITLE, wxgame.Global.instance.shareIconUrl + "shareIcons/common.jpg");
                }
                
            }
            else if (evt.target == this._closeBtn) {
                this.closeInfo();
            }
        }

        private refreshList() {
            let type: number = 1;
            let lobbyConfig = ConfigMgr.getInstance().getGameListCfgById(MJLobbyData.getInstance().lobbyId);
            let config = lobbyConfig.diamondshopList;
            if (this.diamond_rbtn.selected) {
                type = 1;
                config = lobbyConfig.diamondshopList;
            }
            else if (this.package_rbtn.selected) {
                type = 2;
                config = lobbyConfig.newshopList;
            }
            else if (this.ticket_rbtn.selected) {
                type = 3;
                config = lobbyConfig.channelExchange;
            }
            let arr = [];
            for (let i = 0; i < config.length; i++) {
                let cf = ConfigMgr.getInstance().getShopCfgById(config[i]);
                cf["type"] = type;
                arr.push(cf);
            }
            this._collArr.replaceAll(arr);
            this.exchange_lst.validateNow();
            this.updateIndex();
        }

        private onItemTapHandler(evt: eui.PropertyEvent) {
            let info: table.TableShopConfig = this.exchange_lst.selectedItem;
            if (info.price > uniLib.UserInfo.giftCoupon) {
                uniLib.TipsUtils.showTipsDownToUp("福卡不足,请去赢取更多福卡");
            }
            else {
                let type = info["type"];
                if (type == 1) {
                    let req = new Cmd.BuyGoodsLobbyCmd_C();
                    req.shopId = info.shopId;
                    req.shopNbr = 1;
                    NetMgr.tcpSend(req);
                }
                else if (type == 2 || type == 3) {
                    //兑换微信红包或者话费兑换
                    if (!uniLib.UserInfo.phonenumber) {
                        this.openBind();
                    }
                    else {
                        if (uniLib.Global.isWxGame() && MJLobbyData.getInstance().userInfoSynLobby.loginByOpenId == true) {
                            LobbyModuleMgr.getInstance().showAuthonPanel();
                        }
                        else {
                            let req = new Cmd.BuyGoodsLobbyCmd_C();
                            req.shopId = info.shopId;
                            req.shopNbr = 1;
                            NetMgr.tcpSend(req);
                        }
                    }
                }
            }
        }

        //打开手机绑定页面
        private openBind(): void {
            uniLib.PopUpMgr.addPopUp(myInfo.BindPhoneVC, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, uniLib.UserInfo.phonenumber ? uniLib.UserInfo.phonenumber : null);
        }

        //监听按钮
        private addEvent(): void {
            uniLib.Global.addEventListener(exchange.ExchangeConst.FARE_INFO, this.updateIndex, this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.tips_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.diamond_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.refreshList, this);
            this.exchange_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        }
        //移除监听
        private removeEvent() {
            uniLib.Global.removeEventListener(exchange.ExchangeConst.FARE_INFO, this.updateIndex, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.tips_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this.diamond_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.refreshList, this);
            this.exchange_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        }
        //关闭当前面板
        private closeInfo(): void {
            uniLib.PopUpMgr.removePopUp(this);
        }
        public destory(): void {
            this.removeEvent();
            this._collArr = null;
            this._giftVoucher = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeAllChildren(this);
        }
    }
}
