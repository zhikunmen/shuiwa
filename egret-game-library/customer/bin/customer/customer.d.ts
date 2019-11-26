declare module customer {
    class customerConst {
        static RES_JSON: string;
        static RESLY_JSON: string;
        static RESGD_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_CUSTOMER: string;
    }
}
declare module customer {
    class customerPanel extends eui.Component {
        constructor();
        protected childrenCreated(): void;
        private addEvent();
        private destroy();
    }
}
