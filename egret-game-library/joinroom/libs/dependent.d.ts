declare class MJLobbyData {
    public static getInstance(): MJLobbyData;

    public lobbyConfig: table.TableLobbyGameList;

    public getGameCreateConfig(gameId: number): table.TableCreateConfigList;
}

declare class LobbyBitmapText extends egret.DisplayObjectContainer {
    public text;
}

declare class LobbyResUtil {
    public static createBitmapByName(name: string, x?: number, y?: number): egret.Bitmap
}

declare class LobbyUtils {
    public static getBitmapFontTxt(fontName: string, w: number, align?: string, x?: number, y?: number): LobbyBitmapText
}

declare class LobbyDataCache {
    public static langObj: any;//语言数据
}

declare class MsgSendMgr {
    public static enterRoom(roomId: number, preBestRoomId?: number)
}

declare class CmdConstant{
    public static HistoryMatchIdList;
}