/** */
module club {
    export class ClubInviteBrdPanel extends commonpanel.LobbyBaseEuiPanel {
        /**关闭按钮*/
        private _closeBtn: eui.Button;
        /** 头像资源 */
        private _headImg: eui.Image;
        /** 邀请人昵称*/
        private _nameText: eui.Label;
        /**邀请人ID */
        private _uidText: eui.Label;
        /** 老友圈名称*/
        private _clubNameText: eui.Label;
        /** 老友圈ID*/
        private _clubIdText: eui.Label;
        /** 老友圈玩法介绍*/
        private _playText: eui.Label;
        /** 拒绝按钮*/
        private _noBtn: eui.WxButton;
        /** 同意按钮*/
        private _yesBtn: eui.WxButton;
        /**房间号 */
        private inviteData: Cmd.InviteMemberMatchGroupCmd_Brd;
        constructor() {
            super();
            this.skinName = "ClubInviteBrdSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        /**事件监听 */
        protected addEvent(): void {
            uniLib.Global.addEventListener(ClubConst.InviteMemberMatchGroupBrd, this.showDate, this)
            this.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }

        protected removeEvent(): void {
            uniLib.Global.removeEventListener(ClubConst.InviteMemberMatchGroupBrd, this.showDate, this)
            this.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
        }
        protected initUI(): void {

        }

        private showDate(evt: uniLib.ZqEvent): void {
            this.inviteData = evt.param as Cmd.InviteMemberMatchGroupCmd_Brd;
            this._headImg.source = this.inviteData.inviter.headUrl;
            this._nameText.textFlow = (new egret.HtmlTextParser).parser("玩家：<bold>" + this.inviteData.inviter.nickname + "</bold>邀请您进入<bold>" + this.inviteData.curMatch.gameName + "</bold>房间");
            this._uidText.text = "ID：" + this.inviteData.inviter.uid;
            this._clubNameText.text = "群名：" + this.inviteData.curMatch.matchName;
            this._clubIdText.text = "群ID：" + this.inviteData.curMatch.matchId;
            this._playText.text = "玩法：" + this.inviteData.curMatch.playTypeDesc;
        }
        private onClick(e: egret.TouchEvent): void {
            switch (e.target) {
                case this._closeBtn:
                case this._noBtn:
                    super.removePop();
                    break;
                case this._yesBtn:
                    let req: Cmd.EnterRoomCmd_C = new Cmd.EnterRoomCmd_C;
                    if (this.inviteData.roomId) {
                        req.preBestRoomId = this.inviteData.roomId;
                    }
                    else {
                        req.preBestRoomId = 0;
                    }
                    req.roomId = this.inviteData.curMatch.matchId;
                    NetMgr.tcpSend(req);
                    super.removePop();
                    break;
            }
        }
    }
}