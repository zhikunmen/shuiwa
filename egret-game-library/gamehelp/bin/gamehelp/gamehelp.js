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
var gamehelp;
(function (gamehelp) {
    var HelpConst = (function () {
        function HelpConst() {
        }
        HelpConst.RES_JSON = "resource/gamehelp/gamehelp.res_d32a0428.json";
        HelpConst.THM_JSON = "resource/gamehelp/gameEui_780ce3a6.json";
        /**
         * 公共loading需要加载的资源组
         */
        HelpConst.GAME_HELP = "game_help";
        return HelpConst;
    }());
    gamehelp.HelpConst = HelpConst;
    __reflect(HelpConst.prototype, "gamehelp.HelpConst");
})(gamehelp || (gamehelp = {}));
var gamehelp;
(function (gamehelp) {
    var HelpPanel = (function (_super) {
        __extends(HelpPanel, _super);
        function HelpPanel(titletxt, typetxt, contentTxt) {
            var _this = _super.call(this, "help_title_png", 824, 556) || this;
            _this._typetext = typetxt;
            _this._contenttext = contentTxt;
            _this._titletext = titletxt;
            _this.skinName = "HelpSkin";
            return _this;
        }
        HelpPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        HelpPanel.prototype.initUI = function () {
            this._titleTxt.text = this._titletext;
            this._typeTxt.text = this._typetext;
            this._contenttext = this._contenttext.replace(/#113780/g, "#e9dd1d"); //大厅批量替换规则字体贪色
            if (!this._contenttext) {
                this._contenttext = "暂无";
            }
            this._contentTxt.textFlow = (new egret.HtmlTextParser).parser(this._contenttext);
        };
        HelpPanel.prototype.destory = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._titleTxt = null;
            this._typeTxt = null;
            this._contentTxt = null;
            this._contenttext = null;
            this._typetext = null;
            this._titletext = null;
        };
        return HelpPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    gamehelp.HelpPanel = HelpPanel;
    __reflect(HelpPanel.prototype, "gamehelp.HelpPanel");
})(gamehelp || (gamehelp = {}));
