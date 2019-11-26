module chessCommonLib {
	export class UserInfoMgr {
		private static _data: Cmd.UserBaseInfo;

        /**
         * 用户ID
         */
		public static uid: number;

        /**
         * 用户ID
         */
		public static nickName: string;

        /**
         * 所属平台ID
         */
		public static platId: number;

        /**
         * 用户ID
         */
		public static subPlatId: string;

        /**
         * 用户筹码
         */
		private static _chips: number = 0;

        /**
         * 金币  ---  捕鱼大厅金币<捕鱼大厅专用>
         */
		private static _goldChips: number = 0;
        /**
         * 体验币 ---  捕鱼大厅体验币<捕鱼大厅专用>
         */
		private static _freeChips: number = 0;

        /**
         * 用户头像地址
         */
		private static _headUrl: string;

        /**
		 * 性别
		 */
		public static gender: string;

        /**
		 * email
		 */
		public static email: string;

        /**
        * 个性签名
        */
		public static signature: string;

        /**
        * 奖券数量
        */
		public static _giftCoupon: number = 0;

        /**
         * 用户等级
         */
		public static level: number;

        /**
        * 在线礼包时间 为-1时没有礼包可领
        */
		private static _ol_Time: number = -1;
		/**
		 * 聊天计时
		*/
		private static _isClick: boolean = true;
        /**
        * 银行存款
        */
		public static _bankChips: number;

		public static sumRecharge: number;

		public static total_ol_Time: number;

        /**
        * 房卡
        */
		public static _fangka: number;

        /**
         * 钻石
         */
		public static _diamond: number;

        /**
        * 在线礼包时间
        */
		public static get ol_Time(): number {
			return this._ol_Time;
		}

		public static get fangka(): number {
			return this._fangka;
		}
		public static get isClick(): boolean {
			return this._isClick;
		}

		public static set isClick(val: boolean) {
			if (this._isClick == val)
				return;
			this._isClick = val
		}
		public static get diamond(): number {
			return this._diamond;
		}

		public static set diamond(val: number) {
			if (this._diamond == val)
				return;
			this._diamond = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.DIAMOND);
		}

        /**
        * 在线礼包时间
        */
		public static set ol_Time(time: number) {
			this._ol_Time = time;
		}

        /**
         * 是否显示滑动： 0:不显示; 1：右滑; 2：左滑
         */
		public static slipStatus: number = 1;

		public static get data(): Cmd.UserBaseInfo {
			return this._data;
		}

		// public static initByCmd(msg:Cmd.UserInfoSynLobbyCmd_S):void{

		// }

		public static init(info: any, initGold: boolean = true): void {
			this._data = info;
			this.uid = info.uid;
			if (info.headUrl || info.headurl) {
				this._headUrl = info.headUrl || info.headurl;
			} else {
				this._headUrl = "";
			}
			this.nickName = info.nickName || info.nickname;
			this.gender = info.gender;
			this.platId = info.platId;
			this.subPlatId = info.subPlatId;
			if (initGold == true && info.remainder) {
				this._chips = info.remainder;
				this._goldChips = info.remainder;
			}
			if (info.hasOwnProperty("chips")) {
				this._chips = info.chips;
			}
			if (info.goldcoin) //捕鱼大厅金币字段
				this._goldChips = info.goldcoin;
			if (info.trailscore)
				this._chips = info.trailscore;
			if (info.bankChips)
				this._bankChips = info.bankChips;
			if (info.sumRecharge)
				this.sumRecharge = info.sumRecharge;
			if (info.signature)
				this.signature = info.signature;
			if (info.hasOwnProperty("giftCoupon"))
				this._giftCoupon = info.giftCoupon;
			else if (info.hasOwnProperty("ticket"))
				this._giftCoupon = info.ticket;
			if (info.trailcoin)
				this._freeChips = info.trailcoin;
			if (info.hasOwnProperty("fangka"))
				this._fangka = info.fangka;
			else if (info.hasOwnProperty("card"))
				this.fangka = info.card;
			if (info.hasOwnProperty("diamond"))
				this._diamond = info.diamond;
		}

        /**
         * VIP等级
         */
		public static vipLevel: number;

		public static set chips(val: number) {
			if (this._chips == val)
				return;
			this._chips = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.CHIPS);
		}

		public static set fangka(val: number) {
			if (this._fangka == val)
				return;
			this._fangka = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.FANGKA);
		}

		public static get chips(): number {
			return this._chips;
		}

		/**捕鱼大厅金币 */
		public static set goldChips(val: number) {
			if (this._goldChips == val)
				return;
			this._goldChips = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.GOLDCHIPS);
		}

		/**捕鱼大厅金币 */
		public static get goldChips(): number {
			return this._goldChips;
		}

        /**
         * 体验币
         */
		public static set freeChips(val: number) {
			if (this._freeChips == val)
				return;
			this._freeChips = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.FREECHIPS);
		}

        /**
         * 体验币
         */
		public static get freeChips(): number {
			return this._freeChips;
		}

        /**
        * 头像
        */
		public static set headUrl(val: string) {
			if (this._headUrl == val)
				return;
			this._headUrl = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.HEADURL);
		}

        /**
         * 头像
         */
		public static get headUrl(): string {
			return this._headUrl;
		}

        /**
         * 第三方平台积分余额
         */
		private static _platPoint: number = 0;

		public static set platPoint(val: number) {
			this._platPoint = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.PLAT_POINT);
		}

		public static get platPoint(): number {
			return this._platPoint;
		}


		public static set bankChips(val: number) {
			this._bankChips = val;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.BANK_CHIPS);
		}

		public static get bankChips(): number {
			return this._bankChips;
		}

		public static set nickname(name: string) {
			this.nickName = name;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.NICKNAME);
		}

		public static get nickname(): string {
			return this.nickName;
		}


		public static set giftCoupon(cou: number) {
			this._giftCoupon = cou;
			uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.GIFTCOUPON);
		}

        /**
        *获取奖券数量
        */
		public static get giftCoupon(): number {
			return this._giftCoupon ? this._giftCoupon : 0;
		}
	}
}