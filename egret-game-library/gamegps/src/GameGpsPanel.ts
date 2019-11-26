module gamegps {
    //下注详情面版
    export class GameGpsPanel extends commonpanel.LobbyBaseEuiPanel {
        //按钮组
        private _btn_continue: eui.WxButton;
        private _btn_leave: eui.WxButton;
        //2个人
        private _twoPeople: eui.Group;
        private _line_2: eui.Image;
        private _user_group_2_1: eui.Group;
        private _user_group_2_2: eui.Group;
        private _user_headImg_2_1: eui.Image;
        private _user_headImg_2_2: eui.Image;
        private _user_name_2_1: eui.Label;
        private _user_name_2_2: eui.Label;
        private _distance_group_2_1: eui.Group;
        private _distance_bg_2_1: eui.Image;
        private _distance_txt_2_1: eui.Label;
        //3个人
        private _threePeple: eui.Group;
        private _line_3: eui.Image;
        private _user_group_3_1: eui.Group;
        private _user_group_3_2: eui.Group;
        private _user_group_3_3: eui.Group;
        private _user_headImg_3_1: eui.Image;
        private _user_headImg_3_2: eui.Image;
        private _user_headImg_3_3: eui.Image;
        private _user_name_3_1: eui.Label;
        private _user_name_3_2: eui.Label;
        private _user_name_3_3: eui.Label;
        private _distance_group_3_1: eui.Group;
        private _distance_bg_3_1: eui.Image;
        private _distance_txt_3_1: eui.Label;
        private _distance_group_3_2: eui.Group;
        private _distance_bg_3_2: eui.Image;
        private _distance_txt_3_2: eui.Label;
        private _distance_group_3_3: eui.Group;
        private _distance_bg_3_3: eui.Image;
        private _distance_txt_3_3: eui.Label;

        //4个人
        private _fourPeople: eui.Group;
        private _line_4: eui.Image;
        private _user_group_4_1: eui.Group;
        private _user_group_4_2: eui.Group;
        private _user_group_4_3: eui.Group;
        private _user_group_4_4: eui.Group;
        private _user_headImg_4_1: eui.Image;
        private _user_headImg_4_2: eui.Image;
        private _user_headImg_4_3: eui.Image;
        private _user_headImg_4_4: eui.Image;
        private _user_name_4_1: eui.Label;
        private _user_name_4_2: eui.Label;
        private _user_name_4_3: eui.Label;
        private _user_name_4_4: eui.Label;
        private _distance_group_4_1: eui.Group;
        private _distance_bg_4_1: eui.Image;
        private _distance_txt_4_1: eui.Label;
        private _distance_group_4_2: eui.Group;
        private _distance_bg_4_2: eui.Image;
        private _distance_txt_4_2: eui.Label;
        private _distance_group_4_3: eui.Group;
        private _distance_bg_4_3: eui.Image;
        private _distance_txt_4_3: eui.Label;
        private _distance_group_4_4: eui.Group;
        private _distance_bg_4_4: eui.Image;
        private _distance_txt_4_4: eui.Label;
        private _distance_group_4_5: eui.Group;
        private _distance_bg_4_5: eui.Image;
        private _distance_txt_4_5: eui.Label;
        private _distance_group_4_6: eui.Group;
        private _distance_bg_4_6: eui.Image;
        private _distance_txt_4_6: eui.Label;

        //根据seatId对应显示元素
        private eleMap: Map<number, Map<string, any>> = new Map();
        //距离显示Map
        private distanceMap: Map<string, Map<string, any>> = new Map();
        //用户信息列表
        private userVoList: UserVo[] = [];
        constructor() {
            super("chaguan_gps_title_png", 1009, 622);
            this.skinName = "GpsPanel";
        }
        protected createChildren() {
            super.createChildren();
        }
        protected initUI() {
            this._btn_continue.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGPS, this);
            this._btn_leave.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeave, this);
            this.reset();
        }
        public closeGPS() {
            uniLib.PopUpMgr.removePopUp(this);
        }
        private onLeave() {
            this.dispatchEventWith(GameGpsUIEventConsts.DISMISS_GAME);
        }
        private reset() {
            //重置显示元素
            switch (GameGpsData.getInstance().playerNumber) {
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
        }
        public initPanel() {
            //根据房间人数初始化显示元素
            switch (GameGpsData.getInstance().playerNumber) {
                case 2:
                    this._fourPeople.visible = false;
                    this._threePeple.visible = false;
                    this._twoPeople.visible = true;
                    this._line_2.visible = true;
                    this._user_group_2_1.visible = true;
                    this._user_group_2_2.visible = true;
                    this._user_name_2_1.visible = false;
                    this._user_name_2_2.visible = false;
                    let distanceEleMap212: Map<string, any> = new Map();
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
                    let distanceEleMap312: Map<string, any> = new Map();
                    distanceEleMap312.set("bg", this._distance_bg_3_1);
                    distanceEleMap312.set("txt", this._distance_txt_3_1);
                    distanceEleMap312.set("group", this._distance_group_3_1);
                    this.distanceMap.set('12', distanceEleMap312);

                    let distanceEleMap313: Map<string, any> = new Map();
                    distanceEleMap313.set("bg", this._distance_bg_3_2);
                    distanceEleMap313.set("txt", this._distance_txt_3_2);
                    distanceEleMap313.set("group", this._distance_group_3_2);
                    this.distanceMap.set('13', distanceEleMap313);

                    let distanceEleMap323: Map<string, any> = new Map();
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

                    let distanceEleMap412: Map<string, any> = new Map();
                    distanceEleMap412.set("bg", this._distance_bg_4_2);
                    distanceEleMap412.set("txt", this._distance_txt_4_2);
                    distanceEleMap412.set("group", this._distance_group_4_2);
                    this.distanceMap.set('12', distanceEleMap412);

                    let distanceEleMap413: Map<string, any> = new Map();
                    distanceEleMap413.set("bg", this._distance_bg_4_6);
                    distanceEleMap413.set("txt", this._distance_txt_4_6);
                    distanceEleMap413.set("group", this._distance_group_4_6);

                    this.distanceMap.set('13', distanceEleMap413);

                    let distanceEleMap414: Map<string, any> = new Map();
                    distanceEleMap414.set("bg", this._distance_bg_4_3);
                    distanceEleMap414.set("txt", this._distance_txt_4_3);
                    distanceEleMap414.set("group", this._distance_group_4_3);
                    this.distanceMap.set('14', distanceEleMap414);

                    let distanceEleMap423: Map<string, any> = new Map();
                    distanceEleMap423.set("bg", this._distance_bg_4_4);
                    distanceEleMap423.set("txt", this._distance_txt_4_4);
                    distanceEleMap423.set("group", this._distance_group_4_4);
                    this.distanceMap.set('23', distanceEleMap423);

                    let distanceEleMap424: Map<string, any> = new Map();
                    distanceEleMap424.set("bg", this._distance_bg_4_5);
                    distanceEleMap424.set("txt", this._distance_txt_4_5);
                    distanceEleMap424.set("group", this._distance_group_4_5);
                    this.distanceMap.set('24', distanceEleMap424);

                    let distanceEleMap434: Map<string, any> = new Map();
                    distanceEleMap434.set("bg", this._distance_bg_4_1);
                    distanceEleMap434.set("txt", this._distance_txt_4_1);
                    distanceEleMap434.set("group", this._distance_group_4_1);
                    this.distanceMap.set('34', distanceEleMap434);

                    break;
                default:
                    break;
            }
            //初始化数据
            let userIndex: number = 1;
            for (let user of GameGpsData.getInstance().userList) {
                if (DEBUG) {
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
                let seatMap: Map<string, any> = new Map();
                let groupEleName: string = `_user_group_${GameGpsData.getInstance().playerNumber}_${userIndex}`;
                let headImgName: string = `_user_headImg_${GameGpsData.getInstance().playerNumber}_${userIndex}`;
                let userNameEle: string = `_user_name_${GameGpsData.getInstance().playerNumber}_${userIndex}`;

                seatMap.set('group', this[groupEleName]);
                seatMap.set('headImg', this[headImgName]);
                seatMap.set('userName', this[userNameEle]);
                this.eleMap.set(userIndex, seatMap);

                this.userVoList[userIndex] = user;

                this.addShowPlayer(user, userIndex);
                userIndex++;
            }
            this.showDistanceAll();
        }

        //增加一个玩家显示
        private addShowPlayer(userVo: UserVo, userIndex: number) {
            let seatMap: Map<string, any> = this.eleMap.get(userIndex);
            let headImg: eui.Image = seatMap.get('headImg');
            headImg.source = userVo.headUrl;
            let userName: eui.Label = seatMap.get('userName');
            userName.text = userVo.nickName;
            userName.visible = true;
        }
        //显示所有距离
        private isWarn: boolean = false;
        private _tip_ok_group: eui.Group;
        private _tip_warn_group: eui.Group;
        private showDistanceAll() {
            //已计算过的距离的index暂存
            let hasShow: string[] = [];
            //有没有距离过近
            this.userVoList.forEach((user, index, arr) => {
                arr.forEach((user2, index2) => {
                    let seatArr = [index, index2].sort((a, b) => {
                        return a - b;
                    });
                    let seatIndex: string = seatArr.join("");
                    if (!this.distanceMap.has(seatIndex)) {
                        // console.warn(`distanceMap中index不存在:${seatIndex}`);
                        return;
                    }
                    if (hasShow.indexOf(seatIndex) != -1) {
                        //已经显示过距离的不显示
                        return;
                    }
                    this.showDistance(seatIndex, index, index2);

                    hasShow.push(seatIndex);
                });
            });
            if (this.isWarn) {
                this._tip_warn_group.visible = true;
                this._tip_ok_group.visible = false;
            } else {
                this._tip_warn_group.visible = false;
                this._tip_ok_group.visible = true;
            }
        }
        //显示距离
        private showDistance(seatIndex: string, index1, index2) {
            let userVo1: UserVo = this.userVoList[index1];
            let userVo2: UserVo = this.userVoList[index2];
            let distance: number = uniLib.Utils.getDistance(userVo1.lat, userVo1.lng, userVo2.lat, userVo2.lng);
            if (!distance) {
                this.distanceMap.get(seatIndex).get('bg').source = "chaguan_gps_distance_bg_red_png";
                this.distanceMap.get(seatIndex).get('txt').text = "?";

            } else if (distance <= 300) {
                this.distanceMap.get(seatIndex).get('bg').source = "chaguan_gps_distance_bg_red_png";
                this.distanceMap.get(seatIndex).get('txt').text = distance.toFixed(1) + "米";
                this.isWarn = true;
                this.hasPop(userVo1, userVo2);
            } else {
                this.distanceMap.get(seatIndex).get('bg').source = "chaguan_gps_distance_bg_green_png";
                if (distance <= 1000) {
                    this.distanceMap.get(seatIndex).get('txt').text = distance.toFixed(1) + "米";
                } else {
                    this.distanceMap.get(seatIndex).get('txt').text = (distance / 1000).toFixed(1) + "公里";
                }
            }

            this.distanceMap.get(seatIndex).get('group').visible = true;

        }

        private hasPopUpUidArr: number[][] = [];
        //判断距离过近弹出，相同两个玩家是否弹出过
        private hasPop(userVo1: UserVo, userVo2: UserVo) {
            let uidArr = [userVo1.uid, userVo2.uid].sort((a, b) => {
                return a - b;
            });
            let hasPop = false;
            if (this.hasPopUpUidArr.length) {
                this.hasPopUpUidArr.forEach((uidArrGet: number[], index: number) => {
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
        }
        public destroy2() {
            this._btn_continue.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeGPS, this);
            this._btn_leave.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onLeave, this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
    export class UserVo {
        constructor() { }
        /**头像资源 */
        headUrl: string;
        /**名字 */
        nickName: string;
        /**ID */
        uid: number;
        /**经度 */
        lng: number;
        /**纬度 */
        lat: number;
    }
}