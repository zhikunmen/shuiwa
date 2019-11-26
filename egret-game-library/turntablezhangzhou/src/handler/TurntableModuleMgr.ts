module turntable {
	export class TurntableModuleMgr {
		private static _instance: TurntableModuleMgr;

		public static getInstance(): TurntableModuleMgr {
			if (!this._instance) {
				this._instance = new TurntableModuleMgr();
			}
			return this._instance;
		}
	
	}
}