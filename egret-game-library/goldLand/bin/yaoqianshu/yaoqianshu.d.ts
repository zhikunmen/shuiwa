declare module yaoqianshu {
    class YaoQianShuConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共guide需要加载的资源组
         */
        static PUB_YAOQIANSHU: string;
    }
}
declare module yaoqianshu {
    class YaoQianShuPanel extends eui.Component {
        private _closeBtn;
        private _anim;
        private _level;
        private _progressTex;
        private _pickUp;
        private _recharge;
        private _upgrade;
        private _glodNum;
        private _pcikupGroup;
        private _mcardTip;
        private moneyTreeData;
        private timer;
        private GOLDTREE_YAODONG;
        private GOLDTREE_JINBISHAO;
        private GOLDTREE_JINBIDUO;
        constructor();
        protected childrenCreated(): void;
        private addEvents();
        private removeEvents();
        private onTouchHandle(e);
        /**
         * 刷新页面数据
         */
        private updata(e);
        private getGlod(val, level);
        /**
         * 领取金币返回数据
         */
        private getRewardResult(e);
        /**获取月卡信息*/
        private getMonthCard();
        /**
         * 获取金币
         */
        private getReward();
        private initUI();
        /** 根据金币数量要确定摇钱树动画*/
        private treeShake(goldNum);
        private animationName;
        private playAnim(animationName);
        private clear();
        destroy(): void;
    }
}
declare module yaoqianshu {
    class CmdConstant {
        /**请求摇钱树数据*/
        static GLODELE_DATA: string;
        /**请求领取摇钱树金币数据*/
        static GLODELE_GETREWARD: string;
    }
}
declare class YaoQianShuReciveMgr {
    constructor();
}
declare module Cmd {
    /**摇钱树-请求数据 */
    function OnGetMoneyTreeDataLobby_S(rev: Cmd.GetMoneyTreeDataLobby_S): void;
    /**摇钱树-获取金币 */
    function OnGetMoneyTreeGoldLobby_S(rev: Cmd.GetMoneyTreeGoldLobby_S): void;
}
