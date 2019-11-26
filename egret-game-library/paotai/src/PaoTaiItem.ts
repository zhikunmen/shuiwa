module paotai {
    export class PaoTaiItem extends eui.Component {

        public touch_btn: eui.WxButton

        public contain:eui.Group;
        public pao_text: eui.Label;
        public unlock: eui.Image;
        private lockbg:eui.Image;
        public pao_img: eui.Image;
        public speed: eui.Image;
        private speed_txt:eui.BitmapLabel
        private paoCotain:eui.Group;
        private paoEffect:egret.MovieClip;
        private paohuos: egret.MovieClip[];
        private pos:number[]=[153,128,196,135,178,131,200,118,143,134];
        private _info:table.TableFishGunType;
        private _usable:number[];
        private _create:boolean;
        private _select:boolean = false;

        public constructor() {
            super();
            this.skinName = "PaoTaiItemSkin";
        }

        protected childrenCreated(){
            super.childrenCreated();
            this.touch_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            this._create = true;
            if(this._info)
                this.setInfo(this._info,this._usable);
        }

        public set select(value:boolean){
            if(this._select == value)
                return;
            this._select = value;
            this.touch_btn["bg_txt"].text = "";
            if(this._select){
                this.touch_btn["bg_img"].source = "paotai_button3";
                this.touch_btn.enabled = false;
            }else{
                if(this._info.unlockType == 99){
                    this.touch_btn["bg_img"].source = "paotai_button2";
                    this.touch_btn.enabled = true;
                }else{
                    this.touch_btn["bg_img"].source = "paotai_button4";
                    this.touch_btn.enabled = true;
                }
            }
        }

        public get select(){
            return this._select;
        }

        public get ID(){
            if(this._info == null)
                return null;
            else 
                return this._info.ID;
        }

        public setInfo(info:table.TableFishGunType,usable:number[]) {
            this._info = info;
            this._usable = usable;
            if(this._create == false)
                return;

            this.pao_text.text = info.gunName;
            this.speed.width  =18;
            this.speed.width = (info.speedNumber/10)*171;
            this.pao_img.source = "pao_tai_"+info.ID;
            this.speed_txt.text = info.speedNumber*10+"";
            this.speed_txt.anchorOffsetX = this.speed_txt.width>>1;
            this.setPaoWH(info.ID);
            this.setEffect(info.ID);
            if(info.unlockType == 99){ //月卡
                if(this._usable.indexOf(this._info.ID) > -1){
                    this.setButtonState(info.ID);
                    this.unlock.visible = false;
                    this.lockbg.visible = false;
                }else{
                    this.touch_btn["bg_img"].source = "paotai_button2";
                    this.touch_btn.enabled = true;
                    this.unlock.visible = true;
                    this.lockbg.visible = true;
                }
                this.touch_btn["bg_txt"].text = "";
            }else{
                if(this._usable.indexOf(this._info.ID) > -1){
                    this.setButtonState(info.ID);
                    this.unlock.visible = false;
                    this.lockbg.visible = false;
                }else{
                    this.touch_btn["bg_img"].source = "paotai_button1";
                    this.touch_btn["bg_txt"].text = info.unlockDescribe;
                    this.touch_btn.enabled = true;
                    this.unlock.visible = true;
                    this.lockbg.visible = true;
                }
            }
            this.addPaoHuo();
            this.playAnim();
        }

        private setButtonState(id:number):void{
            if(MJLobbyData.getInstance().userInfoSynLobby.userInfo.fishcannon == id){
                this.touch_btn["bg_img"].source = "paotai_button3";
                this.touch_btn.enabled = false;
                this._select = true;
            }else{
                this.touch_btn["bg_img"].source = "paotai_button4";
                this.touch_btn.enabled = true;
                this._select = false;
            }
            this.touch_btn["bg_txt"].text = "";
        }

        private setPaoWH(id:number):void{
            this.pao_img.source = "pao_tai_"+id;
            this.pao_img.x = (125 - this.pos[id*2-2]/2);
            this.pao_img.y = (142 - this.pos[id*2-1]/2);
        }

        private setEffect(id:number):void{
            if(this.paoEffect){
                this.paoEffect.stop();
                uniLib.DisplayUtils.removeFromParent(this.paoEffect);
                this.paoEffect = null;
            }
            this.paoEffect = this.createMovieClicp("paotai_effect"+id);
            this.paoCotain.addChild(this.paoEffect);
            this.paoEffect.x = 125;
            this.paoEffect.y = 142+2;
            this.paoEffect.play(-1);
        }

        private addPaoHuo():void{
            this.paohuos = [];
            let data : egret.MovieClipData = this.createMovieClicp("paohuo1").movieClipData;
            let posX = [88,125,160];
            let posY = [85,60,85];
            for(var i:number=0;i<3;i++){
                this.paohuos[i] = new egret.MovieClip(data);
                this.paoCotain.addChildAt(this.paohuos[i],0);
                this.paohuos[i].x = posX[i];
                this.paohuos[i].y = posY[i];
                this.paohuos[i].gotoAndStop(0);
                this.paohuos[i].addEventListener(egret.Event.LOOP_COMPLETE, this.paohuoComplete, this);
            }
        }

        private paohuoComplete(e:egret.Event):void{
            e.target.visible = false;
        }

        private paohuoRemove():void{
            if(this.paohuos == null)
                return;
            for(var j:number=0;j<3;j++){
                uniLib.DisplayUtils.removeFromParent(this.paohuos[j]);
                this.paohuos[j].stop();
                this.paohuos[j].removeEventListener(egret.Event.LOOP_COMPLETE, this.paohuoComplete, this);
                this.paohuos[j] = null;
            }
            this.paohuos = null;
        }

        private playAnim():void{
            if(!this.paohuos)
                return;
            var huoY:number = 84;

            // egret.Tween.get(this.speed,{loop:true}).to({ width: ((400-this._info.gunSpeed)/250)*171 }, 160).to({width:18},500);

            egret.Tween.get(this.paoCotain,{loop:true}).to({ y: huoY -16 }, this._info.gunSpeed*0.8).call(()=>{
                for(var i:number=0;i<3;i++){
                    this.paohuos[i].gotoAndPlay(0,1);
                }
                var pao:egret.Bitmap = PaoTaiPanel.getPaoDan();
                this.contain.addChildAt(pao,1);
                pao.x = 66;
                pao.y = huoY+10;
                PaoTaiPanel.paoings.push(pao);
                egret.Tween.get(pao).to({y:-100},300).call(()=>{
                    this.contain.removeChild(pao);
                    var index:number = PaoTaiPanel.paoings.indexOf(pao);
                    PaoTaiPanel.paoings.splice(index,1);
                    PaoTaiPanel.removePaoDa(pao);
                })
            },this).to({ y: huoY+10}, this._info.gunSpeed).to({ y: huoY}, this._info.gunSpeed*0.2);
        }

        public createMovieClicp(groupName: string, keyName?: string): egret.MovieClip {
            var data = RES.getRes(groupName + "_json");//获取动画文件的信息配置文件
            var texture = RES.getRes(groupName + "_png");//获取动画文件的图片

            var mdf = new egret.MovieClipDataFactory(data, texture);
            var mc = new egret.MovieClip(mdf.generateMovieClipData(keyName));//创建MovieClip
            return mc;
        }

        private onTouchHander(event:egret.TouchEvent):void{
            this.dispatchEvent(new egret.Event(egret.Event.CHANGE,false,false,this._info));
        }

        public destroy(): void {
            egret.Tween.removeTweens(this.paoCotain)
            this.paohuoRemove();
            this.touch_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHander, this);
            if(this.paoEffect){
                this.paoEffect.stop();
                uniLib.DisplayUtils.removeFromParent(this.paoEffect);
                this.paoEffect = null;
            }
            this.removeChildren();
        }

    }
}