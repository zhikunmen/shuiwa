namespace SWGAME {
	/**
	 * 房间主要数据
	 */
	export class RoomInfo {

		private static instance: RoomInfo;
        public static getInstance(): RoomInfo {
            if (!this.instance) {
                this.instance = new RoomInfo();
            }
            return this.instance;
        }

		private _roomId: number;
		private _ownweId: number;

		//底分
		private _basePoint: number;

		//下注上限
		public betLimit:number;

		//入场
		public enterPoint:number;

		//离场
		public leavePoint:number;
        //房间类型类型(1金豆房 2钻石房)-芝麻
        // private _gambletype: number;

        //房间类型类型(1金豆房 2钻石房)-芝麻
        private _roomType: number;
        //房间类型类型(1金豆房 2钻石房)-芝麻
        public get roomType(){
        	return this._roomType;
		}


		public bankerSeatId: number = 0;
		public bankerUid:number = 0;
		//是否重新抢庄
		public rebanker:boolean = false;
		//庄家还剩几局
		public bankerLeftRound:number = 0;

		//藏子时限/毫秒
        public hideCardTimeout:number;

        //庄家藏子id
        public hideChessId:number;

        //前五局藏子记录id(包括本局藏子)
		public hideChessIdLog:number[] = [];

		//结算数据
		public userResult:Cmd.GameRoundResult[];


		public video: number;
		public videoUid: number;

		public isStart: boolean = false;

		public userList: Array<UserVo>;

		//断线重连的处理
		//游戏状态
		public gameStatus: number = 0;

		//当前操作剩余时间
		public curOperateTime: number = 0;
		//房间描述

        //记录中途加入玩家的游戏状态
		public enterGameStatus:number;
		//记录当前玩家是不是中途加入
		public enterType:number;
		//是否退出重进（游戏小局结算阶段）
        public hasExit:boolean = false;

		//能下注的分数(转化为筹码)
        private _betPointArr:number[] = [];

        //获取能下注的筹码分数
		public get betPointArr(){
			return this._betPointArr;
		}

        public constructor() {
		}

		public setData(data: Cmd.SWRoomInfo): void {
			this.userList = [];
			this._roomId = data.roomId;
			// this._roomCfg = data.roomCfg;
			this._basePoint = data.basePoint;

			// this._gambletype = data.gambletype;
			this._roomType = data.roomType;

			//下注上限,入场，离场
			this.betLimit = data.betLimit;
			this.enterPoint = data.enterPoint;
			this.leavePoint = data.leavePoint;

			//庄家剩余局数
			this.bankerLeftRound = data.haveRound;

			// this.initRoomProps(data.roomCfg);
			this.initBetPointArr(data.basePoint);
			this.initUserList(data.userInfo);
		}

		//重置房间所有数据
		public resetRoomAll(){

            this.userList = [];
            this._roomId = 0;
            this._basePoint = 0;
            this._roomType = 0;

            //下注上限,入场，离场
            this.betLimit = 0;
            this.enterPoint = 0;
            this.leavePoint = 0;

            //庄家剩余局数
            this.bankerLeftRound = 0;

            this.userList = [];
            this._betPointArr = [];
            this.gameStatus = 0;
            this.bankerSeatId = null;
            this.bankerUid = null;
            this.rebanker = false;
            this.hideChessIdLog = [7];
            this.hideChessId = 7;
            this.userResult = [];
            this.curOperateTime = 0;
            this._grabBankerSeatIdArr = [];

            this.userResult = null;
		}

		public setRoundInfo(roundInfo:Cmd.GameRoundInfo):void{

			if(roundInfo.roomRoundInfo && roundInfo.roomRoundInfo.hideCards && Object.keys(roundInfo.roomRoundInfo.hideCards).length){

                this.hideChessIdLog = roundInfo.roomRoundInfo.hideCards;
                //有对局信息
                if(this.hideChessIdLog.length < 5) {
                    //不足5个，补充成红帅
					this.hideChessIdLog.push(7)
                }

                this.hideChessId = this.hideChessIdLog[0];

			}else{
				//没有对局信息
				this.hideChessIdLog = [7];
				this.hideChessId = 7;
			}
		}

		private initUserList(data: Array<Cmd.SWUserBaseInfo>): void{
			for (var i = 0; i < data.length; i++) {
				let user = data[i];
				let vo = new SWGAME.UserVo(user);

				this.userList.push(vo);
			}
		}

        //根据游戏逻辑，初始化能下注的分数5个
		private initBetPointArr(basePoint:number){

			if(this._betPointArr.length){
				this._betPointArr = [];
			}

			//第一个筹码分等于底注
			this._betPointArr.push(basePoint);
			//之后4个分别为:底注的2,3,4,5倍
			for(let i=0;i < 4; i++){
				let multi:number = i + 2;
				this._betPointArr.push(multi * this._basePoint);
			}
		}

		//参与抢庄的玩家seatId
		private _grabBankerSeatIdArr:number[] = [];

		public getGrabBankerSeatIdArr():number[]{
			return this._grabBankerSeatIdArr;
		}

		//参与抢庄的玩家SeatId数组
		public resetGrabBankerSeatIdArr():void{
            this._grabBankerSeatIdArr = [];
		}

        //添加参与抢庄的玩家uid
		public addGrabBankerUid(uid:number):void{
			let seatId = this.getSeatIdByUserId(uid);

			if(this._grabBankerSeatIdArr.indexOf(seatId) != -1){
				return;
			}

            this._grabBankerSeatIdArr.push(seatId);
			this._grabBankerSeatIdArr.sort((a,b)=>{
				return a - b;
			});
		}


		//获取底注
		public getBasePoint(){
			return this._basePoint;
		}

		public getSeatIdByUserId(userId: number): number {
			var userVo = this.getUserVoByUid(userId);
			if (userVo) {
				let seatId = userVo.seatId;
				return seatId;
			}
			return null;
		}
		public getUserVoBySeatId(seatId: number): UserVo {
			if (!this.userList) {
				return null;
			}
			for (let i = 0; i < this.userList.length; i++) {
				if (this.userList[i].seatId == seatId) {
					return this.userList[i];
				}
			}
			return null;
		}
		public addUser(userInfo: Cmd.SWUserBaseInfo): void {
			let vo:UserVo = new UserVo(userInfo);

			for (let i = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid == vo.uid) {
					this.userList[i] = vo;
					return;
				}
			}
			this.userList.push(vo);
		}
		public destroy(): void {
		}
		public getUserVoByUid(uid: any): UserVo {
			for (let i = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid == uid) {
					return this.userList[i];
				}
			}

			return null;
		}


		public removeUser(uid): boolean {
			for (let i = 0; i < this.userList.length; i++) {
				if (this.userList[i].uid == uid) {
					this.userList.splice(i, 1);
					return true;
				}
			}

			return false;

		}

		//清零临时下注减分
		public clearTmpBetReduce(){
			for (let userVo of this.userList){
				userVo.tmpBetReducePoint = 0;
			}
		}

		public getPlayTypeByList(): any {

		}

		//玩家自己的用户信息
		public getMyUserInfo():UserVo{
			return this.getUserVoByUid(uniLib.NetMgr.UID);
		}

		//判断玩家是中途加入，还是断线重连,中途加入返回true,否则返回false
		public isHalfWayEnter(){
			// let uid = uniLib.UserInfo.uid;
			// if(!this.curPlayers.length){
			// 	return false;
			// }
            //
			// if(this.curPlayers.indexOf(uid) == -1){
			// 	return true
			// }
            //
			// return false;
		}

		//如果房间只剩下一个人，重置房间状态
		//force:是否强制重置(不管剩多少人)
		public resetRoomAlone(force?:boolean):boolean{
			if(force || this.userList.length == 1){
				this.bankerUid = null;
				this.bankerSeatId = null;
				this.rebanker = false;
				this.bankerLeftRound = 0;

				this.hideChessId = 7;
				this.hideChessIdLog = [7];

				return true;
			}

			return false;
		}
	}
}

