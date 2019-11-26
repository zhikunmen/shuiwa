namespace SWGAME {
	//游戏信息类
	import SWTableRoomConfig = Cmd.SWTableRoomConfig;

    export class GameData {
		private static instance: GameData;

        public static getInstance(): GameData {
            if (!this.instance) {
                this.instance = new GameData();
            }
            return this.instance;
        }

        public constructor() {

            //各阶段等待时间默认值
            this.timeTable[Cmd.GameStatus.Status_Ready] = 0;
            this.timeTable[Cmd.GameStatus.Status_Banker] = 10000;
            this.timeTable[Cmd.GameStatus.Status_HindCard] = 10000;
            this.timeTable[Cmd.GameStatus.Status_Bet] = 10000;
            this.timeTable[Cmd.GameStatus.Status_OpenCard] = 5000;

            //各阶段显示名称
            this.statusNameMap.set(Cmd.GameStatus.Status_Banker, "抢庄阶段");
            this.statusNameMap.set(Cmd.GameStatus.Status_HindCard, "藏子阶段");
            this.statusNameMap.set(Cmd.GameStatus.Status_Bet, "下注阶段");
            this.statusNameMap.set(Cmd.GameStatus.Status_OpenCard, "开子阶段");
            this.statusNameMap.set(Cmd.GameStatus.Status_RoundEnd, "结算阶段");
            this.statusNameMap.set(Cmd.GameStatus.Status_LeisureTime, "空闲阶段");
        }


		public statusNameMap:Map<Cmd.GameStatus, string> = new Map();

		public initTime(table:SWTableRoomConfig){
        	this.timeTable[Cmd.GameStatus.Status_Banker] = table.bankerTime;
        	this.timeTable[Cmd.GameStatus.Status_HindCard] = table.hideTime;
        	this.timeTable[Cmd.GameStatus.Status_Bet] = table.betTime;
		}

		public ShortTalkArr = [
            "又断线了，网络怎么这么差啊！",
            "各位，真不好意思，我要离开一会",
            "你的牌打得也忒好了！",
            "下次咱们再玩吧！",
            "不要走，决战到天亮！",
            "快点吧，都等得我花都谢了！"
		];

		//根据ChessID获取下注区域象棋背景资源名
		public getBetChessBgResName(chessId:number){

			if(chessId < 1 || chessId > 12){
				throw new Error('chessId超出范围');
			}

            return `sw_chessBetIcon_${chessId}_png`;
		}

        //根据ChessID获取象棋背景资源
		public getChessBgResByChessId(chessId:number){

            if(chessId < 1 || chessId > 12){
                throw new Error('chessId超出范围');
            }

            let res = RES.getRes(`sw_chess_${chessId}_png`);
            if(!res){
                throw new Error(`象棋资源获取失败!!!:资源名:sw_chess_${chessId}_png`);
			}

			return res;

		}

		//根据分数大小获取筹码图片资源
		public getChipResByPoint(betPoint:number){
			let resName = `sw_chip_${betPoint}_png`;
			let res = RES.getRes(resName);

			if(!res){
                throw new Error(`筹码资源获取失败!!!:资源名:${resName}`);
			}

			return res;
		}


        //开子后结算流程延迟时间(因开子和结算消息是一起发送的) 毫秒
		public resultDelayTime:number = 3500;

		//庄家默认连续坐庄几局(其实是12局，只是第一局就显示11)
		public BankDefaultRoundNum:number = 11;

		//庄家输了赔几倍
		public bankerMulti:number = 9;

		//游戏各阶段等待时间
        public timeTable:number[]= [0];

        //更新游戏各阶段等待时间(ms)
        public updateWaitTimeByStatus(status:Cmd.GameStatus, time:number){
        	this.timeTable[status] = time;
		}

        //获取下局开局等待时间(大致)
		public getNextRoundWaitTime(gameStatus:Cmd.GameStatus){

			return this.timeTable.slice(gameStatus).reduce((total, time)=>{
                return total + time;
			},0);

		}

        public destroy(): void {
			GameData.instance = null;
		}



	}
}


