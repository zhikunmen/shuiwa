declare module loading {
    class LoadingConst {
        static RES_JSON: string;
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
declare module eui {
    /**
     * 通用基础控件
     */
    class ArmatureComponent extends eui.Component {
        resName: string;
        ncName: string;
        mcType: string;
        red: egret.Bitmap;
        private _armature;
        constructor();
        protected childrenCreated(): void;
        private onRemoveFromStage(evt);
        update(): void;
        destroy(): void;
    }
}
declare module eui {
    class WxButton extends eui.Button {
        constructor();
        protected childrenCreated(): void;
        private init();
        protected onTouchBegin(): void;
        protected onTouchEnd(): void;
        protected onTouchCancel(): void;
        protected onTouchMove(): void;
        protected onTouchReleaseOutside(): void;
        dispose(): void;
    }
}
