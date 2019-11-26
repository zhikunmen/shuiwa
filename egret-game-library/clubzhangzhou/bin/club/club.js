var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = this && this.__extends || function __extends(t, e) { 
 function r() { 
 this.constructor = t;
}
for (var i in e) e.hasOwnProperty(i) && (t[i] = e[i]);
r.prototype = e.prototype, t.prototype = new r();
};
var club;
(function (club) {
    /**
    * 单个房间详情 玩家头像
    */
    var ClubPlayerListHeadPanel = (function (_super) {
        __extends(ClubPlayerListHeadPanel, _super);
        function ClubPlayerListHeadPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPlayerListHeadSkin";
            _this._ownerImg.visible = false;
            _this._adminImg.visible = false;
            return _this;
        }
        ClubPlayerListHeadPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this._headImg.source = this.info.headUrl;
            if (this.info.state == 1) {
                this._onlineImg.visible = true;
            }
            else {
                this._onlineImg.visible = false;
            }
            if (this.info.membertype == 1) {
                this._onlineImg.visible = false;
                this._ownerImg.visible = true;
            }
            if (this.info.membertype == 2) {
                this._onlineImg.visible = false;
                this._adminImg.visible = true;
            }
            if (this.info.membertype != 1 && this.info.membertype != 2) {
                if (club.ClubData.getInstance().clubDeleteUser) {
                    this._deleteBtn.visible = true;
                }
                else {
                    this._deleteBtn.visible = false;
                }
            }
            var name = this.info.nickname;
            var strLength;
            var wei;
            if (this.getStrRealLength(name) > 8) {
                wei = "...";
            }
            else {
                wei = "";
                ;
            }
            while (this.getStrRealLength(name) > 8) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            this._nameTxt.text = name + wei;
            this._idTxt.text = this.info.uid + "";
        };
        /**限制昵称长度 */
        ClubPlayerListHeadPanel.prototype.getStrRealLength = function (str) {
            var jmz = { GetLength: null };
            jmz.GetLength = function (str) {
                return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length); //先把中文替换成两个字节的英文，再计算长度
            };
            return jmz.GetLength(str);
        };
        return ClubPlayerListHeadPanel;
    }(eui.ItemRenderer));
    club.ClubPlayerListHeadPanel = ClubPlayerListHeadPanel;
    __reflect(ClubPlayerListHeadPanel.prototype, "club.ClubPlayerListHeadPanel");
})(club || (club = {}));
var club;
(function (club) {
    var ClubConst = (function () {
        function ClubConst() {
        }
        ClubConst.RES_JSON = "resource/club/club.res_3735f23a.json";
        ClubConst.RES_JSON_GUANGDONG = "resource/club_guangdong.res.json";
        ClubConst.THM_JSON = "resource/club/gameEui_7a4fbc2f.json";
        /**
         * 公共loading需要加载的资源组
         */
        ClubConst.PUB_CLUB = "pub_club";
        /**数据无误 */
        ClubConst.SUCCESS = 0;
        /** */
        ClubConst.ActiveDetailRoom = "ActiveDetailRoom";
        /**历史匹配记录 */
        ClubConst.HistoryMatchIdList = "HistoryMatchIdList";
        /**老友圈用历史匹配记录 */
        ClubConst.HistoryClubList = "HistoryClubList";
        /**匹配号数据 */
        ClubConst.ReturnMatchGroup = "ReturnMatchGroup";
        /**匹配号管理数据 */
        ClubConst.ReturnMatchGroupManage = "ReturnMatchGroupManage";
        /**俱乐部广播当前桌子最新状况事件 */
        ClubConst.LatestMatchRoom = "LatestMatchRoom";
        /**白名单消息列表 */
        ClubConst.JoinMemberListMatch = "JoinMemberListMatch";
        /**申请进入房间 */
        ClubConst.NotifyImportNoteCmd = "NotifyImportNoteCmd";
        /**获取清空的操作记录 */
        ClubConst.GetCleanRecordMatchGroup = "GetCleanRecordMatchGroup";
        /**返回老友圈公告信息 */
        ClubConst.CLUB_NOTICE = "CLUB_NOTICE";
        /**返回黑白名单 */
        ClubConst.MemberInfoMatchGroup = "MemberInfoMatchGroup";
        /**大厅查找玩家信息*/
        ClubConst.UserInfoSearchLobby = "UserInfoSearchLobby";
        /**返回黄名单列表 */
        ClubConst.ReturnYellowList = "ReturnYellowList";
        /**离开匹配组返回  */
        ClubConst.LEAVE_MATCHGROUP2 = "LEAVEMATCHGROUP2";
        /** 战绩数据按页返回*/
        ClubConst.HISTORY_DATA = "HISTORY_DATA";
        /**获取可邀请成员列表 */
        ClubConst.GetCanInviteMemberList = "GetCanInviteMemberList";
        /**邀请指定玩家到俱乐部中 */
        ClubConst.InviteMemberMatchGroup = "InviteMemberMatchGroup";
        /**邀请指定玩家到俱乐部中 广播 */
        ClubConst.InviteMemberMatchGroupBrd = "InviteMemberMatchGroupBrd";
        /**俱乐部添加、清除备注分数 */
        ClubConst.RemarkPointMatchGroup = "RemarkPointMatchGroup";
        /**俱乐部 添加、清除昵称备注*/
        ClubConst.RemarkNickNameMatchGroup = "RemarkNickNameMatchGroup";
        /** 清除数据返回*/
        ClubConst.CleanMemberWinPointMatchGroup = "CleanMemberWinPointMatchGroup";
        /** 俱乐部获取可导入群列表 */
        ClubConst.GetCanImportMemberListMatchGroup = "GetCanImportMemberListMatchGroup";
        /**俱乐部 成员导入*/
        ClubConst.ImportMemberListMatchGroup = "ImportMemberListMatchGroup";
        /**群主进入合伙人界面 获取合伙人数据 */
        ClubConst.GetPartnerRecordsMatchGroup = "GetPartnerRecordsMatchGroup";
        /**操作指定合伙人 */
        ClubConst.OperatePartnerMatchGroup = "OperatePartnerMatchGroup";
        /**群主申请解除合伙人 发送给合伙人的广播 */
        ClubConst.RemovePartnerMatchGroup = "RemovePartnerMatchGroup";
        /**合伙人 回复是否解除合伙关系 */
        ClubConst.ReplyRemovePartnerMatchGroup = "ReplyRemovePartnerMatchGroup";
        /**获取组员战绩 */
        ClubConst.GetMemberRecordsMatchGroup = "GetMemberRecordsMatchGroup";
        /**获取可导入组员列表 */
        ClubConst.GetCanImportMemberList2MatchGroup = "GetCanImportMemberList2MatchGroup";
        /**添加指定组员到俱乐部中 */
        ClubConst.ImportMember2MatchGroup = "ImportMember2MatchGroup";
        /**移除指定组员 */
        ClubConst.RemoveMemberMatchGroup = "RemoveMemberMatchGroup";
        /**老友圈战绩  管理界面战况查询*/
        ClubConst.MATCH_HISTORY_FOR_MANAGE = "MATCH_HISTORY_FOR_MANAGE";
        /**老友圈战绩  管理员点击俱乐部桌面群战绩*/
        ClubConst.MATCH_HISTORY_FOR_DESK = "MATCH_HISTORY_FOR_DESK";
        /**老友圈战绩  管理员点击我的战绩或群员点击本群战绩*/
        ClubConst.MATCH_HISTORY_FOR_MYSELF = "MATCH_HISTORY_FOR_MYSELF";
        /**老友圈战绩  获取指定成员的战绩*/
        ClubConst.MATCH_HISTORY_FOR_UID = "MATCH_HISTORY_FOR_UID";
        /**老友圈战绩   合伙人那里点玩家详情跟管理员那里点玩家详情*/
        ClubConst.MATCH_HISTORY_FOR_PARTNER = "MATCH_HISTORY_FOR_PARTNER";
        /**审核记录列表 */
        ClubConst.GET_APPLYRECORD_LIST = "get_applyrecord_list";
        /**俱乐部桌面桌子创建房间选项*/
        ClubConst.CLUB_CREATEDESK = 9;
        /**俱乐部桌面桌子前八张桌子显示*/
        ClubConst.CLUB_DESKSHOW = 8;
        /**俱乐部桌面桌 无人座位*/
        ClubConst.DESK_NOUSER = 8;
        /**俱乐部邀请玩家的状态 离线*/
        ClubConst.OnlineState_Offline = 0;
        /**俱乐部邀请玩家的状态 在线 空闲状态*/
        ClubConst.OnlineState_Online = 1;
        /**俱乐部邀请玩家的状态 网络差*/
        ClubConst.OnlineState_Slow = 2;
        /**俱乐部邀请玩家的状态 离开,切后台*/
        ClubConst.OnlineState_Leave = 3;
        /**俱乐部邀请玩家的状态 电话中*/
        ClubConst.OnlineState_Calling = 4;
        /**俱乐部邀请玩家的状态 托管状态*/
        ClubConst.OnlineState_Hosting = 5;
        /**俱乐部邀请玩家的状态 排队中,匹配号用*/
        ClubConst.OnlineState_Waiting = 6;
        /**俱乐部邀请玩家的状态 游戏中,匹配号用*/
        ClubConst.OnlineState_Gameing = 7;
        /**俱乐部邀请玩家的状态 观战状态*/
        ClubConst.OnlineState_Watching = 8;
        /**俱乐部邀请玩家的状态 已邀请状态,漳州匹配号用*/
        ClubConst.OnlineState_Invited = 9;
        /**老友圈 成员列表玩家的状态 0表示游客 */
        ClubConst.CLUB_TOURIST = 0;
        /**老友圈 成员列表玩家的状态 1表示白名单 */
        ClubConst.CLUB_WHITE = 1;
        /**老友圈 成员列表玩家的状态 2表示黑名单 */
        ClubConst.CLUB_BLACK = 2;
        /**老友圈 成员列表玩家的状态 3表示黄名单 */
        ClubConst.CLUB_YELLOW = 3;
        return ClubConst;
    }());
    club.ClubConst = ClubConst;
    __reflect(ClubConst.prototype, "club.ClubConst");
    var ClubConst1 = (function () {
        function ClubConst1() {
        }
        /**老友圈战绩  管理界面战况查询 1*/
        ClubConst1.MATCH_HISTORY_FOR_MANAGE = 1;
        /**老友圈战绩  管理员点击俱乐部桌面群战绩2 */
        ClubConst1.MATCH_HISTORY_FOR_DESK = 2;
        /**老友圈战绩  管理员点击我的战绩或群员点击本群战绩3*/
        ClubConst1.MATCH_HISTORY_FOR_MYSELF = 3;
        /**老友圈战绩  获取指定成员的战绩4*/
        ClubConst1.MATCH_HISTORY_FOR_UID = 4;
        /**老友圈战绩 合伙人那里点玩家详情跟管理员那里点玩家详情5*/
        ClubConst1.MATCH_HISTORY_FOR_PARTNER = 5;
        return ClubConst1;
    }());
    club.ClubConst1 = ClubConst1;
    __reflect(ClubConst1.prototype, "club.ClubConst1");
})(club || (club = {}));
var Cmd;
(function (Cmd) {
    function clubDispatch(cmd, obj, bubbles) {
        if (bubbles === void 0) { bubbles = true; }
        uniLib.Global.dispatchEvent(cmd, obj, bubbles);
    }
    Cmd.clubDispatch = clubDispatch;
    function OnActiveDetailRoomCmd_S(rev) {
        if (!rev.list) {
            club.ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            var cmd = new Cmd.RequestMatchGroupCmd_C();
            NetMgr.tcpSend(cmd);
        }
        else {
            club.ClubModuleMgr.getInstance().showActiveDetailRoomtPanel(function () {
                clubDispatch(club.ClubConst.ActiveDetailRoom, rev);
            });
        }
    }
    Cmd.OnActiveDetailRoomCmd_S = OnActiveDetailRoomCmd_S;
    /**
     * 历史匹配组列表
     */
    function OnHistoryMatchIdListMatchGroupCmd_S(rev) {
        if (rev.isClub) {
            if (!Array.isArray(rev.list)) {
                club.ClubModuleMgr.getInstance().showClubListPanel();
            }
            else {
                club.ClubModuleMgr.getInstance().showAllClubListPanel(function () {
                    clubDispatch(club.ClubConst.HistoryClubList, rev);
                });
            }
        }
        else {
            clubDispatch(club.ClubConst.HistoryMatchIdList, rev);
        }
    }
    Cmd.OnHistoryMatchIdListMatchGroupCmd_S = OnHistoryMatchIdListMatchGroupCmd_S;
    /**老友圈战绩 */
    function OnGetGameDataHistoryForMatchCmd_S(rev) {
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
    Cmd.OnGetGameDataHistoryForMatchCmd_S = OnGetGameDataHistoryForMatchCmd_S;
    /**返回自己的所有匹配号 */
    function OnReturnMatchGroupCmd_S(rev) {
        if (uniLib.Global.isInGame == false) {
            if (rev.isClub == 1) {
                if (rev.curMath) {
                    club.ClubModuleMgr.getInstance().showClubDeskPanel(function () {
                        clubDispatch(club.ClubConst.ReturnMatchGroup, rev);
                    });
                }
                else {
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    club.ClubSendMgr.requestClubMatchList();
                }
            }
            else {
                clubDispatch(club.ClubConst.ReturnMatchGroupManage, rev);
            }
            club.ClubData.getInstance().isShowScratch = rev.isShowScratch;
        }
    }
    Cmd.OnReturnMatchGroupCmd_S = OnReturnMatchGroupCmd_S;
    /**
     * 广播当前桌子最新状况
     */
    function OnLatestMatchRoomInfoGroupCmd_Brd(rev) {
        if (rev) {
            clubDispatch(club.ClubConst.LatestMatchRoom, rev);
        }
    }
    Cmd.OnLatestMatchRoomInfoGroupCmd_Brd = OnLatestMatchRoomInfoGroupCmd_Brd;
    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    function OnJoinMemberListMatchGroupCmd_S(rev) {
        clubDispatch(club.ClubConst.JoinMemberListMatch, rev);
    }
    Cmd.OnJoinMemberListMatchGroupCmd_S = OnJoinMemberListMatchGroupCmd_S;
    /**进房审核 */
    function OnNotifyImportNoteCmd_S(rev) {
        club.ClubModuleMgr.getInstance().shoClubEnterRemarks(function () {
            clubDispatch(club.ClubConst.NotifyImportNoteCmd, rev);
        });
    }
    Cmd.OnNotifyImportNoteCmd_S = OnNotifyImportNoteCmd_S;
    /**返回公告信息 */
    function OnClubNoticeMatchGroupCmd_CS(rev) {
        clubDispatch(club.ClubConst.CLUB_NOTICE, rev);
    }
    Cmd.OnClubNoticeMatchGroupCmd_CS = OnClubNoticeMatchGroupCmd_CS;
    /**返回 添加、清除备注分数 */
    function OnRemarkPointMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.RemarkPointMatchGroup, rev);
        }
    }
    Cmd.OnRemarkPointMatchGroupCmd_CS = OnRemarkPointMatchGroupCmd_CS;
    /**返回 添加、清除昵称备注 */
    function OnRemarkNickNameMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.RemarkNickNameMatchGroup, rev);
        }
    }
    Cmd.OnRemarkNickNameMatchGroupCmd_CS = OnRemarkNickNameMatchGroupCmd_CS;
    /**返回 获取可导入群列表*/
    function OnGetCanImportMemberListMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubModuleMgr.getInstance().showClubImportPanel(function () {
                clubDispatch(club.ClubConst.GetCanImportMemberListMatchGroup, rev);
            });
        }
    }
    Cmd.OnGetCanImportMemberListMatchGroupCmd_CS = OnGetCanImportMemberListMatchGroupCmd_CS;
    /**返回 成员导入 */
    function OnImportMemberListMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.ImportMemberListMatchGroup, rev);
            uniLib.TipsUtils.showConfirm("导入数据成功！", "", "确定", null);
        }
    }
    Cmd.OnImportMemberListMatchGroupCmd_CS = OnImportMemberListMatchGroupCmd_CS;
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev) {
        if (rev.typ == 1) {
            club.ClubData.getInstance().ClubMemberMiniList = rev.whitelist;
        }
        else {
            club.ClubData.getInstance().ClubMemberList = rev.whitelist;
        }
        clubDispatch(club.ClubConst.MemberInfoMatchGroup, rev);
    }
    Cmd.OnReturnMemberInfoMatchGroupCmd_S = OnReturnMemberInfoMatchGroupCmd_S;
    /**获取可邀请成员列表 */
    function OnGetCanInviteMemberListMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubModuleMgr.getInstance().showClubInvitePlayerPanel(function () {
                clubDispatch(club.ClubConst.GetCanInviteMemberList, rev);
            });
        }
    }
    Cmd.OnGetCanInviteMemberListMatchGroupCmd_CS = OnGetCanInviteMemberListMatchGroupCmd_CS;
    /**邀请指定玩家到俱乐部中 广播 */
    function OnInviteMemberMatchGroupCmd_Brd(rev) {
        club.ClubModuleMgr.getInstance().showClubInviteBrdPanel(function () {
            clubDispatch(club.ClubConst.InviteMemberMatchGroupBrd, rev);
        });
    }
    Cmd.OnInviteMemberMatchGroupCmd_Brd = OnInviteMemberMatchGroupCmd_Brd;
    /**返回查找个人信息 */
    function OnUserInfoSearchLobbyCmd_S(rev) {
        if (rev.resultCode && rev.resultCode == 2) {
            uniLib.TipsUtils.showTipsDownToUp("操作太频繁，请稍后重试！");
        }
        else if (!rev.resultCode) {
            clubDispatch(club.ClubConst.UserInfoSearchLobby, rev);
        }
    }
    Cmd.OnUserInfoSearchLobbyCmd_S = OnUserInfoSearchLobbyCmd_S;
    /**邀请指定玩家到俱乐部中 */
    function OnInviteMemberMatchGroupCmd_CS(rev) {
        clubDispatch(club.ClubConst.InviteMemberMatchGroup, rev);
    }
    Cmd.OnInviteMemberMatchGroupCmd_CS = OnInviteMemberMatchGroupCmd_CS;
    /**
     * 获取黄名单列表
     */
    function OnReturnYellowMemberInfoMatchGroupCmd_S(rev) {
        if (rev && rev.list) {
            clubDispatch(club.ClubConst.ReturnYellowList, rev);
        }
    }
    Cmd.OnReturnYellowMemberInfoMatchGroupCmd_S = OnReturnYellowMemberInfoMatchGroupCmd_S;
    /**
     * 改变匹配号属性
     */
    function OnChangeMatchGroupCmd_S(rev) {
        club.ClubModuleMgr.getInstance().showCreateMatchSetPanel(rev);
    }
    Cmd.OnChangeMatchGroupCmd_S = OnChangeMatchGroupCmd_S;
    /**
     * 离开匹配组返回
     */
    function OnLeaveMatchGroup2Cmd_S(rev) {
        clubDispatch(club.ClubConst.LEAVE_MATCHGROUP2, rev);
    }
    Cmd.OnLeaveMatchGroup2Cmd_S = OnLeaveMatchGroup2Cmd_S;
    function OnRequestJoinMemberMatchGroupCmd_S(rev) {
        var weChatNum = rev.wechat;
        var msg = "玩家" + rev.nickname + (weChatNum ? "微信:" + weChatNum : "") + "申请加入老友圈" + rev.matchId + ",是否同意进入？";
        function okFunc() {
            var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
            cmd.matchId = rev.matchId;
            cmd.reply = 1;
            cmd.uid = rev.uid;
            NetMgr.tcpSend(cmd);
        }
        if (MJLobbyData.getInstance().lobbyId < 5000) {
            ComponentUtil.getInstance().showConfirm(msg, "", "确定", okFunc, "取消", null);
        }
        else {
            ComponentUtil.getInstance().showConfirm(msg, "温馨提示", "确定", okFunc, "取消", null);
        }
    }
    Cmd.OnRequestJoinMemberMatchGroupCmd_S = OnRequestJoinMemberMatchGroupCmd_S;
    /** 群主进入合伙人界面 获取合伙人数据 */
    function OnGetPartnerRecordsMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.GetPartnerRecordsMatchGroup, rev);
        }
    }
    Cmd.OnGetPartnerRecordsMatchGroupCmd_CS = OnGetPartnerRecordsMatchGroupCmd_CS;
    /** 操作指定合伙人 */
    function OnOperatePartnerMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.OperatePartnerMatchGroup, rev);
            if (rev.typ == 1) {
                var cmd = new Cmd.GetPartnerRecordsMatchGroupCmd_CS();
                cmd.matchId = club.ClubData.getInstance().clubmatchid;
                NetMgr.tcpSend(cmd);
            }
        }
    }
    Cmd.OnOperatePartnerMatchGroupCmd_CS = OnOperatePartnerMatchGroupCmd_CS;
    /** 群主申请解除合伙人 发送给合伙人的广播 */
    function OnRemovePartnerMatchGroupCmd_Brd(rev) {
        clubDispatch(club.ClubConst.RemovePartnerMatchGroup, rev);
        var okFunc = function () {
            var cmd = new Cmd.ReplyRemovePartnerMatchGroupCmd_CS();
            cmd.typ = 1;
            cmd.matchId = rev.matchId;
            NetMgr.tcpSend(cmd);
        };
        var noFunc = function () {
            var cmd = new Cmd.ReplyRemovePartnerMatchGroupCmd_CS();
            cmd.typ = 2;
            cmd.matchId = rev.matchId;
            NetMgr.tcpSend(cmd);
        };
        ComponentUtil.getInstance().showConfirm(rev.matchId + "圈主请求解除合伙关系，同意后您的合伙人资格被取消，您的群成员也将脱离此老友圈！", "解除合伙关系", "确定", okFunc, "拒绝", noFunc);
    }
    Cmd.OnRemovePartnerMatchGroupCmd_Brd = OnRemovePartnerMatchGroupCmd_Brd;
    /** 合伙人 回复是否解除合伙关系 */
    function OnReplyRemovePartnerMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.ReplyRemovePartnerMatchGroup, rev);
        }
    }
    Cmd.OnReplyRemovePartnerMatchGroupCmd_CS = OnReplyRemovePartnerMatchGroupCmd_CS;
    /** 获取组员战绩 */
    function OnGetMemberRecordsMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.GetMemberRecordsMatchGroup, rev);
        }
    }
    Cmd.OnGetMemberRecordsMatchGroupCmd_CS = OnGetMemberRecordsMatchGroupCmd_CS;
    /** 获取可导入组员列表*/
    function OnGetCanImportMemberList2MatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.GetCanImportMemberList2MatchGroup, rev);
            club.ClubData.getInstance().PartnerImportList = rev.memberList;
            club.ClubData.getInstance().PartnerMatchId = rev.matchId;
        }
    }
    Cmd.OnGetCanImportMemberList2MatchGroupCmd_CS = OnGetCanImportMemberList2MatchGroupCmd_CS;
    /** 添加指定组员到俱乐部中 */
    function OnImportMember2MatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            uniLib.TipsUtils.showTipsDownToUp("已提交申请，等待审核！");
            clubDispatch(club.ClubConst.ImportMember2MatchGroup, rev);
        }
    }
    Cmd.OnImportMember2MatchGroupCmd_CS = OnImportMember2MatchGroupCmd_CS;
    /** 移除指定组员 */
    function OnRemoveMemberMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.RemoveMemberMatchGroup, rev);
            uniLib.TipsUtils.showTipsDownToUp("此成员已踢出，记录保留24小时！");
        }
    }
    Cmd.OnRemoveMemberMatchGroupCmd_CS = OnRemoveMemberMatchGroupCmd_CS;
    /** 返回定时器*/
    function OnSetPauseTimerMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubData.getInstance().suspendTimer = rev.pauseTimer ? rev.pauseTimer : null;
            club.ClubData.getInstance().renewTimer = rev.restoreTimer ? rev.restoreTimer : null;
        }
    }
    Cmd.OnSetPauseTimerMatchGroupCmd_CS = OnSetPauseTimerMatchGroupCmd_CS;
    /**返回 添加、清除昵称备注 */
    function OnCleanMemberWinPointMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            clubDispatch(club.ClubConst.CleanMemberWinPointMatchGroup, rev);
        }
    }
    Cmd.OnCleanMemberWinPointMatchGroupCmd_CS = OnCleanMemberWinPointMatchGroupCmd_CS;
    /**获取清空的操作记录 */
    function OnGetCleanRecordMatchGroupCmd_CS(rev) {
        if (!rev.resultCode) {
            rev.resultCode = club.ClubConst.SUCCESS;
        }
        if (rev.resultCode == club.ClubConst.SUCCESS) {
            club.ClubModuleMgr.getInstance().showClubCleanRecordPanel(function () {
                clubDispatch(club.ClubConst.GetCleanRecordMatchGroup, rev);
            });
        }
    }
    Cmd.OnGetCleanRecordMatchGroupCmd_CS = OnGetCleanRecordMatchGroupCmd_CS;
    /**审核列表返回 */
    function OnGetApproveRecordMatchGroupCmd_S(rev) {
        if (!rev.resultCode) {
            club.ClubData.getInstance().applyRecordList = rev;
            uniLib.Global.dispatchEvent(club.ClubConst.GET_APPLYRECORD_LIST, rev);
        }
    }
    Cmd.OnGetApproveRecordMatchGroupCmd_S = OnGetApproveRecordMatchGroupCmd_S;
})(Cmd || (Cmd = {}));
var club;
(function (club) {
    var ClubModuleMgr = (function () {
        function ClubModuleMgr() {
            this._isShowClub = 0;
        }
        ClubModuleMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new ClubModuleMgr();
            }
            return this._instance;
        };
        /**移除老友圈列表界面 */
        ClubModuleMgr.prototype.removeAllClubListPanel = function () {
            if (this._clubAllBoxPanel) {
                uniLib.PopUpMgr.removePopUp(this._clubAllBoxPanel);
                this._clubAllBoxPanel = null;
            }
        };
        /**老友圈列表界面 */
        ClubModuleMgr.prototype.showAllClubListPanel = function (callBack) {
            var _this = this;
            if (!this._clubAllBoxPanel) {
                this._clubAllBoxPanel = new club.ClubAllBoxPanel();
                LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                    uniLib.PopUpMgr.addPopUp(_this._clubAllBoxPanel, null, true, true, 0);
                    callBack();
                });
            }
            else {
                callBack();
            }
        };
        /**老友圈  清空的操作记录*/
        ClubModuleMgr.prototype.showClubCleanRecordPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubCleanRecordPanel, null, true, true);
                callBack();
            });
        };
        /**老友圈列表界面 无数据  */
        ClubModuleMgr.prototype.showClubListPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**老友圈管理员界面单个房间详情 */
        ClubModuleMgr.prototype.showActiveDetailRoomtPanel = function (callBack) {
            var _this = this;
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                if (!_this._activeRoomInformationPanel) {
                    _this._activeRoomInformationPanel = new club.ActiveRoomInformationPanel();
                }
                uniLib.PopUpMgr.addPopUp(_this._activeRoomInformationPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**显示老友圈玩法面板 */
        ClubModuleMgr.prototype.showClubDetailsPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubDetailsPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**显示俱乐部分享界面
         * @param roomId 房间ID
        */
        ClubModuleMgr.prototype.showClubInvitePanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                var vo;
                if (data) {
                    if (data instanceof uniLib.ZqEvent) {
                        vo = data.param;
                    }
                }
                uniLib.PopUpMgr.addPopUp(club.ClubInvitePanel, uniLib.SceneMgr.instance.currentScene.tipsLayer, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, vo);
            });
        };
        /**删除老友圈管理员界面单个房间详情 */
        ClubModuleMgr.prototype.removeActiveDetailRoomtPanel = function () {
            if (this._activeRoomInformationPanel) {
                uniLib.PopUpMgr.removePopUp(this._activeRoomInformationPanel);
                this._activeRoomInformationPanel = null;
            }
        };
        /**老友圈新手指引面板 */
        ClubModuleMgr.prototype.showClubGuidePanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubGuidePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**老友圈管理 房主备注玩家分数 */
        ClubModuleMgr.prototype.showClubRemarksScorePanel = function (uid) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubRemarksScorePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, uid);
            });
        };
        /**老友圈管理 查看单个玩家详情 */
        ClubModuleMgr.prototype.showClubMemberInfoPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubMemberInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**老友圈导入成员列表页面 */
        ClubModuleMgr.prototype.showClubImportPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubImportPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**老友圈桌面界面 */
        ClubModuleMgr.prototype.showClubDeskPanel = function (callBack) {
            var _this = this;
            if (this._isShowClub == 1) {
                callBack();
            }
            if (!this._clubDeskPanel) {
                this._clubDeskPanel = new club.ClubDeskPanel();
                LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                    uniLib.PopUpMgr.addPopUp(_this._clubDeskPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                    _this._isShowClub = 1;
                    callBack();
                });
            }
        };
        /**移除老友圈桌面 */
        ClubModuleMgr.prototype.removeClubDeskPanel = function () {
            if (this._clubDeskPanel) {
                uniLib.PopUpMgr.removePopUp(this._clubDeskPanel);
                this._clubDeskPanel = null;
                this._isShowClub = 0;
                if (club.ClubData.getInstance().clubRefresh == 0) {
                    var req = new Cmd.ExitMatchGroupCmd_C;
                    NetMgr.tcpSend(req);
                }
            }
        };
        /**老友圈管理界面 */
        ClubModuleMgr.prototype.showClubManagePanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.MatchManagePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**老友圈成员列表界面   1管理员页面 2 普通各成员页面*/
        ClubModuleMgr.prototype.showClubPlayerListPanel = function (isOwner) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPlayerListPanel, null, true, true, 0, 0, 0, 0, isOwner);
            });
        };
        /**显示俱乐部 单个俱乐部所有战绩 */
        ClubModuleMgr.prototype.showClubAllRecordPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubAllRecordPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**显示老友圈 查看自己的战绩 */
        ClubModuleMgr.prototype.showClubMemberRecordPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_RECORD, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubMemberRecordPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**审核记录 */
        ClubModuleMgr.prototype.showClubApplyRecordPanel = function () {
            uniLib.PopUpMgr.addPopUp(club.ClubApplyRecordPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        };
        /**老友圈公告界面 */
        ClubModuleMgr.prototype.showClubNoticePanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubNoticePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**玩家第一次进入房间加备注 */
        ClubModuleMgr.prototype.shoClubEnterRemarks = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubEnterRemarks, null, true, false, 0);
                callBack();
            });
        };
        /**创建老友圈房间面板 */
        ClubModuleMgr.prototype.showCreateClubPanel = function (game) {
            LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_CREATEPANEL, function () {
                var info = new CreatePanelParam(1);
                if (game) {
                    info.data = game;
                }
                else {
                    MsgSendMgr.getNormalGameList(1);
                }
                uniLib.PopUpMgr.addPopUp(CreateGamePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 1240, 640, info);
            });
        };
        /**显示老友圈查看个人信息面板 */
        ClubModuleMgr.prototype.showClubUserInfoPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubUserInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**显示老友圈搜索成员面板 */
        ClubModuleMgr.prototype.showClubSearchMemberPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubSearchMemberPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**显示老友圈手动添加成员面板 */
        ClubModuleMgr.prototype.showClubAddMemberPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubAddMemberPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**
         * 俱乐部创建、修改设置页面
         */
        ClubModuleMgr.prototype.showCreateMatchSetPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.removePopUp(CreateGamePanel);
                uniLib.PopUpMgr.addPopUp(club.CreateMatchSetPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**显示老友圈审批面板 */
        ClubModuleMgr.prototype.showClubUserApplyPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubApplyListPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /** 邀请指定玩家到俱乐部中 广播 */
        ClubModuleMgr.prototype.showClubInviteBrdPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubInviteBrdPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**获取可邀请成员列表 */
        ClubModuleMgr.prototype.showClubInvitePlayerPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubInvitePlayerPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /** 群主进入合伙人界面 */
        ClubModuleMgr.prototype.showClubPartnerRecordPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerRecordPanel, null, true, true, 0);
                callBack();
            });
        };
        /**群主合作群添加成员 */
        ClubModuleMgr.prototype.showClubPartnerAddPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerAddPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**群主 看合伙人信息 */
        ClubModuleMgr.prototype.showClubPartnerMemberDetailPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerMemberDetailPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**群主解除合伙人关系  */
        ClubModuleMgr.prototype.showClubPartnerRemovePanterPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerRemovePanterPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /** 合伙人 获取组员战绩*/
        ClubModuleMgr.prototype.showClubPartnerMemberRecordPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerMemberRecordPanel, null, true, true, 0);
                callBack();
            });
        };
        /** 合伙人 获取可导入组员列表*/
        ClubModuleMgr.prototype.showClubPartnerImportPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerImportPanel, null, true, true, 0);
                callBack();
            });
        };
        /**合伙人 手动添加成员 */
        ClubModuleMgr.prototype.showClubPartnerImportAddPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerImportAddPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**合伙人 查看单个玩家详情 */
        ClubModuleMgr.prototype.showClubPartnerRecordDetailPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerRecordDetailPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**合伙人 移出单个玩家 */
        ClubModuleMgr.prototype.showClubPartnerRemoveMemberPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPartnerRemoveMemberPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**老友圈管理 计时器面板*/
        ClubModuleMgr.prototype.showClubMemberTimerPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubMemberTimerPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0);
            });
        };
        return ClubModuleMgr;
    }());
    club.ClubModuleMgr = ClubModuleMgr;
    __reflect(ClubModuleMgr.prototype, "club.ClubModuleMgr");
})(club || (club = {}));
var club;
(function (club) {
    var ClubSendMgr = (function () {
        function ClubSendMgr() {
        }
        /**
         * 请求匹配号信息
         * */
        ClubSendMgr.requestMatchData = function (isClub) {
            if (isClub === void 0) { isClub = 0; }
            var req = new Cmd.RequestMatchGroupCmd_C();
            if (isClub)
                req.isClub = isClub;
            NetMgr.tcpSend(req);
        };
        /**请求老友圈列表 */
        ClubSendMgr.requestClubMatchList = function () {
            var cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
            cmd.isClub = 1;
            NetMgr.tcpSend(cmd);
        };
        /**
         * 房主请求老友圈信息
         */
        ClubSendMgr.requestRequestMatchGroupCmd = function (matchId) {
            var req = new Cmd.RequestMatchGroupCmd_C();
            req.matchId = matchId;
            NetMgr.tcpSend(req);
        };
        /**邀请指定玩家到俱乐部中 */
        ClubSendMgr.InviteMemberMatchGroupCmd = function (matchId, uids) {
            var cmd = new Cmd.InviteMemberMatchGroupCmd_CS();
            cmd.matchId = matchId;
            cmd.uids = uids;
            if (club.ClubData.getInstance().InviteRoomId != 0 ? club.ClubData.getInstance().InviteRoomId : false) {
                cmd.roomId = club.ClubData.getInstance().InviteRoomId;
            }
            NetMgr.tcpSend(cmd);
        };
        /**
         * 请求战绩
         * @param globalRoomId 全局游戏房间id
         *  */
        ClubSendMgr.getGameDetailHistory = function (globalRoomId) {
            var req = new Cmd.GetGameDetailHistoryCmd_C();
            req.globalRoomId = globalRoomId;
            NetMgr.tcpSend(req);
        };
        /**
         * 战绩获取
         * @param matchId 单个俱乐部的战绩
         * @param curPage 第几页数据
         * @param typ 请求类型 1/2/3/4 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩
         * @param which 操作那一项 1/2/3 今日、昨日、前日
         */
        ClubSendMgr.getGameDataHistoryForMatch = function (matchId, curPage, which, typ) {
            var req = new Cmd.GetGameDataHistoryForMatchCmd_C();
            req.matchId = matchId;
            req.curPage = curPage;
            req.typ = typ;
            req.which = which;
            NetMgr.tcpSend(req);
        };
        /**
         * 俱乐部管理页面 单个玩家数据
         * @param matchId 单个俱乐部的战绩
         * @param UId 玩家Id
         * @param curPage 第几页数据
         * @param typ 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩/合伙人那里点玩家详情跟管理员那里点玩家详情
         * @param which 操作那一项 1/2/3 今日、昨日、前日
         *  */
        ClubSendMgr.getGameDataHistoryToUId = function (matchId, UId, curPage, typ, which) {
            var req = new Cmd.GetGameDataHistoryForMatchCmd_C();
            req.matchId = matchId;
            req.uid = UId;
            req.curPage = curPage;
            req.which = which;
            req.typ = typ;
            NetMgr.tcpSend(req);
        };
        /**
         * 俱乐部管理页面 单个玩家数据 合伙人
         * @param matchId 单个俱乐部的战绩
         * @param UId 玩家Id
         * @param curPage 第几页数据
         * @param typ 请求类型 1/2/3/4/5 管理界面战况查询/管理员点击群战绩/管理员点击我的战绩或群员点击本群战绩/获取指定成员的战绩/合伙人那里点玩家详情跟管理员那里点玩家详情
        
         * */
        ClubSendMgr.getGameDataHistoryToUIdgForPartner = function (matchId, UId, curPage, typ) {
            var req = new Cmd.GetGameDataHistoryForMatchCmd_C();
            req.matchId = matchId;
            req.uid = UId;
            req.curPage = curPage;
            req.typ = typ;
            NetMgr.tcpSend(req);
        };
        /**
         * 战绩统计获取 看在此老友圈自己的战绩
         * @param curPage 分页处理 当前请求的第几页
         * @param matchId 单个俱乐部的战绩
         */
        ClubSendMgr.getGameDataHistorytoMatchMyself = function (matchId, curPage) {
            var req = new Cmd.GetGameDataHistoryCmd_C();
            req.matchId = matchId;
            req.curPage = curPage;
            NetMgr.tcpSend(req);
        };
        /**
         *  老友圈管理 成员列表 添加、清除备注分数
         * @param matchId 老友圈ID
         * @param targetUid  对象id
         * @param opType  操作类型 1、2 添加、清除
         * @param point  具体操作哪一天的数据 0、1、2 今天、昨天、前天
         * @param which  备注分数
         */
        ClubSendMgr.RemarkPointMatchGroupCmd = function (matchId, targetUid, opType, point, which) {
            var cmd = new Cmd.RemarkPointMatchGroupCmd_CS();
            cmd.matchId = matchId;
            cmd.targetUid = targetUid;
            cmd.opType = opType;
            cmd.point = point;
            cmd.which = which;
            NetMgr.tcpSend(cmd);
        };
        /**
         * 老友圈玩家列表批量管理操作
         * @param matchId 老友圈ID
         * @param reply 操作选项 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
         * @param uids 所有需要操作的玩家列表
         */
        ClubSendMgr.ReplyJoinMemberListMatchGroupCmdBatch = function (matchId, reply, uids) {
            var req = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
            req.matchId = club.ClubData.getInstance().clubmatchid;
            req.uids = uids;
            req.reply = reply;
            req.matchId = matchId;
            NetMgr.tcpSend(req);
        };
        /**老友圈审核列表 */
        ClubSendMgr.requestGetApproveRecordMatchGroupCmd_C = function (matchId, page, uid) {
            var req = new Cmd.GetApproveRecordMatchGroupCmd_C;
            req.matchId = matchId;
            req.curPage = page;
            req.uid = uid;
            NetMgr.tcpSend(req);
        };
        /**
         * 老友圈玩家列表单个玩家管理操作
         * @param matchId 老友圈ID
         * @param reply 操作选项 0表示拒绝,1表示同意,2表示白名单,3表示黑名单
         * @param uid 被操作的玩家Id
         */
        ClubSendMgr.ReplyJoinMemberListMatchGroupCmd = function (matchId, reply, uid) {
            var req = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
            req.matchId = club.ClubData.getInstance().clubmatchid;
            req.uid = uid;
            req.reply = reply;
            req.matchId = matchId;
            NetMgr.tcpSend(req);
        };
        return ClubSendMgr;
    }());
    club.ClubSendMgr = ClubSendMgr;
    __reflect(ClubSendMgr.prototype, "club.ClubSendMgr");
})(club || (club = {}));
var ClubUIEventConst = (function () {
    function ClubUIEventConst() {
    }
    ClubUIEventConst.JOIN_CLUBROOM = "JOIN_CLUBROOM";
    return ClubUIEventConst;
}());
__reflect(ClubUIEventConst.prototype, "ClubUIEventConst");
/**
 * 已创建活跃房间面板
 */
var club;
(function (club) {
    var ActiveRoomInformationPanel = (function (_super) {
        __extends(ActiveRoomInformationPanel, _super);
        //战绩回放按钮
        // private recordButton: eui.WxButton;
        /**确认按钮 */
        // private sureButton: eui.WxButton;
        //初始化方法
        function ActiveRoomInformationPanel() {
            var _this = _super.call(this, "", 720, 400) || this;
            _this.skinName = "ActiveRoom";
            return _this;
        }
        ActiveRoomInformationPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化监听
        ActiveRoomInformationPanel.prototype.addEvent = function () {
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.addEventListener(club.ClubConst.ActiveDetailRoom, this.initData, this);
        };
        //移除监听
        ActiveRoomInformationPanel.prototype.removeEvent = function () {
            this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.dissolveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.removeEventListener(club.ClubConst.ActiveDetailRoom, this.initData, this);
        };
        //销毁创建
        ActiveRoomInformationPanel.prototype.destory = function () {
            _super.prototype.destroy.call(this);
            uniLib.PopUpMgr.removePopUp(this);
            this._activeRoomListOb = null;
            if (this.playerGroup) {
                this.playerGroup.removeChildren();
                this.playerGroup = null;
            }
        };
        //初始化游戏列表赋值
        ActiveRoomInformationPanel.prototype.initData = function (evt) {
            var rev = evt.param;
            if (rev.matchId) {
                this.dissolveBtn.visible = true;
                this.cancelBtn.visible = true;
            }
            for (var i = this.itemList.numChildren - 1; i >= 0; i--) {
                var item = this.itemList.getChildAt(i);
                item.destory();
                item = null;
            }
            uniLib.DisplayUtils.removeAllChildren(this.itemList);
            this._activeRoomListOb = rev;
            this.topTableNumber.text = "房号：" + this._activeRoomListOb.roomId;
            if (!Array.isArray(rev.list) || rev.list.length == 0)
                return;
            for (var i = 0; i < rev.list.length; i++) {
                var item = new club.ActiveRoomListItem();
                item.setData(rev.list[i], rev.roomId);
                if (rev.matchId) {
                    item.name = rev.matchId + "";
                }
                if (this._activeRoomListOb.state == 1 || this._activeRoomListOb.list[i].score) {
                    item.setEliminateVisible(false);
                    this.cancelBtn.visible = true;
                    this.dissolveBtn.visible = true;
                }
                else {
                    item.setEliminateVisible(true);
                }
                item.y = i * item.height + 10;
                this.itemList.addChild(item);
            }
        };
        //关闭面板方法
        ActiveRoomInformationPanel.prototype.btnClick = function (e) {
            var _this = this;
            if (e.currentTarget == this.cancelBtn) {
                this.removePop();
            }
            else if (e.currentTarget == this.dissolveBtn) {
                uniLib.TipsUtils.showConfirm("是否确认解散该房间?", "", "确定", function () {
                    var req = new Cmd.ActiveDissolveRoomCmd_C();
                    req.roomId = _this._activeRoomListOb.roomId;
                    req.matchId = _this._activeRoomListOb.matchId;
                    NetMgr.tcpSend(req);
                    _this.removePop();
                }, "取消", null);
            }
        };
        return ActiveRoomInformationPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ActiveRoomInformationPanel = ActiveRoomInformationPanel;
    __reflect(ActiveRoomInformationPanel.prototype, "club.ActiveRoomInformationPanel");
})(club || (club = {}));
var club;
(function (club) {
    var ActiveRoomListItem = (function (_super) {
        __extends(ActiveRoomListItem, _super);
        function ActiveRoomListItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ActiveRoomListItemSkin";
            return _this;
        }
        ActiveRoomListItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ActiveRoomListItem.prototype.setData = function (data, roomId) {
            this._data = data;
            this._roomId = roomId;
            if (data.score != undefined)
                this.playerScore.text = data.score.toString();
            this.playerName.text = data.nickname;
            this.eliminate.addEventListener(egret.TouchEvent.TOUCH_TAP, this.eliminatePlayer, this);
        };
        //房主踢人方法
        ActiveRoomListItem.prototype.eliminatePlayer = function (e) {
            var rev = new Cmd.KickLeaveRoomCmd_C();
            rev.uid = this._data.uid;
            if (this.name != "") {
                rev.matchId = Number(this.name);
            }
            rev.roomId = this._roomId;
            NetMgr.tcpSend(rev);
        };
        ActiveRoomListItem.prototype.setEliminateVisible = function (show) {
            this.eliminate.visible = show;
        };
        ActiveRoomListItem.prototype.destory = function () {
            if (this.eliminate) {
                this.eliminate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.eliminatePlayer, this);
            }
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return ActiveRoomListItem;
    }(eui.Component));
    club.ActiveRoomListItem = ActiveRoomListItem;
    __reflect(ActiveRoomListItem.prototype, "club.ActiveRoomListItem");
})(club || (club = {}));
var club;
(function (club) {
    /**俱乐部添加外部成员 */
    var ClubAddMemberPanel = (function (_super) {
        __extends(ClubAddMemberPanel, _super);
        function ClubAddMemberPanel() {
            var _this = _super.call(this) || this;
            /**构造玩家局数据 */
            _this._list = [];
            _this.skinName = "ClubAddmemberSkin";
            return _this;
        }
        ClubAddMemberPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubAddMemberPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            uniLib.Global.addEventListener(club.ClubConst.UserInfoSearchLobby, this.setdata, this);
        };
        ClubAddMemberPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(club.ClubConst.UserInfoSearchLobby, this.setdata, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubAddMemberPanel.prototype.initUI = function () {
            this._menberList.itemRenderer = club.ClubAddMemberItemPanel;
        };
        ClubAddMemberPanel.prototype.setdata = function (evt) {
            var data = evt.param;
            this._list = [];
            this._list.push(data);
            if (this._list.length == 0) {
                this._tishiText.visible = true;
            }
            else {
                this._tishiText.visible = false;
            }
            if (!this._menberListArray) {
                this._menberListArray = new eui.ArrayCollection(this._list);
                this._menberList.dataProvider = this._menberListArray;
            }
            else {
                if (Array.isArray(this._menberListArray.source)) {
                    this._menberListArray.removeAll();
                }
                this._menberListArray.replaceAll(this._list);
            }
        };
        ClubAddMemberPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text.length < 8) {
                        uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID!");
                        this._searchEditableText.text = "";
                    }
                    else {
                        var seq = new Cmd.UserInfoSearchLobbyCmd_C;
                        seq.uid = Number(this._searchEditableText.text);
                        NetMgr.tcpSend(seq);
                    }
                    break;
            }
        };
        /**输入框判断 */
        ClubAddMemberPanel.prototype.onTextFieldFocusOut = function (event) {
            if (event.target.text == "" || Number(event.target.text) == 0) {
                event.target.text = "";
            }
        };
        return ClubAddMemberPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubAddMemberPanel = ClubAddMemberPanel;
    __reflect(ClubAddMemberPanel.prototype, "club.ClubAddMemberPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友圈所有房间面板 */
    var ClubAllBoxPanel = (function (_super) {
        __extends(ClubAllBoxPanel, _super);
        function ClubAllBoxPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubAllBoxSkin";
            return _this;
        }
        ClubAllBoxPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // this.width = uniLib.Global.screenWidth;
            // this.height = uniLib.Global.screenHeight;
        };
        ClubAllBoxPanel.prototype.destroy = function () {
            club.ClubModuleMgr.getInstance().removeAllClubListPanel();
            _super.prototype.destroy.call(this);
        };
        ClubAllBoxPanel.prototype.initUI = function () {
            this.OnOpen();
        };
        ClubAllBoxPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.HistoryClubList, this.setData, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAllBoxPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(club.ClubConst.HistoryClubList, this.setData, this);
        };
        /**设置按钮开关 */
        ClubAllBoxPanel.prototype.OnOpen = function () {
            this._leftGroup.x = -1143;
            this._closeBtn.x = 0;
            egret.Tween.get(this._leftGroup).to({ x: 0 }, 300);
            egret.Tween.get(this._closeBtn).to({ x: 1137 }, 300);
        };
        ClubAllBoxPanel.prototype.OnClose = function () {
            var _this = this;
            egret.Tween.get(this._closeBtn).to({ x: 0 }, 300);
            egret.Tween.get(this._leftGroup).to({ x: -1143 }, 300).call(function () {
                return _super.prototype.removePop.call(_this);
            });
        };
        ClubAllBoxPanel.prototype.setData = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            this._clubList = date.list;
            for (var i = 0; i < this._clubList.length; i++) {
                this._clubList[i].index = i + 1;
            }
            this.boxList.itemRenderer = club.ClubBoxItem;
            this.boxList.dataProvider = new eui.ArrayCollection(this._clubList);
        };
        ClubAllBoxPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                case this._bgRect:
                    this.OnClose();
                    break;
                case this._createBtn:
                    this.OnClose();
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    club.ClubModuleMgr.getInstance().showCreateClubPanel();
                    break;
                case this._joinBtn:
                    this.OnClose();
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    LobbyModuleMgr.getInstance().showJoinRoomPanel(function () {
                        var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        NetMgr.tcpSend(req);
                    });
                    break;
            }
        };
        return ClubAllBoxPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubAllBoxPanel = ClubAllBoxPanel;
    __reflect(ClubAllBoxPanel.prototype, "club.ClubAllBoxPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友圈群战绩Item */
    var ClubAllRecordItemPanel = (function (_super) {
        __extends(ClubAllRecordItemPanel, _super);
        function ClubAllRecordItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubAllRecordItemSkin";
            return _this;
        }
        ClubAllRecordItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubAllRecordItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAllRecordItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAllRecordItemPanel.prototype.destory = function () {
            this.removeListener();
        };
        ClubAllRecordItemPanel.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._detailBtn:
                    LobbyModuleMgr.getInstance().showRecordDetail(function () {
                        club.ClubSendMgr.getGameDetailHistory(_this.info.globalRoomId);
                    });
                    MJLobbyData.getInstance().globalRoomId = this.info.globalRoomId;
                    break;
            }
        };
        ClubAllRecordItemPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this._indextText.text = this.itemIndex + 1 + "";
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this.info.timeStamp);
            this._roomIdText.text = this.info.roomId + "";
            this._headImg.source = this.info.userGameHistorys[0].headUrl;
            var name = this.info.userGameHistorys[0].nickName;
            var strLength;
            var wei;
            if (this.getStrRealLength(name) > 10) {
                wei = "...";
            }
            else {
                wei = "";
                ;
            }
            while (this.getStrRealLength(name) > 10) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            this._nameText.text = name + wei;
            this._uidText.text = this.info.userGameHistorys[0].uid + "";
            this._recordText.text = this.info.userGameHistorys[0].integral + "";
            this._gameNameText.text = this.info.gameName;
            this._gameNumText.text = this.info.gameNbr + "";
        };
        /**限制昵称长度 */
        ClubAllRecordItemPanel.prototype.getStrRealLength = function (str) {
            var jmz = { GetLength: null };
            jmz.GetLength = function (str) {
                return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length); //先把中文替换成两个字节的英文，再计算长度
            };
            return jmz.GetLength(str);
        };
        return ClubAllRecordItemPanel;
    }(eui.ItemRenderer));
    club.ClubAllRecordItemPanel = ClubAllRecordItemPanel;
    __reflect(ClubAllRecordItemPanel.prototype, "club.ClubAllRecordItemPanel");
})(club || (club = {}));
/**单个老友圈 所有战绩 */
var club;
(function (club) {
    var ClubAllRecordPanel = (function (_super) {
        __extends(ClubAllRecordPanel, _super);
        function ClubAllRecordPanel() {
            var _this = _super.call(this) || this;
            /**当前页数 */
            _this._curPage = 0;
            /**记录当前数据记录的 日  */
            _this._dayChose = 0;
            _this.skinName = "ClubAllRecordSkin";
            return _this;
        }
        ClubAllRecordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubAllRecordPanel.prototype.initUI = function () {
            this._clubDayChose = 1;
            this._AllRecordArr = [];
            this._recordList.itemRenderer = club.ClubAllRecordItemPanel;
        };
        /**事件监听 */
        ClubAllRecordPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.MATCH_HISTORY_FOR_DESK, this.showData, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAllRecordPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.MATCH_HISTORY_FOR_DESK, this.showData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAllRecordPanel.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._myRecordBtn:
                    club.ClubModuleMgr.getInstance().showClubMemberRecordPanel(function () {
                        club.ClubSendMgr.getGameDataHistoryForMatch(_this._matchId, 1, 1, club.ClubConst1.MATCH_HISTORY_FOR_MYSELF);
                    });
                    break;
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日战绩";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._yesterdayBtn:
                    this._clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日战绩";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._qianBtn:
                    this._clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日战绩";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
            }
        };
        /**接收数据 */
        ClubAllRecordPanel.prototype.showData = function (evt) {
            var vo = evt.param;
            if (vo.typ) {
                this.addListen();
                this._matchId = vo.matchId;
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                this._matchStatisticInfo = vo.matchStatisticInfo;
                this.updatePoint();
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tipsText.visible = true;
                    if (this._dayChose != this._clubDayChose) {
                        this._dayChose = this._clubDayChose;
                        this._AllRecordArr = [];
                        if (this._AllRecordListArr) {
                            if (Array.isArray(this._AllRecordListArr.source)) {
                                this._AllRecordListArr.removeAll();
                            }
                            this._AllRecordListArr.replaceAll(this._AllRecordArr);
                        }
                    }
                }
                else {
                    this._tipsText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
        };
        /**单独加 */
        ClubAllRecordPanel.prototype.addListen = function () {
            this._scroll.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        };
        /**添加数据*/
        ClubAllRecordPanel.prototype.addData = function (arr) {
            if (!arr || !arr[0]) {
                return;
            }
            if (this._dayChose == this._clubDayChose) {
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            else {
                this._dayChose = this._clubDayChose;
                this._AllRecordArr = [];
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            if (!this._AllRecordListArr) {
                this._AllRecordListArr = new eui.ArrayCollection(this._AllRecordArr);
                this._recordList.dataProvider = this._AllRecordListArr;
            }
            else {
                if (Array.isArray(this._AllRecordListArr.source)) {
                    this._AllRecordListArr.removeAll();
                }
                this._AllRecordListArr.replaceAll(this._AllRecordArr);
                if (this._curPage == 1) {
                    this._AllRecordListArr.refresh();
                }
            }
        };
        /**点每日输赢更新数据 */
        ClubAllRecordPanel.prototype.updateView = function () {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
            this.updatePoint();
        };
        /**更新视图 */
        ClubAllRecordPanel.prototype.updatePoint = function () {
            if (this._matchStatisticInfo) {
                this._roomText.text = "" + this._matchStatisticInfo.openNbrs[this._clubDayChose - 1];
            }
            else {
                this._roomText.text = "0";
            }
        };
        /**获取战绩消息 */
        ClubAllRecordPanel.prototype.getData = function () {
            if (this._clubDayChose == this._dayChose) {
                club.ClubSendMgr.getGameDataHistoryForMatch(this._matchId, this._curPage, this._clubDayChose, club.ClubConst1.MATCH_HISTORY_FOR_DESK);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            }
            else {
                club.ClubSendMgr.getGameDataHistoryForMatch(this._matchId, 1, this._clubDayChose, club.ClubConst1.MATCH_HISTORY_FOR_DESK);
            }
        };
        /**滑到底加载其他页数据 */
        ClubAllRecordPanel.prototype.checkTop = function (evt) {
            if (this._scroll.viewport.scrollV + this._scroll.viewport.height >= this._scroll.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroll.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this); //2秒不返回继续可以请求
                }
            }
        };
        ClubAllRecordPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return ClubAllRecordPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubAllRecordPanel = ClubAllRecordPanel;
    __reflect(ClubAllRecordPanel.prototype, "club.ClubAllRecordPanel");
})(club || (club = {}));
/**申请列表 */
var club;
(function (club) {
    var ClubApplyListPanel = (function (_super) {
        __extends(ClubApplyListPanel, _super);
        function ClubApplyListPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubApplyListSkin";
            return _this;
        }
        ClubApplyListPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubApplyListPanel.prototype.initUI = function () {
            this.messageList.itemRenderer = club.MatchMessageItem;
            if (club.ClubData.getInstance().JoinMemberList) {
                this.updateApplyList(club.ClubData.getInstance().JoinMemberList.list);
            }
        };
        /**事件监听 */
        ClubApplyListPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(club.ClubConst.JoinMemberListMatch, this.updateList, this);
        };
        ClubApplyListPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.JoinMemberListMatch, this.updateList, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubApplyListPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubApplyListPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._yesBtn:
                    if (this._allUidList.length > 0) {
                        club.ClubSendMgr.ReplyJoinMemberListMatchGroupCmdBatch(club.ClubData.getInstance().clubmatchid, 1, this._allUidList);
                    }
                    break;
                case this._noBtn:
                    if (this._allUidList.length > 0) {
                        club.ClubSendMgr.ReplyJoinMemberListMatchGroupCmdBatch(club.ClubData.getInstance().clubmatchid, 0, this._allUidList);
                    }
                    break;
                case this._recordBtn:
                    club.ClubSendMgr.requestGetApproveRecordMatchGroupCmd_C(club.ClubData.getInstance().clubmatchid, 0, null);
                    club.ClubModuleMgr.getInstance().showClubApplyRecordPanel();
                    break;
            }
        };
        ClubApplyListPanel.prototype.updateList = function (evt) {
            club.ClubData.getInstance().JoinMemberList = evt.param;
            this.updateApplyList(club.ClubData.getInstance().JoinMemberList.list);
        };
        /** 更新申请数据*/
        ClubApplyListPanel.prototype.updateApplyList = function (list) {
            var _this = this;
            this._allUidList = [];
            if (list.length > 0) {
                this._tipsText.visible = false;
                list.forEach(function (element) {
                    _this._allUidList.push(element.uid);
                });
            }
            else {
                this._tipsText.visible = true;
            }
            if (!this.messageListArr) {
                this.messageListArr = new eui.ArrayCollection(list);
                this.messageList.dataProvider = this.messageListArr;
            }
            else {
                if (Array.isArray(this.messageListArr.source)) {
                    this.messageListArr.removeAll();
                }
                this.messageListArr.replaceAll(list);
            }
        };
        return ClubApplyListPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubApplyListPanel = ClubApplyListPanel;
    __reflect(ClubApplyListPanel.prototype, "club.ClubApplyListPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**申请列表 */
    var ClubApplyRecordPanel = (function (_super) {
        __extends(ClubApplyRecordPanel, _super);
        function ClubApplyRecordPanel() {
            var _this = _super.call(this) || this;
            /**当前页数 */
            _this._curPage = 0;
            _this.skinName = "ClubApplyRecordSkin";
            return _this;
        }
        ClubApplyRecordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubApplyRecordPanel.prototype.initUI = function () {
            this.messageList.itemRenderer = ClubApplyRecordItem;
            // if (MJLobbyData.getInstance().applyRecordList) {
            //     this._curPage = MJLobbyData.getInstance().applyRecordList.curPage;
            //     this._totalPage = MJLobbyData.getInstance().applyRecordList.maxPage;
            //     this.updateApplyList(MJLobbyData.getInstance().applyRecordList.records);
            // }
        };
        /**事件监听 */
        ClubApplyRecordPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(club.ClubConst.GET_APPLYRECORD_LIST, this.updateList, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubApplyRecordPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(club.ClubConst.GET_APPLYRECORD_LIST, this.updateList, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubApplyRecordPanel.prototype.updateList = function (evt) {
            club.ClubData.getInstance().applyRecordList = evt.param;
            this._curPage = club.ClubData.getInstance().applyRecordList.curPage;
            this._totalPage = club.ClubData.getInstance().applyRecordList.maxPage;
            this.updateApplyList(club.ClubData.getInstance().applyRecordList.records);
        };
        ClubApplyRecordPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubApplyRecordPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text.length < 8) {
                        uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID!");
                        this._searchEditableText.text = "";
                    }
                    else {
                        var seq = new Cmd.GetApproveRecordMatchGroupCmd_C;
                        seq.matchId = club.ClubData.getInstance().clubmatchid;
                        seq.curPage = 1;
                        seq.uid = Number(this._searchEditableText.text);
                        NetMgr.tcpSend(seq);
                    }
                    break;
            }
        };
        /**输入框判断 */
        ClubApplyRecordPanel.prototype.onTextFieldFocusOut = function (event) {
            if (event.target.text == "" || Number(event.target.text) == 0) {
                event.target.text = "";
            }
        };
        /** 更新申请数据*/
        ClubApplyRecordPanel.prototype.updateApplyList = function (list) {
            var _this = this;
            this._allUidList = [];
            if (list.length > 0) {
                this._tipsText.visible = false;
                list.forEach(function (element) {
                    _this._allUidList.push(element.uid);
                });
            }
            else {
                this._tipsText.visible = true;
            }
            if (!list || list.length <= 0 || !Array.isArray(list)) {
                return;
            }
            if (!this.messageListArr) {
                this.messageListArr = new eui.ArrayCollection(list);
                this.messageList.dataProvider = this.messageListArr;
            }
            else {
                if (Array.isArray(this.messageListArr.source)) {
                    this.messageListArr.removeAll();
                }
                this.messageListArr.replaceAll(list);
            }
        };
        /**单独加 */
        ClubApplyRecordPanel.prototype.addListen = function () {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        };
        /**获取战绩消息 */
        ClubApplyRecordPanel.prototype.getData = function () {
            uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            club.ClubSendMgr.requestGetApproveRecordMatchGroupCmd_C(club.ClubData.getInstance().clubmatchid, this._curPage, null);
        };
        /**滑到底加载其他页数据 */
        ClubApplyRecordPanel.prototype.checkTop = function (evt) {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(1000).call(this.addListen, this); //2秒不返回继续可以请求
                }
            }
        };
        return ClubApplyRecordPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubApplyRecordPanel = ClubApplyRecordPanel;
    __reflect(ClubApplyRecordPanel.prototype, "club.ClubApplyRecordPanel");
    var ClubApplyRecordItem = (function (_super) {
        __extends(ClubApplyRecordItem, _super);
        function ClubApplyRecordItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubApplyRecordItemSkin";
            return _this;
        }
        ClubApplyRecordItem.prototype.dataChanged = function () {
            this._info = this.data;
            if (this._info == null)
                return;
            this._indextText.text = this.itemIndex + 1 + "";
            if (this._info.timestamp) {
                this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this._info.timestamp);
            }
            if (this._info.name) {
                if (uniLib.StringUtils.getStrRealLength(this._info.name) > 5) {
                    this._nameText1.text = this._info.name.substr(0, 5) + "...";
                }
                else {
                    this._nameText1.text = this._info.name;
                }
            }
            if (this._info.uid) {
                this._uidText1.text = this._info.uid + "";
            }
            if (this._info.headurl) {
                this._headImg1.source = this._info.headurl;
            }
            if (this._info.mastername) {
                if (uniLib.StringUtils.getStrRealLength(this._info.mastername) > 5) {
                    this._nameText2.text = this._info.mastername.substr(0, 5) + "...";
                }
                else {
                    this._nameText2.text = this._info.mastername;
                }
            }
            if (this._info.masteruid) {
                this._uidText2.text = this._info.masteruid + "";
            }
            if (this._info.masterheadurl) {
                this._headImg2.source = this._info.masterheadurl;
            }
            if (this._info.type == 1) {
                this._enterText.text = "玩家主动申请";
            }
            else if (this._info.type == 2) {
                this._enterText.text = "白名单加入";
            }
            else if (this._info.type == 3) {
                this._enterText.text = "合作群添加";
            }
        };
        return ClubApplyRecordItem;
    }(eui.ItemRenderer));
    __reflect(ClubApplyRecordItem.prototype, "ClubApplyRecordItem");
})(club || (club = {}));
var club;
(function (club_1) {
    /**
    * 单个老友圈选项
    */
    var ClubBoxItem = (function (_super) {
        __extends(ClubBoxItem, _super);
        function ClubBoxItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubBoxItemSkin";
            _this.removeRedPoint();
            _this.addListener();
            return _this;
        }
        ClubBoxItem.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubBoxItem.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubBoxItem.prototype.destory = function () {
            this.removeListener();
        };
        ClubBoxItem.prototype.dataChanged = function () {
            this.info = this.data;
            var userVo2 = this.info.ownerName;
            var strLength;
            while (this.getStrRealLength(userVo2) > 12) {
                strLength = userVo2.length;
                userVo2 = userVo2.substr(0, strLength - 1);
            }
            this.idText.text = this.info.matchId.toString();
            this.nameText.text = userVo2;
            this.roomNameText.text = this.info.gameName + "  " + this.info.gameNbr + "局";
            if (this.info.gameNbr >= 49) {
                this.roomNameText.text = this.info.gameName + "  " + Math.round(this.info.gameNbr) + "课";
            }
            this.boxNameText.text = this.info.matchName ? this.info.matchName : this.info.matchId.toString();
            this.waitRoomText.text = this.info.waitRoomNbr + "桌等待中";
            this.startRoomText.text = this.info.startRoomNbr + "桌开始";
            this.head.source = this.info.ownerHeadUrl;
            this.numberText.text = this.info.index + "";
            if (this.info.isNew && this.info.isNew == 1) {
                this.bg.source = "club_new_menage_json.mjl_club_my";
            }
            if (this.info.noHandle && this.info.noHandle == 1) {
                this.addRedPoint();
            }
        };
        ClubBoxItem.prototype.onClickTap = function (e) {
            if (e.target == this.inBtn) {
                club_1.ClubModuleMgr.getInstance().removeClubDeskPanel();
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = this.info.matchId;
                cmd.isClub = 1;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(club_1.ClubAllBoxPanel);
            }
            else if (e.target == this.outBtn) {
                var club_2 = this;
                var okFunc = function () {
                    var cmd = new Cmd.LeaveMatchGroup2Cmd_C();
                    cmd.matchId = club_2.info.matchId;
                    if (club_1.ClubData.getInstance().clubmatchid == club_2.info.matchId) {
                        club_1.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    }
                    NetMgr.tcpSend(cmd);
                    var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    req.isClub = 1;
                    NetMgr.tcpSend(req);
                };
                ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
            }
            else if (e.target == this.bg) {
                club_1.ClubModuleMgr.getInstance().removeClubDeskPanel();
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = this.info.matchId;
                cmd.isClub = 1;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(club_1.ClubAllBoxPanel);
            }
        };
        /**
        * 红点
        */
        ClubBoxItem.prototype.addRedPoint = function () {
            var redPoint = this.skin["redPoint"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        ClubBoxItem.prototype.removeRedPoint = function () {
            var redPoint = this.skin["redPoint"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        };
        /**名字长度截取，避免长度过长造成溢出显示或重叠 */
        ClubBoxItem.prototype.getStrRealLength = function (str) {
            var jmz = { GetLength: null };
            jmz.GetLength = function (str) {
                return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length); //先把中文替换成两个字节的英文，在计算长度
            };
            return jmz.GetLength(str);
        };
        return ClubBoxItem;
    }(eui.ItemRenderer));
    club_1.ClubBoxItem = ClubBoxItem;
    __reflect(ClubBoxItem.prototype, "club.ClubBoxItem");
})(club || (club = {}));
/**老友圈所有房间面板 */
var club;
(function (club) {
    var ClubBoxPanel = (function (_super) {
        __extends(ClubBoxPanel, _super);
        function ClubBoxPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubBoxSkin";
            return _this;
        }
        ClubBoxPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubBoxPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubBoxPanel.prototype.initUI = function () {
        };
        ClubBoxPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubBoxPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubBoxPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._createBtn:
                    _super.prototype.removePop.call(this);
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    club.ClubModuleMgr.getInstance().showCreateClubPanel();
                    break;
                case this._joinBtn:
                    _super.prototype.removePop.call(this);
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    LobbyModuleMgr.getInstance().showJoinRoomPanel(function () {
                        var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        NetMgr.tcpSend(req);
                    });
                    break;
            }
        };
        return ClubBoxPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubBoxPanel = ClubBoxPanel;
    __reflect(ClubBoxPanel.prototype, "club.ClubBoxPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友清除记录页面 ItemRenderer*/
    var ClubCleanRecordItemPanel = (function (_super) {
        __extends(ClubCleanRecordItemPanel, _super);
        function ClubCleanRecordItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubCleanRecordItemSkin";
            return _this;
        }
        ClubCleanRecordItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubCleanRecordItemPanel.prototype.dataChanged = function () {
            var days = ["今日输赢", "昨日输赢", "前日输赢"];
            this._info = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this._info.timestamp);
            this._dayText.text = days[this._info.which - 1] + " " + this._info.nbr;
            this._nameText.text = this._info.opUser;
        };
        return ClubCleanRecordItemPanel;
    }(eui.ItemRenderer));
    club.ClubCleanRecordItemPanel = ClubCleanRecordItemPanel;
    __reflect(ClubCleanRecordItemPanel.prototype, "club.ClubCleanRecordItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友清除记录页面 */
    var ClubCleanRecordPanel = (function (_super) {
        __extends(ClubCleanRecordPanel, _super);
        function ClubCleanRecordPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubCleanRecordSkin";
            return _this;
        }
        ClubCleanRecordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubCleanRecordPanel.prototype.initUI = function () {
            this._list.itemRenderer = club.ClubCleanRecordItemPanel;
        };
        /**事件监听 */
        ClubCleanRecordPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetCleanRecordMatchGroup, this.showDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubCleanRecordPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.GetCleanRecordMatchGroup, this.showDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubCleanRecordPanel.prototype.showDate = function (evt) {
            var vo = evt.param;
            if (Array.isArray(vo.records)) {
                this._tishiText.visible = false;
                if (!this._listArr) {
                    this._listArr = new eui.ArrayCollection(vo.records);
                    this._list.dataProvider = this._listArr;
                }
                else {
                    if (Array.isArray(this._listArr.source)) {
                        this._listArr.removeAll();
                    }
                    this._listArr.replaceAll(vo.records);
                }
            }
            else {
                this._tishiText.visible = true;
            }
        };
        ClubCleanRecordPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        ClubCleanRecordPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return ClubCleanRecordPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubCleanRecordPanel = ClubCleanRecordPanel;
    __reflect(ClubCleanRecordPanel.prototype, "club.ClubCleanRecordPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 老友圈桌子面板
     */
    var ClubDeskPanel = (function (_super) {
        __extends(ClubDeskPanel, _super);
        function ClubDeskPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubDeskSkin";
            return _this;
        }
        ClubDeskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // this.width = uniLib.Global.screenWidth;
            // this.height = uniLib.Global.screenHeight;
        };
        ClubDeskPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubDeskPanel.prototype.initUI = function () {
            this._scratchBtn.visible = Boolean(club.ClubData.getInstance().isShowScratch);
            this.deskList.itemRenderer = club.ClubItemDesk;
            this._clubMsgMcPanel.touchEnabled = true;
        };
        ClubDeskPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(club.ClubConst.ReturnMatchGroupManage, this.updateplayTypeDesc, this);
            uniLib.Global.addEventListener(club.ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.addEventListener(club.ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            uniLib.Global.addEventListener(club.ClubConst.CLUB_NOTICE, this.updateNotice, this);
            this._clubMsgMcPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNotice, this);
        };
        ClubDeskPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(club.ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.removeEventListener(club.ClubConst.ReturnMatchGroupManage, this.updateplayTypeDesc, this);
            uniLib.Global.removeEventListener(club.ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.removeEventListener(club.ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.deskList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            uniLib.Global.removeEventListener(club.ClubConst.CLUB_NOTICE, this.updateNotice, this);
            this._clubMsgMcPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showNotice, this);
        };
        /**房主修改玩法后 修改桌面数据 */
        ClubDeskPanel.prototype.updateplayTypeDesc = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            if (date.curMath) {
                if (date.curMath.matchId == club.ClubData.getInstance().clubmatchid) {
                    this._clubPlayText.text = "【" + date.curMath.gameName + "】" + date.curMath.playTypeDesc;
                    this._curMath.playTypeDesc = date.curMath.playTypeDesc;
                    this._curMath.gameNbr = date.curMath.gameNbr;
                    this._curMath.userNbr = date.curMath.userNbr;
                    if (date.curMath.winnerConditions) {
                        this._curMath.winnerConditions = date.curMath.winnerConditions;
                    }
                    this.getDeskList(this._deskList);
                    this.updateDesk(this._showList);
                }
            }
        };
        /**更新桌子数据 */
        ClubDeskPanel.prototype.updateDesk = function (list) {
            if (!this.deskListArray) {
                this.deskListArray = new eui.ArrayCollection(list);
                this.deskList.dataProvider = this.deskListArray;
            }
            else {
                if (Array.isArray(this.deskListArray.source)) {
                    this.deskListArray.removeAll();
                }
                this.deskListArray.replaceAll(list);
            }
        };
        /**构造桌子数据 */
        ClubDeskPanel.prototype.getDeskList = function (roomlist) {
            this._showList = [];
            if (Array.isArray(roomlist)) {
                this._showList = roomlist.concat();
            }
            /**第一个快速进房 */
            var infozz1 = new Cmd.MathGroupRoomInfo();
            infozz1.state = club.ClubConst.CLUB_CREATEDESK;
            infozz1.userNbr = this._curMath.userNbr;
            this._showList.unshift(infozz1);
            if (this._showList.length < 8) {
                var listlength = this._showList.length;
                for (var i = 0; i < 8 - listlength; i++) {
                    var infozz = new Cmd.MathGroupRoomInfo();
                    infozz.state = club.ClubConst.CLUB_DESKSHOW;
                    infozz.userNbr = this._curMath.userNbr;
                    this._showList.push(infozz);
                }
            }
            else {
                var infozz = new Cmd.MathGroupRoomInfo();
                infozz.state = club.ClubConst.CLUB_DESKSHOW;
                infozz.userNbr = this._curMath.userNbr;
                this._showList.push(infozz);
            }
        };
        /**显示弹窗修改页面 */
        ClubDeskPanel.prototype.showNotice = function () {
            var cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
            cmd.matchId = club.ClubData.getInstance().clubmatchid;
            NetMgr.tcpSend(cmd);
            club.ClubModuleMgr.getInstance().showClubNoticePanel();
        };
        ClubDeskPanel.prototype.setDate = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            this._curMath = date.curMath;
            if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid || uniLib.UserInfo.uid.toString() == this._curMath.masterid2) {
                club.ClubData.getInstance().isClubManage = true;
            }
            else {
                club.ClubData.getInstance().isClubManage = false;
            }
            club.ClubData.getInstance().clubShareInfo = this._curMath ? this._curMath.shareInfo : null;
            /**  判断是否有老友圈，没得话关闭桌面  */
            if (this._curMath) {
                if (club.ClubData.getInstance().isClubManage) {
                    this._boxManageBtn.visible = true;
                    this._applyListBtn.visible = true;
                    this._queryAllFightingBtn.visible = true;
                    this._queryFightingBtn.visible = false;
                    this._partnerBtn.visible = true;
                    this._partnerMemberBtn.visible = false;
                    this.isOwner = true;
                }
                else {
                    this._boxManageBtn.visible = false;
                    this._applyListBtn.visible = false;
                    this._queryAllFightingBtn.visible = false;
                    this._queryFightingBtn.visible = true;
                    this._partnerBtn.visible = false;
                    this._partnerMemberBtn.visible = false;
                    this.isOwner = false;
                    if (this._curMath.isPartner && this._curMath.isPartner == 1) {
                        this._partnerMemberBtn.visible = true;
                    }
                }
                this._clubMsgMcPanel.getclubmsg(this._curMath.clubNotice);
                club.ClubData.getInstance().clubmatchid = this._curMath.matchId;
                this._titleText.text = this._curMath.matchName ? this._curMath.matchName : this._curMath.matchId.toString();
                this._clubPlayText.text = "【" + this._curMath.gameName + "】" + this._curMath.playTypeDesc;
                this._clubIdText.text = "" + this._curMath.matchId;
                this._clubIdText.touchEnabled = true;
                this._clubIdText.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyid, this);
                this._userIdText.text = uniLib.UserInfo.uid + "";
                this._userNameText.text = uniLib.UserInfo.nickName;
                this._userHeadImg.source = uniLib.UserInfo.headUrl;
                this._memberListBtn.skin["menberNum"].text = this._curMath.onlineUserNum;
                this.setPlayerIconMask(this._userHeadImg);
                this._clubOwnerText.text = this._curMath.ownerid + "";
                this._deskList = date.curMath.roomList;
                this.getDeskList(this._deskList);
                this.updateDesk(this._showList);
                if (date.isFirst && club.ClubData.getInstance().isClubManage) {
                    club.ClubModuleMgr.getInstance().showClubGuidePanel();
                }
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.removePop();
            }
        };
        /**更新老友圈数据 */
        ClubDeskPanel.prototype.updatedesklist = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            this._curMathlist = date.curMath;
            if (this._curMathlist) {
                this._deskList = this._curMathlist.roomList;
                this._memberListBtn.skin["menberNum"].text = this._curMathlist.onlineUserNum;
                this.getDeskList(this._deskList);
                this.updateDesk(this._showList);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.removePop();
            }
        };
        /**更新公告 */
        ClubDeskPanel.prototype.updateNotice = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            this._clubMsgMcPanel.getclubmsg(date.content);
        };
        /**断线重连 重新发协议 */
        ClubDeskPanel.prototype.onSendmsg = function () {
            club.ClubSendMgr.requestMatchData(1);
        };
        /**头像蒙版 圆形 */
        ClubDeskPanel.prototype.setPlayerIconMask = function (image) {
            var maskTexture = RES.getRes("club_new_menage_json.club_head_bg");
            var maskImg = new egret.Bitmap();
            this.addChild(maskImg);
            maskImg.texture = maskTexture;
            maskImg.width = 77;
            maskImg.height = 77;
            maskImg.x = (image.width - maskImg.width) / 2 + image.x;
            maskImg.y = (image.height - maskImg.height) / 2 + image.y;
            image.mask = maskImg;
        };
        ClubDeskPanel.prototype.showRedPoint = function (evt) {
            club.ClubData.getInstance().JoinMemberList = evt.param;
            this.joinMember = [];
            if (club.ClubData.getInstance().JoinMemberList && club.ClubData.getInstance().JoinMemberList.list && club.ClubData.getInstance().JoinMemberList.list instanceof Array)
                this.joinMember = club.ClubData.getInstance().JoinMemberList.list;
            if (this.joinMember && this.joinMember.length > 0) {
                if (club.ClubData.getInstance().isClubManage) {
                    this.addRedPoint();
                }
            }
            else {
                this.removeRedPoint();
            }
        };
        /**
          * 红点
          */
        ClubDeskPanel.prototype.addRedPoint = function () {
            var redPoint = this.skin["_redPointImg"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        /**删除红点 */
        ClubDeskPanel.prototype.removeRedPoint = function () {
            var redPoint = this.skin["_redPointImg"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        };
        /**复制老友圈号 */
        ClubDeskPanel.prototype.copyid = function (e) {
            uniLib.ZQGameSdk.nativeCopyStr(this._clubIdText.text);
            uniLib.TipsUtils.showTipsDownToUp("复制成功" + this._clubIdText.text);
        };
        ClubDeskPanel.prototype.onClickTap = function (e) {
            var _this = this;
            var cmd;
            switch (e.target) {
                case this._closeBtn:
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    break;
                case this.createBtn:
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    club.ClubModuleMgr.getInstance().showCreateClubPanel();
                    break;
                case this._swtichBtn:
                    club.ClubSendMgr.requestClubMatchList();
                    break;
                case this._shareBtn:
                    this.onShareTap();
                    break;
                case this._memberListBtn:
                    club.ClubModuleMgr.getInstance().showClubPlayerListPanel(this.isOwner);
                    cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this._curMath.matchId;
                    cmd.typ = 1;
                    NetMgr.tcpSend(cmd);
                    break;
                case this._queryFightingBtn:
                    club.ClubModuleMgr.getInstance().showClubMemberRecordPanel(function () {
                        club.ClubSendMgr.getGameDataHistoryForMatch(_this._curMath.matchId, 1, 1, club.ClubConst1.MATCH_HISTORY_FOR_MYSELF);
                    });
                    break;
                case this._queryAllFightingBtn:
                    club.ClubModuleMgr.getInstance().showClubAllRecordPanel(function () {
                        club.ClubSendMgr.getGameDataHistoryForMatch(_this._curMath.matchId, 1, 1, club.ClubConst1.MATCH_HISTORY_FOR_DESK);
                    });
                    break;
                case this._boxManageBtn:
                    club.ClubData.getInstance().clubChoice = 1;
                    club.ClubModuleMgr.getInstance().showClubManagePanel();
                    club.ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                    break;
                case this._noticeBtn:
                    cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                    cmd.matchId = this._curMath.matchId;
                    NetMgr.tcpSend(cmd);
                    club.ClubModuleMgr.getInstance().showClubNoticePanel();
                    break;
                case this._scratchBtn:
                    cmd = new Cmd.IntoScratchTicketLobbyCmd_C();
                    NetMgr.tcpSend(cmd);
                    break;
                case this._fastPlayBtn:
                    club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    var req = new Cmd.EnterRoomCmd_C;
                    req.floorId = this._curMath.floorId;
                    req.roomId = this._curMath.matchId;
                    NetMgr.tcpSend(req);
                    break;
                case this._applyListBtn:
                    club.ClubModuleMgr.getInstance().showClubUserApplyPanel();
                    break;
                case this._clubDetailBtn:
                    club.ClubModuleMgr.getInstance().showClubDetailsPanel(this._curMath);
                    break;
                case this._partnerBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerRecordPanel(function () {
                        cmd = new Cmd.GetPartnerRecordsMatchGroupCmd_CS();
                        cmd.matchId = club.ClubData.getInstance().clubmatchid;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
                case this._partnerMemberBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerMemberRecordPanel(function () {
                        cmd = new Cmd.GetMemberRecordsMatchGroupCmd_CS();
                        cmd.matchId = club.ClubData.getInstance().clubmatchid;
                        cmd.targetUid = uniLib.UserInfo.uid;
                        cmd.typ = 1;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
            }
        };
        ClubDeskPanel.prototype.onShareTap = function () {
            var codeId = this._curMath.matchId;
            club.ClubData.getInstance().clubShareInfo = this.shareInfo = this._curMath ? this._curMath.shareInfo : null;
            var vo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                var nick = uniLib.UserInfo.nickName;
                if (nick.length > 8) {
                    nick = nick.slice(0, 8);
                }
                if (MJLobbyData.getInstance().lobbyConfig.hasOwnProperty("newLink") && MJLobbyData.getInstance().lobbyConfig["newLink"] != "") {
                    vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + MJLobbyData.getInstance().lobbyConfig["newLink"] + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                }
                else {
                    vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wq.laoyouwan.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                }
            }
            else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.shareType = Cmd.ShareType.enterRoom;
            vo.wgShareData = JSON.stringify({ "roomId": codeId });
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        };
        /**桌子列表操作 */
        ClubDeskPanel.prototype.itemTap = function (evt) {
            var item = this.deskList.selectedItem;
            if (item.state == club.ClubConst.CLUB_CREATEDESK) {
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                var req = new Cmd.EnterRoomCmd_C;
                req.floorId = this._curMath.floorId;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            }
            else {
                this.showClubRoomdetails();
                if (this.clubRoomdetails) {
                    this.clubRoomdetails.setDate(this._curMath);
                    var item_1 = this.deskList.selectedItem;
                    this.clubRoomdetails.setUserDate(item_1);
                }
            }
        };
        ClubDeskPanel.prototype.showClubRoomdetails = function () {
            this.clubRoomdetails = new club.ClubRoomdetails();
            this.clubRoomdetails.addEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeDesk, this);
            uniLib.PopUpMgr.addPopUp(this.clubRoomdetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        };
        ClubDeskPanel.prototype.removeClubRoomdetails = function () {
            if (this.clubRoomdetails) {
                this.clubRoomdetails.removeEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeDesk, this);
                uniLib.PopUpMgr.removePopUp(this.clubRoomdetails);
                this.clubRoomdetails = null;
            }
        };
        ClubDeskPanel.prototype.removeDesk = function () {
            club.ClubModuleMgr.getInstance().removeClubDeskPanel();
            this.removeClubRoomdetails();
        };
        return ClubDeskPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubDeskPanel = ClubDeskPanel;
    __reflect(ClubDeskPanel.prototype, "club.ClubDeskPanel");
})(club || (club = {}));
/**
 * 俱乐部玩法详情
 */
var club;
(function (club) {
    var ClubDetailsPanel = (function (_super) {
        __extends(ClubDetailsPanel, _super);
        function ClubDetailsPanel(data) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubDetailsSkin";
            _this.info = data;
            return _this;
        }
        ClubDetailsPanel.prototype.initUI = function () {
            this.setDetailDate();
        };
        ClubDetailsPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubDetailsPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubDetailsPanel.prototype.setDetailDate = function () {
            this.gameText.text = this.info.gameName;
            this.gnumberText.text = this.info.gameNbr.toString() + "局";
            if (this.info.gameNbr >= 49) {
                this.gnumberText.text = Math.round(this.info.gameNbr) + "课";
            }
            this.playText.text = this.info.playTypeDesc;
            this.pnumberText.text = +this.info.userNbr + "人房";
            if (this.info.gameId == 4124 || this.info.gameId == 4207 || this.info.gameId == 4149 || this.info.gameId == 4275 || this.info.gameId == 4123) {
                if (this.info.winnerConditions) {
                    this.bigWinText.text = "大赢家最低分数设置：" + this.info.winnerConditions;
                    this.bigWinText.visible = true;
                }
                else {
                    this.bigWinText.visible = false;
                }
            }
            else {
                this.bigWinText.visible = false;
            }
        };
        ClubDetailsPanel.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
        };
        return ClubDetailsPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubDetailsPanel = ClubDetailsPanel;
    __reflect(ClubDetailsPanel.prototype, "club.ClubDetailsPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
   *第一次进入老友圈的玩家检验，加备注
   */
    var ClubEnterRemarks = (function (_super) {
        __extends(ClubEnterRemarks, _super);
        function ClubEnterRemarks() {
            var _this = _super.call(this, "", 700, 400) || this;
            _this.skinName = "ClubEnterRemarksSkin";
            return _this;
        }
        ClubEnterRemarks.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.addEventListener(club.ClubConst.NotifyImportNoteCmd, this.setDate, this);
            this.remarksText.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        ClubEnterRemarks.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(club.ClubConst.NotifyImportNoteCmd, this.setDate, this);
            this.remarksText.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        ClubEnterRemarks.prototype.setDate = function (evt) {
            var Data = evt.param;
            this.roomId = Data.roomId;
            this.lobbyId = Data.lobbyId;
            this.preBestRoomId = Data.preBestRoomId;
            this.clubText.text = "您正在申请进入老友圈“" + this.roomId + "”";
        };
        ClubEnterRemarks.prototype.onClickTap = function (e) {
            if (e.target == this.yesBtn) {
                var cmd = new Cmd.EnterRoomCmd_C();
                cmd.lobbyId = this.lobbyId;
                cmd.roomId = this.roomId;
                cmd.preBestRoomId = this.preBestRoomId;
                var text = this.remarksText.text;
                if (this.remarksText) {
                    cmd.note = text;
                }
                else {
                    cmd.note = "";
                }
                NetMgr.tcpSend(cmd);
                this.removePop();
            }
        };
        return ClubEnterRemarks;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubEnterRemarks = ClubEnterRemarks;
    __reflect(ClubEnterRemarks.prototype, "club.ClubEnterRemarks");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 新手指引 群主
     */
    var ClubGuidePanel = (function (_super) {
        __extends(ClubGuidePanel, _super);
        function ClubGuidePanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubGuideSkin";
            return _this;
        }
        ClubGuidePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        //初始化
        ClubGuidePanel.prototype.initUI = function () {
            this._counter = 0;
            this.onClick();
        };
        /**事件监听 */
        ClubGuidePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubGuidePanel.prototype.removeEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        /**背景光旋转 */
        ClubGuidePanel.prototype.guangtween = function (val) {
            uniLib.DisplayUtils.stopTweenGroup(this.group1);
            if (val) {
                uniLib.DisplayUtils.playTweenGroup(this.group1, true);
            }
        };
        ClubGuidePanel.prototype.onClick = function () {
            this._counter++;
            this._guideGroup1.visible = this._guideGroup2.visible
                = this._guideGroup3.visible = this._guideGroup4.visible = false;
            // this.guangtween(true);
            if (this._counter > 4) {
                _super.prototype.removePop.call(this);
            }
            else {
                this["_guideGroup" + this._counter].visible = true;
            }
        };
        return ClubGuidePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubGuidePanel = ClubGuidePanel;
    __reflect(ClubGuidePanel.prototype, "club.ClubGuidePanel");
})(club || (club = {}));
var club;
(function (club) {
    /**导入成员 */
    var ClubImportPanel = (function (_super) {
        __extends(ClubImportPanel, _super);
        function ClubImportPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubImportSkin";
            return _this;
        }
        ClubImportPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubImportPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetCanImportMemberListMatchGroup, this.showdate, this);
            this._clubList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubImportPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.GetCanImportMemberListMatchGroup, this.showdate, this);
            this._clubList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        //初始化
        ClubImportPanel.prototype.initUI = function () {
            this._clubList.itemRenderer = ClubImportItemPanel;
        };
        ClubImportPanel.prototype.showdate = function (evt) {
            var member = evt.param;
            this._matchArr = member.matchLists;
            this.updateList();
        };
        ClubImportPanel.prototype.onClick = function (evt) {
            var _this = this;
            switch (evt.target) {
                case this._closeBtn:
                    club.ClubData.getInstance().ClubImportMatchId = 0;
                    _super.prototype.removePop.call(this);
                    break;
                case this._importBtn:
                    if (club.ClubData.getInstance().ClubImportMatchId == 0) {
                        uniLib.TipsUtils.showConfirm("请选择需要导入的老友圈！", "", "确定", null);
                    }
                    else {
                        uniLib.TipsUtils.showConfirm("确认导入" + this._matchName + "老友圈！", "", "确定", function () {
                            var cmd = new Cmd.ImportMemberListMatchGroupCmd_CS();
                            cmd.fromMatchId = club.ClubData.getInstance().ClubImportMatchId;
                            cmd.toMatchId = club.ClubData.getInstance().matchid;
                            NetMgr.tcpSend(cmd);
                            club.ClubData.getInstance().ClubImportMatchId = 0;
                            _super.prototype.removePop.call(_this);
                        }, "取消", null);
                    }
                    break;
            }
        };
        ClubImportPanel.prototype.itemTap = function (evt) {
            if (this._clubList.selectedItem) {
                var item = this._clubList.selectedItem;
                if (item.matchId == club.ClubData.getInstance().ClubImportMatchId) {
                    club.ClubData.getInstance().ClubImportMatchId = 0;
                    this._matchName = "";
                }
                else {
                    club.ClubData.getInstance().ClubImportMatchId = item.matchId;
                    this._matchName = item.matchName;
                }
            }
            this.updateList();
        };
        /**更新显示 */
        ClubImportPanel.prototype.updateList = function () {
            if (!this._clubListArr) {
                this._clubListArr = new eui.ArrayCollection(this._matchArr);
                this._clubList.dataProvider = this._clubListArr;
            }
            else {
                if (Array.isArray(this._clubListArr.source)) {
                    this._clubListArr.removeAll();
                }
                this._clubListArr.replaceAll(this._matchArr);
            }
        };
        return ClubImportPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubImportPanel = ClubImportPanel;
    __reflect(ClubImportPanel.prototype, "club.ClubImportPanel");
    /**导入成员Item */
    var ClubImportItemPanel = (function (_super) {
        __extends(ClubImportItemPanel, _super);
        function ClubImportItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubImportItemSkin";
            return _this;
        }
        ClubImportItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubImportItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._clubNameText.text = this._info.matchName;
            this._clubIdText.text = this._info.matchId + '';
            this._numText.text = this._info.memberNum + '';
            if (this._info.matchId == club.ClubData.getInstance().ClubImportMatchId) {
                this._selectImg.visible = true;
            }
        };
        return ClubImportItemPanel;
    }(eui.ItemRenderer));
    club.ClubImportItemPanel = ClubImportItemPanel;
    __reflect(ClubImportItemPanel.prototype, "club.ClubImportItemPanel");
})(club || (club = {}));
/** */
var club;
(function (club) {
    var ClubInviteBrdPanel = (function (_super) {
        __extends(ClubInviteBrdPanel, _super);
        function ClubInviteBrdPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubInviteBrdSkin";
            return _this;
        }
        ClubInviteBrdPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**事件监听 */
        ClubInviteBrdPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.InviteMemberMatchGroupBrd, this.showDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubInviteBrdPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.InviteMemberMatchGroupBrd, this.showDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubInviteBrdPanel.prototype.initUI = function () {
        };
        ClubInviteBrdPanel.prototype.showDate = function (evt) {
            this.inviteData = evt.param;
            this._headImg.source = this.inviteData.inviter.headUrl;
            this._nameText.textFlow = (new egret.HtmlTextParser).parser("玩家：<bold>" + this.inviteData.inviter.nickname + "</bold>邀请您进入<bold>" + this.inviteData.curMatch.gameName + "</bold>房间");
            this._uidText.text = "ID：" + this.inviteData.inviter.uid;
            this._clubNameText.text = "群名：" + this.inviteData.curMatch.matchName;
            this._clubIdText.text = "群ID：" + this.inviteData.curMatch.matchId;
            this._playText.text = "玩法：" + this.inviteData.curMatch.playTypeDesc;
        };
        ClubInviteBrdPanel.prototype.onClick = function (e) {
            switch (e.target) {
                case this._closeBtn:
                case this._noBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._yesBtn:
                    var req = new Cmd.EnterRoomCmd_C;
                    if (this.inviteData.roomId) {
                        req.preBestRoomId = this.inviteData.roomId;
                    }
                    else {
                        req.preBestRoomId = 0;
                    }
                    req.roomId = this.inviteData.curMatch.matchId;
                    NetMgr.tcpSend(req);
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        return ClubInviteBrdPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubInviteBrdPanel = ClubInviteBrdPanel;
    __reflect(ClubInviteBrdPanel.prototype, "club.ClubInviteBrdPanel");
})(club || (club = {}));
/**俱乐部内部分享界面 */
var club;
(function (club) {
    var ClubInvitePanel = (function (_super) {
        __extends(ClubInvitePanel, _super);
        function ClubInvitePanel(data) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubInviteSkin";
            _this._data = data;
            return _this;
        }
        ClubInvitePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubInvitePanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubInvitePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        ClubInvitePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        ClubInvitePanel.prototype.initUI = function () {
            if (this._data && this._data instanceof Number) {
                this._roomId = this._data;
            }
        };
        ClubInvitePanel.prototype.btnClick = function (evt) {
            switch (evt.target) {
                /**微信分享 */
                case this._wXinIcon:
                    this.share();
                    break;
                /**老友圈成员分享 */
                case this._clubIcon:
                    var req2 = new Cmd.GetCanInviteMemberListMatchGroupCmd_CS;
                    if (uniLib.Global.isInGame) {
                        req2.matchId = club.ClubData.getInstance().EnterClubId;
                        req2.roomId = club.ClubData.getInstance().EnterRoomId;
                    }
                    else {
                        req2.matchId = club.ClubData.getInstance().clubmatchid;
                        if (this._roomId) {
                            req2.roomId = this._roomId;
                        }
                    }
                    NetMgr.tcpSend(req2);
                    _super.prototype.removePop.call(this);
                    break;
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        /**公共分享 */
        ClubInvitePanel.prototype.share = function (plat) {
            if (plat === void 0) { plat = uniLib.SHARE_PLAT.WX; }
            if (this._data && this._data instanceof uniLib.WXShareVo) {
                uniLib.Global.dispatchEvent("clubshare", this._data, true);
            }
            else {
                this.shareInfo = club.ClubData.getInstance().clubShareInfo ? club.ClubData.getInstance().clubShareInfo : null;
                var codeId = void 0;
                if (uniLib.Global.isInGame) {
                    codeId = club.ClubData.getInstance().EnterRoomId;
                }
                else {
                    if (this._roomId) {
                        codeId = this._roomId;
                    }
                    else {
                        codeId = club.ClubData.getInstance().clubmatchid;
                    }
                }
                var vo = new uniLib.WXShareVo();
                vo.shareWay = 0;
                if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                    var nick = uniLib.UserInfo.nickName;
                    if (nick.length > 8) {
                        nick = nick.slice(0, 8);
                    }
                    if (MJLobbyData.getInstance().lobbyConfig.hasOwnProperty("newLink") && MJLobbyData.getInstance().lobbyConfig["newLink"] != "") {
                        vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + MJLobbyData.getInstance().lobbyConfig["newLink"] + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + club.ClubData.getInstance().clubmatchid + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                    }
                }
                else {
                    vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
                }
                vo.shareType = Cmd.ShareType.enterRoom;
                vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
                if (uniLib.Global.isInGame) {
                    vo.roomId = JSON.stringify({ "roomId": club.ClubData.getInstance().EnterRoomId });
                }
                else {
                    if (this._roomId) {
                        vo.roomId = JSON.stringify({ "roomId": this._roomId });
                    }
                    else {
                        vo.roomId = JSON.stringify({ "matchId": club.ClubData.getInstance().clubmatchid });
                    }
                }
                uniLib.Global.dispatchEvent("clubshare", vo, true);
            }
        };
        /**分享成功回调 */
        ClubInvitePanel.prototype.shareBack = function (back) {
            egret.Tween.get(this).wait(100).call(this.delayShareBack, this, [back.code]);
            this.removePop();
        };
        ClubInvitePanel.prototype.delayShareBack = function (code) {
            if (code == 0) {
                uniLib.TipsUtils.showTipsDownToUp("分享成功!");
            }
            else if (code == 1) {
                uniLib.TipsUtils.showTipsDownToUp("分享已取消");
            }
            else if (code == 2) {
                uniLib.TipsUtils.showTipsDownToUp("分享被拒绝");
            }
        };
        return ClubInvitePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubInvitePanel = ClubInvitePanel;
    __reflect(ClubInvitePanel.prototype, "club.ClubInvitePanel");
})(club || (club = {}));
var club;
(function (club) {
    var ClubInvitePlayerItemPanel = (function (_super) {
        __extends(ClubInvitePlayerItemPanel, _super);
        function ClubInvitePlayerItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubInvitePlayerItemSkin";
            return _this;
        }
        ClubInvitePlayerItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubInvitePlayerItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubInvitePlayerItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubInvitePlayerItemPanel.prototype.dataChanged = function () {
            this.searchInfo = this.data;
            this._headImg.source = this.searchInfo.headUrl;
            this._nameText.text = this.searchInfo.nickname;
            this._idText.text = "ID:" + this.searchInfo.uid;
            if (this.searchInfo.state == club.ClubConst.OnlineState_Online) {
                this._typeText.text = "空闲";
            }
            else if (this.searchInfo.state == club.ClubConst.OnlineState_Invited) {
                this._typeText.text = "已邀请";
                this._inviteBtn.currentState = "disabled";
                this._inviteBtn.touchEnabled = false;
                this._inviteBtn.skin["_typeText"].text = "已邀请";
                this._inviteBtn.skin["_typeText"].strokeColor = "0x434343";
            }
            else if (this.searchInfo.state == club.ClubConst.OnlineState_Offline) {
                this._typeText.text = "离线";
                this._typeText.textColor = 0x747171;
                this._inviteBtn.currentState = "disabled";
                this._inviteBtn.touchEnabled = false;
                this._inviteBtn.skin["_typeText"].text = "邀请";
                this._inviteBtn.skin["_typeText"].strokeColor = "0x434343";
            }
            else if (this.searchInfo.state == club.ClubConst.OnlineState_Gameing) {
                this._typeText.text = "游戏中";
                this._typeText.textColor = 0x747171;
                this._inviteBtn.currentState = "disabled";
                this._inviteBtn.touchEnabled = false;
                this._inviteBtn.skin["_typeText"].text = "邀请";
                this._inviteBtn.skin["_typeText"].strokeColor = "0x434343";
            }
        };
        ClubInvitePlayerItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._inviteBtn:
                    if (uniLib.Global.isInGame) {
                        club.ClubSendMgr.InviteMemberMatchGroupCmd(club.ClubData.getInstance().EnterClubId, [this.searchInfo.uid]);
                    }
                    else {
                        club.ClubSendMgr.InviteMemberMatchGroupCmd(club.ClubData.getInstance().clubmatchid, [this.searchInfo.uid]);
                    }
                    break;
            }
        };
        return ClubInvitePlayerItemPanel;
    }(eui.ItemRenderer));
    club.ClubInvitePlayerItemPanel = ClubInvitePlayerItemPanel;
    __reflect(ClubInvitePlayerItemPanel.prototype, "club.ClubInvitePlayerItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    var ClubInvitePlayerPanel = (function (_super) {
        __extends(ClubInvitePlayerPanel, _super);
        function ClubInvitePlayerPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubInvitePlayerSkin";
            return _this;
        }
        ClubInvitePlayerPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubInvitePlayerPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        //初始化
        ClubInvitePlayerPanel.prototype.initUI = function () {
            this._playerList.itemRenderer = club.ClubInvitePlayerItemPanel;
        };
        /**事件监听 */
        ClubInvitePlayerPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetCanInviteMemberList, this.showData, this);
            uniLib.Global.addEventListener(club.ClubConst.InviteMemberMatchGroup, this.updateList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubInvitePlayerPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.InviteMemberMatchGroup, this.updateList, this);
            uniLib.Global.removeEventListener(club.ClubConst.GetCanInviteMemberList, this.showData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubInvitePlayerPanel.prototype.showData = function (evt) {
            var _this = this;
            var date = evt.param;
            if (!date) {
                return;
            }
            this._clubNameText.text = "群名：" + date.curMatch.matchName;
            this._clubIdText.text = "ID：" + date.curMatch.matchId;
            this._onlineText.text = "在线：" + date.curMatch.onlineUserNum;
            this._memberList = date.memberList;
            if (date.roomId) {
                club.ClubData.getInstance().InviteRoomId = date.roomId;
            }
            else {
                club.ClubData.getInstance().InviteRoomId = 0;
            }
            this._canInviteList = [];
            if (Array.isArray(this._memberList)) {
                this._memberList.forEach(function (element) {
                    if (element.state == club.ClubConst.OnlineState_Online) {
                        _this._canInviteList.push(element.uid);
                    }
                });
            }
            this.updateplayerListArray(this._memberList);
        };
        /**操作后 更新玩家状态 */
        ClubInvitePlayerPanel.prototype.updateList = function (evt) {
            var _this = this;
            var date = evt.param;
            if (!date) {
                return;
            }
            if (Array.isArray(this._memberList)) {
                this._memberList.forEach(function (element) {
                    if (Array.isArray(date.uids)) {
                        if (date.uids.indexOf(element.uid) != -1) {
                            element.state = club.ClubConst.OnlineState_Invited;
                        }
                    }
                });
            }
            this._canInviteList = [];
            if (Array.isArray(this._memberList)) {
                this._memberList.forEach(function (element) {
                    if (element.state == club.ClubConst.OnlineState_Online) {
                        _this._canInviteList.push(element.uid);
                    }
                });
            }
            this.updateplayerListArray(this._memberList);
        };
        /**更新数据 */
        ClubInvitePlayerPanel.prototype.updateplayerListArray = function (list) {
            if (list.length == 0) {
                this._tishiText.visible = true;
            }
            else {
                this._tishiText.visible = false;
            }
            if (!Array.isArray(list)) {
                this._tishiText.visible = true;
            }
            if (!this._playerListArray) {
                this._playerListArray = new eui.ArrayCollection(list);
                this._playerList.dataProvider = this._playerListArray;
            }
            else {
                if (Array.isArray(this._playerListArray.source)) {
                    this._playerListArray.removeAll();
                }
                this._playerListArray.replaceAll(list);
            }
        };
        /**搜索数据 */
        ClubInvitePlayerPanel.prototype.searchMember = function (value) {
            var ClubMemberList = this._memberList;
            this.searchArray = [];
            if (Array.isArray(ClubMemberList)) {
                if (value != "") {
                    this.searchArray = ClubMemberList.filter(function (a) {
                        return a.nickname.toString().indexOf(value) != -1 || a.uid.toString().indexOf(value) != -1;
                    });
                }
            }
            this.updateplayerListArray(this.searchArray);
        };
        ClubInvitePlayerPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._allInviteBtn:
                    if (this._canInviteList.length > 0) {
                        if (uniLib.Global.isInGame) {
                            club.ClubSendMgr.InviteMemberMatchGroupCmd(club.ClubData.getInstance().EnterClubId, this._canInviteList);
                        }
                        else {
                            club.ClubSendMgr.InviteMemberMatchGroupCmd(club.ClubData.getInstance().clubmatchid, this._canInviteList);
                        }
                    }
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text) {
                        this.searchMember(this._searchEditableText.text);
                    }
                    break;
            }
        };
        return ClubInvitePlayerPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubInvitePlayerPanel = ClubInvitePlayerPanel;
    __reflect(ClubInvitePlayerPanel.prototype, "club.ClubInvitePlayerPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 每个老友圈中的桌子
     */
    var ClubItemDesk = (function (_super) {
        __extends(ClubItemDesk, _super);
        function ClubItemDesk() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubItemDeskSkin";
            return _this;
        }
        ClubItemDesk.prototype.dataChanged = function () {
            this.info = this.data;
            if (this.info.state && this.info.state == club.ClubConst.CLUB_DESKSHOW || this.info.state == club.ClubConst.CLUB_CREATEDESK) {
                this.deskGroup.visible = true;
                this.personTxet.visible = false;
                this.state.visible = false;
                this.head.visible = false;
                this.gamesNumberText.visible = false;
            }
            else {
                this.deskGroup.visible = true;
                this.gamesNumberText.visible = false;
                var member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
                this.personTxet.text = member + "/" + this.info.userNbr;
                if (this.info.list && Array.isArray(this.info.list)) {
                    for (var i = 0; i < this.info.list.length; i++) {
                        /**只显示四位头像 */
                        if (i == 4) {
                            break;
                        }
                        this["headbg" + (i + 1)].source = this.info.list[i].headUrl;
                        this["headbg" + (i + 1)].visible = this.info.list[i].headUrl ? true : false;
                        this["kuang" + (i + 1)].visible = this.info.list[i].headUrl ? true : false;
                        if (this.info.list[i].state == 0) {
                            this["leave" + (i + 1)].visible = true;
                        }
                        else {
                            this["leave" + (i + 1)].visible = false;
                        }
                    }
                }
                if (!this.info.state) {
                    this.state.source = "club_new_menage_json.club_waiting";
                }
                else if (this.info.state == 1) {
                    this.state.source = "club_new_menage_json.club_ingame";
                    this.gamesNumberText.visible = true;
                    this.gamesNumberText.text = "第" + this.info.curGameNbr + "/" + this.info.gameNbr + "局";
                    if (this.info.gameNbr >= 49) {
                        this.gamesNumberText.text = "第" + this.info.curGameNbr + "课";
                    }
                }
            }
        };
        return ClubItemDesk;
    }(eui.ItemRenderer));
    club.ClubItemDesk = ClubItemDesk;
    __reflect(ClubItemDesk.prototype, "club.ClubItemDesk");
})(club || (club = {}));
var club;
(function (club) {
    /**俱乐部成员列表详情 */
    var ClubMemberInfoPanel = (function (_super) {
        __extends(ClubMemberInfoPanel, _super);
        function ClubMemberInfoPanel(parm) {
            var _this = _super.call(this) || this;
            /**当前页数 */
            _this._curPage = 0;
            /**记录当前数据记录的 日  */
            _this._dayChose = 0;
            /**清楚玩家指定输赢数据 */
            _this.day = ["今日", "昨日", "前日"];
            _this.skinName = "ClubMemberInfoSkin";
            _this._info = parm;
            return _this;
        }
        ClubMemberInfoPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubMemberInfoPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.MATCH_HISTORY_FOR_UID, this.showData, this);
            uniLib.Global.addEventListener(club.ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
            this._remarksText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubMemberInfoPanel.prototype.removeEvent = function () {
            this._remarksText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
            uniLib.Global.removeEventListener(club.ClubConst.MATCH_HISTORY_FOR_UID, this.showData, this);
            uniLib.Global.removeEventListener(club.ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        //初始化
        ClubMemberInfoPanel.prototype.initUI = function () {
            this._AllRecordArr = [];
            this._list.itemRenderer = ClubMemberInfoItemPanel;
            club.ClubSendMgr.getGameDataHistoryToUId(club.ClubData.getInstance().matchid, this._info.uid, 1, club.ClubConst1.MATCH_HISTORY_FOR_UID, 1);
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            this._clubDayChose = 1;
            this._choseDayBtn.currentState = "up";
        };
        /**输入框判断 */
        ClubMemberInfoPanel.prototype.onTextFieldFocusOut = function (event) {
            var cmd = new Cmd.RemarkNickNameMatchGroupCmd_CS();
            cmd.matchId = club.ClubData.getInstance().matchid;
            cmd.targetUid = this._info.uid;
            cmd.remark = event.target.text;
            NetMgr.tcpSend(cmd);
        };
        ClubMemberInfoPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._cleanBtn:
                    this.cleanWinPoint(this._clubDayChose);
                    break;
                case this._recordBtn:
                    var req = new Cmd.GetCleanRecordMatchGroupCmd_CS;
                    req.matchId = club.ClubData.getInstance().matchid;
                    req.targetUid = this._info.uid;
                    NetMgr.tcpSend(req);
                    break;
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._yesterdayBtn:
                    this._clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._qianBtn:
                    this._clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
            }
        };
        ClubMemberInfoPanel.prototype.cleanWinPoint = function (which) {
            var self = this;
            var okFunc = function () {
                var cmd = new Cmd.CleanMemberWinPointMatchGroupCmd_CS();
                cmd.matchId = club.ClubData.getInstance().matchid;
                cmd.targetUid = self._info.uid;
                cmd.which = which;
                NetMgr.tcpSend(cmd);
            };
            ComponentUtil.getInstance().showConfirm("确认要将" + this.day[which - 1] + "分数清零吗？\n清零后成员列表的" + this.day[which - 1] + "分数和大赢家次数也将清零！", "温馨提示", "确定", okFunc, "取消");
        };
        /**更新清楚数据*/
        ClubMemberInfoPanel.prototype.updateWinPoint = function (evt) {
            var vo = evt.param;
            this._memberinfo.scores[vo.which - 1] = 0;
            this._memberinfo.roomNbrs[vo.which - 1] = 0;
            this._memberinfo.winNums[vo.which - 1] = 0;
            this.updatePoint();
        };
        /**点每日输赢更新数据 */
        ClubMemberInfoPanel.prototype.updateView = function () {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
            this.updatePoint();
        };
        /**更新清楚数据视图*/
        ClubMemberInfoPanel.prototype.updatePoint = function () {
            this._scoreText.text = "战绩:" + this._memberinfo.scores[this._clubDayChose - 1];
            this._roomText.text = "房间数:" + this._memberinfo.roomNbrs[this._clubDayChose - 1];
            this._bigWinText.text = "大赢家次数:" + this._memberinfo.winNums[this._clubDayChose - 1];
        };
        /**接收数据 */
        ClubMemberInfoPanel.prototype.showData = function (evt) {
            var vo = evt.param;
            this._headImg.source = vo.userInfo.headurl;
            this._nameText.text = vo.userInfo.nickname;
            this._uidText.text = vo.userInfo.uid + "";
            this._remarksText.text = vo.userInfo.remark ? vo.userInfo.remark : "";
            if (vo.userInfo.partner) {
                this._belongText.text = "归属人：" + vo.userInfo.partner.nickname;
                this._belongText.visible = true;
            }
            else {
                this._belongText.visible = false;
            }
            if (vo.userStatisticInfo) {
                this._memberinfo = vo.userStatisticInfo;
                this.updatePoint();
            }
            if (vo.typ) {
                this.addListen();
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                this._totalPage = vo.maxPage;
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tishiText.visible = true;
                    if (this._dayChose != this._clubDayChose) {
                        this._dayChose = this._clubDayChose;
                        this._AllRecordArr = [];
                        if (this._listArr) {
                            if (Array.isArray(this._listArr.source)) {
                                this._listArr.removeAll();
                            }
                            this._listArr.replaceAll(this._AllRecordArr);
                        }
                    }
                }
                else {
                    this._tishiText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
        };
        /**添加数据*/
        ClubMemberInfoPanel.prototype.addData = function (arr) {
            if (!arr || !arr[0]) {
                return;
            }
            if (this._dayChose == this._clubDayChose) {
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            else {
                this._dayChose = this._clubDayChose;
                this._AllRecordArr = [];
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._AllRecordArr);
                this._list.dataProvider = this._listArr;
            }
            else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._AllRecordArr);
                if (this._curPage == 1) {
                    this._listArr.refresh();
                }
            }
        };
        /**单独加 */
        ClubMemberInfoPanel.prototype.addListen = function () {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        };
        /**获取战绩消息 */
        ClubMemberInfoPanel.prototype.getData = function () {
            if (this._clubDayChose == this._dayChose) {
                club.ClubSendMgr.getGameDataHistoryToUId(club.ClubData.getInstance().matchid, this._info.uid, this._curPage, club.ClubConst1.MATCH_HISTORY_FOR_UID, this._clubDayChose);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            }
            else {
                club.ClubSendMgr.getGameDataHistoryToUId(club.ClubData.getInstance().matchid, this._info.uid, 1, club.ClubConst1.MATCH_HISTORY_FOR_UID, this._clubDayChose);
            }
        };
        /**滑到底加载其他页数据 */
        ClubMemberInfoPanel.prototype.checkTop = function (evt) {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this); //2秒不返回继续可以请求
                }
            }
        };
        return ClubMemberInfoPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubMemberInfoPanel = ClubMemberInfoPanel;
    __reflect(ClubMemberInfoPanel.prototype, "club.ClubMemberInfoPanel");
    /**成员战绩 */
    var ClubMemberInfoItemPanel = (function (_super) {
        __extends(ClubMemberInfoItemPanel, _super);
        function ClubMemberInfoItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubMemberInfoItemSkin";
            return _this;
        }
        ClubMemberInfoItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._detailBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDetail, this);
        };
        ClubMemberInfoItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(this._info.timeStamp);
            this._roomTxt.text = "房间号：" + this._info.roomId + "\n" + this._info.gameName + " " + this._info.gameNbr + "局 " + this._info.userNbr + "人参与";
            this._gradeText.text = "" + this._info.userGameHistorys[0].integral;
        };
        /**查看详情 */
        ClubMemberInfoItemPanel.prototype.showDetail = function () {
            var _this = this;
            LobbyModuleMgr.getInstance().showRecordDetail(function () {
                club.ClubSendMgr.getGameDetailHistory(_this._info.globalRoomId);
            });
            MJLobbyData.getInstance().globalRoomId = this._info.globalRoomId;
        };
        return ClubMemberInfoItemPanel;
    }(eui.ItemRenderer));
    club.ClubMemberInfoItemPanel = ClubMemberInfoItemPanel;
    __reflect(ClubMemberInfoItemPanel.prototype, "club.ClubMemberInfoItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**搜索玩家的数据显示  */
    var ClubSearchMemberItemPanel = (function (_super) {
        __extends(ClubSearchMemberItemPanel, _super);
        function ClubSearchMemberItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubMemberItemSkin";
            return _this;
        }
        ClubSearchMemberItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubSearchMemberItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubSearchMemberItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubSearchMemberItemPanel.prototype.dataChanged = function () {
            this._searchBtn.visible = true;
            this._addBtn.visible = false;
            this.searchInfo = this.data;
            this._idText.text = this.searchInfo.uid + "";
            this._nameText.text = this.searchInfo.nickname;
            this._headImg.source = this.searchInfo.headUrl;
            if (this.searchInfo.membertype == 1) {
                this._searchBtn.currentState = "disabled";
                this._searchBtn.touchEnabled = false;
                this._searchBtn.skin["_typeText"].text = "圈主";
                this._searchBtn.skin["_typeText"].strokeColor = "0x434343";
            }
            else if (this.searchInfo.membertype == 2) {
                this._searchBtn.currentState = "disabled";
                this._searchBtn.touchEnabled = false;
                this._searchBtn.skin["_typeText"].text = "管理员";
                this._searchBtn.skin["_typeText"].strokeColor = "0x434343";
            }
        };
        ClubSearchMemberItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._searchBtn:
                    if (this.searchInfo.membertype != 1 && this.searchInfo.membertype != 2) {
                        club.ClubModuleMgr.getInstance().showClubUserInfoPanel(this.searchInfo);
                    }
                    break;
            }
        };
        return ClubSearchMemberItemPanel;
    }(eui.ItemRenderer));
    club.ClubSearchMemberItemPanel = ClubSearchMemberItemPanel;
    __reflect(ClubSearchMemberItemPanel.prototype, "club.ClubSearchMemberItemPanel");
    /**手动添加玩家的数据显示  */
    var ClubAddMemberItemPanel = (function (_super) {
        __extends(ClubAddMemberItemPanel, _super);
        function ClubAddMemberItemPanel() {
            var _this = _super.call(this) || this;
            /** 搜索出来的结果 */
            _this.search = false;
            _this.skinName = "ClubMemberItemSkin";
            return _this;
        }
        ClubAddMemberItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubAddMemberItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAddMemberItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAddMemberItemPanel.prototype.dataChanged = function () {
            var _this = this;
            this._searchBtn.visible = false;
            this._addBtn.visible = true;
            this.addInfo = this.data;
            this._idText.text = this.addInfo.userInfo.uid + "";
            this._nameText.text = this.addInfo.userInfo.nickName;
            var ClubMemberList = club.ClubData.getInstance().ClubMemberMiniList;
            if (!Array.isArray(ClubMemberList))
                return;
            ClubMemberList.forEach(function (element) {
                if (element.uid == _this.addInfo.userInfo.uid) {
                    _this.search = true;
                }
            });
            if (this.search) {
                this._tishiText.visible = true;
                this._addBtn.visible = false;
            }
        };
        ClubAddMemberItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._addBtn:
                    var cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                    cmd.reply = 2;
                    cmd.uid = this.addInfo.userInfo.uid;
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    NetMgr.tcpSend(cmd);
                    this._tishiText.visible = true;
                    this._addBtn.visible = false;
                    break;
            }
        };
        return ClubAddMemberItemPanel;
    }(eui.ItemRenderer));
    club.ClubAddMemberItemPanel = ClubAddMemberItemPanel;
    __reflect(ClubAddMemberItemPanel.prototype, "club.ClubAddMemberItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友圈 成员战绩item  */
    var ClubMemberRecordItemPanel = (function (_super) {
        __extends(ClubMemberRecordItemPanel, _super);
        function ClubMemberRecordItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubMemberRecordItemSkin";
            return _this;
        }
        ClubMemberRecordItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubMemberRecordItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubMemberRecordItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubMemberRecordItemPanel.prototype.destory = function () {
            this.removeListener();
        };
        ClubMemberRecordItemPanel.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._detailBtn:
                    LobbyModuleMgr.getInstance().showRecordDetail(function () {
                        club.ClubSendMgr.getGameDetailHistory(_this.info.globalRoomId);
                    });
                    MJLobbyData.getInstance().globalRoomId = this.info.globalRoomId;
                    break;
                case this._copyBtn:
                    MsgSendMgr.getGetNewShareInfo(this.info.globalRoomId);
            }
        };
        ClubMemberRecordItemPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this._indexText.text = this.itemIndex + 1 + "";
            this._timeText.text = LobbyUtils.changeTimeToStr(this.info.timeStamp);
            this._roomText.text = this.info.roomId + "号房间";
            if (this.info.gameId) {
                if (MJLobbyData.getInstance().getGameCreateConfig(this.info.gameId))
                    this._gameNameText.text = MJLobbyData.getInstance().getGameCreateConfig(this.info.gameId)["gameName"];
                else
                    this._gameNameText.text = "";
            }
            var name = this.info.userGameHistorys[0].nickName;
            var strLength;
            var wei;
            if (this.getStrRealLength(name) > 10) {
                wei = "...";
            }
            else {
                wei = "";
                ;
            }
            while (this.getStrRealLength(name) > 10) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            var item = this.info.userGameHistorys;
            this.nameandscore.itemRenderer = MemberRecordItemNSPanel;
            this.nameandscore.dataProvider = new eui.ArrayCollection(item);
        };
        /**限制昵称长度 */
        ClubMemberRecordItemPanel.prototype.getStrRealLength = function (str) {
            var jmz = { GetLength: null };
            jmz.GetLength = function (str) {
                return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length); //先把中文替换成两个字节的英文，再计算长度
            };
            return jmz.GetLength(str);
        };
        return ClubMemberRecordItemPanel;
    }(eui.ItemRenderer));
    club.ClubMemberRecordItemPanel = ClubMemberRecordItemPanel;
    __reflect(ClubMemberRecordItemPanel.prototype, "club.ClubMemberRecordItemPanel");
    /**玩家战绩单个信息 */
    var MemberRecordItemNSPanel = (function (_super) {
        __extends(MemberRecordItemNSPanel, _super);
        function MemberRecordItemNSPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchFightingNSSkin";
            return _this;
        }
        MemberRecordItemNSPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this.names.text = this.info.nickName;
            if (this.info.integral != null) {
                this.score.text = this.info.integral + "";
                if (this.info.integral < 0) {
                    this.score.textColor = 0x0c7113;
                }
            }
        };
        return MemberRecordItemNSPanel;
    }(eui.ItemRenderer));
    club.MemberRecordItemNSPanel = MemberRecordItemNSPanel;
    __reflect(MemberRecordItemNSPanel.prototype, "club.MemberRecordItemNSPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友圈 成员自己看自己战绩  */
    var ClubMemberRecordPanel = (function (_super) {
        __extends(ClubMemberRecordPanel, _super);
        function ClubMemberRecordPanel() {
            var _this = _super.call(this) || this;
            /**当前页数 */
            _this._curPage = 0;
            /**记录当前数据记录的 日  */
            _this._dayChose = 0;
            _this.skinName = "ClubMemberRecordSkin";
            return _this;
        }
        ClubMemberRecordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**事件监听 */
        ClubMemberRecordPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.MATCH_HISTORY_FOR_MYSELF, this.setDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubMemberRecordPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.MATCH_HISTORY_FOR_MYSELF, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        //初始化
        ClubMemberRecordPanel.prototype.initUI = function () {
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            this._clubDayChose = 1;
            this._AllRecordArr = [];
            this._recordsList.itemRenderer = club.ClubMemberRecordItemPanel;
            this.addListen();
            this._choseDayBtn.currentState = "up";
        };
        /**传数据 */
        ClubMemberRecordPanel.prototype.setDate = function (evt) {
            this._data = evt.param;
            this._matchId = this._data.matchId;
            this._totalPage = this._data.maxPage;
            this._curPage = this._data.curPage;
            if (this._data.curPage == 1 && !this._data.gameHistroys[0]) {
                this._tipsText.visible = true;
                if (this._dayChose != this._clubDayChose) {
                    this._dayChose = this._clubDayChose;
                    this._AllRecordArr = [];
                    if (this._recordslistArr) {
                        if (Array.isArray(this._recordslistArr.source)) {
                            this._recordslistArr.removeAll();
                        }
                        this._recordslistArr.replaceAll(this._AllRecordArr);
                    }
                }
            }
            else {
                this._tipsText.visible = false;
                this.addData(this._data.gameHistroys);
            }
            this.updatePoint();
        };
        /**添加数据*/
        ClubMemberRecordPanel.prototype.addData = function (arr) {
            if (!arr || !arr[0]) {
                return;
            }
            if (this._dayChose == this._clubDayChose) {
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            else {
                this._dayChose = this._clubDayChose;
                this._AllRecordArr = [];
                this._AllRecordArr = this._AllRecordArr.concat(arr);
            }
            if (!this._recordslistArr) {
                this._recordslistArr = new eui.ArrayCollection(this._AllRecordArr);
                this._recordsList.dataProvider = this._recordslistArr;
            }
            else {
                if (Array.isArray(this._recordslistArr.source)) {
                    this._recordslistArr.removeAll();
                }
                this._recordslistArr.replaceAll(this._AllRecordArr);
                if (this._curPage == 1) {
                    this._recordslistArr.refresh();
                }
            }
        };
        /**获取战绩消息 */
        ClubMemberRecordPanel.prototype.getData = function () {
            if (this._clubDayChose == this._dayChose) {
                club.ClubSendMgr.getGameDataHistoryForMatch(this._matchId, this._curPage, this._clubDayChose, club.ClubConst1.MATCH_HISTORY_FOR_MYSELF);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            }
            else {
                club.ClubSendMgr.getGameDataHistoryForMatch(this._matchId, 1, this._clubDayChose, club.ClubConst1.MATCH_HISTORY_FOR_MYSELF);
            }
        };
        /**单独加 */
        ClubMemberRecordPanel.prototype.addListen = function () {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        };
        /**滑到底加载其他页数据 */
        ClubMemberRecordPanel.prototype.checkTop = function (evt) {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this); //2秒不返回继续可以请求
                }
            }
        };
        /**点每日输赢更新数据 */
        ClubMemberRecordPanel.prototype.updateView = function () {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
            this.updatePoint();
        };
        /**更新视图 */
        ClubMemberRecordPanel.prototype.updatePoint = function () {
            if (this._data.userStatisticInfo) {
                this._roomText.text = "" + this._data.userStatisticInfo.roomNbrs[this._clubDayChose - 1];
                this._bigWinText.text = "" + this._data.userStatisticInfo.winNums[this._clubDayChose - 1];
                this._sorceText.text = "" + this._data.userStatisticInfo.scores[this._clubDayChose - 1];
            }
            else {
                this._roomText.text = "0";
                this._bigWinText.text = "0";
                this._sorceText.text = "0";
            }
        };
        ClubMemberRecordPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._yesterdayBtn:
                    this._clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._qianBtn:
                    this._clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateView();
                    break;
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
                case this._lookRecordBtn:
                    LobbyModuleMgr.getInstance().showLookVideoPanel();
                    break;
            }
        };
        ClubMemberRecordPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        return ClubMemberRecordPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubMemberRecordPanel = ClubMemberRecordPanel;
    __reflect(ClubMemberRecordPanel.prototype, "club.ClubMemberRecordPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**俱乐部跑马灯 */
    var ClubMsgMcPanel = (function (_super) {
        __extends(ClubMsgMcPanel, _super);
        function ClubMsgMcPanel() {
            var _this = _super.call(this) || this;
            _this._noticeArr = [];
            _this.skinName = "ClubMsgMcSkin";
            return _this;
        }
        ClubMsgMcPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubMsgMcPanel.prototype.addEvent = function () {
        };
        ClubMsgMcPanel.prototype.removeEvent = function () {
        };
        ClubMsgMcPanel.prototype.initUI = function () {
            this._buffer = 30;
            this.touchEnabled = false;
            this._msgContain = new egret.DisplayObjectContainer();
            this._msgContain.x = 140;
            this._msgContain.y = 7;
            this.addChild(this._msgContain);
            this._msgContain.scrollRect = new egret.Rectangle(0, 0, 400, 30);
            this._noticePanel = new egret.DisplayObjectContainer();
            this._msgContain.addChild(this._noticePanel);
            this._msgTxt = this.createTextFeild();
            this._noticePanel.addChild(this._msgTxt);
            this._noticeArr = [];
            this.visible = false;
            /********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
            var self = this;
            setTimeout(function () {
                self.noticeTest();
            }, 200);
        };
        ClubMsgMcPanel.prototype.setLoop = function (value) {
            this._loop = value;
        };
        ClubMsgMcPanel.prototype.noticeTest = function () {
            if (!this._msgTxt) {
                return;
            }
            this.startScroll();
        };
        ClubMsgMcPanel.prototype.startScroll = function () {
            this.visible = true;
            egret.Tween.removeTweens(this._noticePanel);
            this._noticePanel.x = 500 + this._buffer;
            var w = this._noticePanel.width < 500 ? 500 : this._noticePanel.width;
            egret.Tween.get(this._noticePanel).to({ x: -(this._noticePanel.width + this._buffer) }, 10 * (w + this._buffer)).call(this.noticeTest, this);
        };
        ClubMsgMcPanel.prototype.scrollEnd = function () {
            egret.Tween.removeTweens(this._noticePanel);
            this.visible = false;
        };
        ClubMsgMcPanel.prototype.getclubmsg = function (data) {
            this._msgTxt.text = data;
        };
        ClubMsgMcPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.scrollEnd();
        };
        ClubMsgMcPanel.prototype.createTextFeild = function () {
            var tf = new egret.TextField();
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xf8e6c0;
            tf.textAlign = egret.HorizontalAlign.LEFT;
            tf.size = 25;
            tf.multiline = false;
            tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            return tf;
        };
        return ClubMsgMcPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubMsgMcPanel = ClubMsgMcPanel;
    __reflect(ClubMsgMcPanel.prototype, "club.ClubMsgMcPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 老友圈公告界面
     */
    var ClubNoticePanel = (function (_super) {
        __extends(ClubNoticePanel, _super);
        function ClubNoticePanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubNoticeSkin";
            return _this;
        }
        ClubNoticePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**事件监听 */
        ClubNoticePanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.CLUB_NOTICE, this.showNotice, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.noticeTxt.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        ClubNoticePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(club.ClubConst.CLUB_NOTICE, this.showNotice, this);
            this.noticeTxt.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        ClubNoticePanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        ClubNoticePanel.prototype.showNotice = function (evt) {
            var data = evt.param;
            if (data.content) {
                this.noticeTxt.text = data.content;
                this.notice.text = data.content;
            }
            else {
                this.noticeTxt.text = "";
                this.notice.text = "暂无公告";
            }
            if (data.bUpdate == 1) {
                this.noticeTxt.visible = true;
                this.notice.visible = false;
            }
            else {
                this.noticeTxt.visible = false;
                this.notice.visible = true;
            }
            this._bUpdate = data.bUpdate;
            this._matchid = data.matchId;
        };
        ClubNoticePanel.prototype.onClick = function (evt) {
            if (evt.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
            else if (evt.target == this.modifyBtn) {
                if (this._bUpdate == 1) {
                    var cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                    cmd.matchId = this._matchid;
                    cmd.content = this.noticeTxt.text;
                    NetMgr.tcpSend(cmd);
                }
                _super.prototype.removePop.call(this);
            }
        };
        return ClubNoticePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubNoticePanel = ClubNoticePanel;
    __reflect(ClubNoticePanel.prototype, "club.ClubNoticePanel");
})(club || (club = {}));
var club;
(function (club) {
    var ClubData = (function () {
        function ClubData() {
            /**老友圈管理操作 定时器暂停时间 */
            this.suspendTimer = 0;
            /**老友圈管理操作  定时器恢复时间 */
            this.renewTimer = 0;
            /**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
            this.clubDayChose = 1;
            /**老友圈管理操作 当前的老友圈桌面是否为房主 */
            this.isClubOwner = false;
            /**默认服务器刷新俱乐部数据  1为5秒前端发送请求数据 */
            this.clubRefresh = 0;
            /**俱乐部风格 默认漳州风格 */
            this.clubStyle = CLUBSTYLE.ZHANGZHOU;
            /** 老友圈 邀请老友圈成员的房间ID 如果有存*/
            this.InviteRoomId = 0;
            /**老友圈管理操作 当前的老友圈桌面是否为房主 或者管理员 */
            this.isClubManage = false;
            /**导入成员列表 选中的matchid */
            this.ClubImportMatchId = 0;
            /** 导入成员列表选中的UID */
            this.PartnerImportUidList = [];
            /** 合伙人 默认返回的matchid*/
            this.PartnerMatchId = 0;
        }
        ClubData.getInstance = function () {
            if (!this._instance) {
                this._instance = new ClubData();
            }
            return this._instance;
        };
        return ClubData;
    }());
    club.ClubData = ClubData;
    __reflect(ClubData.prototype, "club.ClubData");
    var CLUBSTYLE;
    (function (CLUBSTYLE) {
        CLUBSTYLE[CLUBSTYLE["ZHANGZHOU"] = 0] = "ZHANGZHOU";
        CLUBSTYLE[CLUBSTYLE["GUANGDONG"] = 1] = "GUANGDONG";
    })(CLUBSTYLE = club.CLUBSTYLE || (club.CLUBSTYLE = {}));
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 老友圈成员列表界面
     */
    var ClubPlayerListPanel = (function (_super) {
        __extends(ClubPlayerListPanel, _super);
        function ClubPlayerListPanel(isOwner) {
            var _this = _super.call(this) || this;
            /**所有玩家列表 */
            _this._list = [];
            /**在线玩家列表 */
            _this._onlinelist = [];
            _this.skinName = "ClubPlayerListSkin";
            _this.isOwner = isOwner;
            return _this;
        }
        ClubPlayerListPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubPlayerListPanel.prototype.initUI = function () {
            if (this.isOwner) {
                this._managerGroup.visible = true;
            }
            else {
                this._managerGroup.visible = false;
            }
            club.ClubData.getInstance().clubDeleteUser = false;
            this.allList.itemRenderer = club.ClubPlayerListHeadPanel;
            this.onlineList.itemRenderer = club.ClubPlayerListHeadPanel;
            this._kickBtn.currentState = "up";
            this.OnOpen();
            this.allUserButton.selected = true;
            this.onlineScroller.visible = false;
        };
        ClubPlayerListPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.allList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.onlineList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubPlayerListPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(club.ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.allList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.onlineList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubPlayerListPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        /**设置按钮开关 */
        ClubPlayerListPanel.prototype.OnOpen = function () {
            this._UserGroup.x = -622;
            this._managerGroup.x = 1280;
            egret.Tween.get(this._managerGroup).to({ x: 984 }, 300);
            egret.Tween.get(this._UserGroup).to({ x: 0 }, 300);
        };
        ClubPlayerListPanel.prototype.OnClose = function () {
            var _this = this;
            egret.Tween.get(this._managerGroup).to({ x: 1280 }, 300);
            egret.Tween.get(this._UserGroup).to({ x: -622 }, 300).call(function () {
                return _super.prototype.removePop.call(_this);
            });
        };
        ClubPlayerListPanel.prototype.showList = function (evt) {
            var _this = this;
            var member = evt.param;
            this._list = member.whitelist;
            this.allUserButton.skin["alluserText"].text = "全部(" + this._list.length + ")";
            var onlineNum = 0;
            this._onlinelist = [];
            this._list.forEach(function (element) {
                if (element.state == 1) {
                    onlineNum++;
                    _this._onlinelist.push(element);
                }
            });
            this.onlineUserButton.skin["onlineText"].text = "在线(" + onlineNum + ")";
            if (Array.isArray(this._list)) {
                this.updateAllList();
            }
            if (Array.isArray(this._onlinelist)) {
                this.updateOnlineList();
            }
            if (this.onlineScroller.visible == true) {
                this.onlineUserButton.selected = true;
            }
        };
        ClubPlayerListPanel.prototype.itemTap = function (evt) {
            if (club.ClubData.getInstance().clubDeleteUser) {
                if (this.allList.selectedItem) {
                    var item = this.allList.selectedItem;
                    if (item.membertype != 1 && item.membertype != 2) {
                        club.ClubModuleMgr.getInstance().showClubUserInfoPanel(item);
                    }
                }
                else if (this.onlineList.selectedItem) {
                    var item = this.onlineList.selectedItem;
                    if (item.membertype != 1 && item.membertype != 2) {
                        club.ClubModuleMgr.getInstance().showClubUserInfoPanel(item);
                    }
                }
            }
        };
        /** 更新所有玩家数据*/
        ClubPlayerListPanel.prototype.updateAllList = function () {
            if (!this._allListArr) {
                this._allListArr = new eui.ArrayCollection(this._list);
                this.allList.dataProvider = this._allListArr;
            }
            else {
                if (Array.isArray(this._allListArr.source)) {
                    this._allListArr.removeAll();
                }
                this._allListArr.replaceAll(this._list);
            }
        };
        /** 更新在线数据*/
        ClubPlayerListPanel.prototype.updateOnlineList = function () {
            if (!this._onlineListArr) {
                this._onlineListArr = new eui.ArrayCollection(this._onlinelist);
                this.onlineList.dataProvider = this._onlineListArr;
            }
            else {
                if (Array.isArray(this._onlineListArr.source)) {
                    this._onlineListArr.removeAll();
                }
                this._onlineListArr.replaceAll(this._onlinelist);
            }
        };
        ClubPlayerListPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._rect:
                case this.closeBtn:
                    this.OnClose();
                    break;
                case this.allUserButton:
                    this.onlineScroller.visible = false;
                    this.allScroller.visible = true;
                    break;
                case this.onlineUserButton:
                    this.onlineScroller.visible = true;
                    this.allScroller.visible = false;
                    break;
                case this._addBtn:
                    club.ClubModuleMgr.getInstance().showClubAddMemberPanel();
                    break;
                case this._applyBtn:
                    club.ClubModuleMgr.getInstance().showClubUserApplyPanel();
                    break;
                case this._kickBtn:
                    if (this._kickBtn.currentState == "up") {
                        this._kickBtn.currentState = "down";
                        club.ClubData.getInstance().clubDeleteUser = true;
                    }
                    else {
                        this._kickBtn.currentState = "up";
                        club.ClubData.getInstance().clubDeleteUser = false;
                    }
                    this.updateAllList();
                    this.updateOnlineList();
                    break;
                case this._searchBtn:
                    club.ClubModuleMgr.getInstance().showClubSearchMemberPanel();
                    break;
            }
        };
        return ClubPlayerListPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPlayerListPanel = ClubPlayerListPanel;
    __reflect(ClubPlayerListPanel.prototype, "club.ClubPlayerListPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**老友圈备注分数页面 */
    var ClubRemarksScorePanel = (function (_super) {
        __extends(ClubRemarksScorePanel, _super);
        function ClubRemarksScorePanel(uid) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubRemarksScoreSkin";
            _this._uid = uid;
            return _this;
        }
        ClubRemarksScorePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubRemarksScorePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        ClubRemarksScorePanel.prototype.removeEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        ClubRemarksScorePanel.prototype.initUI = function () {
            this._curNumStr = "";
            this._symbol = "";
        };
        ClubRemarksScorePanel.prototype.btnClick = function (evt) {
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._deleteBtn:
                    this._curNumStr = this._curNumStr.trim();
                    this._curNumStr = this._curNumStr.slice(0, this._curNumStr.length - 1);
                    if (this._curNumStr.length == 0) {
                        this._symbol = "";
                    }
                    this._inputText.text = this._symbol + this._curNumStr;
                    break;
                case this._sureBtn:
                    this.changeRemarks();
                    _super.prototype.removePop.call(this);
                    break;
                case this._num0:
                    this.changeTxt("0");
                    break;
                case this._num1:
                    this.changeTxt("1");
                    break;
                case this._num2:
                    this.changeTxt("2");
                    break;
                case this._num3:
                    this.changeTxt("3");
                    break;
                case this._num4:
                    this.changeTxt("4");
                    break;
                case this._num5:
                    this.changeTxt("5");
                    break;
                case this._num6:
                    this.changeTxt("6");
                    break;
                case this._num7:
                    this.changeTxt("7");
                    break;
                case this._num8:
                    this.changeTxt("8");
                    break;
                case this._num9:
                    this.changeTxt("9");
                    break;
                case this._addBtn:
                    this.changeTxt("+");
                    break;
                case this._reduceBtn:
                    this.changeTxt("-");
                    break;
            }
        };
        ClubRemarksScorePanel.prototype.changeTxt = function (num) {
            this._curNumStr = this._curNumStr.trim();
            if (num == "-" || num == "+") {
                this._symbol = num;
            }
            else {
                if (num != "0" || this._curNumStr.length != 0) {
                    this._curNumStr += num;
                }
            }
            if (this._curNumStr.trim().length >= 4) {
                this._curNumStr = this._curNumStr.slice(0, this._curNumStr.length - 1);
            }
            this._inputText.text = this._symbol + this._curNumStr;
        };
        /**更改分数 */
        ClubRemarksScorePanel.prototype.changeRemarks = function () {
            club.ClubSendMgr.RemarkPointMatchGroupCmd(club.ClubData.getInstance().matchid, this._uid, 1, Number(this._inputText.text), club.ClubData.getInstance().clubDayChose - 1);
        };
        return ClubRemarksScorePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubRemarksScorePanel = ClubRemarksScorePanel;
    __reflect(ClubRemarksScorePanel.prototype, "club.ClubRemarksScorePanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 单个房间详情
     */
    var ClubRoomdetails = (function (_super) {
        __extends(ClubRoomdetails, _super);
        function ClubRoomdetails() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubRoomdetailsSkin";
            return _this;
        }
        ClubRoomdetails.prototype.initUI = function () {
        };
        ClubRoomdetails.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubRoomdetails.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubRoomdetails.prototype.setDate = function (date) {
            if (!date)
                return;
            this.info = date;
            this._timeText.text = "";
            this._deskIdText.text = "";
        };
        ClubRoomdetails.prototype.setUserDate = function (userDate) {
            if (!userDate)
                return;
            this.roomInfo = userDate;
            this._inviteBtn.visible = false;
            this._enterRoomBtn.x = 430;
            var timestamp = new Date().getTime();
            // if (this.roomInfo.beginTime) {
            //     this._timeText.text = "开房时间:" + LobbyUtils.changeTimeToStr(timestamp);
            // }
            if (this.roomInfo.roomId) {
                this._deskIdText.text = "桌号:" + this.roomInfo.roomId;
                this._timeText.text = "当前时间:" + LobbyUtils.changeTimeToStr(timestamp);
            }
            var list = [];
            if (club.ClubData.getInstance().isClubManage) {
                this._inviteBtn.visible = true;
                this._enterRoomBtn.x = 600;
            }
            if (Array.isArray(userDate.list)) {
                list = this.roomInfo.list.concat();
            }
            if (this.roomInfo.state == 1) {
                this._enterRoomBtn.visible = false;
                this._inviteBtn.visible = false;
                // this._timeText.text = "开局时间:" + LobbyUtils.changeTimeToStr(this.roomInfo.beginTime);
            }
            else {
                var listlength = list.length;
                for (var i = 0; i < this.roomInfo.userNbr - listlength; i++) {
                    var user = new Cmd.MatchGroupMemberInfo();
                    user.state = club.ClubConst.DESK_NOUSER;
                    list.push(user);
                }
            }
            this._userList.itemRenderer = club.ClubRoomdetailshead;
            this._userList.dataProvider = new eui.ArrayCollection(list);
            this.roomInfo.beginTime;
        };
        ClubRoomdetails.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._enterRoomBtn:
                    this.dispatchEventWith(ClubUIEventConst.JOIN_CLUBROOM);
                    var req = new Cmd.EnterRoomCmd_C;
                    if (this.roomInfo.roomId) {
                        req.preBestRoomId = this.roomInfo.roomId;
                    }
                    else {
                        req.preBestRoomId = 0;
                    }
                    req.roomId = this.info.matchId;
                    NetMgr.tcpSend(req);
                    _super.prototype.removePop.call(this);
                    break;
                case this._inviteBtn:
                    if (this.roomInfo.roomId) {
                        club.ClubModuleMgr.getInstance().showClubInvitePanel(this.roomInfo.roomId);
                    }
                    else {
                        club.ClubModuleMgr.getInstance().showClubInvitePanel();
                    }
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        return ClubRoomdetails;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubRoomdetails = ClubRoomdetails;
    __reflect(ClubRoomdetails.prototype, "club.ClubRoomdetails");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 单个房间详情 玩家头像
     */
    var ClubRoomdetailshead = (function (_super) {
        __extends(ClubRoomdetailshead, _super);
        function ClubRoomdetailshead() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubRoomdetailsheadSkin";
            return _this;
        }
        ClubRoomdetailshead.prototype.dataChanged = function () {
            this.info = this.data;
            if (this.info.state == club.ClubConst.DESK_NOUSER) {
                this._idText.text = "";
                this._nameText.text = "";
                this._typeImg.source = "club_new_menage_json.club_deskitem_free";
                this._timeText.text = "";
            }
            else {
                this._headImg.source = this.info.headUrl;
                this._idText.text = "ID:" + this.info.uid;
                this._nameText.text = this.info.nickname;
                if (this.info.state == 0) {
                    this._typeImg.source = "club_new_menage_json.club_deskitem_leave2";
                }
                else {
                    this._typeImg.source = "club_new_menage_json.club_deskitem_online";
                }
                this._timeText.text = "进入时间:" + LobbyUtils.changeTimeToStrDay(this.info.time);
            }
        };
        return ClubRoomdetailshead;
    }(eui.ItemRenderer));
    club.ClubRoomdetailshead = ClubRoomdetailshead;
    __reflect(ClubRoomdetailshead.prototype, "club.ClubRoomdetailshead");
})(club || (club = {}));
var club;
(function (club) {
    /**老友圈搜索该俱乐部玩家 */
    var ClubSearchMemberPanel = (function (_super) {
        __extends(ClubSearchMemberPanel, _super);
        function ClubSearchMemberPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubSearchMemberSkin";
            return _this;
        }
        ClubSearchMemberPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubSearchMemberPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(club.ClubConst.MemberInfoMatchGroup, this.showList, this);
        };
        ClubSearchMemberPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(club.ClubConst.MemberInfoMatchGroup, this.showList, this);
        };
        ClubSearchMemberPanel.prototype.initUI = function () {
            this._menberList.itemRenderer = club.ClubSearchMemberItemPanel;
        };
        /**更新搜索数据 */
        ClubSearchMemberPanel.prototype.showList = function (evt) {
            this.searchMember(this._searchEditableText.text);
        };
        ClubSearchMemberPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._searchBtn:
                    this.searchMember(this._searchEditableText.text);
                    break;
            }
        };
        /**搜索数据 */
        ClubSearchMemberPanel.prototype.searchMember = function (value) {
            var ClubMemberList = club.ClubData.getInstance().ClubMemberMiniList;
            if (!Array.isArray(ClubMemberList))
                return;
            this.searchArray = [];
            if (value != "") {
                this.searchArray = ClubMemberList.filter(function (a) {
                    return a.nickname.toString().indexOf(value) != -1 || a.uid.toString().indexOf(value) != -1;
                });
            }
            this.setdata(this.searchArray);
        };
        /**更新数据*/
        ClubSearchMemberPanel.prototype.setdata = function (list) {
            if (list.length == 0) {
                this._tishiText.visible = true;
            }
            else {
                this._tishiText.visible = false;
            }
            if (!this._menberListArray) {
                this._menberListArray = new eui.ArrayCollection(list);
                this._menberList.dataProvider = this._menberListArray;
            }
            else {
                if (Array.isArray(this._menberListArray.source)) {
                    this._menberListArray.removeAll();
                }
                this._menberListArray.replaceAll(list);
            }
        };
        return ClubSearchMemberPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubSearchMemberPanel = ClubSearchMemberPanel;
    __reflect(ClubSearchMemberPanel.prototype, "club.ClubSearchMemberPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 查看玩家个人信息面板
     */
    var ClubUserInfoPanel = (function (_super) {
        __extends(ClubUserInfoPanel, _super);
        function ClubUserInfoPanel(Data) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubUserInfoSkin";
            _this.info = Data;
            return _this;
        }
        ClubUserInfoPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubUserInfoPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubUserInfoPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubUserInfoPanel.prototype.initUI = function () {
            this.headImg.source = this.info.headUrl;
            this.nameTxt.text = this.info.nickname;
            this.idTxt.text = "ID：" + this.info.uid;
        };
        ClubUserInfoPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._kickBtn:
                    var cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                    cmd.reply = 0;
                    cmd.uid = this.info.uid;
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    NetMgr.tcpSend(cmd);
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        return ClubUserInfoPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubUserInfoPanel = ClubUserInfoPanel;
    __reflect(ClubUserInfoPanel.prototype, "club.ClubUserInfoPanel");
})(club || (club = {}));
var club;
(function (club) {
    var CreateMatchSetPanel = (function (_super) {
        __extends(CreateMatchSetPanel, _super);
        function CreateMatchSetPanel(data) {
            var _this = _super.call(this) || this;
            _this.skinName = "CreateMatchSetSkin";
            _this._data = data;
            return _this;
        }
        CreateMatchSetPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        CreateMatchSetPanel.prototype.initUI = function () {
            if (this._data instanceof Cmd.CreateRoomCmd_C) {
                this._req = this._data;
                this._state = 1;
            }
            else {
                this._clubmss = this._data;
                this._req = this._data.createRoom;
                this._changeMatchId = this._data.matchId;
                this._state = 2;
            }
            this.setCreatReq(this._req);
            if (MJLobbyData.getInstance().lobbyConfig["clubPower"] == 1) {
                this._permissionCheck.selected = true;
                this._checkType = true;
            }
            if (this._state == 2) {
                this._sureSetBtn.visible = true;
                this._creatBtn.visible = false;
                this.showMatchData(this._clubmss);
            }
            else {
                this._sureSetBtn.visible = false;
                this._creatBtn.visible = true;
            }
        };
        CreateMatchSetPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        CreateMatchSetPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        /** 修改玩法显示已有数据*/
        CreateMatchSetPanel.prototype.showMatchData = function (data) {
            if (data == null)
                return;
            if (data.otherManagerId != null) {
                if (data.otherManagerId == uniLib.UserInfo.uid) {
                    uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
                    this._userIdInput.text = "";
                }
                else {
                    this._userIdInput.text = data.otherManagerId + "";
                }
            }
            else {
                this._userIdInput.text = "";
            }
            if (data.otherManagerId2 != null) {
                if (data.otherManagerId2 == uniLib.UserInfo.uid) {
                    uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
                    this._user2IdInput.text = "";
                }
                else {
                    this._user2IdInput.text = data.otherManagerId2 + "";
                }
            }
            else {
                this._user2IdInput.text = "";
            }
            if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4275 || this._gameId == 4035 || this._gameId == 4123) {
                this._bigWinInput.text = data.winnerConditions != null ? data.winnerConditions + "" : "";
            }
            this._clubNameInput.text = data.matchName != null ? data.matchName : "";
            this._permissionCheck.selected = data.needAgree != null && data.needAgree == 1 ? true : false;
            this._checkType = this._permissionCheck.selected;
            this._cleanRcordCheck.selected = data.masterClearRecord != null && data.masterClearRecord == 1 ? true : false;
            this._cleancheckType = this._cleanRcordCheck.selected;
        };
        CreateMatchSetPanel.prototype.onClickTap = function (e) {
            if (e.target == this._modifyBtn) {
                this.modifyPlay();
            }
            else if (e.target == this._creatBtn) {
                this.createMatchReq();
            }
            else if (e.target == this._sureSetBtn) {
                this.settingHandel();
            }
            else if (e.target == this._permissionCheck || e.target == this._permissionLabel) {
                this._checkType = this._permissionCheck.selected = !this._checkType;
            }
            else if (e.target == this._cleanRcordCheck || e.target == this._cleanRcordLabel) {
                this._cleancheckType = this._cleanRcordCheck.selected = !this._cleancheckType;
            }
            else if (e.target == this._tipsBtn) {
                // ComponentUtil.getInstance().showConfirm("大赢家最低分数设置为0时，只要最高的分数就是大赢家，设置非0时，最高分大于等于设置的分数才算大赢家。", "大赢家分数说明", "确定", null);
                uniLib.TipsUtils.showConfirm("大赢家最低分数设置为0时，只要最高的分数就是大赢家，设置非0时，最高分大于等于设置的分数才算大赢家。", "大赢家分数说明", "确定", null);
            }
        };
        // 修改玩法按钮 1 返回全创建列表  2 显示单独修改的创建列表 
        CreateMatchSetPanel.prototype.modifyPlay = function () {
            if (this._state == 1) {
                uniLib.PopUpMgr.removePopUp(this);
                club.ClubModuleMgr.getInstance().showCreateClubPanel();
            }
            else {
                uniLib.PopUpMgr.removePopUp(this);
                club.ClubModuleMgr.getInstance().showCreateClubPanel(this._clubmss);
            }
        };
        //创建俱乐部按钮
        CreateMatchSetPanel.prototype.createMatchReq = function () {
            var req = new Cmd.CreateMatchGroupCmd_C();
            if (this._req) {
                req.createRoom = this._req;
                req.isClub = 1;
            }
            req.needAgree = this._permissionCheck.selected ? 1 : 0;
            req.masterClearRecord = this._cleanRcordCheck.selected ? 1 : 0;
            if (this._clubNameInput) {
                req.matchName = this._clubNameInput.text;
            }
            if (this._userIdInput) {
                var m1 = (Number)(this._userIdInput.text);
                if (m1 != uniLib.UserInfo.uid) {
                    req.otherManagerId = m1;
                }
                else if (m1 == uniLib.UserInfo.uid) {
                    uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
                    req.otherManagerId = 0;
                }
                else {
                    req.otherManagerId = 0;
                }
            }
            if (this._user2IdInput) {
                var m2 = (Number)(this._user2IdInput.text);
                if (m2 != uniLib.UserInfo.uid) {
                    req.otherManagerId2 = m2;
                }
                else if (m2 == uniLib.UserInfo.uid) {
                    uniLib.TipsUtils.showTipsDownToUp("不能设置自己为副房主");
                    req.otherManagerId2 = 0;
                }
                else {
                    req.otherManagerId2 = 0;
                }
            }
            if (this._bigWinInput) {
                if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4035 || this._gameId == 4275 || this._gameId == 4123) {
                    req.winnerConditions = (Number)(this._bigWinInput.text);
                }
            }
            NetMgr.tcpSend(req);
            uniLib.PopUpMgr.removePopUp(this);
        };
        //确认修改按钮
        CreateMatchSetPanel.prototype.settingHandel = function () {
            var req = new Cmd.ChangeMatchGroupCmd_C();
            req.needAgree = this._permissionCheck.selected ? 1 : 0;
            req.masterClearRecord = this._cleanRcordCheck.selected ? 1 : 0;
            req.matchId = this._changeMatchId != null ? this._changeMatchId : 0;
            if (this._clubNameInput) {
                req.matchName = this._clubNameInput.text;
            }
            if (this._userIdInput) {
                req.otherManagerId = (Number)(this._userIdInput.text);
            }
            if (this._user2IdInput) {
                req.otherManagerId2 = (Number)(this._user2IdInput.text);
            }
            if (this._bigWinInput) {
                if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4035 || this._gameId == 4275 || this._gameId == 4123) {
                    req.winnerConditions = (Number)(this._bigWinInput.text);
                }
            }
            if (this._req) {
                req.createRoom = this._req;
            }
            NetMgr.tcpSend(req);
            uniLib.PopUpMgr.removePopUp(this);
        };
        /**
         *获取创建房间的信息！
         */
        CreateMatchSetPanel.prototype.setCreatReq = function (data) {
            if (data) {
                this._req = data;
                if (data.gameId) {
                    var config = MJLobbyData.getInstance().getGameCreateConfig(data.gameId);
                    if (config)
                        this._gameNameLabel.text = config.gameName;
                    this._gameId = data.gameId;
                }
            }
            if (this._gameId == 4124 || this._gameId == 4207 || this._gameId == 4149 || this._gameId == 4035 || this._gameId == 4275 || this._gameId == 4123) {
                this._bigWinGroup.visible = true;
            }
            else {
                this._bigWinGroup.visible = false;
            }
        };
        return CreateMatchSetPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.CreateMatchSetPanel = CreateMatchSetPanel;
    __reflect(CreateMatchSetPanel.prototype, "club.CreateMatchSetPanel");
})(club || (club = {}));
// TypeScript file
var club;
(function (club) {
    var DataManage = (function () {
        function DataManage() {
        }
        DataManage.MatchMemberTypeToString = function (type) {
            if (!type) {
                return "游  客";
            }
            else if (type == 1) {
                return "白名单";
            }
            else if (type == 2) {
                return "黑名单";
            }
            else if (type == 3) {
                return "同桌限制";
            }
            else if (type == 4) {
                return "VIP";
            }
        };
        DataManage.MatchMemberTypeToColor = function (type) {
            if (!type) {
                return 0x486d42;
            }
            else if (type == 1) {
                return 0x48FF00;
            }
            else if (type == 2) {
                return 0xcb2424;
            }
            else if (type == 3) {
                return 0xba6901;
            }
            else if (type == 4) {
                return 0xF4C775;
            }
        };
        return DataManage;
    }());
    club.DataManage = DataManage;
    __reflect(DataManage.prototype, "club.DataManage");
})(club || (club = {}));
var club;
(function (club) {
    /**手动添加玩家的数据显示  */
    var ClubPartnerAddItemPanel = (function (_super) {
        __extends(ClubPartnerAddItemPanel, _super);
        function ClubPartnerAddItemPanel() {
            var _this = _super.call(this) || this;
            /** 搜索出来的结果 */
            _this.search = false;
            _this.skinName = "ClubMemberItemSkin";
            return _this;
        }
        ClubPartnerAddItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubPartnerAddItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerAddItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerAddItemPanel.prototype.dataChanged = function () {
            this._searchBtn.visible = false;
            this._addBtn.visible = true;
            this._tishiText.visible = false;
            this.searchInfo = this.data;
            this._idText.text = this.searchInfo.uid + "";
            this._nameText.text = this.searchInfo.nickname;
            this._headImg.source = this.searchInfo.headUrl;
            if (this.searchInfo.membertype == 1) {
                this._addBtn.visible = false;
                this._tishiText.visible = true;
                this._tishiText.text = "圈主";
            }
            else if (this.searchInfo.membertype == 2) {
                this._addBtn.visible = false;
                this._tishiText.visible = true;
                this._tishiText.text = "管理员";
            }
        };
        ClubPartnerAddItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._addBtn:
                    var cmd = new Cmd.OperatePartnerMatchGroupCmd_CS();
                    cmd.typ = 1;
                    cmd.partnerUid = this.searchInfo.uid;
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    NetMgr.tcpSend(cmd);
                    this._tishiText.visible = true;
                    this._addBtn.visible = false;
                    break;
            }
        };
        return ClubPartnerAddItemPanel;
    }(eui.ItemRenderer));
    club.ClubPartnerAddItemPanel = ClubPartnerAddItemPanel;
    __reflect(ClubPartnerAddItemPanel.prototype, "club.ClubPartnerAddItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**群主 合作群添加合伙人*/
    var ClubPartnerAddPanel = (function (_super) {
        __extends(ClubPartnerAddPanel, _super);
        function ClubPartnerAddPanel() {
            var _this = _super.call(this) || this;
            /**构造玩家局数据 */
            _this._list = [];
            _this.skinName = "ClubAddPartnerSkin";
            return _this;
        }
        ClubPartnerAddPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubPartnerAddPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubPartnerAddPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubPartnerAddPanel.prototype.initUI = function () {
            this._menberList.itemRenderer = club.ClubPartnerAddItemPanel;
        };
        ClubPartnerAddPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text.length < 8) {
                        uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID!");
                        this._searchEditableText.text = "";
                    }
                    else {
                        this.searchMember(this._searchEditableText.text);
                    }
                    break;
            }
        };
        /**搜索数据 */
        ClubPartnerAddPanel.prototype.searchMember = function (value) {
            var ClubMemberList = club.ClubData.getInstance().ClubMemberMiniList;
            if (!Array.isArray(ClubMemberList))
                return;
            this.searchArray = [];
            if (value != "") {
                this.searchArray = ClubMemberList.filter(function (a) {
                    return a.nickname.toString().indexOf(value) != -1 || a.uid.toString().indexOf(value) != -1;
                });
            }
            this.setdata(this.searchArray);
        };
        /**更新数据*/
        ClubPartnerAddPanel.prototype.setdata = function (list) {
            if (list.length == 0) {
                this._tishiText.visible = true;
            }
            else {
                this._tishiText.visible = false;
            }
            if (!this._menberListArray) {
                this._menberListArray = new eui.ArrayCollection(list);
                this._menberList.dataProvider = this._menberListArray;
            }
            else {
                if (Array.isArray(this._menberListArray.source)) {
                    this._menberListArray.removeAll();
                }
                this._menberListArray.replaceAll(list);
            }
        };
        /**输入框判断 */
        ClubPartnerAddPanel.prototype.onTextFieldFocusOut = function (event) {
            if (event.target.text == "" || Number(event.target.text) == 0) {
                event.target.text = "";
            }
        };
        return ClubPartnerAddPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerAddPanel = ClubPartnerAddPanel;
    __reflect(ClubPartnerAddPanel.prototype, "club.ClubPartnerAddPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**合伙人 手动添加玩家的数据显示  */
    var ClubPartnerImportAddItemPanel = (function (_super) {
        __extends(ClubPartnerImportAddItemPanel, _super);
        function ClubPartnerImportAddItemPanel() {
            var _this = _super.call(this) || this;
            /** 搜索出来的结果 */
            _this.search = false;
            _this.skinName = "ClubMemberItemSkin";
            return _this;
        }
        ClubPartnerImportAddItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubPartnerImportAddItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerImportAddItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerImportAddItemPanel.prototype.dataChanged = function () {
            this._searchBtn.visible = false;
            this._addBtn.visible = true;
            this._tishiText.visible = false;
            this.searchInfo = this.data;
            this._idText.text = this.searchInfo.uid + "";
            this._nameText.text = this.searchInfo.nickname;
            this._headImg.source = this.searchInfo.headUrl;
        };
        ClubPartnerImportAddItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._addBtn:
                    var cmd = new Cmd.ImportMember2MatchGroupCmd_CS();
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    cmd.fromMatchId = club.ClubData.getInstance().PartnerMatchId;
                    cmd.uids = [this.searchInfo.uid];
                    NetMgr.tcpSend(cmd);
                    this._tishiText.visible = true;
                    this._addBtn.visible = false;
                    break;
            }
        };
        return ClubPartnerImportAddItemPanel;
    }(eui.ItemRenderer));
    club.ClubPartnerImportAddItemPanel = ClubPartnerImportAddItemPanel;
    __reflect(ClubPartnerImportAddItemPanel.prototype, "club.ClubPartnerImportAddItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**合伙人 添加成员*/
    var ClubPartnerImportAddPanel = (function (_super) {
        __extends(ClubPartnerImportAddPanel, _super);
        function ClubPartnerImportAddPanel() {
            var _this = _super.call(this) || this;
            /**构造玩家局数据 */
            _this._list = [];
            _this.skinName = "ClubAddmemberSkin";
            return _this;
        }
        ClubPartnerImportAddPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubPartnerImportAddPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.addEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubPartnerImportAddPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this._searchEditableText.removeEventListener(egret.FocusEvent.FOCUS_OUT, this.onTextFieldFocusOut, this);
        };
        ClubPartnerImportAddPanel.prototype.initUI = function () {
            this._menberList.itemRenderer = club.ClubPartnerImportAddItemPanel;
        };
        ClubPartnerImportAddPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._searchBtn:
                    if (this._searchEditableText.text.length < 8) {
                        uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID!");
                        this._searchEditableText.text = "";
                    }
                    else {
                        this.searchMember(this._searchEditableText.text);
                    }
                    break;
            }
        };
        /**搜索数据 */
        ClubPartnerImportAddPanel.prototype.searchMember = function (value) {
            var ClubMemberList = club.ClubData.getInstance().PartnerImportList;
            if (Array.isArray(ClubMemberList)) {
                this.searchArray = [];
                if (value != "") {
                    this.searchArray = ClubMemberList.filter(function (a) {
                        return a.nickname.toString().indexOf(value) != -1 || a.uid.toString().indexOf(value) != -1;
                    });
                }
                this.setdata(this.searchArray);
            }
        };
        /**更新数据*/
        ClubPartnerImportAddPanel.prototype.setdata = function (list) {
            if (list.length == 0) {
                this._tishiText.visible = true;
            }
            else {
                this._tishiText.visible = false;
            }
            if (!this._menberListArray) {
                this._menberListArray = new eui.ArrayCollection(list);
                this._menberList.dataProvider = this._menberListArray;
            }
            else {
                if (Array.isArray(this._menberListArray.source)) {
                    this._menberListArray.removeAll();
                }
                this._menberListArray.replaceAll(list);
            }
        };
        /**输入框判断 */
        ClubPartnerImportAddPanel.prototype.onTextFieldFocusOut = function (event) {
            if (event.target.text == "" || Number(event.target.text) == 0) {
                event.target.text = "";
            }
        };
        return ClubPartnerImportAddPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerImportAddPanel = ClubPartnerImportAddPanel;
    __reflect(ClubPartnerImportAddPanel.prototype, "club.ClubPartnerImportAddPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**导入成员 玩家ITem */
    var ClubPartnerImportItemPanel = (function (_super) {
        __extends(ClubPartnerImportItemPanel, _super);
        function ClubPartnerImportItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerImportItemSkin";
            return _this;
        }
        ClubPartnerImportItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubPartnerImportItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._headImg.source = this._info.headUrl;
            this._nameText.text = this._info.nickname;
            this._idText.text = "" + this._info.uid;
            if (club.ClubData.getInstance().PartnerImportUidList.indexOf(this._info.uid) != -1) {
                this._selectImg.visible = true;
            }
            else {
                this._selectImg.visible = false;
            }
        };
        return ClubPartnerImportItemPanel;
    }(eui.ItemRenderer));
    club.ClubPartnerImportItemPanel = ClubPartnerImportItemPanel;
    __reflect(ClubPartnerImportItemPanel.prototype, "club.ClubPartnerImportItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**可导入成员列表 */
    var ClubPartnerImportPanel = (function (_super) {
        __extends(ClubPartnerImportPanel, _super);
        function ClubPartnerImportPanel() {
            var _this = _super.call(this) || this;
            /**老友圈列表 */
            _this.matchIdList = [];
            _this.skinName = "ClubPartnerImportSkin";
            return _this;
        }
        ClubPartnerImportPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubPartnerImportPanel.prototype.initUI = function () {
            this.matchIdList = [];
            this._memberList = [];
            this._list.itemRenderer = club.ClubPartnerImportItemPanel;
            this.matchList.itemRenderer = club.MatchRadioButton;
            this._choseClubBtn.currentState = "up";
            this._allBtn.currentState = "up";
            this._choseClubBtn.skin["_matchIdText"].text = "";
        };
        /**事件监听 */
        ClubPartnerImportPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetCanImportMemberList2MatchGroup, this.setDate, this);
            this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this._list.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerImportPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.GetCanImportMemberList2MatchGroup, this.setDate, this);
            this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this._list.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        /**传数据 */
        ClubPartnerImportPanel.prototype.setDate = function (evt) {
            this._data = evt.param;
            this._choseClubBtn.skin["_matchIdText"].text = "" + this._data.matchId;
            this.matchIdList = this._data.matchIdList;
            if (this._data.matchIdList.length < 10) {
                this._choseClubBg.height = 2 + 49 * this._data.matchIdList.length;
                this._matchScroller.height = 49 * this._data.matchIdList.length;
            }
            else {
                this._choseClubBg.height = 456;
                this._matchScroller.height = 454;
            }
            this._memberList = this._data.memberList;
            this.updateList(this._data.memberList);
            this.updateMatchIdList();
        };
        /**老友圈选项 选择老友圈 */
        ClubPartnerImportPanel.prototype.onMatchListTap = function (e) {
            var cmd = new Cmd.GetCanImportMemberList2MatchGroupCmd_CS();
            cmd.curMatchId = club.ClubData.getInstance().clubmatchid;
            cmd.matchId = this.matchIdList[this.matchList.selectedIndex];
            NetMgr.tcpSend(cmd);
            if (this._choseClubBtn.currentState == "up") {
                this._choseClubBtn.currentState = "down";
                this._matchGroup.visible = true;
            }
            else {
                this._choseClubBtn.currentState = "up";
                this._matchGroup.visible = false;
            }
        };
        /**选中玩家*/
        ClubPartnerImportPanel.prototype.itemTap = function (evt) {
            if (this._list.selectedItem) {
                var item = this._list.selectedItem;
                if (club.ClubData.getInstance().PartnerImportUidList.indexOf(item.uid) != -1) {
                    club.ClubData.getInstance().PartnerImportUidList.splice(club.ClubData.getInstance().PartnerImportUidList.indexOf(item.uid), 1);
                }
                else {
                    club.ClubData.getInstance().PartnerImportUidList.push(item.uid);
                }
            }
            this.updateList(this._memberList);
        };
        /**	全选 */
        ClubPartnerImportPanel.prototype.allChose = function () {
            club.ClubData.getInstance().PartnerImportUidList = [];
            if (this._allBtn.currentState == "up") {
                if (Array.isArray(this._memberList)) {
                    this._memberList.forEach(function (element) {
                        club.ClubData.getInstance().PartnerImportUidList.push(element.uid);
                    });
                }
                this._allBtn.currentState = "down";
            }
            else {
                this._allBtn.currentState = "up";
            }
            if (this._memberList.length > 0) {
                this.updateList(this._memberList);
            }
        };
        /**更新数据 */
        ClubPartnerImportPanel.prototype.updateList = function (data) {
            if (club.ClubData.getInstance().PartnerImportUidList.length == this._memberList.length) {
                this._allBtn.currentState = "down";
            }
            else {
                this._allBtn.currentState = "up";
            }
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(data);
                this._list.dataProvider = this._listArr;
            }
            else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(data);
            }
        };
        /**更新数据 */
        ClubPartnerImportPanel.prototype.updateMatchIdList = function () {
            if (!this._matchListArr) {
                this._matchListArr = new eui.ArrayCollection(this.matchIdList);
                this.matchList.dataProvider = this._matchListArr;
            }
            else {
                if (Array.isArray(this._matchListArr.source)) {
                    this._matchListArr.removeAll();
                }
                this._matchListArr.replaceAll(this.matchIdList);
            }
        };
        ClubPartnerImportPanel.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._choseClubBtn:
                    if (this._choseClubBtn.currentState == "up") {
                        this._choseClubBtn.currentState = "down";
                        this._matchGroup.visible = true;
                    }
                    else {
                        this._choseClubBtn.currentState = "up";
                        this._matchGroup.visible = false;
                    }
                    break;
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._choseRect:
                    if (this._choseClubBtn.currentState == "up") {
                        this._choseClubBtn.currentState = "down";
                        this._matchGroup.visible = true;
                    }
                    else {
                        this._choseClubBtn.currentState = "up";
                        this._matchGroup.visible = false;
                    }
                    break;
                case this._allBtn:
                    this.allChose();
                    break;
                case this._sureBtn:
                    if (club.ClubData.getInstance().PartnerImportUidList.length == 0) {
                        uniLib.TipsUtils.showConfirm("请选择需要导入的成员！", "", "确定", null);
                    }
                    else {
                        uniLib.TipsUtils.showConfirm("确认将成员导入" + club.ClubData.getInstance().clubmatchid + "老友圈！", "", "确定", function () {
                            var cmd = new Cmd.ImportMember2MatchGroupCmd_CS();
                            cmd.matchId = club.ClubData.getInstance().clubmatchid;
                            cmd.fromMatchId = club.ClubData.getInstance().PartnerMatchId;
                            cmd.uids = club.ClubData.getInstance().PartnerImportUidList;
                            NetMgr.tcpSend(cmd);
                            club.ClubData.getInstance().PartnerImportUidList = [];
                            _super.prototype.removePop.call(_this);
                        }, "取消", null);
                    }
                    break;
            }
        };
        return ClubPartnerImportPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerImportPanel = ClubPartnerImportPanel;
    __reflect(ClubPartnerImportPanel.prototype, "club.ClubPartnerImportPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**群主看合伙人 成员战绩 ItemRenderer */
    var ClubPartnerMemberDetailItemPanel = (function (_super) {
        __extends(ClubPartnerMemberDetailItemPanel, _super);
        function ClubPartnerMemberDetailItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerMemberDetailItemSkin";
            return _this;
        }
        ClubPartnerMemberDetailItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubPartnerMemberDetailItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerMemberDetailItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._removeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerMemberDetailItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._headImg.source = this._info.member.headUrl;
            this._nameText.text = this._info.member.nickname;
            this._uidText.text = "" + this._info.member.uid;
            this._roomNumText.text = "" + this._info.roomNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._winNumText.text = "" + this._info.winNbrs[club.ClubData.getInstance().clubDayChose - 1];
            if (this._info.member.partnerState && this._info.member.partnerState == 1) {
                this._removeImg.visible = true;
                this._removeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
                this._deleteBtn.visible = false;
            }
            else {
                this._removeImg.visible = false;
                this._deleteBtn.visible = true;
            }
            if (this.itemIndex == 0) {
                this._deleteBtn.visible = false;
            }
        };
        ClubPartnerMemberDetailItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._deleteBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerRemoveMemberPanel(this._info.member);
                    break;
                case this._detailBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerRecordDetailPanel(this._info.member);
                    break;
                case this._removeImg:
                    uniLib.TipsUtils.showTipsDownToUp("此成员已踢出，记录保留24小时！");
                    break;
            }
        };
        return ClubPartnerMemberDetailItemPanel;
    }(eui.ItemRenderer));
    club.ClubPartnerMemberDetailItemPanel = ClubPartnerMemberDetailItemPanel;
    __reflect(ClubPartnerMemberDetailItemPanel.prototype, "club.ClubPartnerMemberDetailItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**查看战绩页面 群主看其他合伙人的战绩 */
    var ClubPartnerMemberDetailPanel = (function (_super) {
        __extends(ClubPartnerMemberDetailPanel, _super);
        function ClubPartnerMemberDetailPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerMemberDetailSkin";
            return _this;
        }
        ClubPartnerMemberDetailPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubPartnerMemberDetailPanel.prototype.initUI = function () {
            this._list.itemRenderer = club.ClubPartnerMemberDetailItemPanel;
        };
        /**事件监听 */
        ClubPartnerMemberDetailPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerMemberDetailPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        /**更新数据 */
        ClubPartnerMemberDetailPanel.prototype.updateList = function () {
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._partnerMemberRecordInfo);
                this._list.dataProvider = this._listArr;
            }
            else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._partnerMemberRecordInfo);
            }
        };
        /**传数据 */
        ClubPartnerMemberDetailPanel.prototype.setDate = function (evt) {
            this._data = evt.param;
            this._partnerMemberRecordInfo = this._data.records;
            this.updateList();
        };
        ClubPartnerMemberDetailPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        return ClubPartnerMemberDetailPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerMemberDetailPanel = ClubPartnerMemberDetailPanel;
    __reflect(ClubPartnerMemberDetailPanel.prototype, "club.ClubPartnerMemberDetailPanel");
})(club || (club = {}));
/**合作群 成员战绩item */
var club;
(function (club) {
    var ClubPartnerMemberRecordItemPanel = (function (_super) {
        __extends(ClubPartnerMemberRecordItemPanel, _super);
        function ClubPartnerMemberRecordItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerMemberRecordItemSkin";
            return _this;
        }
        ClubPartnerMemberRecordItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubPartnerMemberRecordItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerMemberRecordItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._removeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerMemberRecordItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._headImg.source = this._info.member.headUrl;
            this._nameText.text = this._info.member.nickname;
            this._uidText.text = "ID:" + this._info.member.uid;
            this._roomNumText.text = "" + this._info.roomNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._bigWinText.text = "" + this._info.winNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._recordText.text = "" + this._info.scores[club.ClubData.getInstance().clubDayChose - 1];
            if (this._info.member.partnerState && this._info.member.partnerState == 1) {
                this._removeImg.visible = true;
                this._removeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
                this._deleteBtn.visible = false;
            }
            else {
                this._removeImg.visible = false;
                this._deleteBtn.visible = true;
            }
            if (this._info.member.uid == uniLib.UserInfo.uid) {
                this._deleteBtn.visible = false;
            }
        };
        ClubPartnerMemberRecordItemPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._deleteBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerRemoveMemberPanel(this._info.member);
                    break;
                case this._detailBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerRecordDetailPanel(this._info.member);
                    break;
                case this._removeImg:
                    uniLib.TipsUtils.showTipsDownToUp("此成员已踢出，记录保留24小时！");
                    break;
            }
        };
        return ClubPartnerMemberRecordItemPanel;
    }(eui.ItemRenderer));
    club.ClubPartnerMemberRecordItemPanel = ClubPartnerMemberRecordItemPanel;
    __reflect(ClubPartnerMemberRecordItemPanel.prototype, "club.ClubPartnerMemberRecordItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**合作群 成员战绩 */
    var ClubPartnerMemberRecordPanel = (function (_super) {
        __extends(ClubPartnerMemberRecordPanel, _super);
        function ClubPartnerMemberRecordPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerMemberRecordSkin";
            return _this;
        }
        ClubPartnerMemberRecordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**事件监听 */
        ClubPartnerMemberRecordPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(club.ClubConst.RemoveMemberMatchGroup, this.updateDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerMemberRecordPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.GetMemberRecordsMatchGroup, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        //初始化
        ClubPartnerMemberRecordPanel.prototype.initUI = function () {
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            club.ClubData.getInstance().clubDayChose = 1;
            this._list.itemRenderer = club.ClubPartnerMemberRecordItemPanel;
            this._choseDayBtn.currentState = "up";
        };
        /**传数据 */
        ClubPartnerMemberRecordPanel.prototype.setDate = function (evt) {
            this._data = evt.param;
            this._partnerMemberRecordInfo = this._data.records;
            this._allMemberText.text = "" + this._data.statistics.memberNbr;
            this.update();
            this.updateList();
        };
        /**传数据 */
        ClubPartnerMemberRecordPanel.prototype.updateDate = function (evt) {
            var data = evt.param;
            this._partnerMemberRecordInfo.forEach(function (element) {
                if (element.member.uid == data.uid) {
                    element.member.partnerState = 1;
                }
            });
            this._partnerMemberRecordInfo = this._data.records;
            this._allMemberText.text = "" + this._data.statistics.memberNbr;
            this.update();
            this.updateList();
        };
        /**更新视图 */
        ClubPartnerMemberRecordPanel.prototype.update = function () {
            this._palyRoomText.text = "" + this._data.statistics.roomNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._bigWinText.text = "" + this._data.statistics.winNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._playMemberText.text = "" + this._data.statistics.playUserNbrs[club.ClubData.getInstance().clubDayChose - 1];
        };
        /**更新数据 */
        ClubPartnerMemberRecordPanel.prototype.updateList = function () {
            if (!Array.isArray(this._partnerMemberRecordInfo)) {
                return;
            }
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._partnerMemberRecordInfo);
                this._list.dataProvider = this._listArr;
            }
            else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._partnerMemberRecordInfo);
            }
        };
        ClubPartnerMemberRecordPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    club.ClubData.getInstance().clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.update();
                    this.updateList();
                    break;
                case this._yesterdayBtn:
                    club.ClubData.getInstance().clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.update();
                    this.updateList();
                    break;
                case this._qianBtn:
                    club.ClubData.getInstance().clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.update();
                    this.updateList();
                    break;
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
                case this._addBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerImportAddPanel();
                    var cmd = new Cmd.GetCanImportMemberList2MatchGroupCmd_CS();
                    cmd.curMatchId = club.ClubData.getInstance().clubmatchid;
                    NetMgr.tcpSend(cmd);
                    break;
                case this._importBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerImportPanel(function () {
                        var cmd = new Cmd.GetCanImportMemberList2MatchGroupCmd_CS();
                        cmd.curMatchId = club.ClubData.getInstance().clubmatchid;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
            }
        };
        return ClubPartnerMemberRecordPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerMemberRecordPanel = ClubPartnerMemberRecordPanel;
    __reflect(ClubPartnerMemberRecordPanel.prototype, "club.ClubPartnerMemberRecordPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**俱乐部成员列表详情 */
    var ClubPartnerRecordDetailPanel = (function (_super) {
        __extends(ClubPartnerRecordDetailPanel, _super);
        function ClubPartnerRecordDetailPanel(parm) {
            var _this = _super.call(this) || this;
            /**当前页数 */
            _this._curPage = 0;
            _this.skinName = "ClubPartnerRecordDetailSkin";
            _this._info = parm;
            return _this;
        }
        ClubPartnerRecordDetailPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubPartnerRecordDetailPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.MATCH_HISTORY_FOR_PARTNER, this.showData, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRecordDetailPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.MATCH_HISTORY_FOR_PARTNER, this.showData, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        //初始化
        ClubPartnerRecordDetailPanel.prototype.initUI = function () {
            this.addListen();
            this._AllRecordArr = [];
            this._list.itemRenderer = club.ClubMemberInfoItemPanel;
            this._remarksText.touchEnabled = false;
            club.ClubSendMgr.getGameDataHistoryToUIdgForPartner(club.ClubData.getInstance().clubmatchid, this._info.uid, 1, club.ClubConst1.MATCH_HISTORY_FOR_PARTNER);
        };
        ClubPartnerRecordDetailPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        /**接收数据 */
        ClubPartnerRecordDetailPanel.prototype.showData = function (evt) {
            var vo = evt.param;
            this._headImg.source = vo.userInfo.headurl;
            this._nameText.text = vo.userInfo.nickname;
            this._uidText.text = vo.userInfo.uid + "";
            this._remarksText.text = vo.userInfo.remark ? vo.userInfo.remark : "";
            if (vo.userInfo.partner) {
                this._belongText.text = "归属人：" + vo.userInfo.partner.nickname;
                this._belongText.visible = true;
            }
            else {
                this._belongText.visible = false;
            }
            if (vo.typ) {
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                this._totalPage = vo.maxPage;
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tishiText.visible = true;
                }
                else {
                    this._tishiText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
        };
        /**添加数据*/
        ClubPartnerRecordDetailPanel.prototype.addData = function (arr) {
            if (!arr || !arr[0]) {
                return;
            }
            this._AllRecordArr = this._AllRecordArr.concat(arr);
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._AllRecordArr);
                this._list.dataProvider = this._listArr;
            }
            else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._AllRecordArr);
            }
        };
        /**单独加 */
        ClubPartnerRecordDetailPanel.prototype.addListen = function () {
            this._scroller.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        };
        /**获取战绩消息 */
        ClubPartnerRecordDetailPanel.prototype.getData = function () {
            uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            club.ClubSendMgr.getGameDataHistoryToUIdgForPartner(club.ClubData.getInstance().clubmatchid, this._info.uid, this._curPage, club.ClubConst1.MATCH_HISTORY_FOR_PARTNER);
        };
        /**滑到底加载其他页数据 */
        ClubPartnerRecordDetailPanel.prototype.checkTop = function (evt) {
            if (this._scroller.viewport.scrollV + this._scroller.viewport.height >= this._scroller.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroller.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this); //2秒不返回继续可以请求
                }
            }
        };
        return ClubPartnerRecordDetailPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerRecordDetailPanel = ClubPartnerRecordDetailPanel;
    __reflect(ClubPartnerRecordDetailPanel.prototype, "club.ClubPartnerRecordDetailPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**合作群 合作群战绩 群主页面 合伙人数据*/
    var ClubPartnerRecordItemPanel = (function (_super) {
        __extends(ClubPartnerRecordItemPanel, _super);
        function ClubPartnerRecordItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerRecordItemSkin";
            return _this;
        }
        ClubPartnerRecordItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addListener();
        };
        ClubPartnerRecordItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRecordItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._removeImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRecordItemPanel.prototype.dataChanged = function () {
            this._info = this.data;
            this._headImg.source = this._info.partner.headUrl;
            this._nameText.text = this._info.partner.nickname;
            this._uidText.text = "ID:" + this._info.partner.uid;
            this._roomNumText.text = "" + this._info.roomNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._palyerText.text = "" + this._info.playUserNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._bigWinText.text = "" + this._info.winNbrs[club.ClubData.getInstance().clubDayChose - 1];
            this._numText.text = "" + this._info.memberNbr;
            if (this._info.partner.partnerState && this._info.partner.partnerState == 1) {
                this._removeImg.visible = true;
                this._removeImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
                this._deleteBtn.visible = false;
            }
            else {
                this._removeImg.visible = false;
                this._deleteBtn.visible = true;
            }
        };
        ClubPartnerRecordItemPanel.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._deleteBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerRemovePanterPanel(this._info.partner);
                    break;
                case this._detailBtn:
                    club.ClubModuleMgr.getInstance().showClubPartnerMemberDetailPanel(function () {
                        var cmd = new Cmd.GetMemberRecordsMatchGroupCmd_CS();
                        cmd.matchId = club.ClubData.getInstance().clubmatchid;
                        cmd.targetUid = _this._info.partner.uid;
                        cmd.typ = 2;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
                case this._removeImg:
                    uniLib.TipsUtils.showTipsDownToUp("此玩家已经解除合伙关系，记录保留24小时！");
                    break;
            }
        };
        return ClubPartnerRecordItemPanel;
    }(eui.ItemRenderer));
    club.ClubPartnerRecordItemPanel = ClubPartnerRecordItemPanel;
    __reflect(ClubPartnerRecordItemPanel.prototype, "club.ClubPartnerRecordItemPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**合作群 合作群战绩 群主页面 */
    var ClubPartnerRecordPanel = (function (_super) {
        __extends(ClubPartnerRecordPanel, _super);
        function ClubPartnerRecordPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerRecordSkin";
            return _this;
        }
        ClubPartnerRecordPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubPartnerRecordPanel.prototype.initUI = function () {
            this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
            club.ClubData.getInstance().clubDayChose = 1;
            this._list.itemRenderer = club.ClubPartnerRecordItemPanel;
            this._choseDayBtn.currentState = "up";
        };
        /**事件监听 */
        ClubPartnerRecordPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.GetPartnerRecordsMatchGroup, this.setDate, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRecordPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.GetPartnerRecordsMatchGroup, this.setDate, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        /**传数据 */
        ClubPartnerRecordPanel.prototype.setDate = function (evt) {
            this._data = evt.param;
            this._recordsdata = this._data.records;
            if (!Array.isArray(this._recordsdata)) {
                this._partnerNumText.text = "合伙人人数：0";
            }
            else {
                this._partnerNumText.text = "合伙人人数：" + this._recordsdata.length;
            }
            this.updateList();
        };
        /**更新数据 */
        ClubPartnerRecordPanel.prototype.updateList = function () {
            if (!Array.isArray(this._recordsdata)) {
                return;
            }
            if (!this._listArr) {
                this._listArr = new eui.ArrayCollection(this._recordsdata);
                this._list.dataProvider = this._listArr;
            }
            else {
                if (Array.isArray(this._listArr.source)) {
                    this._listArr.removeAll();
                }
                this._listArr.replaceAll(this._recordsdata);
            }
        };
        ClubPartnerRecordPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._choseDayBtn:
                    this._choseDayBtn.currentState = "down";
                    this._dayTypeGroup.visible = true;
                    break;
                case this._todayBtn:
                    club.ClubData.getInstance().clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateList();
                    break;
                case this._yesterdayBtn:
                    club.ClubData.getInstance().clubDayChose = 2;
                    this._choseDayBtn.skin["_dayTypeText"].text = "昨日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateList();
                    break;
                case this._qianBtn:
                    club.ClubData.getInstance().clubDayChose = 3;
                    this._choseDayBtn.skin["_dayTypeText"].text = "前日输赢";
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    this.updateList();
                    break;
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._choseRect:
                    this._choseDayBtn.currentState = "up";
                    this._dayTypeGroup.visible = false;
                    break;
                case this._addPartnerBtn:
                    var cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    cmd.typ = 1;
                    NetMgr.tcpSend(cmd);
                    club.ClubModuleMgr.getInstance().showClubPartnerAddPanel();
                    break;
            }
        };
        return ClubPartnerRecordPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerRecordPanel = ClubPartnerRecordPanel;
    __reflect(ClubPartnerRecordPanel.prototype, "club.ClubPartnerRecordPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**移出成员页面 */
    var ClubPartnerRemoveMemberPanel = (function (_super) {
        __extends(ClubPartnerRemoveMemberPanel, _super);
        function ClubPartnerRemoveMemberPanel(member) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerRemoveSkin";
            _this._info = member;
            return _this;
        }
        ClubPartnerRemoveMemberPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubPartnerRemoveMemberPanel.prototype.initUI = function () {
            this._idText.text = "" + this._info.uid;
            this._nameText.text = this._info.nickname;
            this._headImg.source = this._info.headUrl;
        };
        /**事件监听 */
        ClubPartnerRemoveMemberPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRemoveMemberPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRemoveMemberPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._sureBtn:
                    var cmd = new Cmd.RemoveMemberMatchGroupCmd_CS();
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    cmd.uid = this._info.uid;
                    NetMgr.tcpSend(cmd);
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        return ClubPartnerRemoveMemberPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerRemoveMemberPanel = ClubPartnerRemoveMemberPanel;
    __reflect(ClubPartnerRemoveMemberPanel.prototype, "club.ClubPartnerRemoveMemberPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**移出合伙人页面 */
    var ClubPartnerRemovePanterPanel = (function (_super) {
        __extends(ClubPartnerRemovePanterPanel, _super);
        function ClubPartnerRemovePanterPanel(member) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPartnerRemoveSkin";
            _this._info = member;
            return _this;
        }
        ClubPartnerRemovePanterPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubPartnerRemovePanterPanel.prototype.initUI = function () {
            this._idText.text = "" + this._info.uid;
            this._nameText.text = this._info.nickname;
            this._headImg.source = this._info.headUrl;
            this._tipsText.text = "解除合伙人需要合伙人同意才能解除！";
            this._sureBtn.skin["_text"].text = "确认解除";
        };
        /**事件监听 */
        ClubPartnerRemovePanterPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRemovePanterPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubPartnerRemovePanterPanel.prototype.onClickTap = function (e) {
            switch (e.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._sureBtn:
                    var cmd = new Cmd.OperatePartnerMatchGroupCmd_CS();
                    cmd.matchId = club.ClubData.getInstance().clubmatchid;
                    cmd.partnerUid = this._info.uid;
                    cmd.typ = 2;
                    NetMgr.tcpSend(cmd);
                    _super.prototype.removePop.call(this);
                    break;
            }
        };
        return ClubPartnerRemovePanterPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubPartnerRemovePanterPanel = ClubPartnerRemovePanterPanel;
    __reflect(ClubPartnerRemovePanterPanel.prototype, "club.ClubPartnerRemovePanterPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**定时器 */
    var ClubMemberTimerPanel = (function (_super) {
        __extends(ClubMemberTimerPanel, _super);
        function ClubMemberTimerPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubMemberTimerSkin";
            return _this;
        }
        ClubMemberTimerPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        //初始化
        ClubMemberTimerPanel.prototype.initUI = function () {
            if (club.ClubData.getInstance().suspendTimer) {
                this._suspendHour.text = Math.floor(club.ClubData.getInstance().suspendTimer / 3600) < 10 ? "0" + Math.floor(club.ClubData.getInstance().suspendTimer / 3600) : Math.floor(club.ClubData.getInstance().suspendTimer / 3600) + "";
                this._suspendMinute.text = ((club.ClubData.getInstance().suspendTimer % 3600) / 60) < 10 ? "0" + (club.ClubData.getInstance().suspendTimer % 3600) / 60 : (club.ClubData.getInstance().suspendTimer % 3600) / 60 + "";
            }
            if (club.ClubData.getInstance().renewTimer) {
                this._renewHour.text = Math.floor(club.ClubData.getInstance().renewTimer / 3600) < 10 ? "0" + Math.floor(club.ClubData.getInstance().renewTimer / 3600) : Math.floor(club.ClubData.getInstance().renewTimer / 3600) + "";
                this._renewMinute.text = ((club.ClubData.getInstance().renewTimer % 3600) / 60) < 10 ? "0" + (club.ClubData.getInstance().renewTimer % 3600) / 60 : (club.ClubData.getInstance().renewTimer % 3600) / 60 + "";
            }
            if (!club.ClubData.getInstance().isClubOwner) {
                this._resetRenewBtn.visible = false;
                this._resetSuspendBtn.visible = false;
                this._sureBtn.visible = false;
            }
            else {
                this._resetRenewBtn.visible = true;
                this._resetSuspendBtn.visible = true;
                this._sureBtn.visible = true;
            }
        };
        /**事件监听 */
        ClubMemberTimerPanel.prototype.addEvent = function () {
            this._suspendHour.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._suspendMinute.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this._renewHour.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._renewMinute.addEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubMemberTimerPanel.prototype.removeEvent = function () {
            this._suspendHour.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._suspendMinute.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this._renewHour.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onHourTextFocusOut, this);
            this._renewMinute.removeEventListener(egret.TouchEvent.FOCUS_OUT, this.onMinuteTextFocusOut, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubMemberTimerPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubMemberTimerPanel.prototype.onClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._sureBtn:
                    this.sendTimer();
                    _super.prototype.removePop.call(this);
                    break;
                case this._resetSuspendBtn:
                    this._suspendHour.text = "";
                    this._suspendMinute.text = "";
                    break;
                case this._resetRenewBtn:
                    this._renewHour.text = "";
                    this._renewMinute.text = "";
                    break;
            }
        };
        /**输入框判断 */
        ClubMemberTimerPanel.prototype.onHourTextFocusOut = function (event) {
            if (event.target.text != "" && Number(event.target.text) < 24) {
                if (Number(event.target.text) < 10) {
                    event.target.text = "0" + Number(event.target.text);
                }
            }
            else {
                event.target.text = "";
            }
        };
        /**输入框判断 */
        ClubMemberTimerPanel.prototype.onMinuteTextFocusOut = function (event) {
            if (event.target.text != "" && Number(event.target.text) < 60) {
                if (Number(event.target.text) < 10) {
                    event.target.text = "0" + Number(event.target.text);
                }
            }
            else {
                event.target.text = "";
            }
        };
        /**发送时间 */
        ClubMemberTimerPanel.prototype.sendTimer = function () {
            var seq = new Cmd.SetPauseTimerMatchGroupCmd_CS;
            seq.matchId = club.ClubData.getInstance().matchid;
            if (this._suspendHour.text != "" || this._suspendMinute.text != "") {
                seq.pauseTimer = Number(this._suspendHour.text) * 3600 + Number(this._suspendMinute.text) * 60;
            }
            if (this._renewHour.text != "" || this._renewMinute.text != "") {
                seq.restoreTimer = Number(this._renewHour.text) * 3600 + Number(this._renewMinute.text) * 60;
            }
            var timee = (seq.pauseTimer / 3600).toFixed(0) + "小时" + ((seq.pauseTimer % 3600) / 60) + "分钟";
            NetMgr.tcpSend(seq);
        };
        return ClubMemberTimerPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubMemberTimerPanel = ClubMemberTimerPanel;
    __reflect(ClubMemberTimerPanel.prototype, "club.ClubMemberTimerPanel");
})(club || (club = {}));
var club;
(function (club) {
    var MatchAddYelloPanel = (function (_super) {
        __extends(MatchAddYelloPanel, _super);
        /**
         *绑定黄名单面板
         */
        function MatchAddYelloPanel(matchId, uid) {
            var _this = _super.call(this, "", 635, 391) || this;
            _this.skinName = "MatchAddYelloPanelSkin";
            _this.matchId = matchId;
            _this.uid = uid;
            return _this;
        }
        MatchAddYelloPanel.prototype.initUI = function () {
            this.uidEditableText.restrict = "0-9";
            this.uidEditableText.inputType = egret.TextFieldInputType.TEL;
        };
        MatchAddYelloPanel.prototype.addEvent = function () {
            this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.cancleBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.uidEditableText.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        MatchAddYelloPanel.prototype.removeEvent = function () {
            this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.cancleBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.uidEditableText.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        //点击事件
        MatchAddYelloPanel.prototype.onClick = function (e) {
            if (e.target == this.yesBtn) {
                var text = this.uidEditableText.text;
                var uid = Number(text);
                if (uid == NaN || !uid) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家ID");
                    return;
                }
                var req = new Cmd.OperateYellowMemberListMatchGroupCmd_C();
                req.uid = this.uid;
                req.uid2 = uid;
                req.matchId = this.matchId;
                req.reply = 1;
                this.removePop();
                NetMgr.tcpSend(req);
            }
            else {
                this.removePop();
            }
        };
        MatchAddYelloPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.uidEditableText = null;
        };
        return MatchAddYelloPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.MatchAddYelloPanel = MatchAddYelloPanel;
    __reflect(MatchAddYelloPanel.prototype, "club.MatchAddYelloPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 战况item
     */
    var MatchFightingItem = (function (_super) {
        __extends(MatchFightingItem, _super);
        function MatchFightingItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchFightingItemSkin";
            _this.addListener();
            return _this;
        }
        MatchFightingItem.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        MatchFightingItem.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        MatchFightingItem.prototype.dataChanged = function () {
            this._info = this.data;
            this._tableNoText.text = (this.itemIndex + 1) + "";
            this._tableIdText.text = "桌号" + this._info.roomId + "";
            this._timeText.text = LobbyUtils.changeTimeToStr(this._info.timeStamp);
            var item = this._info.userGameHistorys;
            this.nameandscore.itemRenderer = club.MatchFightingNSPanel;
            this.nameandscore.dataProvider = new eui.ArrayCollection(item);
            this._detailBtn.visible = true;
        };
        MatchFightingItem.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._detailBtn:
                    LobbyModuleMgr.getInstance().showRecordDetail(function () {
                        club.ClubSendMgr.getGameDetailHistory(_this._info.roomId);
                    });
                    MJLobbyData.getInstance().globalRoomId = this._info.roomId;
                    break;
            }
        };
        return MatchFightingItem;
    }(eui.ItemRenderer));
    club.MatchFightingItem = MatchFightingItem;
    __reflect(MatchFightingItem.prototype, "club.MatchFightingItem");
})(club || (club = {}));
var club;
(function (club) {
    /**玩家战绩单个信息 */
    var MatchFightingNSPanel = (function (_super) {
        __extends(MatchFightingNSPanel, _super);
        function MatchFightingNSPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchFightingNSSkin";
            return _this;
        }
        MatchFightingNSPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this.names.text = this.info.nickName;
            if (this.info.integral != null) {
                this.score.text = this.info.integral + "";
                if (this.info.integral < 0) {
                    this.score.textColor = 0x0c7113;
                }
            }
        };
        return MatchFightingNSPanel;
    }(eui.ItemRenderer));
    club.MatchFightingNSPanel = MatchFightingNSPanel;
    __reflect(MatchFightingNSPanel.prototype, "club.MatchFightingNSPanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 匹配号管理
     */
    var MatchManagePanel = (function (_super) {
        __extends(MatchManagePanel, _super);
        function MatchManagePanel() {
            var _this = _super.call(this) || this;
            /**当前页数 */
            _this._curPage = 0;
            /**战况查询 记录当前数据记录的 日  */
            _this._dayChose = 0;
            /**把0分放后面 */
            _this.key = new Cmd.MatchGroupMemberInfo();
            /** 0数组*/
            _this.zeroArr = [];
            /** 0位置*/
            _this.zeroIndex = [];
            _this.matchIdList = [];
            _this.waitList = new Array();
            _this.skinName = "MatchManageSkin";
            return _this;
        }
        MatchManagePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MatchManagePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            uniLib.Global.addEventListener(club.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.addEventListener(club.ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.addEventListener(club.ClubConst.MATCH_HISTORY_FOR_MANAGE, this.showFightData, this);
            uniLib.Global.addEventListener(club.ClubConst.ReturnYellowList, this.initYelloList, this);
            uniLib.Global.addEventListener(club.ClubConst.RemarkPointMatchGroup, this.updateRemarkPoint, this);
            uniLib.Global.addEventListener(club.ClubConst.RemarkNickNameMatchGroup, this.updateRemarkNickName, this);
            uniLib.Global.addEventListener(club.ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
        };
        MatchManagePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            uniLib.Global.removeEventListener(club.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.removeEventListener(club.ClubConst.MATCH_HISTORY_FOR_MANAGE, this.showFightData, this);
            uniLib.Global.removeEventListener(club.ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.removeEventListener(club.ClubConst.ReturnYellowList, this.initYelloList, this);
            uniLib.Global.removeEventListener(club.ClubConst.RemarkPointMatchGroup, this.updateRemarkPoint, this);
            uniLib.Global.removeEventListener(club.ClubConst.RemarkNickNameMatchGroup, this.updateRemarkNickName, this);
            uniLib.Global.removeEventListener(club.ClubConst.CleanMemberWinPointMatchGroup, this.updateWinPoint, this);
        };
        MatchManagePanel.prototype.initUI = function () {
            club.ClubData.getInstance().clubDayChose = 1;
            MatchManagePanel.Instanc = this;
            this.detailsGroup.visible = false;
            this.memberGroup.visible = false;
            this.fightingGroup.visible = false;
            this.yelloListGroup.visible = false;
            this.uidEditableText.restrict = "0-9";
            this.uidEditableText.inputType = egret.TextFieldInputType.TEL;
            this.matchList.itemRenderer = club.MatchRadioButton;
            this.fightingList.itemRenderer = club.MatchFightingItem;
            this.memeberList.itemRenderer = club.MatchMemberItem;
            this.yelloList.itemRenderer = club.MatchYelloItem;
            this.matchTableList.itemRenderer = club.MatchTableItem;
            this.matchDetailList.itemRenderer = MatchTableInfoItem;
            this._choseDetailBtn.skin["_detailTxt"].text = "房间详情";
            this._detailScroller.visible = false;
            this._tableScroller.visible = true;
            this._roomDetailGroup.visible = false;
            this.addListen();
        };
        /**更新俱乐部房间 */
        MatchManagePanel.prototype.updataMatchList = function () {
            if (!this.matchListArray) {
                this.matchListArray = new eui.ArrayCollection(this.matchIdList);
                this.matchList.dataProvider = this.matchListArray;
            }
            else {
                if (Array.isArray(this.matchListArray.source)) {
                    this.matchListArray.removeAll();
                }
                this.matchListArray.replaceAll(this.matchIdList);
            }
        };
        /** 更新成员列表*/
        MatchManagePanel.prototype.updataMemeberList = function () {
            if (!this.memeberListArray) {
                this.memeberListArray = new eui.ArrayCollection(this.member);
                this.memeberList.dataProvider = this.memeberListArray;
            }
            else {
                if (this.memeberListArray.source) {
                    this.memeberListArray.removeAll();
                }
                this.memeberListArray.replaceAll(this.member);
            }
        };
        /**给成员列表排序 群主和管理员在最前面，接下去是输最多到输最少，然后赢最少赢最多，然后接下去才是0分的*/
        MatchManagePanel.prototype.sortMemberList = function () {
            var sortMemberList = this.member.concat();
            /**降序排序 */
            sortMemberList.sort(function (a, b) {
                return a.scores[club.ClubData.getInstance().clubDayChose - 1] - b.scores[club.ClubData.getInstance().clubDayChose - 1];
            });
            /**0放次后 */
            this.zeroArr = [];
            this.zeroIndex = [];
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].scores[club.ClubData.getInstance().clubDayChose - 1] == 0) {
                    this.zeroArr.push(sortMemberList[i]);
                    this.zeroIndex.push(i);
                }
            }
            this.zeroIndex.sort(function (a, b) { return b - a; });
            this.zeroIndex.forEach(function (element) {
                sortMemberList.splice(element, 1);
            });
            sortMemberList = sortMemberList.concat(this.zeroArr);
            /**黑名单和游客放最后 */
            this.zeroArr = [];
            this.zeroIndex = [];
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].type == club.ClubConst.CLUB_BLACK) {
                    this.zeroArr.push(sortMemberList[i]);
                    this.zeroIndex.push(i);
                }
            }
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].type == club.ClubConst.CLUB_TOURIST) {
                    this.zeroArr.push(sortMemberList[i]);
                    this.zeroIndex.push(i);
                }
            }
            this.zeroIndex.sort(function (a, b) { return b - a; });
            this.zeroIndex.forEach(function (element) {
                sortMemberList.splice(element, 1);
            });
            sortMemberList = sortMemberList.concat(this.zeroArr);
            /**把管理员放最前面 */
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].membertype == 2) {
                    this.key = null;
                    this.key = sortMemberList[i];
                    sortMemberList.splice(i, 1);
                    sortMemberList.unshift(this.key);
                }
            }
            /**把房主放最前面 */
            for (var i = 0; i < sortMemberList.length; i++) {
                if (sortMemberList[i].membertype == 1) {
                    this.key = null;
                    this.key = sortMemberList[i];
                    sortMemberList.splice(i, 1);
                    sortMemberList.unshift(this.key);
                }
            }
            this.member = sortMemberList;
        };
        /**更新同桌限制 */
        MatchManagePanel.prototype.updateYelloList = function () {
            if (!this.yelloListArray) {
                this.yelloListArray = new eui.ArrayCollection(this.yelloIndoList);
                this.yelloList.dataProvider = this.yelloListArray;
            }
            else {
                if (Array.isArray(this.yelloListArray.source)) {
                    this.yelloListArray.removeAll();
                }
                this.yelloListArray.replaceAll(this.yelloIndoList);
            }
        };
        /**更新桌子 */
        MatchManagePanel.prototype.updataTableList = function () {
            this.roomList.forEach(function (f) {
                if (!Array.isArray(f.list)) {
                    f.list = [];
                }
            });
            if (!this.matchTableListArray) {
                this.matchTableListArray = new eui.ArrayCollection(this.roomList);
                this.matchTableList.dataProvider = this.matchTableListArray;
                this.matchDetailList.dataProvider = this.matchTableListArray;
            }
            else {
                if (Array.isArray(this.matchTableListArray.source)) {
                    this.matchTableListArray.removeAll();
                }
                this.matchTableListArray.replaceAll(this.roomList);
            }
        };
        /**更新房间详情 */
        MatchManagePanel.prototype.updataDetails = function (curMath) {
            if (!curMath)
                return;
            var state = (curMath && curMath.state == 1) ? 1 : 0;
            this.terminationButton.currentState = state == 1 ? "down" : "up";
            this.ownerLabel.text = "房主名:" + (curMath ? curMath.ownername : "");
            this.gameMemberLabel.text = "当前游戏人数：" + (curMath ? curMath.gameingUserNum : "");
            this.matchIdLabel.text = "老友圈:" + (curMath ? curMath.matchId : "");
            if (curMath.matchName) {
                this.matchName.visible = true;
                this.matchName.text = "老友圈名:" + curMath.matchName;
            }
            else {
                this.matchName.visible = false;
            }
            this.waitMemberLabel.text = "已开房间数：" + (curMath ? curMath.curRoomNbr : "");
            this.delTimeLabel.text = "不限时";
            this.roomList = (curMath && curMath.roomList instanceof Array) ? curMath.roomList : [];
            this.updataTableList();
            var curMatchId = (curMath ? curMath.matchId : null);
            for (var i = 0; i < this.matchIdList.length; i++) {
                if (this.matchIdList[i] == curMatchId) {
                    this.matchList.selectedIndex = i;
                    break;
                }
            }
            this.shareInfo = curMath ? curMath.shareInfo : null;
        };
        MatchManagePanel.prototype.initReturnMatchGroup = function (evt) {
            var data = evt.param;
            if (!Array.isArray(data.matchIdList)) {
                uniLib.PopUpMgr.removePopUp(this);
                return;
            }
            club.ClubData.getInstance().isClubOwner = data.curMath.ownerid == uniLib.UserInfo.uid ? true : false;
            club.ClubData.getInstance().matchid = data.curMath.matchId;
            club.ClubData.getInstance().suspendTimer = data.curMath.pauseTimer ? data.curMath.pauseTimer : null;
            club.ClubData.getInstance().renewTimer = data.curMath.restoreTimer ? data.curMath.restoreTimer : null;
            if (uniLib.UserInfo.uid == data.curMath.ownerid) {
                this._deleteRecordBtn.visible = true;
            }
            else {
                this._deleteRecordBtn.visible = false;
            }
            this.waitList = [];
            this.matchIdList = data && data.matchIdList && data.matchIdList instanceof Array ? data.matchIdList : [];
            this.waitList = data != null && data.curMath != null && data.curMath.waitUserList != null && data.curMath.waitUserList instanceof Array && data.curMath.waitUserList.length > 0 ? data.curMath.waitUserList : [];
            this._choseClubBtn.skin["_matchIdText"].text = data.curMath.matchId;
            this._choseClubBtn.currentState = "up";
            if (data.matchIdList.length < 10) {
                this._choseClubBg.height = 2 + 49 * data.matchIdList.length;
                this._matchScroller.height = 49 * data.matchIdList.length;
            }
            else {
                this._choseClubBg.height = 456;
                this._matchScroller.height = 454;
            }
            this._matchGroup.visible = false;
            this.updataMatchList();
            this.updataDetails((data ? data.curMath : null));
            if (data && data.matchIdList && data.matchIdList.length > 0) {
                switch (club.ClubData.getInstance().clubChoice) {
                    case 1:
                        this.detailsButton.selected = true;
                        break;
                    case 2:
                        this.memberButton.selected = true;
                        var cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                        cmd.matchId = this.selectMatchId;
                        NetMgr.tcpSend(cmd);
                        break;
                    case 4:
                        this.fightingButton.selected = true;
                        break;
                }
                this.switchWindow();
            }
            this.updataButtonEnabled();
        };
        /**更新按钮视图 */
        MatchManagePanel.prototype.updataButtonEnabled = function () {
            var bool = this.matchIdList && this.matchIdList.length > 0 ? true : false;
            this.detailsButton.enabled = this.memberButton.enabled
                = this.fightingButton.enabled = this.joinMatchButton.enabled = this.yelloListButton.enabled = bool;
            if (bool == false) {
                this.detailsGroup.visible = this.memberGroup.visible
                    = this.fightingGroup.visible = this.yelloListGroup.visible = bool;
            }
        };
        MatchManagePanel.prototype.initMemberList = function (evt) {
            var member = evt.param;
            member.whitelist = (member.whitelist && member.whitelist instanceof Array) ? member.whitelist : [];
            member.blacklist = (member.blacklist && member.blacklist instanceof Array) ? member.blacklist : [];
            member.guestlist = (member.guestlist && member.guestlist instanceof Array) ? member.guestlist : [];
            for (var _i = 0, _a = member.whitelist; _i < _a.length; _i++) {
                var item = _a[_i];
                item.type = 1;
            }
            for (var _b = 0, _c = member.blacklist; _b < _c.length; _b++) {
                var item = _c[_b];
                item.type = 2;
            }
            for (var _d = 0, _e = member.guestlist; _d < _e.length; _d++) {
                var item = _e[_d];
                item.type = 0;
            }
            this.member = member.whitelist.concat(member.blacklist);
            this.member = this.member.concat(member.guestlist);
            this.sortMemberList();
            this.updataMemeberList();
        };
        /**修改备注分数 成功更新成员列表数据 */
        MatchManagePanel.prototype.updateRemarkPoint = function (evt) {
            var pointData = evt.param;
            this.member.forEach(function (element) {
                if (element.uid == pointData.targetUid) {
                    element.remarkPoints[pointData.which] = pointData.point;
                }
            });
            this.updataMemeberList();
        };
        /**修改备注昵称 成功更新成员列表数据 */
        MatchManagePanel.prototype.updateRemarkNickName = function (evt) {
            var nickNameData = evt.param;
            this.member.forEach(function (element) {
                if (element.uid == nickNameData.targetUid) {
                    element.remark = nickNameData.remark;
                }
            });
            this.updataMemeberList();
        };
        /**更新清楚数据视图*/
        MatchManagePanel.prototype.updateWinPoint = function (evt) {
            var vo = evt.param;
            this.member.forEach(function (element) {
                if (element.uid == vo.targetUid) {
                    element.scores[vo.which - 1] = 0;
                    element.winNums[vo.which - 1] = 0;
                }
            });
            this.updataMemeberList();
        };
        MatchManagePanel.prototype.initYelloList = function (evt) {
            var yelloList = evt.param;
            yelloList.list = (yelloList.list && yelloList.list instanceof Array) ? yelloList.list : [];
            this.yelloIndoList = yelloList.list;
            this.updateYelloList();
        };
        MatchManagePanel.prototype.initHistory = function (history) {
            if (!history || history.matchId != this.selectMatchId) {
                return;
            }
        };
        MatchManagePanel.prototype.switchWindow = function () {
            this.detailsGroup.visible = this.memberGroup.visible = this.fightingGroup.visible = this.yelloListGroup.visible = false;
            this.setting.visible = true;
            if (this.detailsButton.selected) {
                this.detailsGroup.visible = true;
            }
            else if (this.memberButton.selected) {
                this.memberGroup.visible = true;
            }
            else if (this.fightingButton.selected) {
                this.fightingGroup.visible = true;
            }
            else if (this.yelloListButton.selected) {
                this.yelloListGroup.visible = true;
                this.setting.visible = false;
            }
        };
        /**
         * 显示输赢状态
         */
        MatchManagePanel.prototype.switchDayType = function () {
            this._dayTypeImg.source = "club_winlose" + club.ClubData.getInstance().clubDayChose;
            this._morewinloseGroup.visible = false;
        };
        MatchManagePanel.prototype.onClickTap = function (e) {
            if (e.target == this.detailsButton
                || e.target == this.memberButton
                || e.target == this.fightingButton
                || e.target == this.yelloListButton) {
                e.target.selected = true;
                this.switchWindow();
                if (e.target == this.detailsButton) {
                    this._choseDetailBtn.skin["_detailTxt"].text = "房间详情";
                    this._detailScroller.visible = false;
                    this._tableScroller.visible = true;
                    this._roomDetailGroup.visible = false;
                    this._tipTxt.visible = true;
                }
                if (e.target == this.memberButton) {
                    var cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this.selectMatchId;
                    NetMgr.tcpSend(cmd);
                }
                else if (e.target == this.yelloListButton) {
                    var self_1 = this;
                    var reqYelloList = new Cmd.RequestYellowMemberInfoMatchGroupCmd_C();
                    reqYelloList.matchId = this.selectMatchId;
                    NetMgr.tcpSend(reqYelloList);
                }
                else if (e.target == this.fightingButton) {
                    club.ClubSendMgr.getGameDataHistoryForMatch(club.ClubData.getInstance().matchid, 1, 1, club.ClubConst1.MATCH_HISTORY_FOR_MANAGE);
                    this._dayChose = 0;
                    this._clubDayChose = 1;
                    this._choseDayBtn.skin["_dayTypeText"].text = "今日战绩";
                }
            }
            else if (e.target == this.closeButton) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.terminationButton) {
                var self_2 = this;
                var okFunc = function () {
                    var cmd = new Cmd.OperateMatchGroupCmd_C();
                    if (self_2.terminationButton.currentState == "up")
                        cmd.state = 1;
                    else
                        cmd.state = 0;
                    cmd.matchId = self_2.selectMatchId;
                    NetMgr.tcpSend(cmd);
                };
                var info = "";
                if (this.terminationButton.currentState == "up") {
                    info = "您确定要暂停该老友圈吗？";
                }
                else {
                    info = "您确定要恢复该老友圈吗？";
                }
                ComponentUtil.getInstance().showConfirm(info, "温馨提示", "确定", okFunc, "取消");
                return;
            }
            else if (e.target == this.dissolutionButton) {
                var self_3 = this;
                var okFunc = function () {
                    var MatchId = self_3.selectMatchId;
                    if (MatchId == club.ClubData.getInstance().clubmatchid) {
                        club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    }
                    var cmd = new Cmd.RequestDeleteMatchGroupCmd_C();
                    cmd.matchId = self_3.selectMatchId;
                    NetMgr.tcpSend(cmd);
                    uniLib.Global.removeEventListener(club.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
                };
                ComponentUtil.getInstance().showConfirm("您确定要解散该老友圈吗？", "温馨提示", "确定", okFunc, "取消");
            }
            else if (e.target == this.shareButton) {
                this.onShareTap();
            }
            else if (e.target == this.addWhiteButton
                || e.target == this.addBlackButton) {
                var text = this.uidEditableText.text;
                var uid = Number(text);
                if (uid == NaN || !uid) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家账号");
                    return;
                }
                var cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                var reply = Number(e.target.name);
                cmd.reply = e.target == this.addWhiteButton ? 2 : 3;
                cmd.uid = uid;
                cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.joinMatchButton) {
                var req = new Cmd.EnterRoomCmd_C;
                req.roomId = this.matchIdList[this.matchList.selectedIndex];
                NetMgr.tcpSend(req);
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            else if (e.target == this.setting) {
                var req_1 = new Cmd.RequestChangeMatchGroupCmd_C();
                req_1.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(req_1);
            }
            else if (e.target == this.refrshBtn) {
                this.onMatchListTap(null);
            }
            else if (e.target == this._dayTypeBg || e.target == this._dayTypeDownImg || e.target == this._dayTypeImg) {
                this._morewinloseGroup.visible = true;
            }
            else if (e.target == this._todaywin || e.target == this._yesterdaywin || e.target == this._qianwin || e.target == this._winloseRect) {
                if (e.target == this._todaywin) {
                    club.ClubData.getInstance().clubDayChose = 1;
                }
                else if (e.target == this._yesterdaywin) {
                    club.ClubData.getInstance().clubDayChose = 2;
                }
                else if (e.target == this._qianwin) {
                    club.ClubData.getInstance().clubDayChose = 3;
                }
                this.switchDayType();
                this.sortMemberList();
                this.updataMemeberList();
            }
            else if (e.target == this._choseClubBtn || e.target == this._choseRect) {
                if (this._choseClubBtn.currentState == "up") {
                    this._choseClubBtn.currentState = "down";
                    this._matchGroup.visible = true;
                }
                else {
                    this._choseClubBtn.currentState = "up";
                    this._matchGroup.visible = false;
                }
            }
            else if (e.target == this._importBtn) {
                var req_2 = new Cmd.GetCanImportMemberListMatchGroupCmd_CS();
                req_2.matchId = club.ClubData.getInstance().matchid;
                NetMgr.tcpSend(req_2);
            }
            else if (e.target == this._deleteRecordBtn) {
                if (this.terminationButton.currentState == "up") {
                    uniLib.TipsUtils.showConfirm("暂停开房后可清除开房数！", "温馨提示", "确定", null);
                }
                else {
                    uniLib.TipsUtils.showConfirm("确定要将已开房数清零吗？", "", "确定", function () {
                        var req = new Cmd.ClearRecordMatchGroupCmd_CS();
                        req.matchId = club.ClubData.getInstance().matchid;
                        NetMgr.tcpSend(req);
                    }, "取消", null);
                }
            }
            else if (e.target == this._searchBtn) {
                if (this._searchIdText.text.length < 8) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家账号");
                    return;
                }
                var uidText_1 = this._searchIdText.text;
                var ClubMemberList = club.ClubData.getInstance().ClubMemberList;
                if (!Array.isArray(ClubMemberList)) {
                    return;
                }
                this.searchArray = [];
                this.searchArray = ClubMemberList.filter(function (a) {
                    return a.uid.toString().indexOf(uidText_1) != -1;
                });
                if (this.searchArray.length != 0) {
                    club.ClubModuleMgr.getInstance().showClubMemberInfoPanel(this.searchArray[0]);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("本老友圈不存在该玩家");
                }
            }
            else if (e.target == this.timerButton) {
                club.ClubModuleMgr.getInstance().showClubMemberTimerPanel();
            }
            else if (e.target == this._choseDayBtn) {
                this._choseDayBtn.currentState = "down";
                this._dayTypeGroup.visible = true;
            }
            else if (e.target == this._todayBtn) {
                this._clubDayChose = 1;
                this._choseDayBtn.skin["_dayTypeText"].text = "今日战绩";
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
                this.updateView();
            }
            else if (e.target == this._yesterdayBtn) {
                this._clubDayChose = 2;
                this._choseDayBtn.skin["_dayTypeText"].text = "昨日战绩";
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
                this.updateView();
            }
            else if (e.target == this._qianBtn) {
                this._clubDayChose = 3;
                this._choseDayBtn.skin["_dayTypeText"].text = "前日战绩";
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
                this.updateView();
            }
            else if (e.target == this._choseRect1) {
                this._choseDayBtn.currentState = "up";
                this._dayTypeGroup.visible = false;
            }
            else if (e.target == this._choseDetailBtn) {
                this._choseDetailBtn.currentState = "down";
                this._roomDetailGroup.visible = true;
            }
            else if (e.target == this._roomDetailRect) {
                this._choseDetailBtn.currentState = "up";
                this._roomDetailGroup.visible = false;
            }
            else if (e.target == this._roomTableBtn) {
                this._choseDetailBtn.skin["_detailTxt"].text = "房间详情";
                this._roomDetailGroup.visible = false;
                this._detailScroller.visible = false;
                this._tableScroller.visible = true;
                this._tipTxt.visible = true;
            }
            else if (e.target == this._roomInfoBtn) {
                this._choseDetailBtn.skin["_detailTxt"].text = "房间信息";
                this._roomDetailGroup.visible = false;
                this._detailScroller.visible = true;
                this._tableScroller.visible = false;
                this._tipTxt.visible = false;
            }
        }; /**接收数据 */
        MatchManagePanel.prototype.showFightData = function (evt) {
            var vo = evt.param;
            if (vo.typ) {
                this._matchId = vo.matchId;
                this._totalPage = vo.maxPage;
                this._curPage = vo.curPage;
                if (vo.matchStatisticInfo && vo.matchStatisticInfo.openNbrs) {
                    this.todaynum.text = "今日：" + vo.matchStatisticInfo.openNbrs[0];
                    this.yesterdaynum.text = "昨日：" + vo.matchStatisticInfo.openNbrs[1];
                    this.sevendaynum.text = "七日：" + vo.matchStatisticInfo.openNbrs[2];
                    this.thirtydaynum.text = "30日：" + vo.matchStatisticInfo.openNbrs[3];
                }
                if (vo.curPage == 1 && !vo.gameHistroys[0]) {
                    this._tipsText.visible = true;
                    if (this._dayChose != this._clubDayChose) {
                        this._dayChose = this._clubDayChose;
                        this._fightRecordArr = [];
                        if (this.fightingListArray) {
                            if (Array.isArray(this.fightingListArray.source)) {
                                this.fightingListArray.removeAll();
                            }
                            this.fightingListArray.replaceAll(this._fightRecordArr);
                        }
                    }
                }
                else {
                    this._tipsText.visible = false;
                    this.addData(vo.gameHistroys);
                }
            }
        };
        /**添加数据*/
        MatchManagePanel.prototype.addData = function (arr) {
            if (!arr || !arr[0]) {
                return;
            }
            if (this._dayChose == this._clubDayChose) {
                this._fightRecordArr = this._fightRecordArr.concat(arr);
            }
            else {
                this._dayChose = this._clubDayChose;
                this._fightRecordArr = [];
                this._fightRecordArr = this._fightRecordArr.concat(arr);
            }
            if (!this.fightingListArray) {
                this.fightingListArray = new eui.ArrayCollection(this._fightRecordArr);
                this.fightingList.dataProvider = this.fightingListArray;
            }
            else {
                if (Array.isArray(this.fightingListArray.source)) {
                    this.fightingListArray.removeAll();
                }
                this.fightingListArray.replaceAll(this._fightRecordArr);
                if (this._curPage == 1) {
                    this.fightingListArray.refresh();
                }
            }
        };
        /**点每日输赢更新数据 */
        MatchManagePanel.prototype.updateView = function () {
            if (this._dayChose != this._clubDayChose) {
                this.getData();
            }
        };
        /**获取战绩消息 */
        MatchManagePanel.prototype.getData = function () {
            if (this._clubDayChose == this._dayChose) {
                club.ClubSendMgr.getGameDataHistoryForMatch(club.ClubData.getInstance().matchid, this._curPage, this._clubDayChose, club.ClubConst1.MATCH_HISTORY_FOR_MANAGE);
                uniLib.TipsUtils.showTipsDownToUp("正在加载数据~");
            }
            else {
                club.ClubSendMgr.getGameDataHistoryForMatch(club.ClubData.getInstance().matchid, 1, this._clubDayChose, club.ClubConst1.MATCH_HISTORY_FOR_MANAGE);
            }
        };
        /**单独加 */
        MatchManagePanel.prototype.addListen = function () {
            this._scroll.addEventListener(egret.Event.CHANGE, this.checkTop, this);
        };
        /**滑到底加载其他页数据 */
        MatchManagePanel.prototype.checkTop = function (evt) {
            if (this._scroll.viewport.scrollV + this._scroll.viewport.height >= this._scroll.viewport.measuredHeight + 10) {
                if (this._curPage < this._totalPage) {
                    this._scroll.removeEventListener(egret.Event.CHANGE, this.checkTop, this);
                    this._curPage++;
                    this.getData();
                    egret.Tween.get(this).wait(2000).call(this.addListen, this); //2秒不返回继续可以请求
                }
            }
        };
        Object.defineProperty(MatchManagePanel.prototype, "selectMatchId", {
            get: function () {
                return this.matchIdList[this.matchList.selectedIndex];
            },
            enumerable: true,
            configurable: true
        });
        /**老友圈选项 选择老友圈 */
        MatchManagePanel.prototype.onMatchListTap = function (e) {
            var cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        /**房间详情 点击桌子 */
        MatchManagePanel.prototype.onTableListTap = function (e) {
            club.ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            var item = this.matchTableList.selectedItem;
            var cmd = new Cmd.ActiveDetailRoomCmd_C();
            cmd.roomId = item.roomId;
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        //截图分享
        MatchManagePanel.prototype.onShare = function () {
            var vo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            var tx = new egret.Bitmap(uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(this.memberGroup.x, this.memberGroup.y, this.memberGroup.width, this.memberGroup.height), 0.6));
            vo.shareImageData = uniLib.DisplayUtils.catchScreen(tx, new egret.Rectangle(this.memberGroup.x, this.memberGroup.y, this.memberGroup.width, this.memberGroup.height));
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        };
        MatchManagePanel.prototype.onShareTap = function () {
            var codeId = this.selectMatchId;
            var vo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                var nick = uniLib.UserInfo.nickName;
                if (nick.length > 8) {
                    nick = nick.slice(0, 8);
                }
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wq.laoyouwan.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            }
            else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "老友圈") : "";
            if (!uniLib.Global.isWxGame()) {
                vo.roomId = JSON.stringify({ "matchId": codeId });
            }
            else {
                vo.shareType = Cmd.ShareType.enterRoom;
                vo.wgShareData = JSON.stringify({ "roomId": codeId });
            }
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        };
        return MatchManagePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.MatchManagePanel = MatchManagePanel;
    __reflect(MatchManagePanel.prototype, "club.MatchManagePanel");
})(club || (club = {}));
var MatchTableInfoItem = (function (_super) {
    __extends(MatchTableInfoItem, _super);
    function MatchTableInfoItem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MatchTableInfoItemSkin";
        return _this;
    }
    MatchTableInfoItem.prototype.dataChanged = function () {
        this._info = this.data;
        this._tableNoText.text = String(this.itemIndex + 1);
        this._tableIdText.text = "桌号:" + this._info.roomId;
        if (!this._info.curGameNbr) {
            this._tableNum.text = "准备中";
        }
        else {
            this._tableNum.text = "局数：" + this._info.curGameNbr + "/" + this._info.gameNbr;
        }
        this._timeText.text = LobbyUtils.changeTimeToStr(this._info.beginTime);
        var item = this._info.list;
        this.nameandscore.itemRenderer = MatchInfotem;
        this.nameandscore.dataProvider = new eui.ArrayCollection(item);
    };
    return MatchTableInfoItem;
}(eui.ItemRenderer));
__reflect(MatchTableInfoItem.prototype, "MatchTableInfoItem");
/**玩家战绩单个信息 */
var MatchInfotem = (function (_super) {
    __extends(MatchInfotem, _super);
    function MatchInfotem() {
        var _this = _super.call(this) || this;
        _this.skinName = "MatchFightingNSSkin";
        return _this;
    }
    MatchInfotem.prototype.dataChanged = function () {
        this.info = this.data;
        this.names.text = this.info.nickname;
        if (this.info.score != null) {
            this.score.text = this.info.score + "";
            if (this.info.score < 0) {
                this.score.textColor = 0x0c7113;
            }
        }
    };
    return MatchInfotem;
}(eui.ItemRenderer));
__reflect(MatchInfotem.prototype, "MatchInfotem");
var club;
(function (club) {
    /**
     * 成员列表item
     */
    var MatchMemberItem = (function (_super) {
        __extends(MatchMemberItem, _super);
        function MatchMemberItem() {
            var _this = _super.call(this) || this;
            /**操作显示 */
            _this.MatchMemberTypeToString = ["游客", "白名单", "黑名单", "同桌限制", "VIP"];
            /**操作显示颜色 */
            _this.MatchMemberTypeToColor = [0x486d42, 0x48FF00, 0xcb2424, 0xba6901, 0xF4C775];
            _this.skinName = "MatchMemberItemSkin";
            _this.addListener();
            return _this;
        }
        MatchMemberItem.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        MatchMemberItem.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        MatchMemberItem.prototype.dataChanged = function () {
            this.info = this.data;
            if (!this.info)
                return;
            var index = club.ClubData.getInstance().clubDayChose - 1;
            this._winNumText.text = this.info.winNums[index].toString();
            this._nametext.text = this.info.nickname;
            this._uidText.text = this.info.uid.toString();
            this._remarksText.text = this.info.remark ? this.info.remark : "暂无备注";
            this._winloseText.text = this.info.scores[index] + "(" + this.info.remarkPoints[index] + ")";
            if (this.info.remarkPoints[index] != 0) {
                this._cleanRemarksBtn.visible = true;
                this._writeRemarksbtn.visible = false;
            }
            else {
                this._cleanRemarksBtn.visible = false;
                this._writeRemarksbtn.visible = true;
            }
            this.operationGroup.removeChildren();
            //显示操作
            for (var i = 0; i < 4; i++) {
                if (i == this.info.type)
                    continue;
                var label = new eui.Label();
                var textColor = this.MatchMemberTypeToColor[i];
                label.textFlow = [{ text: this.MatchMemberTypeToString[i], style: { textColor: textColor, underline: true } }];
                label.size = 22;
                label.name = i + "";
                this.operationGroup.addChild(label);
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTap, this);
            }
        };
        MatchMemberItem.prototype.onClickTap = function (e) {
            var _this = this;
            switch (e.target) {
                case this._detailBtn:
                    club.ClubModuleMgr.getInstance().showClubMemberInfoPanel(this.info);
                    break;
                case this._cleanRemarksBtn:
                    uniLib.TipsUtils.showConfirm("是否清除备注分数？", "", "是", function () {
                        club.ClubSendMgr.RemarkPointMatchGroupCmd(club.ClubData.getInstance().matchid, _this.info.uid, 2, 0, club.ClubData.getInstance().clubDayChose - 1);
                    }, "否", null);
                    break;
                case this._writeRemarksbtn:
                    club.ClubModuleMgr.getInstance().showClubRemarksScorePanel(this.info.uid);
                    break;
            }
        };
        MatchMemberItem.prototype.onLabelTap = function (e) {
            var data = this.data;
            var reply = Number(e.target.name);
            if (reply == 3) {
                var inputPanel = new club.MatchAddYelloPanel(club.MatchManagePanel.Instanc.selectMatchId, data.uid);
                uniLib.PopUpMgr.addPopUp(inputPanel, null, true, true);
                return;
            }
            //2 变成白名单， 3 变为黑名单
            var cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
            cmd.reply = (reply == 1 || reply == 2) ? reply + 1 : 0;
            cmd.uid = data.uid;
            cmd.matchId = club.MatchManagePanel.Instanc.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        return MatchMemberItem;
    }(eui.ItemRenderer));
    club.MatchMemberItem = MatchMemberItem;
    __reflect(MatchMemberItem.prototype, "club.MatchMemberItem");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 消息列表item
     */
    var MatchMessageItem = (function (_super) {
        __extends(MatchMessageItem, _super);
        function MatchMessageItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchMessageItemSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onClickTap, _this);
            return _this;
        }
        MatchMessageItem.prototype.dataChanged = function () {
            var data = this.data;
            this._timeText.text = LobbyUtils.changeTimeToStrTwoLine(data.time);
            this._headImg.source = data.headUrl;
            this._nameText.text = data.nickname;
            this._idText.text = data.uid + "";
            if (data.partner) {
                this._partnerGroup.visible = true;
                this._nopartnerTips.visible = false;
                this._partnerHeadImg.source = data.partner.headUrl;
                this._partnerIdText.text = "" + data.partner.uid;
                this._partnerNameText.text = data.partner.nickname;
            }
            else {
                this._nopartnerTips.visible = true;
                this._partnerGroup.visible = false;
            }
            if (data.note) {
                this._contenRemarksText.text = "备注：" + data.note + "";
            }
            else {
                this._contenRemarksText.text = "备注：无";
            }
        };
        MatchMessageItem.prototype.onClickTap = function (e) {
            var data = this.data;
            switch (e.target) {
                case this._disAgreeButton:
                    club.ClubSendMgr.ReplyJoinMemberListMatchGroupCmd(club.ClubData.getInstance().clubmatchid, 0, data.uid);
                    break;
                case this._agreeButton:
                    club.ClubSendMgr.ReplyJoinMemberListMatchGroupCmd(club.ClubData.getInstance().clubmatchid, 1, data.uid);
                    break;
            }
        };
        return MatchMessageItem;
    }(eui.ItemRenderer));
    club.MatchMessageItem = MatchMessageItem;
    __reflect(MatchMessageItem.prototype, "club.MatchMessageItem");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 游戏列表
     */
    var MatchRadioButton = (function (_super) {
        __extends(MatchRadioButton, _super);
        function MatchRadioButton() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchRadioButtonSkin";
            return _this;
        }
        MatchRadioButton.prototype.dataChanged = function () {
            var data = this.data;
            this._clubId.text = data + "";
            if (this.itemIndex % 2 == 0) {
                this._itemBg.source = "club_new_menage_json.club_matchlist_item2";
            }
            else {
                this._itemBg.source = "club_new_menage_json.club_matchlist_item1";
            }
        };
        return MatchRadioButton;
    }(eui.ItemRenderer));
    club.MatchRadioButton = MatchRadioButton;
    __reflect(MatchRadioButton.prototype, "club.MatchRadioButton");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 每个匹配场中的桌子
     */
    var MatchTableItem = (function (_super) {
        __extends(MatchTableItem, _super);
        function MatchTableItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchTableItemSkin";
            return _this;
        }
        MatchTableItem.prototype.dataChanged = function () {
            this.info = this.data;
            var member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
            var text = "桌" + this.info.roomId + "\n";
            if (this.info.endTime != undefined) {
                text += "(牌局结束)";
            }
            else {
                if (!this.info.state) {
                    text += "(准备中)";
                }
                else if (this.info.state == 1) {
                    text += "(游戏" + this.info.curGameNbr + "/" + this.info.gameNbr + ")";
                }
            }
            text += "\n人数" + member + "/" + this.info.userNbr;
            this.contentLabel.text = text;
        };
        return MatchTableItem;
    }(eui.ItemRenderer));
    club.MatchTableItem = MatchTableItem;
    __reflect(MatchTableItem.prototype, "club.MatchTableItem");
})(club || (club = {}));
var club;
(function (club) {
    /**黄名单 */
    var MatchYelloItem = (function (_super) {
        __extends(MatchYelloItem, _super);
        function MatchYelloItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchYelloItemSkin";
            _this._removeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.removeHandel, _this);
            return _this;
        }
        MatchYelloItem.prototype.dataChanged = function () {
            var data = this.data;
            if (!data)
                return;
            this._nameText.text = data.nickName ? data.nickName.toString() : "";
            this._uidText.text = data.uid ? data.uid.toString() : "";
            this._nameText1.text = data.nickName2 ? data.nickName2.toString() : "";
            this._uidText1.text = data.uid2 ? data.uid2.toString() : "";
        };
        /**移除黄名单 */
        MatchYelloItem.prototype.removeHandel = function (e) {
            var req = new Cmd.OperateYellowMemberListMatchGroupCmd_C();
            req.reply = 0;
            req.uid = Number(this._uidText.text);
            req.uid2 = Number(this._uidText1.text);
            req.matchId = club.MatchManagePanel.Instanc.selectMatchId;
            NetMgr.tcpSend(req);
        };
        return MatchYelloItem;
    }(eui.ItemRenderer));
    club.MatchYelloItem = MatchYelloItem;
    __reflect(MatchYelloItem.prototype, "club.MatchYelloItem");
})(club || (club = {}));
