declare module match {
    /**闯关 */
    class WxPigRushThrough extends eui.Component {
        bg_img: eui.Image;
        ret_btn: eui.WxButton;
        top_skin: match.WxTopOpBtn;
        rule_btn: eui.WxButton;
        silverPig_btn: eui.WxButton;
        goldPig_btn: eui.WxButton;
        cardRush_btn: eui.WxButton;
        diamondRush_btn: eui.WxButton;
        goldRush_btn: eui.WxButton;
        rbtnBg_img: eui.Image;
        cardRush_rbtn: eui.RadioButton;
        goldRush_rbtn: eui.RadioButton;
        /**这里保存gameId是为了区分麻将和跑得快 */
        private _gameId;
        /**金猪银猪 */
        private _pigData;
        /**金币福卡钻石 */
        private _rushData;
        constructor(info: {
            data: any;
            gameId: number;
        });
        protected childrenCreated(): void;
        private setData(data);
        /**数据 */
        private onPigData(evt?);
        private onRbtnChange(evt);
        private onTouchHandler(evt);
        private onResize();
        destroy(): void;
    }
}
declare module match {
    /**匹配等待界面 */
    var matchWaitPanel: WxMatchWait | WxEliminateWait;
    var sceneInfoMap: Map<number, Cmd.GetSceneInfoHpMatchCmd_S>;
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
         * 金币资源组
         */
        static HPW_GOLD: string;
        /**
         * 金猪资源组
         */
        static HPW_PIG: string;
        /**
         * 捕鱼资源组
         */
        static BUYU: string;
        static BUYU_REWARD: string;
        /**
         * 闯关报名界面
         */
        static HPW_RUSH: string;
    }
    /**
     * 游戏Id
     */
    enum GameId {
        /**跑得快比赛和金猪*/
        ID_MATCH_PIG = 4231,
        /**跑得快金币场和福卡闯关 */
        ID_COIN_FOUCA = 4239,
        /**跑得快房卡 */
        ID_CARD = 4207,
        /**二人麻将 */
        ID_ERMJ = 4249,
        /**捕鱼 */
        ID_BUYU = 150,
    }
    /**
     * 大类型 以前没有定义 现在枚举一个
     *1:金币场 2:金银猪 3:闯关 4:比赛
     */
    enum BigSceneType {
        /**金币场*/
        TYPE_COIN = 1,
        /**金银猪 */
        TYPE_PIG = 2,
        /**闯关 */
        TYPE_RUSH = 3,
        /**比赛 */
        TYPE_MATCH = 4,
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
        /**福卡 */
        TYPE_FUKA = 336,
        /**彩蛋 */
        TYPE_EGG = 340,
    }
    enum SceneType {
        /**比赛场 */
        TYPE_MATCH = 0,
        /**经典场 必出*/
        TYPE_CALSSIC = 1,
        /**跑八张 */
        TYPE_EIGHT_CARD = 2,
        /**疯狂场 */
        TYPE_CRAZY = 3,
        /**经典场 非必出*/
        TYPE_CLASSIC2 = 4,
        /**金猪 */
        TYPE_PIG = 5,
        /**换三张 */
        TYPE_EXCHANGE = 6,
        /**福卡闯关 */
        TYPE_FUKA = 7,
        /**游戏更新公告 */
        TYPE_NOTICE = 8,
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
    /**金猪银猪数据*/
    var EVENT_PIG_DATA: string;
}
declare module match {
    class BuYuEvent extends egret.Event {
        static CLICK_ITEM_REWARD: string;
        static CLICK_ITEM_GAME: string;
        data: any;
        constructor(type: string, $data?: any);
    }
}
declare module match {
    class WxBuyuReward extends eui.Component {
        _closeBtn: eui.WxButton;
        private buyu_icon;
        private buyu_txt;
        private unlock_level;
        private _enterBtn;
        private fishContain;
        private rewardContain;
        private _data;
        private _isNumber;
        private fishZH;
        private fishTag;
        constructor(data: any);
        protected childrenCreated(): void;
        private onTouchHandle(e);
        private enterGame(senceId, roomType);
        destroy(): void;
    }
    class FishTypeItem extends eui.ItemRenderer {
        private fish;
        private nameTxt;
        constructor();
        private initUI();
        dataChanged(): void;
    }
    class WxBuyuGoodItem extends eui.ItemRenderer {
        private goodIcon;
        private nameTxt;
        constructor();
        private initUI();
        dataChanged(): void;
    }
}
declare module match {
    class WxBuYuSelect extends eui.Component {
        bg_img: egret.Bitmap;
        begin_btn: eui.WxButton;
        ret_btn: eui.WxButton;
        begin_ac: eui.ArmatureComponent;
        type_scr: eui.Scroller;
        select_lst: eui.Group;
        private gameTypes;
        private _data;
        private _gameId;
        constructor(gameid: number);
        protected childrenCreated(): void;
        private initInfo(gameid);
        private onGameHandler(evt);
        private onRewardHandler(evt);
        private onUserInfo(evt);
        private onResize();
        private onTouchHandler(evt);
        private enterGame(senceId, roomType);
        destroy(): void;
    }
}
declare module match {
    class WxBuYuSelectItem extends eui.Component {
        touch_btn: eui.WxButton;
        reward_btn: eui.WxButton;
        lock_desc: eui.Group;
        lock_tex: eui.BitmapLabel;
        private _info;
        static SELECT_BUYU_ICONS: string[];
        private _created;
        constructor();
        protected childrenCreated(): void;
        setInfo(data: table.TableCoinHundredConfig): void;
        private onTouchHander(event);
        destroy(): void;
    }
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
        bg_img: eui.Image;
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
        bg_img: eui.Image;
        top_skin: match.WxTopOpBtn;
        ret_btn: eui.WxButton;
        type_scr: eui.Scroller;
        select_lst: eui.List;
        rule_btn: eui.WxButton;
        classic_rbtn: eui.RadioButton;
        boom_rbtn: eui.RadioButton;
        exchange_rbtn: eui.RadioButton;
        private _index;
        private _sceneInfo;
        private _data;
        /**
      * @param type 1:经典场 3:疯狂场 6.换三张
      */
        constructor(sceneInfo: Cmd.SceneInfo[], type?: number);
        childrenCreated(): void;
        private setView(type);
        private onItemTapHandler(evt);
        private onUserInfo(evt);
        private checkEnterRoom();
        private onResize();
        private onChange(evt);
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
declare module match {
    class WxMahjongSelect extends eui.Component {
        bg_img: eui.Image;
        begin_btn: eui.WxButton;
        ret_btn: eui.WxButton;
        begin_ac: eui.ArmatureComponent;
        type_scr: eui.Scroller;
        select_lst: eui.List;
        private _data;
        private _gameId;
        constructor(gameid: number);
        protected childrenCreated(): void;
        private initInfo(gameid);
        private onItemTapHandler(evt);
        private onUserInfo(evt);
        private checkEnterRoom();
        private onResize();
        private onTouchHandler(evt);
        private enterGame(senceId);
        destroy(): void;
    }
}
declare module match {
    class WxMahjongSelectItem extends eui.ItemRenderer {
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
    function OnEnterMatchRoomCmd_S(rev: Cmd.EnterMatchRoomCmd_S): void;
    /**所有场次信息 全部在这一条协议 */
    function OnGetSceneInfoHpMatchCmd_S(rev: Cmd.GetSceneInfoHpMatchCmd_S): void;
}
/**
 * 消息发送
 */
declare module match {
    /**
     * @param type BigSceneType 1:金币场 2:金银猪 3:闯关 4:比赛
     * @param gameId mathch.GameId
     */
    function OnGetSceneInfoHpMatchCmd_C(type: BigSceneType, gameId: number, lobbyId?: number): void;
    /**
     * 请求排行榜
     */
    function OnRequestRankInfoHpMatchCmd_C(curPage: number, gameId?: number): void;
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
   * 进入金猪银猪闯关
   */
    function OnEnterChallengeHpMatchCmd_C(type: number, round: number, gameId: number): void;
    /**请求闯关 */
    function OnEnterRushHpMatchCmd_C(type: number, gameId: number): void;
}
declare module table {
    /**
     * 通过sceneId获取配置
     */
    function getMatchConfigBySceneId(matchId: number): TableMatchReward;
}
declare module match {
    class WxPigPassItem extends eui.ItemRenderer {
        lock_img: eui.Image;
        pass_lbl: eui.Label;
        constructor(data: Cmd.ChallengeInfo);
        protected dataChanged(): void;
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
     * goodId转汉字
     */
    function getDescByGoodId(goodId: number): "钻石" | "金币" | "福卡";
    /**判断道具是否足够 */
    function judgeItemIsEnough(goodId: number, goodNum: number): boolean;
}
declare module match {
    class WxPigSelectPass extends eui.Component {
        ret_btn: eui.WxButton;
        top_skin: match.WxTopOpBtn;
        chall_btn: eui.WxButton;
        againChall_btn: eui.WxButton;
        title_lbl: eui.Label;
        reward_lbl: eui.Label;
        gold_lbl: eui.Label;
        pro_lbl: eui.Label;
        sel_lst: eui.List;
        private _data;
        private _gameId;
        constructor(data: {
            info: Cmd.ChallengeInfo;
            gameId: number;
        });
        protected childrenCreated(): void;
        private initComp(data);
        private onItemTap(evt);
        private onTouchHandler(evt);
        private onResize();
        destroy(): void;
    }
}
declare module match {
    /**淘汰赛匹配等待界面 */
    class WxEliminateWait extends eui.Component {
        bg_img: eui.Image;
        title_lbl: eui.Label;
        pro_img: eui.Image;
        num_blbl: eui.BitmapLabel;
        close_btn: eui.WxButton;
        eliminate_grp: eui.Group;
        num_lbl: eui.Label;
        timer_lbl: eui.Label;
        reward_grp: eui.Group;
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
        costType_img: eui.Image;
        sign_btn: eui.WxButton;
        close_btn: eui.WxButton;
        reward_lst: eui.List;
        title_lbl: eui.Label;
        num_lbl: eui.Label;
        cost_lbl: eui.Label;
        sign_lbl: eui.Label;
        private _data;
        constructor(data: Cmd.HpMatchInfo);
        childrenCreated(): void;
        onTouchHandler(evt: egret.TouchEvent): void;
        destroy(): void;
    }
}
declare module match {
    /**
     * 比赛详情项
     */
    class WxGameDetailItem extends eui.ItemRenderer {
        rank_img: eui.Image;
        reward0_lbl: eui.Label;
        reward1_lbl: eui.Label;
        rank_lbl: eui.Label;
        constructor();
        dataChanged(): void;
    }
}
declare module match {
    class WxGameList extends eui.Component {
        bg_img: eui.Image;
        ret_btn: eui.WxButton;
        begin_btn: eui.WxButton;
        ticketGame_scr: eui.Scroller;
        ticketGame_lst: eui.List;
        top_skin: match.WxTopOpBtn;
        rule_btn: eui.WxButton;
        begin_ac: eui.ArmatureComponent;
        /**
         * 五元红包赛
         */
        private _beginSceneId;
        private _param;
        constructor(param: Cmd.HpMatchInfo[]);
        protected childrenCreated(): void;
        private onGameListHandler(evt);
        private onTouchHandler(evt);
        private onResize();
        private onItemTapHandler(evt);
        destroy(): void;
    }
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
        title_img: eui.Image;
        close_btn: eui.WxButton;
        title_lbl: eui.Label;
        rule_lbl: eui.Label;
        private _sceneType;
        constructor(sceneType?: SceneType);
        protected childrenCreated(): void;
        setData(sceneType: SceneType): void;
        private onTouch();
        destroy(): void;
    }
}
declare module match {
    /**匹配等待界面 */
    class WxMatchWait extends eui.Component {
        bg_img: eui.Image;
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
    /**
     * 闯关报名
     */
    class WxRushGameDetail extends eui.Component {
        bg_img: eui.Image;
        title_img: eui.Image;
        close_btn: eui.WxButton;
        begin_btn: eui.WxButton;
        continue_btn: eui.WxButton;
        condition_lbl: eui.Label;
        pass_db: dragonBones.Armature;
        private _data;
        private _gameId;
        constructor(data: {
            info: Cmd.RushInfo;
            gameId: number;
        });
        childrenCreated(): void;
        private format(items);
        onTouchHandler(evt: egret.TouchEvent): void;
        destroy(): void;
    }
}
declare module match {
    class WxTopOpBtn extends eui.Component {
        diamond_btn: eui.WxButton;
        gold_btn: eui.WxButton;
        ticket_btn: eui.WxButton;
        static HAS_HPW_MATCH: boolean;
        constructor();
        gold2str(gold: number): string;
        childrenCreated(): void;
        private onUserInfoChanged(e);
        protected onTouchHandler(evt: egret.TouchEvent): void;
        destroy(): void;
    }
}
declare module match {
    class WxUnlockGame extends eui.Component {
        close_btn: eui.WxButton;
        unlock_btn: eui.WxButton;
        share_btn: eui.WxButton;
        head_grp: eui.Group;
        tips_lbl: eui.Label;
        private _data;
        constructor(data: Cmd.HpMatchInfo);
        childrenCreated(): void;
        private onTouchHandler(evt);
        destroy(): void;
    }
}
