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
        FreeBenefitsConsts.RES_JSON = "resource/freeBenefits/freeBenefits.res_c05a7bbc.json";
        FreeBenefitsConsts.THM_JSON = "resource/freeBenefits/gameEui_be1d887d.json";
        /**
         * 需要加载免费福利的资源组
         */
        FreeBenefitsConsts.PUB_FREEBENEFITS = "pub_freeBenefits";
        /**
         * 需要加载桌面收藏的资源组
         */
        FreeBenefitsConsts.PUB_DESKCOLLECTION = "pub_deskCollection";
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
            this.addRedPoint();
        };
        FreeBenefitsPanel.prototype.addRedPoint = function () {
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Share, [[this.red2]]);
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
