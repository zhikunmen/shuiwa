module loading {
    /**
     * 捕鱼加载不带版本号文字
     */
    export class PublicLoadingHCBuYu extends eui.Component {

        private _darkLine_bmp: eui.Image;
        private _lightLine_bmp: eui.Image;
        private _explain_txf: eui.Label;
        private _versionTxt: eui.Label;
        private explain: string = "正在加载游戏资源...";
        private _time: number = 0;
        private _timer: number;
        constructor() {
            super();
            this.skinName = "PublicLoadingHCMahjongSkin";
            this.width = uniLib.Global.screenWidth;
            this.height = uniLib.Global.screenHeight;
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initUI();
        }

        protected initUI(): void {

            var logo:egret.Bitmap = new egret.Bitmap();
            if(uniLib.Global.isNative){
                if (uniLib.Global.is_sandbox == 0) {
                    logo.texture = RES.getRes("xintiao_buyu_logo_png");
                }else{
                    logo.texture = RES.getRes("jieji_buyu_logo_png");
                }   
            }else{
                logo.texture = RES.getRes("haocai_buyu_logo_png");
            }
            this.addChild(logo);
            logo.x = 70;
            logo.y = 30;
        }

        public destroy(): void {
            if (this._timer) {
                egret.clearInterval(this._timer);
            }
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }

        public setProgress(loaded: number, total: number, desc?: string, resourceName?: string, force: boolean = false): void {
            this._versionTxt.text = uniLib.Global.version + "";
            if (total && total != 0) {
                let num: number = Math.ceil((loaded / total) * 100);
                if (force == false && num > 93) {
                    num = 93;
                }
                if (num >= 93) {
                    if (!this._timer) {
                        this._timer = egret.setInterval(() => {
                            this._time++
                            if (this._time >= 15 && uniLib.Global.isWxGame()) {
                                egret.clearInterval(this._timer);
                                uniLib.Utils.clearLocalStorage();
                                wxgame.Utils.showConfirm(num + ":网络异常,请重新登录!", "温馨提示", "确定", wxgame.Global.instance.exitMiniProgram);
                            }
                        },this, 1000);
                    }
                }
                if (desc && desc != "") {
                    this._explain_txf.text = desc + (num + "%");
                }
                else {
                    this._explain_txf.text = this.explain + (num + "%");
                }
                var widthX: number = (this._darkLine_bmp.width - 14) * (num / 100);
                this._lightLine_bmp.width = widthX;
            }
            else {
                this._explain_txf.text = desc;
            }
        }
    }
}
