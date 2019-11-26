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
        static THM_JSON: string;
        /**
         * 需要加载免费福利的资源组
         */
        static PUB_FREEBENEFITS: string;
        /**
         * 需要加载桌面收藏的资源组
         */
        static PUB_DESKCOLLECTION: string;
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
