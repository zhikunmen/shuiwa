namespace SWGAME {
    //图片提示Vc
    export class NotifyVc extends BaseVc {
        constructor() {
            super();
            this.skinName = sw_NotifyVc;
        }

        //皮肤中的元素

        //开始抢庄文字图片
        private _notify_begin_banker:eui.Image;
        //重新抢庄文字图片
        private _notify_restart_banker:eui.Image;
        //开始下注文字图片
        private _notify_begin_bet:eui.Image;
        //停止下注文字图片
        private _notify_end_bet:eui.Image;
        //庄家藏子文字图片
        private _notify_hide_chess:eui.Image;
        //等待下一局文字图片
        private _notify_wait_next_round:eui.Image;
        //等待下一局倒计时fnt
        private _notify_timer_fnt:eui.BitmapLabel;
        //空闲时间文字图片
        private _notify_free:eui.Image;


        //主要组(包括所有元素)
        private _notify_group_main:eui.Group;

        private _initPoint:egret.Point;
        private _toPoint:egret.Point = new egret.Point();

        //显示效果时间
        private _popTime:number = PositionData.getInstance().popTime;
        private _outTime:number = PositionData.getInstance().outTime;
        private _stayTime:number = PositionData.getInstance().stayTime;


        protected initUI() {

            this._toPoint.x = this._notify_group_main.x;

            let localPoint:egret.Point = new egret.Point();
            this.globalToLocal(-this._notify_group_main.width, null, localPoint);

            this._initPoint = new egret.Point(localPoint.x, null);

            //至于屏幕左侧
            this._notify_group_main.x = this._initPoint.x;


        }

        //执行列队
        private startArr:Function[] = [];

        //在显示的元素
        private eleInPop:eui.UIComponent[] = [];

        //提示弹出效果
        private notifyPop(eleArr:eui.UIComponent[]){
            for(let ele of eleArr){
                ele.visible = true;
                ele.includeInLayout = true;
            }

            this.eleInPop = eleArr;

            egret.Tween.get(this._notify_group_main).to({x:this._toPoint.x}, this._popTime, egret.Ease.cubicInOut);
        }

        //提示隐藏效果
        private hidePop(){
            egret.Tween.get(this._notify_group_main).to({x:this._initPoint.x}, this._outTime, egret.Ease.cubicInOut).call(()=>{
                // console.warn(eleArr);
                //隐藏后重置元素
                for(let ele of this.eleInPop){
                    this.resetElement(ele);
                }
                this.eleInPop = [];

                //如果列队中有方法，执行
                if(this.startArr.length){
                    let func:Function = this.startArr.shift();
                    func.call(this);
                }
            });
            this.stayHandler = null;
        }

        //停留
        private stayHandler:number;
        private stayTimeCount(){
            this.stayHandler = egret.setTimeout(this.hidePop, this, this._stayTime + this._popTime);
        }

        //重置元素到不显示，不参与布局
        private resetElement(ele:eui.UIComponent){
            ele.visible = false;
            ele.includeInLayout = false;
        }


        //开始抢庄提示
        public beginBanker(){

            //如果有提示在执行，加入列队
            if(this.eleInPop.length){
                this.addToArr(this.beginBanker);
                return;
            }

            this.notifyPop([this._notify_begin_banker]);
            this.stayTimeCount();
        }

        //重新抢庄提示
        public reBanker(){

            //如果有提示在执行，加入列队
            if(this.eleInPop.length){
                this.addToArr(this.reBanker);
                return;
            }

            this.notifyPop([this._notify_restart_banker]);
            this.stayTimeCount();
        }

        //把动画加入列队
        private addToArr(func:Function){
            if(this.startArr.length > 1){
                //如果有多个提示待执行，只取最后一个(压后台可能出现)
                this.startArr = [this.startArr.pop()];
                this.startArr.push(func);
            }
        }

        //开始下注提示
        public beginBet(){

            //如果有提示在执行，加入列队
            if(this.eleInPop.length){
                this.addToArr(this.beginBet);
                return;
            }

            this.notifyPop([this._notify_begin_bet]);
            this.stayTimeCount();
        }

        //停止下注提示
        public stopBet(){
            this.notifyPop([this._notify_end_bet]);
            this.stayTimeCount();
        }

        //庄家藏子开始
        public bankerHideChessBegin(){
            //如果有提示在执行，加入列队
            if(this.eleInPop.length){
                this.addToArr(this.bankerHideChessBegin);
                return;
            }

            this.notifyPop([this._notify_hide_chess]);
        }

        //庄家藏子结束
        public bankeHideChessEnd(){
            this.hidePop();
        }



        //等待下一局开始
        public waitNextRound(timeout:number){

            this.startTimer(timeout);
            this.notifyPop([this._notify_timer_fnt, this._notify_wait_next_round]);

        }

        //等待下一局隐藏
        public hideWaitNextRound(){
            this.clearTimer();
            this.hidePop();
        }

        //计时器逻辑
        //开始倒计时
        private _timer:egret.Timer;
        private _countNum:number;

        //单位/秒
        public startTimer(count:number){

            if(this._timer){
                this.clearTimer();
            }

            this._countNum = count;

            if(this._countNum <= 0){
                return;
            }

            this._notify_timer_fnt.text = `(${this._countNum.toString()})`;


            let timer = new egret.Timer(1000,this._countNum + 1);
            this._timer = timer;

            timer.addEventListener(egret.TimerEvent.TIMER,this.updateTimeTxt, this, false);

            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.clearTimer, this, false);

            timer.start();

        }

        private updateTimeTxt(){
            this._countNum --;
            if(this._countNum < 0){
                return;
            }

            this._notify_timer_fnt.text = `(${this._countNum.toString()})`;
        }

        //清除倒计时
        private clearTimer(){
            if(!this._timer){
                return;
            }

            this._timer.removeEventListener(egret.TimerEvent.TIMER,this.updateTimeTxt, this, false);
            this._timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE, this.clearTimer, this, false);
            this._timer.stop();
            this._timer = null;
        }

        //开始空闲时间
        public freeTimeStart(){

            //如果有提示在执行，加入列队
            if(this.eleInPop.length){
                this.startArr.push(this.freeTimeStart);
                return;
            }

            this._notify_free.includeInLayout = true;
            this._notify_free.visible = true;

            this.notifyPop([this._notify_free]);
        }


        //结束空闲时间
        public freeTimeEnd(){
            this.hidePop();
        }

        public clearAll(){
            egret.Tween.removeTweens(this._notify_group_main);

            if(this._stayTime){
                egret.clearTimeout(this.stayHandler);
            }

            this.startArr = [];

            if(this.eleInPop.length){

                for(let ele of this.eleInPop){
                    this.resetElement(ele);
                }
                this.eleInPop = [];
            }

            this.clearTimer();

            //至于屏幕左侧
            this._notify_group_main.x = this._initPoint.x;

        }

        public destroy(){
            super.destroy();
            egret.Tween.removeTweens(this._notify_group_main);

            if(this._stayTime){
               egret.clearTimeout(this.stayHandler);
            }

            this.startArr = [];

            if(this.eleInPop.length){

                for(let ele of this.eleInPop){
                    this.resetElement(ele);
                }
                this.eleInPop = [];
            }

            this.clearTimer();
        }

    }
}