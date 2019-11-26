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
var loading;
(function (loading) {
    var LoadingConst = (function () {
        function LoadingConst() {
        }
        LoadingConst.RES_JSON = "resource/loading/loading.res_3d3964f7.json";
        LoadingConst.THM_JSON = "resource/loading/gameEui_d9e25c9e.json";
        /**
         * 公共loading需要加载的资源组
         */
        LoadingConst.PUB_LOADING = "pub_loading";
        return LoadingConst;
    }());
    loading.LoadingConst = LoadingConst;
    __reflect(LoadingConst.prototype, "loading.LoadingConst");
})(loading || (loading = {}));
var loading;
(function (loading) {
    var LoadingGameTip = (function (_super) {
        __extends(LoadingGameTip, _super);
        function LoadingGameTip() {
            var _this = _super.call(this) || this;
            _this.skinName = "loading.LoadGameTipSkin";
            return _this;
        }
        LoadingGameTip.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            uniLib.DisplayUtils.playTweenGroup(this.turn, true);
        };
        LoadingGameTip.prototype.updateUIData = function (data) {
            if (this.process_lb)
                this.process_lb.text = data + "%";
        };
        LoadingGameTip.prototype.resize = function () {
        };
        LoadingGameTip.prototype.destroy = function () {
            uniLib.DisplayUtils.stopTweenGroup(this.turn);
        };
        return LoadingGameTip;
    }(eui.Component));
    loading.LoadingGameTip = LoadingGameTip;
    __reflect(LoadingGameTip.prototype, "loading.LoadingGameTip", ["uniLib.IUI"]);
})(loading || (loading = {}));
var loading;
(function (loading) {
    /**
     * 公共加载
     */
    var PublicLoadingView = (function (_super) {
        __extends(PublicLoadingView, _super);
        function PublicLoadingView() {
            var _this = _super.call(this) || this;
            _this.explain = "正在加载游戏资源...";
            _this.skinName = "PublicLoadingViewSkin";
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            return _this;
        }
        PublicLoadingView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        PublicLoadingView.prototype.initUI = function () {
            uniLib.DisplayUtils.playTweenGroup(this.loading, true);
        };
        PublicLoadingView.prototype.destroy = function () {
            uniLib.DisplayUtils.stopTweenGroup(this.loading);
        };
        PublicLoadingView.prototype.setProgress = function (loaded, total, desc, resourceName, force) {
            if (force === void 0) { force = false; }
            this._versionTxt.text = uniLib.Global.version + "";
            if (total && total != 0) {
                var num = Math.ceil((loaded / total) * 100);
                if (force == false && num > 93) {
                    num = 93;
                }
                if (desc && desc != "") {
                    this._explain_txf.text = desc + (num + "%");
                }
                else {
                    this._explain_txf.text = this.explain + (num + "%");
                }
                var widthX = (this._darkLine_bmp.width) * (num / 100);
                this._lightLine_bmp.width = widthX;
            }
            else {
                this._explain_txf.text = desc;
            }
        };
        return PublicLoadingView;
    }(eui.Component));
    loading.PublicLoadingView = PublicLoadingView;
    __reflect(PublicLoadingView.prototype, "loading.PublicLoadingView");
})(loading || (loading = {}));
var loading;
(function (loading) {
    /**
     * 加载多个资源配置文件
     */
    function loadConfigs(configUrls, resourceRoot) {
        if (resourceRoot === void 0) { resourceRoot = "resource/"; }
        function cngFun(url, resRoot) {
            return RES.loadConfig(url, resRoot);
        }
        var allArr = [];
        for (var i = 0; i < configUrls.length; i++) {
            allArr.push(cngFun(configUrls[i], resourceRoot));
        }
        return new Promise(function (resolve, reject) {
            Promise.all(allArr).then(function () { resolve(1); }, function () { egret.error("config 加载失败"); reject(0); });
        });
    }
    loading.loadConfigs = loadConfigs;
    /**
     * 加载多个主题配置文件
     */
    var index = 0;
    function loadThems(themUrls, onCompleteCall, onErrorCall, thisObj, themRoot) {
        var _this = this;
        if (themUrls[index].indexOf("thm.json") > 0) {
            var theme = new eui.Theme(themUrls[index], egret.MainContext.instance.stage);
            theme.once(eui.UIEvent.COMPLETE, themCall, this);
        }
        else {
            RES.getResByUrl(themRoot ? themRoot + themUrls[index] : themUrls[index], function (data, url) {
                window["JSONParseClass"]["setData"](data);
                egret.callLater(function () {
                    themCall(data);
                }, _this);
            }, this, RES.ResourceItem.TYPE_JSON);
            // uniLib.ResUtils.getTheme(, themCall, themCall, this, themRoot, "commonjs2")
        }
        function themCall(obj) {
            if (obj) {
                if (themUrls[++index])
                    loadThems(themUrls, onCompleteCall, onErrorCall, thisObj, themRoot);
                else {
                    if (onCompleteCall)
                        onCompleteCall.call(thisObj, []);
                }
            }
            else {
                if (onErrorCall)
                    onErrorCall.call(thisObj, []);
            }
        }
    }
    loading.loadThems = loadThems;
})(loading || (loading = {}));
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
            return _this;
        }
        ArmatureComponent.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            this.update();
            this.red = new egret.Bitmap(RES.getRes("mjl_red_dot_png"));
            this.red.width = this.red.height = 29;
            this.red.visible = false;
            this.addChild(this.red);
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
                this.addChildAt(this._armature.display, 0);
                uniLib.DragonUtils.runDragonBonesArmature(this._armature, this.ncName, 0);
            }
        };
        ArmatureComponent.prototype.destroy = function () {
            if (this._armature) {
                this._armature.animation.stop();
                uniLib.DragonUtils.destoryDragonBonesArmature(this._armature, this.ncName);
            }
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
            _this.init();
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
        };
        WxButton.prototype.init = function () {
            this.touchEnabled = true;
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.addEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.addEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.addEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
            this.addEventListener(egret.Event.REMOVED, this.dispose, this);
        };
        WxButton.prototype.onTouchBegin = function () {
            this.scaleX = 0.9;
            this.scaleY = 0.9;
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
        };
        WxButton.prototype.onTouchEnd = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxButton.prototype.onTouchCancel = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxButton.prototype.onTouchMove = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxButton.prototype.onTouchReleaseOutside = function () {
            this.scaleX = 1;
            this.scaleY = 1;
        };
        WxButton.prototype.dispose = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchBegin, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_END, this.onTouchEnd, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_CANCEL, this.onTouchCancel, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.onTouchMove, this);
            this.removeEventListener(egret.Event.REMOVED, this.dispose, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_RELEASE_OUTSIDE, this.onTouchReleaseOutside, this);
        };
        return WxButton;
    }(eui.Button));
    eui.WxButton = WxButton;
    __reflect(WxButton.prototype, "eui.WxButton");
})(eui || (eui = {}));
