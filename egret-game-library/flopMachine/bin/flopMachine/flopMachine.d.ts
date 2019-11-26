declare module FlopMachine {
    /**
     * 翻牌机触发奖池
     */
    class FlopMachineBonusPool extends eui.Component {
        btn_grp: eui.Group;
        one_btn: eui.Button;
        two_btn: eui.Button;
        three_btn: eui.Button;
        four_btn: eui.Button;
        five_btn: eui.Button;
        open: egret.tween.TweenGroup;
        private _info;
        /**彩金大奖动画 */
        private _bonusPoolArmature;
        /**洗牌动画 */
        private _rubCard;
        constructor(info: Cmd.LotteryInfo);
        protected childrenCreated(): void;
        /**
         * 彩金大奖动画播放完毕
         */
        private onBonusPoolComplete();
        /**
         * 动画组播放完成
         */
        private onTweenGroupComplete();
        /**播放洗牌动画 */
        private playRubbingCards();
        /**
         * 洗牌动画动画播放完成
         */
        private onComplete();
        private onTouch(evt);
        private setVisible(vis);
        destroy(): void;
    }
}
declare module FlopMachine {
    class FlopMachineConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 翻牌机
         */
        static FLOP_MACHIN: string;
        /**
         * 彩金
         */
        static BONUS_POOL: string;
    }
    /**开始按钮 */
    let SOUND_START_BTN: string;
    /**点击牌保留 */
    let SOUND_BAOLIU: string;
    /**飞金币 */
    let SOUND_COIN: string;
    /**比大小 */
    let SOUND_BIDAXIAO_BG: string;
    let SOUND_BIDAXIAO_LOSE: string;
    let SOUND_BIDAXIAO_PING: string;
    let SOUND_BIDAXIAO_WIN: string;
    /**翻牌声 */
    let SOUND_FANPAI: string;
    let SOUND_FANPAI_LOSE: string;
    let SOUND_FANPAI_WIN: string;
}
declare module FlopMachine {
    /**
     * 翻牌机猜大小
     */
    class FlopMachineGuess extends eui.Component {
        top_skin: match.WxTopOpBtn;
        bg_img: eui.Image;
        round_lbl: eui.Label;
        rule_btn: eui.WxButton;
        close_btn: eui.WxButton;
        over_btn: eui.Button;
        big_btn: eui.Button;
        small_btn: eui.Button;
        poker_img: eui.Image;
        result_img: eui.Image;
        card_grp: eui.Group;
        win_lbl: eui.Label;
        rush_grp: eui.Group;
        pass_img: eui.Image;
        qufen_lbl: eui.Label;
        win_tween: egret.tween.TweenGroup;
        result_tween: egret.tween.TweenGroup;
        private _notice;
        /**金币动画 */
        private _coinArmature;
        private _timer;
        private _lotchips;
        constructor(lotchips?: number);
        protected childrenCreated(): void;
        private reset();
        private onTimer();
        private addEvents();
        private removeEvents();
        private onGuess(evt);
        private onGetChips(evt);
        private onComplete();
        /**
         * 下一关或者通关
         */
        private onCall(img, round);
        private onTouchHandle(evt);
        destroy(): void;
    }
}
declare module FlopMachine {
    /**
     * 翻牌机
     */
    class FlopMachinePanel extends eui.Component {
        top_skin: match.WxTopOpBtn;
        /**筹码按钮 */
        chip1_btn: eui.Button;
        chip2_btn: eui.Button;
        chip3_btn: eui.Button;
        chip4_btn: eui.Button;
        chip5_btn: eui.Button;
        chip6_btn: eui.Button;
        bg_img: eui.Image;
        rule_btn: eui.WxButton;
        close_btn: eui.WxButton;
        image: eui.Image;
        cancelHang_btn: eui.Button;
        begin_btn: eui.Button;
        hang_btn: eui.Button;
        guess_btn: eui.Button;
        flop_grp: eui.Group;
        /**扑克牌 */
        poker1: eui.Image;
        poker2: eui.Image;
        poker3: eui.Image;
        poker4: eui.Image;
        poker5: eui.Image;
        light1: eui.Image;
        light2: eui.Image;
        light3: eui.Image;
        light4: eui.Image;
        light5: eui.Image;
        retain1: eui.Image;
        retain2: eui.Image;
        retain3: eui.Image;
        retain4: eui.Image;
        retain5: eui.Image;
        coinPond_blbl: eui.BitmapLabel;
        lottery_grp: eui.Group;
        lottery_img: eui.Image;
        chipsDesc_lbl: eui.Label;
        win_lbl: eui.Label;
        cardType_grp: eui.Group;
        cardType_lbl: eui.Label;
        /**编辑动画 */
        sendcard_tween: egret.tween.TweenGroup;
        open_tween: egret.tween.TweenGroup;
        close_tween: egret.tween.TweenGroup;
        win_tween: egret.tween.TweenGroup;
        cardType_tween: egret.tween.TweenGroup;
        private _notice;
        /**金币动画 */
        private _coinArmature;
        /**是否在播放tween动画 解决tween回调优先点击事件执行的问题 */
        private _isTween;
        private _chipsBtnIsOpen;
        /**牌型奖金 */
        private _lotchips;
        constructor();
        protected childrenCreated(): void;
        private reset();
        private addEvents();
        private removeEvents();
        private onUpJackPot(evt);
        /**发牌动画结束 */
        private onSendCardComplete();
        private onOpen();
        private onClose();
        /**取分 */
        private onGetChips(evt);
        private onComplete();
        /**
         * 发牌 换牌
         */
        private onTurn(evt);
        /**
         * 开奖信息
         */
        private lotteryInfo(info);
        private getCardType(type);
        /**
         * 点击事件
         */
        private onTouchHandle(evt);
        destroy(): void;
    }
}
declare module FlopMachine {
    class FlopMachineRule extends eui.Component {
        close_btn: eui.WxButton;
        rule_lbl: eui.Label;
        lhp_rbtn: eui.RadioButton;
        cj_rbtn: eui.RadioButton;
        cdx_rbtn: eui.RadioButton;
        constructor();
        protected childrenCreated(): void;
        private onChange(evt);
        private setLabel(index);
        private onTouch();
        destroy(): void;
    }
}
declare module FlopMachine {
    const TURN = "turn";
    const GET_CHIPS = "getChips";
    const GUESS = "guess";
    const JACKPOT = "jackPot";
    const CLOSE_GUESS = "closeGuess";
    const HANG_UP = "hang_up";
}
declare module Cmd {
    /**
     * 发牌 换牌
     */
    function OnTurnLobbyCmd_S(rev: Cmd.TurnLobbyCmd_S): void;
    /**
     * 取分
     */
    function OnGetLotchipsLobbyCmd_S(rev: Cmd.GetLotchipsLobbyCmd_S): void;
    /**
     * 猜大小
     */
    function OnGuessLobbyCmd_S(rev: Cmd.GuessLobbyCmd_S): void;
    /**彩金更新 */
    function OnGetJackpotLobbyCmd_S(rev: Cmd.GetJackpotLobbyCmd_S): void;
    /**挂机 */
    function OnHangUpLobbyCmd_S(rev: Cmd.HangUpLobbyCmd_S): void;
}
