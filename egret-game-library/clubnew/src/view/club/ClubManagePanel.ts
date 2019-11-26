module clubnew {
    export class ClubManagePanel extends commonpanel.LobbyBaseEuiPanel {
        public static Instanc: ClubManagePanel;

        private rectbg: eui.Rect;
        /**左侧 */
        private _leftGroup: eui.Group;
        private _closeBtn: eui.WxButton;         //关闭页面

        private _refreshbtn: eui.WxButton;      // 刷新按钮
        private _clubtypebtn: eui.WxButton;     //暂停开房和恢复开房按钮
        private _dissclubbtn: eui.WxButton;     //解散按钮
        private _setbtn: eui.WxButton;          //设置按钮
        private morelistImg: eui.Image;      //更多房间图标显示
        private _matchList: eui.List;
        private _detailsGroup: eui.Group;     //详情
        private _matchTableList: eui.List;  //房间详情
        private roommsgImg: eui.Group;      //房间详情 提示

        private _memberGroup: eui.Group;     //成员列表
        private memeberList: eui.List;

        private _messageGroup: eui.Group;     //申请列表
        private msgImg: eui.Group;
        private _messageList: eui.List;

        private _fightingGroup: eui.Group;    //战绩
        private todaynum: eui.Label;
        private yesterdaynum: eui.Label;
        private sevendaynum: eui.Label;
        private thirtydaynum: eui.Label;
        private fightingList: eui.List;

        private _blackandwhiteGroup: eui.Group;    //黑白名单
        private uidEditableText: eui.EditableText;
        private addWhiteButton: eui.WxButton;        //白名单按钮
        private addBlackButton: eui.WxButton;         //黑名单按钮

        /**右侧 */
        private _rightGroup: eui.Group;
        private detailsButton: eui.RadioButton;     //房间详情选项
        private memberButton: eui.RadioButton;      //成员列表选项
        private messageButton: eui.RadioButton;     //申请列表选项
        private fightingButton: eui.RadioButton;    //战绩查询选项
        private blackwhiteBtn: eui.RadioButton;     //黑白名单选项

        private ownerid: number;           //房主id
        /**房间信息 */
        private _dataArr: eui.ArrayCollection;
        protected childrenCreated(): void {
            super.childrenCreated();
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }
        public destroy(): void {
            super.destroy();
            if (this._messageList && this._messageList.numChildren) {
                for (let i = this._messageList.numChildren - 1; i >= 0; i--) {
                    let item = this._messageList.getChildAt(i) as MatchMessageItem;
                    item.destroy();
                }
            }
            this._dataArr = null;
        }
        constructor() {
            super();
            this.skinName = "ClubManageSkin";
        }
        protected initUI() {
            ClubManagePanel.Instanc = this;
            this._closeBtn.setColorMatrix();
            this._matchList.itemRenderer = MatchRadioButton;
            this.updataMatchList();
            this.updataMessageList();
            this.updataMemeberList();
            this._detailsGroup.visible = this._messageGroup.visible = this._memberGroup.visible
                = this._fightingGroup.visible = this._blackandwhiteGroup.visible = false;
            this.uidEditableText.restrict = "0-9";
            this.uidEditableText.inputType = egret.TextFieldInputType.TEL;
            this.removeRedPoint();
            uniLib.Global.addEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.addEventListener(ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.addEventListener(ClubConst.JoinMemberListManage, this.JoinMemberListMatch, this);
        }

        protected addEvent() {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._matchList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this._matchTableList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
        }
        protected removeEvent() {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickTap, this);
            this._matchList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMatchListTap, this);
            this._matchTableList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onTableListTap, this);
            this.removeRedPoint();
            uniLib.Global.removeEventListener(ClubConst.ReturnMatchGroupManage, this.initReturnMatchGroup, this);
            uniLib.Global.removeEventListener(ClubConst.MemberInfoMatchGroup, this.initMemberList, this);
            uniLib.Global.removeEventListener(ClubConst.JoinMemberListManage, this.JoinMemberListMatch, this);
        }
        /**设置按钮开关 */
        public OnOpen() {
            this._leftGroup.x = -735;
            this._rightGroup.x = this.width;
            egret.Tween.get(this._leftGroup).to({ x: 0 }, 300);
            egret.Tween.get(this._rightGroup).to({ x: this.width - 372 }, 300);
        }
        public OnClose() {
            egret.Tween.get(this._leftGroup).to({ x: -735 }, 300)
            egret.Tween.get(this._rightGroup).to({ x: this.width }, 300).call(() =>
                ClubModuleMgr.getInstance().removeClubManagePanel());
        }
        public updataMatchList() {
            if (!this._dataArr) {
                this._dataArr = new eui.ArrayCollection(this.matchIdList);
                this._matchList.dataProvider = this._dataArr;
            } else {
                // this._dataArr.removeAll();
                this._dataArr.replaceAll(this.matchIdList);
            }
        }
        public updataMessageList() {
            this._messageList.itemRenderer = MatchMessageItem;
            if (this.joinNewMember && this.joinNewMember.length > 0) {
                this.msgImg.visible = false;
            } else {
                this.msgImg.visible = true;
            }
            this._messageList.dataProvider = new eui.ArrayCollection(this.joinNewMember);
        }
        public updataFightingList() {
            this.fightingList.itemRenderer = MatchFightingItem;
            this.fightingList.dataProvider = new eui.ArrayCollection(this.roomList);
        }
        public updataMemeberList() {
            this.memeberList.itemRenderer = MatchMemberItem;
            this.memeberList.dataProvider = new eui.ArrayCollection(this.member);
        }
        private roomList: Cmd.MathGroupRoomInfo[];
        public updataTableList() {
            this._matchTableList.itemRenderer = MatchTableItem;
            if (this.roomList && this.roomList.length > 0) {
                this.roommsgImg.visible = false;
            }
            else {
                this.roommsgImg.visible = true;
            }
            this.roomList.forEach((f) => {
                if (!Array.isArray(f.list)) {
                    f.list = [];
                }
            })
            this._matchTableList.dataProvider = new eui.ArrayCollection(this.roomList);
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
            this.ownerid = curMath.ownerid;
            let state = (curMath && curMath.state == 1) ? 1 : 0;
            this._clubtypebtn.currentState = state == 1 ? "down" : "up";
            this.settypeBtnStatus();
            if (curMath && curMath.openNbrs) {
                this.todaynum.text = "" + curMath.openNbrs[0];
                this.yesterdaynum.text = "" + curMath.openNbrs[1];
                this.sevendaynum.text = "" + curMath.openNbrs[2];
                this.thirtydaynum.text = "" + curMath.openNbrs[3];
            }
            this.roomList = (curMath && curMath.roomList instanceof Array) ? curMath.roomList : [];
            this.updataTableList();
            this.updataFightingList();
            let curMatchId = (curMath ? curMath.matchId : null)
            for (let i: number = 0; i < this.matchIdList.length; i++) {
                if (this.matchIdList[i] == curMatchId) {
                    this._matchList.selectedIndex = i;
                    break;
                }
            }
            this.shareInfo = curMath ? curMath.shareInfo : null;
        }
        private matchIdList: number[] = [];
        private waitList: Cmd.MatchGroupMemberInfo[] = new Array<Cmd.MatchGroupMemberInfo>();
        public initReturnMatchGroup(evt: uniLib.ZqEvent): void {
            let data = evt.param as Cmd.ReturnMatchGroupCmd_S
            if (!Array.isArray(data.matchIdList)) {
                ClubModuleMgr.getInstance().closeClubManagePanel();
            }
            this.waitList = [];
            this.matchIdList = data && data.matchIdList && data.matchIdList instanceof Array ? data.matchIdList : [];
            this.waitList = data != null && data.curMath != null && data.curMath.waitUserList != null && data.curMath.waitUserList instanceof Array && data.curMath.waitUserList.length > 0 ? data.curMath.waitUserList : [];
            this.updataMatchList();
            if (this.matchIdList.length > 4) {
                this.morelistImg.visible = true;
            } else {
                this.morelistImg.visible = false;
            }
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
                this.switchWindow();
            }
            this.updataButtonEnabled();
        }
        public updataButtonEnabled() {
            let bool = this.matchIdList && this.matchIdList.length > 0 ? true : false;
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
        }
        private member: Cmd.MatchGroupMemberInfo[];
        private sharingMember: Cmd.MatchGroupMemberInfo[];//保存前6名以分享
        public initMemberList(evt: uniLib.ZqEvent) {
            var member = evt.param as Cmd.ReturnMemberInfoMatchGroupCmd_S
            member.whitelist = (member.whitelist && member.whitelist instanceof Array) ? member.whitelist : [];
            member.blacklist = (member.blacklist && member.blacklist instanceof Array) ? member.blacklist : [];
            for (let item of member.whitelist) {
                item.type = 1;
            }
            for (let item of member.blacklist) {
                item.type = 2;
            }
            this.member = member.whitelist.concat(member.blacklist);
            this.updataMemeberList();
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
        private joinMember: Cmd.MatchGroupMemberInfo[];
        private joinNewMember: Cmd.MatchGroupMemberInfo[];
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
            this.updataMessageList();
            if (this.joinNewMember && this.joinNewMember.length > 0) {
                this.addRedPoint();
            } else {
                this.removeRedPoint();
            }
        }
        private switchWindow() {
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
            } else if (this.blackwhiteBtn.selected) {
                this._blackandwhiteGroup.visible = true;
            }

        }
        private onClickTap(e: egret.TouchEvent) {
            if (e.target == this.detailsButton
                || e.target == this.memberButton
                || e.target == this.messageButton
                || e.target == this.fightingButton
                || e.target == this.blackwhiteBtn) {
                (<eui.RadioButton>e.target).selected = true;
                this.switchWindow();
                if (e.target == this.memberButton) {
                    let cmd = new Cmd.RequestMemberInfoMatchGroupCmd_C();
                    cmd.matchId = this.selectMatchId;
                    NetMgr.tcpSend(cmd);
                }
            }
            else if (e.target == this._closeBtn || e.target == this.rectbg) {
                ClubModuleMgr.getInstance().closeClubManagePanel();
            }
            else if (e.target == this._clubtypebtn) {
                let self = this;
                this.settypeBtnStatus();
                let okFunc = function () {
                    let cmd = new Cmd.OperateMatchGroupCmd_C();
                    if (self._clubtypebtn.currentState == "up")
                        cmd.state = 1;
                    else
                        cmd.state = 0;
                    cmd.matchId = self.selectMatchId;
                    NetMgr.tcpSend(cmd)
                }
                let msgBox = new MatchMsgBox();
                if (this._clubtypebtn.currentState == "up")
                    msgBox.setData("温馨提示", "您确定要暂停该老友圈吗？", ["确定", "取消"], [okFunc]);
                else
                    msgBox.setData("温馨提示", "恢复老友圈会清除之前战绩,重新开始老友圈统计,继续吗？", ["确定", "取消"], [okFunc]);
                uniLib.PopUpMgr.addPopUp(msgBox, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                return;
            }
            else if (e.target == this._dissclubbtn) {
                let msgBox = new MatchMsgBox();
                let self = this;
                this.ownerid
                let okFunc = function () {
                    let MatchId = self.selectMatchId;
                    if (uniLib.UserInfo.uid == self.ownerid) {
                        if (MatchId == ClubData.getInstance().clubmatchid) {
                            ClubModuleMgr.getInstance().removeClubDeskPanel();;
                        }
                    }
                    let cmd = new Cmd.RequestDeleteMatchGroupCmd_C();
                    cmd.matchId = self.selectMatchId;
                    NetMgr.tcpSend(cmd);
                }
                msgBox.setData("温馨提示", "您确定要解散该老友圈吗？", ["确定", "取消"], [okFunc]);
                uniLib.PopUpMgr.addPopUp(msgBox, null, true, true, 0, uniLib.PopUpEffect.CENTER);
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
                cmd.matchId = ClubManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(cmd);
            }
            else if (e.target == this._setbtn) {
                let req = new Cmd.RequestChangeMatchGroupCmd_C();
                req.matchId = ClubManagePanel.Instanc.selectMatchId;
                NetMgr.tcpSend(req);
            }
            else if (e.target == this._refreshbtn) {
                this.onMatchListTap(null);
            }
        }
        /**
         * 显示匹配等待列表
         */
        private showWaitPlayerList() {
            if (this.waitList.length > 0) {
                var listPanel = new ActiveRoomInformationPanel();
                uniLib.PopUpMgr.addPopUp(listPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            } else {
                uniLib.TipsUtils.showTipsDownToUp("当前房间没有等待玩家");
            }
        }

        //截图分享
        private onShare(): void {
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            var tx: egret.RenderTexture = uniLib.DisplayUtils.catchScreenToTex(this, new egret.Rectangle(this._memberGroup.x, this._memberGroup.y, this._memberGroup.width, this._memberGroup.height), 0.6);
            var bmp: egret.Bitmap = new egret.Bitmap(tx);
            vo.shareImageData = uniLib.DisplayUtils.catchScreen(bmp, new egret.Rectangle(this._memberGroup.x, this._memberGroup.y, this._memberGroup.width, this._memberGroup.height));
            uniLib.ZQGameSdk.share(vo, this.updataMemeberList, this);
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
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://wx.zqgame.com/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + codeId + "|" + nick) + "&connect_redirect=1#wechat_redirect";
            } else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
            vo.description = (this.shareInfo && this.shareInfo.content) ? this.shareInfo.content.replace("房号", "老友圈") : "";
            uniLib.ZQGameSdk.share(vo, null, this);
        }
        public get selectMatchId() {
            return this.matchIdList[this._matchList.selectedIndex];
        }
        private onMatchListTap(e: eui.ItemTapEvent) {
            let cmd = new Cmd.RequestMatchGroupCmd_C();
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }
        private onTableListTap(e: eui.ItemTapEvent) {
            let item = this._matchTableList.selectedItem as Cmd.MathGroupRoomInfo;
            let cmd = new Cmd.ActiveDetailRoomCmd_C();
            cmd.roomId = item.roomId;
            cmd.matchId = this.selectMatchId;
            NetMgr.tcpSend(cmd);
        }

        public settypeBtnStatus() {
            this._clubtypebtn.currentState == "up" ? this._clubtypebtn.label = "暂停开房" : this._clubtypebtn.label = "恢复开房";
        }
    }
}