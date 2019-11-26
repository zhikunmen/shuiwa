namespace SWGAME{
    //下注详情面版
    export class BetPanel extends eui.Component {
        constructor() {
            super();
            this.skinName = sw_BetPanel;
        }

        protected createChildren() {
            super.createChildren();
            this.initUI();
        }

        //玩家本局每个棋子下注统计[1-12]对应chessId
        private _point_1:eui.Label;
        private _point_2:eui.Label;
        private _point_3:eui.Label;
        private _point_4:eui.Label;
        private _point_5:eui.Label;
        private _point_6:eui.Label;
        private _point_7:eui.Label;
        private _point_8:eui.Label;
        private _point_9:eui.Label;
        private _point_10:eui.Label;
        private _point_11:eui.Label;
        private _point_12:eui.Label;
        private _pointArr:eui.Label[] = [];

        protected initUI(){

        this._pointArr = [
                null,
                this._point_1,this._point_2,this._point_3,this._point_4,
                this._point_5,this._point_6,this._point_7,this._point_8,
                this._point_9,this._point_10,this._point_11,this._point_12,
            ];

            for(let pointTxt of this._pointArr){
                if(!pointTxt){
                    continue;
                }
                pointTxt.text = "0";
            }

            this.anchorOffsetX = this.width;
            this.anchorOffsetY = this.height;
            this.x = 1252;
            this.y = 628;
            this.scaleX = this.scaleY = 0;

            GameInfo.stage.addEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this, false);
        }

        private inEffect:boolean = false;
        private closed:boolean = true;

        public open() {

            if(this.inEffect){
                return;
            }

            if(!this.closed){
                this.close();
                return;
            }

            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({scaleX: 1, scaleY: 1}, 400, egret.Ease.backOut).call(()=>{this.inEffect = false;this.closed = false;});
            this.inEffect = true;
        }


        public close(){

            if(this.inEffect || this.closed){
                return;
            }

            egret.Tween.removeTweens(this);
            egret.Tween.get(this).to({scaleX:0,scaleY:0},400, egret.Ease.backIn).call(()=>{this.inEffect = false;this.closed = true;});
            this.inEffect = true;
        }

        public clear(){
            egret.Tween.removeTweens(this);
            this.scaleX = this.scaleY = 0;
            this.inEffect = false;
            this.closed = true;

            for(let pointTxt of this._pointArr){
                if(!pointTxt){
                    continue;
                }
                pointTxt.text = "0";
            }
        }

        //更新显示
        public updateBetPoint(betPoint:number, chessId:number){
            this._pointArr[chessId].text = '+' + betPoint.toString();
        }

        public destroy(){
            egret.Tween.removeTweens(this);
            GameInfo.stage.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.close, this, true);
        }
    }

}