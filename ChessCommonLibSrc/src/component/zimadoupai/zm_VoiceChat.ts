module chessCommonLib {
	export class zm_VoiceChat extends egret.DisplayObjectContainer {
		private _startBtn: uniLib.CommonButton;
		private _recording: RecordingMc;
		private _voiceArr: Array<VoiceMc>;
		private _curPosY: number;
		private _soundValue: boolean;
		
		public constructor(normal:string,down:string,x:number,y:number) {
			super();
			this.initUI(normal,down,x,y);
		}
		private initUI(normal:string,down:string,x:number,y:number): void {
			this._startBtn = new uniLib.CommonButton(normal,down);
			this._startBtn.x = x;
			this._startBtn.y = y;
			this.addChild(this._startBtn);
			this._startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
			this._recording = new RecordingMc();
			this.addChild(this._recording);
			this._recording.x = (uniLib.Global.screenWidth - this._recording.width) / 2;
			this._recording.y = (uniLib.Global.screenHeight - this._recording.height) / 2;
			this._recording.addEventListener(ZhiMaEventConsts.RECORD_TIME_OUT, this.recordEvent, this);
			this._voiceArr = [];
			this.getContainer().addChild(this._recording);
		}
		public getWidth():number{
			return this._startBtn.width;
		}
		public getHeight():number{
			return this._startBtn.height;
		}
		private recordEvent(evt: egret.Event): void {
			this.stopRecord();
		}
		private startRecord(evt: egret.TouchEvent): void {
			this._isCancel = false;
			this._curPosY = evt.localY;
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
			egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
			uniLib.ZQGameSdk.startRecord();
			this._recording.startTimer();
		}
		private _isCancel:boolean = false;
		private checkCancel(evt: egret.TouchEvent): void {
			if (evt.localY > this._curPosY + 20) {
				this._isCancel = true;
				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
				egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
				uniLib.ZQGameSdk.stopRecord();
				this._recording.stopTimer();
			}
		}
		private stopRecord(evt: egret.TouchEvent = null): void {
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
			var text = this._recording.stopTimer();
			if(text <1000){
				var self = this;
				setTimeout(function() {
						uniLib.ZQGameSdk.stopRecord();
					}, 1000);
			}
			else{
				uniLib.ZQGameSdk.stopRecord(this.onRecordBack, this);
			}
		}
		private onRecordBack(obj: any): void {
			var self = this;
			var data: any = obj.data;
			if (obj.code == 0) {
				var voiceVo: VoiceDataVo = new VoiceDataVo();
				voiceVo.url = data.voiceUrl;
				voiceVo.time = Math.round(data.voiceDuration / 1000);
				voiceVo.nickName = uniLib.UserInfo.uid.toString();
				voiceVo.text = data.text;
				voiceVo.status = 0;
				if(isNaN(voiceVo.time)){
					//时间为空
					PublicTipMgr.getInstance().showMildWarnShow("语音发送失败");
				}
				else{
					if(this._isCancel == false){
						this.dispatchEventWith(ZhiMaEventConsts.SEND_RECORD, false, voiceVo);
					}
				}
			} else {
				PublicTipMgr.getInstance().showMildWarnShow(obj.errMsg);
			}
		}

		private  getContainer():egret.DisplayObjectContainer{
			if (uniLib.SceneMgr.instance.currentScene.topLayer){
				return uniLib.SceneMgr.instance.currentScene.topLayer;
			}
			return uniLib.SceneMgr.instance.currentScene;
		}

		public destory() {
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
			egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
			if (this._startBtn) {
				this._startBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
				this._startBtn.destroy();
			}
			this._startBtn = null;
			if (this._recording) {
				this._recording.removeEventListener(ZhiMaEventConsts.RECORD_TIME_OUT, this.recordEvent, this);
				this._recording.dispose();
			}
			this._recording = null;
			var voice: VoiceMc;
			for (var i: number = 0; i < this._voiceArr.length; i++) {
				voice = this._voiceArr[i];
				if (voice) {
					voice.destory();
				}
			}
			this._voiceArr = null;
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
		}
	}
	export class VoiceMc extends egret.DisplayObjectContainer {
		private _soundIcon: egret.Bitmap
		private _bg: egret.Bitmap;
		private _timer: egret.Timer;
		private _soundTime: number;
		private _startTime: number;
		private _timeTxt: egret.TextField;
		private _ifFlip: boolean = false;
		public constructor() {
			super();
			this.initUI();
		}
		private initUI(): void {
			this._bg = uniLib.DisplayUtils.createBitmapByName("zm_voice_paopao_png");
			this._bg.scale9Grid = new egret.Rectangle(50, 10, 30, 20);
			this.addChild(this._bg);
			this._soundIcon = uniLib.DisplayUtils.createBitmapByName("zm_voice_icon_png");
			this._soundIcon.x = 24;
			this._soundIcon.y = 11;
			this.addChild(this._soundIcon);
			this._timeTxt = uniLib.DisplayUtils.createTextLabel(0xffffff, egret.HorizontalAlign.RIGHT, "", 18, 50);
			this._timeTxt.x = 48;
			this._timeTxt.y = 13;
			this.addChild(this._timeTxt);
		}
		private onTimer(evt: egret.TimerEvent): void {
			this._soundIcon.visible = !this._soundIcon.visible;
			var date: Date = new Date();
			var nowTime: number = date.getTime();
			var time: number = Math.floor((nowTime - this._startTime) / 1000);
			if (time >= this._soundTime) {
				this.stopTimer();
			}
		}
		private stopTimer(): void {
			this._soundIcon.visible = true;
			this.visible = false;
			if (this._timer) {
				this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
				this._timer.stop();
				this._timer = null;
			}
		}
		public flip(): void {
			this._ifFlip = true;
			this._timeTxt.skewY = 180;
			this._timeTxt.textAlign = egret.HorizontalAlign.LEFT;
		}
		public setData(vo: VoiceDataVo): void {
			if (vo.uid != uniLib.UserInfo.uid) {
				uniLib.ZQGameSdk.playRecord(vo.url, this.playEndBack, this);
			}
			if (vo.time) {
				this._timeTxt.text = vo.time + "''";
			} else {
				this._timeTxt.text = "";
			}

			this._soundTime = vo.time ? vo.time : 10;
			if (vo.time <= 3) {
				this._bg.width = 100;
			} else {
				this._bg.width = 100 + (vo.time - 3) * 5;
			}
			if (this._ifFlip) {
				this._timeTxt.x = this._bg.width - 12;
			} else {
				this._timeTxt.x = this._bg.width - 60;
			}

			this.stopTimer();
			this.visible = true;
			this._timer = new egret.Timer(200);
			this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._timer.start();
			var date: Date = new Date();
			this._startTime = date.getTime();
		}
		private playEndBack(obj: any): void {
			this.stopTimer();
		}
		public destory() {
			this.stopTimer();
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._bg = null;
			this._soundIcon = null;
		}
	}
	export class RecordingMc extends egret.DisplayObjectContainer {
		private _moving: egret.DisplayObjectContainer;
		private _time: egret.TextField;
		private _startTimer: egret.Timer;
		private _startTime: number;
		private _maxTime: number = 15;
		private _msTime:number = 0;
		public constructor() {
			super();
			this.initUI();
		}
		private initUI(): void {
			var recordbg: egret.Bitmap = uniLib.DisplayUtils.createBitmapByName("zm_voice_recording_png");
			this.addChild(recordbg);
			this._moving = new egret.DisplayObjectContainer();
			this._moving.x = 104;
			this._moving.y = 102;
			var icon: egret.Bitmap = uniLib.DisplayUtils.createBitmapByName("zm_voiceloading_png");
			icon.x = -icon.width / 2;
			icon.y = -icon.height / 2;
			this._moving.addChild(icon);
			this.addChild(this._moving);
			this._time = uniLib.DisplayUtils.createTextLabel(0xC6D7DE, egret.HorizontalAlign.CENTER, "8''", 22,75);
			this._time.x = 74;
			this._time.y = 136;
			this.addChild(this._time);
			this.visible = false;
		}
		public startTimer(): void {
			this.stopTimer();
			this.visible = true;
			this._startTimer = new egret.Timer(50, 0);
			var date: Date = new Date();
			this._startTime = date.getTime();
			this._startTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
			this._startTimer.start();
		}
		public stopTimer(): number {
			this.visible = false;
			if (this._startTimer) {
				this._startTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
				this._startTimer.stop();
				this._startTimer = null;
			}
			return this._msTime;
		}
		private onTimer(evt: egret.TimerEvent): void {
			var date: Date = new Date();
			var num: number = date.getTime();
			var nowT: number = Math.floor((num - this._startTime) / 1000);
			this._time.text = (nowT + 1) + "''";
			this._moving.rotation += 15;
			if (nowT >= this._maxTime) {
				this.dispatchEventWith(ZhiMaEventConsts.RECORD_TIME_OUT);
			}
			this._msTime = num - this._startTime;
		}
		public dispose() {
			this.stopTimer();
			if (this._moving) {
				uniLib.DisplayUtils.removeAllChildren(this._moving);
				uniLib.DisplayUtils.removeFromParent(this._moving);
			}
			uniLib.DisplayUtils.removeAllChildren(this);
			uniLib.DisplayUtils.removeFromParent(this);
			this._moving = null;
			this._time = null;
		}
	}
	export class VoiceDataVo {
		public url:string;
		public nickName:string;
		public time:number;
		public uid:number;
		public status:number;//0未读，1已读
		public text:string;
		public constructor() {
		}
	}
}