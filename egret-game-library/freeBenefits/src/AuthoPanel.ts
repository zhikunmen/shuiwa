module freeBenefits {
    /**
     * 账号授权
     */
    export class AuthoPanel extends eui.Component {

        public reward_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public reward_lst: eui.List;

        private _wxBtn: UserInfoButton;
        private _plat: any = {};

        public constructor() {
            super();
            this.skinName = "AuthoPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.addEventListener("GET_PAGE_INFO", this.onInfo, this);
            let req = new Cmd.GetPageInfoHpMatchCmd_C();
            req.typ = Cmd.PAGE_TYPE.AUTHORIZE;
            NetMgr.tcpSend(req);

            if (uniLib.Global.isWxGame() && MJLobbyData.getInstance().userInfoSynLobby.loginByOpenId == true) {
                uniLib.ZQGameSdk.Login(this.wxAuthorizeLogin, this.onLogout, this)
                this.reward_btn.visible = false;
            }
        }

        public wxAuthorizeLogin(msg: any) {
            if (msg.code == 0) {
                if (msg.data.session) {
                    this._plat.sign = msg.data.session;
                }
                if (msg.data.payplatid) {
                    uniLib.Global.payPlatId = msg.data.payplatid;
                }
                if (msg.data.platid) {
                    this._plat.platid = msg.data.platid;
                }
                if (wx["createUserInfoButton"]) {
                    let info: any = wx.getSystemInfoSync();
                    let scaleX = info.screenWidth / uniLib.Global.screenWidth;
                    let scaleY = info.screenHeight / uniLib.Global.screenHeight;
                    let point = this.localToGlobal(325, 381);
                    this._wxBtn = wx["createUserInfoButton"]({
                        type: "image",
                        image: MJLobbyData.wxGameResPath + "shc_btn.png?time=" + Math.random(),
                        withCredentials: true,
                        style: {
                            left: (info.screenWidth - this.reward_btn.width * scaleX) / 2,
                            top: point.y * scaleY,
                            width: this.reward_btn.width * scaleX,
                            height: this.reward_btn.height * scaleY,
                            lineHeight: 40,
                            borderColor: '#ff0000',
                            backgroundColor: '#ff0000',
                            textAlign: 'center',
                            fontSize: 16,
                            borderWidth: 0,
                            borderRadius: 4
                        },
                        text: "获取用户信息"
                    });
                    this._wxBtn.onTap(this.onTapCall)
                }
            }
        }

        public onLogout(): void {
            wxgame.Global.instance.aldSendEvent("进入大厅", "login失败");
            LobbyUtils.instance.dealLoadError("login失败，请重试", () => { this._wxBtn && this._wxBtn.show(); });
        }

        private onTapCall = (res) => {
            wxgame.Global.instance.aldSendEvent("进入大厅", "点击登录按钮");
            if (res && res.errMsg.indexOf("ok") >= 0) {
                wxgame.Global.instance.aldSendEvent("进入大厅", "成功授权");
                this._wxBtn.hide();
                this.wxLoginSuc(res);
            }
            else {
                this._wxBtn.show();
                wx.showModal({ title: "授权提示", content: "获取用户信息失败，请确认授权！", showCancel: false })
            }
        }

        /**
         * 微信小游戏授权
         */
        private wxLoginSuc(res): void {
            if (res.userInfo.nickName)
                this._plat.nickname = res.userInfo.nickName;
            if (res.userInfo.gender)
                this._plat.gender = res.userInfo.gender;
            if (res.userInfo.avatarUrl)
                this._plat.faceurl = res.userInfo.avatarUrl;
            let launchOption = wx.getLaunchOptionsSync();
            let obj = { "encryptedData": res.encryptedData, "iv": res.iv, "subPlatId": 0 };
            if (launchOption.query && launchOption.query["qudao"]) {
                obj.subPlatId = parseInt(launchOption.query["qudao"]);
            }
            wxgame.Global.instance.aldSendEvent("渠道", "授权" + obj.subPlatId);
            this._plat.extdata = JSON.stringify(obj);
            this._plat.osname = egret.Capabilities.os;
            uniLib.Utils.clearLocalStorage();
            NetMgr.authoLogout();
            uniLib.Global.initPlatInfo(this._plat);
            LobbyUtils.instance.enterLobbyLoadGroup();
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        }

        private onInfo(evt: uniLib.ZqEvent) {
            this.setInfo(evt.param);
        }

        private setInfo(info: Cmd.PubleAccountPage) {
            this.reward_lst.itemRenderer = AuthoItem;
            this.reward_lst.dataProvider = new eui.ArrayCollection(info.rewards);
        }

        public destroy(): void {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.removeEventListener("GET_PAGE_INFO", this.onInfo, this);
            this._plat = null;
            if (this._wxBtn) {
                this._wxBtn["offTap"](this.onTapCall)
                this._wxBtn.destroy();
                this._wxBtn = null;
            }
        }
    }

    class AuthoItem extends eui.ItemRenderer {

        public icon_img: eui.Image;
        public add_img: eui.Image;
        public desc_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "AuthoItemSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.RewardItem = this.data;
            let cfg = ConfigMgr.getInstance().getGoodCfgById(info.goodId);
            this.desc_lbl.text = cfg.goodName + "x" + info.goodNbr;
            this.icon_img.source = "lb_autho_panel_json." + cfg.goodIcon;
        }
    }
}