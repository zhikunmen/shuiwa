declare module pokerset {
    class pokersetConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        /**个人信息面板资源 */
        static POKER_SET: string;
        /**切换背景 */
        static SWITCH_BACKGROUND: string;
        static DISMISS_GAME: string;
        static CLOSE: string;
    }
}
declare module pokerset {
    class RemoveRoom extends eui.Component {
        private yesBtn;
        private noBtn;
        private txt;
        constructor();
        protected createChildren(): void;
        setText(str: string): void;
        private initUI();
        private removeEvent();
        private onYes();
        private onClose();
        destory(): void;
    }
}
declare module pokerset {
    class SetPanel extends eui.Component {
        private spot0;
        private spot1;
        private spot2;
        private spot3;
        private closeBtn;
        private leftBtn;
        private rightBtn;
        private dissolveBtn;
        private leaveBtn;
        private musicBtn;
        private soundBtn;
        private languageBtn;
        private _index;
        private _bgImgArr;
        private _bgResArr;
        private _imgGroup;
        private _spotArr;
        private isWarning;
        private removePanel;
        private gameType;
        private roomType;
        constructor();
        protected createChildren(): void;
        /**num: 1.跑得快  2.斗地主   index:1.房卡  2.金币*/
        setType(num: number, index: number, isGame?: boolean): void;
        setBtn(isGame: boolean): void;
        setWarn(bool: boolean): void;
        initUI(): void;
        private removeEvent();
        private onBgCh(evt);
        /**
        *
        * @param {eui.Image} img  //要缓动的图片
        * @param {boolean} direct //0:向左缓动,1:向右缓动
        * @param {number} nextIndex//下一个index
        * @param {boolean} sendEvt//是否派发换壁纸事件
        */
        private moveEffect(img, direct, nextIndex, sendEvt);
        private updateSpot(index);
        private soundCheckHandle(evt);
        private musicCheckHandle(evt);
        private onLeave();
        private onDismiss(evt);
        private onClose(evt);
        destory(): void;
    }
}
