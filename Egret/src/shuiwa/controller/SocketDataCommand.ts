namespace Cmd {



    export function gameDispatch(cmd: string, obj?: any, type?: string): void {
        let facade: SWGAME.AppFacade = SWGAME.AppFacade.getInstance();
        facade.sendNotification(cmd, obj, type);
    }

    export function OnSWEnterRoomCmd_S(rev:SWEnterRoomCmd_S){
        uniLib.UIMgr.instance.hideLoading();

        //当压后台重进时，重置房间数据
        //重置房间数据
        SWGAME.RoomInfo.getInstance().resetRoomAll();

        //重置所有动画/筹码/定时任务
        gameDispatch(SWGAME.AppFacadeConst.RESET_ROOM_ENTER);

        if(rev.resultCode){
            console.error(rev);
            console.warn(`OnSWEnterRoomCmd_S:房间进入失败`);
            //退出游戏
            gameDispatch(SWGAME.AppFacadeConst.EXIT_GAME);
            return;
        }

        let roomInfo:SWRoomInfo = rev.roomInfo;

        //本地测试构造底分,定义金币场/钻石场
        if(DEBUG){
            roomInfo.basePoint = 10;
            roomInfo.roomType = 1;
        }

        SWGAME.RoomInfo.getInstance().setData(roomInfo);
        uniLib.UserInfo.uid = uniLib.NetMgr.UID;

        //如果有庄家信息，更新
        if(rev.bankerId){
            SWGAME.RoomInfo.getInstance().bankerUid = rev.bankerId;
            SWGAME.RoomInfo.getInstance().bankerSeatId = SWGAME.RoomInfo.getInstance().getSeatIdByUserId(rev.bankerId);
        }

        //设置对局信息
        SWGAME.RoomInfo.getInstance().setRoundInfo(rev.roundInfo);

        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = rev.roundInfo.gameStatus;

        //更新时间信息
        SWGAME.GameData.getInstance().initTime(rev.tableRoomConfig);

        //更新成绩(玩家本人)
        if(rev.roomPoint){
            SWGAME.RoomInfo.getInstance().getMyUserInfo().score = rev.roomPoint;
        }

        gameDispatch(SWGAME.AppFacadeConst.USER_ENTER_ROOM, rev);


        //断线重连/中途加入 Start
        if(rev.roundInfo.gameStatus != Cmd.GameStatus.Status_Ready){
            let userRoundInfo:UserRoundInfo[] = rev.roundInfo.userRoundInfo;
            let roomRoundInfo:Cmd.RoomRoundInfo = rev.roundInfo.roomRoundInfo;
            //更新玩家加入状态
            SWGAME.RoomInfo.getInstance().enterType = rev.enterType;
            SWGAME.RoomInfo.getInstance().curOperateTime = rev.roundInfo.operateTime;

            //更新等待时间数据
            if(SWGAME.GameData.getInstance().timeTable[rev.roundInfo.gameStatus]){
                SWGAME.GameData.getInstance().timeTable[rev.roundInfo.gameStatus] = rev.roundInfo.operateTime;
            }


            //更新抢庄玩家
            if (roomRoundInfo && Object.keys(roomRoundInfo.getBankerId).length){
                for(let uid of roomRoundInfo.getBankerId){
                    SWGAME.RoomInfo.getInstance().addGrabBankerUid(uid);
                }
            }

            switch(rev.roundInfo.gameStatus){
                //次段不需要，做个记录
                case Cmd.GameStatus.Status_Banker:
                    //中途加入和已操作(抢/不抢)庄不弹抢庄面版(服务器控制)

                    //抢庄动画效果需要所有点抢庄玩家列表(协议未定)


                    break;
                case Cmd.GameStatus.Status_HindCard:
                    //OK

                    break;

                case Cmd.GameStatus.Status_Bet:
                    //更新玩家下注数据
                    if(rev.roundInfo && rev.roundInfo.userRoundInfo &&Object.keys(rev.roundInfo.userRoundInfo).length){
                      for(let userRoundInfo of rev.roundInfo.userRoundInfo){
                          if(userRoundInfo.betSet && Object.keys(userRoundInfo.betSet).length){
                              let userVo = SWGAME.RoomInfo.getInstance().getUserVoByUid(userRoundInfo.uid);
                              for(let betSet of userRoundInfo.betSet){
                                  for(let betPoint of betSet.betPoint){
                                      userVo.tmpBetReducePoint += betPoint;
                                      userVo.updateBetInfo(betPoint, betSet.betChessId);
                                  }
                              }
                          }
                      }

                    }

                    break;

                case Cmd.GameStatus.Status_RoundEnd:


                    break;
            }

            if(rev.roundInfo.gameStatus == GameStatus.Status_LeisureTime){
                //空闲阶段强行纠错
                rev.enterType = SWGAME.GameEnum.EnterType.NormalEnter;
            }

            gameDispatch(SWGAME.AppFacadeConst.RECONNECT, rev.roundInfo);

            if(rev.roundInfo.operateTime){
                //启动计时
                gameDispatch(SWGAME.AppFacadeConst.TIMER_START, rev.roundInfo.operateTime)
            }

            gameDispatch(SWGAME.AppFacadeConst.SHOW_STATUS);

        }

        //断线重连/中途加入 End
    }

    export function OnSWLeaveRoomCmd_S(rev: Cmd.SWLeaveRoomCmd_S) {

        if (rev.resultCode == 0) {
            gameDispatch(SWGAME.AppFacadeConst.EXIT_GAME);
        } else {
        // SGGAME.GameInfo.manage.showMildWarnShow(rev.dec);
                switch(rev.resultCode){
                case 1:
                    uniLib.TipsUtils.showTipsDownToUp("已经开局，不能离开房间");
                    break;
                case 2:
                    uniLib.TipsUtils.showTipsDownToUp("庄家不能离开房间");
                    break;
                case 3:
                    uniLib.TipsUtils.showTipsDownToUp("抢过庄，本局不能离开房间");
                    break;
            }

        }

    }

    export function OnSWEnterRoomCmd_Brd(rev: Cmd.SWEnterRoomCmd_Brd){
        let userInfo:SWUserBaseInfo = rev.userInfo;

        //自己的Brd不刷新
        if(userInfo.uid == uniLib.NetMgr.UID){
            return;
        }

        //已存在的玩家不刷新
        if(SWGAME.RoomInfo.getInstance().getUserVoByUid(userInfo.uid)){
            return;
        }

        SWGAME.RoomInfo.getInstance().addUser(userInfo);

        gameDispatch(SWGAME.AppFacadeConst.PLAYER_ENTER_ROOM, userInfo);

    }

    export function OnSWLeaveRoomCmd_Brd(rev: SWLeaveRoomCmd_Brd){
        if(rev.state){
            return;
        }

        if(rev.userId == uniLib.NetMgr.UID){
            gameDispatch(SWGAME.AppFacadeConst.EXIT_GAME);
            return;
        }

        gameDispatch(SWGAME.AppFacadeConst.PLAYER_LEFT, rev.userId);

        if(!SWGAME.RoomInfo.getInstance().removeUser(rev.userId)){
            return;
        }
        //如果房间只剩一个人，重置房间数据
        let res:boolean = SWGAME.RoomInfo.getInstance().resetRoomAlone();

        if(res){
            //重置房间
            gameDispatch(SWGAME.AppFacadeConst.RESET_ROOM_ONE_PLAYER);
            gameDispatch(SWGAME.AppFacadeConst.SHOW_TIP);
        }
    }

    //抢庄开始
    export function OnSWBankerStartCmd_Brd(rev:SWBankerStartCmd_Brd){

        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = GameStatus.Status_Banker;

        //更新阶段时间
        SWGAME.GameData.getInstance().updateWaitTimeByStatus(GameStatus.Status_Banker,rev.bankerTimeout);

        //重置抢庄玩家数组
        SWGAME.RoomInfo.getInstance().resetGrabBankerSeatIdArr();

        gameDispatch(SWGAME.AppFacadeConst.BANKER_GRAB_BEGIN, rev);

        if(!rev.bankerTimeout){
            throw new Error("SWBankerStartCmd_Brd,没有收到倒计时字段bankerTimeout");
        }

        //开始倒计时显示
        gameDispatch(SWGAME.AppFacadeConst.TIMER_START, rev.bankerTimeout);
        //显示游戏状态
        gameDispatch(SWGAME.AppFacadeConst.SHOW_STATUS);

    }

    //抢庄操作确认
    export function OnSWBankerCmd_S(rev:SWBankerCmd_S){
        if(rev.resultCode == 0){
            //操作成功
            gameDispatch(SWGAME.AppFacadeConst.BANKER_GRAB_CONFIRM);
        }else{
            //钱不够等其他情况
            switch(rev.resultCode){
                case 1:
                    //不在游戏中不能抢庄
                    uniLib.TipsUtils.showTipsDownToUp("不在游戏中，不能抢庄");
                    break;
                case 2:
                    //已经抢庄
                    uniLib.TipsUtils.showTipsDownToUp("已经抢庄");
                    break;
                case 3:
                    let unit:string;
                    if(SWGAME.RoomInfo.getInstance().roomType == 1){
                        unit = "金豆";
                    }else{
                        unit = "钻石";
                    }

                    //货币不够，不能抢庄
                    uniLib.TipsUtils.showTipsDownToUp(`需要${rev.minCarry}${unit}才可抢庄，请补充${unit}`);
                    //(新需求，不弹商城面版
                    // uniLib.Global.dispatchEvent(chessCommonLib.CommonModelEvent.SHOP);
                    //打开充值以后，关闭抢庄面版
                    gameDispatch(SWGAME.AppFacadeConst.CLOSE_BANKER_GRAB);

            }
        }
    }

    //其他玩家/自己抢庄Brd
    export function OnSWBankerCmd_Brd(rev:SWBankerCmd_Brd){

        if(rev.bBanker){
            SWGAME.RoomInfo.getInstance().addGrabBankerUid(rev.uid);
            gameDispatch(SWGAME.AppFacadeConst.BANKER_GRAB_ADD);
        }

        gameDispatch(SWGAME.AppFacadeConst.BANKER_GRAB_BRD, rev);

    }

    //抢庄结束
    export function OnSWBankerEndCmd_Brd(rev:SWBankerEndCmd_Brd){
        if(!rev.uid){

            SWGAME.RoomInfo.getInstance().bankerUid = null;
            SWGAME.RoomInfo.getInstance().bankerSeatId = null;
            SWGAME.RoomInfo.getInstance().rebanker = true;

        }else{

            SWGAME.RoomInfo.getInstance().bankerUid = rev.uid;
            SWGAME.RoomInfo.getInstance().bankerSeatId = SWGAME.RoomInfo.getInstance().getSeatIdByUserId(rev.uid);
            SWGAME.RoomInfo.getInstance().bankerLeftRound = SWGAME.GameData.getInstance().BankDefaultRoundNum;
            SWGAME.RoomInfo.getInstance().rebanker = false;

        }

        gameDispatch(SWGAME.AppFacadeConst.BANKER_GRAB_END);

        //关闭游戏状态显示
        gameDispatch(SWGAME.AppFacadeConst.UN_SHOW_STATUS);
    }

    //藏子开始
    export function OnSWHideCardStartCmd_Brd(rev:SWHideCardStartCmd_Brd){

        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = GameStatus.Status_HindCard;

        //更新阶段时间
        SWGAME.GameData.getInstance().updateWaitTimeByStatus(GameStatus.Status_HindCard,rev.hideCardTimeout);

        if(!rev.hideCardTimeout){
            throw new Error("hideCardTimeout不正确");
        }

        SWGAME.RoomInfo.getInstance().hideCardTimeout = rev.hideCardTimeout;

        gameDispatch(SWGAME.AppFacadeConst.HIDE_CHESS_START);

        gameDispatch(SWGAME.AppFacadeConst.TIMER_START, rev.hideCardTimeout);
        //显示游戏状态
        gameDispatch(SWGAME.AppFacadeConst.SHOW_STATUS);
    }

    //藏子服务器返回
    export function OnSWHideCardCmd_S(rev:SWHideCardCmd_S) {

        if (rev.resultCode == 0) {
            gameDispatch(SWGAME.AppFacadeConst.HIDE_CHESS_SUCCESS);

        }else{

            console.error('藏子失败');
        }

    }

    //藏子成功广播
    export function OnSWHideCardCmd_Brd(rev:SWHideCardCmd_Brd) {

        gameDispatch(SWGAME.AppFacadeConst.HIDE_CHESS_SUCCESS_BRD);
    }

    //下注开始
    export function OnSWBetStartCmd_Brd(rev:SWBetStartCmd_Brd){

        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = GameStatus.Status_Bet;

        //更新阶段时间
        SWGAME.GameData.getInstance().updateWaitTimeByStatus(GameStatus.Status_Bet,rev.betTimeout);

        gameDispatch(SWGAME.AppFacadeConst.BET_START);

        //开始倒计时显示
        gameDispatch(SWGAME.AppFacadeConst.TIMER_START, rev.betTimeout);
        //显示游戏状态
        gameDispatch(SWGAME.AppFacadeConst.SHOW_STATUS);
    }

    //下注结果
    export function OnSWBetCmd_S(rev:SWBetCmd_S) {
        if(rev.resultCode != 0){

            switch(rev.resultCode){
                case 1:
                    uniLib.TipsUtils.showTipsDownToUp("您的筹码不足，请及时补充！");
                    return;
                case 2:
                    uniLib.TipsUtils.showTipsDownToUp("您的押注已达上限！");
                    return;
                case 3:
                    uniLib.TipsUtils.showTipsDownToUp("筹码不足!");
                    return;
                default:
                    return;
            }


        }



        uniLib.SoundMgr.instance.playSound(SWGAME.SoundConsts.DO_BET);
        gameDispatch(SWGAME.AppFacadeConst.BET_SUCCESS_MYSELF, rev);
    }

    //下注广播
    export function OnSWBetCmd_Brd(rev:SWBetCmd_Brd){
        //下注阶段减少玩家货币显示逻辑（包括自己）
        let userVo:SWGAME.UserVo = SWGAME.RoomInfo.getInstance().getUserVoByUid(rev.uid);

        if(userVo) {
            userVo.tmpBetReducePoint += rev.betPoint;

            if(rev.uid == uniLib.NetMgr.UID){
                //更新自己下注详情数据
                userVo.updateBetInfo(rev.betPoint, rev.betChessId);
            }

        }else{
            console.error(`用户${rev.uid}:不在房间中`);
        }



        //自己的下注在_S中处理
        // if(rev.uid == uniLib.NetMgr.UID){
        //     return;
        // }

        uniLib.SoundMgr.instance.playSound(SWGAME.SoundConsts.DO_BET);
        gameDispatch(SWGAME.AppFacadeConst.BET_SUCCESS_BRD, rev);
    }

    //开子阶段
    export function OnSWOpenCardCmd_Brd(rev:SWOpenCardCmd_Brd){

        SWGAME.RoomInfo.getInstance().hideChessId = rev.hideChessId;

        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = GameStatus.Status_OpenCard;


        //清0临时下注减分
        SWGAME.RoomInfo.getInstance().clearTmpBetReduce();

        //清零玩家下注累计数据
        SWGAME.RoomInfo.getInstance().getMyUserInfo().betInfo = [];

        //更新藏子记录数据
        //把本局的开子加上
        //判断是否为空，包括空对象
        if(!Object.keys(rev.hideCards).length){
            rev.hideCards = [];
        }

        rev.hideCards.unshift(rev.hideChessId);

        if(rev.hideCards.length < 5){
            //不足5个补红帅
            rev.hideCards.push(7);
        }

        //只存5个
        if(rev.hideCards.length > 5){
            rev.hideCards = rev.hideCards.slice(0, 5);
        }

        SWGAME.RoomInfo.getInstance().hideChessIdLog = rev.hideCards;

        gameDispatch(SWGAME.AppFacadeConst.OPEN_CHESS);
        //显示游戏状态
        gameDispatch(SWGAME.AppFacadeConst.SHOW_STATUS);
    }


    //结算
    export function OnSWGameRoundEndCmd_Brd(rev:SWGameRoundEndCmd_Brd){
        let results:GameRoundResult[] = rev.userResult;
        //存储结果数据
        SWGAME.RoomInfo.getInstance().userResult = results;

        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = GameStatus.Status_RoundEnd;

        //更新RoomInfo中userVo数据

        for(let result of results) {

            let userVo:SWGAME.UserVo = SWGAME.RoomInfo.getInstance().getUserVoByUid(result.uid);
            if(!userVo){
                //如果没有userVo，说明该用户已经退出房间,抛出个warn
                console.warn(`${result.uid}:已经不在房间`);
                continue;
            }

            if(SWGAME.RoomInfo.getInstance().roomType == 1){
                //金币场
                userVo.chips = result.userPoint;

            }else{
                //钻石场
                userVo.diamond = result.userPoint;
            }
            userVo.score = result.roomPoint;
        }


        // let delayTime:number = SWGAME.GameData.getInstance().resultDelayTime;

        //开始倒计时显示
        gameDispatch(SWGAME.AppFacadeConst.TIMER_START, rev.roundEndTime);

        // gameDispatch(SWGAME.AppFacadeConst.ROUND_END ,rev);

        //钱不够强制下庄逻辑(新需求，放到开始阶段gameStart协议里)
        if(rev.isDownBanker){
            gameDispatch(SWGAME.AppFacadeConst.DOWN_BANKER);
            //
            SWGAME.RoomInfo.getInstance().bankerUid = null;
            SWGAME.RoomInfo.getInstance().bankerSeatId = null;
        }

    }

    //重新开局
    export function OnSWGameStartCmd_Brd(rev:SWGameStartCmd_Brd){
        //庄家UID
        if(!rev.uid){
            //清除庄家相关数据
            SWGAME.RoomInfo.getInstance().bankerUid = null;
            SWGAME.RoomInfo.getInstance().bankerSeatId = null;

        }

        SWGAME.RoomInfo.getInstance().enterType = SWGAME.GameEnum.EnterType.NormalEnter;

        SWGAME.RoomInfo.getInstance().bankerLeftRound = rev.haveRound;

        //清除所有弹窗
        uniLib.DisplayUtils.removeAllChildren(SWGAME.GameInfo.topLayer);

        gameDispatch(SWGAME.AppFacadeConst.NEW_ROUND_START);

        //清除游戏阶段显示
        gameDispatch(SWGAME.AppFacadeConst.UN_SHOW_STATUS);

    }

    //进入游戏进入空闲阶段
    export function OnSWGameReadyCmd_Brd(rev:SWGameReadyCmd_Brd){
        //更新游戏状态
        SWGAME.RoomInfo.getInstance().gameStatus = Cmd.GameStatus.Status_LeisureTime;
        SWGAME.RoomInfo.getInstance().enterType = SWGAME.GameEnum.EnterType.NormalEnter;

        gameDispatch(SWGAME.AppFacadeConst.FREE_TIME);
        if(rev.readyTimeout){
            //开始倒计时显示
            gameDispatch(SWGAME.AppFacadeConst.TIMER_START, rev.readyTimeout);
        }

        //清除游戏阶段显示
        gameDispatch(SWGAME.AppFacadeConst.SHOW_STATUS);
    }

    //聊天广播
    export function OnCommonChatCmd_Brd(rev:CommonChatCmd_Brd){

        gameDispatch(SWGAME.AppFacadeConst.NOTIFY_COMMON_CHAT,rev);
    }

    //送礼广播
    export function OnSWSendGiftCmd_Brd(rev:SWSendGiftCmd_Brd){
        let giftInfo:SWGiftsInfo = rev.gift;

        //不群发礼物
        if(!giftInfo.toUid){
            return;
        }
        gameDispatch(SWGAME.AppFacadeConst.SEND_GIFTS_NOTICE, giftInfo);
    }

    //扣服务费
    export function OnSWReduceServerCostCmd_Brd(rev:SWReduceServerCostCmd_Brd){

        //更新玩家数据
        let userVo:SWGAME.UserVo = SWGAME.RoomInfo.getInstance().getUserVoByUid(rev.uid);

        //金币场更新金币钻石场更钻石
        let unit:string;
        if(SWGAME.RoomInfo.getInstance().roomType == 1){
            userVo.chips = rev.userPoint;
            unit = '金豆';
        }else{
            userVo.diamond = rev.userPoint;
            unit = "钻石";
        }

        //显示提示信息
        if(rev.uid == uniLib.NetMgr.UID) {
            chessCommonLib.PublicTipMgr.getInstance().showTipsShow(`本局收取服务费${rev.cost}${unit}，祝您好运`);
        }

        //更新用户头像区金币/钻石显示
        gameDispatch(SWGAME.AppFacadeConst.SERVICE_COST, rev)

    }

    //用户金币/钻石变化(快速充值)
    export function OnSWUpdataUserPointCmd_Brd(rev:SWUpdataUserPointCmd_Brd){
        //数据层面
        let userVo:SWGAME.UserVo = SWGAME.RoomInfo.getInstance().getUserVoByUid(rev.uid);
        if(!userVo){
            console.error(`用户:${rev.uid}不在房间中`);
            return;
        }

        userVo.chips = rev.chips;
        userVo.diamond = rev.diamond;

        //更新显示
        gameDispatch(SWGAME.AppFacadeConst.UPDATE_USER_POINT, rev);
    }

    //下注之前，非庄家可以退出，如果退出只剩庄一个人重置房间
    export function OnSWResetRoomStateCmd_Brd(){
        //如果房间只剩一个人，重置房间数据
        let res:boolean = SWGAME.RoomInfo.getInstance().resetRoomAlone(true);

        if(res){
            //重置房间
            gameDispatch(SWGAME.AppFacadeConst.RESET_ROOM_ONE_PLAYER);

            //小于5人显示提示
            if(SWGAME.RoomInfo.getInstance().userList.length < 5){
                gameDispatch(SWGAME.AppFacadeConst.SHOW_TIP);
            }
        }
    }

}
