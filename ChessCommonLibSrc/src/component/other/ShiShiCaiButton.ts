module chessCommonLib {
	export class ShiShiCaiButton extends eui.Component {

	private _ratote:eui.Image;
	private _timer:eui.Label;  // 时间
	private timer: egret.Timer;
	private _data:any;

	public constructor() {
		super();
		this.skinName = "ShiShiCaiButtonSkin";
	}
	
	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEvent();

		uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.REQUEST_SHISHICAI_INFO);
	}

	private addEvent(): void {
		this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
		uniLib.Global.addEventListener(chessCommonLib.CommonModelEvent.RESPOND_SHISHICAI_INFO, this.getSscStatus, this);
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
	}

	private onRemoveFromStage(evt: egret.Event): void {
		this.destroy();
	}
	private removeEvent(): void {
		uniLib.Global.removeEventListener(chessCommonLib.CommonModelEvent.RESPOND_SHISHICAI_INFO, this.getSscStatus, this);
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
	}

	private touchHandle():void{
		uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SSC);
	}

	//大厅获取时时彩信息
	private getSscStatus(evt:uniLib.ZqEvent):void{
		this._data = evt.param;
		if(this._data["status"] == 1){
			if(this._data["time"] == 0)
				this._data["time"] = 0;
			this._timer.text = "倒计时:" +this._data["time"].toString();
		}else if(this._data["status"] == 2){
			this._timer.text = "结算中";
		}
				
		if (!this.timer) {
			this.timer = new egret.Timer(1000);
			this.timer.addEventListener(egret.TimerEvent.TIMER, this.runTime, this);
			this.timer.start();
		}
	}

	/**
	 * 更新时间
	 */
	private runTime(): void {
		if (this._data["time"] <= 0) {
			this._data["time"] = 0;
		} else {
			this._data["time"]--;
			if(this._data["time"] <= 0)
				this._data["time"] = 0;
		}

		if(this._data["status"] == 1)
				this._timer.text = "倒计时:" +this._data["time"].toString();
		else if(this._data["status"] == 2)
				this._timer.text = "结算中";
	}

	public destroy(): void {
		this.removeEvent();
		if (this.timer) {
			this.timer.stop();
			this.timer.removeEventListener(egret.TimerEvent.TIMER, this.runTime, this);
			this.timer = null;
		}
	}
	}

}