namespace SWGAME{
    //藏子面版
    export class HideChessPanel extends eui.Component {
        constructor(msec:number) {
            super();
            this.skinName = sw_HideChessPanel;

            this.msec = msec;

        }

        //倒计时/毫秒
        private msec:number;


        protected createChildren() {
            super.createChildren();
            this.initUI();
        }

        //象棋棋子按钮
        private _chess_1:eui.Image;
        private _chess_2:eui.Image;
        private _chess_3:eui.Image;
        private _chess_4:eui.Image;
        private _chess_5:eui.Image;
        private _chess_6:eui.Image;
        private _chess_7:eui.Image;
        private _chess_8:eui.Image;
        private _chess_9:eui.Image;
        private _chess_10:eui.Image;
        private _chess_11:eui.Image;
        private _chess_12:eui.Image;
        private chessBtnArr:eui.Image[] = [];

        //选中效果框
        private _panel_hide_select_frame:eui.Image;

        //确认藏子按钮
        private _ok_btn:eui.Button;

        protected initUI() {
            //chessId是index
            this.chessBtnArr = [
                null,
                this._chess_1,this._chess_2,this._chess_3,this._chess_4,this._chess_5,
                this._chess_6,this._chess_7,this._chess_8,this._chess_9,this._chess_10,
                this._chess_11,this._chess_12
            ];

            for(let chessBtn of this.chessBtnArr){
                if(!chessBtn){
                    continue;
                }

                chessBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chessSelected, this);
            }

            this._panel_hide_select_frame.visible = false;

            this._ok_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickOK, this);

            //确定不能藏的子（看头）,第一局不能藏红帅
            let hideChessId:number = RoomInfo.getInstance().hideChessId;
            if(!hideChessId){
                //红帅
                hideChessId = 7;
            }
            this.setUnTouchableChess(hideChessId);

            //启动倒计时
            this.startTimer(Math.ceil(this.msec/1000));
        }

        //藏子选中
        private _selectedChessId:number = null;
        private chessSelected(evt:egret.TouchEvent){
            let target:eui.Image = evt.target;

            //设置选中效果框

            this._panel_hide_select_frame.visible = true;
            this._panel_hide_select_frame.x = target.x;
            this._panel_hide_select_frame.y = target.y - 2;
            this._selectedChessId = this.chessBtnArr.indexOf(target);

        }

        //设置不能藏的子
        private setUnTouchableChess(chessId:number){

            this.chessBtnArr[chessId].touchEnabled = false;
            //添加滤镜效果(灰度化)
            let colorMatrix = [
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0.3,0.6,0,0,0,
                0,0,0,1,0
            ];

            let colorFlilter = new egret.ColorMatrixFilter(colorMatrix);

            this.chessBtnArr[chessId].filters = [colorFlilter];
        }

        private onClickOK(){
            if(!this._selectedChessId){
                return;
            }

            this.dispatchEventWith(UIEventConsts.HIDE_CHESS_CONFIRM, false, this._selectedChessId);

        }

        //计时器逻辑
        //开始倒计时
        private _timer:egret.Timer;
        private _countNum:number;
        private _timerNum:eui.BitmapLabel;
        public startTimer(count:number){

            if(this._timer){
                this.clearTimer();
            }

            this._countNum = count;

            if(this._countNum <= 0){
                return;
            }

            this._timerNum.text = this._countNum.toString();

            let timer = new egret.Timer(1000,this._countNum + 1);
            this._timer = timer;

            timer.addEventListener(egret.TimerEvent.TIMER,()=>{

                this._countNum --;
                if(this._countNum < 0){
                    return;
                }

                this._timerNum.text = this._countNum.toString();

            },this);

            timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE,()=>{

                this.clearTimer();

            },this);

            timer.start();

        }

        //清除倒计时
        public clearTimer(){
            if(!this._timer){
                return;
            }

            this._timer.removeEventListener(egret.TimerEvent.TIMER,null,this);
            this._timer.removeEventListener(egret.TimerEvent.TIMER_COMPLETE,null,this);
            this._timer.stop();
            this._timer = null;
        }

        public destroy(){
            this.clearTimer();

            for(let chessBtn of this.chessBtnArr){
                if(!chessBtn){
                    continue;
                }

                chessBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chessSelected, this);
                this._ok_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClickOK, this);
            }

        }


    }

}
