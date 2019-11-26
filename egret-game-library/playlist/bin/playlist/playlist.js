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
var playlist;
(function (playlist) {
    var PlayListConst = (function () {
        function PlayListConst() {
        }
        PlayListConst.RES_JSON = "resource/playlist/playlist.res_fe318fcd.json";
        PlayListConst.RES_JSON_QUANZHOU = "resource/playlist-quanzhou-zhongyou.res.json";
        PlayListConst.RES_JSON_GUANGDONG = "resource/playlist-laoyou-guangdong.res.json";
        PlayListConst.RES_JSON_NINGBO = "resource/playlist-ningbo.res.json";
        PlayListConst.RES_JSON_LY = "resource/playlist-laoyou.res.json";
        PlayListConst.THM_JSON = "resource/playlist/gameEui_341a3b2e.json";
        /**
         * 公共loading需要加载的资源组
         */
        PlayListConst.PUB_SETTING = "pub_playlist";
        return PlayListConst;
    }());
    playlist.PlayListConst = PlayListConst;
    __reflect(PlayListConst.prototype, "playlist.PlayListConst");
})(playlist || (playlist = {}));
var playlist;
(function (playlist) {
    var LobbyHelpPanel = (function (_super) {
        __extends(LobbyHelpPanel, _super);
        function LobbyHelpPanel(gameId) {
            var _this = _super.call(this, "mjl_help_title_png", 1070, 640) || this;
            _this.skinName = "playlist.HelpPanelSkin";
            _this._gameId = gameId;
            return _this;
        }
        LobbyHelpPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LobbyHelpPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this._gameList.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        LobbyHelpPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
            this._gameList.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.itemTap, this);
        };
        LobbyHelpPanel.prototype.initUI = function () {
            this._ruleArr = [];
            this._menuArr = [this._menu0, this._menu1, this._menu2, this._menu3];
            this._gameList.itemRenderer = playlist.RadioButton;
            this._gameList.dataProvider = new eui.ArrayCollection(MJLobbyData.getInstance().getGameList());
            this._gameList.selectedIndex = 0;
            if (this._gameId) {
                this._gameList.selectedIndex = MJLobbyData.getInstance().lobbyConfig.mahjongList.indexOf(this._gameId);
            }
            this._menuIndex = 0;
            this.refreshHelpTxt();
        };
        LobbyHelpPanel.prototype.btnClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    _super.prototype.removePop.call(this);
                    break;
                case this._menu0:
                    this._menuIndex = 0;
                    this.refreshHelpTxt();
                    break;
                case this._menu1:
                    this._menuIndex = 1;
                    this.refreshHelpTxt();
                    break;
                case this._menu2:
                    this._menuIndex = 2;
                    this.refreshHelpTxt();
                    break;
                case this._menu3:
                    this._menuIndex = 3;
                    this.refreshHelpTxt();
                    break;
            }
        };
        LobbyHelpPanel.prototype.itemTap = function (evt) {
            this.refreshHelpTxt();
        };
        LobbyHelpPanel.prototype.refreshHelpTxt = function () {
            var _this = this;
            this._menuArr.forEach(function (f, value) {
                if (value == _this._menuIndex) {
                    f.source = "mjl_help_menu" + (value + 1) + "_1_png";
                    f.touchEnabled = false;
                }
                else {
                    f.source = "mjl_help_menu" + (value + 1) + "_2_png";
                    f.touchEnabled = true;
                }
            });
            var gameType = this._gameList.selectedItem;
            var ruleStr;
            if (!this._ruleArr[gameType]) {
                ruleStr = RES.getRes("rule_" + gameType + "_txt");
                if (!ruleStr) {
                    ruleStr = "";
                }
                ruleStr = ruleStr.replace(/#113780/g, "#493FFF"); //大厅批量替换规则字体贪色
                this._ruleArr[gameType] = ruleStr.split("########");
            }
            if (!this._ruleArr[gameType][this._menuIndex * 2 + 1]) {
                this._ruleArr[gameType][this._menuIndex * 2 + 1] = "暂无";
            }
            this._sysMsgTxt.textFlow = (new egret.HtmlTextParser).parser(this._ruleArr[gameType][this._menuIndex * 2 + 1]);
            this._scroll.viewport.scrollV = 0;
        };
        return LobbyHelpPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    playlist.LobbyHelpPanel = LobbyHelpPanel;
    __reflect(LobbyHelpPanel.prototype, "playlist.LobbyHelpPanel");
})(playlist || (playlist = {}));
/**gameRadionButton */
var playlist;
(function (playlist) {
    var RadioButton = (function (_super) {
        __extends(RadioButton, _super);
        function RadioButton() {
            var _this = _super.call(this) || this;
            _this.skinName = "playlist.RadioButtonSkin";
            _this.touchChildren = false;
            _this.touchEnabled = true;
            return _this;
        }
        RadioButton.prototype.dataChanged = function () {
            var data = this.data;
            var gameData = MJLobbyData.getInstance().getGameCreateConfig(data);
            this.labelDisplay.text = gameData.gameName;
        };
        return RadioButton;
    }(eui.ItemRenderer));
    playlist.RadioButton = RadioButton;
    __reflect(RadioButton.prototype, "playlist.RadioButton");
})(playlist || (playlist = {}));
