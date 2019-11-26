namespace SWGAME {
	/**
	 *
	 * @author 
	 *
	 */
	export class DataCache {
        public static language: string;
        public static langObj: any;
        public static stageHight: number;
        public static stageWidth: number;
        public static defaultWidth:number=1280;
        public static defaultHeight: number = 720;
        public static path:string="";
		public static gameInfo:uniLib.IGameConfig;
		public static destroyResOnExit:boolean=false;
		public static plat:string;
		public static platParam:any;
		public constructor() {
		}
	}
}
