namespace SWGAME{

    export class SeatPlayer extends eui.Component{
        constructor(){
            super();
        }

        protected createChildren(){
            super.createChildren();
            this.initUI();
        }

        private _bg:eui.Image;
        //玩家头像
        private _headImg:eui.Image;
        //名字/分数背景
        private _nameBg:eui.Image;
        //玩家昵称
        private _name:eui.Label;
        //玩家分数
        private _point:eui.Label;

        private realHeadImg:egret.Bitmap;

        //参与抢庄效果背景
        private _banker_grab_bg:eui.Image;

        //庄图标
        private _banker_icon:eui.Image;

        protected initUI():void{

            this._nameBg.visible=false;
            this._name.visible=false;
            this._point.visible=false;
            this._banker_grab_bg.visible=false;
            this._banker_icon.visible = false;
        }

        public setUserData(userVo:UserVo){
            if(this.realHeadImg){
                this.removeUserData();
            }


            this._nameBg.visible=true;
            this._name.visible=true;
            this._point.visible=true;

            HeadLoader.getInstance().load(userVo.headUrl, this.onLoadSuccess, this.onLoadError, this);

            this._name.text = userVo.nickName;

            //金币场/钻石场
            if(RoomInfo.getInstance().roomType == 1) {
                //金币场
                this._point.text = EffectFactory.getInstance().handleNum(userVo.chips, 2);
            }else{
                //钻石场
                this._point.text = EffectFactory.getInstance().handleNum(userVo.diamond, 2);
            }

        }

        public removeUserData(){
            this._nameBg.visible=false;
            this._name.visible=false;
            this._point.visible=false;
            this.clearBanker();

            if(this.realHeadImg) {
                this.swapChildren(this.realHeadImg, this._headImg);
                this.removeChild(this.realHeadImg);
                this.realHeadImg = null;
            }

            this.deactiveBankerGrab();
        }

        public updatePoint(newPoint:number){
            this._point.text = EffectFactory.getInstance().handleNum(newPoint, 2);
        }

        private onLoadSuccess(data:egret.BitmapData){
            // this._headImg.source = data.source;
            let headImg:egret.Bitmap = new egret.Bitmap(data);
            headImg.name = 'headImg_real';
            headImg.x = this._headImg.x;
            headImg.y = this._headImg.y;
            headImg.width = this._headImg.width;
            headImg.height = this._headImg.height;
            this.realHeadImg = headImg;
            this.addChild(headImg);
            this.swapChildren(headImg, this._headImg);
        }


        private onLoadError(url:string){
            console.warn("SeatPlayer:用户头像获取失败!");
        }

        public activeBankerGrab(){
            this._banker_grab_bg.visible = true;
        }

        public deactiveBankerGrab(){
            this._banker_grab_bg.visible = false;
        }

        //动画显示庄
        public setBanker(){

            let EffectVc:EffectVc = AppFacade.getInstance().retrieveMediator(EffectMediator.NAME).getViewComponent();

            let toPoint:egret.Point = new egret.Point();
            this.localToGlobal(this._banker_icon.x, this._banker_icon.y, toPoint);
            EffectVc.globalToLocal(toPoint.x, toPoint.y , toPoint);

            let initPoint:egret.Point = new egret.Point();


            EffectVc.globalToLocal(ScreenAdaptMgr.getInstance().stageWidth/2,
                ScreenAdaptMgr.getInstance().stageHeight/2,
                initPoint);

            let bankerIcon = new egret.Bitmap();
            bankerIcon.texture = RES.getRes('sw_banker_icon_png');

            bankerIcon.x = initPoint.x;
            bankerIcon.y = initPoint.y;
            bankerIcon.anchorOffsetX = bankerIcon.width / 2;
            bankerIcon.anchorOffsetY = bankerIcon.height / 2;

            this.activeBankerGrab();

            EffectVc.addChild(bankerIcon);

            //获取动画时间
            let toBigTime:number = PositionData.getInstance().bankerIconEffectTime * 5 / 13;
            let moveTime:number = PositionData.getInstance().bankerIconEffectTime * 8 / 13;

            toBigTime = Math.floor(toBigTime);
            moveTime = Math.floor(moveTime);

            //动画开始
            egret.Tween.get(bankerIcon).to(
                {scaleX:2,scaleY:2},toBigTime,egret.Ease.sineInOut)
                .wait(0).to({
                 scaleX:1, scaleY:1, x:toPoint.x, y:toPoint.y
                },moveTime,egret.Ease.sineInOut).call(()=>{

                    uniLib.DisplayUtils.removeFromParent(bankerIcon);
                    egret.Tween.removeTweens(bankerIcon);
                    bankerIcon = null;
                    this._banker_icon.visible = true;
                    this.deactiveBankerGrab();
            });

        }

        //隐藏庄家图标
        public clearBanker(){
            this._banker_icon.visible = false;
        }

        //直接显示庄(断线重连/中途加入)
        public showBanker(){
            this._banker_icon.visible = true;
        }

        public destroy():void{

            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);
        }
    }
}