namespace SWGAME{
    //特效实现类 by luchun
    export class EffectFactory{

        //单例
        private static _instance:EffectFactory;
        public static getInstance(){
            if(!EffectFactory._instance){
                EffectFactory._instance = new EffectFactory();
            }

            return EffectFactory._instance;
        }

        public static destroy(){
            if(EffectFactory._instance){
                EffectFactory._instance = null;
            }
        }

        public constructor(){

        }

        //数字增加渐变效果
        // private _newValue:number;
        private _times:number = 15; //总渐变次数
        private _msec:number = 300; //总渐变的时间(毫秒)
        private _effectScale:number = 1.2; //在渐变的过程中数字增大的倍数
        public addNumEffect(textObj:egret.TextField, oldValue:number, newValue:number, isScale:boolean = false){
            // if(!this._newValue){
            //     this._newValue = newValue;
            // }

            //数字变化间隔
            let intervalSec:number = this._msec / this._times;
            //每次间隔增加的数字
            let interNum:number = Math.floor((newValue - oldValue)/this._times);

            //设置定时器
            let intervalIndex:number = egret.setInterval(()=>{
                //数字变化
                textObj.text = (Number(textObj.text) + interNum).toString();
            }, this, intervalSec);


            if(isScale) {
                /*
                * 变大，复原动画
                * 前1/4总时间内增大this._effectScale倍
                * 中间2/4时间内等待
                * 后1/4总时间内变回scale = 1
                * */
                egret.Tween.get(textObj).to({
                    scaleX: this._effectScale,
                    scaleY: this._effectScale
                }, this._msec / 4, egret.Ease.sineInOut).wait(this._msec / 2).to({
                    scaleX: 1,
                    scaleY: 1
                }, this._msec / 4, egret.Ease.sineInOut).call(() => {
                    egret.Tween.removeTweens(textObj);
                });
            }

            //清除定时器
            egret.setTimeout(()=>{
                egret.clearInterval(intervalIndex);
                textObj.text = newValue.toString();
            },this,this._msec);

            // for (let i = 0; i < this._times; i++){
            // }
        }

        /**   飞筹码效果
         *
         * @param {egret.DisplayObject} chipObj 筹码显示对象
         * @param {egret.Point} dstPoint 动画结束目标坐标点
         * @param {egret.Point} dstPoint2 动画结束目标坐标点2 如果该参数存在，则飞向一个由区域 disPoint 和 disPoint2 组成的区域中随机的一个位置
         * @param {number} msec 动画持续时间
         * @param {boolean} roll 筹码是否转动
         * @param {Function} easeType 移动缓动动画的ease类型
         * @param {number} effectScale 如果传入在移动中还有放大，缩小效果
         * @param {Function} endCall 如果传入，动画完成后回调该函数
         * @param {Object} thisObj 如果传入endCall，必传入this
         */
        public flyChip(chipObj:egret.DisplayObject, dstPoint:egret.Point, dstPoint2:egret.Point, msec:number, roll:boolean = false, easeType:Function = egret.Ease.circInOut, effectScale:number = null, endCall:Function = null, thisObj:Object = null){

            if(!dstPoint){
                throw new Error("必须有一个动画目标点");
            }

            //目标区域
            let disArea: {point1:egret.Point, point2:egret.Point};

            if(dstPoint2){
                //如果有dstPoint2，初始化区域
                disArea = {
                    point1:dstPoint,
                    point2:dstPoint2
                }
            }

            let move:Function = (disX:number, disY:number)=>{

                egret.Tween.get(chipObj).to({x:disX, y:disY}, msec, easeType).call(()=>{
                    egret.Tween.removeTweens(chipObj);

                    if(endCall){
                        if(!thisObj){
                            throw new Error("如果传入结束回调函数，必须设置thisObj参数");
                        }

                        endCall.call(thisObj,chipObj);
                    }
                });
            };

            if(disArea) {
                //飞向一个由区域 disPoint 和 disPoint2 组成的区域中随机的一个位置
                if (disArea.point1.x == disArea.point2.x && disArea.point1.y == disArea.point2.y) {
                    throw new Error("disPoint和disPoint2不能是同一个点");
                }

                let diffx = disArea.point2.x - disArea.point1.x;
                let diffy = disArea.point2.y - disArea.point1.y;

                let randDiffx =  diffx * Math.random();
                let randDiffy = diffy * Math.random();

                let randx = disArea.point1.x + randDiffx;
                let randy = disArea.point1.y + randDiffy;

                move(randx, randy);

            }else{
                //没区域直接移动到点
                move(dstPoint.x,dstPoint.y);
            }



            //如果有roll则循环旋转，直到动画结束
            if(roll){
                egret.Tween.get(chipObj,{loop:true}).to({rotation:360},300);
            }

            //如果有缩放比例参数，前1/3动画时间缩放，后1/3动画时间还原
            if(effectScale){
                egret.Tween.get(chipObj).to({scaleX:effectScale, scaleY:effectScale},msec*1/3)
                    .wait(0)
                    .to({scaleX:1, scaleY:1},msec*1/3);
            }

        }

        /**数值处理，加单位(万/亿)
         *
         * @param {number} num 数值,支持负数
         * @param {number} digit 加单位后保留小数点后几位
         * @param {boolean}  isAddPlus 正数是否加上前缀+
         * @returns {string} 返回字符串格式
         */
        public handleNum(num:number, digit:number, isAddPlus:boolean = false):string {

            if(!digit){
                throw new Error('小数位数不能为0');
            }

            let txt: string;
            let devider: number = Math.pow(10, digit);


            //大于10000的数值改成以万为单位
            if (num < 10000 && num > -10000) {
                //小于1万
                txt = num.toString();

            }else if (num < 100000000 && num > -100000000){
                //小于1亿
                let temp = Math.floor(num / 10000 * devider);

                if(num > 0){
                    if (temp / devider == Math.floor(temp / devider)) {

                        txt = (temp / devider).toString() + '万';
                    }else{
                        txt = (temp / devider).toFixed(digit).toString() + '万';
                    }

                }else{
                    if (temp / devider == Math.ceil(temp / devider)) {
                        txt = (temp / devider).toString() + '万';
                    }else{
                        txt = (temp / devider).toFixed(digit).toString() + '万';
                    }
                }


            }else{

                //大于1亿
                let temp = Math.floor(num / 100000000 * devider);

                if(num > 0) {
                    if (temp / devider == Math.floor(temp / devider)) {
                        txt = (temp / devider).toString() + '亿';
                    } else {
                        txt = (temp / devider).toFixed(digit).toString() + '亿';
                    }

                }else{
                    if (temp / devider == Math.ceil(temp / devider)) {
                        txt = (temp / devider).toString() + '亿';
                    } else {
                        txt = (temp / devider).toFixed(digit).toString() + '亿';
                    }
                }

            }


            if(isAddPlus && txt != '0' && txt[0] != '-'){
                txt = '+' + txt;
            }

            return txt;

        }

        //通用计时器
        public publicTimer(){

        }
    }
}