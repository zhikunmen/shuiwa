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
        AwardConst.RES_JSON = "resource/lobbyaward/lobbyaward.res_e955bb1f.json";
        AwardConst.THM_JSON = "resource/lobbyaward/gameEui_e816f7bd.json";
        /**
         * 公共loading需要加载的资源组
         */
        AwardConst.LOBBY_AWARD = "lobby_award";
        return AwardConst;
    }());
    lobbyaward.AwardConst = AwardConst;
    __reflect(AwardConst.prototype, "lobbyaward.AwardConst");
})(lobbyaward || (lobbyaward = {}));
var lobbyaward;
(function (lobbyaward) {
    /**领取奖励动画 公用
    * type ：
    * 1、2：签到领取  id：奖品id；
    * 3：现金红包    id：现金金额
    */
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
        LobbyGetAwardPanel.prototype.initUI = function () {
            uniLib.DisplayUtils.playTweenGroup(this.guang, true); //光转动画
            this._freeGoldMc = uniLib.DragonUtils.createDragonBonesDisplay("mjlb_freegold_effect_ske_json", "mjlb_freegold_effect_tex_json", "mjlb_freegold_effect_tex_png", "MovieClip");
            dragonBones.WorldClock.clock.add(this._freeGoldMc);
            this._freeGoldMc.display.x = uniLib.Global.designWidth / 2 - this._freeGoldMc.display.width;
            this._freeGoldMc.display.y = uniLib.Global.designHeight / 2 - this._freeGoldMc.display.height;
            this.addChildAt(this._freeGoldMc.display, 1);
            if (this._freeGoldMc) {
                this._freeGoldMc.animation.play("freegold", 1);
            }
            this.okBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
        };
        LobbyGetAwardPanel.prototype.destroy = function () {
            uniLib.PopUpMgr.removePopUp(this);
            uniLib.DisplayUtils.stopTweenGroup(this.guang);
        };
        LobbyGetAwardPanel.prototype.setData = function (id, type) {
            var item;
            if (type == 1) {
                for (var i = 0; i < MJLobbyData.getInstance().sign[0].signReward.length; i++) {
                    if (MJLobbyData.getInstance().sign[0].signReward[i].dayNum == id) {
                        item = MJLobbyData.getInstance().sign[0].signReward[i].reward;
                        break;
                    }
                }
            }
            else if (type == 2) {
                for (var i = 0; i < MJLobbyData.getInstance().sign[0].cumulativeReward.length; i++) {
                    if (MJLobbyData.getInstance().sign[0].cumulativeReward[i].cumulativeNum == id) {
                        item = MJLobbyData.getInstance().sign[0].cumulativeReward[i].reward;
                        break;
                    }
                }
            }
            if (type == 3) {
                this.awardimage.source = "mjl_redpackets_json.mjl_redpackets_award";
                this.jinbiText.text = id + "元"; //奖励钱
            }
            else {
                var str = void 0;
                for (var parm in MJLobbyData.getInstance().goods) {
                    if (parm == item["goodsId"]) {
                        str = MJLobbyData.getInstance().goods[parm].goodIcon;
                        break;
                    }
                }
                this.awardimage.source = str; //奖品图片
                var num = void 0;
                num = item["count"];
                this.jinbiText.text = num; //奖励金币数
            }
        };
        /** 物品通用 */
        LobbyGetAwardPanel.prototype.setRewardItemData = function (rewardItem) {
            var str = MJLobbyData.getInstance().goods[rewardItem.goodId].goodIcon;
            this.awardimage.source = str; //奖品图片
            if (rewardItem.goodId == 353) {
                this.jinbiText.text = rewardItem.goodNbr + "元"; //奖励金币数
            }
            else {
                this.jinbiText.text = rewardItem.goodNbr + ""; //奖励金币数
            }
        };
        return LobbyGetAwardPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    lobbyaward.LobbyGetAwardPanel = LobbyGetAwardPanel;
    __reflect(LobbyGetAwardPanel.prototype, "lobbyaward.LobbyGetAwardPanel");
})(lobbyaward || (lobbyaward = {}));
