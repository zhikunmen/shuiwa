module myInfo {
    /**
     * 个人信息
     */
    export class MyInfoVC extends eui.Component {

        public girl_rbtn: eui.RadioButton;
        public boy_rbtn: eui.RadioButton;
        public phone_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public sign_btn: eui.WxButton;
        public rank_btn: eui.Button;
        public eliminate_btn: eui.Button;
        public reward_btn: eui.Button;
        public rushNum_btn: eui.Button;
        public head_img: eui.Image;
        public nickName_lbl: eui.Label;
        public position_lbl: eui.Label;
        public sign_etxt: eui.EditableText;
        public account_lbl: eui.Label;
        public tips_lbl: eui.Label;
        public allNum_lbl: eui.Label;
        public rate_lbl: eui.Label;
        public winStreak_lbl: eui.Label;
        public todayWin_lbl: eui.Label;

        public gift_grp: eui.Group;

        private _info: Cmd.UserInfoSearchLobbyCmd_S;

        constructor(info: Cmd.UserInfoSearchLobbyCmd_S) {
            super();
            this._info = info;
            this.skinName = "MyInfoVCSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.addEvent();
            this.init();
        }

        //渲染用户数据
        private init(): void {
            let baseInfo = this._info.userInfo;
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
            let recordInfo = this._info.gameRecord;
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
        }

        //打开手机绑定页面
        private openBind(): void {
            this.closeInfo();
            uniLib.PopUpMgr.addPopUp(BindPhoneVC, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0, 0, uniLib.UserInfo.phonenumber ? uniLib.UserInfo.phonenumber : null);
        }
        //监听按钮
        private addEvent(): void {
            this.phone_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.openBind, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.closeInfo, this);
            this.gift_grp.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onGift, this);
        }

        //移除监听
        private removeEvent() {
            this.phone_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.openBind, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.closeInfo, this);
            this.gift_grp.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onGift, this);
        }

        /**送礼 */
        private onGift(evt: egret.TouchEvent) {
            let target = evt.target;
            let position = this.gift_grp.globalToLocal(evt.stageX, evt.stageY);
            let giftId: number;
            if (position.x < 87) {
                giftId = 3;
            }
            else if (position.x > 87 + 12 && position.x < 87 * 2 + 12) {
                giftId = 4
            }
            else if (position.x > 87 * 2 + 12 * 2 && position.x < 87 * 3 + 12 * 2) {
                giftId = 5;
            }
            else if (position.x > 87 * 3 + 12 * 3 && position.x < 87 * 4 + 12 * 3) {
                giftId = 6;
            }
            let req = new Cmd.SendGiftPokerCmd_C();
            let info: Cmd.GiftsInfo = new Cmd.GiftsInfo();
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
        }

        //关闭当前面板 确定有没有要修改的内容
        private closeInfo(): void {
            if (this._info && this._info.userInfo.uid == uniLib.UserInfo.uid) {
                let gender = this.boy_rbtn.selected ? "男" : "女";
                if (this.sign_etxt.text != uniLib.UserInfo.signature && this.sign_etxt.text != "暂未设置签名" && this.sign_etxt.text.length <= 15) {
                    let req = new Cmd.UserInfoModifyRequestLobyCmd_C();
                    req.signature = this.sign_etxt.text;
                    req.gender = gender;
                    NetMgr.tcpSend(req);
                }
                else if (gender != uniLib.UserInfo.gender) {
                    let req = new Cmd.UserInfoModifyRequestLobyCmd_C();
                    req.gender = gender;
                    NetMgr.tcpSend(req);
                }
            }
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destory(): void {
            this.removeEvent();
            this._info = null;
            this.head_img.texture && this.head_img.texture.dispose();
            this.head_img = null;
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeAllChildren(this);
        }
    }
}
