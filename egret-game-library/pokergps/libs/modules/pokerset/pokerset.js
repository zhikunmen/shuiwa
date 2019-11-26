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
var pokerset;
(function (pokerset) {
    var pokersetConst = (function () {
        function pokersetConst() {
        }
        pokersetConst.RES_JSON = "resource/pokerset/pokerset.res_7b741289.json";
        pokersetConst.THM_JSON = "resource/pokerset/gameEui_fd966a0a.json";
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        pokersetConst.POKER_SET = "poker_set";
        /**切换背景 */
        pokersetConst.SWITCH_BACKGROUND = "switch_background";
        pokersetConst.DISMISS_GAME = "dismiss_game";
        pokersetConst.CLOSE = "close";
        return pokersetConst;
    }());
    pokerset.pokersetConst = pokersetConst;
    __reflect(pokersetConst.prototype, "pokerset.pokersetConst");
})(pokerset || (pokerset = {}));
var pokerset;
(function (pokerset) {
    var RemoveRoom = (function (_super) {
        __extends(RemoveRoom, _super);
        function RemoveRoom() {
            var _this = _super.call(this) || this;
            _this.skinName = "poker_removeRoomSkin";
            return _this;
        }
        RemoveRoom.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initUI();
        };
        RemoveRoom.prototype.initUI = function () {
            this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onYes, this);
        };
        RemoveRoom.prototype.removeEvent = function () {
            this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onYes, this);
        };
        RemoveRoom.prototype.onYes = function () {
            this.dispatchEventWith(pokerset.pokersetConst.DISMISS_GAME);
            this.onClose();
        };
        RemoveRoom.prototype.onClose = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        RemoveRoom.prototype.destory = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return RemoveRoom;
    }(eui.Component));
    pokerset.RemoveRoom = RemoveRoom;
    __reflect(RemoveRoom.prototype, "pokerset.RemoveRoom");
})(pokerset || (pokerset = {}));
var pokerset;
(function (pokerset) {
    var SetPanel = (function (_super) {
        __extends(SetPanel, _super);
        function SetPanel() {
            var _this = _super.call(this) || this;
            //壁纸小图当前位置指针
            _this._index = 0;
            //壁纸小图对象数组
            _this._bgImgArr = [];
            _this.isWarning = false;
            _this.skinName = "poker_SetPanelSkin";
            return _this;
        }
        SetPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
            this.initUI();
        };
        SetPanel.prototype.setWarn = function (bool) {
            this.isWarning = bool;
        };
        SetPanel.prototype.initUI = function () {
            this._spotArr = [this.spot0, this.spot1, this.spot2, this.spot3];
            this._bgResArr = ["pdk_small_bg1", "pdk_small_bg2", "pdk_small_bg3", "pdk_small_bg4"];
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
            if (uniLib.Utils.getLocalStorage("bgIndex") && this._bgImgArr[uniLib.Utils.getLocalStorage("bgIndex")]) {
                this._index = Number(uniLib.Utils.getLocalStorage("bgIndex"));
                this._imgGroup.addChild(this._bgImgArr[uniLib.Utils.getLocalStorage("bgIndex")]);
                this.updateSpot(uniLib.Utils.getLocalStorage("bgIndex"));
            }
            else {
                this._index = 0;
                this._imgGroup.addChild(this._bgImgArr[0]);
                this.updateSpot(0);
            }
            //添加遮罩
            var rect = new egret.Rectangle(0, 0, this._imgGroup.width, this._imgGroup.height);
            this._imgGroup.mask = rect;
            if (uniLib.Utils.getLocalStorage("SoundVolime") == 1) {
                uniLib.SoundMgr.instance.soundOpen = true;
            }
            else {
                uniLib.SoundMgr.instance.soundOpen = false;
            }
            if (uniLib.Utils.getLocalStorage("MusicVolime") == 1) {
                uniLib.SoundMgr.instance.musicOpen = true;
            }
            else {
                uniLib.SoundMgr.instance.musicOpen = false;
            }
            this.musicBtn.selected = uniLib.SoundMgr.instance.musicOpen;
            this.soundBtn.selected = uniLib.SoundMgr.instance.soundOpen;
            this.languageBtn.enabled = false;
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.dissolveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onDismiss, this);
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.musicCheckHandle, this);
            this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.soundCheckHandle, this);
        };
        SetPanel.prototype.removeEvent = function () {
            this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
            this.dissolveBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onDismiss, this);
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.musicCheckHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.soundCheckHandle, this);
        };
        SetPanel.prototype.onBgCh = function (evt) {
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
        };
        /**
        *
        * @param {eui.Image} img  //要缓动的图片
        * @param {boolean} direct //0:向左缓动,1:向右缓动
        * @param {number} nextIndex//下一个index
        * @param {boolean} sendEvt//是否派发换壁纸事件
        */
        SetPanel.prototype.moveEffect = function (img, direct, nextIndex, sendEvt) {
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
                uniLib.Utils.setLocalStorage("bgIndex", nextIndex);
                _this.dispatchEventWith(pokerset.pokersetConst.SWITCH_BACKGROUND);
                _this.updateSpot(nextIndex);
            });
        };
        SetPanel.prototype.updateSpot = function (index) {
            for (var _i = 0, _a = this._spotArr; _i < _a.length; _i++) {
                var img = _a[_i];
                img.source = "pdk_set_spot1";
            }
            this._spotArr[index].source = "pdk_set_spot2";
        };
        SetPanel.prototype.soundCheckHandle = function (evt) {
            if (!this.soundBtn.selected) {
                uniLib.SoundMgr.instance.soundVolume = 0;
                uniLib.SoundMgr.instance.soundOpen = false;
                uniLib.Utils.setLocalStorage("SoundVolime", 0);
            }
            else {
                uniLib.SoundMgr.instance.soundVolume = 1;
                uniLib.SoundMgr.instance.soundOpen = true;
                uniLib.Utils.setLocalStorage("SoundVolime", 1);
            }
        };
        SetPanel.prototype.musicCheckHandle = function (evt) {
            if (this.musicBtn.selected) {
                uniLib.SoundMgr.instance.musicVolume = 0.7;
                uniLib.SoundMgr.instance.musicOpen = true;
                if (this.isWarning) {
                    uniLib.SoundMgr.instance.playBgMusic(["voice_pdk_warn_mp3"]);
                }
                else {
                    uniLib.SoundMgr.instance.playBgMusic(["voice_pdk_bg_mp3"]);
                }
                uniLib.Utils.setLocalStorage("MusicVolime", 1);
            }
            else {
                uniLib.SoundMgr.instance.musicVolume = 0;
                uniLib.SoundMgr.instance.musicOpen = false;
                uniLib.Utils.setLocalStorage("MusicVolime", 0);
            }
        };
        SetPanel.prototype.onDismiss = function (evt) {
            this.removePanel = new pokerset.RemoveRoom();
            uniLib.PopUpMgr.addPopUp(this.removePanel, null, true, true, 0, uniLib.PopUpEffect.CENTER);
            this.dispatchEventWith(pokerset.pokersetConst.CLOSE);
        };
        SetPanel.prototype.onClose = function (evt) {
            this.dispatchEventWith(pokerset.pokersetConst.CLOSE);
        };
        SetPanel.prototype.destory = function () {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return SetPanel;
    }(eui.Component));
    pokerset.SetPanel = SetPanel;
    __reflect(SetPanel.prototype, "pokerset.SetPanel");
})(pokerset || (pokerset = {}));
