declare module loading {
    class LoadingConst {
        static RES_JSON: string;
        static RES_JSON_ZHANGZHOU: string;
        static RES_JSON_LAOYOU: string;
        static RES_JSON_QUANZHOU: string;
        static RES_JSON_NINGBO: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_LOADING: string;
    }
}
declare module loading {
    class LoadingGameTip extends eui.Component implements uniLib.IUI {
        private turn;
        private image;
        private process_lb;
        constructor();
        protected childrenCreated(): void;
        updateUIData(data: any): void;
        resize(): void;
        destroy(): void;
    }
}
declare module loading {
    /**
     * 公共加载
     */
    class PublicLoadingView extends eui.Component {
        private loading;
        private _darkLine_bmp;
        private _lightLine_bmp;
        private _explain_txf;
        private _versionTxt;
        private explain;
        tips_img: eui.Image;
        tips_lbl: eui.Label;
        private _time;
        private _timer;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        destroy(): void;
        setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force?: boolean): void;
    }
}
declare module loading {
    /**
     * 加载多个资源配置文件
     */
    function loadConfigs(configUrls: string[], resourceRoot?: string): Promise<{}>;
    function loadThems(themUrls: string[], onCompleteCall: Function, onErrorCall: Function, thisObj: any, themRoot?: string): void;
}
declare module loading {
    /**
     * 公共加载
     */
    class PublicLoadingLYView extends eui.Component {
        private loading;
        private _darkLine_bmp;
        private _lightLine_bmp;
        private _explain_txf;
        private _versionTxt;
        private explain;
        private _time;
        private _timer;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        destroy(): void;
        setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force?: boolean): void;
    }
}
declare module loading {
    /**
     * 公共加载
     */
    class PublicLoadingNBView extends eui.Component {
        private loading;
        private _darkLine_bmp;
        private _lightLine_bmp;
        private _explain_txf;
        private _versionTxt;
        private explain;
        private _time;
        private _timer;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        destroy(): void;
        setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force?: boolean): void;
    }
}
declare module loading {
    /**
     * 公共加载
     */
    class PublicLoadingZZView extends eui.Component {
        private loading;
        private _darkLine_bmp;
        private _lightLine_bmp;
        private _explain_txf;
        private _versionTxt;
        private explain;
        private _time;
        private _timer;
        constructor();
        protected childrenCreated(): void;
        protected initUI(): void;
        destroy(): void;
        setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force?: boolean): void;
    }
}
