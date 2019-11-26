module freeBenefits {
    export class FreeBenefitsPanel extends eui.Component {

        private _closeBtn: eui.WxButton;
        private itme1: eui.Group;
        private itme2: eui.Group;
        private itme3: eui.Group;
        private itme4: eui.Group;
        private groups: eui.Group[];

        public red1: eui.Image;
        public red2: eui.Image;
        public red4: eui.Image;
        public red5: eui.Image;

        private _funs: Function[];
        private _arg: any[];

        public constructor() {
            super();
            this.skinName = "FreeBenefitsSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this._closeBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.groups = [this.itme1, this.itme2, this.itme3, this.itme4];
            for (var i: number = 0; i < this.groups.length; i++) {
                this.groups[i].addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }

            if (uniLib.Global.isNative) {
                uniLib.DisplayUtils.removeFromParent(this.itme3);
                uniLib.DisplayUtils.removeFromParent(this.itme4);
            }
            else {
                if (wxgame.Utils.isIos) {
                    uniLib.DisplayUtils.removeFromParent(this.itme4);
                }
            }

            if (uniLib.Global.isWxGame() || uniLib.Global.platId == 152) {
            }
            else {
                uniLib.DisplayUtils.removeFromParent(this.itme2);
            }
            this.addRedPoint();
        }

        private addRedPoint() {
            LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Act_DaySign, [[this.red1]]);
            uniLib.Global.platId != 152 && LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Share, [[this.red2]]);
            if (uniLib.Global.isWxGame()) {
                LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Subscribe, [[this.red4]]);
                LobbyRedPointMgr.instance.registerRedPoint(Cmd.MsgType.Desk, [[this.red5]]);
            }
        }

        private removeRedPoint() {
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Act_DaySign);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Share);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Subscribe);
            LobbyRedPointMgr.instance.unregisterRedPoint(Cmd.MsgType.Desk);
        }

        /**
         * 设置回调函数
         * 数组第一个：每日签到
         *  第二个：邀请好礼
         * 第四个：收藏有礼
        */
        public setBackFuns(funs: Function[], arg: any[]): void {
            this._funs = funs;
            this._arg = arg;
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            switch (evt.currentTarget) {
                case this._closeBtn:
                    uniLib.PopUpMgr.removePopUp(this);
                    break;
                case this.itme1:
                    this.callFun(0);
                    break;
                case this.itme2:
                    this.callFun(1);
                    break;
                case this.itme3:
                    this.callFun(2);
                    break;
                case this.itme4:
                    LoadPanelTipMgr.getInstance().loadRes(freeBenefits.FreeBenefitsConsts.PUB_DESKCOLLECTION, () => {
                        uniLib.PopUpMgr.addPopUp(DeskCollectionPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER)
                    });
                    break;
            }
        }

        private callFun(index: number): void {
            if (this._funs && this._funs.length >= index && this._funs[index])
                this._funs[index].apply(this, [this._arg[index]]);
            else {
                console.error("没配置第" + index + "个的回调函数");
            }
        }

        public destroy(): void {
            this.removeRedPoint();
            this._funs = null;
            this._closeBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            for (var i: number = 0; i < this.groups.length; i++) {
                this.groups[i].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            }
            this.groups[i] = null;
            this.removeChildren();
        }
    }
}