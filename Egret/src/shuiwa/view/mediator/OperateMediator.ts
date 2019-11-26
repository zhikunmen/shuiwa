
module SWGAME {
    export class OperateMediator extends puremvc.Mediator {
        public static NAME: string = "SWOperateMediator";

        public getViewComponent():OperateVc{
            return this.viewComponent;
        }

        public constructor(viewComponent: OperateVc) {
            super(OperateMediator.NAME, viewComponent);


            if (this.viewComponent) {
                this.getViewComponent().addEventListener(UIEventConsts.ACTION_NO_GRAB_BANKER,this.uiHandle, this);
                this.getViewComponent().addEventListener(UIEventConsts.ACTION_GRAB_BANKER,this.uiHandle, this);
            }

        }
        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.BANKER_GRAB_BEGIN,
                AppFacadeConst.BANKER_GRAB_CONFIRM,
                AppFacadeConst.BANKER_GRAB_END,
                AppFacadeConst.RECONNECT,
                AppFacadeConst.CLOSE_BANKER_GRAB,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER,
                AppFacadeConst.RESET_ROOM_ENTER,
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {
                case UIEventConsts.ACTION_NO_GRAB_BANKER:

                    let req = new Cmd.SWBankerCmd_C();
                    req.bBanker = false;
                    this.sendNotification(AppFacadeConst.SEND_DATA, req, DataRequestCommand.GAME_DATA);

                    break;
                case UIEventConsts.ACTION_GRAB_BANKER:

                    let req2 = new Cmd.SWBankerCmd_C();
                    req2.bBanker = true;
                    this.sendNotification(AppFacadeConst.SEND_DATA, req2, DataRequestCommand.GAME_DATA);

                    break;
                case UIEventConsts.GM_SELECT_HEAPCARD:
                    break;
                case UIEventConsts.READY:

                    break;
                case UIEventConsts.EXIT_GAME:
                    break;
            }
        }

        private _timer:number;
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppFacadeConst.BANKER_GRAB_BEGIN:
                    //延迟弹出(等待提示面版消失)
                    let delay:number = PositionData.getInstance().totalNotifyTime;

                    if(RoomInfo.getInstance().rebanker){
                        //重新抢庄再加一点
                        delay += PositionData.getInstance().outTime;
                    }

                    this._timer = egret.setTimeout(()=>{
                        this.getViewComponent().openGrabBanker();
                        this._timer = null;
                    }, this, delay);

                    break;
                case AppFacadeConst.CLOSE_BANKER_GRAB:
                    this.getViewComponent().closeGrabBanker();
                    break;

                case AppFacadeConst.BANKER_GRAB_CONFIRM:
                    this.getViewComponent().closeGrabBanker();
                    break;
                case AppFacadeConst.BANKER_GRAB_END:
                    //抢庄结束如果没有操作，也关闭抢庄面版
                    this.getViewComponent().closeGrabBanker();
                    break;
                case AppFacadeConst.RECONNECT:
                    //断线重连/中途加入

                    if(RoomInfo.getInstance().enterType == GameEnum.EnterType.InGameEnter){
                        //中途加入不显示
                        return;
                    }

                    if(RoomInfo.getInstance().gameStatus == Cmd.GameStatus.Status_Banker){
                        //抢庄阶段

                        //判断自己有没有点击抢庄面版
                        let userRoundInfo:Cmd.UserRoundInfo[] = data.userRoundInfo;
                        for(let user of userRoundInfo){
                            if(user.uid == uniLib.NetMgr.UID && !user.bBanker){
                                //如果自己没操作过抢庄面版
                                this.getViewComponent().openGrabBanker()

                            }
                        }
                    }
                    break;
                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                case AppFacadeConst.RESET_ROOM_ENTER:

                    if(this._timer){
                        egret.clearTimeout(this._timer);
                        this._timer = null;
                    }

                    this.getViewComponent().closeGrabBanker();
                    break;
            }
        }


        public onRemove(): void {
            super.onRemove();
            this.getViewComponent().removeEventListener(UIEventConsts.ACTION_NO_GRAB_BANKER,this.uiHandle, this);
            this.getViewComponent().removeEventListener(UIEventConsts.ACTION_GRAB_BANKER,this.uiHandle, this);
        }

    }
}