
module SWGAME {
    export class GameMediator extends puremvc.Mediator {
        public static NAME: string = "SWGameMediator";

        public getViewComponent():GameVc{
            return this.viewComponent;
        }

        public constructor(viewComponent: GameVc) {
            super(GameMediator.NAME, viewComponent);

        }
        public listNotificationInterests(): Array<any> {
            return [
                AppFacadeConst.USER_ENTER_ROOM,
                AppFacadeConst.NEW_ROUND_START,
                AppFacadeConst.BANKER_GRAB_END,
                AppFacadeConst.FLY_KANTOU_END,
                AppFacadeConst.FLY_CHIP_END,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER,
                AppFacadeConst.DOWN_BANKER,
                AppFacadeConst.RESET_ROOM_ENTER
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {

                case UIEventConsts.SHARE_GAME:
                    this.showShare();
                    break;

                case UIEventConsts.ADVANCE_START:

                    break;

                default:
                    break;
            }
        }
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();
            let gameVc:GameVc = this.getViewComponent();

            switch (notification.getName()) {
                case AppFacadeConst.USER_ENTER_ROOM:
                    gameVc.updateRoomInfoText(data.roomInfo);

                    //如果有藏子记录，直接更新
                    if(RoomInfo.getInstance().hideChessIdLog.length){
                        gameVc.updatePrevHideChess(RoomInfo.getInstance().hideChessIdLog);
                    }

                    break;

                case AppFacadeConst.FLY_CHIP_END:

                    gameVc.showResultPanel(SWGAME.RoomInfo.getInstance().userResult);
                    break;

                //抢庄结束和新一局开始更新剩余坐庄局数
                case AppFacadeConst.BANKER_GRAB_END:
                    gameVc.updateBankerRoundLeft(RoomInfo.getInstance().bankerLeftRound);

                    break;
                case AppFacadeConst.NEW_ROUND_START:
                    gameVc.updateBankerRoundLeft(RoomInfo.getInstance().bankerLeftRound);
                    gameVc.closeResultPanel();
                    break;

                case AppFacadeConst.FLY_KANTOU_END:
                    //飞看头动画结束，更新藏子记录
                    gameVc.updatePrevHideChess(RoomInfo.getInstance().hideChessIdLog);

                    break;

                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                    //重置房间
                    gameVc.updateBankerRoundLeft(RoomInfo.getInstance().bankerLeftRound);
                    gameVc.updatePrevHideChess(RoomInfo.getInstance().hideChessIdLog);
                    gameVc.closeResultPanel();

                    break;

                case AppFacadeConst.DOWN_BANKER:
                    //强制下庄

                    gameVc.updateBankerRoundLeft(0);

                    if(RoomInfo.getInstance().bankerUid == uniLib.NetMgr.UID){
                        chessCommonLib.ModuleMgr.getInstance().showConfirm('你的筹码不足上庄，请及时补充筹码。', "系统提示", "", ()=>{}, null, null, this);
                    }

                    break;
                case AppFacadeConst.RESET_ROOM_ENTER:
                    gameVc.closeResultPanel();
                    break;
                default:
                    break;
            }
        }


        private showShare() {
            var vo: uniLib.WXShareVo = new uniLib.WXShareVo();
            vo.shareWay = 0;
            if (SWGAME.DataCache.platParam) {
                vo.title = SWGAME.DataCache.platParam.shareInfo.title;
                vo.description = SWGAME.DataCache.platParam.shareInfo.content;
                vo.webpageUrl = SWGAME.DataCache.platParam.shareInfo.webPageUrl;
            }
            uniLib.ZQGameSdk.share(vo, null, this);
        }
        private showTotal(arr: any): void {
            egret.Tween.removeTweens(this);
            this.showResultPanel(arr);
        }


        private showResultPanel(arr: any) {

        }
        public onRemove(): void {
            super.onRemove();
        }

    }
}