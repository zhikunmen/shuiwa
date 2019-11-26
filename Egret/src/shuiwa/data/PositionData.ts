namespace SWGAME {
	export class PositionData implements ScreenChangeObserver{
		//18个人的座位
		private static instance: PositionData;

        public static getInstance(): PositionData {
            if (!this.instance) {
                this.instance = new PositionData();
            }
            return this.instance;
        }

        //屏幕适配,更新位置
		public stageSizeChange(){

		}

		//宽屏背景资源名
		public normalBgName = "sw_bg_1_jpg";
        public iphonXBgName = "sw_bg_2_jpg";
		public iphonXBgWidth:number = 1520;

		//每个人头像版面坐标(和皮肤中对应)
		public seatPosArr: Array<egret.Point> = [
			null,
			new egret.Point(865, 539),//1
			new egret.Point(976, 539),//2
			new egret.Point(1085, 488),//3
			new egret.Point(1173, 390),//4
			new egret.Point(1173, 286),//5
			new egret.Point(1173, 180),//6
			new egret.Point(1085, 81),//7
			new egret.Point(960, 18),//8
			new egret.Point(844, 18),//9
			new egret.Point(349, 18),//10
			new egret.Point(234, 18),//11
			new egret.Point(107, 78),//12
			new egret.Point(19, 180),//13
			new egret.Point(19, 282),//14
			new egret.Point(19, 388),//15
			new egret.Point(107, 488),//16
			new egret.Point(222, 539),//17
			new egret.Point(333, 539) //18
		];

		//玩家头像版面宽高
		public seatPlayerSize:any = {
			width: 88,
			height: 100
		};


		//投注象棋图标背景区域起始点/宽/高
        public chessBetIconBg:any = {
        	startPoint: new egret.Point(228,123),
        	width:823,
			height:413
        };

        //投注象棋图标/宽/高
        public chessBetIcon:any = {
            width:193,
            height:127,
		};

        //下注位置(index对应chessId)
		public betChessStartArr: Array<egret.Point> = [
			null,
			new egret.Point(848, 134), //1
			new egret.Point(848, 266), //2
			new egret.Point(848, 400), //3
			new egret.Point(443, 134), //4
			new egret.Point(443, 266), //5
			new egret.Point(443, 400), //6
            new egret.Point(240, 134), //7
            new egret.Point(240, 266), //8
            new egret.Point(240, 400), //9
            new egret.Point(646, 134), //10
            new egret.Point(646, 266), //11
            new egret.Point(646, 400), //12

		];

		//下注象棋区文字背景大小
		private betChessBgSize:any = {
			//上下区域高宽
			height:30
		};

		//飞筹码的筹码大小
		public flyChipSize:number[] = [35,35];

		//骰盅位置
		public shaizhongPos:egret.Point = new egret.Point(1113, 341);

		//看头的位置
		public kantouPos:egret.Point = new egret.Point(639, 59);

		//看头象棋的大小
		public kantouSize:number[] = [90, 90];

        //根据投注的象棋id获取飞筹码区域
        public betArea(chessId):any{

        	//区域点都向内缩小10像素,避免挡住文字

			//飞筹码区域点1
			let point1:egret.Point = new egret.Point(
				this.betChessStartArr[chessId].x + 10,
				this.betChessStartArr[chessId].y + this.betChessBgSize.height + 10
			);

            //飞筹码区域点2
            let point2:egret.Point = new egret.Point(
                this.betChessStartArr[chessId].x + this.chessBetIcon.width - 10,
                this.betChessStartArr[chessId].y + this.chessBetIcon.height  - this.betChessBgSize.height - 10
            );

			return [point1, point2];
        }

        //根据seatId获取飞筹码初始区域
		public getFlyChipInitPoint(seatId):egret.Point{
        	//如果是自己从固定的一个点飞出
			if(seatId == RoomInfo.getInstance().getMyUserInfo().seatId){
				return new egret.Point(660, 620);
			}

			//不是自己从座位头像旁飞出
			let point = new egret.Point();

			switch(seatId){
				case 1:
				case 2:
				case 3:
				case 16:
				case 17:
				case 18:
					point.x = this.seatPosArr[seatId].x + this.seatPlayerSize.width / 2;
					// point.y = this.seatPosArr[seatId].y - this.flyChipSize[1];
					point.y = this.seatPosArr[seatId].y;
					break;
				case 4:
				case 5:
				case 6:
					// point.x = this.seatPosArr[seatId].x - this.flyChipSize[0];
					point.x = this.seatPosArr[seatId].x;
					point.y = this.seatPosArr[seatId].y + this.seatPlayerSize.height / 2;
					break;
				case 7:
				case 8:
				case 9:
				case 10:
				case 11:
				case 12:
                    point.x = this.seatPosArr[seatId].x + this.seatPlayerSize.width / 2;
                    // point.y = this.seatPosArr[seatId].y + this.seatPlayerSize.height + this.flyChipSize[1];
                    point.y = this.seatPosArr[seatId].y + this.seatPlayerSize.height;
					break;

				case 13:
				case 14:
				case 15:
                    // point.x = this.seatPosArr[seatId].x + this.seatPlayerSize.width + this.flyChipSize[0];
                    point.x = this.seatPosArr[seatId].x + this.seatPlayerSize.width;
                    point.y = this.seatPosArr[seatId].y + this.seatPlayerSize.height / 2;
                    break;
			}

			return point;

		}

		//藏子动画时间(龙骨)
		public hideChessAnimationTime = 2500;

		//定庄动画时间
		public bankerIconEffectTime = 1300;

        //抢庄闪烁效果时间
        public grabBankerEffectTime = 1000;

		//下注阶段飞筹码速度
		public flyChipTime:number = 400;

		//结算阶段飞筹码，每组间隔(ms)
		public roundEndFlyChipInterval:number = 50;
		//最大总飞筹码时间
		public roundEndFlyChipMax:number = 3000;

        //结算阶段飞筹码,速度
		public roundEndFlyChipTime:number = 300;

        //游戏状态提示时间
		public popTime:number = 300;
		public outTime:number = 300;
		public stayTime:number = 700;
		//总状态提示时间(前三项的和)
		public totalNotifyTime:number = 1300;

		//聊天表情大小
		public faceSize:number[] = [88, 88];

		//获取聊天表情位置(表情锚点需要居中)
		public getFacePos(seatId:number){
			let point = new egret.Point();

			point.x = this.seatPosArr[seatId].x + this.seatPlayerSize.width / 2;
			point.y = this.seatPosArr[seatId].y + this.seatPlayerSize.width / 2;

			return point;
		}

		//庄家动画缩放
		public bankerAnimationScale:number = 1.2;

		//获取庄家动画位置
		public getBankerAnimationPos(seatId:number): egret.Point{
			let pos:egret.Point = this.seatPosArr[seatId].clone();
			pos.x +=this.seatPlayerSize.width / 2;
			pos.y +=this.seatPlayerSize.height / 2;
			return pos;
		}
	}
}