namespace SWGAME{
    //结算面版
    export class ResultPanel extends eui.Component{

        constructor(resultData:Cmd.GameRoundResult[]) {
            super();
            this.skinName = sw_resultPanel;

            this.resultData = resultData;

        }

        private resultData:Cmd.GameRoundResult[];

        protected createChildren() {
            super.createChildren();
            this.initUI();
        }

        //关闭面版按钮
        private _close_btn:eui.Button;
        //庄家藏的子
        private _hide_chess_img:eui.Image;
        //庄家本局得分
        private _banker_point:eui.Label;
        //玩家本局总得分
        private _my_total_point:eui.Label;

        //玩家本局每个下注棋子得分[1-12]对应chessId
        private _point_1:eui.Label;
        private _point_2:eui.Label;
        private _point_3:eui.Label;
        private _point_4:eui.Label;
        private _point_5:eui.Label;
        private _point_6:eui.Label;
        private _point_7:eui.Label;
        private _point_8:eui.Label;
        private _point_9:eui.Label;
        private _point_10:eui.Label;
        private _point_11:eui.Label;
        private _point_12:eui.Label;
        private _pointArr:eui.Label[] = [];

        //本局排行榜DataGroup
        private _rankDataGroup:eui.DataGroup;

        protected initUI(){

            this._rankDataGroup.itemRenderer = ResultPanelRankItem;

            this._pointArr = [
                null,
                this._point_1, this._point_2, this._point_3, this._point_4, this._point_5,
                this._point_6, this._point_7, this._point_8, this._point_9, this._point_10,
                this._point_11, this._point_12
            ];

            //数据清0
            for(let pointLabel of this._pointArr){
                if(!pointLabel){
                    continue;
                }

                pointLabel.text = '0';
            }
            this._my_total_point.text = '0';
            this._banker_point.text = '0';


            //初始化
            let hideChessId = RoomInfo.getInstance().hideChessId;
            this._hide_chess_img.texture = GameData.getInstance().getChessBgResByChessId(hideChessId);

            let sourceArr:ResultPanelRankItemData[] = [];

            for(let playerData of this.resultData){

                //玩家自己
                if(playerData.uid == uniLib.NetMgr.UID){
                    this._my_total_point.text = EffectFactory.getInstance().handleNum(playerData.totalPoint, 2, true);

                    if(playerData.unitPoint && Object.keys(playerData.unitPoint).length != 0) {

                        playerData.unitPoint.forEach((chessResult: Cmd.GameUnitResult) => {
                            this._pointArr[chessResult.chessId].text = EffectFactory.getInstance().handleNum(chessResult.totalPoint, 2, true);
                        }, this);
                    }

                }

                //庄家
                if(playerData.uid == RoomInfo.getInstance().bankerUid){

                    this._banker_point.text = EffectFactory.getInstance().handleNum(playerData.totalPoint, 2, true);

                }



                //构建数据源
                sourceArr.push(
                    {
                        headUrl:playerData.headurl,
                        nickName:playerData.name,
                        point:playerData.totalPoint.toString()
                    }
                );

            }

            //补齐排名数据(rank)
            sourceArr.sort((a, b)=>{
                return Number(b.point) - Number(a.point);
            });

            sourceArr.map((obj, index)=>{
                obj.rank = (index + 1).toString();

                //因为bitmapFnt的,1,2,3是a,b,c所以做个转换
                switch (obj.rank){
                    case '1':
                        obj.rank = 'a';
                        break;
                    case '2':
                        obj.rank = 'b';
                        break;
                    case '3':
                        obj.rank = 'c';
                        break;
                }
            });

            this._rankDataGroup.dataProvider = new eui.ArrayCollection(sourceArr);

            this._close_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);
        }

        public onClose(){

            this.destroy();
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destroy(){

            this._close_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onClose, this);

        }
    }

}