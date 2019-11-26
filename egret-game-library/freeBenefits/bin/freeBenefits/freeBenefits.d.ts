declare module freeBenefits {
    /**
     * 账号授权
     */
    class AuthoPanel extends eui.Component {
        reward_btn: eui.WxButton;
        close_btn: eui.WxButton;
        reward_lst: eui.List;
        private _wxBtn;
        private _plat;
        constructor();
        protected childrenCreated(): void;
        wxAuthorizeLogin(msg: any): void;
        onLogout(): void;
        private onTapCall;
        /**
         * 微信小游戏授权
         */
        private wxLoginSuc(res);
        private onTouchHandler(evt);
        private onInfo(evt);
        private setInfo(info);
        destroy(): void;
    }
}
declare module freeBenefits {
    class DeskCollectionPanel extends eui.Component {
        private reward_btn;
        constructor();
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module freeBenefits {
    class FreeBenefitsConsts {
        static RES_JSON: string;
        static RES_MAHJONG_JSON: string;
        static RES_BUYU_JSON: string;
        static THM_JSON: string;
        /**
         * 需要加载免费福利的资源组
         */
        static PUB_FREEBENEFITS: string;
        /**
         * 需要加载桌面收藏的资源组
         */
        static PUB_DESKCOLLECTION: string;
        /**
         * 关注公众号
         */
        static PUB_PUBLICADDRESS: string;
        /**
         * 授权
         */
        static PUB_AUTHO: string;
    }
}
declare module freeBenefits {
    class FreeBenefitsPanel extends eui.Component {
        private _closeBtn;
        private itme1;
        private itme2;
        private itme3;
        private itme4;
        private groups;
        red1: eui.Image;
        red2: eui.Image;
        red4: eui.Image;
        red5: eui.Image;
        private _funs;
        private _arg;
        constructor();
        protected childrenCreated(): void;
        private addRedPoint();
        private removeRedPoint();
        /**
         * 设置回调函数
         * 数组第一个：每日签到
         *  第二个：邀请好礼
         * 第四个：收藏有礼
        */
        setBackFuns(funs: Function[], arg: any[]): void;
        private onTouchHandler(evt);
        private callFun(index);
        destroy(): void;
    }
}
declare module freeBenefits {
    class PublicAddressPanel extends eui.Component {
        reward_btn: eui.WxButton;
        copy_btn: eui.WxButton;
        close_btn: eui.WxButton;
        reward_grp: eui.Group;
        constructor();
        protected childrenCreated(): void;
        private onTouchHandler(evt);
        private onInfo(evt);
        private setInfo(info);
        destroy(): void;
    }
}
