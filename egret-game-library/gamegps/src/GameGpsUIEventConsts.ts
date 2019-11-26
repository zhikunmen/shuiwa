module gamegps {

    export class GameGpsUIEventConsts {
        /**弃游 */
        public static DISMISS_GAME: string = "DISMISS_GAME";
        /**显示GPS */
        public static SHOW_GPS: string = "SHOW_GPS";
    }


    export class GameGpsData {
        private static _instance: GameGpsData;
        public static getInstance(): GameGpsData {
            if (!this._instance) {
                this._instance = new GameGpsData();
            }
            return this._instance;
        }
        /**房间玩家人数 */
        playerNumber: number;
        /**gps玩家数据 */
        userList: UserVo[];
    }
}