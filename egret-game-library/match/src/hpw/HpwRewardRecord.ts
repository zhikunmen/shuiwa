module match {
    export class HpwRewardRecord extends eui.Component {

        public prePage_btn: match.BaseButton;
        public nextPage_btn: match.BaseButton;
        public close_btn: match.BaseButton;
        public record_lst: eui.List;

        private _arrColl: eui.ArrayCollection;
        private _sceneId: number;
        private _index: number = 0;
        private _records: Cmd.RewardRecord[] = [];
        private _curData: Cmd.RequestRewardRecordHpMatchCmd_S;

        constructor(sceneId: number) {
            super();
            this._sceneId = sceneId;
            this.skinName = "HpwRewardRecordSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this._arrColl = new eui.ArrayCollection([]);
            this.record_lst.itemRenderer = HpwRewardRecordItem;
            this.record_lst.dataProvider = this._arrColl;
            uniLib.Global.addEventListener(match.EVENT_REWARDRECORD, this.onUpdateList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                this.destroy();
            }
            else if (evt.target == this.prePage_btn) {
                if (this._index) {
                    this._index -= 5;
                    this._arrColl.source = this._records.splice(this._index, 5);
                    this._arrColl.refresh();
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("已到首页");
                }
            }
            else if (evt.target == this.nextPage_btn) {
                if (this._index + 5 <= this._records.length - 1) {
                    this._arrColl.source = this._records.splice(this._index, 5);
                    this._index += 5;
                }
                else {
                    this._arrColl.source = this._records.splice(this._index, this._records.length - 1);
                    this._arrColl.refresh();
                    if (this._curData && !this._curData.isLastPage) {
                        OnRequestRewardRecordHpMatchCmd_C(this._curData.curPage + 1, this._sceneId);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("已到尾页");
                    }
                }
            }
        }

        private onUpdateList(evt: uniLib.ZqEvent) {
            let data: Cmd.RequestRewardRecordHpMatchCmd_S = evt.param;
            this._curData = data;
            if (data.records.length) {
                this._records = this._records.concat(data.records);
                if (data.records.length > 5) {
                    this._index += 5;
                    this._arrColl.source = data.records.splice(0, 5);
                    this._arrColl.refresh();
                }
                else {
                    this._index += data.records.length;
                    this._arrColl.source = data.records;
                }
            }
        }

        private destroy() {
            this._records = null;
            this._arrColl = null;
            this._curData = null;
            uniLib.Global.removeEventListener(match.EVENT_REWARDRECORD, this.onUpdateList, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.PopUpMgr.removePopUp(this);
        }
    }
}