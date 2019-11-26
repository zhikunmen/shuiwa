namespace gameset {
    export type SetPanelEvtDate = {
        //传入小图资源名数组的index
        index?: number,
        //小图资源名
        resName?: string,
        //事件种类
        evtType: string
    }

    export enum SetPanelBtnType {
        BtnMusic, BtnSound, BtnLocalSound
    }
    export class SetPanel extends commonpanel.LobbyBaseEuiPanel {
        /**事件 */
        static SetPanelEvtOccur = "EvtOccur";

        //保存桌布资源名
        private static BgResName: string = '';

        //事件种类
        /**背景音乐关 */
        static SetPanelEvtTypeMusicOff = "music_off";
        /**背景音乐开 */
        static SetPanelEvtTypeMusicOn = "music_on";
        /**音效关 */
        static SetPanelEvtTypeSoundOff = "sound_off";
        /**音效开 */
        static SetPanelEvtTypeSoundOn = "sound_on";
        /**方言关 */
        static SetPanelEvtTypeLocalSoundOff = "local_sound_off";
        /**方言开 */
        static SetPanelEvtTypeLocalSoundOn = "local_sound_on";
        /**静音关 */
        static SetPanelEvtTypeVoiceOff = "voice_off";
        /**静音开 */
        static SetPanelEvtTypeVoiceOn = "voice_on";
        /**改变背景图 */
        static SetPanelEvtChBg = "chBg";

        //切换壁纸左右箭头
        public leftBtn: eui.Image;
        public rightBtn: eui.Image;
        //音乐按钮
        private musicBtn: eui.Image;
        //音效按钮
        private soundBtn: eui.Image;
        //方言按钮
        private localSoundBtn: eui.Image;
        //壁纸小图资源名数组
        private _bgResArr: string[];
        //壁纸小图当前位置指针
        private _index: number = 0;
        //壁纸小图对象数组
        private _bgImgArr: eui.Image[] = [];
        //壁纸小图显示窗口
        private _imgGroup: eui.Group;
        //保存方言状态
        public _localSoundStatus: boolean = true;

        constructor(bgResArr: string[], isLocal: boolean) {
            super("game_sp_title", 690, 403);
            this.skinName = "GameSetPanelSKin";
            if (!bgResArr || bgResArr.length == 0) {
                throw new Error('小图资源数组不能为空');
            }
            this._bgResArr = bgResArr;
            this._localSoundStatus = isLocal;
        }
        private onComplete(): void {
        }

        protected initUI() {
            for (let resName of this._bgResArr) {
                let res = RES.getRes(resName);
                if (!res) {
                    throw new Error('小图资源没有获取到,资源名:' + resName);
                }
                let img = new eui.Image();
                img.texture = res;
                img.name = resName;
                img.width = this._imgGroup.width;
                img.height = this._imgGroup.height;
                this._bgImgArr.push(img);
            }
            this.soundBtn.touchEnabled = true;
            this.musicBtn.touchEnabled = true;
            this.localSoundBtn.touchEnabled = true;
            //添加遮罩
            let rect: egret.Rectangle = new egret.Rectangle(0, 0, this._imgGroup.width, this._imgGroup.height);
            this._imgGroup.mask = rect;
            //根据现有的音量设置音量初始化开关

            this.updateMusicVolime();
            this.updateSoundVolime();
            this.updateLocalSoundVolime();
            //根据现有的背景初始化小背景图片
            if (SetPanel.BgResName) {
                let initIndex = this._bgResArr.indexOf(SetPanel.BgResName);
                if (initIndex != -1) {
                    //添加上次设置的图片到到显示区
                    this._imgGroup.addChild(this._bgImgArr[initIndex]);
                    this._index = initIndex;
                }
            } else {
                //添加第一个壁纸小图到显示区
                this._imgGroup.addChild(this._bgImgArr[0]);
            }

            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
        }

        /**显示操作 */
        private updateMusicVolime(): void {
            if (uniLib.SoundMgr.instance.musicOpen == false) {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            } else {
                this.musicBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        }
        private updateSoundVolime(): void {
            if (uniLib.SoundMgr.instance.soundOpen == false) {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            } else {
                this.soundBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        }
        private updateLocalSoundVolime(): void {
            if (this._localSoundStatus == false) {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_voice_off");
            } else {
                this.localSoundBtn.texture = RES.getRes("game_set_json.game_sp_voice_on");
            }
        }

        //事件派发
        private onSoundHandle(evt: egret.TouchEvent) {
            let evtData: SetPanelEvtDate;
            //设置事件data
            if (evt.target == this.musicBtn) {
                if (uniLib.SoundMgr.instance.musicOpen == false) {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0.7);
                    evtData = { evtType: SetPanel.SetPanelEvtTypeMusicOn };
                    uniLib.SoundMgr.instance.musicOpen = true;
                } else {
                    uniLib.Utils.setLocalStorage("MusicVolime", 0);
                    evtData = { evtType: SetPanel.SetPanelEvtTypeMusicOff };
                    uniLib.SoundMgr.instance.musicOpen = false;
                }
                this.updateMusicVolime();
            }
            else if (evt.target == this.soundBtn) {
                if (uniLib.SoundMgr.instance.soundOpen == false) {
                    uniLib.Utils.setLocalStorage("SoundVolime", 1);
                    uniLib.SoundMgr.instance.soundOpen = true;
                    evtData = { evtType: SetPanel.SetPanelEvtTypeSoundOn };
                } else {
                    uniLib.Utils.setLocalStorage("SoundVolime", 0);
                    evtData = { evtType: SetPanel.SetPanelEvtTypeSoundOff };
                    uniLib.SoundMgr.instance.soundOpen = false;
                }
                this.updateSoundVolime();
            }
            if (evt.target == this.localSoundBtn) {
                if (this._localSoundStatus == true) {
                    this._localSoundStatus = false;
                    evtData = { evtType: SetPanel.SetPanelEvtTypeLocalSoundOff };
                } else {
                    this._localSoundStatus = true;
                    evtData = { evtType: SetPanel.SetPanelEvtTypeLocalSoundOn };
                }
                this.updateLocalSoundVolime();
            }
            this.dispatchEventWith(SetPanel.SetPanelEvtOccur, false, evtData);
        }

        //按钮禁用
        public disableBtn(btnType: number) {
            let eleBtn: eui.Image;
            switch (btnType) {
                case SetPanelBtnType.BtnMusic:
                    eleBtn = this.musicBtn;
                    break;
                case SetPanelBtnType.BtnSound:
                    eleBtn = this.soundBtn;
                    break;
                case SetPanelBtnType.BtnLocalSound:
                    eleBtn = this.localSoundBtn;
            }
            eleBtn.touchEnabled = false;
        }

        private onBgCh(evt: egret.TouchEvent) {
            //只有一张图，不换
            if (this._bgImgArr.length == 1) {
                return;
            }
            let nextImg: eui.Image;
            let nextIndex: number;
            if (evt.target == this.leftBtn) {
                //左按钮点击
                if (this._bgImgArr[this._index + 1]) {
                    //没到最后一张图
                    nextIndex = this._index + 1;
                } else {
                    //现在是最后一张图，切换到第一张图
                    nextIndex = 0;
                }
                nextImg = this._bgImgArr[nextIndex];
                //把下一张图加到右侧
                nextImg.x = this._imgGroup.width;
                this._imgGroup.addChild(nextImg);
                //缓动
                this.moveEffect(this._bgImgArr[this._index], false, nextIndex, false);
                this.moveEffect(nextImg, false, nextIndex, true);
            } else if (evt.target == this.rightBtn) {
                //右按钮点击
                if (this._bgImgArr[this._index - 1]) {
                    //没到第一张图
                    nextIndex = this._index - 1;
                } else {
                    //现在第一张图，切换到最后一张图
                    nextIndex = this._bgImgArr.length - 1;
                }
                nextImg = this._bgImgArr[nextIndex];
                //把下一张图加到左侧
                nextImg.x = -this._imgGroup.width;
                this._imgGroup.addChild(nextImg);
                //缓动
                this.moveEffect(this._bgImgArr[this._index], true, nextIndex, false);
                this.moveEffect(nextImg, true, nextIndex, true);
            }
            //保存当前小图资源名
            SetPanel.BgResName = this._bgResArr[nextIndex];
        }
        /**
         *
         * @param {eui.Image} img  //要缓动的图片
         * @param {boolean} direct //0:向左缓动,1:向右缓动
         * @param {number} nextIndex//下一个index
         * @param {boolean} sendEvt//是否派发换壁纸事件

         */
        private moveEffect(img: eui.Image, direct: boolean, nextIndex: number, sendEvt: boolean) {
            let flag: number;
            if (direct) {
                flag = 1;
                this.rightBtn.touchEnabled = false;
                this.leftBtn.touchEnabled = false;
            } else {
                flag = -1;
                this.rightBtn.touchEnabled = false;
                this.leftBtn.touchEnabled = false;
            }
            egret.Tween.get(img).to({ x: img.x + this._imgGroup.width * flag }, 300, egret.Ease.sineInOut).call(() => {
                this._index = nextIndex;
                this.rightBtn.touchEnabled = true;
                this.leftBtn.touchEnabled = true;
                if (!sendEvt) {
                    return;
                }
                //事件派发
                let data: SetPanelEvtDate = {
                    index: nextIndex,
                    resName: this._bgResArr[nextIndex],
                    evtType: SetPanel.SetPanelEvtChBg
                };
                this.dispatchEventWith(SetPanel.SetPanelEvtOccur, false, data);

            });
        }
        protected removeEvent(): void {
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.leftBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
            this.rightBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onBgCh, this);
        }

    }
}