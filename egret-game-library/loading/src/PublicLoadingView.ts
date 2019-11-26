module loading {
    /**
     * 公共加载
     */
    export class PublicLoadingView extends eui.Component {

        private loading: egret.tween.TweenGroup;
        private _darkLine_bmp: eui.Image;
        private _lightLine_bmp: eui.Image;
        private _explain_txf: eui.Label;
        private _versionTxt: eui.Label;
        private explain: string = "正在加载游戏资源...";

        public tips_img: eui.Image;
        public tips_lbl: eui.Label;
        private _time: number = 0;
        private _timer: number;

        constructor() {
            super();
            this.skinName = "PublicLoadingViewSkin";
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
            if (MJLobbyData.getInstance().isNovice) {
                this.tips_img.visible = true;
                this.tips_lbl.visible = true;
            }
            if (uniLib.Global.is_sandbox == 1) {
                this.tips_img.visible = false;
                this.tips_lbl.visible = false;
            }
        }

        protected initUI(): void {
            uniLib.DisplayUtils.playTweenGroup(this.loading, true);
        }

        public destroy(): void {
            if (this._timer) {
                egret.clearInterval(this._timer);
                this._timer = null;
            }
            uniLib.DisplayUtils.stopTweenGroup(this.loading);
        }

        public setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force: boolean = false): void {
            this._versionTxt.text = uniLib.Global.version + "";
            if (total && total != 0) {
                let num: number = Math.ceil((loaded / total) * 100);
                if (force == false && num > 93) {
                    num = 93;
                    if (!this._timer) {
                        this._timer = egret.setInterval(() => {
                            this._time++
                            if (this._time >= 5 && uniLib.Global.isWxGame()) {
                                egret.clearInterval(this._timer);
                                uniLib.Utils.clearLocalStorage();
                                wxgame.Utils.showConfirm("网络异常,请重新登录!", "温馨提示", "确定", wxgame.Global.instance.exitMiniProgram);
                            }
                        }, this, 1000);
                    }
                }
                else {
                    if (this._timer) {
                        egret.clearInterval(this._timer);
                        this._time = null;
                    }
                }
                if (desc && desc != "") {
                    this._explain_txf.text = desc + (num + "%");
                }
                else {
                    this._explain_txf.text = this.explain + (num + "%");
                }
                var widthX: number = (this._darkLine_bmp.width) * (num / 100);
                this._lightLine_bmp.width = widthX;
            }
            else {
                this._explain_txf.text = desc;
            }
        }
    }
}
