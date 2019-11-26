namespace SWGAME{
    import EgretEvent = dragonBones.EgretEvent;

    export class MenuVc extends BaseVc{
        constructor(){
            super();
            // this.skinName =
        }

        private _menuArea:MenuArea;

        private _chat_btn:egret.Bitmap;

        private _recharge_btn:eui.Component;

        //下注详情版面
        protected _betPanel:BetPanel;

        protected initUI(){
            //添加操作菜单折叠区
            this._menuArea = new MenuArea();
            this.addChild(this._menuArea);

            this._menuArea.addEventListener(UIEventConsts.EXIT_GAME, this.onLeaveRoom, this);
            this._menuArea.addEventListener(UIEventConsts.SHOW_SETTING, this.uiHandle, this);
            this._menuArea.addEventListener(UIEventConsts.SHOW_HELP, this.uiHandle, this);

            //添加聊天按钮
            let ChatBtn:egret.Bitmap = new egret.Bitmap(RES.getRes("sw_btn_chat_png"));
            [ChatBtn.x, ChatBtn.y, ChatBtn.width, ChatBtn.height] = [1194, 620, 60 ,60];
            ChatBtn.name = "btn_chat";
            this.addChild(ChatBtn);
            this._chat_btn = ChatBtn;
            this._chat_btn.touchEnabled = true;
            this._chat_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortChat, this);

            //添加充值按钮
            let rechargeBtn:eui.Component = new RechargeBtn();
            rechargeBtn.x = 112;
            rechargeBtn.y = 5;
            this.addChild(rechargeBtn);
            this._recharge_btn = rechargeBtn;
            this._recharge_btn.touchEnabled = true;
            this._recharge_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecharge, this);
            uniLib.Global.addEventListener(UIEventConsts.BET_INFO_OPEN, this.betPanelOpen, this);


            this._betPanel = new BetPanel();
            this.addChild(this._betPanel);
        }

        private onLeaveRoom(evt:egret.Event){
            //再派发给Mediator
            this.dispatchEventWith(UIEventConsts.EXIT_GAME, false);
        }

        private onShortChat(){
            this.dispatchEventWith(UIEventConsts.SHOW_SHORT_CHAT, false);
        }

        //快速充值
        private onRecharge(){
            console.warn('快速充值');
            uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SHOP);
        }

        private uiHandle(evt:egret.Event){
            switch(evt.type){
                case UIEventConsts.SHOW_SETTING:
                    this.dispatchEventWith(UIEventConsts.SHOW_SETTING);
                    break;

                case UIEventConsts.SHOW_HELP:
                    this.dispatchEventWith(UIEventConsts.SHOW_HELP);

                    break;
            }
        }

        //打开下注详情面版
        private betPanelOpen(){
            this._betPanel.open();
        }

        //更新下注详情面版数据
        public updateBetPanel(){

            let myBetInfo:number[] = RoomInfo.getInstance().getMyUserInfo().betInfo;
            myBetInfo.forEach((betPointTotal:number, index:number)=>{
                if(!betPointTotal || !index){
                    return;
                }
                this._betPanel.updateBetPoint(betPointTotal, index);
            }, this);
        }

        public clearAll(){
            this._betPanel.clear();
        }

        public destroy(){
            super.destroy();

            this._betPanel.destroy();

            this._menuArea.removeEventListener(UIEventConsts.EXIT_GAME, this.onLeaveRoom, this);
            this._menuArea.destroy();
            this._menuArea = null;

            this._chat_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onShortChat, this);
            this._recharge_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRecharge, this);
            uniLib.Global.removeEventListener(UIEventConsts.BET_INFO_OPEN, this.betPanelOpen, this);
        }
    }
}