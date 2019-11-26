class TaskReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**任务列表-请求数据 */
	export function OnGetGameTaskListLobbyCmd_S(rev: Cmd.GetGameTaskListLobbyCmd_S) {
		if(rev.resultCode == 0){
			uniLib.Global.dispatchEvent(task.CmdConstant.GAME_TASK_LIST_DATA, rev, true);
		}
		
	}

	/**任务更新 */
	export function OnGetGameTaskScheduleLobbyCmd_S(rev: Cmd.GetGameTaskScheduleLobbyCmd_S) {
		uniLib.Global.dispatchEvent(task.CmdConstant.UPDATE_GAME_TASK_DATA, rev, true);
	}

	/**任务更新 */
	export function OnGetGameTaskRewardLobbyCmd_S(rev: Cmd.GetGameTaskRewardLobbyCmd_S) {
		uniLib.Global.dispatchEvent(task.CmdConstant.NEXT_GAME_TASK_DATA, rev, true);
	}
	
}