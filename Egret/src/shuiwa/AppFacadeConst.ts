namespace SWGAME {
    export class AppFacadeConst {
        /** 启动  */
        public static STARTUP: string = "shuiwa_startup";
        /** 发送数据 */
        public static SEND_DATA: string = "senddata";
        /**销毁 */
        public static DESTORY: string = "destroy";
        /**结束游戏 */
        public static EXIT_GAME: string = "exitGame";
        //玩家自己进入房间
        public static USER_ENTER_ROOM: string = "user_enter_room";
        //其他玩家进入房间
        public static PlAYER_ENTER_ROOM: string = "player_enter_room";

        //空闲时间
        public static FREE_TIME: string = "FREE_TIME";

        //抢庄开始
        public static BANKER_GRAB_BEGIN: string = "banker_grab_begin";

        //抢庄确认
        public static BANKER_GRAB_CONFIRM: string = "banker_grab_confirm";

        //抢庄结束
        public static BANKER_GRAB_END: string = "banker_grab_end";

        //参与抢庄玩家增加
        public static BANKER_GRAB_ADD: string = "banker_grab_add";

        //参与抢庄玩家通知
        public static BANKER_GRAB_BRD: string = "banker_grab_brd";

        //关闭抢庄吗，面版
        public static CLOSE_BANKER_GRAB: string = "close_banker_grab";

        //重置房间数据(只剩一个人)
        public static RESET_ROOM_ONE_PLAYER: string = "reset_room_ONE_PLAYER";

        //倒计时
        public static TIMER_START: string = "timer_start";

        //开始藏子
        public static HIDE_CHESS_START: string = "hide_chess_start";

        //服务器返回藏子成功
        public static HIDE_CHESS_SUCCESS: string = "hide_chess_success";

        //藏子成功广播
        public static HIDE_CHESS_SUCCESS_BRD: string = "hide_chess_success_brd";

        //下注开始
        public static BET_START: string = "bet_start";

        //自己下注成功
        public static BET_SUCCESS_MYSELF: string = "bet_success_myself";

        //自己下注失败
        // public static BET_FAIL_MYSELF: string = "bet_fail_myself";

        //下注广播(其他玩家)
        public static BET_SUCCESS_BRD: string = "bet_success_brd";

        //开子阶段开始
        public static OPEN_CHESS: string = "open_chess";

        //每局结束结算
        public static ROUND_END: string = "round_end";

        //庄钱不够，强制下庄
        public static DOWN_BANKER: string = "down_banker";

        //飞筹码结束
        public static FLY_CHIP_END: string = "fly_chip_end";

        //重新开局
        public static NEW_ROUND_START: string = "new_round_start";

        //飞看头动画结束
        public static FLY_KANTOU_END: string = "fly_kantou_end";

        //断线重连/中途加入
        public static RECONNECT: string = "reconnect";

        //初始化游戏--停止动画/清除显示元素/

        //更新玩家货币
        public static UPDATE_USER_POINT: string = "update_user_point";

        //显示未满5人
        public static SHOW_TIP: string = "show_tip";

        //显示游戏状态提示
        public static SHOW_STATUS: string = "show_status";

        //去除游戏状态提示
        public static UN_SHOW_STATUS: string = "un_show_status";

        //语音
        public static VOICE_NOTICE: string = "voice_notice";
        //聊天
        public static NOTIFY_COMMON_CHAT: string = "notify_common_chat";

        //服务费收取
        public static SERVICE_COST:string = 'service_cost';

        public static SEND_GIFTS_NOTICE: string = "send_gifts_notice";

        //重置房间（压后台一段时间后重新发送enter_room_S时）
        public static RESET_ROOM_ENTER: string = "reset_room_enter";

        public static READY_SEND: string = "ready_send";
        public static RESET_TABLE: string = "reset_table";
        public static READY_BUTTON_HIDE: string = "ready_button_hide";

        public static PLAYER_ENTER_ROOM: string = "player_enter_room";

        public static PLAYER_CONNECT: string = "player_connect";

        public static USERINFO_DATA: string = "userinfo_data";
        public static READY_NOTICE: string = "ready_notice";
        public static ROB_BANKER: string = "rob_banker";
        public static SHOW_BANKER: string = "show_banker";
        public static SHOW_PLAYER_BET: string = "show_player_bet";
        public static SEND_CARD_READY: string = "send_card_ready";
        public static SEND_PLAYER_CARD: string = "send_player_card";
        public static SHOW_RESULT: string = "show_result";
        public static SHOW_TOTAL_RESULT: string = "show_total_result";
        public static SHOW_POKER_READY: string = "show_poker_ready";
        public static SHOW_USER_CARD: string = "show_user_card";
        public static NOTIFY_CHAT_RECORD: string = "notify_chat_record";
        public static DISS_RESULT_NOTICE: string = "diss_result_notice";
        public static DISS_REQUEST_NOTICE: string = "diss_request_notice";
        public static DISS_NOTICE: string = "diss_notice";
        public static GAME_START: string = "game_start";
        public static RESET_RESULT_PANEL: string = "reset_result_panel";
        //显示提前开始 房主可以提前开始
        public static SHOW_ADVANCE: string = "show_advance";
        public static NOTIFY_ONLINE_STATE: string = "notify_online_state";
        public static SHOW_MY_CARD: string = "show_my_card";
        public static PLAYER_DISCONNECT: string = "player_disconnect";
        public static PLAYER_LEFT: string = "player_left";
        public static GM_HEAP_CARD: string = "gm_heap_card";
        public static GM_CHANGE_CARD: string = "gm_change_card";
        public static GM_DELETE: string = "gm_delete";
        public static BET_SUCCESS: string = "bet_success";

        //更精确的控制计时器清除
        public static CLEAR_TIMER: string = "clear_timer";

        //个人单独计时
        public static PERSONAL_COUNT: string = "personal_count";

        //清除个人倒计时
        public static ClEAR_PERSONAL_COUNT: string = "stop_personal_count";
    
    }
}