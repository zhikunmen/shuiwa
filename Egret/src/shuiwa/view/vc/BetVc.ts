namespace SWGAME{

    export class BetVc extends BaseVc{
        constructor(){
            super();
            this.skinName = sw_BetVc;
        }

        //续投按钮(已取消)
        // private _continue_chip_btn:eui.Button;

        //隐藏的用于定位的按钮1-5;
        private _chip_hide_group:eui.Group;

        //隐藏的按钮1-5;
        private _chip_hide_1:eui.Image;
        private _chip_hide_2:eui.Image;
        private _chip_hide_3:eui.Image;
        private _chip_hide_4:eui.Image;
        private _chip_hide_5:eui.Image;

        //显示的真实筹码按钮1-5;
        private chip_real_1:ChipReal;
        private chip_real_2:ChipReal;
        private chip_real_3:ChipReal;
        private chip_real_4:ChipReal;
        private chip_real_5:ChipReal;
        private _chipRealArr:ChipReal[]  = [];

        //下注区象棋
        private _betChessIcon_1:BetChess;
        private _betChessIcon_2:BetChess;
        private _betChessIcon_3:BetChess;
        private _betChessIcon_4:BetChess;
        private _betChessIcon_5:BetChess;
        private _betChessIcon_6:BetChess;
        private _betChessIcon_7:BetChess;
        private _betChessIcon_8:BetChess;
        private _betChessIcon_9:BetChess;
        private _betChessIcon_10:BetChess;
        private _betChessIcon_11:BetChess;
        private _betChessIcon_12:BetChess;
        private _betChessArr:BetChess[];

        //玩家自己信息区
        private _my_head_url:eui.Image;
        private _my_nickName:eui.Label;
        private _my_point:eui.Label;
        private _my_score:eui.Label;
        private _unit_golden:eui.Image;
        private _unit_diamond:eui.Image;

        //下注详情面版显示按钮
        private _bet_panel_btn:eui.Group;
        //总下注数
        private _my_bet_total_txt:eui.Label;

        protected initUI(){

            this._chip_hide_1.addEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_2.addEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_3.addEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_4.addEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_5.addEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);

            //把隐藏按钮组设为透明，并且可以点击
            this._chip_hide_group.alpha = 0;

            //初始化真实按钮筹码
            this._chipRealArr=[
                this.chip_real_1,
                this.chip_real_2,
                this.chip_real_3,
                this.chip_real_4,
                this.chip_real_5,
            ];

            //初始化下注区象棋数组
            this._betChessArr = [
                null,
                this._betChessIcon_1,
                this._betChessIcon_2,
                this._betChessIcon_3,
                this._betChessIcon_4,
                this._betChessIcon_5,
                this._betChessIcon_6,
                this._betChessIcon_7,
                this._betChessIcon_8,
                this._betChessIcon_9,
                this._betChessIcon_10,
                this._betChessIcon_11,
                this._betChessIcon_12
            ];

            for(let index:number = 1; index < this._betChessArr.length; index++){
                let betChess = this._betChessArr[index];
                betChess.setChess(index);
                betChess.addEventListener(egret.TouchEvent.TOUCH_TAP, this.betChessHandle, this, false);

                betChess.addEventListener(UIEventConsts.CHESS_TWINKLE_END, this.twinkleEnd, this, false);
            }

            //初始禁用续投按钮
            // this._continue_chip_btn.touchEnabled = false;
            // this._continue_chip_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.continue, this, false);

            this._bet_panel_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetPanelBtn, this, false);

            this._my_bet_total_txt.text = '0';
        }

        private uiHandle(evt:egret.TouchEvent){

            let target = evt.currentTarget;

            // switch (target){
            //     case this._chip_hide_1:
            //     case this._chip_hide_2:
            //     case this._chip_hide_3:
            //     case this._chip_hide_4:
            //     case this._chip_hide_5:
            //         this.chipScale([
            //             this._chip_hide_1,
            //             this._chip_hide_2,
            //             this._chip_hide_3,
            //             this._chip_hide_4,
            //             this._chip_hide_5,
            //         ],target);
            //         break;
            // }

            //触发位于低深度的真正筹码
            switch (target){
                case this._chip_hide_1:
                    // this.chip_real_1.OnClick();
                    this.chipActive(this._chipRealArr, this.chip_real_1);
                    break;

                case this._chip_hide_2:
                    // this.chip_real_2.OnClick();
                    this.chipActive(this._chipRealArr, this.chip_real_2);
                    break;

                case this._chip_hide_3:
                    // this.chip_real_3.OnClick();
                    this.chipActive(this._chipRealArr, this.chip_real_3);

                    break;

                case this._chip_hide_4:
                    // this.chip_real_4.OnClick();
                    this.chipActive(this._chipRealArr, this.chip_real_4);
                    break;

                case this._chip_hide_5:
                    // this.chip_real_5.OnClick();
                    this.chipActive(this._chipRealArr, this.chip_real_5);
                    break;

            }


        }

        //下注详情按钮点击
        private onBetPanelBtn(){
            uniLib.Global.dispatchEvent(UIEventConsts.BET_INFO_OPEN, null, false);
        }

        //选中下注区域
        private betChessHandle(evt:egret.TouchEvent){

            //被选中的区域
            let clickedBetChess:BetChess = evt.currentTarget;

            for (let betChess of this._betChessArr){
                if(!betChess){
                    continue;
                }

                betChess.DeActive();
            }

            clickedBetChess.Active();

            let chessId:number = clickedBetChess.chessId;

            //发送给Mediator下注
            if(!this._selectedBetPoint){
                return;
            }

            this.dispatchEventWith(UIEventConsts.ON_BET, false, [chessId, this._selectedBetPoint]);
            console.log(chessId, this._selectedBetPoint);

        }

        //藏子区域闪烁结束
        private twinkleEnd(){
            //开始飞筹码
            this.roundEndFlyChipToBanker();
        }

        //藏子区闪烁
        public twinkleHideChess(chessId:number){
            this._betChessArr[chessId].twinkleHideChess();
            //播放音效有没压中
            if(RoomInfo.getInstance().bankerUid != uniLib.NetMgr.UID){
                if(this.isWin()){
                    uniLib.SoundMgr.instance.playSound(SoundConsts.WIN);
                }else{
                    uniLib.SoundMgr.instance.playSound(SoundConsts.FAIL);
                }
            }
        }


        /**筹码点击缩放
         *
         * @param {egret.DisplayObject[]} objArr 参与缩放的一组对象
         * @param {egret.DisplayObject} obj 需要放大的对象，同组其他对象缩小到未放大
         */
        //缩放比例
        private _scale:number = 1.2;
        private chipScale(objArr:egret.DisplayObject[],obj:egret.DisplayObject){

            for(let dObj of objArr){
                dObj.scaleX = dObj.scaleY = 1;
            }

            obj.scaleX = obj.scaleY = this._scale;
        }

        //真实的筹码点击激活
        private chipActive(chipArr:ChipReal[],chipReal:ChipReal){
            this.chipScale(chipArr, chipReal);

            for(let chip of chipArr){
                chip.deActive();
            }

            chipReal.OnClick();
        }

        //初始化真实筹码数据
        private _betPointArr:number[];
        public initChips(betPointArr:number[]){
            if(betPointArr.length != 5){
                console.error(betPointArr);
                throw new Error("BetVc:筹码数量不正确!不等于5");
            }

            this._betPointArr = betPointArr;

            for (let i=0; i < this._chipRealArr.length; i++){
                this._chipRealArr[i].initChip(betPointArr[i]);
                this._chipRealArr[i].addEventListener(UIEventConsts.SELECT_CHIP, this.onSelectChip, this);
            }
        }


        //设置玩家自己信息区


        public setMyUserData(){
            let myInfo:UserVo = RoomInfo.getInstance().getMyUserInfo();
            this._my_nickName.text = `昵称：${myInfo.nickName}`;

            if(RoomInfo.getInstance().roomType == 1){
                //金币场
                this._my_point.text = EffectFactory.getInstance().handleNum(myInfo.chips, 2);
                this._unit_golden.visible = true;
            }else{
                //钻石场
                this._my_point.text = EffectFactory.getInstance().handleNum(myInfo.diamond, 2);
                this._unit_diamond.visible = true;
            }


            this._my_score.text = `成绩：${EffectFactory.getInstance().handleNum(myInfo.score, 2)}`;

            HeadLoader.getInstance().load(myInfo.headUrl, this.onLoadSuccess, this.onLoadError, this);
        }

        //更新玩家自己的货币数
        public updatePoints(num){
            this._my_point.text = EffectFactory.getInstance().handleNum(num, 2);
        }

        //更新玩家总下注数
        public updateBetTotal(num:number){
            this._my_bet_total_txt.text = num.toString();
        }

        private realHeadImg:egret.Bitmap;

        private onLoadSuccess(data:egret.BitmapData){
            // this._headImg.source = data.source;

            if(this.realHeadImg){
                this.realHeadImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showMyUserInfo, this, false);
                this.removeChild(this.realHeadImg);
                this.realHeadImg = null;
            }

            let headImg:egret.Bitmap = new egret.Bitmap(data);
            headImg.name = 'headImg_real';
            headImg.x = this._my_head_url.x;
            headImg.y = this._my_head_url.y;
            headImg.width = this._my_head_url.width;
            headImg.height = this._my_head_url.height;
            this.realHeadImg = headImg;
            this.realHeadImg.touchEnabled = true;
            this.realHeadImg.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showMyUserInfo, this, false);
            this.addChild(headImg);

        }

        private showMyUserInfo(){
            this.dispatchEventWith(UIEventConsts.SHOW_USER_INFO,false);
        }

        private onLoadError(url:string){
            console.warn("betVc:用户头像获取失败! url:" + url);
        }


        private _selectedBetPoint:number;
        private onSelectChip(evt:egret.Event){
            this._selectedBetPoint = evt.data;
            egret.localStorage.setItem('selectedBetPoint', this._selectedBetPoint.toString());
        }

        //飞过的筹码对象存储[chessId][chip],二维数组
        private _chipFlyArr:egret.Bitmap[][] = [];

        //飞筹码(单个)
        public flyChip(betPoint:number, chessId:number ,seatId:number){
            //获取飞筹码目标区域
            let point1:egret.Point;
            let point2:egret.Point;
            [point1, point2] = PositionData.getInstance().betArea(chessId);

            //获取飞筹码初始区域
            let initPoint:egret.Point = PositionData.getInstance().getFlyChipInitPoint(seatId);

            //生成筹码
            let chip:egret.Bitmap = new egret.Bitmap(GameData.getInstance().getChipResByPoint(betPoint));

            chip.width = PositionData.getInstance().flyChipSize[0];
            chip.height = PositionData.getInstance().flyChipSize[1];
            chip.anchorOffsetX = PositionData.getInstance().flyChipSize[0] / 2;
            chip.anchorOffsetY = PositionData.getInstance().flyChipSize[1] / 2;
            chip.x = initPoint.x;
            chip.y = initPoint.y;
            chip.name = seatId.toString() + '_' + betPoint;
            this.addChild(chip);

            if(!this._chipFlyArr[chessId]) {
                this._chipFlyArr[chessId] = [];
            }

            this._chipFlyArr[chessId].push(chip);


            //飞筹码效果
            EffectFactory.getInstance().flyChip(chip, point1, point2, PositionData.getInstance().flyChipTime, false, null, 2)

        }

        //结算阶段飞筹码(群) 飞向banker
        public roundEndFlyChipToBanker(){
            if(!this._chipFlyArr.length){
                console.warn('没人下注');
                this.dispatchEventWith(UIEventConsts.FLY_CHIP_END);
                return;
            }

            //飞向庄家
            let toPoint:egret.Point = PositionData.getInstance().getFlyChipInitPoint(
                RoomInfo.getInstance().bankerSeatId
            );

            //每个chessId的筹码同index为一组一起飞
            for (let chipArr of this._chipFlyArr){

                if(!chipArr){
                    continue;
                }

                let chessId = this._chipFlyArr.indexOf(chipArr);

                //压中庄家藏子的不飞
                if(chessId == RoomInfo.getInstance().hideChessId){
                    continue;
                }

                let i = 0;

                for (let chip of chipArr){

                    //飞筹码时间控制
                    let delay:number = PositionData.getInstance().roundEndFlyChipInterval * i;
                    if(delay > PositionData.getInstance().roundEndFlyChipMax){
                        delay = PositionData.getInstance().roundEndFlyChipMax;
                    }


                    let timer = egret.setTimeout(()=>{

                        EffectFactory.getInstance().flyChip(chip, toPoint, null, PositionData.getInstance().roundEndFlyChipTime, false, null, null,
                            ()=>{
                                //飞完回调
                                uniLib.DisplayUtils.removeFromParent(chip);
                                this._chipFlyTimerArr.shift();
                                this.roundEndflyToChess();

                            }, this);


                    }, this, delay);

                    this._chipFlyTimerArr.push(timer);
                    i++;
                }

            }

            //当除了下注区以外都没有筹码时，直接出发庄家飞下注区
            this.roundEndflyToChess();
        }

        //飞筹码setTimeOut存储
        private _chipFlyTimerArr:number[] = [];


        //庄家飞筹码到下注区
        private roundEndflyToChess(){
            //飞向庄家的没飞完不飞下注区
            if(this._chipFlyTimerArr.length){
                return;
            }

            //藏子chessId没人压,发送事件退出方法
            if(!this._chipFlyArr[RoomInfo.getInstance().hideChessId]){
                console.warn("没人压中");
                this._chipFlyArr = [];
                this.dispatchEventWith(UIEventConsts.FLY_CHIP_END);
                return;
            }

            console.warn("飞下注区");

            //获取飞筹码目标区域
            let point1:egret.Point;
            let point2:egret.Point;
            [point1, point2] = PositionData.getInstance().betArea(RoomInfo.getInstance().hideChessId);

            //从庄家处开始
            let initPoint:egret.Point = PositionData.getInstance().getFlyChipInitPoint(
                RoomInfo.getInstance().bankerSeatId
            );

            let chipArrTmp:egret.Bitmap[] = [];

            //飞10倍筹码到下注区
            for(let chip of this._chipFlyArr[RoomInfo.getInstance().hideChessId]){

                let multi = GameData.getInstance().bankerMulti;

                for(let i = 0; i < multi; i++){

                    //生成筹码
                    let betPoint = Number(chip.name.split('_')[1]);
                    let chipFly = new egret.Bitmap(GameData.getInstance().getChipResByPoint(betPoint));
                    chipFly.width = PositionData.getInstance().flyChipSize[0];
                    chipFly.height = PositionData.getInstance().flyChipSize[1];
                    chipFly.anchorOffsetX = PositionData.getInstance().flyChipSize[0] / 2;
                    chipFly.anchorOffsetY = PositionData.getInstance().flyChipSize[1] / 2;
                    chipFly.x = initPoint.x;
                    chipFly.y = initPoint.y;
                    chipFly.name = chip.name;
                    chipFly.visible = false;
                    this.addChild(chipFly);
                    chipArrTmp.push(chipFly);

                    //飞筹码时间控制
                    let delay:number = PositionData.getInstance().roundEndFlyChipInterval * i;
                    if(delay > PositionData.getInstance().roundEndFlyChipMax){
                        delay = PositionData.getInstance().roundEndFlyChipMax;
                    }

                    console.warn(delay);

                    //定时飞筹码
                    let timer:number = egret.setTimeout(
                        ()=>{
                        chipFly.visible = true;
                        //飞筹码效果
                        EffectFactory.getInstance().flyChip(chipFly, point1, point2, PositionData.getInstance().roundEndFlyChipTime, false, null, null, ()=>{
                            //飞完回调
                            this._chipFlyTimerArr.shift();
                            this.roundEndflyToWinner();

                        }, this)


                        }, this, delay);

                    this._chipFlyTimerArr.push(timer);
                }

            }

            this._chipFlyArr[RoomInfo.getInstance().hideChessId].push(...chipArrTmp);
        }

        //下注区飞筹码到赢家
        private roundEndflyToWinner(){
            //飞向下注区的没飞完不飞赢家
            if(this._chipFlyTimerArr.length){
                return;
            }
            console.warn("飞玩家");

            //根据玩家分组筹码
            let chipArr:egret.Bitmap[][] = [];
            this._chipFlyArr[RoomInfo.getInstance().hideChessId].forEach((chip:egret.Bitmap)=>{
                let seatId:number = Number(chip.name.split('_')[0]);

                if(!chipArr[seatId]){
                    chipArr[seatId] = [];
                }

                chipArr[seatId].push(chip);
            });

            for(let chipArrSeat of chipArr){
                if(!chipArrSeat){
                    continue;
                }

                let seatId = chipArr.indexOf(chipArrSeat);

                //飞向玩家的位置
                let toPoint:egret.Point = PositionData.getInstance().getFlyChipInitPoint(seatId);
                let i = 0;
                for(let chip of chipArrSeat){

                    //飞筹码时间控制
                    let delay:number = PositionData.getInstance().roundEndFlyChipInterval * i;
                    if(delay > PositionData.getInstance().roundEndFlyChipMax){
                        delay = PositionData.getInstance().roundEndFlyChipMax;
                    }

                    console.warn(delay);

                    let timer = egret.setTimeout(()=>{

                        EffectFactory.getInstance().flyChip(chip, toPoint, null, PositionData.getInstance().roundEndFlyChipTime, false, null, null,
                            ()=>{
                                //飞完回调
                                uniLib.DisplayUtils.removeFromParent(chip);
                                this._chipFlyTimerArr.shift();
                                this.roundEndflyEnd();

                            }, this);


                    }, this, delay);

                    this._chipFlyTimerArr.push(timer);
                    i++;
                }
            }

        }

        private roundEndflyEnd(){
            //飞筹码流程结束
            if(this._chipFlyTimerArr.length){
                return;
            }

            console.warn('飞筹码结束');
            //清除存储
            this._chipFlyArr = [];

            //派发事件
            this.dispatchEventWith(UIEventConsts.FLY_CHIP_END);
        }

        //直接显示飞完的筹码(断线重连/中途加入----下注阶段)
        public showFlyChip(rev:Cmd.GameRoundInfo){
            //筹码存储

            //直接更新棋子下注数量
            let updateNum:Function = (myPoints:number,totalPoints:number,chessId:number)=>{
                this._betChessArr[chessId].showPoints(myPoints, totalPoints);
            };

            //直接刷筹码函数
            let showChips:Function = (betPoint:number, chessId:number ,seatId:number):egret.Bitmap=>{
                //获取飞筹码目标区域
                let point1:egret.Point;
                let point2:egret.Point;
                [point1, point2] = PositionData.getInstance().betArea(chessId);

                //生成随机点
                let diffx = point2.x - point1.x;
                let diffy = point2.y - point1.y;

                let randDiffx =  diffx * Math.random();
                let randDiffy = diffy * Math.random();

                let randx = point1.x + randDiffx;
                let randy = point1.y + randDiffy;

                //生成筹码
                let chip:egret.Bitmap = new egret.Bitmap(GameData.getInstance().getChipResByPoint(betPoint));

                chip.width = PositionData.getInstance().flyChipSize[0];
                chip.height = PositionData.getInstance().flyChipSize[1];
                chip.anchorOffsetX = PositionData.getInstance().flyChipSize[0] / 2;
                chip.anchorOffsetY = PositionData.getInstance().flyChipSize[1] / 2;
                chip.x = randx;
                chip.y = randy;
                chip.name = seatId.toString() + '_' + betPoint;
                this.addChild(chip);
                return chip;
            };

            for(let user of rev.userRoundInfo){

                let seatId = RoomInfo.getInstance().getSeatIdByUserId(user.uid);

                let betSet:Cmd.SWBetSet[] = user.betSet;
                if(!Object.keys(betSet).length){
                    continue;
                }

                for(let betInfo of betSet){
                    if(user.uid != uniLib.NetMgr.UID){
                        betInfo.betCurPoint = 0;
                    }

                    //更新棋子下注点数显示
                    updateNum(betInfo.betCurPoint, betInfo.betTotalPoint ,betInfo.betChessId);
                    if(!Object.keys(betInfo.betPoint).length){
                        continue;
                    }

                    //刷新筹码
                    for (let betPoint of betInfo.betPoint){
                        let chip = showChips(betPoint, betInfo.betChessId, seatId);

                        if(!this._chipFlyArr[betInfo.betChessId]) {
                            this._chipFlyArr[betInfo.betChessId] = [];
                        }

                        this._chipFlyArr[betInfo.betChessId].push(chip);
                    }
                }

            }

        }

        //判断当前玩家有没有压中庄家藏子
        private isWin(){
            let mySeatId = RoomInfo.getInstance().getSeatIdByUserId(uniLib.NetMgr.UID);
            if(this._chipFlyArr[RoomInfo.getInstance().hideChessId] &&
                this._chipFlyArr[RoomInfo.getInstance().hideChessId].length
            ){
                for(let chip of this._chipFlyArr[RoomInfo.getInstance().hideChessId]){
                    if(chip.name.split('_')[0] == mySeatId.toString()){
                        return true;
                    }
                }
            }

            return false;

        }

        public destroy(){
            super.destroy();
            this._chip_hide_1.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_2.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_3.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_4.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);
            this._chip_hide_5.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.uiHandle, this, false);

            // this._continue_chip_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.continue, this, false);

            for(let betChess of this._betChessArr){

                if(!betChess){
                    continue;
                }

                betChess.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.betChessHandle, this, false);
                betChess.removeEventListener(UIEventConsts.CHESS_TWINKLE_END, this.twinkleEnd, this, false);

                betChess.destroy();
            }

            this._betChessArr = null;

            for(let realChip of this._chipRealArr){
                realChip.removeEventListener(UIEventConsts.SELECT_CHIP, this.onSelectChip, this);
            }
            this._chipRealArr = null;

            if(this._chipFlyTimerArr.length){
                for (let timer of this._chipFlyTimerArr){
                    egret.clearTimeout(timer);
                }
            }

            egret.localStorage.removeItem('selectedBetPoint');

            if(this.realHeadImg){
                this.realHeadImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showMyUserInfo, this, false);
                uniLib.DisplayUtils.removeFromParent(this.realHeadImg);
                this.realHeadImg = null;
            }

            this._bet_panel_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBetPanelBtn, this, false);

        }

        //开启下注区域
        public enableBetChess(){

            for (let betChess of this._betChessArr){
                if(!betChess){
                    continue;
                }

                betChess.enableBet();
            }

            //看头不能下注,第一局红帅不能下注
            let hideChessId = RoomInfo.getInstance().hideChessId;
            if(!hideChessId){
                hideChessId = 7;
            }

            this._betChessArr[hideChessId].disableBet();

        }

        // //开启续投按钮
        // public enableContinue(){
        //     if(RoomInfo.getInstance().bankerUid == uniLib.NetMgr.UID){
        //         return;
        //     }
        //
        //     this.hasContinued = false;
        //     this._continue_chip_btn.touchEnabled = true;
        // }

        //最新需求（续投按钮已取消）
        //关闭续投按钮
        // public disableContinue(){
        //     this._continue_chip_btn.touchEnabled = false;
        // }
        //
        // //当局是否已经续投过
        // private hasContinued:boolean = false;
        //
        // //续投按钮点击
        // private continue(){
        //
        //     if(this.hasContinued){
        //         return;
        //     }
        //
        //     this.dispatchEventWith(UIEventConsts.CONTINUE_BET, false);
        //     this.hasContinued = true;
        //     this.disableContinue();
        // }

        //去除选中下注区域
        public disableBetChess(){
            for (let betChess of this._betChessArr){
                if(!betChess){
                    continue;
                }

                betChess.DeActive();
            }
        }

        //下注区域不可点击(包括去除选中)
        public unTouchAbleBetChess(){
            for (let betChess of this._betChessArr){
                if(!betChess){
                    continue;
                }

                betChess.touchEnabled = false;
            }
            this.disableBetChess();
        }

        //重置下注区域(不可点，去除选中，归零下注数，隐藏下注数)
        public resetAllBetChess(){

            for (let betChess of this._betChessArr){
                if(!betChess){
                    continue;
                }

                betChess.reset();
            }

            this.updateBetTotal(0);

        }

        //如果没有选中的筹码，选中第一个筹码
        public defaultSelect(){
            if(!this._selectedBetPoint){

                this.chipActive(this._chipRealArr, this.chip_real_1);

            }
        }

        //恢复之前选中的筹码（用于断线重连）
        public reSelectChip() {

            let betPoint: number = Number(egret.localStorage.getItem('selectedBetPoint'));
            if (!betPoint) {

                this.defaultSelect();
                return;
            }

            if(this._betPointArr.indexOf(betPoint) == -1){
                this.defaultSelect();
                return;
            }

            let index:number = this._betPointArr.indexOf(betPoint);

            this.chipActive(this._chipRealArr, this._chipRealArr[index]);

        }


        //更新下注区域显示
        public updateBetArea(rev:any, isSelf:boolean = true){
            let betChessId: number = rev.betChessId;
            /**
             * 下注点数
             */
            let betPoint: number = rev.betPoint;
            /**
             * 玩家在该棋子总点数
             */
            let betCurPoint: number = rev.betCurPoint;
            /**
             * 该棋子总点数
             */
            let betTotalPoint: number = rev.betTotalPoint;

            //更新象棋区数字
            let betChess = this._betChessArr[betChessId];
            betChess.updatePoints(betCurPoint, betTotalPoint);
        }

        //重置
        public resetAll(){

            this.resetAllBetChess();
            // this.disableContinue();
            for (let i=0; i < this._chipRealArr.length; i++){
                this._chipRealArr[i].clearChip();
                this._chipRealArr[i].removeEventListener(UIEventConsts.SELECT_CHIP, this.onSelectChip, this);
            }
            this._selectedBetPoint = null;


            if(this._chipFlyArr.length){
                for(let chipArr of this._chipFlyArr){
                    if(!chipArr){
                        continue;
                    }

                    for(let chip of chipArr){
                        egret.Tween.removeTweens(chip);
                        uniLib.DisplayUtils.removeFromParent(chip);
                    }
                }
            }

            this._chipFlyArr = [];

            if(this._chipFlyTimerArr.length){
                for(let timer of this._chipFlyTimerArr){
                    egret.clearTimeout(timer);
                }
            }

            this._chipFlyTimerArr = [];

            if(this.realHeadImg){
                this.realHeadImg.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showMyUserInfo, this, false);
                uniLib.DisplayUtils.removeFromParent(this.realHeadImg);
                this.realHeadImg = null;
            }

        }



    }
}