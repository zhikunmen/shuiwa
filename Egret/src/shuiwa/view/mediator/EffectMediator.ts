
module SWGAME {
    import SWGiftsInfo = Cmd.SWGiftsInfo;

    export class EffectMediator extends puremvc.Mediator {
        public static NAME: string = "SWEffectMediator";

        public getViewComponent():EffectVc{
            return this.viewComponent;
        }

        public constructor(viewComponent: EffectVc) {
            super(EffectMediator.NAME, viewComponent);


            if (this.viewComponent) {
                this.getViewComponent().addEventListener(UIEventConsts.FLY_KANTOU_END, this.uiHandle, this);
            }

        }
        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.USER_ENTER_ROOM,
                AppFacadeConst.TIMER_START,
                AppFacadeConst.BANKER_GRAB_END,
                AppFacadeConst.HIDE_CHESS_START,
                AppFacadeConst.HIDE_CHESS_SUCCESS,
                AppFacadeConst.HIDE_CHESS_SUCCESS_BRD,
                AppFacadeConst.OPEN_CHESS,
                AppFacadeConst.SEND_GIFTS_NOTICE,
                AppFacadeConst.RECONNECT,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER,
                AppFacadeConst.RESET_ROOM_ENTER,
                AppFacadeConst.NEW_ROUND_START,
                AppFacadeConst.SHOW_TIP,
                AppFacadeConst.SHOW_STATUS,
                AppFacadeConst.UN_SHOW_STATUS,
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        //藏子面版
        private _hideChessPanel:HideChessPanel[] = [];

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {
                case UIEventConsts.FLY_KANTOU_END:
                    console.warn("send:AppFacadeConst.FLY_KANTOU_END");
                    this.sendNotification(AppFacadeConst.FLY_KANTOU_END);

                    //显示游戏状态
                    this.sendNotification(AppFacadeConst.SHOW_STATUS);

                    uniLib.SoundMgr.instance.stopSound(SoundConsts.KAIZI_BG);
                    uniLib.SoundMgr.instance.resumeBgMusic();

                break;
            }
        }

        private _openChessTimer:number;
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();
            let bankerUid:number = RoomInfo.getInstance().bankerUid;

            switch (notification.getName()) {
                case AppFacadeConst.USER_ENTER_ROOM:

                    if(RoomInfo.getInstance().hideChessId){
                        this.getViewComponent().showKantou(RoomInfo.getInstance().hideChessId);
                    }

                    if(RoomInfo.getInstance().gameStatus == 1 && RoomInfo.getInstance().userList.length < 5){
                        this.getViewComponent().showTip();
                    }

                    break;

                case AppFacadeConst.NEW_ROUND_START:
                    this.getViewComponent().closeTip();
                    break;

                case AppFacadeConst.TIMER_START:
                    let msec:number = notification.getBody();


                    this.getViewComponent().startTimer(Math.ceil(msec/1000));

                    break;
                case AppFacadeConst.BANKER_GRAB_END:

                    this.getViewComponent().clearTimer();
                    break;

                case AppFacadeConst.RECONNECT:
                    //断线重连

                    //藏子阶段
                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_HindCard) {
                        if (!(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter)) {
                            //不是庄家不显示藏子界面
                            if (bankerUid != uniLib.NetMgr.UID) {
                                return;
                            }

                            let hide_msec2: number = RoomInfo.getInstance().curOperateTime;

                            this._hideChessPanel.push(new HideChessPanel(hide_msec2));

                            uniLib.PopUpMgr.addPopUp(this._hideChessPanel[this._hideChessPanel.length - 1], null, true, true, false, uniLib.PopUpEffect.CENTER, 0, 0, uniLib.UserInfo.uid);

                            this._hideChessPanel[this._hideChessPanel.length - 1].addEventListener(UIEventConsts.HIDE_CHESS_CONFIRM, this.onHideChess, this);
                        }
                    }

                    //下注阶段
                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_Bet){
                        this.getViewComponent().showHideChessAnimation();
                    }

                    break;

                case AppFacadeConst.HIDE_CHESS_START:

                    //不是庄家不显示藏子界面
                    if(bankerUid != uniLib.NetMgr.UID){
                        return;
                    }

                    let hide_msec:number = RoomInfo.getInstance().hideCardTimeout;

                    this._hideChessPanel.push(new HideChessPanel(hide_msec));

                    uniLib.PopUpMgr.addPopUp(this._hideChessPanel[this._hideChessPanel.length - 1], null, true, true, false, uniLib.PopUpEffect.CENTER, 0,0 , uniLib.UserInfo.uid);

                    this._hideChessPanel[this._hideChessPanel.length - 1].addEventListener(UIEventConsts.HIDE_CHESS_CONFIRM, this.onHideChess, this);

                    break;
                case AppFacadeConst.HIDE_CHESS_SUCCESS:

                    if(bankerUid == uniLib.NetMgr.UID){
                        this.closeHideChessPanel();
                    }

                    break;

                case AppFacadeConst.HIDE_CHESS_SUCCESS_BRD:

                    if(bankerUid == uniLib.NetMgr.UID){
                        this.closeHideChessPanel();
                    }

                    this.getViewComponent().startHideChessAnimation();

                    break;
                case AppFacadeConst.OPEN_CHESS:
                    //播放开子动画
                    this._openChessTimer = egret.setTimeout(()=>{

                        uniLib.SoundMgr.instance.playSound2(SoundConsts.KAIZI_BG);

                        let hideChessId = RoomInfo.getInstance().hideChessId;
                        this.getViewComponent().startOpenChessAnimation(hideChessId);

                        this._soundKaiziTimer = egret.setTimeout(()=>{
                            uniLib.SoundMgr.instance.playSound(SoundConsts.KAIZI_OPEN);
                            this._soundKaiziTimer = null;
                        }, this, 1750);

                        this._openChessTimer = null;

                    }, this, PositionData.getInstance().totalNotifyTime);



                    break;

                case AppFacadeConst.SEND_GIFTS_NOTICE:
                    //送礼消息
                    let giftInfo:SWGiftsInfo = data;
                    this.getViewComponent().sendGift(giftInfo.giftsId, giftInfo.toUid, giftInfo.fromUid);

                    break;
                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                case AppFacadeConst.RESET_ROOM_ENTER:


                    //重置所有动画,弹窗
                    if(this._hideChessPanel.length){
                        this.closeHideChessPanel();
                    }

                    if(this._openChessTimer){
                        egret.clearTimeout(this._openChessTimer);
                        this._openChessTimer = null;
                    }

                    if(this._soundKaiziTimer){
                        egret.clearTimeout(this._soundKaiziTimer);
                        this._soundKaiziTimer = null;
                    }

                    this.getViewComponent().clearAll();
                    //重置房间(重置看头)
                    this.getViewComponent().showKantou(RoomInfo.getInstance().hideChessId);
                    this.getViewComponent().removeStatus();

                    break;

                case AppFacadeConst.SHOW_TIP:
                    this.getViewComponent().showTip();
                    break;

                case AppFacadeConst.SHOW_STATUS:
                    this.getViewComponent().showStatus(RoomInfo.getInstance().gameStatus);
                    break;

                case AppFacadeConst.UN_SHOW_STATUS:
                    this.getViewComponent().removeStatus();
                   break;
                default:
                    break;
            }
        }

        private _soundKaiziTimer:number;

        //确认藏子
        private onHideChess(evt:egret.Event){

            //发送藏子数据
            let chessId = evt.data;
            let send:Cmd.SWHideCardCmd_C = new Cmd.SWHideCardCmd_C();
            send.hideChessId = chessId;

            this.sendNotification(AppFacadeConst.SEND_DATA, send, DataRequestCommand.GAME_DATA);

        }

        //关闭藏子面版
        private closeHideChessPanel(){

            if(!this._hideChessPanel.length){
                return;
            }

            for(let panel of this._hideChessPanel) {
                panel.destroy();
                uniLib.PopUpMgr.removePopUp(panel);
                panel.removeEventListener(UIEventConsts.HIDE_CHESS_CONFIRM, this.onHideChess, this);
            }

            this._hideChessPanel = [];
        }

        public onRemove(): void {
            super.onRemove();

            if(this._hideChessPanel.length){
                this.closeHideChessPanel();
            }

            this.getViewComponent().removeEventListener(UIEventConsts.FLY_KANTOU_END, this.uiHandle, this);

            if(this._openChessTimer){
                egret.clearTimeout(this._openChessTimer);
                this._openChessTimer = null;
            }

            if(this._soundKaiziTimer){
                egret.clearTimeout(this._soundKaiziTimer);
                this._soundKaiziTimer = null;
            }

        }

    }
}