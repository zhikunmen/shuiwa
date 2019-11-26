namespace SWGAME{
     export class AppFacade extends puremvc.Facade{
            public static _instance:any;
            public constructor(){
                super();
            }

            public static getInstance():AppFacade{
                   if(AppFacade._instance == null) {
                       AppFacade._instance = new AppFacade();
                   }

                   puremvc.Facade.instance = null;
                   return AppFacade._instance;
            }
            public initializeController(): void {
                super.initializeController();
                this.registerCommand(AppFacadeConst.STARTUP,StartupCommand);
          }
           public startUp(rootView: egret.DisplayObjectContainer): void {
                this.sendNotification(AppFacadeConst.STARTUP,rootView);
                this.removeCommand(AppFacadeConst.STARTUP);
        }
     }
}