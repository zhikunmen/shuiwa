module clubnew {
    export class ClubNewBoxPanel extends commonpanel.LobbyBaseEuiPanel {

        private onefloor: eui.Image;
        private twofloor: eui.Image;
        private threefloor: eui.Image;
        private fourfloor: eui.Image;
        private fivefloor: eui.Image;
        private bgRect: eui.Rect;
        private floorList: eui.List;
        private floorGroup: eui.Group;
        private closeBtn: eui.WxButton;
        private _curMath: Cmd.MathGroup;
        private _choice: number;
        private _floorList: Cmd.FloorInfo[];
        constructor(floor: Cmd.MathGroup) {
            super();
            this._curMath = floor;
            this._floorList = floor.floorList;
            this.skinName = "ClubNewBoxSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }
        public destroy(): void {
            super.destroy();
            if (this.floorList && this.floorList.numChildren) {
                for (let i = this.floorList.numChildren - 1; i >= 0; i--) {
                    let item = this.floorList.getChildAt(i) as ClubNewBoxItemPanel;
                    item.removeListener();
                    item = null;
                }
            }
        }
        protected initUI() {
            this.updateDate();
            this.closeBtn.setColorMatrix();
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);

        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        }
        public updateDate(): void {
            //当前选择的楼层
            this._choice = this._curMath.floorId;
            switch (this._choice) {
                case 1: this.onefloor.visible = true; break;
                case 2: this.twofloor.visible = true; break;
                case 3: this.threefloor.visible = true; break;
                case 4: this.fourfloor.visible = true; break;
                case 5: this.fivefloor.visible = true; break;
            }
            //构建楼层数据
            let list: Cmd.FloorInfo[] = [];
            for (let i = 0; i < 5; i++) {
                if (Array.isArray(this._floorList)) {
                    this._floorList.forEach(element => {
                        if (element.floorId == i + 1) {
                            list.push(element);
                        }
                    });
                }
                if (!list[i]) {
                    let info = new Cmd.FloorInfo();
                    info.floorId = i + 1;
                    list.push(info);
                }
            }
            this.floorList.itemRenderer = ClubNewBoxItemPanel;
            this.floorList.dataProvider = new eui.ArrayCollection(list);
        }
        private onClickTap(e: egret.TouchEvent) {

            if (e.target == this.bgRect || e.target == this.closeBtn) {
                this.OnClose();
            }
        }
        /**设置按钮开关 */
        public OnOpen() {
            this.floorGroup.x = -600;
            egret.Tween.get(this.floorGroup).to({ x: 0 }, 300);
        }
        public OnClose() {
            // GameView.Instance.closeSetting();
            egret.Tween.get(this.floorGroup).to({ x: -600 }, 300).call(() =>
                ClubModuleMgr.getInstance().removeClubNewBoxPanel());
            // egret.Tween.get(this.setGroup).to({ height: 0 }, 100).call(() => PopupManager.removePopUp(SetOpreatePanel.instance));
        }
    }
}