/**eui组件的父类 */
module commonpanel {
    export class LobbyBaseEuiPanel extends eui.Component {
        private _commonPanel: CommonPanel;
        constructor(title?: string, width?: number, height?: number, skin?: string, needClose: boolean = true) {
            super();
            if (title != undefined) {
                this._commonPanel = new CommonPanel(title, width, height, skin, needClose);
            }
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            if (this._commonPanel) {
                this.addChildAt(this._commonPanel, 0);
            }
            this.initUI();
            this.addEvent();
        }

        //初始化
        protected initUI(): void {
        }
        /**事件监听 */
        protected addEvent(): void {

        }

        protected removeEvent(): void {

        }

        protected destroy(): void {
            this.removeEvent();
            if (this._commonPanel)
                this._commonPanel.destroy();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
        /**调用unilib的removePop会自动调用基类中的destroy方法 */
        protected removePop(): void {
            uniLib.PopUpMgr.removePopUp(this);
        }

        protected disableCloseBtn() {
            if (this._commonPanel && this._commonPanel.closeBtn)
                this._commonPanel.closeBtn.visible = false;
        }
    }
}