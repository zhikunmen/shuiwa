

module chessCommonLib {
    export class CommonVariable {
        private static instance: CommonVariable;
        public ExmlMap: any;
        /**用于管理需要显示红点的按钮的偏移距离 */
        public PositionMap: any;
        /**传入需要的socketName数组，游戏一般需要同
         * 时传入uniLib和大厅模块名，大厅一般只需要传入对应的module名
         * 按照[0]是游戏内，[1]是大厅socket的顺序，
         * 当是大厅，则[0]是大厅，[1]不需要
        */
        public socketName: string[] = ["SZLobby", "uniLib"];
        /**用于存储聊天信息，目前用于三张 */
        public chatInfo: Cmd.CommonChatInfo;

          /**是否显示急速夺宝 */
        public showTreasure: boolean = true;
        /**否显示时时彩 */
        public showSsc: boolean = true;

        /**下注限制的判断 */
        public betLimit: boolean = false;

        /**个人信息 由大厅初始化*/
        public selfUserInfo: any;

        /**是否被禁言 */
        public isForbidden: boolean = false
        public constructor() {
            this.init();
        }
        public static getInstance(): CommonVariable {
            if (!this.instance) {
                this.instance = new CommonVariable();
            }
            return this.instance;
        }

        private init() {
            this.ExmlMap = {};
            this.ExmlMap.noSeatExml = "chessCommonLib.UserListSkin";
            this.ExmlMap.noSeatItemExml = "chessCommonLib.UserListItemSkin";
            this.ExmlMap.chatExml = "chessCommonLib.ChatListSkin";
            this.ExmlMap.chatItemExml = "chessCommonLib.ChatListItemSkin";
        }
        // /**
        //  * @description 设置皮肤主题
        //  * @param {string} 想要设置的皮肤key，配置在readme、
        //  * @param {string} 对应的皮肤类名
        //  */
        // private setEXML(key: string, exmlClass: string) {
        //     this.ExmlMap[key] = exmlClass;
        // }
        /**
         * 字符串长度处理
         * @param {string} 
         */
        public static handleString(str: string, len: number = 6): string {
            var name = str
            var strLength: number;

            while (this.getStrRealLength(name) > len) {
                strLength = name.length;
                name = name.substr(0, strLength - 1);
            }
            return name;

        }


        /**
		 * 获取字符串实际长度
         * @param {string} 
		 */
        public static getStrRealLength(str: string): number {
            return Number(str.replace(/[\u0391-\uFFE5]/g, "aa").length);  //先把中文替换成两个字节的英文，在计算长度
        }

        /**数组的push重写 */
        public static add(data: any, arr: Array<any>) {
            if (!Array.isArray(arr)) return;
            while (arr.length > 40) {
                arr.shift();
            }
            arr.push(data)
        }

             /**下注时候判断是否能够下注
         * @param userInfo  用户信息
         * @param callBack  不能下注时候的回调
         * originPlatId  是原始微信登陆后再绑定手机号的情况
         * 
         */
        public betHandle(userInfo: any, callBack) {
            return new Promise(function (resolve, reject) {
                let myBaseInfo = chessCommonLib.CommonVariable.getInstance().selfUserInfo;
                if (myBaseInfo.platId != 152 &&
                    myBaseInfo.platId != 264 &&
                    chessCommonLib.CommonVariable.getInstance().selfUserInfo["originPlatId"] != 152 &&
                    myBaseInfo.vip < 1) {
                    this.betLimit = true;
                    reject();
                }
                else {
                    resolve();
                }
            })
        }

    }

}
