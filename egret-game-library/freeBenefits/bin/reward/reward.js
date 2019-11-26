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
var reward;
(function (reward) {
    var SignItem = (function (_super) {
        __extends(SignItem, _super);
        function SignItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "SignItemSkin";
            return _this;
        }
        SignItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var goods = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.sign_day.text = "第" + info.day + "天";
            this.sign_icon.source = goods.goodIcon;
            this.sign_good_name.text = goods.goodName + "x" + info.goodNbr;
            if (info.day == 7) {
                this.sign_bg.width = 386;
            }
            var day = info.day == 7 ? 1 : 2;
            if (info.status == 1) {
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle";
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = true;
                this.sign_icon.source = "sign_miss";
            }
            else if (info.status == 2) {
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle";
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = true;
                this.sign_icon.source = "sign_receive";
            }
            else if (info.status == 3) {
                this.sign_bg.source = "sign_getbg" + day;
                this.sign_corn.source = "sign_gettitle";
                this.sign_good_name.textColor = 0xffffff;
                this.sign_mask.visible = false;
            }
            else if (info.status == 4) {
                this.sign_bg.source = "sign_missbg" + day;
                this.sign_corn.source = "sign_misstitle";
                this.sign_good_name.textColor = 0xa46359;
                this.sign_mask.visible = false;
            }
        };
        SignItem.prototype.setReceived = function (day) {
            var days = day == 7 ? 1 : 2;
            this.sign_bg.source = "sign_missbg" + days;
            this.sign_corn.source = "sign_misstitle";
            this.sign_good_name.textColor = 0xa46359;
            this.sign_mask.visible = true;
            this.sign_icon.source = "sign_receive";
        };
        return SignItem;
    }(eui.ItemRenderer));
    reward.SignItem = SignItem;
    __reflect(SignItem.prototype, "reward.SignItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var DiamondsPanel = (function (_super) {
        __extends(DiamondsPanel, _super);
        function DiamondsPanel() {
            var _this = _super.call(this) || this;
            _this.effects = [];
            _this.skinName = "DiamondsPanelSkin";
            return _this;
        }
        DiamondsPanel.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this.groups = [this.itme1, this.itme2, this.itme3, this.itme4, this.itme5];
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            uniLib.Global.addEventListener(reward.CmdConstant.DIAMONDINTERFACETIPS, this.onDiamondInterfaceTips, this);
            if (!uniLib.Global.isWxGame()) {
                uniLib.DisplayUtils.removeFromParent(this.itme4);
                this.initData(2);
                return;
            }
            wx.getSystemInfo({ "success": function (obj) { _this.platformOper(obj); } });
        };
        DiamondsPanel.prototype.initData = function (type) {
            var req = new Cmd.GetDiamondInterfaceTips_C();
            req.typ = type;
            NetMgr.tcpSend(req);
        };
        DiamondsPanel.prototype.platformOper = function (obj) {
            var system = obj["system"];
            if (system.indexOf("ndroid") > -1) {
                uniLib.DisplayUtils.removeFromParent(this.itme5);
                this.initData(1);
            }
            else {
                uniLib.DisplayUtils.removeFromParent(this.itme4);
                this.initData(2);
            }
        };
        DiamondsPanel.prototype.onDiamondInterfaceTips = function (evt) {
            var rev = evt.param;
            var tips = rev.tips;
            if (tips == null || tips.length == 0)
                return;
            this.clearEffect();
            for (var i = 0; i < tips.length; i++) {
                this.addEffect(tips[i] - 1);
            }
        };
        DiamondsPanel.prototype.clearEffect = function () {
            for (var i = 0; i < this.effects.length; i++) {
                this.effects[i].dispose();
                this.effects[i].removeChildren();
                uniLib.DisplayUtils.removeFromParent(this.effects[i]);
            }
            this.effects = [];
        };
        DiamondsPanel.prototype.addEffect = function (index) {
            var group = new eui.WxContain();
            group.x = group.y = 0;
            var anim = new eui.ArmatureComponent();
            anim.resName = "yuanquan";
            anim.update();
            anim.x = 88;
            anim.y = 89;
            group.addChild(anim);
            var iconNum = index + 1;
            var icon = new egret.Bitmap(RES.getRes("reward_icon" + iconNum + "_png"));
            icon.x = (175 - icon.width) / 2;
            icon.y = (178 - icon.height) / 2;
            ;
            group.addChild(icon);
            var tuijian = new egret.Bitmap(RES.getRes("reward_tuijian_png"));
            tuijian.x = 93;
            tuijian.y = -2;
            group.addChild(tuijian);
            this.groups[index].removeChildAt(0);
            this.groups[index].addChildAt(group, 0);
            this.effects.push(group);
        };
        /**
         * 设置回调函数
         * 数组第一个：分享有礼
         *  第二个：每日任务
         * 第三个：免费钻石赛
         * 第四个：领钻石
         * 第五个：商城
        */
        DiamondsPanel.prototype.setBackFuns = function (funs, arg) {
            this._funs = funs;
            this._arg = arg;
        };
        DiamondsPanel.prototype.onTouchHandler = function (evt) {
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
                    this.callFun(3);
                    break;
                case this.itme5:
                    this.callFun(4);
                    break;
            }
        };
        DiamondsPanel.prototype.callFun = function (index) {
            if (this._funs && this._funs.length >= index && this._funs[index])
                this._funs[index].apply(this, [this._arg[index]]);
            else {
                console.error("没配置第" + index + "个的回调函数");
            }
        };
        DiamondsPanel.prototype.destroy = function () {
            this._funs = null;
            this.clearEffect();
            uniLib.Global.removeEventListener(reward.CmdConstant.DIAMONDINTERFACETIPS, this.onDiamondInterfaceTips, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i = 0; i < this.groups.length; i++) {
                this.groups[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.groups[i] = null;
            this.removeChildren();
        };
        return DiamondsPanel;
    }(eui.Component));
    reward.DiamondsPanel = DiamondsPanel;
    __reflect(DiamondsPanel.prototype, "reward.DiamondsPanel");
})(reward || (reward = {}));
var reward;
(function (reward) {
    /**
     * 大厅福利界面
     */
    var FuLiPanel = (function (_super) {
        __extends(FuLiPanel, _super);
        function FuLiPanel(defaultMenu) {
            if (defaultMenu === void 0) { defaultMenu = 0; }
            var _this = _super.call(this) || this;
            _this._defaultMenu = defaultMenu;
            _this.skinName = "FuliPanelSkin";
            return _this;
        }
        FuLiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.introduce_grp.visible = false;
            this.sign_view.visible = false;
            this.task_view.visible = false;
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_rbtn.group.addEventListener(egret.Event.CHANGE, this.showTabContent, this);
            this.sign_rbtn.group.selectedValue = this._defaultMenu;
            this._viewGroup = [this.sign_view, this.task_view, this.introduce_grp];
            this._viewGroup[this._defaultMenu].visible = true;
            this._btnGroup = [this.sign_rbtn, this.task_rbtn, this.introduce_rbtn];
            this._btnGroup[this._defaultMenu].selected = true;
        };
        FuLiPanel.prototype.showTabContent = function (evt) {
            this._viewGroup[this._defaultMenu].visible = false;
            var rbGroup = evt.target;
            this._defaultMenu = parseInt(rbGroup.selectedValue);
            this._viewGroup[this._defaultMenu].visible = true;
        };
        FuLiPanel.prototype.onTouchHandler = function (evt) {
            uniLib.PopUpMgr.removePopUp(this);
        };
        FuLiPanel.prototype.destroy = function () {
            this._viewGroup = null;
            this._btnGroup = null;
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.sign_rbtn.group.removeEventListener(egret.Event.CHANGE, this.showTabContent, this);
            this.sign_view.destroy();
            this.task_view.destroy();
            this.removeChildren();
        };
        return FuLiPanel;
    }(eui.Component));
    reward.FuLiPanel = FuLiPanel;
    __reflect(FuLiPanel.prototype, "reward.FuLiPanel");
})(reward || (reward = {}));
var reward;
(function (reward) {
    /**月卡 */
    var MonthlyCard = (function (_super) {
        __extends(MonthlyCard, _super);
        function MonthlyCard() {
            var _this = _super.call(this) || this;
            _this.skinName = "MonthlyCardSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchHandler, _this);
            return _this;
        }
        MonthlyCard.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                this.purchase_btn.visible = false;
                this.iosDes_lbl.visible = true;
            }
            var instance = ConfigMgr.getInstance();
            var lobbyConfig = instance.getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
            var shopConfig = instance.getShopCfgById(lobbyConfig.monthCard[0]);
            var goodsConfig = instance.getGoodCfgById(shopConfig.shopGoods.goodId);
            var giftTxt = "";
            for (var i = 0; i < goodsConfig.giftGoods.length; i++) {
                var config = instance.getGoodCfgById(goodsConfig.giftGoods[i].goodId);
                giftTxt += goodsConfig.giftGoods[i].goodNbr + config.goodName;
            }
            var str = "1.购买后立即获得" + giftTxt + ("      2.\u8D2D\u4E70" + goodsConfig.effectiveTime + "\u5929\u5185\u6BCF\u5929\u53EF\u4EE5\u9886\u53D6");
            for (var i = 0; i < goodsConfig.immediateGift.length; i++) {
                var config = instance.getGoodCfgById(goodsConfig.immediateGift[i].goodId);
                str += goodsConfig.immediateGift[i].goodNbr + config.goodName;
                /**每日领取的加上立即赠送的 */
                var sum = 0;
                for (var k = 0; k < goodsConfig.giftGoods.length; k++) {
                    if (goodsConfig.giftGoods[k].goodId == goodsConfig.immediateGift[i].goodId) {
                        sum = goodsConfig.giftGoods[k].goodNbr;
                        break;
                    }
                }
                this[config.goodIcon] && (this[config.goodIcon].text = config.goodName + "x" + (goodsConfig.immediateGift[i].goodNbr * goodsConfig.effectiveTime + sum));
                if (i != goodsConfig.immediateGift.length - 1) {
                    str += "和";
                }
            }
            this.desc_lbl.text = str;
            this.iosDes_lbl.textFlow = [{ text: "苹果用户请关注" }, { text: "公众号", style: { underline: true, textColor: 0xe8f700 } }, { text: "后开通" }];
        };
        MonthlyCard.prototype.onTouchHandler = function (evt) {
            var _this = this;
            if (evt.target == this.iosDes_lbl) {
                LobbyModuleMgr.getInstance().showCustomer();
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.purchase_btn) {
                if (this._timeIndex) {
                    uniLib.TipsUtils.showTipsDownToUp("订单处理中，请稍后");
                }
                else {
                    var instance = ConfigMgr.getInstance();
                    var lobbyConfig = instance.getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
                    var shopConfig = instance.getShopCfgById(lobbyConfig.monthCard[0]);
                    shop.ShopControl.checkSession(shopConfig);
                    this._timeIndex = egret.setTimeout(function () { egret.clearTimeout(_this._timeIndex); _this._timeIndex = null; }, this, 5000);
                }
            }
        };
        MonthlyCard.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            egret.clearTimeout(this._timeIndex);
            this._timeIndex = null;
        };
        return MonthlyCard;
    }(eui.Component));
    reward.MonthlyCard = MonthlyCard;
    __reflect(MonthlyCard.prototype, "reward.MonthlyCard");
})(reward || (reward = {}));
var reward;
(function (reward) {
    /**
     * 领取月卡
     */
    var MonthlyCardRecv = (function (_super) {
        __extends(MonthlyCardRecv, _super);
        function MonthlyCardRecv(data) {
            var _this = _super.call(this) || this;
            _this._data = data;
            _this.skinName = "MonthlyCardRecvSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onTouchHandler, _this);
            return _this;
        }
        MonthlyCardRecv.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.left_lbl.text = this._data.remainDay.toString();
            this.renew_lbl.textFlow = [{ text: "月卡续费", style: { underline: true, textColor: 0xFF6600 } }];
            if (this._data.state == 2) {
                this.rev_btn.currentState = "disabled";
                this.rev_btn.touchEnabled = false;
            }
            var instance = ConfigMgr.getInstance();
            var lobbyConfig = instance.getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
            var shopConfig = instance.getShopCfgById(lobbyConfig.monthCard[0]);
            var goodsConfig = instance.getGoodCfgById(shopConfig.shopGoods.goodId);
            for (var i = 0; i < goodsConfig.immediateGift.length; i++) {
                var config = instance.getGoodCfgById(goodsConfig.immediateGift[i].goodId);
                this[config.goodIcon] && (this[config.goodIcon].text = config.goodName + "x" + goodsConfig.immediateGift[i].goodNbr);
            }
        };
        MonthlyCardRecv.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.renew_lbl) {
                if (uniLib.Global.isWxGame() && wxgame.Utils.isIos) {
                    LobbyModuleMgr.getInstance().showCustomer();
                    uniLib.PopUpMgr.removePopUp(this);
                }
                else {
                    var instance = ConfigMgr.getInstance();
                    var lobbyConfig = instance.getGameListCfgById(NetMgr.getLoginCfg().lobbyId);
                    var shopConfig = instance.getShopCfgById(lobbyConfig.monthCard[0]);
                    shop.ShopControl.checkSession(shopConfig);
                }
            }
            else if (evt.target == this.rev_btn) {
                var req = new Cmd.GetMonthCardRewardLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
            }
        };
        MonthlyCardRecv.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._data = null;
        };
        return MonthlyCardRecv;
    }(eui.Component));
    reward.MonthlyCardRecv = MonthlyCardRecv;
    __reflect(MonthlyCardRecv.prototype, "reward.MonthlyCardRecv");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var ReceiveDiamondsItem = (function (_super) {
        __extends(ReceiveDiamondsItem, _super);
        function ReceiveDiamondsItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "ReceiveItemSkin";
            return _this;
        }
        ReceiveDiamondsItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ReceiveDiamondsItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            this.user_head.source = info.headUrl;
            this.user_name.text = info.nickName;
            if (info.status == 2) {
                this._receiveBtn.visible = true;
                this._receiveed.visible = false;
                this._receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            else if (info.status == 3) {
                this._receiveBtn.visible = false;
                this._receiveed.visible = true;
            }
        };
        ReceiveDiamondsItem.prototype.onTouchHandler = function (evt) {
            var req = new Cmd.GetIosInviteRewardLittleGameLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.uid = this.data.uid;
            NetMgr.tcpSend(req);
        };
        return ReceiveDiamondsItem;
    }(eui.ItemRenderer));
    reward.ReceiveDiamondsItem = ReceiveDiamondsItem;
    __reflect(ReceiveDiamondsItem.prototype, "reward.ReceiveDiamondsItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var RewardConsts = (function () {
        function RewardConsts() {
        }
        RewardConsts.RES_JSON = "resource/reward/reward.res_ace53efe.json";
        RewardConsts.THM_JSON = "resource/reward/gameEui_b6867451.json";
        /**
         * 奖励钻石方面的资源组
         */
        RewardConsts.PUB_REWARD = "pub_reward";
        /**
         * 福利的资源组
         */
        RewardConsts.PUB_FULI = "pub_fuli";
        /**
         * 福利的资源组
        */
        RewardConsts.REWARD_VIP = "reward_vip";
        return RewardConsts;
    }());
    reward.RewardConsts = RewardConsts;
    __reflect(RewardConsts.prototype, "reward.RewardConsts");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var DiamondsReceivePanel = (function (_super) {
        __extends(DiamondsReceivePanel, _super);
        function DiamondsReceivePanel() {
            var _this = _super.call(this) || this;
            _this.index = 1;
            _this.skinName = "DiamondsReceiveSkin";
            return _this;
        }
        DiamondsReceivePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn2.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.scroll.addEventListener(egret.Event.CHANGE, this.scrollChange, this);
            this.diamond_lst.itemRenderer = reward.ReceiveDiamondsItem;
            uniLib.Global.addEventListener(reward.CmdConstant.IOSINVITEINFOLITTLE, this.onIosInviteInfoLittle, this);
            uniLib.Global.addEventListener(reward.CmdConstant.IOSINVITEREWARDLITTLE, this.onIosInviteRewardLittle, this);
            // let list:Cmd.InviteInfoLitteGame[] = [];
            // for(var i:number=0;i<10;i++){
            //     var info:Cmd.InviteInfoLitteGame = new Cmd.InviteInfoLitteGame();
            //     info.headUrl = "http://img4.duitang.com/uploads/item/201405/28/20140528185644_N3Xfe.thumb.700_0.jpeg";
            //     info.nickName =  "000"+i;
            //     info.status = i%2 ==0 ?2:3;
            //     list.push(info);
            // }
            // this.diamond_lst.dataProvider = new eui.ArrayCollection(list);
            this.loadRankData();
        };
        DiamondsReceivePanel.prototype.scrollChange = function (evt) {
            if (this.index < 4 && this.scroll.viewport.scrollV + this.scroll.height > this.scroll.viewport.contentHeight + 100) {
                this.scroll.viewport.scrollV = this.scroll.viewport.contentHeight - this.scroll.height;
                this.index++;
                this.loadRankData();
            }
        };
        DiamondsReceivePanel.prototype.loadRankData = function () {
            var req = new Cmd.GetIosInviteInfoLittleGameLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.index = this.index;
            NetMgr.tcpSend(req);
        };
        DiamondsReceivePanel.prototype.onIosInviteInfoLittle = function (evt) {
            this.empty_group.visible = false;
            var rev = evt.param;
            this.operateText(rev.yet, rev.total);
            if (rev.info == null || !(rev.info && rev.info instanceof Array)) {
                if (this.info == null)
                    this.empty_group.visible = true;
                return;
            }
            if (rev.index == 1)
                this.info = rev.info;
            else
                this.info = this.info.concat(rev.info);
            this.diamond_lst.dataProvider = new eui.ArrayCollection(this.info);
        };
        DiamondsReceivePanel.prototype.operateText = function (yet, total) {
            this.desc.textFlow = [
                { text: "分享到不同的群（" },
                { text: yet + "", style: { "textColor": 0xff7200 } },
                { text: "/" + total + "）" }
            ];
            this._count.text = (total - yet).toString();
        };
        DiamondsReceivePanel.prototype.onIosInviteRewardLittle = function (evt) {
            var rev = evt.param;
            for (var i = 0; i < this.info.length; i++) {
                if (this.info[i].uid == rev.single.uid) {
                    this.info[i] = rev.single;
                }
            }
            this.diamond_lst.dataProvider = new eui.ArrayCollection(this.info);
        };
        DiamondsReceivePanel.prototype.onTouchHandler = function (evt) {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this._shareBtn:
                case this._shareBtn2:
                    if (uniLib.Global.isWxGame()) {
                        var vo = new uniLib.WXShareVo();
                        vo.shareType = Cmd.ShareType.ios;
                        uniLib.ZQGameSdk.share(vo);
                        wxgame.Global.instance.aldSendEvent("周边系统", "领钻石跳转分享");
                    }
                    else {
                        share.shareNativeMessage(Cmd.ShareType.ios, 0, Cmd.ShareType.ios.toString());
                    }
                    break;
            }
        };
        DiamondsReceivePanel.prototype.destroy = function () {
            uniLib.Global.removeEventListener(reward.CmdConstant.IOSINVITEINFOLITTLE, this.onIosInviteInfoLittle, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.IOSINVITEREWARDLITTLE, this.onIosInviteRewardLittle, this);
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this._shareBtn2.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return DiamondsReceivePanel;
    }(eui.Component));
    reward.DiamondsReceivePanel = DiamondsReceivePanel;
    __reflect(DiamondsReceivePanel.prototype, "reward.DiamondsReceivePanel");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var SignView = (function (_super) {
        __extends(SignView, _super);
        function SignView() {
            var _this = _super.call(this) || this;
            _this.POSX = [0, 193, 386, 579, 0, 193, 386];
            _this.POSY = [40, 40, 40, 40, 200, 200, 200];
            _this.items = [];
            _this.skinName = "SignViewSkin";
            return _this;
        }
        SignView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData();
            if (uniLib.Global.isNative) {
                this.receive_lbl.visible = false;
            }
            else {
                this.receive_lbl.textFlow = (new egret.HtmlTextParser).parse('<font fontfamily="Microsoft YaHei"><u>直接领取</u></font>');
                this.receive_lbl.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.viewVideo_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        SignView.prototype.initData = function () {
            uniLib.Global.addEventListener(reward.CmdConstant.NOVICEINFO, this.onNoviceInfo, this);
            uniLib.Global.addEventListener(reward.CmdConstant.NOVICEREWARD, this.onNoviceReward, this);
            var req = new Cmd.GetNoviceInfodLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            NetMgr.tcpSend(req);
        };
        SignView.prototype.onNoviceInfo = function (evt) {
            var curData = evt.param;
            if (curData.resultCode && curData.resultCode != 0) {
                this.dispatchEventWith(egret.Event.COMPLETE);
                return;
            }
            this.noviceInfo = curData.noviceInfo;
            if (this.operateNum() == false) {
                this.dispatchEventWith(egret.Event.COMPLETE);
                return;
            }
            var canReceive = false;
            for (var i = 0; i < this.noviceInfo.length; i++) {
                var item = new reward.SignItem();
                item.data = this.noviceInfo[i];
                item.x = this.POSX[i];
                item.y = this.POSY[i];
                this.addChild(item);
                this.items.push(item);
                if (this.noviceInfo[i].status == 3)
                    canReceive = true;
            }
            !uniLib.Global.isNative && (this.receive_lbl.visible = canReceive);
        };
        SignView.prototype.operateNum = function () {
            for (var i = 0; i < this.noviceInfo.length; i++) {
                if (this.noviceInfo[i].status != 2)
                    return true;
            }
            return false;
        };
        SignView.prototype.onNoviceReward = function (evt) {
            var data = evt.param;
            this.items[data.day - 1].setReceived(data.day);
            this.receive_lbl.visible = false;
        };
        SignView.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.receive_lbl) {
                var req = new Cmd.GetNoviceRewarddLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                req.typ = 1;
                NetMgr.tcpSend(req);
                wxgame.Global.instance.aldSendEvent("周边系统", "登录奖励直接领取");
            }
            else if (evt.target == this.viewVideo_btn) {
                if (uniLib.Global.isWxGame()) {
                    wxgame.Global.instance.createRewardedVideoAd("", function () {
                        var req = new Cmd.GetNoviceRewarddLobbyCmd_C();
                        req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                        req.typ = 2;
                        NetMgr.tcpSend(req);
                        wxgame.Global.instance.aldSendEvent("周边系统", "登录奖励视频双倍");
                    }, this);
                }
                else {
                    var req = new Cmd.GetNoviceRewarddLobbyCmd_C();
                    req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                    req.typ = 2;
                    NetMgr.tcpSend(req);
                }
            }
        };
        SignView.prototype.destroy = function () {
            this.items = null;
            this.receive_lbl.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.NOVICEINFO, this.onNoviceInfo, this);
            uniLib.Global.removeEventListener(reward.CmdConstant.NOVICEREWARD, this.onNoviceReward, this);
            this.viewVideo_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.removeChildren();
        };
        return SignView;
    }(eui.Component));
    reward.SignView = SignView;
    __reflect(SignView.prototype, "reward.SignView");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var TaskItem = (function (_super) {
        __extends(TaskItem, _super);
        function TaskItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "TaskItemlSkin";
            return _this;
        }
        TaskItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.rev_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        TaskItem.prototype.onTouchHandler = function (evt) {
            if (evt.target == this.rev_btn) {
                var req = new Cmd.GetDaysTaskRewardLobbyCmd_C();
                req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                req.taskId = this.data.taskId;
                NetMgr.tcpSend(req);
                this.go_btn.currentState = "disabled";
                this.go_btn.touchEnabled = true;
                this.rev_btn.visible = false;
                wxgame.Global.instance.aldSendEvent("周边系统", "每日任务: " + this.data.taskID + "领取");
            }
            else if (evt.target == this.go_btn) {
            }
        };
        TaskItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            var info = this.data;
            var task = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            var contentStr = task.taskDesc;
            contentStr = contentStr.replace(new RegExp("%a", "gm"), task.taskCondition + "");
            this.good_content.text = contentStr + "(" + info.current + "/" + task.taskCondition + ")";
            this.good_icon.source = "lb_fuli_json." + task.taskIcon;
            this.progress_img.width = 360 * (info.current / task.taskCondition);
            if (task.taskReward) {
                var goodConfig = ConfigMgr.getInstance().getGoodCfgById(task.taskReward[0].goodId);
                this.good_num.text = task.taskReward[0].goodNbr + goodConfig.goodName;
            }
            if (info.taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                this.go_btn.visible = false;
                this.rev_btn.visible = true;
            }
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Received) {
                this.rev_btn.visible = false;
                this.go_btn.visible = true;
                this.go_btn.currentState = "disabled";
                this.go_btn.touchEnabled = false;
            } //任务进行中 暂时不显示按钮
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Progress) {
                this.go_btn.visible = false;
                this.rev_btn.visible = false;
            }
        };
        TaskItem.prototype.destroy = function () {
            this.rev_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        };
        return TaskItem;
    }(eui.ItemRenderer));
    reward.TaskItem = TaskItem;
    __reflect(TaskItem.prototype, "reward.TaskItem");
})(reward || (reward = {}));
var reward;
(function (reward) {
    var TaskView = (function (_super) {
        __extends(TaskView, _super);
        function TaskView() {
            var _this = _super.call(this) || this;
            _this.skinName = "TaskViewSkin";
            return _this;
        }
        TaskView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData();
        };
        TaskView.prototype.initData = function () {
            this.task_lst.itemRenderer = reward.TaskItem;
            uniLib.Global.addEventListener(reward.CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            var req = new Cmd.IntoFreeGoldLobbyCmd_C();
            NetMgr.tcpSend(req);
        };
        TaskView.prototype.onDailyTask = function (evt) {
            var curData = evt.param;
            if (curData.otherTaskInfo && curData.otherTaskInfo.length > 0) {
                this.task_lst.dataProvider = new eui.ArrayCollection(curData.otherTaskInfo);
            }
        };
        TaskView.prototype.destroy = function () {
            for (var i = 0; i < this.task_lst.numChildren; i++) {
                var child = this.task_lst.getChildAt(i);
                child && child.destroy();
            }
            this.task_lst = null;
            uniLib.Global.removeEventListener(reward.CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            this.removeChildren();
        };
        return TaskView;
    }(eui.Component));
    reward.TaskView = TaskView;
    __reflect(TaskView.prototype, "reward.TaskView");
})(reward || (reward = {}));
var eui;
(function (eui) {
    var WxContain = (function (_super) {
        __extends(WxContain, _super);
        function WxContain() {
            var _this = _super.call(this) || this;
            _this.init();
            return _this;
        }
        WxContain.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
            this.x += this.width >> 1;
            this.y += this.height >> 1;
        };
        WxContain.prototype.init = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        };
        WxContain.prototype.onTouchBegin = function () {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        };
        WxContain.prototype.onTouchEnd = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.onTouchCancel = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.onTouchMove = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.onTouchReleaseOutside = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxContain.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
        };
        return WxContain;
    }(eui.Group));
    eui.WxContain = WxContain;
    __reflect(WxContain.prototype, "eui.WxContain");
})(eui || (eui = {}));
var reward;
(function (reward) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**
        * 获取新手奖励信息
        */
        CmdConstant.NOVICEINFO = "NoviceInfo";
        /**
        * 领取新手奖励
        */
        CmdConstant.NOVICEREWARD = "NoviceReward";
        /**
        * 返回每日任务
        */
        CmdConstant.INTOFREEGOLD = "IntoFreeGold";
        /**
        * 领取每日任务
        */
        CmdConstant.DAYSTASKREWARD = "DaysTaskReward";
        /**
        * ios领钻石列表
        */
        CmdConstant.IOSINVITEINFOLITTLE = "IosInviteInfoLittle";
        /**
        * ios领钻石
        */
        CmdConstant.IOSINVITEREWARDLITTLE = "IosInviteRewardLittle";
        /**
        * 获取钻石推荐信息
        */
        CmdConstant.DIAMONDINTERFACETIPS = "DiamondInterfaceTips";
        return CmdConstant;
    }());
    reward.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "reward.CmdConstant");
})(reward || (reward = {}));
var RewardReciveMgr = (function () {
    function RewardReciveMgr() {
    }
    return RewardReciveMgr;
}());
__reflect(RewardReciveMgr.prototype, "RewardReciveMgr");
var Cmd;
(function (Cmd) {
    /**
 * 获取新手奖励信息
 */
    function OnGetNoviceInfodLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.NOVICEINFO, rev);
    }
    Cmd.OnGetNoviceInfodLobbyCmd_S = OnGetNoviceInfodLobbyCmd_S;
    /**
     * 领取新手奖励
     */
    function OnGetNoviceRewarddLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(reward.CmdConstant.NOVICEREWARD, rev);
        }
    }
    Cmd.OnGetNoviceRewarddLobbyCmd_S = OnGetNoviceRewarddLobbyCmd_S;
    /**
     * 返回每日任务
     */
    function OnIntoFreeGoldLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(reward.CmdConstant.INTOFREEGOLD, rev);
        }
    }
    Cmd.OnIntoFreeGoldLobbyCmd_S = OnIntoFreeGoldLobbyCmd_S;
    /**
     * 领取奖励
     */
    function OnGetDaysTaskRewardLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.DAYSTASKREWARD, rev);
        var config = ConfigMgr.getInstance().getTaskCfgById(rev.taskId);
        if (config && config.taskReward) {
            var ary = [];
            for (var i = 0; i < config.taskReward.length; i++) {
                var vo = new commonConfirm.ReWardDataVo();
                vo.getDataByGoodId(config.taskReward[i].goodId, config.taskReward[i].goodNbr);
                ary.push(vo);
            }
            var panel = new commonConfirm.RewardPanel();
            panel.initData(ary);
            uniLib.PopUpMgr.addPopUp(panel, null, true, false);
        }
    }
    Cmd.OnGetDaysTaskRewardLobbyCmd_S = OnGetDaysTaskRewardLobbyCmd_S;
    /**
     * 领钻石列表数据
     */
    function OnGetIosInviteInfoLittleGameLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.IOSINVITEINFOLITTLE, rev);
    }
    Cmd.OnGetIosInviteInfoLittleGameLobbyCmd_S = OnGetIosInviteInfoLittleGameLobbyCmd_S;
    /**
     * 领钻石
     */
    function OnGetIosInviteRewardLittleGameLobbyCmd_S(rev) {
        if (!rev.resultCode) {
            uniLib.Global.dispatchEvent(reward.CmdConstant.IOSINVITEREWARDLITTLE, rev);
            var goods = rev.single.goods;
            if (goods) {
                var vo = new commonConfirm.ReWardDataVo();
                vo.getDataByGoodId(goods.goodsId, goods.goodsNum);
                var panel = new commonConfirm.RewardPanel();
                panel.initData([vo]);
                uniLib.PopUpMgr.addPopUp(panel, null, true, false);
                wxgame.Global.instance.aldSendEvent("周边系统", "领钻石领取成功");
            }
        }
    }
    Cmd.OnGetIosInviteRewardLittleGameLobbyCmd_S = OnGetIosInviteRewardLittleGameLobbyCmd_S;
    function OnGetDiamondInterfaceTips_S(rev) {
        uniLib.Global.dispatchEvent(reward.CmdConstant.DIAMONDINTERFACETIPS, rev);
    }
    Cmd.OnGetDiamondInterfaceTips_S = OnGetDiamondInterfaceTips_S;
})(Cmd || (Cmd = {}));
