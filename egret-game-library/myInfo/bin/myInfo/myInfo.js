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
var myInfo;
(function (myInfo) {
    var BindPhoneVC = (function (_super) {
        __extends(BindPhoneVC, _super);
        function BindPhoneVC(phone) {
            var _this = _super.call(this) || this;
            /*验证码计时*/
            _this.count = 60;
            _this._phone = phone;
            _this.skinName = "BindPhoneVCSkin";
            return _this;
        }
        BindPhoneVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
            this.init();
            this.setData(this._phone);
        };
        BindPhoneVC.prototype.setData = function (phoneNum) {
            var bool = phoneNum ? false : true;
            this._phoneNum.visible = bool;
            this._phoneTxt.visible = !bool;
            this._confirm.visible = bool;
            this._relieve.visible = !bool;
            this._phone_bg.visible = bool;
            this._sendCaptcha.enabled = !bool;
            this._phoneTxt.text = phoneNum ? phoneNum + "" : "";
        };
        BindPhoneVC.prototype.destory = function () {
            this.removeEvent();
            if (this.timer) {
                this.timer.stop();
                this.timer = null;
            }
        };
        /*初始化面板*/
        BindPhoneVC.prototype.init = function () {
            // this._phoneNumWarn.visible = true;
            // this._captchaWarn.visible = false;
            this._phoneNum.text = "";
            this._phoneNum.restrict = "0-9";
            this._captcha.text = "";
            this._captcha.restrict = "0-9";
            this.timer = null;
            this.count = 60;
            this._sendCaptcha.enabled = false;
            this.phone = null;
            this.password = null;
        };
        /*监听按钮*/
        BindPhoneVC.prototype.addEvent = function () {
            uniLib.Global.addEventListener(myInfo.MyInfoConst.GET_INFO, this.onBind, this);
            uniLib.Global.addEventListener(myInfo.MyInfoConst.PHONE_BIND, this.backHander, this);
            this._back.addEventListener(egret.TouchEvent.TOUCH_TAP, this.backHander, this);
            this._confirm.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._relieve.addEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._sendCaptcha.addEventListener(egret.TouchEvent.TOUCH_TAP, this.getCaptcha, this);
            this._phoneNum.addEventListener(egret.Event.CHANGE, this.verifyPhone, this);
            this._captcha.addEventListener(egret.Event.CHANGE, this.verifyCaptcha, this);
            this._phoneNum.addEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            this._captcha.addEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
        };
        //绑定解绑手机
        BindPhoneVC.prototype.onBind = function (evt) {
            var data = evt.param;
            if (data.userInfo.phonenumber) {
                this.setData(Number(data.userInfo.phonenumber));
                uniLib.UserInfo.phonenumber = Number(data.userInfo.phonenumber);
            }
            else {
                this.setData(0);
                uniLib.UserInfo.phonenumber = undefined;
            }
        };
        /*移除监听*/
        BindPhoneVC.prototype.removeEvent = function () {
            uniLib.Global.removeEventListener(myInfo.MyInfoConst.GET_INFO, this.onBind, this);
            uniLib.Global.removeEventListener(myInfo.MyInfoConst.PHONE_BIND, this.backHander, this);
            this._back.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.backHander, this);
            this._confirm.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._relieve.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.confirmHandle, this);
            this._sendCaptcha.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.getCaptcha, this);
            this._phoneNum.removeEventListener(egret.Event.CHANGE, this.verifyPhone, this);
            this._captcha.removeEventListener(egret.Event.CHANGE, this.verifyCaptcha, this);
            this._phoneNum.removeEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            this._captcha.removeEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
        };
        /*验证手机号*/
        BindPhoneVC.prototype.verifyPhone = function () {
            var phone = this._phoneNum.text.trim();
            // this._sendCaptcha.enabled = false;
            this.phone = null;
            if (/^1[3456789]\d{9}$/.test(phone)) {
                this.phone = phone;
                // this._phoneNumWarn.visible = false;
                this._sendCaptcha.enabled = true;
            }
            else {
                // this._phoneNumWarn.visible = true;
                this.phone = null;
            }
            this._sendCaptcha.enabled = true;
        };
        /*验证验证码*/
        BindPhoneVC.prototype.verifyCaptcha = function () {
            var code = this._captcha.text.trim();
            if ((/^\d{6}$/).test(code)) {
                // this._captchaWarn.visible = false;
                this.code = Number(this._captcha.text.trim());
            }
            else {
                // this._captchaWarn.visible = true;
                this.code = 0;
            }
        };
        /**确认*/
        BindPhoneVC.prototype.confirmHandle = function (evt) {
            var type = 1;
            if (evt.target == this._relieve) {
                type = 2;
            }
            // if (this._phoneNumWarn.visible) {
            //     uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号");
            // }else
            if (this.code == 0) {
                uniLib.TipsUtils.showTipsDownToUp("请重新输入验证码");
            }
            else {
                if (!NetMgr.ws) {
                    uniLib.TipsUtils.showTipsDownToUp("请先获取验证码");
                }
                else {
                    var req = new Cmd.BindingMobilePhoneLobbyCmd_C();
                    req.opType = type;
                    req.phoneNumber = Number(this.phone);
                    req.code = this.code;
                    NetMgr.tcpSend(req);
                }
            }
        };
        /*请求验证码*/
        BindPhoneVC.prototype.getCaptcha = function () {
            if (this._confirm.visible) {
                var phone = this._phoneNum.text.trim();
                if (/^1[3456789]\d{9}$/.test(phone)) {
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("请输入正确的手机号");
                    return;
                }
            }
            if (this.phone || Number(this._phoneTxt.text) != 0) {
                /*** 登录时修改密码*/
                if (!NetMgr.ws) {
                    var config = uniLib.Global.gameConfig;
                    NetMgr.init(config.login_url, config.gameid, config.zoneid);
                    NetMgr.GetPhoneCode(this.phone, "", function (rev) {
                        if (rev && rev.retcode == 0) {
                            uniLib.TipsUtils.showTipsDownToUp("发送成功");
                        }
                        else {
                            uniLib.TipsUtils.showTipsDownToUp("短信发送速度过快,请稍等");
                        }
                        return true;
                    }, this);
                }
                else {
                    var req = new Cmd.GetIdentifyingCodeLobbyCmd_C();
                    if (Number(this._phoneTxt.text) != 0) {
                        req.phoneNumber = Number(this._phoneTxt.text);
                        req.opType = 2;
                    }
                    else {
                        req.phoneNumber = parseInt(this.phone);
                        req.opType = 1;
                    }
                    NetMgr.tcpSend(req);
                }
                this.startCount();
            }
        };
        /**关闭当前面板 */
        BindPhoneVC.prototype.backHander = function () {
            uniLib.PopUpMgr.removePopUp(this);
        };
        BindPhoneVC.prototype.startCount = function () {
            this.code = 0;
            this._captcha.text = "";
            // this._captchaWarn.visible = true;
            this._sendCaptcha.enabled = false;
            this._sendCaptcha.visible = false;
            this._count.visible = true;
            this.timer = new egret.Timer(1000);
            this.timer.addEventListener(egret.TimerEvent.TIMER, this.timerFunc, this);
            this.timer.start();
        };
        BindPhoneVC.prototype.timerFunc = function () {
            if (this.count > 0) {
                this.count--;
                this._count.text = "验证码已发送(" + this.count + ")";
            }
            else {
                this.timer.stop();
                this.timer = null;
                this._sendCaptcha.visible = true;
                this._sendCaptcha.enabled = true;
                this._count.visible = false;
                this.count = 60;
            }
        };
        BindPhoneVC.prototype.hidephonevc = function () {
            uniLib.ZQGameSdk.hideVk();
        };
        return BindPhoneVC;
    }(eui.Component));
    myInfo.BindPhoneVC = BindPhoneVC;
    __reflect(BindPhoneVC.prototype, "myInfo.BindPhoneVC");
})(myInfo || (myInfo = {}));
var myInfo;
(function (myInfo) {
    var MyInfoConst = (function () {
        function MyInfoConst() {
        }
        MyInfoConst.RES_JSON = "resource/myInfo/myInfo.res_e4edcb80.json";
        MyInfoConst.THM_JSON = "resource/myInfo/gameEui_33060c5e.json";
        /**
         * 公共loading需要加载的资源组
         */
        MyInfoConst.PUB_MYINFO = "pub_myInfo";
        //手机绑定解绑
        MyInfoConst.PHONE_BIND = "PHONE_BIND";
        //个人信息
        MyInfoConst.GET_INFO = "GET_INFO";
        return MyInfoConst;
    }());
    myInfo.MyInfoConst = MyInfoConst;
    __reflect(MyInfoConst.prototype, "myInfo.MyInfoConst");
})(myInfo || (myInfo = {}));
var Cmd;
(function (Cmd) {
    /**绑定手机成功 */
    function OnBindingMobilePhoneLobbyCmd_S(rev) {
        if (rev.resultCode == 0) {
            uniLib.Global.dispatchEvent(myInfo.MyInfoConst.PHONE_BIND, rev);
        }
    }
    Cmd.OnBindingMobilePhoneLobbyCmd_S = OnBindingMobilePhoneLobbyCmd_S;
})(Cmd || (Cmd = {}));
var myInfo;
(function (myInfo) {
    /**
     * 个人信息
     */
    var MyInfoVC = (function (_super) {
        __extends(MyInfoVC, _super);
        function MyInfoVC(info) {
            var _this = _super.call(this) || this;
            _this._info = info;
            _this.skinName = "MyInfoVCSkin";
            return _this;
        }
        MyInfoVC.prototype.childrenCreated = function () {
            _super.prototype.childrenCreated.call(this);
            this.addEvent();
            this.init();
        };
        //渲染用户数据
        MyInfoVC.prototype.init = function () {
            var baseInfo = this._info.userInfo;
            this.head_img.source = baseInfo.headUrl;
            this.nickName_lbl.text = "昵称：" + baseInfo.nickname;
            this.account_lbl.text = "账号：" + baseInfo.uid;
            baseInfo.gender == "男" ? this.boy_rbtn.selected = true : this.girl_rbtn.selected = true;
            baseInfo.phonenumber ? this.tips_lbl.visible = false : this.tips_lbl.visible = true;
            this.position_lbl.text = "位置：" + baseInfo.loc;
            if (baseInfo.signature) {
                this.sign_etxt.text = baseInfo.signature;
                this.sign_btn.x = this.sign_etxt.x + this.sign_etxt.width + 5;
                this.sign_etxt.width += 60;
            }
            var recordInfo = this._info.gameRecord;
            if (recordInfo) {
                this.allNum_lbl.text = "总对局：" + recordInfo.totalRound;
                this.winStreak_lbl.text = "最高连胜数：" + recordInfo.winStreak;
                this.rate_lbl.text = "胜率：" + recordInfo.winPercent + "%";
                this.todayWin_lbl.text = "今日胜场：" + recordInfo.todayWin;
                this.rank_btn.label = "x" + recordInfo.topThree;
                this.eliminate_btn.label = "x" + recordInfo.eliminateNum;
                this.reward_btn.label = "x" + recordInfo.drawAll + "元";
                this.rushNum_btn.label = "x" + recordInfo.rushRound;
            }
            if (uniLib.Global.isInGame) {
                this.gift_grp.visible = true;
                this.tips_lbl.visible = false;
                this.phone_btn.visible = false;
            }
            else {
                this.gift_grp.visible = false;
                this.tips_lbl.visible = true;
                this.phone_btn.visible = true;
            }
            /**
             * 不允许操作
             */
            if (baseInfo.uid != uniLib.UserInfo.uid || uniLib.Global.isInGame) {
                this.tips_lbl.visible = false;
                this.phone_btn.visible = false;
                this.sign_btn.visible = false;
                this.sign_etxt.touchEnabled = false;
                baseInfo.gender == "男" ? this.girl_rbtn.visible = false : this.boy_rbtn.visible = false, this.girl_rbtn.x = this.boy_rbtn.x;
            }
            if (uniLib.Global.is_sandbox == 1 && uniLib.Global.isWxGame()) {
                this.tips_lbl.visible = false;
                this.phone_btn.visible = false;
            }
            /**小米 oppo渠道 */
            if (uniLib.Global.platId == 6 || uniLib.Global.platId == 15) {
                this.tips_lbl.visible = false;
                this.phone_btn.visible = false;
            }
        };
        //打开手机绑定页面
        MyInfoVC.prototype.openBind = function () {
            this.closeInfo();
            uniLib.PopUpMgr.addPopUp(myInfo.BindPhoneVC, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, uniLib.UserInfo.phonenumber ? uniLib.UserInfo.phonenumber : null);
        };
        //监听按钮
        MyInfoVC.prototype.addEvent = function () {
            this.phone_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBind, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeInfo, this);
            this.gift_grp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGift, this);
        };
        //移除监听
        MyInfoVC.prototype.removeEvent = function () {
            this.phone_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBind, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeInfo, this);
            this.gift_grp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGift, this);
        };
        /**送礼 */
        MyInfoVC.prototype.onGift = function (evt) {
            var target = evt.target;
            var position = this.gift_grp.globalToLocal(evt.stageX, evt.stageY);
            var giftId;
            if (position.x < 87) {
                giftId = 3;
            }
            else if (position.x > 87 + 12 && position.x < 87 * 2 + 12) {
                giftId = 4;
            }
            else if (position.x > 87 * 2 + 12 * 2 && position.x < 87 * 3 + 12 * 2) {
                giftId = 5;
            }
            else if (position.x > 87 * 3 + 12 * 3 && position.x < 87 * 4 + 12 * 3) {
                giftId = 6;
            }
            var req = new Cmd.SendGiftPokerCmd_C();
            var info = new Cmd.GiftsInfo();
            info.giftsId = giftId;
            info.giftsNum = 1;
            if (this._info.userInfo.uid == uniLib.UserInfo.uid) {
                info.toUid = 0;
                info.fromUid = uniLib.UserInfo.uid;
            }
            else {
                info.toUid = this._info.userInfo.uid;
                info.fromUid = uniLib.UserInfo.uid;
            }
            req.gift = info;
            uniLib.NetMgr.tcpSend(req);
            uniLib.PopUpMgr.removePopUp(this);
        };
        //关闭当前面板 确定有没有要修改的内容
        MyInfoVC.prototype.closeInfo = function () {
            if (this._info && this._info.userInfo.uid == uniLib.UserInfo.uid) {
                var gender = this.boy_rbtn.selected ? "男" : "女";
                if (this.sign_etxt.text != uniLib.UserInfo.signature && this.sign_etxt.text != "暂未设置签名" && this.sign_etxt.text.length <= 15) {
                    var req = new Cmd.UserInfoModifyRequestLobyCmd_C();
                    req.signature = this.sign_etxt.text;
                    req.gender = gender;
                    NetMgr.tcpSend(req);
                }
                else if (gender != uniLib.UserInfo.gender) {
                    var req = new Cmd.UserInfoModifyRequestLobyCmd_C();
                    req.gender = gender;
                    NetMgr.tcpSend(req);
                }
            }
            uniLib.PopUpMgr.removePopUp(this);
        };
        MyInfoVC.prototype.destory = function () {
            this.removeEvent();
            this._info = null;
            this.head_img.texture && this.head_img.texture.dispose();
            this.head_img = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeAllChildren(this);
        };
        return MyInfoVC;
    }(eui.Component));
    myInfo.MyInfoVC = MyInfoVC;
    __reflect(MyInfoVC.prototype, "myInfo.MyInfoVC");
})(myInfo || (myInfo = {}));
