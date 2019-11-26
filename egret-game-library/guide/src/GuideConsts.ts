module guide {

	export class GuideConsts {

		public static RES_JSON = "resource/guide.res.json";

		public static THM_JSON = "resource/gameEui.json";

		public static REDPACK_DATA = "redpack_data";

		public static GUIDE_TASK_DATA = "guide_task_data";

		public static CLOSE_GUIDE_TASK = "close_guide_task";

		/**
		 * 新的新手指引 -- 签到
		 */
		public static PUB_GUIDE_NEW: string = "pub_guide_new";

		/**新手任务 */
		public static GUIDE_TASK: string = "guide_task";

		/**新手比赛 */
		public static GUIDE_GAME: string = "guide_game";
	}
}

module Cmd {

	export function OnGetNewRedPackdInfoHpMatchCmd_S(rev: Cmd.GetNewRedPackdInfoHpMatchCmd_S) {
		if (uniLib.PopUpMgr.hasPopup(guide.FirstGuidePanel)) {
			uniLib.Global.dispatchEvent(guide.GuideConsts.REDPACK_DATA, rev);
		}
		else {
			uniLib.PopUpMgr.addPopUp(guide.FirstGuidePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, rev);
		}
	}

	export function OnGetGrowTaskInfoHpMatchCmd_S(rev: Cmd.GetGrowTaskInfoHpMatchCmd_S) {
		if (uniLib.PopUpMgr.hasPopup(guide.GuideTaskPanel)) {
			uniLib.Global.dispatchEvent(guide.GuideConsts.GUIDE_TASK_DATA, rev);
		}
		else {
			uniLib.PopUpMgr.addPopUp(guide.GuideTaskPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, rev);
		}
	}
}