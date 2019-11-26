/**
 *
 * @author 
 *
 */
module chessCommonLib {
    export class ChatEventConsts {
        public constructor() {
        }
        public static SEND_SMILEY: string = "send_smiley";
        /**聊天信息初始化 */
        public static CHAT_INIT: string = "chat_init";
    /**新的世界聊天信息广播 */
        public static WORLD_MSG: string = "world_msg";
        /**新的聊天信息广播游戏内 */
        public static WORLD_MSG_INGAME: string = "world_msg_ingame";
        /**新的世界聊天信息对自己 */
        public static WORLD_MSG_SELF: string = "world_msg_self";
        
        /**新的世界聊天信息对自己失败 */
        public static WORLD_MSG_SELF_FAIL: string = "world_msg_self_fail";
    }

    export class ZhiMaEventConsts{
        public constructor() {
        }
        /**获取个人信息 */
        public static GET_USERINFO:string = "get_userinfo";
        /**送礼 */
        public static SEND_GIFT_NOTICE:string = "send_gift_notice";
        /**语音 */
        public static VOICE_NOTICE:string = "voice_notice";
        /**录音时间到 */
		public static RECORD_TIME_OUT:string="RECORD_TIME_OUT";//录音时间到
		/**发送录音 */
		public static SEND_RECORD:string="SEND_RECORD";//发送录音
    }
}