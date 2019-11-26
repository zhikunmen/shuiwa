module match {
    export class WxGameRecord extends eui.Component {

        public close_btn: eui.WxButton;
        public nextPage_btn: eui.WxButton;
        public prePage_btn: eui.WxButton;
        public record_lst: eui.List;

        private _recordColl: eui.ArrayCollection;
        private _data: Cmd.RequestRewardRecordHpMatchCmd_S;
        private _sub1Index: number = 0;
        private _sceneId: number;

        constructor(sceneId: number) {
            super();
            this._sceneId = sceneId;
            this.skinName = "WxGameRecordSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.record_lst.itemRenderer = WxGameRecordItem;
            this._recordColl = new eui.ArrayCollection([]);
            this.record_lst.dataProvider = this._recordColl;
            uniLib.Global.addEventListener(match.EVENT_REWARDRECORD, this.onDataHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
        }

        private onDataHandler(evt: uniLib.ZqEvent) {
            let param: Cmd.RequestRewardRecordHpMatchCmd_S = evt.param;
            if(!Array.isArray(param.records))
                param.records = [];
            let lst = [];
            if (this._data) {
                lst = this._data.records;
            }
            this._data = param;
            this._data.records = lst.concat(this._data.records);
            this.nextPage();
        }

        private nextPage() {
            let record = this._data.records;
            if (record.length > (this._sub1Index + 1) * 5) {
                this._recordColl.replaceAll(record.slice(this._sub1Index * 5, this._sub1Index * 5 + 5));
                this._recordColl.refresh();
                this._sub1Index++;
            }
            else {
                if (this._data.isLastPage) {
                    if (record.length > this._sub1Index * 5) {
                        this._recordColl.replaceAll(record.slice(this._sub1Index * 5))
                        this._recordColl.refresh();
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("已到尾页");
                    }
                }
                else {
                    OnRequestRewardRecordHpMatchCmd_C(this._data.curPage + 1, this._sceneId)
                }
            }
        }

        private prePage() {
            if (this._sub1Index >= 1) {
                this._sub1Index--;
                this._recordColl.replaceAll(this._data.records.slice(this._sub1Index * 5, this._sub1Index * 5 + 5))
                this._recordColl.refresh();
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("已到首页");
            }
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.nextPage_btn) {
                this.nextPage();
            }
            else if (evt.target == this.prePage_btn) {
                this.prePage();
            }
        }

        public destroy() {
            uniLib.Global.removeEventListener(match.EVENT_REWARDRECORD, this.onDataHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchHandler, this);
            this._data = null;
            this._recordColl = null;
            this._sceneId = null;
            this._sub1Index = null;
        }
    }
}