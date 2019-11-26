declare module commonpanel {
    class CommonPanel extends eui.Component {
        static exml: string;
        /**标题 */
        private _title;
        /**关闭按钮 */
        private _closeBtn;
        private _titleBg;
        private _titleStr;
        private _width;
        private _height;
        private _needClose;
        constructor(title?: string, width?: number, height?: number, skin?: string, needClose?: boolean);
        protected childrenCreated(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        destroy(): void;
        protected btnClick(evt: egret.TouchEvent): void;
        static setDefaultSkin(skin: any): void;
        readonly closeBtn: eui.Button;
    }
}
/**eui组件的父类 */
declare module commonpanel {
    class LobbyBaseEuiPanel extends eui.Component {
        private _commonPanel;
        constructor(title?: string, width?: number, height?: number, skin?: string, needClose?: boolean);
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        /**调用unilib的removePop会自动调用基类中的destroy方法 */
        protected removePop(): void;
        protected disableCloseBtn(): void;
    }
}
