
module chessCommonLib {
	export class BrSeatVo extends uniLib.Reflect {
		public constructor(obj?: any) {
			super(obj);
		}

		/**
		 * 用户ID
		 */
		public uid: number;

		/**
		 * 头像URL
		 */
		public headUrl: string;

		/**
		 * 昵称
		 */
		public nickName: string;

		/**
		 * 筹码
		 */
		public remainder: number;

		/**
		 * vip等级
		 */
		public vipLevel: number;

		/**
		 * 十二生肖动画
		 */
		public personalImage: Cmd.PersonalImage[]



	}
}
