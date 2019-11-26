namespace SWGAME{
    export class EffectVc extends BaseVc{
        constructor(){
            super();
            this.skinName = sw_EffectVc;
        }

        //计时器
        private _timer_group:eui.Group;
        private _timerNum:eui.BitmapLabel;

        //龙骨动画
        private _hideChessArmature:dragonBones.Armature;
        private _openChessArmature:dragonBones.Armature;

        private _factory:dragonBones.BaseFactory;

        protected initUI(){
            this._timer_group.visible = false;

            //初始化动画
            this._factory = new dragonBones.EgretFactory();


            //藏子动画
            this._hideChessArmature = this.createAnimation("sw_shaizhong_ske_json", "sw_shaizhong_tex_json", "sw_shaizhong_tex_png", 'Armature');

            //开子动画
            this._openChessArmature = this.createAnimation("sw_shaizhong_open_ske_json", "sw_shaizhong_open_tex_json", "sw_shaizhong_open_tex_png", 'Armature');

            // this.startOpenChessAnimation(1);
            this.showKantou(7);

            this._tips_msg_group.visible = false;

            this._status_txt.visible = false;
            // this.showTip();
        }

        private createAnimation(skeletonResName:string,texDataResName:string,texResName:string, armatureName:string):dragonBones.Armature{

            let skeletonData = RES.getRes(skeletonResName);
            let textureData = RES.getRes(texDataResName);
            let texture = RES.getRes(texResName);

            let factory = new dragonBones.EgretFactory();

            factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addTextureAtlasData(this._factory.parseTextureAtlasData(textureData, texture));
            this._factory = factory;
            let armature:dragonBones.Armature = this._factory.buildArmature(armatureName);

            return armature;

        }

        //计时器逻辑
        //开始倒计时
        private _timer:egret.Timer;
        private _countNum:number;
        public startTimer(count:number){

            if(this._timer){
                this.clearTimer();
            }

            this._countNum = count;

            if(this._countNum <= 0){
                return;
            }

            this._timerNum.text = this._countNum.toString();

            this._timer_group.visible = true;

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
            this._timer_group.visible = false;
        }

        //藏子成功后广播消息动画
        private _hideChessDisplay:dragonBones.EgretArmatureDisplay;
        public startHideChessAnimation(){


            let armatureDisplay = this._hideChessArmature.display;
            this._factory.clock.add(this._hideChessArmature);
            this.addChild(armatureDisplay);
            armatureDisplay.x = ScreenAdaptMgr.getInstance().defaultWidth / 2;
            armatureDisplay.y = ScreenAdaptMgr.getInstance().defaultHeight / 2;
            armatureDisplay.scaleX = armatureDisplay.scaleY = 2;
            // //启动骨骼动画播放
            this._hideChessArmature.animation.play(null,1);

            let toPoint:egret.Point = PositionData.getInstance().shaizhongPos;

            //添加缓动
            egret.Tween.get(armatureDisplay).wait(1500).to({x:toPoint.x, y:toPoint.y}, 1000, egret.Ease.sineInOut);

            this._hideChessDisplay = armatureDisplay;
        }

        //开子动画
        private _openChessDisplay:dragonBones.EgretArmatureDisplay;

        //直接刷出藏子动画最后一帧（用于断线重连/中途加入）
        public showHideChessAnimation(){

            let armatureDisplay = this._hideChessArmature.display;
            this._factory.clock.add(this._hideChessArmature);
            let toPoint:egret.Point = PositionData.getInstance().shaizhongPos;


            this._hideChessArmature.animation.gotoAndPlayByTime('newAnimation',2.5, 1);
            // this._hideChessArmature.animation.gotoAndStopByTime('newAnimation',2.5);

            armatureDisplay.x = toPoint.x;
            armatureDisplay.y = toPoint.y;
            armatureDisplay.scaleX = armatureDisplay.scaleY = 2;

            this.addChild(armatureDisplay);

            this._hideChessDisplay = armatureDisplay;
        }

        public startOpenChessAnimation(chessId:number){

            //更换slot

            let chessRes:egret.Texture = GameData.getInstance().getChessBgResByChessId(chessId);
            let slot:dragonBones.Slot = this._openChessArmature.getSlot('bone12');
            let b:egret.Bitmap = new egret.Bitmap();
            b.texture = chessRes;
            b.x = slot.display.x;
            b.y = slot.display.y;
            b.width = 58;
            b.height = 58;
            b.anchorOffsetX = b.width/2;
            b.anchorOffsetY = b.height/2;

            slot.display = b;

            let armatureDisplay = this._openChessArmature.display;
            this._factory.clock.add(this._openChessArmature);
            armatureDisplay.scaleX = armatureDisplay.scaleY = 2;

            this.addChild(armatureDisplay);

            //和藏子动画最后一帧重合
            let initPoint:egret.Point = PositionData.getInstance().shaizhongPos;

            armatureDisplay.x = initPoint.x;
            armatureDisplay.y = initPoint.y;

            //移除藏子动画最后一帧
            if(this._hideChessDisplay.parent){
                this.removeChild(this._hideChessDisplay);
            }

            // //启动骨骼动画播放
            this._openChessArmature.animation.play(null,1);

            armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.animitionEventHandle, this);

            // //添加缓动
            let toPoint = new egret.Point(ScreenAdaptMgr.getInstance().defaultWidth / 2, ScreenAdaptMgr.getInstance().defaultHeight / 2);

            egret.Tween.get(armatureDisplay).to({x:toPoint.x, y:toPoint.y}, 1000, egret.Ease.sineInOut);

            this._openChessDisplay = armatureDisplay;

            // let toPoint:egret.Point = PositionData.getInstance().shaizhongPos;
            //

        }

        private _kantouChessImg:egret.Bitmap;
        private animitionEventHandle(evt:dragonBones.EgretEvent){

                this._openChessDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.animitionEventHandle, this);

                //按照插槽中的象棋的位置，添加到看头

               let display:dragonBones.EgretArmatureDisplay = evt.target;
               let slot:dragonBones.Slot = display.armature.getSlot('bone12');

               //位置转换
               let kantouInitPoint = new egret.Point();
               display.localToGlobal(slot.display.x, slot.display.y, kantouInitPoint);
               this.globalToLocal(kantouInitPoint.x, kantouInitPoint.y ,kantouInitPoint);

               //新建看头象棋
               this.addKantou(kantouInitPoint);

                this.removeChild(this._openChessDisplay);
        }

        //添加看头象棋
        private addKantou( initPoint:egret.Point){

            if(this._kantouChessImg) {
                uniLib.DisplayUtils.removeFromParent(this._kantouChessImg);
            }

            let texture:egret.Texture = GameData.getInstance().getChessBgResByChessId(RoomInfo.getInstance().hideChessId);

            let img:egret.Bitmap = new egret.Bitmap(texture);

            let kantouSize:number[] = PositionData.getInstance().kantouSize;

            this._kantouChessImg = img;
            img.width = 116;
            img.height = 116;
            img.anchorOffsetX = kantouSize[0] / 2;
            img.anchorOffsetY = kantouSize[1] / 2;
            img.x = initPoint.x;
            img.y = initPoint.y;

            this.addChild(img);

            let toPoint = PositionData.getInstance().kantouPos;

            egret.Tween.get(img).to({
                x:toPoint.x,
                y:toPoint.y,
                width:kantouSize[0],
                height:kantouSize[1]
            }, 600, egret.Ease.cubicInOut).call(()=>{
                egret.Tween.removeTweens(img);
                this.dispatchEventWith(UIEventConsts.FLY_KANTOU_END);
            });

        }

        //直接显示看头，用于中途加入/断线重连
        public showKantou(chessId:number){

            if(this._kantouChessImg) {
                uniLib.DisplayUtils.removeFromParent(this._kantouChessImg);
            }

            let point:egret.Point = PositionData.getInstance().kantouPos;
            let kantouSize:number[] = PositionData.getInstance().kantouSize;

            let texture:egret.Texture = GameData.getInstance().getChessBgResByChessId(chessId);
            let img = new egret.Bitmap(texture);
            img.width = kantouSize[0];
            img.height = kantouSize[1];
            img.anchorOffsetX = kantouSize[0] / 2;
            img.anchorOffsetY = kantouSize[1] / 2;
            img.x = point.x;
            img.y = point.y;
            this.addChild(img);
            this._kantouChessImg = img;
        }

        //送礼物 BEGIN

        public sendGift(giftId:number,toUid:number,fromUid:number){


            //起点
            let initPoint:egret.Point;
            let fromSeatId:number = RoomInfo.getInstance().getSeatIdByUserId(fromUid);
            initPoint = PositionData.getInstance().getFlyChipInitPoint(fromSeatId);

            //终点
            let toPoint:egret.Point;
            let toSeatId:number = RoomInfo.getInstance().getSeatIdByUserId(toUid);
            toPoint = PositionData.getInstance().getFacePos(toSeatId);


            let giftItem:chessCommonLib.zm_GiftAnItem = new chessCommonLib.zm_GiftAnItem();
            giftItem.giftId = giftId;
            giftItem.x = initPoint.x;
            giftItem.y = initPoint.y;
            this.addChild(giftItem);

            egret.Tween.get(giftItem).to({x:toPoint.x,y:toPoint.y},400,egret.Ease.circOut).call(this.giftMoveEnd,this,[giftItem]);
        }

        private _giftTimerArr:number[] = [];
        private giftMoveEnd(giftItem:chessCommonLib.zm_GiftAnItem):void{
            egret.Tween.removeTweens(giftItem);
            giftItem.play();

            let timer:number = egret.setTimeout(()=>{

                giftItem.destory();
                uniLib.DisplayUtils.removeFromParent(giftItem);
                let index = this._giftTimerArr.indexOf(timer);
                this._giftTimerArr.splice(index, 1);

            }, this, 2500);

            this._giftTimerArr.push(timer);
        }


        //送礼物 END

        //开局未满5人提示
        private _tips_msg_group:eui.Group;
        private _tips_msg:eui.Label;
        private _tip_timer:egret.Timer;

        //显示开局未满5人提示
        public showTip(){
            if(this._tip_timer){
                return;
            }

            this._tips_msg_group.visible = true;
            this._tip_timer = new egret.Timer(1000, 0);
            this._tip_timer.addEventListener(egret.TimerEvent.TIMER, this.tipCh, this);
            this._tip_timer.start();
        }

        //关闭开局未满5人提示
        public closeTip(){

            this._tips_msg_group.visible = false;
            if(this._tip_timer){
                this._tip_timer.stop();
                this._tip_timer.removeEventListener(egret.TimerEvent.TIMER, this.tipCh, this);
                this._tip_timer = null;
            }
        }

        private tipCount:number = 0;
        //修改开局未满5人文本
        private tipCh(){

            if(this.tipCount < 4){
                this.tipCount ++;
            }else{
                this.tipCount = 0;
            }

            let dotStr:string = "...";
            let dotAdd:string = dotStr.substring(0, this.tipCount);

            this._tips_msg.text = "需满5人开局，请等待其他玩家加入" + dotAdd;
        }

        //游戏阶段显示
        private _status_txt:eui.Label;
        public showStatus(status:Cmd.GameStatus){
            this._status_txt.visible = true;
            if(GameData.getInstance().statusNameMap.has(status)){
                this._status_txt.text =  GameData.getInstance().statusNameMap.get(status);
            }
        }

        public removeStatus(){
            this._status_txt.visible = false;
        }

        //清除所有动画效果
        public clearAll(){
            this.clearTimer();
            this.closeTip();
            this.removeStatus();

            this._hideChessArmature.animation.stop();
            this._openChessArmature.animation.stop();

            this._hideChessArmature.animation.reset();
            this._openChessArmature.animation.reset();

            if(this._hideChessDisplay){
                egret.Tween.removeTweens(this._hideChessDisplay);
                uniLib.DisplayUtils.removeFromParent(this._hideChessDisplay);
                this._hideChessDisplay = null;
            }

            if(this._openChessDisplay){
                this._openChessDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.animitionEventHandle, this);
                egret.Tween.removeTweens(this._openChessDisplay);
                uniLib.DisplayUtils.removeFromParent(this._openChessDisplay);
                this._openChessDisplay = null;
            }

            if(this._kantouChessImg) {
                egret.Tween.removeTweens(this._kantouChessImg);
                uniLib.DisplayUtils.removeFromParent(this._kantouChessImg);
                this._kantouChessImg = null;
            }


        }



        public destroy(){
            super.destroy();
            this.clearTimer();
            this.closeTip();

            this._hideChessArmature.animation.stop();
            this._openChessArmature.animation.stop();

            this._hideChessArmature.animation.reset();
            this._openChessArmature.animation.reset();

            if(this._openChessDisplay) {
                this._openChessDisplay.removeEventListener(dragonBones.EventObject.COMPLETE, this.animitionEventHandle, this);
            }

            this._factory.clock.remove(this._hideChessArmature);
            this._factory.clock.remove(this._openChessArmature);

            if(this._giftTimerArr.length){
                for(let timer of this._giftTimerArr){
                    egret.clearTimeout(timer);
                }
            }

        }


    }
}