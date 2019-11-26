
module SWGAME {
    export class SeatPlayMediator extends puremvc.Mediator {
        public static NAME: string = "SWSeatPlayMediator";


        public constructor(viewComponent: SeatPlayVc) {
            super(SeatPlayMediator.NAME, viewComponent);


            if (this.viewComponent) {
                this.viewComponent.addEventListener(UIEventConsts.SHOW_USER_INFO, this.uiHandle, this);
            }

        }

        public getViewComponent(){
            return this.viewComponent as SeatPlayVc;
        }

        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.USER_ENTER_ROOM,
                AppFacadeConst.PLAYER_ENTER_ROOM,
                AppFacadeConst.PLAYER_LEFT,
                AppFacadeConst.EXIT_GAME,
                AppFacadeConst.BANKER_GRAB_ADD,
                AppFacadeConst.BANKER_GRAB_END,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER,
                AppFacadeConst.FLY_CHIP_END,
                AppFacadeConst.NEW_ROUND_START,
                AppFacadeConst.NOTIFY_CHAT_RECORD,
                AppFacadeConst.RECONNECT,
                AppFacadeConst.SERVICE_COST,
                AppFacadeConst.DOWN_BANKER,
                AppFacadeConst.UPDATE_USER_POINT,
                AppFacadeConst.BET_SUCCESS_BRD,
                AppFacadeConst.RESET_ROOM_ENTER
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {

                case UIEventConsts.SHOW_USER_INFO:
                    let seatId:number = evt.data;
                    let userVo:UserVo = RoomInfo.getInstance().getUserVoBySeatId(seatId);

                    if(!userVo){
                        return;
                    }

                    let userInfoPanel = new chessCommonLib.zm_UserInfoPanel(userVo.uid);
                    uniLib.PopUpMgr.addPopUp(userInfoPanel, null, true, true);

                    break;
            }
        }

        private bankerEffectTimer:number;
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppFacadeConst.USER_ENTER_ROOM:
                    let userLists:UserVo[] = RoomInfo.getInstance().userList;
                    for (let userVo of userLists){
                        this.getViewComponent().addUser(userVo);
                    }

                    if(RoomInfo.getInstance().bankerSeatId){
                        this.getViewComponent().showBanker(RoomInfo.getInstance().bankerSeatId);
                    }

                    break;

                case AppFacadeConst.PLAYER_ENTER_ROOM:

                    let userInfo:Cmd.UserBaseInfo = data;
                    let uid:number = userInfo.uid;
                    let userVo = RoomInfo.getInstance().getUserVoByUid(uid);
                    this.getViewComponent().addUser(userVo);

                    break;

                case AppFacadeConst.PLAYER_LEFT:
                    let uid2:number = data;
                    this.getViewComponent().removeUser(uid2);

                    break;

                case AppFacadeConst.BANKER_GRAB_ADD:

                    break;

                case AppFacadeConst.BANKER_GRAB_END:

                    let bankerSeatId = RoomInfo.getInstance().bankerSeatId;
                    if(!bankerSeatId){
                        return;
                    }

                    this.getViewComponent().bankerGrabEffectStart();

                    this.bankerEffectTimer = egret.setTimeout(()=>{

                        this.getViewComponent().endEffectLoop();
                        this.getViewComponent().setBanker(bankerSeatId);

                    }, this, PositionData.getInstance().grabBankerEffectTime);


                    break;
                case AppFacadeConst.BET_SUCCESS_BRD:
                    let betCmd:Cmd.SWBetCmd_Brd = data;

                    //下注时，用户临时货币数
                    let userVo2:UserVo  = RoomInfo.getInstance().getUserVoByUid(betCmd.uid);
                    let seatId2:number = userVo2.seatId;

                    let tempUserPoint:number;
                    if(RoomInfo.getInstance().roomType == 1){
                        tempUserPoint = userVo2.chips - userVo2.tmpBetReducePoint;
                    }else{
                        tempUserPoint = userVo2.diamond - userVo2.tmpBetReducePoint;
                    }

                    console.warn(tempUserPoint);

                    this.getViewComponent().updateUserPointsSingle(seatId2, tempUserPoint);

                    break;

                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                    //重置房间---清除庄家
                    this.getViewComponent().clearBanker();

                    break;

                case AppFacadeConst.FLY_CHIP_END:

                    this.getViewComponent().updateUserPoints(RoomInfo.getInstance().userResult);
                    break;

                case AppFacadeConst.NEW_ROUND_START:

                    if(!RoomInfo.getInstance().bankerUid){
                        this.getViewComponent().clearBanker();
                    }

                    break;
                case AppFacadeConst.RECONNECT:
                    //断线重连/中途加入
                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_Banker){
                        //抢庄阶段

                        //开始抢庄动画
                        // if(RoomInfo.getInstance().getGrabBankerSeatIdArr().length){
                        //     this.getViewComponent().bankerGrabEffectStart();
                        // }

                        //判断自己有没有点击抢庄面版
                        let userRoundInfo:Cmd.UserRoundInfo[] = data.userRoundInfo;
                        for(let user of userRoundInfo){
                            if(user.uid == uniLib.NetMgr.UID){
                                if(!user.bBanker){
                                    //服务端实现(重新发抢庄开始Cmd)
                                }
                            }
                        }
                    }

                    break;
                case AppFacadeConst.SERVICE_COST:
                    //服务费收取
                    let serviceCost:Cmd.SWReduceServerCostCmd_Brd = data;
                    let seatId:number = RoomInfo.getInstance().getSeatIdByUserId(serviceCost.uid);
                    this.getViewComponent().updateUserPointsSingle(seatId, serviceCost.userPoint);

                    break;
                case AppFacadeConst.DOWN_BANKER:
                    //强制下庄
                    this.getViewComponent().clearBanker();

                    break;

                case AppFacadeConst.UPDATE_USER_POINT:
                    //更新玩家货币
                {
                    let update_rev: Cmd.SWUpdataUserPointCmd_Brd = data;
                    let userVo: UserVo = RoomInfo.getInstance().getUserVoByUid(update_rev.uid);

                    let seatId_update = userVo.seatId;
                    let point: number;

                    if (RoomInfo.getInstance().roomType == 1) {
                        point = update_rev.chips - userVo.tmpBetReducePoint;
                    } else {
                        point = update_rev.diamond - userVo.tmpBetReducePoint;
                    }

                    this.getViewComponent().updateUserPointsSingle(seatId_update, point);
                }
                    break;
                case AppFacadeConst.RESET_ROOM_ENTER:
                    this.getViewComponent().resetAll();
                    break;
                default:
                    break;
            }
        }


        public onRemove(): void {
            super.onRemove();
            if(this.bankerEffectTimer){
                egret.clearTimeout(this.bankerEffectTimer);
            }

            this.viewComponent.removeEventListener(UIEventConsts.SHOW_USER_INFO, this.uiHandle, this);
        }

    }
}