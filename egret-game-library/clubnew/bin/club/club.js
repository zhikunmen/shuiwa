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
var clubnew;
(function (clubnew) {
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
        ClubMsgMcPanel.prototype.initUI = function () {
            this._buffer = 30;
            this.touchEnabled = false;
            this._msgContain = new egret.DisplayObjectContainer();
            this._msgContain.x = 110;
            this._msgContain.y = 7;
            this.addChild(this._msgContain);
            this._msgContain.scrollRect = new egret.Rectangle(0, 0, 440, 25);
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
            // this._msgTxt.textFlow = (new egret.HtmlTextParser).parser(this._noticeArr.shift());
            this.startScroll();
        };
        ClubMsgMcPanel.prototype.startScroll = function () {
            this.visible = true;
            egret.Tween.removeTweens(this._noticePanel);
            this._noticePanel.x = 540 + this._buffer;
            var w = this._noticePanel.width < 540 ? 540 : this._noticePanel.width;
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
            tf.textColor = 0xffffff;
            tf.textAlign = egret.HorizontalAlign.LEFT;
            tf.size = 24;
            tf.multiline = false;
            tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            return tf;
        };
        return ClubMsgMcPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubMsgMcPanel = ClubMsgMcPanel;
    __reflect(ClubMsgMcPanel.prototype, "clubnew.ClubMsgMcPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    var ClubConst = (function () {
        function ClubConst() {
        }
        ClubConst.RES_JSON = "resource/club.res.json";
        ClubConst.THM_JSON = "resource/clubnew/gameEui_19e2236a.json";
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
        /**包厢管理消息列表 */
        ClubConst.JoinMemberListManage = "JoinMemberListManage";
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
    clubnew.ClubConst = ClubConst;
    __reflect(ClubConst.prototype, "clubnew.ClubConst");
})(clubnew || (clubnew = {}));
var Cmd;
(function (Cmd) {
    function clubDispatch(cmd, obj, bubbles) {
        if (bubbles === void 0) { bubbles = true; }
        uniLib.Global.dispatchEvent(cmd, obj, bubbles);
    }
    Cmd.clubDispatch = clubDispatch;
    function OnActiveDetailRoomCmd_S(rev) {
        if (!rev.list) {
            clubnew.ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            var cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }
        else {
            clubnew.ClubModuleMgr.getInstance().showActiveDetailRoomtPanel(function () {
                clubDispatch(clubnew.ClubConst.ActiveDetailRoom, rev);
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
        // lobbyDispatch(ClubConst.ReturnMatchGroupList, rev);
        // } else {
        clubDispatch(clubnew.ClubConst.HistoryMatchIdList, rev);
        // }
    }
    Cmd.OnHistoryMatchIdListMatchGroupCmd_S = OnHistoryMatchIdListMatchGroupCmd_S;
    /**返回自己的所有匹配号 */
    function OnReturnMatchGroupCmd_S(rev) {
        if (uniLib.Global.isInGame == false) {
            if (rev.isClub == 1) {
                if (rev.curMath) {
                    clubnew.ClubModuleMgr.getInstance().showClubDeskPanel(function () {
                        clubDispatch(clubnew.ClubConst.ReturnMatchGroup, rev);
                    });
                }
                else {
                    clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                    clubnew.ClubModuleMgr.getInstance().showAllClubListPanel(function () {
                        var cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                        cmd.isClub = 1;
                        NetMgr.tcpSend(cmd);
                    });
                }
            }
            else {
                clubDispatch(clubnew.ClubConst.ReturnMatchGroupManage, rev);
            }
        }
    }
    Cmd.OnReturnMatchGroupCmd_S = OnReturnMatchGroupCmd_S;
    /**
     * 广播当前桌子最新状况
     */
    function OnLatestMatchRoomInfoGroupCmd_Brd(rev) {
        if (rev) {
            clubDispatch(clubnew.ClubConst.LatestMatchRoom, rev);
        }
    }
    Cmd.OnLatestMatchRoomInfoGroupCmd_Brd = OnLatestMatchRoomInfoGroupCmd_Brd;
    /**申请白名单消息列表,玩家请求后主动推给匹配主 */
    function OnJoinMemberListMatchGroupCmd_S(rev) {
        if (rev.isClub == 1) {
            clubDispatch(clubnew.ClubConst.JoinMemberListMatch, rev);
        }
        else {
            clubDispatch(clubnew.ClubConst.JoinMemberListManage, rev);
        }
    }
    Cmd.OnJoinMemberListMatchGroupCmd_S = OnJoinMemberListMatchGroupCmd_S;
    /**楼层系列操作 */
    function OnOperateFloorMatchGroupCmd_CS(rev) {
        /**获取已创建的房间的基础信息 然后进行修改 */
        if (rev.opType == 2) {
            clubnew.ClubModuleMgr.getInstance();
        }
    }
    Cmd.OnOperateFloorMatchGroupCmd_CS = OnOperateFloorMatchGroupCmd_CS;
    /**进房审核 */
    function OnNotifyImportNoteCmd_S(rev) {
        clubnew.ClubModuleMgr.getInstance().shoClubEnterRemarks(function () {
            clubDispatch(clubnew.ClubConst.NotifyImportNoteCmd, rev);
        });
    }
    Cmd.OnNotifyImportNoteCmd_S = OnNotifyImportNoteCmd_S;
    /**返回公告信息 */
    function OnClubNoticeMatchGroupCmd_CS(rev) {
        clubDispatch(clubnew.ClubConst.CLUB_NOTICE, rev);
    }
    Cmd.OnClubNoticeMatchGroupCmd_CS = OnClubNoticeMatchGroupCmd_CS;
    /**返回黑白名单 */
    function OnReturnMemberInfoMatchGroupCmd_S(rev) {
        clubDispatch(clubnew.ClubConst.MemberInfoMatchGroup, rev);
    }
    Cmd.OnReturnMemberInfoMatchGroupCmd_S = OnReturnMemberInfoMatchGroupCmd_S;
    /**返回查找个人信息 */
    function OnUserInfoSearchLobbyCmd_S(rev) {
        clubnew.ClubModuleMgr.getInstance().showClubUserInfoPanel(function () {
            clubDispatch(clubnew.ClubConst.UserInfoSearchLobby, rev);
        });
    }
    Cmd.OnUserInfoSearchLobbyCmd_S = OnUserInfoSearchLobbyCmd_S;
    /**
     * 获取黄名单列表
     */
    function OnReturnYellowMemberInfoMatchGroupCmd_S(rev) {
        if (rev && rev.list) {
            clubDispatch(clubnew.ClubConst.ReturnYellowList, rev);
        }
    }
    Cmd.OnReturnYellowMemberInfoMatchGroupCmd_S = OnReturnYellowMemberInfoMatchGroupCmd_S;
    /**
     * 改变匹配号属性
     */
    function OnChangeMatchGroupCmd_S(rev) {
        clubnew.ClubModuleMgr.getInstance().showCreateMatchSetPanel(rev);
    }
    Cmd.OnChangeMatchGroupCmd_S = OnChangeMatchGroupCmd_S;
    /**
     * 离开匹配组返回
     */
    function OnLeaveMatchGroup2Cmd_S(rev) {
        clubDispatch(clubnew.ClubConst.LEAVE_MATCHGROUP2, rev);
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
var clubnew;
(function (clubnew) {
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
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(clubnew.ClubAllBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**老友圈管理员界面单个房间详情 */
        ClubModuleMgr.prototype.showActiveDetailRoomtPanel = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(clubnew.ActiveRoomInformationPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**删除老友圈管理员界面单个房间详情 */
        ClubModuleMgr.prototype.removeActiveDetailRoomtPanel = function () {
            uniLib.PopUpMgr.removePopUp(clubnew.ActiveRoomInformationPanel);
        };
        /**老友圈桌面界面 */
        ClubModuleMgr.prototype.showClubDeskPanel = function (callBack) {
            var _this = this;
            if (this._isShowClub == 1) {
                callBack();
            }
            if (!this._clubDeskPanel) {
                this._clubDeskPanel = new clubnew.ClubDeskPanel();
                LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
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
                var req = new Cmd.ExitMatchGroupCmd_C;
                NetMgr.tcpSend(req);
            }
        };
        /**老友圈管理界面 */
        ClubModuleMgr.prototype.showClubManagePanel = function (callBack) {
            var _this = this;
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                if (!_this._clubManagePanel) {
                    _this._clubManagePanel = new clubnew.ClubManagePanel();
                    uniLib.PopUpMgr.addPopUp(_this._clubManagePanel, null, true, false, 0);
                    _this._clubManagePanel.OnOpen();
                }
                callBack();
            });
        };
        ClubModuleMgr.prototype.closeClubManagePanel = function () {
            if (this._clubManagePanel) {
                this._clubManagePanel.OnClose();
            }
        };
        ClubModuleMgr.prototype.removeClubManagePanel = function () {
            if (this._clubManagePanel) {
                uniLib.PopUpMgr.removePopUp(this._clubManagePanel);
                this._clubManagePanel = null;
            }
        };
        /**老友圈成员列表界面 */
        ClubModuleMgr.prototype.showClubPlayerListPanel = function (callBack) {
            var _this = this;
            this._clubPlayerListPanel = new clubnew.ClubPlayerListPanel();
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(_this._clubPlayerListPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                _this._clubPlayerListPanel.OnOpen();
                callBack();
            });
        };
        ClubModuleMgr.prototype.removeClubPlayerListPanel = function () {
            if (this._clubPlayerListPanel) {
                uniLib.PopUpMgr.removePopUp(this._clubPlayerListPanel);
                this._clubPlayerListPanel = null;
            }
        };
        /**老友圈公告界面 */
        ClubModuleMgr.prototype.showClubNoticePanel = function () {
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(clubnew.ClubNoticePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            });
        };
        /**玩家第一次进入房间加备注 */
        ClubModuleMgr.prototype.shoClubEnterRemarks = function (callBack) {
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.addPopUp(clubnew.ClubEnterRemarks, null, true, false, 0);
                callBack();
            });
        };
        /**创建老友圈房间面板 */
        ClubModuleMgr.prototype.showCreateClubPanel = function (game) {
            LoadPanelTipMgr.getInstance().loadRes(ResGroupConsts.MJL_CREATEPANEL, function () {
                var info = new CreatePanelParam(2);
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
                uniLib.PopUpMgr.addPopUp(clubnew.ClubUserInfoPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                callBack();
            });
        };
        /**
         * 俱乐部创建、修改设置页面
         */
        ClubModuleMgr.prototype.showCreateMatchSetPanel = function (data) {
            LoadPanelTipMgr.getInstance().loadRes(clubnew.ClubConst.PUB_CLUB, function () {
                uniLib.PopUpMgr.removePopUp(CreateGamePanel);
                uniLib.PopUpMgr.addPopUp(clubnew.CreateMatchSetPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, data);
            });
        };
        /**老友圈左侧包厢功能 */
        ClubModuleMgr.prototype.ClubNewBoxPanel = function (data) {
            this._clubNewBoxPanel = new clubnew.ClubNewBoxPanel(data);
            uniLib.PopUpMgr.addPopUp(this._clubNewBoxPanel, null, true, false, 0);
            this._clubNewBoxPanel.OnOpen();
        };
        ClubModuleMgr.prototype.closeClubNewBoxPanel = function () {
            if (this._clubNewBoxPanel) {
                this._clubNewBoxPanel.OnClose();
            }
        };
        ClubModuleMgr.prototype.removeClubNewBoxPanel = function () {
            if (this._clubNewBoxPanel) {
                uniLib.PopUpMgr.removePopUp(this._clubNewBoxPanel);
                this._clubNewBoxPanel = null;
            }
        };
        return ClubModuleMgr;
    }());
    clubnew.ClubModuleMgr = ClubModuleMgr;
    __reflect(ClubModuleMgr.prototype, "clubnew.ClubModuleMgr");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
        /**
         * 操作楼层
         */
        ClubSendMgr.sendOFMGCmd_CS = function (matchId, floorId, opType, obj) {
            var req = new Cmd.OperateFloorMatchGroupCmd_CS();
            req.matchId = matchId;
            req.floorId = floorId;
            req.opType = opType;
            obj ? req.createRoom = obj : null;
            NetMgr.tcpSend(req);
        };
        return ClubSendMgr;
    }());
    clubnew.ClubSendMgr = ClubSendMgr;
    __reflect(ClubSendMgr.prototype, "clubnew.ClubSendMgr");
})(clubnew || (clubnew = {}));
var ClubUIEventConst = (function () {
    function ClubUIEventConst() {
    }
    ClubUIEventConst.JOIN_CLUBROOM = "JOIN_CLUBROOM";
    return ClubUIEventConst;
}());
__reflect(ClubUIEventConst.prototype, "ClubUIEventConst");
var clubnew;
(function (clubnew) {
    /**
     * 已创建活跃房间面板
     */
    var ActiveRoomInformationPanel = (function (_super) {
        __extends(ActiveRoomInformationPanel, _super);
        function ActiveRoomInformationPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ActiveRoom";
            return _this;
        }
        ActiveRoomInformationPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ActiveRoomInformationPanel.prototype.initUI = function () {
            this.closeButton.setColorMatrix();
        };
        //初始化监听
        ActiveRoomInformationPanel.prototype.addEvent = function () {
            this.closeButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.cancelBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.addEventListener(clubnew.ClubConst.ActiveDetailRoom, this.initData, this);
        };
        //移除监听
        ActiveRoomInformationPanel.prototype.removeEvent = function () {
            this.closeButton.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.cancelBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this.dissolveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.addEventListener(clubnew.ClubConst.ActiveDetailRoom, this.initData, this);
        };
        //销毁创建
        ActiveRoomInformationPanel.prototype.destroy = function () {
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
            if (this.itemList) {
                for (var i = this.itemList.numChildren - 1; i >= 0; i--) {
                    var item = this.itemList.getChildAt(i);
                    item.destroy();
                    item = null;
                }
            }
            uniLib.DisplayUtils.removeAllChildren(this.itemList);
            this._activeRoomListOb = rev;
            this.topTableNumber.text = "房号：" + this._activeRoomListOb.roomId;
            // this.topfloorNumber.text = "包厢：" + this._activeRoomListOb.
            if (!Array.isArray(rev.list) || rev.list.length == 0)
                return;
            for (var i = 0; i < rev.list.length; i++) {
                var item = new clubnew.ActiveRoomListItem();
                item.setData(rev.list[i], rev.roomId);
                if (rev.matchId) {
                    item.name = rev.matchId + "";
                }
                if (this._activeRoomListOb.state == 1 || this._activeRoomListOb.list[i].score) {
                    item.setEliminateVisible(false);
                    this.cancelBtn.visible = false;
                    this.dissolveBtn.visible = false;
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
            if (e.currentTarget == this.closeButton || e.currentTarget == this.cancelBtn) {
                this.destroy();
            }
            else if (e.currentTarget == this.dissolveBtn) {
                var req = new Cmd.ActiveDissolveRoomCmd_C();
                req.roomId = this._activeRoomListOb.roomId;
                req.matchId = this._activeRoomListOb.matchId;
                NetMgr.tcpSend(req);
                this.destroy();
            }
        };
        return ActiveRoomInformationPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ActiveRoomInformationPanel = ActiveRoomInformationPanel;
    __reflect(ActiveRoomInformationPanel.prototype, "clubnew.ActiveRoomInformationPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            uniLib.PopUpMgr.removePopUp(clubnew.ActiveRoomInformationPanel);
        };
        ActiveRoomListItem.prototype.setEliminateVisible = function (show) {
            this.eliminate.visible = show;
        };
        ActiveRoomListItem.prototype.destroy = function () {
            if (this.eliminate) {
                this.eliminate.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.eliminatePlayer, this);
            }
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return ActiveRoomListItem;
    }(eui.Component));
    clubnew.ActiveRoomListItem = ActiveRoomListItem;
    __reflect(ActiveRoomListItem.prototype, "clubnew.ActiveRoomListItem");
})(clubnew || (clubnew = {}));
// TypeScript file
var clubnew;
(function (clubnew) {
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
    clubnew.DataManage = DataManage;
    __reflect(DataManage.prototype, "clubnew.DataManage");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
        };
        ClubAllBoxPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.boxList && this.boxList.numChildren) {
                for (var i = this.boxList.numChildren - 1; i >= 0; i--) {
                    var item = this.boxList.getChildAt(i);
                    item.destroy();
                    item = null;
                }
            }
        };
        ClubAllBoxPanel.prototype.initUI = function () {
            this.msgText.visible = true;
            this.boxList.useVirtualLayout = false;
            uniLib.Global.addEventListener(clubnew.ClubConst.HistoryMatchIdList, this.setData, this);
        };
        ClubAllBoxPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubAllBoxPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.HistoryMatchIdList, this.setData, this);
        };
        ClubAllBoxPanel.prototype.setData = function (evt) {
            var date = evt.param;
            if (!date)
                return;
            if (date.list.length >= 1) {
                this.msgText.visible = false;
            }
            else {
                this.msgText.visible = true;
            }
            this._clubList = date.list;
            for (var i = 0; i < this._clubList.length; i++) {
                this._clubList[i].index = i + 1;
            }
            this.boxList.itemRenderer = clubnew.ClubBoxItem;
            this.boxList.dataProvider = new eui.ArrayCollection(this._clubList);
        };
        ClubAllBoxPanel.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
            else if (e.target == this.createBtn) {
                _super.prototype.removePop.call(this);
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
                clubnew.ClubModuleMgr.getInstance().showCreateClubPanel();
            }
            else if (e.target == this.joinBtn) {
                _super.prototype.removePop.call(this);
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
                LobbyModuleMgr.getInstance().showJoinRoomPanel(function () {
                    var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    NetMgr.tcpSend(req);
                });
            }
        };
        return ClubAllBoxPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubAllBoxPanel = ClubAllBoxPanel;
    __reflect(ClubAllBoxPanel.prototype, "clubnew.ClubAllBoxPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
        ClubBoxItem.prototype.destroy = function () {
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
            this.nameText.text = this.info.ownerName;
            this.roomNameText.text = this.info.gameName + "  " + this.info.gameNbr + "局";
            this.boxNameText.text = this.info.matchName ? this.info.matchName : this.info.matchId.toString();
            this.waitRoomText.text = this.info.waitRoomNbr + "桌等待中";
            this.startRoomText.text = this.info.startRoomNbr + "桌开始";
            this.head.source = this.info.ownerHeadUrl;
            this.numberText.text = this.info.index + "";
            if (this.info.isNew && this.info.isNew == 1) {
                this.bg.source = "club_clubbg";
            }
            if (this.info.noHandle && this.info.noHandle == 1) {
                this.addRedPoint();
            }
        };
        ClubBoxItem.prototype.onClickTap = function (e) {
            if (e.target == this.inBtn) {
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = this.info.matchId;
                cmd.isClub = 1;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(clubnew.ClubAllBoxPanel);
            }
            else if (e.target == this.outBtn) {
                var club_1 = this;
                var okFunc = function () {
                    var cmd = new Cmd.LeaveMatchGroup2Cmd_C();
                    cmd.matchId = club_1.info.matchId;
                    if (clubnew.ClubData.getInstance().clubmatchid == club_1.info.matchId) {
                        clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                        ;
                    }
                    NetMgr.tcpSend(cmd);
                    var req = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    req.isClub = 1;
                    NetMgr.tcpSend(req);
                };
                ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
            }
            else if (e.target == this.bg) {
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = this.info.matchId;
                cmd.isClub = 1;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(clubnew.ClubAllBoxPanel);
            }
        };
        /**
        * 红点
        */
        ClubBoxItem.prototype.addRedPoint = function () {
            this.redPoint.visible = true;
            egret.Tween.get(this.redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        ClubBoxItem.prototype.removeRedPoint = function () {
            this.redPoint.visible = false;
            egret.Tween.removeTweens(this.redPoint);
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
    clubnew.ClubBoxItem = ClubBoxItem;
    __reflect(ClubBoxItem.prototype, "clubnew.ClubBoxItem");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**
     * 老友圈桌子面板
     */
    var ClubDeskPanel = (function (_super) {
        __extends(ClubDeskPanel, _super);
        function ClubDeskPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubDeskSkin";
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            return _this;
        }
        ClubDeskPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubDeskPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.destroyTimer();
            this._dataArr = null;
        };
        ClubDeskPanel.prototype.initUI = function () {
            this._ztimer = new egret.Timer(5000, 0);
            this._ztimer.start();
            if (uniLib.Utils.isPad()) {
                this.bg.height = 200;
            }
            this.deskList.itemRenderer = clubnew.ClubItemDesk;
        };
        ClubDeskPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(clubnew.ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(clubnew.ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._ztimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._scroll.addEventListener(eui.UIEvent.CHANGE, this.movelistmove, this);
        };
        ClubDeskPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(clubnew.ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._scroll.removeEventListener(eui.UIEvent.CHANGE, this.movelistmove, this);
        };
        ClubDeskPanel.prototype.destroyTimer = function () {
            if (this._ztimer) {
                this._ztimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this._ztimer.stop();
                this._ztimer = null;
            }
        };
        /**图跟着移动 */
        ClubDeskPanel.prototype.movelistmove = function (e) {
            var movex;
            movex = -100 - (this.deskList.scrollH / (this.deskList.measuredWidth - this.deskList.width)) * 200;
            egret.Tween.get(this.bg).to({ x: movex }, 1);
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
                /**跑马灯
                 */
                if (!this._clubMsgMcPanel) {
                    this._clubMsgMcPanel = new clubnew.ClubMsgMcPanel();
                    this._clubMsgMcPanel.x = uniLib.Global.screenWidth / 2 - 190;
                    this._clubMsgMcPanel.y = 50 * uniLib.ScreenUtils.scaleFactor;
                    this.addChild(this._clubMsgMcPanel);
                }
                this._clubMsgMcPanel.getclubmsg(this._curMath.clubNotice);
                /**
                 * 记录当前老友圈id
                */
                clubnew.ClubData.getInstance().clubmatchid = this._curMath.matchId;
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    clubnew.ClubData.getInstance().isclubmanagor = 1;
                }
                else {
                    clubnew.ClubData.getInstance().isclubmanagor = 0;
                }
                this.title.text = this._curMath.matchName ? this._curMath.matchName : this._curMath.matchId.toString();
                this.gameplay.text = this._curMath.gameName;
                this.play.text = "老友圈号:" + this._curMath.matchId;
                this.floorNumTxt.text = this._curMath.floorId + "楼";
                this.play.touchEnabled = true;
                this.play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyid, this);
                this._deskList = date.curMath.roomList;
                this.personNum.text = this._curMath.onlineUserNum + "";
                this.gameTypeTxt.text = this._curMath.userNbr + "人   " + this._curMath.gameNbr + "局";
                var config = ConfigMgr.getInstance().getGameCfgById(this._curMath.gameId);
                this.gameIconImg.source = uniLib.Global.CdnDomains[0] + uniLib.GameModuleUtils.gameRemotePaths[0] + config.gameIconUrl;
                var list = [];
                if (Array.isArray(this._deskList))
                    list = this._deskList.concat();
                if (list.length < 24) {
                    var listlength = list.length;
                    for (var i = 0; i < 24 - listlength; i++) {
                        var infozz = new Cmd.MathGroupRoomInfo();
                        infozz.state = 8;
                        list.push(infozz);
                    }
                }
                if (!this._dataArr) {
                    this._dataArr = new eui.ArrayCollection(list);
                    this.deskList.dataProvider = this._dataArr;
                }
                else {
                    this._dataArr.removeAll();
                    this._dataArr.replaceAll(list);
                }
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.destroyTimer();
                this.removePop();
            }
        };
        ClubDeskPanel.prototype.timerFunc = function (event) {
            var req = new Cmd.RequestMatchGroupCmd_C();
            req.isClub = 1;
            req.matchId = this._curMath.matchId;
            req.floorId = this._curMath.floorId;
            NetMgr.tcpSend(req);
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
            this.redPoint.visible = true;
            egret.Tween.get(this.redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        ClubDeskPanel.prototype.removeRedPoint = function () {
            this.redPoint.visible = false;
            egret.Tween.removeTweens(this.redPoint);
        };
        ClubDeskPanel.prototype.copyid = function (e) {
            uniLib.ZQGameSdk.nativeCopyStr(this.play.text);
            uniLib.TipsUtils.showTipsDownToUp("复制成功" + this.play.text);
        };
        ClubDeskPanel.prototype.onClickTap = function (e) {
            var _this = this;
            if (e.target == this.closeBtn) {
                this.destroyTimer();
                // this.removePop();
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
            }
            else if (e.target == this.fastEnterBtn) {
                this.destroyTimer();
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
                var req_1 = new Cmd.EnterRoomCmd_C;
                req_1.floorId = this._curMath.floorId;
                req_1.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req_1);
            }
            else if (e.target == this.createBtn) {
                clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                ;
                var cmd = new Cmd.GetNormalGameListRoomCmd_C();
                cmd.isClub = 1;
                cmd.lobbyId = MJLobbyData.getInstance().lobbyId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.swtichBtn) {
                clubnew.ClubModuleMgr.getInstance().showAllClubListPanel(function () {
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
                    clubnew.ClubData.getInstance().clubChoice = 3;
                    // this.destroyTimer();
                    // LobbyModuleMgr.getInstance().showClubManagePanel();
                    clubnew.ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            }
            else if (e.target == this.memberListBtn || e.target == this.personNum || e.target == this.zaixian) {
                clubnew.ClubModuleMgr.getInstance().showClubPlayerListPanel(function () {
                    var cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = _this._curMath.matchId;
                    NetMgr.tcpSend(cmd);
                });
            }
            else if (e.target == this.queryFightingBtn) {
                LobbyModuleMgr.getInstance().showRecordPanel();
            }
            else if (e.target == this.boxManageBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    clubnew.ClubData.getInstance().clubChoice = 1;
                    // LobbyModuleMgr.getInstance().showClubManagePanel();
                    var req = new Cmd.RequestMatchGroupCmd_C();
                    req.matchId = this._curMath.matchId;
                    // req.floorId = this._curMath.floorId;
                    NetMgr.tcpSend(req);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            }
            else if (e.target == this.noticeBtn) {
                var cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                cmd.matchId = this._curMath.matchId;
                NetMgr.tcpSend(cmd);
                clubnew.ClubModuleMgr.getInstance().showClubNoticePanel();
            }
            else if (e.target == this.switchFloorBtn) {
                clubnew.ClubModuleMgr.getInstance().ClubNewBoxPanel(this._curMath);
            }
            else if (e.target == this.detailsBtn || e.target == this.detailsBtn0 || e.target == this.gameIconImg) {
                this.showClubFloordetails();
                if (this.clubFloordetails) {
                    this.clubFloordetails.setdeskDate(this._curMath);
                }
            }
            else if (e.target == this.floorUpBtn) {
                if (Array.isArray(this._curMath.floorList)) {
                    if (this._curMath.floorList.length > 1) {
                        var cmd = new Cmd.RequestMatchGroupCmd_C();
                        cmd.matchId = this._curMath.matchId;
                        cmd.isClub = 1;
                        for (var i = 0; i < this._curMath.floorList.length; i++) {
                            if (this._curMath.floorId == this._curMath.floorList[i].floorId) {
                                if ((i - 1) >= 0) {
                                    cmd.floorId = this._curMath.floorList[i - 1].floorId;
                                }
                                else {
                                    cmd.floorId = this._curMath.floorList[this._curMath.floorList.length - 1].floorId;
                                }
                            }
                        }
                        clubnew.ClubData.getInstance().isclubchangefloor = 1;
                        NetMgr.tcpSend(cmd);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("暂时只有1层包厢，无法切换!");
                    }
                }
            }
            else if (e.target == this.floorDownBtn) {
                if (Array.isArray(this._curMath.floorList)) {
                    if (this._curMath.floorList.length > 1) {
                        var cmd = new Cmd.RequestMatchGroupCmd_C();
                        cmd.matchId = this._curMath.matchId;
                        cmd.isClub = 1;
                        for (var i = 0; i < this._curMath.floorList.length; i++) {
                            if (this._curMath.floorId == this._curMath.floorList[i].floorId) {
                                if (this._curMath.floorList.length >= (i + 2)) {
                                    cmd.floorId = this._curMath.floorList[i + 1].floorId;
                                }
                                else {
                                    cmd.floorId = this._curMath.floorList[0].floorId;
                                }
                            }
                        }
                        clubnew.ClubData.getInstance().isclubchangefloor = 1;
                        NetMgr.tcpSend(cmd);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("暂时只有1层包厢，无法切换!");
                    }
                }
            }
        };
        ClubDeskPanel.prototype.showClubFloordetails = function () {
            // if (this.clubRoomdetails == null) {
            this.clubFloordetails = new clubnew.ClubFloordetails();
            uniLib.PopUpMgr.addPopUp(this.clubFloordetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            // }
        };
        ClubDeskPanel.prototype.removeClubFloordetails = function () {
            if (this.clubFloordetails) {
                uniLib.PopUpMgr.removePopUp(this.clubFloordetails);
                // this.clubRoomdetails.removeListener();
                this.clubFloordetails = null;
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
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            }
            else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "老友圈") : "";
            uniLib.ZQGameSdk.share(vo, null, this);
        };
        ClubDeskPanel.prototype.itemTap = function (evt) {
            this.showClubRoomdetails();
            if (this.clubRoomdetails) {
                this.clubRoomdetails.setDate(this._curMath);
                var item = this.deskList.selectedItem;
                this.clubRoomdetails.setUserDate(item);
            }
        };
        ClubDeskPanel.prototype.showClubRoomdetails = function () {
            this.clubRoomdetails = new clubnew.ClubRoomdetails();
            this.clubRoomdetails.addEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
            uniLib.PopUpMgr.addPopUp(this.clubRoomdetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        };
        ClubDeskPanel.prototype.removeClubRoomdetails = function () {
            if (this.clubRoomdetails) {
                this.clubRoomdetails.removeEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
                uniLib.PopUpMgr.removePopUp(this.clubRoomdetails);
                this.clubRoomdetails = null;
            }
        };
        ClubDeskPanel.prototype.removeTimer = function () {
            this._ztimer.stop();
            clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
            ;
            this.removeClubRoomdetails();
        };
        return ClubDeskPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubDeskPanel = ClubDeskPanel;
    __reflect(ClubDeskPanel.prototype, "clubnew.ClubDeskPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**
     *第一次进入老友圈的玩家检验，加备注
     */
    var ClubEnterRemarks = (function (_super) {
        __extends(ClubEnterRemarks, _super);
        function ClubEnterRemarks() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubEnterRemarksSkin";
            return _this;
        }
        ClubEnterRemarks.prototype.initUI = function () {
            this._closebtn.setColorMatrix();
        };
        ClubEnterRemarks.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.addEventListener(clubnew.ClubConst.NotifyImportNoteCmd, this.setDate, this);
            this.remarksText.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        ClubEnterRemarks.prototype.removEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.NotifyImportNoteCmd, this.setDate, this);
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
                _super.prototype.removePop.call(this);
            }
            else if (e.target == this._closebtn) {
                _super.prototype.removePop.call(this);
            }
        };
        return ClubEnterRemarks;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubEnterRemarks = ClubEnterRemarks;
    __reflect(ClubEnterRemarks.prototype, "clubnew.ClubEnterRemarks");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**楼层房间信息 */
    var ClubFloordetails = (function (_super) {
        __extends(ClubFloordetails, _super);
        function ClubFloordetails() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubRoomdetailsSkin";
            return _this;
        }
        ClubFloordetails.prototype.initUI = function () {
        };
        ClubFloordetails.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubFloordetails.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubFloordetails.prototype.setDate = function (date) {
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
            this.pnumberText.text = this.info.userNbr + "人";
            this.enterRoomBtn.visible = false;
        };
        ClubFloordetails.prototype.setdeskDate = function (date) {
            if (!date)
                return;
            this.deskInfo = date;
            this.gameText.text = this.deskInfo.gameName;
            //  MJLobbyData.getInstance().getGameCreateConfig(this.info.gameId).gameName;
            this.gnumberText.text = this.deskInfo.gameNbr.toString() + "局";
            if (this.deskInfo.gameNbr >= 49) {
                this.gnumberText.text = Math.round(this.deskInfo.gameNbr) + "课";
            }
            if (this.deskInfo.gameId == 4182) {
                this.gnumberText.text = Math.round(this.deskInfo.gameNbr) + "锅底";
            }
            this.playText.text = this.deskInfo.playTypeDesc;
            this.pnumberText.text = this.deskInfo.userNbr + "人";
            this.enterRoomBtn.visible = false;
        };
        ClubFloordetails.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
            }
        };
        return ClubFloordetails;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubFloordetails = ClubFloordetails;
    __reflect(ClubFloordetails.prototype, "clubnew.ClubFloordetails");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            if (this.info.state && this.info.state == 8) {
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
                        if (i == 4) {
                            break;
                        }
                        if (i == 0) {
                            this.headbg1.source = this.info.list[i].headUrl;
                            this.headbg1.width = 46;
                            this.headbg1.height = 46;
                            this.headbg1.visible = true;
                            this.kuang1.visible = true;
                        }
                        else if (i == 1) {
                            this.headbg2.source = this.info.list[i].headUrl;
                            this.headbg2.width = 46;
                            this.headbg2.height = 46;
                            this.headbg2.visible = true;
                            this.kuang2.visible = true;
                        }
                        else if (i == 2) {
                            this.headbg3.source = this.info.list[i].headUrl;
                            this.headbg3.width = 46;
                            this.headbg3.height = 46;
                            this.headbg3.visible = true;
                            this.kuang3.visible = true;
                        }
                        else if (i == 3) {
                            this.headbg4.source = this.info.list[i].headUrl;
                            this.headbg4.width = 46;
                            this.headbg4.height = 46;
                            this.headbg4.visible = true;
                            this.kuang4.visible = true;
                        }
                    }
                }
                if (!this.info.state) {
                    this.state.source = "club_json.club_waiting";
                    this.state.visible = true;
                }
                else if (this.info.state == 1) {
                    this.state.source = "club_json.club_ingame";
                    this.state.visible = true;
                    this.gamesNumberText.visible = true;
                    this.gamesNumberText.text = "   第" + this.info.curGameNbr + "/" + this.info.gameNbr + "局";
                    if (this.info.gameNbr >= 49) {
                        this.gamesNumberText.text = "   第" + this.info.curGameNbr + "局";
                    }
                }
            }
        };
        return ClubItemDesk;
    }(eui.ItemRenderer));
    clubnew.ClubItemDesk = ClubItemDesk;
    __reflect(ClubItemDesk.prototype, "clubnew.ClubItemDesk");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    var ClubManageChangeBWPanel = (function (_super) {
        __extends(ClubManageChangeBWPanel, _super);
        function ClubManageChangeBWPanel(player) {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubManageChangeBWSkin";
            _this.playerinfo = player;
            return _this;
        }
        ClubManageChangeBWPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubManageChangeBWPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
        };
        ClubManageChangeBWPanel.prototype.initUI = function () {
            this.updateDate();
            this.closeBtn.setColorMatrix();
        };
        ClubManageChangeBWPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubManageChangeBWPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubManageChangeBWPanel.prototype.updateDate = function () {
            this.idTxt.text = this.playerinfo.uid + "";
            this.nameTxt.text = this.playerinfo.nickname;
            switch (this.playerinfo.type) {
                case 0:
                    this.youkeBtn.selected = true;
                    break;
                case 1:
                    this.whiteBtn.selected = true;
                    break;
                case 2:
                    this.blackBtn.selected = true;
                    break;
            }
            this.switch();
        };
        ClubManageChangeBWPanel.prototype.onClickTap = function (e) {
            if (e.target == this.closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.sureBtn) {
                var cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                cmd.reply = this.chosenum;
                cmd.uid = this.playerinfo.uid;
                cmd.matchId = clubnew.ClubManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.youkeBtn
                || e.target == this.whiteBtn
                || e.target == this.blackBtn) {
                e.target.selected = true;
                this.switch();
            }
        };
        ClubManageChangeBWPanel.prototype.switch = function () {
            if (this.youkeBtn.selected == true) {
                this.chosenum = 0;
            }
            else if (this.whiteBtn.selected == true) {
                this.chosenum = 2;
            }
            else if (this.blackBtn.selected == true) {
                this.chosenum = 3;
            }
        };
        return ClubManageChangeBWPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubManageChangeBWPanel = ClubManageChangeBWPanel;
    __reflect(ClubManageChangeBWPanel.prototype, "clubnew.ClubManageChangeBWPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    var ClubManagePanel = (function (_super) {
        __extends(ClubManagePanel, _super);
        function ClubManagePanel() {
            var _this = _super.call(this) || this;
            _this.matchIdList = [];
            _this.waitList = new Array();
            _this.skinName = "ClubManageSkin";
            return _this;
        }
        ClubManagePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        ClubManagePanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this._messageList && this._messageList.numChildren) {
                for (var i = this._messageList.numChildren - 1; i >= 0; i--) {
                    var item = this._messageList.getChildAt(i);
                    item.destroy();
                }
            }
            this._dataArr = null;
        };
        ClubManagePanel.prototype.initUI = function () {
            ClubManagePanel.Instanc = this;
            this._closeBtn.setColorMatrix();
            this._matchList.itemRenderer = clubnew.MatchRadioButton;
            this.updataMatchList();
            this.updataMessageList();
            this.updataMemeberList();
            this._detailsGroup.visible = this._messageGroup.visible = this._memberGroup.visible
                = this._fightingGroup.visible = this._blackandwhiteGroup.visible = false;
            this.uidEditableText.restrict = "0-9";
            this.uidEditableText.inputType = egret.TextFieldInputType.TEL;
            this.removeRedPoint();
            uniLib.Global.addEventListener(clubnew.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.addEventListener(clubnew.ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.addEventListener(clubnew.ClubConst.JoinMemberListManage, this.JoinMemberListMatch, this);
        };
        ClubManagePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this._matchTableList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
        };
        ClubManagePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this._matchTableList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            this.removeRedPoint();
            uniLib.Global.removeEventListener(clubnew.ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.JoinMemberListManage, this.JoinMemberListMatch, this);
        };
        /**设置按钮开关 */
        ClubManagePanel.prototype.OnOpen = function () {
            this._leftGroup.x = -735;
            this._rightGroup.x = this.width;
            egret.Tween.get(this._leftGroup).to({ x: 0 }, 300);
            egret.Tween.get(this._rightGroup).to({ x: this.width - 372 }, 300);
        };
        ClubManagePanel.prototype.OnClose = function () {
            egret.Tween.get(this._leftGroup).to({ x: -735 }, 300);
            egret.Tween.get(this._rightGroup).to({ x: this.width }, 300).call(function () {
                return clubnew.ClubModuleMgr.getInstance().removeClubManagePanel();
            });
        };
        ClubManagePanel.prototype.updataMatchList = function () {
            if (!this._dataArr) {
                this._dataArr = new eui.ArrayCollection(this.matchIdList);
                this._matchList.dataProvider = this._dataArr;
            }
            else {
                this._dataArr.removeAll();
                this._dataArr.replaceAll(this.matchIdList);
            }
        };
        ClubManagePanel.prototype.updataMessageList = function () {
            this._messageList.itemRenderer = clubnew.MatchMessageItem;
            if (this.joinNewMember && this.joinNewMember.length > 0) {
                this.msgImg.visible = false;
            }
            else {
                this.msgImg.visible = true;
            }
            this._messageList.dataProvider = new eui.ArrayCollection(this.joinNewMember);
        };
        ClubManagePanel.prototype.updataFightingList = function () {
            this.fightingList.itemRenderer = clubnew.MatchFightingItem;
            this.fightingList.dataProvider = new eui.ArrayCollection(this.roomList);
        };
        ClubManagePanel.prototype.updataMemeberList = function () {
            this.memeberList.itemRenderer = clubnew.MatchMemberItem;
            this.memeberList.dataProvider = new eui.ArrayCollection(this.member);
        };
        ClubManagePanel.prototype.updataTableList = function () {
            this._matchTableList.itemRenderer = clubnew.MatchTableItem;
            if (this.roomList && this.roomList.length > 0) {
                this.roommsgImg.visible = false;
            }
            else {
                this.roommsgImg.visible = true;
            }
            this.roomList.forEach(function (f) {
                if (!Array.isArray(f.list)) {
                    f.list = [];
                }
            });
            this._matchTableList.dataProvider = new eui.ArrayCollection(this.roomList);
        };
        /**
         * 红点
         */
        ClubManagePanel.prototype.addRedPoint = function () {
            var redPoint = this.messageButton.skin["redPoint"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        };
        ClubManagePanel.prototype.removeRedPoint = function () {
            var redPoint = this.messageButton.skin["redPoint"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        };
        ClubManagePanel.prototype.updataDetails = function (curMath) {
            if (!curMath)
                return;
            this.ownerid = curMath.ownerid;
            var state = (curMath && curMath.state == 1) ? 1 : 0;
            this._clubtypebtn.currentState = state == 1 ? "down" : "up";
            if (curMath && curMath.openNbrs) {
                this.todaynum.text = "" + curMath.openNbrs[0];
                this.yesterdaynum.text = "" + curMath.openNbrs[1];
                this.sevendaynum.text = "" + curMath.openNbrs[2];
                this.thirtydaynum.text = "" + curMath.openNbrs[3];
            }
            this.roomList = (curMath && curMath.roomList instanceof Array) ? curMath.roomList : [];
            this.updataTableList();
            this.updataFightingList();
            var curMatchId = (curMath ? curMath.matchId : null);
            for (var i = 0; i < this.matchIdList.length; i++) {
                if (this.matchIdList[i] == curMatchId) {
                    this._matchList.selectedIndex = i;
                    break;
                }
            }
            this.shareInfo = curMath ? curMath.shareInfo : null;
        };
        ClubManagePanel.prototype.initReturnMatchGroup = function (evt) {
            var data = evt.param;
            if (!Array.isArray(data.matchIdList)) {
                clubnew.ClubModuleMgr.getInstance().closeClubManagePanel();
            }
            this.waitList = [];
            this.matchIdList = data && data.matchIdList && data.matchIdList instanceof Array ? data.matchIdList : [];
            this.waitList = data != null && data.curMath != null && data.curMath.waitUserList != null && data.curMath.waitUserList instanceof Array && data.curMath.waitUserList.length > 0 ? data.curMath.waitUserList : [];
            this.updataMatchList();
            if (this.matchIdList.length > 4) {
                this.morelistImg.visible = true;
            }
            else {
                this.morelistImg.visible = false;
            }
            this.updataDetails((data ? data.curMath : null));
            if (data && data.matchIdList && data.matchIdList.length > 0) {
                switch (clubnew.ClubData.getInstance().clubChoice) {
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
                this.switchWindow();
            }
            this.updataButtonEnabled();
        };
        ClubManagePanel.prototype.updataButtonEnabled = function () {
            var bool = this.matchIdList && this.matchIdList.length > 0 ? true : false;
            this.detailsButton.enabled = bool;
            this.memberButton.enabled = bool;
            this.messageButton.enabled = bool;
            this.fightingButton.enabled = bool;
            if (bool == false) {
                this._detailsGroup.visible = bool;
                this._messageGroup.visible = bool;
                this._memberGroup.visible = bool;
                this._fightingGroup.visible = bool;
            }
        };
        ClubManagePanel.prototype.initMemberList = function (evt) {
            var member = evt.param;
            member.whitelist = (member.whitelist && member.whitelist instanceof Array) ? member.whitelist : [];
            member.blacklist = (member.blacklist && member.blacklist instanceof Array) ? member.blacklist : [];
            for (var _i = 0, _a = member.whitelist; _i < _a.length; _i++) {
                var item = _a[_i];
                item.type = 1;
            }
            for (var _b = 0, _c = member.blacklist; _b < _c.length; _b++) {
                var item = _c[_b];
                item.type = 2;
            }
            this.member = member.whitelist.concat(member.blacklist);
            this.updataMemeberList();
        };
        ClubManagePanel.prototype.initHistory = function (history) {
            if (!history || history.matchId != this.selectMatchId) {
                return;
            }
        };
        ClubManagePanel.prototype.JoinMemberListMatch = function (evt) {
            var _this = this;
            var joinMember = evt.param;
            this.joinMember = [];
            this.joinNewMember = [];
            clubnew.ClubData.getInstance().matchid = this.selectMatchId;
            if (joinMember && joinMember.list && joinMember.list instanceof Array) {
                this.joinMember = joinMember.list;
                joinMember.list.forEach(function (element) {
                    if (element.matchId == clubnew.ClubData.getInstance().matchid) {
                        _this.joinNewMember.push(element);
                    }
                });
            }
            this.updataMessageList();
            if (this.joinNewMember && this.joinNewMember.length > 0) {
                this.addRedPoint();
            }
            else {
                this.removeRedPoint();
            }
        };
        ClubManagePanel.prototype.switchWindow = function () {
            this._detailsGroup.visible = this._messageGroup.visible = this._memberGroup.visible
                = this._fightingGroup.visible = this._blackandwhiteGroup.visible = false;
            if (this.detailsButton.selected) {
                this._detailsGroup.visible = true;
            }
            else if (this.memberButton.selected) {
                this._memberGroup.visible = true;
            }
            else if (this.messageButton.selected) {
                this._messageGroup.visible = true;
            }
            else if (this.fightingButton.selected) {
                this._fightingGroup.visible = true;
            }
            else if (this.blackwhiteBtn.selected) {
                this._blackandwhiteGroup.visible = true;
            }
        };
        ClubManagePanel.prototype.onClickTap = function (e) {
            if (e.target == this.detailsButton
                || e.target == this.memberButton
                || e.target == this.messageButton
                || e.target == this.fightingButton
                || e.target == this.blackwhiteBtn) {
                e.target.selected = true;
                this.switchWindow();
                if (e.target == this.memberButton) {
                    var cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this.selectMatchId;
                    NetMgr.tcpSend(cmd);
                }
            }
            else if (e.target == this._closeBtn || e.target == this.rectbg) {
                clubnew.ClubModuleMgr.getInstance().closeClubManagePanel();
            }
            else if (e.target == this._clubtypebtn) {
                var self_1 = this;
                var okFunc = function () {
                    var cmd = new Cmd.OperateMatchGroupCmd_C();
                    if (self_1._clubtypebtn.currentState == "up")
                        cmd.state = 1;
                    else
                        cmd.state = 0;
                    cmd.matchId = self_1.selectMatchId;
                    NetMgr.tcpSend(cmd);
                };
                var msgBox = new clubnew.MatchMsgBox();
                if (this._clubtypebtn.currentState == "up")
                    msgBox.setData("温馨提示", "您确定要暂停该老友圈吗？", ["确定", "取消"], [okFunc]);
                else
                    msgBox.setData("温馨提示", "恢复老友圈会清除之前战绩,重新开始老友圈统计,继续吗？", ["确定", "取消"], [okFunc]);
                uniLib.PopUpMgr.addPopUp(msgBox, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                return;
            }
            else if (e.target == this._dissclubbtn) {
                var msgBox = new clubnew.MatchMsgBox();
                var self_2 = this;
                this.ownerid;
                var okFunc = function () {
                    var MatchId = self_2.selectMatchId;
                    if (uniLib.UserInfo.uid == self_2.ownerid) {
                        if (MatchId == clubnew.ClubData.getInstance().clubmatchid) {
                            clubnew.ClubModuleMgr.getInstance().removeClubDeskPanel();
                            ;
                        }
                    }
                    var cmd = new Cmd.RequestDeleteMatchGroupCmd_C();
                    cmd.matchId = self_2.selectMatchId;
                    NetMgr.tcpSend(cmd);
                };
                msgBox.setData("温馨提示", "您确定要解散该老友圈吗？", ["确定", "取消"], [okFunc]);
                uniLib.PopUpMgr.addPopUp(msgBox, null, true, true, 0, uniLib.PopUpEffect.CENTER);
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
                cmd.matchId = ClubManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this._setbtn) {
                var req = new Cmd.RequestChangeMatchGroupCmd_C();
                req.matchId = ClubManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this._refreshbtn) {
                this.onMatchListTap(null);
            }
        };
        /**
         * 显示匹配等待列表
         */
        ClubManagePanel.prototype.showWaitPlayerList = function () {
            if (this.waitList.length > 0) {
                var listPanel = new clubnew.ActiveRoomInformationPanel();
                uniLib.PopUpMgr.addPopUp(listPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("当前房间没有等待玩家");
            }
        };
        //截图分享
        ClubManagePanel.prototype.onShare = function () {
            var vo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            var tx = uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(this._memberGroup.x, this._memberGroup.y, this._memberGroup.width, this._memberGroup.height), 0.6);
            var bmp = new egret.Bitmap(tx);
            vo.shareImageData = uniLib.DisplayUtils.catchScreen(bmp, new egret.Rectangle(this._memberGroup.x, this._memberGroup.y, this._memberGroup.width, this._memberGroup.height));
            uniLib.ZQGameSdk.share(vo, this.updataMemeberList, this);
        };
        ClubManagePanel.prototype.onShareTap = function () {
            var codeId = this.selectMatchId;
            var vo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                var nick = uniLib.UserInfo.nickName;
                if (nick.length > 8) {
                    nick = nick.slice(0, 8);
                }
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            }
            else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "老友圈") : "";
            uniLib.ZQGameSdk.share(vo, null, this);
        };
        Object.defineProperty(ClubManagePanel.prototype, "selectMatchId", {
            get: function () {
                return this.matchIdList[this._matchList.selectedIndex];
            },
            enumerable: true,
            configurable: true
        });
        ClubManagePanel.prototype.onMatchListTap = function (e) {
            var cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        ClubManagePanel.prototype.onTableListTap = function (e) {
            var item = this._matchTableList.selectedItem;
            var cmd = new Cmd.ActiveDetailRoomCmd_C();
            cmd.roomId = item.roomId;
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        };
        return ClubManagePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubManagePanel = ClubManagePanel;
    __reflect(ClubManagePanel.prototype, "clubnew.ClubManagePanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    var ClubData = (function () {
        function ClubData() {
            /**俱乐部管理页面，今日（1）、昨日 （2）、前日（3） 输赢 */
            this.clubDayChose = 1;
            /**老友圈 是否新创楼层（包厢） */
            this.isnewfloor = 0;
            /**老友圈 新楼层是第几层 */
            this.newfloor = 0;
            /**老友圈 判断是否房主或副房主 */
            this.isclubmanagor = 0;
            /**老友圈 判断是否切换楼层 */
            this.isclubchangefloor = 0;
        }
        ClubData.getInstance = function () {
            if (!this._instance) {
                this._instance = new ClubData();
            }
            return this._instance;
        };
        return ClubData;
    }());
    clubnew.ClubData = ClubData;
    __reflect(ClubData.prototype, "clubnew.ClubData");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    var ClubNewBoxItemPanel = (function (_super) {
        __extends(ClubNewBoxItemPanel, _super);
        function ClubNewBoxItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubNewBoxItemSkin";
            _this.addListener();
            return _this;
        }
        ClubNewBoxItemPanel.prototype.addListener = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubNewBoxItemPanel.prototype.removeListener = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubNewBoxItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ClubNewBoxItemPanel.prototype.dataChanged = function () {
            this.info = this.data;
            if (this.info.gameId) {
                var config = ConfigMgr.getInstance().getGameCfgById(this.info.gameId);
                this._gameIconImg.source = uniLib.Global.CdnDomains[0] + uniLib.GameModuleUtils.gameRemotePaths[0] + config.gameIconUrl;
                this._gameTypeTxt.text = this.info.gameName;
                this._gameNumTxt.text = this.info.gameNbr + "局";
                this._personNumTxt.text = this.info.userNbr + "人";
                this._createBtn.visible = false;
                this._switchBtn.visible = true;
                this._msgTxt.visible = false;
                this._detailsBtn.visible = true;
                this._setBtn.visible = false;
                this._closeBtn.visible = false;
                if (clubnew.ClubData.getInstance().isclubmanagor == 1) {
                    this._detailsBtn.visible = false;
                    this._setBtn.visible = true;
                    this._closeBtn.visible = true;
                }
            }
            else {
                this._gameIconImg.visible = false;
                this._gameTypeTxt.visible = false;
                this._gameNumTxt.visible = false;
                this._personNumTxt.visible = false;
                this._createBtn.visible = true;
                this._switchBtn.visible = false;
                this._msgTxt.visible = true;
                this._detailsBtn.visible = false;
                this._setBtn.visible = false;
                this._closeBtn.visible = false;
            }
        };
        ClubNewBoxItemPanel.prototype.onClickTap = function (e) {
            // let req: Cmd.OperateFloorMatchGroupCmd_CS = new Cmd.OperateFloorMatchGroupCmd_CS;
            // req.matchId = ClubData.getInstance().clubmatchid;
            // req.floorId = this.info.floorId;
            // NetMgr.tcpSend(req);
            if (e.target == this._createBtn) {
                var cmd = new Cmd.GetNormalGameListRoomCmd_C();
                cmd.isClub = 1;
                cmd.lobbyId = MJLobbyData.getInstance().lobbyId;
                NetMgr.tcpSend(cmd);
                clubnew.ClubData.getInstance().isnewfloor = 1;
                clubnew.ClubData.getInstance().newfloor = this.info.floorId;
            }
            else if (e.target == this._switchBtn) {
                var cmd = new Cmd.RequestMatchGroupCmd_C();
                cmd.matchId = clubnew.ClubData.getInstance().clubmatchid;
                cmd.isClub = 1;
                cmd.floorId = this.info.floorId;
                clubnew.ClubData.getInstance().isclubchangefloor = 1;
                NetMgr.tcpSend(cmd);
                clubnew.ClubModuleMgr.getInstance().closeClubNewBoxPanel();
            }
            else if (e.target == this._detailsBtn) {
                this.showClubFloordetails();
                if (this.clubFloordetails) {
                    this.clubFloordetails.setDate(this.info);
                }
            }
            else if (e.target == this._setBtn) {
                clubnew.ClubSendMgr.sendOFMGCmd_CS(clubnew.ClubData.getInstance().clubmatchid, this.info.floorId, 2);
            }
            else if (e.target == this._closeBtn) {
                var self_3 = this;
                var deleteFun = function () {
                    clubnew.ClubSendMgr.sendOFMGCmd_CS(clubnew.ClubData.getInstance().clubmatchid, self_3.info.floorId, 4);
                    clubnew.ClubModuleMgr.getInstance().closeClubNewBoxPanel();
                };
                var msgBox = new clubnew.MatchMsgBox();
                msgBox.setData("温馨提示", "是否确认删除该包厢吗？", ["确定", "取消"], [deleteFun]);
                uniLib.PopUpMgr.addPopUp(msgBox, null, true);
            }
        };
        ClubNewBoxItemPanel.prototype.showClubFloordetails = function () {
            // if (this.clubRoomdetails == null) {
            this.clubFloordetails = new clubnew.ClubFloordetails();
            uniLib.PopUpMgr.addPopUp(this.clubFloordetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            // }
        };
        ClubNewBoxItemPanel.prototype.removeClubFloordetails = function () {
            if (this.clubFloordetails) {
                uniLib.PopUpMgr.removePopUp(this.clubFloordetails);
                // this.clubRoomdetails.removeListener();
                this.clubFloordetails = null;
            }
        };
        return ClubNewBoxItemPanel;
    }(eui.ItemRenderer));
    clubnew.ClubNewBoxItemPanel = ClubNewBoxItemPanel;
    __reflect(ClubNewBoxItemPanel.prototype, "clubnew.ClubNewBoxItemPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    var ClubNewBoxPanel = (function (_super) {
        __extends(ClubNewBoxPanel, _super);
        function ClubNewBoxPanel(floor) {
            var _this = _super.call(this) || this;
            _this._curMath = floor;
            _this._floorList = floor.floorList;
            _this.skinName = "ClubNewBoxSkin";
            return _this;
        }
        ClubNewBoxPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        ClubNewBoxPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            if (this.floorList && this.floorList.numChildren) {
                for (var i = this.floorList.numChildren - 1; i >= 0; i--) {
                    var item = this.floorList.getChildAt(i);
                    item.removeListener();
                    item = null;
                }
            }
        };
        ClubNewBoxPanel.prototype.initUI = function () {
            this.updateDate();
            this.closeBtn.setColorMatrix();
        };
        ClubNewBoxPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubNewBoxPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        ClubNewBoxPanel.prototype.updateDate = function () {
            //当前选择的楼层
            this._choice = this._curMath.floorId;
            switch (this._choice) {
                case 1:
                    this.onefloor.visible = true;
                    break;
                case 2:
                    this.twofloor.visible = true;
                    break;
                case 3:
                    this.threefloor.visible = true;
                    break;
                case 4:
                    this.fourfloor.visible = true;
                    break;
                case 5:
                    this.fivefloor.visible = true;
                    break;
            }
            //构建楼层数据
            var list = [];
            var _loop_1 = function (i) {
                if (Array.isArray(this_1._floorList)) {
                    this_1._floorList.forEach(function (element) {
                        if (element.floorId == i + 1) {
                            list.push(element);
                        }
                    });
                }
                if (!list[i]) {
                    var info = new Cmd.FloorInfo();
                    info.floorId = i + 1;
                    list.push(info);
                }
            };
            var this_1 = this;
            for (var i = 0; i < 5; i++) {
                _loop_1(i);
            }
            this.floorList.itemRenderer = clubnew.ClubNewBoxItemPanel;
            this.floorList.dataProvider = new eui.ArrayCollection(list);
        };
        ClubNewBoxPanel.prototype.onClickTap = function (e) {
            if (e.target == this.bgRect || e.target == this.closeBtn) {
                this.OnClose();
            }
        };
        /**设置按钮开关 */
        ClubNewBoxPanel.prototype.OnOpen = function () {
            this.floorGroup.x = -600;
            egret.Tween.get(this.floorGroup).to({ x: 0 }, 300);
        };
        ClubNewBoxPanel.prototype.OnClose = function () {
            // GameView.Instance.closeSetting();
            egret.Tween.get(this.floorGroup).to({ x: -600 }, 300).call(function () {
                return clubnew.ClubModuleMgr.getInstance().removeClubNewBoxPanel();
            });
            // egret.Tween.get(this.setGroup).to({ height: 0 }, 100).call(() => PopupManager.removePopUp(SetOpreatePanel.instance));
        };
        return ClubNewBoxPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubNewBoxPanel = ClubNewBoxPanel;
    __reflect(ClubNewBoxPanel.prototype, "clubnew.ClubNewBoxPanel");
})(clubnew || (clubnew = {}));
/**
 * 老友圈公告界面
 */
var clubnew;
(function (clubnew) {
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
            uniLib.Global.addEventListener(clubnew.ClubConst.CLUB_NOTICE, this.showNotice, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        };
        ClubNoticePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.MemberInfoMatchGroup, this.showNotice, this);
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
    clubnew.ClubNoticePanel = ClubNoticePanel;
    __reflect(ClubNoticePanel.prototype, "clubnew.ClubNoticePanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**
    * 单个房间详情 玩家头像
    */
    var ClubPlayerListHeadPanel = (function (_super) {
        __extends(ClubPlayerListHeadPanel, _super);
        function ClubPlayerListHeadPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "ClubPlayerListHeadSkin";
            _this.ownerGroup.visible = false;
            return _this;
        }
        ClubPlayerListHeadPanel.prototype.dataChanged = function () {
            this.info = this.data;
            this.headImg.source = this.info.headUrl;
            if (this.info.membertype == 1) {
                this.ownerGroup.visible = true;
                this.ownerTxt.text = "圈主";
            }
            if (this.info.membertype == 2) {
                this.ownerGroup.visible = true;
                this.ownerTxt.text = "管理员";
            }
            if (this.info.state == 1) {
                this.onlinestate.source = "club_online";
            }
            else {
                this.onlinestate.source = "club_no_online";
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
    clubnew.ClubPlayerListHeadPanel = ClubPlayerListHeadPanel;
    __reflect(ClubPlayerListHeadPanel.prototype, "clubnew.ClubPlayerListHeadPanel");
})(clubnew || (clubnew = {}));
/**
 * 老友圈成员列表界面
 */
var clubnew;
(function (clubnew) {
    var ClubPlayerListPanel = (function (_super) {
        __extends(ClubPlayerListPanel, _super);
        function ClubPlayerListPanel() {
            var _this = _super.call(this) || this;
            _this._list = [];
            _this.skinName = "ClubPlayerListSkin";
            return _this;
        }
        ClubPlayerListPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
            this.closeBtn.setColorMatrix();
        };
        /**事件监听 */
        ClubPlayerListPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(clubnew.ClubConst.MemberInfoMatchGroup, this.showList, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            this.headList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        ClubPlayerListPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.removeEventListener(clubnew.ClubConst.MemberInfoMatchGroup, this.showList, this);
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
                this.headList.itemRenderer = clubnew.ClubPlayerListHeadPanel;
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
            if (evt.target == this.bgRect || evt.target == this.closeBtn) {
                this.OnClose();
            }
            // else if (evt.target == this.breakBtn) {
            //     let club = this;
            //     let okFunc = function () {
            //         let cmd = new Cmd.LeaveMatchGroup2Cmd_C();
            //         cmd.matchId = club._matchId;
            //         NetMgr.tcpSend(cmd);
            //         club.removePop();
            //         // uniLib.PopUpMgr.removePopUp(ClubDeskPanel);
            //          ClubModuleMgr.getInstance().removeClubDeskPanel();;
            //         LobbyModuleMgr.getInstance().showAllClubListPanel(() => {
            //             let cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
            //             cmd.isClub = 1;
            //             NetMgr.tcpSend(cmd);
            //         });
            //     }
            //     ComponentUtil.getInstance().showConfirm("是否确定退出老友圈?", "", "确定", okFunc, " 取消", null);
            // }
        };
        /**设置按钮开关 */
        ClubPlayerListPanel.prototype.OnOpen = function () {
            this.listGroup.x = -600;
            egret.Tween.get(this.listGroup).to({ x: 0 }, 300);
        };
        ClubPlayerListPanel.prototype.OnClose = function () {
            egret.Tween.get(this.listGroup).to({ x: -600 }, 300).call(function () {
                return clubnew.ClubModuleMgr.getInstance().removeClubPlayerListPanel();
            });
        };
        return ClubPlayerListPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubPlayerListPanel = ClubPlayerListPanel;
    __reflect(ClubPlayerListPanel.prototype, "clubnew.ClubPlayerListPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**
     * 单个房间详情
     */
    var ClubRoomdetails = (function (_super) {
        __extends(ClubRoomdetails, _super);
        function ClubRoomdetails() {
            var _this = _super.call(this) || this;
            _this._head = [];
            _this.skinName = "ClubRoomdetailsSkin";
            return _this;
        }
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
                this.headList.itemRenderer = clubnew.ClubRoomdetailshead;
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
                req.floorId = this.info.floorId;
                req.roomId = this.info.matchId;
                NetMgr.tcpSend(req);
                _super.prototype.removePop.call(this);
            }
        };
        return ClubRoomdetails;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.ClubRoomdetails = ClubRoomdetails;
    __reflect(ClubRoomdetails.prototype, "clubnew.ClubRoomdetails");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
    clubnew.ClubRoomdetailshead = ClubRoomdetailshead;
    __reflect(ClubRoomdetailshead.prototype, "clubnew.ClubRoomdetailshead");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            uniLib.Global.addEventListener(clubnew.ClubConst.UserInfoSearchLobby, this.setdata, this);
        };
        ClubUserInfoPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(clubnew.ClubConst.UserInfoSearchLobby, this.setdata, this);
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
    clubnew.ClubUserInfoPanel = ClubUserInfoPanel;
    __reflect(ClubUserInfoPanel.prototype, "clubnew.ClubUserInfoPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            if (e.target == this._creatBtn) {
                this.createMatchReq();
            }
            else if (e.target == this._sureSetBtn) {
                this.settingHandel();
            }
            else if (e.target == this._permissionCheck || e.target == this._permissionLabel) {
                this._checkType = this._permissionCheck.selected = !this._checkType;
            }
            else if (e.target == this.closeBtn) {
                _super.prototype.removePop.call(this);
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
                }
            }
        };
        return CreateMatchSetPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.CreateMatchSetPanel = CreateMatchSetPanel;
    __reflect(CreateMatchSetPanel.prototype, "clubnew.CreateMatchSetPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            this.tableIdLabel.text = "桌号" + data.roomId + "";
            this.timeLabel.text = LobbyUtils.changeTimeToStr(data.beginTime) + "~" + LobbyUtils.changeTimeToStr(data.endTime);
            var item = data.list;
            this.nameandscore.itemRenderer = clubnew.MatchFightingNSPanel;
            this.nameandscore.dataProvider = new eui.ArrayCollection(item);
        };
        return MatchFightingItem;
    }(eui.ItemRenderer));
    clubnew.MatchFightingItem = MatchFightingItem;
    __reflect(MatchFightingItem.prototype, "clubnew.MatchFightingItem");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
    clubnew.MatchFightingNSPanel = MatchFightingNSPanel;
    __reflect(MatchFightingNSPanel.prototype, "clubnew.MatchFightingNSPanel");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            this.nameLabel.text = data.nickname;
            this.playerID.text = data.uid.toString();
            this.playertype.text = clubnew.DataManage.MatchMemberTypeToString(data.type);
            this.num.text = (this.itemIndex + 1) + "";
            if (this.itemIndex % 2 == 0) {
                this.bg.source = "club_manage_applyitem1";
            }
            if (data.headUrl) {
                this.headImg.source = data.headUrl;
            }
            this.changeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLabelTap, this);
        };
        MatchMemberItem.prototype.onLabelTap = function (e) {
            var data = this.data;
            var inputPanel = new clubnew.ClubManageChangeBWPanel(data);
            uniLib.PopUpMgr.addPopUp(inputPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        };
        return MatchMemberItem;
    }(eui.ItemRenderer));
    clubnew.MatchMemberItem = MatchMemberItem;
    __reflect(MatchMemberItem.prototype, "clubnew.MatchMemberItem");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**
     * 消息列表item
     */
    var MatchMessageItem = (function (_super) {
        __extends(MatchMessageItem, _super);
        function MatchMessageItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchMessageItemSkin";
            _this.addEvent();
            return _this;
        }
        MatchMessageItem.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        MatchMessageItem.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
        };
        MatchMessageItem.prototype.dataChanged = function () {
            var data = this.data;
            this.contenLabel.text = data.nickname + "";
            if (data.note) {
                this.contenRemarks.text = "备注：" + data.note + "";
            }
            else {
                this.contenRemarks.text = "备注：无";
            }
            if (data.headUrl) {
                this.headImg.source = data.headUrl;
            }
            if (this.itemIndex % 2 == 0) {
                this.bg.source = "club_manage_applyitem2";
            }
        };
        MatchMessageItem.prototype.onClickTap = function (e) {
            var data = this.data;
            if (e.target == this.disAgreeButton) {
                var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
                cmd.matchId = clubnew.ClubManagePanel.Instanc.selectMatchId;
                cmd.reply = 0;
                cmd.uid = data.uid;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.agreeButton) {
                var cmd = new Cmd.ReplyJoinMemberListMatchGroupCmd_C();
                cmd.matchId = clubnew.ClubManagePanel.Instanc.selectMatchId;
                cmd.reply = 1;
                cmd.uid = data.uid;
                NetMgr.tcpSend(cmd);
            }
        };
        return MatchMessageItem;
    }(eui.ItemRenderer));
    clubnew.MatchMessageItem = MatchMessageItem;
    __reflect(MatchMessageItem.prototype, "clubnew.MatchMessageItem");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
    /**
     * 免责申明
     */
    var MatchMsgBox = (function (_super) {
        __extends(MatchMsgBox, _super);
        function MatchMsgBox() {
            var _this = _super.call(this) || this;
            _this.skinName = "MatchMsgBoxSkin";
            return _this;
        }
        MatchMsgBox.prototype.initUI = function () {
            this._closebtn.setColorMatrix();
        };
        MatchMsgBox.prototype.setData = function (title, msg, labelArr, backFn, backObject) {
            if (labelArr === void 0) {
                labelArr = null;
            }
            if (backFn === void 0) {
                backFn = null;
            }
            if (backObject === void 0) {
                backObject = null;
            }
            this.title.text = "温馨提示";
            this.info.text = msg;
            this._backFn = backFn;
            this._backObject = backObject;
            if (labelArr.length == 1) {
                this.confirm.x = 220;
                this.confirm.visible = true;
                this.cancel.visible = false;
            }
            else if (labelArr.length == 2) {
                this.confirm.x = 66;
                this.confirm.visible = true;
                this.cancel.visible = true;
            }
            if (backFn && backFn[0]) {
                this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, backFn[0], backObject);
            }
            if (this._backFn && this._backFn[1]) {
                this.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], backObject);
            }
            this.confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            this.cancel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            this._closebtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
        };
        MatchMsgBox.prototype.destroy = function () {
            _super.prototype.removePop.call(this);
            if (this._backFn && this._backFn[0]) {
                this.confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[0], this._backObject);
            }
            if (this._backFn && this._backFn[1]) {
                this.cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this._backFn[1], this._backObject);
            }
            this.confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            this.cancel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            this._closebtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
        };
        return MatchMsgBox;
    }(commonpanel.LobbyBaseEuiPanel));
    clubnew.MatchMsgBox = MatchMsgBox;
    __reflect(MatchMsgBox.prototype, "clubnew.MatchMsgBox");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
    clubnew.MatchRadioButton = MatchRadioButton;
    __reflect(MatchRadioButton.prototype, "clubnew.MatchRadioButton");
})(clubnew || (clubnew = {}));
var clubnew;
(function (clubnew) {
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
            this.contentLabel.text = this.info.roomId + "";
            if (this.info.endTime != undefined) {
                this._gametype.text = "游戏结束";
                this._gametype.textColor = 0Xa1a1a1;
            }
            else {
                if (!this.info.state) {
                    this._gametype.text = "等待中";
                    this._gametype.textColor = 0X47db74;
                }
                else if (this.info.state == 1) {
                    this._gametype.text = "游戏中";
                    this._gametype.textColor = 0XFDBE85;
                }
            }
            this._gamename.text = "包厢" + this.info.floorId + "(" + this.info.gameName + ")";
            this._gamenum.text = member + "/" + this.info.userNbr;
        };
        return MatchTableItem;
    }(eui.ItemRenderer));
    clubnew.MatchTableItem = MatchTableItem;
    __reflect(MatchTableItem.prototype, "clubnew.MatchTableItem");
})(clubnew || (clubnew = {}));
