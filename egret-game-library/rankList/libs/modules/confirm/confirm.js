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
var commonConfirm;
(function (commonConfirm) {
    var ConfirmConsts = (function () {
        function ConfirmConsts() {
        }
        ConfirmConsts.RES_JSON = "resource/confirm/confirm.res_f8f48a8e.json";
        ConfirmConsts.THM_JSON = "resource/confirm/gameEui_ae610ec0.json";
        /**
         * 公共confirm需要加载的资源组
         */
        ConfirmConsts.PUB_CONFIRM = "pub_confirm";
        return ConfirmConsts;
    }());
    commonConfirm.ConfirmConsts = ConfirmConsts;
    __reflect(ConfirmConsts.prototype, "commonConfirm.ConfirmConsts");
    /**面板关闭事件 动画用*/
    commonConfirm.EVENT_PANEL_CLOSE = "event_panel_close";
    /**打开面板事件  动画用*/
    commonConfirm.EVENT_PANEL_OPEN = "event_panel_open";
    /**面板动画播放完毕  动画用*/
    commonConfirm.EVENT_PANEL_OVER = "event_panel_over";
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var ConfirmPanel = (function (_super) {
        __extends(ConfirmPanel, _super);
        /**
       * titleUrl 确认框标题 传个资源名或文字
       * btnUrl 自定义的按钮皮肤 传个资源名
       * text 确认框内容
       * callback1 确定按钮回调函数
       * callback2 取消按钮回调函数
       */
        function ConfirmPanel(content, title, btnRes, callback1, callback2, callObj) {
            var _this = _super.call(this) || this;
            _this._content = content;
            _this._title = title;
            _this._btnRes = btnRes;
            _this._callback1 = callback1;
            _this._callback2 = callback2;
            _this._callObj = callObj;
            _this.skinName = "ConfirmPanelSkin";
            return _this;
        }
        ConfirmPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            if (this._title) {
                if (RES.hasRes(this._title)) {
                    this.title_lbl.visible = false;
                    this.title_img.source = this._title;
                }
                else {
                    this.title_img.visible = false;
                    this.title_lbl.text = this._title;
                }
            }
            if (this._btnRes) {
                this.okButton.skin["img"].source = this._btnRes[0];
                if (this._btnRes[1])
                    this.cacelButton.skin["img"].source = this._btnRes[1];
            }
            if (this._content.length && Object.prototype.toString.call(this._content).toLowerCase() == "[object array]") {
                this.contentText.textFlow = this._content;
            }
            else {
                this.contentText.text = this._content + '';
            }
            if (this._callback2) {
                this.cacelButton.visible = true;
                this.okButton.horizontalCenter = -150;
            }
            else {
                this.cacelButton.visible = false;
                this.okButton.horizontalCenter = 0;
            }
        };
        ConfirmPanel.prototype.touchHandle = function (e) {
            var target = e.target;
            switch (target) {
                case this.okButton:
                    uniLib.PopUpMgr.removePopUp(this);
                    this._callback1 && this._callback1.apply(this._callObj, []);
                    break;
                case this.cacelButton:
                    uniLib.PopUpMgr.removePopUp(this);
                    this._callback2 && this._callback2.apply(this._callObj, []);
                    break;
            }
        };
        ConfirmPanel.prototype.destroy = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
            this._content = null;
            this._title = null;
            this._btnRes = null;
            this._callback1 = null;
            this._callback2 = null;
            this._callObj = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return ConfirmPanel;
    }(eui.Component));
    commonConfirm.ConfirmPanel = ConfirmPanel;
    __reflect(ConfirmPanel.prototype, "commonConfirm.ConfirmPanel");
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var ResUtil = (function () {
        function ResUtil() {
        }
        ResUtil.numFormat = function (num) {
            if (num < 0) {
                return;
            }
            if (!(ResUtil.getType(num) === "number")) {
                console.error("wocao,不是个数字，它是个", ResUtil.getType(num));
                return;
            }
            if (num < 10000) {
                return num + "";
            }
            var mod = 0;
            var sym = "";
            if (Math.abs(num) >= 10000 && Math.abs(num) < 100000000) {
                mod = 10000;
                sym = "万";
            }
            else {
                mod = 100000000;
                sym = "亿";
            }
            var numStr = ("" + (num / mod));
            if (numStr.lastIndexOf('.') != -1) {
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + 4);
            }
            else {
                numStr = numStr.substring(0, numStr.lastIndexOf('.') + 5);
            }
            var before = numStr.split(".")[0];
            var after = numStr.split(".")[1];
            if (Number(after)) {
                var afterLength = (4 - before.length) > 0 ? 4 - before.length : 0;
                var afterArr = after.split("");
                afterArr.length = afterLength;
                after = afterArr.join("");
                var after2 = (Number("0." + after)).toString();
                after2 = Boolean(after2.split(".")[1]) ? "." + after2.toString().split(".")[1] : "";
                var final = before + after2 + sym;
                return final;
            }
            else {
                return before + sym;
            }
        };
        /**获取JavaScript类型 */
        ResUtil.getType = function (o) {
            var _toString = Object.prototype.toString;
            //获取对象原型的toString引用
            //列举常用类型
            var _type = {
                "undefined": "undefined",
                "number": "number",
                "boolean": "boolean",
                "string": "string",
                "[object Function]": "function",
                "[object RegExp]": "regexp",
                "[object Array]": "array",
                "[object Date]": "date",
                "[object error]": "error"
            };
            var jsType = _type[typeof o] || _type[_toString.call(o)] || (o ? "object" : "null");
            if (jsType === "number") {
                o = +o; //该方法效率比自带快
                if (o !== o) {
                    return "NaN";
                }
            }
            return jsType;
        };
        ResUtil.limitImageSize = function (img, maxH) {
            if (img.width > maxH || img.height > maxH) {
                if (img.width == img.height) {
                    img.width = img.height = maxH;
                }
                else if (img.width > img.height) {
                    var scale = maxH / img.width;
                    img.width = maxH;
                    img.height = img.height * scale;
                }
                else if (img.width < img.height) {
                    var scale = maxH / img.height;
                    img.height = maxH;
                    img.width = img.width * scale;
                }
            }
        };
        return ResUtil;
    }());
    commonConfirm.ResUtil = ResUtil;
    __reflect(ResUtil.prototype, "commonConfirm.ResUtil");
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var ReWardDataVo = (function () {
        function ReWardDataVo() {
        }
        /**
         * shopId
         */
        ReWardDataVo.prototype.getDataByShopId = function (shopId, shopNum) {
            if (shopNum)
                this.num = shopNum;
            var goodId = ConfigMgr.getInstance().getShopCfgById(shopId).shopGoods.goodId;
            var reward = ConfigMgr.getInstance().getGoodCfgById(goodId);
            console.log(reward);
            this.icon = reward.goodIcon + "_png";
            this.des = reward.goodDesc;
        };
        /**
         * goodId
         */
        ReWardDataVo.prototype.getDataByGoodId = function (goodId, shopNum) {
            if (shopNum)
                this.num = shopNum;
            var reward = ConfigMgr.getInstance().getGoodCfgById(goodId);
            console.log(reward);
            this.icon = reward.goodIcon + "_png";
            this.des = reward.goodDesc;
        };
        return ReWardDataVo;
    }());
    commonConfirm.ReWardDataVo = ReWardDataVo;
    __reflect(ReWardDataVo.prototype, "commonConfirm.ReWardDataVo");
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var RewardItem = (function (_super) {
        __extends(RewardItem, _super);
        function RewardItem($data) {
            var _this = _super.call(this) || this;
            _this._data = $data;
            _this.skinName = "RewardItemSkin";
            return _this;
        }
        RewardItem.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        RewardItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData(this._data);
        };
        RewardItem.prototype.initData = function (vo) {
            this.giftIcon_img.source = vo.icon;
            if (vo.num) {
                var numstr = commonConfirm.ResUtil.numFormat(vo.num);
                this.giftName_lb.text = vo.des + "X" + numstr;
            }
            else {
                // this.giftName_lb.text = vo.des;
                if (Array.isArray(vo.des)) {
                    this.giftName_lb.textFlow = vo.des;
                }
                else {
                    this.giftName_lb.text = vo.des;
                }
            }
        };
        return RewardItem;
    }(eui.Component));
    commonConfirm.RewardItem = RewardItem;
    __reflect(RewardItem.prototype, "commonConfirm.RewardItem", ["eui.UIComponent", "egret.DisplayObject"]);
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var RewardItem2 = (function (_super) {
        __extends(RewardItem2, _super);
        function RewardItem2($data) {
            var _this = _super.call(this) || this;
            _this._data = $data;
            _this.skinName = "RewardItemSkin";
            return _this;
        }
        RewardItem2.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        RewardItem2.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initData(this._data);
        };
        RewardItem2.prototype.initData = function (vo) {
            this.giftIcon_img.source = "game_prop_json.bag_daoju_" + vo.goodId;
            commonConfirm.ResUtil.limitImageSize(this.giftIcon_img, 110);
            var reward = ConfigMgr.getInstance().getGoodCfgById(vo.goodId);
            if (vo.goodNbr) {
                var numstr = commonConfirm.ResUtil.numFormat(vo.goodNbr);
                this.giftName_lb.text = reward.goodDesc + "X" + numstr;
            }
            else {
                // this.giftName_lb.text = vo.des;
                if (Array.isArray(reward.goodDesc)) {
                    this.giftName_lb.textFlow = reward.goodDesc;
                }
                else {
                    this.giftName_lb.text = reward.goodDesc;
                }
            }
        };
        return RewardItem2;
    }(eui.Component));
    commonConfirm.RewardItem2 = RewardItem2;
    __reflect(RewardItem2.prototype, "commonConfirm.RewardItem2", ["eui.UIComponent", "egret.DisplayObject"]);
})(commonConfirm || (commonConfirm = {}));
var commonConfirm;
(function (commonConfirm) {
    var RewardPanel = (function (_super) {
        __extends(RewardPanel, _super);
        function RewardPanel(data) {
            var _this = _super.call(this) || this;
            _this._isCmd = false;
            _this._data = data;
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            _this.skinName = "RewardPanelSkin";
            return _this;
        }
        RewardPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this._data) {
                if (this._isCmd)
                    this.initData2();
                else
                    this.initData();
            }
            this.sure_btn.once(egret.TouchEvent.TOUCH_TAP, this.onSureHandle, this);
            this.quan1.visible = true;
            this.quan2.visible = true;
            this.item_grp.touchEnabled = false;
            this.item_grp.touchChildren = false;
            uniLib.DisplayUtils.playTweenGroup(this.guangquan, false);
            uniLib.DisplayUtils.playTweenGroup(this.light, true);
        };
        RewardPanel.prototype.initData = function (data) {
            if (data) {
                this._isCmd = false;
                this._data = data;
            }
            if (this._data) {
                for (var i = 0; i < this._data.length; i++) {
                    var item = new commonConfirm.RewardItem(this._data[i]);
                    this.item_grp.addChild(item);
                    item.x = i * 164;
                }
            }
        };
        RewardPanel.prototype.initData2 = function (data) {
            if (data) {
                this._isCmd = true;
                this._data = data;
            }
            if (this._data) {
                for (var i = 0; i < this._data.length; i++) {
                    var item = new commonConfirm.RewardItem2(this._data[i]);
                    this.item_grp.addChild(item);
                    item.x = i * 164;
                }
            }
        };
        RewardPanel.prototype.onSureHandle = function (e) {
            uniLib.DisplayUtils.stopTweenGroup(this.guangquan);
            uniLib.DisplayUtils.stopTweenGroup(this.light);
            egret.Tween.removeTweens(this.guangquan);
            egret.Tween.removeTweens(this.light);
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.PopUpMgr.removePopUp(this);
        };
        return RewardPanel;
    }(eui.Component));
    commonConfirm.RewardPanel = RewardPanel;
    __reflect(RewardPanel.prototype, "commonConfirm.RewardPanel");
})(commonConfirm || (commonConfirm = {}));
var eui;
(function (eui) {
    /**
     * 通用基础控件
     */
    var ArmatureComponent = (function (_super) {
        __extends(ArmatureComponent, _super);
        function ArmatureComponent() {
            var _this = _super.call(this) || this;
            _this.resName = null;
            _this.ncName = null;
            _this.mcType = null;
            _this.center = false;
            _this.touchAble = 1;
            return _this;
        }
        ArmatureComponent.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.update();
        };
        ArmatureComponent.prototype.onRemoveFromStage = function (evt) {
            this.destroy();
        };
        ArmatureComponent.prototype.update = function () {
            if (this.resName) {
                if (!this.ncName)
                    this.ncName = "newAnimation";
                if (!this.mcType)
                    this.mcType = uniLib.DragonType.ARMATURE;
                this._armature = uniLib.DragonUtils.createDragonBonesDisplay(this.resName + "_ske_json", this.resName + "_tex_json", this.resName + "_tex_png", this.mcType);
                if (!!this._armature) {
                    this.addChildAt(this._armature.display, 0);
                    uniLib.DragonUtils.runDragonBonesArmature(this._armature, this.ncName, 0);
                }
                if (this.center) {
                    this._armature.display.x = this._armature.display.width / 2;
                    this._armature.display.y = this._armature.display.height / 2;
                }
                this.touchEnabled = this.touchAble == 1;
                this.touchChildren = this.touchAble == 1;
            }
        };
        ArmatureComponent.prototype.destroy = function () {
            if (this._armature) {
                this._armature.animation.stop();
                uniLib.DragonUtils.destoryDragonBonesArmature(this._armature, this.ncName);
            }
            this._armature = null;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        return ArmatureComponent;
    }(eui.Component));
    eui.ArmatureComponent = ArmatureComponent;
    __reflect(ArmatureComponent.prototype, "eui.ArmatureComponent");
})(eui || (eui = {}));
var eui;
(function (eui) {
    var WxButton = (function (_super) {
        __extends(WxButton, _super);
        function WxButton() {
            var _this = _super.call(this) || this;
            _this.colorMatrix = [
                0.7, 0, 0, 0, 70,
                0, 0.7, 0, 0, 70,
                0, 0, 0.7, 0, 70,
                0, 0, 0, 1, 0
            ];
            _this.isFilter = false;
            return _this;
        }
        WxButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this.anchorOffsetX == 0) {
                this.anchorOffsetX = this.width >> 1;
                this.x += this.width >> 1;
            }
            if (this.anchorOffsetY == 0) {
                this.anchorOffsetY = this.height >> 1;
                this.y += this.height >> 1;
            }
            this.init();
        };
        WxButton.prototype.init = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            var gameConsts = egret.getDefinitionByName("GameConsts");
            if (gameConsts && GameConsts.LABEL_STYLE && this.label) {
                this.labelDisplay["style"] = GameConsts.LABEL_STYLE;
            }
        };
        WxButton.prototype.removeTouchEvent = function () {
            if (this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            }
        };
        WxButton.prototype.onTouchBegin = function (evt) {
            _super.prototype.onTouchBegin.call(this, evt);
            if (this.isFilter) {
                this.filters = [new egret.ColorMatrixFilter(this.colorMatrix)];
            }
            else {
                this.scaleX = 0.9;
                this.scaleY = 0.9;
            }
            if (!this.hasEventListener(egret.TouchEvent.TOUCH_END)) {
                this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
                this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
                this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
                this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            }
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        };
        WxButton.prototype.onTouchEnd = function () {
            this.filters = [];
            this.scaleX = 1;
            this.scaleY = 1;
            this.removeTouchEvent();
        };
        WxButton.prototype.onTouchCancel = function (evt) {
            this.filters = [];
            this.scaleX = 1;
            this.scaleY = 1;
            this.removeTouchEvent();
        };
        WxButton.prototype.onTouchMove = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxButton.prototype.onTouchReleaseOutside = function () {
            this.filters = [];
            this.scaleX = 1;
            this.scaleY = 1;
            this.removeTouchEvent();
        };
        WxButton.prototype.setColorMatrix = function (matrix) {
            if (matrix) {
                this.colorMatrix = matrix;
            }
            this.isFilter = true;
        };
        WxButton.prototype.dispose = function () {
            this.filters = null;
            this.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.dispose, this);
            this.removeTouchEvent();
        };
        return WxButton;
    }(eui.Button));
    eui.WxButton = WxButton;
    __reflect(WxButton.prototype, "eui.WxButton");
})(eui || (eui = {}));
