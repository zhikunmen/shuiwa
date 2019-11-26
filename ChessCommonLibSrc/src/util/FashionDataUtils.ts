module chessCommonLib {
	export class FashionDataUtils {
		public constructor() {
		}

		/**
		 * 获取个性头像Id
		 */
		public static getPersonHeadMcId(personInfo: Cmd.PersonalImage[]): number {
			let mcId;
			if (personInfo && personInfo.length > 0) {
				personInfo.forEach(f => {
					if (f.typ == 1 && f.optyp == 1) {
						mcId = personInfo[0].id;
					}
				})
			}
			return mcId;
		}

		/**
		 * 获取VIP设置等级
		 */
		public static getPersonVipLevel(personInfo: Cmd.PersonalImage[]): number {
			let mcId;
			if (personInfo && personInfo.length > 0) {
				personInfo.forEach(f => {
					if (f.typ == 1) {
						if(f.optyp == 1){
							mcId = personInfo[0].id;
						}else if(f.optyp == 2){
							mcId = personInfo[0].vip;
						}
					}
				})
			}
			return mcId;
		}
	}
}