
module match {
    export class WxBuYuSelect extends eui.Component {
        public bg_img: egret.Bitmap;
        public begin_btn: eui.WxButton;
        public ret_btn: eui.WxButton;
        public begin_ac: eui.ArmatureComponent;
        public type_scr: eui.Scroller;
        public select_lst: eui.Group;
        private gameTypes:WxBuYuSelectItem[];

        private _data: Array<table.TableCoinHundredConfig>;
        private _gameId: number

        constructor(gameid: number) {
            super();
            this.width = uniLib.Global.screenWidth;
            this._gameId = gameid;
            this.skinName = "WxBuYuSelectSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();

            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.initInfo(this._gameId);
            // this.select_lst.itemRenderer = WxBuYuSelectItem;

            // this.select_lst.dataProvider = new eui.ArrayCollection(this._data);
            // this.select_lst.dataProviderRefreshed();
            // this.select_lst.validateNow();

            /**检测最适合进入哪个房间 */
            // this.checkEnterRoom();

            /**界面动画 */
            let sX = (uniLib.Global.screenWidth - this.type_scr.width) >> 1;
            this.type_scr.x = uniLib.Global.screenWidth;
            this.begin_btn.y = uniLib.Global.screenHeight + this.begin_btn.height;
            egret.Tween.get(this.type_scr).to({ x: sX }, 400, egret.Ease.quintOut);
            egret.Tween.get(this.begin_btn).to({ y: uniLib.Global.screenHeight - this.begin_btn.height * 0.5 }, 400, egret.Ease.quintOut).call(() => {
                this.begin_btn.bottom = 0
                this.begin_btn.visible = false;
                this.begin_ac.visible = true;
            }, this);
        }



        private initInfo(gameid: number): void {
            var sences: number[];
            var config: table.TableLobbyGameList = ConfigMgr.getInstance().getGameListCfgById(MJLobbyData.getInstance().lobbyId);
            for (var i: number = 0; i < config.coinList.length; i++) {
                if (config.coinList[i].gameId == gameid) {
                    sences = config.coinList[i].sceneId;
                    break;
                }
            }

            if (sences == null) {
                uniLib.TipsUtils.showTipsDownToUp("没配表！");
                return;
            }
            this.gameTypes = [];
            var list: Array<table.TableCoinHundredConfig> = new Array<table.TableCoinHundredConfig>();
            var vx:number = 0;
            for (var i: number = 0; i < sences.length; i++) {
                var confi: table.TableCoinHundredConfig = ConfigMgr.getInstance().getCoinHunderedById(sences[i]);
                list.push(confi);

                var item:WxBuYuSelectItem = new WxBuYuSelectItem();
                item.setInfo(confi);
                this.select_lst.addChild(item);
                item.x = vx;
                vx += (item.width + 12);
                this.gameTypes.push(item);
                item.addEventListener(match.BuYuEvent.CLICK_ITEM_GAME, this.onGameHandler, this);
                item.addEventListener(match.BuYuEvent.CLICK_ITEM_REWARD, this.onRewardHandler, this);
            }
            this._data = list;
        }

        private onGameHandler(evt: match.BuYuEvent) {
            let data: table.TableCoinHundredConfig = evt.data;
            if (uniLib.UserInfo.goldChips >= data.lowestCarry) {
                this.enterGame(data.id,data.roomType);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("金币不足以进该场次！");
            }
        }

        private onRewardHandler(evt: match.BuYuEvent) {
            // uniLib.TipsUtils.showTipsDownToUp("功能玩命开发中，敬请期待");
            LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.BUYU_REWARD, () => {
                let data: table.TableCoinHundredConfig = evt.data;
                uniLib.PopUpMgr.addPopUp(WxBuyuReward, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data)
            })
            
        }

        private onUserInfo(evt: uniLib.ZqEvent) {
            // if (evt.param == uniLib.UserInfoEnum.GOLDCHIPS) {
            //     this.checkEnterRoom();
            // }
        }

        // private checkEnterRoom() {
        //     let check: boolean = false;
        //     for (let i = this._data.length - 1; i >= 0; i--) {
        //         let child = <WxMahjongSelectItem>this.select_lst.getChildByName(WxBuYuSelectItem.SELECT_BUYU_ICONS[this._data[i]["index"]]);
        //         if (child) {
        //             if (!check && uniLib.UserInfo.goldChips >= this._data[i].lowestCarry) {
        //                 child.touch_btn.skin["type_ac"].visible = true;
        //                 check = true;
        //             }
        //             else {
        //                 child.touch_btn.skin["type_ac"].visible = false;
        //             }
        //         }
        //     }
        //     /**没有找到则提示进入初级场 */
        //     if (!check) {
        //         let child = <WxMahjongSelectItem>this.select_lst.getChildByName(WxBuYuSelectItem.SELECT_BUYU_ICONS[this._data[0]["index"]]);
        //         child && (child.touch_btn.skin["type_ac"].visible = true);
        //     }
        // }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                for (let i = this._data.length - 1; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= this._data[i].lowestCarry) {
                        var fishType:table.TableFishPlay = ConfigMgr.getInstance().getFishPlayByType(this._data[i].roomType);
                        if(fishType.unlockTime <= MJLobbyData.getInstance().fishGunBei){
                            this.enterGame(this._data[i].id,this._data[i].roomType);
                            return;
                        }
                    }
                }
                let confirm = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, () => {
                    LobbyModuleMgr.getInstance().showMarketPanel(1);
                }, () => { }, this);
                uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }

        }

        private enterGame(senceId: number,roomType:number): void {
            LobbyModuleMgr.getInstance().loadGame(this._gameId,senceId,roomType);
        }

        destroy() {
            // this.type_skin.destroy();
            // this.type_skin = null;
            egret.Tween.removeTweens(this.type_scr);
            egret.Tween.removeTweens(this.begin_btn);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(match.BuYuEvent.CLICK_ITEM_GAME, this.onGameHandler, this);
            this.select_lst.removeEventListener(match.BuYuEvent.CLICK_ITEM_REWARD, this.onRewardHandler, this);

            if(this.gameTypes){
                for(var i:number=0;i<this.gameTypes.length;i++){
                    this.gameTypes[i].removeEventListener(match.BuYuEvent.CLICK_ITEM_GAME, this.onGameHandler, this);
                    this.gameTypes[i].removeEventListener(match.BuYuEvent.CLICK_ITEM_REWARD, this.onRewardHandler, this);
                    this.gameTypes[i].destroy();
                }
                this.gameTypes = null;
            }

            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this._data = null;
        }
    }
}