declare module gameuserinfo {
    class UserInfoConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_USERINFO: string;
    }
}
declare module gameuserinfo {
    class UserInfoData {
        private static _instance;
        static getInstance(): UserInfoData;
        /**
       * 屏蔽玩家数组
       */
        pingbiPlayer: number[];
    }
}
declare module gameuserinfo {
    class UserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        private _head_img;
        private _head;
        private _ip_lbl;
        private _id_lbl;
        private _bean_lbl;
        private _name_lbl;
        private _diamond_lbl;
        private _gender_img;
        private _giftId;
        private _gift_group;
        private _data;
        private _pinbigift;
        private _cancelPingbi;
        private _id;
        constructor();
        protected childrenCreated(): void;
        protected addEvent(): void;
        protected initUI(): void;
        private loadTable();
        showUserInfo(data: any): void;
        private sendGiftHandle(evt);
        /**存被屏蔽的玩家列表 */
        private onPinbiGift();
        /**删除屏蔽的玩家列表 */
        private onCancelPingbi();
        destory(): void;
        numberFormat(num: any): string;
    }
    class GiftItem extends eui.ItemRenderer {
        private _gift_img;
        private _gift_name;
        constructor();
        protected dataChanged(): void;
        destory(): void;
    }
}
