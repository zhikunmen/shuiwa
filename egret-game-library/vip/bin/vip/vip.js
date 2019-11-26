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
/**
*  文 件 名：ItemScroll.ts
*  功    能： 滚动组件
*  内    容： 自定义组件，支持多张图片水平(垂直)切换滚动
*
* Example:
* 1. 从自定义组件中找到ItemScroller，并拖动到exml上
* 2. 将需要显示对象(图片等)拖动到ItemScroller的Group下
* 3. 设置Group的布局为垂直or水平
*/
var ItemScroller = (function (_super) {
    __extends(ItemScroller, _super);
    function ItemScroller() {
        var _this = _super.call(this) || this;
        /**滚动时间*/
        _this.delayScroll = 200;
        _this.addEventListener(eui.UIEvent.COMPLETE, _this.onCreateComplete, _this);
        return _this;
    }
    ItemScroller.prototype.onCreateComplete = function () {
        this.removeEventListener(eui.UIEvent.COMPLETE, this.onCreateComplete, this);
        //立即验证，获取width、height
        this.validateNow();
        //判断是垂直还是水平滚动
        var widthDist = this.viewport.contentWidth - this.viewport.width;
        if (widthDist > 0) {
            this.isHScroller = true;
            this.itemSize = this.viewport.width;
            this.itemNum = this.viewport.contentWidth / this.viewport.width;
        }
        else {
            this.isHScroller = false;
            this.itemSize = this.viewport.height;
            this.itemNum = this.viewport.contentHeight / this.viewport.height;
        }
        //滚动容器设置
        this.horizontalScrollBar.thumb.visible = false;
        this.verticalScrollBar.thumb.visible = false;
        ;
        this.bounces = true;
        this.addEventListener(eui.UIEvent.CHANGE_START, this.onChangeStartHandler, this);
        this.addEventListener(eui.UIEvent.CHANGE_END, this.onChangeEndHandler, this);
    };
    /**拖动开始*/
    ItemScroller.prototype.onChangeStartHandler = function () {
        if (this.isHScroller) {
            this.touchStartPos = this.viewport.scrollH;
        }
        else {
            this.touchStartPos = this.viewport.scrollV;
        }
    };
    /**拖动结束  拖动>=2项时无法调到正确的选项*/
    ItemScroller.prototype.onChangeEndHandler = function () {
        var dict;
        if (this.isHScroller) {
            dict = this.viewport.scrollH - this.touchStartPos;
        }
        else {
            dict = this.viewport.scrollV - this.touchStartPos;
        }
        if (dict > 0) {
            this.scrollToNext();
        }
        else {
            this.scrollToLast();
        }
    };
    /**滑动到下一项*/
    ItemScroller.prototype.scrollToNext = function () {
        var item = this.curItemCount;
        if (item < this.itemNum - 1) {
            item++;
        }
        this.scrollToItem(item);
    };
    /**滑动到上一项*/
    ItemScroller.prototype.scrollToLast = function () {
        var item = this.curItemCount;
        if (item > 0) {
            item--;
        }
        this.scrollToItem(item);
    };
    /**
     * 滚动到指定项 (0是第一项)
     * @item 指定项
     */
    ItemScroller.prototype.scrollToItem = function (item) {
        if (item >= 0 && item <= this.itemNum) {
            this.curItemCount = item;
            egret.Tween.removeTweens(this.viewport);
            if (this.isHScroller) {
                egret.Tween.get(this.viewport).to({ scrollH: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll);
            }
            else {
                egret.Tween.get(this.viewport).to({ scrollV: item * this.itemSize, ease: egret.Ease.quadOut }, this.delayScroll);
            }
        }
    };
    /**销毁*/
    ItemScroller.prototype.destroy = function () {
    };
    return ItemScroller;
}(eui.Scroller));
__reflect(ItemScroller.prototype, "ItemScroller");
var vip;
(function (vip) {
    var VIPConsts = (function () {
        function VIPConsts() {
        }
        VIPConsts.RES_JSON = "resource/vip/vip.res_44fb95aa.json";
        VIPConsts.THM_JSON = "resource/vip/gameEui_416f71ad.json";
        /**
         * 公共guide需要加载的资源组
         */
        VIPConsts.PUB_VIP = "pub_vip";
        return VIPConsts;
    }());
    vip.VIPConsts = VIPConsts;
    __reflect(VIPConsts.prototype, "vip.VIPConsts");
})(vip || (vip = {}));
var VIPItemView = (function (_super) {
    __extends(VIPItemView, _super);
    function VIPItemView() {
        var _this = _super.call(this) || this;
        _this.skinName = "VipItemSkin";
        return _this;
    }
    VIPItemView.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        this.vip_receive.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
    };
    VIPItemView.prototype.onTouchHandle = function (e) {
        var req = new Cmd.GetFishVipRewardCmd_CS();
        req.level = this.data.level;
        NetMgr.tcpSend(req);
    };
    VIPItemView.prototype.dataChanged = function () {
        _super.prototype.dataChanged.call(this);
        var reward = this.data;
        var level = reward.level;
        this.vip_level.textFlow = [{ text: "VIP" + level, style: { textColor: 0xFF00E8 } }, { text: "特权", style: { textColor: 0x8E2A06 } }];
        var vipConfig = ConfigMgr.getInstance().getFishVipByLv(level);
        var html = new egret.HtmlTextParser();
        this.vip_desc.textFlow = html.parser(vipConfig.des);
        var gun = ConfigMgr.getInstance().getFishGunTypeByID(vipConfig.unlockCannon);
        if (vipConfig.unlockCannon > 0) {
            this.setPaoWH(vipConfig.unlockCannon);
            this.setEffect(vipConfig.unlockCannon);
            this.vip_receive.visible = false;
            if (gun)
                this.pao_text.text = gun.gunName;
        }
        else {
            var count = vipConfig.vipReward[0].count;
            if (count < 1000000) {
                this.pao_img.source = "vip_json.vip_gold2";
            }
            else {
                this.pao_img.source = "vip_json.vip_gold3";
            }
            this.pao_img.x = (129 - 88);
            this.pao_img.y = (148 - 88);
            if (count >= 10000)
                this.pao_text.text = count / 10000 + "万金币";
            else
                this.pao_text.text = count + "金币";
            if (MJLobbyData.getInstance().userInfoSynLobby.userInfo.vip >= level) {
                if (reward.unReceived) {
                    this.vip_receive.visible = true;
                }
                else {
                    this.vip_receive.visible = false;
                }
            }
            else {
                this.vip_receive.visible = false;
            }
            this.removeEffect();
        }
        this.pao_text.x = 129 - this.pao_text.width / 2;
    };
    VIPItemView.prototype.setPaoWH = function (id) {
        this.pao_img.source = "pao_tai_" + id;
        if (this.pao_img.width == 0) {
            this.pao_img.x = (129 - 180 / 2);
            this.pao_img.y = (148 - 150 / 2);
        }
        else {
            this.pao_img.x = (129 - this.pao_img.width / 2);
            this.pao_img.y = (148 - this.pao_img.height / 2);
        }
    };
    VIPItemView.prototype.setEffect = function (id) {
        this.removeEffect();
        this.paoEffect = vip.VIPPanel.createMovieClicp("paotai_effect_" + id);
        this.addChild(this.paoEffect);
        this.paoEffect.x = 129;
        this.paoEffect.y = 148;
        this.paoEffect.play(-1);
    };
    VIPItemView.prototype.removeEffect = function () {
        if (this.paoEffect) {
            this.paoEffect.stop();
            uniLib.DisplayUtils.removeFromParent(this.paoEffect);
            this.paoEffect = null;
        }
    };
    VIPItemView.prototype.destroy = function () {
        this.vip_receive.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        this.removeEffect();
    };
    return VIPItemView;
}(eui.ItemRenderer));
__reflect(VIPItemView.prototype, "VIPItemView");
var vip;
(function (vip) {
    var VIPPanel = (function (_super) {
        __extends(VIPPanel, _super);
        function VIPPanel(level) {
            var _this = _super.call(this) || this;
            _this._level = -1;
            _this._extra = -1;
            if (level)
                _this._extra = level;
            _this.skinName = "VipPanelSkin";
            return _this;
        }
        VIPPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this._rechargeCur.mask = this._rechargeMask;
            this.addEvents();
            var req = new Cmd.GetFishVipInfoCmd_C();
            NetMgr.tcpSend(req);
        };
        VIPPanel.prototype.addEvents = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(vip.CmdConstant.FISHVIP_INFO, this.onFishVipInfo, this);
            uniLib.Global.addEventListener(vip.CmdConstant.FISHVIP_REWARD, this.onFishVipReward, this);
        };
        VIPPanel.prototype.initUI = function (noget, vipLevel) {
            if (this._extra > -1) {
                vipLevel = this._extra;
            }
            var vips = this.getVIPLvList(noget);
            this._maxLevel = vips[vips.length - 1].level;
            for (var i = 0; i < vips.length; i++) {
                if (vips[i].level == vipLevel) {
                    this._level = vipLevel;
                    break;
                }
            }
            if (this._level == -1)
                this._level = vips[0].level;
            this.vip_list.itemRenderer = VIPItemView;
            this._dataList = new eui.ArrayCollection(vips);
            this.vip_list.dataProvider = this._dataList;
            this.vip_list.validateNow();
            this.scrol.viewport.scrollH = ((this._level - 1) * 785); //因为vip从1级开始的
        };
        VIPPanel.prototype.onFishVipInfo = function (e) {
            var rev = e.param;
            this.setVip2(rev);
            if (rev.noget == null)
                rev.noget = [];
            this.initUI(rev.noget, rev.level);
            // if(this._extra==-1){
            //     this.setVip1(rev.level);
            // }
        };
        VIPPanel.prototype.onFishVipReward = function (e) {
            var rev = e.param;
            for (var i = 0; i < this._dataList.length; i++) {
                if (this._dataList.source[i].level == rev.level) {
                    this._dataList.source[i].unReceived = false;
                    this._dataList.replaceItemAt(this._dataList.source[i], i);
                }
            }
        };
        VIPPanel.prototype.setVip2 = function (rev) {
            this.vip_start.source = "vip_small_" + rev.level;
            var curVip = ConfigMgr.getInstance().getFishVipByLv(rev.level);
            var newVip = ConfigMgr.getInstance().getFishVipByLv(rev.level + 1);
            if (newVip) {
                this.vip_end.source = "vip_small_" + newVip.vipLv;
                this._progressTex.text = rev.curnum + "/" + rev.totalnum;
                this._rechargeMask.width = (rev.curnum / rev.totalnum) * 420;
                this._needTex.textFlow = [{ text: "再充值", style: { textColor: 0x8E2A06 } },
                    { text: rev.diamond + "元", style: { textColor: 0xFC00FF } },
                    { text: "即可升级", style: { textColor: 0x8E2A06 } }];
                this._needTex.x = 300 - this._needTex.width / 2;
            }
            else {
                this.vip_end.source = "vip_small_" + rev.level;
                this._progressTex.text = curVip.recharge + "/" + curVip.recharge;
                this._rechargeMask.width = 420;
                this._needTex.text = "";
            }
        };
        VIPPanel.prototype.removeEvents = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.removeEventListener(vip.CmdConstant.FISHVIP_INFO, this.onFishVipInfo, this);
            uniLib.Global.removeEventListener(vip.CmdConstant.FISHVIP_REWARD, this.onFishVipReward, this);
        };
        VIPPanel.prototype.onTouchHandle = function (e) {
            var target = e.target;
            if (target == this._closeBtn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (target == this._leftBtn) {
                this._level--;
                if (this._level <= 0)
                    this._level = 1;
                else {
                    this.scrollVip();
                    // this.scrol.viewport.scrollH 
                    // this.setVip1(this._level);
                }
            }
            else if (target == this._rightBtn) {
                this._level++;
                if (this._level > this._maxLevel)
                    this._level = this._maxLevel;
                else {
                    // this.setVip1(this._level);
                    this.scrollVip();
                }
            }
            else if (target == this._recharge) {
                LobbyModuleMgr.getInstance().showMarketPanel(0);
            }
        };
        VIPPanel.prototype.scrollVip = function () {
            if (this.scrol.viewport.scrollH != ((this._level - 1) * 785)) {
                egret.Tween.removeTweens(this.scrol.viewport);
                egret.Tween.get(this.scrol.viewport).to({ scrollH: (this._level - 1) * 785 }, 200);
            }
        };
        VIPPanel.prototype.getVIPLvList = function (noget) {
            var tableFishVipData = RES.getRes("TableFishVIP_json");
            var list = [];
            tableFishVipData.forEach(function (f) {
                var vv = new VipReward();
                vv.level = f.vipLv;
                vv.unReceived = noget.indexOf(f.vipLv) > -1;
                list.push(vv);
            });
            return list;
        };
        VIPPanel.createMovieClicp = function (groupName, keyName) {
            var data = RES.getRes(groupName + "_json"); //获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png"); //获取动画文件的图片
            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName)); //创建MovieClip
            return mc;
        };
        VIPPanel.prototype.destroy = function () {
            egret.Tween.removeTweens(this.scrol.viewport);
            if (this.paoEffect) {
                this.paoEffect.stop();
                uniLib.DisplayUtils.removeFromParent(this.paoEffect);
                this.paoEffect = null;
            }
            this.removeEvents();
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return VIPPanel;
    }(eui.Component));
    vip.VIPPanel = VIPPanel;
    __reflect(VIPPanel.prototype, "vip.VIPPanel");
    var VipReward = (function () {
        function VipReward() {
        }
        return VipReward;
    }());
    vip.VipReward = VipReward;
    __reflect(VipReward.prototype, "vip.VipReward");
})(vip || (vip = {}));
var vip;
(function (vip) {
    var CmdConstant = (function () {
        function CmdConstant() {
        }
        /**请求捕鱼VIP数据*/
        CmdConstant.FISHVIP_INFO = "fishvip_info";
        CmdConstant.FISHVIP_REWARD = "fishvip_reward";
        return CmdConstant;
    }());
    vip.CmdConstant = CmdConstant;
    __reflect(CmdConstant.prototype, "vip.CmdConstant");
})(vip || (vip = {}));
var VipReciveMgr = (function () {
    function VipReciveMgr() {
    }
    return VipReciveMgr;
}());
__reflect(VipReciveMgr.prototype, "VipReciveMgr");
var Cmd;
(function (Cmd) {
    /**VIP-请求数据 */
    function OnGetFishVipInfoCmd_S(rev) {
        uniLib.Global.dispatchEvent(vip.CmdConstant.FISHVIP_INFO, rev, true);
    }
    Cmd.OnGetFishVipInfoCmd_S = OnGetFishVipInfoCmd_S;
    function OnGetFishVipRewardCmd_CS(rev) {
        uniLib.Global.dispatchEvent(vip.CmdConstant.FISHVIP_REWARD, rev, true);
    }
    Cmd.OnGetFishVipRewardCmd_CS = OnGetFishVipRewardCmd_CS;
})(Cmd || (Cmd = {}));
