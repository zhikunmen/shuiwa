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
var turntable;
(function (turntable) {
    var TurntableConsts = (function () {
        function TurntableConsts() {
        }
        TurntableConsts.RES_JSON = "resource/turntable/turntable.res_edf503be.json";
        TurntableConsts.THM_JSON = "resource/turntable/gameEui_ba352d12.json";
        /**
         * 转盘需要加载的资源组
         */
        TurntableConsts.PUB_TURNTABLE = "pub_turntable";
        return TurntableConsts;
    }());
    turntable.TurntableConsts = TurntableConsts;
    __reflect(TurntableConsts.prototype, "turntable.TurntableConsts");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var TurntableItem = (function (_super) {
        __extends(TurntableItem, _super);
        function TurntableItem() {
            return _super.call(this) || this;
        }
        /**第一个转盘 */
        TurntableItem.prototype.init = function (num, index) {
            var txt = new egret.BitmapText();
            txt.font = RES.getRes("turntable_font_fnt");
            txt.text = num > 10000 ? (num / 10000 + "万") : num + "";
            var item = new egret.Bitmap(RES.getRes("lb_zp_gift_" + index + "_png"));
            txt.x = (item.width - txt.width) >> 1;
            this.addChild(txt);
            item.y = txt.height;
            this.addChild(item);
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
        };
        /**
         * 第二个转盘
         */
        TurntableItem.prototype.init2 = function (time) {
            var item = new egret.Bitmap(RES.getRes("lb_zp2_" + time + "_png"));
            this.addChild(item);
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
        };
        return TurntableItem;
    }(egret.DisplayObjectContainer));
    turntable.TurntableItem = TurntableItem;
    __reflect(TurntableItem.prototype, "turntable.TurntableItem");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var TurntablePanel = (function (_super) {
        __extends(TurntablePanel, _super);
        function TurntablePanel(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "TurntablePanelSkin";
            return _this;
        }
        TurntablePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            var tableData = RES.getRes("TableluckyTurntable_json");
            if (tableData) {
                for (var i = 0; i < tableData.length; i++) {
                    if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                        var reward = tableData[i].signReward;
                        var tReward = tableData[i].timeReward;
                        var point = new egret.Point(this.turn_grp.width >> 1, this.turn_grp.height >> 1);
                        var point2 = new egret.Point(this.turn1_grp.width >> 1, this.turn1_grp.height >> 1);
                        for (var j = 0; j < reward.length; j++) {
                            var ro = j * 360 / 8;
                            var radian = Math.PI / 180 * (-ro + 90);
                            var item = new turntable.TurntableItem();
                            item.init(reward[j].count, j + 1);
                            item.rotation = ro;
                            item.x = point.x + Math.cos(radian) * 130;
                            item.y = point.y - Math.sin(radian) * 130;
                            this.turn_grp.addChild(item);
                            var item2 = new turntable.TurntableItem();
                            item2.init2(tReward[j].time);
                            item2.rotation = ro;
                            item2.x = point2.x + Math.cos(radian) * 140;
                            item2.y = point2.y - Math.sin(radian) * 140;
                            this.turn1_grp.addChild(item2);
                        }
                        break;
                    }
                }
            }
            this._timer = new egret.Timer(400, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();
            if (this._info) {
                this.left_lbl.textFlow = [{ text: "\u5269\u4F59\u6B21\u6570:" + this._info.remainder, style: { underline: true } }];
                if (this._info.continueDay == 0) {
                    this.lock_img.visible = false;
                    this.login_blbl.visible = false;
                }
                else {
                    this.login_blbl.text = "\u7B2C" + this._info.continueDay + "\u65E5\u767B\u5F55";
                    var sp = new egret.Sprite();
                    sp.graphics.beginFill(0x2a0021, 0.6);
                    sp.graphics.drawCircle(this.turn1_grp.width / 2, this.turn1_grp.height / 2, this.turn1_grp.width / 2);
                    sp.graphics.endFill();
                    this.turn1_grp.addChild(sp);
                }
            }
            else {
                this.getReward(1);
            }
        };
        TurntablePanel.prototype.addEvents = function () {
            uniLib.Global.addEventListener("turntableinfo", this.onUpdateInfo, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckDraw_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        TurntablePanel.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener("turntableinfo", this.onUpdateInfo, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckDraw_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        TurntablePanel.prototype.onUpdateInfo = function (evt) {
            var _this = this;
            var info = evt.param;
            this.left_lbl.textFlow = [{ text: "\u5269\u4F59\u6B21\u6570:" + info.remainder, style: { underline: true } }];
            if (info.turnId) {
                this.luckDraw_btn.enabled = false;
                var rt = 360 - (info.turnId - 1) * 45;
                if (info.turnId2) {
                    var rt2 = 360 - (info.turnId2 - 1) * 45;
                    egret.Tween.get(this.turn1_grp).to({ rotation: 360 * 3 + rt2 }, 3000, egret.Ease.quadInOut);
                }
                egret.Tween.get(this.turn_grp).to({ rotation: 360 * 3 + rt }, 3000, egret.Ease.quartInOut).call(function () {
                    _this.turn_grp.rotation = _this.turn_grp.rotation % 360;
                    _this.luckDraw_btn.enabled = true;
                    var tableData = RES.getRes("TableluckyTurntable_json");
                    if (tableData) {
                        for (var i = 0; i < tableData.length; i++) {
                            if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                                var rewards = tableData[i].signReward;
                                var vo = new commonConfirm.ReWardDataVo();
                                vo.getDataByGoodId(rewards[info.turnId - 1].goodsId, rewards[info.turnId - 1].count * (info.turnId2 ? tableData[i].timeReward[info.turnId2 - 1].time : 1));
                                var panel = new commonConfirm.RewardPanel();
                                panel.initData([vo]);
                                egret.MainContext.instance.stage.addChild(panel);
                                break;
                            }
                        }
                    }
                }, this);
            }
            this._info = info;
        };
        TurntablePanel.prototype.onTimer = function (evt) {
            var count = this._timer.currentCount;
            this.top_img.source = "turntable_res_json.lb_zp_uplight" + (count % 2 ? "_1_" : "_") + "png";
            this.left_img.source = "turntable_res_json.lb_zp_sidelight" + (count % 2 ? "_" : "_1_") + "png";
            this.right_img.source = "turntable_res_json.lb_zp_sidelight" + (count % 2 ? "_" : "_1_") + "png";
            if (this._info && this._info.continueDay == 0) {
                this.top1_img.source = "turntable_res_json.lb_zp_uplight" + (count % 2 ? "_1_" : "_") + "png";
                this.left1_img.source = "turntable_res_json.lb_zp_sidelight" + (count % 2 ? "_" : "_1_") + "png";
                this.right1_img.source = "turntable_res_json.lb_zp_sidelight" + (count % 2 ? "_" : "_1_") + "png";
            }
        };
        TurntablePanel.prototype.onTouchHandle = function (e) {
            var _this = this;
            var target = e.target;
            if (target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.luckDraw_btn) {
                if (this._info.type == 1) {
                    this.getReward(2);
                }
                else if (this._info.type == 2) {
                    if (wxgame.Global.instance.videoAdCanUse)
                        wxgame.Global.instance.createRewardedVideoAd(null, function () { _this.getReward(2); }, this);
                    else
                        this._info.type = 3;
                }
                if (this._info.type == 3) {
                    var vo = new uniLib.WXShareVo();
                    vo.shareType = Cmd.ShareType.luckyturn;
                    wxgame.ShareMessage.instance.shareAppMessage(vo, function () { _this.getReward(2); }, null, this);
                }
            }
        };
        TurntablePanel.prototype.getReward = function (opType) {
            var req = new Cmd.GetInfoTurnTableCmd_C();
            req.opType = opType;
            NetMgr.tcpSend(req);
        };
        TurntablePanel.prototype.destroy = function () {
            this._info = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            }
            this._timer = null;
            this.turn_grp.removeChildren();
            egret.Tween.removeTweens(this.turn_grp);
            egret.Tween.removeTweens(this.turn1_grp);
            this.removeEvents();
        };
        return TurntablePanel;
    }(eui.Component));
    turntable.TurntablePanel = TurntablePanel;
    __reflect(TurntablePanel.prototype, "turntable.TurntablePanel");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var NewTurntableItem = (function (_super) {
        __extends(NewTurntableItem, _super);
        function NewTurntableItem() {
            return _super.call(this) || this;
        }
        /**第一个转盘 */
        NewTurntableItem.prototype.init = function (num, goodId) {
            var txt = new egret.BitmapText();
            txt.font = RES.getRes("turntable_font_fnt");
            txt.text = num > 10000 ? (num / 10000 + "万") : num + "";
            var item = new egret.Bitmap(RES.getRes("game_prop_json.bag_daoju_" + goodId));
            commonConfirm.ResUtil.limitImageSize(item, 60);
            txt.x = (item.width - txt.width) >> 1;
            this.addChild(txt);
            item.y = txt.height;
            this.addChild(item);
            this.anchorOffsetX = this.width >> 1;
            this.anchorOffsetY = this.height >> 1;
        };
        return NewTurntableItem;
    }(egret.DisplayObjectContainer));
    turntable.NewTurntableItem = NewTurntableItem;
    __reflect(NewTurntableItem.prototype, "turntable.NewTurntableItem");
})(turntable || (turntable = {}));
var turntable;
(function (turntable) {
    var NewTurntablePanel = (function (_super) {
        __extends(NewTurntablePanel, _super);
        function NewTurntablePanel(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "NewTurntablePanelSkin";
            return _this;
        }
        NewTurntablePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            var tableData = RES.getRes("TableluckyTurntable_json");
            if (tableData) {
                for (var i = 0; i < tableData.length; i++) {
                    if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                        var reward = tableData[i].onlineReward;
                        var point = new egret.Point(this.turn_grp.width >> 1, this.turn_grp.height >> 1);
                        for (var j = 0; j < reward.length; j++) {
                            var ro = j * 360 / 8;
                            var radian = Math.PI / 180 * (-ro + 90);
                            var item = new turntable.NewTurntableItem();
                            item.init(reward[j].count, reward[j].goodsId);
                            item.rotation = ro;
                            item.x = point.x + Math.cos(radian) * 130;
                            item.y = point.y - Math.sin(radian) * 130;
                            this.turn_grp.addChild(item);
                        }
                        break;
                    }
                }
            }
            this._timer = new egret.Timer(400, 0);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();
            if (this._info == null) {
                this.getReward(3);
            }
        };
        NewTurntablePanel.prototype.addEvents = function () {
            uniLib.Global.addEventListener("turntableinfo", this.onUpdateInfo, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckDraw_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        NewTurntablePanel.prototype.removeEvents = function () {
            uniLib.Global.removeEventListener("turntableinfo", this.onUpdateInfo, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckDraw_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        NewTurntablePanel.prototype.onUpdateInfo = function (evt) {
            var _this = this;
            var info = evt.param;
            if (info.turnId) {
                this.luckDraw_btn.enabled = false;
                var rt = 360 - (info.turnId - 1) * 45;
                egret.Tween.get(this.turn_grp).to({ rotation: 360 * 3 + rt }, 3000, egret.Ease.quartInOut).call(function () {
                    _this.turn_grp.rotation = _this.turn_grp.rotation % 360;
                    var tableData = RES.getRes("TableluckyTurntable_json");
                    if (tableData) {
                        for (var i = 0; i < tableData.length; i++) {
                            if (tableData[i].lobbyId == MJLobbyData.getInstance().lobbyId) {
                                var rewards = tableData[i].onlineReward;
                                var vo = new Cmd.RewardItem();
                                vo.goodId = rewards[info.turnId - 1].goodsId;
                                vo.goodNbr = rewards[info.turnId - 1].count;
                                var panel = new commonConfirm.RewardPanel();
                                panel.initData2([vo]);
                                if (uniLib.Global.isInGame) {
                                    panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                                    uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.NOMAL, 1280 * panel.scaleX, 720);
                                }
                                else {
                                    uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0);
                                }
                                egret.setTimeout(function () {
                                    if (_this._info)
                                        uniLib.PopUpMgr.removePopUp(_this);
                                }, _this, 1200);
                                break;
                            }
                        }
                    }
                }, this);
            }
            this._info = info;
        };
        NewTurntablePanel.prototype.onTimer = function (evt) {
            var count = this._timer.currentCount;
            this.top_img.source = "turntable_res_json.lb_zp_uplight" + (count % 2 ? "_1_" : "_") + "png";
            this.left_img.source = "turntable_res_json.lb_zp_sidelight" + (count % 2 ? "_" : "_1_") + "png";
            this.right_img.source = "turntable_res_json.lb_zp_sidelight" + (count % 2 ? "_" : "_1_") + "png";
        };
        NewTurntablePanel.prototype.onTouchHandle = function (e) {
            var target = e.target;
            if (target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this.luckDraw_btn) {
                this.getReward(4);
            }
        };
        NewTurntablePanel.prototype.getReward = function (opType) {
            var req = new Cmd.GetInfoTurnTableCmd_C();
            req.opType = opType;
            NetMgr.tcpSend(req);
        };
        NewTurntablePanel.prototype.destroy = function () {
            this._info = null;
            if (this._timer) {
                this._timer.stop();
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            }
            this._timer = null;
            this.turn_grp.removeChildren();
            egret.Tween.removeTweens(this.turn_grp);
            this.removeEvents();
        };
        return NewTurntablePanel;
    }(eui.Component));
    turntable.NewTurntablePanel = NewTurntablePanel;
    __reflect(NewTurntablePanel.prototype, "turntable.NewTurntablePanel");
})(turntable || (turntable = {}));
var Cmd;
(function (Cmd) {
    function OnGetInfoTurnTableCmd_S(rev) {
        if (rev.opType > 2) {
            uniLib.Global.dispatchEvent("turntableinfo", rev);
            return;
        }
        if (uniLib.PopUpMgr.hasPopup(turntable.TurntablePanel)) {
            uniLib.Global.dispatchEvent("turntableinfo", rev);
        }
        else {
            LoadPanelTipMgr.getInstance().loadRes(turntable.TurntableConsts.PUB_TURNTABLE, function () {
                uniLib.PopUpMgr.addPopUp(turntable.TurntablePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, rev);
            });
        }
    }
    Cmd.OnGetInfoTurnTableCmd_S = OnGetInfoTurnTableCmd_S;
})(Cmd || (Cmd = {}));
