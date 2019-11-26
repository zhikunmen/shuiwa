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
var joinroom;
(function (joinroom) {
    /**
     * 单个历史记录
     */
    var HistroyJoinRecordItem = (function (_super) {
        __extends(HistroyJoinRecordItem, _super);
        function HistroyJoinRecordItem() {
            var _this = _super.call(this) || this;
            _this._boo = false;
            _this.skinName = "HistroyJoinItemSkin";
            _this.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.clickHandle, _this);
            return _this;
        }
        HistroyJoinRecordItem.prototype.dataChanged = function () {
            var data = this.data;
            var name = data.matchName != null ? data.matchName : data.matchId;
            this.roomInfo.text = "老友圈ID:" + data.matchId + "\n老友圈名称:" + name;
        };
        HistroyJoinRecordItem.prototype.showInfo = function () {
            this._boo = !this._boo;
            var data = this.data;
            var name = data.matchName != null ? data.matchName : data.matchId;
            if (this._boo) {
                this.roomInfo.text = data.desc;
            }
            else {
                this.roomInfo.text = "老友圈ID:" + data.matchId + "\n老友圈名称:" + name;
            }
        };
        HistroyJoinRecordItem.prototype.clickHandle = function (e) {
            if (e.target == this.detailsBtn) {
                this.showInfo();
            }
            else if (e.target == this.joinBtn) {
                MsgSendMgr.enterRoom(this.data.matchId, -1);
                uniLib.PopUpMgr.removePopUp(joinroom.JoinRoomPanel);
            }
        };
        return HistroyJoinRecordItem;
    }(eui.ItemRenderer));
    joinroom.HistroyJoinRecordItem = HistroyJoinRecordItem;
    __reflect(HistroyJoinRecordItem.prototype, "joinroom.HistroyJoinRecordItem");
})(joinroom || (joinroom = {}));
var joinroom;
(function (joinroom) {
    var InputKeyItem = (function (_super) {
        __extends(InputKeyItem, _super);
        function InputKeyItem() {
            var _this = _super.call(this) || this;
            _this.skinName = "MJ_JoinRoomButtonSkin";
            // this.width = 216;
            // this.height = 80;
            _this.initUI();
            return _this;
        }
        InputKeyItem.prototype.initUI = function () {
            this._inputTxt = LobbyUtils.getBitmapFontTxt("mjl_input_fn2_fnt", 210, egret.HorizontalAlign.CENTER, 1, 25);
            this.addChild(this._inputTxt);
            this._inputTxt.touchEnabled = false;
        };
        Object.defineProperty(InputKeyItem.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (num) {
                this._value = num;
                if (this._value == 9 || this._value == 11) {
                    // this._inputTxt.y=14;
                }
                this._inputTxt.text = LobbyDataCache.langObj.uiTxt.JoinRoomPanel["key" + this._value];
            },
            enumerable: true,
            configurable: true
        });
        InputKeyItem.prototype.destory = function () {
        };
        return InputKeyItem;
    }(eui.Button));
    joinroom.InputKeyItem = InputKeyItem;
    __reflect(InputKeyItem.prototype, "joinroom.InputKeyItem");
})(joinroom || (joinroom = {}));
var joinroom;
(function (joinroom) {
    var InputNumItem = (function (_super) {
        __extends(InputNumItem, _super);
        function InputNumItem() {
            var _this = _super.call(this) || this;
            _this.initUI();
            return _this;
        }
        InputNumItem.prototype.initUI = function () {
            var bg = LobbyResUtil.createBitmapByName("mjl_join_numbg");
            bg.scale9Grid = new egret.Rectangle(20, 19, 29, 24);
            this.addChild(bg);
            this.width = bg.width = 70;
            this.height = bg.height = 63;
            this._inputTxt = LobbyUtils.getBitmapFontTxt("mjl_input_fn1_fnt", 62, egret.HorizontalAlign.CENTER, 1, 13);
            // LobbyResUtil.createTextFeild(0xffffff, egret.HorizontalAlign.CENTER, "", 32, 3, 8, 45);
            this.addChild(this._inputTxt);
        };
        Object.defineProperty(InputNumItem.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (num) {
                this._inputTxt.text = num.toString();
                this._value = num;
            },
            enumerable: true,
            configurable: true
        });
        InputNumItem.prototype.delete = function () {
            this._inputTxt.text = "";
        };
        return InputNumItem;
    }(egret.DisplayObjectContainer));
    joinroom.InputNumItem = InputNumItem;
    __reflect(InputNumItem.prototype, "joinroom.InputNumItem");
})(joinroom || (joinroom = {}));
var joinroom;
(function (joinroom) {
    var JoinRoomConst = (function () {
        function JoinRoomConst() {
        }
        JoinRoomConst.RES_JSON = "resource/joinroom/joinroom.res_69f1e869.json";
        JoinRoomConst.THM_JSON = "resource/joinroom/gameEui_a0b19a04.json";
        /**
         * 公共loading需要加载的资源组
         */
        JoinRoomConst.PUB_JOINROOM = "pub_joinroom";
        return JoinRoomConst;
    }());
    joinroom.JoinRoomConst = JoinRoomConst;
    __reflect(JoinRoomConst.prototype, "joinroom.JoinRoomConst");
})(joinroom || (joinroom = {}));
var joinroom;
(function (joinroom) {
    /**
     * 进入房间面板
     */
    var JoinRoomPanel = (function (_super) {
        __extends(JoinRoomPanel, _super);
        /**是老友圈加入房间还是普通房间  1：老友圈 2：普通房间*/
        function JoinRoomPanel() {
            var _this = _super.call(this, "mjl_join_title", 1150, 650) || this;
            /**历史加入 */
            _this._recordList = new Array();
            _this.skinName = "JoinRoomSkin";
            return _this;
        }
        ;
        JoinRoomPanel.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            uniLib.Global.removeEventListener(CmdConstant.HistoryMatchIdList, this.setData, this);
        };
        JoinRoomPanel.prototype.initUI = function () {
            uniLib.Global.addEventListener(CmdConstant.HistoryMatchIdList, this.setData, this);
            this._inputNArr = [];
            this._curIndex = 0;
            for (var i = 0; i < 6; i++) {
                var item = new joinroom.InputNumItem();
                item.x = i * (item.width + 35);
                this.inputNumberGroup.addChild(item);
                this._inputNArr.push(item);
            }
            this._keyArr = [];
            for (var i = 0; i < 12; i++) {
                var key = new joinroom.InputKeyItem();
                key.value = i;
                this.inputKeyGroup.addChild(key);
                this._keyArr.push(key);
            }
        };
        JoinRoomPanel.prototype.addEvent = function () {
            for (var _i = 0, _a = this._keyArr; _i < _a.length; _i++) {
                var item = _a[_i];
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onInput, this);
            }
        };
        JoinRoomPanel.prototype.removeEvent = function () {
            for (var _i = 0, _a = this._keyArr; _i < _a.length; _i++) {
                var item = _a[_i];
                item.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onInput, this);
            }
        };
        JoinRoomPanel.prototype.setData = function (evt) {
            var record = evt.param;
            this._recordList = [];
            var list = record.list instanceof Array;
            if (!list) {
                this.neverInfo.visible = true;
                return;
            }
            this.neverInfo.visible = false;
            var records = record.list != null && record.list instanceof Array ? record.list : [];
            this._recordList = records;
            this.recordList.itemRenderer = joinroom.HistroyJoinRecordItem;
            this.recordList.dataProvider = new eui.ArrayCollection(records);
        };
        JoinRoomPanel.prototype.reqMatchRecord = function (e) {
        };
        JoinRoomPanel.prototype.onInput = function (e) {
            if (RES.hasRes("buttonClick_mp3")) {
                uniLib.SoundMgr.instance.playSound("buttonClick_mp3");
            }
            var target = e.target;
            var value = target.value;
            var num;
            if (value == 9) {
                this.reset();
                return;
            }
            else if (value == 11) {
                this.removeOneNum();
                return;
            }
            else if (value == 10) {
                num = 0;
            }
            else {
                num = value + 1;
            }
            this.addNun(num);
        };
        JoinRoomPanel.prototype.reset = function () {
            for (var i = 0; i < 6; i++) {
                this._inputNArr[i].delete();
            }
            this._curIndex = 0;
        };
        JoinRoomPanel.prototype.removeOneNum = function () {
            if (this._curIndex > 0) {
                this._inputNArr[this._curIndex - 1].delete();
                this._curIndex--;
            }
        };
        JoinRoomPanel.prototype.addNun = function (num) {
            if (this._curIndex < 6) {
                this._inputNArr[this._curIndex].value = num;
                this._curIndex++;
                if (this._curIndex == 6) {
                    this.joinRoom();
                }
            }
        };
        JoinRoomPanel.prototype.joinRoom = function () {
            var value = "";
            for (var i = 0; i < 6; i++) {
                value += this._inputNArr[i].value.toString();
            }
            MsgSendMgr.enterRoom(Number(value), -1);
            this.destroy();
            uniLib.PopUpMgr.removePopUp(this);
        };
        return JoinRoomPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    joinroom.JoinRoomPanel = JoinRoomPanel;
    __reflect(JoinRoomPanel.prototype, "joinroom.JoinRoomPanel");
})(joinroom || (joinroom = {}));
