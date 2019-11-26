
module match {
    /**
     * 金币场选场
     */
    export class WxGoldSelectType extends eui.Component {
        public bg_img: eui.Image;
        public top_skin: match.WxTopOpBtn;
        public ret_btn: eui.WxButton;
        public type_scr: eui.Scroller;
        public select_lst: eui.List;
        public rule_btn: eui.WxButton;

        public classic_rbtn: eui.RadioButton;
        public boom_rbtn: eui.RadioButton;
        public exchange_rbtn: eui.RadioButton;

        private _index: number = 1;
        private _sceneInfo: Cmd.SceneInfo[];
        private _data: Cmd.SceneInfo;

        /**
      * @param type 1:经典场 3:疯狂场 6.换三张
      */
        constructor(sceneInfo: Cmd.SceneInfo[], type: number = 1) {
            super();
            this.width = uniLib.Global.screenWidth;
            this._index = type;
            this._sceneInfo = sceneInfo;
            this.skinName = "WxGoldSelectTypeSkin";
        }

        childrenCreated() {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.classic_rbtn.group.selectedValue = this._index;
            this.classic_rbtn.group.addEventListener(eui.UIEvent.CHANGE, this.onChange, this);

            this.select_lst.itemRenderer = WxGoldSelectTypeItem;

            this.setView(this._index);

            /**界面动画 */
            let sX = (uniLib.Global.screenWidth - this.type_scr.width) >> 1;
            this.type_scr.x = uniLib.Global.screenWidth;
            egret.Tween.get(this.type_scr).to({ x: sX }, 400, egret.Ease.quintOut);
        }

        private setView(type: number) {
            for (let i = 0; i < this._sceneInfo.length; i++) {
                if (this._sceneInfo[i].type == type) {
                    this._data = this._sceneInfo[i];
                    this.select_lst.dataProvider = new eui.ArrayCollection(this._data.items);
                    this.select_lst.dataProviderRefreshed();
                    this.select_lst.validateNow();
                    break;
                }
            }
            /**检测最适合进入哪个房间 */
            this.checkEnterRoom();
        }

        private onItemTapHandler(evt: eui.PropertyEvent) {
            let data: Cmd.SceneItem = this.select_lst.selectedItem;
            if (uniLib.UserInfo.goldChips >= data.lowestCarry) {
                if (!data.maxCarry || uniLib.UserInfo.goldChips <= data.maxCarry) {
                    wxgame.Global.instance.aldSendEvent("金币场", `点击${this._data.type}_${data.type}场`);
                    OnEnterMatchRoomCmd_C(data.gameId, data.sceneId);
                }
                else {
                    let confirm = new commonConfirm.ConfirmPanel("金币超最大限制，快去挑战高级场次吧！", null, null, () => {
                        for (let i = this._data.items.length - 1; i >= 0; i--) {
                            if (this._data.items[i].lowestCarry <= uniLib.UserInfo.goldChips) {
                                OnEnterMatchRoomCmd_C(this._data.items[i].gameId, this._data.items[i].sceneId);
                                break;
                            }
                        }
                    }, () => { });
                    uniLib.PopUpMgr.addPopUp(confirm, egret.MainContext.instance.stage, true, true, 0, uniLib.PopUpEffect.CENTER);
                }
            }
            else {
                let obj = { "1": "初级场", "2": "中级场", "3": "高级场" };
                for (let i = this._data.items.length - 1; i >= 0; i--) {
                    if (uniLib.UserInfo.goldChips >= this._data.items[i].lowestCarry) {
                        let confirm = new commonConfirm.ConfirmPanel(`金币不足，请前往${obj[this._data.items[i].type]}进行游戏!`, null, null, () => {
                            wxgame.Global.instance.aldSendEvent("金币场", `点击${this._data.type}_${this._data.items[i].type}场`);
                            OnEnterMatchRoomCmd_C(this._data.items[i].gameId, this._data.items[i].sceneId);
                        }, () => { }, this);
                        uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                        return;
                    }
                }
                /**服务器请求进入 破产补助 客户端没有破产补助的状态 */
                OnEnterMatchRoomCmd_C(data.gameId, data.sceneId);
            }
        }

        private onUserInfo(evt: uniLib.ZqEvent) {
            if (evt.param == uniLib.UserInfoEnum.GOLDCHIPS) {
                this.checkEnterRoom();
            }
        }

        private checkEnterRoom() {
            let check: boolean = false;
            for (let i = this._data.items.length - 1; i >= 0; i--) {
                let child = <WxGoldSelectTypeItem>this.select_lst.getChildByName(this._data.items[i].type.toString());
                if (child) {
                    if (!check && uniLib.UserInfo.goldChips >= this._data.items[i].lowestCarry) {
                        child.touch_btn.skin["type_ac"].visible = true;
                        check = true;
                    }
                    else {
                        child.touch_btn.skin["type_ac"].visible = false;
                    }
                }
            }
            /**没有找到则提示进入初级场 */
            if (!check) {
                let child = <WxGoldSelectTypeItem>this.select_lst.getChildByName(this._data.items[0].type.toString());
                child && (child.touch_btn.skin["type_ac"].visible = true);
            }
        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        private onChange(evt: eui.UIEvent) {
            let group: eui.RadioButtonGroup = evt.target;
            this.setView(parseInt(group.selectedValue));
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
                uniLib.Global.dispatchEvent(match.EVENT_CLOSE_PANEL);
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(WxGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, this._data.type);
            }
        }

        public destroy() {
            this.top_skin.destroy();
            this.top_skin = null;
            egret.Tween.removeTweens(this.type_scr);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfo, this);
            this.classic_rbtn.group.removeEventListener(eui.UIEvent.CHANGE, this.onChange, this);
            this._data = null;
        }
    }
}