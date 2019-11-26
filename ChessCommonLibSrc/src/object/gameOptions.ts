module chessCommonLib {

    export class gameOptions {
        
         /**
         * 左侧滑动聊天
         */
        leftChat: boolean = true;

         /**
         * 广告跑马灯
         */
        notice: boolean = true;

         /**
         * 商城购买
         */
        market: boolean = true;

        /**
         * 游戏任务
         */
        task: boolean = true;

         /**
         * 银行（保险箱）
         */
        bank: boolean = true;

         /**
         * 排行榜
         */
        rank: boolean = true;

         /**
         * 时时彩
         */
        ssc: boolean = false;
         /**
         * 福袋
         */
        fupack: boolean = true;
         /**
         * 个人信息面板
         */
        user: boolean = true;
        /**
         * 喇叭 屏蔽房间和大厅的和喇叭相关的东西
         */
        horn: boolean = true;
        /**
        *  麻将分享按钮
        */
        share:boolean = true;
         /**
        *  大厅模式，true 可以退回到大厅的，false 不能退回到大厅
        */
        lobbyMode:boolean = true;
    }
}