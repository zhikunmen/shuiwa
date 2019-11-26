namespace SWGAME{
    export class OperateVc extends BaseVc{
        constructor(){
            super();
            this.skinName = sw_OperateVc;
        }

        //抢庄相关元素
        private _qiangzhuang_group:eui.Group;
        //不抢按钮
        private _qiangzhuang_no_btn:eui.Button;
        //抢按钮
        private _qiangzhuang_yes_btn:eui.Button;

        protected initUI(){
            this._qiangzhuang_group.visible = false;

            this._qiangzhuang_group.addEventListener(egret.TouchEvent.TOUCH_TAP, this.qiangzhuangAction, this);
        }

        private qiangzhuangAction(evt:egret.TouchEvent){
            let target:eui.Button = evt.target;

            switch(target){
                case this._qiangzhuang_no_btn:
                    this.dispatchEventWith(UIEventConsts.ACTION_NO_GRAB_BANKER, false);
                    break;

                case this._qiangzhuang_yes_btn:
                    this.dispatchEventWith(UIEventConsts.ACTION_GRAB_BANKER, false);
                    break;
            }

        }


        public openGrabBanker(){
            this._qiangzhuang_group.visible = true;
        }

        public closeGrabBanker(){
            this._qiangzhuang_group.visible = false;
        }

        public destroy(){
            super.destroy();
            this._qiangzhuang_group.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.qiangzhuangAction, this);
        }
    }
}