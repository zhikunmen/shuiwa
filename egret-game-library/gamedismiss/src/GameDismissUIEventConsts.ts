module gamedismiss {

    export class GameDismissUIEventConsts {
        /**弃游 */
        public static DISMISS_GAME: string = "DISMISS_GAME";
    }


    export class GameDismissData {
        private static _instance: GameDismissData;
        public static getInstance(): GameDismissData {
            if (!this._instance) {
                this._instance = new GameDismissData();
            }
            return this._instance;
        }
    }
}