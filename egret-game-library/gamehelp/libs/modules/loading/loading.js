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
        LoadingConst.RES_JSON = "resource/loading/loading.res_28d525d4.json";
        LoadingConst.RES_JSON_ZHANGZHOU = "resource/loading_zhangzhou.res.json";
        LoadingConst.THM_JSON = "resource/loading/gameEui_58a1ac7d.json";
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
var loading;
(function (loading) {
    /**
     * 公共加载
     */
    var PublicLoadingZZView = (function (_super) {
        __extends(PublicLoadingZZView, _super);
        function PublicLoadingZZView() {
            var _this = _super.call(this) || this;
            _this.explain = "正在加载游戏资源...";
            _this._time = 0;
            _this.skinName = "PublicLoadingViewZZSkin";
            _this.width = uniLib.Global.screenWidth;
            _this.height = uniLib.Global.screenHeight;
            return _this;
        }
        PublicLoadingZZView.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        };
        PublicLoadingZZView.prototype.initUI = function () {
            uniLib.DisplayUtils.playTweenGroup(this.loading, true);
        };
        PublicLoadingZZView.prototype.destroy = function () {
            if (this._timer) {
                clearInterval(this._timer);
            }
            uniLib.DisplayUtils.stopTweenGroup(this.loading);
        };
        PublicLoadingZZView.prototype.setProgress = function (loaded, total, desc, resourceName, force) {
            var _this = this;
            if (force === void 0) { force = false; }
            this._versionTxt.text = uniLib.Global.version + "";
            if (total && total != 0) {
                var num_1 = Math.ceil((loaded / total) * 100);
                if (force == false && num_1 > 93) {
                    num_1 = 93;
                }
                if (num_1 >= 93) {
                    if (!this._timer) {
                        this._timer = setInterval(function () {
                            _this._time++;
                            if (_this._time >= 15 && uniLib.Global.isWxGame()) {
                                clearInterval(_this._timer);
                                uniLib.Utils.clearLocalStorage();
                                wxgame.Utils.showConfirm(num_1 + ":网络异常,请重新登录!", "温馨提示", "确定", wxgame.Global.instance.exitMiniProgram);
                            }
                        }, 1000);
                    }
                }
                if (desc && desc != "") {
                    this._explain_txf.text = desc + (num_1 + "%");
                }
                else {
                    this._explain_txf.text = this.explain + (num_1 + "%");
                }
                var widthX = (this._darkLine_bmp.width) * (num_1 / 100);
                this._lightLine_bmp.width = widthX;
            }
            else {
                this._explain_txf.text = desc;
            }
        };
        return PublicLoadingZZView;
    }(eui.Component));
    loading.PublicLoadingZZView = PublicLoadingZZView;
    __reflect(PublicLoadingZZView.prototype, "loading.PublicLoadingZZView");
})(loading || (loading = {}));
