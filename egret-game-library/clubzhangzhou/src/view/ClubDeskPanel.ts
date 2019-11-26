module club {
    /**
     * 老友圈桌子面板
     */
    export class ClubDeskPanel extends commonpanel.LobbyBaseEuiPanel {
        /**桌子列表 */
        private deskList: eui.List;
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /**切换老友圈按钮 */
        private _swtichBtn: eui.Button;
        /**创建俱老友圈按钮 */
        private createBtn: eui.Button;
        /**老友圈管理按钮 */
        private _boxManageBtn: eui.WxButton;
        /**分享按钮 */
        private _shareBtn: eui.WxButton;
        /**在线玩家数 */
        private menberNum: eui.Label;
        /**成员列表按钮 */
        private _memberListBtn: eui.Button;
        /**审批按钮 */
        private _applyListBtn: eui.WxButton;
        /**老友圈号 */
        private _clubIdText: eui.Label;
        /**游戏玩法 */
        private _clubPlayText: eui.Label;
        /**合作群按钮 */
        private _partnerBtn: eui.Button;
        /**成员按钮 */
        private _partnerMemberBtn: eui.Button;
        /**老友圈标题 */
        private _titleText: eui.Label;
        /**刮奖按钮 */
        private _scratchBtn: eui.Button;
        /**公告按钮 */
        private _noticeBtn: eui.WxButton;
        /**跑马灯 */
        private _clubMsgMcPanel: ClubMsgMcPanel;
        /**玩家头像 */
        private _userHeadImg: eui.Image;
        private _headBg: eui.Image;
        /**玩法详情 */
        private _clubDetailBtn: eui.WxButton;
        /**快速加入 */
        private _fastPlayBtn: eui.WxButton;
        /**战绩按钮 */
        private _queryFightingBtn: eui.WxButton;
        /**群战绩按钮 */
        private _queryAllFightingBtn: eui.WxButton;
        /**用户昵称 */
        private _userNameText: eui.Label;
        /**用户ID*/
        private _userIdText: eui.Label;
        /**群主Id*/
        private _clubOwnerText: eui.Label;
        /**桌子列表数据 */
        private _deskList: Cmd.MathGroupRoomInfo[];
        /**老友圈数据 */
        private _curMath: Cmd.MathGroup;
        private _curMathlist: Cmd.MathGroup;
        /**显示房间详情 */
        private clubRoomdetails: ClubRoomdetails;
        /**是否管理员 */
        private isOwner: boolean;
        /**桌子容器 */
        private deskListArray: eui.ArrayCollection;
        /**构造后显示的数据 */
        private _showList: Cmd.MathGroupRoomInfo[];
        constructor() {
            super();
            this.skinName = "ClubDeskSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
            // this.width = uniLib.Global.screenWidth;
            // this.height = uniLib.Global.screenHeight;
        }
        public destroy(): void {
            super.destroy();
        }
        protected initUI() {
            this._scratchBtn.visible = Boolean(ClubData.getInstance().isShowScratch);
            this.deskList.itemRenderer = ClubItemDesk;
            this._clubMsgMcPanel.touchEnabled = true;
        }
        protected addEvent() {
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroupManage, this.updateplayTypeDesc, this);
            uniLib.Global.addEventListener(ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.addEventListener(ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this)
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            uniLib.Global.addEventListener(ClubConst.CLUB_NOTICE, this.updateNotice, this);
            this._clubMsgMcPanel.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showNotice, this);

        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroupManage, this.updateplayTypeDesc, this);
            uniLib.Global.removeEventListener(ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.removeEventListener(ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.deskList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            uniLib.Global.removeEventListener(ClubConst.CLUB_NOTICE, this.updateNotice, this);
            this._clubMsgMcPanel.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showNotice, this);
        }
        /**房主修改玩法后 修改桌面数据 */
        private updateplayTypeDesc(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.ReturnMatchGroupCmd_S;
            if (!date)
                return;
            if (date.curMath) {
                if (date.curMath.matchId == ClubData.getInstance().clubmatchid) {
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
        }
        /**更新桌子数据 */
        private updateDesk(list: Cmd.MathGroupRoomInfo[]): void {
            if (!this.deskListArray) {
                this.deskListArray = new eui.ArrayCollection(list);
                this.deskList.dataProvider = this.deskListArray;
            } else {
                if (Array.isArray(this.deskListArray.source)) {
                    this.deskListArray.removeAll();
                }
                this.deskListArray.replaceAll(list);
            }
        }
        /**构造桌子数据 */
        private getDeskList(roomlist: Cmd.MathGroupRoomInfo[]): void {
            this._showList = [];
            if (Array.isArray(roomlist)) {
                this._showList = roomlist.concat();

            }
            /**第一个快速进房 */
            let infozz1 = new Cmd.MathGroupRoomInfo();
            infozz1.state = ClubConst.CLUB_CREATEDESK;
            infozz1.userNbr = this._curMath.userNbr;
            this._showList.unshift(infozz1);

            if (this._showList.length < 8) {
                let listlength = this._showList.length;
                for (let i = 0; i < 8 - listlength; i++) {
                    let infozz = new Cmd.MathGroupRoomInfo();
                    infozz.state = ClubConst.CLUB_DESKSHOW;
                    infozz.userNbr = this._curMath.userNbr;
                    this._showList.push(infozz);
                }
            } else {
                let infozz = new Cmd.MathGroupRoomInfo();
                infozz.state = ClubConst.CLUB_DESKSHOW;
                infozz.userNbr = this._curMath.userNbr;
                this._showList.push(infozz);
            }
        }
        /**显示弹窗修改页面 */
        private showNotice(): void {
            let cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
            cmd.matchId = ClubData.getInstance().clubmatchid;
            NetMgr.tcpSend(cmd);
            ClubModuleMgr.getInstance().showClubNoticePanel();
        }
        public setDate(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.ReturnMatchGroupCmd_S;
            if (!date)
                return;
            this._curMath = date.curMath;
            if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid || uniLib.UserInfo.uid.toString() == this._curMath.masterid2) {
                ClubData.getInstance().isClubManage = true;
            } else {
                ClubData.getInstance().isClubManage = false;
            }
            ClubData.getInstance().clubShareInfo = this._curMath ? this._curMath.shareInfo : null;
            /**  判断是否有老友圈，没得话关闭桌面  */
            if (this._curMath) {
                if (ClubData.getInstance().isClubManage) {
                    this._boxManageBtn.visible = true;
                    this._applyListBtn.visible = true;
                    this._queryAllFightingBtn.visible = true;
                    this._queryFightingBtn.visible = false;
                    this._partnerBtn.visible = true;
                    this._partnerMemberBtn.visible = false;
                    this.isOwner = true;
                } else {
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
                ClubData.getInstance().clubmatchid = this._curMath.matchId;
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
                if (date.isFirst && ClubData.getInstance().isClubManage) {
                    ClubModuleMgr.getInstance().showClubGuidePanel();
                }
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.removePop();
            }
        }
        /**更新老友圈数据 */
        private updatedesklist(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.LatestMatchRoomInfoGroupCmd_Brd;
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
        }

        /**更新公告 */
        private updateNotice(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.ClubNoticeMatchGroupCmd_CS;
            if (!date)
                return;
            this._clubMsgMcPanel.getclubmsg(date.content);
        }
        /**断线重连 重新发协议 */
        private onSendmsg() {
            ClubSendMgr.requestMatchData(1);
        }
        /**头像蒙版 圆形 */
        private setPlayerIconMask(image: egret.Bitmap): void {
            let maskTexture: egret.Texture = RES.getRes("club_new_menage_json.club_head_bg");
            let maskImg: egret.Bitmap = new egret.Bitmap();
            this.addChild(maskImg);
            maskImg.texture = maskTexture;
            maskImg.width = 77;
            maskImg.height = 77;
            maskImg.x = (image.width - maskImg.width) / 2 + image.x;
            maskImg.y = (image.height - maskImg.height) / 2 + image.y;
            image.mask = maskImg;
        }
        /**显示红点 */
        private joinMember: Cmd.MatchGroupMemberInfo[];
        private showRedPoint(evt: uniLib.ZqEvent) {
            ClubData.getInstance().JoinMemberList = evt.param as Cmd.JoinMemberListMatchGroupCmd_S;
            this.joinMember = [];
            if (ClubData.getInstance().JoinMemberList && ClubData.getInstance().JoinMemberList.list && ClubData.getInstance().JoinMemberList.list instanceof Array)
                this.joinMember = ClubData.getInstance().JoinMemberList.list;
            if (this.joinMember && this.joinMember.length > 0) {
                if (ClubData.getInstance().isClubManage) {
                    this.addRedPoint();
                }
            } else {
                this.removeRedPoint();
            }
        }
        /**
          * 红点
          */
        private addRedPoint() {
            let redPoint: eui.Image = this.skin["_redPointImg"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        }
        /**删除红点 */
        private removeRedPoint() {
            let redPoint = this.skin["_redPointImg"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        }
        /**复制老友圈号 */
        private copyid(e: egret.TouchEvent) {
            uniLib.ZQGameSdk.nativeCopyStr(this._clubIdText.text);
            uniLib.TipsUtils.showTipsDownToUp("复制成功" + this._clubIdText.text);
        }

        private onClickTap(e: egret.TouchEvent) {
            var cmd;
            switch (e.target) {
                case this._closeBtn:
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    break;
                case this.createBtn:
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    ClubModuleMgr.getInstance().showCreateClubPanel();
                    break;
                case this._swtichBtn:
                    ClubSendMgr.requestClubMatchList();
                    break;
                case this._shareBtn:
                    this.onShareTap();
                    break;
                case this._memberListBtn:
                    ClubModuleMgr.getInstance().showClubPlayerListPanel(this.isOwner);
                    cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this._curMath.matchId;
                    cmd.typ = 1;
                    NetMgr.tcpSend(cmd);
                    break;
                case this._queryFightingBtn:
                    ClubModuleMgr.getInstance().showClubMemberRecordPanel(() => {
                        ClubSendMgr.getGameDataHistoryForMatch(this._curMath.matchId, 1, 1, ClubConst1.MATCH_HISTORY_FOR_MYSELF);
                    });
                    break;
                case this._queryAllFightingBtn:
                    ClubModuleMgr.getInstance().showClubAllRecordPanel(() => {
                        ClubSendMgr.getGameDataHistoryForMatch(this._curMath.matchId, 1, 1, ClubConst1.MATCH_HISTORY_FOR_DESK);
                    });
                    break;
                case this._boxManageBtn:
                    ClubData.getInstance().clubChoice = 1;
                    ClubModuleMgr.getInstance().showClubManagePanel();
                    ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                    break;
                case this._noticeBtn:
                    cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                    cmd.matchId = this._curMath.matchId;
                    NetMgr.tcpSend(cmd);
                    ClubModuleMgr.getInstance().showClubNoticePanel();
                    break;
                case this._scratchBtn:
                    cmd = new Cmd.IntoScratchTicketLobbyCmd_C();
                    NetMgr.tcpSend(cmd);
                    break;
                case this._fastPlayBtn:
                    ClubModuleMgr.getInstance().removeClubDeskPanel();
                    let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                    req.floorId = this._curMath.floorId;
                    req.roomId = this._curMath.matchId;
                    NetMgr.tcpSend(req);
                    break;
                case this._applyListBtn:
                    ClubModuleMgr.getInstance().showClubUserApplyPanel();
                    break;
                case this._clubDetailBtn:
                    ClubModuleMgr.getInstance().showClubDetailsPanel(this._curMath);
                    break;
                case this._partnerBtn:
                    ClubModuleMgr.getInstance().showClubPartnerRecordPanel(() => {
                        cmd = new Cmd.GetPartnerRecordsMatchGroupCmd_CS();
                        cmd.matchId = ClubData.getInstance().clubmatchid;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
                case this._partnerMemberBtn:
                    ClubModuleMgr.getInstance().showClubPartnerMemberRecordPanel(() => {
                        cmd = new Cmd.GetMemberRecordsMatchGroupCmd_CS();
                        cmd.matchId = ClubData.getInstance().clubmatchid;
                        cmd.targetUid = uniLib.UserInfo.uid;
                        cmd.typ = 1;
                        NetMgr.tcpSend(cmd);
                    });
                    break;
            }
        }

        /**分享 */
        private shareInfo: Cmd.ShareInfo;
        private onShareTap() {
            let codeId = this._curMath.matchId;
            ClubData.getInstance().clubShareInfo = this.shareInfo = this._curMath ? this._curMath.shareInfo : null;
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                var nick: string = uniLib.UserInfo.nickName;
                if (nick.length > 8) {
                    nick = nick.slice(0, 8);
                }
                if (MJLobbyData.getInstance().lobbyConfig.hasOwnProperty("newLink") && MJLobbyData.getInstance().lobbyConfig["newLink"] != "") {
                    vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + MJLobbyData.getInstance().lobbyConfig["newLink"] + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                } else {
                    vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wq.laoyouwan.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                }
            } else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.shareType = Cmd.ShareType.enterRoom;
            vo.wgShareData = JSON.stringify({ "roomId": codeId });
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        }

        /**桌子列表操作 */
        private itemTap(evt: eui.ItemTapEvent) {
            let item = this.deskList.selectedItem as Cmd.MathGroupRoomInfo;
            if (item.state == ClubConst.CLUB_CREATEDESK) {
                ClubModuleMgr.getInstance().removeClubDeskPanel();
                let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                req.floorId = this._curMath.floorId;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            } else {
                this.showClubRoomdetails();
                if (this.clubRoomdetails) {
                    this.clubRoomdetails.setDate(this._curMath);
                    let item = this.deskList.selectedItem as Cmd.MathGroupRoomInfo;
                    this.clubRoomdetails.setUserDate(item);
                }
            }
        }
        private showClubRoomdetails() {
            this.clubRoomdetails = new ClubRoomdetails();
            this.clubRoomdetails.addEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeDesk, this);
            uniLib.PopUpMgr.addPopUp(this.clubRoomdetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
        private removeClubRoomdetails() {
            if (this.clubRoomdetails) {
                this.clubRoomdetails.removeEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeDesk, this);
                uniLib.PopUpMgr.removePopUp(this.clubRoomdetails);
                this.clubRoomdetails = null;
            }
        }
        private removeDesk() {
            ClubModuleMgr.getInstance().removeClubDeskPanel();
            this.removeClubRoomdetails();
        }
    }
}