module match {

    export class WxGameRule extends eui.Component {

        public title_img: eui.Image;
        public close_btn: eui.WxButton;
        public title_lbl: eui.Label;
        public rule_lbl: eui.Label;

        private _sceneType: SceneType;

        constructor(sceneType?: SceneType) {
            super();
            this._sceneType = sceneType;
            this.skinName = "WxGameRuleSkin";
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this._sceneType != null && this._sceneType != undefined && this.setData(this._sceneType);
        }

        public setData(sceneType: SceneType) {
            this.title_img.source = "wx_lb_res_json.ruler_title_png";
            if (sceneType == SceneType.TYPE_NOTICE) {
                this.title_img.source = "wx_lb_res_json.lb_gonggao_title_png";
                this.title_lbl.text = "游戏更新公告";
                this.rule_lbl.textFlow = (new egret.HtmlTextParser).parse(RES.getRes("lb_notice_txt"));
            }
            else {
                if (RES.hasRes("hcpdk_rule_txt")) {
                    let ruleTxt = JSON.parse(RES.getRes("hcpdk_rule_txt"));
                    if (ruleTxt && ruleTxt[sceneType]) {
                        this.title_lbl.text = ruleTxt[sceneType].title;
                        this.rule_lbl.textFlow = (new egret.HtmlTextParser).parse(ruleTxt[sceneType].context);
                    }
                }
            }
        }

        private onTouch() {
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destroy() {
            this.close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.destroy, this);
            this.close_btn = null;
            this.title_img = null;
            this._sceneType = null;
            this.title_lbl = null;
            this.rule_lbl = null;
        }
    }
}