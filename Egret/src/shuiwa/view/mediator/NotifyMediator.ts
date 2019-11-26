
module SWGAME {
    export class NotifyMediator extends puremvc.Mediator {
        public static NAME: string = "SWNotifyMediator";

        public getViewComponent():NotifyVc{
            return this.viewComponent;
        }

        public constructor(viewComponent: NotifyVc) {
            super(NotifyMediator.NAME, viewComponent);

        }
        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.BANKER_GRAB_BEGIN,
                AppFacadeConst.BET_START,
                AppFacadeConst.OPEN_CHESS,
                AppFacadeConst.HIDE_CHESS_START,
                AppFacadeConst.HIDE_CHESS_SUCCESS_BRD,
                AppFacadeConst.RECONNECT,
                AppFacadeConst.NEW_ROUND_START,
                AppFacadeConst.FREE_TIME,
                AppFacadeConst.FLY_CHIP_END,
                AppFacadeConst.RESET_ROOM_ENTER,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {

        }


        private isWaitingNextRound:boolean;
        private isInFreeTime:boolean;
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppFacadeConst.BANKER_GRAB_BEGIN:

                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        //动态更新等待下局时间
                        let time:number = GameData.getInstance().getNextRoundWaitTime(RoomInfo.getInstance().gameStatus);
                        this.getViewComponent().startTimer(time);

                        break;
                    }

                    if(this.isInFreeTime){
                        this.getViewComponent().freeTimeEnd();
                        this.isInFreeTime = false;
                    }

                    if(RoomInfo.getInstance().rebanker){
                        this.getViewComponent().reBanker();

                    }else{
                        this.getViewComponent().beginBanker();

                    }
                    break;

                case AppFacadeConst.BET_START:

                    uniLib.SoundMgr.instance.pauseBgMusic();
                    uniLib.SoundMgr.instance.playSound(SoundConsts.BET_BEGIN_VOICE);
                    uniLib.SoundMgr.instance.playSound2(SoundConsts.BET_BG);

                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        //动态更新等待下局时间
                        let time:number = GameData.getInstance().getNextRoundWaitTime(RoomInfo.getInstance().gameStatus);
                        this.getViewComponent().startTimer(Math.floor(time/1000));

                        break;
                    }

                    this.getViewComponent().beginBet();
                    break;

                case AppFacadeConst.OPEN_CHESS:

                    uniLib.SoundMgr.instance.stopSound(SoundConsts.BET_BG);

                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        //动态更新等待下局时间
                        let time:number = GameData.getInstance().getNextRoundWaitTime(RoomInfo.getInstance().gameStatus);
                        this.getViewComponent().startTimer(Math.floor(time/1000));
                        break;
                    }

                    //停止下注
                    this.getViewComponent().stopBet();
                    break;

                case AppFacadeConst.HIDE_CHESS_START:

                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        //动态更新等待下局时间
                        let time:number = GameData.getInstance().getNextRoundWaitTime(RoomInfo.getInstance().gameStatus);
                        this.getViewComponent().startTimer(Math.floor(time/1000));
                        break;
                    }

                    if(this.isInFreeTime){
                        this.getViewComponent().freeTimeEnd();
                        this.isInFreeTime = false;
                    }

                    if(RoomInfo.getInstance().bankerUid != uniLib.NetMgr.UID) {
                        this.getViewComponent().bankerHideChessBegin();
                    }
                    break;

                case AppFacadeConst.HIDE_CHESS_SUCCESS_BRD:

                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        break;
                    }

                    //藏子结束
                    if(RoomInfo.getInstance().bankerUid != uniLib.NetMgr.UID) {
                        this.getViewComponent().bankeHideChessEnd();
                    }
                    break;



                case AppFacadeConst.RECONNECT:
                    //中途加入
                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        this.isWaitingNextRound = true;
                        let waitTime:number = GameData.getInstance().getNextRoundWaitTime(RoomInfo.getInstance().gameStatus);
                        console.warn(waitTime);
                        waitTime = Math.floor(waitTime / 1000);
                        this.getViewComponent().waitNextRound(waitTime);
                        break;
                    }

                    //断线重连
                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_HindCard){
                        if(RoomInfo.getInstance().bankerUid != uniLib.NetMgr.UID) {
                            this.getViewComponent().bankerHideChessBegin();
                        }
                    }

                    //空闲阶段
                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_LeisureTime){

                        this.getViewComponent().freeTimeStart();
                        this.isInFreeTime = true;
                    }

                    break;

                case AppFacadeConst.FREE_TIME:
                    if(this.isWaitingNextRound){
                        this.getViewComponent().hideWaitNextRound();
                        this.isWaitingNextRound = false;
                    }

                    this.getViewComponent().freeTimeStart();
                    this.isInFreeTime = true;
                    break;

                case AppFacadeConst.FLY_CHIP_END:
                case AppFacadeConst.NEW_ROUND_START:

                    if(this.isWaitingNextRound){
                        this.getViewComponent().hideWaitNextRound();
                        this.isWaitingNextRound = false;
                    }

                    break;
                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                case AppFacadeConst.RESET_ROOM_ENTER:
                    this.getViewComponent().clearAll();
                    break;
            }
        }

        public onRemove(): void {
            super.onRemove();
        }

    }
}