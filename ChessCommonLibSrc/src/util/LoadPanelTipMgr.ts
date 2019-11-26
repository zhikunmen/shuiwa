module chessCommonLib {
	export class LoadPanelTipMgr {
	private static _instance: LoadPanelTipMgr;

	public static getInstance(): LoadPanelTipMgr {
		if (!this._instance) {
			this._instance = new LoadPanelTipMgr();
		}
		return this._instance;
	}

	private _loadPanelVo: LoadPanelVo;


	public loadRes(resouceId?: string,succ?: Function,needH5Load?:boolean):void{
		
		if(uniLib.Global.isH5 && !needH5Load){
			succ.call(null);
		}else{
			if(chessCommonLib.LoadGameTipUtil.loadingGameId != 0){
				uniLib.TipsUtils.showTipsDownToUp("正在加载游戏资源,请等待");
				return;
			}
			if(chessCommonLib.ResLoadUitl.hasLoad() == false){
				uniLib.TipsUtils.showTipsDownToUp("正在加载公共资源,请等待");
				return;
			}
			if(this._loadPanelVo == null){
				this._loadPanelVo = new LoadPanelVo();
				this._loadPanelVo.resouceId = resouceId;
				this._loadPanelVo.succ = succ;
				RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
           		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
           		// RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
           		RES.loadGroup(this._loadPanelVo.resouceId);
				// uniLib.ResLoadMgr.instance.load(this._loadPanelVo.resouceId, this.onLobbyResLoaded, this.onResourceLoadError, this);
			}else{
				uniLib.TipsUtils.showTipsDownToUp("正在加载面板资源,请等待");
			}
		}
	}


	private onResourceProgress(per: number): void {
		// uniLib.UIMgr.instance.showUI(LoadingGameTip, per, null, false, false, this._currentLoadGame.position.x, this._currentLoadGame.position.y);
	}

	private onResourceLoadComplete(evt:RES.ResourceEvent): void {
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
		this._loadPanelVo.succ.call(null);
		this._loadPanelVo  = null;
	}

	private onResourceLoadError(evt:RES.ResourceEvent): void {
		ModuleMgr.getInstance().showConfirm("资源下载失败,请检查网络？", "", "确定");
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
        RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
	}

	public isLoading():boolean{
		if(this._loadPanelVo  == null)
			return false;
		else
			return true;
	}


}

/**
 * 加载位置
 */
class LoadPanelVo {
	resouceId: string;
	succ: Function;
}
}