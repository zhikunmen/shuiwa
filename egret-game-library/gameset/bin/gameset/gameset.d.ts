declare module gameset {
    class SetConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共loading需要加载的资源组
         */
        static GAME_SET: string;
    }
}
declare namespace gameset {
    class SetPanel_noBg extends commonpanel.LobbyBaseEuiPanel {
        static SetPanelEvtOccur: string;
        private static BgResName;
        static SetPanelEvtTypeMusicOff: string;
        static SetPanelEvtTypeMusicOn: string;
        static SetPanelEvtTypeSoundOff: string;
        static SetPanelEvtTypeSoundOn: string;
        static SetPanelEvtTypeLocalSoundOff: string;
        static SetPanelEvtTypeLocalSoundOn: string;
        static SetPanelEvtChBg: string;
        private _dismissBtn;
        private musicBtn;
        private soundBtn;
        private localSoundBtn;
        _localSoundStatus: boolean;
        constructor(isLocal: boolean);
        private onComplete();
        protected addEvent(): void;
        protected removeEvent(): void;
        protected initUI(): void;
        /**显示操作 */
        private updateMusicVolime();
        private updateSoundVolime();
        private updateLocalSoundVolime();
        private onSoundHandle(evt);
        disableBtn(btnType: number): void;
        /**解散房间 */
        private disMissRoom(evt);
    }
}
declare namespace gameset {
    type SetPanelEvtDate = {
        index?: number;
        resName?: string;
        evtType: string;
    };
    enum SetPanelBtnType {
        BtnMusic = 0,
        BtnSound = 1,
        BtnLocalSound = 2,
    }
    class SetPanel extends commonpanel.LobbyBaseEuiPanel {
        /**事件 */
        static SetPanelEvtOccur: string;
        private static BgResName;
        /**背景音乐关 */
        static SetPanelEvtTypeMusicOff: string;
        /**背景音乐开 */
        static SetPanelEvtTypeMusicOn: string;
        /**音效关 */
        static SetPanelEvtTypeSoundOff: string;
        /**音效开 */
        static SetPanelEvtTypeSoundOn: string;
        /**方言关 */
        static SetPanelEvtTypeLocalSoundOff: string;
        /**方言开 */
        static SetPanelEvtTypeLocalSoundOn: string;
        /**静音关 */
        static SetPanelEvtTypeVoiceOff: string;
        /**静音开 */
        static SetPanelEvtTypeVoiceOn: string;
        /**改变背景图 */
        static SetPanelEvtChBg: string;
        leftBtn: eui.Image;
        rightBtn: eui.Image;
        private musicBtn;
        private soundBtn;
        private localSoundBtn;
        private _bgResArr;
        private _index;
        private _bgImgArr;
        private _imgGroup;
        _localSoundStatus: boolean;
        constructor(bgResArr: string[], isLocal: boolean);
        private onComplete();
        protected initUI(): void;
        /**显示操作 */
        private updateMusicVolime();
        private updateSoundVolime();
        private updateLocalSoundVolime();
        private onSoundHandle(evt);
        disableBtn(btnType: number): void;
        private onBgCh(evt);
        /**
         *
         * @param {eui.Image} img  //要缓动的图片
         * @param {boolean} direct //0:向左缓动,1:向右缓动
         * @param {number} nextIndex//下一个index
         * @param {boolean} sendEvt//是否派发换壁纸事件

         */
        private moveEffect(img, direct, nextIndex, sendEvt);
        protected removeEvent(): void;
    }
}
declare namespace gameset {
    /**云霄单独设置页面 */
    class YunXiaoSetPanel extends commonpanel.LobbyBaseEuiPanel {
        static SetPanelEvtOccur: string;
        /**保存桌布资源名*/
        private static BgResName;
        /**切换壁纸左右箭头*/
        leftBtn: eui.Image;
        rightBtn: eui.Image;
        /**音乐按钮 */
        private musicBtn;
        /** 音效按钮*/
        private soundBtn;
        /** 方言按钮*/
        private localSoundBtn;
        /** 壁纸小图资源名数组*/
        private _bgResArr;
        /** 壁纸小图当前位置指针*/
        private _index;
        /**壁纸小图对象数组 */
        private _bgImgArr;
        /**壁纸小图显示窗口 */
        private _imgGroup;
        /** 静音按钮*/
        private voiceBtn;
        /**小号麻将选项 */
        private smallButton;
        /**大号麻将选项 */
        private bigButton;
        /**保存方言状态*/
        _localSoundStatus: boolean;
        constructor(bgResArr: string[], isLocal: boolean);
        private onComplete();
        protected initUI(): void;
        /**更新音乐*/
        private updateMusicVolime();
        /**更新音效*/
        private updateSoundVolime();
        /**更新方言*/
        private updateLocalSoundVolime();
        /**更新静音*/
        private updateVoiceVolime();
        /**修改麻将大小 */
        private updateMJcard(evt);
        /**更新麻将大小选项 */
        private updateMJcardswitch();
        /**操作 */
        private onSoundHandle(evt);
        /**背景改变 */
        private onBgCh(evt);
        /**
         *
         * @param {eui.Image} img  //要缓动的图片
         * @param {boolean} direct //0:向左缓动,1:向右缓动
         * @param {number} nextIndex//下一个index
         * @param {boolean} sendEvt//是否派发换壁纸事件
    
         */
        private moveEffect(img, direct, nextIndex, sendEvt);
        protected removeEvent(): void;
    }
}
