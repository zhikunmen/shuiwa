module pokerset {
	export class SetPanel extends eui.Component {
		private spot0: eui.Image;
		private spot1: eui.Image;
		private spot2: eui.Image;
		private spot3: eui.Image;
		private closeBtn: eui.WxButton;
		private leftBtn: eui.WxButton;
		private rightBtn: eui.WxButton;
		private dissolveBtn: eui.WxButton;
		private leaveBtn: eui.WxButton;
		private musicBtn: eui.ToggleSwitch;
		private soundBtn: eui.ToggleSwitch;
		private languageBtn: eui.ToggleSwitch;
		//壁纸小图当前位置指针
		private _index: number = 0;
		//壁纸小图对象数组
		private _bgImgArr: eui.Image[] = [];
		//壁纸小图资源名数组
		private _bgResArr: string[];
		//壁纸小图显示窗口
		private _imgGroup: eui.Group;
		//点组
		private _spotArr: eui.Image[];
		private isWarning: boolean = false;
		private removePanel: RemoveRoom;
		private gameType: number;//游戏类型 1.跑得快  2.斗地主
		private roomType: number;//房间属性  1.房卡  2.金币
		public constructor() {
			super();
			this.skinName = "poker_SetPanelSkin";
		}
		protected createChildren() {
			super.createChildren();
			this.initUI();
		}
		/**num: 1.跑得快  2.斗地主   index:1.房卡  2.金币*/
		public setType(num: number, index: number, isGame: boolean = false): void {
			this.gameType = num;
			this.roomType = index;
			if (isGame) {
				this.setBtn(isGame);
			}
		}
		public setBtn(isGame: boolean): void {
			if (this.roomType == 1) {
				this.dissolveBtn.visible = true;
				this.leaveBtn.visible = false;
			} else {
				this.dissolveBtn.visible = false;
				this.leaveBtn.visible = true;
				if (isGame) {
					this.leaveBtn.enabled = false;
					var colorMatrix = [
						0.3, 0.6, 0, 0, 0,
						0.3, 0.6, 0, 0, 0,
						0.3, 0.6, 0, 0, 0,
						0, 0, 0, 1, 0
					];
					var colorFlilter = new egret.ColorMatrixFilter(colorMatrix);
					this.leaveBtn.filters = [colorFlilter];
				} else {
					this.leaveBtn.enabled = true;
					this.leaveBtn.filters = null;
				}
			}
		}
		public setWarn(bool: boolean): void {
			this.isWarning = bool;
		}
		public initUI(): void {
			this._spotArr = [this.spot0, this.spot1, this.spot2, this.spot3];
			this._bgResArr = ["pdk_small_bg1", "pdk_small_bg2", "pdk_small_bg3", "pdk_small_bg4"];
			for (let resName of this._bgResArr) {
				let res = RES.getRes(resName);
				if (!res) {
					throw new Error('小图资源没有获取到,资源名:' + resName);
				}
				let img = new eui.Image();
				img.texture = res;
				img.name = resName;
				img.width = this._imgGroup.width;
				img.height = this._imgGroup.height;
				this._bgImgArr.push(img);
			}
			if (uniLib.Utils.getLocalStorage("bgIndex") && this._bgImgArr[uniLib.Utils.getLocalStorage("bgIndex")]) {
				this._index = Number(uniLib.Utils.getLocalStorage("bgIndex"));
				this._imgGroup.addChild(this._bgImgArr[uniLib.Utils.getLocalStorage("bgIndex")]);
				this.updateSpot(uniLib.Utils.getLocalStorage("bgIndex"));
			}
			else {
				this._index = 0;
				this._imgGroup.addChild(this._bgImgArr[0]);
				this.updateSpot(0);
			}
			//添加遮罩
			let rect: egret.Rectangle = new egret.Rectangle(0, 0, this._imgGroup.width, this._imgGroup.height);
			this._imgGroup.mask = rect;
			if (uniLib.Utils.getLocalStorage("SoundVolime") == 1) {
				uniLib.SoundMgr.instance.soundOpen = true;
			}
			else {
				uniLib.SoundMgr.instance.soundOpen = false;
			}
			if (uniLib.Utils.getLocalStorage("MusicVolime") == 1) {
				uniLib.SoundMgr.instance.musicOpen = true;
			}
			else {
				uniLib.SoundMgr.instance.musicOpen = false;
			}
			this.musicBtn.selected = uniLib.SoundMgr.instance.musicOpen;
			this.soundBtn.selected = uniLib.SoundMgr.instance.soundOpen;
			this.languageBtn.enabled = false;
			this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
			this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
			this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this.dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDismiss, this);
			this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicCheckHandle, this);
			this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundCheckHandle, this);
		}
		private removeEvent() {
			this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
			this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
			this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
			this.dissolveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDismiss, this);
			this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.musicCheckHandle, this);
			this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.soundCheckHandle, this);
		}
		private onBgCh(evt: egret.TouchEvent) {
			//只有一张图，不换
			if (this._bgImgArr.length == 1) {
				return;
			}
			let nextImg: eui.Image;
			let nextIndex: number;
			if (evt.target == this.leftBtn) {
				//左按钮点击
				if (this._bgImgArr[this._index + 1]) {
					//没到最后一张图
					nextIndex = this._index + 1;
				} else {
					//现在是最后一张图，切换到第一张图
					nextIndex = 0;
				}
				nextImg = this._bgImgArr[nextIndex];
				//把下一张图加到右侧
				nextImg.x = this._imgGroup.width;
				this._imgGroup.addChild(nextImg);
				//缓动
				this.moveEffect(this._bgImgArr[this._index], false, nextIndex, false);
				this.moveEffect(nextImg, false, nextIndex, true);
			} else if (evt.target == this.rightBtn) {
				//右按钮点击
				if (this._bgImgArr[this._index - 1]) {
					//没到第一张图
					nextIndex = this._index - 1;
				} else {
					//现在第一张图，切换到最后一张图
					nextIndex = this._bgImgArr.length - 1;
				}
				nextImg = this._bgImgArr[nextIndex];
				//把下一张图加到左侧
				nextImg.x = -this._imgGroup.width;
				this._imgGroup.addChild(nextImg);
				//缓动
				this.moveEffect(this._bgImgArr[this._index], true, nextIndex, false);
				this.moveEffect(nextImg, true, nextIndex, true);
			}
		}
		/**
		*
		* @param {eui.Image} img  //要缓动的图片
		* @param {boolean} direct //0:向左缓动,1:向右缓动
		* @param {number} nextIndex//下一个index
		* @param {boolean} sendEvt//是否派发换壁纸事件
		*/
		private moveEffect(img: eui.Image, direct: boolean, nextIndex: number, sendEvt: boolean) {
			let flag: number;
			if (direct) {
				flag = 1;
				this.rightBtn.touchEnabled = false;
				this.leftBtn.touchEnabled = false;

			} else {
				flag = -1;
				this.rightBtn.touchEnabled = false;
				this.leftBtn.touchEnabled = false;
			}
			egret.Tween.get(img).to({ x: img.x + this._imgGroup.width * flag }, 300, egret.Ease.sineInOut).call(() => {
				this._index = nextIndex;
				this.rightBtn.touchEnabled = true;
				this.leftBtn.touchEnabled = true;
				if (!sendEvt) {
					return;
				}
				uniLib.Utils.setLocalStorage("bgIndex", nextIndex);
				this.dispatchEventWith(pokerset.pokersetConst.SWITCH_BACKGROUND);
				this.updateSpot(nextIndex);
			});
		}
		private updateSpot(index: number) {
			for (let img of this._spotArr) {
				img.source = "pdk_set_spot1";
			}
			this._spotArr[index].source = "pdk_set_spot2";
		}
		private soundCheckHandle(evt: egret.TouchEvent): void {
			if (!this.soundBtn.selected) {
				uniLib.SoundMgr.instance.soundVolume = 0;
				uniLib.SoundMgr.instance.soundOpen = false;
				uniLib.Utils.setLocalStorage("SoundVolime", 0);
			} else {
				uniLib.SoundMgr.instance.soundVolume = 1;
				uniLib.SoundMgr.instance.soundOpen = true;
				uniLib.Utils.setLocalStorage("SoundVolime", 1);
			}
		}
		private musicCheckHandle(evt: egret.TouchEvent): void {
			if (this.musicBtn.selected) {
				uniLib.SoundMgr.instance.musicVolume = 0.7;
				uniLib.SoundMgr.instance.musicOpen = true;
				if (this.gameType == 2) {
					uniLib.SoundMgr.instance.playBgMusic(["doudizhu_bg_mp3"]);
				} else {
					if (this.isWarning) {
						uniLib.SoundMgr.instance.playBgMusic(["voice_pdk_warn_mp3"]);
					}
					else {
						uniLib.SoundMgr.instance.playBgMusic(["voice_pdk_bg_mp3"]);
					}
				}
				uniLib.Utils.setLocalStorage("MusicVolime", 1);
			} else {
				uniLib.SoundMgr.instance.musicVolume = 0;
				uniLib.SoundMgr.instance.musicOpen = false;
				uniLib.Utils.setLocalStorage("MusicVolime", 0);
			}
		}
		private onLeave(): void{
			this.removePanel = new RemoveRoom();
			this.removePanel.setText("是否确定离开房间？");
			uniLib.PopUpMgr.addPopUp(this.removePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			this.dispatchEventWith(pokerset.pokersetConst.CLOSE);
		}
		private onDismiss(evt: egret.TouchEvent): void {
			this.removePanel = new RemoveRoom();
			this.removePanel.setText("是否确定解散房间？");
			uniLib.PopUpMgr.addPopUp(this.removePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
			this.dispatchEventWith(pokerset.pokersetConst.CLOSE);
		}
		private onClose(evt: egret.TouchEvent) {
			this.dispatchEventWith(pokerset.pokersetConst.CLOSE);
		}
		public destory(): void {
			this.removeEvent();
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
}