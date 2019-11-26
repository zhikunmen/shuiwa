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
var gamegps;
(function (gamegps) {
    var GameGpsConst = (function () {
        function GameGpsConst() {
        }
        GameGpsConst.RES_JSON = "resource/gamegps/gamegps.res_960793f5.json";
        GameGpsConst.THM_JSON = "resource/gamegps/gameEui_ba2da8.json";
        /**
         * 公共loading需要加载的资源组
         */
        GameGpsConst.GAME_GPS = "game_gps";
        return GameGpsConst;
    }());
    gamegps.GameGpsConst = GameGpsConst;
    __reflect(GameGpsConst.prototype, "gamegps.GameGpsConst");
})(gamegps || (gamegps = {}));
var gamegps;
(function (gamegps) {
    //下注详情面版
    var GameGpsPanel = (function (_super) {
        __extends(GameGpsPanel, _super);
        function GameGpsPanel() {
            var _this = _super.call(this, "chaguan_gps_title_png", 1009, 622) || this;
            //根据seatId对应显示元素
            _this.eleMap = new Map();
            //距离显示Map
            _this.distanceMap = new Map();
            //用户信息列表
            _this.userVoList = [];
            //显示所有距离
            _this.isWarn = false;
            _this.hasPopUpUidArr = [];
            _this.skinName = "GpsPanel";
            return _this;
        }
        GameGpsPanel.prototype.createChildren = function () {
            _super.prototype.createChildren.call(this);
        };
        GameGpsPanel.prototype.initUI = function () {
            this._btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGPS, this);
            this._btn_leave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeave, this);
            this.reset();
        };
        GameGpsPanel.prototype.closeGPS = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        GameGpsPanel.prototype.onLeave = function () {
            this.dispatchEventWith(gamegps.GameGpsUIEventConsts.DISMISS_GAME);
        };
        GameGpsPanel.prototype.reset = function () {
            //重置显示元素
            switch (gamegps.GameGpsData.getInstance().playerNumber) {
                case 2:
                    this._user_name_2_1.visible = false;
                    this._user_name_2_2.visible = false;
                    this._user_headImg_2_1.source = "chaguan_gps_head_bg_png";
                    this._user_headImg_2_2.source = "chaguan_gps_head_bg_png";
                    this._distance_group_2_1.visible = false;
                    break;
                case 3:
                    this._user_name_3_1.visible = false;
                    this._user_name_3_2.visible = false;
                    this._user_name_3_3.visible = false;
                    this._user_headImg_3_1.source = "chaguan_gps_head_bg_png";
                    this._user_headImg_3_2.source = "chaguan_gps_head_bg_png";
                    this._user_headImg_3_3.source = "chaguan_gps_head_bg_png";
                    this._distance_group_3_1.visible = false;
                    this._distance_group_3_2.visible = false;
                    this._distance_group_3_3.visible = false;
                    break;
                case 4:
                    this._user_name_4_1.visible = false;
                    this._user_name_4_2.visible = false;
                    this._user_name_4_3.visible = false;
                    this._user_name_4_4.visible = false;
                    this._user_headImg_4_1.source = "chaguan_gps_head_bg_png";
                    this._user_headImg_4_2.source = "chaguan_gps_head_bg_png";
                    this._user_headImg_4_3.source = "chaguan_gps_head_bg_png";
                    this._user_headImg_4_4.source = "chaguan_gps_head_bg_png";
                    this._distance_group_4_1.visible = false;
                    this._distance_group_4_2.visible = false;
                    this._distance_group_4_3.visible = false;
                    this._distance_group_4_4.visible = false;
                    this._distance_group_4_5.visible = false;
                    this._distance_group_4_6.visible = false;
                    break;
                default:
                    break;
            }
            this.isWarn = false;
            this._tip_ok_group.visible = false;
            this._tip_warn_group.visible = false;
            this.eleMap = new Map();
            this.distanceMap = new Map();
            this.userVoList = [];
        };
        GameGpsPanel.prototype.initPanel = function () {
            //根据房间人数初始化显示元素
            switch (gamegps.GameGpsData.getInstance().playerNumber) {
                case 2:
                    this._fourPeople.visible = false;
                    this._threePeple.visible = false;
                    this._twoPeople.visible = true;
                    this._line_2.visible = true;
                    this._user_group_2_1.visible = true;
                    this._user_group_2_2.visible = true;
                    this._user_name_2_1.visible = false;
                    this._user_name_2_2.visible = false;
                    var distanceEleMap212 = new Map();
                    distanceEleMap212.set("bg", this._distance_bg_2_1);
                    distanceEleMap212.set("txt", this._distance_txt_2_1);
                    distanceEleMap212.set("group", this._distance_group_2_1);
                    this.distanceMap.set('12', distanceEleMap212);
                    break;
                case 3:
                    this._twoPeople.visible = false;
                    this._fourPeople.visible = false;
                    this._threePeple.visible = true;
                    this._line_3.visible = true;
                    this._user_group_3_1.visible = true;
                    this._user_group_3_2.visible = true;
                    this._user_group_3_3.visible = true;
                    this._user_name_3_1.visible = false;
                    this._user_name_3_2.visible = false;
                    this._user_name_3_3.visible = false;
                    var distanceEleMap312 = new Map();
                    distanceEleMap312.set("bg", this._distance_bg_3_1);
                    distanceEleMap312.set("txt", this._distance_txt_3_1);
                    distanceEleMap312.set("group", this._distance_group_3_1);
                    this.distanceMap.set('12', distanceEleMap312);
                    var distanceEleMap313 = new Map();
                    distanceEleMap313.set("bg", this._distance_bg_3_2);
                    distanceEleMap313.set("txt", this._distance_txt_3_2);
                    distanceEleMap313.set("group", this._distance_group_3_2);
                    this.distanceMap.set('13', distanceEleMap313);
                    var distanceEleMap323 = new Map();
                    distanceEleMap323.set("bg", this._distance_bg_3_3);
                    distanceEleMap323.set("txt", this._distance_txt_3_3);
                    distanceEleMap323.set("group", this._distance_group_3_3);
                    this.distanceMap.set('23', distanceEleMap323);
                    break;
                case 4:
                    this._twoPeople.visible = false;
                    this._threePeple.visible = false;
                    this._fourPeople.visible = true;
                    this._line_4.visible = true;
                    this._user_group_4_1.visible = true;
                    this._user_group_4_2.visible = true;
                    this._user_group_4_3.visible = true;
                    this._user_group_4_4.visible = true;
                    this._user_name_4_1.visible = false;
                    this._user_name_4_2.visible = false;
                    this._user_name_4_3.visible = false;
                    this._user_name_4_4.visible = false;
                    var distanceEleMap412 = new Map();
                    distanceEleMap412.set("bg", this._distance_bg_4_2);
                    distanceEleMap412.set("txt", this._distance_txt_4_2);
                    distanceEleMap412.set("group", this._distance_group_4_2);
                    this.distanceMap.set('12', distanceEleMap412);
                    var distanceEleMap413 = new Map();
                    distanceEleMap413.set("bg", this._distance_bg_4_6);
                    distanceEleMap413.set("txt", this._distance_txt_4_6);
                    distanceEleMap413.set("group", this._distance_group_4_6);
                    this.distanceMap.set('13', distanceEleMap413);
                    var distanceEleMap414 = new Map();
                    distanceEleMap414.set("bg", this._distance_bg_4_3);
                    distanceEleMap414.set("txt", this._distance_txt_4_3);
                    distanceEleMap414.set("group", this._distance_group_4_3);
                    this.distanceMap.set('14', distanceEleMap414);
                    var distanceEleMap423 = new Map();
                    distanceEleMap423.set("bg", this._distance_bg_4_4);
                    distanceEleMap423.set("txt", this._distance_txt_4_4);
                    distanceEleMap423.set("group", this._distance_group_4_4);
                    this.distanceMap.set('23', distanceEleMap423);
                    var distanceEleMap424 = new Map();
                    distanceEleMap424.set("bg", this._distance_bg_4_5);
                    distanceEleMap424.set("txt", this._distance_txt_4_5);
                    distanceEleMap424.set("group", this._distance_group_4_5);
                    this.distanceMap.set('24', distanceEleMap424);
                    var distanceEleMap434 = new Map();
                    distanceEleMap434.set("bg", this._distance_bg_4_1);
                    distanceEleMap434.set("txt", this._distance_txt_4_1);
                    distanceEleMap434.set("group", this._distance_group_4_1);
                    this.distanceMap.set('34', distanceEleMap434);
                    break;
                default:
                    break;
            }
            //初始化数据
            var userIndex = 1;
            for (var _i = 0, _a = gamegps.GameGpsData.getInstance().userList; _i < _a.length; _i++) {
                var user = _a[_i];
                if (true) {
                    //随机生成经纬度数据
                    user.lng = (Math.random() * 2 - 1) * 180;
                    user.lat = (Math.random() * 2 - 1) * 90;
                    if (userIndex == 1) {
                        user.lng = 45.112;
                        user.lat = 45.112;
                    }
                    if (userIndex == 2) {
                        user.lng = 45.113;
                        user.lat = 45.113;
                    }
                }
                var seatMap = new Map();
                var groupEleName = "_user_group_" + gamegps.GameGpsData.getInstance().playerNumber + "_" + userIndex;
                var headImgName = "_user_headImg_" + gamegps.GameGpsData.getInstance().playerNumber + "_" + userIndex;
                var userNameEle = "_user_name_" + gamegps.GameGpsData.getInstance().playerNumber + "_" + userIndex;
                seatMap.set('group', this[groupEleName]);
                seatMap.set('headImg', this[headImgName]);
                seatMap.set('userName', this[userNameEle]);
                this.eleMap.set(userIndex, seatMap);
                this.userVoList[userIndex] = user;
                this.addShowPlayer(user, userIndex);
                userIndex++;
            }
            this.showDistanceAll();
        };
        //增加一个玩家显示
        GameGpsPanel.prototype.addShowPlayer = function (userVo, userIndex) {
            var seatMap = this.eleMap.get(userIndex);
            var headImg = seatMap.get('headImg');
            headImg.source = userVo.headUrl;
            var userName = seatMap.get('userName');
            userName.text = userVo.nickName;
            userName.visible = true;
        };
        GameGpsPanel.prototype.showDistanceAll = function () {
            var _this = this;
            //已计算过的距离的index暂存
            var hasShow = [];
            //有没有距离过近
            this.userVoList.forEach(function (user, index, arr) {
                arr.forEach(function (user2, index2) {
                    var seatArr = [index, index2].sort(function (a, b) {
                        return a - b;
                    });
                    var seatIndex = seatArr.join("");
                    if (!_this.distanceMap.has(seatIndex)) {
                        // console.warn(`distanceMap中index不存在:${seatIndex}`);
                        return;
                    }
                    if (hasShow.indexOf(seatIndex) != -1) {
                        //已经显示过距离的不显示
                        return;
                    }
                    _this.showDistance(seatIndex, index, index2);
                    hasShow.push(seatIndex);
                });
            });
            if (this.isWarn) {
                this._tip_warn_group.visible = true;
                this._tip_ok_group.visible = false;
            }
            else {
                this._tip_warn_group.visible = false;
                this._tip_ok_group.visible = true;
            }
        };
        //显示距离
        GameGpsPanel.prototype.showDistance = function (seatIndex, index1, index2) {
            var userVo1 = this.userVoList[index1];
            var userVo2 = this.userVoList[index2];
            var distance = uniLib.Utils.getDistance(userVo1.lat, userVo1.lng, userVo2.lat, userVo2.lng);
            if (!distance) {
                this.distanceMap.get(seatIndex).get('bg').source = "chaguan_gps_distance_bg_red_png";
                this.distanceMap.get(seatIndex).get('txt').text = "?";
            }
            else if (distance <= 300) {
                this.distanceMap.get(seatIndex).get('bg').source = "chaguan_gps_distance_bg_red_png";
                this.distanceMap.get(seatIndex).get('txt').text = distance.toFixed(1) + "米";
                this.isWarn = true;
                this.hasPop(userVo1, userVo2);
            }
            else {
                this.distanceMap.get(seatIndex).get('bg').source = "chaguan_gps_distance_bg_green_png";
                if (distance <= 1000) {
                    this.distanceMap.get(seatIndex).get('txt').text = distance.toFixed(1) + "米";
                }
                else {
                    this.distanceMap.get(seatIndex).get('txt').text = (distance / 1000).toFixed(1) + "公里";
                }
            }
            this.distanceMap.get(seatIndex).get('group').visible = true;
        };
        //判断距离过近弹出，相同两个玩家是否弹出过
        GameGpsPanel.prototype.hasPop = function (userVo1, userVo2) {
            var uidArr = [userVo1.uid, userVo2.uid].sort(function (a, b) {
                return a - b;
            });
            var hasPop = false;
            if (this.hasPopUpUidArr.length) {
                this.hasPopUpUidArr.forEach(function (uidArrGet, index) {
                    if (uidArrGet[0] == uidArr[0] && uidArrGet[1] == uidArr[1]) {
                        hasPop = true;
                        return;
                    }
                });
            }
            if (hasPop) {
                return;
            }
            //加入列队
            this.hasPopUpUidArr.push(uidArr);
        };
        GameGpsPanel.prototype.destroy2 = function () {
            this._btn_continue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGPS, this);
            this._btn_leave.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeave, this);
            uniLib.DisplayUtils.removeFromParent(this);
        };
        return GameGpsPanel;
    }(commonpanel.LobbyBaseEuiPanel));
    gamegps.GameGpsPanel = GameGpsPanel;
    __reflect(GameGpsPanel.prototype, "gamegps.GameGpsPanel");
    var UserVo = (function () {
        function UserVo() {
        }
        return UserVo;
    }());
    gamegps.UserVo = UserVo;
    __reflect(UserVo.prototype, "gamegps.UserVo");
})(gamegps || (gamegps = {}));
var gamegps;
(function (gamegps) {
    var GameGpsUIEventConsts = (function () {
        function GameGpsUIEventConsts() {
        }
        /**弃游 */
        GameGpsUIEventConsts.DISMISS_GAME = "DISMISS_GAME";
        /**显示GPS */
        GameGpsUIEventConsts.SHOW_GPS = "SHOW_GPS";
        return GameGpsUIEventConsts;
    }());
    gamegps.GameGpsUIEventConsts = GameGpsUIEventConsts;
    __reflect(GameGpsUIEventConsts.prototype, "gamegps.GameGpsUIEventConsts");
    var GameGpsData = (function () {
        function GameGpsData() {
        }
        GameGpsData.getInstance = function () {
            if (!this._instance) {
                this._instance = new GameGpsData();
            }
            return this._instance;
        };
        return GameGpsData;
    }());
    gamegps.GameGpsData = GameGpsData;
    __reflect(GameGpsData.prototype, "gamegps.GameGpsData");
})(gamegps || (gamegps = {}));
