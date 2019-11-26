module club {
    /**
     * 匹配号管理
     */
    export class MatchManagePanel extends commonpanel.LobbyBaseEuiPanel {
        public static Instanc: MatchManagePanel;
        /**
         * 秒数转化为字符串
         */
        public static timeToString(time: number) {
            if (!time) {
                return "00:00:00";
            }
            let hour = Math.floor(time / 3600);
            time -= (hour * 3600);
            let hourstr = hour.toString().length < 2 ? ("0" + hour) : hour;
            let minute = Math.floor(time / 60);
            time -= (minute * 60);
            let minutestr = minute.toString().length < 2 ? ("0" + minute) : minute
            let second = time;
            let secondstr = second.toString().length < 2 ? ("0" + second) : second
            return hourstr + ":" + minutestr + ":" + secondstr;
        }
        private uidEditableText: egret.TextField;
        private addWhiteButton: eui.WxButton;
        private addBlackButton: eui.WxButton;
        private closeButton: eui.WxButton;
        private terminationButton: eui.WxButton;
        private dissolutionButton: eui.WxButton;
        private shareButton: eui.WxButton;
        private waitListBtn: eui.WxButton;
        private joinMatchButton: eui.WxButton;

        private detailsButton: eui.RadioButton;
        private memberButton: eui.RadioButton;
        private messageButton: eui.RadioButton;
        private fightingButton: eui.RadioButton;
        private yelloListButton: eui.RadioButton;//黄名单
        private matchList: eui.List;

        private memeberList: eui.List;
        private playerList: eui.List;//个人排行列表
        private scoreNowBtn: eui.WxButton;
        private lastScoreBtn: eui.WxButton;

        private messageList: eui.List;

        private detailsGroup: eui.Group;
        private gameMemberLabel: eui.Label;
        private ownerLabel: eui.Label;
        private matchIdLabel: eui.Label;
        private waitMemberLabel: eui.Label;
        private delTimeLabel: eui.Label;
        private matchTableList: eui.List;
        private stepLabel: eui.Label;

        private messageGroup: eui.Group;
        private memberGroup: eui.Group;
        private fightingGroup: eui.Group;
        private fightingList: eui.List;
        private todaynum: eui.Label;
        private yesterdaynum: eui.Label;
        private sevendaynum: eui.Label;
        private thirtydaynum: eui.Label;
        private setting: eui.WxButton;
        private detialsTitle: eui.Group;
        private simpleTitle: eui.Group;
        private shareRecordBtn: eui.ToggleButton;//分享个人排行
        private matchName: eui.Label;//匹配号名
        private yelloList: eui.List;//黄名单列表
        private yelloListGroup: eui.Group;//黄名单组
        /**刷新按钮 */
        private refrshBtn: eui.WxButton;


        private roomList: Cmd.MathGroupRoomInfo[];
        private _roomListArr: eui.ArrayCollection;

        /**成员列表的输赢数据 */
        private refreshGroup: eui.Group;   //输赢GROUP
        private _dayTypeImg: eui.Image;     //输赢显示状态图
        private _dayTypeBg: eui.Image;
        private _morewinloseGroup: eui.Group;     //输赢下拉框区域
        private _winloseRect: eui.Rect;        //输赢蒙版
        private _todaywin: eui.Image;       //今日输赢选项
        private _yesterdaywin: eui.Image;     //昨日输赢选项
        private _qianwin: eui.Image;        //前天输赢选项

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        constructor() {
            super("mjl_club_title_png", 1250, 720);
            this.skinName = "MatchManageSkin";
        }

        protected initUI() {
            MatchManagePanel.Instanc = this;
            this.matchList.itemRenderer = MatchRadioButton;
            this.messageList.itemRenderer = MatchMessageItem;
            this.yelloList.itemRenderer = MatchYelloItem;
            this.fightingList.itemRenderer = MatchFightingItem;
            this.matchTableList.itemRenderer = MatchTableItem;
            this.memeberList.itemRenderer = MatchMemberItem;
            this.updataMemeberList();
            this.detailsGroup.visible = false;
            this.messageGroup.visible = false;
            this.memberGroup.visible = false;
            this.fightingGroup.visible = false;
            this.yelloListGroup.visible = false;
            this.removeRedPoint();
            this.refreshGroup.visible = !ClubData.getInstance().clubRefresh && ClubData.getInstance().clubStyle == CLUBSTYLE.ZHANGZHOU;//只有漳州风格显示
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.addEventListener(ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.addEventListener(ClubConst.JoinMemberListMatch, this.JoinMemberListMatch, this);
            uniLib.Global.addEventListener(ClubConst.ReturnYellowList, this.initYelloList, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this.matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this.matchTableList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            this.stopTimer();
            this.removeRedPoint();
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.removeEventListener(ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.removeEventListener(ClubConst.JoinMemberListMatch, this.JoinMemberListMatch, this);
            uniLib.Global.removeEventListener(ClubConst.ReturnYellowList, this.initYelloList, this);
        }
        private _memberArr: eui.ArrayCollection;
        public updataMemeberList() {
            if (!this._memberArr) {
                this._memberArr = new eui.ArrayCollection(this.member);
                this.memeberList.dataProvider = this._memberArr;
            } else {
                this._memberArr.source = this.member;
                this._memberArr.refresh();
            }
        }
        public updataTableList() {
            this.roomList.forEach((f) => {
                if (!Array.isArray(f.list)) {
                    f.list = [];
                }
            })
            if (!this._roomListArr) {
                this._roomListArr = new eui.ArrayCollection(this.roomList);
                this.matchTableList.dataProvider = this._roomListArr;
            } else {
                this._roomListArr.source = this.roomList;
                this._roomListArr.refresh();
            }

        }
        /**
         * 红点
         */
        public addRedPoint() {
            let redPoint: eui.Image = this.messageButton.skin["redPoint"];
            redPoint.visible = true;
            egret.Tween.get(redPoint, { loop: true }).to({ alpha: 1 }, 500).to({ alpha: 0 }, 500);
        }
        public removeRedPoint() {
            let redPoint = this.messageButton.skin["redPoint"];
            redPoint.visible = false;
            egret.Tween.removeTweens(redPoint);
        }
        public updataDetails(curMath: Cmd.MathGroup) {
            if (!curMath)
                return;
            let state = (curMath && curMath.state == 1) ? 1 : 0;
            this.terminationButton.currentState = state == 1 ? "down" : "up";
            this.ownerLabel.text = "房主名:" + (curMath ? curMath.ownername : "");
            this.gameMemberLabel.text = "当前游戏人数：" + (curMath ? curMath.gameingUserNum : "");
            this.matchIdLabel.text = "老友圈:" + (curMath ? curMath.matchId : "");
            if (curMath.matchName) {
                this.matchName.visible = true;
                this.matchName.text = "老友圈名:" + curMath.matchName;
            } else {
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
            let curMatchId = (curMath ? curMath.matchId : null)
            for (let i: number = 0; i < this.matchIdList.length; i++) {
                if (this.matchIdList[i] == curMatchId) {
                    this.matchList.selectedIndex = i;
                    break;
                }
            }
            this.shareInfo = curMath ? curMath.shareInfo : null;
        }
        private time: number;
        private timer: number;
        public updataTimer() {
            if (this.time == null || this.time < 1) {
                this.stopTimer();
                return;
            }
            this.time--;
            this.delTimeLabel.text = "老友圈剩余时间：" + MatchManagePanel.timeToString(this.time);
        }
        public stopTimer() {
            egret.clearInterval(this.timer)
        }
        private matchIdList: number[] = [];
        private waitList: Cmd.MatchGroupMemberInfo[] = new Array<Cmd.MatchGroupMemberInfo>();
        public initReturnMatchGroup(evt: uniLib.ZqEvent): void {
            let data = evt.param as Cmd.ReturnMatchGroupCmd_S
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
                switch (ClubData.getInstance().clubChoice) {
                    case 1: this.detailsButton.selected = true; break;
                    case 2: this.memberButton.selected = true;
                        let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                        cmd.matchId = this.selectMatchId;
                        NetMgr.tcpSend(cmd); break;
                    case 3: this.messageButton.selected = true; break;
                    case 4: this.fightingButton.selected = true; break;
                }
                // this.detailsButton.selected = true;
                this.switchWindow();
            }
            this.updataButtonEnabled();
        }
        public updataButtonEnabled() {
            let bool = this.matchIdList && this.matchIdList.length > 0 ? true : false;
            this.detailsButton.enabled = this.memberButton.enabled = this.messageButton.enabled
                = this.fightingButton.enabled = this.joinMatchButton.enabled = this.yelloListButton.enabled = bool
            if (bool == false) {
                this.detailsGroup.visible = this.messageGroup.visible = this.memberGroup.visible
                    = this.fightingGroup.visible = this.yelloListGroup.visible = bool;
            }
        }
        private member: Cmd.MatchGroupMemberInfo[];
        private sharingMember: Cmd.MatchGroupMemberInfo[];//保存前6名以分享
        public initMemberList(evt: uniLib.ZqEvent) {
            var member = evt.param as Cmd.ReturnMemberInfoMatchGroupCmd_S
            member.whitelist = (member.whitelist && member.whitelist instanceof Array) ? member.whitelist : [];
            member.blacklist = (member.blacklist && member.blacklist instanceof Array) ? member.blacklist : [];
            member.guestlist = (member.guestlist && member.guestlist instanceof Array) ? member.guestlist : [];
            for (let item of member.whitelist) {
                item.type = 1;
            }
            for (let item of member.blacklist) {
                item.type = 2;
            }
            for (let item of member.guestlist) {
                item.type = 0;
            }
            this.member = member.whitelist.concat(member.blacklist);
            this.member = this.member.concat(member.guestlist);
            this.updataMemeberList();
        }
        /**黄名单列表 */
        private yelloIndoList: Cmd.YellowMemberInfo[];
        public initYelloList(evt: uniLib.ZqEvent) {
            let yelloList = evt.param as Cmd.ReturnYellowMemberInfoMatchGroupCmd_S
            yelloList.list = (yelloList.list && yelloList.list instanceof Array) ? yelloList.list : [];
            this.yelloIndoList = yelloList.list;
            this.yelloList.dataProvider = new eui.ArrayCollection(this.yelloIndoList);
        }
        private gameHistroys: Cmd.GameHistory[];
        public initHistory(history: Cmd.GetGameDataHistoryCmd_S) {
            if (!history || history.matchId != this.selectMatchId) {
                return;
            }
        }
        /**
         * 请求加入匹配场的玩家
         */
        private joinNewMember: Cmd.MatchGroupMemberInfo[];
        private joinMember: Cmd.MatchGroupMemberInfo[];
        public JoinMemberListMatch(evt: uniLib.ZqEvent) {
            var joinMember = evt.param as Cmd.JoinMemberListMatchGroupCmd_S;
            this.joinMember = [];
            this.joinNewMember = [];
            ClubData.getInstance().matchid = this.selectMatchId;
            if (joinMember && joinMember.list && joinMember.list instanceof Array) {
                this.joinMember = joinMember.list;
                joinMember.list.forEach(element => {
                    if (element.matchId == ClubData.getInstance().matchid) {
                        this.joinNewMember.push(element);
                    }
                });

            }
            this.messageList.dataProvider = new eui.ArrayCollection(this.joinNewMember);
            if (this.joinNewMember && this.joinNewMember.length > 0) {
                this.addRedPoint();
            } else {
                this.removeRedPoint();
            }
        }
        private switchWindow() {
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
            } else if (this.yelloListButton.selected) {
                this.yelloListGroup.visible = true;
                this.setting.visible = false;
            }
        }

        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.detailsButton
                || e.target == this.memberButton
                || e.target == this.messageButton
                || e.target == this.fightingButton
                || e.target == this.yelloListButton) {
                (<eui.RadioButton>e.target).selected = true;
                this.switchWindow();
                if (e.target == this.memberButton) {
                    let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this.selectMatchId;
                    NetMgr.tcpSend(cmd);
                }
                else if (e.target == this.yelloListButton) {
                    let self = this;
                    let reqYelloList: Cmd.RequestYellowMemberInfoMatchGroupCmd_C = new Cmd.RequestYellowMemberInfoMatchGroupCmd_C();
                    reqYelloList.matchId = this.selectMatchId;
                    NetMgr.tcpSend(reqYelloList);

                }
            }
            else if (e.target == this.closeButton) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.terminationButton) {
                let self = this;
                let okFunc = function () {
                    let cmd = new Cmd.OperateMatchGroupCmd_C();
                    if (self.terminationButton.currentState == "up")
                        cmd.state = 1;
                    else
                        cmd.state = 0;
                    cmd.matchId = self.selectMatchId;
                    NetMgr.tcpSend(cmd)
                }
                let info = "";
                if (this.terminationButton.currentState == "up") {
                    info = "您确定要暂停该老友圈吗？"
                }
                else {
                    info = "恢复老友圈会清除之前战绩,重新开始老友圈统计,继续吗？"
                }
                ComponentUtil.getInstance().showConfirm(info, "温馨提示", "确定", okFunc, "取消")
                return;
            }
            else if (e.target == this.dissolutionButton) {
                let self = this;
                let okFunc = function () {
                    let MatchId = self.selectMatchId;
                    if (MatchId == ClubData.getInstance().clubmatchid) {
                        ClubModuleMgr.getInstance().removeClubDeskPanel();
                    }
                    let cmd = new Cmd.RequestDeleteMatchGroupCmd_C();
                    cmd.matchId = self.selectMatchId;
                    NetMgr.tcpSend(cmd);
                    uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
                }
                ComponentUtil.getInstance().showConfirm("您确定要解散该老友圈吗？", "温馨提示", "确定", okFunc, "取消")
            }
            else if (e.target == this.shareButton) {
                this.onShareTap();
            } else if (e.target == this.waitListBtn) {  //显示等待列表按钮
                this.showWaitPlayerList();
            }
            else if (e.target == this.addWhiteButton
                || e.target == this.addBlackButton) {
                let text = this.uidEditableText.text;
                let uid = Number(text);
                if (uid == NaN || !uid) {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的玩家账号");
                    return;
                }
                let cmd = new Cmd.OperateMemberListMatchGroupCmd_C();
                let reply = Number((<eui.Label>e.target).name);
                cmd.reply = e.target == this.addWhiteButton ? 2 : 3;
                cmd.uid = uid;
                cmd.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this.joinMatchButton) {
                this.dispatchEventWith(ClubUIEventConst.JOIN_CLUBROOM, false, this.matchIdList[this.matchList.selectedIndex])
                var req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                req.roomId = this.matchIdList[this.matchList.selectedIndex];
                NetMgr.tcpSend(req);
                ClubModuleMgr.getInstance().removeClubDeskPanel();
            }
            else if (e.target == this.setting) {
                //this.showMatchSettingPanel();
                let req = new Cmd.RequestChangeMatchGroupCmd_C();
                req.matchId = MatchManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this.refrshBtn) {
                this.onMatchListTap(null);
            }
            else if (e.target == this._dayTypeBg) {
                this._morewinloseGroup.visible = true;
            }
            else if (e.target == this._todaywin || e.target == this._yesterdaywin || e.target == this._qianwin || e.target == this._winloseRect) {
                if (e.target == this._todaywin) {
                    ClubData.getInstance().clubDayChose = 1;
                }
                else if (e.target == this._yesterdaywin) {
                    ClubData.getInstance().clubDayChose = 2;
                }
                else if (e.target == this._qianwin) {
                    ClubData.getInstance().clubDayChose = 3;
                }
                this._morewinloseGroup.visible = false;
                this._dayTypeImg.source = "pph_winlose" + ClubData.getInstance().clubDayChose;
                this.updataMemeberList();
            }
        }
        /**
         * 显示匹配等待列表
         */
        private showWaitPlayerList() {
            if (this.waitList.length > 0) {
                var listPanel = new ActiveRoomInformationPanel();
                uniLib.PopUpMgr.addPopUp(listPanel, null, true, true);
            } else {
                uniLib.TipsUtils.showTipsDownToUp("当前房间没有等待玩家");
            }
        }

        //截图分享
        private onShare(): void {
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            var tx: egret.Bitmap = new egret.Bitmap(uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(this.memberGroup.x, this.memberGroup.y, this.memberGroup.width, this.memberGroup.height), 0.6));
            vo.shareImageData = uniLib.DisplayUtils.catchScreen(tx, new egret.Rectangle(this.memberGroup.x, this.memberGroup.y, this.memberGroup.width, this.memberGroup.height));
            uniLib.Global.dispatchEvent(uniLib.ZqEvent.SHARE, vo, true);
        }
        private shareInfo: Cmd.ShareInfo;
        private onShareTap() {
            let codeId = this.selectMatchId;
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
        public get selectMatchId() {
            return this.matchIdList[this.matchList.selectedIndex];
        }
        private onMatchListTap(e: eui.ItemTapEvent) {
            let cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }
        private onTableListTap(e: eui.ItemTapEvent) {
            ClubModuleMgr.getInstance().removeActiveDetailRoomtPanel();
            let item = this.matchTableList.selectedItem as Cmd.MathGroupRoomInfo;
            let cmd = new Cmd.ActiveDetailRoomCmd_C();
            cmd.roomId = item.roomId;
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }
    }
}
