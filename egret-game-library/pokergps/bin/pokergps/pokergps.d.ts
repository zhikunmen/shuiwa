declare module pokergps {
    /**
     *玩家之间距离面板
     */
    class GPSPanel extends eui.Component {
        private _user1;
        private _user2;
        private _user3;
        private _list;
        private _tip_img;
        private _line_img;
        private _close_btn;
        private _dissolve_btn;
        private _continue_btn;
        private _user_name1;
        private _user_name2;
        private _user_name3;
        private _head_img1;
        private _head_img2;
        private _head_img3;
        private _distance_bg1;
        private _distance_bg2;
        private _distance_bg3;
        private _distance_txt1;
        private _distance_txt2;
        private _distance_txt3;
        constructor();
        protected init(): void;
        protected createChildren(): void;
        setData(rev: Cmd.IpGPSPoker[]): void;
        /**添加监听事件 */
        private addEvent();
        protected removeEvent(): void;
        private onClose(evt);
        private onDissolve(e);
        destory(): void;
    }
}
declare module pokergps {
    class pokergpsConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        static POKER_GPS: string;
        static DISMISS_GAME: string;
        static CLOSE: string;
        /**
         * gps
         */
        static UPDATE_GPS_DATA: string;
    }
}
declare module Cmd {
    function OnReturnIpAndGPSPokerCmd_S(rev: Cmd.ReturnIpAndGPSPokerCmd_S): void;
}
