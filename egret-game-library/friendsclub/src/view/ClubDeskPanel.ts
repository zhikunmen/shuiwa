module friendsclub {

    /**
     * 亲友圈桌子面板
     */
    export class ClubDeskPanel extends commonpanel.LobbyBaseEuiPanel {
        private deskList: eui.List;
        private closeBtn: eui.Button;
        private swtichBtn: eui.Button;
        private createBtn: eui.Button;
        private boxManageBtn: eui.Button;
        private fastEnterBtn: eui.Button;
        private shareBtn: eui.Button;
        private memberListBtn: eui.Button;
        private applyListBtn: eui.Button;
        private noticeBtn: eui.Button;
        private queryFightingBtn: eui.Button;
        private play: eui.Label;
        private gameplay: eui.Label;
        private title: eui.Label;
        private switchFloorBtn: eui.Button;
        private floorUpBtn: eui.Button;
        private floorDownBtn: eui.Button;
        private floorNumTxt: eui.Label;
        private personNum: eui.Label;
        private zaixian: eui.Label;
        private gameTypeTxt: eui.Label;
        private gameIconImg: eui.Image;
        private detailsBtn: eui.Image;
        private detailsBtn0: eui.Label;
        private bg: eui.Image;
        /**跑马灯 */
        private _clubMsgMcPanel: ClubMsgMcPanel;

        private _deskList: Cmd.MathGroupRoomInfo[];
        private _ztimer: egret.Timer;
        private _curMath: Cmd.MathGroup;
        private _scroll: eui.Scroller;
        /**桌子信息*/
        private _dataArr: eui.ArrayCollection;
        constructor() {
            super();
            this.skinName = "ClubDeskSkin"
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public destroy(): void {
            super.destroy();
            this.destroyTimer();
            this._dataArr = null;
        }
        protected initUI() {
            this._ztimer = new egret.Timer(5000, 0);
            this._ztimer.start();
            if (uniLib.Utils.isPad()) {
                this.bg.height = 200;
            }
            this.deskList.itemRenderer = ClubItemDesk;
        }

        protected addEvent() {
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._ztimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this._scroll.addEventListener(eui.UIEvent.CHANGE, this.movelistmove, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._scroll.removeEventListener(eui.UIEvent.CHANGE, this.movelistmove, this);
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.removeEventListener(ClubConst.JoinMemberListMatch, this.showRedPoint, this);
        }
        private destroyTimer(): void {
            if (this._ztimer) {
                this._ztimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this._ztimer.stop();
                this._ztimer = null;
            }
        }
        /**图跟着移动 */
        private movelistmove(e: egret.TouchEvent) {
            let movex: number;
            movex = -100 - (this.deskList.scrollH / (this.deskList.measuredWidth - this.deskList.width)) * 200;
            egret.Tween.get(this.bg).to({ x: movex }, 1);
        }

        public setDate(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.ReturnMatchGroupCmd_S;
            if (!date)
                return;
            this._curMath = date.curMath;
            /**
             * 判断是否有亲友圈，没得话关闭桌面
             */
            if (this._curMath) {
                /**跑马灯
                 */
                if (!this._clubMsgMcPanel) {
                    this._clubMsgMcPanel = new ClubMsgMcPanel();
                    this._clubMsgMcPanel.x = uniLib.Global.screenWidth / 2 - 190;
                    this._clubMsgMcPanel.y = 50 * uniLib.ScreenUtils.scaleFactor;
                    this.addChild(this._clubMsgMcPanel);
                }
                this._clubMsgMcPanel.getclubmsg(this._curMath.clubNotice);
                /**
                 * 记录当前亲友圈id
                */
                ClubData.getInstance().clubmatchid = this._curMath.matchId;
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    ClubData.getInstance().isclubmanagor = 1;
                } else {
                    ClubData.getInstance().isclubmanagor = 0;
                }
                this.title.text = this._curMath.matchName ? this._curMath.matchName : this._curMath.matchId.toString();
                this.gameplay.text = this._curMath.gameName;
                this.play.text = "亲友圈号:" + this._curMath.matchId;
                this.floorNumTxt.text = this._curMath.floorId + "楼";
                this.play.touchEnabled = true;
                this.play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyid, this);
                this._deskList = date.curMath.roomList;
                this.personNum.text = this._curMath.onlineUserNum + "";
                this.gameTypeTxt.text = this._curMath.userNbr + "人";
                this.gameIconImg.source = "club_gameicon_" + this._curMath.gameId;
                let list: Cmd.MathGroupRoomInfo[] = [];
                if (Array.isArray(this._deskList))
                    list = this._deskList.concat();
                if (list.length < 24) {
                    let listlength = list.length;
                    for (let i = 0; i < 24 - listlength; i++) {
                        let infozz = new Cmd.MathGroupRoomInfo();
                        infozz.state = 8;
                        list.push(infozz);
                    }
                }
                if (!this._dataArr) {
                    this._dataArr = new eui.ArrayCollection(list);
                    this.deskList.dataProvider = this._dataArr;
                } else {
                    this._dataArr.removeAll();
                    this._dataArr.replaceAll(list);
                }
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此亲友圈 !");
                this.destroyTimer();
                this.removePop()
            }
        }
        private timerFunc(event: egret.TimerEvent) {
            var req = new Cmd.RequestMatchGroupCmd_C();
            req.isClub = 1
            req.matchId = this._curMath.matchId;
            req.floorId = this._curMath.floorId;
            NetMgr.tcpSend(req);

        }
        /**显示红点 */
        private joinMember: Cmd.MatchGroupMemberInfo[];
        public showRedPoint(evt: uniLib.ZqEvent) {
            var joinMember = evt.param as Cmd.JoinMemberListMatchGroupCmd_S;
            this.joinMember = [];
            if (joinMember && joinMember.list && joinMember.list instanceof Array)
                this.joinMember = joinMember.list;
            if (this.joinMember && this.joinMember.length > 0) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    this.addRedPoint();
                }
            } else {
                this.removeRedPoint();
            }
        }
        /**
          * 红点
          */
        public addRedPoint() {
            let redPoint: eui.Image = this.skin["redPoint"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        }
        public removeRedPoint() {
            let redPoint = this.skin["redPoint"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        }
        private copyid(e: egret.TouchEvent) {
            uniLib.ZQGameSdk.nativeCopyStr(this.play.text);
            uniLib.TipsUtils.showTipsDownToUp("复制成功" + this.play.text);
        }

        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.closeBtn) {
                this.destroyTimer();
                ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            /**快速加入 */
            else if (e.target == this.fastEnterBtn) {
                this.destroyTimer();
                ClubModuleMgr.getInstance().removeClubDeskPanel();
                let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                req.floorId = this._curMath.floorId;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            }
            /**创建俱乐部 */
            else if (e.target == this.createBtn) {
                ClubModuleMgr.getInstance().removeClubDeskPanel();
                let cmd = new Cmd.GetNormalGameListRoomCmd_C();
                cmd.isClub = 1;
                cmd.lobbyId = MJLobbyData.getInstance().lobbyId;
                NetMgr.tcpSend(cmd);
            }
            /**切换俱乐部 */
            else if (e.target == this.swtichBtn) {
                ClubModuleMgr.getInstance().showAllClubListPanel(() => {
                    let cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    cmd.isClub = 1;
                    NetMgr.tcpSend(cmd);
                });
            }
            /**分享 */
            else if (e.target == this.shareBtn) {
                this.onShareTap();
            }
            /**申请列表 */
            else if (e.target == this.applyListBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    ClubData.getInstance().clubChoice = 3;
                    var req = new Cmd.RequestMatchGroupCmd_C();
                    req.matchId = this._curMath.matchId;
                    NetMgr.tcpSend(req);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            }
            /**玩家列表 */
            else if (e.target == this.memberListBtn || e.target == this.personNum || e.target == this.zaixian) {
                ClubModuleMgr.getInstance().showClubPlayerListPanel(() => {
                    let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this._curMath.matchId;
                    NetMgr.tcpSend(cmd);
                });
            }
            /**战绩 */
            else if (e.target == this.queryFightingBtn) {
                LobbyModuleMgr.getInstance().showRecordPanel();
            }
            /**管理 */
            else if (e.target == this.boxManageBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    ClubData.getInstance().clubChoice = 2;
                    var req = new Cmd.RequestMatchGroupCmd_C();
                    req.matchId = this._curMath.matchId;
                    NetMgr.tcpSend(req);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            }
            /**公告 */
            else if (e.target == this.noticeBtn) {
                let cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                cmd.matchId = this._curMath.matchId;
                NetMgr.tcpSend(cmd);
                ClubModuleMgr.getInstance().showClubNoticePanel();
            }
            /**切换楼层 */
            else if (e.target == this.switchFloorBtn) {
                ClubModuleMgr.getInstance().ClubNewBoxPanel(this._curMath);
            }
            /**房间详情 */
            else if (e.target == this.detailsBtn || e.target == this.detailsBtn0 || e.target == this.gameIconImg) {
                this.showClubFloordetails();
                if (this.clubFloordetails) {
                    this.clubFloordetails.setdeskDate(this._curMath);
                }
            }
            /**上切楼层 */
            else if (e.target == this.floorUpBtn) {
                if (Array.isArray(this._curMath.floorList)) {
                    if (this._curMath.floorList.length > 1) {
                        let cmd = new Cmd.RequestMatchGroupCmd_C();
                        cmd.matchId = this._curMath.matchId;
                        cmd.isClub = 1;
                        for (let i = 0; i < this._curMath.floorList.length; i++) {
                            if (this._curMath.floorId == this._curMath.floorList[i].floorId) {
                                if ((i - 1) >= 0) {
                                    cmd.floorId = this._curMath.floorList[i - 1].floorId;
                                } else {
                                    cmd.floorId = this._curMath.floorList[this._curMath.floorList.length - 1].floorId;
                                }
                            }
                        }
                        ClubData.getInstance().isclubchangefloor = 1;
                        NetMgr.tcpSend(cmd);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("暂时只有1层包厢，无法切换!");
                    }
                }

            }
            /**下切楼层 */
            else if (e.target == this.floorDownBtn) {
                if (Array.isArray(this._curMath.floorList)) {
                    if (this._curMath.floorList.length > 1) {
                        let cmd = new Cmd.RequestMatchGroupCmd_C();
                        cmd.matchId = this._curMath.matchId;
                        cmd.isClub = 1;
                        for (let i = 0; i < this._curMath.floorList.length; i++) {
                            if (this._curMath.floorId == this._curMath.floorList[i].floorId) {
                                if (this._curMath.floorList.length >= (i + 2)) {
                                    cmd.floorId = this._curMath.floorList[i + 1].floorId;
                                } else {
                                    cmd.floorId = this._curMath.floorList[0].floorId;
                                }
                            }
                        }
                        ClubData.getInstance().isclubchangefloor = 1;
                        NetMgr.tcpSend(cmd);
                    }
                    else {
                        uniLib.TipsUtils.showTipsDownToUp("暂时只有1层包厢，无法切换!");
                    }
                }
            }
        }
        /**包厢详情 */
        private clubFloordetails: ClubFloordetails;
        private showClubFloordetails() {
            // if (this.clubRoomdetails == null) {
            this.clubFloordetails = new ClubFloordetails();
            uniLib.PopUpMgr.addPopUp(this.clubFloordetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            // }
        }
        private removeClubFloordetails() {
            if (this.clubFloordetails) {
                uniLib.PopUpMgr.removePopUp(this.clubFloordetails);
                // this.clubRoomdetails.removeListener();
                this.clubFloordetails = null;
            }
        }
        private shareInfo: Cmd.ShareInfo;
        private onShareTap() {
            let codeId = this._curMath.matchId;
            this.shareInfo = this._curMath ? this._curMath.shareInfo : null;
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                var nick: string = uniLib.UserInfo.nickName;
                if (nick.length > 8) {
                    nick = nick.slice(0, 8);
                }
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            } else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "亲友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "亲友圈") : "";
            uniLib.ZQGameSdk.share(vo, null, this);
        }
        private itemTap(evt: eui.ItemTapEvent) {
            this.showClubRoomdetails();
            if (this.clubRoomdetails) {
                this.clubRoomdetails.setDate(this._curMath);
                let item = this.deskList.selectedItem as Cmd.MathGroupRoomInfo;
                this.clubRoomdetails.setUserDate(item);
            }
        }

        private clubRoomdetails: ClubRoomdetails;
        private showClubRoomdetails() {
            this.clubRoomdetails = new ClubRoomdetails();
            this.clubRoomdetails.addEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
            uniLib.PopUpMgr.addPopUp(this.clubRoomdetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            // }
        }
        private removeClubRoomdetails() {
            if (this.clubRoomdetails) {
                this.clubRoomdetails.removeEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
                uniLib.PopUpMgr.removePopUp(this.clubRoomdetails);
                this.clubRoomdetails = null;
            }
        }
        private removeTimer() {
            this._ztimer.stop();
            ClubModuleMgr.getInstance().removeClubDeskPanel();
            this.removeClubRoomdetails();
        }
    }

}
