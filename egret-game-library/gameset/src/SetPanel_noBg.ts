namespace gameset {
    export class SetPanel_noBg extends commonpanel.LobbyBaseEuiPanel {
        static SetPanelEvtOccur = "EvtOccur";

        //保存桌布资源名
        private static BgResName: string = '';

        //事件种类
        static SetPanelEvtTypeMusicOff = "music_off";
        static SetPanelEvtTypeMusicOn = "music_on";
        static SetPanelEvtTypeSoundOff = "sound_off";
        static SetPanelEvtTypeSoundOn = "sound_on";
        static SetPanelEvtTypeLocalSoundOff = "local_sound_off";
        static SetPanelEvtTypeLocalSoundOn = "local_sound_on";
        static SetPanelEvtChBg = "chBg";
        //解散按钮
        private _dismissBtn: eui.WxButton;

        //音乐按钮
        private musicBtn: eui.Image;
        //音效按钮
        private soundBtn: eui.Image;
        //方言按钮
        private localSoundBtn: eui.Image;
        //保存方言状态
        public _localSoundStatus: boolean = true;

        constructor(isLocal: boolean) {
            super("game_sp_title", 690, 403);
            this.skinName = "GameSetPanelNoBgSKin";
            this._localSoundStatus = isLocal;
        }
        private onComplete(): void {
        }

        protected addEvent(){
            this.musicBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this._dismissBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.disMissRoom, this);
        }

        protected removeEvent(){
            this.musicBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.soundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this.localSoundBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onSoundHandle, this);
            this._dismissBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.disMissRoom, this);
        }

        protected initUI() {
            this.soundBtn.touchEnabled = true;
            this.musicBtn.touchEnabled = true;
            this.localSoundBtn.touchEnabled = true;
            //根据现有的音量设置音量初始化开关

            this.updateMusicVolime();
            this.updateSoundVolime();
            this.updateLocalSoundVolime();
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

        /**解散房间 */
        private disMissRoom(evt: egret.TouchEvent) {
            uniLib.Global.dispatchEvent("DISMISS_GAME");
            this.removePop();
        }
    }
}