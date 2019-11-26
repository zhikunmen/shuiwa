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
(function (club_1) {
    /**
     * 老友圈成员列表界面
     */
    var ClubPlayerListPanel = (function (_super) {
        __extends(ClubPlayerListPanel, _super);
        function ClubPlayerListPanel() {
            var _this = _super.call(this, "mjl_club_list_title_png", 1230, 703) || this;
            _this._list = [];
            _this.skinName = "ClubPlayerListSkin";
            return _this;
        }
        ClubPlayerListPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        /**事件监听 */
        ClubPlayerListPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club_1.ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.headList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubPlayerListPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(club_1.ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.headList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubPlayerListPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        ClubPlayerListPanel.prototype.showList = function (evt) {
            var member = evt.param;
            this._list = member.whitelist;
            this._matchId = member.matchId;
            if (Array.isArray(this._list)) {
                this.headList.itemRenderer = club_1.ClubPlayerListHeadPanel;
                this.headList.dataProvider = new eui.ArrayCollection(this._list);
            }
        };
        ClubPlayerListPanel.prototype.itemTap = function (evt) {
            var item = this.headList.selectedItem;
            var seq = new Cmd.UserInfoSearchLobbyCmd_C;
            seq.uid = item.uid;
            NetMgr.tcpSend(seq);
        };
        ClubPlayerListPanel.prototype.onClick = function (evt) {
            if (evt.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
            else if (evt.target == this.breakBtn) {
                var club_2 = this;
                var okFunc = function () {
                    var cmd = new Cmd.LeaveMatchGroup2Cmd_C();
                    cmd.matchId = club_2._matchId;
                    NetMgr.tcpSend(cmd);
                    club_2.removePop();
                    // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
                    club_1.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    club_1.ClubModuleMgr.getInstance().showAllClubListPanel(function () {
                        var cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        cmd.isClub = 1;
                        NetMgr.tcpSend(cmd);
                    });
                };
                ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
            }
        };
        return ClubPlayerListPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club_1.ClubPlayerListPanel = ClubPlayerListPanel;
    __reflect(ClubPlayerListPanel.prototype, "club.ClubPlayerListPanel");
})(club || (club = {}));
var club;
(function (club) {
    var ClubConst = (function () {
        function ClubConst() {
        }
        ClubConst.RES_JSON = "resource/club/club.res_71750b4c.json";
        ClubConst.RES_JSON_GUANGDONG = "resource/club_guangdong.res.json";
        ClubConst.THM_JSON = "resource/club/gameEui_b48aecd3.json";
        /**
         * 公共loading需要加载的资源组
         */
        ClubConst.PUB_CLUB = "pub_club";
        /** */
        ClubConst.ActiveDetailRoom = "ActiveDetailRoom";
        /**历史匹配记录 */
        ClubConst.HistoryMatchIdList = "HistoryMatchIdList";
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
        return ClubConst;
    }());
    club.ClubConst = ClubConst;
    __reflect(ClubConst.prototype, "club.ClubConst");
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
        // if (rev.isClub == 1) {
        // 	LobbyModuleMgr.getInstance().showAllClubListPanel();
        // lobbyDispatch(CmdConstant.ReturnMatchGroupList, rev);
        // } else {
        clubDispatch(club.ClubConst.HistoryMatchIdList, rev);
        // }
    }
    Cmd.OnHistoryMatchIdListMatchGroupCmd_S = OnHistoryMatchIdListMatchGroupCmd_S;
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
                    club.ClubModuleMgr.getInstance().showAllClubListPanel(function () {
                        var cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        cmd.isClub = 1;
                        NetMgr.tcpSend(cmd);
                    });
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
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev) {
        clubDispatch(club.ClubConst.MemberInfoMatchGroup, rev);
    }
    Cmd.OnReturnMemberInfoMatchGroupCmd_S = OnReturnMemberInfoMatchGroupCmd_S;
    /**返回查找个人信息 */
    function OnUserInfoSearchLobbyCmd_S(rev) {
        if (rev.resultCode && rev.resultCode == 2) {
            uniLib.TipsUtils.showTipsDownToUp("操作太频繁，请稍后重试！");
        }
        else {
            club.ClubModuleMgr.getInstance().showClubUserInfoPanel(function () {
                clubDispatch(club.ClubConst.UserInfoSearchLobby, rev);
            });
        }
    }
    Cmd.OnUserInfoSearchLobbyCmd_S = OnUserInfoSearchLobbyCmd_S;
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
        /**老友圈列表界面 */
        ClubModuleMgr.prototype.showAllClubListPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubAllBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
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
        /**删除老友圈管理员界面单个房间详情 */
        ClubModuleMgr.prototype.removeActiveDetailRoomtPanel = function () {
            if (this._activeRoomInformationPanel) {
                uniLib.PopUpMgr.removePopUp(this._activeRoomInformationPanel);
                this._activeRoomInformationPanel = null;
            }
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
        /**老友圈成员列表界面 */
        ClubModuleMgr.prototype.showClubPlayerListPanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(club.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubPlayerListPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
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
        ClubModuleMgr.prototype.showClubUserInfoPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_USERINFO, function () {
                uniLib.PopUpMgr.addPopUp(club.ClubUserInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
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
        /**
         * 房主请求老友圈信息
         */
        ClubSendMgr.requestRequestMatchGroupCmd = function (matchId) {
            var req = new Cmd.RequestMatchGroupCmd_C();
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
            if (e.currentTarget == this.cancelBtn) {
                this.removePop();
            }
            else if (e.currentTarget == this.dissolveBtn) {
                var req = new Cmd.ActiveDissolveRoomCmd_C();
                req.roomId = this._activeRoomListOb.roomId;
                req.matchId = this._activeRoomListOb.matchId;
                NetMgr.tcpSend(req);
                this.removePop();
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
    /**老友圈所有房间面板 */
    var ClubAllBoxPanel = (function (_super) {
        __extends(ClubAllBoxPanel, _super);
        function ClubAllBoxPanel() {
            var _this = _super.call(this, "mjl_club_title_png", 1150, 650) || this;
            _this.skinName = "ClubAllBoxSkin";
            return _this;
        }
        ClubAllBoxPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubAllBoxPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            uniLib.Global.removeEventListener(club.ClubConst.HistoryMatchIdList, this.setData, this);
        };
        ClubAllBoxPanel.prototype.initUI = function () {
            this.msgImg2.visible = true;
            this.boxList.useVirtualLayout = false;
            uniLib.Global.addEventListener(club.ClubConst.HistoryMatchIdList, this.setData, this);
        };
        ClubAllBoxPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            // this.boxList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubAllBoxPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            // this.boxList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubAllBoxPanel.prototype.setData = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            if (date.list.length >= 1) {
                this.msgImg2.visible = false;
            }
            else {
                this.msgImg2.visible = true;
            }
            this._clubList = date.list;
            for (var i = 0; i < this._clubList.length; i++) {
                this._clubList[i].index = i + 1;
            }
            this.boxList.itemRenderer = club.ClubBoxItem;
            this.boxList.dataProvider = new eui.ArrayCollection(this._clubList);
        };
        ClubAllBoxPanel.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
            else if (e.target == this.createBtn) {
                _super.prototype.removePop.call(this);
                // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                club.ClubModuleMgr.getInstance().showCreateClubPanel();
            }
            else if (e.target == this.joinBtn) {
                _super.prototype.removePop.call(this);
                // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                LobbyModuleMgr.getInstance().showJoinRoomPanel(function () {
                    var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    NetMgr.tcpSend(req);
                });
            }
        };
        return ClubAllBoxPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubAllBoxPanel = ClubAllBoxPanel;
    __reflect(ClubAllBoxPanel.prototype, "club.ClubAllBoxPanel");
})(club || (club = {}));
var club;
(function (club_3) {
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
                this.bg.source = "mjl_club_my_png";
            }
            if (this.info.noHandle && this.info.noHandle == 1) {
                this.addRedPoint();
            }
        };
        ClubBoxItem.prototype.onClickTap = function (e) {
            if (e.target == this.inBtn) {
                club_3.ClubModuleMgr.getInstance().removeClubDeskPanel();
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = this.info.matchId;
                cmd.isClub = 1;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(club_3.ClubAllBoxPanel);
            }
            else if (e.target == this.outBtn) {
                var club_4 = this;
                var okFunc = function () {
                    var cmd = new Cmd.LeaveMatchGroup2Cmd_C();
                    cmd.matchId = club_4.info.matchId;
                    if (club_3.ClubData.getInstance().clubmatchid == club_4.info.matchId) {
                        // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);s
                        club_3.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    }
                    NetMgr.tcpSend(cmd);
                    var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    req.isClub = 1;
                    NetMgr.tcpSend(req);
                };
                ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
            }
            else if (e.target == this.bg) {
                // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
                club_3.ClubModuleMgr.getInstance().removeClubDeskPanel();
                // ClubModuleMgr.getInstance().showClubDeskPanel();
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = this.info.matchId;
                cmd.isClub = 1;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(club_3.ClubAllBoxPanel);
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
    club_3.ClubBoxItem = ClubBoxItem;
    __reflect(ClubBoxItem.prototype, "club.ClubBoxItem");
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
            _this.skinName = club.ClubData.getInstance().clubStyle == club.CLUBSTYLE.ZHANGZHOU ? "ClubDeskSkin" : "gd_ClubDeskSkin";
            return _this;
        }
        ClubDeskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubDeskPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.destroyTimer();
        };
        ClubDeskPanel.prototype.initUI = function () {
            if (club.ClubData.getInstance().clubRefresh == 1) {
                this._ztimer = new egret.Timer(5000, 0);
                this._ztimer.start();
            }
            this.scratchBtn.visible = Boolean(club.ClubData.getInstance().isShowScratch);
        };
        ClubDeskPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(club.ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(club.ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.addEventListener(club.ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._ztimer && this._ztimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        };
        ClubDeskPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.removeEventListener(club.ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.removeEventListener(club.ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubDeskPanel.prototype.destroyTimer = function () {
            if (this._ztimer) {
                this._ztimer && this._ztimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this._ztimer.stop();
                this._ztimer = null;
            }
        };
        ClubDeskPanel.prototype.setDate = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            this._curMath = date.curMath;
            /**
             * 判断是否有老友圈，没得话关闭桌面
             */
            if (this._curMath) {
                /**
                 * 记录当前老友圈id
                */
                club.ClubData.getInstance().clubmatchid = this._curMath.matchId;
                this.title.text = this._curMath.matchName ? this._curMath.matchName : this._curMath.matchId.toString();
                this.gameplay.text = this._curMath.gameName;
                this.play.text = "老友圈号:" + this._curMath.matchId;
                this.play.touchEnabled = true;
                this.play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyid, this);
                this._deskList = date.curMath.roomList;
                var list = [];
                if (Array.isArray(this._deskList))
                    list = this._deskList.concat();
                if (club.ClubData.getInstance().clubStyle == club.CLUBSTYLE.ZHANGZHOU) {
                    var info = new Cmd.MathGroupRoomInfo();
                    info.state = 9; //漳州类型 第一个按钮显示加入房间使用
                    list.unshift(info);
                }
                if (list.length < 8) {
                    var listlength = list.length;
                    for (var i = 0; i < 8 - listlength; i++) {
                        var infozz = new Cmd.MathGroupRoomInfo();
                        infozz.state = 8;
                        list.push(infozz);
                    }
                }
                this.deskList.itemRenderer = club.ClubItemDesk;
                this.deskList.dataProvider = new eui.ArrayCollection(list);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.destroyTimer();
                this.removePop();
            }
        };
        ClubDeskPanel.prototype.updatedesklist = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            this._curMathlist = date.curMath;
            if (this._curMathlist) {
                /**
                 * 记录当前老友圈id
                */
                this._deskList = this._curMathlist.roomList;
                var list = [];
                if (Array.isArray(this._deskList))
                    list = this._deskList.concat();
                var info = new Cmd.MathGroupRoomInfo();
                info.state = 9;
                list.unshift(info);
                if (list.length < 8) {
                    var listlength = list.length;
                    for (var i = 0; i < 8 - listlength; i++) {
                        var infozz = new Cmd.MathGroupRoomInfo();
                        infozz.state = 8;
                        list.push(infozz);
                    }
                }
                this.deskList.itemRenderer = club.ClubItemDesk;
                this.deskList.dataProvider = new eui.ArrayCollection(list);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.destroyTimer();
                this.removePop();
            }
        };
        /**断线重连 重新发协议 */
        ClubDeskPanel.prototype.onSendmsg = function () {
            club.ClubSendMgr.requestMatchData(1);
        };
        ClubDeskPanel.prototype.timerFunc = function (event) {
            if (club.ClubData.getInstance().clubRefresh == 1) {
                club.ClubSendMgr.requestMatchData(1);
            }
        };
        ClubDeskPanel.prototype.showRedPoint = function (evt) {
            var joinMember = evt.param;
            this.joinMember = [];
            if (joinMember && joinMember.list && joinMember.list instanceof Array)
                this.joinMember = joinMember.list;
            if (this.joinMember && this.joinMember.length > 0) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
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
            var redPoint = this.skin["redPoint"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        ClubDeskPanel.prototype.removeRedPoint = function () {
            var redPoint = this.skin["redPoint"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        };
        ClubDeskPanel.prototype.copyid = function (e) {
            uniLib.ZQGameSdk.nativeCopyStr(this.play.text);
            uniLib.TipsUtils.showTipsDownToUp("复制成功" + this.play.text);
        };
        ClubDeskPanel.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                this.destroyTimer();
                // this.removePop();
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            else if (e.target == this.fastEnterBtn) {
                this.destroyTimer();
                // this.removePop();
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                var req = new Cmd.EnterRoomCmd_C;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this.createBtn) {
                // this.removePop();
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                club.ClubModuleMgr.getInstance().showCreateClubPanel();
            }
            else if (e.target == this.swtichBtn) {
                // this.destroyTimer();
                // this.removePop();
                club.ClubModuleMgr.getInstance().showAllClubListPanel(function () {
                    var cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    cmd.isClub = 1;
                    NetMgr.tcpSend(cmd);
                });
            }
            else if (e.target == this.shareBtn) {
                this.onShareTap();
            }
            else if (e.target == this.applyListBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    club.ClubData.getInstance().clubChoice = 3;
                    club.ClubModuleMgr.getInstance().showClubManagePanel();
                    club.ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            }
            else if (e.target == this.memberListBtn) {
                club.ClubModuleMgr.getInstance().showClubPlayerListPanel();
                var cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                cmd.matchId = this._curMath.matchId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.queryFightingBtn) {
                // if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                //     MJLobbyData.getInstance().clubChoice = 4;
                //     // this.destroyTimer();
                //     ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                //     ClubModuleMgr.getInstance().showClubManagePanel();
                // } else {
                //     uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                // }
                LobbyModuleMgr.getInstance().showRecordPanel();
            }
            else if (e.target == this.boxManageBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    club.ClubData.getInstance().clubChoice = 1;
                    club.ClubModuleMgr.getInstance().showClubManagePanel();
                    club.ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            }
            else if (e.target == this.noticeBtn) {
                var cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                cmd.matchId = this._curMath.matchId;
                NetMgr.tcpSend(cmd);
                club.ClubModuleMgr.getInstance().showClubNoticePanel();
            }
            else if (e.target == this.scratchBtn) {
                var req = new Cmd.IntoScratchTicketLobbyCmd_C();
                NetMgr.tcpSend(req);
            }
        };
        ClubDeskPanel.prototype.onShareTap = function () {
            var codeId = this._curMath.matchId;
            this.shareInfo = this._curMath ? this._curMath.shareInfo : null;
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
        ClubDeskPanel.prototype.itemTap = function (evt) {
            if (evt.itemIndex == 0) {
                this._ztimer && this._ztimer.stop();
                // this.removePop();
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
                var req = new Cmd.EnterRoomCmd_C;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            }
            else {
                this.showClubRoomdetails();
                if (this.clubRoomdetails) {
                    this.clubRoomdetails.setDate(this._curMath);
                    if (evt.itemIndex != 0) {
                        var item = this.deskList.selectedItem;
                        this.clubRoomdetails.setUserDate(item);
                    }
                }
            }
        };
        ClubDeskPanel.prototype.showClubRoomdetails = function () {
            // if (this.clubRoomdetails == null) {
            this.clubRoomdetails = new club.ClubRoomdetails();
            this.clubRoomdetails.addEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
            uniLib.PopUpMgr.addPopUp(this.clubRoomdetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            // }
        };
        ClubDeskPanel.prototype.removeClubRoomdetails = function () {
            if (this.clubRoomdetails) {
                this.clubRoomdetails.removeEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
                uniLib.PopUpMgr.removePopUp(this.clubRoomdetails);
                // this.clubRoomdetails.removeListener();
                this.clubRoomdetails = null;
            }
        };
        ClubDeskPanel.prototype.removeTimer = function () {
            this._ztimer && this._ztimer.stop();
            club.ClubModuleMgr.getInstance().removeClubDeskPanel();
            this.removeClubRoomdetails();
        };
        return ClubDeskPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.ClubDeskPanel = ClubDeskPanel;
    __reflect(ClubDeskPanel.prototype, "club.ClubDeskPanel");
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
     * 每个老友圈中的桌子
     */
    var ClubItemDesk = (function (_super) {
        __extends(ClubItemDesk, _super);
        function ClubItemDesk() {
            var _this = _super.call(this) || this;
            _this.skinName = club.ClubData.getInstance().clubStyle == club.CLUBSTYLE.ZHANGZHOU ? "ClubItemDeskSkin" : "gd_ClubItemDeskSkin";
            return _this;
        }
        ClubItemDesk.prototype.dataChanged = function () {
            this.info = this.data;
            var style = club.ClubData.getInstance().clubStyle;
            if (this.info.state && this.info.state == 9) {
                if (!style) {
                    this.createGroup.visible = true;
                    this.deskGroup.visible = false;
                }
                else {
                    this.personTxet.visible = this.state.visible = this.head.visible = this.gamesNumberText.visible = false;
                }
            }
            else if (this.info.state && this.info.state == 8) {
                style == club.CLUBSTYLE.ZHANGZHOU && (this.createGroup.visible = false);
                this.deskGroup.visible = true;
                this.personTxet.visible = this.state.visible = this.head.visible = this.gamesNumberText.visible = false;
            }
            else {
                style == club.CLUBSTYLE.ZHANGZHOU && (this.createGroup.visible = false);
                this.deskGroup.visible = true;
                this.gamesNumberText.visible = false;
                var member = (this.info.list == null || !Array.isArray(this.info.list)) ? 0 : this.info.list.length;
                this.personTxet.text = member + "/" + this.info.userNbr;
                if (this.info.list && Array.isArray(this.info.list)) {
                    for (var i = 0; i < this.info.list.length; i++) {
                        if (i == 4) {
                            break;
                        }
                        this["headbg" + (i + 1)].visible = true;
                        this["headbg" + (i + 1)].source = this.info.list[i].headUrl;
                        style == club.CLUBSTYLE.GUANGDONG && (this["kuang" + (i + 1)].visible = true);
                    }
                }
                if (!this.info.state) {
                    this.state.source = "club_waiting";
                }
                else if (this.info.state == 1) {
                    this.state.source = "club_ingame";
                    this.state.y -= 15;
                    this.head.y -= 10;
                    this.personTxet.y -= 10;
                    this.gamesNumberText.visible = true;
                    this.gamesNumberText.text = "第" + this.info.curGameNbr + "/" + this.info.gameNbr + "局";
                    if (this.info.gameNbr >= 49) {
                        this.gamesNumberText.text = "第" + this.info.curGameNbr + "局";
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
    /**
     * 老友圈公告界面
     */
    var ClubNoticePanel = (function (_super) {
        __extends(ClubNoticePanel, _super);
        function ClubNoticePanel() {
            var _this = _super.call(this, "club_notice_title", 700, 478) || this;
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
                // this.modifyBtn.visible = false;
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
    /**
    * 单个房间详情 玩家头像
    */
    var ClubPlayerListHeadPanel = (function (_super) {
        __extends(ClubPlayerListHeadPanel, _super);
        function ClubPlayerListHeadPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPlayerListHeadSkin";
            _this.ownerImg.visible = false;
            _this.adminImg.visible = false;
            return _this;
        }
        ClubPlayerListHeadPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this.headImg.source = this.info.headUrl;
            if (this.info.membertype == 1) {
                this.ownerImg.visible = true;
            }
            if (this.info.membertype == 2) {
                this.adminImg.visible = true;
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
            this.nameTxt.text = name + wei;
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
    var ClubData = (function () {
        function ClubData() {
            /**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
            this.clubDayChose = 1;
            /**默认服务器刷新俱乐部数据  1为5秒前端发送请求数据 */
            this.clubRefresh = 0;
            /**俱乐部风格 默认漳州风格 */
            this.clubStyle = CLUBSTYLE.ZHANGZHOU;
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
 * 单个房间详情
 */
    var ClubRoomdetails = (function (_super) {
        __extends(ClubRoomdetails, _super);
        function ClubRoomdetails() {
            var _this = _super.call(this, "mjl_club_roomdetail_title", 800, 503) || this;
            _this._head = [];
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
            this.gameText.text = this.info.gameName;
            //  MJLobbyData.getInstance().getGameCreateConfig(this.info.gameId).gameName;
            this.gnumberText.text = this.info.gameNbr.toString() + "局";
            if (this.info.gameNbr >= 49) {
                this.gnumberText.text = Math.round(this.info.gameNbr) + "课";
            }
            if (this.info.gameId == 4182) {
                this.gnumberText.text = Math.round(this.info.gameNbr) + "锅底";
            }
            this.playText.text = this.info.playTypeDesc;
            this.pnumberText.text = "0/" + this.info.userNbr;
        };
        ClubRoomdetails.prototype.setUserDate = function (userDate) {
            if (!userDate)
                return;
            this.userInfo = userDate;
            this._head = userDate.list;
            if (Array.isArray(this._head)) {
                this.headList.itemRenderer = club.ClubRoomdetailshead;
                this.headList.dataProvider = new eui.ArrayCollection(this._head);
                this.gnumberText.text = this.userInfo.gameNbr.toString() + "局";
                if (this.info.gameNbr >= 49) {
                    this.gnumberText.text = Math.round(this.info.gameNbr) + "课";
                }
                if (this.info.gameId == 4182) {
                    this.gnumberText.text = Math.round(this.info.gameNbr) + "锅底";
                }
                this.pnumberText.text = this._head.length + "/" + this.userInfo.userNbr;
                if (this.userInfo.playTypeDesc) {
                    this.playText.text = this.userInfo.playTypeDesc;
                }
                if (this.userInfo.userNbr == this._head.length) {
                    this.enterRoomBtn.visible = false;
                }
            }
        };
        ClubRoomdetails.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
            else if (e.target == this.enterRoomBtn) {
                this.dispatchEventWith(ClubUIEventConst.JOIN_CLUBROOM);
                var req = new Cmd.EnterRoomCmd_C;
                if (this.userInfo.roomId) {
                    req.preBestRoomId = this.userInfo.roomId;
                }
                else {
                    req.preBestRoomId = 0;
                }
                req.roomId = this.info.matchId;
                NetMgr.tcpSend(req);
                _super.prototype.removePop.call(this);
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
            this.head.source = this.info.headUrl;
        };
        return ClubRoomdetailshead;
    }(eui.ItemRenderer));
    club.ClubRoomdetailshead = ClubRoomdetailshead;
    __reflect(ClubRoomdetailshead.prototype, "club.ClubRoomdetailshead");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 查看玩家个人信息面板
     */
    var ClubUserInfoPanel = (function (_super) {
        __extends(ClubUserInfoPanel, _super);
        function ClubUserInfoPanel() {
            var _this = _super.call(this, "mjl_user_title", 700, 318) || this;
            _this.skinName = "ClubUserInfoSkin";
            _this.womanImg.visible = false;
            _this.manImg.visible = false;
            return _this;
        }
        ClubUserInfoPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubUserInfoPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(club.ClubConst.UserInfoSearchLobby, this.setdata, this);
        };
        ClubUserInfoPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(club.ClubConst.UserInfoSearchLobby, this.setdata, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubUserInfoPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        ClubUserInfoPanel.prototype.setdata = function (evt) {
            var data = evt.param;
            if (data.userInfo) {
                this.info = data.userInfo;
                this.headImg.source = this.info.headUrl;
                this.nameTxt.text = this.info.nickName;
                this.ipTxt.text = "地址：" + this.info.ip;
                this.idTxt.text = "账号：" + this.info.uid + "";
                if (this.info.gender == "男") {
                    this.manImg.visible = true;
                }
                else {
                    this.womanImg.visible = true;
                }
            }
        };
        ClubUserInfoPanel.prototype.onClick = function (evt) {
            if (evt.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
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
        CreateMatchSetPanel.prototype.showMatchData = function (data) {
            if (data == null)
                return;
            this._userIdInput.text = data.otherManagerId != null ? data.otherManagerId + "" : "";
            this._clubNameInput.text = data.matchName != null ? data.matchName : "";
            this._permissionCheck.selected = data.needAgree != null && data.needAgree == 1 ? true : false;
            this._checkType = this._permissionCheck.selected;
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
            if (this._clubNameInput) {
                req.matchName = this._clubNameInput.text;
            }
            if (this._userIdInput) {
                req.otherManagerId = (Number)(this._userIdInput.text);
            }
            NetMgr.tcpSend(req);
            uniLib.PopUpMgr.removePopUp(this);
        };
        //确认修改按钮
        CreateMatchSetPanel.prototype.settingHandel = function () {
            var req = new Cmd.ChangeMatchGroupCmd_C();
            req.needAgree = this._permissionCheck.selected ? 1 : 0;
            req.matchId = this._changeMatchId != null ? this._changeMatchId : 0;
            if (this._clubNameInput) {
                req.matchName = this._clubNameInput.text;
            }
            if (this._userIdInput) {
                req.otherManagerId = (Number)(this._userIdInput.text);
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
                }
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
                return "黄名单";
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
            return _this;
        }
        MatchFightingItem.prototype.dataChanged = function () {
            var data = this.data;
            this.tableNoLabel.text = (this.itemIndex + 1) + "";
            this.tableIdLabel.text = "桌号" + data.roomId + "";
            this.timeLabel.text = LobbyUtils.changeTimeToStr(data.beginTime) + "~" + LobbyUtils.changeTimeToStr(data.endTime);
            var item = data.list;
            this.nameandscore.itemRenderer = club.MatchFightingNSPanel;
            this.nameandscore.dataProvider = new eui.ArrayCollection(item);
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
            this.names.text = this.info.nickname;
            if (this.info.score != null) {
                this.score.text = this.info.score + "";
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
            var _this = _super.call(this, "mjl_club_title_png", 1250, 720) || this;
            _this.matchIdList = [];
            _this.waitList = new Array();
            _this.skinName = "MatchManageSkin";
            return _this;
        }
        /**
         * 秒数转化为字符串
         */
        MatchManagePanel.timeToString = function (time) {
            if (!time) {
                return "00:00:00";
            }
            var hour = Math.floor(time / 3600);
            time -= (hour * 3600);
            var hourstr = hour.toString().length < 2 ? ("0" + hour) : hour;
            var minute = Math.floor(time / 60);
            time -= (minute * 60);
            var minutestr = minute.toString().length < 2 ? ("0" + minute) : minute;
            var second = time;
            var secondstr = second.toString().length < 2 ? ("0" + second) : second;
            return hourstr + ":" + minutestr + ":" + secondstr;
        };
        MatchManagePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        MatchManagePanel.prototype.initUI = function () {
            MatchManagePanel.Instanc = this;
            this.matchList.itemRenderer = club.MatchRadioButton;
            this.messageList.itemRenderer = club.MatchMessageItem;
            this.yelloList.itemRenderer = club.MatchYelloItem;
            this.fightingList.itemRenderer = club.MatchFightingItem;
            this.matchTableList.itemRenderer = club.MatchTableItem;
            this.memeberList.itemRenderer = club.MatchMemberItem;
            this.updataMemeberList();
            this.detailsGroup.visible = false;
            this.messageGroup.visible = false;
            this.memberGroup.visible = false;
            this.fightingGroup.visible = false;
            this.yelloListGroup.visible = false;
            this.removeRedPoint();
            this.refreshGroup.visible = !club.ClubData.getInstance().clubRefresh && club.ClubData.getInstance().clubStyle == club.CLUBSTYLE.ZHANGZHOU; //只有漳州风格显示
        };
        MatchManagePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            uniLib.Global.addEventListener(club.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.addEventListener(club.ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.addEventListener(club.ClubConst.JoinMemberListMatch, this.JoinMemberListMatch, this);
            uniLib.Global.addEventListener(club.ClubConst.ReturnYellowList, this.initYelloList, this);
        };
        MatchManagePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            this.stopTimer();
            this.removeRedPoint();
            uniLib.Global.removeEventListener(club.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.removeEventListener(club.ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.removeEventListener(club.ClubConst.JoinMemberListMatch, this.JoinMemberListMatch, this);
            uniLib.Global.removeEventListener(club.ClubConst.ReturnYellowList, this.initYelloList, this);
        };
        MatchManagePanel.prototype.updataMemeberList = function () {
            if (!this._memberArr) {
                this._memberArr = new eui.ArrayCollection(this.member);
                this.memeberList.dataProvider = this._memberArr;
            }
            else {
                this._memberArr.source = this.member;
                this._memberArr.refresh();
            }
        };
        MatchManagePanel.prototype.updataTableList = function () {
            this.roomList.forEach(function (f) {
                if (!Array.isArray(f.list)) {
                    f.list = [];
                }
            });
            if (!this._roomListArr) {
                this._roomListArr = new eui.ArrayCollection(this.roomList);
                this.matchTableList.dataProvider = this._roomListArr;
            }
            else {
                this._roomListArr.source = this.roomList;
                this._roomListArr.refresh();
            }
        };
        /**
         * 红点
         */
        MatchManagePanel.prototype.addRedPoint = function () {
            var redPoint = this.messageButton.skin["redPoint"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        MatchManagePanel.prototype.removeRedPoint = function () {
            var redPoint = this.messageButton.skin["redPoint"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        };
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
            this.stepLabel.text = (curMath && curMath.step ? ("第" + curMath.step + "轮") : "");
            this.time = (curMath ? Math.floor(curMath.lifeTimeSec) : 0);
            this.delTimeLabel.text = "老友圈剩余时间：" + MatchManagePanel.timeToString(this.time);
            if (curMath && curMath.lifeTimeSec < 0) {
                this.delTimeLabel.text = "老友圈已过期";
            }
            if (curMath && curMath.openNbrs) {
                this.todaynum.text = "今日：" + curMath.openNbrs[0];
                this.yesterdaynum.text = "昨日：" + curMath.openNbrs[1];
                this.sevendaynum.text = "七日：" + curMath.openNbrs[2];
                this.thirtydaynum.text = "30日：" + curMath.openNbrs[3];
            }
            if (curMath && curMath.lifeTimeSec == 0) {
                this.delTimeLabel.text = "不限时";
            }
            this.roomList = (curMath && curMath.roomList instanceof Array) ? curMath.roomList : [];
            this.updataTableList();
            this.fightingList.dataProvider = new eui.ArrayCollection(this.roomList);
            this.stopTimer();
            if (state == 0) {
                this.timer = egret.setInterval(this.updataTimer, this, 1000);
            }
            var curMatchId = (curMath ? curMath.matchId : null);
            for (var i = 0; i < this.matchIdList.length; i++) {
                if (this.matchIdList[i] == curMatchId) {
                    this.matchList.selectedIndex = i;
                    break;
                }
            }
            this.shareInfo = curMath ? curMath.shareInfo : null;
        };
        MatchManagePanel.prototype.updataTimer = function () {
            if (this.time == null || this.time < 1) {
                this.stopTimer();
                return;
            }
            this.time--;
            this.delTimeLabel.text = "老友圈剩余时间：" + MatchManagePanel.timeToString(this.time);
        };
        MatchManagePanel.prototype.stopTimer = function () {
            egret.clearInterval(this.timer);
        };
        MatchManagePanel.prototype.initReturnMatchGroup = function (evt) {
            var data = evt.param;
            if (!Array.isArray(data.matchIdList)) {
                uniLib.PopUpMgr.removePopUp(this);
                // uniLib.PopUpMgr.addPopUp(ClubAllBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            this.waitList = [];
            this.matchIdList = data && data.matchIdList && data.matchIdList instanceof Array ? data.matchIdList : [];
            this.waitList = data != null && data.curMath != null && data.curMath.waitUserList != null && data.curMath.waitUserList instanceof Array && data.curMath.waitUserList.length > 0 ? data.curMath.waitUserList : [];
            this.matchList.dataProvider = new eui.ArrayCollection(this.matchIdList);
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
                    case 3:
                        this.messageButton.selected = true;
                        break;
                    case 4:
                        this.fightingButton.selected = true;
                        break;
                }
                // this.detailsButton.selected = true;
                this.switchWindow();
            }
            this.updataButtonEnabled();
        };
        MatchManagePanel.prototype.updataButtonEnabled = function () {
            var bool = this.matchIdList && this.matchIdList.length > 0 ? true : false;
            this.detailsButton.enabled = this.memberButton.enabled = this.messageButton.enabled
                = this.fightingButton.enabled = this.joinMatchButton.enabled = this.yelloListButton.enabled = bool;
            if (bool == false) {
                this.detailsGroup.visible = this.messageGroup.visible = this.memberGroup.visible
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
            this.updataMemeberList();
        };
        MatchManagePanel.prototype.initYelloList = function (evt) {
            var yelloList = evt.param;
            yelloList.list = (yelloList.list && yelloList.list instanceof Array) ? yelloList.list : [];
            this.yelloIndoList = yelloList.list;
            this.yelloList.dataProvider = new eui.ArrayCollection(this.yelloIndoList);
        };
        MatchManagePanel.prototype.initHistory = function (history) {
            if (!history || history.matchId != this.selectMatchId) {
                return;
            }
        };
        MatchManagePanel.prototype.JoinMemberListMatch = function (evt) {
            var _this = this;
            var joinMember = evt.param;
            this.joinMember = [];
            this.joinNewMember = [];
            club.ClubData.getInstance().matchid = this.selectMatchId;
            if (joinMember && joinMember.list && joinMember.list instanceof Array) {
                this.joinMember = joinMember.list;
                joinMember.list.forEach(function (element) {
                    if (element.matchId == club.ClubData.getInstance().matchid) {
                        _this.joinNewMember.push(element);
                    }
                });
            }
            this.messageList.dataProvider = new eui.ArrayCollection(this.joinNewMember);
            if (this.joinNewMember && this.joinNewMember.length > 0) {
                this.addRedPoint();
            }
            else {
                this.removeRedPoint();
            }
        };
        MatchManagePanel.prototype.switchWindow = function () {
            this.detailsGroup.visible = this.messageGroup.visible = this.memberGroup.visible = this.fightingGroup.visible = this.yelloListGroup.visible = false;
            this.setting.visible = true;
            if (this.detailsButton.selected) {
                this.detailsGroup.visible = true;
            }
            else if (this.memberButton.selected) {
                this.memberGroup.visible = true;
            }
            else if (this.messageButton.selected) {
                this.messageGroup.visible = true;
            }
            else if (this.fightingButton.selected) {
                this.fightingGroup.visible = true;
            }
            else if (this.yelloListButton.selected) {
                this.yelloListGroup.visible = true;
                this.setting.visible = false;
            }
        };
        MatchManagePanel.prototype.onClickTap = function (e) {
            if (e.target == this.detailsButton
                || e.target == this.memberButton
                || e.target == this.messageButton
                || e.target == this.fightingButton
                || e.target == this.yelloListButton) {
                e.target.selected = true;
                this.switchWindow();
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
                    info = "恢复老友圈会清除之前战绩,重新开始老友圈统计,继续吗？";
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
            else if (e.target == this.waitListBtn) {
                this.showWaitPlayerList();
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
                this.dispatchEventWith(ClubUIEventConst.JOIN_CLUBROOM, false, this.matchIdList[this.matchList.selectedIndex]);
                var req = new Cmd.EnterRoomCmd_C;
                req.roomId = this.matchIdList[this.matchList.selectedIndex];
                NetMgr.tcpSend(req);
                club.ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            else if (e.target == this.setting) {
                //this.showMatchSettingPanel();
                var req_1 = new Cmd.RequestChangeMatchGroupCmd_C();
                req_1.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(req_1);
            }
            else if (e.target == this.refrshBtn) {
                this.onMatchListTap(null);
            }
            else if (e.target == this._dayTypeBg) {
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
                this._morewinloseGroup.visible = false;
                this._dayTypeImg.source = "pph_winlose" + club.ClubData.getInstance().clubDayChose;
                this.updataMemeberList();
            }
        };
        /**
         * 显示匹配等待列表
         */
        MatchManagePanel.prototype.showWaitPlayerList = function () {
            if (this.waitList.length > 0) {
                var listPanel = new club.ActiveRoomInformationPanel();
                uniLib.PopUpMgr.addPopUp(listPanel, null, true, true);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("当前房间没有等待玩家");
            }
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
        Object.defineProperty(MatchManagePanel.prototype, "selectMatchId", {
            get: function () {
                return this.matchIdList[this.matchList.selectedIndex];
            },
            enumerable: true,
            configurable: true
        });
        MatchManagePanel.prototype.onMatchListTap = function (e) {
            var cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        MatchManagePanel.prototype.onTableListTap = function (e) {
            club.ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            var item = this.matchTableList.selectedItem;
            var cmd = new Cmd.ActiveDetailRoomCmd_C();
            cmd.roomId = item.roomId;
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        return MatchManagePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    club.MatchManagePanel = MatchManagePanel;
    __reflect(MatchManagePanel.prototype, "club.MatchManagePanel");
})(club || (club = {}));
var club;
(function (club) {
    /**
     * 成员列表item
     */
    var MatchMemberItem = (function (_super) {
        __extends(MatchMemberItem, _super);
        function MatchMemberItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchMemberItemSkin";
            return _this;
        }
        MatchMemberItem.prototype.dataChanged = function () {
            var data = this.data;
            var index = club.ClubData.getInstance().clubDayChose - 1;
            if (club.ClubData.getInstance().clubStyle == club.CLUBSTYLE.ZHANGZHOU) {
                if (club.ClubData.getInstance().clubRefresh == 1) {
                    this.winloseLabel.visible = false;
                    this.winNumLabel.visible = false;
                }
                else {
                    this.winloseLabel.text = data.scores[index].toString();
                    this.winNumLabel.text = data.winNums[index].toString();
                }
            }
            this.nameLabel.text = data.nickname;
            this.playerID.text = data.uid.toString();
            this.operationGroup.removeChildren();
            for (var i = 0; i < 4; i++) {
                if (i == data.type)
                    continue;
                var label = new eui.Label();
                var textColor = club.DataManage.MatchMemberTypeToColor(i);
                label.textFlow = [{ text: club.DataManage.MatchMemberTypeToString(i), style: { textColor: textColor, underline: true } }];
                label.size = 22;
                label.name = i + "";
                this.operationGroup.addChild(label);
                label.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTap, this);
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
            this.contenLabel.text = "玩家" + data.nickname + "请求加入老友圈？";
            if (data.note) {
                this.contenRemarks.text = "备注：" + data.note + "";
            }
            else {
                this.contenRemarks.text = "备注：无";
            }
        };
        MatchMessageItem.prototype.onClickTap = function (e) {
            var data = this.data;
            if (e.target == this.disAgreeButton) {
                var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
                cmd.matchId = club.MatchManagePanel.Instanc.selectMatchId;
                cmd.reply = 0;
                cmd.uid = data.uid;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.agreeButton) {
                var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
                cmd.matchId = club.MatchManagePanel.Instanc.selectMatchId;
                cmd.reply = 1;
                cmd.uid = data.uid;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.blackButton) {
                var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
                cmd.matchId = club.MatchManagePanel.Instanc.selectMatchId;
                cmd.reply = 3;
                cmd.uid = data.uid;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.whiteButton) {
                var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
                cmd.matchId = club.MatchManagePanel.Instanc.selectMatchId;
                cmd.reply = 2;
                cmd.uid = data.uid;
                NetMgr.tcpSend(cmd);
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
            this.label.text = data + "";
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
            // let text = "桌" + data.roomId + "\n" + (data.endTime == null ? "(游戏中)\n" : "(牌局结束)\n") + "人数：" + member + "/" + member;
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
            // for (let item of data.list) {
            //     text += ("\n" + item.nickname.substring(0, 7));
            // }
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
            _this.removeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.removeHandel, _this);
            return _this;
        }
        MatchYelloItem.prototype.dataChanged = function () {
            var data = this.data;
            if (!data)
                return;
            this.nameLabel.text = data.nickName ? data.nickName.toString() : "";
            this.playerID.text = data.uid ? data.uid.toString() : "";
            this.nameLabel_1.text = data.nickName2 ? data.nickName2.toString() : "";
            this.playerID_1.text = data.uid2 ? data.uid2.toString() : "";
        };
        /**移除黄名单 */
        MatchYelloItem.prototype.removeHandel = function (e) {
            var req = new Cmd.OperateYellowMemberListMatchGroupCmd_C();
            req.reply = 0;
            req.uid = Number(this.playerID.text);
            req.uid2 = Number(this.playerID_1.text);
            req.matchId = club.MatchManagePanel.Instanc.selectMatchId;
            NetMgr.tcpSend(req);
        };
        return MatchYelloItem;
    }(eui.ItemRenderer));
    club.MatchYelloItem = MatchYelloItem;
    __reflect(MatchYelloItem.prototype, "club.MatchYelloItem");
})(club || (club = {}));
