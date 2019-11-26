/**eui组件的父类 */
module chessCommonLib {
	export class BaseEuiPanel extends eui.Component {
		/**
		 * @param title 标题资源
		 * @param width 宽度 不设置则用默认的
		 * @param height 高度 不设置则用默认的
		 * @param skin 自己设置的底板 不用大厅的底板
		 */
		private _commonPanel: CommonPanel;
		constructor(title?: string, width?: number, height?: number, skin?: string) {
			super();
			this._commonPanel = new CommonPanel(title, width, height, skin);
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			this.addChildAt(this._commonPanel, 0);
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
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}