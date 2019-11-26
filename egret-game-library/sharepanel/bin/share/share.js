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
var sharepanel;
(function (sharepanel) {
    var LobbySharePanel = (function (_super) {
        __extends(LobbySharePanel, _super);
        function LobbySharePanel(data) {
            var _this = _super.call(this, 'mjl_share_title', 630, 360) || this;
            /**是否是朋友圈 */
            _this._isPyq = false;
            _this.skinName = 'LobbySharePanelSkin';
            _this._data = data;
            return _this;
        }
        LobbySharePanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        LobbySharePanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        LobbySharePanel.prototype.btnClick = function (evt) {
            var data;
            if (this._data) {
                data = this._data;
            }
            else {
                data = new uniLib.WXShareVo();
                if (uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl == "" && LobbyDataCache.bundleInfo && LobbyDataCache.bundleInfo.weixin.wbappid) {
                    var nick = uniLib.UserInfo.nickName;
                    if (nick.length > 8) {
                        nick = nick.slice(0, 8);
                    }
                    this._data.webpageUrl = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&redirect_uri=http://" + MJLobbyData.getInstance().lobbyConfig.newLink + "/addons/zqgame/gameshare.php?appid=" + LobbyDataCache.bundleInfo.weixin.wbappid + "&response_type=code&scope=snsapi_base&state=" + uniLib.CompressUtil.base64encode(uniLib.UserInfo.uid + "|" + 0 + "|" + nick) + "&connect_redirect=1#wechat_redirect";
                }
                else {
                    this._data.webpageUrl = uniLib.ZQGameSdk.defaultWXShareVo.webpageUrl + "?uid=" + uniLib.UserInfo.uid + "&nickName=" + uniLib.UserInfo.nickName;
                }
            }
            switch (evt.target) {
                case this._pyqIcon:
                    this._isPyq = true;
                    data.shareWay = 1;
                    break;
                case this._wXinIcon:
                    this._isPyq = false;
                    data.shareWay = 0;
                    break;
            }
        };
        LobbySharePanel.prototype.share = function (data) {
            uniLib.ZQGameSdk.share(data, this.shareBack, this);
        };
        LobbySharePanel.prototype.shareBack = function (back) {
            if (this._isPyq) {
                // ResUtil.trace("微信返回"+JSON.stringify(back));
                if (back) {
                    if (back.code == 0) {
                        var req = new Cmd.ShareLobbyCmd_C();
                        req.lobbyId = uniLib.Global.gameConfig.lobbyId;
                        NetMgr.tcpSend(req);
                    }
                    egret.Tween.get(this).wait(100).call(this.delayShareBack, this, [back.code]);
                }
            }
        };
        LobbySharePanel.prototype.delayShareBack = function (code) {
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
        return LobbySharePanel;
    }(commonpanel.LobbyBaseEuiPanel));
    sharepanel.LobbySharePanel = LobbySharePanel;
    __reflect(LobbySharePanel.prototype, "sharepanel.LobbySharePanel");
})(sharepanel || (sharepanel = {}));
var sharepanel;
(function (sharepanel) {
    var ShareConst = (function () {
        function ShareConst() {
        }
        ShareConst.RES_JSON = "resource/sharepanel/sharepanel.res_8ad3662e.json";
        ShareConst.THM_JSON = "resource/gameEui.json";
        /**
         * 公共loading需要加载的资源组
         */
        ShareConst.PUB_SHARE = "pub_sharepanel";
        return ShareConst;
    }());
    sharepanel.ShareConst = ShareConst;
    __reflect(ShareConst.prototype, "sharepanel.ShareConst");
})(sharepanel || (sharepanel = {}));
