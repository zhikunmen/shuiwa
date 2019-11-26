module rankList {

	export class RankConst {

		public static RES_JSON = "resource/rankList.res.json";

		public static THM_JSON = "resource/gameEui.json";
		/**
		 * 公共排行榜需要加载的资源组
		 */
		public static PUB_MESSAGE: string = "pub_rank";

		/**
		 * 收藏需要加载的资源组
		 */
		public static LB_SUBSCRIBE: string = "lb_subscribe";
		/**
		 * 排行榜数据
		 */
		public static RANK_DATA: string = "rank_data";
		/**
		 * 捕鱼收藏需要加载的资源组
		 */
		public static BUYU_SUBSCRIBE: string = "buyu_subscribe";
	}
}

module Cmd {
	export function OnGetRankListLobbyCmd_S(rev: Cmd.GetRankListLobbyCmd_S) {
		uniLib.Global.dispatchEvent(rankList.RankConst.RANK_DATA, rev);
	}
}