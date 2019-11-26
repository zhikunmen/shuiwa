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
var paotai;
(function (paotai) {
    var FingerlingPanel = (function (_super) {
        __extends(FingerlingPanel, _super);
        function FingerlingPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "FingerlingSkin";
            return _this;
        }
        FingerlingPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            this.initUI();
        };
        FingerlingPanel.prototype.initUI = function () {
            var _this = this;
            var tableFish = ConfigMgr.getInstance().tableFish;
            var fishs = [];
            for (var key in tableFish) {
                fishs.push(tableFish[key]);
            }
            fishs.sort(function (a, b) {
                if (a.fishType > b.fishType)
                    return -1;
                else if (a.fishType < b.fishType)
                    return 1;
                else
                    return 0;
            });
            fishs.forEach(function (f, i) {
                var item = new FingerItem(f);
                _this.fishGroup.addChild(item);
                item.x = Math.floor(i % 5) * 161 + 11;
                item.y = Math.floor(i / 5) * 210;
            });
            this.fishGroup.height = 8 * 210;
        };
        FingerlingPanel.prototype.addEvents = function () {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FingerlingPanel.prototype.removeEvents = function () {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FingerlingPanel.prototype.onTouchHandle = function (e) {
            if (e.target == this.closeBtn)
                uniLib.PopUpMgr.removePopUp(this);
        };
        FingerlingPanel.prototype.destroy = function () {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return FingerlingPanel;
    }(eui.Component));
    paotai.FingerlingPanel = FingerlingPanel;
    __reflect(FingerlingPanel.prototype, "paotai.FingerlingPanel");
    var FingerItem = (function (_super) {
        __extends(FingerItem, _super);
        function FingerItem(info) {
            var _this = _super.call(this) || this;
            _this.initUI(info);
            return _this;
        }
        FingerItem.prototype.initUI = function (info) {
            var bg = new egret.Bitmap();
            bg.texture = RES.getRes("fingerling_json.fish_item_bg" + info.fishType);
            this.addChild(bg);
            var fishName = uniLib.DisplayUtils.createTextLabel(0xffffff, "left", info.fishName, 20, 137, 30, 0x2f5b9d, 2, 68, 16);
            fishName.x = (137 - fishName.textWidth) >> 1;
            this.addChild(fishName);
            var fish = new egret.Bitmap();
            fish.texture = RES.getRes("fish_common_json.fish_" + info.fishID);
            fish.x = (137 - fish.width) >> 1;
            fish.y = (192 - fish.height) >> 1;
            this.addChild(fish);
            var reward;
            var beilv = info.minTime == info.maxTime ? info.minTime + "" : info.minTime + " - " + info.maxTime;
            if (info.fishType == 1)
                reward = uniLib.DisplayUtils.createTextLabel(0xfff587, "left", beilv, 24, 137, 30, 0xd85735, 2, 68, 154);
            else if (info.fishType == 2)
                reward = uniLib.DisplayUtils.createTextLabel(0xffffff, "left", "特殊奖励", 20, 137, 30, 0x2f5b9d, 2, 68, 156);
            else if (info.fishType == 3)
                reward = uniLib.DisplayUtils.createTextLabel(0xfff587, "left", beilv, 20, 137, 30, 0xd85735, 2, 68, 156);
            reward.x = (137 - reward.textWidth) >> 1;
            this.addChild(reward);
        };
        return FingerItem;
    }(egret.DisplayObjectContainer));
    paotai.FingerItem = FingerItem;
    __reflect(FingerItem.prototype, "paotai.FingerItem");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var FuKaPanel = (function (_super) {
        __extends(FuKaPanel, _super);
        function FuKaPanel(num) {
            var _this = _super.call(this) || this;
            _this._number = 0;
            _this._number = num;
            _this.skinName = "fukaDescSkin";
            return _this;
        }
        FuKaPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            this.setWD(this.gift1);
            this.setWD(this.gift2);
            this.setWD(this.gift3);
            this.rewardNum.text = "x" + this._number;
        };
        FuKaPanel.prototype.setWD = function (gift) {
            commonConfirm.ResUtil.limitImageSize(gift, 100);
            gift.anchorOffsetX = gift.width >> 1;
            gift.anchorOffsetY = gift.height >> 1;
        };
        FuKaPanel.prototype.addEvents = function () {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FuKaPanel.prototype.removeEvents = function () {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.rewardBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        FuKaPanel.prototype.onTouchHandle = function (e) {
            if (e.target == this.closeBtn)
                uniLib.PopUpMgr.removePopUp(this);
            else if (e.target == this.rewardBtn) {
                LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
            }
        };
        FuKaPanel.prototype.destroy = function () {
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return FuKaPanel;
    }(eui.Component));
    paotai.FuKaPanel = FuKaPanel;
    __reflect(FuKaPanel.prototype, "paotai.FuKaPanel");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var PaoTaiConsts = (function () {
        function PaoTaiConsts() {
        }
        PaoTaiConsts.RES_JSON = "resource/paotai/paotai.res_47f37d3c.json";
        PaoTaiConsts.THM_JSON = "resource/paotai/gameEui_c5168cf.json";
        /**
         * 公共guide需要加载的资源组
         */
        PaoTaiConsts.PUB_PAOTAI_PANEL = "pub_paotai_panel";
        PaoTaiConsts.PUB_PAOTAI = "pub_paotai";
        PaoTaiConsts.TAKE_PHONEBILL = "take_phonebill";
        PaoTaiConsts.PUB_FUKA_DESC = "fuka_desc";
        /*捕鱼头像资源*/
        PaoTaiConsts.PUB_FISH_COMMON = "fish_common";
        PaoTaiConsts.PUB_FINGERLING = "pub_fingerling";
        return PaoTaiConsts;
    }());
    paotai.PaoTaiConsts = PaoTaiConsts;
    __reflect(PaoTaiConsts.prototype, "paotai.PaoTaiConsts");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var PaoTaiItem = (function (_super) {
        __extends(PaoTaiItem, _super);
        function PaoTaiItem() {
            var _this = _super.call(this) || this;
            _this.pos = [153, 128, 196, 135, 178, 131, 200, 118, 143, 134];
            _this._select = false;
            _this.skinName = "PaoTaiItemSkin";
            return _this;
        }
        PaoTaiItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.touch_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this._create = true;
            if (this._info)
                this.setInfo(this._info, this._usable);
        };
        Object.defineProperty(PaoTaiItem.prototype, "select", {
            get: function () {
                return this._select;
            },
            set: function (value) {
                if (this._select == value)
                    return;
                this._select = value;
                this.touch_btn["bg_txt"].text = "";
                if (this._select) {
                    this.touch_btn["bg_img"].source = "paotai_button3";
                    this.touch_btn.enabled = false;
                }
                else {
                    if (this._info.unlockType == 99) {
                        this.touch_btn["bg_img"].source = "paotai_button2";
                        this.touch_btn.enabled = true;
                    }
                    else {
                        this.touch_btn["bg_img"].source = "paotai_button4";
                        this.touch_btn.enabled = true;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(PaoTaiItem.prototype, "ID", {
            get: function () {
                if (this._info == null)
                    return null;
                else
                    return this._info.ID;
            },
            enumerable: true,
            configurable: true
        });
        PaoTaiItem.prototype.setInfo = function (info, usable) {
            this._info = info;
            this._usable = usable;
            if (this._create == false)
                return;
            this.pao_text.text = info.gunName;
            this.speed.width = 18;
            this.speed.width = (info.speedNumber / 10) * 171;
            this.pao_img.source = "pao_tai_" + info.ID;
            this.speed_txt.text = info.speedNumber * 10 + "";
            this.speed_txt.anchorOffsetX = this.speed_txt.width >> 1;
            this.setPaoWH(info.ID);
            this.setEffect(info.ID);
            if (info.unlockType == 99) {
                if (this._usable.indexOf(this._info.ID) > -1) {
                    this.setButtonState(info.ID);
                    this.unlock.visible = false;
                    this.lockbg.visible = false;
                }
                else {
                    this.touch_btn["bg_img"].source = "paotai_button2";
                    this.touch_btn.enabled = true;
                    this.unlock.visible = true;
                    this.lockbg.visible = true;
                }
                this.touch_btn["bg_txt"].text = "";
            }
            else {
                if (this._usable.indexOf(this._info.ID) > -1) {
                    this.setButtonState(info.ID);
                    this.unlock.visible = false;
                    this.lockbg.visible = false;
                }
                else {
                    this.touch_btn["bg_img"].source = "paotai_button1";
                    this.touch_btn["bg_txt"].text = info.unlockDescribe;
                    this.touch_btn.enabled = true;
                    this.unlock.visible = true;
                    this.lockbg.visible = true;
                }
            }
            this.addPaoHuo();
            this.playAnim();
        };
        PaoTaiItem.prototype.setButtonState = function (id) {
            if (MJLobbyData.getInstance().userInfoSynLobby.userInfo.fishcannon == id) {
                this.touch_btn["bg_img"].source = "paotai_button3";
                this.touch_btn.enabled = false;
                this._select = true;
            }
            else {
                this.touch_btn["bg_img"].source = "paotai_button4";
                this.touch_btn.enabled = true;
                this._select = false;
            }
            this.touch_btn["bg_txt"].text = "";
        };
        PaoTaiItem.prototype.setPaoWH = function (id) {
            this.pao_img.source = "pao_tai_" + id;
            this.pao_img.x = (125 - this.pos[id * 2 - 2] / 2);
            this.pao_img.y = (142 - this.pos[id * 2 - 1] / 2);
        };
        PaoTaiItem.prototype.setEffect = function (id) {
            if (this.paoEffect) {
                this.paoEffect.stop();
                uniLib.DisplayUtils.removeFromParent(this.paoEffect);
                this.paoEffect = null;
            }
            this.paoEffect = this.createMovieClicp("paotai_effect" + id);
            this.paoCotain.addChild(this.paoEffect);
            this.paoEffect.x = 125;
            this.paoEffect.y = 142 + 2;
            this.paoEffect.play(-1);
        };
        PaoTaiItem.prototype.addPaoHuo = function () {
            this.paohuos = [];
            var data = this.createMovieClicp("paohuo1").movieClipData;
            var posX = [88, 125, 160];
            var posY = [85, 60, 85];
            for (var i = 0; i < 3; i++) {
                this.paohuos[i] = new egret.MovieClip(data);
                this.paoCotain.addChildAt(this.paohuos[i], 0);
                this.paohuos[i].x = posX[i];
                this.paohuos[i].y = posY[i];
                this.paohuos[i].gotoAndStop(0);
                this.paohuos[i].addEventListener(egret.Event.LOOP_COMPLETE, this.paohuoComplete, this);
            }
        };
        PaoTaiItem.prototype.paohuoComplete = function (e) {
            e.target.visible = false;
        };
        PaoTaiItem.prototype.paohuoRemove = function () {
            if (this.paohuos == null)
                return;
            for (var j = 0; j < 3; j++) {
                uniLib.DisplayUtils.removeFromParent(this.paohuos[j]);
                this.paohuos[j].stop();
                this.paohuos[j].removeEventListener(egret.Event.LOOP_COMPLETE, this.paohuoComplete, this);
                this.paohuos[j] = null;
            }
            this.paohuos = null;
        };
        PaoTaiItem.prototype.playAnim = function () {
            var _this = this;
            if (!this.paohuos)
                return;
            var huoY = 84;
            // egret.Tween.get(this.speed,{loop:true}).to({ width: ((400-this._info.gunSpeed)/250)*171 }, 160).to({width:18},500);
            egret.Tween.get(this.paoCotain, { loop: true }).to({ y: huoY - 16 }, this._info.gunSpeed * 0.8).call(function () {
                for (var i = 0; i < 3; i++) {
                    _this.paohuos[i].gotoAndPlay(0, 1);
                }
                var pao = paotai.PaoTaiPanel.getPaoDan();
                _this.contain.addChildAt(pao, 1);
                pao.x = 66;
                pao.y = huoY + 10;
                paotai.PaoTaiPanel.paoings.push(pao);
                egret.Tween.get(pao).to({ y: -100 }, 300).call(function () {
                    _this.contain.removeChild(pao);
                    var index = paotai.PaoTaiPanel.paoings.indexOf(pao);
                    paotai.PaoTaiPanel.paoings.splice(index, 1);
                    paotai.PaoTaiPanel.removePaoDa(pao);
                });
            }, this).to({ y: huoY + 10 }, this._info.gunSpeed).to({ y: huoY }, this._info.gunSpeed * 0.2);
        };
        PaoTaiItem.prototype.createMovieClicp = function (groupName, keyName) {
            var data = RES.getRes(groupName + "_json"); //获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png"); //获取动画文件的图片
            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName)); //创建MovieClip
            return mc;
        };
        PaoTaiItem.prototype.onTouchHander = function (event) {
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE, false, false, this._info));
        };
        PaoTaiItem.prototype.destroy = function () {
            egret.Tween.removeTweens(this.paoCotain);
            this.paohuoRemove();
            this.touch_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            if (this.paoEffect) {
                this.paoEffect.stop();
                uniLib.DisplayUtils.removeFromParent(this.paoEffect);
                this.paoEffect = null;
            }
            this.removeChildren();
        };
        return PaoTaiItem;
    }(eui.Component));
    paotai.PaoTaiItem = PaoTaiItem;
    __reflect(PaoTaiItem.prototype, "paotai.PaoTaiItem");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var PaoTaiPanel = (function (_super) {
        __extends(PaoTaiPanel, _super);
        function PaoTaiPanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "PaoTaiPanelSkin";
            return _this;
        }
        PaoTaiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            PaoTaiPanel.paodans = [];
            PaoTaiPanel.paoings = [];
            this.addEvents();
            this.initData();
            // this.initUI();
        };
        PaoTaiPanel.prototype.addEvents = function () {
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(paotai.CmdConstant.SET_FISH_CANNON, this.onSetFishCannon, this);
            uniLib.Global.addEventListener(paotai.CmdConstant.GET_FISH_CANNON, this.onGetFishCannon, this);
        };
        PaoTaiPanel.prototype.initData = function () {
            var req = new Cmd.GetFishCannonCmd_CS();
            NetMgr.tcpSend(req);
        };
        PaoTaiPanel.prototype.initUI = function (usable) {
            var list = RES.getRes("TableFishGunType_json");
            this._paoList = [];
            for (var i = 0; i < list.length; i++) {
                var item = new paotai.PaoTaiItem();
                item.setInfo(list[i], usable);
                this._paoList.push(item);
                this.paotia_lst.addChild(item);
                item.addEventListener(egret.Event.CHANGE, this.itemClickHandler, this);
            }
        };
        PaoTaiPanel.prototype.removeEvents = function () {
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.removeEventListener(paotai.CmdConstant.SET_FISH_CANNON, this.onSetFishCannon, this);
            uniLib.Global.removeEventListener(paotai.CmdConstant.GET_FISH_CANNON, this.onGetFishCannon, this);
        };
        PaoTaiPanel.prototype.itemClickHandler = function (evt) {
            var info = evt.data;
            if (info.unlockType == 99) {
                if (MJLobbyData.getInstance().userInfoSynLobby.ismcardvalid) {
                    var req = new Cmd.SetFishCannonCmd_CS();
                    req.id = info.ID;
                    NetMgr.tcpSend(req);
                }
                else {
                    LobbyModuleMgr.getInstance().showMonthCard();
                }
            }
            else {
                var vip = MJLobbyData.getInstance().userInfoSynLobby.userInfo.vip;
                if (vip >= Number(info.unlockType)) {
                    var req = new Cmd.SetFishCannonCmd_CS();
                    req.id = info.ID;
                    NetMgr.tcpSend(req);
                }
                else {
                    // uniLib.TipsUtils.showTipsDownToUp("功能玩命开发中，敬请期待");
                    LobbyModuleMgr.getInstance().showVIPPanel(info.unlockType);
                }
            }
        };
        PaoTaiPanel.prototype.onGetFishCannon = function (e) {
            var rev = e.param;
            this.initUI(rev.usable);
        };
        PaoTaiPanel.prototype.onSetFishCannon = function (e) {
            var rev = e.param;
            for (var i = 0; i < this._paoList.length; i++) {
                if (this._paoList[i].select && rev.id != this._paoList[i].ID) {
                    this._paoList[i].select = false;
                }
                else if (rev.id == this._paoList[i].ID && !this._paoList[i].select) {
                    this._paoList[i].select = true;
                }
            }
        };
        PaoTaiPanel.prototype.onTouchHandle = function (e) {
            uniLib.PopUpMgr.removePopUp(this);
        };
        PaoTaiPanel.prototype.destroy = function () {
            for (var i = 0; i < this._paoList.length; i++) {
                this._paoList[i].removeEventListener(egret.Event.CHANGE, this.itemClickHandler, this);
                this._paoList[i].destroy();
            }
            this._paoList = null;
            PaoTaiPanel.destroy();
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        PaoTaiPanel.getPaoDan = function () {
            if (PaoTaiPanel.paodans.length > 0) {
                return PaoTaiPanel.paodans.pop();
            }
            else {
                var pao = new egret.Bitmap();
                pao.texture = RES.getRes("paotai_json.hw_bullet_3");
                return pao;
            }
        };
        PaoTaiPanel.removePaoDa = function (pao) {
            if (PaoTaiPanel.paodans)
                PaoTaiPanel.paodans.push(pao);
        };
        PaoTaiPanel.destroy = function () {
            PaoTaiPanel.paoings.forEach(function (f) {
                egret.Tween.removeTweens(f);
            });
            PaoTaiPanel.paoings = null;
            PaoTaiPanel.paodans = null;
        };
        return PaoTaiPanel;
    }(eui.Component));
    paotai.PaoTaiPanel = PaoTaiPanel;
    __reflect(PaoTaiPanel.prototype, "paotai.PaoTaiPanel");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var TakePhonePanel = (function (_super) {
        __extends(TakePhonePanel, _super);
        function TakePhonePanel(info) {
            var _this = _super.call(this) || this;
            _this.anim = {};
            _this.playing = false;
            if (info)
                _this._info = info;
            _this.skinName = "TakePhoneSkin";
            return _this;
        }
        TakePhonePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.tabbtns = [this.tabbtn1, this.tabbtn2, this.tabbtn3, this.tabbtn4, this.tabbtn5, this.tabbtn6];
            this.addEvents();
            this.initUI();
            this.initData();
        };
        TakePhonePanel.prototype.addEvents = function () {
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.fishBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.tabbtn1.group.addEventListener(egret.Event.CHANGE, this.onGroupChange, this);
            uniLib.Global.addEventListener(paotai.CmdConstant.GET_FISH_LUCKYDRAW, this.onFishReceive, this);
            uniLib.Global.addEventListener(paotai.CmdConstant.GET_FISH_LUCKYPRIZE, this.onFishReceive, this);
        };
        TakePhonePanel.prototype.initData = function () {
            if (this._info == null) {
                var req = new Cmd.GetFishLuckyDrawInfoLobbyCmd_C();
                NetMgr.tcpSend(req);
            }
            else {
                this.rewardPool.text = this._info.bonus + "";
                this.currentIndex = this.findFishDraw(this._info.bonus);
                this.tabbtn1.selected = false;
                this.tabbtns[this.currentIndex - 1].selected = true;
                this.setTab(this.currentIndex);
            }
        };
        TakePhonePanel.prototype.initUI = function () {
            this.rewardMask.visible = false;
            this.itmes = [];
            for (var i = 0; i < 6; i++) {
                var item = new takeRewardItem();
                this.rewardGroup.addChildAt(item, 0);
                item.x = i * 143 - 10;
                this.itmes.push(item);
            }
            //    this.setTab(1);
        };
        TakePhonePanel.prototype.onFishReceive = function (evt) {
            if (evt.type == paotai.CmdConstant.GET_FISH_LUCKYDRAW) {
                this._info = evt.param;
                this.rewardPool.text = this._info.bonus + "";
                if (this.currentIndex)
                    this.tabbtns[this.currentIndex - 1].selected = false;
                else
                    this.tabbtn1.selected = false;
                this.currentIndex = this.findFishDraw(this._info.bonus);
                this.tabbtns[this.currentIndex - 1].selected = true;
                this.setTab(this.currentIndex);
            }
            else if (evt.type == paotai.CmdConstant.GET_FISH_LUCKYPRIZE) {
                var rev = evt.param;
                var rewadItem = new Cmd.RewardItem();
                rewadItem.goodId = rev.rewards[0].goodId;
                rewadItem.goodNbr = rev.rewards[0].goodNbr;
                this.playAwardAnim(rewadItem);
            }
        };
        TakePhonePanel.prototype.playAwardAnim = function (rewadItem) {
            var _this = this;
            var index = -1;
            for (var i = 0; i < this.itmes.length; i++) {
                var info = this.itmes[i].getInfo();
                if (info.goodId == rewadItem.goodId && info.goodNbr == rewadItem.goodNbr) {
                    index = i;
                    break;
                }
            }
            if (index == -1) {
                console.error(rewadItem.goodId + " " + rewadItem.goodNbr + " 返回的奖品不在当前列表中！");
                return;
            }
            egret.Tween.removeTweens(this.anim);
            this.luckBtn.enabled = false;
            this.rewardMask.visible = true;
            var pp = 0;
            this.rewardGroup.addChild(this.itmes[pp]);
            this.anim["a"] = 0;
            egret.Tween.get(this.anim, { onChange: function () {
                    var ind = Math.floor(_this.anim["a"] / 3);
                    if (pp != ind) {
                        _this.rewardGroup.addChildAt(_this.itmes[pp], 0);
                        pp = ind;
                        _this.rewardGroup.addChild(_this.itmes[pp]);
                    }
                } }).to({ a: 17 }, 1000).to({ a: 0 }, 2000).to({ a: index * 3 }, index * 350).wait(400).call(function () {
                _this.rewardGroup.addChildAt(_this.itmes[pp], 0);
                _this.rewardMask.visible = false;
                if (rewadItem.goodId == 336) {
                    var panel_1 = new paotai.FuKaPanel(rewadItem.goodNbr);
                    panel_1.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                    LoadPanelTipMgr.getInstance().loadRes(paotai.PaoTaiConsts.PUB_FUKA_DESC, function () { uniLib.PopUpMgr.addPopUp(panel_1, null, true, true, 0, uniLib.PopUpEffect.NOMAL); });
                }
                else {
                    var panel = new commonConfirm.RewardPanel();
                    panel.initData2([rewadItem]);
                    panel.scaleX = LobbyModuleMgr.getInstance().panelScaleX;
                    uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.NOMAL, 1280 * panel.scaleX, 720);
                }
                var req = new Cmd.GetFishLuckyDrawInfoLobbyCmd_C();
                NetMgr.tcpSend(req);
            });
        };
        TakePhonePanel.prototype.removeEvents = function () {
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.luckBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.fishBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            this.tabbtn1.group.removeEventListener(egret.Event.CHANGE, this.onGroupChange, this);
            uniLib.Global.removeEventListener(paotai.CmdConstant.GET_FISH_LUCKYDRAW, this.onFishReceive, this);
            uniLib.Global.removeEventListener(paotai.CmdConstant.GET_FISH_LUCKYPRIZE, this.onFishReceive, this);
        };
        TakePhonePanel.prototype.onGroupChange = function (e) {
            var rbGroup = e.target;
            this.setTab(Number(rbGroup.selectedValue));
        };
        /**
         *当前档次>选中档次时，不显示进度显示文字
         *当前档次=选中档次时，显示下一档所需进度
         *当前档次<选中档次时，显示选中档次所需进度
         **/
        TakePhonePanel.prototype.setTab = function (index) {
            var conf = ConfigMgr.getInstance().getFishDrawById(index);
            for (var i = 0; i < 6; i++) {
                this.itmes[i].setInfo(conf.award1[i]);
            }
            if (this._info.killNum >= conf.killNumber) {
                this.killFish.text = "击杀黄金鱼可继续积累奖池！";
                if (index < this.currentIndex) {
                    this.chouGroup.visible = false;
                    this.rewardMore.visible = true;
                }
                else {
                    if (this.currentIndex == index) {
                        if (this.currentIndex < 6)
                            conf = ConfigMgr.getInstance().getFishDrawById(index + 1);
                        this.luckBtn.enabled = true;
                    }
                    else {
                        this.luckBtn.enabled = false;
                    }
                    this.chouGroup.visible = true;
                    this.rewardMore.visible = false;
                    this.luckBtn.visible = true;
                    this.fishBtn.visible = false;
                    this.rewardNext.x = 8;
                    this.goldPro.x = 112;
                    this.goldPro.width = 260;
                    this.goldText.x = 242;
                    this.rewardNext.text = conf.drawType;
                    this.goldPro.minimum = 0;
                    this.goldPro.maximum = conf.needGold;
                    this.goldPro.value = Number(this.rewardPool.text);
                    this.goldText.text = this.rewardPool.text + "/" + conf.needGold;
                    this._short = conf.needGold - this._info.bonus;
                    this.goldText.anchorOffsetX = this.goldText.width >> 1;
                }
            }
            else {
                this.killFish.text = "当前击杀黄金鱼数量不足！";
                this.rewardNext.text = "黄金鱼";
                this.rewardNext.x = 60;
                this.goldPro.x = 145;
                this.goldPro.width = 150;
                this.goldText.x = 220;
                this.goldText.text = this._info.killNum + "/" + conf.killNumber;
                this.goldPro.minimum = 0;
                this.goldPro.maximum = conf.killNumber;
                this.goldPro.value = this._info.killNum;
                this.luckBtn.visible = false;
                this.fishBtn.visible = true;
                this.goldText.anchorOffsetX = this.goldText.width >> 1;
            }
        };
        TakePhonePanel.prototype.onTouchHandle = function (e) {
            if (e.target == this.closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (e.target == this.luckBtn) {
                var msg = new uniLib.MsgBox("您仅差" + this._short + "奖池就能进行更高档次抽奖哦，是否继续抽奖？", "", "确定", function () {
                    var req = new Cmd.GetFishLuckyDrawPrizeLobbyCmd_C();
                    NetMgr.tcpSend(req);
                }, "取消");
                uniLib.PopUpMgr.addPopUp(msg, null, true, true, false, uniLib.PopUpEffect.CENTER);
            }
            else if (e.target == this.fishBtn) {
                LoadPanelTipMgr.getInstance().loadRes(paotai.PaoTaiConsts.PUB_FINGERLING, function () {
                    var panel = new paotai.FingerlingPanel();
                    if (uniLib.Global.isInGame) {
                        var panelScaleX = LobbyModuleMgr.getInstance().panelScaleX;
                        panel.scaleX = panelScaleX;
                        uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 874 * panelScaleX, 543);
                    }
                    else
                        uniLib.PopUpMgr.addPopUp(panel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
                });
            }
        };
        TakePhonePanel.prototype.findFishDraw = function (bonus) {
            var obj = ConfigMgr.getInstance().fishDraw;
            var mak = [];
            for (var key in obj) {
                if (obj[key].needGold <= bonus) {
                    mak.push(Number(key));
                }
            }
            if (mak.length == 0)
                return 1;
            else {
                var max = 0;
                mak.forEach(function (item) {
                    if (item > max)
                        max = item;
                });
                return max;
            }
        };
        TakePhonePanel.prototype.destroy = function () {
            for (var i = 0; i < 6; i++) {
                uniLib.DisplayUtils.removeFromParent(this.itmes[i]);
                this.itmes[i] = null;
            }
            this.itmes = null;
            egret.Tween.removeTweens(this.anim);
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return TakePhonePanel;
    }(eui.Component));
    paotai.TakePhonePanel = TakePhonePanel;
    __reflect(TakePhonePanel.prototype, "paotai.TakePhonePanel");
    var takeRewardItem = (function (_super) {
        __extends(takeRewardItem, _super);
        function takeRewardItem(info) {
            var _this = _super.call(this) || this;
            if (info)
                _this._info = info;
            _this.skinName = "takeRewardItemSkin";
            return _this;
        }
        takeRewardItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this._info)
                this.setInfo(this._info);
        };
        takeRewardItem.prototype.setInfo = function (info) {
            this._info = info;
            this.goodIcon.source = "game_prop_json.bag_daoju_" + this._info.goodId;
            commonConfirm.ResUtil.limitImageSize(this.goodIcon, 80);
            this.goodIcon.y = 104;
            if (this._info.goodNbr > 10000)
                this.goodNum.text = "x" + this._info.goodNbr / 10000 + "万";
            else
                this.goodNum.text = "x" + this._info.goodNbr;
        };
        takeRewardItem.prototype.getInfo = function () {
            return this._info;
        };
        return takeRewardItem;
    }(eui.Component));
    paotai.takeRewardItem = takeRewardItem;
    __reflect(takeRewardItem.prototype, "paotai.takeRewardItem");
})(paotai || (paotai = {}));
var paotai;
(function (paotai) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**设置炮台返回*/
        CmdConstant.SET_FISH_CANNON = "set_fish_cannon";
        /**设置炮台返回*/
        CmdConstant.GET_FISH_CANNON = "get_fish_cannon";
        /**捕鱼抽奖信息*/
        CmdConstant.GET_FISH_LUCKYDRAW = "get_fish_luckydraw";
        /**捕鱼抽奖结果*/
        CmdConstant.GET_FISH_LUCKYPRIZE = "get_fish_luckyprize";
        return CmdConstant;
    }());
    paotai.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "paotai.CmdConstant");
})(paotai || (paotai = {}));
var PaoTaiReciveMgr = (function () {
    function PaoTaiReciveMgr() {
    }
    return PaoTaiReciveMgr;
}());
__reflect(PaoTaiReciveMgr.prototype, "PaoTaiReciveMgr");
var Cmd;
(function (Cmd) {
    /**VIP-请求数据 */
    function OnSetFishCannonCmd_CS(rev) {
        uniLib.Global.dispatchEvent(paotai.CmdConstant.SET_FISH_CANNON, rev, true);
        MJLobbyData.getInstance().userInfoSynLobby.userInfo.fishcannon = rev.id;
    }
    Cmd.OnSetFishCannonCmd_CS = OnSetFishCannonCmd_CS;
    /**VIP-请求数据 */
    function OnGetFishCannonCmd_CS(rev) {
        uniLib.Global.dispatchEvent(paotai.CmdConstant.GET_FISH_CANNON, rev, true);
        MJLobbyData.getInstance().userInfoSynLobby.userInfo.fishcannon = rev.id;
    }
    Cmd.OnGetFishCannonCmd_CS = OnGetFishCannonCmd_CS;
    /**抽奖信息 */
    function OnGetFishLuckyDrawInfoLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(paotai.CmdConstant.GET_FISH_LUCKYDRAW, rev, true);
    }
    Cmd.OnGetFishLuckyDrawInfoLobbyCmd_S = OnGetFishLuckyDrawInfoLobbyCmd_S;
    /**抽奖结果*/
    function OnGetFishLuckyDrawPrizeLobbyCmd_S(rev) {
        uniLib.Global.dispatchEvent(paotai.CmdConstant.GET_FISH_LUCKYPRIZE, rev, true);
    }
    Cmd.OnGetFishLuckyDrawPrizeLobbyCmd_S = OnGetFishLuckyDrawPrizeLobbyCmd_S;
})(Cmd || (Cmd = {}));
