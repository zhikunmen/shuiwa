/**
 * 消息接收
 */
module Cmd {
    /**
     * 比赛排行榜
     */
    export function OnRequestRankInfoHpMatchCmd_S(rev: Cmd.RequestRankInfoHpMatchCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_RANKINFO, rev);
        }
    }

    /**
     * 大厅主界面刷新
     */
    export function OnFlushUserHpMatchInfoHpMatchCmd_Brd(rev: Cmd.FlushUserHpMatchInfoHpMatchCmd_Brd) {
        uniLib.Global.dispatchEvent(match.EVENT_FLUSH, rev);
    }

    /**
     * 参加比赛回复
     */
    export function OnRequestJoinHpMatchCmd_S(rev: Cmd.RequestJoinHpMatchCmd_S) {
        if (!rev.resultCode) {
            uniLib.PopUpMgr.removePopUp(match.WxGameDetail);
            egret.log("报名成功");
        }
        else {
            egret.error("报名失败");
        }
    }

    /**
     * 参加比赛广播 游戏里面点击再来一局服务器会直接下发这个消息
     */
    export function OnWaitListHpMatchCmd_Brd(rev: WaitListHpMatchCmd_Brd) {
        uniLib.PopUpMgr.removePopUp(match.WxGameDetail);
        let config = table.getMatchConfigBySceneId(rev.sceneId);
        if (match.matchWaitPanel) {
            match.matchWaitPanel.update(rev);
        }
        else {
            if (config.HaoPaiMatchType == match.GameType.TYPE_OUT || config.HaoPaiMatchType == match.GameType.TYPE_DIAMOND) {
                match.matchWaitPanel = new match.WxEliminateWait(rev);
            }
            else {
                match.matchWaitPanel = new match.WxMatchWait(rev);
            }
            egret.MainContext.instance.stage.addChild(match.matchWaitPanel);
        }
    }

    /**
     * 取消匹配等待
     */
    export function OnRequestExitHpMatchCmd_S(rev: Cmd.RequestExitHpMatchCmd_S) {
        if (!rev.resultCode) {
            if (match.matchWaitPanel) {
                match.matchWaitPanel.destroy();
                match.matchWaitPanel = null;
            }
        }
    }

    /**
     * 获奖记录
     */
    export function OnRequestRewardRecordHpMatchCmd_S(rev: Cmd.RequestRewardRecordHpMatchCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_REWARDRECORD, rev);
        }
    }

    /**
     * 战绩
     */
    export function OnRequestHistoryHpMatchCmd_S(rev: Cmd.RequestHistoryHpMatchCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_HISTORY, rev);
        }
    }

    /**
     * 当前红包奖励
     */
    export function OnGetRedPackRewardInfoLobbyCmd_S(rev: Cmd.GetRedPackRewardInfoLobbyCmd_S) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(match.EVENT_PACKAGEREWARD, rev);
        }
    }

    export function OnRequestUnLockHpMatchCmd_S(rev: Cmd.RequestUnLockHpMatchCmd_S) {
        if (!rev.resultCode) {
            uniLib.PopUpMgr.removePopUp(match.WxUnlockGame);
            uniLib.TipsUtils.showTipsDownToUp("解锁成功");
        }
    }

    export function OnGetTimerMatchUserHpMatchCmd_S(rev: Cmd.GetTimerMatchUserHpMatchCmd_S) {
        if (!rev.resultCode)
            uniLib.Global.dispatchEvent(match.EVENT_REPORT_NUM, rev.nbr);
    }

    export function OnEnterMatchRoomCmd_S(rev: Cmd.EnterMatchRoomCmd_S) {
        if (rev.resultCode == 6) {
            let confirm = new commonConfirm.ConfirmPanel("金币不足啦，快去兑换更多金币吧!", null, null, () => {
                LobbyModuleMgr.getInstance().showMarketPanel(1);
            }, () => { }, this);
            uniLib.PopUpMgr.addPopUp(confirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
    }

    /**所有场次信息 全部在这一条协议 */
    export function OnGetSceneInfoHpMatchCmd_S(rev: Cmd.GetSceneInfoHpMatchCmd_S) {
        let scene = match.sceneInfoMap.get(rev.gameId);
        if (!scene) {
            match.sceneInfoMap.set(rev.gameId, rev);
        }
        else {
            rev.cInfos && (scene.cInfos = rev.cInfos);
            rev.rInfos && (scene.rInfos = rev.rInfos);
            rev.sInfos && (scene.sInfos = rev.sInfos);
            rev.mInfos && (scene.mInfos = rev.mInfos);
        }
        let pigRush = rev.cInfos || rev.rInfos;
        if (pigRush) {
            if (uniLib.PopUpMgr.hasPopup(match.WxPigRushThrough)) {
                uniLib.Global.dispatchEvent(match.EVENT_PIG_DATA, pigRush);
            }
            else {
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_PIG, () => {
                    uniLib.PopUpMgr.addPopUp(match.WxPigRushThrough, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { data: pigRush, gameId: rev.gameId });
                })
            }
        }
        else if (rev.sInfos) {
            LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_GOLD, () => {
                uniLib.PopUpMgr.addPopUp(match.WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, rev.sInfos);
            })
        }
        else if (rev.mInfos) {
            if (uniLib.PopUpMgr.hasPopup(match.WxGameList)) {
                uniLib.Global.dispatchEvent(match.EVENT_GAMELIST, rev.mInfos);
            }
            else {
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_MATCH, () => {
                    uniLib.PopUpMgr.addPopUp(match.WxGameList, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, rev.mInfos);
                });
            }
        }
    }
}

/**
 * 消息发送
 */
module match {
    /**
	 * @param type BigSceneType 1:金币场 2:金银猪 3:闯关 4:比赛
	 * @param gameId mathch.GameId
	 */
    export function OnGetSceneInfoHpMatchCmd_C(type: BigSceneType, gameId: number, lobbyId: number = MJLobbyData.getInstance().lobbyId) {
        let scene = match.sceneInfoMap.get(gameId);
        if (scene) {
            if (type == 1 && scene.sInfos) {
                LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_GOLD, () => {
                    uniLib.PopUpMgr.addPopUp(match.WxGoldSelectType, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, scene.sInfos);
                })
                return;
            }
            else if (type == 2 && scene.cInfos) {
                if (uniLib.PopUpMgr.hasPopup(match.WxPigRushThrough)) {
                    uniLib.Global.dispatchEvent(match.EVENT_PIG_DATA, scene.cInfos);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_PIG, () => {
                        uniLib.PopUpMgr.addPopUp(match.WxPigRushThrough, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { data: scene.cInfos, gameId: scene.gameId });
                    })
                }
                return;
            }
            else if (type == 3 && scene.rInfos) {
                if (uniLib.PopUpMgr.hasPopup(match.WxPigRushThrough)) {
                    uniLib.Global.dispatchEvent(match.EVENT_PIG_DATA, scene.rInfos);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_PIG, () => {
                        uniLib.PopUpMgr.addPopUp(match.WxPigRushThrough, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, { data: scene.rInfos, gameId: scene.gameId });
                    })
                }
                return;
            }
            else if (type == 4 && scene.mInfos) {
                if (uniLib.PopUpMgr.hasPopup(match.WxGameList)) {
                    uniLib.Global.dispatchEvent(match.EVENT_GAMELIST, scene.mInfos);
                }
                else {
                    LoadPanelTipMgr.getInstance().loadRes(match.MatchConst.HPW_MATCH, () => {
                        uniLib.PopUpMgr.addPopUp(match.WxGameList, null, true, false, 0, uniLib.PopUpEffect.NOMAL, 0, 0, scene.mInfos);
                    });
                }
                return;
            }
        }
        let req = new Cmd.GetSceneInfoHpMatchCmd_C();
        req.typ = type;
        if (lobbyId == 59)   //当前只有微信小游戏 好彩麻将大厅是这样子的
            req.gameId = GameId.ID_ERMJ;
        else
            req.gameId = gameId;
        req.lobbyId = lobbyId;
        NetMgr.tcpSend(req);
    }

    /**
     * 请求排行榜
     */
    export function OnRequestRankInfoHpMatchCmd_C(curPage: number, gameId: number = 4231) {
        let req = new Cmd.RequestRankInfoHpMatchCmd_C();
        req.curPage = curPage;
        req.gameId = gameId;
        NetMgr.tcpSend(req);
    }

    /**
     * 报名 参加比赛
     */
    export function OnRequestJoinHpMatchCmd_C(sceneId: number, gameId: number = 4231) {
        let req = new Cmd.RequestJoinHpMatchCmd_C();
        req.gameId = gameId;
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }

    export function OnRequestExitHpMatchCmd_C(type: number) {
        let req = new Cmd.RequestExitHpMatchCmd_C();
        req.opType = type;
        NetMgr.tcpSend(req);
    }

    /**
     * 请求获奖记录
     */
    export function OnRequestRewardRecordHpMatchCmd_C(curPage: number, sceneId: number) {
        let req = new Cmd.RequestRewardRecordHpMatchCmd_C();
        req.curPage = curPage;
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }

    /**
     * 战绩记录
     */
    export function OnRequestHistoryHpMatchCmd_C(curPage: number, type: number = 0, gameId: number = 4231) {
        let req = new Cmd.RequestHistoryHpMatchCmd_C();
        req.gameId = gameId;
        req.typ = 0;
        req.curPage = curPage;
        NetMgr.tcpSend(req);
    }

    /**
     * 打开红包界面
     */
    export function OnGetRedPackRewardInfoLobbyCmd_C(lobbyId: number = 41) {
        let req = new Cmd.GetRedPackRewardInfoLobbyCmd_C();
        req.lobbyId = lobbyId;
        NetMgr.tcpSend(req);
    }

    /**
     * 钻石解锁
     */
    export function OnRequestUnLockHpMatchCmd_C(sceneId: number) {
        let req = new Cmd.RequestUnLockHpMatchCmd_C();
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }

    /**
     * 获取限时赛报名人数
     */
    export function OnGetTimerMatchUserHpMatchCmd_C(sceneId: number) {
        let req = new Cmd.GetTimerMatchUserHpMatchCmd_C();
        req.sceneId = sceneId;
        NetMgr.tcpSend(req);
    }

    /**
     * 进入匹配场
     */
    export function OnEnterMatchRoomCmd_C(gameId: number, scene: number) {
        let req = new Cmd.EnterMatchRoomCmd_C();
        req.lobbyId = MJLobbyData.getInstance().lobbyId;
        req.gameId = gameId;
        req.scene = scene;
        req.gambleType = 1;
        NetMgr.tcpSend(req);
    }

    /**
   * 进入金猪银猪闯关
   */
    export function OnEnterChallengeHpMatchCmd_C(type: number, round: number, gameId: number) {
        let req = new Cmd.EnterChallengeHpMatchCmd_C();
        req.type = type;
        req.round = round;
        if (MJLobbyData.getInstance().lobbyId == 59)
            req.gameId = GameId.ID_ERMJ;
        else
            req.gameId = gameId;
        NetMgr.tcpSend(req);
    }

    /**请求闯关 */
    export function OnEnterRushHpMatchCmd_C(type: number, gameId: number) {
        let req = new Cmd.EnterRushHpMatchCmd_C();
        if (MJLobbyData.getInstance().lobbyId == 59)
            req.gameId = GameId.ID_ERMJ;
        else
            req.gameId = gameId;
        req.type = type;
        NetMgr.tcpSend(req);
    }
}

module table {
    /**
     * 通过sceneId获取配置
     */
    export function getMatchConfigBySceneId(matchId: number): TableMatchReward {
        let config: TableMatchReward[] = RES.getRes("TableMatchReward_json");
        if (config) {
            for (let i = 0; i < config.length; i++) {
                if (config[i].HaoPaiSceneId == matchId) {
                    return config[i];
                }
            }
        }
        else {
            egret.error("TableMatchReward.json获取失败");
        }
    }
}