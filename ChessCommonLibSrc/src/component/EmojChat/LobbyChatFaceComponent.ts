/**
 * @author 
 */
module chessCommonLib {
	export class LobbyChatFaceComponent extends eui.Component {
		private page1Point1: eui.Image;
		private page1Point2: eui.Image;
		private page2Point1: eui.Image;
		private page2Point2: eui.Image;
		public scroll: eui.Scroller;

		private sTime: number = 0;

		//点击记录
		private startX: number = 0;

		private movX: number = 0;

		//是否需要移动
		private isMove: boolean = false;

		private page: number = 0;

		private timeBo: boolean = true;
		private jianTime: number = 0;

		//单页面最大距离
		private pagWidth: number = 888;

		private maxPag: number = 2;

		private faceList: eui.List;
		private faceList1: eui.List;

		private arrCol1: eui.ArrayCollection;
		private arrCol2: eui.ArrayCollection;


		constructor() {
			super();
			this.skinName = "chessCommonLib.LobbyChatFcaePanelSkin";
			this.touchEnabled = true;

			this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
			this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
			this.scroll.addEventListener(eui.UIEvent.CHANGE_END, this.onScrollEnd, this);
			this.scroll.throwSpeed = 30;
			this.scroll.bounces = false;

			this.init();
		}

		private init() {
			let faceArr1: number[] = [];
			let faceArr2: number[] = [];

			for (let i = 1; i <= 27; i++) {
				faceArr1.push(i)
			}

			for (let i = 28; i <= 48; i++) {
				faceArr2.push(i)
			}

			this.faceList.itemRenderer = chessCommonLib.LobbyChatFaceItem;
			this.arrCol1 = new eui.ArrayCollection(faceArr1);
			this.faceList.dataProvider = this.arrCol1;

			this.faceList1.itemRenderer = chessCommonLib.LobbyChatFaceItem;
			this.arrCol2 = new eui.ArrayCollection(faceArr2);
			this.faceList1.dataProvider = this.arrCol2;
			this.pointHandle(this.page)

		}

		private moveStar(timeStamp: number): boolean {
			if (this.timeBo == true) {
				this.jianTime = timeStamp;
				this.timeBo = false;
			}
			this.sTime = timeStamp - this.jianTime;
			return false;
		}

		private onTouchEnd(e: egret.TouchEvent) {
			this.scroll.stopAnimation();

		}

		private onTouchBegin(e: egret.TouchEvent) {
			egret.startTick(this.moveStar, this);
			this.startX = this.scroll.viewport.scrollH;
		}

		private onScrollEnd() {
			this.movX = this.scroll.viewport.scrollH;
			var self = this;

			if (self.bo == false)
				return;
			self.bo = false;

			egret.stopTick(self.moveStar, self);
			self.timeBo = true;
			if (self.sTime <= 500) {
				//上滑
				if (this.startX < this.movX) {
					self.page++;
				} else if (this.startX == this.movX) {

				}
				else {
					if (self.page == 0) {
						self.MovePanel();
						return;
					}
					self.page--;
				}
			} else {
				if (this.startX < this.movX)//向右移动
				{
					if (this.movX - this.startX > this.pagWidth / 2) {
						this.page++;
					} else {
						self.MovePanel();
						return;
					}
				} else if (this.startX > this.movX)//向左移动
				{
					if (this.startX - this.movX > this.pagWidth / 2) {
						this.page--;
					} else {
						self.MovePanel();
						return;
					}
				}
			}
			self.MovePanel();
		}
		private bo: boolean = true;

		private test() {
			this.bo = true;
		}

		private MovePanel() {
			if (this.page < 0)
				return;
			if (this.page >= this.maxPag) {
				this.page = this.maxPag - 1;
			}
			this.pointHandle(this.page)
			egret.Tween.get(this.scroll.viewport, { loop: false })
				.to({ scrollH: this.page * this.pagWidth }, 200).call(() => this.test(), this);

		}

		/**下方小圆点控制 */
		private pointHandle(page: number) {
			if (page == 0) {
				this.page1Point1.visible = false;
				this.page1Point2.visible = true;
				this.page2Point1.visible = true;
				this.page2Point2.visible = false;
			}
			else {
				this.page1Point1.visible = true;
				this.page1Point2.visible = false;
				this.page2Point1.visible = false;
				this.page2Point2.visible = true;
			}
		}

	}

}
