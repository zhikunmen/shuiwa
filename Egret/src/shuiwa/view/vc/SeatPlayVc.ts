namespace SWGAME{
    export class SeatPlayVc extends BaseVc{
        constructor(){
            super();
            this.skinName = sw_SeatPlayVc;
        }

        private seatPlayer_1:SeatPlayer;
        private seatPlayer_2:SeatPlayer;
        private seatPlayer_3:SeatPlayer;
        private seatPlayer_4:SeatPlayer;
        private seatPlayer_5:SeatPlayer;
        private seatPlayer_6:SeatPlayer;
        private seatPlayer_7:SeatPlayer;
        private seatPlayer_8:SeatPlayer;
        private seatPlayer_9:SeatPlayer;
        private seatPlayer_10:SeatPlayer;
        private seatPlayer_11:SeatPlayer;
        private seatPlayer_12:SeatPlayer;
        private seatPlayer_13:SeatPlayer;
        private seatPlayer_14:SeatPlayer;
        private seatPlayer_16:SeatPlayer;
        private seatPlayer_15:SeatPlayer;
        private seatPlayer_17:SeatPlayer;
        private seatPlayer_18:SeatPlayer;

        private seatPlyerArr:SeatPlayer[];

        //庄家头像动画
        private _bankerAnimation:dragonBones.Movie;
        protected initUI(){
            this.seatPlyerArr = [
                null,
                this.seatPlayer_1,this.seatPlayer_2,this.seatPlayer_3,this.seatPlayer_4,
                this.seatPlayer_5,this.seatPlayer_6,this.seatPlayer_7,this.seatPlayer_8,
                this.seatPlayer_9,this.seatPlayer_10,this.seatPlayer_11,this.seatPlayer_12,
                this.seatPlayer_13,this.seatPlayer_14,this.seatPlayer_15,this.seatPlayer_16,
                this.seatPlayer_17,this.seatPlayer_18
            ];

            for (let seatPlayer of this.seatPlyerArr){
                if(!seatPlayer){
                    continue;
                }

                seatPlayer.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClick, this);
            }

            this._bankerAnimation = uniLib.DragonUtils.createFastDragonBones("sw_banker_animation_ske_dbmv","sw_banker_animation_tex_png","MovieClip","banker");

            this._bankerAnimation.timeScale = 0.75;
            this._bankerAnimation.scaleX = this._bankerAnimation.scaleY = PositionData.getInstance().bankerAnimationScale;

            //测试动画
            // this.addChild(this._bankerAnimation);
            // this._bankerAnimation.x = this._bankerAnimation.y = 200;
            // this._bankerAnimation.play("bankerAnimation", 0);
            // this.playBankerAnimation(10);
        }

        public addUser(userVo:UserVo){
            this.seatPlyerArr[userVo.seatId].setUserData(userVo);
        }

        public removeUser(uid:number){
            let seatId = RoomInfo.getInstance().getUserVoByUid(uid).seatId;
            if(!seatId){
                throw new Error("SeatPlayVc:移除用户失败，通过uid找不到seatId");
            }

            this.seatPlyerArr[seatId].removeUserData();
        }

        //更新用户分数
        public updateUserPoints(results:Cmd.GameRoundResult[]){
            for(let result of results){
                let seatId = RoomInfo.getInstance().getSeatIdByUserId(result.uid);

                //当更新分数时用户已经退出
                if(!seatId){
                    return;
                }

                this.seatPlyerArr[seatId].updatePoint(result.userPoint);

            }
        }

        //更新用户分数(单个)
        public updateUserPointsSingle(seatId, num){
            this.seatPlyerArr[seatId].updatePoint(num);
        }

        private onClick(evt:egret.TouchEvent){
            let seatPlayer:SeatPlayer = evt.currentTarget;

            let seatId:number = Number(seatPlayer.name.slice(10));
            this.dispatchEventWith(UIEventConsts.SHOW_USER_INFO, false, seatId);
        }

        //开始抢庄效果
        private _bankerGrabSeatIdArr:number[];
        public bankerGrabEffectStart(){
            this._bankerGrabSeatIdArr = RoomInfo.getInstance().getGrabBankerSeatIdArr();

            if(!this._bankerGrabSeatIdArr.length){
                throw new Error('参与抢庄玩家seatId数组长度不应该小于1');
            }

            console.warn(this._bankerGrabSeatIdArr);


            if(this._bankerGrabSeatIdArr.length == 1){
                this.seatPlyerArr[this._bankerGrabSeatIdArr[0]].activeBankerGrab();
                this.activeSeatId = this._bankerGrabSeatIdArr[0];
                return;
            }


            //如果效果已经在执行，退出
            if(this.timer){
                return;
            }


            this.effectLoop();

        }

        //循环切换座位抢庄效果
        private activeSeatId;
        private timer:number;
        private effectLoop(){

            if(!this.activeSeatId){

                this.seatPlyerArr[this._bankerGrabSeatIdArr[0]].activeBankerGrab();
                this.activeSeatId = this._bankerGrabSeatIdArr[0];
            }


            let nowIndex:number = this._bankerGrabSeatIdArr.indexOf(this.activeSeatId);

            //现在的座位关闭效果
            this.seatPlyerArr[this._bankerGrabSeatIdArr[nowIndex]].deactiveBankerGrab();

            //计算下一个显示效果Index
            let nextIndex:number;
            if(nowIndex == this._bankerGrabSeatIdArr.length - 1){
                nextIndex = 0;
            }else{
                nextIndex = nowIndex + 1;
            }

            //打开下个index效果
            this.activeSeatId = this._bankerGrabSeatIdArr[nextIndex];
            this.seatPlyerArr[this.activeSeatId].activeBankerGrab();


            //设置定时器，递归该函数
            this.timer = egret.setTimeout(()=>{
                this.effectLoop();
            }, this, 100);
        }

        //停止座位抢庄效果
        public endEffectLoop(){

            if(this.timer){
                egret.clearTimeout(this.timer);
                this.timer = null;
            }

            //关闭效果
            this.seatPlyerArr[this.activeSeatId].deactiveBankerGrab();
            this.activeSeatId = null;
        }

        //设置庄家图标
        private _bankerAnimationTimer:number;
        private _bankerSeatId:number;
        public setBanker(bankerSeatId:number){
            this._bankerSeatId = bankerSeatId;
            this.seatPlyerArr[bankerSeatId].setBanker();

            //庄家图标移动到位后显示动画
            this._bankerAnimationTimer = egret.setTimeout(()=>{
                this.playBankerAnimation(bankerSeatId);
            }, this, PositionData.getInstance().bankerIconEffectTime)
        }

        //直接显示庄家图标
        public showBanker(bankerSeatId:number){
            this._bankerSeatId = bankerSeatId;
            this.seatPlyerArr[bankerSeatId].showBanker();
            this.playBankerAnimation(bankerSeatId);
        }

        //清除庄家图标
        public clearBanker(){
            if(!this._bankerSeatId){
                return;
            }

            this.seatPlyerArr[this._bankerSeatId].clearBanker();
            this._bankerSeatId = null;

            this.stopBankerAnimation();
        }

        //显示庄家动画
        private playBankerAnimation(seatId:number){
            this._bankerAnimationTimer = null;

            let pos:egret.Point = PositionData.getInstance().getBankerAnimationPos(seatId);
            this._bankerAnimation.x = pos.x;
            this._bankerAnimation.y = pos.y;
            this._bankerAnimation.play("bankerAnimation", 0);
            this.addChild(this._bankerAnimation);
        }

        //去除庄家动画
        private stopBankerAnimation(){
            this._bankerAnimation.stop();

            if(this._bankerAnimation.parent){
                this.removeChild(this._bankerAnimation);
            }
        }

        public resetAll(){
            if(this.timer){
                egret.clearTimeout(this.timer);
                this.timer = null;
            }
            this.activeSeatId = null;
            this.clearBanker();

            for (let seatPlayer of this.seatPlyerArr){
                if(!seatPlayer){
                    continue;
                }
                seatPlayer.removeUserData();
            }

            this.stopBankerAnimation();

            if(this._bankerAnimationTimer){
                egret.clearTimeout(this._bankerAnimationTimer);
                this._bankerAnimationTimer = null;
            }

        }

        public destroy(){
            super.destroy();

            if(this.timer){
                egret.clearTimeout(this.timer);
                this.timer = null;
            }

            this._bankerAnimation.stop();

            if(this._bankerAnimationTimer){
                egret.clearTimeout(this._bankerAnimationTimer);
                this._bankerAnimationTimer = null;
            }

        }

    }
}