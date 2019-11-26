class RewardReciveMgr {
	public constructor() {
	}
}
module Cmd {
	/**
 * 获取新手奖励信息
 */
	export function OnGetNoviceInfodLobbyCmd_S(rev: Cmd.GetNoviceInfodLobbyCmd_S) {
		if (!rev.resultCode) {
			uniLib.Global.dispatchEvent(reward.CmdConstant.NOVICEINFO, rev.noviceInfo);
		}
	}
	/**
	 * 领取新手奖励
	 */
	export function OnGetNoviceRewarddLobbyCmd_S(rev: Cmd.GetNoviceRewarddLobbyCmd_S) {
		if (!rev.resultCode) {
			uniLib.PopUpMgr.removePopUp(reward.FuLiPanel);
			// uniLib.Global.dispatchEvent(reward.CmdConstant.NOVICEREWARD, rev);
		}
	}

	/**
	 * 返回每日任务
	 */
	export function OnIntoFreeGoldLobbyCmd_S(rev: Cmd.IntoFreeGoldLobbyCmd_S) {
		if (!rev.resultCode) {
			uniLib.Global.dispatchEvent(reward.CmdConstant.INTOFREEGOLD, rev);
		}
	}

	/**
	 * 领取奖励
	 */
	export function OnGetDaysTaskRewardLobbyCmd_S(rev: Cmd.GetDaysTaskRewardLobbyCmd_S) {
		uniLib.Global.dispatchEvent(reward.CmdConstant.DAYSTASKREWARD, rev);
		let config: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(rev.taskId);
		if (config && config.taskReward) {
			var ary: Cmd.RewardItem[] = [];
			for (var i: number = 0; i < config.taskReward.length; i++) {
				var vo: Cmd.RewardItem = new Cmd.RewardItem();
				vo.goodId = config.taskReward[i].goodId;
				vo.goodNbr = config.taskReward[i].goodNbr;
				ary.push(vo);
			}
			let panel: commonConfirm.RewardPanel = new commonConfirm.RewardPanel();
			panel.initData2(ary);
			if(uniLib.Global.isInGame && LobbyModuleMgr.getInstance().panelScaleX){
				panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
				uniLib.PopUpMgr.addPopUp(panel, null, true, true,0, uniLib.PopUpEffect.NOMAL,1280*panel.scaleX,720);
			}else{
				uniLib.PopUpMgr.addPopUp(panel, null, true, false);
			}
		}
	}

	/**
	 * 领钻石列表数据
	 */
	export function OnGetIosInviteInfoLittleGameLobbyCmd_S(rev: Cmd.GetIosInviteInfoLittleGameLobbyCmd_S) {
		uniLib.Global.dispatchEvent(reward.CmdConstant.IOSINVITEINFOLITTLE, rev);
	}

	/**
	 * 领钻石
	 */
	export function OnGetIosInviteRewardLittleGameLobbyCmd_S(rev: Cmd.GetIosInviteRewardLittleGameLobbyCmd_S) {
		if (!rev.resultCode) {
			uniLib.Global.dispatchEvent(reward.CmdConstant.IOSINVITEREWARDLITTLE, rev);
			var goods = rev.single.goods;
			if (goods) {
				var vo: commonConfirm.ReWardDataVo = new commonConfirm.ReWardDataVo();
				vo.getDataByGoodId(goods.goodsId, goods.goodsNum);

				let panel: commonConfirm.RewardPanel = new commonConfirm.RewardPanel();
				panel.initData([vo]);
				if(uniLib.Global.isInGame && LobbyModuleMgr.getInstance().panelScaleX){
					panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
					uniLib.PopUpMgr.addPopUp(panel, null, true, true,0, uniLib.PopUpEffect.NOMAL,1280*panel.scaleX,720);
				}else{
					uniLib.PopUpMgr.addPopUp(panel, null, true, false);
				}
				wxgame.Global.instance.aldSendEvent("周边系统", "领钻石领取成功");
			}
		}

	}

	export function OnGetDiamondInterfaceTips_S(rev: Cmd.GetDiamondInterfaceTips_S) {
		uniLib.Global.dispatchEvent(reward.CmdConstant.DIAMONDINTERFACETIPS, rev);
	}

	/**
	 * 新人福利任务
	 */
	export function OnRequestOnceTaskLobbyCmd_S(rev: Cmd.RequestOnceTaskLobbyCmd_S) {
		if(rev.resultCode == null)
			rev.resultCode = 0;
		if(rev.resultCode == 0)
			uniLib.Global.dispatchEvent(reward.CmdConstant.NEW_ONCETASK_LOBBY, rev);
	}

	/**
	 * 新人福利领取奖励
	 */
	export function OnGetOnceRewardLobbyCmd_S(rev: Cmd.GetOnceRewardLobbyCmd_S) {
		if(rev.resultCode == null)
			rev.resultCode = 0;
		if(rev.resultCode == 0)
			uniLib.Global.dispatchEvent(reward.CmdConstant.NEW_ONCEREWARD_LOBBY, rev);
	}

	/**
	 * 新人福利领取奖励
	 */
	export function OnUpdateDaysTaskLobbyCmd_S(rev: Cmd.UpdateDaysTaskLobbyCmd_S) {
		uniLib.Global.dispatchEvent(reward.CmdConstant.UPDATE_DAYS_TASK_LOBBY, rev);
	}
}