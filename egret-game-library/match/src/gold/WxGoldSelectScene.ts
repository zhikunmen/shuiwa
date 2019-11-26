
module match {
    /**
     * 金币场选场
     */
    export class WxGoldSelectScene extends eui.Component {

        public bg_img: eui.Image;
        public begin_btn: eui.WxButton;
        public ret_btn: eui.Image;
        public top_skin: match.WxTopOpBtn;
        public select_lst: eui.List;
        public scene_scr: eui.Scroller;

        private _sceneInfo;

        constructor(sceneInfo) {
            super();
            this._sceneInfo = sceneInfo;
            this.width = uniLib.Global.screenWidth;
            this.skinName = "WxGoldSelectSceneSkin";
        }

        childrenCreated() {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            this.select_lst.itemRenderer = WxGoldSelectSceneItem;
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchanHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchanHandler, this);
            uniLib.Global.addEventListener(match.EVENT_CLOSE_PANEL, this.animationShow, this);

            this.onDataUpdate();
            !this._sceneInfo.defType && this.animationShow();
        }

        /**
        * 界面动画
        */
        private animationShow() {
            let sX = (uniLib.Global.screenWidth - this.scene_scr.width) >> 1;
            this.scene_scr.x = uniLib.Global.screenWidth;
            this.begin_btn.y = uniLib.Global.screenHeight + this.begin_btn.height;
            egret.Tween.get(this.scene_scr).to({ x: sX }, 400, egret.Ease.quintOut)
            egret.Tween.get(this.begin_btn).to({ y: uniLib.Global.screenHeight - this.begin_btn.height * 0.5 }, 400, egret.Ease.quintOut).call(() => { this.begin_btn.bottom = 0 }, this);
        }

        private onDataUpdate() {
            this.select_lst.dataProvider = new eui.ArrayCollection(this._sceneInfo.infos);
            this.select_lst.dataProviderRefreshed();
            if (this._sceneInfo.defType) {
                for (let i = 0; i < this._sceneInfo.infos.length; i++) {
                    if (this._sceneInfo.infos[i].type == this._sceneInfo.defType) {
                        uniLib.PopUpMgr.addPopUp(WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, this._sceneInfo.infos[i]);
                        break;
                    }
                }
            }
        }

        private onItemTapHandler(evt: eui.PropertyEvent) {
            let data: Cmd.SceneInfo = this.select_lst.selectedItem;
            uniLib.PopUpMgr.addPopUp(WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, data);
        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        private onTouchanHandler(evt: egret.TouchEvent) {
            if (evt.target == this.begin_btn) {
                if (this._sceneInfo) {
                    let items = this._sceneInfo[0].items;
                    for (let i = items.length - 1; i >= 0; i--) {
                        if (uniLib.UserInfo.goldChips >= items[i].lowestCarry) {
                            OnEnterMatchRoomCmd_C(items[i].gameId, items[i].sceneId);
                            return;
                        }
                    }
                    let confirm = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, () => {
                        LobbyModuleMgr.getInstance().showMarketPanel(1);
                    }, () => { }, this);
                    uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                }
            }
            else if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        }

        destroy() {
            this.top_skin.destroy();
            this.top_skin = null;
            egret.Tween.removeTweens(this.scene_scr);
            egret.Tween.removeTweens(this.begin_btn);
            uniLib.Global.dispatchEvent(commonConfirm.EVENT_PANEL_CLOSE);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.select_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
            this.begin_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchanHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchanHandler, this);
            uniLib.Global.removeEventListener(match.EVENT_CLOSE_PANEL, this.animationShow, this);
            this._sceneInfo = null;
        }
    }
}