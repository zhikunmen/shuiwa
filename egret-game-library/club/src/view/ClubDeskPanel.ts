module club {
    /**
     * 老友圈桌子面板
     */
    export class ClubDeskPanel extends commonpanel.LobbyBaseEuiPanel {
        private deskList: eui.List;
        private closeBtn: eui.WxButton;
        private swtichBtn: eui.WxButton;
        private createBtn: eui.WxButton;
        private boxManageBtn: eui.WxButton;
        private fastEnterBtn: eui.WxButton;
        private shareBtn: eui.WxButton;
        private memberListBtn: eui.WxButton;
        private applyListBtn: eui.WxButton;
        private noticeBtn: eui.WxButton;
        private queryFightingBtn: eui.WxButton;
        private play: eui.Label;
        private gameplay: eui.Label;
        private title: eui.Label;
        private _deskList: Cmd.MathGroupRoomInfo[];
        private _ztimer: egret.Timer;
        private _curMath: Cmd.MathGroup;
        private _curMathlist: Cmd.MathGroup;
        /**刮奖按钮 */
        private scratchBtn: eui.Button;

        constructor() {
            super();
            this.skinName = ClubData.getInstance().clubStyle == CLUBSTYLE.ZHANGZHOU ? "ClubDeskSkin" : "gd_ClubDeskSkin";
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        public destroy(): void {
            super.destroy();
            this.destroyTimer();

        }
        protected initUI() {
            if (ClubData.getInstance().clubRefresh == 1) {
                this._ztimer = new egret.Timer(5000, 0);
                this._ztimer.start();
            }
            this.scratchBtn.visible = Boolean(ClubData.getInstance().isShowScratch)
        }

        protected addEvent() {
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.addEventListener(ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.addEventListener(ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.addEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
            this._ztimer && this._ztimer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
        }
        protected removeEvent() {
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroup, this.setDate, this);
            uniLib.Global.removeEventListener(ClubConst.LatestMatchRoom, this.updatedesklist, this);
            uniLib.Global.removeEventListener(ClubConst.JoinMemberListMatch, this.showRedPoint, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.ON_RECONNEC, this.onSendmsg, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.deskList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        }
        private destroyTimer(): void {
            if (this._ztimer) {
                this._ztimer && this._ztimer.removeEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
                this._ztimer.stop();
                this._ztimer = null;
            }
        }
        public setDate(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.ReturnMatchGroupCmd_S;
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
                ClubData.getInstance().clubmatchid = this._curMath.matchId;
                this.title.text = this._curMath.matchName ? this._curMath.matchName : this._curMath.matchId.toString();
                this.gameplay.text = this._curMath.gameName;
                this.play.text = "老友圈号:" + this._curMath.matchId;
                this.play.touchEnabled = true;
                this.play.addEventListener(egret.TouchEvent.TOUCH_TAP, this.copyid, this);
                this._deskList = date.curMath.roomList;
                let list: Cmd.MathGroupRoomInfo[] = [];
                if (Array.isArray(this._deskList))
                    list = this._deskList.concat();
                if (ClubData.getInstance().clubStyle == CLUBSTYLE.ZHANGZHOU) {
                    let info = new Cmd.MathGroupRoomInfo();
                    info.state = 9;//漳州类型 第一个按钮显示加入房间使用
                    list.unshift(info);
                }
                if (list.length < 8) {//空闲
                    let listlength = list.length;
                    for (let i = 0; i < 8 - listlength; i++) {
                        let infozz = new Cmd.MathGroupRoomInfo();
                        infozz.state = 8;
                        list.push(infozz);
                    }
                }
                this.deskList.itemRenderer = ClubItemDesk;
                this.deskList.dataProvider = new eui.ArrayCollection(list);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.destroyTimer();
                this.removePop()

            }
        }

        private updatedesklist(evt: uniLib.ZqEvent): void {
            var date = evt.param as Cmd.LatestMatchRoomInfoGroupCmd_Brd;
            if (!date)
                return;
            this._curMathlist = date.curMath;

            if (this._curMathlist) {
                /**
                 * 记录当前老友圈id
                */
                this._deskList = this._curMathlist.roomList;
                let list: Cmd.MathGroupRoomInfo[] = [];
                if (Array.isArray(this._deskList))
                    list = this._deskList.concat();
                let info = new Cmd.MathGroupRoomInfo();
                info.state = 9;
                list.unshift(info);
                if (list.length < 8) {
                    let listlength = list.length;
                    for (let i = 0; i < 8 - listlength; i++) {
                        let infozz = new Cmd.MathGroupRoomInfo();
                        infozz.state = 8;
                        list.push(infozz);
                    }
                }
                this.deskList.itemRenderer = ClubItemDesk;
                this.deskList.dataProvider = new eui.ArrayCollection(list);
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("不存在此老友圈 !");
                this.destroyTimer();
                this.removePop();
            }
        }
        /**断线重连 重新发协议 */
        private onSendmsg() {
            ClubSendMgr.requestMatchData(1);
        }
        private timerFunc(event: egret.TimerEvent) {
            if (ClubData.getInstance().clubRefresh == 1) {
                ClubSendMgr.requestMatchData(1);
            }
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
                // this.removePop();
                ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            else if (e.target == this.fastEnterBtn) {
                this.destroyTimer();
                // this.removePop();
                ClubModuleMgr.getInstance().removeClubDeskPanel();
                let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            } else if (e.target == this.createBtn) {
                // this.removePop();
                ClubModuleMgr.getInstance().removeClubDeskPanel();
                ClubModuleMgr.getInstance().showCreateClubPanel();
            }
            else if (e.target == this.swtichBtn) {
                // this.destroyTimer();
                // this.removePop();
                ClubModuleMgr.getInstance().showAllClubListPanel(() => {
                    let cmd = new Cmd.HistoryMatchIdListMatchGroupCmd_C();
                    cmd.isClub = 1;
                    NetMgr.tcpSend(cmd);
                });
            } else if (e.target == this.shareBtn) {
                this.onShareTap();
            } else if (e.target == this.applyListBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    ClubData.getInstance().clubChoice = 3;
                    ClubModuleMgr.getInstance().showClubManagePanel();
                    ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            } else if (e.target == this.memberListBtn) {
                ClubModuleMgr.getInstance().showClubPlayerListPanel();
                let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                cmd.matchId = this._curMath.matchId;
                NetMgr.tcpSend(cmd);
            } else if (e.target == this.queryFightingBtn) {
                // if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                //     MJLobbyData.getInstance().clubChoice = 4;
                //     // this.destroyTimer();
                //     ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                //     ClubModuleMgr.getInstance().showClubManagePanel();
                // } else {
                //     uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                // }
                LobbyModuleMgr.getInstance().showRecordPanel();
            } else if (e.target == this.boxManageBtn) {
                if (uniLib.UserInfo.uid == this._curMath.ownerid || uniLib.UserInfo.uid.toString() == this._curMath.masterid) {
                    ClubData.getInstance().clubChoice = 1;
                    ClubModuleMgr.getInstance().showClubManagePanel();
                    ClubSendMgr.requestRequestMatchGroupCmd(this._curMath.matchId);
                } else {
                    uniLib.TipsUtils.showTipsDownToUp("您不是群主，暂无权限操作!");
                }
            } else if (e.target == this.noticeBtn) {
                let cmd = new Cmd.ClubNoticeMatchGroupCmd_CS();
                cmd.matchId = this._curMath.matchId;
                NetMgr.tcpSend(cmd);
                ClubModuleMgr.getInstance().showClubNoticePanel();
            } else if (e.target == this.scratchBtn) {
                let req = new Cmd.IntoScratchTicketLobbyCmd_C();
                NetMgr.tcpSend(req);
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
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wq.laoyouwan.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            } else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "老友圈") : "";
            if (!uniLib.Global.isWxGame()) {
                vo.roomId = JSON.stringify({ "matchId": codeId });
            } else {
                vo.shareType = Cmd.ShareType.enterRoom;
                vo.wgShareData = JSON.stringify({ "roomId": codeId });
            }
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        }
        private itemTap(evt: eui.ItemTapEvent) {
            if (evt.itemIndex == 0) {
                this._ztimer && this._ztimer.stop();
                // this.removePop();
                ClubModuleMgr.getInstance().removeClubDeskPanel();
                let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                req.roomId = this._curMath.matchId;
                NetMgr.tcpSend(req);
            }
            else {
                this.showClubRoomdetails();
                if (this.clubRoomdetails) {
                    this.clubRoomdetails.setDate(this._curMath);
                    if (evt.itemIndex != 0) {
                        let item = this.deskList.selectedItem as Cmd.MathGroupRoomInfo;
                        this.clubRoomdetails.setUserDate(item);
                    }
                }
            }
        }

        private clubRoomdetails: ClubRoomdetails;
        private showClubRoomdetails() {
            // if (this.clubRoomdetails == null) {
            this.clubRoomdetails = new ClubRoomdetails();
            this.clubRoomdetails.addEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
            uniLib.PopUpMgr.addPopUp(this.clubRoomdetails, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            // }
        }
        private removeClubRoomdetails() {
            if (this.clubRoomdetails) {
                this.clubRoomdetails.removeEventListener(ClubUIEventConst.JOIN_CLUBROOM, this.removeTimer, this);
                uniLib.PopUpMgr.removePopUp(this.clubRoomdetails);
                // this.clubRoomdetails.removeListener();
                this.clubRoomdetails = null;
            }
        }
        private removeTimer() {
            this._ztimer && this._ztimer.stop();
            ClubModuleMgr.getInstance().removeClubDeskPanel();
            this.removeClubRoomdetails();
        }
    }
}