module chessCommonLib {
	export class ResLoadUitl {

	public static Enable:boolean = false;	
	private static isLoad:boolean = false;

	public static load(grp: string[]):void{
		
		var grpName: string = "merge_" + grp.join("|");
		 RES.createGroup(grpName, grp, true);
		RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
		RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
		RES.loadGroup(grpName);
	}

	private static removeEvent():void{
		RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
	  	RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
	}

	private static  onUniLibResLoadComplete(event: RES.ResourceEvent): void {
		 console.warn("Group:" + event.groupName + " loaded");
		 uniLib.ResUtils.removeGroup(event.groupName);
		ResLoadUitl.isLoad = true;
		ResLoadUitl.removeEvent();
	}

	public static hasLoad():boolean{
		if(ResLoadUitl.Enable == false)
			return true;
		else{
			return ResLoadUitl.isLoad;
		}
	}

	private static onUniLibResLoadError(event: RES.ResourceEvent): void {
		ResLoadUitl.removeEvent();
		 console.warn("Group:" + event.groupName + " has failed to load");
	}
	}
}