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
var commonpanel;
(function (commonpanel) {
    var CommonPanel = (function (_super) {
        __extends(CommonPanel, _super);
        function CommonPanel(title, width, height, skin, needClose) {
            var _this = _super.call(this) || this;
            if (skin)
                _this.skinName = skin;
            else
                _this.skinName = CommonPanel.exml;
            _this._titleStr = title;
            _this._width = width;
            _this._height = height;
            _this._needClose = needClose;
            return _this;
        }
        CommonPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
            this.addEvent();
        };
        CommonPanel.prototype.initUI = function () {
            if (!this.skinName)
                return;
            if (this.closeBtn)
                this.closeBtn.visible = this._needClose;
            if (this._width)
                this.width = this._width;
            if (this._height)
                this.height = this._height;
            if (this._titleStr) {
                if (RES.getRes(this._titleStr)) {
                    this._title.source = this._titleStr;
                }
                else if (RES.getRes(this._titleStr + "_png")) {
                    this._title.source = this._titleStr + "_png";
                }
                else if (RES.getRes(this._titleStr + "_jpg")) {
                    this._title.source = this._titleStr + "_jpg";
                }
            }
            else {
                if (this._titleBg)
                    this._titleBg.source = "";
                if (this._title)
                    this._title.source = "";
            }
            // this._closeBtn.x = this._panelBg.width - this._closeBtn.width;
        };
        CommonPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        CommonPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        CommonPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        CommonPanel.prototype.btnClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    /**调用unilib的removePop会自动调用基类中的destroy方法 */
                    uniLib.PopUpMgr.removePopUp(this.parent);
                    break;
            }
        };
        CommonPanel.setDefaultSkin = function (skin) {
            CommonPanel.exml = skin;
        };
        Object.defineProperty(CommonPanel.prototype, "closeBtn", {
            get: function () {
                return this._closeBtn;
            },
            enumerable: true,
            configurable: true
        });
        CommonPanel.exml = "";
        return CommonPanel;
    }(eui.Component));
    commonpanel.CommonPanel = CommonPanel;
    __reflect(CommonPanel.prototype, "commonpanel.CommonPanel");
})(commonpanel || (commonpanel = {}));
/**eui组件的父类 */
var commonpanel;
(function (commonpanel) {
    var LobbyBaseEuiPanel = (function (_super) {
        __extends(LobbyBaseEuiPanel, _super);
        function LobbyBaseEuiPanel(title, width, height, skin, needClose) {
            if (needClose === void 0) { needClose = true; }
            var _this = _super.call(this) || this;
            if (title != undefined) {
                _this._commonPanel = new commonpanel.CommonPanel(title, width, height, skin, needClose);
            }
            return _this;
        }
        LobbyBaseEuiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this._commonPanel) {
                this.addChildAt(this._commonPanel, 0);
            }
            this.initUI();
            this.addEvent();
        };
        //初始化
        LobbyBaseEuiPanel.prototype.initUI = function () {
        };
        /**事件监听 */
        LobbyBaseEuiPanel.prototype.addEvent = function () {
        };
        LobbyBaseEuiPanel.prototype.removeEvent = function () {
        };
        LobbyBaseEuiPanel.prototype.destroy = function () {
            this.removeEvent();
            if (this._commonPanel)
                this._commonPanel.destroy();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        /**调用unilib的removePop会自动调用基类中的destroy方法 */
        LobbyBaseEuiPanel.prototype.removePop = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        LobbyBaseEuiPanel.prototype.disableCloseBtn = function () {
            if (this._commonPanel && this._commonPanel.closeBtn)
                this._commonPanel.closeBtn.visible = false;
        };
        return LobbyBaseEuiPanel;
    }(eui.Component));
    commonpanel.LobbyBaseEuiPanel = LobbyBaseEuiPanel;
    __reflect(LobbyBaseEuiPanel.prototype, "commonpanel.LobbyBaseEuiPanel");
})(commonpanel || (commonpanel = {}));
