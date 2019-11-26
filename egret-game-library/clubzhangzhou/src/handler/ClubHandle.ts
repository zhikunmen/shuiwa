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
        if (rev.isClub) {
            if (!Array.isArray(rev.list)) {
                club.ClubModuleMgr.getInstance().showClubListPanel();
            } else {
                club.ClubModuleMgr.getInstance().showAllClubListPanel(() => {
                    clubDispatch(club.ClubConst.HistoryClubList, rev);
                });
            }
        } else {
            clubDispatch(club.ClubConst.HistoryMatchIdList, rev);
        }
    }

    /**老友圈战绩 */
    export function OnGetGameDataHistoryForMatchCmd_S(rev: Cmd.GetGameDataHistoryForMatchCmd_S) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            switch (rev.typ) {
                case club.ClubConst1.MATCH_HISTORY_FOR_MANAGE:
                    clubDispatch(club.ClubConst.MATCH_HISTORY_FOR_MANAGE, rev);
                    break;
                case club.ClubConst1.MATCH_HISTORY_FOR_DESK:
                    clubDispatch(club.ClubConst.MATCH_HISTORY_FOR_DESK, rev);
                    break;
                case club.ClubConst1.MATCH_HISTORY_FOR_MYSELF:
                    clubDispatch(club.ClubConst.MATCH_HISTORY_FOR_MYSELF, rev);
                    break;
                case club.ClubConst1.MATCH_HISTORY_FOR_UID:
                    clubDispatch(club.ClubConst.MATCH_HISTORY_FOR_UID, rev);
                    break;
                case club.ClubConst1.MATCH_HISTORY_FOR_PARTNER:
                    clubDispatch(club.ClubConst.MATCH_HISTORY_FOR_PARTNER, rev);
                    break;
            }
        }
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
                    club.ClubSendMgr.requestClubMatchList();

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
    /**返回 添加、清除备注分数 */
    export function OnRemarkPointMatchGroupCmd_CS(rev: Cmd.RemarkPointMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.RemarkPointMatchGroup, rev);
        }
    }
    /**返回 添加、清除昵称备注 */
    export function OnRemarkNickNameMatchGroupCmd_CS(rev: Cmd.RemarkNickNameMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.RemarkNickNameMatchGroup, rev);
        }
    }
    /**返回 获取可导入群列表*/
    export function OnGetCanImportMemberListMatchGroupCmd_CS(rev: Cmd.GetCanImportMemberListMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubModuleMgr.getInstance().showClubImportPanel(() => {
                clubDispatch(club.ClubConst.GetCanImportMemberListMatchGroup, rev);
            })
        }
    }
    /**返回 成员导入 */
    export function OnImportMemberListMatchGroupCmd_CS(rev: Cmd.ImportMemberListMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.ImportMemberListMatchGroup, rev);
            uniLib.TipsUtils.showConfirm("导入数据成功！", "", "确定", null);
        }
    }

    /**返回黑白名单 */
    export function OnReturnMemberInfoMatchGroupCmd_S(rev: Cmd.ReturnMemberInfoMatchGroupCmd_S) {
        if (rev.typ == 1) {
            club.ClubData.getInstance().ClubMemberMiniList = rev.whitelist;
        } else {
            club.ClubData.getInstance().ClubMemberList = rev.whitelist;
        }
        clubDispatch(club.ClubConst.MemberInfoMatchGroup, rev);
    }
    /**获取可邀请成员列表 */
    export function OnGetCanInviteMemberListMatchGroupCmd_CS(rev: Cmd.GetCanInviteMemberListMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubModuleMgr.getInstance().showClubInvitePlayerPanel(() => {
                clubDispatch(club.ClubConst.GetCanInviteMemberList, rev);
            });
        }
    }

    /**邀请指定玩家到俱乐部中 广播 */
    export function OnInviteMemberMatchGroupCmd_Brd(rev: Cmd.InviteMemberMatchGroupCmd_Brd) {
        club.ClubModuleMgr.getInstance().showClubInviteBrdPanel(() => {
            clubDispatch(club.ClubConst.InviteMemberMatchGroupBrd, rev);
        });
    }

    /**返回查找个人信息 */
    export function OnUserInfoSearchLobbyCmd_S(rev: Cmd.UserInfoSearchLobbyCmd_S) {
        if (rev.resultCode && rev.resultCode == 2) {
            uniLib.TipsUtils.showTipsDownToUp("操作太频繁，请稍后重试！")
        } else if (!rev.resultCode) {
            clubDispatch(club.ClubConst.UserInfoSearchLobby, rev);
        }
    }
    /**邀请指定玩家到俱乐部中 */
    export function OnInviteMemberMatchGroupCmd_CS(rev: Cmd.InviteMemberMatchGroupCmd_CS) {
        clubDispatch(club.ClubConst.InviteMemberMatchGroup, rev);
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

    /** 群主进入合伙人界面 获取合伙人数据 */
    export function OnGetPartnerRecordsMatchGroupCmd_CS(rev: Cmd.GetPartnerRecordsMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.GetPartnerRecordsMatchGroup, rev);
        }
    }
    /** 操作指定合伙人 */
    export function OnOperatePartnerMatchGroupCmd_CS(rev: Cmd.OperatePartnerMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.OperatePartnerMatchGroup, rev);
            if (rev.typ == 1) {
                let cmd = new Cmd.GetPartnerRecordsMatchGroupCmd_CS();
                cmd.matchId = club.ClubData.getInstance().clubmatchid;
                NetMgr.tcpSend(cmd);
            }
        }
    }
    /** 群主申请解除合伙人 发送给合伙人的广播 */
    export function OnRemovePartnerMatchGroupCmd_Brd(rev: Cmd.RemovePartnerMatchGroupCmd_Brd) {
        clubDispatch(club.ClubConst.RemovePartnerMatchGroup, rev);
        let okFunc = function () {
            let cmd = new Cmd.ReplyRemovePartnerMatchGroupCmd_CS();
            cmd.typ = 1;
            cmd.matchId = rev.matchId;
            NetMgr.tcpSend(cmd)
        }
        let noFunc = function () {
            let cmd = new Cmd.ReplyRemovePartnerMatchGroupCmd_CS();
            cmd.typ = 2;
            cmd.matchId = rev.matchId;
            NetMgr.tcpSend(cmd)
        }

        ComponentUtil.getInstance().showConfirm(rev.matchId + "圈主请求解除合伙关系，同意后您的合伙人资格被取消，您的群成员也将脱离此老友圈！", "解除合伙关系", "确定", okFunc, "拒绝", noFunc)

    }
    /** 合伙人 回复是否解除合伙关系 */
    export function OnReplyRemovePartnerMatchGroupCmd_CS(rev: Cmd.ReplyRemovePartnerMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.ReplyRemovePartnerMatchGroup, rev);
        }
    }
    /** 获取组员战绩 */
    export function OnGetMemberRecordsMatchGroupCmd_CS(rev: Cmd.GetMemberRecordsMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.GetMemberRecordsMatchGroup, rev);
        }
    }
    /** 获取可导入组员列表*/
    export function OnGetCanImportMemberList2MatchGroupCmd_CS(rev: Cmd.GetCanImportMemberList2MatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.GetCanImportMemberList2MatchGroup, rev);
            club.ClubData.getInstance().PartnerImportList = rev.memberList;
            club.ClubData.getInstance().PartnerMatchId = rev.matchId;
        }
    }
    /** 添加指定组员到俱乐部中 */
    export function OnImportMember2MatchGroupCmd_CS(rev: Cmd.ImportMember2MatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            uniLib.TipsUtils.showTipsDownToUp("已提交申请，等待审核！");
            clubDispatch(club.ClubConst.ImportMember2MatchGroup, rev);
        }
    }
    /** 移除指定组员 */
    export function OnRemoveMemberMatchGroupCmd_CS(rev: Cmd.RemoveMemberMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.RemoveMemberMatchGroup, rev);
            uniLib.TipsUtils.showTipsDownToUp("此成员已踢出，记录保留24小时！");
        }
    }
    /** 返回定时器*/
    export function OnSetPauseTimerMatchGroupCmd_CS(rev: Cmd.SetPauseTimerMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubData.getInstance().suspendTimer = rev.pauseTimer ? rev.pauseTimer : null;
            club.ClubData.getInstance().renewTimer = rev.restoreTimer ? rev.restoreTimer : null;
        }
    }
    /**返回 添加、清除昵称备注 */
    export function OnCleanMemberWinPointMatchGroupCmd_CS(rev: Cmd.CleanMemberWinPointMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.CleanMemberWinPointMatchGroup, rev);
        }
    }
    /**获取清空的操作记录 */
    export function OnGetCleanRecordMatchGroupCmd_CS(rev: Cmd.GetCleanRecordMatchGroupCmd_CS) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubModuleMgr.getInstance().showClubCleanRecordPanel(() => {
                clubDispatch(club.ClubConst.GetCleanRecordMatchGroup, rev);
            });
        }
    }
    /**审核列表返回 */
	export function OnGetApproveRecordMatchGroupCmd_S(rev:Cmd.GetApproveRecordMatchGroupCmd_S){
		if (!rev.resultCode) {
			club.ClubData.getInstance().applyRecordList = rev;
			uniLib.Global.dispatchEvent(club.ClubConst.GET_APPLYRECORD_LIST, rev);
		}
	}
}