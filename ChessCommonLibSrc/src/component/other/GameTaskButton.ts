
module chessCommonLib {
	export class GameTaskButton extends eui.Component {

	public game_task: eui.Button;
	private progress_text: eui.Label;
	private light_rotate:eui.Image;
	public gameId:number=0;

	public constructor(gameid?:number) {
		super();
		if(gameid)
			this.gameId = gameid;
		this.skinName = "GameTaskButtonSkin";
	}

	private addEvents(): void {
		this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		uniLib.Global.addEventListener(chessCommonLib.CommonModelEvent.RESPOND_TASK_SCHEDULE, this.onEventHandler, this);
		this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
	}

	private onRemoveFromStage(evt: egret.Event): void {
		this.destroy();
	}

	private removeEvents(): void {
		this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
		uniLib.Global.addEventListener(chessCommonLib.CommonModelEvent.RESPOND_TASK_SCHEDULE, this.onEventHandler, this);
	}

	private onTouchHandle(e: egret.TouchEvent): void {
		uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.TASK,this.gameId);
	}

	private onEventHandler(evt:uniLib.ZqEvent):void{
		let result = evt.param;
		this.progress_text.textFlow = <Array<egret.ITextElement>> [{text: "(", style: {"size": 24}},
		{text: result.pre+"", style: {"size": 24,"textColor": 0xaec6fe}},{text: "/"+result.back+")", style: {"size": 24}}];

		if(result.receive == 1)
			this.startRoate();
		else	
			this.stopRoate();
	}

	protected childrenCreated(): void {
		super.childrenCreated();
		this.addEvents();

		uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.REQUEST_TASK_SCHEDULE,this.gameId);
	}

	private startRoate():void{
		egret.setTimeout(() => {
			this.light_rotate.visible = true;
			egret.Tween.get(this.light_rotate, { loop: true })
					.to({ rotation: 359 }, 4000);
			}, this, 200);
	}

	private stopRoate():void{
		egret.Tween.removeTweens(this.light_rotate);
		this.light_rotate.visible = false;
	}


	public destroy(): void {
		this.removeEvents();
		this.stopRoate();
		uniLib.DisplayUtils.removeAllChildren(this);
		uniLib.DisplayUtils.removeFromParent(this);
	}
}
}