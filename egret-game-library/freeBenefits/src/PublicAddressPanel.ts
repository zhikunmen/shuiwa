module freeBenefits {
    export class PublicAddressPanel extends eui.Component {

        public reward_btn: eui.WxButton;
        public copy_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public reward_grp: eui.Group;

        public constructor() {
            super();
            this.skinName = "PublicAddressSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.reward_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.copy_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            uniLib.Global.addEventListener("GET_PAGE_INFO", this.onInfo, this);
            let req = new Cmd.GetPageInfoHpMatchCmd_C();
            req.typ = Cmd.PAGE_TYPE.PUBLIC_ACCOUNT;
            NetMgr.tcpSend(req);
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this.reward_btn) {
                if (MJLobbyData.getInstance().qudao == 878) {
                    let rq = new Cmd.GetPageRewardHpMatchCmd_C();
                    rq.typ = Cmd.PAGE_TYPE.PUBLIC_ACCOUNT;
                    NetMgr.tcpSend(rq);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("从公众号启动小程序才能领取奖励哦！");
                }
            }
            else if (evt.target == this.copy_btn) {
                uniLib.ZQGameSdk.nativeCopyStr("haocaipdk");
                uniLib.TipsUtils.showTipsDownToUp("复制成功");
            }
            else if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
        }

        private onInfo(evt: uniLib.ZqEvent) {
            this.setInfo(evt.param);
        }

        private setInfo(info: Cmd.PubleAccountPage) {
            if (info.status == 2) {
                this.reward_btn.enabled = false;
            }
            else if (info.status == 1) {
                this.reward_btn.enabled = true;
            }
            for (let i = 0; i < info.rewards.length; i++) {
                let cp = new eui.Component();
                cp.width = cp.height = 108;
                let bg = new eui.Image(RES.getRes("publicAddress_json.lb_gzgzh_bg4"));
                bg.scale9Grid = new egret.Rectangle(11, 11, 2, 2);
                bg.width = bg.height = 108;
                cp.addChild(bg);

                let re = info.rewards[i];
                let icon = new eui.Image();
                let font = new eui.BitmapLabel(re.goodNbr + "");
                font.font = RES.getRes("publicAddress_font_fnt");
                font.validateNow();
                font.y = cp.height - 30;
                font.x = cp.width - 17 * (re.goodNbr + "").length;
                cp.addChild(icon);
                cp.addChild(font);
                if (re.goodId == 6)
                    icon.texture = RES.getRes("publicAddress_json.lb_gzgzh_diamond");
                else if (re.goodId == 32)
                    icon.texture = RES.getRes("publicAddress_json.lb_gzgzh_jinbi");
                else if (re.goodId == 336)
                    icon.texture = RES.getRes("publicAddress_json.lb_gzgzh_fuka");
                icon.x = (cp.width - icon.width) >> 1;
                icon.y = (cp.height - icon.height) >> 1;
                this.reward_grp.addChild(cp);
            }
        }


        public destroy(): void {
            uniLib.Global.removeEventListener("GET_PAGE_INFO", this.onInfo, this);
            this.reward_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.copy_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}