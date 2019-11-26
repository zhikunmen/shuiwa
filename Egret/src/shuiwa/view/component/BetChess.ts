namespace SWGAME {
    //下注象棋元素

    export class BetChess extends eui.Component {
        constructor() {
            super();
        }

        //下注区象棋背景图片
        private _betChessBg:eui.Image;

        //下注区象棋文字显示组
        private _betTxtGroup:eui.Group;

        //下注区象棋总下注
        private _betTotalTxt:eui.Label;
        //下注区象棋当前玩家下注
        private _betPlayerTxt:eui.Label;

        //选中发光边框效果图片
        private _betChessSeleted:eui.Image;

        private _factory:dragonBones.BaseFactory;

        protected createChildren() {
            super.createChildren();
            this._factory = new dragonBones.EgretFactory();

            this.initUI();
        }

        protected initUI(): void {
            this._betTxtGroup.visible = false;
            this._betTotalTxt.text = '0';
            this._betPlayerTxt.text = '0';
            this._betChessSeleted.visible = false;
            this.touchEnabled = false;
            this.touchChildren = false;

            //测试动画
            // this.twinkleHideChess();
        }

        private _chessId:number;

        public get chessId(){
            return this._chessId;
        }

        //初始化背景
        public setChess(chessId:number){
            this._betChessBg.texture = RES.getRes(GameData.getInstance().getBetChessBgResName(chessId));
            this._chessId = chessId;
        }

        //重置
        public reset(){
            this.initUI();

            this._myBetPoint = 0;
            this._totalBetPoint = 0;
        }

        //选中
        public Active(){
            this._betChessSeleted.visible = true;
        }

        //去除选中
        public DeActive(){
            this._betChessSeleted.visible = false;
        }

        //开启下注
        public enableBet(){
            this._betTxtGroup.visible = true;
            this._betPlayerTxt.visible = true;

            //庄只能看，不能下注
            if(RoomInfo.getInstance().bankerUid == uniLib.NetMgr.UID){
                this._betPlayerTxt.visible = false;
                return;
            }

            this.touchEnabled = true;
        }

        //关闭下注
        public disableBet(){
            this._betTxtGroup.visible = false;
            this.touchEnabled = false;
        }

        //更新下注分数显示
        private _myBetPoint:number = 0;
        private _totalBetPoint:number = 0;
        public updatePoints(myBetPoint, totalBetPoint){

            if(myBetPoint) {

                EffectFactory.getInstance().addNumEffect(this._betPlayerTxt, this._myBetPoint, myBetPoint, true);
                this._myBetPoint = myBetPoint;
            }

            EffectFactory.getInstance().addNumEffect(this._betTotalTxt, this._totalBetPoint, totalBetPoint, false);

            this._totalBetPoint = totalBetPoint;
        }

        //直接更新显示，没有效果
        public showPoints(myBetPoint:number, totalBetPoint:number){
            this._betPlayerTxt.text = myBetPoint.toString();
            this._betTotalTxt.text = totalBetPoint.toString();
        }




        private createAnimation(skeletonResName:string,texDataResName:string,texResName:string, armatureName:string):dragonBones.Armature{

            let skeletonData = RES.getRes(skeletonResName);
            let textureData = RES.getRes(texDataResName);
            let texture = RES.getRes(texResName);

            let factory = new dragonBones.EgretFactory();

            factory.addDragonBonesData(dragonBones.DataParser.parseDragonBonesData(skeletonData));
            factory.addTextureAtlasData(this._factory.parseTextureAtlasData(textureData, texture));
            this._factory = factory;
            let armature:dragonBones.Armature = this._factory.buildArmature(armatureName);

            return armature;

        }

        //庄家藏子区域闪烁动画
        private _display:dragonBones.EgretArmatureDisplay;
        public twinkleHideChess(){

            let twinkleArmature:dragonBones.Armature = this.createAnimation("sw_twinkle_hide_chess_ske_json", "sw_twinkle_hide_chess_tex_json", "sw_twinkle_hide_chess_tex_png", 'Armature');

            let armatureDisplay:dragonBones.EgretArmatureDisplay = twinkleArmature.display;
            this._factory.clock.add(twinkleArmature);
            this.addChild(armatureDisplay);
            [armatureDisplay.x, armatureDisplay.y] = [this.width/2, this.height/2];

            armatureDisplay.scaleX = armatureDisplay.scaleY = 2;
            // //启动骨骼动画播放
            twinkleArmature.animation.play("newAnimation",2);

            armatureDisplay.addEventListener(dragonBones.EventObject.COMPLETE, this.onTwinkleEnd, this);
            this._display = armatureDisplay;
        }

        //闪烁结束回调
        private onTwinkleEnd(evt:dragonBones.EgretEvent){
            let display:dragonBones.EgretArmatureDisplay = evt.target;
            display.removeEventListener(dragonBones.EventObject.COMPLETE, this.onTwinkleEnd, this);
            this._display = null;
            this.removeChild(display);
            this.dispatchEventWith(UIEventConsts.CHESS_TWINKLE_END);
        }

        public destroy(){
            if(this._display){
                this._display.removeEventListener(dragonBones.EventObject.COMPLETE, this.onTwinkleEnd, this);
                this._display = null;
            }
        }
    }
}