
module SWGAME {
    export class ChatPopMediator extends puremvc.Mediator {
        public static NAME: string = "SWChatPopMediator";

        public getViewComponent():ChatPopVc{
            return this.viewComponent;
        }

        public constructor(viewComponent: ChatPopVc) {
            super(ChatPopMediator.NAME, viewComponent);


            if (this.viewComponent) {
                // this.viewComponent.addEventListener(UIEventConsts.EXIT_GAME, this.onLeaveRoom, this);
            }

        }
        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.NOTIFY_COMMON_CHAT,
                AppFacadeConst.BANKER_GRAB_BRD
                // AppFacadeConst.USER_ENTER_ROOM,
                // AppFacadeConst.EXIT_GAME,
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppFacadeConst.NOTIFY_COMMON_CHAT:
                    let rev:Cmd.CommonChatCmd_Brd = data;
                    let seatId:number = RoomInfo.getInstance().getSeatIdByUserId(rev.uid);
                        if(rev.chatContent.predefId){
                            //预定义聊天
                            this.getViewComponent().showCommonChat(seatId, rev.chatContent.predefId);

                        }else{
                            //手打聊天
                            this.getViewComponent().showChatPop(seatId, rev.chatContent.strWords);
                        }

                    break;

                case AppFacadeConst.BANKER_GRAB_BRD:
                    let rev2:Cmd.SWBankerCmd_Brd = data;
                        let seatId2 = RoomInfo.getInstance().getSeatIdByUserId(rev2.uid);

                        //抢庄文字
                        let content:string;

                        if(rev2.bBanker){
                            content = "抢庄";
                        }else{
                            content = "不抢";
                        }

                    this.getViewComponent().showChatPop(seatId2, content);

                default:
                    break;
            }
        }


        public onRemove(): void {
            super.onRemove();
        }

    }
}