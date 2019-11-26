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
var gamedismiss;
(function (gamedismiss) {
    var GameDismissConst = (function () {
        function GameDismissConst() {
        }
        GameDismissConst.RES_JSON = "resource/gamedismiss.res.json";
        GameDismissConst.THM_JSON = "resource/gameEui.json";
        /**
         * 公共loading需要加载的资源组
         */
        GameDismissConst.GAME_DISMISS = "game_dismiss";
        return GameDismissConst;
    }());
    gamedismiss.GameDismissConst = GameDismissConst;
    __reflect(GameDismissConst.prototype, "gamedismiss.GameDismissConst");
})(gamedismiss || (gamedismiss = {}));
var gamedismiss;
(function (gamedismiss) {
    var GameDismissPanel = (function (_super) {
        __extends(GameDismissPanel, _super);
        function GameDismissPanel() {
            var _this = _super.call(this) || this;
            _this._colorArr = [0xff7200, 0x119300, 0xff0c00];
            _this.skinName = "GameDissmissSkin";
            return _this;
        }
        GameDismissPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            // this.addEvent();
        };
        return GameDismissPanel;
    }(eui.Component));
    gamedismiss.GameDismissPanel = GameDismissPanel;
    __reflect(GameDismissPanel.prototype, "gamedismiss.GameDismissPanel");
})(gamedismiss || (gamedismiss = {}));
var gamedismiss;
(function (gamedismiss) {
    var GameDismissUIEventConsts = (function () {
        function GameDismissUIEventConsts() {
        }
        /**弃游 */
        GameDismissUIEventConsts.DISMISS_GAME = "DISMISS_GAME";
        return GameDismissUIEventConsts;
    }());
    gamedismiss.GameDismissUIEventConsts = GameDismissUIEventConsts;
    __reflect(GameDismissUIEventConsts.prototype, "gamedismiss.GameDismissUIEventConsts");
    var GameDismissData = (function () {
        function GameDismissData() {
        }
        GameDismissData.getInstance = function () {
            if (!this._instance) {
                this._instance = new GameDismissData();
            }
            return this._instance;
        };
        return GameDismissData;
    }());
    gamedismiss.GameDismissData = GameDismissData;
    __reflect(GameDismissData.prototype, "gamedismiss.GameDismissData");
})(gamedismiss || (gamedismiss = {}));
