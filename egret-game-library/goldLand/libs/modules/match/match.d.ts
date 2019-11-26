declare module match {
    class WxGameList extends eui.Component {
        ret_btn: eui.WxButton;
        begin_btn: eui.WxButton;
        ticketGame_scr: eui.Scroller;
        ticketGame_lst: eui.List;
        top_skin: match.WxTopOpBtn;
        begin_ac: eui.ArmatureComponent;
        /**
         * 五元红包赛
         */
        private _beginSceneId;
        private _param;
        constructor(param: Cmd.RequestRankListHpMatchCmd_S);
        protected childrenCreated(): void;
        private onGameListHandler(evt);
        private onTouchHandler(evt);
        private onResize();
        private onItemTapHandler(evt);
        destroy(): void;
    }
}
declare module match {
    /**匹配等待界面 */
    var matchWaitPanel: WxMatchWait | WxEliminateWait;
    class MatchConst {
        static RES_JSON: string;
        static THM_JSON: string;
        /**
         * 主界面需要加载的资源
         */
        static PUB_LOGIN: string;
        /**
         * 好牌网比赛资源组
         */
        static HPW_MATCH: string;
        /**
         * 奖品一览资源组
         */
        static HPW_JPYL: string;
        /**
         * 金币资源组
         */
        static HPW_GOLD: string;
    }
    /**
     * 比赛类型
     */
    enum GameType {
        /**参赛卡赛*/
        TYPE_CARD = 1,
        /**红包淘汰赛 */
        TYPE_OUT = 7,
        /**钻石淘汰赛 */
        TYPE_DIAMOND = 8,
    }
    /**
     * 道具类型
     */
    enum GoodType {
        /**钻石*/
        TYPE_DIAMOND = 6,
        /**金币 */
        TYPE_GOLD = 32,
    }
    /**
     * 1:欢乐场 2:跑八张 3:疯狂场
     */
    enum SceneType {
        /**经典场 必出*/
        TYPE_CALSSIC = 1,
        /**跑八张 */
        TYPE_EIGHT_CARD = 2,
        /**疯狂场 */
        TYPE_CRAZY = 3,
        /**经典场 非必出*/
        TYPE_CLASSIC2 = 4,
    }
    /**排行榜信息 */
    var EVENT_RANKINFO: string;
    /**比赛列表 */
    var EVENT_GAMELIST: string;
    /**红包赛房满进入房间*/
    var EVENT_MATCH_RNTER_ROOM: string;
    /**获奖记录 */
    var EVENT_REWARDRECORD: string;
    /**战绩记录 */
    var EVENT_HISTORY: string;
    /**红包奖励 */
    var EVENT_PACKAGEREWARD: string;
    /**主界面刷新 */
    var EVENT_FLUSH: string;
    /**报名人数更新*/
    var EVENT_REPORT_NUM: string;
    /**匹配人数更新*/
    var EVENT_MATCH_NUM: string;
    /**退出界面时间*/
    var EVENT_CLOSE_PANEL: string;
    /**退出界面时间*/
    var EVENT_CLOSE_PANEL: string;
}
declare module match {
    class BaseButton extends eui.Button {
        constructor();
        private init();
        protected onTouchBegin(): void;
        protected onTouchEnd(): void;
        protected onTouchCancel(): void;
        protected onTouchMove(): void;
        dispose(): void;
    }
}
declare module match {
    /**
     * 金币场选场
     */
    class WxGoldSelectScene extends eui.Component {
        begin_btn: eui.WxButton;
        ret_btn: eui.Image;
        top_skin: match.WxTopOpBtn;
        select_lst: eui.List;
        scene_scr: eui.Scroller;
        private _sceneInfo;
        constructor(sceneInfo: any);
        childrenCreated(): void;
        /**
        * 界面动画
        */
        private animationShow();
        private onDataUpdate();
        private onItemTapHandler(evt);
        private onResize();
        private onTouchanHandler(evt);
        destroy(): void;
    }
}
declare module match {
    class WxGoldSelectSceneItem extends eui.ItemRenderer {
        touch_btn: eui.WxButton;
        bg_img: eui.Image;
        desc_lbl: eui.Label;
        red_lbl: eui.Label;
        constructor();
        childrenCreated(): void;
        dataChanged(): void;
    }
}
declare module match {
    /**
     * 金币场选场
     */
    class WxGoldSelectType extends eui.Component {
        begin_btn: eui.WxButton;
        top_skin: match.WxTopOpBtn;
        ret_btn: eui.WxButton;
        begin_ac: eui.ArmatureComponent;
        type_scr: eui.Scroller;
        select_lst: eui.List;
        private _data;
        constructor(data: Cmd.SceneInfo);
        childrenCreated(): void;
        private onItemTapHandler(evt);
        private onUserInfo(evt);
        private checkEnterRoom();
        private onResize();
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module match {
    class WxGoldSelectTypeItem extends eui.ItemRenderer {
        touch_btn: eui.WxButton;
        bg_img: eui.Image;
        labelDisplay: eui.Label;
        num_lbl: eui.Label;
        point_lbl: eui.Label;
        lowestCarry_lbl: eui.Label;
        desc_lbl: eui.Label;
        type_ac: eui.ArmatureComponent;
        constructor();
        childrenCreated(): void;
        dataChanged(): void;
    }
}
/**
 * 消息接收
 */
declare module Cmd {
    /**
     * 比赛排行榜
     */
    function OnRequestRankInfoHpMatchCmd_S(rev: Cmd.RequestRankInfoHpMatchCmd_S): void;
    /**
     * 比赛列表
     */
    function OnRequestRankListHpMatchCmd_S(rev: Cmd.RequestRankListHpMatchCmd_S): void;
    /**
     * 大厅主界面刷新
     */
    function OnFlushUserHpMatchInfoHpMatchCmd_Brd(rev: Cmd.FlushUserHpMatchInfoHpMatchCmd_Brd): void;
    /**
     * 参加比赛回复
     */
    function OnRequestJoinHpMatchCmd_S(rev: Cmd.RequestJoinHpMatchCmd_S): void;
    /**
     * 参加比赛广播 游戏里面点击再来一局服务器会直接下发这个消息
     */
    function OnWaitListHpMatchCmd_Brd(rev: WaitListHpMatchCmd_Brd): void;
    /**
     * 取消匹配等待
     */
    function OnRequestExitHpMatchCmd_S(rev: Cmd.RequestExitHpMatchCmd_S): void;
    /**
     * 获奖记录
     */
    function OnRequestRewardRecordHpMatchCmd_S(rev: Cmd.RequestRewardRecordHpMatchCmd_S): void;
    /**
     * 战绩
     */
    function OnRequestHistoryHpMatchCmd_S(rev: Cmd.RequestHistoryHpMatchCmd_S): void;
    /**
     * 当前红包奖励
     */
    function OnGetRedPackRewardInfoLobbyCmd_S(rev: Cmd.GetRedPackRewardInfoLobbyCmd_S): void;
    function OnRequestUnLockHpMatchCmd_S(rev: Cmd.RequestUnLockHpMatchCmd_S): void;
    function OnGetTimerMatchUserHpMatchCmd_S(rev: Cmd.GetTimerMatchUserHpMatchCmd_S): void;
    /**
     * 金币场选场数据
     */
    function OnGetGoldCoinSceneInfoHpMatchCmd_S(rev: Cmd.GetGoldCoinSceneInfoHpMatchCmd_S): void;
    function OnEnterMatchRoomCmd_S(rev: Cmd.EnterMatchRoomCmd_S): void;
}
/**
 * 消息发送
 */
declare module match {
    /**
     * 请求排行榜
     */
    function OnRequestRankInfoHpMatchCmd_C(curPage: number, gameId?: number): void;
    /**
   * 请求比赛列表
   */
    function OnRequestRankListHpMatchCmd_C(gameId?: number): void;
    /**
     * 报名 参加比赛
     */
    function OnRequestJoinHpMatchCmd_C(sceneId: number, gameId?: number): void;
    function OnRequestExitHpMatchCmd_C(type: number): void;
    /**
     * 请求获奖记录
     */
    function OnRequestRewardRecordHpMatchCmd_C(curPage: number, sceneId: number): void;
    /**
     * 战绩记录
     */
    function OnRequestHistoryHpMatchCmd_C(curPage: number, type?: number, gameId?: number): void;
    /**
     * 打开红包界面
     */
    function OnGetRedPackRewardInfoLobbyCmd_C(lobbyId?: number): void;
    /**
     * 钻石解锁
     */
    function OnRequestUnLockHpMatchCmd_C(sceneId: number): void;
    /**
     * 获取限时赛报名人数
     */
    function OnGetTimerMatchUserHpMatchCmd_C(sceneId: number): void;
    /**
     * 进入匹配场
     */
    function OnEnterMatchRoomCmd_C(gameId: number, scene: number): void;
    /**
     * 获取金币场选场数据
     */
    function OnGetGoldCoinSceneInfoHpMatchCmd_C(): void;
}
declare module table {
    /**
     * 通过sceneId获取配置
     */
    function getMatchConfigBySceneId(matchId: number): TableMatchReward;
}
declare module match {
    /**淘汰赛匹配等待界面 */
    class WxEliminateWait extends eui.Component {
        title_lbl: eui.Label;
        pro_img: eui.Image;
        num_blbl: eui.BitmapLabel;
        close_btn: eui.WxButton;
        eliminate_grp: eui.Group;
        num_lbl: eui.Label;
        timer_lbl: eui.Label;
        private _mask;
        private _data;
        private _indexArr;
        /**当前人数 */
        private _curNum;
        private _timer;
        constructor(data: Cmd.WaitListHpMatchCmd_Brd);
        childrenCreated(): void;
        private onTimer(evt);
        /**更新 */
        update(data: Cmd.WaitListHpMatchCmd_Brd): void;
        private drawMask(endAngle);
        private onExitHandler(evt);
        private onEventHandler(evt);
        /**进入房间直接显示人数已满 */
        numberFullHandler(): void;
        private onResize();
        destroy(): void;
    }
}
declare module match {
    /**
     * 比赛详情
     */
    class WxGameDetail extends eui.Component {
        rule_btn: eui.WxButton;
        share_btn: eui.WxButton;
        signUp_btn: eui.WxButton;
        close_btn: eui.WxButton;
        record_btn: eui.WxButton;
        title_lbl: eui.Label;
        beginCondition_lbl: eui.Label;
        beginCondDes_lbl: eui.Label;
        signUpCondition_lbl: eui.Label;
        signUpCost_lbl: eui.Label;
        rule_pal: match.WxGameRule;
        private _data;
        constructor(data: Cmd.HpMatchInfo);
        childrenCreated(): void;
        private addStageHandle();
        onTouchHandler(evt: egret.TouchEvent): void;
        private onUpdateNum(evt);
        destroy(): void;
    }
}
declare module match {
    /**
     * 添0操作
     */
    function add0(num: any): any;
    /**
     * 格式化时间戳
     * @time 时间戳
     * @split 分隔符
     * @returns 1990-08-08 09:20
     */
    function formatTime(time: number, split: string): string;
    /**
     * 把秒转换成天小时分钟和秒
     */
    function formatTime2(time: number): string;
    /**
     * 把今天的秒数转换成对应的时间
     */
    function formatTime3(time: number): string;
}
declare module match {
    class WxGameListItem extends eui.ItemRenderer {
        tick_btn: eui.WxButton;
        diamond_img: eui.Image;
        icon_img: eui.Image;
        diamond_blbl: eui.BitmapLabel;
        money_lbl: eui.Label;
        black_img: eui.Image;
        lock_img: eui.Image;
        lockDesc_lbl: eui.Label;
        desc_lbl: eui.Label;
        constructor();
        protected childrenCreated(): void;
        dataChanged(): void;
    }
}
declare module match {
    class WxGameRecord extends eui.Component {
        close_btn: eui.WxButton;
        nextPage_btn: eui.WxButton;
        prePage_btn: eui.WxButton;
        record_lst: eui.List;
        private _recordColl;
        private _data;
        private _sub1Index;
        private _sceneId;
        constructor(sceneId: number);
        childrenCreated(): void;
        private onDataHandler(evt);
        private nextPage();
        private prePage();
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module match {
    class WxGameRecordItem extends eui.ItemRenderer {
        one_lbl: eui.Label;
        min_lbl: eui.Label;
        sec_lbl: eui.Label;
        third_lbl: eui.Label;
        two_lbl: eui.Label;
        rank_lbl: eui.Label;
        constructor();
        dataChanged(): void;
    }
}
declare module match {
    /**
     * 奖品一览
     */
    class WxGameReward extends eui.Component {
        share_btn: eui.WxButton;
        close_btn: eui.WxButton;
        desc_lbl: eui.Label;
        constructor();
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module match {
    class WxGameRule extends eui.Component {
        rule_lbl: eui.Label;
        constructor();
        setType(type: GameType): void;
    }
}
declare module match {
    /**匹配等待界面 */
    class WxMatchWait extends eui.Component {
        expectTime_lbl: eui.Label;
        condition_lbl: eui.Label;
        title_lbl: eui.Label;
        time_lbl: eui.BitmapLabel;
        num_grp: eui.Group;
        close_btn: eui.WxButton;
        private _matchType;
        private _timer;
        private _data;
        constructor(data: Cmd.WaitListHpMatchCmd_Brd);
        childrenCreated(): void;
        /**更新 */
        update(data: Cmd.WaitListHpMatchCmd_Brd): void;
        private onTimerHandler(evt);
        private onExitHandler(evt);
        private onEventHandler(evt);
        numberFullHandler(): void;
        private onResize();
        destroy(): void;
    }
}
declare module match {
    class WxMsgBox extends eui.Component {
        confirm_confirm_btn: eui.WxButton;
        confirm_cancel_btn: eui.WxButton;
        confirm_text: eui.Label;
        private _content;
        private _textAlign;
        private _confirmCall;
        private _cancelCall;
        private _callObj;
        constructor(content: string | Array<egret.ITextElement>, confirmCall?: Function, cancelCall?: Function, callObj?: any, textAlign?: string);
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module match {
    class WxTopOpBtn extends eui.Component {
        diamond_btn: eui.WxButton;
        gold_btn: eui.WxButton;
        ticket_btn: eui.WxButton;
        constructor();
        gold2str(gold: number): string;
        childrenCreated(): void;
        private onUserInfoChanged(e);
        private onTouchHandler(evt);
        destroy(): void;
    }
}
declare module match {
    class WxUnlockGame extends eui.Component {
        close_btn: eui.WxButton;
        unlock_btn: eui.WxButton;
        share_btn: eui.WxButton;
        head_grp: eui.Group;
        private _data;
        constructor(data: Cmd.HpMatchInfo);
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
