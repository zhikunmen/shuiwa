module packbag {
    export class PackBagPanel extends eui.Component {

        private _closeBtn: eui.WxButton;
        private _buyBtn: eui.WxButton;
        private _useBtn: eui.WxButton;
        private _sendBtn: eui.WxButton;
        private _composeBtn: eui.WxButton;
        private _sellBtn: eui.WxButton;

        private select_name: eui.Label;
        private select_icon: eui.Image;
        private select_desc: eui.Label;

        private _bag_lst: eui.List;
        private _bagInfo: eui.ArrayCollection;
        private _actual_total: number;
        private _info: Cmd.BackpackInfo;

        private goodIds: number[] = [334, 335, 336]; //银猪，金猪,福卡
        private monthCards: number[] = [329,324,298];
        private _comBtns: eui.WxButton[];
        private _comContain: eui.Group;

        public constructor() {
            super();
            this.skinName = "PackBagPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._comBtns = [this._closeBtn, this._buyBtn, this._useBtn, this._sendBtn, this._composeBtn, this._sellBtn];
            this._bag_lst.itemRenderer = PackBagItem;
            for (var i: number = 0; i < this._comBtns.length; i++) {
                this._comBtns[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this._bag_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            uniLib.Global.addEventListener(CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.addEventListener(CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
            uniLib.Global.addEventListener(CmdConstant.BACKPACK_PRESENT, this.backPackPresentHandler, this);
            this.initData();
        }

        private initData(): void {
            let req: Cmd.BackpackInfoRequestBackpackCmd_C = new Cmd.BackpackInfoRequestBackpackCmd_C();
            NetMgr.tcpSend(req);
        }

        private backPackListHandler(evt: uniLib.ZqEvent): void {
            var curData: Cmd.BackpackInfoReturnBackpackCmd_S = evt.param;
            var backpackList: Cmd.BackpackInfo[] = curData.backpackList;
            if (backpackList && backpackList.length > 0) {
                backpackList = this.operateList(backpackList);
                this._bagInfo = new eui.ArrayCollection(backpackList);
                this._bag_lst.dataProvider = this._bagInfo;
                this._bag_lst.selectedIndex = 0;
                this.setSelectItem(backpackList[0]);
            } else {
                backpackList = [];
                this._actual_total = backpackList.length;
                backpackList = this.operateList(backpackList);
                this._bagInfo = new eui.ArrayCollection(backpackList);
                this._bag_lst.dataProvider = this._bagInfo;
            }
        }

        private backPackExchangeHandler(evt: uniLib.ZqEvent): void {
            var curData: Cmd.BackpackExchangeReturnBackpackCmd_S = evt.param;
            var index: number = this.getIndexByGoodId(curData.backpackInfo.goodId);
            if (index > -1) {
                this._bagInfo.replaceItemAt(curData.backpackInfo, index)
                this._info = curData.backpackInfo;
                if (this._info.number == 0) {
                    this.goodZero(curData.backpackInfo.goodId);
                }
            }
        }

        private getIndexByGoodId(goodId: number): number {
            if (this._bagInfo) {
                for (var i: number = 0; i < this._actual_total; i++) {
                    if (this._bagInfo.source[i].goodId == goodId) {
                        return i;
                    }
                }
            }
            return -1;
        }

        private backPackPresentHandler(evt: uniLib.ZqEvent): void {
            var curData: Cmd.BackpackPresentReturnBackpackCmd_S = evt.param;
            var index: number = this.getIndexByGoodId(curData.backpackInfo.goodId);
            if (index > -1) {
                this._bagInfo.replaceItemAt(curData.backpackInfo, index)
                this._info = curData.backpackInfo;
                if (this._info.number == 0) {
                    this.goodZero(curData.backpackInfo.goodId);
                }
            }
            else {
                this._bagInfo.replaceItemAt(curData.backpackInfo, this._actual_total)
                this._actual_total++;
            }
        }

        private onItemTapHandler(evt: eui.ItemTapEvent): void {
            this.setSelectItem(this._bag_lst.selectedItem);
        }

        private setSelectItem(info: Cmd.BackpackInfo): void {
            this._info = info;
            let goods: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.select_name.text = goods.goodName;
            this.select_icon.source = "game_prop_json.bag_daoju_" + info.goodId;
            this.select_desc.text = goods.goodIntroduction;
            this.goodBtnOper(goods.goodBotton);
        }

        private goodZero(goodId: number): void {
            if (this.goodIds.indexOf(goodId) > -1) {
                let goods: table.TableGoodsConfig = ConfigMgr.getInstance().getGoodCfgById(goodId);
                this.goodBtnOper(goods.goodBotton);
            }
        }


        private goodBtnOper(type: number[]): void {
            for (var i: number = 1; i < this._comBtns.length; i++) {
                if (type.indexOf(i) > -1) {
                    this._comContain.addChild(this._comBtns[i]);
                    if (this._info.number == 0 && this.goodIds.indexOf(this._info.goodId) > -1) {
                        this._comBtns[i].enabled = false;
                    } else {
                        this._comBtns[i].enabled = true;
                    }
                } else {
                    uniLib.DisplayUtils.removeFromParent(this._comBtns[i]);
                }
            }
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            } else if (evt.target == this._sendBtn) {
                LoadPanelTipMgr.getInstance().loadRes(packbag.PackBagConsts.PUB_BAGPRESENT, () => { uniLib.PopUpMgr.addPopUp(packbag.BagPresentPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._info) });
            } else if (evt.target == this._useBtn) {
                if (this._info.goodId == 336) {
                    LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
                    uniLib.PopUpMgr.removePopUp(this);
                    return;
                }
                let req: Cmd.BackpackExchangeRequestBackpackCmd_C = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo: Cmd.BackpackInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = 1;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
            } else if (evt.target == this._buyBtn) {
                if (this._info.goodId == 329 || this._info.goodId == 298) {
                    let req = new Cmd.GetMonthCardInfoLobbyCmd_C();
                    req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                    NetMgr.tcpSend(req);
                } else if (this._info.goodId >= 348 && this._info.goodId <= 355) {
                    LobbyModuleMgr.getInstance().showMarketPanel(2);
                }
            } else if (evt.target == this._composeBtn) {
                let req: Cmd.BackpackExchangeRequestBackpackCmd_C = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo: Cmd.BackpackInfo = new Cmd.BackpackInfo();
                packInfo.goodId = this._info.goodId;
                packInfo.number = 1;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
            }
            else if (evt.target == this._sellBtn) {
                LoadPanelTipMgr.getInstance().loadRes(packbag.PackBagConsts.PUB_BAGPRESENT, () => { uniLib.PopUpMgr.addPopUp(packbag.BagBuyOrSellPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._info) });
            }
        }

        private operateList(parameter: Cmd.BackpackInfo[]): Cmd.BackpackInfo[] {
            let infos: Cmd.BackpackInfo[] = [];
            if(uniLib.Global.isWxGame() && uniLib.Global.is_sandbox != 0){
                for(var j:number=0;j<parameter.length;j++){
                    if(this.monthCards.indexOf(parameter[j].goodId) == -1){
                        infos.push(parameter[j]);
                    }
                }
            }else{
                infos = parameter;
            }
            this._actual_total = infos.length;
            var offset: number = 12 - infos.length;
            if (offset > 0) {
                for (var i: number = 0; i < offset; i++) {
                    infos.push(null);
                }
            } else if (offset < 0) {
                var que: number = infos.length % 12;
                for (var i: number = 0; i < que; i++) {
                    infos.push(null);
                }
            }
            return infos;
        }

        public destroy(): void {
            for (var i: number = 0; i < this._comBtns.length; i++) {
                this._comBtns[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this._comBtns = null;
            this._bag_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
            uniLib.Global.removeEventListener(CmdConstant.BACKPACK_PRESENT, this.backPackPresentHandler, this);
            this.removeChildren();
        }
    }
}