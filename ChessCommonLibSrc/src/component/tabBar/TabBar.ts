module chessCommonLib {

	export class TabBar extends eui.TabBar implements eui.UIComponent {
		private _menuCollection: eui.ArrayCollection;
		private _containerOrThis: any;
		private _index: number;
		private _currentPage: any;
		private _items: any = {};
		public constructor() {
			super();
		}

		public setdata(menuArray: any, containerOrThis?: any, index?: number) {
			if (this._menuCollection == null)
				this._menuCollection = new eui.ArrayCollection();
			let len: number = menuArray.length;

			if (containerOrThis) {
				this._containerOrThis = containerOrThis;
			}
			if (index) {
				this._index = index;
			}

			if (typeof (menuArray[0]) == "string") {
				for (let i: number = 0; i < len; i++) {
					let item: any = {};
					item.index = i;
					item.label = menuArray[i];
					if (i == 0) {
						item.skin = TabBarLst.FIRST;
					} else if (i == len - 1) {
						item.skin = TabBarLst.LAST;
					}
					this._menuCollection.addItem(item);
				}
				if (this._menuCollection) {
					this.dataProvider = this._menuCollection;
					// this.itemRendererFunction = this.menuRendererFunc;
				}
			} else {
				for (let i: number = 0; i < len; i++) {
					let item: TabBarVO = menuArray[i];
					item.index = i;
					if (i == 0) {
						item.skin = TabBarLst.FIRST;
					} else if (i == len - 1) {
						item.skin = TabBarLst.LAST;
					}
					this._menuCollection.addItem(item);
				}
				this.dataProvider = this._menuCollection;
				// this.itemRendererFunction = this.menuRendererFunc;
				this.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMenuItemTap, this);
				if (!this._index) {
					this._index = 0;
				}

				this.showItem(this._menuCollection.getItemAt(this._index));
			}
			this.selectedIndex = this._index;
		}

		private onMenuItemTap(e: eui.ItemTapEvent): void {
			let item: TabBarVO = e.item;
			this.showItem(item);
		}


		private showItem(vo: TabBarVO): void {
			if (vo.func) {//类
				vo.func.call(this._containerOrThis, vo);
			} else {
				if (this._currentPage) {
					uniLib.DisplayUtils.removeFromParent(this._currentPage);
					// this._currentPage.destroy();
				}
				if (this._items[vo.index] == null) {
					let tabCls = vo.cls;
					this._items[vo.index] = new tabCls();
				}
				this._currentPage = this._items[vo.index];
				this._containerOrThis.addChild(this._items[vo.index]);
			}
		}

		//后续设置tabbar的可设置样式
		// private _leftItemSkin: any;

		// public set leftItemSKin(val: any) {
		// 	this._leftItemSkin = val;
		// }

		public set itemsSkin(val: any) {
			this.itemRendererFunction = val;
		}

		protected childrenCreated(): void {
			super.childrenCreated();
			if (this._menuCollection) {
				this.dataProvider = this._menuCollection;
				// this.itemRendererFunction = this.menuRendererFunc;
			}
		}

		// private menuRendererFunc(item: any): any {
		// 	if (item.skin == egret.HorizontalAlign.LEFT) {
		// 		return TabBarItemLeft;
		// 	} else if (item.skin == egret.HorizontalAlign.RIGHT) {
		// 		return TabBarItemRight;
		// 	} else {
		// 		return TabBarItemCenter;
		// 	}
		// }

		public destroy(): void {
			this.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMenuItemTap, this);
			for (var i in this._items) {
				if (this._items[i]["destroy"]) {
					this._items[i].destroy();
				}
				this._items[i] = null;
				delete this._items[i];
			}
			this._items = null;
		}

	}

	export class TabBarVO {
		/**
		 * 排序
		 */
		public index: number;
		/**
		 * 显示文本
		 */
		public label: string;
		/**
		 * 类或函数
		 */
		public cls: any;
		public func: any;

		public skin: TabBarLst;
	}
	/**
	 * tabBar
	 */
	export enum TabBarLst {
		FIRST,//第一个
		LAST//最后一个
	}
}