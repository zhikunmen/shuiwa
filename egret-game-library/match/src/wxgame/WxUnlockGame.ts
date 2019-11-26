module match {
    export class WxUnlockGame extends eui.Component {

        public close_btn: eui.WxButton;
        public unlock_btn: eui.WxButton;
        public share_btn: eui.WxButton;
        public head_grp: eui.Group;
        
        public tips_lbl: eui.Label;

        private _data: Cmd.HpMatchInfo;
        constructor(data: Cmd.HpMatchInfo) {
            super();
            this._data = data;
            this.skinName = "WxUnlockGameSkin";
        }

        public childrenCreated() {
            super.childrenCreated();
            if (uniLib.Global.isNative && uniLib.Utils.isIOS && uniLib.Global.is_sandbox == 1) {
                this.tips_lbl.visible = false;
            }
            this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this.head_grp.removeChildren();
            let config = table.getMatchConfigBySceneId(this._data.sceneId);
            this.unlock_btn.label = 'x' + config.unlockdiamond;
            for (let i = 0; i < config.unlockNumber; i++) {
                let img = new eui.Image("bs_unlock_jia_png");
                img.width = img.height = 100;
                this.head_grp.addChild(img);
            }
            for (let i = 0; i < this._data.unLockList.length; i++) {
                let img = this.head_grp.getChildAt(i) as eui.Image
                img.source = this._data.unLockList[i];
            }
            if (uniLib.Global.isWxGame() || uniLib.Global.platId == 152) {
                this.share_btn.visible = true;
            }
            else {
                this.share_btn.visible = false;
            }
        }

        private onTouchHandler(evt: egret.TouchEvent) {
            if (evt.target == this.close_btn) {
                uniLib.PopUpMgr.removePopUp(this);
            }
            else if (evt.target == this.share_btn) {
                if (uniLib.Global.isWxGame()) {
                    let vo = new uniLib.WXShareVo();
                    vo.shareType = Cmd.ShareType.unlock;
                    let obj = { sceneId: this._data.sceneId };
                    vo.wgShareData = JSON.stringify(obj);
                    uniLib.ZQGameSdk.share(vo);
                }
                else {
                    share.shareNativeMessage(Cmd.ShareType.unlock, 0, Cmd.ShareType.unlock + "_" + this._data.sceneId, JSON.stringify({ sceneId: this._data.sceneId }));
                }
            }
            else if (evt.target == this.unlock_btn) {
                let config = table.getMatchConfigBySceneId(this._data.sceneId);
                if (uniLib.UserInfo.chips >= config.unlockdiamond) {
                    OnRequestUnLockHpMatchCmd_C(this._data.sceneId);
                }
                else {
                    uniLib.TipsUtils.showTipsDownToUp("钻石不足");
                }
            }
        }

        public destroy() {
            this.removeEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onTouchHandler, this);
            this._data = null;
        }
    }
}