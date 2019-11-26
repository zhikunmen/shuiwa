module clubnew {
	export class ClubData {
		private static _instance: ClubData;
		public static getInstance(): ClubData {
			if (!this._instance) {
				this._instance = new ClubData();
			}
			return this._instance;
		}

		/**老友圈桌面操作 1:管理  2:成员列表 3:申请列表 4:战况查询*/
		clubChoice: number;
		/**老友圈管理操作 记录当前打开的桌面的老友圈ID */
		clubmatchid: number;
		/**老友圈管理操作 管理页面中所选的的老友圈ID */
		matchid: number;
		/**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
		public clubDayChose: number = 1;
		/**老友圈 是否新创楼层（包厢） */
		isnewfloor: number = 0;
		/**老友圈 新楼层是第几层 */
		newfloor: number = 0;
		/**老友圈 判断是否房主或副房主 */
		isclubmanagor: number = 0
		/**老友圈 判断是否切换楼层 */
		isclubchangefloor: number = 0;

		public getGameIcon(gameid: number): string {
			let config = ConfigMgr.getInstance().getGameCfgById(gameid);
			return uniLib.Global.CdnDomains[0] + uniLib.GameModuleUtils.gameRemotePaths[0] + config.gameTag + "/clubIcon.png";
		}
	}
}