module gameuserinfo {

    export class UserInfoData {
        private static _instance: UserInfoData;
        public static getInstance(): UserInfoData {
            if (!this._instance) {
                this._instance = new UserInfoData();
            }
            return this._instance;
        }
        /**
       * 屏蔽玩家数组
       */
        pingbiPlayer: number[] = [];
    }
}