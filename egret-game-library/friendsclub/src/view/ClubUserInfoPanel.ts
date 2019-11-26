module friendsclub {
	/**
	 * 查看玩家个人信息面板
	 */
    export class ClubUserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        private closeBtn: eui.Button;
        private nameTxt: eui.Label;
        private idTxt: eui.Label;
        private ipTxt: eui.Label;
        private womanImg: eui.Image;
        private headImg: eui.Image;
        private manImg: eui.Image;
        private headList: eui.List;
        private info: Cmd.UserBaseInfo;
        constructor() {
            super();
            this.skinName = "ClubUserInfoSkin";
            this.womanImg.visible = false;
            this.manImg.visible = false;
        }
        protected childrenCreated(): void {
            super.childrenCreated();
        }
        protected addEvent(): void {
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            uniLib.Global.addEventListener(ClubConst.UserInfoSearchLobby, this.setdata, this);
        }

        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.UserInfoSearchLobby, this.setdata, this);
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);

        }
        protected destroy(): void {
            this.removeEvent();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
        public setdata(evt: uniLib.ZqEvent): void {
            var data = evt.param as Cmd.UserInfoSearchLobbyCmd_S;
            if (data.userInfo) {
                this.info = data.userInfo;
                this.headImg.source = this.info.headUrl;
                this.headImg.width = this.headImg.height = 108;
                this.nameTxt.text = this.info.nickName;
                this.ipTxt.text = "地址：" + this.info.ip;
                this.idTxt.text = "账号：" + this.info.uid + "";
                if (this.info.gender == "男") {
                    this.manImg.visible = true;
                } else {
                    this.womanImg.visible = true;
                }
            }

        }
        private onClick(evt: egret.TouchEvent): void {
            if (evt.target == this.closeBtn) {
                super.removePop();
            }
        }
    }
}