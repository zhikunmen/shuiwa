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
var share;
(function (share) {
    var ShareConst = (function () {
        function ShareConst() {
        }
        ShareConst.RES_JSON = "resource/share/share.res_e734272b.json";
        ShareConst.THM_JSON = "resource/share/gameEui_575370e2.json";
        /**
         * 公共loading需要加载的资源组
         */
        ShareConst.PUB_SHARE = "pub_share";
        /**邀请有礼界面 */
        ShareConst.SHARE_INVITEDATA = "share_invitedata";
        /**领取奖励 */
        ShareConst.SHARE_INVITEAWARD = "share_inviteaward";
        return ShareConst;
    }());
    share.ShareConst = ShareConst;
    __reflect(ShareConst.prototype, "share.ShareConst");
    /**
     * 打包成app之后的分享 不支持分享图片
     * @shareType 分享类型
     * @state 跳转公众号需要携带的参数 多个参数以_分割 发送给平台的参数
     * @extData 发送给服务器的扩展字段 json字符串
     * @roomId 房间号id
     * @title 标题
     * @description 描述
     * @callBack 分享回调
     * @callObj 回调函数域
     * @shareWay 0好友 1 朋友圈 默认为好友
     */
    function shareNativeMessage(shareType, roomId, state, extData, title, description, callBack, callObj, shareWay) {
        if (roomId === void 0) { roomId = 0; }
        if (state === void 0) { state = ""; }
        if (extData === void 0) { extData = ""; }
        if (title === void 0) { title = ""; }
        if (description === void 0) { description = ""; }
        if (callBack === void 0) { callBack = null; }
        if (callObj === void 0) { callObj = null; }
        if (shareWay === void 0) { shareWay = 0; }
        if (uniLib.Global.isNative) {
            var vo = new uniLib.WXShareVo();
            vo.shareWay = shareWay;
            var lobbyConfig = MJLobbyData.getInstance().lobbyConfig;
            if (LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.wx_wbappid) {
                var nick = uniLib.UserInfo.nickName;
                if (nick.length > 5) {
                    nick = nick.slice(0, 5);
                }
                vo.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.wx_wbappid + "&redirect_uri=http://" + lobbyConfig.newLink + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.wx_wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + (roomId ? roomId : 0) + "|" + nick + "|" + Cmd.ShareOpType.click + "_" + state) + "&connect_redirect=1#wechat_redirect";
            }
            else {
                vo.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
            }
            vo.title = !!title ? title : lobbyConfig.shareTitle;
            vo.description = !!description ? description : lobbyConfig.shareContent;
            uniLib.ZQGameSdk.share(vo, function (msg) {
                if (msg && msg.code == 0) {
                    var req = new Cmd.UploadShareInfoLittleGameLobbyCmd_CS();
                    req.opType = Cmd.ShareOpType.share;
                    req.shareType = shareType;
                    req.extData = extData;
                    NetMgr.tcpSend(req);
                    callBack && callBack.call(callObj);
                }
                else if (msg.code == 1) {
                    uniLib.TipsUtils.showTipsDownToUp("分享取消");
                }
                else if (msg.code == 2) {
                    uniLib.TipsUtils.showTipsDownToUp("分享被拒绝");
                }
            }, this);
        }
    }
    share.shareNativeMessage = shareNativeMessage;
})(share || (share = {}));
var Cmd;
(function (Cmd) {
    function OnGetInviteInfoLittleGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(share.ShareConst.SHARE_INVITEDATA, rev);
        }
    }
    Cmd.OnGetInviteInfoLittleGameLobbyCmd_S = OnGetInviteInfoLittleGameLobbyCmd_S;
    function OnGetInviteRewardLittleGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(share.ShareConst.SHARE_INVITEAWARD, rev);
            wxgame.Global.instance.aldSendEvent("周边系统", "分享有礼领取钻石成功");
        }
    }
    Cmd.OnGetInviteRewardLittleGameLobbyCmd_S = OnGetInviteRewardLittleGameLobbyCmd_S;
})(Cmd || (Cmd = {}));
var share;
(function (share) {
    var sharePanel = (function (_super) {
        __extends(sharePanel, _super);
        function sharePanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "LobbySharePanelSkin";
            return _this;
        }
        sharePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
        };
        sharePanel.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.removeEventListener(share.ShareConst.SHARE_INVITEAWARD, this.update, this);
            uniLib.Global.removeEventListener(share.ShareConst.SHARE_INVITEDATA, this.init, this);
        };
        sharePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            uniLib.Global.addEventListener(share.ShareConst.SHARE_INVITEAWARD, this.update, this);
            uniLib.Global.addEventListener(share.ShareConst.SHARE_INVITEDATA, this.init, this);
            var req = new Cmd.GetInviteInfoLittleGameLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        sharePanel.prototype.init = function (evt) {
            var data = evt.param;
            this._rewardStatus = data.rewardStatus;
            this.updateHead(data.info);
        };
        sharePanel.prototype.update = function (evt) {
            var data = evt.param;
            this._rewardStatus = data.rewardStatus;
            this.updateHead(data.info);
            //获取奖励 传入公共的奖励面板
            var vos = [];
            data.goods.forEach(function (f, index) {
                var vo = new commonConfirm.ReWardDataVo();
                vo.getDataByGoodId(f.goodsId, f.goodsNum);
                vos.push(vo);
            });
            var panel = new commonConfirm.RewardPanel();
            panel.initData(vos);
            uniLib.PopUpMgr.addPopUp(panel, null, true, false);
        };
        sharePanel.prototype.updateHead = function (data) {
            var _this = this;
            var count = 0;
            data.forEach(function (f, index) {
                var good;
                good = ConfigMgr.getInstance().getGoodCfgById(f.goods.goodsId);
                if (f.status == 3) {
                    _this["_lab" + index].text = "已领";
                    _this["_lab" + index].textColor = 0x888888;
                    count++;
                }
                else {
                    if (good) {
                        _this["_lab" + index].text = f.goods.goodsNum + good.goodName;
                    }
                    else {
                        _this["_lab" + index].text = f.goods.goodsNum + "钻";
                    }
                }
                if (f.status != 1) {
                    _this["_icon" + index].source = f.headUrl;
                }
            });
            if (count == data.length) {
                this._bigReawrd.text = "已领";
                this._bigReawrd.textColor = 0x888888;
            }
        };
        sharePanel.prototype.btnClick = function (evt) {
            switch (evt.target) {
                case this._icon0:
                case this._icon1:
                case this._icon2:
                case this._icon3:
                case this._icon4:
                    this.clickShare(evt.target);
                    break;
                case this._getBtn:
                    this.getAward();
                    break;
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
            }
        };
        sharePanel.prototype.clickShare = function (icon) {
            if (icon.source == "lobby_share_json.lobby_shareadd") {
                if (uniLib.Global.isWxGame()) {
                    var vo = new uniLib.WXShareVo();
                    vo.shareType = Cmd.ShareType.invite;
                    uniLib.ZQGameSdk.share(vo);
                    wxgame.Global.instance.aldSendEvent("周边系统", "分享有礼跳转分享");
                }
                else {
                    share.shareNativeMessage(Cmd.ShareType.invite, 0, Cmd.ShareType.invite.toString());
                }
            }
        };
        /**领奖 */
        sharePanel.prototype.getAward = function () {
            if (this._rewardStatus == 1) {
                // uniLib.TipsUtils.showTipsDownToUp("奖励不可领,公共组件没做好 暂时弹框");
                var showConfirm = new commonConfirm.ConfirmPanel("当前没有可以领取的奖励哦!邀请更多好友后再来领奖吧!", "", ["lobby_share_json.lobby_shareInvite"], function () {
                    if (uniLib.Global.isWxGame()) {
                        var vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.invite;
                        wxgame.ShareMessage.instance.shareAppMessage(vo);
                        wxgame.Global.instance.aldSendEvent("周边系统", "分享有礼跳转分享");
                    }
                    else {
                        share.shareNativeMessage(Cmd.ShareType.invite, 0, Cmd.ShareType.invite.toString());
                    }
                });
                uniLib.PopUpMgr.addPopUp(showConfirm, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            }
            else if (this._rewardStatus == 2) {
                var req = new Cmd.GetInviteRewardLittleGameLobbyCmd_C();
                NetMgr.tcpSend(req);
            }
            else if (this._rewardStatus == 3) {
                uniLib.TipsUtils.showConfirm("今日奖励已领取完", "", "确定");
            }
        };
        return sharePanel;
    }(eui.Component));
    share.sharePanel = sharePanel;
    __reflect(sharePanel.prototype, "share.sharePanel");
})(share || (share = {}));
