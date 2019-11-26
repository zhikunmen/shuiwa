/**
 *
 * @author 
 *
 */
module chessCommonLib {
export class ChatEventDispatcher extends egret.EventDispatcher{
	public constructor() {
        super();
	}
    private static _instance: ChatEventDispatcher;
    
    public static get instance():ChatEventDispatcher{
        if(!this._instance){
            this._instance = new ChatEventDispatcher();
        }
        return this._instance;
    }
}
}
