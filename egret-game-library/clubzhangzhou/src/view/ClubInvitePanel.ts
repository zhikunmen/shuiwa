/**俱乐部内部分享界面 */
module club {

    export class ClubInvitePanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮 */
        private _closeBtn: eui.Button;
        /**微信按钮 */
        private _wXinIcon: eui.Button;
        /**邀请老友内部成员按钮 */
        private _clubIcon: eui.Button;

        private _roomId: number;
        private _data: uniLib.WXShareVo | number;

        constructor(data?: uniLib.WXShareVo | number) {
            super();
            this.skinName = "ClubInviteSkin";
            this._data = data;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected destroy(): void {
            super.destroy();
        }
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }

        protected removeEvent(): void {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        }

        protected initUI(): void {
            if (this._data && this._data instanceof Number) {//说明是外部调用不是点击图标调用
                this._roomId = this._data;
            }
        }

        private btnClick(evt: egret.TouchEvent) {
            switch (evt.target) {
                /**微信分享 */
                case this._wXinIcon:
                    this.share();
                    break;
                /**老友圈成员分享 */
                case this._clubIcon:
                    let req2: Cmd.GetCanInviteMemberListMatchGroupCmd_CS = new Cmd.GetCanInviteMemberListMatchGroupCmd_CS;
                    if (uniLib.Global.isInGame) {
                        req2.matchId = ClubData.getInstance().EnterClubId;
                        req2.roomId = ClubData.getInstance().EnterRoomId;
                    } else {
                        req2.matchId = ClubData.getInstance().clubmatchid;
                        if (this._roomId) {
                            req2.roomId = this._roomId;
                        }
                    }
                    NetMgr.tcpSend(req2);
                    super.removePop();
                    break;
                case this._closeBtn:
                    super.removePop();
                    break;
            }
        }
        private shareInfo: Cmd.ShareInfo;
        /**公共分享 */
        private share(plat: uniLib.SHARE_PLAT = uniLib.SHARE_PLAT.WX): void {
            if (this._data && this._data instanceof uniLib.WXShareVo) {//如果是外部调用直接分享出去
                uniLib.Global.dispatchEvent("clubshare", this._data, true);
            } else {
                this.shareInfo = ClubData.getInstance().clubShareInfo ? ClubData.getInstance().clubShareInfo : null;
                let codeId: number;
                if (uniLib.Global.isInGame) {
                    codeId = ClubData.getInstance().EnterRoomId;
                } else {
                    if (this._roomId) {
                        codeId = this._roomId;
                    } else {
                        codeId = ClubData.getInstance().clubmatchid;
                    }
                }
                var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
                vo.shareWay = 0;
                if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin && LobbyDataCache.bundleInfo.weixin.wbappid) {
                    var nick: string = uniLib.UserInfo.nickName;
                    if (nick.length > 8) {
                        nick = nick.slice(0, 8);
                    }
                    if (MJLobbyData.getInstance().lobbyConfig.hasOwnProperty("newLink") && MJLobbyData.getInstance().lobbyConfig["newLink"] != "") {
                        vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + MJLobbyData.getInstance().lobbyConfig["newLink"] + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + ClubData.getInstance().clubmatchid + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                    }
                } else {
                    vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
                }
                vo.shareType = Cmd.ShareType.enterRoom;
                vo.title = (this.shareInfo && this.shareInfo.title) ? this.shareInfo.title.replace("房号", "老友圈") : "";
                if (uniLib.Global.isInGame) {
                    vo.roomId = JSON.stringify({ "roomId": ClubData.getInstance().EnterRoomId });
                } else {
                    if (this._roomId) {
                        vo.roomId = JSON.stringify({ "roomId": this._roomId });
                    } else {
                        vo.roomId = JSON.stringify({ "matchId": ClubData.getInstance().clubmatchid });
                    }
                }
                uniLib.Global.dispatchEvent("clubshare", vo, true);
            }
        }

        /**分享成功回调 */
        private shareBack(back: any): void {

            egret.Tween.get(this).wait(100).call(this.delayShareBack, this, [back.code]);
            this.removePop();
        }
        private delayShareBack(code: number): void {
            if (code == 0) {
                uniLib.TipsUtils.showTipsDownToUp("分享成功!");
            } else if (code == 1) {
                uniLib.TipsUtils.showTipsDownToUp("分享已取消");
            } else if (code == 2) {
                uniLib.TipsUtils.showTipsDownToUp("分享被拒绝");
            }
        }

    }
}