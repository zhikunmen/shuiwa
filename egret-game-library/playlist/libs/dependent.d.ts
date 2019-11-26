declare class MJLobbyData {
    public static getInstance(): MJLobbyData;

    public lobbyConfig: table.TableLobbyGameList;

    public getGameCreateConfig(gameId: number): table.TableCreateConfigList;
    public getGameList(type?: number): Array<number>
}