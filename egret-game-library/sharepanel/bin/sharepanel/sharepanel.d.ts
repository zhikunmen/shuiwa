declare module sharepanel {
    class LobbySharePanel extends commonpanel.LobbyBaseEuiPanel {
        _pyqIcon: eui.WxButton;
        _wXinIcon: eui.WxButton;
        private _data;
        /**是否是朋友圈 */
        private _isPyq;
        constructor(data?: uniLib.WXShareVo);
        protected addEvent(): void;
        protected removeEvent(): void;
        private btnClick(evt);
        private share(data);
        private shareBack(back);
        private delayShareBack(code);
    }
}
declare module sharepanel {
    class ShareConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static PUB_SHARE: string;
    }
}
