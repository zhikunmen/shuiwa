module Cmd {

    export function clubDispatch(cmd: string, obj?: any, bubbles = true): void {
        uniLib.Global.dispatchEvent(cmd, obj, bubbles)
    }

    export function OnActiveDetailRoomCmd_S(rev: Cmd.ActiveDetailRoomCmd_S) {
        if (!rev.list) {
            club.ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            let cmd = new Cmd.RequestMatchGroupCmd_C();
            NetMgr.tcpSend(cmd);
        }
        else {
            club.ClubModuleMgr.getInstance().showActiveDetailRoomtPanel(() => {
                clubDispatch(club.ClubConst.ActiveDetailRoom, rev);
            });
        }
    }

    /**
	 * 历史匹配组列表
	 */
    export function OnHistoryMatchIdListMatchGroupCmd_S(rev: Cmd.HistoryMatchIdListMatchGroupCmd_S) {
        // if (rev.isClub == 1) {
        // 	LobbyModuleMgr.getInstance().showAllClubListPanel();
        // lobbyDispatch(CmdConstant.ReturnMatchGroupList, rev);
        // } else {
        clubDispatch(club.ClubConst.HistoryMatchIdList, rev);
        // }
    }

    /**返回自己的所有匹配号 */
    export function OnReturnMatchGroupCmd_S(rev: Cmd.ReturnMatchGroupCmd_S) {
        if (uniLib.Global.isInGame == false) {
            if (rev.isClub == 1) {
                if (rev.curMath) {
                    club.ClubModuleMgr.getInstance().showClubDeskPanel(() => {
                        clubDispatch(club.ClubConst.ReturnMatchGroup, rev);
                    });
                } else {
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    club.ClubModuleMgr.getInstance().showAllClubListPanel(() => {
                        let cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        cmd.isClub = 1;
                        NetMgr.tcpSend(cmd);
                    });
                }
            } else {
                clubDispatch(club.ClubConst.ReturnMatchGroupManage, rev);
            }
            club.ClubData.getInstance().isShowScratch = rev.isShowScratch;
        }
    }

    /**
	 * 广播当前桌子最新状况
	 */
    export function OnLatestMatchRoomInfoGroupCmd_Brd(rev: Cmd.LatestMatchRoomInfoGroupCmd_Brd) {
        if (rev) {
            clubDispatch(club.ClubConst.LatestMatchRoom, rev);
        }
    }

    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    export function OnJoinMemberListMatchGroupCmd_S(rev: Cmd.JoinMemberListMatchGroupCmd_S) {
        clubDispatch(club.ClubConst.JoinMemberListMatch, rev);
    }
    /**进房审核 */
    export function OnNotifyImportNoteCmd_S(rev: Cmd.NotifyImportNoteCmd_S) {
        club.ClubModuleMgr.getInstance().shoClubEnterRemarks(() => {
            clubDispatch(club.ClubConst.NotifyImportNoteCmd, rev);
        });
    }
    /**返回公告信息 */
    export function OnClubNoticeMatchGroupCmd_CS(rev: Cmd.ClubNoticeMatchGroupCmd_CS) {
        clubDispatch(club.ClubConst.CLUB_NOTICE, rev);
    }

    /**返回黑白名单 */
    export function OnReturnMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnMemberInfoMatchGroupCmd_S) {
        clubDispatch(club.ClubConst.MemberInfoMatchGroup, rev);
    }

    /**返回查找个人信息 */
    export function OnUserInfoSearchLobbyCmd_S(rev: Cmd.UserInfoSearchLobbyCmd_S) {
        if (rev.resultCode && rev.resultCode == 2) {
            uniLib.TipsUtils.showTipsDownToUp("操作太频繁，请稍后重试！")
        } else {
            club.ClubModuleMgr.getInstance().showClubUserInfoPanel(() => {
                clubDispatch(club.ClubConst.UserInfoSearchLobby, rev);
            });
        }

    }

    /**
	 * 获取黄名单列表
	 */
    export function OnReturnYellowMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnYellowMemberInfoMatchGroupCmd_S) {
        if (rev && rev.list) {
            clubDispatch(club.ClubConst.ReturnYellowList, rev);
        }
    }

    /**
	 * 改变匹配号属性
	 */
    export function OnChangeMatchGroupCmd_S(rev: Cmd.ChangeMatchGroupCmd_S) {
        club.ClubModuleMgr.getInstance().showCreateMatchSetPanel(rev);
    }

    /**
	 * 离开匹配组返回
	 */
    export function OnLeaveMatchGroup2Cmd_S(rev: Cmd.LeaveMatchGroup2Cmd_S) {
        clubDispatch(club.ClubConst.LEAVE_MATCHGROUP2, rev);
    }

    export function OnRequestJoinMemberMatchGroupCmd_S(rev: Cmd.RequestJoinMemberMatchGroupCmd_S) {
        let weChatNum = rev.wechat;
        let msg = "玩家" + rev.nickname + (weChatNum ? "微信:" + weChatNum : "") + "申请加入老友圈" + rev.matchId + ",是否同意进入？"
        function okFunc() {
            let cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
            cmd.matchId = rev.matchId;
            cmd.reply = 1;
            cmd.uid = rev.uid;
            NetMgr.tcpSend(cmd);
        }
        if (MJLobbyData.getInstance().lobbyId < 5000) {//zqb不需要这个title就兼容一下..
            ComponentUtil.getInstance().showConfirm(msg, "", "确定", okFunc, "取消", null);
        } else {
            ComponentUtil.getInstance().showConfirm(msg, "温馨提示", "确定", okFunc, "取消", null);
        }
    }
}