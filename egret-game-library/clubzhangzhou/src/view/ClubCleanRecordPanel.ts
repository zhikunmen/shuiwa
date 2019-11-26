module club {

    /**老友清除记录页面 */
    export class ClubCleanRecordPanel extends commonpanel.LobbyBaseEuiPanel {
        /** 关闭按钮*/
        private _closeBtn: eui.Button;
        /** 提示*/
        private _tishiText: eui.Label;
        /** */
        private _list: eui.List;
        private _listArr: eui.ArrayCollection;
        constructor() {
            super();
            this.skinName = "ClubCleanRecordSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        //初始化
        protected initUI(): void {
            this._list.itemRenderer = ClubCleanRecordItemPanel;
        }

        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.GetCleanRecordMatchGroup, this.showDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }

        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.GetCleanRecordMatchGroup, this.showDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        private showDate(evt: uniLib.ZqEvent): void {
            let vo = evt.param as Cmd.GetCleanRecordMatchGroupCmd_CS;
            if (Array.isArray(vo.records)) {
                this._tishiText.visible = false;
                if (!this._listArr) {
                    this._listArr = new eui.ArrayCollection(vo.records);
                    this._list.dataProvider = this._listArr;
                } else {
                    if (Array.isArray(this._listArr.source)) {
                        this._listArr.removeAll();
                    }
                    this._listArr.replaceAll(vo.records);
                }
            } else {
                this._tishiText.visible = true;
            }
        }
        private onClickTap(e: egret.TouchEvent) {
            switch (e.target) {
                case this._closeBtn:
                    super.removePop();
                    break;
            }
        }
        protected destroy(): void {
            super.destroy();
        }
    }
}