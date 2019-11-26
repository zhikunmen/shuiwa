module chessCommonLib {
	export class ChatUserEvent {
		/**
		 * 聊天信息事件
		 */
		public static CHAT_INFO: string = "chat_Info";
			/**
		 * 喇叭数量改变
		 */
		public static HORN_CHANGE: string = "horn_change";

		/**
		 * 从舞台移动到边上
		 */
		public static MOVE_LEFT: string = "move_left";
		/**
		 * 从边上移动舞台
		 */
		public static MOVE_RIGHT: string = "move_right";

		/**
		 * 无座玩家总数
		 */
		public static CHAT_USER_COUNT: string = "chat_user_count";
		/**
		 * 座位人数改变
		 */
		public static SEATNUM_CHANGE: string = "seatnum_change";
	}
}