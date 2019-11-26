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
    class UserInfoPanel extends commonpanel.LobbyBaseEuiPanel {
        private _head_img;
        private _head;
        private _ip_lbl;
        private _id_lbl;
        private _gps_lbl;
        private _bean_lbl;
        private _name_lbl;
        private _diamond_lbl;
        private _gender_img;
        private _giftId;
        private _gift_group;
        private _data;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        private loadTable();
        showUserInfo(data: any): void;
        private sendGiftHandle(evt);
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
