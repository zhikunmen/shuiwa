declare module paotai {
    class FingerlingPanel extends eui.Component {
        closeBtn: eui.WxButton;
        fishGroup: eui.Group;
        constructor();
        protected childrenCreated(): void;
        private initUI();
        private addEvents();
        private removeEvents();
        private onTouchHandle(e);
        destroy(): void;
    }
    class FingerItem extends egret.DisplayObjectContainer {
        constructor(info: table.TableFish);
        private initUI(info);
    }
}
declare module paotai {
    class FuKaPanel extends eui.Component {
        closeBtn: eui.WxButton;
        rewardBtn: eui.WxButton;
        private gift1;
        private gift2;
        private gift3;
        private rewardNum;
        private _number;
        constructor(num: number);
        protected childrenCreated(): void;
        private setWD(gift);
        private addEvents();
        private removeEvents();
        private onTouchHandle(e);
        destroy(): void;
    }
}
declare module paotai {
    class PaoTaiConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共guide需要加载的资源组
         */
        static PUB_PAOTAI_PANEL: string;
        static PUB_PAOTAI: string;
        static TAKE_PHONEBILL: string;
        static PUB_FUKA_DESC: string;
        static PUB_FISH_COMMON: string;
        static PUB_FINGERLING: string;
    }
}
declare module paotai {
    class PaoTaiItem extends eui.Component {
        touch_btn: eui.WxButton;
        contain: eui.Group;
        pao_text: eui.Label;
        unlock: eui.Image;
        private lockbg;
        pao_img: eui.Image;
        speed: eui.Image;
        private speed_txt;
        private paoCotain;
        private paoEffect;
        private paohuos;
        private pos;
        private _info;
        private _usable;
        private _create;
        private _select;
        constructor();
        protected childrenCreated(): void;
        select: boolean;
        readonly ID: number;
        setInfo(info: table.TableFishGunType, usable: number[]): void;
        private setButtonState(id);
        private setPaoWH(id);
        private setEffect(id);
        private addPaoHuo();
        private paohuoComplete(e);
        private paohuoRemove();
        private playAnim();
        createMovieClicp(groupName: string, keyName?: string): egret.MovieClip;
        private onTouchHander(event);
        destroy(): void;
    }
}
declare module paotai {
    class PaoTaiPanel extends eui.Component {
        paotia_lst: eui.Group;
        _closeBtn: eui.WxButton;
        private _paoList;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private initData();
        private initUI(usable);
        private removeEvents();
        private itemClickHandler(evt);
        private onGetFishCannon(e);
        private onSetFishCannon(e);
        private onTouchHandle(e);
        destroy(): void;
        static paodans: egret.Bitmap[];
        static paoings: egret.Bitmap[];
        static getPaoDan(): egret.Bitmap;
        static removePaoDa(pao: egret.Bitmap): void;
        static destroy(): void;
    }
}
declare module paotai {
    class TakePhonePanel extends eui.Component {
        private closeBtn;
        private tabbtn1;
        private tabbtn2;
        private tabbtn3;
        private tabbtn4;
        private tabbtn5;
        private tabbtn6;
        private tabbtns;
        private rewardGroup;
        private rewardPool;
        private goldText;
        private rewardMore;
        private rewardNext;
        private killFish;
        private chouGroup;
        private goldPro;
        private luckBtn;
        private fishBtn;
        private rewardMask;
        private itmes;
        private currentIndex;
        private _info;
        private _short;
        constructor(info?: Cmd.GetFishLuckyDrawInfoLobbyCmd_S);
        protected childrenCreated(): void;
        private addEvents();
        private initData();
        private initUI();
        private onFishReceive(evt);
        private anim;
        private playing;
        private playAwardAnim(rewadItem);
        private removeEvents();
        private onGroupChange(e);
        /**
         *当前档次>选中档次时，不显示进度显示文字
         *当前档次=选中档次时，显示下一档所需进度
         *当前档次<选中档次时，显示选中档次所需进度
         **/
        private setTab(index);
        private onTouchHandle(e);
        private findFishDraw(bonus);
        destroy(): void;
    }
    class takeRewardItem extends eui.Component {
        private goodIcon;
        private goodNum;
        private _info;
        constructor(info?: table.TableFishDraw.Award1Item);
        protected childrenCreated(): void;
        setInfo(info: table.TableFishDraw.Award1Item): void;
        getInfo(): table.TableFishDraw.Award1Item;
    }
}
declare module paotai {
    class CmdConstant {
        /**设置炮台返回*/
        static SET_FISH_CANNON: string;
        /**设置炮台返回*/
        static GET_FISH_CANNON: string;
        /**捕鱼抽奖信息*/
        static GET_FISH_LUCKYDRAW: string;
        /**捕鱼抽奖结果*/
        static GET_FISH_LUCKYPRIZE: string;
    }
}
declare class PaoTaiReciveMgr {
    constructor();
}
declare module Cmd {
    /**VIP-请求数据 */
    function OnSetFishCannonCmd_CS(rev: Cmd.SetFishCannonCmd_CS): void;
    /**VIP-请求数据 */
    function OnGetFishCannonCmd_CS(rev: Cmd.GetFishCannonCmd_CS): void;
    /**抽奖信息 */
    function OnGetFishLuckyDrawInfoLobbyCmd_S(rev: Cmd.GetFishLuckyDrawInfoLobbyCmd_S): void;
    /**抽奖结果*/
    function OnGetFishLuckyDrawPrizeLobbyCmd_S(rev: Cmd.GetFishLuckyDrawPrizeLobbyCmd_S): void;
}
