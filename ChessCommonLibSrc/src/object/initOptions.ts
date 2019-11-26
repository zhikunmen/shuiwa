module chessCommonLib {

    export class initOptions {
        /**
         * 资源配置URL
         */
        resConfig: string;

        /**
         * 皮肤配置
         */
        thmConfig: string;
        /**
         * 资源根目录
         */
        resRoot: string;

        gameEui: string;

        /**
         * 启用远程资源模式 默认为true
         */
        remoteMode: boolean = true;

        /**
        * 是否全屏 
        */
        public static isFullScreen: boolean = false;

        public static fullScreen(): void {
            initOptions.isFullScreen = !initOptions.isFullScreen;
            if (initOptions.isFullScreen) {
                window["fullscreen"]();
            } else {
                window["cancelfullscreen"]();
            }
        }
    }
}