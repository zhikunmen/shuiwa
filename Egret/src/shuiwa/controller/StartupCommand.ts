namespace SWGAME{
    export  class StartupCommand extends puremvc.MacroCommand{
             public constructor() {
              super();
        }
        public execute(notification: puremvc.INotification): void {
            this.initController();
            this.initProxy();
            this.initMediator();
        }
        private initController():void{
             this.facade.registerCommand(AppFacadeConst.SEND_DATA,DataRequestCommand);
             this.facade.registerCommand(AppFacadeConst.DESTORY,RemoveCommand);
        }
        private initMediator():void{

        }
        private initProxy():void{
            this.facade.registerProxy(new ServerShuiWaProxy())
        }
    }
}