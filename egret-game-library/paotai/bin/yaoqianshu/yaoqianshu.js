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
var yaoqianshu;
(function (yaoqianshu) {
    var YaoQianShuConsts = (function () {
        function YaoQianShuConsts() {
        }
        YaoQianShuConsts.RES_JSON = "resource/yaoqianshu/yaoqianshu.res_1d09b5b9.json";
        YaoQianShuConsts.THM_JSON = "resource/yaoqianshu/gameEui_9f77be73.json";
        /**
         * 公共guide需要加载的资源组
         */
        YaoQianShuConsts.PUB_YAOQIANSHU = "pub_yaoqianshu";
        return YaoQianShuConsts;
    }());
    yaoqianshu.YaoQianShuConsts = YaoQianShuConsts;
    __reflect(YaoQianShuConsts.prototype, "yaoqianshu.YaoQianShuConsts");
})(yaoqianshu || (yaoqianshu = {}));
var yaoqianshu;
(function (yaoqianshu) {
    var YaoQianShuPanel = (function (_super) {
        __extends(YaoQianShuPanel, _super);
        function YaoQianShuPanel() {
            var _this = _super.call(this) || this;
            _this._jinyinzhuNum = [0, 0]; //索引0 是金猪 1 是银猪
            _this.GOLDTREE_YAODONG = "yaodong";
            _this.GOLDTREE_JINBISHAO = "jinbishao";
            _this.GOLDTREE_JINBIDUO = "jinbiduo";
            _this.skinName = "YaoQianShuSkin";
            return _this;
        }
        YaoQianShuPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            var movie = "yaoqianshu";
            this._anim = uniLib.DragonUtils.createDragonBonesDisplay(movie + "_ske_json", movie + "_tex_json", movie + "_tex_png", uniLib.DragonType.ARMATURE);
            this._anim.display.x = 490;
            this._anim.display.y = 380;
            this._anim.display.scaleX = this._anim.display.scaleY = 1.5;
            this._anim.display.touchEnabled = true;
            this.addChildAt(this._anim.display, 9);
            this._glodNum.minimum = 0;
            this._mcardTip.touchEnabled = false;
            this.initUI();
        };
        YaoQianShuPanel.prototype.addEvents = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(yaoqianshu.CmdConstant.GLODELE_DATA, this.updata, this);
            uniLib.Global.addEventListener(yaoqianshu.CmdConstant.GLODELE_GETREWARD, this.getRewardResult, this);
            uniLib.Global.addEventListener(yaoqianshu.CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.addEventListener(yaoqianshu.CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
        };
        YaoQianShuPanel.prototype.removeEvents = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.removeEventListener(yaoqianshu.CmdConstant.GLODELE_DATA, this.updata, this);
            uniLib.Global.removeEventListener(yaoqianshu.CmdConstant.GLODELE_GETREWARD, this.getRewardResult, this);
            uniLib.Global.removeEventListener(yaoqianshu.CmdConstant.BACKPACK_INFO_RETURN, this.backPackListHandler, this);
            uniLib.Global.removeEventListener(yaoqianshu.CmdConstant.BACKPACK_EXCHANGE, this.backPackExchangeHandler, this);
        };
        YaoQianShuPanel.prototype.onTouchHandle = function (e) {
            var _this = this;
            var target = e.target;
            if (target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this._pickUp) {
                if (MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid) {
                    this.getReward();
                }
                else {
                    this.getMonthCard();
                }
            }
            else if (target == this._anim.display) {
                this.playAnim(this.GOLDTREE_YAODONG);
                if (!MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid)
                    this._mcardTip.visible = true;
                this.clear();
                this.timer = setTimeout(function () {
                    _this.treeShake(_this.moneyTreeData.produce);
                    _this._mcardTip.visible = false;
                }, 1000);
            }
            else if (target == this._upgrade || target == this._recharge) {
                LobbyModuleMgr.getInstance().showMarketPanel(0);
            }
            else if (target == this._yaojinzhu) {
                this.userDaoJu(335, this._jinyinzhuNum[0]);
            }
            else if (target == this._yaoyinzhu) {
                this.userDaoJu(334, this._jinyinzhuNum[1]);
            }
        };
        YaoQianShuPanel.prototype.userDaoJu = function (goodId, num) {
            if (num == 0) {
                match.OnGetSceneInfoHpMatchCmd_C(match.BigSceneType.TYPE_PIG, match.GameId.ID_MATCH_PIG);
            }
            else {
                var req = new Cmd.BackpackExchangeRequestBackpackCmd_C();
                var packInfo = new Cmd.BackpackInfo();
                packInfo.goodId = goodId;
                packInfo.number = 1;
                req.backpackInfo = packInfo;
                NetMgr.tcpSend(req);
            }
        };
        /**
         * 刷新页面数据
         */
        YaoQianShuPanel.prototype.updata = function (e) {
            this.moneyTreeData = e.param;
            var level = this.moneyTreeData.level;
            this.treeShake(this.moneyTreeData.produce);
            if (Boolean(this.moneyTreeData.receive)) {
                this._pickUp.currentState = "up";
                this._pickUp.touchEnabled = true;
            }
            else {
                this._pickUp.currentState = "disabled";
                this._pickUp.touchEnabled = false;
            }
            // this._pickUp.enabled = Boolean(this.moneyTreeData.receive);
            if (level > 0) {
                this._level.text = "L" + level;
                this.getGlod(this.moneyTreeData.produce, level);
            }
            else {
                this._recharge.visible = true;
                this._pcikupGroup.visible = false;
            }
        };
        /*设置金币数量和进度条*/
        YaoQianShuPanel.prototype.getGlod = function (val, level) {
            var max = ((level - 1) * 60 + 1000) * 5;
            // val = max/2;
            this._glodNum.maximum = max;
            this._glodNum.value = val;
            this._progressTex.textFlow = [{ text: val + "", style: { "textColor": 0xffffff } }, { text: "/" + max, style: { "textColor": 0xffc430 } }];
        };
        /**
         * 领取金币返回数据
         */
        YaoQianShuPanel.prototype.getRewardResult = function (e) {
            var rev = e.param;
            uniLib.TipsUtils.showTipsDownToUp("领取了" + this.moneyTreeData.produce + "金币！");
            this.initUI();
        };
        //查找
        YaoQianShuPanel.prototype.backPackListHandler = function (evt) {
            var _this = this;
            var curData = evt.param;
            var backpackList = curData.backpackList;
            if (backpackList && backpackList.length > 0) {
                backpackList.forEach(function (b) {
                    if (b.goodId == 335)
                        _this._jinyinzhuNum[0] = b.number;
                    else if (b.goodId == 334)
                        _this._jinyinzhuNum[1] = b.number;
                });
            }
        };
        YaoQianShuPanel.prototype.backPackExchangeHandler = function (evt) {
            var curData = evt.param;
            if (curData.backpackInfo.goodId == 335)
                this._jinyinzhuNum[0] = curData.backpackInfo.number;
            else if (curData.backpackInfo.goodId == 334)
                this._jinyinzhuNum[1] = curData.backpackInfo.number;
        };
        /**获取月卡信息*/
        YaoQianShuPanel.prototype.getMonthCard = function () {
            var msg = new uniLib.MsgBox("月卡用户才能领取，是否立即开通月卡？", "", "开通", function () {
                var req = new Cmd.GetMonthCardInfoLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                NetMgr.tcpSend(req);
            }, "取消", null, this);
            uniLib.PopUpMgr.addPopUp(msg, null, true, true, false, uniLib.PopUpEffect.CENTER);
        };
        /**
         * 获取金币
         */
        YaoQianShuPanel.prototype.getReward = function () {
            var req = new Cmd.GetMoneyTreeGoldLobby_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);
        };
        YaoQianShuPanel.prototype.initUI = function () {
            var req = new Cmd.GetMoneyTreeDataLobby_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);
            var req1 = new Cmd.BackpackInfoRequestBackpackCmd_C();
            NetMgr.tcpSend(req1);
        };
        /** 根据金币数量要确定摇钱树动画*/
        YaoQianShuPanel.prototype.treeShake = function (goldNum) {
            if (goldNum > ((this.moneyTreeData.level - 1) * 60 + 1000) * 2.5) {
                // this._anim.play(this.GOLDTREE_JINBIDUO);
                this.playAnim(this.GOLDTREE_JINBIDUO);
            }
            else {
                // this._anim.play(this.GOLDTREE_JINBISHAO);
                this.playAnim(this.GOLDTREE_JINBISHAO);
            }
        };
        YaoQianShuPanel.prototype.playAnim = function (animationName) {
            this.animationName = animationName;
            uniLib.DragonUtils.runDragonBonesArmature(this._anim, animationName);
        };
        YaoQianShuPanel.prototype.clear = function () {
            if (this.timer) {
                clearTimeout(this.timer);
            }
        };
        YaoQianShuPanel.prototype.destroy = function () {
            this.removeEvents();
            this._mcardTip.visible = false;
            this.clear();
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeFromParent(this._anim.display);
            if (this.animationName)
                uniLib.DragonUtils.destoryDragonBonesArmature(this._anim, this.animationName);
        };
        return YaoQianShuPanel;
    }(eui.Component));
    yaoqianshu.YaoQianShuPanel = YaoQianShuPanel;
    __reflect(YaoQianShuPanel.prototype, "yaoqianshu.YaoQianShuPanel");
})(yaoqianshu || (yaoqianshu = {}));
var yaoqianshu;
(function (yaoqianshu) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**请求摇钱树数据*/
        CmdConstant.GLODELE_DATA = "glodele_data";
        /**请求领取摇钱树金币数据*/
        CmdConstant.GLODELE_GETREWARD = "glodele_getReward";
        /**
        * 获取背包列表 (这个消息类型和背包同步)
        */
        CmdConstant.BACKPACK_INFO_RETURN = "backpack_info_return";
        /**
        * 获取背包道具使用(这个消息类型和背包同步)
        */
        CmdConstant.BACKPACK_EXCHANGE = "backpack_exchange";
        return CmdConstant;
    }());
    yaoqianshu.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "yaoqianshu.CmdConstant");
})(yaoqianshu || (yaoqianshu = {}));
var YaoQianShuReciveMgr = (function () {
    function YaoQianShuReciveMgr() {
    }
    return YaoQianShuReciveMgr;
}());
__reflect(YaoQianShuReciveMgr.prototype, "YaoQianShuReciveMgr");
var Cmd;
(function (Cmd) {
    /**摇钱树-请求数据 */
    function OnGetMoneyTreeDataLobby_S(rev) {
        uniLib.Global.dispatchEvent(yaoqianshu.CmdConstant.GLODELE_DATA, rev, true);
    }
    Cmd.OnGetMoneyTreeDataLobby_S = OnGetMoneyTreeDataLobby_S;
    /**摇钱树-获取金币 */
    function OnGetMoneyTreeGoldLobby_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(yaoqianshu.CmdConstant.GLODELE_GETREWARD, rev, true);
        }
        else {
            uniLib.TipsUtils.showTipsDownToUp(rev.desc);
        }
    }
    Cmd.OnGetMoneyTreeGoldLobby_S = OnGetMoneyTreeGoldLobby_S;
})(Cmd || (Cmd = {}));
