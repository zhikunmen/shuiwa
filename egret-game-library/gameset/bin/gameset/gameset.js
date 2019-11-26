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
var gameset;
(function (gameset) {
    var SetConst = (function () {
        function SetConst() {
        }
        SetConst.RES_JSON = "resource/gameset/gameset.res_54ae5119.json";
        SetConst.THM_JSON = "resource/gameset/gameEui_c11803b3.json";
        /**
         * 公共loading需要加载的资源组
         */
        SetConst.GAME_SET = "game_set";
        return SetConst;
    }());
    gameset.SetConst = SetConst;
    __reflect(SetConst.prototype, "gameset.SetConst");
})(gameset || (gameset = {}));
var gameset;
(function (gameset) {
    var SetPanel_noBg = (function (_super) {
        __extends(SetPanel_noBg, _super);
        function SetPanel_noBg(isLocal) {
            var _this = _super.call(this, "game_sp_title", 690, 403) || this;
            //保存方言状态
            _this._localSoundStatus = true;
            _this.skinName = "GameSetPanelNoBgSKin";
            _this._localSoundStatus = isLocal;
            return _this;
        }
        SetPanel_noBg.prototype.onComplete = function () {
        };
        SetPanel_noBg.prototype.addEvent = function () {
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this._dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.disMissRoom, this);
        };
        SetPanel_noBg.prototype.removeEvent = function () {
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this._dismissBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.disMissRoom, this);
        };
        SetPanel_noBg.prototype.initUI = function () {
            this.soundBtn.touchEnabled = true;
            this.musicBtn.touchEnabled = true;
            this.localSoundBtn.touchEnabled = true;
            //根据现有的音量设置音量初始化开关
            this.updateMusicVolime();
            this.updateSoundVolime();
            this.updateLocalSoundVolime();
        };
        /**显示操作 */
        SetPanel_noBg.prototype.updateMusicVolime = function () {
            if (uniLib.SoundMgr.instance.musicOpen == false) {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            }
            else {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        };
        SetPanel_noBg.prototype.updateSoundVolime = function () {
            if (uniLib.SoundMgr.instance.soundOpen == false) {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            }
            else {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        };
        SetPanel_noBg.prototype.updateLocalSoundVolime = function () {
            if (this._localSoundStatus == false) {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            }
            else {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        };
        //事件派发
        SetPanel_noBg.prototype.onSoundHandle = function (evt) {
            var evtData;
            //设置事件data
            if (evt.target == this.musicBtn) {
                if (uniLib.SoundMgr.instance.musicOpen == false) {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeMusicOn };
                    uniLib.SoundMgr.instance.musicOpen = true;
                }
                else {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeMusicOff };
                    uniLib.SoundMgr.instance.musicOpen = false;
                }
                this.updateMusicVolime();
            }
            else if (evt.target == this.soundBtn) {
                if (uniLib.SoundMgr.instance.soundOpen == false) {
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    uniLib.SoundMgr.instance.soundOpen = true;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeSoundOn };
                }
                else {
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeSoundOff };
                    uniLib.SoundMgr.instance.soundOpen = false;
                }
                this.updateSoundVolime();
            }
            if (evt.target == this.localSoundBtn) {
                if (this._localSoundStatus == true) {
                    this._localSoundStatus = false;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeLocalSoundOff };
                }
                else {
                    this._localSoundStatus = true;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeLocalSoundOn };
                }
                this.updateLocalSoundVolime();
            }
            this.dispatchEventWith(gameset.SetPanel.SetPanelEvtOccur, false, evtData);
        };
        //按钮禁用
        SetPanel_noBg.prototype.disableBtn = function (btnType) {
            var eleBtn;
            switch (btnType) {
                case gameset.SetPanelBtnType.BtnMusic:
                    eleBtn = this.musicBtn;
                    break;
                case gameset.SetPanelBtnType.BtnSound:
                    eleBtn = this.soundBtn;
                    break;
                case gameset.SetPanelBtnType.BtnLocalSound:
                    eleBtn = this.localSoundBtn;
            }
            eleBtn.touchEnabled = false;
        };
        /**解散房间 */
        SetPanel_noBg.prototype.disMissRoom = function (evt) {
            uniLib.Global.dispatchEvent("DISMISS_GAME");
            this.removePop();
        };
        SetPanel_noBg.SetPanelEvtOccur = "EvtOccur";
        //保存桌布资源名
        SetPanel_noBg.BgResName = '';
        //事件种类
        SetPanel_noBg.SetPanelEvtTypeMusicOff = "music_off";
        SetPanel_noBg.SetPanelEvtTypeMusicOn = "music_on";
        SetPanel_noBg.SetPanelEvtTypeSoundOff = "sound_off";
        SetPanel_noBg.SetPanelEvtTypeSoundOn = "sound_on";
        SetPanel_noBg.SetPanelEvtTypeLocalSoundOff = "local_sound_off";
        SetPanel_noBg.SetPanelEvtTypeLocalSoundOn = "local_sound_on";
        SetPanel_noBg.SetPanelEvtChBg = "chBg";
        return SetPanel_noBg;
    }(commonpanel.LobbyBaseEuiPanel));
    gameset.SetPanel_noBg = SetPanel_noBg;
    __reflect(SetPanel_noBg.prototype, "gameset.SetPanel_noBg");
})(gameset || (gameset = {}));
var gameset;
(function (gameset) {
    var SetPanelBtnType;
    (function (SetPanelBtnType) {
        SetPanelBtnType[SetPanelBtnType["BtnMusic"] = 0] = "BtnMusic";
        SetPanelBtnType[SetPanelBtnType["BtnSound"] = 1] = "BtnSound";
        SetPanelBtnType[SetPanelBtnType["BtnLocalSound"] = 2] = "BtnLocalSound";
    })(SetPanelBtnType = gameset.SetPanelBtnType || (gameset.SetPanelBtnType = {}));
    var SetPanel = (function (_super) {
        __extends(SetPanel, _super);
        function SetPanel(bgResArr, isLocal) {
            var _this = _super.call(this, "game_sp_title", 690, 403) || this;
            //壁纸小图当前位置指针
            _this._index = 0;
            //壁纸小图对象数组
            _this._bgImgArr = [];
            //保存方言状态
            _this._localSoundStatus = true;
            _this.skinName = "GameSetPanelSKin";
            if (!bgResArr || bgResArr.length == 0) {
                throw new Error('小图资源数组不能为空');
            }
            _this._bgResArr = bgResArr;
            _this._localSoundStatus = isLocal;
            return _this;
        }
        SetPanel.prototype.onComplete = function () {
        };
        SetPanel.prototype.initUI = function () {
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
            this.soundBtn.touchEnabled = true;
            this.musicBtn.touchEnabled = true;
            this.localSoundBtn.touchEnabled = true;
            //添加遮罩
            var rect = new egret.Rectangle(0, 0, this._imgGroup.width, this._imgGroup.height);
            this._imgGroup.mask = rect;
            //根据现有的音量设置音量初始化开关
            this.updateMusicVolime();
            this.updateSoundVolime();
            this.updateLocalSoundVolime();
            //根据现有的背景初始化小背景图片
            if (SetPanel.BgResName) {
                var initIndex = this._bgResArr.indexOf(SetPanel.BgResName);
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
        /**显示操作 */
        SetPanel.prototype.updateMusicVolime = function () {
            if (uniLib.SoundMgr.instance.musicOpen == false) {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            }
            else {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        };
        SetPanel.prototype.updateSoundVolime = function () {
            if (uniLib.SoundMgr.instance.soundOpen == false) {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            }
            else {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        };
        SetPanel.prototype.updateLocalSoundVolime = function () {
            if (this._localSoundStatus == false) {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            }
            else {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        };
        //事件派发
        SetPanel.prototype.onSoundHandle = function (evt) {
            var evtData;
            //设置事件data
            if (evt.target == this.musicBtn) {
                if (uniLib.SoundMgr.instance.musicOpen == false) {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    evtData = { evtType: SetPanel.SetPanelEvtTypeMusicOn };
                    uniLib.SoundMgr.instance.musicOpen = true;
                }
                else {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    evtData = { evtType: SetPanel.SetPanelEvtTypeMusicOff };
                    uniLib.SoundMgr.instance.musicOpen = false;
                }
                this.updateMusicVolime();
            }
            else if (evt.target == this.soundBtn) {
                if (uniLib.SoundMgr.instance.soundOpen == false) {
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    uniLib.SoundMgr.instance.soundOpen = true;
                    evtData = { evtType: SetPanel.SetPanelEvtTypeSoundOn };
                }
                else {
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    evtData = { evtType: SetPanel.SetPanelEvtTypeSoundOff };
                    uniLib.SoundMgr.instance.soundOpen = false;
                }
                this.updateSoundVolime();
            }
            if (evt.target == this.localSoundBtn) {
                if (this._localSoundStatus == true) {
                    this._localSoundStatus = false;
                    evtData = { evtType: SetPanel.SetPanelEvtTypeLocalSoundOff };
                }
                else {
                    this._localSoundStatus = true;
                    evtData = { evtType: SetPanel.SetPanelEvtTypeLocalSoundOn };
                }
                this.updateLocalSoundVolime();
            }
            this.dispatchEventWith(SetPanel.SetPanelEvtOccur, false, evtData);
        };
        //按钮禁用
        SetPanel.prototype.disableBtn = function (btnType) {
            var eleBtn;
            switch (btnType) {
                case SetPanelBtnType.BtnMusic:
                    eleBtn = this.musicBtn;
                    break;
                case SetPanelBtnType.BtnSound:
                    eleBtn = this.soundBtn;
                    break;
                case SetPanelBtnType.BtnLocalSound:
                    eleBtn = this.localSoundBtn;
            }
            eleBtn.touchEnabled = false;
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
            //保存当前小图资源名
            SetPanel.BgResName = this._bgResArr[nextIndex];
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
                //事件派发
                var data = {
                    index: nextIndex,
                    resName: _this._bgResArr[nextIndex],
                    evtType: SetPanel.SetPanelEvtChBg
                };
                _this.dispatchEventWith(SetPanel.SetPanelEvtOccur, false, data);
            });
        };
        SetPanel.prototype.removeEvent = function () {
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
        };
        /**事件 */
        SetPanel.SetPanelEvtOccur = "EvtOccur";
        //保存桌布资源名
        SetPanel.BgResName = '';
        //事件种类
        /**背景音乐关 */
        SetPanel.SetPanelEvtTypeMusicOff = "music_off";
        /**背景音乐开 */
        SetPanel.SetPanelEvtTypeMusicOn = "music_on";
        /**音效关 */
        SetPanel.SetPanelEvtTypeSoundOff = "sound_off";
        /**音效开 */
        SetPanel.SetPanelEvtTypeSoundOn = "sound_on";
        /**方言关 */
        SetPanel.SetPanelEvtTypeLocalSoundOff = "local_sound_off";
        /**方言开 */
        SetPanel.SetPanelEvtTypeLocalSoundOn = "local_sound_on";
        /**静音关 */
        SetPanel.SetPanelEvtTypeVoiceOff = "voice_off";
        /**静音开 */
        SetPanel.SetPanelEvtTypeVoiceOn = "voice_on";
        /**改变背景图 */
        SetPanel.SetPanelEvtChBg = "chBg";
        return SetPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    gameset.SetPanel = SetPanel;
    __reflect(SetPanel.prototype, "gameset.SetPanel");
})(gameset || (gameset = {}));
var gameset;
(function (gameset) {
    /**云霄单独设置页面 */
    var YunXiaoSetPanel = (function (_super) {
        __extends(YunXiaoSetPanel, _super);
        function YunXiaoSetPanel(bgResArr, isLocal) {
            var _this = _super.call(this, "game_sp_title", 720, 470) || this;
            /** 壁纸小图当前位置指针*/
            _this._index = 0;
            /**壁纸小图对象数组 */
            _this._bgImgArr = [];
            /**保存方言状态*/
            _this._localSoundStatus = true;
            _this.skinName = "YunXiaoSetPlanel";
            if (!bgResArr || bgResArr.length == 0) {
                throw new Error('小图资源数组不能为空');
            }
            _this._bgResArr = bgResArr;
            _this._localSoundStatus = isLocal;
            return _this;
        }
        YunXiaoSetPanel.prototype.onComplete = function () {
        };
        YunXiaoSetPanel.prototype.initUI = function () {
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
            this.soundBtn.touchEnabled = true;
            this.musicBtn.touchEnabled = true;
            this.localSoundBtn.touchEnabled = true;
            //添加遮罩
            var rect = new egret.Rectangle(0, 0, this._imgGroup.width, this._imgGroup.height);
            this._imgGroup.mask = rect;
            //根据现有的音量设置音量初始化开关
            this.updateMusicVolime();
            this.updateSoundVolime();
            this.updateLocalSoundVolime();
            this.updateVoiceVolime();
            this.updateMJcardswitch();
            //根据现有的背景初始化小背景图片
            if (YunXiaoSetPanel.BgResName) {
                var initIndex = this._bgResArr.indexOf(YunXiaoSetPanel.BgResName);
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
            this.voiceBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.bigButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateMJcard, this);
            this.smallButton.addEventListener(egret.TouchEvent.TOUCH_TAP, this.updateMJcard, this);
        };
        /**更新音乐*/
        YunXiaoSetPanel.prototype.updateMusicVolime = function () {
            if (uniLib.SoundMgr.instance.musicOpen == false) {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_off");
            }
            else {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_on");
            }
        };
        /**更新音效*/
        YunXiaoSetPanel.prototype.updateSoundVolime = function () {
            if (uniLib.SoundMgr.instance.soundOpen == false) {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_off");
            }
            else {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_on");
            }
        };
        /**更新方言*/
        YunXiaoSetPanel.prototype.updateLocalSoundVolime = function () {
            if (this._localSoundStatus == false) {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_off");
            }
            else {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_on");
            }
        };
        /**更新静音*/
        YunXiaoSetPanel.prototype.updateVoiceVolime = function () {
            if (uniLib.SoundMgr.instance.musicOpen == true || uniLib.SoundMgr.instance.soundOpen == true) {
                this.voiceBtn.currentState = "up";
            }
            else {
                this.voiceBtn.currentState = "down";
            }
        };
        /**修改麻将大小 */
        YunXiaoSetPanel.prototype.updateMJcard = function (evt) {
            switch (evt.target) {
                case this.smallButton:
                    uniLib.Utils.setLocalStorage("headCardSize", "small");
                    uniLib.Global.dispatchEvent("headCardSize", "small");
                    break;
                case this.bigButton:
                    uniLib.Utils.setLocalStorage("headCardSize", "big");
                    uniLib.Global.dispatchEvent("headCardSize", "big");
                    break;
            }
        };
        /**更新麻将大小选项 */
        YunXiaoSetPanel.prototype.updateMJcardswitch = function () {
            if (uniLib.Utils.getLocalStorage("headCardSize") && uniLib.Utils.getLocalStorage("headCardSize") == "big") {
                uniLib.Utils.setLocalStorage("headCardSize", "big");
                this.bigButton.selected = true;
            }
            else {
                uniLib.Utils.setLocalStorage("headCardSize", "small");
                this.smallButton.selected = true;
            }
        };
        /**操作 */
        YunXiaoSetPanel.prototype.onSoundHandle = function (evt) {
            var evtData;
            //设置事件data
            if (evt.target == this.musicBtn) {
                if (uniLib.SoundMgr.instance.musicOpen == false) {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeMusicOn };
                    uniLib.SoundMgr.instance.musicOpen = true;
                }
                else {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeMusicOff };
                    uniLib.SoundMgr.instance.musicOpen = false;
                }
                this.updateMusicVolime();
                this.updateVoiceVolime();
            }
            else if (evt.target == this.soundBtn) {
                if (uniLib.SoundMgr.instance.soundOpen == false) {
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    uniLib.SoundMgr.instance.soundOpen = true;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeSoundOn };
                }
                else {
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeSoundOff };
                    uniLib.SoundMgr.instance.soundOpen = false;
                }
                this.updateSoundVolime();
                this.updateVoiceVolime();
            }
            if (evt.target == this.localSoundBtn) {
                if (this._localSoundStatus == true) {
                    this._localSoundStatus = false;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeLocalSoundOff };
                }
                else {
                    this._localSoundStatus = true;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeLocalSoundOn };
                }
                this.updateLocalSoundVolime();
            }
            else if (evt.target == this.voiceBtn) {
                if (uniLib.SoundMgr.instance.musicOpen == true || uniLib.SoundMgr.instance.soundOpen == true) {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    uniLib.SoundMgr.instance.soundOpen = false;
                    uniLib.SoundMgr.instance.musicOpen = false;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeVoiceOff };
                }
                else {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    uniLib.SoundMgr.instance.soundOpen = true;
                    uniLib.SoundMgr.instance.musicOpen = true;
                    evtData = { evtType: gameset.SetPanel.SetPanelEvtTypeVoiceOn };
                }
                this.updateMusicVolime();
                this.updateSoundVolime();
                this.updateVoiceVolime();
            }
            this.dispatchEventWith(gameset.SetPanel.SetPanelEvtOccur, false, evtData);
        };
        /**背景改变 */
        YunXiaoSetPanel.prototype.onBgCh = function (evt) {
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
            YunXiaoSetPanel.BgResName = this._bgResArr[nextIndex];
        };
        /**
         *
         * @param {eui.Image} img  //要缓动的图片
         * @param {boolean} direct //0:向左缓动,1:向右缓动
         * @param {number} nextIndex//下一个index
         * @param {boolean} sendEvt//是否派发换壁纸事件
    
         */
        YunXiaoSetPanel.prototype.moveEffect = function (img, direct, nextIndex, sendEvt) {
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
                uniLib.Global.dispatchEvent("changedesk", _this._bgResArr[nextIndex]);
            });
        };
        YunXiaoSetPanel.prototype.removeEvent = function () {
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
        };
        YunXiaoSetPanel.SetPanelEvtOccur = "EvtOccur";
        /**保存桌布资源名*/
        YunXiaoSetPanel.BgResName = '';
        return YunXiaoSetPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    gameset.YunXiaoSetPanel = YunXiaoSetPanel;
    __reflect(YunXiaoSetPanel.prototype, "gameset.YunXiaoSetPanel");
})(gameset || (gameset = {}));
