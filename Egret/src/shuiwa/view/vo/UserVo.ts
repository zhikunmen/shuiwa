namespace SWGAME{
    export class UserVo{
        constructor(user:Cmd.SWUserBaseInfo){
            this._uid = user.uid;
            this._headUrl = user.headUrl;
            //钻石
            this._diamond = user.diamond;

            this._nickName = user.nickName;
            this._points = user.points;
            //金币
            this._chips = user.chips;

            this.seatId = user.seatId;

            //设置性别
            if(user.gender == "男"){
                this._gender = 0;
            }else{
                this._gender = 1;
            }
        }

        private _uid:number;
        private _headUrl:string;
        private _nickName:string;
        private _points:number;
        private _diamond:number;
        private _chips:number;
        public seatId:number;

        private _gender:number;

        //玩家下注信息详情:数据格式---[chessId]=每个chessId累计下注数
        public betInfo:number[] = [];

        //每局用户累加得分
        public score:number = 0;

        //下注阶段玩家因下筹码临时减掉的总货币数
        public tmpBetReducePoint = 0;

        public get uid(){
            return this._uid;
        }

        public get headUrl(){
            return this._headUrl;
        }

        public get diamond(){
            return this._diamond;
        }

        public set diamond(diamond:number){
            this._diamond = diamond;
        }

        public get nickName(){
            return this._nickName;
        }

        public get points(){
            return this._points;
        }

        public set points(point:number){
            this._points = point;
        }

        public get chips(){
            return this._chips;
        }

        public set chips(chips:number){
            this._chips = chips;
        }

        public getGender(){
            return this._gender;
        }

        public updateBetInfo(betPoint:number, chessId:number){
            if(!this.betInfo[chessId]){
                this.betInfo[chessId] = 0;
            }

            this.betInfo[chessId] += betPoint;
        }
    }
}