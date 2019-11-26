
module SWGAME {
    export class VoiceMediator extends puremvc.Mediator {
        public static NAME: string = "SWVoiceMediator";


        public constructor(viewComponent: VoiceVc) {
            super(VoiceMediator.NAME, viewComponent);


            if (this.viewComponent) {
                // this.viewComponent.addEventListener(UIEventConsts.EXIT_GAME, this.onLeaveRoom, this);
            }

        }
        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.READY_SEND,
                AppFacadeConst.USER_ENTER_ROOM,
                AppFacadeConst.EXIT_GAME,
                AppFacadeConst.SEND_CARD_READY,
                AppFacadeConst.ROB_BANKER,
                AppFacadeConst.SHOW_RESULT,
                AppFacadeConst.SHOW_TOTAL_RESULT,
                AppFacadeConst.NOTIFY_CHAT_RECORD,
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {
                case UIEventConsts.GM_SELECT_CARDS:

                    break;
                case UIEventConsts.GM_SELECT_HANDCARD:
                    break;
                case UIEventConsts.GM_SELECT_HEAPCARD:
                    break;
                case UIEventConsts.READY:

                    break;
                case UIEventConsts.EXIT_GAME:
                    break;
            }
        }
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppFacadeConst.PLAYER_LEFT:
                    break;
                case AppFacadeConst.RESET_RESULT_PANEL:
                    break;
                case AppFacadeConst.GAME_START:

                    break;
                case AppFacadeConst.DISS_RESULT_NOTICE:

                    break;
                case AppFacadeConst.DISS_REQUEST_NOTICE:

                    break;
                case AppFacadeConst.DISS_NOTICE:

                    break;
                case AppFacadeConst.NOTIFY_CHAT_RECORD:

                    break;
                case AppFacadeConst.SHOW_RESULT:
                    break;
                default:
                    break;
            }
        }


        public onRemove(): void {
            super.onRemove();
        }

    }
}