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
var lobbyaward;
(function (lobbyaward) {
    var AwardConst = (function () {
        function AwardConst() {
        }
        AwardConst.RES_JSON = "resource/lobbyaward.res.json";
        AwardConst.THM_JSON = "resource/gameEui.json";
        /**
         * 公共loading需要加载的资源组
         */
        AwardConst.LOBBY_AWARD = "lobby_award";
        return AwardConst;
    }());
    lobbyaward.AwardConst = AwardConst;
    __reflect(AwardConst.prototype, "lobbyaward.AwardConst");
    /**暂存数据 对应表数据 */
    var Data = (function () {
        function Data() {
        }
        /**每日签到 */
        Data.sign = {};
        /**道具表 */
        Data.goods = {};
        /**任务 免费金币 */
        Data.task = {};
        return Data;
    }());
    lobbyaward.Data = Data;
    __reflect(Data.prototype, "lobbyaward.Data");
})(lobbyaward || (lobbyaward = {}));
var lobbyaward;
(function (lobbyaward) {
    var LobbyGetAwardPanel = (function (_super) {
        __extends(LobbyGetAwardPanel, _super);
        function LobbyGetAwardPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "LobbyGetAwardSkin";
            return _this;
        }
        LobbyGetAwardPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LobbyGetAwardPanel.prototype.destroy = function () {
            uniLib.PopUpMgr.removePopUp(this);
            uniLib.DisplayUtils.stopTweenGroup(this.guang);
        };
        LobbyGetAwardPanel.prototype.setData = function (jinbi, type) {
            uniLib.DisplayUtils.playTweenGroup(this.guang, true); //光转动画
            this._freeGoldMc = uniLib.DragonUtils.createDragonBonesDisplay("mjlb_freegold_effect_ske_json", "mjlb_freegold_effect_tex_json", "mjlb_freegold_effect_tex_png", "MovieClip");
            dragonBones.WorldClock.clock.add(this._freeGoldMc);
            this._freeGoldMc.display.x = uniLib.Global.designWidth / 2 - this._freeGoldMc.display.width;
            this._freeGoldMc.display.y = uniLib.Global.designHeight / 2 - this._freeGoldMc.display.height;
            this.addChildAt(this._freeGoldMc.display, 1);
            if (this._freeGoldMc) {
                this._freeGoldMc.animation.play("freegold", 1);
            }
            if (type == 32) {
                this.awardimage.source = "mjl_rewards3"; //金币
            }
            else {
                this.awardimage.source = "mjl_rewards4"; //钻石
            }
            this.jinbiText.text = jinbi + ""; //奖励金币数
            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
        };
        return LobbyGetAwardPanel;
    }(eui.Component));
    lobbyaward.LobbyGetAwardPanel = LobbyGetAwardPanel;
    __reflect(LobbyGetAwardPanel.prototype, "lobbyaward.LobbyGetAwardPanel");
})(lobbyaward || (lobbyaward = {}));
