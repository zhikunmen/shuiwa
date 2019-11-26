
module SWGAME {
    import NetMgr = uniLib.NetMgr;

    export class MenuMediator extends puremvc.Mediator {
        public static NAME: string = "SWMenuMediator";

        public getViewComponent():MenuVc{
            return this.viewComponent;
        }

        public constructor(viewComponent: MenuVc) {
            super(MenuMediator.NAME, viewComponent);


            if (this.getViewComponent()) {
                this.getViewComponent().addEventListener(UIEventConsts.EXIT_GAME, this.uiHandle, this);

                this.getViewComponent().addEventListener(UIEventConsts.SHOW_SETTING, this.uiHandle, this);

                this.getViewComponent().addEventListener(UIEventConsts.SHOW_HELP, this.uiHandle, this);

                this.getViewComponent().addEventListener(UIEventConsts.SHOW_SHORT_CHAT, this.uiHandle, this);
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
                AppFacadeConst.NEW_ROUND_START,
                AppFacadeConst.BET_SUCCESS_BRD,
                AppFacadeConst.RESET_ROOM_ENTER,
                AppFacadeConst.RESET_ROOM_ONE_PLAYER,
                AppFacadeConst.RECONNECT
            ];
        }
        public onRegister(): void {
            super.onRegister();

        }

        private uiHandle(evt: egret.Event): void {
            switch (evt.type) {
                case UIEventConsts.SHOW_SETTING:
                    this.showSetting();
                    break;


                case UIEventConsts.SHOW_HELP:
                    this.showHelp();
                    break;

                case UIEventConsts.SHOW_SHORT_CHAT:
                    this.showShortChat();
                    break;

                case UIEventConsts.EXIT_GAME:

                    let req = new Cmd.SWLeaveRoomCmd_C();
                    req.state = 0;
                    this.sendNotification(AppFacadeConst.SEND_DATA, req, DataRequestCommand.GAME_DATA);

                    break;
            }
        }
        public handleNotification(notification: puremvc.INotification): void {
            let data:any = notification.getBody();

            switch (notification.getName()) {
                case AppFacadeConst.EXIT_GAME:
                    this.exitGame();
                    break;

                case AppFacadeConst.BET_SUCCESS_BRD:
                    let rev:Cmd.SWBetCmd_Brd = data;

                    if(rev.uid != uniLib.NetMgr.UID){
                        return;
                    }

                    this.getViewComponent().updateBetPanel();
                    break;

                case AppFacadeConst.NEW_ROUND_START:
                case AppFacadeConst.RESET_ROOM_ENTER:
                case AppFacadeConst.RESET_ROOM_ONE_PLAYER:
                    this.getViewComponent().clearAll();
                    break;
                case AppFacadeConst.RECONNECT:
                    this.getViewComponent().updateBetPanel();
                    break;
                default:
                    break;
            }
        }

        //显示配置面版
        private showSetting(): void {

            //设置面板显示的小背景图资源名数组
            let smallBgArr:string[] = ['sw_bg_1_jpg'];
            let settingPanel = new chessCommonLib.zm_SetPanel(smallBgArr);

            //设置设置面板中需要禁用的按钮
            settingPanel.disableBtn(chessCommonLib.zm_SetPanelBtnType.BtnLocalSound);

            settingPanel.addEventListener(chessCommonLib.zm_SetPanel.SetPanelEvtOccur,this.handleSetPanelEvt,this);

            uniLib.PopUpMgr.addPopUp(settingPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0,0 , uniLib.UserInfo.uid);


        }


        /**游戏秘籍 */
        private showHelp() {

            //获取游戏信息
            let ruleStr:string = "";
            if(RES.hasRes("help_4214_txt")){
                ruleStr = RES.getRes("help_4214_txt");
            }


            let basePoint:number = RoomInfo.getInstance().getBasePoint();
            let lowestCarry:number = RoomInfo.getInstance().enterPoint;
            let leaveCarry:number = RoomInfo.getInstance().leavePoint;

            let typeTxt:string = `底注:${basePoint}  入场:${lowestCarry}  离场:${leaveCarry}`;

            //新二级面版
            let msg: chessCommonLib.zm_HelpPanel = new chessCommonLib.zm_HelpPanel("水蛙规则", typeTxt, ruleStr);
            uniLib.PopUpMgr.addPopUp(msg, null, true, true, 0, uniLib.PopUpEffect.CENTER);
        }


        private handleSetPanelEvt(event:egret.Event):void{
            switch(event.data.evtType){
                case chessCommonLib.zm_SetPanel.SetPanelEvtTypeMusicOff:
                    console.log('音乐关');
                    uniLib.SoundMgr.instance.musicVolume = 0;
                    uniLib.SoundMgr.instance.musicOpen = false;
                    break;

                case chessCommonLib.zm_SetPanel.SetPanelEvtTypeMusicOn:
                    console.log('音乐开');
                    uniLib.SoundMgr.instance.musicVolume = 0.7;
                    uniLib.SoundMgr.instance.musicOpen = true;
                    uniLib.SoundMgr.instance.playBgMusic([SoundConsts.BACKGROUND]);
                    break;

                case chessCommonLib.zm_SetPanel.SetPanelEvtTypeSoundOff:
                    console.log('音效关');
                    uniLib.SoundMgr.instance.soundVolume = 0;
                    uniLib.SoundMgr.instance.soundOpen = false;
                    break;

                case chessCommonLib.zm_SetPanel.SetPanelEvtTypeSoundOn:
                    console.log('音效开');
                    uniLib.SoundMgr.instance.soundVolume = 1;
                    uniLib.SoundMgr.instance.soundOpen = true;
                    break;

                case chessCommonLib.zm_SetPanel.SetPanelEvtTypeLocalSoundOff:
                    console.log('方言关');
                    //TODO
                    break;

                case chessCommonLib.zm_SetPanel.SetPanelEvtTypeLocalSoundOn:
                    console.log('方言开');
                    //TODO
                    break;

                case chessCommonLib.zm_SetPanel.SetPanelEvtChBg:
                    //构造函数中传入小图片数组的资源名

                    break;
            }
        }

        private exitGame(): void {
            /*
            if (SGGAME.RoomInfo.getInstance().video == 0) {
                var req: Cmd.SGRoomLeaveRoomCmd_C = new Cmd.SGRoomLeaveRoomCmd_C();
                req.state = 0;
                this.sendNotification(AppFacadeConst.SEND_DATA, req, DataRequestCommand.GAME_DATA);
            }
            */
            if (DataCache.gameInfo && DataCache.gameInfo.defaultOrientation != egret.OrientationMode.LANDSCAPE) {
                uniLib.ScreenUtils.landscape = false;
            }
            //SGGAME.AppFacade.getInstance().sendNotification(SGGAME.AppFacadeConst.DESTORY);
            uniLib.GameModuleUtils.ExitGame(false);
            RES.destroyRes("zmshuiwa", true);
            uniLib.ResUtils.clearResConfigByGroupName(["zmshuiwa"]);
            if (DataCache.destroyResOnExit) {
                //WHJ 麻将资源暂时不卸载,没必要
                //RES.destroyRes(MJResGroups.PRELOAD);
            }

            if(DEBUG){
                GameInfo.scence.destroy();
            }

        }

        private showShortChat() {

            let chatPanel = new chessCommonLib.zm_ChatPanel(SWGAME.GameData.getInstance().ShortTalkArr);
            uniLib.PopUpMgr.addPopUp(chatPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER, 0,0 , uniLib.NetMgr.UID);

        }

        public onRemove(): void {
            super.onRemove();

            this.getViewComponent().removeEventListener(UIEventConsts.EXIT_GAME, this.uiHandle, this);
            this.getViewComponent().removeEventListener(UIEventConsts.SHOW_SETTING, this.uiHandle, this);
            this.getViewComponent().removeEventListener(UIEventConsts.SHOW_HELP, this.uiHandle, this);
        }

    }
}