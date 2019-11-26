
module match {
    /**
     * 奖品一览
     */
    export class WxGameReward extends eui.Component {

        public share_btn: eui.WxButton;
        public close_btn: eui.WxButton;
        public desc_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "WxGameRewardSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.share_btn) {
                if (uniLib.Global.isWxGame()) {
                    let vo = new uniLib.WXShareVo();
                    vo.opType = Cmd.ShareOpType.share;
                    uniLib.ZQGameSdk.share(vo);
                }
                else{
                    //这个功能暂时已经没有了
                    // share.shareNativeMessage()
                }
            }
        }

        public destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
        }
    }
}