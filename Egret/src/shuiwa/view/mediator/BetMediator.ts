
module SWGAME {
    export class BetMediator extends puremvc.Mediator {
        public static NAME: string = "SWBetMediator";

        public getViewComponent(){
            return this.viewComponent as BetVc;
        }

        public constructor(viewComponent: BetVc) {
            super(BetMediator.NAME, viewComponent);


            if (this.getViewComponent()) {
                this.getViewComponent().addEventListener(UIEventConsts.ON_BET, this.uiHandle, this);
                this.getViewComponent().addEventListener(UIEventConsts.CONTINUE_BET, this.uiHandle, this);
                this.getViewComponent().addEventListener(UIEventConsts.FLY_CHIP_END, this.uiHandle, this);
                this.getViewComponent().addEventListener(UIEventConsts.SHOW_USER_INFO, this.uiHandle, this);
            }

        }

        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.USER_ENTER_ROOM,
                AppFacadeConst.EXIT_GAME,
                AppFacadeConst.SEND_CARD_READY,
                AppFacadeConst.ROB_BANKER,
                AppFacadeConst.BET_START,
                AppFacadeConst.BET_SUCCESS_MYSELF,
                AppFacadeConst.BET_SUCCESS_BRD,
                AppFacadeConst.OPEN_CHESS,
                AppFacadeConst.NEW_ROUND_START,
                AppFacadeConst.FLY_KANTOU_END,
                AppFacadeConst.NOTIFY_CHAT_RECORD,
                AppFacadeConst.RECONNECT,
                AppFacadeConst.SERVICE_COST,
                AppFacadeConst.UPDATE_USER_POINT,
                AppFacadeConst.RESET_ROOM_ENTER,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {
                case UIEventConsts.ON_BET:

                    //[chessId, betPoint]
                    let data:number[] = evt.data;
                    this.sendBet(data);

                    break;
                case UIEventConsts.CONTINUE_BET:
                    //续投操作
                    let send_continue = new Cmd.SWConBetCmd_C();
                    this.sendNotification(AppFacadeConst.SEND_DATA, send_continue, DataRequestCommand.GAME_DATA);

                    break;

                case UIEventConsts.FLY_CHIP_END:
                    //飞筹码结束
                    console.warn("send:AppFacadeConst.FLY_CHIP_END");
                    this.sendNotification(AppFacadeConst.FLY_CHIP_END);

                    //更新玩家自己头像区数据:

                    this.getViewComponent().setMyUserData();

                    break;

                case UIEventConsts.SHOW_USER_INFO:
                    //显示玩家自己信息

                    let userInfoPanel = new chessCommonLib.zm_UserInfoPanel(RoomInfo.getInstance().getMyUserInfo().uid);
                    uniLib.PopUpMgr.addPopUp(userInfoPanel, null, true, true);
                    break;

            }
        }


        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();


            switch (notification.getName()) {
                case AppFacadeConst.USER_ENTER_ROOM:
                    //初始化下注筹码
                    let betPointArr:number[] = RoomInfo.getInstance().betPointArr;
                    this.getViewComponent().initChips(betPointArr);

                    //更新左下角自己的用户信息显示
                    this.getViewComponent().setMyUserData();

                    break;
                case AppFacadeConst.BET_START:

                    this.getViewComponent().enableBetChess();
                    // this.getViewComponent().enableContinue();

                    //非庄家选一个默认筹码
                    if(RoomInfo.getInstance().bankerUid != uniLib.NetMgr.UID) {
                        this.getViewComponent().defaultSelect();
                    }

                    break;
                case AppFacadeConst.BET_SUCCESS_MYSELF:

                    let rev = data;
                    this.getViewComponent().updateBetArea(rev);

                    let mySeatId = RoomInfo.getInstance().getMyUserInfo().seatId;
                    this.getViewComponent().flyChip(rev.betPoint, rev.betChessId, mySeatId);
                    break;

                case AppFacadeConst.BET_SUCCESS_BRD:



                    let rev2:Cmd.SWBetCmd_Brd = data;

                    //下注时，用户临时货币数
                    if(rev2.uid == uniLib.NetMgr.UID) {
                        let userVo:UserVo  = RoomInfo.getInstance().getUserVoByUid(rev2.uid);
                        let tempUserPoint:number;

                        if(RoomInfo.getInstance().roomType == 1){
                            tempUserPoint = userVo.chips - userVo.tmpBetReducePoint;
                        }else{
                            tempUserPoint = userVo.diamond - userVo.tmpBetReducePoint;
                        }

                        this.getViewComponent().updatePoints(tempUserPoint);

                        this.getViewComponent().updateBetTotal(userVo.tmpBetReducePoint);

                        return;
                    }

                    this.getViewComponent().updateBetArea(rev2, false);

                    let seatId = RoomInfo.getInstance().getSeatIdByUserId(rev2.uid);
                    this.getViewComponent().flyChip(rev2.betPoint, rev2.betChessId, seatId);

                    break;

                case AppFacadeConst.OPEN_CHESS:

                    uniLib.SoundMgr.instance.playSound(SoundConsts.BET_STOP_VOICE);

                    //开子阶段开始，下注区域/续投禁止点击
                    this.getViewComponent().unTouchAbleBetChess();
                    // this.getViewComponent().disableContinue();

                    break;

                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                case AppFacadeConst.NEW_ROUND_START:
                    this.getViewComponent().resetAllBetChess();
                    break;

                case AppFacadeConst.FLY_KANTOU_END:
                    //飞看头结束，开始闪烁庄家藏的区域
                    let chessId = RoomInfo.getInstance().hideChessId;
                    this.getViewComponent().twinkleHideChess(chessId);
                    break;
                case AppFacadeConst.RECONNECT:

                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_Bet){
                        this.getViewComponent().enableBetChess();
                        // this.getViewComponent().enableContinue();
                        this.getViewComponent().showFlyChip(data);
                        this.getViewComponent().reSelectChip();

                        //下注时，用户临时货币数
                        let userVo_my:UserVo  = RoomInfo.getInstance().getMyUserInfo();
                        let tempUserPoint:number;

                        if(RoomInfo.getInstance().roomType == 1){
                            tempUserPoint = userVo_my.chips - userVo_my.tmpBetReducePoint;
                        }else{
                            tempUserPoint = userVo_my.diamond - userVo_my.tmpBetReducePoint;
                        }

                        this.getViewComponent().updatePoints(tempUserPoint);
                        this.getViewComponent().updateBetTotal(userVo_my.tmpBetReducePoint);


                    }

                    break;

                case AppFacadeConst.SERVICE_COST:
                    //服务费收取
                    let serviceCost:Cmd.SWReduceServerCostCmd_Brd = data;
                    if(serviceCost.uid == uniLib.NetMgr.UID) {
                        console.warn(data);
                        this.getViewComponent().updatePoints(serviceCost.userPoint);
                    }

                    break;

                case AppFacadeConst.UPDATE_USER_POINT:
                    //更新自己货币
                    let update_rev:Cmd.SWUpdataUserPointCmd_Brd = data;

                    if(update_rev.uid != uniLib.NetMgr.UID){
                        return;
                    }

                    let userVo: UserVo = RoomInfo.getInstance().getUserVoByUid(update_rev.uid);

                    let point:number;

                    if(RoomInfo.getInstance().roomType == 1){
                        point = update_rev.chips - userVo.tmpBetReducePoint;
                    }else{
                        point = update_rev.diamond - userVo.tmpBetReducePoint;
                    }

                    this.getViewComponent().updatePoints(point);

                    break;

                case AppFacadeConst.RESET_ROOM_ENTER:
                    this.getViewComponent().resetAll();
                    break;
                default:
                    break;
            }
        }

        //发送下注请求
        private sendBet(data:number[]){
            let send = new Cmd.SWBetCmd_C();
            send.betChessId = data[0];
            send.betPoint = data[1];

            this.sendNotification(AppFacadeConst.SEND_DATA, send, DataRequestCommand.GAME_DATA);
        }

        public onRemove(): void {
            super.onRemove();
            this.getViewComponent().removeEventListener(UIEventConsts.ON_BET, this.uiHandle, this);
            this.getViewComponent().removeEventListener(UIEventConsts.CONTINUE_BET, this.uiHandle, this);
            this.getViewComponent().removeEventListener(UIEventConsts.FLY_CHIP_END, this.uiHandle, this);
            this.getViewComponent().removeEventListener(UIEventConsts.SHOW_USER_INFO, this.uiHandle, this);
        }

    }
}