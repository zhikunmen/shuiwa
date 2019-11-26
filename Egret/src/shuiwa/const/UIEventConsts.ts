namespace SWGAME {
	export class UIEventConsts {
		/**下注 */
        public static ON_BET: string = "on_bet";

        //打开下注详情面版
		public static BET_INFO_OPEN: string = "bet_info_open";

        /**退出房间 */
        public static EXIT_GAME: string = "exit_game";//退出房间
		/**抢庄 */
		public static ACTION_GRAB_BANKER: string = "action_grab_banker";
        /**不抢庄 */
        public static ACTION_NO_GRAB_BANKER: string = "action_no_grab_banker";

        /**藏子确认操作 */
        public static HIDE_CHESS_CONFIRM: string = "hide_chess_confirm";

        /**选择筹码操作 */
        public static SELECT_CHIP: string = "select_chip";

        //飞看头动画结束事件
        public static FLY_KANTOU_END: string = "fly_kantou_end";

        //飞筹码动画结束
        public static FLY_CHIP_END: string = "fly_chip_end";

        //续投操作
		public static CONTINUE_BET: string = "continue_bet";

		//开子阶段闪棋子结束
		public static CHESS_TWINKLE_END:string = "chess_tinkle_end";

        /**准备 */
		public static READY: string = "ready";//准备
		/**获取积分榜数据 */
		public static GET_SCORE_DATA: string = "GET_SCORE_DATA";//获取积分榜数据
		public static SHOW_USER_INFO: string = "SHOW_USER_INFO";
		public static GIFT_SEND: string = "GIFT_SEND";
		/**显示设置 */
		public static SHOW_SETTING: string = "SHOW_SETTING";//显示设置
		/** 显示游戏秘籍 */
		public static SHOW_HELP: string = "SHOW_HELP";//显示设置

        /**显示快捷聊天 表情 */
        public static SHOW_SHORT_CHAT: string = "SHOW_SHORT_CHAT";//显示快捷聊天 表情

		public static SHARE_GAME: string = "share_game";
		/**录音时间到 */
		public static RECORD_TIME_OUT: string = "RECORD_TIME_OUT";//录音时间到
		/**录音取消 */
		public static RECORD_CANCEL: string = "RECORD_CANCEL";//录音取消
		/**发送录音 */
		public static SEND_RECORD: string = "SEND_RECORD";//发送录音
		/**表情，快捷语音 */
		public static SEND_COMMON_CHAT: string = "send_common_chat";//表情，快捷语音
		/**输入聊天 */
		public static SEND_COMMON_TALK: string = "send_common_talk";//输入聊天
		public static SEND_CHAT_RECORD: string = "send_chat_record";
		/**手牌选中 */
		public static GM_SELECT_HANDCARD: string = "gm_select_handcard";//手牌选中
		/**牌堆选中 */
		public static GM_SELECT_HEAPCARD: string = "gm_select_heapcard";//牌堆选中
		/**批量换牌 */
		public static GM_SELECT_CARDS: string = "gm_select_cards";//批量换牌
		/**删除听牌 */
		public static REMOVE_READYHAND: string = "remove_readyhand";//删除听牌
		/**托管操作 */
		public static ACTION_HOST: string = "action_host";//托管
		/**模拟出牌成功 */
		public static USER_DODISCARD: string = "user_dodiscard";//模拟出牌成功
		/** 模拟出牌失败*/
		public static USER_DODISCARD_FAIL: string = "user_dodiscard_fail";//模拟出牌失败
		/**录像后退 */
		static VIDEO_BACK: string = "video_back";//录像后退
		/**录像暂停 */
		static VIDEO_STOP: string = "video_stop";//录像暂停
		/**录像前进 */
		static VIDEO_ADVANCE: string = "video_advance";//录像前进
		/**录像退出 */
		static VIDEO_CLOSE: string = "video_close";//录像退出
		/**四川请求换牌 */
		public static SICHUAN_CHANGECARD: string = "sichuan_changecard";//听牌
		/**定缺 */
		public static DING_QUE: string = "ding_que";//定缺
		/**原缺 */
		public static YUAN_QUE: string = "yuan_que";//定缺
		//WHJ---------
		public static ACTION_LIANG: string = "action_liang";
		public static ACTION_NOAN_LIANG: string = "action_noan_liang";
		public static ACTION_SELECT_AN: string = "action_select_an";
		public static USER_KNOCK_TURN: string = "user_knock_turn";
		public static ACTION_BEGIN_PONG: string = "action_begin_pong";
		public static ACTION_BU: string = "action_bu"; 		/**开始杠  暗杠多种情况使用 */
		public static CARD_ADD_MASK: string = "card_add_mask";
		public static SEND_PIAO_REQUEST: string = "send_piao_request";
		public static START_READY: string = "start_ready";/**开局准备 */
		public static EXCHANGE_DESK: string = "exchange_desk";/**换桌 */
		public static ADVANCE_START:string="advance_start";//
		public static ROB_BANKER:string="rob_banker";
		public static SELF_CHIP:string="self_chip";
		public static SHOW_CHECK_PANEL="show_check_panel";
		//---
		public static SWITCH_CHANGE:string="switch_change";
		    //微信分享
        public static SHARE_WX: string = "share_wx";
		public constructor() {
		}
	}
}
