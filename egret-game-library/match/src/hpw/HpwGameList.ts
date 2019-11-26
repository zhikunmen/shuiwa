module match {
    /**
     * 赛事界面
     */
    export class HpwGameList extends eui.Component {

        public _buyTicketBg: eui.Image;
        public _buyCardBg: eui.Image;
        public _buyCardBtn: match.BaseButton;
        public _buyTicketBtn: match.BaseButton;
        public _headMc: eui.Image;
        public _nameTxt: eui.Label;
        public _idTxt: eui.Label;
        public _cardNTxt: eui.Label;
        public _ticketNTxt: eui.Label;

        public allGame_rbtn: eui.RadioButton;
        public ticketGame_rbtn: eui.RadioButton;
        public packageGame_rbtn: eui.RadioButton;
        public ret_btn: eui.Button;
        public game_lst: eui.List;

        public banner_scr: eui.Scroller;
        public banner_grp: eui.Group;

        private _arrColle: eui.ArrayCollection;
        /**
         * 比赛券数据
         */
        private _ticketGameArr = [];
        /**
         * 红包赛数据
         */
        private _packageGameArr = [];

        private _selectedValue: number;

        constructor(selectedValue: number = 0) {
            super();
            this._selectedValue = selectedValue;
            this.skinName = "HpwGameListSkin";
        }

        public childrenCreated() {
            super.childrenCreated();

            this._nameTxt.text = uniLib.UserInfo.nickName;
            this._idTxt.text = "ID:" + uniLib.UserInfo.uid;
            this._headMc.source = uniLib.UserInfo.headUrl;
            this._cardNTxt.text = uniLib.UserInfo.chips.toString();

            this.allGame_rbtn.group.selectedValue = this._selectedValue;
            this.game_lst.itemRenderer = HpwGameListItem;
            this._arrColle = new eui.ArrayCollection([]);
            this.game_lst.dataProvider = this._arrColle;

            uniLib.Global.addEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
            uniLib.Global.addEventListener(EVENT_GAMELIST, this.onDataHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);

            this.banner_scr.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onScrTouchHandler, this);
            this.banner_scr.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onScrTouchHandler, this);
        }

        private onTouchHandler(evt: egret.Event) {
            if (evt.target == this.ret_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.allGame_rbtn) {
                this._arrColle.source = this._ticketGameArr.concat(this._packageGameArr);
            }
            else if (evt.target == this.ticketGame_rbtn) {
                this._arrColle.source = this._ticketGameArr;
            }
            else if (evt.target == this.packageGame_rbtn) {
                this._arrColle.source = this._packageGameArr;
            }
            else if (evt.target == this._buyCardBtn || evt.target == this._buyCardBg) {
                LobbyModuleMgr.getInstance().showMarketPanel();
            }
            else if (evt.target == this._buyTicketBtn || evt.target == this._buyTicketBg) {

            }
        }

        private onUserInfoChanged(e: uniLib.ZqEvent) {
            this._cardNTxt.text = uniLib.UserInfo.chips.toString();
        }

        private onScrTouchHandler(evt: egret.TouchEvent) {
            if (evt.type == egret.TouchEvent.TOUCH_TAP) {
                uniLib.PopUpMgr.addPopUp(HpwGameDetail, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, evt.target.parent.data);
            }
        }

        private onDataHandler(evt: uniLib.ZqEvent) {
            let data: Cmd.RequestRankListHpMatchCmd_S = evt.param;
            let configReward: table.TableMatchReward[] = RES.getRes("TableMatchReward_json");
            for (let i = 0; i < data.matchList.length; i++) {
                let match = data.matchList[i];
                let config: table.TableMatchReward = table.getMatchConfigBySceneId(match.sceneId);
                //参赛卡赛
                if (config.HaoPaiMatchType == 1) {
                    this._ticketGameArr.push(data.matchList[i])
                }
                else {
                    this._packageGameArr.push(data.matchList[i]);
                }

                if (configReward) {
                    for (let k = 0; k < configReward.length; k++) {
                        if (configReward[k].HaoPaiSceneId == match.sceneId && configReward[k].adShow) {
                            let item = new HpwBannerItem(match);
                            this.banner_grp.addChild(item);
                        }
                    }
                }
            }
            if (this._selectedValue == 0) {
                this._arrColle.source = data.matchList;
            }
            else if (this._selectedValue == 1) {
                this._arrColle.source = this._ticketGameArr;
            }
            else if (this._selectedValue == 2) {
                this._arrColle.source = this._packageGameArr;
            }
            this._arrColle.refresh();
        }

        public destroy() {
            uniLib.Global.removeEventListener(uniLib.ZqEvent.USER_INFO, this.onUserInfoChanged, this);
            uniLib.Global.removeEventListener(EVENT_GAMELIST, this.onDataHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.banner_scr.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onScrTouchHandler, this);
            this.banner_scr.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onScrTouchHandler, this);
            for (let i = this.game_lst.numChildren - 1; i >= 0; i--) {
                var item = this.game_lst.getChildAt(i) as HpwGameListItem;
                item.destroy();
                item = null;
            }
        }
    }
}