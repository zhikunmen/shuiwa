/*!
 * wxGameLib - JS for Debug
 * @licence wxGameLib - v0.1.0 (2018-10-10)
 * qq:93749937 | Licence: helojo
 */
var wxgame;
(function (wxgame) {
    /**小程序版本枚举 */
    var envVersionConst = /** @class */ (function () {
        function envVersionConst() {
        }
        /**开发版 */
        envVersionConst.DEVELOP = "develop";
        /**体验版 */
        envVersionConst.TRIAL = "trial";
        /**正式版 */
        envVersionConst.RELEASE = "release";
        return envVersionConst;
    }());
    wxgame.envVersionConst = envVersionConst;
    var CustomerServiceConst = /** @class */ (function () {
        function CustomerServiceConst() {
        }
        /**跳转客服默认标题 */
        CustomerServiceConst.DEFAULTTITLE = "回复\"关注\"获取关注链接";
        return CustomerServiceConst;
    }());
    wxgame.CustomerServiceConst = CustomerServiceConst;
})(wxgame || (wxgame = {}));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var wxgame;
(function (wxgame) {
    var Global = /** @class */ (function () {
        function Global() {
            this.isFirst = true;
        }
        Object.defineProperty(Global, "instance", {
            get: function () {
                if (!this._instance)
                    this._instance = new Global();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param appId 小游戏appid
         * @param secret 小游戏秘钥
         */
        Global.prototype.init = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!wxgame.Utils.isWxGame)
                        return [2 /*return*/];
                    if (this.isFirst) {
                        wxgame.Message.instance.init();
                        wxgame.ShareMessage.instance.showShareMenu(true);
                        this.isFirst = false;
                    }
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.login({
                                success: function (code) {
                                    resolve(code);
                                    console.log("login success: " + code.code);
                                    // this.getSessionKeyOpenId(code);
                                },
                                fail: function (e) {
                                    reject(false);
                                    console.error("login fail: " + e);
                                },
                                complete: function () { }
                            });
                        })];
                });
            });
        };
        /**退出当前小游戏 */
        Global.prototype.exitMiniProgram = function (success, fail, complete) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!wxgame.Utils.isWxGame)
                        return [2 /*return*/];
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.exitMiniProgram({
                                success: function () {
                                    if (success)
                                        success();
                                    resolve(true);
                                },
                                fail: function () {
                                    if (fail)
                                        fail();
                                    reject(false);
                                },
                                complete: complete
                            });
                        })];
                });
            });
        };
        /**跳转客服回话 */
        Global.prototype.openCustomerServiceConversation = function (showCard, title, imgUrl) {
            if (title === void 0) { title = wxgame.CustomerServiceConst.DEFAULTTITLE; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!wxgame.Utils.isWxGame)
                        return [2 /*return*/];
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.openCustomerServiceConversation({
                                sessionFrom: "",
                                showMessageCard: true,
                                sendMessageTitle: title,
                                sendMessagePath: "",
                                sendMessageImg: imgUrl ? (imgUrl.match(/http/ig).length > 0 ? imgUrl + wxgame.Utils.getVersionControlCode() : imgUrl) : "",
                                success: function (res) { resolve(res); },
                                fail: function (err) { reject(err); }
                            });
                        })];
                });
            });
        };
        /**打开同一公众号下关联的另一个小程序 */
        Global.prototype.navigateToMiniProgram = function (appid, path, extraData, envVersion) {
            if (path === void 0) { path = ""; }
            if (extraData === void 0) { extraData = {}; }
            if (envVersion === void 0) { envVersion = wxgame.envVersionConst.RELEASE; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.navigateToMiniProgram({
                                appId: appid,
                                path: path,
                                extraData: extraData,
                                envVersion: envVersion,
                                success: function (res) { resolve(res); },
                                fail: function (err) { console.error("navigateToMiniProgram fail"); reject(err); }
                            });
                        })];
                });
            });
        };
        /**调用设置交口 */
        Global.prototype.openSetting = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.openSetting({
                                success: function (res) { resolve(res); },
                                fail: function (error) { reject(error); console.log("打开设置失败"); }
                            });
                        })];
                });
            });
        };
        return Global;
    }());
    wxgame.Global = Global;
})(wxgame || (wxgame = {}));

var wxgame;
(function (wxgame) {
    var Message = /** @class */ (function () {
        function Message() {
        }
        Object.defineProperty(Message, "instance", {
            get: function () {
                if (!this._instance)
                    this._instance = new Message();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        Message.prototype.init = function () {
            this.launchOption = wx.getLaunchOptionsSync();
            this.initLaunchOption();
            this.addOnShowEvent();
        };
        /**
         * 初始化启动参数
         */
        Message.prototype.initLaunchOption = function () {
            if (!this.launchOption)
                return;
            var data = this.launchOption;
            var query;
            if (data.query) {
                query = data.query;
            }
            var shareVo = new uniLib.WXShareVo();
            shareVo.opType = Cmd.ShareOpType.click;
            if (query.shareType)
                shareVo.shareType = Number(query.shareType);
            if (query.wgShareData)
                shareVo.wgShareData = query.wgShareData;
            if (query && query.uid) {
                shareVo.fromUid = Number(query.uid);
                if (data.shareTicket) {
                    wxgame.ShareMessage.instance.getShareInfo(data.shareTicket).then(function (data) {
                        if (data && data.errMsg.indexOf("ok") >= 0) {
                            shareVo.shareTicket = JSON.stringify(data);
                            wxgame.ShareMessage.instance.sendShareMessage(shareVo);
                        }
                    }).catch((function (e) {
                        console.log("获取群消息失败", e);
                        uniLib.TipsUtils.showTipsDownToUp("获取群消息失败");
                    }));
                }
                else {
                    wxgame.ShareMessage.instance.sendShareMessage(shareVo);
                }
            }
            this.launchOption = null;
        };
        /**监听小游戏回到前台的事件 */
        Message.prototype.addOnShowEvent = function () {
            var _this = this;
            wx.offShow(function (res) { _this.onShow(res); });
            wx.onShow(function (res) { _this.onShow(res); });
        };
        /** */
        Message.prototype.onShow = function (res) {
            if (!this.launchOption && res)
                this.launchOption = res;
            this.initLaunchOption();
        };
        /**设置用户数据上报 */
        Message.prototype.setUserCloudStorage = function (KVDataList) {
            return new Promise(function (resolve, reject) {
                wx.setUserCloudStorage({
                    KVDataList: KVDataList,
                    success: function (res) {
                        console.log("setUserCloudStorage success", res);
                        resolve(res);
                    },
                    fail: function (res) {
                        console.error("setUserCloudStorage success", res);
                        reject(res);
                    }
                });
            });
        };
        return Message;
    }());
    wxgame.Message = Message;
})(wxgame || (wxgame = {}));

var wxgame;
(function (wxgame) {
    var OpenData = /** @class */ (function () {
        function OpenData() {
        }
        Object.defineProperty(OpenData, "instance", {
            get: function () {
                if (!this._instance)
                    this._instance = new OpenData();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        OpenData.prototype.sendShareData = function (kvdata) {
            if (!wxgame.Utils.isWxGame)
                return;
            this._openDataContext = wx.getOpenDataContext();
            this._openDataContext.postMessage(kvdata); //在Message onMessage里获取
        };
        OpenData.prototype.createDisplayObject = function (type, width, height, offsetY) {
            var sharedCanvas = window["sharedCanvas"];
            sharedCanvas.width = width;
            sharedCanvas.height = height;
            var bitmapdata = new egret.BitmapData(sharedCanvas);
            bitmapdata.$deleteSource = false;
            var texture = new egret.Texture();
            texture._setBitmapData(bitmapdata);
            var bitmap = new egret.Bitmap(texture);
            bitmap.width = width;
            bitmap.height = height;
            bitmap.y = offsetY;
            if (egret.Capabilities.renderMode == "webgl") {
                var renderContext = egret["wxgame"].WebGLRenderContext.getInstance();
                var context = renderContext.context; ////需要用到最新的微信版本            ////调用其接口WebGLRenderingContext.wxBindCanvasTexture(number texture, Canvas canvas)            ////如果没有该接口，会进行如下处理，保证画面渲染正确，但会占用内存。
                if (!context.wxBindCanvasTexture) {
                    egret.startTick(function (timeStarmp) {
                        egret.WebGLUtils.deleteWebGLTexture(bitmapdata.webGLTexture);
                        bitmapdata.webGLTexture = null;
                        return false;
                    }, this);
                }
            }
            return bitmap;
        };
        return OpenData;
    }());
    wxgame.OpenData = OpenData;
})(wxgame || (wxgame = {}));

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var wxgame;
(function (wxgame) {
    var ShareMessage = /** @class */ (function () {
        function ShareMessage() {
        }
        Object.defineProperty(ShareMessage, "instance", {
            get: function () {
                if (!this._instance)
                    this._instance = new ShareMessage();
                return this._instance;
            },
            enumerable: true,
            configurable: true
        });
        /**监听被动转发 */
        ShareMessage.prototype.onShareAppMessage = function (title, imageUrl, query) {
            if (title === void 0) { title = ""; }
            if (imageUrl === void 0) { imageUrl = ""; }
            if (query === void 0) { query = ""; }
            wx.onShareAppMessage(function (e) {
                if (!title || title.trim() == "") {
                    var random = void 0;
                    var table_1 = wxgame.Global.instance.tableLobbyGameList;
                    if (table_1 && Array.isArray(table_1.newshareContent)) {
                        random = Math.floor(Math.random() * table_1.newshareContent.length);
                        title = table_1.newshareContent[random];
                        if (wxgame.Global.instance.shareIconUrl[wxgame.Global.instance.shareIconUrl.length - 1] != "/") {
                            wxgame.Global.instance.shareIconUrl += "/";
                        }
                        imageUrl = wxgame.Global.instance.shareIconUrl + "shareIcons/" + table_1.newsharepicture[random];
                    }
                }
                console.log("用户点击事件");
                return {
                    title: title,
                    imageUrl: imageUrl,
                    query: query
                };
            });
        };
        /**
         * 显示转发按钮
         * @param ticket 是否带ticket 可以获取群id做群排行使用
         */
        ShareMessage.prototype.showShareMenu = function (ticket) {
            if (ticket === void 0) { ticket = true; }
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.showShareMenu({
                                withShareTicket: ticket,
                                success: function (res) { console.log("showShareMenu success:  " + res); resolve(true); },
                                fail: function (err) { console.log("showShareMenu fail:  " + err); reject(false); },
                                complete: function () { }
                            });
                        })];
                });
            });
        };
        /**
         * 隐藏转发按钮
         */
        ShareMessage.prototype.hideShareMenu = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.hideShareMenu({
                                success: function (res) { console.log("hideShareMenu success:  " + res); resolve(true); },
                                fail: function (warn) { console.log("hideShareMenu fail:  " + warn); reject(false); },
                                complete: function () { }
                            });
                        })];
                });
            });
        };
        /**更新转发属性 */
        ShareMessage.prototype.updateShareMenu = function (ticket) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.updateShareMenu({
                                withShareTicket: ticket,
                                success: function (res) { console.log("updateShareMenu success:  " + res); resolve(true); },
                                fail: function (warn) { console.log("updateShareMenu fail:  " + warn); reject(false); },
                                complete: function () { }
                            });
                        })];
                });
            });
        };
        /**
         * 消息分享 如果写死分享的话务必填写shareVo.title和shareVo.shareImageUrl
         * @param shareVo 分享数据
         */
        ShareMessage.prototype.shareAppMessage = function (shareVo, success, fail) {
            return __awaiter(this, void 0, void 0, function () {
                var title, imageUrl, random, table, query, obj;
                return __generator(this, function (_a) {
                    title = "";
                    imageUrl = "";
                    table = wxgame.Global.instance.tableLobbyGameList;
                    if (table && Array.isArray(table.newshareContent)) {
                        random = Math.floor(Math.random() * table.newshareContent.length);
                    }
                    if (shareVo.title) {
                        title = shareVo.title;
                    }
                    else {
                        if (!isNaN(random))
                            title = table.newshareContent[random];
                        else
                            uniLib.TipsUtils.showTipsDownToUp("分享标题配置有误");
                    }
                    if (shareVo.shareImageUrl) {
                        imageUrl = shareVo.shareImageUrl;
                    }
                    else {
                        if (!isNaN(random) && wxgame.Global.instance.shareIconUrl) {
                            if (wxgame.Global.instance.shareIconUrl[wxgame.Global.instance.shareIconUrl.length - 1] != "/") {
                                wxgame.Global.instance.shareIconUrl += "/";
                            }
                            imageUrl = wxgame.Global.instance.shareIconUrl + "shareIcons/" + table.newsharepicture[random];
                        }
                        else
                            uniLib.TipsUtils.showTipsDownToUp("分享图片配置有误");
                    }
                    query = "uid=" + uniLib.UserInfo.uid;
                    if (shareVo.shareType) {
                        query += "&shareType=" + shareVo.shareType;
                    }
                    if (shareVo.roomId) {
                        obj = JSON.parse(shareVo.roomId);
                        if (obj && obj.roomId)
                            query += "&roomId=" + obj.roomId;
                    }
                    if (shareVo.wgShareData) {
                        query += "&wgShareData=" + shareVo.wgShareData;
                    }
                    shareVo.opType = Cmd.ShareOpType.share;
                    this.sendShareMessage(shareVo);
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.shareAppMessage({
                                title: title,
                                imageUrl: (Array.isArray(imageUrl.match(/http/ig)) && imageUrl.match(/http/ig).length > 0) ? imageUrl + wxgame.Utils.getVersionControlCode() : imageUrl,
                                query: query,
                                success: function (res) {
                                    console.log(res);
                                    if (success)
                                        success();
                                    if (res) {
                                        if (res.shareTickets && res.shareTickets.length > 0) {
                                            // this.getShareInfo(res.shareTickets[0]).then((data) => {
                                            // 	if (data) {
                                            // 		shareVo.shareTicket = JSON.stringify(data);
                                            // 		this.sendShareMessage(shareVo);
                                            // 	}
                                            // }).catch(e => {
                                            // 	console.log("获取群分享消息出错", e);
                                            // 	uniLib.TipsUtils.showTipsDownToUp("获取群分享消息出错");
                                            // });
                                        }
                                        else {
                                            console.log("分享的是个人");
                                            // this.sendShareMessage(shareVo);
                                        }
                                    }
                                    uniLib.TipsUtils.showTipsDownToUp("分享成功");
                                    resolve(res);
                                },
                                fail: function (res) {
                                    if (fail)
                                        fail();
                                    uniLib.TipsUtils.showTipsDownToUp("分享失败");
                                    resolve(false);
                                }
                            });
                        })];
                });
            });
        };
        /**
         * 获得分享
         */
        ShareMessage.prototype.getShareInfo = function (ticket) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.getShareInfo({
                                shareTicket: ticket,
                                success: function (res) { resolve(res); },
                                fail: function (err) { console.log("getShareInfo fail") + err; },
                                complete: function () { }
                            });
                        })];
                });
            });
        };
        /**
         * 发送分享数据
         * @param opType  操作类型
         * @param jsonShare 是否分享群
         *  */
        ShareMessage.prototype.sendShareMessage = function (shareVo) {
            return __awaiter(this, void 0, void 0, function () {
                var code, obj, req, obj;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, wxgame.Global.instance.init().then(function (res) { if (res.errMsg.indexOf("ok") >= 0)
                                code = res.code; }, function () { egret.error("sendShareMessage reject"); })];
                        case 1:
                            _a.sent();
                            // await this.checkSession().then((res) => { },//未过期不做处理
                            // 	(res) => {//过期再那一边登陆code
                            // 		Global.instance.init().then((res) => {
                            // 			code = res;
                            // 		})
                            // 	})
                            if (this._data || !shareVo) {
                                if (code) {
                                    if (this._data && this._data.shareType && this._data.shareType == Cmd.ShareType.ios) {
                                        obj = {};
                                        if (this._data.extData) {
                                            obj = JSON.parse(this._data.extData);
                                            obj["code"] = code;
                                        }
                                        else {
                                            obj["code"] = code;
                                        }
                                        this._data.extData = JSON.stringify(obj);
                                    }
                                }
                                this.sendShare();
                                return [2 /*return*/];
                            }
                            req = new Cmd.UploadShareInfoLittleGameLobbyCmd_CS();
                            if (shareVo.fromUid)
                                req.uid = shareVo.fromUid;
                            if (shareVo.shareType)
                                req.shareType = shareVo.shareType;
                            if (shareVo.opType)
                                req.opType = shareVo.opType;
                            if (shareVo.shareTicket)
                                req.jsonShare = shareVo.shareTicket;
                            if (shareVo.wgKvData)
                                req.extData = shareVo.wgKvData;
                            if (shareVo.wgShareData)
                                req.extData = shareVo.wgShareData;
                            if (req.shareType && req.shareType == Cmd.ShareType.ios && code) {
                                obj = {};
                                if (req.extData) {
                                    obj = JSON.parse(req.extData);
                                    obj["code"] = code;
                                }
                                else {
                                    obj["code"] = code;
                                }
                                req.extData = JSON.stringify(obj);
                            }
                            this._data = req;
                            this.sendShare();
                            return [2 /*return*/];
                    }
                });
            });
        };
        ShareMessage.prototype.checkSession = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, new Promise(function (resolve, reject) {
                            wx.checkSession({
                                success: function (res) { resolve(res); },
                                fail: function (res) { reject(res); } //登陆过期
                            });
                        })];
                });
            });
        };
        ShareMessage.prototype.sendShare = function () {
            if (NetMgr.ws && this._data) {
                NetMgr.tcpSend(this._data);
                this._data = null;
            }
        };
        return ShareMessage;
    }());
    wxgame.ShareMessage = ShareMessage;
})(wxgame || (wxgame = {}));

var wxgame;
(function (wxgame) {
    var Utils = /** @class */ (function () {
        function Utils() {
        }
        /**弹框 */
        Utils.showConfirm = function (info, title, oktxt, okFunc, caltxt, calFunc) {
            if (title === void 0) { title = ""; }
            if (oktxt === void 0) { oktxt = "确认"; }
            var showcancel = false;
            if (caltxt != undefined) {
                showcancel = true;
            }
            else {
                caltxt = "取消";
            }
            wx.showModal({
                title: title,
                content: info,
                showCancel: showcancel,
                cancelText: caltxt,
                confirmText: oktxt,
                success: function (res) {
                    if (res.confirm) {
                        if (okFunc)
                            okFunc();
                    }
                    if (res.cancel) {
                        if (calFunc)
                            calFunc();
                    }
                },
                fail: function (err) {
                    console.log("showModal调用失败");
                }
            });
        };
        /**时间戳 做版本控制 */
        Utils.getVersionControlCode = function () {
            return "?v=" + new Date().getTime();
        };
        Object.defineProperty(Utils, "isWxGame", {
            /**检查当前是否是微信小游戏 不能导致h5上报错 */
            get: function () {
                if (!uniLib.Global.isWxGame()) {
                    console.warn("当前测试环境不是微信小游戏，导致功能失效");
                    return false;
                }
                return true;
            },
            enumerable: true,
            configurable: true
        });
        return Utils;
    }());
    wxgame.Utils = Utils;
})(wxgame || (wxgame = {}));
