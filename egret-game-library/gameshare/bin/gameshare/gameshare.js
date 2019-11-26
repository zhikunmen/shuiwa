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
var gameshare;
(function (gameshare) {
    var ShareConst = (function () {
        function ShareConst() {
        }
        ShareConst.RES_JSON = "resource/gameshare/gameshare.res_9e516644.json";
        ShareConst.THM_JSON = "resource/gameshare/gameEui_639d1756.json";
        /**
         * 公共loading需要加载的资源组
         */
        ShareConst.GAME_SHARE = "game_share";
        return ShareConst;
    }());
    gameshare.ShareConst = ShareConst;
    __reflect(ShareConst.prototype, "gameshare.ShareConst");
})(gameshare || (gameshare = {}));
var gameshare;
(function (gameshare) {
    /**
     * 小程序分享截图
     * 传的数据如下
     * 成绩数据：排好（头像资源，昵称字段，赢局数，赢总分数）
     * 玩法数据
     * 麻将还是扑克
     */
    var SharePanel = (function (_super) {
        __extends(SharePanel, _super);
        function SharePanel(totaldata, playText) {
            var _this = _super.call(this) || this;
            _this.skinName = "shareSkin";
            _this._totaldata = totaldata;
            _this._playText = playText;
            _this.initUI();
            return _this;
        }
        SharePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        SharePanel.prototype.initUI = function () {
            var date = new Date();
            var dateStr = date.getUTCFullYear() + "-" + (date.getUTCMonth() + 1) + "-" + date.getUTCDate();
            this._sharedate = dateStr + "  " + this.setTimeFormat(date.getHours()) + ":" + this.setTimeFormat(date.getMinutes()) + ":" + this.setTimeFormat(date.getSeconds());
            this.playLabel.textFlow = new Array({ text: this._playText, style: { "textColor": 0xffff00 } }, { text: this._sharedate, style: { "textColor": 0xffffff } });
            this.itemList.itemRenderer = shareItemPanel;
            this.list = new eui.ArrayCollection(this._totaldata);
            this.itemList.dataProvider = this.list;
        };
        SharePanel.prototype.setTimeFormat = function (value) {
            var txt = "";
            if (value < 10) {
                txt = "0" + value;
            }
            else {
                txt = value + "";
            }
            return txt;
        };
        return SharePanel;
    }(eui.Component));
    gameshare.SharePanel = SharePanel;
    __reflect(SharePanel.prototype, "gameshare.SharePanel");
    var shareItemPanel = (function (_super) {
        __extends(shareItemPanel, _super);
        function shareItemPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "shareItemSkin";
            return _this;
        }
        shareItemPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        shareItemPanel.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.totaldata = this.data;
            var index = this.itemIndex + 1;
            if (this.itemIndex <= 2) {
                this.rankImg.source = "gameshare_json.gameshare_" + index;
            }
            else {
                this.rankImg.visible = false;
            }
            this.headImg.source = this.totaldata.headurl;
            this.nameLabel.text = this.totaldata.name;
            this.idLabel.text = this.totaldata.id.toString();
            this.totalLabel.text = this.totaldata.totaltext.toString();
        };
        return shareItemPanel;
    }(eui.ItemRenderer));
    gameshare.shareItemPanel = shareItemPanel;
    __reflect(shareItemPanel.prototype, "gameshare.shareItemPanel");
    var totaldata = (function () {
        function totaldata() {
        }
        return totaldata;
    }());
    gameshare.totaldata = totaldata;
    __reflect(totaldata.prototype, "gameshare.totaldata");
})(gameshare || (gameshare = {}));
