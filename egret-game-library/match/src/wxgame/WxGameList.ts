module match {
    export class WxGameList extends eui.Component {
        public bg_img: eui.Image;
        public ret_btn: eui.WxButton;
        public begin_btn: eui.WxButton;
        public ticketGame_scr: eui.Scroller;
        public ticketGame_lst: eui.List;
        public top_skin: match.WxTopOpBtn;
        public rule_btn: eui.WxButton;
        public begin_ac: eui.ArmatureComponent;
        /**
         * 五元红包赛
         */
        private _beginSceneId = 7001;

        private _param: Cmd.HpMatchInfo[];

        constructor(param: Cmd.HpMatchInfo[]) {
            super();
            this._param = param;
            this.width = uniLib.Global.screenWidth;
            this.skinName = "WxGameListSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            uniLib.Global.screenWidth > this.bg_img.width && (this.bg_img.width = uniLib.Global.screenWidth);
            egret.MainContext.instance.stage.addEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.addEventListener(match.EVENT_GAMELIST, this.onGameListHandler, this);
            this.ticketGame_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);

            this.ticketGame_lst.itemRenderer = WxGameListItem;
            this.ticketGame_lst.dataProvider = new eui.ArrayCollection(this._param);
            this.top_skin.ticket_btn.touchEnabled = false;
            /**界面动画 */
            let sX = (uniLib.Global.screenWidth - this.ticketGame_scr.width) >> 1;
            this.ticketGame_scr.x = uniLib.Global.screenWidth;
            egret.Tween.get(this.ticketGame_scr).to({ x: sX }, 400, egret.Ease.quintOut)
            this.begin_btn.y = uniLib.Global.screenHeight + this.begin_btn.height;
            egret.Tween.get(this.begin_btn).to({ y: uniLib.Global.screenHeight - this.begin_btn.height * 0.5 }, 400, egret.Ease.quintOut).call(() => {
                this.begin_btn.bottom = 0;
                this.begin_btn.visible = false;
                this.begin_ac.visible = true;
            }, this);
        }

        private onGameListHandler(evt: uniLib.ZqEvent) {
            let param: Cmd.HpMatchInfo[] = evt.param;
            this.ticketGame_lst.dataProvider = new eui.ArrayCollection(param);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.begin_btn || evt.target == this.begin_ac) {
                let config: table.TableMatchReward = table.getMatchConfigBySceneId(this._beginSceneId);
                if (Array.isArray(config.HaoPaiMatchCost) && judgeItemIsEnough(config.HaoPaiMatchCost[0].goodId, config.HaoPaiMatchCost[0].goodNbr)) {
                    wxgame.Global.instance.aldSendEvent("淘汰赛", "点击快速开始");
                    OnRequestJoinHpMatchCmd_C(this._beginSceneId);
                }
            }
            else if (evt.target == this.rule_btn) {
                uniLib.PopUpMgr.addPopUp(WxGameRule, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, SceneType.TYPE_MATCH);
            }
        }

        private onResize() {
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        private onItemTapHandler(evt: eui.PropertyEvent) {
            let data: Cmd.HpMatchInfo = this.ticketGame_lst.selectedItem;
            if (data.unLocked == 0) {
                uniLib.PopUpMgr.addPopUp(WxUnlockGame, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            }
            else {
                uniLib.PopUpMgr.addPopUp(WxGameDetail, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data)
            }
        }

        public destroy() {
            this._param = null;
            this.top_skin.destroy();
            this.top_skin = null;
            egret.Tween.removeTweens(this.ticketGame_scr);
            egret.Tween.removeTweens(this.begin_btn);
            uniLib.Global.dispatchEvent(commonConfirm.EVENT_PANEL_CLOSE);
            egret.MainContext.instance.stage.removeEventListener(egret.Event.RESIZE, this.onResize, this);
            this.begin_ac.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.ret_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.rule_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(match.EVENT_GAMELIST, this.onGameListHandler, this);
            this.ticketGame_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTapHandler, this);
        }
    }
}