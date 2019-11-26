module reward {
    export class ReceiveDiamondsItem extends eui.ItemRenderer {

        private user_head: eui.Image;
        private user_name: eui.Label;
        private _receiveBtn: eui.Button;
        private _receiveed: eui.Image;

        constructor() {
            super();
            this.skinName = "ReceiveItemSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        protected dataChanged() {
            super.dataChanged();
            
            var info: Cmd.InviteInfoLitteGame = this.data;
            this.user_head.source = info.headUrl;
            this.user_name.text = info.nickName;

             if(info.status == 2){
                 this._receiveBtn.visible = true;
                 this._receiveed.visible = false;
                 this._receiveBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
             }else if(info.status == 3){
                 this._receiveBtn.visible = false;
                 this._receiveed.visible = true;
             }
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            var req:Cmd.GetIosInviteRewardLittleGameLobbyCmd_C  = new Cmd.GetIosInviteRewardLittleGameLobbyCmd_C();
            req.lobbyId = NetMgr.getLoginCfg().lobbyId;
            req.uid = this.data.uid;
            NetMgr.tcpSend(req);
            
        }
     }
}