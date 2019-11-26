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
var freeBenefits;
(function (freeBenefits) {
    /**
     * 账号授权
     */
    var AuthoPanel = (function (_super) {
        __extends(AuthoPanel, _super);
        function AuthoPanel() {
            var _this = _super.call(this) || this;
            _this._plat = {};
            _this.onTapCall = function (res) {
                wxgame.Global.instance.aldSendEvent("进入大厅", "点击登录按钮");
                if (res && res.errMsg.indexOf("ok") >= 0) {
                    wxgame.Global.instance.aldSendEvent("进入大厅", "成功授权");
                    _this._wxBtn.hide();
                    _this.wxLoginSuc(res);
                }
                else {
                    _this._wxBtn.show();
                    wx.showModal({ title: "授权提示", content: "获取用户信息失败，请确认授权！", showCancel: false });
                }
            };
            _this.skinName = "AuthoPanelSkin";
            return _this;
        }
        AuthoPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.addEventListener("GET_PAGE_INFO", this.onInfo, this);
            var req = new Cmd.GetPageInfoHpMatchCmd_C();
            req.typ = Cmd.PAGE_TYPE.AUTHORIZE;
            NetMgr.tcpSend(req);
            if (uniLib.Global.isWxGame() && MJLobbyData.getInstance().userInfoSynLobby.loginByOpenId == true) {
                uniLib.ZQGameSdk.Login(this.wxAuthorizeLogin, this.onLogout, this);
                this.reward_btn.visible = false;
            }
        };
        AuthoPanel.prototype.wxAuthorizeLogin = function (msg) {
            if (msg.code == 0) {
                if (msg.data.session) {
                    this._plat.sign = msg.data.session;
                }
                if (msg.data.payplatid) {
                    uniLib.Global.payPlatId = msg.data.payplatid;
                }
                if (msg.data.platid) {
                    this._plat.platid = msg.data.platid;
                }
                if (wx["createUserInfoButton"]) {
                    var info = wx.getSystemInfoSync();
                    var scaleX = info.screenWidth / uniLib.Global.screenWidth;
                    var scaleY = info.screenHeight / uniLib.Global.screenHeight;
                    var point = this.localToGlobal(325, 381);
                    this._wxBtn = wx["createUserInfoButton"]({
                        type: "image",
                        image: MJLobbyData.wxGameResPath + "shc_btn.png?time=" + Math.random(),
                        withCredentials: true,
                        style: {
                            left: (info.screenWidth - this.reward_btn.width * scaleX) / 2,
                            top: point.y * scaleY,
                            width: this.reward_btn.width * scaleX,
                            height: this.reward_btn.height * scaleY,
                            lineHeight: 40,
                            borderColor: '#ff0000',
                            backgroundColor: '#ff0000',
                            textAlign: 'center',
                            fontSize: 16,
                            borderWidth: 0,
                            borderRadius: 4
                        },
                        text: "获取用户信息"
                    });
                    this._wxBtn.onTap(this.onTapCall);
                }
            }
        };
        AuthoPanel.prototype.onLogout = function () {
            var _this = this;
            wxgame.Global.instance.aldSendEvent("进入大厅", "login失败");
            LobbyUtils.instance.dealLoadError("login失败，请重试", function () { _this._wxBtn && _this._wxBtn.show(); });
        };
        /**
         * 微信小游戏授权
         */
        AuthoPanel.prototype.wxLoginSuc = function (res) {
            if (res.userInfo.nickName)
                this._plat.nickname = res.userInfo.nickName;
            if (res.userInfo.gender)
                this._plat.gender = res.userInfo.gender;
            if (res.userInfo.avatarUrl)
                this._plat.faceurl = res.userInfo.avatarUrl;
            var launchOption = wx.getLaunchOptionsSync();
            var obj = { "encryptedData": res.encryptedData, "iv": res.iv, "subPlatId": 0 };
            if (launchOption.query && launchOption.query["qudao"]) {
                obj.subPlatId = parseInt(launchOption.query["qudao"]);
            }
            wxgame.Global.instance.aldSendEvent("渠道", "授权" + obj.subPlatId);
            this._plat.extdata = JSON.stringify(obj);
            this._plat.osname = egret.Capabilities.os;
            uniLib.Utils.clearLocalStorage();
            NetMgr.authoLogout();
            uniLib.Global.initPlatInfo(this._plat);
            LobbyUtils.instance.enterLobbyLoadGroup();
        };
        AuthoPanel.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        AuthoPanel.prototype.onInfo = function (evt) {
            this.setInfo(evt.param);
        };
        AuthoPanel.prototype.setInfo = function (info) {
            this.reward_lst.itemRenderer = AuthoItem;
            this.reward_lst.dataProvider = new eui.ArrayCollection(info.rewards);
        };
        AuthoPanel.prototype.destroy = function () {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener("GET_PAGE_INFO", this.onInfo, this);
            this._plat = null;
            if (this._wxBtn) {
                this._wxBtn["offTap"](this.onTapCall);
                this._wxBtn.destroy();
                this._wxBtn = null;
            }
        };
        return AuthoPanel;
    }(eui.Component));
    freeBenefits.AuthoPanel = AuthoPanel;
    __reflect(AuthoPanel.prototype, "freeBenefits.AuthoPanel");
    var AuthoItem = (function (_super) {
        __extends(AuthoItem, _super);
        function AuthoItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "AuthoItemSkin";
            return _this;
        }
        AuthoItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var cfg = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.desc_lbl.text = cfg.goodName + "x" + info.goodNbr;
            this.icon_img.source = "lb_autho_panel_json." + cfg.goodIcon;
        };
        return AuthoItem;
    }(eui.ItemRenderer));
    __reflect(AuthoItem.prototype, "AuthoItem");
})(freeBenefits || (freeBenefits = {}));
var freeBenefits;
(function (freeBenefits) {
    var DeskCollectionPanel = (function (_super) {
        __extends(DeskCollectionPanel, _super);
        function DeskCollectionPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "DeskCollectionSkin";
            return _this;
        }
        DeskCollectionPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.reward_btn.visible = MJLobbyData.getInstance().dtlaunchaward;
            this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        DeskCollectionPanel.prototype.onTouchHandler = function (evt) {
            var req = new Cmd.GetDesktopLaunchAwardHpMatchCmd_C();
            NetMgr.tcpSend(req);
        };
        DeskCollectionPanel.prototype.destroy = function () {
            this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return DeskCollectionPanel;
    }(eui.Component));
    freeBenefits.DeskCollectionPanel = DeskCollectionPanel;
    __reflect(DeskCollectionPanel.prototype, "freeBenefits.DeskCollectionPanel");
})(freeBenefits || (freeBenefits = {}));
var freeBenefits;
(function (freeBenefits) {
    var FreeBenefitsConsts = (function () {
        function FreeBenefitsConsts() {
        }
        FreeBenefitsConsts.RES_JSON = "resource/freeBenefits.res.json";
        FreeBenefitsConsts.RES_MAHJONG_JSON = "resource/freeBenefits_mahjong.res.json";
        FreeBenefitsConsts.RES_BUYU_JSON = "resource/freeBenefits/freeBenefits_buyu.res_5d839b5f.json";
        FreeBenefitsConsts.THM_JSON = "resource/freeBenefits/gameEui_eec4852f.json";
        /**
         * 需要加载免费福利的资源组
         */
        FreeBenefitsConsts.PUB_FREEBENEFITS = "pub_freeBenefits";
        /**
         * 需要加载桌面收藏的资源组
         */
        FreeBenefitsConsts.PUB_DESKCOLLECTION = "pub_deskCollection";
        /**
         * 关注公众号
         */
        FreeBenefitsConsts.PUB_PUBLICADDRESS = "pub_publicAddress";
        /**
         * 授权
         */
        FreeBenefitsConsts.PUB_AUTHO = "pub_autho";
        return FreeBenefitsConsts;
    }());
    freeBenefits.FreeBenefitsConsts = FreeBenefitsConsts;
    __reflect(FreeBenefitsConsts.prototype, "freeBenefits.FreeBenefitsConsts");
})(freeBenefits || (freeBenefits = {}));
var freeBenefits;
(function (freeBenefits) {
    var FreeBenefitsPanel = (function (_super) {
        __extends(FreeBenefitsPanel, _super);
        function FreeBenefitsPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "FreeBenefitsSkin";
            return _this;
        }
        FreeBenefitsPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.groups = [this.itme1, this.itme2, this.itme3, this.itme4];
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            if (uniLib.Global.isNative) {
                uniLib.DisplayUtils.removeFromParent(this.itme3);
                uniLib.DisplayUtils.removeFromParent(this.itme4);
            }
            else {
                if (wxgame.Utils.isIos) {
                    uniLib.DisplayUtils.removeFromParent(this.itme4);
                }
            }
            if (uniLib.Global.isWxGame() || uniLib.Global.platId == 152) {
            }
            else {
                uniLib.DisplayUtils.removeFromParent(this.itme2);
            }
            this.addRedPoint();
        };
        FreeBenefitsPanel.prototype.addRedPoint = function () {
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
            uniLib.Global.platId != 152 && LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Share, [[this.red2]]);
            if (uniLib.Global.isWxGame()) {
                LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Subscribe, [[this.red4]]);
                LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Desk, [[this.red5]]);
            }
        };
        FreeBenefitsPanel.prototype.removeRedPoint = function () {
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Act_DaySign);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Share);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Subscribe);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Desk);
        };
        /**
         * 设置回调函数
         * 数组第一个：每日签到
         *  第二个：邀请好礼
         * 第四个：收藏有礼
        */
        FreeBenefitsPanel.prototype.setBackFuns = function (funs, arg) {
            this._funs = funs;
            this._arg = arg;
        };
        FreeBenefitsPanel.prototype.onTouchHandler = function (evt) {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this.itme1:
                    this.callFun(0);
                    break;
                case this.itme2:
                    this.callFun(1);
                    break;
                case this.itme3:
                    this.callFun(2);
                    break;
                case this.itme4:
                    LoadPanelTipMgr.getInstance().loadRes(freeBenefits.FreeBenefitsConsts.PUB_DESKCOLLECTION, function () {
                        uniLib.PopUpMgr.addPopUp(freeBenefits.DeskCollectionPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                    });
                    break;
            }
        };
        FreeBenefitsPanel.prototype.callFun = function (index) {
            if (this._funs && this._funs.length >= index && this._funs[index])
                this._funs[index].apply(this, [this._arg[index]]);
            else {
                console.error("没配置第" + index + "个的回调函数");
            }
        };
        FreeBenefitsPanel.prototype.destroy = function () {
            this.removeRedPoint();
            this._funs = null;
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.groups[i] = null;
            this.removeChildren();
        };
        return FreeBenefitsPanel;
    }(eui.Component));
    freeBenefits.FreeBenefitsPanel = FreeBenefitsPanel;
    __reflect(FreeBenefitsPanel.prototype, "freeBenefits.FreeBenefitsPanel");
})(freeBenefits || (freeBenefits = {}));
var freeBenefits;
(function (freeBenefits) {
    var PublicAddressPanel = (function (_super) {
        __extends(PublicAddressPanel, _super);
        function PublicAddressPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "PublicAddressSkin";
            return _this;
        }
        PublicAddressPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.copy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.addEventListener("GET_PAGE_INFO", this.onInfo, this);
            var req = new Cmd.GetPageInfoHpMatchCmd_C();
            req.typ = Cmd.PAGE_TYPE.PUBLIC_ACCOUNT;
            NetMgr.tcpSend(req);
        };
        PublicAddressPanel.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.reward_btn) {
                if (MJLobbyData.getInstance().qudao == 878) {
                    var rq = new Cmd.GetPageRewardHpMatchCmd_C();
                    rq.typ = Cmd.PAGE_TYPE.PUBLIC_ACCOUNT;
                    NetMgr.tcpSend(rq);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("从公众号启动小程序才能领取奖励哦！");
                }
            }
            else if (evt.target == this.copy_btn) {
                uniLib.ZQGameSdk.nativeCopyStr("haocaipdk");
                uniLib.TipsUtils.showTipsDownToUp("复制成功");
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        PublicAddressPanel.prototype.onInfo = function (evt) {
            this.setInfo(evt.param);
        };
        PublicAddressPanel.prototype.setInfo = function (info) {
            if (info.status == 2) {
                this.reward_btn.enabled = false;
            }
            else if (info.status == 1) {
                this.reward_btn.enabled = true;
            }
            for (var i = 0; i < info.rewards.length; i++) {
                var cp = new eui.Component();
                cp.width = cp.height = 108;
                var bg = new eui.Image(RES.getRes("publicAddress_json.lb_gzgzh_bg4"));
                bg.scale9Grid = new egret.Rectangle(11, 11, 2, 2);
                bg.width = bg.height = 108;
                cp.addChild(bg);
                var re = info.rewards[i];
                var icon = new eui.Image();
                var font = new eui.BitmapLabel(re.goodNbr + "");
                font.font = RES.getRes("publicAddress_font_fnt");
                font.validateNow();
                font.y = cp.height - 30;
                font.x = cp.width - 17 * (re.goodNbr + "").length;
                cp.addChild(icon);
                cp.addChild(font);
                if (re.goodId == 6)
                    icon.texture = RES.getRes("publicAddress_json.lb_gzgzh_diamond");
                else if (re.goodId == 32)
                    icon.texture = RES.getRes("publicAddress_json.lb_gzgzh_jinbi");
                else if (re.goodId == 336)
                    icon.texture = RES.getRes("publicAddress_json.lb_gzgzh_fuka");
                icon.x = (cp.width - icon.width) >> 1;
                icon.y = (cp.height - icon.height) >> 1;
                this.reward_grp.addChild(cp);
            }
        };
        PublicAddressPanel.prototype.destroy = function () {
            uniLib.Global.removeEventListener("GET_PAGE_INFO", this.onInfo, this);
            this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.copy_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return PublicAddressPanel;
    }(eui.Component));
    freeBenefits.PublicAddressPanel = PublicAddressPanel;
    __reflect(PublicAddressPanel.prototype, "freeBenefits.PublicAddressPanel");
})(freeBenefits || (freeBenefits = {}));
