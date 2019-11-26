namespace chessCommonLib{
    export type zm_SetPanelEvtDate = {
        //传入小图资源名数组的index
        index?:number,
        //小图资源名
        resName?:string,
        //事件种类
        evtType:string
    }

    export enum zm_SetPanelBtnType {
        BtnMusic,BtnSound,BtnLocalSound
    }

    export class zm_SetPanel extends BaseEuiPanel{
        static SetPanelEvtOccur = "EvtOccur";

        //保存桌布资源名
        private static BgResName:string = '';
        //保存方言状态
        private static LocalSoundStatus:boolean = true;

        //事件种类
        static SetPanelEvtTypeMusicOff = "music_off";
        static SetPanelEvtTypeMusicOn = "music_on";
        static SetPanelEvtTypeSoundOff = "sound_off";
        static SetPanelEvtTypeSoundOn = "sound_on";
        static SetPanelEvtTypeLocalSoundOff = "local_sound_off";
        static SetPanelEvtTypeLocalSoundOn = "local_sound_on";

        static SetPanelEvtChBg = "chBg";


        //切换壁纸左右箭头
        public leftBtn:eui.Image;
        public rightBtn:eui.Image;

        //音乐按钮
        private musicBtn:eui.ToggleSwitch;

        //音效按钮
        private soundBtn:eui.ToggleSwitch;

        //方言按钮
        private localSoundBtn:eui.ToggleSwitch;

        //壁纸小图资源名数组
        private _bgResArr:string[];
        //壁纸小图当前位置指针
        private _index:number = 0;
        //壁纸小图对象数组
        private _bgImgArr:eui.Image[] = [];
        //壁纸小图显示窗口
        private _imgGroup:eui.Group;


        constructor(bgResArr:string[]) {
            super("game_sp_title_png", 690, 403);
            this.skinName = "chessCommonLib.zm_SetPanelSKin";

            if(!bgResArr || bgResArr.length == 0){
                throw new Error('小图资源数组不能为空');
            }

            this._bgResArr = bgResArr;
        }
        protected createChildren() {
            super.createChildren();
        }
        private onComplete():void{
        }

        protected initUI(){

            for(let resName of this._bgResArr){

                let res = RES.getRes(resName);
                if(!res){
                    throw new Error('小图资源没有获取到,资源名:'+resName);
                }

                let img = new eui.Image();
                img.texture = res;
                img.name = resName;
                img.width = this._imgGroup.width;
                img.height = this._imgGroup.height;
                this._bgImgArr.push(img);
            }


            //添加遮罩
            let rect:egret.Rectangle = new egret.Rectangle(0,0,this._imgGroup.width,this._imgGroup.height);
            this._imgGroup.mask = rect;

            //根据现有的音量设置音量初始化开关
            if(!Number(uniLib.Utils.getLocalStorage("SoundVolime"))){
                this.soundBtn.selected = true;
            }

            if(!Number(uniLib.Utils.getLocalStorage("MusicVolime"))){
                this.musicBtn.selected = true;
            }

            if(!zm_SetPanel.LocalSoundStatus){
                this.musicBtn.selected = true;
            }


            //根据现有的背景初始化小背景图片
            if(zm_SetPanel.BgResName){
                let initIndex = this._bgResArr.indexOf(zm_SetPanel.BgResName);
                if( initIndex != -1){
                    //添加上次设置的图片到到显示区
                    this._imgGroup.addChild(this._bgImgArr[initIndex]);
                    this._index = initIndex;
                }

            }else{
                //添加第一个壁纸小图到显示区
                this._imgGroup.addChild(this._bgImgArr[0]);
            }

            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundHandle,this);
            this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundHandle,this);
            this.localSoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundHandle,this);

            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBgCh,this);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP,this.onBgCh,this);
        }

        //事件派发
        private onSoundHandle(evt:egret.TouchEvent){
            let evtData:zm_SetPanelEvtDate;

            //设置事件data
            if(evt.target == this.musicBtn){
                if(evt.target.selected){

                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    evtData = {evtType:zm_SetPanel.SetPanelEvtTypeMusicOff};
                }else{

                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    evtData = {evtType:zm_SetPanel.SetPanelEvtTypeMusicOn};
                }
            }else if(evt.target == this.soundBtn){
                if(evt.target.selected){
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    evtData = {evtType:zm_SetPanel.SetPanelEvtTypeSoundOff};
                }else{
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    evtData = {evtType:zm_SetPanel.SetPanelEvtTypeSoundOn};
                }
            }else if(evt.target == this.localSoundBtn){
                if(evt.target.selected){
                    zm_SetPanel.LocalSoundStatus = false;
                    evtData = {evtType:zm_SetPanel.SetPanelEvtTypeLocalSoundOff};
                }else{
                    zm_SetPanel.LocalSoundStatus = true;
                    evtData = {evtType:zm_SetPanel.SetPanelEvtTypeLocalSoundOn};
                }
            }

            this.dispatchEventWith(zm_SetPanel.SetPanelEvtOccur,false,evtData);
        }

        //按钮禁用
        public disableBtn(btnType:number){
            let eleBtn:eui.ToggleSwitch;

            switch (btnType){
                case zm_SetPanelBtnType.BtnMusic:
                    eleBtn = this.musicBtn;
                    break;
                case zm_SetPanelBtnType.BtnSound:
                    eleBtn = this.soundBtn;
                    break;
                case zm_SetPanelBtnType.BtnLocalSound:
                    eleBtn = this.localSoundBtn;
            }

            eleBtn.enabled = false;
        }

        private onBgCh(evt:egret.TouchEvent){
            //只有一张图，不换
            if(this._bgImgArr.length == 1){
                return;
            }


            let nextImg:eui.Image;
            let nextIndex:number;

            if(evt.target == this.leftBtn){
            //左按钮点击


                if(this._bgImgArr[this._index + 1]){
                    //没到最后一张图
                    nextIndex = this._index + 1;

                }else{
                    //现在是最后一张图，切换到第一张图
                    nextIndex = 0;
                }

                nextImg = this._bgImgArr[nextIndex];
                //把下一张图加到右侧
                nextImg.x = this._imgGroup.width;
                this._imgGroup.addChild(nextImg);


                //缓动
                this.moveEffect(this._bgImgArr[this._index],false,nextIndex,false);
                this.moveEffect(nextImg,false,nextIndex,true);



            }else if(evt.target == this.rightBtn){
                //右按钮点击

                if(this._bgImgArr[this._index - 1]){
                    //没到第一张图
                    nextIndex = this._index - 1;

                }else{
                    //现在第一张图，切换到最后一张图
                    nextIndex = this._bgImgArr.length - 1;
                }

                nextImg = this._bgImgArr[nextIndex];
                //把下一张图加到左侧
                nextImg.x = -this._imgGroup.width;
                this._imgGroup.addChild(nextImg);


                //缓动
                this.moveEffect(this._bgImgArr[this._index],true,nextIndex,false);
                this.moveEffect(nextImg,true,nextIndex,true);
            }

            //保存当前小图资源名
            zm_SetPanel.BgResName = this._bgResArr[nextIndex];
        }

        /**
         *
         * @param {eui.Image} img  //要缓动的图片
         * @param {boolean} direct //0:向左缓动,1:向右缓动
         * @param {number} nextIndex//下一个index
         * @param {boolean} sendEvt//是否派发换壁纸事件

         */
        private moveEffect(img:eui.Image, direct:boolean, nextIndex:number, sendEvt:boolean){
            let flag:number;
            if(direct){
                flag = 1;
                this.rightBtn.touchEnabled = false;
                this.leftBtn.touchEnabled = false;

            }else{
                flag = -1;
                this.rightBtn.touchEnabled = false;
                this.leftBtn.touchEnabled = false;
            }

            egret.Tween.get(img).to({x : img.x + this._imgGroup.width * flag},300,egret.Ease.sineInOut).call(()=> {
                this._index = nextIndex;
                this.rightBtn.touchEnabled = true;
                this.leftBtn.touchEnabled = true;

                if(!sendEvt){
                    return;
                }

                //事件派发
                let data:zm_SetPanelEvtDate = {
                    index:nextIndex,
                    resName:this._bgResArr[nextIndex],
                    evtType:zm_SetPanel.SetPanelEvtChBg
                };
                this.dispatchEventWith(zm_SetPanel.SetPanelEvtOccur,false,data);

            });
        }

        protected removeEvent(): void {
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundHandle,this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundHandle,this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onSoundHandle,this);

            this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBgCh,this);
            this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP,this.onBgCh,this);
        }

    }
}