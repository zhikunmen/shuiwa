namespace SWGAME{
    //本地测试服务器收发消息类
    export class LocalTestCommand{
        constructor(){

        }


        public runTest(){
            // egret.setTimeout(this.testSWHideCardCmd_Brd, this, 5000);

            // egret.setTimeout(this.testSWHideCardStartCmd_Brd, this, 5000);
            // egret.setTimeout(this.testSWHideCardCmd_S, this, 10000);

        }

        public testSWHideCardStartCmd_Brd(){

            //自己是庄
            SWGAME.RoomInfo.getInstance().bankerUid = uniLib.NetMgr.UID;
            SWGAME.RoomInfo.getInstance().bankerSeatId = SWGAME.RoomInfo.getInstance().getSeatIdByUserId(uniLib.NetMgr.UID);

            console.warn("TEST--SWHideCardStartCmd_Brd--begin");
            let rev = new Cmd.SWHideCardStartCmd_Brd();
            rev.hideCardTimeout = 10000;
            Cmd.OnSWHideCardStartCmd_Brd(rev);
        }

        public testSWHideCardCmd_S(){
            console.warn("TEST--SWHideCardCmd_S--begin");
            let rev = new Cmd.SWHideCardCmd_S();
            rev.resultCode = 0;
            Cmd.OnSWHideCardCmd_S(rev);
        }

        public testSWHideCardCmd_Brd(){
            console.warn("TEST--SWHideCardCmd_BrdS--begin");
            let rev = new Cmd.SWHideCardCmd_Brd();
            Cmd.OnSWHideCardCmd_Brd(rev);
        }

    }
}