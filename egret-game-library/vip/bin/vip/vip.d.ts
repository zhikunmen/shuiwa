/**
*  文 件 名：ItemScroll.ts
*  功    能： 滚动组件
*  内    容： 自定义组件，支持多张图片水平(垂直)切换滚动
*
* Example:
* 1. 从自定义组件中找到ItemScroller，并拖动到exml上
* 2. 将需要显示对象(图片等)拖动到ItemScroller的Group下
* 3. 设置Group的布局为垂直or水平
*/
declare class ItemScroller extends eui.Scroller {
    /**滚动项数量*/
    itemNum: number;
    /**单个滚动项长度*/
    itemSize: number;
    /**当前滚动到第几项  0表示第1项*/
    curItemCount: number;
    /**滚动时间*/
    delayScroll: number;
    /**是否是水平滚动*/
    isHScroller: Boolean;
    /**触摸起始位置*/
    private touchStartPos;
    /**当前触摸位置和起始触摸位置距离*/
    private touchDist;
    constructor();
    private onCreateComplete();
    /**拖动开始*/
    private onChangeStartHandler();
    /**拖动结束  拖动>=2项时无法调到正确的选项*/
    private onChangeEndHandler();
    /**滑动到下一项*/
    scrollToNext(): void;
    /**滑动到上一项*/
    scrollToLast(): void;
    /**
     * 滚动到指定项 (0是第一项)
     * @item 指定项
     */
    scrollToItem(item: number): void;
    /**销毁*/
    destroy(): void;
}
declare module vip {
    class VIPConsts {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 公共guide需要加载的资源组
         */
        static PUB_VIP: string;
    }
}
declare class VIPItemView extends eui.ItemRenderer {
    private pao_text;
    private pao_img;
    private vip_level;
    private vip_desc;
    private vip_receive;
    private paoEffect;
    constructor();
    protected childrenCreated(): void;
    private onTouchHandle(e);
    dataChanged(): void;
    private setPaoWH(id);
    private setEffect(id);
    private removeEffect();
    destroy(): void;
}
declare module vip {
    class VIPPanel extends eui.Component {
        private _closeBtn;
        private _progressTex;
        private vip_start;
        private vip_end;
        private _rechargeCur;
        private _rechargeMask;
        private _needTex;
        private vip_list;
        private scrol;
        private _recharge;
        private _leftBtn;
        private _rightBtn;
        private paoEffect;
        private _level;
        private _maxLevel;
        private _extra;
        private _dataList;
        constructor(level?: number);
        protected childrenCreated(): void;
        private addEvents();
        private initUI(noget, vipLevel);
        private onFishVipInfo(e);
        private onFishVipReward(e);
        private setVip2(rev);
        private removeEvents();
        private onTouchHandle(e);
        private scrollVip();
        private getVIPLvList(noget);
        static createMovieClicp(groupName: string, keyName?: string): egret.MovieClip;
        destroy(): void;
    }
    class VipReward {
        level: number;
        unReceived: boolean;
    }
}
declare module vip {
    class CmdConstant {
        /**请求捕鱼VIP数据*/
        static FISHVIP_INFO: string;
        static FISHVIP_REWARD: string;
    }
}
declare class VipReciveMgr {
    constructor();
}
declare module Cmd {
    /**VIP-请求数据 */
    function OnGetFishVipInfoCmd_S(rev: Cmd.GetFishVipInfoCmd_S): void;
    function OnGetFishVipRewardCmd_CS(rev: Cmd.GetFishVipRewardCmd_CS): void;
}
