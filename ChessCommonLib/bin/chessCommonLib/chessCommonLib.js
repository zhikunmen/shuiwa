/*!
 * chessCommonLib - JS for Debug
 * @licence chessCommonLib - v0.1.0 (2018-12-11)
 * qq:93749937 | Licence: helojo
 */
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 通用头像组件
 */
var chessCommonLib;
(function (chessCommonLib) {
    var Head = /** @class */ (function (_super) {
        __extends(Head, _super);
        function Head(skin, w, h) {
            if (w === void 0) { w = 100; }
            if (h === void 0) { h = 100; }
            var _this = _super.call(this) || this;
            if (skin) {
                _this.skinName = skin;
            }
            else {
                // this.skinName = this.exmls;
                _this.skinName = "chessCommonLib.HeadSkin";
            }
            _this.width = w;
            _this.height = h;
            return _this;
        }
        Head.prototype.partAdded = function (partName, instance) {
            _super.prototype.partAdded.call(this, partName, instance);
        };
        Object.defineProperty(Head.prototype, "headUrl", {
            get: function () {
                return this._headUrl;
            },
            set: function (url) {
                this._headUrl = url;
                try {
                    if (this.avar_img)
                        this.avar_img.source = this._headUrl;
                }
                catch (e) {
                    this.avar_img.source = Head.DefaultHead;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Head.prototype, "frame", {
            get: function () {
                return this._frame;
            },
            set: function (url) {
                if (Head.DefaulVip) {
                    this._frame = url;
                    if (this.avarFrame_img) {
                        this.avarFrame_img.source = this._frame;
                        this.avarFrame_img.scaleX = this.avarFrame_img.scaleY = this.headScale;
                    }
                }
                this.avarFrame_img.visible = Head.DefaulVip;
            },
            enumerable: true,
            configurable: true
        });
        Head.prototype.setVipAnim = function (resName, playName, x, y) {
            this._vipAnim = resName;
            if (!x)
                x = this.width / 2;
            if (!y)
                y = this.height / 2;
            if (this.anim != undefined) {
                uniLib.DragonUtils.removeFastDragonbyContainer(this);
                this.anim = null;
            }
            if (playName == "vip9")
                this.anim = uniLib.DragonUtils.showFastDragon(this._vipAnim, playName, uniLib.DragonType.ARMATURE, x, y, this);
            else {
                this.anim = uniLib.DragonUtils.showFastDragon(this._vipAnim, "newAnimation", uniLib.DragonType.MovieClip, x, y, this);
                if (playName) {
                    this.anim.play(playName, 0);
                }
            }
            this.anim.scaleX = this.anim.scaleY = this.headScale;
            this.anim.touchEnabled = false;
        };
        Head.prototype.setHeadFrame = function (level, personInfo) {
            var mcId;
            if (personInfo && Head.PersonalImageAble)
                mcId = chessCommonLib.FashionDataUtils.getPersonVipLevel(personInfo);
            if (mcId == undefined) {
                this.vipLevel = level;
            }
            else {
                if (mcId < 30) {
                    this.vipLevel = mcId;
                }
                else {
                    var headMc = chessCommonLib.ConfigMgr.getInstance().getheadMcById(mcId);
                    if (headMc) {
                        this.setVipAnim(headMc.head_mc[0], headMc.head_mc[1]);
                    }
                }
            }
        };
        Object.defineProperty(Head.prototype, "vipLevel", {
            set: function (level) {
                if (!level)
                    level = 0;
                var vipCfg = chessCommonLib.ConfigMgr.getInstance().getVipByLevel(level);
                if (vipCfg) {
                    if (vipCfg.head_mc && Head.PersonalImageAble) {
                        var headMc = chessCommonLib.ConfigMgr.getInstance().getheadMcById(vipCfg.head_mc);
                        if (headMc) {
                            this.setVipAnim(headMc.head_mc[0], headMc.head_mc[1]);
                        }
                    }
                    else {
                        this.frame = vipCfg.head_frame;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Head.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.headScale = this.width / Head.DefaultWH;
            if (this._headUrl) {
                try {
                    if (this.avar_img)
                        this.avar_img.source = this._headUrl;
                    else {
                        this.avar_img.source = Head.DefaultHead;
                    }
                }
                catch (e) {
                    console.error(this._headUrl + " error..");
                    this.avar_img.source = Head.DefaultHead;
                }
            }
            else
                this.avar_img.source = Head.DefaultHead;
            if (this._frame) {
                this.avarFrame_img.source = this._frame;
                this.avarFrame_img.scaleX = this.avarFrame_img.scaleY = this.headScale;
            }
            if (!Head.DefaultIcon) {
                this.gift_icon.visible = false;
            }
            if (Head.DefaulInfoBg) {
                this.info_bg.visible = true;
                this.info_bg.scaleX = this.info_bg.scaleY = this.headScale;
            }
            this.touchChildren = true;
            this.touchEnabled = false;
            this.avar_img.touchEnabled = true;
            this.avarFrame_img.touchEnabled = false;
            this.gift_icon.scaleX = this.gift_icon.scaleY = this.headScale;
            this.gift_icon.x = this.gift_icon.y = this.headScale * -20;
        };
        Head.prototype.destroy = function () {
            this.frame = null;
            if (this.anim) {
                uniLib.DragonUtils.removeFastDragonbyContainer(this);
            }
        };
        Head.PersonalImageAble = true;
        Head.DefaultHead = "default_avar_png";
        Head.DefaultIcon = true;
        Head.DefaulVip = true;
        Head.DefaulInfoBg = false;
        // 		private exmls: string = `<e:Skin class="chessCommonLib.HeadSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" >
        // 	<e:Image id="avar_img" source="default_avar_png" left="0" right="0" top="0" bottom="0"/>
        // 	<e:Image id="avarFrame_img" horizontalCenter="0" verticalCenter="0" source=""/>
        // </e:Skin>`;
        Head.DefaultWH = 106;
        return Head;
    }(eui.Component));
    chessCommonLib.Head = Head;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var _isInited = false;
    var _msgAdd = false;
    /**
    * 初始化库
    * @method commonLib.init
    * @param param {any} 初始化参数
    */
    function init(param, callBack, thisObj) {
        if (_isInited == true) {
            return;
        }
        _isInited = true;
        var self = this;
        var thmLoaded;
        var resLoaded;
        if (!param) {
            param = new chessCommonLib.initOptions();
        }
        if (param.resConfig == null) {
            param.resRoot = "chessCommonLib/resource/";
            param.resConfig = "chessCommonLib/resource/chessCommonLib.res.json";
            param.thmConfig = "chessCommonLib/resource/chessCommonLib.thm.json";
            param.gameEui = "chessCommonEui.json";
            if (param.remoteMode != true)
                param.remoteMode = false;
        }
        if (uniLib.Global.isH5 == true) {
            param.remoteMode = true;
        }
        if (param.remoteMode == true) {
            var cdnDomain = uniLib.Global.CdnDomains[0];
            param.resConfig = cdnDomain + param.resConfig;
            param.resRoot = cdnDomain + param.resRoot;
            param.thmConfig = cdnDomain + param.thmConfig;
        }
        var loadedthm = function (event) {
            if (event === void 0) { event = null; }
            // if (egret.Capabilities.engineVersion < "5.1.0") {
            // 	thmLoaded = true;
            // 	if (resLoaded == true) {
            // 		callBack.call(thisObj);
            // 	}
            // } else {
            thmLoaded = true;
            if (resLoaded == true) {
                callBack.call(thisObj);
            }
            // }
        };
        var loadthemeOld = function () {
            uniLib.ResUtils.getTheme(param.thmConfig, function () {
                loadedthm();
            }, function () {
                if (egret.Capabilities.engineVersion < "5.1.0") {
                    uniLib.TipsUtils.showConfirm("chessCommon 皮肤初始化失败,是否重试？取消将返回大厅", "提示", "确定", loadthemeOld);
                }
                else {
                    loadthmeNew();
                }
            }, this, "", "content");
        };
        var loadthmeNew = function () {
            uniLib.ResUtils.getTheme(param.resConfig.substring(0, param.resConfig.lastIndexOf("\/") + 1) + param.gameEui, function () {
                loadedthm();
            }, function () {
                if (window["DEBUG"]) {
                    console.error("找不到游戏的gameEui文件,请检查该游戏引擎是否已经升级到5.1.x以上版本！！！");
                    loadthemeOld();
                }
                else {
                    uniLib.TipsUtils.showConfirm("chessCommon 皮肤初始化失败,是否重试？取消将返回大厅", "提示", "确定", loadthmeNew);
                }
            }, this);
        };
        var loadedres = function (event) {
            resLoaded = true;
            if (param.thmConfig && param.thmConfig != "") {
                if (egret.Capabilities.engineVersion < "5.1.0") {
                    loadthemeOld();
                }
                else {
                    if (window && window["JSONParseClass"] != undefined) {
                        loadthmeNew();
                    }
                    else {
                        loadthemeOld();
                    }
                }
                // } else {
                // 	loadthm();
                // }
            }
            else {
                thmLoaded = true;
            }
            if (thmLoaded == true) {
                callBack.call(thisObj);
            }
        };
        // let loadthm = function () {
        // 	uniLib.ResUtils.getTheme(param.thmConfig, loadedthm, () => {
        // 		ModuleMgr.getInstance().showConfirm("chessCommon thm 初始化失败,是否重试？", "提示", "确定", loadthm);
        // 	}, thisObj);
        // }
        console.log("## chessConfig ##" + param.resConfig + ":" + param.resRoot);
        uniLib.ResLoadMgr.instance.loadConfig(param.resConfig, param.resConfig.substring(0, param.resConfig.lastIndexOf("\/") + 1), loadedres, thisObj); //这里需要加入加载失败回调时切换cdn处理
        uniLib.Global.addEventListener(uniLib.ZqEvent.NATIVE_TO_EGERET, this.onExiteGame, this); //返回键统一处理
    }
    chessCommonLib.init = init;
    function onExiteGame(e) {
        //资源还没有加载完成的时候不响应返回按钮
        if (!chessCommonLib.ConfigMgr.getInstance().tableInited()) {
            return;
        }
        var data = e.param;
        if (data.cmd == uniLib.ZQGameSdk.EXITGAME && !_msgAdd) {
            _msgAdd = true;
            var okTxt = "退出";
            var calTxt = "取消";
            if (!chessCommonLib.LoadGameTipUtil.showExitConfrimTxt) {
                okTxt = " ";
                calTxt = " ";
            }
            var msg = new uniLib.MsgBox(chessCommonLib.LoadGameTipUtil.ExitTipText, "提示", okTxt, function () { uniLib.ZQGameSdk.exit(); _msgAdd = false; }, calTxt, function () { _msgAdd = false; });
            uniLib.PopUpMgr.addPopUp(msg, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }
    }
    chessCommonLib.onExiteGame = onExiteGame;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**eui组件的父类 */
var chessCommonLib;
(function (chessCommonLib) {
    var BaseEuiPanel = /** @class */ (function (_super) {
        __extends(BaseEuiPanel, _super);
        function BaseEuiPanel(title, width, height, skin) {
            var _this = _super.call(this) || this;
            _this._commonPanel = new chessCommonLib.CommonPanel(title, width, height, skin);
            return _this;
        }
        BaseEuiPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addChildAt(this._commonPanel, 0);
            this.initUI();
            this.addEvent();
        };
        //初始化
        BaseEuiPanel.prototype.initUI = function () {
        };
        /**事件监听 */
        BaseEuiPanel.prototype.addEvent = function () {
        };
        BaseEuiPanel.prototype.removeEvent = function () {
        };
        BaseEuiPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return BaseEuiPanel;
    }(eui.Component));
    chessCommonLib.BaseEuiPanel = BaseEuiPanel;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var CommonPanel = /** @class */ (function (_super) {
        __extends(CommonPanel, _super);
        function CommonPanel(title, width, height, skin) {
            var _this = _super.call(this) || this;
            if (skin)
                _this.skinName = skin;
            else
                _this.skinName = CommonPanel.exml;
            _this._titleStr = title;
            _this._width = width;
            _this._height = height;
            return _this;
        }
        CommonPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
            this.addEvent();
        };
        CommonPanel.prototype.initUI = function () {
            if (this._width)
                this.width = this._width;
            if (this._height)
                this.height = this._height;
            if (this._titleStr) {
                if (RES.getRes(this._titleStr)) {
                    this._title.source = this._titleStr;
                }
                else if (RES.getRes(this._titleStr + "_png")) {
                    this._title.source = this._titleStr + "_png";
                }
                else if (RES.getRes(this._titleStr + "_jpg")) {
                    this._title.source = this._titleStr + "_jpg";
                }
            }
            // this._closeBtn.x = this._panelBg.width - this._closeBtn.width;
        };
        CommonPanel.prototype.addEvent = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        CommonPanel.prototype.removeEvent = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.btnClick, this);
        };
        CommonPanel.prototype.destroy = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        CommonPanel.prototype.btnClick = function (evt) {
            switch (evt.target) {
                case this._closeBtn:
                    /**调用unilib的removePop会自动调用基类中的destroy方法 */
                    uniLib.PopUpMgr.removePopUp(this.parent);
                    break;
            }
        };
        CommonPanel.setDefaultSkin = function (skin) {
            CommonPanel.exml = skin;
        };
        CommonPanel.exml = "chessCommonLib.CommonPanelSkin";
        return CommonPanel;
    }(eui.Component));
    chessCommonLib.CommonPanel = CommonPanel;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var SysMsgImportant = /** @class */ (function (_super) {
        __extends(SysMsgImportant, _super);
        function SysMsgImportant(isHundred) {
            var _this = _super.call(this) || this;
            _this._noticeArr = [];
            _this._isHundred = true;
            _this._isDestroy = false;
            _this.visible = false;
            _this.skinName = "chessCommonLib.SysMsgMcSkin";
            return _this;
        }
        SysMsgImportant.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        SysMsgImportant.prototype.initUI = function () {
            this._buffer = 30;
            this.touchEnabled = false;
            this.touchChildren = true;
            this._worldchat.visible = false;
            uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
            this._msgContain = new egret.DisplayObjectContainer();
            this._msgContain.x = 10;
            this._msgContain.y = 7;
            this.addChild(this._msgContain);
            this._msgContain.scrollRect = new egret.Rectangle(0, 0, 540, 25);
            this._noticePanel = new egret.DisplayObjectContainer();
            this._msgContain.addChild(this._noticePanel);
            this._msgTxt = this.createTextFeild();
            this._noticePanel.addChild(this._msgTxt);
            this._vipIcon.parent.removeChild(this._vipIcon);
            this._noticePanel.addChild(this._vipIcon);
            this._noticeArr = [];
            // this._msgTxt.scrollRect = new egret.Rectangle(0, 0, 540, 25);
            /********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
            // var self = this;
            // setTimeout(function () {
            // 	self.noticeTest();
            // }, 200);
        };
        SysMsgImportant.prototype.removeListen = function () {
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
        };
        SysMsgImportant.prototype.clickHandle = function (evt) {
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SYSMSG_CLICK);
        };
        SysMsgImportant.prototype.setDefaultMsg = function (msg) {
            this._defaultMsg = msg;
            this.noticeTest();
        };
        SysMsgImportant.prototype.setLoop = function (value) {
            this._loop = value;
        };
        SysMsgImportant.prototype.noticeTest = function () {
            if (!this._msgTxt || !chessCommonLib.ConfigMgr.getInstance().gameOptions.notice) {
                return;
            }
            if (this._defaultMsg) {
                var notice = new Pmd.CommonChatUserPmd_CS();
                notice.info = this._defaultMsg;
                notice.name = "系统公告";
                this._noticeArr.push(notice);
                this.visible = true;
                this.scrollNext();
            }
        };
        SysMsgImportant.prototype.startScroll = function () {
            egret.Tween.removeTweens(this._noticePanel);
            this._noticePanel.x = 540 + this._buffer;
            var w = this._noticePanel.width < 540 ? 540 : this._noticePanel.width;
            egret.Tween.get(this._noticePanel).to({ x: -(this._noticePanel.width + this._buffer) }, 10 * (w + this._buffer)).call(this.scrollNext, this);
        };
        SysMsgImportant.prototype.scrollNext = function () {
            if (this._noticeArr.length > 0) {
                this.operateText(this._noticeArr.shift());
                this.startScroll();
            }
            else {
                if (this._loop) {
                    this.noticeTest();
                }
                else {
                    this.scrollEnd();
                }
            }
        };
        SysMsgImportant.prototype.scrollEnd = function () {
            egret.Tween.removeTweens(this._noticePanel);
            this.visible = false;
        };
        SysMsgImportant.prototype.onNoticeCome = function (e) {
            var notice = e.param;
            this._noticeArr.push(notice);
            if (!this.visible) {
                this.visible = true;
            }
            this.scrollNext();
        };
        SysMsgImportant.prototype.operateText = function (notice) {
            var str = notice.info;
            var strArr = str.split("@!$#%^");
            var strUIR = decodeURIComponent(strArr[0]);
            var color = 0xFF00EE; //字体颜色 人物喇叭和系统公告不一样
            if (strArr.length > 1 && !isNaN(Number(strArr[1]))) {
                this._vipIcon.visible = true;
                this._vipIcon.source = "vip_small" + Number(strArr[1]) + "_png";
                this._vipIcon.x = 0;
                this._noticePanel.addChild(this._vipIcon);
                this._msgTxt.x = this._vipIcon.x + this._vipIcon.width - 10;
                color = 0xffff7e;
            }
            else {
                this._vipIcon.visible = false;
                this._msgTxt.x = 0;
            }
            this._noticePanel.addChild(this._msgTxt);
            this._msgTxt.textFlow = new Array({ text: "【" + notice.name + "】：", style: { "textColor": color } }, { text: strUIR });
            // this._noticePanel.$invalidate(true);
        };
        SysMsgImportant.prototype.destroy = function () {
            if (this._isDestroy)
                return;
            this._isDestroy = true;
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
            this.scrollEnd();
            this._msgTxt = null;
            this._noticeArr = null;
            this._msgContain = null;
            this._vipIcon = null;
            this._noticePanel = null;
        };
        SysMsgImportant.prototype.createTextFeild = function () {
            var tf = new egret.TextField();
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xffffff;
            tf.textAlign = egret.HorizontalAlign.LEFT;
            tf.size = 24;
            tf.multiline = false;
            tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            return tf;
        };
        return SysMsgImportant;
    }(eui.Component));
    chessCommonLib.SysMsgImportant = SysMsgImportant;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var SysMsgMc = /** @class */ (function (_super) {
        __extends(SysMsgMc, _super);
        function SysMsgMc(isHundred) {
            var _this = _super.call(this) || this;
            _this._noticeArr = [];
            _this._isDestroy = false;
            _this._isHundred = true;
            if (isHundred != undefined)
                _this._isHundred = isHundred;
            _this.visible = false;
            _this.skinName = "chessCommonLib.SysMsgMcSkin";
            return _this;
        }
        SysMsgMc.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.initUI();
        };
        SysMsgMc.prototype.initUI = function () {
            this._buffer = 30;
            this.touchEnabled = false;
            this.touchChildren = true;
            if (chessCommonLib.ConfigMgr.getInstance().gameOptions.notice) {
                uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_GM, this.onNoticeCome, this);
                uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_SYSTEM, this.onNoticeCome, this);
                uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_HORN, this.onNoticeCome, this);
                uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
                if (uniLib.Global.isInGame) {
                    if (this._isHundred)
                        uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_HUNDRED, this.onNoticeCome, this);
                    else
                        uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_COMMONGAME, this.onNoticeCome, this);
                }
                else {
                    uniLib.Global.addEventListener(uniLib.ZqEvent.CHAT_LOBBY, this.onNoticeCome, this);
                }
            }
            SysMsgMc.isShowWorldChat = chessCommonLib.ConfigMgr.getInstance().gameOptions.horn;
            if (SysMsgMc.isShowWorldChat)
                this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandle, this);
            this._worldchat.visible = SysMsgMc.isShowWorldChat;
            this._msgContain = new egret.DisplayObjectContainer();
            this._msgContain.x = 10;
            this._msgContain.y = 7;
            this.addChild(this._msgContain);
            this._msgContain.scrollRect = new egret.Rectangle(0, 0, 540, 25);
            this._noticePanel = new egret.DisplayObjectContainer();
            this._msgContain.addChild(this._noticePanel);
            this._msgTxt = this.createTextFeild();
            this._noticePanel.addChild(this._msgTxt);
            this._vipIcon.parent.removeChild(this._vipIcon);
            this._noticePanel.addChild(this._vipIcon);
            this._noticeArr = [];
            // this._msgTxt.scrollRect = new egret.Rectangle(0, 0, 540, 25);
            /********返回大厅的时候tween被游戏都移除了，延迟一会显示 */
            // var self = this;
            // setTimeout(function () {
            // 	self.noticeTest();
            // }, 200);
        };
        SysMsgMc.prototype.removeListen = function () {
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_GM, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_HORN, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_COMMONGAME, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_SYSTEM, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_LOBBY, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_HUNDRED, this.onNoticeCome, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandle, this);
        };
        SysMsgMc.prototype.clickHandle = function (evt) {
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SYSMSG_CLICK);
        };
        SysMsgMc.prototype.setDefaultMsg = function (msg) {
            this._defaultMsg = msg;
            this.noticeTest();
        };
        SysMsgMc.prototype.setLoop = function (value) {
            this._loop = value;
        };
        SysMsgMc.prototype.noticeTest = function () {
            if (!this._msgTxt || !chessCommonLib.ConfigMgr.getInstance().gameOptions.notice) {
                return;
            }
            if (this._defaultMsg) {
                var notice = new Pmd.CommonChatUserPmd_CS();
                notice.info = this._defaultMsg;
                notice.name = "系统公告";
                this._noticeArr.push(notice);
                this.visible = true;
                this.scrollNext();
            }
        };
        SysMsgMc.prototype.startScroll = function () {
            egret.Tween.removeTweens(this._noticePanel);
            this._noticePanel.x = 540 + this._buffer;
            var w = this._noticePanel.width < 540 ? 540 : this._noticePanel.width;
            egret.Tween.get(this._noticePanel).to({ x: -(this._noticePanel.width + this._buffer) }, 10 * (w + this._buffer)).call(this.scrollNext, this);
        };
        SysMsgMc.prototype.scrollNext = function () {
            if (this._noticeArr.length > 0) {
                this.operateText(this._noticeArr.shift());
                this.startScroll();
            }
            else {
                if (this._loop) {
                    this.noticeTest();
                }
                else {
                    this.scrollEnd();
                }
            }
        };
        SysMsgMc.prototype.scrollEnd = function () {
            egret.Tween.removeTweens(this._noticePanel);
            this.visible = false;
        };
        SysMsgMc.prototype.onNoticeCome = function (e) {
            var notice = e.param;
            console.log("notice：" + notice);
            this._noticeArr.push(notice);
            if (!this.visible) {
                this.visible = true;
            }
            this.scrollNext();
        };
        SysMsgMc.prototype.operateText = function (notice) {
            var str = notice.info;
            var strArr = str.split("@!$#%^");
            var strUIR = decodeURIComponent(strArr[0]);
            var color = 0xFF00EE; //字体颜色 人物喇叭和系统公告不一样
            if (strArr.length > 1 && !isNaN(Number(strArr[1]))) {
                this._vipIcon.visible = true;
                this._vipIcon.source = "vip_small" + Number(strArr[1]) + "_png";
                this._vipIcon.x = 0;
                this._noticePanel.addChild(this._vipIcon);
                this._msgTxt.x = this._vipIcon.x + this._vipIcon.width - 10;
                if (Number(strArr[1]) == 9)
                    color = 0xff0000;
                else
                    color = 0xffffff;
            }
            else {
                this._vipIcon.visible = false;
                this._msgTxt.x = 0;
            }
            this._noticePanel.addChild(this._msgTxt);
            this._msgTxt.textFlow = new Array({ text: "【" + notice.name + "】：", style: { "textColor": color } }, { text: strUIR });
            // this._noticePanel.$invalidate(true);
        };
        SysMsgMc.prototype.destroy = function () {
            if (this._isDestroy)
                return;
            this._isDestroy = true;
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_GM, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_HORN, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_COMMONGAME, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_SYSTEM, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_LOBBY, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_IMPORTANT, this.onNoticeCome, this);
            uniLib.Global.removeEventListener(uniLib.ZqEvent.CHAT_HUNDRED, this.onNoticeCome, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.clickHandle, this);
            this.scrollEnd();
            this._msgTxt = null;
            this._noticeArr = null;
            this._msgContain = null;
            this._vipIcon = null;
            this._noticePanel = null;
        };
        SysMsgMc.prototype.createTextFeild = function () {
            var tf = new egret.TextField();
            tf.fontFamily = "Microsoft YaHei";
            tf.textColor = 0xffffff;
            tf.textAlign = egret.HorizontalAlign.LEFT;
            tf.size = 24;
            tf.multiline = false;
            tf.verticalAlign = egret.VerticalAlign.MIDDLE;
            return tf;
        };
        SysMsgMc.isShowWorldChat = true;
        return SysMsgMc;
    }(eui.Component));
    chessCommonLib.SysMsgMc = SysMsgMc;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @author garr
 */
var chessCommonLib;
(function (chessCommonLib) {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    var chatComponent = /** @class */ (function (_super) {
        __extends(chatComponent, _super);
        function chatComponent(data) {
            var _this = _super.call(this) || this;
            _this.str = "";
            _this.offsetX = 0;
            _this.offsetY = 0;
            /**是否换行 */
            _this.isMutiLine = false;
            /**当前行所占用宽度 */
            _this.inlineWidth = [0, 0, 0, 0, 0, 0];
            _this.data = data;
            _this.touchEnabled = false;
            _this.touchChildren = false;
            _this.init();
            console.error("this.chatComponent", _this.data);
            return _this;
        }
        chatComponent.prototype.init = function () {
            this.emoj = new egret.Sprite();
            this.emoj.x = 5;
            this.emoj.y = 3;
            this.addChild(this.emoj);
            this._MaxWidth = 1200;
        };
        /**
         * @param length 一行的宽度，需要显示指定,不指定默认720
         */
        chatComponent.prototype.showContent = function (length) {
            if (length === void 0) { length = 720; }
            if (!this.emoj) {
                this.emoj = new egret.Sprite();
                this.emoj.x = 10;
                this.addChild(this.emoj);
            }
            this._MaxWidth = length;
            this.emojArr = [];
            this.textArr = [];
            this.contentArr = [];
            //初始化当前高度，即所在行
            this._height = 1;
            var patt1 = /\([^\(\)]*\)/g;
            var _content = this.data;
            //这部分拼接，是将最前面vip等级图标，加自己带颜昵称，全部拼一起，，并且使用()将昵称与后面内容分割因为**需求
            _content = this.data;
            var text = _content.match(patt1);
            //这里分割出图片表情数组
            if (Array.isArray(text)) {
                for (var i = 0; i < text.length; i++) {
                    var num = Number(text[i].substring(1, text[i].length - 1));
                    this.emojArr.push(num);
                }
            }
            var content = _content.replace(/\([^\(\)]*\)/g, "/,");
            //这里分割出文本数组
            var text1 = content.split("/,");
            //textArr只是在dubug时候用来进行测试作用
            this.textArr = content.split("/,");
            uniLib.DisplayUtils.removeAllChildren(this.emoj);
            // window.performance.mark("mark_start_resize");
            //格式化输入内容
            this.formatTxt(text1, this.emojArr);
            //存储每一行已经显示的宽度数值
            var width = [];
            //通过formatTxt执行后生成每一行的具体内容，这里通过循环显示每一行内容
            for (var i = 1; i < this.contentArr.length; i++) {
                //获取第i行所有内容
                var _chatArray = this.contentArr[i];
                for (var k = 0; k < _chatArray.length; k++) {
                    var _chatItem = _chatArray[k];
                    //由于刷新问题，有些行content会是undefined，这里过滤
                    if (!_chatItem.content)
                        continue;
                    var item = this.getContent(_chatItem);
                    if (_chatItem.type == 1) {
                    }
                    item.y = (i - 1) * 32;
                    if (!width[_chatItem.line]) {
                        width[_chatItem.line] = 0;
                    }
                    item.x = width[_chatItem.line];
                    width[_chatItem.line] = width[_chatItem.line] + item.width;
                    this.emoj.addChild(item);
                }
            }
            return this.emoj;
            //****************  计算下时间*/
            // window.performance.mark("mark_end_resize");
            // window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
            // var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
            // console.error("Time to caul: " + timeToResize[timeToResize.length - 1].duration + "ms");
            //**************** */
        };
        /**传入分割好的字符串数组和图片表情数组
         * 根据分割规则，字符串数组每个元素和图片表情数组是通过插入合并
         * eg 字符串数组：[1,3,5]
         *    图片表情数组 [2,4,6]
         *    合并产生完成内容 [1,2,3,4,5,6]
         */
        chatComponent.prototype.formatTxt = function (strArr, emojArr) {
            for (var i = 0; i < strArr.length; i++) {
                //用来判断当前循环中，是否产生了字符串太长而分割，同时标记换行
                var isSlice = false;
                //以文本对象作为测量基准
                var test = new chessCommonLib.ChatWordItem(strArr[i]);
                //按照之前表情和字符串分割，每个字符串后面跟一个表情，这里生成下一个要显示的表情，用于宽度计算从而对当前行文本内容进行控制
                var emojTest;
                var emojWidth = 0;
                if (emojArr[i]) {
                    var resName = this.getRes(Number(emojArr[i]));
                    emojTest = new chessCommonLib.ChatImageItem(resName);
                    emojWidth = emojTest.width;
                    emojTest.destory();
                }
                //这里进行字符串拆分，为可能的换行分割准备
                var _text = strArr[i].split("");
                //记录当产生换行时候，字符串分割的位置
                var index = 0;
                var _text3 = ""; //临时保存test文本内容，为了处理一段带有颜色的话被换行导致前半部分没有颜色
                //判断当前文本加上当前行已经占用的宽度，是否超出了当前行最大宽度，来进行换行
                while (test.width + this.inlineWidth[this._height] > this._MaxWidth) {
                    var _text2 = _text;
                    _text2.length = _text2.length - 1;
                    index = _text2.length;
                    test.destory();
                    test = new chessCommonLib.ChatWordItem(_text2.join(""));
                    _text3 = _text2.join("");
                    isSlice = true;
                }
                /**这里用于处理：当一段被标记颜色的文本因为换行，导致前面一段文本丢失了颜色的情况
                 * 例如  abcdegd<1>
                 * 分割后  "abcd"   "egd<1>"
                 * 这时候前面一段丢失了颜色标记<1>  暂时注释，需要测试验证所有情况
                 * @param _text3
                 */
                if (isSlice) {
                    var reg1 = strArr[i].match(/(<\w{1}>)/g);
                    if (reg1) {
                        var str = strArr[i].replace(/<\w{1}>/g, "/,");
                        var text1 = str.split("/,");
                        var temp1 = _text3.replace(/<\w{1}>/g, "/,").split("/,");
                        var index1 = void 0;
                        for (var i_1 = 0; i_1 < text1.length; i_1++) {
                            if (text1[i_1].indexOf(temp1[temp1.length - 1]) != -1) {
                                index1 = i_1;
                            }
                        }
                        test = new chessCommonLib.ChatWordItem(_text3 + reg1[index1]);
                    }
                }
                /**---------------end---------------- */
                //分割后剩余字符串
                var remain = strArr[i].slice(index);
                if (!this.contentArr[this._height]) {
                    this.contentArr[this._height] = [];
                }
                //将处理后 当前行内容放进来，此时test内容分割后不会超出当前行的
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test.width;
                this.contentArr[this._height].push(new chatItem(this._height, test.$children[0]["text1"], test.width, 1));
                //当前文本产生换行的时候，对remain进行处理
                if (isSlice) {
                    this.textArr.splice(i + 1, 0, remain);
                    var tempArr = remain.split("");
                    var tempTest = new chessCommonLib.ChatWordItem(remain);
                    //如果换行后剩余的文本仍然超出一行显示的范围。
                    if (tempTest.width > this._MaxWidth) {
                        //算出单个字符的长度，转换成英文字符计算量
                        //按照单个字符长度对剩余字符串数组进行等量分割。
                        var sliceArr = this.sliceArray(tempArr);
                        //对分出的每个再进行处理
                        for (var i_2 = 0; i_2 < sliceArr.length; i_2++) {
                            this._height = this._height + 1;
                            if (!this.contentArr[this._height]) {
                                this.contentArr[this._height] = [];
                            }
                            var test2 = new chessCommonLib.ChatWordItem(sliceArr[i_2].join(""));
                            this.contentArr[this._height].push(new chatItem(this._height, sliceArr[i_2].join(""), test2.width, 1));
                            this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                        }
                    }
                    else {
                        this._height = this._height + 1;
                        var test2 = new chessCommonLib.ChatWordItem(remain);
                        if (!this.contentArr[this._height]) {
                            this.contentArr[this._height] = [];
                        }
                        this.contentArr[this._height].push(new chatItem(this._height, remain, test2.width, 1));
                        this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                    }
                }
                //-------------添加文本后面的图片表情
                //如果此时添加表情刚好超出本行
                if (this.inlineWidth[this._height] + emojWidth > this._MaxWidth) {
                    this._height = this._height + 1;
                    if (!this.contentArr[this._height]) {
                        this.contentArr[this._height] = [];
                    }
                }
                this.contentArr[this._height].push(new chatItem(this._height, emojArr[i], emojWidth, 2));
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + emojWidth;
                if (test) {
                    test.destory();
                }
            }
        };
        chatComponent.prototype.toNumber = function (data) {
            if (!data) {
                return 0;
            }
            return Number(data);
        };
        /*
   * 将一个数组分成几个同等长度的数组
   * array[分割的原数组]
   * size[每个子数组的长度]
   */
        chatComponent.prototype.sliceArray = function (array) {
            //分别获取大端和小端的宽度
            // this.log();
            var _width = 0;
            var result = [];
            var tempArr = array;
            var index = 0;
            for (var i = 0; i < array.length; i++) {
                _width = _width + new chessCommonLib.ChatWordItem(array[i]).width;
                if (_width >= this._MaxWidth) {
                    _width = 0;
                    result.push((tempArr.slice(0, i - index + 1)));
                    index = i;
                    tempArr = array.slice(i + 1, array.length);
                }
                if (i == (array.length - 1)) {
                    result.push(tempArr.slice(0, i + 1));
                }
            }
            return result;
        };
        /**获取对应的内容 */
        chatComponent.prototype.getContent = function (data) {
            var item;
            if (data.type == 1) {
                var _content = this.getColor(data.content);
                // item = new ChatWordItem(data.content, parseInt(color, 16));
                item = new chessCommonLib.ChatWordItem(_content, true);
            }
            else if (data.type == 2) {
                //这里传入的是要显示的资源名字，目前只支持高度为27;如果是vip，使用min规格
                var resName = this.getRes(Number(data.content));
                item = new chessCommonLib.ChatImageItem(resName);
            }
            return item;
        };
        /**获取资源名 */
        chatComponent.prototype.getRes = function (index) {
            var str = "";
            if (index < 50) {
                str = "face_Small_" + index;
            }
            else {
                str = "min_vip" + (index - 100);
            }
            return str;
        };
        //获取颜色
        chatComponent.prototype.getColor = function (str) {
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            var content = [];
            var _color = "";
            if (str.match(/<\w{1}>/g)) {
                content = this.getHighOderColor(str);
            }
            else {
                if (str.indexOf(this._nickName) != -1 && str.indexOf(this._nickName) == 0) {
                    _color = "0xf8da94";
                    content.push({ text: str, color: _color });
                    this.getColor = function (str) {
                        str = str.replace(/(^\s*)|(\s*$)/g, "");
                        var content = [];
                        var _color = "";
                        if (str.match(/<\w{1}>/g)) {
                            content = this.getHighOderColor(str);
                        }
                        else {
                            _color = "0xf1dbf8";
                            content.push({ text: str, color: _color });
                        }
                        return content;
                    };
                }
                else {
                    _color = "0xf1dbf8";
                    content.push({ text: str, color: _color });
                }
            }
            return content;
        };
        /**获取颜色的高阶版，由服务器控制颜色输出
         * 格式为<1>
         */
        chatComponent.prototype.getHighOderColor = function (str) {
            var colorArr = str.match(/<\w{1}>/g);
            var colorStruct = ["0xffe097", "0xf9e3ff", "0xffd200", "0x0aaee0"];
            str = str.replace(/<\w{1}>/g, "/,");
            var text1 = str.split("/,");
            var content = [];
            for (var i = 0; i < text1.length; i++) {
                var color = colorArr[i] ? colorArr[i] : "";
                content.push({ text: text1[i], color: colorStruct[Number(color[1] - 1)] });
            }
            return content;
        };
        return chatComponent;
    }(egret.Sprite));
    chessCommonLib.chatComponent = chatComponent;
    var chatItem = /** @class */ (function () {
        function chatItem(line, content, width, type) {
            this.line = line;
            this.content = content;
            this.width = width;
            this.type = type;
        }
        return chatItem;
    }());
})(chessCommonLib || (chessCommonLib = {}));

/**
 *
 * @author
 *
 */
var chessCommonLib;
(function (chessCommonLib) {
    var ChatEventConsts = /** @class */ (function () {
        function ChatEventConsts() {
        }
        ChatEventConsts.SEND_SMILEY = "send_smiley";
        /**聊天信息初始化 */
        ChatEventConsts.CHAT_INIT = "chat_init";
        /**新的世界聊天信息广播 */
        ChatEventConsts.WORLD_MSG = "world_msg";
        /**新的聊天信息广播游戏内 */
        ChatEventConsts.WORLD_MSG_INGAME = "world_msg_ingame";
        /**新的世界聊天信息对自己 */
        ChatEventConsts.WORLD_MSG_SELF = "world_msg_self";
        /**新的世界聊天信息对自己失败 */
        ChatEventConsts.WORLD_MSG_SELF_FAIL = "world_msg_self_fail";
        return ChatEventConsts;
    }());
    chessCommonLib.ChatEventConsts = ChatEventConsts;
    var ZhiMaEventConsts = /** @class */ (function () {
        function ZhiMaEventConsts() {
        }
        /**获取个人信息 */
        ZhiMaEventConsts.GET_USERINFO = "get_userinfo";
        /**送礼 */
        ZhiMaEventConsts.SEND_GIFT_NOTICE = "send_gift_notice";
        /**语音 */
        ZhiMaEventConsts.VOICE_NOTICE = "voice_notice";
        /**录音时间到 */
        ZhiMaEventConsts.RECORD_TIME_OUT = "RECORD_TIME_OUT"; //录音时间到
        /**发送录音 */
        ZhiMaEventConsts.SEND_RECORD = "SEND_RECORD"; //发送录音
        return ZhiMaEventConsts;
    }());
    chessCommonLib.ZhiMaEventConsts = ZhiMaEventConsts;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @author
 *
 */
var chessCommonLib;
(function (chessCommonLib) {
    var ChatEventDispatcher = /** @class */ (function (_super) {
        __extends(ChatEventDispatcher, _super);
        function ChatEventDispatcher() {
            return _super.call(this) || this;
        }
        Object.defineProperty(ChatEventDispatcher, "instance", {
            get: function () {
                if (!this._instance) {
                    this._instance = new ChatEventDispatcher();
                }
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        return ChatEventDispatcher;
    }(egret.EventDispatcher));
    chessCommonLib.ChatEventDispatcher = ChatEventDispatcher;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var CommonVariable = /** @class */ (function () {
        function CommonVariable() {
            /**传入需要的socketName数组，游戏一般需要同
             * 时传入uniLib和大厅模块名，大厅一般只需要传入对应的module名
             * 按照[0]是游戏内，[1]是大厅socket的顺序，
             * 当是大厅，则[0]是大厅，[1]不需要
            */
            this.socketName = ["SZLobby", "uniLib"];
            /**是否显示急速夺宝 */
            this.showTreasure = true;
            /**否显示时时彩 */
            this.showSsc = true;
            /**下注限制的判断 */
            this.betLimit = false;
            /**是否被禁言 */
            this.isForbidden = false;
            this.init();
        }
        CommonVariable.getInstance = function () {
            if (!this.instance) {
                this.instance = new CommonVariable();
            }
            return this.instance;
        };
        CommonVariable.prototype.init = function () {
            this.ExmlMap = {};
            this.ExmlMap.noSeatExml = "chessCommonLib.UserListSkin";
            this.ExmlMap.noSeatItemExml = "chessCommonLib.UserListItemSkin";
            this.ExmlMap.chatExml = "chessCommonLib.ChatListSkin";
            this.ExmlMap.chatItemExml = "chessCommonLib.ChatListItemSkin";
        };
        // /**
        //  * @description 设置皮肤主题
        //  * @param {string} 想要设置的皮肤key，配置在readme、
        //  * @param {string} 对应的皮肤类名
        //  */
        // private setEXML(key: string, exmlClass: string) {
        //     this.ExmlMap[key] = exmlClass;
        // }
        /**
         * 字符串长度处理
         * @param {string}
         */
        CommonVariable.handleString = function (str, len) {
            if (len === void 0) { len = 6; }
            var name = str;
            var strLength;
            while (this.getStrRealLength(name) > len) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            return name;
        };
        /**
         * 获取字符串实际长度
         * @param {string}
         */
        CommonVariable.getStrRealLength = function (str) {
            return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length); //先把中文替换成两个字节的英文，在计算长度
        };
        /**数组的push重写 */
        CommonVariable.add = function (data, arr) {
            if (!Array.isArray(arr))
                return;
            while (arr.length > 40) {
                arr.shift();
            }
            arr.push(data);
        };
        /**下注时候判断是否能够下注
    * @param userInfo  用户信息
    * @param callBack  不能下注时候的回调
    * originPlatId  是原始微信登陆后再绑定手机号的情况
    *
    */
        CommonVariable.prototype.betHandle = function (userInfo, callBack) {
            return new Promise(function (resolve, reject) {
                var myBaseInfo = chessCommonLib.CommonVariable.getInstance().selfUserInfo;
                if (myBaseInfo.platId != 152 &&
                    myBaseInfo.platId != 264 &&
                    chessCommonLib.CommonVariable.getInstance().selfUserInfo["originPlatId"] != 152 &&
                    myBaseInfo.vip < 1) {
                    this.betLimit = true;
                    reject();
                }
                else {
                    resolve();
                }
            });
        };
        return CommonVariable;
    }());
    chessCommonLib.CommonVariable = CommonVariable;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @author
 */
var chessCommonLib;
(function (chessCommonLib) {
    var LobbyChatFaceComponent = /** @class */ (function (_super) {
        __extends(LobbyChatFaceComponent, _super);
        function LobbyChatFaceComponent() {
            var _this = _super.call(this) || this;
            _this.sTime = 0;
            //点击记录
            _this.startX = 0;
            _this.movX = 0;
            //是否需要移动
            _this.isMove = false;
            _this.page = 0;
            _this.timeBo = true;
            _this.jianTime = 0;
            //单页面最大距离
            _this.pagWidth = 888;
            _this.maxPag = 2;
            _this.bo = true;
            _this.skinName = "chessCommonLib.LobbyChatFcaePanelSkin";
            _this.touchEnabled = true;
            _this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, _this.onTouchBegin, _this);
            _this.addEventListener(egret.TouchEvent.TOUCH_END, _this.onTouchEnd, _this);
            _this.scroll.addEventListener(eui.UIEvent.CHANGE_END, _this.onScrollEnd, _this);
            _this.scroll.throwSpeed = 30;
            _this.scroll.bounces = false;
            _this.init();
            return _this;
        }
        LobbyChatFaceComponent.prototype.init = function () {
            var faceArr1 = [];
            var faceArr2 = [];
            for (var i = 1; i <= 27; i++) {
                faceArr1.push(i);
            }
            for (var i = 28; i <= 48; i++) {
                faceArr2.push(i);
            }
            this.faceList.itemRenderer = chessCommonLib.LobbyChatFaceItem;
            this.arrCol1 = new eui.ArrayCollection(faceArr1);
            this.faceList.dataProvider = this.arrCol1;
            this.faceList1.itemRenderer = chessCommonLib.LobbyChatFaceItem;
            this.arrCol2 = new eui.ArrayCollection(faceArr2);
            this.faceList1.dataProvider = this.arrCol2;
            this.pointHandle(this.page);
        };
        LobbyChatFaceComponent.prototype.moveStar = function (timeStamp) {
            if (this.timeBo == true) {
                this.jianTime = timeStamp;
                this.timeBo = false;
            }
            this.sTime = timeStamp - this.jianTime;
            return false;
        };
        LobbyChatFaceComponent.prototype.onTouchEnd = function (e) {
            this.scroll.stopAnimation();
        };
        LobbyChatFaceComponent.prototype.onTouchBegin = function (e) {
            egret.startTick(this.moveStar, this);
            this.startX = this.scroll.viewport.scrollH;
        };
        LobbyChatFaceComponent.prototype.onScrollEnd = function () {
            this.movX = this.scroll.viewport.scrollH;
            var self = this;
            if (self.bo == false)
                return;
            self.bo = false;
            egret.stopTick(self.moveStar, self);
            self.timeBo = true;
            if (self.sTime <= 500) {
                //上滑
                if (this.startX < this.movX) {
                    self.page++;
                }
                else if (this.startX == this.movX) {
                }
                else {
                    if (self.page == 0) {
                        self.MovePanel();
                        return;
                    }
                    self.page--;
                }
            }
            else {
                if (this.startX < this.movX) {
                    if (this.movX - this.startX > this.pagWidth / 2) {
                        this.page++;
                    }
                    else {
                        self.MovePanel();
                        return;
                    }
                }
                else if (this.startX > this.movX) {
                    if (this.startX - this.movX > this.pagWidth / 2) {
                        this.page--;
                    }
                    else {
                        self.MovePanel();
                        return;
                    }
                }
            }
            self.MovePanel();
        };
        LobbyChatFaceComponent.prototype.test = function () {
            this.bo = true;
        };
        LobbyChatFaceComponent.prototype.MovePanel = function () {
            var _this = this;
            if (this.page < 0)
                return;
            if (this.page >= this.maxPag) {
                this.page = this.maxPag - 1;
            }
            this.pointHandle(this.page);
            egret.Tween.get(this.scroll.viewport, { loop: false })
                .to({ scrollH: this.page * this.pagWidth }, 200).call(function () { return _this.test(); }, this);
        };
        /**下方小圆点控制 */
        LobbyChatFaceComponent.prototype.pointHandle = function (page) {
            if (page == 0) {
                this.page1Point1.visible = false;
                this.page1Point2.visible = true;
                this.page2Point1.visible = true;
                this.page2Point2.visible = false;
            }
            else {
                this.page1Point1.visible = true;
                this.page1Point2.visible = false;
                this.page2Point1.visible = false;
                this.page2Point2.visible = true;
            }
        };
        return LobbyChatFaceComponent;
    }(eui.Component));
    chessCommonLib.LobbyChatFaceComponent = LobbyChatFaceComponent;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    /**进入标准场的界面 */
    //大厅更多麻将UI
    var LobbyChatFaceItem = /** @class */ (function (_super) {
        __extends(LobbyChatFaceItem, _super);
        function LobbyChatFaceItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "chessCommonLib.LobbyChatFcaeItemSkin";
            return _this;
        }
        LobbyChatFaceItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.faceIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showDetail, this);
        };
        LobbyChatFaceItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.faceIcon.source = "face_Big_" + this.data;
            this.faceid = this.data;
        };
        /**显示详情 */
        LobbyChatFaceItem.prototype.showDetail = function () {
            chessCommonLib.ChatEventDispatcher.instance.dispatchEventWith(chessCommonLib.ChatEventConsts.SEND_SMILEY, false, this.faceid);
        };
        return LobbyChatFaceItem;
    }(eui.ItemRenderer));
    chessCommonLib.LobbyChatFaceItem = LobbyChatFaceItem;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * @author garr
 *   /**
   *━━━━━━神兽出没━━━━━━
   *     ┏┓　　　┏┓
   * 　 ┏┛┻━━━┛┻┓  + +
   *
   *  　┃　　　　　　　┃
   *  　┃　　　━　　　┃ ++ + + +
   * 　  ████━████ ┃+
   *    ┃　　　　　　　┃
   *    ┃　　　┻　　　┃
   *    ┃　　　　　　┃
   * 　  ┗━┓　　　┏━┛  Code is far away from bug with the animal protecting
   *       ┃　　　┃    神兽保佑,代码无bug
   *       ┃　　　┃
   *       ┃　　　┃
   *       ┃　　　┗━━━┓
   * 　　　 ┃　　　　　　　┣┓
   *       ┃　　　　　　　┏┛
   *       ┗┓┓┏━┳┓┏┛
   *       　┃┫┫　┃┫┫
   *         ┗┻┛　┗┻┛
 */
var chessCommonLib;
(function (chessCommonLib) {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    var LobbyChatListItem = /** @class */ (function (_super) {
        __extends(LobbyChatListItem, _super);
        function LobbyChatListItem() {
            var _this = _super.call(this) || this;
            // private chat_line: eui.Image;
            _this.str = "";
            _this.offsetX = 0;
            _this.offsetY = 0;
            /**是否换行 */
            _this.isMutiLine = false;
            /**当前行所占用宽度 */
            _this.inlineWidth = [0, 0, 0, 0, 0, 0];
            _this.skinName = "chessCommonLib.LobbyChatListItemSkin";
            return _this;
        }
        LobbyChatListItem.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.emoj = new egret.Sprite();
            this.emoj.x = 10;
            this.emoj.y = 0;
            this.addChild(this.emoj);
            this._MaxWidth = this.chat_lb.width;
        };
        LobbyChatListItem.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.Nickname = this.data.nickName;
            if (this.emoj) {
                uniLib.DisplayUtils.removeAllChildren(this.emoj);
                uniLib.DisplayUtils.removeFromParent(this.emoj);
            }
            if (!this.emoj) {
                this.emoj = new egret.Sprite();
                this.emoj.x = 10;
            }
            this.addChild(this.emoj);
            this.emojArr = [];
            this.textArr = [];
            this.contentArr = [];
            //初始化当前高度，即所在行
            this._height = 1;
            var patt1 = /\([^\(\)]*\)/g;
            var _content = this.data.content;
            this._nickName = this.data.nickName;
            //这部分拼接，是将最前面vip等级图标，加自己带颜昵称，全部拼一起，，并且使用()将昵称与后面内容分割因为**需求
            if (this.data.nickName && this.data.vip != void 0) {
                _content = "(" + Number(100 + Number(this.data.vip)) + ")" + "" + this.data.nickName + ": " + "()" + this.data.content;
            }
            else {
                _content = "()" + this.data.content;
                this.data.nickName = "";
            }
            if (this.data.type && this.data.type == 1 && uniLib.Global.isInGame) {
                _content = "(49)" + _content;
            }
            // var patt1 = /^(([1-9]?\d|1\d\d|25[0-5]|24[0-9|])(\.(?!$)|$)){4}$/
            var text = _content.match(patt1);
            //这里分割出图片表情数组
            if (Array.isArray(text)) {
                for (var i = 0; i < text.length; i++) {
                    var num = Number(text[i].substring(1, text[i].length - 1));
                    this.emojArr.push(num);
                }
            }
            var content = _content.replace(/\([^\(\)]*\)/g, "/,");
            //这里分割出文本数组
            var text1 = content.split("/,");
            //textArr只是在dubug时候用来进行测试作用
            this.textArr = content.split("/,");
            // window.performance.mark("mark_start_resize");
            //格式化输入内容
            this.formatTxt(text1, this.emojArr);
            //存储每一行已经显示的宽度数值
            var width = [];
            //通过formatTxt执行后生成每一行的具体内容，这里通过循环显示每一行内容
            for (var i = 1; i < this.contentArr.length; i++) {
                //获取第i行所有内容
                var _chatArray = this.contentArr[i];
                for (var k = 0; k < _chatArray.length; k++) {
                    var _chatItem = _chatArray[k];
                    //由于刷新问题，有些行content会是undefined，这里过滤
                    if (!_chatItem.content)
                        continue;
                    var item = this.getContent(_chatItem);
                    if (_chatItem.type == 1) {
                    }
                    item.y = (i - 1) * 32;
                    if (!width[_chatItem.line]) {
                        width[_chatItem.line] = 0;
                    }
                    item.x = width[_chatItem.line];
                    width[_chatItem.line] = width[_chatItem.line] + item.width;
                    this.emoj.addChild(item);
                }
            }
            //****************  计算下时间*/
            // window.performance.mark("mark_end_resize");
            // window.performance.measure("measure_pizza_resize", "mark_start_resize", "mark_end_resize");
            // var timeToResize = window.performance.getEntriesByName("measure_pizza_resize");
            // console.error("Time to caul: " + timeToResize[timeToResize.length - 1].duration + "ms");
            //**************** */
            var vipcontent = ""; //这个下面chat_lb用来显示控制占位的
            if (this.data.vip > 0) {
                this.vipIcon.source = this.data.vip ? "mid_vip" + this.data.vip : "big_vip0";
                vipcontent = "占  占";
            }
            if (this.data.type && this.data.type == 1 && uniLib.Global.isInGame) {
                vipcontent = vipcontent + " 占";
            }
            var showcontent = vipcontent + this.data.nickName + this.data.content.replace(/\([^\(\)]*\)/g, "　 ");
            showcontent = showcontent.replace(/<\d{1}>/g, "");
            //这里的chat_lb不做显示用途，只是用来控制排版，visible=false。
            this.chat_lb.textFlow = [
                { text: showcontent + "", style: { "textColor": 0x239924 } }
            ];
            this.name_lb.text = this.data.nickName + ":";
            if (Number(this.data.vip) < 0) {
                this.vipIcon.source = "";
                this.chat_lb.text = "";
                this.name_lb.text = "";
                uniLib.DisplayUtils.removeAllChildren(this.emoj);
                uniLib.DisplayUtils.removeFromParent(this.emoj);
            }
        };
        /**传入分割好的字符串数组和图片表情数组
         * 根据分割规则，字符串数组每个元素和图片表情数组是通过插入合并
         * eg 字符串数组：[1,3,5]
         *    图片表情数组 [2,4,6]
         *    合并产生完成内容 [1,2,3,4,5,6]
         */
        LobbyChatListItem.prototype.formatTxt = function (strArr, emojArr) {
            for (var i = 0; i < strArr.length; i++) {
                //用来判断当前循环中，是否产生了字符串太长而分割，同时标记换行
                var isSlice = false;
                //以文本对象作为测量基准
                var test = new chessCommonLib.ChatWordCalculateItem(strArr[i]);
                //按照之前表情和字符串分割，每个字符串后面跟一个表情，这里生成下一个要显示的表情，用于宽度计算从而对当前行文本内容进行控制
                var emojTest;
                var emojWidth = 0;
                if (emojArr[i]) {
                    var resName = this.getRes(Number(emojArr[i]));
                    emojTest = new chessCommonLib.ChatImageItem(resName);
                    emojWidth = emojTest.width;
                    emojTest.destory();
                }
                //这里进行字符串拆分，为可能的换行分割准备
                var _text = strArr[i].split("");
                //记录当产生换行时候，字符串分割的位置
                var index = 0;
                var _text3 = ""; //临时保存test文本内容，为了处理一段带有颜色的话被换行导致前半部分没有颜色
                //判断当前文本加上当前行已经占用的宽度，是否超出了当前行最大宽度，来进行换行
                while (test.width + this.inlineWidth[this._height] > this._MaxWidth) {
                    var _text2 = _text;
                    if (!_text2.length) {
                        this.contentArr = [];
                        return;
                    }
                    _text2.length = _text2.length - 1;
                    index = _text2.length;
                    test.destory();
                    test = new chessCommonLib.ChatWordCalculateItem(_text2.join(""));
                    _text3 = _text2.join("");
                    isSlice = true;
                }
                /**这里用于处理：当一段被标记颜色的文本因为换行，导致前面一段文本丢失了颜色的情况
                 * 例如  abcdegd<1>
                 * 分割后  "abcd"   "egd<1>"
                 * 这时候前面一段丢失了颜色标记<1>  暂时注释，需要测试验证所有情况
                 * @param _text3
                 */
                /**---------------start---------------- */
                if (isSlice) {
                    var reg1 = strArr[i].match(/(<\w{1}>)/g);
                    if (reg1) {
                        var str = strArr[i].replace(/<\w{1}>/g, "/,");
                        var text1 = str.split("/,");
                        var temp1 = _text3.replace(/<\w{1}>/g, "/,").split("/,");
                        var index1 = void 0;
                        for (var i_1 = 0; i_1 < text1.length; i_1++) {
                            if (text1[i_1].indexOf(temp1[temp1.length - 1]) != -1) {
                                index1 = i_1;
                            }
                        }
                        test = new chessCommonLib.ChatWordCalculateItem(_text3 + reg1[index1]);
                    }
                }
                /**---------------end---------------- */
                //分割后剩余字符串
                var remain = strArr[i].slice(index);
                if (!this.contentArr[this._height]) {
                    this.contentArr[this._height] = [];
                }
                //将处理后 当前行内容放进来，此时test内容分割后不会超出当前行的
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test.width;
                this.contentArr[this._height].push(new chatItem(this._height, test.text1, test.width, 1));
                //当前文本产生换行的时候，对remain进行处理
                if (isSlice) {
                    this.textArr.splice(i + 1, 0, remain);
                    var tempArr = remain.split("");
                    var tempTest = new chessCommonLib.ChatWordCalculateItem(remain);
                    //如果换行后剩余的文本仍然超出一行显示的范围。
                    if (tempTest.width > this._MaxWidth) {
                        //算出单个字符的长度，转换成英文字符计算量
                        //按照单个字符长度对剩余字符串数组进行等量分割。
                        var sliceArr = this.sliceArray(tempArr);
                        //对分出的每个再进行处理
                        for (var i_2 = 0; i_2 < sliceArr.length; i_2++) {
                            this._height = this._height + 1;
                            if (!this.contentArr[this._height]) {
                                this.contentArr[this._height] = [];
                            }
                            var test2 = new chessCommonLib.ChatWordCalculateItem(sliceArr[i_2].join(""));
                            this.contentArr[this._height].push(new chatItem(this._height, sliceArr[i_2].join(""), test2.width, 1));
                            this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                        }
                    }
                    else {
                        this._height = this._height + 1;
                        var test2 = new chessCommonLib.ChatWordCalculateItem(remain);
                        if (!this.contentArr[this._height]) {
                            this.contentArr[this._height] = [];
                        }
                        this.contentArr[this._height].push(new chatItem(this._height, remain, test2.width, 1));
                        this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                    }
                }
                //-------------添加文本后面的图片表情
                //如果此时添加表情刚好超出本行
                if (this.inlineWidth[this._height] + emojWidth > this._MaxWidth) {
                    this._height = this._height + 1;
                    if (!this.contentArr[this._height]) {
                        this.contentArr[this._height] = [];
                    }
                }
                this.contentArr[this._height].push(new chatItem(this._height, emojArr[i], emojWidth, 2));
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + emojWidth;
                if (test) {
                    test.destory();
                }
            }
        };
        LobbyChatListItem.prototype.toNumber = function (data) {
            if (!data) {
                return 0;
            }
            return Number(data);
        };
        /*
   * 将一个数组分成几个同等长度的数组
   * array[分割的原数组]
   * size[每个子数组的长度]
   */
        LobbyChatListItem.prototype.sliceArray = function (array) {
            //分别获取大端和小端的宽度
            // this.log();
            var _width = 0;
            var result = [];
            var tempArr = array;
            var index = 0;
            for (var i = 0; i < array.length; i++) {
                _width = _width + new chessCommonLib.ChatWordCalculateItem(array[i]).width;
                if (_width >= this._MaxWidth) {
                    _width = 0;
                    result.push((tempArr.slice(0, i - index + 1)));
                    index = i;
                    tempArr = array.slice(i + 1, array.length);
                }
                if (i == (array.length - 1)) {
                    result.push(tempArr.slice(0, i + 1));
                }
            }
            return result;
        };
        /**获取对应的内容 */
        LobbyChatListItem.prototype.getContent = function (data) {
            var item;
            if (data.type == 1) {
                var _content = this.getColor(data.content);
                // item = new ChatWordItem(data.content, parseInt(color, 16));
                item = new chessCommonLib.ChatWordItem(_content, true);
            }
            else if (data.type == 2) {
                //这里传入的是要显示的资源名字，目前只支持高度为27;如果是vip，使用min规格
                var resName = this.getRes(Number(data.content));
                item = new chessCommonLib.ChatImageItem(resName);
            }
            return item;
        };
        /**获取资源名 */
        LobbyChatListItem.prototype.getRes = function (index) {
            var str = "";
            if (index < 50) {
                str = "face_Small_" + index;
            }
            else {
                str = "min_vip" + (index - 100);
            }
            return str;
        };
        //获取颜色
        LobbyChatListItem.prototype.getColor = function (str) {
            str = str.replace(/(^\s*)|(\s*$)/g, "");
            var content = [];
            var _color = "";
            if (str.match(/<\w{1}>/g)) {
                content = this.getHighOderColor(str);
            }
            else {
                if (str.indexOf(this._nickName) != -1 && str.indexOf(this._nickName) == 0) {
                    _color = "0xf8da94";
                    content.push({ text: str, color: _color });
                    //lazy一下
                    this.getColor = function (str) {
                        str = str.replace(/(^\s*)|(\s*$)/g, "");
                        var content = [];
                        var _color = "";
                        if (str.match(/<\w{1}>/g)) {
                            content = this.getHighOderColor(str);
                        }
                        else {
                            _color = "0xf1dbf8";
                            content.push({ text: str, color: _color });
                        }
                        return content;
                    };
                }
                else {
                    _color = "0xf1dbf8";
                    content.push({ text: str, color: _color });
                }
            }
            return content;
        };
        /**获取颜色的高阶版，由服务器控制颜色输出，后期可以配表扩充
         * 格式为<1>
         */
        LobbyChatListItem.prototype.getHighOderColor = function (str) {
            var colorArr = str.match(/<\w{1}>/g);
            var colorStruct = ["0xffe097", "0xf9e3ff", "0xffd200", "0x0aaee0"];
            str = str.replace(/<\w{1}>/g, "/,");
            var text1 = str.split("/,");
            var content = [];
            for (var i = 0; i < text1.length; i++) {
                var color = colorArr[i] ? colorArr[i] : "";
                content.push({ text: text1[i], color: colorStruct[Number(color[1] - 1)] });
            }
            return content;
        };
        return LobbyChatListItem;
    }(eui.ItemRenderer));
    chessCommonLib.LobbyChatListItem = LobbyChatListItem;
    var chatItem = /** @class */ (function () {
        function chatItem(line, content, width, type) {
            this.line = line;
            this.content = content;
            this.width = width;
            this.type = type;
        }
        return chatItem;
    }());
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    var LobbyChatListItemTemp = /** @class */ (function (_super) {
        __extends(LobbyChatListItemTemp, _super);
        function LobbyChatListItemTemp() {
            var _this = _super.call(this) || this;
            _this.str = "";
            _this.offsetX = 0;
            _this.offsetY = 0;
            /**是否换行 */
            _this.isMutiLine = false;
            /**当前行所占用宽度 */
            _this.inlineWidth = [0, 0, 0, 0, 0, 0];
            _this.skinName = "chessCommonLib.LobbyChatListItemSkin";
            return _this;
        }
        LobbyChatListItemTemp.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.emoj = new egret.Sprite();
            this.emoj.x = 17;
            this.emoj.y = 7;
            this.addChild(this.emoj);
            this._MaxWidth = this.chat_lb.width;
        };
        LobbyChatListItemTemp.prototype.dataChanged = function () {
            _super.prototype.dataChanged.call(this);
            this.Nickname = this.data.nickName;
            if (!this.emoj) {
                this.emoj = new egret.Sprite();
                this.emoj.x = 20;
                this.addChild(this.emoj);
            }
            this.emojArr = [];
            this.textArr = [];
            this.contentArr = [];
            this._height = 1;
            var patt1 = /\([^\(\)]*\)/g;
            var text = this.data.content.match(patt1);
            if (Array.isArray(text)) {
                for (var i = 0; i < text.length; i++) {
                    var num = Number(text[i].substring(1, text[i].length - 1));
                    this.emojArr.push(num);
                }
            }
            var content = this.data.content.replace(/\([^\(\)]*\)/g, "/,");
            var text1 = content.split("/,");
            this.textArr = content.split("/,");
            // console.error(">>>>>>初始化文本数组", content.split("/,"));
            // console.error(">>>>>>初始化表情数组emojArr", this.emojArr);
            // console.error(">>>>>>text", Number(text[0].substring(1,text[0].length-1)));
            uniLib.DisplayUtils.removeAllChildren(this.emoj);
            this.formatTxt(text1, this.emojArr);
            var width = [0, 0, 0, 0,];
            for (var i = 1; i < this.contentArr.length; i++) {
                //获取第i行所有内容
                var _chatArray = this.contentArr[i];
                // console.error("获取第i行所有内容",_chatArray);
                for (var k = 0; k < _chatArray.length; k++) {
                    var _chatItem = _chatArray[k];
                    // console.error("获取第i行所有内容_chatItem",_chatItem);
                    if (!_chatItem.content)
                        continue;
                    var item = this.getContent(_chatItem);
                    if (_chatItem.type == 1) {
                        // console.error("获取第i行所有内容item",item.$children[0]);
                    }
                    item.y = i * 32;
                    if (!width[_chatItem.line]) {
                        width[_chatItem.line] = 0;
                    }
                    item.x = width[_chatItem.line];
                    width[_chatItem.line] = width[_chatItem.line] + item.width;
                    this.emoj.addChild(item);
                }
            }
            if (this.data.vip > 0) {
                this.vipIcon.source = this.data.vip ? "mid_vip" + this.data.vip : "big_vip0";
            }
            var showcontent = this.data.content.replace(/\([^\(\)]*\)/g, "　 ");
            //这里的chat_lb不做显示用途，只是用来控制排版，visible=false。
            this.chat_lb.textFlow = [
                { text: showcontent + "", style: { "textColor": 0xffffff } }
            ];
            this.name_lb.text = this.data.nickName;
            if (Number(this.data.vip) < 0) {
                this.vipIcon.source = "";
                this.chat_lb.text = "";
                this.name_lb.text = "";
            }
            // console.error(">>>>>>this.chat_lb.text11", this.chat_lb.width);
            // console.error(">>>>>>this.chat_lb.textWidth", this.chat_lb.textWidth);
        };
        LobbyChatListItemTemp.prototype.formatTxt = function (strArr, emojArr) {
            //console.error("-----循环开始////////////////////////////////");
            for (var i = 0; i < strArr.length; i++) {
                //用来判断当前循环中，是否产生了字符串太长而分割，同时标记换行
                var isSlice = false;
                //以文本对象作为测量基准
                var test = new chessCommonLib.ChatWordItem(strArr[i]);
                //console.error("-----数据开始formatTxt", strArr[i], "--", test.width);
                var _text = strArr[i].split("");
                // console.error("--strArr[i].split(", _text);
                var index = 0;
                //按照之前表情和字符串分割，每个字符串后面跟一个表情
                var emojTest = void 0;
                var emojWidth = 0;
                if (emojArr[i]) {
                    emojTest = new chessCommonLib.ChatImageItem("face_Small_" + emojArr[i]);
                    emojWidth = emojTest.width;
                }
                // console.error("当前行已经占用的宽度", this.inlineWidth[this._height]);
                // console.error("行已经占用的宽度", this.inlineWidth);
                //判断当前文本加上当前行已经占用的宽度，是否超出了当前行最大宽度，来进行换行
                while (test.width + this.inlineWidth[this._height] > this._MaxWidth) {
                    var _text2 = _text;
                    _text2.length = _text2.length - 1;
                    // console.error("_text2", test.$children[0]["text"]);
                    index = _text2.length;
                    test = new chessCommonLib.ChatWordItem(_text2.join(""));
                    isSlice = true;
                }
                var remain = strArr[i].slice(index);
                var languages = [
                    { name: "最终的文本test", fileExtension: test.$children[0]["text"] },
                    { name: "分割的长度", fileExtension: index },
                    { name: "剩余的的内容", fileExtension: remain },
                ];
                if (!this.contentArr[this._height]) {
                    this.contentArr[this._height] = [];
                }
                // console.error("this.inlineWidth[this._height]", this.inlineWidth[this._height]);
                // console.error("11this.inlineWidth[this._height]", this.toNumber(this.inlineWidth[this._height]));
                // console.error("test.width", test.width);
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test.width;
                this.contentArr[this._height].push(new chatItem(this._height, test.$children[0]["text"], test.width, 1));
                //console.table(languages);
                //当前文本产生换行的时候
                if (isSlice) {
                    this.textArr.splice(i + 1, 0, remain);
                    var tempArr = remain.split("");
                    var tempTest = new chessCommonLib.ChatWordItem(strArr[i]);
                    //如果换行后剩余的文本仍然超出一行显示的范围。
                    if (tempTest.width > this._MaxWidth) {
                        //算出单个字符的长度
                        var size = Math.floor(this._MaxWidth / this.chat_lb.size);
                        //按照单个字符长度对剩余字符串数组进行等量分割。
                        var sliceArr = this.sliceArray(tempArr, size);
                        //对分出的每个再进行处理
                        for (var i_1 = 0; i_1 < sliceArr.length; i_1++) {
                            this._height = this._height + 1;
                            if (!this.contentArr[this._height]) {
                                this.contentArr[this._height] = [];
                            }
                            var test2 = new chessCommonLib.ChatWordItem(sliceArr[i_1].join(""));
                            this.contentArr[this._height].push(new chatItem(this._height, sliceArr[i_1].join(""), test2.width, 1));
                            this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                        }
                    }
                    else {
                        this._height = this._height + 1;
                        var test2 = new chessCommonLib.ChatWordItem(remain);
                        if (!this.contentArr[this._height]) {
                            this.contentArr[this._height] = [];
                        }
                        this.contentArr[this._height].push(new chatItem(this._height, remain, test2.width, 1));
                        this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + test2.width;
                    }
                }
                //-------------添加文本后面的图片表情
                //如果此时添加表情刚好超出本行
                if (this.inlineWidth[this._height] + emojWidth > this._MaxWidth) {
                    this._height = this._height + 1;
                    if (!this.contentArr[this._height]) {
                        this.contentArr[this._height] = [];
                    }
                }
                this.contentArr[this._height].push(new chatItem(this._height, emojArr[i], emojWidth, 2));
                this.inlineWidth[this._height] = this.toNumber(this.inlineWidth[this._height]) + emojWidth;
                // console.error("修正后的文本数组", this.textArr);
                console.error("目前的内容数组", this.contentArr);
            }
        };
        LobbyChatListItemTemp.prototype.toNumber = function (data) {
            if (!data) {
                return 0;
            }
            return Number(data);
        };
        /*
   * 将一个数组分成几个同等长度的数组
   * array[分割的原数组]
   * size[每个子数组的长度]
   */
        LobbyChatListItemTemp.prototype.sliceArray = function (array, size) {
            var result = [];
            for (var x = 0; x < Math.ceil(array.length / size); x++) {
                var start = x * size;
                var end = start + size;
                result.push(array.slice(start, end));
            }
            return result;
        };
        /**获取对应的内容 */
        LobbyChatListItemTemp.prototype.getContent = function (data) {
            var item;
            if (data.type == 1) {
                item = new chessCommonLib.ChatWordItem(data.content);
            }
            else if (data.type == 2) {
                item = new chessCommonLib.ChatImageItem("face_Small_" + data.content);
            }
            return item;
        };
        return LobbyChatListItemTemp;
    }(eui.ItemRenderer));
    chessCommonLib.LobbyChatListItemTemp = LobbyChatListItemTemp;
    var chatItem = /** @class */ (function () {
        function chatItem(line, content, width, type) {
            this.line = line;
            this.content = content;
            this.width = width;
            this.type = type;
        }
        return chatItem;
    }());
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    /**大厅聊天面板 */
    var LobbyChatPanel = /** @class */ (function (_super) {
        __extends(LobbyChatPanel, _super);
        function LobbyChatPanel() {
            var _this = _super.call(this) || this;
            _this.isTour = false;
            _this.once(eui.UIEvent.COMPLETE, _this.uiCompHandler, _this);
            _this.skinName = "chessCommonLib.LobbyChatPanelSkin";
            return _this;
        }
        LobbyChatPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        LobbyChatPanel.prototype.uiCompHandler = function () {
            this.chatFacePanel = new chessCommonLib.LobbyChatFaceComponent();
            this.chatFacePanel.touchEnabled = true;
            this.chatFacePanel.x = 178;
            this.chatFacePanel.y = 194;
            this.addChild(this.chatFacePanel);
            this.chatFacePanel.visible = false;
            this.touchMask.touchEnabled = false;
            this.init();
        };
        LobbyChatPanel.prototype.init = function () {
            var _this = this;
            this.chatContentLable.text = "";
            // this.chatContentLable.maxChars = 60;
            // this.chatContentLable.restrict = "^\(\)\r\n"
            this.chatContentLable.restrict = "^\r\n";
            this.chatData = [];
            this.chatList.useVirtualLayout = false;
            this.chatList.itemRenderer = chessCommonLib.LobbyChatListItem;
            this.arrCol = new eui.ArrayCollection(this.chatData);
            this.chatList.dataProvider = this.arrCol;
            // this.isInGame();
            this.chatScroll.visible = false;
            this.cartonControl(true);
            this.tempTimer2 = egret.setTimeout(function () {
                _this.getChatData();
            }, this, 200);
            this.addEvent();
            this.arrCol.removeAll();
            this.arrCol.refresh();
        };
        LobbyChatPanel.prototype.isInGame = function () {
            if (uniLib.Global.isInGame) {
                this.hornIcon.visible = false;
                this.hornNum.visible = false;
            }
        };
        /**每次弹出调用 */
        LobbyChatPanel.prototype.initView = function () {
            // this.chatData = [];
            this.chatScroll.visible = true;
            // this.getChatData();
            this.visible = true;
            // this.tempTimer = egret.setTimeout(() => {
            //     // this.chatScroll.visible = true;
            //     // this.cartonControl(false);
            // }, this, 200)
            this.BtnHandle();
        };
        LobbyChatPanel.prototype.addEvent = function () {
            this.touchMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatFaceIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chatCloseHander, this);
            this.chatSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChatMsg, this);
            this.chatContentLable.addEventListener(egret.Event.CHANGE, this.onChang, this);
            this.chatContentLable.addEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            chessCommonLib.ChatEventDispatcher.instance.addEventListener(chessCommonLib.ChatEventConsts.SEND_SMILEY, this.showFaceText, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.CHAT_INIT, this.initData, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG, this.onGetSZchatInfo, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_INGAME, this.onGetSZchatInfo, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF, this.onGetSZchatInfoself, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF_FAIL, this.selfFail, this);
        };
        LobbyChatPanel.prototype.removeEvent = function () {
            this.chatContentLable.removeEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            this.touchMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatFaceIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chatCloseHander, this);
            this.chatSend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChatMsg, this);
            this.chatContentLable.removeEventListener(egret.Event.CHANGE, this.onChang, this);
            chessCommonLib.ChatEventDispatcher.instance.removeEventListener(chessCommonLib.ChatEventConsts.SEND_SMILEY, this.showFaceText, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.CHAT_INIT, this.initData, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG, this.onGetSZchatInfo, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_INGAME, this.onGetSZchatInfo, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF, this.onGetSZchatInfoself, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF_FAIL, this.selfFail, this);
        };
        /**初始化请求聊天信息 */
        LobbyChatPanel.prototype.getChatData = function () {
            this.cartonControl(true);
            this.chatScroll.visible = false;
            //这里监听list的item都构建完成，添加到list上。
            this.chatList.once(egret.Event.ADDED, this.showRender, this);
            this.tempTimer = egret.setTimeout(function () {
                var req = new Cmd.GetCommonChatInfoLobby_C();
                var socket = eval(chessCommonLib.CommonVariable.getInstance().socketName[0]);
                socket.NetMgr.tcpSend(req);
                // 游戏内初始化两次，分别建立向大厅和向游戏服务器的socket
                if (uniLib.Global.isInGame && chessCommonLib.CommonVariable.getInstance().socketName[1]) {
                    var reqLobby = new Cmd.GetCommonChatInfoLobby_C();
                    var socketLobby = eval(chessCommonLib.CommonVariable.getInstance().socketName[1]);
                    socketLobby.NetMgr.tcpSend(reqLobby);
                }
            }, this, 0);
        };
        /**初始化数据 */
        LobbyChatPanel.prototype.initData = function (e) {
            var rev = e.param;
            var data = rev.info;
            this.chatContentLable.prompt = "请在此输入内容，总长度不超过40个字~";
            if (rev.horn) {
                this.hornNum.text = "×" + rev.horn;
                if (rev.horn == 0) {
                    this.chatContentLable.prompt = "你没有喇叭，无法发布世界消息。请您先购买喇叭~！";
                }
            }
            if (rev.state && rev.state == 1 && !uniLib.Global.isInGame) {
                this.chatContentLable.prompt = "你是游客，无法发言，请绑定手机号！";
                this.isTour = true;
            }
            else {
                this.isTour = false;
            }
            if (Array.isArray(data)) {
                for (var i = 0; i < data.length; i++) {
                    if (data[i].type == void 0) {
                        data[i].type = 0;
                    }
                    if (data[i].timestamp == void 0) {
                        data[i].timestamp = 0;
                    }
                    chessCommonLib.CommonVariable.add({
                        "nickName": data[i].nickName,
                        "vip": data[i].vipLevel,
                        "content": (data[i].chatInfo).toString(),
                        "type": (data[i].type).toString(),
                        "timestamp": (data[i].timestamp).toString(),
                    }, this.chatData);
                }
            }
            this.sortByTimestamp();
            //这里push一个空数据，为了兼容测量不准确的问题，因为游戏内初始化聊天会初始化两次，所以弹出一次大厅的
            this.arrCol.removeAll();
            this.arrCol.replaceAll(this.chatData);
            // this.chatScroll.visible = false;
            this.chatList.validateNow();
            if (this.chatScroll.viewport.contentHeight > 453) {
                this.chatScroll.viewport.scrollV = this.chatScroll.viewport.contentHeight - this.chatScroll.height;
            }
        };
        LobbyChatPanel.prototype.showRender = function () {
            console.error(" 将要更新和呈现显示列表时调度。");
            this.cartonControl(false);
            if (this.chatScroll)
                this.chatScroll.visible = true;
        };
        /**点击发送 */
        LobbyChatPanel.prototype.sendChatMsg = function () {
            console.error("点击发送", this.chatContentLable.text);
            if (this.chatContentLable.text == "") {
                uniLib.TipsUtils.showTipsDownToUp("请输入聊天内容");
                return;
            }
            if (chessCommonLib.CommonVariable.getInstance().isForbidden) {
                this.showFailToast();
                return;
            }
            var req = new Cmd.LobbyCommonChatLobby_C();
            req.chatInfo = this.chatContentLable.text;
            var socket = eval(chessCommonLib.CommonVariable.getInstance().socketName[0]);
            socket.NetMgr.tcpSend(req);
        };
        /**新的聊天信息自己 */
        LobbyChatPanel.prototype.onGetSZchatInfoself = function (e) {
            this.showRender();
            var chatself = e.param;
            this.chatContentLable.text = "";
            this.counTime = chatself.remainder;
            if (this.counTime > 1000) {
                this.counTime = parseInt((this.counTime / 1000) + "");
            }
            if (this.counTime == void 0) {
                this.counTime = 10;
            }
            this.timerComFunc();
            if (chatself.horn) {
                this.hornNum.text = "×" + chatself.horn;
                if (chatself.horn == 0) {
                    this.chatContentLable.prompt = "你没有喇叭，无法发布世界消息。请您先购买喇叭~！";
                }
            }
            if (this._countTime) {
                this._countTime.stop();
            }
            else {
                this._countTime = new egret.Timer(1000, this.counTime + 1);
                this._countTime.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._countTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this._countTime.start();
            this.chatSend.skin["sendDisable"].visible = true;
            this.chatSend.touchEnabled = false;
            this.chatSend.skin["sendClock"].visible = true;
        };
        /**自己返回失败 */
        LobbyChatPanel.prototype.selfFail = function () {
            this.showFailToast();
            chessCommonLib.CommonVariable.getInstance().isForbidden = true;
        };
        /**控制按钮上倒计时 */
        LobbyChatPanel.prototype.onTimer = function () {
            if (this.counTime < 0) {
                this.timerComFunc();
            }
            this.chatSend.skin["send_word"].visible = false;
            this.chatSend.skin["sendClock"].text = "" + this.counTime;
            this.counTime--;
        };
        /**控制按钮上倒计时 */
        LobbyChatPanel.prototype.timerComFunc = function () {
            if (this._countTime) {
                this._countTime.stop();
                this._countTime.reset();
                this.chatSend.skin["sendDisable"].visible = false;
                this.chatSend.skin["sendClock"].visible = false;
                this.chatSend.skin["sendClock"].text = "";
                this.chatSend.touchEnabled = true;
                this.chatSend.skin["send_word"].visible = true;
            }
        };
        /**新加的聊天信息 */
        LobbyChatPanel.prototype.onGetSZchatInfo = function (e) {
            this.chatScroll.visible = true;
            var chat = e.param;
            if (chat.type == void 0) {
                chat.type = 0;
            }
            // this.layoutRefresh(2);
            chessCommonLib.CommonVariable.add({
                "nickName": chat.nickName,
                "vip": chat.vipLevel,
                "content": chat.chatInfo,
                "type": (chat.type).toString(),
            }, this.chatData);
            this.arrCol.refresh();
            // this.layoutRefresh(1);
            this.chatList.validateNow();
            if (this.chatScroll.viewport.contentHeight > 453) {
                this.chatScroll.viewport.scrollV = this.chatScroll.viewport.contentHeight - this.chatScroll.height; //减去数值是因为空白消息存在的误差？
            }
        };
        /**空白消息 ,为了解决eui布局测量误差   1：添加一条空白信息 2:移除最上面的空白信息*/
        LobbyChatPanel.prototype.layoutRefresh = function (num) {
            if (num === 1) {
                chessCommonLib.CommonVariable.add({
                    "nickName": "",
                    "vip": -1,
                    "content": "",
                }, this.chatData);
                // this.chatList.validateNow();
                this.arrCol.refresh();
            }
            else if (num === 2) {
                this.chatData.pop();
            }
        };
        /**显示表情面板 */
        LobbyChatPanel.prototype.showFacePanel = function () {
            this.chatFacePanel.visible = !this.chatFacePanel.visible;
            this.touchMask.touchEnabled = !this.touchMask.touchEnabled;
        };
        LobbyChatPanel.prototype.showFaceText = function (event) {
            if (chessCommonLib.CommonVariable.getStrRealLength(this.chatContentLable.text) >= 80) {
                return;
            }
            this.chatContentLable.text = this.chatContentLable.text + "(" + event.data + ")";
            this.BtnHandle();
        };
        LobbyChatPanel.prototype.onChang = function (e) {
            this.chatContentLable.text = chessCommonLib.CommonVariable.handleString(this.chatContentLable.text, 80);
            //有输入
            this.BtnHandle();
            // if (this.chatContentLable.text.indexOf("(") != -1 ||
            //     this.chatContentLable.text.indexOf(")") != -1) {
            //     // uniLib.TipsUtils.showTipsDownToUp("字符串非法");
            //     let text1 = this.chatContentLable.text.replace(/\(/g, "").replace(/\)/g, "");
            //     // this.chatContentLable.text = text1;
            // }
        };
        /**当输入框内容为空，置灰发布按钮 */
        LobbyChatPanel.prototype.BtnHandle = function () {
            var _this = this;
            if (this._countTime && this._countTime.running)
                return;
            if (this.chatContentLable.text && this.chatContentLable.text.length > 0 && !this.isTour) {
                this.chatSend.skin["sendDisable"].visible = false;
                this.chatSend.skin["send_wordDisable"].visible = false;
                this.chatSend.skin["send_word"].visible = true;
                this.chatSend.touchEnabled = true;
            }
            else {
                this.chatSend.skin["sendDisable"].visible = true;
                this.chatSend.skin["send_wordDisable"].visible = true;
                this.chatSend.skin["send_word"].visible = false;
                this.chatSend.touchEnabled = false;
            }
            this.chatList.validateNow();
            egret.setTimeout(function () {
                if (_this.chatScroll.viewport.contentHeight > 453) {
                    _this.chatScroll.viewport.scrollV = _this.chatScroll.viewport.contentHeight - _this.chatScroll.height;
                }
            }, this, 200);
        };
        /**根据时间戳排序 */
        LobbyChatPanel.prototype.sortByTimestamp = function () {
            var compare = function (x, y) {
                if (x.timestamp < y.timestamp) {
                    return -1;
                }
                else if (x.timestamp > y.timestamp) {
                    return 1;
                }
                else {
                    return 0;
                }
            };
            this.chatData.sort(compare);
        };
        /**控制未加载前缓动动画 */
        LobbyChatPanel.prototype.cartonControl = function (boo) {
            if (boo) {
                uniLib.DisplayUtils.playTweenGroup(this.loadingTip, true);
                this.loading_img.visible = true;
            }
            else {
                uniLib.DisplayUtils.stopTweenGroup(this.loadingTip);
                this.loading_img.visible = false;
            }
        };
        /**关闭当前面板 */
        LobbyChatPanel.prototype.chatCloseHander = function () {
            //这个事件是为了让游戏内自己的弹窗类控制
            this.dispatchEventWith("close");
            uniLib.PopUpMgr.removePopUp(this);
            this.visible = false;
            console.error("关闭当前面板");
            // this.removeEvent();
        };
        LobbyChatPanel.prototype.destroy = function () {
            console.error("关闭当前面板-destroy111");
            if (this._countTime) {
                // this._countTime.stop();
            }
            if (this.chatContentLable.text != "") {
            }
            if (this.tempTimer) {
                egret.clearTimeout(this.tempTimer);
            }
            if (this.tempTimer2) {
                egret.clearTimeout(this.tempTimer2);
            }
        };
        LobbyChatPanel.prototype.hidephonevc = function () {
            try {
                uniLib.ZQGameSdk.hideVk();
            }
            catch (e) {
            }
        };
        /**显示错误提示 */
        LobbyChatPanel.prototype.showFailToast = function () {
            window["dynamicCode"] = "SZLobby.LobbyPopupManager.showMildWarnShow(\"\u4F60\u5DF2\u7ECF\u88AB\u7981\u8A00\uFF0C\u8BF7\u8054\u7CFB\u5BA2\u670D\");";
            window['eval'].call(window, window["dynamicCode"]);
        };
        /***这个负责彻底销毁调用 */
        LobbyChatPanel.prototype.dispose = function () {
            uniLib.PopUpMgr.removePopUp(this);
            this.removeEvent();
            this.chatData = [];
            if (this._countTime) {
                this._countTime.stop();
            }
            if (this.tempTimer) {
                egret.clearTimeout(this.tempTimer);
            }
            if (this.tempTimer2) {
                egret.clearTimeout(this.tempTimer2);
            }
            this.arrCol.removeAll();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return LobbyChatPanel;
    }(eui.Component));
    chessCommonLib.LobbyChatPanel = LobbyChatPanel;
})(chessCommonLib || (chessCommonLib = {}));

var Cmd;
(function (Cmd) {
    /**
 * 聊天信息初始化
 */
    function OnGetCommonChatInfoLobby_S(rev) {
        if (rev) {
            if (!Array.isArray(rev.info)) {
                rev.info = [];
            }
        }
        //这条消息在游戏内收到也截取，避免消息量太大卡顿，因为会同时向大厅服务器和游戏内服务器进行请求
        if (uniLib.Global.isInGame) {
            if (rev.info.length > 20) {
                rev.info.length = 20;
            }
        }
        // console.error("聊天信息初始化", rev.info);
        uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.CHAT_INIT, rev);
    }
    Cmd.OnGetCommonChatInfoLobby_S = OnGetCommonChatInfoLobby_S;
    /**
 * 聊天返回只对自己
 */
    function OnLobbyCommonChatLobby_S(rev) {
        if (rev.resultCode && rev.resultCode != 0) {
            // uniLib.TipsUtils.showTipsDownToUp("发送聊天信息失败,错误码:" + rev.resultCode);
            // uniLib.TipsUtils.showTipsDownToUp(rev.desc);
            if (rev.resultCode === 2) {
                uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF_FAIL, rev);
            }
        }
        else {
            uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF, rev);
        }
    }
    Cmd.OnLobbyCommonChatLobby_S = OnLobbyCommonChatLobby_S;
    /**
     * 聊天返回广播
     */
    function OnLobbyCommonChatLobby_Brd(rev) {
        if (rev && rev.type == 1) {
            uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG, rev.info);
        }
        else {
            chessCommonLib.CommonVariable.getInstance().chatInfo = rev.info;
            uniLib.Global.dispatchEvent(chessCommonLib.ChatEventConsts.WORLD_MSG_INGAME, rev.info);
        }
    }
    Cmd.OnLobbyCommonChatLobby_Brd = OnLobbyCommonChatLobby_Brd;
})(Cmd || (Cmd = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @author
 *
 */
var chessCommonLib;
(function (chessCommonLib) {
    var ChatImageItem = /** @class */ (function (_super) {
        __extends(ChatImageItem, _super);
        function ChatImageItem(name) {
            var _this = _super.call(this) || this;
            _this.labeTxt = _this.createBitmap(name);
            _this.addChild(_this.labeTxt);
            return _this;
        }
        ChatImageItem.prototype.createBitmap = function (name) {
            var bit = new egret.Bitmap();
            bit.texture = RES.getRes(name);
            return bit;
        };
        ChatImageItem.prototype.destory = function () {
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            delete this.labeTxt;
        };
        return ChatImageItem;
    }(egret.Sprite));
    chessCommonLib.ChatImageItem = ChatImageItem;
})(chessCommonLib || (chessCommonLib = {}));

/**
 *
 * @author  garr
 *这个是用来进行布局计算的类，不承担显示对象的指责，大幅度减少性能消耗
 */
var chessCommonLib;
(function (chessCommonLib) {
    var ChatWordCalculateItem = /** @class */ (function () {
        function ChatWordCalculateItem(content, isSpecil) {
            if (isSpecil === void 0) { isSpecil = false; }
            this.isSpecil = false;
            this.text1 = "";
            this.text = "";
            this.isSpecil = isSpecil;
            if (!isSpecil) {
                //这里是因为服务器发送<1>这种无需显示的字段时候，进行过滤，防止对宽度进行影响
                // this.labeTxt.text = content.replace(/<\d{1}>/g, "");
                this.text = content.replace(/<\d{1}>/g, "");
                this._width = egret.sys.measureText(this.text, "", 27, false, false);
                this.text1 = content;
            }
            else {
                this.labeTxt = this.createTextLabel("left", 27);
                // console.error("---------ChatWordItem", content);
                var styleArr = [];
                for (var i = 0; i < content.length; i++) {
                    styleArr.push({ text: content[i].text, style: { "textColor": content[i].color } });
                }
                this.labeTxt.textFlow = styleArr;
                // this.addChild(this.labeTxt);
            }
        }
        Object.defineProperty(ChatWordCalculateItem.prototype, "width", {
            get: function () {
                if (!this.isSpecil) {
                    return this._width;
                }
                else {
                    return this.labeTxt.measuredWidth;
                }
            },
            enumerable: true,
            configurable: true
        });
        ChatWordCalculateItem.prototype.createTextLabel = function (ale, size) {
            var tf = new eui.Label();
            tf.fontFamily = "null1";
            tf.textAlign = ale;
            tf.lineSpacing = 10;
            tf.size = size;
            return tf;
        };
        ChatWordCalculateItem.prototype.destory = function () {
            delete this.labeTxt;
        };
        return ChatWordCalculateItem;
    }());
    chessCommonLib.ChatWordCalculateItem = ChatWordCalculateItem;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 *
 * @author
 *
 */
var chessCommonLib;
(function (chessCommonLib) {
    var ChatWordItem = /** @class */ (function (_super) {
        __extends(ChatWordItem, _super);
        function ChatWordItem(content, isSpecil) {
            if (isSpecil === void 0) { isSpecil = false; }
            var _this = _super.call(this) || this;
            _this.labeTxt = _this.createTextLabel("left", 27);
            if (!isSpecil) {
                //这里是因为服务器发送<1>这种无需显示的字段时候，进行过滤，防止对宽度进行影响
                _this.labeTxt.text = content.replace(/<\d{1}>/g, "");
                _this.labeTxt["text1"] = content;
            }
            else {
                // console.error("---------ChatWordItem", content);
                var styleArr = [];
                for (var i = 0; i < content.length; i++) {
                    styleArr.push({ text: content[i].text, style: { "textColor": content[i].color } });
                }
                _this.labeTxt.textFlow = styleArr;
            }
            _this.addChild(_this.labeTxt);
            return _this;
        }
        ChatWordItem.prototype.createTextLabel = function (ale, size) {
            var tf = new eui.Label();
            tf.fontFamily = "null1";
            tf.textAlign = ale;
            tf.lineSpacing = 10;
            tf.size = size;
            return tf;
        };
        ChatWordItem.prototype.destory = function () {
            uniLib.DisplayUtils.removeFromParent(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            delete this.labeTxt;
        };
        return ChatWordItem;
    }(eui.Component));
    chessCommonLib.ChatWordItem = ChatWordItem;
})(chessCommonLib || (chessCommonLib = {}));

// module chessCommonLib {
// 	export class LoadingGameTip extends eui.Component implements uniLib.IUI {
// 		////////////////////////////exml2class:开始替换声明区域///////////////////////////////
// 		private turn: egret.tween.TweenGroup;
// 		private image: eui.Image;
// 		private process_lb: eui.Label;
// 		////////////////////////////exml2class:结束替换声明区域///////////////////////////////
// 		public static exml = `<e:Skin class="LoadGameTipSkin" xmlns:e="http://ns.egret.com/eui" xmlns:w="http://ns.egret.com/wing" xmlns:tween="egret.tween.*">
// 									<w:Declarations>
// 										<tween:TweenGroup id="turn">
// 											<tween:TweenItem target="{image}">
// 												<tween:Set/>
// 												<tween:To duration="2000">
// 													<tween:props>
// 														<e:Object rotation="{360}"/>
// 													</tween:props>
// 												</tween:To>
// 											</tween:TweenItem>
// 										</tween:TweenGroup>
// 									</w:Declarations>
// 									<e:Image id="image" source="loadingCircle_png" anchorOffsetX="45" anchorOffsetY="45"/>
// 									<e:Label id="process_lb" text="1%" anchorOffsetX="40" width="80" verticalAlign="middle" textAlign="center" anchorOffsetY="15"/>
// 								</e:Skin>`;
// 		constructor() {
// 			super();
// 			this.skinName = LoadingGameTip.exml;
// 		}
// 		protected childrenCreated(): void {
// 			super.childrenCreated();
// 			uniLib.DisplayUtils.playTweenGroup(this.turn, true);
// 		}
// 		public updateUIData(data: any): void {
// 			if (this.process_lb)
// 				this.process_lb.text = data + "%";
// 		}
// 		public resize(): void {
// 		}
// 		public destroy() {
// 			uniLib.DisplayUtils.stopTweenGroup(this.turn);
// 		}
// 	}
// }

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var ChatList = /** @class */ (function (_super) {
        __extends(ChatList, _super);
        function ChatList() {
            var _this = _super.call(this) || this;
            /**
             * 喇叭数量
             */
            _this._hornNum = 0;
            // if (skin) {
            // 	this.skinName = skin;
            // 	chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatExml = skin;
            // } else {
            // 	this.skinName = chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatExml;
            // }
            _this.skinName = "chessCommonLib.ChatListSkin" + chessCommonLib.ModuleMgr.getInstance().skinType;
            return _this;
        }
        ChatList.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            var b = chessCommonLib.ConfigMgr.getInstance().gameOptions.horn;
            this.chat_select_grp.visible = b;
            this.labaType_btn.visible = b;
            this.roomType_btn.touchEnabled = b;
            this.chat_etxt.maxChars = 60;
            this._chatBtns = [this.roomType_btn, this.labaType_btn];
            this._chatDropBtns = [this.roomDrop_btn, this.labaDrop_btn];
            this.hideChatTypeSelectGrp();
            //test数据
            // let testData: any = [
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当1", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当2", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当3", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", time: 10000, words: "上山打老虎" }
            // ];
            // this.data = testData;
            this.data = [];
            this.chat_lst.itemRendererFunction = this.chatListItemRendererFunc;
            // this.chat_lst.itemRenderer = UserItemRenderer;
            this.addEvents();
            this.currentChatType = Cmd.CHAT_TYPE.ROOM;
        };
        ChatList.prototype.chatListItemRendererFunc = function (item) {
            // console.error("chatListItemRendererFunc", item);
            if (item.chatType == Cmd.CHAT_TYPE.HORN) {
                return chessCommonLib.ChatListLabaItemRenderer;
            }
            else if (item.chatType == Cmd.CHAT_TYPE.ROOM) {
                return chessCommonLib.ChatListItemRenderer;
            }
            else if (item.chatType == Cmd.CHAT_TYPE.VOICE) {
                // return ChatListItemRenderer;
            }
        };
        ChatList.prototype.showChatTypeSelectGrp = function (page) {
            if (this.chat_select_grp.visible == true) {
                this.hideChatTypeSelectGrp();
                return;
            }
            if (page == Cmd.CHAT_TYPE.ROOM) {
                this.roomDrop_btn.visible = false;
                this.labaDrop_btn.visible = true;
            }
            else {
                this.roomDrop_btn.visible = true;
                this.labaDrop_btn.visible = false;
            }
            this.chat_select_grp.visible = true;
        };
        ChatList.prototype.hideChatTypeSelectGrp = function () {
            this.chat_select_grp.visible = false;
        };
        Object.defineProperty(ChatList.prototype, "currentChatType", {
            set: function (type) {
                this._currentChatType = type;
                if (this._currentChatType == Cmd.CHAT_TYPE.ROOM) {
                    this.roomType_btn.visible = true;
                    this.labaType_btn.visible = false;
                }
                else {
                    this.roomType_btn.visible = false;
                    this.labaType_btn.visible = true;
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 更新用户列表
         */
        ChatList.prototype.update = function () {
        };
        ChatList.prototype.reset = function () {
        };
        ChatList.prototype.addEvents = function () {
            uniLib.Global.addEventListener(chessCommonLib.ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatUserEvent.HORN_CHANGE, this.sethornNum, this);
            // uniLib.Global.addEventListener(ChatUserEvent.CHAT_HORN, this.onGetChatHorn, this);
            this.send_bt.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendHandler, this);
            // this.voice_btn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onVoiceHandle, this);
            // this.voice_btn.addEventListener(egret.TouchEvent.TOUCH_END, this.onVoiceEndHandle, this);
            this.roomDrop_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
            this.labaDrop_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
            this.roomType_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
            this.labaType_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
            this.chat_etxt.addEventListener(egret.Event.CHANGE, this.onChang, this);
        };
        ChatList.prototype.onShowDropHandle = function (e) {
            this.showChatTypeSelectGrp(this._currentChatType);
        };
        ChatList.prototype.onTouchChatTypeHandle = function (e) {
            // let target:any = e.currentTarget;
            this.hideChatTypeSelectGrp();
            // let chatType:Cmd.CHAT_TYPE;
            // if(target == this.roomDrop_btn){
            // 	chatType = Cmd.CHAT_TYPE.ROOM;
            // }else if(target == this.labaDrop_btn){
            if (this._currentChatType == Cmd.CHAT_TYPE.ROOM) {
                this.currentChatType = Cmd.CHAT_TYPE.HORN;
                this.chat_etxt.prompt = "可免费发送" + this._hornNum + "次";
                this.chat_etxt.maxChars = 60;
                if (this._hornNum > 10) {
                    this.chat_etxt.prompt = "喇叭无限使用";
                }
            }
            else {
                this.currentChatType = Cmd.CHAT_TYPE.ROOM;
                this.chat_etxt.prompt = "请输入,最多60字";
                this.chat_etxt.maxChars = 60;
            }
            // }
            // this.showChatTypeSelectGrp(this._currentChatType);
        };
        /**
         * 更新喇叭数量,这么写只是为了移除事件监听
         */
        ChatList.prototype.sethornNum = function (e) {
            this.hornNum = e.param;
        };
        Object.defineProperty(ChatList.prototype, "hornNum", {
            /**
             * 更新喇叭数量
             */
            set: function (num) {
                this._hornNum = num;
                if (this._currentChatType == Cmd.CHAT_TYPE.HORN) {
                    this.chat_etxt.prompt = "可免费发送" + this._hornNum + "次";
                    if (this._hornNum > 10) {
                        this.chat_etxt.prompt = "喇叭无限使用";
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 获取到聊天信息
         */
        ChatList.prototype.onGetChatInfo = function (e) {
            var chat = e.param;
            if (e.param.data.uid === uniLib.NetMgr.UID) {
                this.chat_etxt.text = "";
            }
            this._data.addItem(chat);
            this._data.refresh();
            // this.chat_lst.validateNow();
            this.scroll2Bottom();
        };
        ChatList.prototype.onSendHandler = function (e) {
            var txt = this.chat_etxt.text;
            if (txt) {
                var req = new Cmd.UI_CommonChat_C();
                req.words = txt;
                if (this._currentChatType == Cmd.CHAT_TYPE.HORN) {
                    if (this._hornNum < 0) {
                        uniLib.TipsUtils.showTipsDownToUp("喇叭数量不够", true);
                        return;
                    }
                }
                req.brdType = this._currentChatType;
                // }
                uniLib.NetMgr.tcpSend(req);
            }
        };
        ChatList.prototype.onVoiceHandle = function (e) {
            uniLib.TipsUtils.showTipsDownToUp("暂时没有语音效果图,后续再做", true);
            return;
            //这里开始录音
            // let voice: Cmd.UI_VoiceChat_C = new Cmd.UI_VoiceChat_C();
            // voice.time = "3000";
            // voice.url = "http://www.baidu.com";
            // voice.words = "你好happy";
            // uniLib.NetMgr.tcpSend(voice);
        };
        ChatList.prototype.onVoiceEndHandle = function (e) {
            //录音结束发送语音消息给服务器
        };
        Object.defineProperty(ChatList.prototype, "data", {
            set: function ($data) {
                this._data = new eui.ArrayCollection($data);
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        ChatList.prototype.refreshView = function () {
            if (this._data) {
                this.chat_lst.dataProvider = this._data;
                this.chat_lst.visible = true;
                // this.loading_img.visible=false;
            }
            else {
                //这里需要显示转圈loading
                this.chat_lst.visible = false;
                // this.loading_img.visible=true;
            }
        };
        ChatList.prototype.changeChatType = function () {
            // this.chatType_btn
        };
        /**
         * 滚动到底部
         */
        ChatList.prototype.scroll2Bottom = function () {
            this.chat_scr.validateNow();
            if (this.chat_scr.viewport.contentHeight > 618) {
                this.chat_scr.viewport.scrollV = this.chat_scr.viewport.contentHeight - 395; //这里不太清楚为什么高度不准确
            }
        };
        ChatList.prototype.onChang = function (e) {
            if (e.target.text.length === 60) {
                uniLib.TipsUtils.showTipsDownToUp("字数超出限制");
            }
            // egret.error("onChang", e.target.text.length);
        };
        ChatList.prototype.destroy = function () {
            uniLib.Global.removeEventListener(chessCommonLib.ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
            // uniLib.Global.removeEventListener(ChatUserEvent.CHAT_HORN, this.onGetChatHorn, this);
            this.send_bt.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSendHandler, this);
            // this.voice_btn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onVoiceHandle, this);
            // this.voice_btn.removeEventListener(egret.TouchEvent.TOUCH_END, this.onVoiceEndHandle, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatUserEvent.HORN_CHANGE, this.sethornNum, this);
            this.roomDrop_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
            this.labaDrop_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchChatTypeHandle, this);
            this.roomType_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
            this.labaType_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShowDropHandle, this);
            this.chat_etxt.removeEventListener(egret.Event.CHANGE, this.onChang, this);
        };
        return ChatList;
    }(eui.Component));
    chessCommonLib.ChatList = ChatList;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var ChatListItemRenderer = /** @class */ (function (_super) {
        __extends(ChatListItemRenderer, _super);
        function ChatListItemRenderer() {
            var _this = _super.call(this) || this;
            _this.changeTimeToStr = function (num) {
                if (num == null)
                    return "";
                num = num.toString().length == 10 ? num * 1000 : num;
                var date = new Date();
                date.setTime(num);
                // var str = date.getFullYear() + "-" + this.getNumStr(date.getMonth() + 1) + "-" + this.getNumStr(date.getDate()) + "  " + this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
                var str = this.getNumStr(date.getHours()) + ":" + this.getNumStr(date.getMinutes()) + ":" + this.getNumStr(date.getSeconds());
                return str;
            };
            _this.getNumStr = function (num) {
                if (num < 10) {
                    return "0" + num;
                }
                return num.toString();
            };
            // this.skinName = chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatItemExml;
            _this.skinName = "chessCommonLib.ChatListItemSkin" + chessCommonLib.ModuleMgr.getInstance().skinType;
            return _this;
        }
        ChatListItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.avar_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
            this.vip_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
            this.vip_img.x = -9;
            this.vip_img.y = -1;
            this.vip_img.width = 105;
            this.vip_img.height = 90;
            this.once(egret.Event.REMOVED_FROM_STAGE, this.removeListen, this);
        };
        ChatListItemRenderer.prototype.showUserinfoPanel = function () {
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.USERINFO, { "uid": this.data.data.uid, "gameId": 0 });
        };
        ChatListItemRenderer.prototype.removeListen = function () {
            this.vip_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
            this.avar_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
        };
        ChatListItemRenderer.prototype.dataChanged = function () {
            // this.time_txt.text = uniLib.StringUtils.formatDDHHMMSS(this.data.data.time);
            // console.error("-----dataChanged",this.data);
            var _data = this.data.data;
            this.time_txt.text = this.changeTimeToStr(this.data.data.time);
            var vipLevel = this.data.data.vipLevel;
            var levle;
            if (typeof vipLevel === 'number') {
                levle = vipLevel;
            }
            else if (typeof vipLevel === 'string') {
                if (vipLevel.indexOf("mjl_vip_icon") == -1)
                    levle = Number(vipLevel);
                else {
                    levle = Number(vipLevel.substr(12, vipLevel.length));
                }
            }
            this.name_txt.textColor = chessCommonLib.ConfigMgr.getInstance().getNameColor(levle);
            var vipCfg = chessCommonLib.ConfigMgr.getInstance().getVipByLevel(levle);
            // this.vip_img.source = vipCfg.head_frame;
            this.vip_img.source = "info_img_bg_png";
            this.vip_img.width = 50;
            this.vip_img.height = 47;
            this.vip_img.x = 20;
            this.vip_img.y = 19;
        };
        return ChatListItemRenderer;
    }(eui.ItemRenderer));
    chessCommonLib.ChatListItemRenderer = ChatListItemRenderer;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    /**
     * 聊天LIST喇叭ITEM
     */
    var ChatListLabaItemRenderer = /** @class */ (function (_super) {
        __extends(ChatListLabaItemRenderer, _super);
        function ChatListLabaItemRenderer() {
            var _this = _super.call(this) || this;
            // this.skinName = chessCommonLib.ModuleMgr.getInstance().ExmlMap.chatLabaItemExml;
            _this.skinName = "chessCommonLib.ChatLabaItemSkin" + chessCommonLib.ModuleMgr.getInstance().skinType;
            return _this;
        }
        ChatListLabaItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        ChatListLabaItemRenderer.prototype.dataChanged = function () {
            var vipLevel = this.data.data.vipLevel;
            var levle;
            if (typeof vipLevel === 'number') {
                levle = vipLevel;
            }
            else if (typeof vipLevel === 'string') {
                if (vipLevel.indexOf("mjl_vip_icon") == -1)
                    levle = Number(vipLevel);
                else {
                    levle = Number(vipLevel.substr(12, vipLevel.length));
                }
            }
            this.notice_lb.text = "\u3000\u3000" + this.data.data.words;
            this.notice_lb.textFlow = [
                { text: this.data.data.nickName + "：", style: { "textColor": chessCommonLib.ConfigMgr.getInstance().getNameColor(levle) } },
                { text: this.data.data.words, style: { "textColor": 0xffffff } }
            ];
            this.chat_laba_vip_img.source = "vip_small" + levle + "_png";
        };
        return ChatListLabaItemRenderer;
    }(eui.ItemRenderer));
    chessCommonLib.ChatListLabaItemRenderer = ChatListLabaItemRenderer;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var ChatUserEvent = /** @class */ (function () {
        function ChatUserEvent() {
        }
        /**
         * 聊天信息事件
         */
        ChatUserEvent.CHAT_INFO = "chat_Info";
        /**
     * 喇叭数量改变
     */
        ChatUserEvent.HORN_CHANGE = "horn_change";
        /**
         * 从舞台移动到边上
         */
        ChatUserEvent.MOVE_LEFT = "move_left";
        /**
         * 从边上移动舞台
         */
        ChatUserEvent.MOVE_RIGHT = "move_right";
        /**
         * 无座玩家总数
         */
        ChatUserEvent.CHAT_USER_COUNT = "chat_user_count";
        /**
         * 座位人数改变
         */
        ChatUserEvent.SEATNUM_CHANGE = "seatnum_change";
        return ChatUserEvent;
    }());
    chessCommonLib.ChatUserEvent = ChatUserEvent;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var ChatUserView = /** @class */ (function (_super) {
        __extends(ChatUserView, _super);
        /**
         * @description    参数列表
         * @param {number} defaultPage默认打开页面，1聊天，2：无座列表
         * @param {string} skin面板皮肤。
         * @param {string} chatSkin聊天面板皮肤。
         * @param {string} userListSkin无座列表面板皮肤。
         */
        function ChatUserView(defaultPage, skinType) {
            var _this = _super.call(this) || this;
            _this._isMove = false;
            if (defaultPage) {
                _this._currentPage = defaultPage;
            }
            if (skinType)
                chessCommonLib.ModuleMgr.getInstance().skinType = skinType;
            _this.skinName = "chessCommonLib.ChatUserSkin" + chessCommonLib.ModuleMgr.getInstance().skinType;
            return _this;
        }
        ChatUserView.prototype.childrenCreated = function () {
            var _this = this;
            _super.prototype.childrenCreated.call(this);
            this.scaleY = chessCommonLib.LoadGameTipUtil.gameScaleY;
            this.btns = [this.chat_btn, this.noseat_btn];
            this.touchChildren = true;
            uniLib.Global.addEventListener(chessCommonLib.ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatUserEvent.CHAT_USER_COUNT, this.onUserCount, this);
            this.chat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
            this.noseat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
            this.bg_layer = uniLib.DisplayUtils.createMask(0, uniLib.Global.screenWidth * 1.5, uniLib.Global.screenHeight);
            this.bg_layer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.bg_layer.touchEnabled = false;
            this.bg_layer.visible = false;
            this.addChildAt(this.bg_layer, 0);
            if (this._currentPage == null) {
                this._currentPage = CHAT_PAGE.CHAT;
            }
            this.onChatReady(this._currentPage);
            if (this._currentPage == CHAT_PAGE.CHAT && this.noseat_btn.visible)
                egret.setTimeout(function () { _this.getUserList(); }, this, 800);
        };
        ChatUserView.prototype.getUserList = function () {
            var req = new Cmd.UI_GetNotSeatUserListRoomCmd_C();
            req.curPage = 1;
            uniLib.NetMgr.httpSend(req, function (rev) {
                if (rev && rev.resultCode != 0)
                    return;
                var mess = rev.users.length;
                if (mess > 0) {
                    // this.mess_count.text = mess+"";
                }
            });
        };
        ChatUserView.prototype.onChatReady = function (page) {
            if (this._curentBtn) {
                this._curentBtn.selected = false;
                this._curentBtn.enabled = true;
            }
            if (this._currentView && this._currentView.parent) {
                this._currentView.parent.removeChild(this._currentView);
            }
            // for (var i: number = this.btns.length - 1; i > -1; --i) {
            // 	this.btns[i].enabled = !this.btns[i].selected;
            // }
            switch (page) {
                case CHAT_PAGE.CHAT:
                    if (this._currentView) {
                        if (this._currentView == this._chatListView) {
                        }
                        else {
                            this._currentView.destroy();
                        }
                    }
                    if (!this._chatListView) {
                        this._chatListView = new chessCommonLib.ChatList();
                    }
                    else {
                        this._chatListView.addEvents();
                    }
                    this._currentView = this._chatListView;
                    this._curentBtn = this.chat_btn;
                    if (this.chatAnim) {
                        this.chatAnim.visible = false;
                        this.chatAnim.stop();
                    }
                    break;
                case CHAT_PAGE.NOSEAT:
                    if (this._currentView) {
                        if (this._currentView == this._userList) {
                        }
                        else {
                            this._currentView.destroy();
                        }
                    }
                    if (!this._userList) {
                        this._userList = new chessCommonLib.UserList();
                    }
                    else {
                        this._userList.update();
                    }
                    this._currentView = this._userList;
                    this._curentBtn = this.noseat_btn;
                    break;
            }
            // this._curentBtn.enabled = false;
            this._curentBtn.selected = true;
            if (this._currentView) {
                this.addChild(this._currentView);
            }
        };
        ChatUserView.prototype.onGetChatInfo = function (e) {
            if (this._currentView == this._chatListView && this.x == 0)
                return;
            if (this.chatAnim == undefined) {
                var type = "";
                var skinType = chessCommonLib.ModuleMgr.getInstance().skinType;
                if (skinType > 1)
                    type = skinType + "";
                this.chatAnim = uniLib.DragonUtils.showFastDragon("chat_mess" + type, "newAnimation", uniLib.DragonType.MovieClip, this.chat_btn.x + (this.chat_btn.width >> 1), this.chat_btn.y + (this.chat_btn.height >> 1), this);
            }
            this.chatAnim.visible = true;
            this.chatAnim.play();
        };
        ChatUserView.prototype.onUserCount = function (e) {
            var mess = e.param;
            if (mess > 0) {
                // this.mess_count.text = mess+"";
            }
        };
        ChatUserView.prototype.onChatBtnHandler = function (evt) {
            this.onClick(evt);
            if (evt.currentTarget == this._curentBtn) {
                this._curentBtn.selected = true;
                if (this._curentBtn == this.chat_btn && this.chatAnim && this.chatAnim.visible) {
                    this.chatAnim.stop();
                    this.chatAnim.visible = false;
                }
                return;
            }
            switch (evt.currentTarget) {
                case this.chat_btn:
                    this._currentPage = CHAT_PAGE.CHAT;
                    break;
                case this.noseat_btn:
                    this._currentPage = CHAT_PAGE.NOSEAT;
                    break;
            }
            this.onChatReady(this._currentPage);
        };
        Object.defineProperty(ChatUserView.prototype, "hornNum", {
            /**
             * 设置喇叭数量
             */
            set: function (num) {
                if (this._chatListView == null) {
                    this._chatListView = new chessCommonLib.ChatList();
                }
                this._chatListView.hornNum = num;
            },
            enumerable: true,
            configurable: true
        });
        /**点击空白聊天框隐藏 */
        ChatUserView.prototype.onTouch = function (evt) {
            console.error("点击空白聊天框隐藏", this.chat_btn.touchEnabled);
            this.bg_layer.touchEnabled = false;
            this.bg_layer.visible = false;
            this.dispatchEventWith(chessCommonLib.ChatUserEvent.MOVE_LEFT, false);
            this.moveLeft(evt);
        };
        /**点击按钮移动到舞台 */
        ChatUserView.prototype.onClick = function (evt) {
            this.bg_layer.touchEnabled = true;
            this.bg_layer.visible = true;
            this.dispatchEventWith(chessCommonLib.ChatUserEvent.MOVE_RIGHT, false);
            this.moveRight(evt);
        };
        /**点击空白聊天框隐藏 */
        ChatUserView.prototype.moveLeft = function (evt) {
            var _this = this;
            evt.stopPropagation();
            if (this._isMove)
                return;
            if (this.x == -408) {
                return;
            }
            if (this._userList) {
                //this._userList.reset();
            }
            this.touchEnabled = false;
            this.touchChildren = false;
            this._isMove = true;
            egret.Tween.get(this).to({ x: -408 }, 300).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                _this._isMove = false;
                egret.Tween.removeTweens(_this);
            }, this);
        };
        /**点击按钮移动到舞台 */
        ChatUserView.prototype.moveRight = function (evt) {
            var _this = this;
            evt.stopPropagation();
            if (this.x == 0) {
                return;
            }
            if (this._isMove)
                return;
            this.touchEnabled = false;
            this.touchChildren = false;
            this._isMove = true;
            egret.Tween.get(this).to({ x: 0 }, 300).call(function () {
                _this.touchEnabled = true;
                _this.touchChildren = true;
                _this._isMove = false;
                _this._curentBtn.enabled = true;
                egret.Tween.removeTweens(_this);
                if (_this._currentPage == CHAT_PAGE.NOSEAT) {
                    _this._userList.update();
                }
            }, this);
        };
        ChatUserView.prototype.destroy = function () {
            uniLib.Global.removeEventListener(chessCommonLib.ChatUserEvent.CHAT_USER_COUNT, this.onUserCount, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatUserEvent.CHAT_INFO, this.onGetChatInfo, this);
            this.bg_layer.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.chat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
            this.noseat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatBtnHandler, this);
            if (this._userList) {
                this._userList.destroy();
            }
            if (this._chatListView) {
                this._chatListView.destroy();
            }
        };
        return ChatUserView;
    }(eui.Component));
    chessCommonLib.ChatUserView = ChatUserView;
    var CHAT_PAGE;
    (function (CHAT_PAGE) {
        /**
         * 聊天
         */
        CHAT_PAGE[CHAT_PAGE["CHAT"] = 1] = "CHAT";
        /**
         * 无座玩家
         */
        CHAT_PAGE[CHAT_PAGE["NOSEAT"] = 2] = "NOSEAT";
    })(CHAT_PAGE = chessCommonLib.CHAT_PAGE || (chessCommonLib.CHAT_PAGE = {}));
})(chessCommonLib || (chessCommonLib = {}));
var Cmd;
(function (Cmd) {
    /**
     * 发送聊天返回
     */
    function OnUI_CommonChat_S(rev) {
        if (rev.resultCode && rev.resultCode == 2) {
            uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.SEATNUM_CHANGE, rev["noSeatUserNum"]);
            return;
        }
        if (rev.resultCode && rev.resultCode != 0) {
            // uniLib.TipsUtils.showTipsDownToUp("发送聊天信息失败,错误码:" + rev.resultCode);
            if (rev.resultCode != 2)
                uniLib.TipsUtils.showTipsDownToUp(rev.desc);
        }
        else {
            if (rev.horn != void 0) {
                uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.HORN_CHANGE, rev.horn);
            }
        }
    }
    Cmd.OnUI_CommonChat_S = OnUI_CommonChat_S;
    /**
     * 聊天消息
     */
    function OnUI_CommonChat_Brd(rev) {
        var chatInfo = new chessCommonLib.ChatVo();
        chatInfo.chatType = rev.brdType; // Cmd.CHAT_TYPE.ROOM;
        chatInfo.data = rev;
        uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.CHAT_INFO, chatInfo);
    }
    Cmd.OnUI_CommonChat_Brd = OnUI_CommonChat_Brd;
    function OnUI_VoiceChat_S(rev) {
        if (rev.resultCode && rev.resultCode != 0) {
            uniLib.TipsUtils.showTipsDownToUp("发送语音信息失败,错误码:" + rev.resultCode);
        }
    }
    Cmd.OnUI_VoiceChat_S = OnUI_VoiceChat_S;
    function OnUI_VoiceChat_Brd(rev) {
        var chatInfo = new chessCommonLib.ChatVo();
        chatInfo.chatType = Cmd.CHAT_TYPE.VOICE;
        chatInfo.data = rev;
        uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.CHAT_INFO, chatInfo);
    }
    Cmd.OnUI_VoiceChat_Brd = OnUI_VoiceChat_Brd;
})(Cmd || (Cmd = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var ChatVo = /** @class */ (function () {
        function ChatVo() {
        }
        return ChatVo;
    }());
    chessCommonLib.ChatVo = ChatVo;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var UserItemRenderer = /** @class */ (function (_super) {
        __extends(UserItemRenderer, _super);
        function UserItemRenderer() {
            var _this = _super.call(this) || this;
            var skinType = _this.skinName = "chessCommonLib.UserListItemSkin" + chessCommonLib.ModuleMgr.getInstance().skinType;
            return _this;
        }
        UserItemRenderer.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.avar_img.touchEnabled = true;
            this.avar_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
            this.vip_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
            this.vip_img.x = -15;
            this.vip_img.y = -7;
            this.vip_img.width = 115;
            this.vip_img.height = 105;
            this.once(egret.Event.REMOVED_FROM_STAGE, this.removeListen, this);
        };
        UserItemRenderer.prototype.showUserinfoPanel = function () {
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.USERINFO, { "uid": this.data.uid, "gameId": 0 });
        };
        UserItemRenderer.prototype.removeListen = function () {
            this.vip_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
            this.avar_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showUserinfoPanel, this);
        };
        UserItemRenderer.prototype.dataChanged = function () {
            this.gold_lb.text = "" + uniLib.StringUtils.formatCurrencyByTotalLen((this.data.remainder), true, 6) + "";
            var vipLevel = this.data.vipLevel;
            var levle;
            if (typeof vipLevel === 'number') {
                levle = vipLevel;
            }
            else if (typeof vipLevel === 'string') {
                if (vipLevel.indexOf("mjl_vip_icon") == -1)
                    levle = Number(vipLevel);
                else {
                    levle = Number(vipLevel.substr(12, vipLevel.length));
                }
            }
            this.name_lb.textColor = chessCommonLib.ConfigMgr.getInstance().getNameColor(Number(levle));
            // this.vip_img.source = "vip_icon"+levle+"_png";
            this.vip_img.source = "info_img_bg_png";
            this.vip_img.width = 50;
            this.vip_img.height = 47;
            this.vip_img.x = 20;
            this.vip_img.y = 19;
        };
        return UserItemRenderer;
    }(eui.ItemRenderer));
    chessCommonLib.UserItemRenderer = UserItemRenderer;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var UserList = /** @class */ (function (_super) {
        __extends(UserList, _super);
        function UserList() {
            var _this = _super.call(this) || this;
            _this.skinName = "chessCommonLib.UserListSkin" + chessCommonLib.ModuleMgr.getInstance().skinType;
            return _this;
        }
        UserList.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // var testData: any = [
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当1", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当2", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当3", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" },
            // 	{ uid: 10086, headUrl: "chat_input_png", nickName: "小叮当4", remainder: "10000" }
            // ];
            // this.data = testData;
            this.update();
            this.noseat_lst.itemRenderer = chessCommonLib.UserItemRenderer;
        };
        Object.defineProperty(UserList.prototype, "data", {
            set: function ($data) {
                this._data = $data;
                this.refreshView();
            },
            enumerable: true,
            configurable: true
        });
        UserList.prototype.refreshView = function () {
            if (this._data) {
                this.noseat_lst.dataProvider = new eui.ArrayCollection(this._data);
                this.noseat_lst.visible = true;
                this.loading_img.visible = false;
                uniLib.DisplayUtils.stopTweenGroup(this.loadingTip);
                uniLib.Global.dispatchEvent(chessCommonLib.ChatUserEvent.CHAT_USER_COUNT, this._data.length);
            }
            else {
                //这里需要显示转圈loading
                this.noseat_lst.visible = false;
                this.loading_img.visible = true;
                uniLib.DisplayUtils.playTweenGroup(this.loadingTip, true);
            }
        };
        /**
         * 更新用户列表
         */
        UserList.prototype.update = function () {
            this.data = [];
            //发送请求获取最新数据
            this.getUserList();
        };
        UserList.prototype.reset = function () {
            this.noseat_lst.dataProvider = new eui.ArrayCollection([]);
        };
        UserList.prototype.getUserList = function () {
            var _this = this;
            var req = new Cmd.UI_GetNotSeatUserListRoomCmd_C();
            req.curPage = 1;
            uniLib.NetMgr.httpSend(req, function (rev) {
                if (rev && rev.resultCode != 0) {
                    uniLib.TipsUtils.showTipsDownToUp(rev.desc);
                    return;
                }
                _this.data = rev.users;
            });
        };
        UserList.prototype.destroy = function () {
            if (this.loadingTip) {
                uniLib.DisplayUtils.stopTweenGroup(this.loadingTip);
            }
        };
        return UserList;
    }(eui.Component));
    chessCommonLib.UserList = UserList;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
/**
 * 百人头像组件(暂时只是把头像公共显示统一，后续需要统一头像vo信息)
 */
var chessCommonLib;
(function (chessCommonLib) {
    var BrSeat = /** @class */ (function (_super) {
        __extends(BrSeat, _super);
        function BrSeat(skin, w, h) {
            if (skin === void 0) { skin = "chessCommonLib.BrSeatSkin"; }
            if (w === void 0) { w = 100; }
            if (h === void 0) { h = 100; }
            var _this = _super.call(this) || this;
            // private _nickName: string;
            // private _chips: number;
            // private _vipLevel: number;
            _this.DEFAULT_BG = "br_seatHead_png";
            if (skin != null) {
                _this.skinName = skin;
            }
            else {
                _this.skinName = "chessCommonLib.BrSeatSkin";
            }
            _this.width = w;
            _this.height = h;
            return _this;
        }
        BrSeat.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            // this.vipLevel = this._vipLevel;
            // this.nickName = this._nickName;
            // this.chips = this._chips;
            this.touchChildren = true;
            this.touchEnabled = false;
            this.head.touchEnabled = false;
            this.head.touchChildren = true;
            this.lb_bg_img.touchEnabled = false;
            this.chips_lbl.y = 90;
            this.chips_lbl.x = this.width >> 1;
        };
        BrSeat.prototype.stand = function () {
            if (this.empty_bg)
                this.empty_bg.visible = true;
            if (this.lb_bg_img)
                this.lb_bg_img.visible = false;
            this.nickName = "";
            if (this.chips_lbl)
                this.chips_lbl.text = "";
            if (this.head)
                this.head.visible = false;
        };
        BrSeat.prototype.sit = function (vo) {
            if (vo.uid) {
                this.updateSeat(vo);
            }
        };
        BrSeat.prototype.updateSeat = function (vo) {
            if (this.head) {
                this.head.visible = true;
                this.head.headUrl = vo.headUrl;
            }
            if (this.lb_bg_img)
                this.lb_bg_img.visible = true;
            if (this.empty_bg)
                this.empty_bg.visible = false;
            this.setHeadFrame(vo.vipLevel, vo.personalImage);
            this.nickName = vo.nickName;
            this.chips = vo.remainder;
        };
        Object.defineProperty(BrSeat.prototype, "nickName", {
            set: function (str) {
                if (this.nickName_lbl) {
                    this.nickName_lbl.visible = true;
                    this.nickName_lbl.text = str;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BrSeat.prototype, "chips", {
            set: function (num) {
                if (num == null) {
                    console.error("chips is underfind");
                    return;
                }
                if (this.chips_lbl) {
                    this.chips_lbl.visible = true;
                    if (!BrSeat.CHIPCHANCE) {
                        if (num >= 100000) {
                            this.chips_lbl.text = chessCommonLib.NumberUtil.numberFormat(num);
                        }
                        else {
                            this.chips_lbl.text = num + "";
                        }
                    }
                    else {
                        this.chips_lbl.text = num.toFixed(2) + "元";
                        // if(parseInt(num+"")==num){
                        // 	this.chips_lbl.text = num+".00元";
                        // }else{
                        // 	this.chips_lbl.text = num+"0元";
                        // }
                        // this.chips_lbl.font = "jinbi_num_2_fnt";
                    }
                    this.chips_lbl.anchorOffsetX = this.chips_lbl.width >> 1;
                    console.log(12);
                }
            },
            enumerable: true,
            configurable: true
        });
        // public set vipLevel(level: number) {
        // 	if (!level) level = 0;
        // 	this.head.vipLevel = level
        // 	let vipCfg: table.TableVip = ConfigMgr.getInstance().getVipByLevel(level);
        // 	if (vipCfg) {
        // 		if (this.nickName_lbl) {
        // 			this.nickName_lbl.textColor = Number(vipCfg.nickNameColor);
        // 		}
        // 		if (this.head) {
        // 			this.head.visible = true;
        // 			this.head.frame = vipCfg.head_frame;
        // 		}
        // 	}
        // }
        BrSeat.prototype.setHeadFrame = function (level, personInfo) {
            if (this.head) {
                this.head.visible = true;
                this.head.destroy();
                if (personInfo) {
                    this.head.setHeadFrame(level, personInfo);
                }
                else
                    this.head.vipLevel = level;
            }
            if (level == 9)
                this.nickName_lbl.textColor = 0xff0000;
            else
                this.nickName_lbl.textColor = 0xffffff;
        };
        BrSeat.CHIPCHANCE = false;
        return BrSeat;
    }(eui.Component));
    chessCommonLib.BrSeat = BrSeat;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var BrSeatVo = /** @class */ (function (_super) {
        __extends(BrSeatVo, _super);
        function BrSeatVo(obj) {
            return _super.call(this, obj) || this;
        }
        return BrSeatVo;
    }(uniLib.Reflect));
    chessCommonLib.BrSeatVo = BrSeatVo;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var GameTaskButton = /** @class */ (function (_super) {
        __extends(GameTaskButton, _super);
        function GameTaskButton(gameid) {
            var _this = _super.call(this) || this;
            _this.gameId = 0;
            if (gameid)
                _this.gameId = gameid;
            _this.skinName = "GameTaskButtonSkin";
            return _this;
        }
        GameTaskButton.prototype.addEvents = function () {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(chessCommonLib.CommonModelEvent.RESPOND_TASK_SCHEDULE, this.onEventHandler, this);
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
        };
        GameTaskButton.prototype.onRemoveFromStage = function (evt) {
            this.destroy();
        };
        GameTaskButton.prototype.removeEvents = function () {
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
            uniLib.Global.addEventListener(chessCommonLib.CommonModelEvent.RESPOND_TASK_SCHEDULE, this.onEventHandler, this);
        };
        GameTaskButton.prototype.onTouchHandle = function (e) {
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.TASK, this.gameId);
        };
        GameTaskButton.prototype.onEventHandler = function (evt) {
            var result = evt.param;
            this.progress_text.textFlow = [{ text: "(", style: { "size": 24 } },
                { text: result.pre + "", style: { "size": 24, "textColor": 0xaec6fe } }, { text: "/" + result.back + ")", style: { "size": 24 } }];
            if (result.receive == 1)
                this.startRoate();
            else
                this.stopRoate();
        };
        GameTaskButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvents();
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.REQUEST_TASK_SCHEDULE, this.gameId);
        };
        GameTaskButton.prototype.startRoate = function () {
            var _this = this;
            egret.setTimeout(function () {
                _this.light_rotate.visible = true;
                egret.Tween.get(_this.light_rotate, { loop: true })
                    .to({ rotation: 359 }, 4000);
            }, this, 200);
        };
        GameTaskButton.prototype.stopRoate = function () {
            egret.Tween.removeTweens(this.light_rotate);
            this.light_rotate.visible = false;
        };
        GameTaskButton.prototype.destroy = function () {
            this.removeEvents();
            this.stopRoate();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GameTaskButton;
    }(eui.Component));
    chessCommonLib.GameTaskButton = GameTaskButton;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var ShiShiCaiButton = /** @class */ (function (_super) {
        __extends(ShiShiCaiButton, _super);
        function ShiShiCaiButton() {
            var _this = _super.call(this) || this;
            _this.skinName = "ShiShiCaiButtonSkin";
            return _this;
        }
        ShiShiCaiButton.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.REQUEST_SHISHICAI_INFO);
        };
        ShiShiCaiButton.prototype.addEvent = function () {
            this.once(egret.Event.REMOVED_FROM_STAGE, this.onRemoveFromStage, this);
            uniLib.Global.addEventListener(chessCommonLib.CommonModelEvent.RESPOND_SHISHICAI_INFO, this.getSscStatus, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
        };
        ShiShiCaiButton.prototype.onRemoveFromStage = function (evt) {
            this.destroy();
        };
        ShiShiCaiButton.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(chessCommonLib.CommonModelEvent.RESPOND_SHISHICAI_INFO, this.getSscStatus, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.touchHandle, this);
        };
        ShiShiCaiButton.prototype.touchHandle = function () {
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SSC);
        };
        //大厅获取时时彩信息
        ShiShiCaiButton.prototype.getSscStatus = function (evt) {
            this._data = evt.param;
            if (this._data["status"] == 1) {
                if (this._data["time"] == 0)
                    this._data["time"] = 0;
                this._timer.text = "倒计时:" + this._data["time"].toString();
            }
            else if (this._data["status"] == 2) {
                this._timer.text = "结算中";
            }
            if (!this.timer) {
                this.timer = new egret.Timer(1000);
                this.timer.addEventListener(egret.TimerEvent.TIMER, this.runTime, this);
                this.timer.start();
            }
        };
        /**
         * 更新时间
         */
        ShiShiCaiButton.prototype.runTime = function () {
            if (this._data["time"] <= 0) {
                this._data["time"] = 0;
            }
            else {
                this._data["time"]--;
                if (this._data["time"] <= 0)
                    this._data["time"] = 0;
            }
            if (this._data["status"] == 1)
                this._timer.text = "倒计时:" + this._data["time"].toString();
            else if (this._data["status"] == 2)
                this._timer.text = "结算中";
        };
        ShiShiCaiButton.prototype.destroy = function () {
            this.removeEvent();
            if (this.timer) {
                this.timer.stop();
                this.timer.removeEventListener(egret.TimerEvent.TIMER, this.runTime, this);
                this.timer = null;
            }
        };
        return ShiShiCaiButton;
    }(eui.Component));
    chessCommonLib.ShiShiCaiButton = ShiShiCaiButton;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var AutoChipChoicePanel = /** @class */ (function (_super) {
        __extends(AutoChipChoicePanel, _super);
        function AutoChipChoicePanel() {
            var _this = _super.call(this) || this;
            _this.skinName = "AutoChipChoicePanel";
            return _this;
        }
        AutoChipChoicePanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            //通过显示列表控制显示，保证不同规则的contentHeight适应
            this.init();
        };
        AutoChipChoicePanel.prototype.init = function () {
            this.fiveChipValueArray = [];
            if (this.isFirstEnterGame) {
                // this.fiveChipValueArray = [1, 10, 100, 500, 2000];
            }
            this.addEvent();
        };
        AutoChipChoicePanel.prototype.addEvent = function () {
            this.chipClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chipCloseHander, this);
            this.chip_1.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_50.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_100.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_250.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_500.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_1000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10000.addEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.confirmBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        };
        AutoChipChoicePanel.prototype.removeEvent = function () {
            this.chipClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chipCloseHander, this);
            this.chip_1.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_50.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_100.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_250.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_500.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_1000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_2000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_5000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.chip_10000.removeEventListener(eui.UIEvent.CHANGE, this.chipOnChange, this);
            this.confirmBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmBtnClick, this);
        };
        /**关闭当前面板 */
        AutoChipChoicePanel.prototype.chipCloseHander = function (evt) {
            if (this.closeFun) {
                this.closeFun.apply(this);
            }
        };
        AutoChipChoicePanel.prototype.chipOnChange = function (evt) {
            if (this.fiveChipValueArray.length > 4 && evt.target.selected) {
                uniLib.TipsUtils.showTipsDownToUp("请选择5个下注筹码~", 0xffffff);
                if (evt.target.selected) {
                    evt.target.selected = false;
                }
                return;
            }
            switch (evt.target) {
                case this.chip_1:
                    if (this.chip_1.selected) {
                        this.fiveChipValueArray.push(1);
                    }
                    else {
                        this.removeObjectFromArray(1);
                    }
                    break;
                case this.chip_2:
                    if (this.chip_2.selected) {
                        this.fiveChipValueArray.push(2);
                    }
                    else {
                        this.removeObjectFromArray(2);
                    }
                    break;
                case this.chip_5:
                    if (this.chip_5.selected) {
                        this.fiveChipValueArray.push(5);
                    }
                    else {
                        this.removeObjectFromArray(5);
                    }
                    break;
                case this.chip_10:
                    if (this.chip_10.selected) {
                        this.fiveChipValueArray.push(10);
                    }
                    else {
                        this.removeObjectFromArray(10);
                    }
                    break;
                case this.chip_50:
                    if (this.chip_50.selected) {
                        this.fiveChipValueArray.push(50);
                    }
                    else {
                        this.removeObjectFromArray(50);
                    }
                    break;
                case this.chip_100:
                    if (this.chip_100.selected) {
                        this.fiveChipValueArray.push(100);
                    }
                    else {
                        this.removeObjectFromArray(100);
                    }
                    break;
                case this.chip_250:
                    if (this.chip_250.selected) {
                        this.fiveChipValueArray.push(250);
                    }
                    else {
                        this.removeObjectFromArray(250);
                    }
                    break;
                case this.chip_500:
                    if (this.chip_500.selected) {
                        this.fiveChipValueArray.push(500);
                    }
                    else {
                        this.removeObjectFromArray(500);
                    }
                    break;
                case this.chip_1000:
                    if (this.chip_1000.selected) {
                        this.fiveChipValueArray.push(1000);
                    }
                    else {
                        this.removeObjectFromArray(1000);
                    }
                    break;
                case this.chip_2000:
                    if (this.chip_2000.selected) {
                        this.fiveChipValueArray.push(2000);
                    }
                    else {
                        this.removeObjectFromArray(2000);
                    }
                    break;
                case this.chip_5000:
                    if (this.chip_5000.selected) {
                        this.fiveChipValueArray.push(5000);
                    }
                    else {
                        this.removeObjectFromArray(5000);
                    }
                    break;
                case this.chip_10000:
                    if (this.chip_10000.selected) {
                        this.fiveChipValueArray.push(10000);
                    }
                    else {
                        this.removeObjectFromArray(10000);
                    }
                    break;
                default:
                    break;
            }
        };
        AutoChipChoicePanel.prototype.confirmBtnClick = function (evt) {
            if (this.fiveChipValueArray.length < 5) {
                uniLib.TipsUtils.showTipsDownToUp("请选择5个下注筹码~", 0xffffff);
            }
            else if (this.fiveChipValueArray.length == 5) {
                var req = new Cmd.CustomBetChipsCmd_C();
                req.betchips = this.fiveChipValueArray;
                uniLib.NetMgr.tcpSend(req);
                if (this.closeFun) {
                    this.closeFun.apply(this);
                }
            }
            else {
                uniLib.TipsUtils.showTipsDownToUp("请选择5个下注筹码~", 0xffffff);
            }
        };
        AutoChipChoicePanel.prototype.removeObjectFromArray = function (chipNum) {
            for (var i = 0; i < this.fiveChipValueArray.length; i++) {
                if (chipNum == this.fiveChipValueArray[i]) {
                    this.fiveChipValueArray.splice(i, 1);
                }
            }
        };
        AutoChipChoicePanel.prototype.destory = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return AutoChipChoicePanel;
    }(eui.Component));
    chessCommonLib.AutoChipChoicePanel = AutoChipChoicePanel;
})(chessCommonLib || (chessCommonLib = {}));

/**
 * 统一风格面板
 */
var chessCommonLib;
(function (chessCommonLib) {
    var Panel = /** @class */ (function () {
        function Panel() {
        }
        return Panel;
    }());
    chessCommonLib.Panel = Panel;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var TabBar = /** @class */ (function (_super) {
        __extends(TabBar, _super);
        function TabBar() {
            var _this = _super.call(this) || this;
            _this._items = {};
            return _this;
        }
        TabBar.prototype.setdata = function (menuArray, containerOrThis, index) {
            if (this._menuCollection == null)
                this._menuCollection = new eui.ArrayCollection();
            var len = menuArray.length;
            if (containerOrThis) {
                this._containerOrThis = containerOrThis;
            }
            if (index) {
                this._index = index;
            }
            if (typeof (menuArray[0]) == "string") {
                for (var i = 0; i < len; i++) {
                    var item = {};
                    item.index = i;
                    item.label = menuArray[i];
                    if (i == 0) {
                        item.skin = TabBarLst.FIRST;
                    }
                    else if (i == len - 1) {
                        item.skin = TabBarLst.LAST;
                    }
                    this._menuCollection.addItem(item);
                }
                if (this._menuCollection) {
                    this.dataProvider = this._menuCollection;
                    // this.itemRendererFunction = this.menuRendererFunc;
                }
            }
            else {
                for (var i = 0; i < len; i++) {
                    var item = menuArray[i];
                    item.index = i;
                    if (i == 0) {
                        item.skin = TabBarLst.FIRST;
                    }
                    else if (i == len - 1) {
                        item.skin = TabBarLst.LAST;
                    }
                    this._menuCollection.addItem(item);
                }
                this.dataProvider = this._menuCollection;
                // this.itemRendererFunction = this.menuRendererFunc;
                this.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMenuItemTap, this);
                if (!this._index) {
                    this._index = 0;
                }
                this.showItem(this._menuCollection.getItemAt(this._index));
            }
            this.selectedIndex = this._index;
        };
        TabBar.prototype.onMenuItemTap = function (e) {
            var item = e.item;
            this.showItem(item);
        };
        TabBar.prototype.showItem = function (vo) {
            if (vo.func) {
                vo.func.call(this._containerOrThis, vo);
            }
            else {
                if (this._currentPage) {
                    uniLib.DisplayUtils.removeFromParent(this._currentPage);
                    // this._currentPage.destroy();
                }
                if (this._items[vo.index] == null) {
                    var tabCls = vo.cls;
                    this._items[vo.index] = new tabCls();
                }
                this._currentPage = this._items[vo.index];
                this._containerOrThis.addChild(this._items[vo.index]);
            }
        };
        Object.defineProperty(TabBar.prototype, "itemsSkin", {
            //后续设置tabbar的可设置样式
            // private _leftItemSkin: any;
            // public set leftItemSKin(val: any) {
            // 	this._leftItemSkin = val;
            // }
            set: function (val) {
                this.itemRendererFunction = val;
            },
            enumerable: true,
            configurable: true
        });
        TabBar.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            if (this._menuCollection) {
                this.dataProvider = this._menuCollection;
                // this.itemRendererFunction = this.menuRendererFunc;
            }
        };
        // private menuRendererFunc(item: any): any {
        // 	if (item.skin == egret.HorizontalAlign.LEFT) {
        // 		return TabBarItemLeft;
        // 	} else if (item.skin == egret.HorizontalAlign.RIGHT) {
        // 		return TabBarItemRight;
        // 	} else {
        // 		return TabBarItemCenter;
        // 	}
        // }
        TabBar.prototype.destroy = function () {
            this.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onMenuItemTap, this);
            for (var i in this._items) {
                if (this._items[i]["destroy"]) {
                    this._items[i].destroy();
                }
                this._items[i] = null;
                delete this._items[i];
            }
            this._items = null;
        };
        return TabBar;
    }(eui.TabBar));
    chessCommonLib.TabBar = TabBar;
    var TabBarVO = /** @class */ (function () {
        function TabBarVO() {
        }
        return TabBarVO;
    }());
    chessCommonLib.TabBarVO = TabBarVO;
    /**
     * tabBar
     */
    var TabBarLst;
    (function (TabBarLst) {
        TabBarLst[TabBarLst["FIRST"] = 0] = "FIRST";
        TabBarLst[TabBarLst["LAST"] = 1] = "LAST"; //最后一个
    })(TabBarLst = chessCommonLib.TabBarLst || (chessCommonLib.TabBarLst = {}));
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var TabBarItemCenter = /** @class */ (function (_super) {
        __extends(TabBarItemCenter, _super);
        function TabBarItemCenter() {
            var _this = _super.call(this) || this;
            _this.skinName = "TabItemCenterSkin";
            return _this;
        }
        TabBarItemCenter.prototype.dataChanged = function () {
        };
        return TabBarItemCenter;
    }(eui.ItemRenderer));
    chessCommonLib.TabBarItemCenter = TabBarItemCenter;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var TabBarItemLeft = /** @class */ (function (_super) {
        __extends(TabBarItemLeft, _super);
        function TabBarItemLeft() {
            var _this = _super.call(this) || this;
            _this.skinName = "TabItemLeftSkin";
            return _this;
        }
        TabBarItemLeft.prototype.dataChanged = function () {
        };
        return TabBarItemLeft;
    }(eui.ItemRenderer));
    chessCommonLib.TabBarItemLeft = TabBarItemLeft;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var TabBarItemRight = /** @class */ (function (_super) {
        __extends(TabBarItemRight, _super);
        function TabBarItemRight() {
            var _this = _super.call(this) || this;
            _this.skinName = "TabItemRightSkin";
            return _this;
        }
        TabBarItemRight.prototype.dataChanged = function () {
        };
        return TabBarItemRight;
    }(eui.ItemRenderer));
    chessCommonLib.TabBarItemRight = TabBarItemRight;
})(chessCommonLib || (chessCommonLib = {}));

var Cmd;
(function (Cmd) {
    /**
    * 个人信息数据返回
    */
    function OnGetPersonalPanel_S(rev) {
        if (rev.resultCode) {
            return;
        }
        uniLib.Global.dispatchEvent(chessCommonLib.ZhiMaEventConsts.GET_USERINFO, rev.userInfo);
    }
    Cmd.OnGetPersonalPanel_S = OnGetPersonalPanel_S;
    /**
     * 礼物广播
     */
    function OnSendGiftRoomCmd_Brd(rev) {
        uniLib.Global.dispatchEvent(chessCommonLib.ZhiMaEventConsts.SEND_GIFT_NOTICE, rev);
    }
    Cmd.OnSendGiftRoomCmd_Brd = OnSendGiftRoomCmd_Brd;
    /**
     * 礼物失败返回
     */
    function OnSendGiftRoomCmd_S(rev) {
        if (rev.resultCode) {
            //    chessCommonLib.PublicTipMgr.getInstance().showMildWarnShow("礼物发送失败，返回码"+rev.resultCode);
        }
    }
    Cmd.OnSendGiftRoomCmd_S = OnSendGiftRoomCmd_S;
    function OnVoiceChat_Brd(rev) {
        uniLib.Global.dispatchEvent(chessCommonLib.ZhiMaEventConsts.VOICE_NOTICE, rev);
    }
    Cmd.OnVoiceChat_Brd = OnVoiceChat_Brd;
})(Cmd || (Cmd = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    /**
     * 动画 聊天
     */
    var zm_ChatPanel = /** @class */ (function (_super) {
        __extends(zm_ChatPanel, _super);
        function zm_ChatPanel(ShortTalkArr) {
            var _this = _super.call(this, "zm_chat_title_png") || this;
            _this._ShortTalkArr = ShortTalkArr;
            _this.skinName = "chessCommonLib.zm_ChatSkin";
            return _this;
        }
        zm_ChatPanel.prototype.initUI = function () {
            for (var i = 1; i <= 18; i++) {
                var face = new eui.RadioButton();
                face.skinName = "chessCommonLib.zm_FaceButtonSkin";
                face.iconDisplay.texture = RES.getRes("zmgame_face" + i);
                face.groupName = "face";
                face.value = i;
                this.faceGroup.addChild(face);
            }
            for (var i = 0; i < this._ShortTalkArr.length; i++) {
                var chat = new eui.RadioButton();
                chat.skinName = "chessCommonLib.zm_ChatRadioButtonSkin";
                chat.groupName = "chat";
                chat.value = i;
                chat.label = (i + 1) + "." + this._ShortTalkArr[i];
                chat.y = 56 * i;
                this.chatGroup.addChild(chat);
            }
            this.faceScroller.visible = true;
            this.chatScroller.visible = true;
            this.faceGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceGroupTap, this);
            this.chatGroup.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatGroupTap, this);
            this.touchEnabled = true;
            this.sendBtn.name = "short_send";
            this.sendBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.textField.addEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
        };
        zm_ChatPanel.prototype.onChatGroupTap = function (e) {
            if (!chessCommonLib.UserInfoMgr.isClick) {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
                return;
            }
            var target = e.target;
            if (target instanceof eui.RadioButton) {
                var name = "2" + target.value;
                var req = new Cmd.CommonChat_C();
                req.voiceId = Number(name);
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
                chessCommonLib.UserInfoMgr.isClick = false;
                setTimeout(function () {
                    chessCommonLib.UserInfoMgr.isClick = true;
                }, 3000);
            }
        };
        zm_ChatPanel.prototype.onFaceGroupTap = function (e) {
            if (!chessCommonLib.UserInfoMgr.isClick) {
                uniLib.TipsUtils.showTipsDownToUp("您的操作太频繁了！请休息一下吧");
                return;
            }
            var target = e.target;
            if (target instanceof eui.RadioButton) {
                var req = new Cmd.CommonChat_C();
                var id = "1" + target.value;
                req.voiceId = Number(id);
                uniLib.NetMgr.tcpSend(req);
                uniLib.PopUpMgr.removePopUp(this);
                chessCommonLib.UserInfoMgr.isClick = false;
                setTimeout(function () {
                    chessCommonLib.UserInfoMgr.isClick = true;
                }, 3000);
            }
        };
        zm_ChatPanel.prototype.onTouchTap = function (e) {
            if (e.target == this.textField) {
                e.target.setFocus();
            }
        };
        zm_ChatPanel.prototype.sendClickHandler = function (e) {
            var self = this;
            var content = this.textField.text;
            if (content == "") {
                chessCommonLib.UserInfoMgr.isClick = true;
                uniLib.TipsUtils.showTipsDownToUp("聊天内容不能为空", true);
                return;
            }
            var req = new Cmd.CommonChat_C();
            req.words = this.textField.text;
            uniLib.NetMgr.tcpSend(req);
            this.textField.text = "";
            uniLib.PopUpMgr.removePopUp(this);
        };
        zm_ChatPanel.prototype.destroy = function () {
            this.textField.removeEventListener(egret.TextEvent.FOCUS_OUT, uniLib.ZQGameSdk.hideVk, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.faceGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onFaceGroupTap, this);
            this.chatGroup.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onChatGroupTap, this);
            this.sendBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendClickHandler, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchTap, this);
            this.sendBtn = null;
            this.textField.text = "";
            uniLib.DisplayUtils.removeAllChildren(this._content);
            uniLib.DisplayUtils.removeFromParent(this._content);
            _super.prototype.destroy.call(this);
        };
        return zm_ChatPanel;
    }(chessCommonLib.BaseEuiPanel));
    chessCommonLib.zm_ChatPanel = zm_ChatPanel;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var zm_GiftAnItem = /** @class */ (function (_super) {
        __extends(zm_GiftAnItem, _super);
        function zm_GiftAnItem() {
            var _this = _super.call(this) || this;
            _this.index = 0;
            return _this;
        }
        zm_GiftAnItem.prototype.initUI = function () {
        };
        Object.defineProperty(zm_GiftAnItem.prototype, "giftId", {
            set: function (id) {
                this._giftId = id;
                if (!this._effectMc) {
                    this._effectMc = uniLib.DragonUtils.createDragonBonesDisplay("gift_effect_drag_ske_json", "gift_effect_drag_tex_json", "gift_effect_drag_tex_png", "MovieClip");
                    dragonBones.WorldClock.clock.add(this._effectMc);
                    this._effectMc.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationEvent, this);
                }
                this._effectMc.animation.gotoAndStopByFrame("gift" + this._giftId, 0);
                this.addChild(this._effectMc.display);
            },
            enumerable: true,
            configurable: true
        });
        zm_GiftAnItem.prototype.onAnimationEvent = function () {
            this.index++;
            if (!this._effectMc)
                return;
            this._effectMc.animation.stop("gift" + this._giftId);
            this.destory();
            this.index = 0;
        };
        zm_GiftAnItem.prototype.play = function () {
            if (this._effectMc == null)
                return;
            if (!dragonBones.WorldClock.clock.contains(this._effectMc)) {
                dragonBones.WorldClock.clock.add(this._effectMc);
            }
            this._effectMc.animation.play("gift" + this._giftId);
            var sound = "zm_GiftSound" + this._giftId + "_mp3";
            if (sound != "") {
                uniLib.SoundMgr.instance.playSound(sound);
            }
        };
        zm_GiftAnItem.prototype.destory = function () {
            if (this._effectMc) {
                this._effectMc.animation.stop();
                this._effectMc.removeEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, this.onAnimationEvent, this);
                uniLib.DragonUtils.destoryDragonBonesArmature(this._effectMc, "gift" + this._giftId);
                if (this._effectMc.display) {
                    this.removeChild(this._effectMc.display);
                }
            }
            this._effectMc = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return zm_GiftAnItem;
    }(egret.DisplayObjectContainer));
    chessCommonLib.zm_GiftAnItem = zm_GiftAnItem;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var zm_HelpPanel = /** @class */ (function (_super) {
        __extends(zm_HelpPanel, _super);
        function zm_HelpPanel(titletxt, typetxt, contentTxt) {
            var _this = _super.call(this, "zm_help_title_png") || this;
            _this._typetext = typetxt;
            _this._contenttext = contentTxt;
            _this._titletext = titletxt;
            _this.skinName = "chessCommonLib.zm_HelpSkin";
            return _this;
        }
        zm_HelpPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        zm_HelpPanel.prototype.initUI = function () {
            this._titleTxt.text = this._titletext;
            this._typeTxt.text = this._typetext;
            this._contenttext = this._contenttext.replace(/#113780/g, "#e9dd1d"); //大厅批量替换规则字体贪色
            if (!this._contenttext) {
                this._contenttext = "暂无";
            }
            this._contentTxt.textFlow = (new egret.HtmlTextParser).parser(this._contenttext);
        };
        zm_HelpPanel.prototype.loadTable = function () {
            return RES.getRes("TableGift_json");
        };
        zm_HelpPanel.prototype.destory = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._titleTxt = null;
            this._typeTxt = null;
            this._contentTxt = null;
            this._contenttext = null;
            this._typetext = null;
            this._titletext = null;
        };
        return zm_HelpPanel;
    }(chessCommonLib.BaseEuiPanel));
    chessCommonLib.zm_HelpPanel = zm_HelpPanel;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var zm_SetPanelBtnType;
    (function (zm_SetPanelBtnType) {
        zm_SetPanelBtnType[zm_SetPanelBtnType["BtnMusic"] = 0] = "BtnMusic";
        zm_SetPanelBtnType[zm_SetPanelBtnType["BtnSound"] = 1] = "BtnSound";
        zm_SetPanelBtnType[zm_SetPanelBtnType["BtnLocalSound"] = 2] = "BtnLocalSound";
    })(zm_SetPanelBtnType = chessCommonLib.zm_SetPanelBtnType || (chessCommonLib.zm_SetPanelBtnType = {}));
    var zm_SetPanel = /** @class */ (function (_super) {
        __extends(zm_SetPanel, _super);
        function zm_SetPanel(bgResArr) {
            var _this = _super.call(this, "game_sp_title_png", 690, 403) || this;
            //壁纸小图当前位置指针
            _this._index = 0;
            //壁纸小图对象数组
            _this._bgImgArr = [];
            _this.skinName = "chessCommonLib.zm_SetPanelSKin";
            if (!bgResArr || bgResArr.length == 0) {
                throw new Error('小图资源数组不能为空');
            }
            _this._bgResArr = bgResArr;
            return _this;
        }
        zm_SetPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        zm_SetPanel.prototype.onComplete = function () {
        };
        zm_SetPanel.prototype.initUI = function () {
            for (var _i = 0, _a = this._bgResArr; _i < _a.length; _i++) {
                var resName = _a[_i];
                var res = RES.getRes(resName);
                if (!res) {
                    throw new Error('小图资源没有获取到,资源名:' + resName);
                }
                var img = new eui.Image();
                img.texture = res;
                img.name = resName;
                img.width = this._imgGroup.width;
                img.height = this._imgGroup.height;
                this._bgImgArr.push(img);
            }
            //添加遮罩
            var rect = new egret.Rectangle(0, 0, this._imgGroup.width, this._imgGroup.height);
            this._imgGroup.mask = rect;
            //根据现有的音量设置音量初始化开关
            if (!Number(uniLib.Utils.getLocalStorage("SoundVolime"))) {
                this.soundBtn.selected = true;
            }
            if (!Number(uniLib.Utils.getLocalStorage("MusicVolime"))) {
                this.musicBtn.selected = true;
            }
            if (!zm_SetPanel.LocalSoundStatus) {
                this.musicBtn.selected = true;
            }
            //根据现有的背景初始化小背景图片
            if (zm_SetPanel.BgResName) {
                var initIndex = this._bgResArr.indexOf(zm_SetPanel.BgResName);
                if (initIndex != -1) {
                    //添加上次设置的图片到到显示区
                    this._imgGroup.addChild(this._bgImgArr[initIndex]);
                    this._index = initIndex;
                }
            }
            else {
                //添加第一个壁纸小图到显示区
                this._imgGroup.addChild(this._bgImgArr[0]);
            }
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
        };
        //事件派发
        zm_SetPanel.prototype.onSoundHandle = function (evt) {
            var evtData;
            //设置事件data
            if (evt.target == this.musicBtn) {
                if (evt.target.selected) {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    evtData = { evtType: zm_SetPanel.SetPanelEvtTypeMusicOff };
                }
                else {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    evtData = { evtType: zm_SetPanel.SetPanelEvtTypeMusicOn };
                }
            }
            else if (evt.target == this.soundBtn) {
                if (evt.target.selected) {
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    evtData = { evtType: zm_SetPanel.SetPanelEvtTypeSoundOff };
                }
                else {
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    evtData = { evtType: zm_SetPanel.SetPanelEvtTypeSoundOn };
                }
            }
            else if (evt.target == this.localSoundBtn) {
                if (evt.target.selected) {
                    zm_SetPanel.LocalSoundStatus = false;
                    evtData = { evtType: zm_SetPanel.SetPanelEvtTypeLocalSoundOff };
                }
                else {
                    zm_SetPanel.LocalSoundStatus = true;
                    evtData = { evtType: zm_SetPanel.SetPanelEvtTypeLocalSoundOn };
                }
            }
            this.dispatchEventWith(zm_SetPanel.SetPanelEvtOccur, false, evtData);
        };
        //按钮禁用
        zm_SetPanel.prototype.disableBtn = function (btnType) {
            var eleBtn;
            switch (btnType) {
                case zm_SetPanelBtnType.BtnMusic:
                    eleBtn = this.musicBtn;
                    break;
                case zm_SetPanelBtnType.BtnSound:
                    eleBtn = this.soundBtn;
                    break;
                case zm_SetPanelBtnType.BtnLocalSound:
                    eleBtn = this.localSoundBtn;
            }
            eleBtn.enabled = false;
        };
        zm_SetPanel.prototype.onBgCh = function (evt) {
            //只有一张图，不换
            if (this._bgImgArr.length == 1) {
                return;
            }
            var nextImg;
            var nextIndex;
            if (evt.target == this.leftBtn) {
                //左按钮点击
                if (this._bgImgArr[this._index + 1]) {
                    //没到最后一张图
                    nextIndex = this._index + 1;
                }
                else {
                    //现在是最后一张图，切换到第一张图
                    nextIndex = 0;
                }
                nextImg = this._bgImgArr[nextIndex];
                //把下一张图加到右侧
                nextImg.x = this._imgGroup.width;
                this._imgGroup.addChild(nextImg);
                //缓动
                this.moveEffect(this._bgImgArr[this._index], false, nextIndex, false);
                this.moveEffect(nextImg, false, nextIndex, true);
            }
            else if (evt.target == this.rightBtn) {
                //右按钮点击
                if (this._bgImgArr[this._index - 1]) {
                    //没到第一张图
                    nextIndex = this._index - 1;
                }
                else {
                    //现在第一张图，切换到最后一张图
                    nextIndex = this._bgImgArr.length - 1;
                }
                nextImg = this._bgImgArr[nextIndex];
                //把下一张图加到左侧
                nextImg.x = -this._imgGroup.width;
                this._imgGroup.addChild(nextImg);
                //缓动
                this.moveEffect(this._bgImgArr[this._index], true, nextIndex, false);
                this.moveEffect(nextImg, true, nextIndex, true);
            }
            //保存当前小图资源名
            zm_SetPanel.BgResName = this._bgResArr[nextIndex];
        };
        /**
         *
         * @param {eui.Image} img  //要缓动的图片
         * @param {boolean} direct //0:向左缓动,1:向右缓动
         * @param {number} nextIndex//下一个index
         * @param {boolean} sendEvt//是否派发换壁纸事件

         */
        zm_SetPanel.prototype.moveEffect = function (img, direct, nextIndex, sendEvt) {
            var _this = this;
            var flag;
            if (direct) {
                flag = 1;
                this.rightBtn.touchEnabled = false;
                this.leftBtn.touchEnabled = false;
            }
            else {
                flag = -1;
                this.rightBtn.touchEnabled = false;
                this.leftBtn.touchEnabled = false;
            }
            egret.Tween.get(img).to({ x: img.x + this._imgGroup.width * flag }, 300, egret.Ease.sineInOut).call(function () {
                _this._index = nextIndex;
                _this.rightBtn.touchEnabled = true;
                _this.leftBtn.touchEnabled = true;
                if (!sendEvt) {
                    return;
                }
                //事件派发
                var data = {
                    index: nextIndex,
                    resName: _this._bgResArr[nextIndex],
                    evtType: zm_SetPanel.SetPanelEvtChBg
                };
                _this.dispatchEventWith(zm_SetPanel.SetPanelEvtOccur, false, data);
            });
        };
        zm_SetPanel.prototype.removeEvent = function () {
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
        };
        zm_SetPanel.SetPanelEvtOccur = "EvtOccur";
        //保存桌布资源名
        zm_SetPanel.BgResName = '';
        //保存方言状态
        zm_SetPanel.LocalSoundStatus = true;
        //事件种类
        zm_SetPanel.SetPanelEvtTypeMusicOff = "music_off";
        zm_SetPanel.SetPanelEvtTypeMusicOn = "music_on";
        zm_SetPanel.SetPanelEvtTypeSoundOff = "sound_off";
        zm_SetPanel.SetPanelEvtTypeSoundOn = "sound_on";
        zm_SetPanel.SetPanelEvtTypeLocalSoundOff = "local_sound_off";
        zm_SetPanel.SetPanelEvtTypeLocalSoundOn = "local_sound_on";
        zm_SetPanel.SetPanelEvtChBg = "chBg";
        return zm_SetPanel;
    }(chessCommonLib.BaseEuiPanel));
    chessCommonLib.zm_SetPanel = zm_SetPanel;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var zm_UserInfoPanel = /** @class */ (function (_super) {
        __extends(zm_UserInfoPanel, _super);
        function zm_UserInfoPanel(uid) {
            var _this = _super.call(this, "zm_userinfo_title_png") || this;
            _this._uid = uid;
            _this.skinName = "chessCommonLib.zm_UserInfoSKin";
            return _this;
        }
        zm_UserInfoPanel.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
        };
        zm_UserInfoPanel.prototype.initUI = function () {
            this._gift_group = new eui.Group;
            this._gift_group.x = 39;
            this._gift_group.y = 323;
            this._gift_group.width = 712;
            this._gift_group.height = 169;
            this.addChild(this._gift_group);
            var item;
            var arr = this.loadTable();
            for (var i = 0; i < arr.length; i++) {
                item = new chessCommonLib.zm_GiftItem();
                item.data = arr[i];
                item.x = 6 + 120 * i;
                item.y = 0;
                this._gift_group.addChild(item);
                item.name = arr[i].giftId + "";
                item.touchEnabled = true;
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendGiftHandle, this);
            }
        };
        zm_UserInfoPanel.prototype.loadTable = function () {
            return RES.getRes("TableGift_json");
        };
        zm_UserInfoPanel.prototype.addEvent = function () {
            uniLib.Global.addEventListener(chessCommonLib.ZhiMaEventConsts.GET_USERINFO, this.showUserInfo, this);
            var info = new Cmd.GetPersonalPanel_C;
            info.uid = this._uid;
            uniLib.NetMgr.tcpSend(info);
        };
        zm_UserInfoPanel.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(chessCommonLib.ZhiMaEventConsts.GET_USERINFO, this.showUserInfo, this);
        };
        zm_UserInfoPanel.prototype.showUserInfo = function (data) {
            this._data = data.param;
            if (this._data.nickname) {
                this._name_lbl.text = this._data.nickname;
            }
            if (this._data.uid) {
                this._id_lbl.text = "帐号：" + this._data.uid + "";
            }
            if (this._data.gender == "nv") {
                this._gender_img.source = "zm_userinfo_famale_png";
            }
            else {
                this._gender_img.source = "zm_userinfo_male_png";
            }
            if (this._data.ip) {
                this._ip_lbl.text = "地址：" + this._data.ip;
            }
            else {
                this._ip_lbl.text = "未获取IP信息";
            }
            if (this._data.headurl) {
                this._head_img.source = this._data.headurl;
            }
            if (this._data.diamond) {
                if (this._data.chips >= 100000) {
                    this._diamond_lbl.text = chessCommonLib.NumberUtil.numFormat2(this._data.diamond);
                }
                else {
                    this._diamond_lbl.text = this._data.diamond + "";
                }
            }
            else {
                this._diamond_lbl.text = "0";
            }
            if (this._data.chips) {
                if (this._data.chips >= 100000) {
                    this._bean_lbl.text = chessCommonLib.NumberUtil.numFormat2(this._data.chips);
                }
                else {
                    this._bean_lbl.text = this._data.chips + "";
                }
            }
            else {
                this._bean_lbl.text = "0";
            }
            if (this._data.address) {
                this._gps_lbl.text = this._data.address;
            }
            else {
                this._gps_lbl.text = "";
            }
        };
        zm_UserInfoPanel.prototype.sendGiftHandle = function (evt) {
            var giftId = evt.currentTarget.name;
            if (this._data == null)
                return;
            if (this._data.uid == uniLib.UserInfo.uid) {
                var info = new Cmd.GiftsInfo();
                info.giftsId = Number(giftId);
                info.toUid = 0;
                info.fromUid = this._data.uid;
                info.giftsNum = 1;
            }
            else {
                var info = new Cmd.GiftsInfo();
                info.giftsId = Number(giftId);
                info.toUid = this._data.uid;
                info.fromUid = uniLib.UserInfo.uid;
                info.giftsNum = 1;
            }
            var req = new Cmd.SendGiftRoomCmd_C();
            req.gift = info;
            uniLib.NetMgr.tcpSend(req);
            this.destory();
        };
        zm_UserInfoPanel.prototype.destory = function () {
            uniLib.PopUpMgr.removePopUp(this);
            this.removeEvent();
            this._head_img = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._data = null;
            this._id_lbl = null;
            this._ip_lbl = null;
            this._gps_lbl = null;
            this._name_lbl = null;
            this._gender_img = null;
            this._bean_lbl = null;
            this._diamond_lbl = null;
        };
        return zm_UserInfoPanel;
    }(chessCommonLib.BaseEuiPanel));
    chessCommonLib.zm_UserInfoPanel = zm_UserInfoPanel;
    var zm_GiftItem = /** @class */ (function (_super) {
        __extends(zm_GiftItem, _super);
        function zm_GiftItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "chessCommonLib.zm_GiftItemSkin";
            return _this;
        }
        zm_GiftItem.prototype.dataChanged = function () {
            var data = this.data;
            this.name = data.giftId.toString();
            this._gift_img.texture = RES.getRes("zm_userinfo_gift" + data.giftId + "_png");
            this._gift_name.text = data.giftName != null ? data.giftName : "";
        };
        zm_GiftItem.prototype.destory = function () {
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return zm_GiftItem;
    }(eui.ItemRenderer));
    chessCommonLib.zm_GiftItem = zm_GiftItem;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    var zm_VoiceChat = /** @class */ (function (_super) {
        __extends(zm_VoiceChat, _super);
        function zm_VoiceChat(normal, down, x, y) {
            var _this = _super.call(this) || this;
            _this._isCancel = false;
            _this.initUI(normal, down, x, y);
            return _this;
        }
        zm_VoiceChat.prototype.initUI = function (normal, down, x, y) {
            this._startBtn = new uniLib.CommonButton(normal, down);
            this._startBtn.x = x;
            this._startBtn.y = y;
            this.addChild(this._startBtn);
            this._startBtn.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
            this._recording = new RecordingMc();
            this.addChild(this._recording);
            this._recording.x = (uniLib.Global.screenWidth - this._recording.width) / 2;
            this._recording.y = (uniLib.Global.screenHeight - this._recording.height) / 2;
            this._recording.addEventListener(chessCommonLib.ZhiMaEventConsts.RECORD_TIME_OUT, this.recordEvent, this);
            this._voiceArr = [];
            this.getContainer().addChild(this._recording);
        };
        zm_VoiceChat.prototype.getWidth = function () {
            return this._startBtn.width;
        };
        zm_VoiceChat.prototype.getHeight = function () {
            return this._startBtn.height;
        };
        zm_VoiceChat.prototype.recordEvent = function (evt) {
            this.stopRecord();
        };
        zm_VoiceChat.prototype.startRecord = function (evt) {
            this._isCancel = false;
            this._curPosY = evt.localY;
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
            egret.MainContext.instance.stage.addEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
            uniLib.ZQGameSdk.startRecord();
            this._recording.startTimer();
        };
        zm_VoiceChat.prototype.checkCancel = function (evt) {
            if (evt.localY > this._curPosY + 20) {
                this._isCancel = true;
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
                egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
                uniLib.ZQGameSdk.stopRecord();
                this._recording.stopTimer();
            }
        };
        zm_VoiceChat.prototype.stopRecord = function (evt) {
            if (evt === void 0) { evt = null; }
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
            var text = this._recording.stopTimer();
            if (text < 1000) {
                var self = this;
                setTimeout(function () {
                    uniLib.ZQGameSdk.stopRecord();
                }, 1000);
            }
            else {
                uniLib.ZQGameSdk.stopRecord(this.onRecordBack, this);
            }
        };
        zm_VoiceChat.prototype.onRecordBack = function (obj) {
            var self = this;
            var data = obj.data;
            if (obj.code == 0) {
                var voiceVo = new VoiceDataVo();
                voiceVo.url = data.voiceUrl;
                voiceVo.time = Math.round(data.voiceDuration / 1000);
                voiceVo.nickName = uniLib.UserInfo.uid.toString();
                voiceVo.text = data.text;
                voiceVo.status = 0;
                if (isNaN(voiceVo.time)) {
                    //时间为空
                    chessCommonLib.PublicTipMgr.getInstance().showMildWarnShow("语音发送失败");
                }
                else {
                    if (this._isCancel == false) {
                        this.dispatchEventWith(chessCommonLib.ZhiMaEventConsts.SEND_RECORD, false, voiceVo);
                    }
                }
            }
            else {
                chessCommonLib.PublicTipMgr.getInstance().showMildWarnShow(obj.errMsg);
            }
        };
        zm_VoiceChat.prototype.getContainer = function () {
            if (uniLib.SceneMgr.instance.currentScene.topLayer) {
                return uniLib.SceneMgr.instance.currentScene.topLayer;
            }
            return uniLib.SceneMgr.instance.currentScene;
        };
        zm_VoiceChat.prototype.destory = function () {
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_END, this.stopRecord, this);
            egret.MainContext.instance.stage.removeEventListener(egret.TouchEvent.TOUCH_MOVE, this.checkCancel, this);
            if (this._startBtn) {
                this._startBtn.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.startRecord, this);
                this._startBtn.destroy();
            }
            this._startBtn = null;
            if (this._recording) {
                this._recording.removeEventListener(chessCommonLib.ZhiMaEventConsts.RECORD_TIME_OUT, this.recordEvent, this);
                this._recording.dispose();
            }
            this._recording = null;
            var voice;
            for (var i = 0; i < this._voiceArr.length; i++) {
                voice = this._voiceArr[i];
                if (voice) {
                    voice.destory();
                }
            }
            this._voiceArr = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return zm_VoiceChat;
    }(egret.DisplayObjectContainer));
    chessCommonLib.zm_VoiceChat = zm_VoiceChat;
    var VoiceMc = /** @class */ (function (_super) {
        __extends(VoiceMc, _super);
        function VoiceMc() {
            var _this = _super.call(this) || this;
            _this._ifFlip = false;
            _this.initUI();
            return _this;
        }
        VoiceMc.prototype.initUI = function () {
            this._bg = uniLib.DisplayUtils.createBitmapByName("zm_voice_paopao_png");
            this._bg.scale9Grid = new egret.Rectangle(50, 10, 30, 20);
            this.addChild(this._bg);
            this._soundIcon = uniLib.DisplayUtils.createBitmapByName("zm_voice_icon_png");
            this._soundIcon.x = 24;
            this._soundIcon.y = 11;
            this.addChild(this._soundIcon);
            this._timeTxt = uniLib.DisplayUtils.createTextLabel(0xffffff, egret.HorizontalAlign.RIGHT, "", 18, 50);
            this._timeTxt.x = 48;
            this._timeTxt.y = 13;
            this.addChild(this._timeTxt);
        };
        VoiceMc.prototype.onTimer = function (evt) {
            this._soundIcon.visible = !this._soundIcon.visible;
            var date = new Date();
            var nowTime = date.getTime();
            var time = Math.floor((nowTime - this._startTime) / 1000);
            if (time >= this._soundTime) {
                this.stopTimer();
            }
        };
        VoiceMc.prototype.stopTimer = function () {
            this._soundIcon.visible = true;
            this.visible = false;
            if (this._timer) {
                this._timer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._timer.stop();
                this._timer = null;
            }
        };
        VoiceMc.prototype.flip = function () {
            this._ifFlip = true;
            this._timeTxt.skewY = 180;
            this._timeTxt.textAlign = egret.HorizontalAlign.LEFT;
        };
        VoiceMc.prototype.setData = function (vo) {
            if (vo.uid != uniLib.UserInfo.uid) {
                uniLib.ZQGameSdk.playRecord(vo.url, this.playEndBack, this);
            }
            if (vo.time) {
                this._timeTxt.text = vo.time + "''";
            }
            else {
                this._timeTxt.text = "";
            }
            this._soundTime = vo.time ? vo.time : 10;
            if (vo.time <= 3) {
                this._bg.width = 100;
            }
            else {
                this._bg.width = 100 + (vo.time - 3) * 5;
            }
            if (this._ifFlip) {
                this._timeTxt.x = this._bg.width - 12;
            }
            else {
                this._timeTxt.x = this._bg.width - 60;
            }
            this.stopTimer();
            this.visible = true;
            this._timer = new egret.Timer(200);
            this._timer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._timer.start();
            var date = new Date();
            this._startTime = date.getTime();
        };
        VoiceMc.prototype.playEndBack = function (obj) {
            this.stopTimer();
        };
        VoiceMc.prototype.destory = function () {
            this.stopTimer();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._bg = null;
            this._soundIcon = null;
        };
        return VoiceMc;
    }(egret.DisplayObjectContainer));
    chessCommonLib.VoiceMc = VoiceMc;
    var RecordingMc = /** @class */ (function (_super) {
        __extends(RecordingMc, _super);
        function RecordingMc() {
            var _this = _super.call(this) || this;
            _this._maxTime = 15;
            _this._msTime = 0;
            _this.initUI();
            return _this;
        }
        RecordingMc.prototype.initUI = function () {
            var recordbg = uniLib.DisplayUtils.createBitmapByName("zm_voice_recording_png");
            this.addChild(recordbg);
            this._moving = new egret.DisplayObjectContainer();
            this._moving.x = 104;
            this._moving.y = 102;
            var icon = uniLib.DisplayUtils.createBitmapByName("zm_voiceloading_png");
            icon.x = -icon.width / 2;
            icon.y = -icon.height / 2;
            this._moving.addChild(icon);
            this.addChild(this._moving);
            this._time = uniLib.DisplayUtils.createTextLabel(0xC6D7DE, egret.HorizontalAlign.CENTER, "8''", 22, 75);
            this._time.x = 74;
            this._time.y = 136;
            this.addChild(this._time);
            this.visible = false;
        };
        RecordingMc.prototype.startTimer = function () {
            this.stopTimer();
            this.visible = true;
            this._startTimer = new egret.Timer(50, 0);
            var date = new Date();
            this._startTime = date.getTime();
            this._startTimer.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
            this._startTimer.start();
        };
        RecordingMc.prototype.stopTimer = function () {
            this.visible = false;
            if (this._startTimer) {
                this._startTimer.removeEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._startTimer.stop();
                this._startTimer = null;
            }
            return this._msTime;
        };
        RecordingMc.prototype.onTimer = function (evt) {
            var date = new Date();
            var num = date.getTime();
            var nowT = Math.floor((num - this._startTime) / 1000);
            this._time.text = (nowT + 1) + "''";
            this._moving.rotation += 15;
            if (nowT >= this._maxTime) {
                this.dispatchEventWith(chessCommonLib.ZhiMaEventConsts.RECORD_TIME_OUT);
            }
            this._msTime = num - this._startTime;
        };
        RecordingMc.prototype.dispose = function () {
            this.stopTimer();
            if (this._moving) {
                uniLib.DisplayUtils.removeAllChildren(this._moving);
                uniLib.DisplayUtils.removeFromParent(this._moving);
            }
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._moving = null;
            this._time = null;
        };
        return RecordingMc;
    }(egret.DisplayObjectContainer));
    chessCommonLib.RecordingMc = RecordingMc;
    var VoiceDataVo = /** @class */ (function () {
        function VoiceDataVo() {
        }
        return VoiceDataVo;
    }());
    chessCommonLib.VoiceDataVo = VoiceDataVo;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    /**
     * 公共组
     */
    var GrpConsts = /** @class */ (function () {
        function GrpConsts() {
        }
        /**
         * VIP资源组
         */
        GrpConsts.CHESS_COMMON_VIP = "chess_common_vip";
        /**
         * 头像组
         */
        GrpConsts.CHESS_COMMON_HEAD = "chess_common_head";
        /**
         * head
         */
        GrpConsts.CHESS_COMMON_TEST = "chess_common_test";
        /**
         * chat
         */
        GrpConsts.CHESS_COMMON_CHAT = "chess_common_chat";
        /**
         * chat3
         */
        GrpConsts.CHESS_COMMON_CHAT3 = "chess_common_chat3";
        /**
         * 礼物音效
         */
        GrpConsts.CHESS_COMMON_GIFT_SOUND = "chess_common_gift_sound";
        /**
        * VIP等级动画
        */
        GrpConsts.CHESS_COMMON_ANIM_VIP = "chess_common_anim_vip";
        /**
         * 其他资源
         */
        GrpConsts.CHESS_COMMON_OTHER = "chess_common_other";
        /**
         * 三张
         */
        GrpConsts.CHESS_COMMON_SANZHANG = "chess_common_sanzhang";
        /*
        * 芝麻斗牌
        */
        GrpConsts.CHESS_COMMON_ZHIMA = "chess_common_zhima";
        /*
        * 漳州
        */
        GrpConsts.CHESS_COMMON_ZHANGZHOU = "chess_common_zhangzhou";
        /*
    * 芝麻斗牌麻将结算
    */
        GrpConsts.CHESS_COMMON_ZHIMA_MAHJONG_RESULT = "chess_common_zhima_mahjong_result";
        /**
         * 表情聊天
         */
        GrpConsts.CHESS_COMMON_EMOJCHAT = "chess_common_emojchat";
        /**
         * 礼物动画
         */
        GrpConsts.CHESS_COMMON_GIFT_EFFECT = "chess_common_gift_effect";
        return GrpConsts;
    }());
    chessCommonLib.GrpConsts = GrpConsts;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var ModuleEnume = /** @class */ (function () {
        function ModuleEnume() {
        }
        return ModuleEnume;
    }());
    /**
     * 公共模块
     */
    var CommonModelEvent = /** @class */ (function () {
        function CommonModelEvent() {
        }
        /**
         * 用户信息模块
         */
        CommonModelEvent.USERINFO = "userInfo";
        /**
         * 商城
         */
        CommonModelEvent.SHOP = "shop";
        /**
         * 福利
         */
        CommonModelEvent.FULI = "fuli";
        /**
         * 活动
         */
        CommonModelEvent.ACTIVITY = "activity";
        /**
         * 任务
         */
        CommonModelEvent.TASK = "task";
        /**
         * 保险箱
         */
        CommonModelEvent.SAFEBOX = "safebox";
        /**
         * 邮件
         */
        CommonModelEvent.MAIL = "mail";
        /**
         * VIP
         */
        CommonModelEvent.VIP = "vipinfo";
        /**
         * 公告牌
         */
        CommonModelEvent.NOTICE = "notice";
        /**
         * 聊天
         */
        CommonModelEvent.CHAT = "chat";
        /**
         * 救济金
         */
        CommonModelEvent.FREECHIP = "freeChip";
        /**
         * 红包
         */
        CommonModelEvent.REDPACKAGE = "redpackage";
        /**
         * 好友
         */
        CommonModelEvent.FRIEND = "friend";
        /**
         * 排行榜
         */
        CommonModelEvent.RANK = "rank";
        /**
         *请求游戏进度数据
         */
        CommonModelEvent.REQUEST_TASK_SCHEDULE = "request_task_schedule";
        /**
         *返回游戏进度数据
         */
        CommonModelEvent.RESPOND_TASK_SCHEDULE = "respond_task_schedule";
        /**
         *请求时时彩信息
         */
        CommonModelEvent.REQUEST_SHISHICAI_INFO = "request_shishicai_info";
        /**
         *返回时时彩信息
         */
        CommonModelEvent.RESPOND_SHISHICAI_INFO = "respond_shishicai_info";
        /**
         * 广告牌点击
         */
        CommonModelEvent.SYSMSG_CLICK = "sysmsg_click";
        /**
         * 对局流水
         */
        CommonModelEvent.GAME_WATER = "game_water";
        /**
         * 游戏帮助
         */
        CommonModelEvent.GAME_HELP = "game_help";
        /**
         * 时时彩
         */
        CommonModelEvent.SSC = "ssc";
        /**
         *喜从天降活动广播
         */
        CommonModelEvent.SUPRISE_GIFT_CMD_BRD = "suprise_gift_cmd_Brd";
        /**
         *喜从天降充值成功
         */
        CommonModelEvent.SUPRISE_GIFT_RECHARGED = "suprise_gift_recharged";
        /**
         *打开福袋暴击红包
         */
        CommonModelEvent.BAOJI_REDPACK = "baoji_redpack";
        /**
         *打开无座玩家面板
         */
        CommonModelEvent.NO_SEAT_USER = "no_seat_user";
        /**
         *游戏调用大厅设置
         */
        CommonModelEvent.GAME_SETTING = "game_setting";
        /**
         *游戏记录  两个参数{gameId:175,skin:0}
         * skin 0:默认皮肤  1：绿色  2：蓝色  3紫色
         */
        CommonModelEvent.GAME_RECORD = "game_record";
        return CommonModelEvent;
    }());
    chessCommonLib.CommonModelEvent = CommonModelEvent;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var ConfigMgr = /** @class */ (function () {
        function ConfigMgr() {
            // /**暂存数据 管理对应的表数据 */
            // /**每日签到 */
            this.sign = {};
            /**道具表 */
            this.goods = {};
            /**商城物品 */
            this.shop = {};
            /**每日任务 充值任务等 */
            this.task = {};
            /**游戏配置列表 */
            this.lobbyGameList = {};
            /**游戏列表 */
            this.gameList = {};
            /**限时活动 */
            this.limit = {};
            /**幸运翻翻翻 */
            this.luck = {};
            /**游戏玩法列表 */
            this.playTypeList = {};
            this.headMc = {};
            /**
             * vip配置
             */
            this.vip = {};
            this._tableInited = false;
            /**游戏内周边功能显示控制 */
            this.gameOptions = new chessCommonLib.gameOptions();
            /**获取玩法列表 */
            this.getPlayTypeDes = function (id) {
                if (this.playTypeList[id]) {
                    return this.playTypeList[id].desc;
                }
                else {
                    return "";
                }
            };
        }
        ConfigMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new ConfigMgr();
            }
            return this._instance;
        };
        /**
         * 获取登录配置
         */
        ConfigMgr.prototype.getLoginCfg = function (tag) {
            if (tag === void 0) { tag = "default"; }
            if (this.loginData == null) {
                if (uniLib.Global.gameConfig) {
                    if (!uniLib.Global.gameConfig.lobbyId) {
                        uniLib.Global.gameConfig.lobbyId = 31;
                    }
                    this.loginData = uniLib.Global.gameConfig;
                }
                else {
                    this.loginData = RES.getRes("config_json")[tag];
                }
            }
            return this.loginData;
        };
        ConfigMgr.prototype.tableInited = function () {
            return this._tableInited;
        };
        /**
         * 初始化配置
         */
        ConfigMgr.prototype.initTables = function () {
            var _this = this;
            if (this._tableInited == true) {
                return;
            }
            this._tableInited = true;
            //加载表中数据
            var signTableData = RES.getRes("TableSignIn_json");
            if (signTableData) {
                signTableData.forEach(function (f) {
                    _this.sign[f.lobbyId] = f;
                });
            }
            var taskTableData = RES.getRes("LobbyTaskConfig_json");
            if (taskTableData) {
                taskTableData.forEach(function (f) {
                    _this.task[f.id] = f;
                });
            }
            var goodsTableData = RES.getRes("TableGoodsConfig_json");
            if (goodsTableData) {
                goodsTableData.forEach(function (f) {
                    _this.goods[f.goodId] = f;
                });
            }
            var gamelistTableData = RES.getRes("TableLobbyGameList_json");
            if (gamelistTableData) {
                gamelistTableData.forEach(function (f) {
                    _this.lobbyGameList[f.id] = f;
                });
            }
            var gameConfigTableData = RES.getRes("gameList_json");
            if (gameConfigTableData) {
                gameConfigTableData.forEach(function (f) {
                    _this.gameList[f.gameId] = f;
                });
            }
            var shopTableData = RES.getRes("TableShopConfig_json");
            if (shopTableData) {
                shopTableData.forEach(function (f) {
                    _this.shop[f.shopId] = f;
                });
            }
            var limitTableData = RES.getRes("TableLimitOfferConfig_json"); //限时优惠
            if (limitTableData) {
                limitTableData.forEach(function (f) {
                    _this.limit[f.id] = f;
                });
            }
            var vipTable = RES.getRes("TableVip_json"); //vip配置
            if (vipTable) {
                vipTable.forEach(function (f) {
                    if (!_this.vip[f.level] || (_this.vip[f.level] && _this.vip[f.level].lobbyId == 0)) {
                        _this.vip[f.level] = f;
                    }
                });
            }
            var headTable = RES.getRes("headMc_json"); //头像资源配置
            if (headTable) {
                headTable.forEach(function (f) {
                    _this.headMc[f.id] = f;
                });
            }
            var playtypeTable = RES.getRes("TablePlayTypeList_json"); //头像资源配置
            if (playtypeTable) {
                playtypeTable.forEach(function (f) {
                    _this.playTypeList[f.id] = f;
                });
            }
            //@autohr garr 冻结一下，兼容性应该没问题
            Object.freeze(this.sign);
            Object.freeze(this.task);
            Object.freeze(this.goods);
            Object.freeze(this.lobbyGameList);
            Object.freeze(this.gameList);
            Object.freeze(this.shop);
            Object.freeze(this.limit);
            Object.freeze(this.vip);
            Object.freeze(this.headMc);
            Object.freeze(this.playTypeList);
            console.log("table load success");
        };
        /**所有玩法id 转换desc  这个传入的参数就是玩法列表，目前的使用方法是
         * chessCommonLib.ConfigMgr.getInstance().getPlayTypeByList(game.RoomInfo.getInstance().playTypeList);
         * 其中game是mahjongClientLib里面的
         * @author garr
         * 2018-5-28
        */
        ConfigMgr.prototype.getPlayTypeByList = function (playTypeList) {
            if (!RES.hasRes("TablePlayTypeList_json"))
                return "";
            var desc = "";
            //
            if (!playTypeList || !playTypeList.length || playTypeList.length == 0) {
                playTypeList = [];
            }
            playTypeList.sort(function (a, b) {
                if (a > b)
                    return 1;
                else if (a == b)
                    return 0;
                return -1;
            });
            for (var i = 0; i < playTypeList.length; i++) {
                //兼容漳浦抓花 插花特殊玩法 俩如抓花玩法是464 抓花16 那么玩法为464.161 最后的1是方便排除10 20这样服务器小数点后为0识别不出
                if (playTypeList[i].toString().indexOf(".") != -1) {
                    var playStr = playTypeList[i].toString().split(".");
                    var name_1 = this.getPlayTypeDes(Number(playStr[0])) + playStr[1].substr(0, playStr[1].length - 1);
                    desc = desc + name_1;
                }
                var name_2 = this.getPlayTypeDes(playTypeList[i]);
                desc = desc + name_2 + "   ";
            }
            return desc;
        };
        /**
         * 通过签到ID获取任务配置
         */
        ConfigMgr.prototype.getSignCfgById = function (lobbyId) {
            if (this.sign[lobbyId]) {
                return this.sign[lobbyId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过任务ID获取任务配置
         */
        ConfigMgr.prototype.getTaskCfgById = function (taskId) {
            if (this.task[taskId]) {
                return this.task[taskId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过shopID获取商城配置
         */
        ConfigMgr.prototype.getShopCfgById = function (shopId) {
            if (this.shop[shopId]) {
                return this.shop[shopId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过goodId获取物品配置
         */
        ConfigMgr.prototype.getGoodCfgById = function (goodId) {
            if (this.goods[goodId]) {
                return this.goods[goodId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过goodId获取限时优惠配置
         */
        ConfigMgr.prototype.getLimitCfgById = function (limitId) {
            if (this.limit[limitId]) {
                return this.limit[limitId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过gameId获取游戏列表配置
         */
        ConfigMgr.prototype.getGameListCfgById = function (gameId) {
            if (this.lobbyGameList[gameId]) {
                return this.lobbyGameList[gameId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过游戏ID获得游戏配置项
         */
        ConfigMgr.prototype.getGameCfgById = function (gameId) {
            if (this.gameList[gameId]) {
                return this.gameList[gameId];
            }
            else {
                return null;
            }
        };
        /**
         * 通过vip等级获得vip
         */
        ConfigMgr.prototype.getVipByLevel = function (level) {
            if (level === void 0) { level = 0; }
            if (this.vip[level]) {
                return this.vip[level];
            }
            else {
                return null;
            }
        };
        /**
         * 通过id获取头像动画
         */
        ConfigMgr.prototype.getheadMcById = function (id) {
            if (id === void 0) { id = 0; }
            if (this.headMc[id]) {
                return this.headMc[id];
            }
            else {
                return null;
            }
        };
        ConfigMgr.prototype.getNameColor = function (level) {
            // if (this.vip[level]) {
            // 	return Number(this.vip[level].nickNameColor);
            // } else {
            // 	return 0xffffff;
            // }
            if (level == 9)
                return 0xff0000;
            else
                return 0xffffff;
        };
        /**
         * 获取gamelist配置
         */
        ConfigMgr.prototype.getGameListCfg = function (remoteBack, thisObj) {
            var gameList;
            try {
                gameList = JSON.parse(uniLib.Utils.getLocalStorage("gameList_cfg"));
            }
            catch (e) {
            }
            if (!gameList) {
                gameList = RES.getRes("gameList_json");
            }
            var configUrl;
            if (uniLib.Global.CdnDomains && uniLib.GameModuleUtils.gameRemotePaths) {
                configUrl = uniLib.Global.CdnDomains[0] + uniLib.GameModuleUtils.gameRemotePaths[0] + "gameList.json?v=" + Math.random();
            }
            var ret = uniLib.ResUtils.getRes(configUrl, function (data) {
                var jsonStr = JSON.stringify(uniLib.Utils.sortJson(data));
                if (uniLib.StringUtils.MD5(jsonStr) != uniLib.StringUtils.MD5(JSON.stringify(uniLib.Utils.sortJson(gameList)))) {
                    uniLib.Utils.setLocalStorage("gameList_cfg", jsonStr);
                    if (remoteBack) {
                        remoteBack.call(thisObj, data);
                    }
                }
            }, this, RES.ResourceItem.TYPE_JSON);
            return gameList;
        };
        return ConfigMgr;
    }());
    chessCommonLib.ConfigMgr = ConfigMgr;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    /**
     * 公用模块
     */
    var ModuleMgr = /** @class */ (function () {
        function ModuleMgr() {
            this.skinType = 3;
            //是否全屏
            this.isFullScreen = false;
        }
        ModuleMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new ModuleMgr();
            }
            return this._instance;
        };
        /**
         * 打开确认框
         */
        ModuleMgr.prototype.showConfirm = function (info, title, oktxt, okFunc, caltxt, calFunc, thisObj, cotainer) {
            if (oktxt != undefined && oktxt.trim() == "") {
                oktxt = "确定";
            }
            if (caltxt == "") {
                caltxt = "取消";
            }
            var msg = new uniLib.MsgBox(info, title, oktxt, okFunc, caltxt, calFunc, thisObj);
            cotainer = cotainer || null;
            uniLib.PopUpMgr.addPopUp(msg, cotainer, true, true, false, uniLib.PopUpEffect.CENTER);
        };
        return ModuleMgr;
    }());
    chessCommonLib.ModuleMgr = ModuleMgr;
})(chessCommonLib || (chessCommonLib = {}));

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var chessCommonLib;
(function (chessCommonLib) {
    /**
     * 轻提示
     */
    var PublicTipMgr = /** @class */ (function () {
        function PublicTipMgr() {
            this.showList = [];
        }
        PublicTipMgr.getInstance = function () {
            if (!PublicTipMgr.instance) {
                PublicTipMgr.instance = new PublicTipMgr();
            }
            return PublicTipMgr.instance;
        };
        PublicTipMgr.prototype.showTipsShow = function (msg) {
            this._tipsPanel = new egret.Sprite;
            this.getContainer().addChild(this._tipsPanel);
            var tipsBg = uniLib.DisplayUtils.createBitmapByName("zm_notice_bg_png");
            this._tipsPanel.addChild(tipsBg);
            var tipsTxt = uniLib.DisplayUtils.createTextLabel(0xababab, egret.HorizontalAlign.CENTER, msg, 20, tipsBg.width);
            tipsTxt.y = (tipsBg.height - tipsTxt.height) / 2;
            this._tipsPanel.addChild(tipsTxt);
            this._tipsPanel.x = (uniLib.Global.screenWidth - tipsBg.width) / 2;
            this._tipsPanel.y = -tipsBg.height;
            egret.Tween.get(this._tipsPanel).to({ y: 0 }, 200).wait(1000).to({ y: -tipsBg.height }, 200).call(this.destory, this);
        };
        PublicTipMgr.prototype.destory = function () {
            if (this._tipsPanel) {
                egret.Tween.removeTweens(this._tipsPanel);
                uniLib.DisplayUtils.removeAllChildren(this._tipsPanel);
                uniLib.DisplayUtils.removeFromParent(this._tipsPanel);
            }
            this._tipsPanel = null;
        };
        PublicTipMgr.prototype.getContainer = function () {
            if (uniLib.SceneMgr.instance.currentScene.topLayer) {
                return uniLib.SceneMgr.instance.currentScene.topLayer;
            }
            return uniLib.SceneMgr.instance.currentScene;
        };
        PublicTipMgr.prototype.showMildWarnShow = function (msg) {
            var alert = new MildAlertVC();
            alert.addEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
            alert.setText(msg);
            this.getContainer().addChild(alert);
            if (this.showList.length > 0) {
                for (var index = 0; index < this.showList.length; index++) {
                    this.showList[index].y -= alert.height;
                }
            }
            this.showList.push(alert);
        };
        PublicTipMgr.prototype.removeStage = function (evt) {
            var alert = evt.currentTarget;
            alert.removeEventListener(egret.Event.REMOVED_FROM_STAGE, this.removeStage, this);
            this.showList.splice(this.showList.indexOf(alert), 1);
            alert.destory();
            alert = null;
        };
        return PublicTipMgr;
    }());
    chessCommonLib.PublicTipMgr = PublicTipMgr;
    var MildAlertVC = /** @class */ (function (_super) {
        __extends(MildAlertVC, _super);
        function MildAlertVC() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        MildAlertVC.prototype.initUI = function () {
            this._bg = uniLib.DisplayUtils.createBitmapByName("zm_notice_bg_png");
            this.addChild(this._bg);
            this._text = uniLib.DisplayUtils.createTextLabel(0xFFFFFF, egret.HorizontalAlign.CENTER, "", 30, 88, 10, 786);
            this._text.multiline = true;
            this.addChild(this._text);
        };
        /**
         *
         * @param message
         *
         */
        MildAlertVC.prototype.setText = function (message) {
            if (!message) {
                return;
            }
            this._text.text = message;
            this._bg.height = this._text.textHeight * 2;
            this.x = Math.round((uniLib.Global.screenWidth - this.width) / 2);
            this.y = uniLib.Global.screenHeight;
            egret.Tween.get(this).to({ y: Math.round((uniLib.Global.screenHeight - this.height) / 2) - 60 }, 500, egret.Ease.circOut).call(this.showDelay, this);
        };
        MildAlertVC.prototype.showDelay = function () {
            egret.Tween.get(this).wait(2000).to({ y: -this.height }, 500, egret.Ease.circOut).call(this.destory, this);
        };
        MildAlertVC.prototype.destory = function () {
            egret.Tween.removeTweens(this);
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
            this._bg = null;
            this._text = null;
        };
        return MildAlertVC;
    }(egret.Sprite));
    chessCommonLib.MildAlertVC = MildAlertVC;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var UserInfoMgr = /** @class */ (function () {
        function UserInfoMgr() {
        }
        Object.defineProperty(UserInfoMgr, "ol_Time", {
            /**
            * 在线礼包时间
            */
            get: function () {
                return this._ol_Time;
            },
            /**
            * 在线礼包时间
            */
            set: function (time) {
                this._ol_Time = time;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "fangka", {
            get: function () {
                return this._fangka;
            },
            set: function (val) {
                if (this._fangka == val)
                    return;
                this._fangka = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.FANGKA);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "isClick", {
            get: function () {
                return this._isClick;
            },
            set: function (val) {
                if (this._isClick == val)
                    return;
                this._isClick = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "diamond", {
            get: function () {
                return this._diamond;
            },
            set: function (val) {
                if (this._diamond == val)
                    return;
                this._diamond = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.DIAMOND);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "data", {
            get: function () {
                return this._data;
            },
            enumerable: true,
            configurable: true
        });
        // public static initByCmd(msg:Cmd.UserInfoSynLobbyCmd_S):void{
        // }
        UserInfoMgr.init = function (info, initGold) {
            if (initGold === void 0) { initGold = true; }
            this._data = info;
            this.uid = info.uid;
            if (info.headUrl || info.headurl) {
                this._headUrl = info.headUrl || info.headurl;
            }
            else {
                this._headUrl = "";
            }
            this.nickName = info.nickName || info.nickname;
            this.gender = info.gender;
            this.platId = info.platId;
            this.subPlatId = info.subPlatId;
            if (initGold == true && info.remainder) {
                this._chips = info.remainder;
                this._goldChips = info.remainder;
            }
            if (info.hasOwnProperty("chips")) {
                this._chips = info.chips;
            }
            if (info.goldcoin)
                this._goldChips = info.goldcoin;
            if (info.trailscore)
                this._chips = info.trailscore;
            if (info.bankChips)
                this._bankChips = info.bankChips;
            if (info.sumRecharge)
                this.sumRecharge = info.sumRecharge;
            if (info.signature)
                this.signature = info.signature;
            if (info.hasOwnProperty("giftCoupon"))
                this._giftCoupon = info.giftCoupon;
            else if (info.hasOwnProperty("ticket"))
                this._giftCoupon = info.ticket;
            if (info.trailcoin)
                this._freeChips = info.trailcoin;
            if (info.hasOwnProperty("fangka"))
                this._fangka = info.fangka;
            else if (info.hasOwnProperty("card"))
                this.fangka = info.card;
            if (info.hasOwnProperty("diamond"))
                this._diamond = info.diamond;
        };
        Object.defineProperty(UserInfoMgr, "chips", {
            get: function () {
                return this._chips;
            },
            set: function (val) {
                if (this._chips == val)
                    return;
                this._chips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.CHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "goldChips", {
            /**捕鱼大厅金币 */
            get: function () {
                return this._goldChips;
            },
            /**捕鱼大厅金币 */
            set: function (val) {
                if (this._goldChips == val)
                    return;
                this._goldChips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.GOLDCHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "freeChips", {
            /**
             * 体验币
             */
            get: function () {
                return this._freeChips;
            },
            /**
             * 体验币
             */
            set: function (val) {
                if (this._freeChips == val)
                    return;
                this._freeChips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.FREECHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "headUrl", {
            /**
             * 头像
             */
            get: function () {
                return this._headUrl;
            },
            /**
            * 头像
            */
            set: function (val) {
                if (this._headUrl == val)
                    return;
                this._headUrl = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.HEADURL);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "platPoint", {
            get: function () {
                return this._platPoint;
            },
            set: function (val) {
                this._platPoint = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.PLAT_POINT);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "bankChips", {
            get: function () {
                return this._bankChips;
            },
            set: function (val) {
                this._bankChips = val;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.BANK_CHIPS);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "nickname", {
            get: function () {
                return this.nickName;
            },
            set: function (name) {
                this.nickName = name;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.NICKNAME);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UserInfoMgr, "giftCoupon", {
            /**
            *获取奖券数量
            */
            get: function () {
                return this._giftCoupon ? this._giftCoupon : 0;
            },
            set: function (cou) {
                this._giftCoupon = cou;
                uniLib.Global.dispatchEvent(uniLib.ZqEvent.USER_INFO, uniLib.UserInfoEnum.GIFTCOUPON);
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 用户筹码
         */
        UserInfoMgr._chips = 0;
        /**
         * 金币  ---  捕鱼大厅金币<捕鱼大厅专用>
         */
        UserInfoMgr._goldChips = 0;
        /**
         * 体验币 ---  捕鱼大厅体验币<捕鱼大厅专用>
         */
        UserInfoMgr._freeChips = 0;
        /**
        * 奖券数量
        */
        UserInfoMgr._giftCoupon = 0;
        /**
        * 在线礼包时间 为-1时没有礼包可领
        */
        UserInfoMgr._ol_Time = -1;
        /**
         * 聊天计时
        */
        UserInfoMgr._isClick = true;
        /**
         * 是否显示滑动： 0:不显示; 1：右滑; 2：左滑
         */
        UserInfoMgr.slipStatus = 1;
        /**
         * 第三方平台积分余额
         */
        UserInfoMgr._platPoint = 0;
        return UserInfoMgr;
    }());
    chessCommonLib.UserInfoMgr = UserInfoMgr;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var gameOptions = /** @class */ (function () {
        function gameOptions() {
            /**
            * 左侧滑动聊天
            */
            this.leftChat = true;
            /**
            * 广告跑马灯
            */
            this.notice = true;
            /**
            * 商城购买
            */
            this.market = true;
            /**
             * 游戏任务
             */
            this.task = true;
            /**
            * 银行（保险箱）
            */
            this.bank = true;
            /**
            * 排行榜
            */
            this.rank = true;
            /**
            * 时时彩
            */
            this.ssc = false;
            /**
            * 福袋
            */
            this.fupack = true;
            /**
            * 个人信息面板
            */
            this.user = true;
            /**
             * 喇叭 屏蔽房间和大厅的和喇叭相关的东西
             */
            this.horn = true;
            /**
            *  麻将分享按钮
            */
            this.share = true;
            /**
           *  大厅模式，true 可以退回到大厅的，false 不能退回到大厅
           */
            this.lobbyMode = true;
        }
        return gameOptions;
    }());
    chessCommonLib.gameOptions = gameOptions;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var initOptions = /** @class */ (function () {
        function initOptions() {
            /**
             * 启用远程资源模式 默认为true
             */
            this.remoteMode = true;
        }
        initOptions.fullScreen = function () {
            initOptions.isFullScreen = !initOptions.isFullScreen;
            if (initOptions.isFullScreen) {
                window["fullscreen"]();
            }
            else {
                window["cancelfullscreen"]();
            }
        };
        /**
        * 是否全屏
        */
        initOptions.isFullScreen = false;
        return initOptions;
    }());
    chessCommonLib.initOptions = initOptions;
})(chessCommonLib || (chessCommonLib = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
var table;
(function (table) {
    /**
     * FILE: Vip资源表.xlsx SHEET: Sheet1
     */
    var TableVip = /** @class */ (function () {
        function TableVip() {
        }
        TableVip.prototype.GetType = function () { return 'table.TableVip'; };
        return TableVip;
    }());
    table.TableVip = TableVip;
})(table || (table = {}));

//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated by a tool.
//
//     Changes to this file may cause incorrect behavior and will be lost if
//     the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------
var table;
(function (table) {
    /**
     * FILE: 头像框动画表.xlsx SHEET: Sheet1
     */
    var headMc = /** @class */ (function () {
        function headMc() {
        }
        headMc.prototype.GetType = function () { return 'table.headMc'; };
        return headMc;
    }());
    table.headMc = headMc;
})(table || (table = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var FashionDataUtils = /** @class */ (function () {
        function FashionDataUtils() {
        }
        /**
         * 获取个性头像Id
         */
        FashionDataUtils.getPersonHeadMcId = function (personInfo) {
            var mcId;
            if (personInfo && personInfo.length > 0) {
                personInfo.forEach(function (f) {
                    if (f.typ == 1 && f.optyp == 1) {
                        mcId = personInfo[0].id;
                    }
                });
            }
            return mcId;
        };
        /**
         * 获取VIP设置等级
         */
        FashionDataUtils.getPersonVipLevel = function (personInfo) {
            var mcId;
            if (personInfo && personInfo.length > 0) {
                personInfo.forEach(function (f) {
                    if (f.typ == 1) {
                        if (f.optyp == 1) {
                            mcId = personInfo[0].id;
                        }
                        else if (f.optyp == 2) {
                            mcId = personInfo[0].vip;
                        }
                    }
                });
            }
            return mcId;
        };
        return FashionDataUtils;
    }());
    chessCommonLib.FashionDataUtils = FashionDataUtils;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var LoadGameTipUtil = /** @class */ (function () {
        function LoadGameTipUtil() {
        }
        Object.defineProperty(LoadGameTipUtil, "loadingCls", {
            /**
             * 设置loadingUI
             */
            set: function (cls) {
                this._loadingCls = cls;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * 游戏加载按钮注册响应事件
         * @param ui
         * @param gameId
         * @param x
         * @param y
         * @param loadend  显示对象或者回调处理函数
         */
        LoadGameTipUtil.reg = function (ui, gameId, x, y, loadend, thisObj) {
            if (this._positionDic[ui.hashCode] == null) {
                this._positionDic[ui.hashCode] = new LoadGameVo();
            }
            if (x && x != null) {
                this._positionDic[ui.hashCode].position = new egret.Point(x, y);
            }
            else {
                this._positionDic[ui.hashCode].position = ui.parent.localToGlobal(ui.x, ui.y);
                // this._positionDic[ui.hashCode].position.x += this.offsetX;
            }
            this._positionDic[ui.hashCode].ui = ui;
            if (loadend)
                this._positionDic[ui.hashCode].loadend = loadend;
            if (thisObj) {
                this._positionDic[ui.hashCode].thisObj = thisObj;
            }
            if (gameId)
                this._positionDic[ui.hashCode].gameId = gameId;
            ui.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
        };
        Object.defineProperty(LoadGameTipUtil, "loadingGameId", {
            get: function () {
                return this._loadingGameId;
            },
            enumerable: true,
            configurable: true
        });
        LoadGameTipUtil.loadGameById = function (ui, gameId, loadend, x, y, d) {
            if (this.isLoadingOther()) {
                return;
            }
            this._currentLoadGame = new LoadGameVo();
            this._currentLoadGame.gameId = gameId;
            this._currentLoadGame.loadend = loadend;
            this._currentLoadGame.position = ui.parent.localToGlobal(ui.x, ui.y);
            // this._currentLoadGame.position.x += this.offsetX;
            if (x)
                this._currentLoadGame.position.x = x + this.offsetX;
            if (y)
                this._currentLoadGame.position.y = y;
            this.loadGame(this._currentLoadGame.gameId, this.onLoadGame, this.onLoadFail, this.onProcess, this);
        };
        LoadGameTipUtil.isLoadingOther = function () {
            if (this._loadingGameId != 0) {
                uniLib.TipsUtils.showTipsDownToUp("当前正在加载游戏,请等待", false);
                return true;
            }
            if (chessCommonLib.LoadPanelTipMgr.getInstance().isLoading()) {
                uniLib.TipsUtils.showTipsDownToUp("正在加载面板资源,请等待");
                return true;
            }
            if (chessCommonLib.ResLoadUitl.hasLoad() == false) {
                uniLib.TipsUtils.showTipsDownToUp("正在加载公共资源,请等待");
                return true;
            }
            return false;
        };
        /**
         * 加载游戏
         */
        LoadGameTipUtil.loadGame = function (gameId, succ, fail, process, thisObj) {
            var _this = this;
            if (gameId == 0 || !gameId) {
                if (this.fastGameId != 0) {
                    gameId = this.fastGameId;
                }
            }
            if (this.isLoadingOther()) {
                return;
            }
            var gameData = chessCommonLib.ConfigMgr.getInstance().getGameCfgById(gameId);
            if (gameData == null) {
                uniLib.TipsUtils.showTipsDownToUp("游戏ID不存在");
                return;
            }
            var sucall = function () {
                console.log(_this._loadingGameId + "下载完成！");
                _this._loadingGameId = 0;
                if (succ)
                    succ.call(thisObj, gameData);
            };
            var sureLoad = function () {
                if (process)
                    process.call(thisObj, 0);
                if (gameData) {
                    _this._loadingGameId = gameData.gameId;
                    if (_this.fastGameId != 0) {
                        _this.fastGameId = gameData.gameId;
                    }
                    console.log(_this._loadingGameId + "开始下载！");
                }
                if (uniLib.GameModuleUtils.gameDownloaded(gameData.gameCodeUrl) == false) {
                    if (process)
                        process.call(thisObj, 1);
                    uniLib.GameModuleUtils.downloadGame(gameData, function () {
                        sucall();
                    }, function (e) {
                        var percent = (e.itemsLoaded / e.itemsTotal * 100).toFixed(0);
                        if (process)
                            process.call(thisObj, percent);
                    }, function () {
                        if (egret.hasDefinition("egret_native"))
                            egret_native["deleteUpdateFile"](gameData.gameCodeUrl);
                        console.log(_this._loadingGameId + "下载失败！");
                        _this._loadingGameId = 0;
                        if (fail)
                            fail.call(thisObj);
                    }, _this);
                }
                else {
                    sucall();
                }
            };
            if (!uniLib.GameModuleUtils.gameDownloaded(gameData.gameCodeUrl) && uniLib.ZQGameSdk.netState != uniLib.NetState.WIFI && !uniLib.Global.isH5) {
                chessCommonLib.ModuleMgr.getInstance().showConfirm("您处于非wifi状态下，是否继续下载？", "", "确定", sureLoad, "取消", null, this);
            }
            else {
                sureLoad();
            }
        };
        LoadGameTipUtil.onTouchHandle = function (e) {
            var target = e.target;
            if (this._loadingGameId != 0) {
                uniLib.TipsUtils.showTipsDownToUp("当前正在加载游戏,请等待", false);
                return;
            }
            if (chessCommonLib.LoadPanelTipMgr.getInstance().isLoading()) {
                uniLib.TipsUtils.showTipsDownToUp("正在加载面板资源,请等待");
                return;
            }
            if (this._positionDic[target.hashCode]) {
                this._currentLoadGame = this._positionDic[target.hashCode];
                // MsgSendMgr.enterGame(this._currentLoadGame.gameId);
                this.loadGame(this._currentLoadGame.gameId, this.onLoadGame, this.onLoadFail, this.onProcess, this);
            }
        };
        LoadGameTipUtil.onProcess = function (per) {
            uniLib.UIMgr.instance.showUI(this._loadingCls, per, null, false, false, this._currentLoadGame.position.x, this._currentLoadGame.position.y * this.gameScaleY);
        };
        LoadGameTipUtil.onLoadGame = function () {
            uniLib.UIMgr.instance.hideUI(this._loadingCls);
            // console.error(this._currentLoadGame);
            if (!this._currentLoadGame.gameId) {
                this._currentLoadGame.gameId = this.fastGameId;
            }
            if (this._currentLoadGame.loadend) {
                if (egret.is(this._currentLoadGame.loadend.prototype, "egret.DisplayObjectContainer")) {
                    uniLib.PopUpMgr.addPopUp(this._currentLoadGame.loadend, null, true, true);
                }
                else {
                    this._currentLoadGame.loadend.call(this._currentLoadGame.thisObj, this._currentLoadGame);
                }
            }
            // else {
            // 	MsgSendMgr.enterGame(this._currentLoadGame.gameId);
            // }
        };
        LoadGameTipUtil.onLoadFail = function () {
            uniLib.ZQGameSdk.restart("资源下载失败,请检查网络连接", "确定");
            // ModuleMgr.getInstance().showConfirm("资源下载失败,请检查网络？", "", "确定", () => {
            // 	uniLib.UIMgr.instance.hideUI(this._loadingCls);
            // });
        };
        LoadGameTipUtil.destroy = function () {
            for (var str in this._positionDic) {
                if (this._positionDic[str]) {
                    this._positionDic[str].ui.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandle, this);
                    this._positionDic[str] = null;
                    delete this._positionDic[str];
                }
            }
            // this._cancelList = null;
        };
        // private static _instance: LoadGameTipUtil;
        LoadGameTipUtil._loadingCls = uniLib.UIMgr.instance.tipsLoadUI;
        LoadGameTipUtil.fastGameId = 0;
        LoadGameTipUtil.gameScaleY = 1;
        LoadGameTipUtil.offsetX = 0;
        /*退出提示**/
        LoadGameTipUtil.ExitTipText = "不想连本带利赢回来了吗？就这样退出游戏？";
        /**显示退出和取消按钮文字显示 */
        LoadGameTipUtil.showExitConfrimTxt = true;
        // public static getInstance(): LoadGameTipUtil {
        // 	if (!this._instance) {
        // 		this._instance = new LoadGameTipUtil();
        // 		this._instance._positionDic = {};
        // 	}
        // 	return this._instance;
        // }
        LoadGameTipUtil._positionDic = {};
        LoadGameTipUtil._loadingGameId = 0;
        return LoadGameTipUtil;
    }());
    chessCommonLib.LoadGameTipUtil = LoadGameTipUtil;
    /**
     * 加载位置
     */
    var LoadGameVo = /** @class */ (function () {
        function LoadGameVo() {
        }
        return LoadGameVo;
    }());
    chessCommonLib.LoadGameVo = LoadGameVo;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var LoadPanelTipMgr = /** @class */ (function () {
        function LoadPanelTipMgr() {
        }
        LoadPanelTipMgr.getInstance = function () {
            if (!this._instance) {
                this._instance = new LoadPanelTipMgr();
            }
            return this._instance;
        };
        LoadPanelTipMgr.prototype.loadRes = function (resouceId, succ, needH5Load) {
            if (uniLib.Global.isH5 && !needH5Load) {
                succ.call(null);
            }
            else {
                if (chessCommonLib.LoadGameTipUtil.loadingGameId != 0) {
                    uniLib.TipsUtils.showTipsDownToUp("正在加载游戏资源,请等待");
                    return;
                }
                if (chessCommonLib.ResLoadUitl.hasLoad() == false) {
                    uniLib.TipsUtils.showTipsDownToUp("正在加载公共资源,请等待");
                    return;
                }
                if (this._loadPanelVo == null) {
                    this._loadPanelVo = new LoadPanelVo();
                    this._loadPanelVo.resouceId = resouceId;
                    this._loadPanelVo.succ = succ;
                    RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
                    RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
                    // RES.addEventListener(RES.ResourceEvent.GROUP_PROGRESS, this.onResourceProgress, this);
                    RES.loadGroup(this._loadPanelVo.resouceId);
                    // uniLib.ResLoadMgr.instance.load(this._loadPanelVo.resouceId, this.onLobbyResLoaded, this.onResourceLoadError, this);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("正在加载面板资源,请等待");
                }
            }
        };
        LoadPanelTipMgr.prototype.onResourceProgress = function (per) {
            // uniLib.UIMgr.instance.showUI(LoadingGameTip, per, null, false, false, this._currentLoadGame.position.x, this._currentLoadGame.position.y);
        };
        LoadPanelTipMgr.prototype.onResourceLoadComplete = function (evt) {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
            this._loadPanelVo.succ.call(null);
            this._loadPanelVo = null;
        };
        LoadPanelTipMgr.prototype.onResourceLoadError = function (evt) {
            chessCommonLib.ModuleMgr.getInstance().showConfirm("资源下载失败,请检查网络？", "", "确定");
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onResourceLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onResourceLoadError, this);
        };
        LoadPanelTipMgr.prototype.isLoading = function () {
            if (this._loadPanelVo == null)
                return false;
            else
                return true;
        };
        return LoadPanelTipMgr;
    }());
    chessCommonLib.LoadPanelTipMgr = LoadPanelTipMgr;
    /**
     * 加载位置
     */
    var LoadPanelVo = /** @class */ (function () {
        function LoadPanelVo() {
        }
        return LoadPanelVo;
    }());
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var NumberUtil = /** @class */ (function () {
        function NumberUtil() {
        }
        /**货币规格 */
        NumberUtil.numberFormat = function (num) {
            var str;
            if (num < 1e5) {
                str = "" + num;
            }
            else if (num >= 1e5 && num < 1e6) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e6 && num < 1e7) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e7 && num < 1e8) {
                str = (num / 1e4).toFixed(0) + "万";
            }
            else if (num >= 1e8 && num < 1e10) {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            else {
                str = (num / 1e8).toFixed(2) + "亿";
            }
            return str;
        };
        /**
         * 格式化数字
         */
        NumberUtil.numFormat2 = function (num) {
            if (num < 0) {
                return;
            }
            if (!(this.getType(num) === "number")) {
                console.error("wocao,不是个数字，它是个", this.getType(num));
                return 0 + "";
            }
            if (num <= 10000) {
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
            // let numStr = "" + (num / mod).toFixed(3);
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
        NumberUtil.getType = function (o) {
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
                "[object error]": "error",
                "[object Boolean]": "boolean",
                "[object String]": "string",
                "[object Number]": "number"
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
        return NumberUtil;
    }());
    chessCommonLib.NumberUtil = NumberUtil;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var ResLoadUitl = /** @class */ (function () {
        function ResLoadUitl() {
        }
        ResLoadUitl.load = function (grp) {
            var grpName = "merge_" + grp.join("|");
            RES.createGroup(grpName, grp, true);
            RES.addEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
            RES.addEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
            RES.loadGroup(grpName);
        };
        ResLoadUitl.removeEvent = function () {
            RES.removeEventListener(RES.ResourceEvent.GROUP_COMPLETE, this.onUniLibResLoadComplete, this);
            RES.removeEventListener(RES.ResourceEvent.GROUP_LOAD_ERROR, this.onUniLibResLoadError, this);
        };
        ResLoadUitl.onUniLibResLoadComplete = function (event) {
            console.warn("Group:" + event.groupName + " loaded");
            uniLib.ResUtils.removeGroup(event.groupName);
            ResLoadUitl.isLoad = true;
            ResLoadUitl.removeEvent();
        };
        ResLoadUitl.hasLoad = function () {
            if (ResLoadUitl.Enable == false)
                return true;
            else {
                return ResLoadUitl.isLoad;
            }
        };
        ResLoadUitl.onUniLibResLoadError = function (event) {
            ResLoadUitl.removeEvent();
            console.warn("Group:" + event.groupName + " has failed to load");
        };
        ResLoadUitl.Enable = false;
        ResLoadUitl.isLoad = false;
        return ResLoadUitl;
    }());
    chessCommonLib.ResLoadUitl = ResLoadUitl;
})(chessCommonLib || (chessCommonLib = {}));

var chessCommonLib;
(function (chessCommonLib) {
    var SendGiftUtils = /** @class */ (function () {
        function SendGiftUtils() {
        }
        /**
         * 发送礼物     giftId礼物编号      receivePos终点位置      sendPos起始位置
         */
        SendGiftUtils.sendGift = function (giftId, receivePos, sendPos, container, animationName) {
            if (animationName === void 0) { animationName = "newAnimation"; }
            var giftItem = uniLib.DragonUtils.createDragonBonesDisplay("gift_effect_" + giftId + "_ske_json", "gift_effect_" + giftId + "_tex_json", "gift_effect_" + giftId + "_tex_png", uniLib.DragonType.ARMATURE);
            giftItem.display.x = sendPos.x;
            giftItem.display.y = sendPos.y;
            if (giftItem.animation.hasAnimation(animationName)) {
                giftItem.animation.gotoAndStopByFrame(animationName, 1);
                if (container == null) {
                    if (uniLib.SceneMgr.instance.currentScene) {
                        container = uniLib.SceneMgr.instance.currentScene.effectLayer;
                    }
                    else {
                        container = egret.MainContext.instance.stage;
                    }
                }
                container.addChild(giftItem.display);
                egret.Tween.get(giftItem.display).to({ x: receivePos.x, y: receivePos.y * uniLib.ScreenUtils.scaleFactor }, 400, egret.Ease.circOut).call(function () {
                    egret.Tween.removeTweens(giftItem.display);
                    uniLib.SoundMgr.instance.playSound("GiftSound" + giftId + "_mp3");
                    uniLib.DragonUtils.runDragonBonesArmature(giftItem, animationName, 1);
                    giftItem.addEventListener(dragonBones.AnimationEvent.LOOP_COMPLETE, function () {
                        uniLib.DisplayUtils.removeFromParent(giftItem.display);
                        uniLib.DragonUtils.destoryDragonBonesArmature(giftItem, animationName);
                    }, this);
                });
            }
            else {
                egret.log(animationName + " not-existent");
            }
        };
        return SendGiftUtils;
    }());
    chessCommonLib.SendGiftUtils = SendGiftUtils;
})(chessCommonLib || (chessCommonLib = {}));
