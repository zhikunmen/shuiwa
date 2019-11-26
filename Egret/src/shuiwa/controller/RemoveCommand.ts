namespace SWGAME {
    export class RemoveCommand extends puremvc.MacroCommand {
        public constructor() {
            super();
        }
        public execute(notification: puremvc.INotification): void {
            var rootView: egret.DisplayObjectContainer = notification.getBody();
            this.removeMediator();
            this.removeController();
            this.removeProxy();
        }
        private removeController(): void {
            this.facade.removeCommand(AppFacadeConst.SEND_DATA);
            this.facade.removeCommand(AppFacadeConst.STARTUP);
            this.facade.removeCommand(AppFacadeConst.DESTORY);
        }
        private removeMediator(): void {//移除中介者
            this.facade.removeMediator(GameMediator.NAME);
            this.facade.removeMediator(BetMediator.NAME);
            this.facade.removeMediator(OperateMediator.NAME);
            this.facade.removeMediator(SeatPlayMediator.NAME);
            this.facade.removeMediator(EffectMediator.NAME);
            this.facade.removeMediator(ChatPopMediator.NAME);
            this.facade.removeMediator(MenuMediator.NAME);
            this.facade.removeMediator(VoiceMediator.NAME);
            this.facade.removeMediator(NotifyMediator.NAME);
        }
        private removeProxy(): void {
            this.facade.removeProxy(ServerShuiWaProxy.NAME);
            this.facade = null;
            puremvc.Facade.instance = null;
        }
    }
}