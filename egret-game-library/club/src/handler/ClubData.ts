module club {
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
		/**默认服务器刷新俱乐部数据  1为5秒前端发送请求数据 */
		clubRefresh: number = 0;
		/**显示刮刮乐 */
		public isShowScratch: number;
		/**俱乐部风格 默认漳州风格 */
		public clubStyle = CLUBSTYLE.ZHANGZHOU;
	}

	export enum CLUBSTYLE {
		ZHANGZHOU,
		GUANGDONG
	}
}