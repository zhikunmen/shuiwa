module rankList {
    export class ListVC extends eui.Component {
        private _rankGroup: eui.Group;
        private subscribe_btn: eui.WxButton;
        private _rankScroll: eui.Scroller;
        private _rankList: eui.List;
        private _rankData: eui.ArrayCollection = new eui.ArrayCollection();
        private myData: Cmd.HpRankInfo;
        private rankVC: RankVC;
        constructor() {
            super();
            this.skinName = "ListVCSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            this.init();
            this.addEvent();
            this.sendReq();
        }
        //发送请求
        private sendReq(): void {
            let req = new Cmd.RequestRankInfoHpMatchCmd_C();
            req.gameId = 4231;
            req.curPage = 1;
            NetMgr.tcpSend(req);
        }
        private init(): void {
            this._rankList.itemRenderer = ListItem;
            this._rankList.dataProvider = this._rankData;
            this._rankScroll.viewport = this._rankList;
            this._rankScroll.scrollPolicyH = "off";
            this._rankScroll.scrollPolicyV = "off";
            this._rankScroll.horizontalScrollBar = null;
            this._rankScroll.verticalScrollBar = null;
        }
        //事件监听
        private addEvent(): void {
            uniLib.Global.addEventListener(match.EVENT_RANKINFO, this.setRank, this);
            this._rankGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
            this.subscribe_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.subscribeHandle, this);
        }
        //打开排行榜
        private showRank(): void {
            this.rankVC = new RankVC;
            // this.rankVC.setSelf(this.myData);
            uniLib.PopUpMgr.addPopUp(this.rankVC, null, false, true, 0, uniLib.PopUpEffect.LEFT);
        }
        //渲染大厅排行榜
        private setRank(evt: uniLib.ZqEvent): void {
            let data: Cmd.RequestRankInfoHpMatchCmd_S = evt.param;
            if (data.curPage == 1) {
                this._rankData.source = data.rankInfos;
                this._rankData.refresh();
            }
            this.myData = data.myRank;
            if(this.rankVC){
                // this.rankVC.setSelf(this.myData);
            }
        }
        //收藏小游戏
        private subscribeHandle(): void {
            LoadPanelTipMgr.getInstance().loadRes(RankConst.LB_SUBSCRIBE, () => {
                uniLib.PopUpMgr.addPopUp(WxSubscribe, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            })
        }
        private removeEvent(): void {
            uniLib.Global.removeEventListener(match.EVENT_RANKINFO, this.setRank, this);
            this._rankGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showRank, this);
            this.subscribe_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.subscribeHandle, this);
        }
        public destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}
