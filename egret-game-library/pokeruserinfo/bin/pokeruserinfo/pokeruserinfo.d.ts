declare module pokeruserinfo {
    class pokeruserinfoConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        static POKER_USERINFO: string;
        /**送礼动画资源 */
        static POKER_GIFT: string;
        /**二级面板资源 */
        static POKER_FRAME: string;
        /**公共资源 */
        static POKER_COMMON: string;
        /**送礼通知 */
        static SEND_GIFTS_NOTICE: string;
        /**用户信息数据 */
        static USERINFO_DATA: string;
    }
}
declare module Cmd {
    function OnSendGiftPokerCmd_Brd(rev: Cmd.SendGiftPokerCmd_Brd): void;
}
declare module pokeruserinfo {
    class UserInfoPanel extends eui.Component {
        private gift_1;
        private gift_2;
        private gift_3;
        private gift_4;
        private gift_5;
        private gift_6;
        private giftGroup;
        private nick_name;
        private head_img;
        private id_lbl;
        private ip_lbl;
        private sex_img;
        private point_lbl;
        private diomand_lbl;
        private close_btn;
        private _data;
        private _isClick;
        private type;
        constructor();
        protected createChildren(): void;
        setType(index: number): void;
        initUI(): void;
        private onClickClose(evt);
        private onClickGift(evt);
        private sendMsg(rev);
        setData(rev: any): void;
        destory(): void;
    }
}
