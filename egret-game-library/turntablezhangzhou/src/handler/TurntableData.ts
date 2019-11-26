module turntable {
	export class TurntableData {
		private static _instance: TurntableData;
		public static getInstance(): TurntableData {
			if (!this._instance) {
				this._instance = new TurntableData();
			}
			return this._instance;
		}

		/**是否当前可以转转盘 */
		public canTurnTable: Boolean = false;
	}


}