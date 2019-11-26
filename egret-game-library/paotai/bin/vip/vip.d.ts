declare module paotai {
    class PaoTaiConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共guide需要加载的资源组
         */
        static PUB_PAOTAI_PANEL: string;
        static PUB_PAOTAI: string;
    }
}
declare module paotai {
    class PaoTaiItem extends eui.ItemRenderer {
        touch_btn: eui.WxButton;
        pao_text: eui.Label;
        vip_level: eui.Image;
        pao_img: eui.Image;
        speed: eui.Image;
        constructor();
        protected dataChanged(): void;
        destroy(): void;
    }
}
declare module paotai {
    class PaoTaiPanel extends eui.Component {
        paotia_lst: eui.List;
        _closeBtn: eui.WxButton;
        private _paoInfo;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private initUI();
        private removeEvents();
        private onItemTapHandler(evt);
        destroy(): void;
    }
}
