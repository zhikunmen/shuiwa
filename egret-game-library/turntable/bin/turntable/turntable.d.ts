declare module turntable {
    class TurntableConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 转盘需要加载的资源组
         */
        static PUB_TURNTABLE: string;
    }
}
declare module turntable {
    class TurntableItem extends egret.DisplayObjectContainer {
        constructor();
        /**第一个转盘 */
        init(num: number, index: number): void;
        /**
         * 第二个转盘
         */
        init2(time: number): void;
    }
}
declare module turntable {
    class TurntablePanel extends eui.Component {
        turn_grp: eui.Group;
        left_img: eui.Image;
        right_img: eui.Image;
        top_img: eui.Image;
        luckDraw_btn: eui.WxButton;
        close_btn: eui.WxButton;
        left_lbl: eui.Label;
        turn1_grp: eui.Group;
        lock_img: eui.Image;
        left1_img: eui.Image;
        right1_img: eui.Image;
        top1_img: eui.Image;
        login_blbl: eui.BitmapLabel;
        private _info;
        private _time;
        private _timer;
        constructor(info?: Cmd.GetInfoTurnTableCmd_S);
        protected childrenCreated(): void;
        private addEvents();
        private removeEvents();
        private onUpdateInfo(evt);
        private onTimer(evt);
        private onTouchHandle(e);
        private getReward(opType);
        destroy(): void;
    }
}
declare module turntable {
    class NewTurntableItem extends egret.DisplayObjectContainer {
        constructor();
        /**第一个转盘 */
        init(num: number, goodId: number): void;
    }
}
declare module turntable {
    class NewTurntablePanel extends eui.Component {
        turn_grp: eui.Group;
        left_img: eui.Image;
        right_img: eui.Image;
        top_img: eui.Image;
        luckDraw_btn: eui.WxButton;
        close_btn: eui.WxButton;
        private _info;
        private _time;
        private _timer;
        constructor(info?: Cmd.GetInfoTurnTableCmd_S);
        protected childrenCreated(): void;
        private addEvents();
        private removeEvents();
        private onUpdateInfo(evt);
        private onTimer(evt);
        private onTouchHandle(e);
        private getReward(opType);
        destroy(): void;
    }
}
declare module Cmd {
    function OnGetInfoTurnTableCmd_S(rev: Cmd.GetInfoTurnTableCmd_S): void;
}
