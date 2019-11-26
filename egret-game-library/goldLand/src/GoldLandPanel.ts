module goldLand {
    export class GoldLandPanel extends eui.Component {

        private close_btn:eui.WxButton;
        private caijin_lst:eui.List;
        private scroll:eui.Scroller;
        private total_label:eui.BitmapLabel;
        private liansheng:eui.Label;
        private leiji:eui.Label;
        private _gameId:number;
        private _sceneId:number;
        private _pageIndex:number = 1;
        private _dataList:eui.ArrayCollection;

        constructor(gameId:number,sceneId:number) {
            super();
            this._gameId = gameId;
            this._sceneId = sceneId;
            this.skinName = "GoldLandSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();	
            this.caijin_lst.itemRenderer = GoldLandItem;
            this.addEvents();
        }

        private loadData():void{
            let req:Cmd.GetHeavenAwardHistoryHpMatchCmd_C = new Cmd.GetHeavenAwardHistoryHpMatchCmd_C();
            req.gameId = this._gameId;
            req.sceneId = this._sceneId;
            req.pagenum = this._pageIndex;
            req.pagecap = 10;
            NetMgr.tcpSend(req);
        }

        public addEvents(): void {
            this.scroll.addEventListener(egret.Event.CHANGE, this.scrollChange, this);
            uniLib.Global.addEventListener(CmdConstant.HEAVEN_AWARD_HISTORY, this.historyData, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
            this._pageIndex = 1;
            this.loadData();
        }

        private removeEvents(): void {
            this.scroll.removeEventListener(egret.Event.CHANGE, this.scrollChange, this);
            uniLib.Global.removeEventListener(CmdConstant.HEAVEN_AWARD_HISTORY, this.historyData, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeHandler, this);
        }

         private scrollChange(evt: egret.Event) {
            if (this._pageIndex < 4 && this.scroll.viewport.scrollV + this.scroll.height > this.scroll.viewport.contentHeight + 100) {
                this.scroll.viewport.scrollV = this.scroll.viewport.contentHeight - this.scroll.height;
                this._pageIndex++;
                this.loadData();
            }
        }

        private closeHandler():void{
            uniLib.PopUpMgr.removePopUp(this);
        }

        /**
         * 刷新页面数据
         */
        private historyData(e:uniLib.ZqEvent):void{
            let curData:Cmd.GetHeavenAwardHistoryHpMatchCmd_S  = e.param;
            if(curData.jackpot)
                this.total_label.text = curData.jackpot+"";
            if(curData.winstreak)
                this.liansheng.text = "当前连胜:"+curData.winstreak;
            if(curData.winsnum)
                this.leiji.text = "累积胜利:"+curData.winsnum;

            if(curData.awardInfos == null || !(curData.awardInfos instanceof Array) || curData.awardInfos.length == 0)
                return;
            if(curData.pagenum == 1){
                this._dataList = new eui.ArrayCollection(curData.awardInfos);
                this.caijin_lst.dataProvider = this._dataList;
            }else{
                var awardInfos: Cmd.HeavenAwardInfo[] = curData.awardInfos;
                if(awardInfos && awardInfos.length>0){
                    for(var i:number=0;i<awardInfos.length;i++){
                        this._dataList.addItem(awardInfos[i]);
                    }
                    this._dataList.refresh();
                }
            }
            
        }
        
        public destroy():void{
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}