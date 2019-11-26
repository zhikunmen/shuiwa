module guide {

    export class GuideGuideGame extends eui.Component {

        public click_btn: eui.WxButton;
        private skins:string[] = ["GuideGuideGameSkin","GuideFishGameSkin"];
        private _fun:Function;

        constructor(type:number=0,fun:Function = null) {
            super();
            if(fun)
                this._fun = fun;
            if(type == 0){
                if (uniLib.Global.isNative && uniLib.Global.is_sandbox != 0)
                    this.skinName = "GuideGuideCheckSkin";
                else
                    this.skinName = "GuideGuideGameSkin";
            }else
                this.skinName = this.skins[type];
        }

        public childrenCreated() {
            super.childrenCreated();
            this.click_btn.once(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private onTouch() {
            if(this._fun){
                this._fun.call(this);
            }else{
                let req = new Cmd.RequestJoinHpMatchCmd_C();
                req.gameId = match.GameId.ID_MATCH_PIG;
                req.sceneId = 7004;
                NetMgr.tcpSend(req);
            }
            
        }
    }
}