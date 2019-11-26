namespace SWGAME{
    export class ChatPopVc extends BaseVc{
        constructor(){
            super();
            this.skinName = sw_ChatPopVc;
        }

        //聊天气泡组
        private _pop_group_1:eui.Group;
        private _pop_group_2:eui.Group;
        private _pop_group_3:eui.Group;
        private _pop_group_4:eui.Group;
        private _pop_group_5:eui.Group;
        private _pop_group_6:eui.Group;
        private _pop_group_7:eui.Group;
        private _pop_group_8:eui.Group;
        private _pop_group_9:eui.Group;
        private _pop_group_10:eui.Group;
        private _pop_group_11:eui.Group;
        private _pop_group_12:eui.Group;
        private _pop_group_13:eui.Group;
        private _pop_group_14:eui.Group;
        private _pop_group_15:eui.Group;
        private _pop_group_16:eui.Group;
        private _pop_group_17:eui.Group;
        private _pop_group_18:eui.Group;
        private groupArr:eui.Group[];

        //聊天气泡文字
        private _short_labal_1:eui.Label;
        private _short_labal_2:eui.Label;
        private _short_labal_3:eui.Label;
        private _short_labal_4:eui.Label;
        private _short_labal_5:eui.Label;
        private _short_labal_6:eui.Label;
        private _short_labal_7:eui.Label;
        private _short_labal_8:eui.Label;
        private _short_labal_9:eui.Label;
        private _short_labal_10:eui.Label;
        private _short_labal_11:eui.Label;
        private _short_labal_12:eui.Label;
        private _short_labal_13:eui.Label;
        private _short_labal_14:eui.Label;
        private _short_labal_15:eui.Label;
        private _short_labal_16:eui.Label;
        private _short_labal_17:eui.Label;
        private _short_labal_18:eui.Label;
        private labelArr:eui.Label[];

        protected initUI(){
            this.labelArr = [
                null,this._short_labal_1,this._short_labal_2,this._short_labal_3,
                this._short_labal_4,this._short_labal_5,this._short_labal_6,this._short_labal_7,this._short_labal_8,this._short_labal_9,this._short_labal_10,this._short_labal_11,this._short_labal_12,this._short_labal_13,this._short_labal_14,
                this._short_labal_15,this._short_labal_16,this._short_labal_17,this._short_labal_18
            ];

            this.groupArr = [
                null,this._pop_group_1,this._pop_group_2,this._pop_group_3,
                this._pop_group_4,this._pop_group_5,this._pop_group_6,this._pop_group_7,this._pop_group_8,this._pop_group_9,this._pop_group_10,this._pop_group_11,this._pop_group_12,this._pop_group_13,this._pop_group_14,this._pop_group_15,this._pop_group_16,this._pop_group_17,this._pop_group_18
            ];

            for(let group of this.groupArr){
                if(!group){
                    continue;
                }
                group.visible = false;
            }

            //测试

            // setTimeout(()=>{
            //     this.showChatPop(15, '测试聊天！！！！！~~~~~！！！！')
            // }, 1000);
            //
            // setTimeout(()=>{
            //     this.showCommonChat(8, 22);
            // }, 1500);
            //
            // setTimeout(()=>{
            //     this.showCommonChat(3, 13);
            // }, 6000);


        }

        //显示文字聊天气泡
        public showChatPop(seatId:number, content:string){
            this.labelArr[seatId].text = content;
            this.groupArr[seatId].scaleX =  this.groupArr[seatId].scaleY = 0.1;

            this.groupArr[seatId].visible = true;

            egret.Tween.get(this.groupArr[seatId]).to({scaleX:1,scaleY:1}, 500, egret.Ease.cubicInOut).wait(2000).to({scaleX:0.1,scaleY:0.1}, 500, egret.Ease.cubicInOut).call(()=>{
                this.groupArr[seatId].visible = false;
            }, this);
        }

        //根据voiceId显示聊天气泡或表情
        public showCommonChat(seatId: number, voiceId: number) {

            // let gender: number = RoomInfo.getInstance().getUserVoBySeatId(seatId).getGender();

            let id: number;
            if (voiceId >= 20 && voiceId < 26) {

                //20-25 快捷聊天
                id = voiceId % 20;
                // uniLib.SoundMgr.instance.playSound(SoundConsts.COMMON + "_" + gender + "_" + id + "_mp3");
                this.showChatPop(seatId, GameData.getInstance().ShortTalkArr[id]);
            }

            else {

                //11-118 表情
                if(voiceId > 100){
                    id = voiceId % 100;
                }else{
                    id = voiceId % 10;
                }


                let face: egret.Bitmap = uniLib.DisplayUtils.createBitmapByName("zmgame_face" + id);

                console.warn(face);

                face.width = PositionData.getInstance().faceSize[0];
                face.height = PositionData.getInstance().faceSize[1];
                face.anchorOffsetX = face.width / 2;
                face.anchorOffsetY = face.height / 2;
                this.addChild(face);

                let pos:egret.Point = PositionData.getInstance().getFacePos(seatId);
                face.x = pos.x;
                face.y = pos.y;

                //震动频率
                let duration: number = 250;
                let waited: number = 0;                                           //下个动画等待时间 如果不循环，设置为0
                let locY = face.y;

                //定时隐藏
                egret.Tween.get(face).wait(2000).call(()=>{
                    egret.Tween.removeTweens(face);
                    uniLib.DisplayUtils.removeFromParent(face);
                }, this);

                egret.Tween.get(face, { loop: true }).to({ y: locY - 10 }, duration, egret.Ease.sineIn).wait(waited).
                to({ y: locY }, duration, egret.Ease.sineIn);
            }
        }


        public destroy(){
            super.destroy();
        }
    }
}