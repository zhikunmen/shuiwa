namespace SWGAME{
    export class GameVc extends BaseVc implements ScreenChangeObserver{
        constructor(){
            super();
            this.skinName = sw_GameVc;
            ScreenAdaptMgr.getInstance().registerObserver(this);
        }

        //skin中的属性
        private _bg:eui.Image;

        //右上角房号id显示
        private _room_id_txt:eui.Label;
        //右上下注上限显示
        private _up_limit_txt:eui.Label;
        //右上角庄家还剩几局显示
        private _bankerLeftRoundTxt:eui.Label;

        //上5局藏子象棋的显示
        private chess_1:eui.Image;
        private chess_2:eui.Image;
        private chess_3:eui.Image;
        private chess_4:eui.Image;
        private chess_5:eui.Image;
        private chessHideArr:eui.Image[];

        protected initUI(){
            this._bg.name = "_bg";

            this.chessHideArr = [
                this.chess_1,this.chess_2,this.chess_3,this.chess_4,this.chess_5
            ];

            //清除皮肤设计加载的资源
            for(let chess of this.chessHideArr){
                chess.texture = null;
            }

            this.stageSizeChange();

        }

        //更新房间信息显示
        public updateRoomInfoText(rev:Cmd.SWRoomInfo){
            this._room_id_txt.text = `房号：${rev.roomId}`;
            this._up_limit_txt.text = `上限：${rev.betLimit}`;
            this._bankerLeftRoundTxt.text = `还剩${rev.haveRound}局`;
        }

        //更新藏子记录
        public updatePrevHideChess(chessIdArr:number[]){

            //清除藏子记录
            for(let chess of this.chessHideArr){
                chess.texture = null;
            }

            if(!chessIdArr.length){
                return;
            }

            for(let i = 0 ; i < chessIdArr.length; i++){
                let chessId = chessIdArr[i];
                this.chessHideArr[i].texture = GameData.getInstance().getChessBgResByChessId(chessId);
            }
        }

        //更新庄家还剩几局
        public updateBankerRoundLeft(num:number){
            this._bankerLeftRoundTxt.text = `还剩${num}局`;
        }

        //屏幕适配
        public stageSizeChange():void{

            //背景拉伸
            this._bg.width = ScreenAdaptMgr.getInstance().stageWidth;
            this._bg.height = ScreenAdaptMgr.getInstance().stageHeight;

            //计算背景offset
            if(ScreenAdaptMgr.getInstance().stageWidth > ScreenAdaptMgr.getInstance().defaultWidth){
                //屏幕变细长
                let offsetX = (ScreenAdaptMgr.getInstance().stageWidth - ScreenAdaptMgr.getInstance().defaultWidth) / 2;

                this._bg.anchorOffsetX = offsetX;
            }else{

                //屏幕是标准宽度，或者比标准宽度高
                this._bg.anchorOffsetX = 0;
            }

            //背景更换
            //中间宽度
            let midWidth:number = (PositionData.getInstance().iphonXBgWidth - ScreenAdaptMgr.getInstance().defaultWidth) / 2;

            if(ScreenAdaptMgr.getInstance().stageWidth - ScreenAdaptMgr.getInstance().defaultWidth > midWidth){
                this._bg.texture = RES.getRes(PositionData.getInstance().iphonXBgName);
            }else{
                this._bg.texture = RES.getRes(PositionData.getInstance().normalBgName);
            }

        }

        //显示结算版面
        private _resultPanel:ResultPanel[] = [];
        public showResultPanel(resultData:Cmd.GameRoundResult[]){
            if(!resultData){
                return;
            }

            this._resultPanel.push(new ResultPanel(resultData));

            uniLib.PopUpMgr.addPopUp(this._resultPanel[this._resultPanel.length - 1], null, true, true, 0, uniLib.PopUpEffect.CENTER, 0,0 , uniLib.NetMgr.UID);

        }

        //关闭结算版面
        public closeResultPanel(){
            if(this._resultPanel.length){
                for(let panel of this._resultPanel){
                    panel.onClose();
                }

                this._resultPanel = [];
            }
        }

        public destroy(){
            super.destroy();
        }

    }
}