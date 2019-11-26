namespace SWGAME {
	export class DataRequestCommand extends puremvc.SimpleCommand{
		public static GAME_DATA: string = "game_data";
		public static CONNECT_GAME_SERVER: string = "connect_game_server"; //连接大厅聊天服务器
		public static CLOSE: string = "close"; //连接大厅聊天服务器
		public constructor() {
			 super();
		}
		public  execute(notification: puremvc.INotification): void {
			 var socketProxy: SWGAME.ServerShuiWaProxy = this.facade.retrieveProxy(SWGAME.ServerShuiWaProxy.NAME) as SWGAME.ServerShuiWaProxy;
			 // console.trace("execute:",notification.getType());
             switch(notification.getType()) {
				 case DataRequestCommand.GAME_DATA:
                    socketProxy.sendData(notification.getBody());
                   break;
				case DataRequestCommand.CONNECT_GAME_SERVER:
                   socketProxy.initServer();
                   break;
				case DataRequestCommand.CLOSE:
                   socketProxy.closeSocket();
                   break;
			 }
		}
	}
}
