declare module table {
    /**
     * FILE: a怪物表.xlsx SHEET: 鱼
     */
    class TableFish {
        /**
         * 怪物id
         */
        fishID: number;
        /**
         * 怪物名称
         */
        fishName: string;
        /**
         * 最低倍数
         */
        minTime: number;
        /**
         * 最高倍数
         */
        maxTime: number;
        /**
         * 血量
         */
        blood: number;
        /**
         * 捕获概率
         */
        fishChance: number;
        /**
         * 种类
         */
        fishType: number;
        /**
         * 技能
         */
        fishSkill: number[];
        /**
         * 掉落
         */
        fishDrop: number[];
        /**
         * 优先权重
         */
        priorityWeight: number;
        GetType(): string;
    }
}
declare module Cmd {
    enum CodeEnum {
        /**
         * 成功
         */
        SUCCESS = 0,
    }
    /**
     * ---------------------------------公共模块----------------------------//
     */
    enum CommonModel {
        /**
         * 充值
         */
        RECHARGE = 1,
        /**
         * 在线礼包
         */
        ONLINE_GIFT = 2,
        /**
         * 背包
         */
        BAG = 3,
        /**
         * 活动中心
         */
        ACTIVITY = 4,
        /**
         * 个人信息
         */
        MY = 5,
        /**
         * 大厅底部菜单
         */
        LOBBY_MAIN_MENU = 6,
        /**
         * 游戏头部聊天
         */
        TOP_CHAT = 7,
        /**
         * 查看玩家信息
         */
        USERINFO = 8,
        /**
         * 兑换话费卡
         */
        EXCHANGE_PHONECARD = 9,
        /**
         * 大厅公告
         */
        LOBBY_NOTICE = 10,
        /**
         * 设置
         */
        LOBBY_SETTING = 11,
    }
    /**
     * 聊天广播类型
     */
    enum CHAT_TYPE {
        /**
         * 房间消息
         */
        ROOM = 1,
        /**
         * 喇叭消息
         */
        HORN = 2,
        /**
         * 语音消息
         */
        VOICE = 3,
    }
    /**
     * ---------------------------------公共消息----------------------------//
     * 游戏发送给大厅
     */
    enum CommonEvent_G2L {
        /**
         * 领取在线礼包
         */
        GET_ONLIEN_GIFT = 1,
    }
    /**
     * 大厅发送给游戏
     */
    enum CommonEvent_L2G {
        /**
         * 在线礼包时间更新
         */
        GET_ONLIEN_GIFT_TIME = 1,
        /**
         * 在线礼包时间完成
         */
        ON_ONLIEN_GIFT_TIME_END = 2,
        /**
         * 设置面板
         */
        ON_SETTING = 3,
        /**
         * 设置面板
         */
        ON_HELP = 4,
    }
    /**
     * 玩家在线状态
     */
    enum OnlineState {
        /**
         * 离线
         */
        OnlineState_Offline = 0,
        /**
         * 在线
         */
        OnlineState_Online = 1,
        /**
         * 网络差
         */
        OnlineState_Slow = 2,
        /**
         * 离开,切后台
         */
        OnlineState_Leave = 3,
        /**
         * 电话中
         */
        OnlineState_Calling = 4,
        /**
         * 托管状态
         */
        OnlineState_Hosting = 5,
        /**
         * 排队中,匹配号用
         */
        OnlineState_Waiting = 6,
        /**
         * 游戏中,匹配号用
         */
        OnlineState_Gameing = 7,
        /**
         * 观战状态
         */
        OnlineState_Watching = 8,
    }
    /**
     * 房间类型
     */
    enum RoomType {
        /**
         * 普通房间
         */
        RoomType_Normal = 0,
        /**
         * 快速匹配房
         */
        RoomType_Quick = 1,
        /**
         * 练习场
         */
        RoomType_Learn = 2,
        /**
         * 匹配号生成房,roomid==globalroomid
         */
        RoomType_Match = 3,
    }
    enum MsgType {
        /**
         * 底部菜单-&gt;商城
         */
        Shop = 1,
        /**
         * 底部菜单-&gt;好友
         */
        Friend = 2,
        /**
         * 底部菜单-&gt;救济金
         */
        Alms = 3,
        /**
         * 底部菜单-&gt;活动
         */
        Activity = 4,
        /**
         * 底部菜单-&gt;任务
         */
        DaysTask = 5,
        /**
         * 底部菜单-&gt;更多
         */
        More = 6,
        /**
         * 底部菜单-&gt;摇钱树
         */
        MoneyTree = 7,
        /**
         * 通知
         */
        Notice = 8,
        /**
         * 俱乐部
         */
        Club = 9,
        /**
         * 战绩
         */
        Statistics = 10,
        /**
         * 邮件
         */
        Mail = 11,
        /**
         * 分享有礼
         */
        Share = 12,
        /**
         * 邀请有礼
         */
        Invitation = 13,
        /**
         * 收藏有礼
         */
        Subscribe = 14,
        /**
         * 桌面启动
         */
        Desk = 15,
        /**
         * 成长任务
         */
        GrowTask = 16,
        /**
         * 首充礼包
         */
        FirstCharge = 17,
        /**
         * 关注公众号
         */
        PublicAccount = 18,
        /**
         * 底部菜单-&gt;商城-&gt;礼品屋
         */
        GiftHouse = 100,
        /**
         * 底部菜单-&gt;好友-&gt;好友消息
         */
        FriendMsg = 200,
        /**
         * 底部菜单-&gt;好友-&gt;好友请求
         */
        FriendReq = 201,
        /**
         * 底部菜单-&gt;救济金-&gt;领取救济金
         */
        GetAlms = 300,
        /**
         * 俱乐部牌局
         */
        ClubGame = 301,
        /**
         * 俱乐部成员
         */
        ClubMember = 302,
        /**
         * 俱乐部申请
         */
        ClubApply = 303,
        ClubTransit = 304,
        /**
         * 底部菜单-&gt;活动-&gt;每日签到
         */
        Act_DaySign = 400,
        /**
         * 底部菜单-&gt;活动-&gt;幸运翻翻翻
         */
        Act_TurnCard = 401,
        /**
         * 底部菜单-&gt;活动-&gt;幸运大转盘
         */
        Act_TurnTable = 402,
        /**
         * 底部菜单-&gt;任务-&gt;挑战任务
         */
        Task_fight = 500,
        /**
         * 底部菜单-&gt;任务-&gt;充值任务
         */
        Task_TurnTable = 501,
        /**
         * 底部菜单-&gt;任务-&gt;每日任务
         */
        Task_EveryDay = 502,
        /**
         * 底部菜单-&gt;任务-&gt;成就任务
         */
        Task_Once = 503,
        /**
         * 底部菜单-&gt;更多-&gt;公告
         */
        Task_Notice = 600,
        /**
         * 底部菜单-&gt;更多-&gt;魅力值
         */
        Task_Charm = 601,
        /**
         * 底部菜单-&gt;更多-&gt;邮件
         */
        Task_NewMail = 602,
        /**
         * 底部菜单-&gt;更多-&gt;vip
         */
        Task_VIP = 603,
        /**
         * 底部菜单-&gt;摇钱树-&gt;领取金币
         */
        Task_MoneyTree = 701,
    }
    enum KEY_TYPE {
        /**
         * 10元红包活动
         */
        NEW_SIGN = 1,
        /**
         * 比赛在线人数
         */
        ONLINE_MATCH = 2,
        /**
         * 新人成长任务
         */
        NEW_GROW = 3,
        /**
         * 特殊首充礼包 对应value: 1:1元 2:3元
         */
        FIRST_CHARGE = 4,
    }
    /**
     * 容器更新操作符
     */
    enum UpdateOperator {
        /**
         * 全部覆盖
         */
        Replace = 1,
        /**
         * 追加或更新
         */
        Update = 2,
        /**
         * 删除
         */
        Delete = 3,
        /**
         * 站起
         */
        StandUp = 4,
    }
    /**
     *  前端上传分享结果
     *  分享类型
     */
    enum ShareType {
        /**
         * 比赛邀请
         */
        match = 1,
        /**
         * 苹果送钻石
         */
        ios = 2,
        /**
         * 邀请有礼
         */
        invite = 3,
        /**
         * 每日任务
         */
        task = 4,
        /**
         * 解锁
         */
        unlock = 5,
        /**
         * 游戏结算
         */
        game = 6,
        /**
         * 新手分享
         */
        novice = 7,
        /**
         * 邀请进房间--房卡
         */
        enterRoom = 8,
        /**
         * 战绩分享
         */
        record = 9,
        /**
         * 金币场分享
         */
        gold = 10,
        /**
         * 代付
         */
        payOther = 11,
        /**
         * 幸运抽奖
         */
        luckyturn = 12,
        /**
         * 通用
         */
        common = 13,
    }
    /**
     * 操作类型
     */
    enum ShareOpType {
        /**
         * 分享出去
         */
        share = 1,
        /**
         * 点击分享链接
         */
        click = 2,
    }
    /**
     * 下注基本信息
     */
    class BetItem {
        /**
         * 下指定位置 天地玄黄 分别为 1/2/3/4
         */
        betId: number;
        /**
         * 筹码
         */
        chips: number;
        /**
         * 输赢筹码
         */
        profit: number;
        GetType(): string;
    }
    /**
     * 房间内玩家信息
     */
    class RoomUserInfo {
        uid: number;
        headUrl: string;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 如果为0就是站着
         */
        seatId: number;
        /**
         * 玩家当前筹码
         */
        remainder: number;
        /**
         * 玩家本局已下注信息
         */
        userBet: BetItem[];
        /**
         * 性别
         */
        gender: string;
        /**
         * 奖券
         */
        giftCoupon: number;
        /**
         * 个性签名
         */
        signature: string;
        /**
         * vip等级
         */
        vipLevel: number;
        /**
         * 当前赢得的金币，刚进去为0
         */
        curWinProfit: number;
        /**
         * 喇叭
         */
        horn: number;
        /**
         * 玩家当前钻石
         */
        diamond: number;
        /**
         * 正在使用的个人形象 2017.11.15好彩真人需求
         */
        personalImage: PersonalImage[];
        GetType(): string;
    }
    /**
     * 平台用户信息
     */
    class PlatInfo {
        /**
         * 用户账号。platid为PlatType_Normal时，account可以缺省为客户端机器码
         */
        account: string;
        /**
         * 平台id 从PlatType改成int类型
         */
        platid: number;
        email: string;
        /**
         * 性别
         */
        gender: string;
        /**
         * 昵称
         */
        nickname: string;
        /**
         * 时间戳
         */
        timestamp: string;
        /**
         * 平台签名串
         */
        sign: string;
        /**
         * 平台头像
         */
        faceurl: string;
        /**
         * 增加一个扩展字段，特殊平台自行组装json
         */
        extdata: string;
        /**
         * 平台id(兼容老的处理方式)
         */
        uid: string;
        /**
         * 客户端机器码
         */
        imei: number;
        /**
         * 系统名称
         */
        osname: string;
        /**
         * 为了支持多个公众号
         */
        platappid: string;
        /**
         * 二次登录随机码 用于非独立账号绑定用
         */
        bindcode: string;
        /**
         * 临时token,用来绕过第三方验证,由login直接认证通过,第三方服务器出问题时用
         */
        onetoken: string;
        GetType(): string;
    }
    class UI_CommonChat_C {
        words: string;
        /**
         * 普通聊天不发这个字段，广播发1
         */
        brdType: CHAT_TYPE;
        GetType(): string;
    }
    class UI_CommonChat_S {
        resultCode: number;
        desc: string;
        /**
         * 剩余喇叭数量，需要时候才发
         */
        horn: number;
        GetType(): string;
    }
    class UI_CommonChat_Brd {
        uid: number;
        words: string;
        headUrl: string;
        nickName: string;
        /**
         * 字符串+vip等级
         */
        vipLevel: string;
        /**
         * 时间戳
         */
        time: number;
        seatId: number;
        /**
         * 1-普通聊天 2-小喇叭
         */
        brdType: CHAT_TYPE;
        GetType(): string;
    }
    /**
     * 语音聊天
     */
    class UI_VoiceChat_C {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        GetType(): string;
    }
    class UI_VoiceChat_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class UI_VoiceChat_Brd {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 发送语音的玩家id
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 请求无座玩家列表
     */
    class UI_GetNotSeatUserListRoomCmd_C {
        /**
         * 当前请求第几页数据
         */
        curPage: number;
        GetType(): string;
    }
    /**
     * 请求无座玩家列表
     */
    class UI_GetNotSeatUserListRoomCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 当前页数
         */
        curPage: number;
        /**
         * 玩家列表 每次最多返回20个
         */
        users: RoomUserInfo[];
        GetType(): string;
    }
    /**
     * 大厅公共聊天
     */
    class LobbyCommonChatLobby_C {
        /**
         * 聊天内容
         */
        chatInfo: string;
        GetType(): string;
    }
    /**
     * 大厅公共聊天返回
     */
    class LobbyCommonChatLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 剩余时间
         */
        remainder: number;
        /**
         * 剩余喇叭
         */
        horn: number;
        GetType(): string;
    }
    /**
     * 聊天广播
     */
    class LobbyCommonChatLobby_Brd {
        /**
         * 聊天信息
         */
        info: CommonChatInfo;
        /**
         * 聊天类型，1：大厅内喇叭，2：游戏内
         */
        type: number;
        GetType(): string;
    }
    /**
     * 聊天信息
     */
    class CommonChatInfo {
        /**
         * 玩家昵称
         */
        nickName: string;
        /**
         * 玩家vip等级
         */
        vipLevel: number;
        /**
         * 聊天内容
         */
        chatInfo: string;
        uid: number;
        /**
         * 座位号
         */
        seatId: number;
        /**
         * 1：喇叭来自大厅
         */
        type: number;
        /**
         * 时间戳
         */
        timestamp: number;
        GetType(): string;
    }
    /**
     * 获取世界聊天信息
     */
    class GetCommonChatInfoLobby_C {
        GetType(): string;
    }
    /**
     * 获取世界聊天信息返回
     */
    class GetCommonChatInfoLobby_S {
        /**
         * 聊天信息
         */
        info: CommonChatInfo[];
        /**
         * 自己的喇叭数目
         */
        horn: number;
        /**
         * 自己的状态，1：游客；2：其他
         */
        state: number;
        GetType(): string;
    }
    /**
     * 大厅界面显示 个人积分数据
     */
    class LobbyKeyValue {
        id: KEY_TYPE;
        value: number;
        GetType(): string;
    }
    class RewardItem {
        /**
         * 物品ID
         */
        goodId: number;
        /**
         * 物品数量
         */
        goodNbr: number;
        goodType: number;
        GetType(): string;
    }
    /**
     * 房间属性
     */
    class roomPropObj {
        /**
         * 1:房间局数 3:人数模式 4:支付模式 5:游金倍数 101:鬼牌模式(0无鬼 1 2) 102:打捆(金华)
         */
        id: number;
        value: number;
        GetType(): string;
    }
    class RoomState {
        /**
         * 配置出牌倒计时
         */
        outCount: number;
        /**
         * 配置操作牌倒计时
         */
        opCount: number;
        /**
         * 进入房间id
         */
        roomId: number;
        /**
         * 玩家基础信息
         */
        userInfoSet: UserBaseInfo[];
        /**
         * 房间类型RoomType,0表示正常放假,1表示快速匹配场,2表示练习场
         */
        roomType: number;
        /**
         * 所有已准备玩家uid
         */
        prepareSet: number[];
        /**
         * 音效音乐等设置信息
         */
        setInfo: SetInfo;
        /**
         * 房间属性,带kv属性的
         */
        roomProps: roomPropObj[];
        /**
         * 玩法属性,只是开关类型的
         */
        props: number[];
        /**
         * 剩余解散房间的时间秒
         */
        dissoveTime: number;
        /**
         * 对赌类型 1:金币 2:钻石
         */
        gambletype: number;
        /**
         * 金币场底注
         */
        betchips: number;
        /**
         * 是否是暗杠, 1非暗杠 2暗杠
         */
        darkBar: number;
        /**
         * 金币场输赢上限
         */
        winLimit: number;
        /**
         * 进入房间matchId
         */
        matchId: number;
        /**
         * 底注
         */
        bottomPoint: number;
        /**
         * 入场
         */
        enteringPoint: number;
        /**
         * 离场
         */
        leavingPoint: number;
        /**
         * 最小匹配分
         */
        minMatchPoint: number;
        /**
         * 当前房间游戏局数
         */
        curGameNbr: number;
        GetType(): string;
    }
    /**
     * 分享信息
     */
    class ShareInfo {
        /**
         * 标题
         */
        title: string;
        /**
         * 内容
         */
        content: string;
        /**
         * 分享地址
         */
        webPageUrl: string;
        /**
         * 二维码
         */
        codeUrl: string;
        GetType(): string;
    }
    /**
     * 邮寄地址
     */
    class DeliverAddr {
        /**
         * 邮政编码,可不要
         */
        code: number;
        /**
         * 收件人姓名
         */
        name: string;
        /**
         * 收件人电话
         */
        phone: string;
        /**
         * 收件详细地址
         */
        addr: string;
        /**
         * 微信
         */
        wechat: string;
        /**
         * qq 2017.11.15好彩真人添加
         */
        qq: string;
        /**
         * 邮箱 2017.11.15好彩真人添加
         */
        mail: string;
        GetType(): string;
    }
    class flowerObj {
        id: number;
        num: number;
        GetType(): string;
    }
    class njU {
        /**
         * 当前分数
         */
        curP: number;
        /**
         * 南京麻将总点数
         */
        tolP: number;
        GetType(): string;
    }
    /**
     * 比赛场入场券相关
     */
    class ticketObj {
        /**
         * 入场券id
         */
        ticketId: number;
        /**
         * 场次id
         */
        playId: number;
        /**
         * 数量
         */
        count: number;
        GetType(): string;
    }
    /**
     * 比赛场勋章相关
     */
    class medalObj {
        /**
         * 勋章id
         */
        medalId: number;
        /**
         * 数量
         */
        count: number;
        GetType(): string;
    }
    /**
     * 魅力值相关
     */
    class usercpObj {
        id: number;
        count: number;
        GetType(): string;
    }
    /**
     * 聊天消息
     */
    class ChatInfo {
        /**
         * 聊天类型
         */
        chatType: number;
        /**
         * 文字/语音对应的文字
         */
        words: string;
        /**
         * 语音时长
         */
        time: string;
        /**
         * 语音对应地址
         */
        url: string;
        /**
         * 表情id
         */
        emojiId: number;
        /**
         * 发送者
         */
        fromUid: number;
        /**
         * 接收者
         */
        toUid: number;
        /**
         * 时间戳
         */
        sendTime: number;
        GetType(): string;
    }
    /**
     * 商品
     */
    class Goods {
        goodsId: number;
        goodsNum: number;
        GetType(): string;
    }
    /**
     * 成长属性,让每个账号变的有成长性,可部分规避无门槛逃单问题
     */
    class GrowthAttr {
        /**
         * 本周上桌次数
         */
        playNumWeek: number;
        /**
         * 本月上桌次数
         */
        playNumMon: number;
        /**
         * 总上桌次数0-100新手,100-1000资深,...
         */
        playNumAll: number;
        /**
         * 本周获胜次数
         */
        winNumWeek: number;
        /**
         * 本月获胜次数
         */
        winNumMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        winNumAll: number;
        /**
         * 本周获胜次数
         */
        bigWinNumWeek: number;
        /**
         * 本月获胜次数
         */
        bigWinNumMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        bigWinNumAll: number;
        /**
         * 胜率winNumAll/playNumAll
         */
        winRate: number;
        /**
         * 本周上桌次数排名
         */
        playOrderWeek: number;
        /**
         * 本月上桌次数排名
         */
        playOrderMon: number;
        /**
         * 总上桌次数0-100新手,100-1000资深,...
         */
        playOrderAll: number;
        /**
         * 本周获胜次数排名
         */
        winOrderWeek: number;
        /**
         * 本月获胜次数排名
         */
        winOrderMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        winOrderAll: number;
        /**
         * 本周获胜次数排名
         */
        bigWinOrderWeek: number;
        /**
         * 本月获胜次数排名
         */
        bigWinOrderMon: number;
        /**
         * 总获胜次数0-100新手,100-1000资深,...
         */
        bigWinOrderAll: number;
        /**
         * 商城积分
         */
        shopPoint: number;
        /**
         * 奖池积分
         */
        jackpot: number;
        GetType(): string;
    }
    /**
     * 玩家充值信息
     */
    class RechargeInfo {
        /**
         * 累计充值
         */
        totalRecharge: number;
        /**
         * 月充值
         */
        monthRecharge: number;
        /**
         * 日充值
         */
        dayRecharge: number;
        GetType(): string;
    }
    /**
     * 拥有的时效性道具
     */
    class TimeGoods {
        /**
         * 对应道具表的id (玩家购买后对应的道具id)
         */
        id: number;
        /**
         * 剩余的有效天数
         */
        timeDay: number;
        /**
         * 过期时间戳(秒级的)
         */
        outTime: number;
        /**
         * 对应商城表的id (2018.03.15) 之后的购买全部使用这个字段
         */
        shopId: number;
        GetType(): string;
    }
    /**
     * 正在使用个人形象
     */
    class PersonalImage {
        /**
         * 1头像框(暂时只有头像框)
         */
        typ: number;
        /**
         * 0不使用 1购买道具 2vip特有
         */
        optyp: number;
        /**
         * 购买道具对应的id
         */
        id: number;
        /**
         * vip特有对应的vip等级
         */
        vip: number;
        GetType(): string;
    }
    /**
     * 玩家所拥有的充值优惠 (2018.03.16好彩金币场系列需求)
     */
    class RechargeDiscounts {
        /**
         * 商品Id
         */
        shopId: number;
        /**
         * 优惠加成 rate=1就相当于在基础上再加送1份
         */
        rate: number;
        GetType(): string;
    }
    /**
     * 基础数据
     */
    class UserBaseInfo {
        uid: number;
        headurl: string;
        nickname: string;
        gender: string;
        /**
         * 房卡模式 zoneType=2
         */
        card: number;
        /**
         * 钻石模式 zoneType=4
         */
        diamond: number;
        platId: number;
        subPlatId: string;
        ip: string;
        /**
         * 上级代理 如果没有返回0
         */
        parent: number;
        vip: number;
        /**
         * 积分
         */
        points: number;
        seatId: number;
        /**
         * 为了方便放这里,在线状态OnlineState
         */
        onlineState: number;
        /**
         * 为了方便放这里,准备状态
         */
        bReady: number;
        /**
         * 为了方便放这里,当前立着的手牌数量
         */
        handCardNum: number;
        flower: flowerObj[];
        nickName: string;
        headUrl: string;
        /**
         * uid的索引
         */
        sid: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 南京麻将使用下注
         */
        nju: njU;
        /**
         * 金币
         */
        chips: number;
        /**
         * 入场券
         */
        ticket: ticketObj[];
        /**
         * 勋章
         */
        medal: medalObj[];
        /**
         * 单局飘分
         */
        multiPiao: number;
        /**
         * 个性签名
         */
        signature: string;
        /**
         * 是否是新玩家 0:不是 1:是
         */
        isNew: number;
        /**
         * 游戏局数
         */
        playNum: number;
        /**
         * 保险箱的钱数 金币
         */
        bankMoney: number;
        /**
         * 是否修改过昵称 1:修改过(好彩真人的需求)
         */
        isChangeName: number;
        /**
         * 魅力值(好彩真人)
         */
        usercp: number;
        /**
         * 魅力值的具体信息(好彩真人)
         */
        usercpObj: usercpObj[];
        /**
         * 是否为好友 1:是好友(请求其他用户信息的标志，好彩真人的需求)
         */
        isFriend: number;
        /**
         * 奖券
         */
        giftCoupon: number;
        /**
         * 最后一条聊天记录(好彩真人好友系统使用)
         */
        lastMsg: ChatInfo;
        /**
         * 礼品券(好彩真人麻将,金币场赢家有几率获得)
         */
        giftVoucher: number;
        /**
         * 手机号(好彩真人麻将,为nil表示未绑定)
         */
        phonenumber: string;
        /**
         * 特殊分
         */
        specialpoints: number;
        /**
         * 赢三张头衔
         */
        title: string;
        /**
         * 赢三张喇叭(好彩金币系列也使用这个字段表示喇叭 2018.03.23)
         */
        horn: number;
        /**
         * 地理位置信息
         */
        loc: string;
        /**
         * 成长属性,西安先用
         */
        growth: GrowthAttr;
        /**
         * 玩家充值
         */
        recharge: RechargeInfo;
        /**
         * 正在使用的个人形象 2017.11.15好彩真人需求
         */
        personalImage: PersonalImage[];
        /**
         * 玩家所拥有的优惠商品 2018.03.16好彩需求
         */
        discounts: RechargeDiscounts[];
        /**
         * 保险箱 钻石
         */
        bankDiamond: number;
        /**
         * 详细地址
         */
        address: string;
        /**
         * 是否显示yy渠道的实名认证按钮
         */
        isAnti: boolean;
        /**
         * 是否好彩代理商
         */
        haocaiAgent: boolean;
        /**
         * 玩家底分集合
         */
        userBasePoints: number[];
        /**
         * 最后一次进的房间号
         */
        lastRoomId: number;
        /**
         * 跑得快炸弹数量
         */
        bomb: number;
        email: string;
        /**
         * 跑得快记牌器数量
         */
        counterNum: number;
        /**
         * 新手引导进度
         */
        progress: number;
        /**
         * 1表示为代理
         */
        isAgent: number;
        /**
         * 红包金额，单位/分
         */
        redPacket: number;
        /**
         * 离线时间,秒数
         */
        sec: number;
        /**
         * 可兑换的现金红包
         */
        giftCash: number;
        /**
         * 是否有新手领奖(好牌比赛用) 1:有 0:没有
         */
        bNoviceReward: number;
        /**
         * 捕鱼炮台id
         */
        fishcannon: number;
        GetType(): string;
    }
    /**
     * 修改玩家信息
     */
    class UserBaseInfoUpdateCmd_C {
        baseInfo: UserBaseInfo;
        GetType(): string;
    }
    /**
     * 请求解散房间
     */
    class RequestDissolveRoom_C {
        GetType(): string;
    }
    class RequestDissolveRoom_S {
        resultCode: number;
        desc: string;
        /**
         * 在线玩家人数
         */
        userNum: number;
        GetType(): string;
    }
    class RequestDissolveRoom_Brd {
        /**
         * 请求解散房间的玩家uid
         */
        uid: number;
        /**
         * 等待倒计时
         */
        waitTime: number;
        GetType(): string;
    }
    /**
     * 回应解散房间
     */
    class ReplyDissolveRoom_C {
        /**
         * 1表示同意
         */
        isAgree: number;
        GetType(): string;
    }
    class ReplyDissolveRoom_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class ReplyDissolveRoom_Brd {
        uid: number;
        /**
         * 1表示同意
         */
        isAgree: number;
        GetType(): string;
    }
    /**
     * 成功解散房间
     */
    class SuccessDissolveRoom_Brd {
        /**
         * 所有同意解散的玩家昵称
         */
        agreeUsers: string[];
        /**
         * 所有不同意解散的玩家称
         */
        disagreeUsers: string[];
        /**
         * 是否解散成功
         */
        bOk: boolean;
        GetType(): string;
    }
    /**
     * 主动上报客户端IP
     */
    class ClientIpCmd_C {
        ip: number;
        port: number;
        /**
         * 127.0.0.1
         */
        ipstr: string;
        /**
         * 127.0.0.1:1000
         */
        ipport: string;
        GetType(): string;
    }
    /**
     * 通知前端上发获取经度纬度
     */
    class GetGPSLocationCmd_S {
        GetType(): string;
    }
    /**
     * gps获取经度纬度
     */
    class GetGPSLocationCmd_C {
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 详细地址
         */
        address: string;
        GetType(): string;
    }
    /**
     * gps获取经度纬度返回
     */
    class ClientGpsLobbyCmd_S {
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 详细地址
         */
        address: string;
        GetType(): string;
    }
    /**
     * gps获取经度纬度广播
     */
    class GetGPSLocationCmd_Brd {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        /**
         * 详细地址
         */
        address: string;
        GetType(): string;
    }
    class IpGPS {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 纬度
         */
        lat: number;
        /**
         * 经度
         */
        lng: number;
        ip: number;
        /**
         * 127.0.0.1
         */
        ipstr: string;
        GetType(): string;
    }
    /**
     * 请求ip和gps获取经度纬度
     */
    class RequestIpGPSCmd_C {
        /**
         * 房间id,默认不填就是请求自己的
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 返回ip和gps获取经度纬度
     */
    class ReturnIpAndGPSCmd_S {
        /**
         * 位置信息
         */
        list: IpGPS[];
        GetType(): string;
    }
    class JsonCompressKey {
        key: string;
        /**
         * 嵌套描述
         */
        json: JsonCompressKey[];
        GetType(): string;
    }
    /**
     * json压缩约定消息
     */
    class JsonCompressNullUserPmd_CS {
        key: string;
        json: JsonCompressKey[];
        /**
         * 0表示不省略,1表示省略,默认不省略,default省略,{} ,&quot;&quot;,0
         */
        omit: number;
        /**
         * 0表示重置,1表示添加
         */
        add: number;
        /**
         * 消息列表
         */
        msglist: string[];
        GetType(): string;
    }
    /**
     * 语音聊天
     */
    class VoiceChat_C {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        roomId: number;
        GetType(): string;
    }
    class VoiceChat_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class VoiceChat_Brd {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 发送语音的玩家id
         */
        uid: number;
        GetType(): string;
    }
    class VoiceObj {
        /**
         * 语音时长
         */
        time: string;
        /**
         * 对应文字
         */
        words: string;
        /**
         * 对应地址
         */
        url: string;
        /**
         * 发送聊天的玩家id
         */
        uid: number;
        /**
         * 发送聊天时的时间
         */
        timestamp: string;
        GetType(): string;
    }
    /**
     * 语音记录
     */
    class VoiceChatRecord_C {
        GetType(): string;
    }
    class VoiceChatRecord_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 语音记录
         */
        records: VoiceObj[];
        GetType(): string;
    }
    class CommonChat_C {
        /**
         * 语音id
         */
        voiceId: number;
        /**
         * 文字聊天内容
         */
        words: string;
        roomId: number;
        GetType(): string;
    }
    class CommonChat_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class CommonChat_Brd {
        /**
         * 语音id
         */
        voiceId: number;
        /**
         * 发送语音的玩家id
         */
        uid: number;
        /**
         * 文字聊天内容
         */
        words: string;
        GetType(): string;
    }
    class SetInfo {
        /**
         * 音效 false:关 true:开
         */
        sound: boolean;
        /**
         * 音乐 false:关 true:开
         */
        music: boolean;
        /**
         * 音控 false:关 true:开
         */
        control: boolean;
        /**
         * 方言 1:普能话 2:龙岩话
         */
        dialect: number;
        GetType(): string;
    }
    /**
     * 音效音乐设置
     */
    class SoundSet_C {
        /**
         * 音效音乐等设置信息
         */
        setInfo: SetInfo;
        GetType(): string;
    }
    /**
     * 获取玩家头像
     */
    class GetUserHeadList_C {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 玩家id
         */
        uidList: number[];
        GetType(): string;
    }
    class UserHead {
        /**
         * 玩家id
         */
        uid: number;
        headUrl: string;
        GetType(): string;
    }
    class GetUserHeadList_S {
        /**
         * 玩家列表
         */
        headList: UserHead[];
        GetType(): string;
    }
    /**
     * 获取玩家列表信息
     */
    class GetUserList_C {
        GetType(): string;
    }
    class GetUserList_S {
        /**
         * 玩家列表
         */
        userSet: UserBaseInfo[];
        GetType(): string;
    }
    class CustomBetChipsCmd_C {
        betchips: number[];
        GetType(): string;
    }
    /**
     * 请求玩家面板信息
     */
    class GetPersonalPanel_C {
        /**
         * 玩家id
         */
        uid: number;
        GetType(): string;
    }
    class GetPersonalPanel_S {
        /**
         * 玩家基本信息
         */
        userInfo: UserBaseInfo;
        resultCode: number;
        GetType(): string;
    }
    /**
     * 通知客户端可以显示准备按钮
     */
    class ShowPrepareBtnRoom_S {
        GetType(): string;
    }
    /**
     * 通知客户端可以显示提前开始按钮了
     */
    class ShowChangeUserNbrRoom_S {
        GetType(): string;
    }
    /**
     * 请求切换房间人数
     */
    class RequestChangeUserNbrRoom_C {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 请求切换房间人数
     */
    class RequestChangeUserNbrRoom_Brd {
        uid: number;
        /**
         * 目标人数
         */
        userNbr: number;
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class ReturnChangeUserNbrRoom_C {
        /**
         * 1表示同意
         */
        isAgree: number;
        /**
         * 目标人数
         */
        userNbr: number;
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class ReturnChangeUserNbrRoom_Brd {
        uid: number;
        /**
         * 1表示同意 没有及不同意
         */
        isAgree: number;
        GetType(): string;
    }
    /**
     * 请求刷新座位积分
     */
    class UpdatePointSeatRoom_S {
        uid: number;
        /**
         * 可能是积分,金币或者钻石
         */
        point: number;
        /**
         * 奖池,捕鱼专用
         */
        jackpot: number;
        GetType(): string;
    }
    /**
     * 请求换坐
     */
    class RequestChangeSeatRoom_C {
        seatid: number;
        GetType(): string;
    }
    /**
     * 请求换坐给对方客户端
     */
    class RequestChangeSeatRoom_S {
        /**
         * 玩家id
         */
        fromuid: number;
        GetType(): string;
    }
    /**
     * 对方回应,成功后直接操作
     */
    class ReturnChangeSeatRoom_C {
        /**
         * 玩家id
         */
        fromuid: number;
        /**
         * 1表示同意
         */
        isAgree: number;
        GetType(): string;
    }
    /**
     * 请求排行榜
     */
    class GetRankingListRoomCmd_C {
        GetType(): string;
    }
    /**
     * +
     */
    class RankInfo {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 玩家昵称
         */
        nickname: string;
        /**
         * 头像地址
         */
        headUrl: string;
        /**
         * 排行值
         */
        point: number;
        /**
         * 玩家上一局输
         */
        profit: number;
        /**
         * 玩家总成绩
         */
        totalProfit: number;
        GetType(): string;
    }
    class GetRankingListRoomCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 排行榜数据
         */
        rankInfo: RankInfo[];
        GetType(): string;
    }
    /**
     * 排行榜广播
     */
    class GetRankingListRoomCmd_Brd {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 排行榜数据
         */
        rankInfo: RankInfo[];
        GetType(): string;
    }
    /**
     *  C-&gt;S 托管请求
     *  S-&gt;C 托管状态更新
     */
    class HostUpdateRoomCmd_CS {
        yesOrNo: boolean;
        uid: number;
        opList: number[];
        /**
         * 0表示取消托管,1表示普通托管,2表示高智商托管
         */
        hostType: number;
        GetType(): string;
    }
    /**
     *  Echo应答,服务器探测玩家是否活着
     *  TODO,还未使用,待升级
     */
    class ServerEchoRoomCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     *  Echo应答,客户端探测服务器
     *  TODO,还未使用,待升级
     */
    class ClientEchoRoomCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        /**
         * 是否有房间最终结算
         */
        final: boolean;
        GetType(): string;
    }
    /**
     * 在线状态更新
     */
    class OnlineStateRoomCmd_S {
        uid: number;
        state: OnlineState;
        GetType(): string;
    }
    /**
     *  C-&gt;S 离开房间请求
     *  S-&gt;C 离开房间通知
     */
    class LeaveRoomCmd_CS {
        uid: number;
        roomId: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 准备/取消准备请求
     *  S-&gt;C 更新准备状态
     */
    class ReadyUpdateRoomCmd_CS {
        yesOrNo: boolean;
        uid: number;
        /**
         * 1表示重新洗牌
         */
        shuffle: number;
        GetType(): string;
    }
    /**
     * 系统通知
     */
    class SysMessageCmd_S {
        msgType: SysMessageCmd_S.MsgType;
        /**
         * 文本
         */
        msg: string;
        code: number;
        GetType(): string;
    }
    module SysMessageCmd_S {
        enum MsgType {
            /**
             * 文本消息
             */
            Text = 1,
            /**
             * 解散房间
             */
            DissolveRoom = 2,
            /**
             * 返回到大厅
             */
            BackToLobby = 3,
            /**
             * 提前开局
             */
            StartInAdvance = 4,
            /**
             * 弹框
             */
            Bounce = 5,
            /**
             * 余额不足
             */
            NotEnoughMoney = 6,
            /**
             * 创建房间成功
             */
            CreateRoom = 7,
            /**
             * 重新进入大厅
             */
            EnterLobby = 8,
        }
    }
    /**
     *  C-&gt;S 查询服务器当前逻辑时间
     *  S-&gt;C 服务器当前逻辑时间
     */
    class GameTimeSyncCmd_CS {
        /**
         * unix时间戳
         */
        stamp: number;
        GetType(): string;
    }
    /**
     * 请求更换房间消息
     */
    class ChangeRoomCmd_C {
        GetType(): string;
    }
    /**
     * 换座
     */
    class ChangeSeatRoomCmd_C {
        /**
         * 目标座位
         */
        pos: number;
        GetType(): string;
    }
    /**
     * +
     */
    class GiftsInfo {
        /**
         * 发送玩家Id
         */
        fromUid: number;
        /**
         * 接收玩家Id
         */
        toUid: number;
        /**
         * 礼物Id
         */
        giftsId: number;
        /**
         * 礼物数量
         */
        giftsNum: number;
        GetType(): string;
    }
    /**
     * 送礼
     */
    class SendGiftRoomCmd_C {
        /**
         * 礼物内容
         */
        gift: GiftsInfo;
        roomId: number;
        GetType(): string;
    }
    class SendGiftRoomCmd_S {
        resultCode: number;
        gift: GiftsInfo;
        GetType(): string;
    }
    class SendGiftRoomCmd_Brd {
        /**
         * 送礼玩家
         */
        gift: GiftsInfo;
        /**
         * 玩家剩余钻石
         */
        diamond: number[];
        GetType(): string;
    }
    class SendGiftPokerCmd_C {
        /**
         * 礼物内容
         */
        gift: GiftsInfo;
        GetType(): string;
    }
    class SendGiftPokerCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class SendGiftPokerCmd_Brd {
        /**
         * 送礼玩家
         */
        gift: GiftsInfo;
        GetType(): string;
    }
    /**
     * 大厅送礼 客户端大厅相同的协议会有问题
     */
    class SendGiftLobbyCmd_C {
        /**
         * 礼物内容
         */
        gift: GiftsInfo;
        GetType(): string;
    }
    class SendGiftLobbyCmd_S {
        resultCode: number;
        gift: GiftsInfo;
        userInfo: UserBaseInfo;
        GetType(): string;
    }
    /**
     * 离开房间
     */
    class LeaveRoomCmd_C {
        /**
         * 离开状态 0 返回大厅 1 暂时离开 2 断线
         */
        state: number;
        GetType(): string;
    }
    class LeaveRoomCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播玩家离开房间
     */
    class LeaveRoomCmd_Brd {
        resultCode: number;
        desc: string;
        uid: number;
        state: number;
        GetType(): string;
    }
    /**
     * 认输
     */
    class GiveupRoomCmd_C {
        /**
         * 认输数量,认输时需要输入认输数量
         */
        num: number;
        GetType(): string;
    }
    /**
     *  发起视频聊天
     *  C-&gt;S 请求视频聊天
     *  S-&gt;C 请求视频聊天通知
     */
    class VideoChatRequestCmd_CS {
        uid: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 请求视频聊天回复请求
     *  S-&gt;C 请求视频聊天回复通知
     */
    class VideoChatReturnCmd_CS {
        uid: number;
        /**
         * 是否接受
         */
        result: boolean;
        GetType(): string;
    }
    /**
     *  C-&gt;S 视频聊天关闭请求
     *  S-&gt;C 视频聊天关闭通知
     */
    class VideoChatShutdownCmd_CS {
        uid: number;
        GetType(): string;
    }
    /**
     * 聊天消息内容
     */
    class ChatMessageInfo {
        /**
         * 文本/表情/语音url
         */
        msg: string;
        /**
         * 聊天内容类型
         */
        msgType: ChatMessageInfo.MsgType;
        /**
         * 时间
         */
        time: number;
        /**
         * 语音时长
         */
        voiceTime: number;
        /**
         * 发言人ID
         */
        speakerUid: number;
        /**
         * 发言人名字
         */
        speakerName: string;
        /**
         * 发言人头像
         */
        speakerHeadUrl: string;
        /**
         * 频道ID
         */
        channelId: number;
        /**
         * 好友ID
         */
        friendUid: number;
        /**
         * 频道类型
         */
        channelType: ChatMessageInfo.ChannelType;
        GetType(): string;
    }
    module ChatMessageInfo {
        /**
         * 聊天内容类型
         */
        enum MsgType {
            /**
             * 文本
             */
            Text = 1,
            /**
             * 语音
             */
            Voice = 2,
            /**
             * 表情
             */
            Face = 3,
            /**
             * 德州扑克创建房间信息
             */
            TexasConfig = 4,
        }
    }
    module ChatMessageInfo {
        /**
         * 聊天频道
         */
        enum ChannelType {
            /**
             * 房间
             */
            Room = 1,
            /**
             * 俱乐部
             */
            Club = 2,
            /**
             * 两个好友聊天
             */
            Friend = 3,
        }
    }
    /**
     *  C-&gt;S 聊天消息
     *  S-&gt;C 聊天消息
     */
    class ChatCmd_CS {
        chat: ChatMessageInfo;
        chatList: ChatMessageInfo[];
        GetType(): string;
    }
    /**
     * 匹配组成员信息
     */
    class MatchGroupMemberInfo {
        uid: number;
        nickname: string;
        /**
         * 空或0表示游客,1表示白名单,2表示黑名单,3表示黄名单,4表示副群主
         */
        type: number;
        /**
         * 状态,OnlineState
         */
        state: number;
        /**
         * 积分
         */
        score: number;
        /**
         * 申请加入时使用,冗余
         */
        matchId: number;
        /**
         * 头像url,茶馆要用
         */
        headUrl: string;
        /**
         * 输次
         */
        loseNum: number;
        /**
         * 赢次
         */
        winNum: number;
        /**
         * VIP等级
         */
        vip: number;
        /**
         * 当天大赢次
         */
        bigWinNum: number;
        /**
         * 总上桌次数
         */
        playNum: number;
        /**
         * 昨日积分
         */
        lastScore: number;
        /**
         * 上下分
         */
        matchPoint: number;
        /**
         * 成长属性,西安先用
         */
        growth: GrowthAttr;
        /**
         * 本周积分
         */
        scoreWeek: number;
        /**
         * 本月积分
         */
        scoreMon: number;
        /**
         * 总积分
         */
        scoreAll: number;
        /**
         * 备注
         */
        desc: string;
        /**
         * 微信联系方式
         */
        wechat: string;
        /**
         * 金豆场用
         */
        chips: number;
        /**
         * 总投注额
         */
        allBets: number;
        /**
         * 所在房间号,茶馆和比赛用
         */
        roomId: number;
        /**
         * 备注(sz使用)
         */
        note: string;
        /**
         * 税收贡献
         */
        tax: number;
        /**
         * 成员类型(sz使用) 1:群主 2:副群主 3:普通成员
         */
        membertype: number;
        /**
         * 最近活跃时间,用分钟倒计时不如60,表示1小时
         */
        lastMin: number;
        /**
         * 积分列表（今日、昨日、前日）
         */
        scores: number[];
        /**
         * 大赢家次数列表(今日、昨日、前日)
         */
        winNums: number[];
        GetType(): string;
    }
    /**
     * 匹配组房间信息
     */
    class MathGroupRoomInfo {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 成员信息
         */
        list: MatchGroupMemberInfo[];
        /**
         * 开启时间unix sec
         */
        beginTime: number;
        /**
         * 结束时间unix sec
         */
        endTime: number;
        /**
         * 当前局数
         */
        curGameNbr: number;
        /**
         * 最大局数
         */
        gameNbr: number;
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 分享数据,ActiveCreateRoomCmd_C时用,山寨下
         */
        shareInfo: ShareInfo;
        /**
         * 当前房间内人数
         */
        curUserNbr: number;
        /**
         * 最大房间内人数
         */
        userNbr: number;
        /**
         * globalRoomId
         */
        gid: number;
        /**
         * 不填或0表示准备中,1表示已开局,2表示已结束
         */
        state: number;
        /**
         * 玩法描述
         */
        playTypeDesc: string;
        /**
         * 当前所属楼层
         */
        floorId: number;
        /**
         * 游戏名称
         */
        gameName: string;
        GetType(): string;
    }
    /**
     * 地址
     */
    class Address {
        /**
         * 国家
         */
        country: string;
        /**
         * 省
         */
        province: string;
        /**
         * 市
         */
        city: string;
        GetType(): string;
    }
    class DonateData {
        regulationList: StatisticsRoundData[];
        fix: boolean;
        devide: number[];
        GetType(): string;
    }
    class ClubInfo {
        clubId: number;
        /**
         * 地址
         */
        address: Address;
        name: string;
        memberList: ClubInfo.Member[];
        /**
         * 创建者
         */
        founder: number;
        /**
         * 创建时间
         */
        createdAt: number;
        /**
         * 签名
         */
        signature: string;
        /**
         * 成员人数上限
         */
        memberLimit: number;
        /**
         * 人数
         */
        memberNum: number;
        /**
         * 俱乐部头像
         */
        headurl: string;
        /**
         * 创建者信息
         */
        founderInfo: UserBaseInfo;
        /**
         * 公告
         */
        announcement: string;
        /**
         * 职位权限
         */
        postPermission: ClubInfo.PostPermission[];
        /**
         * 基金
         */
        fund: number;
        myMember: ClubInfo.Member;
        /**
         * 私密
         */
        private: boolean;
        donatedata: DonateData;
        unionList: number[];
        level: number;
        /**
         * 房间数
         */
        gameNum: number;
        /**
         * 最大的代理层级
         */
        maxAgentLayer: number;
        /**
         * 是否app端
         */
        isApp: boolean;
        /**
         * 提示
         */
        tips: MsgType[];
        GetType(): string;
    }
    module ClubInfo {
        /**
         * 权限
         */
        enum Permission {
            /**
             * 开局
             */
            CreateRoom = 1,
            /**
             * 审核成员申请
             */
            MemeberJoin = 2,
            /**
             * 查看报表
             */
            CheckReport = 3,
            /**
             * 资金管理
             */
            FundManage = 4,
        }
    }
    module ClubInfo {
        /**
         * 职位
         */
        enum Post {
            Man = 1000,
            Agent = 1500,
            Admin = 2000,
            Founder = 3000,
        }
    }
    module ClubInfo {
        /**
         * 成员
         */
        class Member {
            user: UserBaseInfo;
            /**
             * 职位
             */
            post: ClubInfo.Post;
            clubId: number;
            /**
             * 消息
             */
            msg: string;
            /**
             * 筹码
             */
            chips: number;
            /**
             * 创建时间
             */
            createdAt: number;
            /**
             * 战绩
             */
            statistics: StatisticsRoundData;
            /**
             * 代理信用值
             */
            credit: number;
            /**
             * 上线
             */
            upline: number;
            /**
             * 下线数量
             */
            downlineNum: number;
            /**
             * 代理层级
             */
            layer: number;
            /**
             * 是否app端
             */
            isApp: boolean;
            /**
             * 钻石
             */
            diamond: number;
            GetType(): string;
        }
    }
    module ClubInfo {
        /**
         * 职位所拥有的权限
         */
        class PostPermission {
            post: ClubInfo.Post;
            permission: ClubInfo.Permission[];
            GetType(): string;
        }
    }
    module ClubInfo {
        /**
         * 转账
         */
        class Transition {
            id: number;
            /**
             * 申请人
             */
            user: UserBaseInfo;
            /**
             * 数量
             */
            num: number;
            /**
             * true 转进 false 转出
             */
            inOrOut: boolean;
            /**
             * 申请时间
             */
            createdAt: number;
            clubId: number;
            /**
             * 0 未处理 1 同意 2 不同意
             */
            deal: number;
            /**
             * 审核人
             */
            dealer: UserBaseInfo;
            /**
             * 资金类型 1：基金，2：钻石
             */
            type: number;
            /**
             * 目标id
             */
            touid: number;
            GetType(): string;
        }
    }
    /**
     * 分页
     */
    class Page {
        /**
         * 第几页
         */
        current: number;
        /**
         * 每页的数量
         */
        num: number;
        GetType(): string;
    }
    /**
     * 数据更新通知
     */
    class DataUpdateNotifyCmd_S {
        update: MsgType;
        clubId: number;
        GetType(): string;
    }
    /**
     * 玩家牌局押注数据
     */
    class StatisticsRoundData {
        uid: number;
        /**
         * 多长时间内
         */
        days: number;
        /**
         * 玩法 废弃
         */
        play: number;
        user: UserBaseInfo;
        /**
         * 牌局规则
         */
        regulation: number;
        id: number;
        /**
         *  押注元数据
         *  参与的房间数
         */
        gameNum: number;
        /**
         * 手数
         */
        hand: number;
        /**
         * 翻牌前加注数
         */
        flopRaise: number;
        /**
         * 入池数
         */
        inpot: number;
        /**
         * allin 赢的次数
         */
        allinWin: number;
        /**
         * allin 次数
         */
        allin: number;
        /**
         *  计算后的概率
         *  入池率
         */
        vpip: number;
        /**
         * 翻牌前加注率
         */
        prf: number;
        /**
         * ALL-IN胜率
         */
        allinWinRate: number;
        /**
         *  金钱数据
         *  带入的筹码
         */
        bring: number;
        /**
         * 盈亏
         */
        profit: number;
        /**
         * 保险买入
         */
        insBuy: number;
        /**
         * 保险利润
         */
        insProfit: number;
        /**
         * 奖金
         */
        prize: number;
        /**
         * 带出
         */
        out: number;
        /**
         * 捐献金
         */
        donate: number;
        donateIncome: number;
        /**
         * 保险
         */
        insurance: number;
        /**
         * 赢
         */
        lose: number;
        /**
         * 输
         */
        win: number;
        jackpot: number;
        /**
         * 剩余筹码
         */
        chips: number;
        /**
         *  名次
         *  冠军数
         */
        firstPlace: number;
        /**
         * 亚军数
         */
        secondPlace: number;
        /**
         * 季军数
         */
        thirdPlace: number;
        /**
         * 名次
         */
        place: number;
        /**
         * 报名
         */
        sign: boolean;
        GetType(): string;
    }
    /**
     * 玩法数据
     */
    class Playing {
        id: Playing.PlayId;
        value: number;
        GetType(): string;
    }
    module Playing {
        /**
         * 玩法id
         */
        enum PlayId {
            /**
             * 小盲
             */
            Smallblind = 1,
            /**
             * 牌局规则 1 普通-德扑 2 SNG-德扑 3 普通-短牌 4 SNG-短牌
             */
            Regulation = 2,
            /**
             * 座位数
             */
            SeatNum = 3,
            /**
             * 前注
             */
            Ante = 4,
            /**
             * 升盲速度
             */
            BlindLength = 5,
            /**
             * 初始盲注
             */
            StartChips = 6,
            /**
             * 速度
             */
            Speed = 7,
            /**
             * 时长
             */
            Duration = 8,
            /**
             * 俱乐部id, 代表从俱乐部创建的牌局
             */
            ClubId = 9,
            /**
             * 报名费
             */
            EntryFee = 10,
            /**
             * 强制盲注
             */
            ForceBlind = 10447,
            /**
             * 控制带入
             */
            ControlEntry = 10448,
            /**
             * 保险
             */
            Insurance = 10449,
            GPS = 96,
            /**
             * 相同ip不可进入
             */
            IPEnter = 100,
            /**
             * 控制玩家报名
             */
            ControlSignUp = 10489,
            /**
             * 文本聊天
             */
            TextChat = 10490,
            /**
             * 语言聊天
             */
            VoiceChat = 10491,
            /**
             * 捐献金比例
             */
            DonateRate = 10561,
            /**
             * 自动开局条件人数
             */
            StartAutoNum = 10582,
            /**
             * 最少买入
             */
            BringMin = 10583,
            /**
             * 最大买入
             */
            BringMax = 10584,
            /**
             * 自动开始
             */
            StartAuto = 10585,
            /**
             * 俱乐部基金买入服务费
             */
            ClubFundPlatFee = 10586,
            /**
             * 两倍前注
             */
            DoubleAnte = 10590,
            /**
             * 三条大于顺子
             */
            ThreeGtStraight = 10591,
            /**
             * 押注时长
             */
            ActionDuration = 10592,
            /**
             * 联盟
             */
            UnionId = 10615,
            /**
             * 埋牌
             */
            CoverCard = 10619,
            /**
             * 同时发牌
             */
            Concurrent = 10729,
            /**
             * 分支等级
             */
            Level = 10732,
            /**
             * 入局带入
             */
            EntryBring = 10734,
        }
    }
    /**
     * 德扑的配置信息
     */
    class TexasConfig {
        /**
         * 房间名称
         */
        name: string;
        roomId: number;
        /**
         * 房间唯一id
         */
        globalRoomId: number;
        /**
         * 创建时间
         */
        createdAt: number;
        /**
         * 奖金 废弃
         */
        prize: number[];
        /**
         * 报名人
         */
        signList: UserBaseInfo[];
        /**
         * 涨盲
         */
        blindLine: number[];
        /**
         * 人数
         */
        userNum: number;
        owner: UserBaseInfo;
        /**
         * 开始时间
         */
        startAt: number;
        clubName: string;
        /**
         * 玩法列表
         */
        playList: Playing[];
        /**
         * 盲注等级
         */
        blindLevel: number;
        leftSec: number;
        /**
         * 表格id
         */
        tableId: number;
        /**
         * 名义上的奖金
         */
        prizeNameList: number[];
        /**
         * 实际获得的奖金
         */
        prizeGiveList: number[];
        statistics: StatisticsRoundData;
        /**
         * 结束时间
         */
        destroyAt: number;
        headurl: string;
        GetType(): string;
    }
    /**
     * 彩票信息
     */
    class Lottery {
        /**
         * 期号
         */
        expect: number;
        /**
         * 子期号
         */
        subExpect: number;
        /**
         * 开奖时间
         */
        openstamp: number;
        /**
         * 开奖数据
         */
        opencode: number[];
        /**
         * 开奖数据
         */
        opennum: number;
        GetType(): string;
    }
    /**
     * 牌局历史
     */
    class History {
        /**
         * 房间等级
         */
        level: number;
        data: History.HistoryInfo[];
        GetType(): string;
    }
    module History {
        class HistoryInfo {
            /**
             * 输赢
             */
            roundWinLose: number;
            /**
             * 利润
             */
            profit: number;
            /**
             * 彩票数据
             */
            lottery: Lottery;
            /**
             * 赢家id
             */
            winId: number;
            /**
             * 牌
             */
            cardList: number[];
            /**
             * 我的押注
             */
            statistics: StatisticsRoundData[];
            /**
             * 奖池
             */
            jackpot: number;
            GetType(): string;
        }
    }
    /**
     * 过滤条件
     */
    class FilterInfo {
        clubId: number;
        page: Page;
        globalRoomId: number;
        /**
         * 查询的开始时间
         */
        beginAt: number;
        /**
         * 查询的结束时间
         */
        endAt: number;
        regulation: number;
        uid: number;
        /**
         * 向上还是向下查询
         */
        upOrDown: boolean;
        /**
         * 查询的数量
         */
        num: number;
        id: number;
        /**
         * 0 未处理 1 同意 2 不同意
         */
        deal: number;
        unionId: number;
        GetType(): string;
    }
    /**
     * 金钱账单
     */
    class MoneyStatementInfo {
        id: number;
        type: MoneyStatementInfo.StatementType;
        createdAt: number;
        money: number;
        GetType(): string;
    }
    module MoneyStatementInfo {
        enum StatementType {
            /**
             * 平台转入
             */
            CashIn = 1,
            /**
             * 平台转出
             */
            CashOut = 2,
            /**
             * 房间带出
             */
            BringIn = 3,
            /**
             * 房间带入
             */
            BringOut = 4,
            /**
             * 购买钻石
             */
            BuyDiamond = 5,
        }
    }
    class UploadShareInfoLittleGameLobbyCmd_CS {
        opType: ShareOpType;
        uid: number;
        shareType: ShareType;
        /**
         * 微信相关分享数据(json格式)
         */
        jsonShare: string;
        /**
         * 拓展字段
         */
        extData: string;
        GetType(): string;
    }
    /**
     * 操作互动,有人看牌等小动作,发给其他玩家能表现出这个动作
     */
    class ShowActionRoomCmd_CS {
        uid: number;
        /**
         * 动作,不填或者0表示看扣下的牌,以后继续添加
         */
        act: number;
        GetType(): string;
    }
    /**
     * 客户端执行指定代码
     */
    class ClientRunCode_S {
        code: string;
        GetType(): string;
    }
}
declare module Cmd {
    /**
     * 请求当前正常运营的游戏列表
     */
    class GetNormalGameListRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 1/2/3 普通场、练习场、匹配场  默认为1 兼容以前模式
         */
        typ: number;
        /**
         * 是否俱乐部请求 1:是 0:不是
         */
        isClub: number;
        /**
         * 客户端上传游戏版本列表的md5 用于子游戏的版本更新
         */
        md5GameList: string;
        GetType(): string;
    }
    class GetNormalGameListRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 1/2/3 普通场、练习场、匹配场  默认为1 兼容以前模式
         */
        typ: number;
        /**
         * 正常前端可选择的游戏列表id
         */
        gameIdList: number[];
        /**
         * 上次创建数据
         */
        lastCreate: CreateRoomCmd_C;
        /**
         * 免费开始时间 如果该字段不为Nil则代表当前处于免费时间内
         */
        startTime: number;
        /**
         * 免费结束时间
         */
        endTime: number;
        /**
         * 是否俱乐部请求 1:是 0:不是
         */
        isClub: number;
        /**
         * TableLobbyGameList配置数据
         */
        tableLobbyGame: string;
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 获取当前练习场
     */
    class GetPracticeGameInfoRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 暂时由服务器默认分配第一个的话 这里不传
         */
        gameId: number;
        /**
         * 初中高 1/2/3
         */
        level: number;
        GetType(): string;
    }
    class GetPracticeGameInfoRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        GetType(): string;
    }
    /**
     * 创建房间
     */
    class CreateRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 当前房间创建局数
         */
        gameNbr: number;
        /**
         * 玩法
         */
        playType: number;
        /**
         * 房间模式  二人、四人
         */
        userNbr: number;
        /**
         * 房间支付类型
         */
        payType: number;
        /**
         * 峰值
         */
        multiplePeak: number;
        /**
         * 出牌时间
         */
        outTime: number;
        /**
         * 房主小费
         */
        hostTip: number;
        /**
         * 大厅不校验的数据,给游戏校验
         */
        props: number[];
        /**
         * 当前正常开始 是否存在对赌
         */
        gamble: number;
        /**
         * 对赌类型 1/2 金币/钻石 默认不传为赌金币
         */
        gambleType: number;
        /**
         * 输赢上限  (好彩真人金币场)
         */
        winLimit: number;
        /**
         * 加倍起番  (好彩真人金币场)
         */
        ratio: number;
        /**
         * 底分
         */
        basePoint: number;
        /**
         * 底注
         */
        bottomPoint: number;
        /**
         * 入场
         */
        enteringPoint: number;
        /**
         * 离场
         */
        leavingPoint: number;
        /**
         * 返回当前游戏的名称 好牌网俱乐部需要
         */
        gameName: string;
        /**
         * 0:不允许 1:允许 是否允许陌生人加入(芝麻斗牌 好友房)
         */
        bAllowStranger: number;
        GetType(): string;
    }
    class CreateRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 如果不为空表示为匹配场
         */
        scene: number;
        /**
         * 不进入游戏
         */
        notIntoGame: number;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 请求踢人
     */
    class KickLeaveRoomCmd_C {
        uid: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 匹配号的传下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 请求解散房间
     */
    class ActiveDissolveRoomCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 匹配号的传下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 查看正在进行中的房间(多开房间用)
     */
    class ActiveCreateRoomCmd_C {
        GetType(): string;
    }
    class ActiveCreateRoomCmd_S {
        /**
         * 本匹配号所产生的所有房间号
         */
        roomList: Cmd.MathGroupRoomInfo[];
        GetType(): string;
    }
    class ActiveDetailRoomCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * globalRoomId
         */
        gid: number;
        /**
         * 匹配号的传下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    class ActiveDetailRoomCmd_S {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * globalRoomId
         */
        gid: number;
        /**
         * 不填或0表示准备中,1表示已开局
         */
        state: number;
        /**
         * 成员信息
         */
        list: Cmd.MatchGroupMemberInfo[];
        /**
         * 匹配号的回下匹配号id
         */
        matchId: number;
        GetType(): string;
    }
    /**
     * 返回房间
     */
    class ReturnRoomCmd_C {
        /**
         * 返回房间需要带上lobbyId
         */
        lobbyId: number;
        GetType(): string;
    }
    class ReturnRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 房间类型RoomType
         */
        roomType: number;
        /**
         * 如果不为空表示为匹配场
         */
        scene: number;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        GetType(): string;
    }
    /**
     * 加入房间
     */
    class EnterRoomCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 進入房间需要带上lobbyId（指定房間id可能不是該大廳的）
         */
        lobbyId: number;
        /**
         * 匹配号桌子相关: nil、-1、0、0以上 匹配号内快速匹配、直接进到俱乐部界面、匹配号创建新房间、匹配号内主动加入某房间
         */
        preBestRoomId: number;
        /**
         * 俱乐部授权房间认证多一个备注流程。正常进入流程不传、申请授权界面传入备注 玩家不填也必须传空字符串 不能不传。
         */
        note: string;
        /**
         * 当前楼层id
         */
        floorId: number;
        GetType(): string;
    }
    class EnterRoomCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 区id
         */
        zoneId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * gameGatewayUrl,尽量让玩家跟房主一个url,防止被攻击
         */
        url: string;
        /**
         * 如果不为空表示为匹配场
         */
        scene: number;
        roomState: Cmd.RoomState;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        GetType(): string;
    }
    /**
     * 进入俱乐部 需要弹出申请备注流程
     */
    class NotifyImportNoteCmd_S {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 進入房间需要带上lobbyId（指定房間id可能不是該大廳的）
         */
        lobbyId: number;
        /**
         * 俱乐部内进入的指定桌子从这里传 nil/0/0以上  不传为以前的默认、主动创建新的、加入指定的
         */
        preBestRoomId: number;
        GetType(): string;
    }
    /**
     * 房间解散时 由大厅统一推条消息通知房间创建者
     */
    class RemoveRoomCmd_Brd {
        /**
         * 房间解散 给房主推送该通知时 带上其当前房卡数量
         */
        card: number;
        GetType(): string;
    }
    /**
     * 创建的房间已被其他四个玩家玩了 则推送一条消息给玩家 通知其 当前可创建房间了
     */
    class CanCreateRoomCmd_Brd {
        /**
         * 房间号
         */
        roomId: number;
        /**
         * 当前钻石
         */
        diamond: number;
        GetType(): string;
    }
    class SysMessageMahjongLobbyCmd_S {
        desc: string;
        /**
         * 消息级别和位置相关  null/1  中度提示条、弹框确定
         */
        pos: number;
        /**
         * 要打开的窗口id
         */
        openWindow: number;
        /**
         * 返回码 客户端根据去选择语言版本（2018.05.08好彩金币系列）
         */
        errorCode: number;
        GetType(): string;
    }
    /**
     * 请求续局
     */
    class ApplyContinuePlayRoomCmd_C {
        GetType(): string;
    }
    class ApplyContinuePlayRoomCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 续局请求广播
     */
    class ApplyContinuePlayRoomCmd_Brd {
        /**
         * 续局的具体数据 可要可不要
         */
        desc: string;
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 续局发起者
         */
        owner: string;
        GetType(): string;
    }
    /**
     * 请求播放录像
     */
    class RequestRecordLobbyCmd_C {
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 如果没有穿globalid,就用roomid反射成globalid,有可能重复,但是先忽略
         */
        roomId: number;
        /**
         * 第几局
         */
        curGameNbr: number;
        /**
         * globalRoomId:curGameNbr,兼容方式跑起来
         */
        recordStr: string;
        GetType(): string;
    }
    /**
     * 返回播放录像
     */
    class ReturnRecordLobbyCmd_S {
        /**
         * 录像数据
         */
        data: string;
        /**
         * 需要返回gameid,客户端要找
         */
        gameId: number;
        /**
         * 主视角uid
         */
        uid: number;
        /**
         * 返回码 成功不返回,错误返回非0
         */
        resultCode: number;
        /**
         * 第几局
         */
        curGameNbr: number;
        /**
         * 总共几局
         */
        gameNbr: number;
        /**
         * 几人
         */
        userNbr: number;
        /**
         * 房号
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 请求暂停录像
     */
    class RequestPauseRecordRoomCmd_C {
        /**
         * 1表示暂停,2表示继续
         */
        pause: number;
        GetType(): string;
    }
    /**
     * 请求进退录像
     */
    class RequestStepRecordRoomCmd_C {
        /**
         * 负数表示后退,正数表示钱进
         */
        step: number;
        GetType(): string;
    }
    /**
     * 请求退出录像
     */
    class RequestStopRecordRoomCmd_C {
        GetType(): string;
    }
    /**
     * 给大厅客户端推送指定房间当前分享数据
     */
    class PushRoomShareInfoRoomCmd_S {
        /**
         * 房间标识（暂时为房间id的string模式、后期可能为随机映射字符串）
         */
        roomFlag: string;
        /**
         * 当前已进玩家人数
         */
        curUserNbr: number;
        /**
         * 游戏人数（创建房间的人数）
         */
        userNbr: number;
        GetType(): string;
    }
    /**
     *  匹配场(金币场)--------------------------------------------------------------------------------------------
     *  进入某一匹配场
     */
    class EnterMatchRoomCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 场次id
         */
        scene: number;
        /**
         * 匹配场 对赌类型 1/2 金币／钻石(暂时可不传 预留)
         */
        gambleType: number;
        GetType(): string;
    }
    class EnterMatchRoomCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 客家棋牌活动 推荐排行榜--------------------------------------------------------------------------------------------
     */
    class InviteRankInfo {
        uid: number;
        nickName: string;
        num: number;
        /**
         * 头像url
         */
        headUrl: string;
        GetType(): string;
    }
    class IntoInviteRankLobbyCmd_C {
        GetType(): string;
    }
    class IntoInviteRankLobbyCmd_S {
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        infos: InviteRankInfo[];
        myNum: number;
        GetType(): string;
    }
    /**
     * 好彩真人麻将，进入房间之前的判断
     */
    class GamePara {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 场次id
         */
        scene: number;
        /**
         * 匹配场 对赌类型 1/2 金币／钻石(暂时可不传 预留)
         */
        gambleType: number;
        /**
         * 测试服允许前端指定区服id
         */
        preZoneId: number;
        GetType(): string;
    }
    class JudgeEnterGameLobbyCmd_C {
        /**
         * 1匹配场  2百人场 3百人场体验场
         */
        enter: number;
        /**
         * 房间相关参数
         */
        gamePara: GamePara;
        GetType(): string;
    }
    class JudgeEnterGameLobbyCmd_S {
        resultCode: number;
        /**
         * 之前所在房间的游戏类型 1匹配场  2百人场
         */
        enter: number;
        /**
         * 房间相关参数
         */
        gamePara: GamePara;
        GetType(): string;
    }
    /**
     * 好彩真人麻将，返回之前的游戏
     */
    class ReturnHaoCaiGameLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class ReturnHaoCaiGameLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * -----------------------------对赌场相关--------------------
     *  请求对赌房间信息
     */
    class RequestGambleRoomInfoLobbyCmd_C {
        lobbyId: number;
        gameId: number;
        /**
         * 是否刷新 nil:不是 1:是
         */
        bRefresh: number;
        GetType(): string;
    }
    class RequestGambleRoomInfoLobbyCmd_S {
        gambleRoomInfos: GambleRoomInfo[];
        /**
         * 上次进入房间场次  1:匹配房 2:好友房
         */
        roomType: number;
        /**
         * 上次进入游戏ID
         */
        gameId: number;
        GetType(): string;
    }
    class GambleRoomInfo {
        gameId: number;
        /**
         * 1:匹配房 2:好友房
         */
        roomType: number;
        /**
         * 1:金币 2:钻石
         */
        gambleType: number;
        /**
         * 底注
         */
        basePoint: number;
        /**
         * 进场
         */
        enteringPoint: number;
        /**
         * 离场
         */
        leavingPoint: number;
        /**
         * 当前人数
         */
        curUserNbr: number;
        /**
         * 好友房 几人场
         */
        userNbr: number;
        /**
         * 匹配房 场次
         */
        scene: number;
        /**
         * 匹配房 1:繁忙 0:流畅
         */
        isBusy: number;
        /**
         * 好友房 玩法
         */
        props: number[];
        /**
         * 好友房 房间roomid
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 请求最终进入的房间的一些信息
     */
    class GetGambleRoomInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetGambleRoomInfoLobbyCmd_S {
        /**
         * 1:金币 2:钻石
         */
        gambleType: number;
        GetType(): string;
    }
}
declare module Cmd {
    enum PAGE_TYPE {
        /**
         * 关注公众号领大奖页面
         */
        PUBLIC_ACCOUNT = 1,
        /**
         * 授权
         */
        AUTHORIZE = 2,
        /**
         * 每日礼包
         */
        DAILY_GIFT = 3,
    }
    /**
     * 排行积分数据
     */
    class HpRankInfo {
        /**
         * 排名
         */
        rank: number;
        uid: number;
        headUrl: string;
        nickName: string;
        point: number;
        GetType(): string;
    }
    class RewardItems {
        rewards: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 比赛数据(时间、奖励动态配置)
     */
    class HpMatchInfo {
        /**
         * 指定比赛类型id
         */
        sceneId: number;
        beginTime: number;
        /**
         * 每天结束时间
         */
        endTime: number;
        /**
         * 该比赛每周几开启
         */
        week: number[];
        /**
         * 冠亚季军的奖励
         */
        rewards: RewardItems[];
        /**
         * 是否已解锁 0/1 未解锁、已解锁
         */
        unLocked: number;
        /**
         * 当前是否开启 -- 限时赛
         */
        isOpen: number;
        /**
         * 如果未解锁状态 则把当前已有几个玩家帮其解锁的数据下发 只发headurl的数组
         */
        unLockList: string[];
        /**
         * 报名次数限制 如果为nil表示无限制
         */
        signLimit: number;
        /**
         * 已报名次数
         */
        signNum: number;
        GetType(): string;
    }
    /**
     * 获奖记录
     */
    class RewardRecord {
        beginTime: number;
        endTime: number;
        rankList: string[];
        /**
         * -1/0/1   未参加、参加了未上榜、上榜名次
         */
        myRank: number;
        GetType(): string;
    }
    /**
     * 战绩
     */
    class RankHistory {
        matchId: number;
        matchName: string;
        timestamp: number;
        rank: number;
        rewards: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 场次信息
     */
    class SceneInfo {
        /**
         * 1:经典场 2:跑八张 3:疯狂场 6.换三张
         */
        type: number;
        items: SceneItem[];
        /**
         * 当前人数
         */
        curUserNbr: number;
        GetType(): string;
    }
    class SceneItem {
        /**
         * 1:初级 2:中级 3:高级
         */
        type: number;
        gameId: number;
        /**
         * 场次id
         */
        sceneId: number;
        /**
         * 准入
         */
        lowestCarry: number;
        /**
         * 当前人数
         */
        curUserNbr: number;
        /**
         * 红包额
         */
        money: number;
        /**
         * 底分
         */
        bottomPoint: number;
        /**
         * 最多携带
         */
        maxCarry: number;
        /**
         * 玩几局拿红包
         */
        gameNbr: number;
        GetType(): string;
    }
    class ChallengeInfo {
        /**
         * 挑战类型 1:银猪 2:金猪
         */
        type: number;
        items: RoundItem[];
        GetType(): string;
    }
    class RoundItem {
        /**
         * 第几关
         */
        round: number;
        /**
         * 0:未解锁 1:已解锁
         */
        unlock: number;
        /**
         * 报名费
         */
        signFee: Cmd.RewardItem[];
        /**
         * 奖励
         */
        rewards: Cmd.RewardItem[];
        /**
         * 0:未过关 1:已过关
         */
        pass: number;
        GetType(): string;
    }
    class RushInfo {
        /**
         * 闯关类型 1:福卡 2:金币 3:钻石
         */
        type: number;
        /**
         * 当前进度 给外面用的
         */
        round: number;
        /**
         * 报名费
         */
        signFee: Cmd.RewardItem[];
        /**
         * repeated RewardItems            rewards     = 4; // 奖励
         * repeated uint32                 reviveRounds= 5; // 可复活关卡
         * optional uint32                 maxGoldEgg  = 6; // 最高彩蛋奖励
         *  每关详情
         */
        details: RoundDetail[];
        /**
         * 给里面用的
         */
        round2: number;
        /**
         * 报名条件
         */
        enterLimit: number;
        GetType(): string;
    }
    class RoundDetail {
        /**
         * 奖励
         */
        rewads: Cmd.RewardItem[];
        /**
         * 今日闯关成功人数
         */
        userNbr: number;
        /**
         * 0:未过关 1:已过关
         */
        pass: number;
        /**
         * 彩蛋最小福卡奖励
         */
        minFokas: number;
        /**
         * 彩蛋最大福卡奖励
         */
        maxFokas: number;
        GetType(): string;
    }
    /**
     * 1 请求参加比赛
     */
    class RequestJoinHpMatchCmd_C {
        /**
         * 获取指定游戏比赛数据
         */
        gameId: number;
        /**
         * 获取指定比赛场次
         */
        sceneId: number;
        GetType(): string;
    }
    class RequestJoinHpMatchCmd_S {
        resultCode: number;
        GetType(): string;
    }
    class RequestExitHpMatchCmd_C {
        /**
         * 操作类型 nil/1/2 正常退出/断线回来/切后台回来
         */
        opType: number;
        GetType(): string;
    }
    class RequestExitHpMatchCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 当前比赛等待列表数据广播
     */
    class WaitListHpMatchCmd_Brd {
        sceneId: number;
        /**
         * 当前人数
         */
        curUserNbr: number;
        /**
         * 倒计时
         */
        timestamp: number;
        /**
         * 奖励列表
         */
        rewards: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 进入金猪银猪闯关
     */
    class EnterChallengeHpMatchCmd_C {
        /**
         * 挑战类型
         */
        type: number;
        /**
         * 第几关
         */
        round: number;
        gameId: number;
        GetType(): string;
    }
    class EnterChallengeHpMatchCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 进入金币福卡闯关
     */
    class EnterRushHpMatchCmd_C {
        /**
         * 类型 1:金币 2:福卡
         */
        type: number;
        gameId: number;
        GetType(): string;
    }
    class EnterRushHpMatchCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 4 最终打完结果推送 谁谁谁得奖。 TODO 还没确定最终怎么推送
     */
    class ResultHpMatchCmd_Brd {
        rank: number;
        rewards: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 5 获取比赛积分界面 -- 返回当前赛季的各种积分排行数据
     */
    class RequestRankInfoHpMatchCmd_C {
        /**
         * 获取指定游戏比赛数据
         */
        gameId: number;
        /**
         * 当前第几页
         */
        curPage: number;
        GetType(): string;
    }
    class RequestRankInfoHpMatchCmd_S {
        resultCode: number;
        /**
         * 获取指定游戏比赛数据
         */
        gameId: number;
        rankInfos: HpRankInfo[];
        myRank: HpRankInfo;
        /**
         * 当前第几页
         */
        curPage: number;
        /**
         * 是否最后一页
         */
        isLastPage: boolean;
        GetType(): string;
    }
    /**
     * 7 获取指定比赛场次的获奖记录 -- 只有定时赛才存在获奖记录。 -- 里面包括了所有我参加或未参加的记录。（记录可以再分开存 不存在该场比赛中 可以存得简短一点）
     */
    class RequestRewardRecordHpMatchCmd_C {
        /**
         * 获取指定比赛场次
         */
        sceneId: number;
        /**
         * 当前页数
         */
        curPage: number;
        GetType(): string;
    }
    class RequestRewardRecordHpMatchCmd_S {
        resultCode: number;
        /**
         * 当前页
         */
        curPage: number;
        /**
         * 是否是最后一页
         */
        isLastPage: boolean;
        /**
         * 获奖记录列表
         */
        records: RewardRecord[];
        GetType(): string;
    }
    /**
     * 8 获取战绩记录 -- 应该可以跟上面的获奖记录从同个地方获取，看下怎么优化存储方式，能够方便取出相关数据(玩家个人数据中存着吧 存着个人获奖的场次和总共的场次 再通过场次id去上面那个找)
     */
    class RequestHistoryHpMatchCmd_C {
        /**
         * 获取指定游戏比赛数据
         */
        gameId: number;
        /**
         * 0/1 比赛记录、获奖记录
         */
        typ: number;
        /**
         * 当前页数
         */
        curPage: number;
        GetType(): string;
    }
    class RequestHistoryHpMatchCmd_S {
        resultCode: number;
        /**
         * 0/1 比赛记录、获奖记录
         */
        typ: number;
        /**
         * 当前页数
         */
        curPage: number;
        /**
         * 是否是最后一页
         */
        isLastPage: boolean;
        historys: RankHistory[];
        GetType(): string;
    }
    /**
     * 主动用钻石解锁某个场次
     */
    class RequestUnLockHpMatchCmd_C {
        /**
         * 指定比赛类型id
         */
        sceneId: number;
        GetType(): string;
    }
    class RequestUnLockHpMatchCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 主动刷新大厅表面数据
     */
    class FlushUserHpMatchInfoHpMatchCmd_Brd {
        /**
         * 好牌网比赛数据
         */
        kv: Cmd.LobbyKeyValue[];
        GetType(): string;
    }
    /**
     * 再来一局
     */
    class ApplyContinuePlayHpMatchCmd_C {
        gameId: number;
        /**
         * 福卡赛再来一局的类型 0 默认 1 3钻 2 根据玩家身上钻石选择
         */
        type: number;
        GetType(): string;
    }
    class ApplyContinuePlayHpMatchCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        seneInfo: HpMatchInfo;
        GetType(): string;
    }
    /**
     * 请求下限时赛当前人数
     */
    class GetTimerMatchUserHpMatchCmd_C {
        /**
         * 指定比赛类型id
         */
        sceneId: number;
        GetType(): string;
    }
    class GetTimerMatchUserHpMatchCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 返回码
         */
        nbr: number;
        GetType(): string;
    }
    /**
     * 推送获得的道具奖励
     */
    class PushItemRewardsHpMatchCmd_S {
        rewards: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 手动领取比赛奖励
     */
    class UserGetRewardsManuallyHpMatchCmd_C {
        /**
         * 1/2 直接领取、看视频后领取
         */
        typ: number;
        GetType(): string;
    }
    class UserGetRewardsManuallyHpMatchCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 请求场次信息
     */
    class GetSceneInfoHpMatchCmd_C {
        /**
         * 1:金币场 2:金银猪 3:闯关 4:比赛
         */
        typ: number;
        lobbyId: number;
        gameId: number;
        GetType(): string;
    }
    class GetSceneInfoHpMatchCmd_S {
        /**
         * 金币
         */
        sInfos: SceneInfo[];
        /**
         * 金银猪
         */
        cInfos: ChallengeInfo[];
        /**
         * 闯关
         */
        rInfos: RushInfo[];
        /**
         * 比赛列表数据
         */
        mInfos: HpMatchInfo[];
        gameId: number;
        GetType(): string;
    }
    /**
     * 收藏有礼
     */
    class GetSubscribeAwardHpMatchCmd_C {
        GetType(): string;
    }
    /**
     * 破产补助
     */
    class PushBankruptcyRewardsHpMatchCmd_S {
        /**
         * 金币
         */
        chips: number;
        /**
         * 总次数
         */
        total: number;
        /**
         * 次数
         */
        num: number;
        rewards: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 桌面启动奖励
     */
    class GetDesktopLaunchAwardHpMatchCmd_C {
        GetType(): string;
    }
    class GetDesktopLaunchAwardHpMatchCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 请求页面的信息（通用）
     */
    class GetPageInfoHpMatchCmd_C {
        /**
         * 页面类型
         */
        typ: PAGE_TYPE;
        GetType(): string;
    }
    class GetPageInfoHpMatchCmd_S {
        pInfo: PubleAccountPage;
        /**
         * 页面类型
         */
        typ: PAGE_TYPE;
        GetType(): string;
    }
    class PubleAccountPage {
        /**
         * 领奖状态 1:未领 2:已领
         */
        status: number;
        /**
         * 奖励
         */
        rewards: Cmd.RewardItem[];
        /**
         * 礼包
         */
        dailyGifts: DailyGift[];
        GetType(): string;
    }
    class DailyGift {
        /**
         * 商品id
         */
        shopId: number;
        /**
         * 首次购买
         */
        firstGift: Cmd.RewardItem[];
        /**
         * 再次购买
         */
        SecondGift: Cmd.RewardItem[];
        /**
         * 额外赠送
         */
        extraGift: Cmd.RewardItem[];
        /**
         * 额外赠送倒计时
         */
        countDownSec: number;
        /**
         * 价格(分)
         */
        price: number;
        GetType(): string;
    }
    /**
     * 请求领取奖励(通用)
     */
    class GetPageRewardHpMatchCmd_C {
        /**
         * 页面类型
         */
        typ: PAGE_TYPE;
        GetType(): string;
    }
    /**
     * //////////////////////新手七日签到红包活动////////////////////////
     */
    class NewSignItem {
        /**
         * 天数
         */
        day: number;
        /**
         * 1:未领 2:已领 3:当前可领 4:还不可领
         */
        status: number;
        GetType(): string;
    }
    /**
     * 获取七日签到红包活动信息
     */
    class GetNewRedPackdInfoHpMatchCmd_C {
        GetType(): string;
    }
    class GetNewRedPackdInfoHpMatchCmd_S {
        /**
         * 今日领取
         */
        todayNum: number;
        /**
         * 累积领取
         */
        totalNum: number;
        /**
         * 签到信息
         */
        infos: NewSignItem[];
        /**
         * 是否可兑 1:可以 0:不可以
         */
        bChange: number;
        GetType(): string;
    }
    /**
     * 领红包
     */
    class GetNewRedPackRewardHpMatch_C {
        GetType(): string;
    }
    class GetNewRedPackRewardHpMatch_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 兑换
     */
    class ExchangeNewRedPackHpMatchCmd_C {
        GetType(): string;
    }
    /**
     * //////////////////////新人成长任务////////////////////////
     */
    class GrowItem {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 1:进行中 2:已完成 3:已领取
         */
        status: number;
        /**
         * 当前进度
         */
        current: number;
        GetType(): string;
    }
    class DayItem {
        /**
         * 天数
         */
        day: number;
        /**
         * 可得福卡奖励
         */
        reward: number;
        /**
         * 1:未完成(已过期) 2:已领取 3:进行中 4:未完成(未解锁)
         */
        status: number;
        GetType(): string;
    }
    /**
     * 请求成长任务信息
     */
    class GetGrowTaskInfoHpMatchCmd_C {
        GetType(): string;
    }
    class GetGrowTaskInfoHpMatchCmd_S {
        /**
         * 当天第几天
         */
        day: number;
        /**
         * 当天完成任务数
         */
        current: number;
        /**
         * 当天红包状态 0:不可开 1:可开 2:已领取
         */
        open: number;
        taskInfos: GrowItem[];
        /**
         * 总天数
         */
        totalDay: number;
        dayInfos: DayItem[];
        /**
         * 玩家累积奖励
         */
        rewards: number;
        GetType(): string;
    }
    /**
     * 领取成长任务奖励
     */
    class GetGrowTaskRewardHpMatchCmd_C {
        /**
         * 1:领取任务奖励 2:领取红包奖励
         */
        type: number;
        /**
         * 任务id
         */
        taskId: number;
        GetType(): string;
    }
    /**
     * 跳转任务界面
     */
    class JumpTaskInterfaceHpMatchCmd_C {
        type: number;
        GetType(): string;
    }
    /**
     * //////////////////////天降喜金活动////////////////////////
     *  奖励信息
     */
    class HeavenAwardInfo {
        /**
         * 类型
         */
        type: number;
        uid: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 金币
         */
        chips: number;
        /**
         * 获得时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 通知获奖
     */
    class GoldFromHeavenHpMatchCmd_S {
        /**
         * 奖励信息
         */
        awardInfo: HeavenAwardInfo;
        GetType(): string;
    }
    /**
     * 获奖记录
     */
    class GetHeavenAwardHistoryHpMatchCmd_C {
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 场次ID
         */
        sceneId: number;
        /**
         * 页码
         */
        pagenum: number;
        /**
         * 容量
         */
        pagecap: number;
        GetType(): string;
    }
    class GetHeavenAwardHistoryHpMatchCmd_S {
        /**
         * 当前奖池
         */
        jackpot: number;
        /**
         * 页码
         */
        pagenum: number;
        /**
         * 获奖历史
         */
        awardInfos: HeavenAwardInfo[];
        /**
         * 累积胜场
         */
        winsnum: number;
        /**
         * 连胜场数
         */
        winstreak: number;
        GetType(): string;
    }
    /**
     * /////////////////////闯九关/////////////////////
     */
    class GetRewardListMahjongCmd_C {
        GetType(): string;
    }
    class GetRewardListMahjongCmd_S {
        /**
         * 奖励列表
         */
        rewardList: ChallengeReward[];
        GetType(): string;
    }
    class ChallengeReward {
        /**
         * 关数
         */
        round: number;
        /**
         * 是否领取
         */
        bRecv: number;
        /**
         * 奖品列表
         */
        rewads: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 首充礼包
     */
    class GetFirstchargeInfoHpMatchCmd_C {
        GetType(): string;
    }
    class GetFirstchargeInfoHpMatchCmd_S {
        /**
         * 价格(分)
         */
        price: number;
        /**
         * 礼包内容
         */
        rewads: Cmd.RewardItem[];
        /**
         * 商品id
         */
        goodid: number;
        /**
         * 捕鱼特殊首充礼包可购买倒计时
         */
        countDownSec: number;
        /**
         * 捕鱼特殊首充礼包可得强化石数量
         */
        qhStone: Cmd.RewardItem;
        GetType(): string;
    }
    /**
     * /////////////////////捕鱼相关/////////////////////
     * vip等级
     */
    class GetFishVipInfoCmd_C {
        GetType(): string;
    }
    class GetFishVipInfoCmd_S {
        /**
         * vip等级
         */
        level: number;
        /**
         * 当前进度
         */
        curnum: number;
        /**
         * 总进度
         */
        totalnum: number;
        /**
         * 剩余钻石数
         */
        diamond: number;
        /**
         * 未领取的VIP奖励
         */
        noget: number[];
        GetType(): string;
    }
    /**
     * 领取VIP奖励
     */
    class GetFishVipRewardCmd_CS {
        /**
         * vip等级
         */
        level: number;
        GetType(): string;
    }
    /**
     * 设置炮台
     */
    class SetFishCannonCmd_CS {
        /**
         * 炮台id
         */
        id: number;
        GetType(): string;
    }
    /**
     * 请求子弹信息
     */
    class RequestFishGunInfoCmd_C {
        GetType(): string;
    }
    class RequestFishGunInfoCmd_S {
        guninfo: FishGunInfo;
        GetType(): string;
    }
    /**
     * 解锁高倍子弹
     */
    class UnlockFishGunCmd_C {
        GetType(): string;
    }
    class UnlockFishGunCmd_S {
        guninfo: FishGunInfo;
        /**
         * 奖励金币
         */
        reward: number;
        GetType(): string;
    }
    /**
     * 子弹信息
     */
    class FishGunInfo {
        /**
         * 当前最高倍率
         */
        ctimes: number;
        /**
         * 下次解锁倍率
         */
        ntimes: number;
        /**
         * 解锁消耗钻石
         */
        cost: number;
        /**
         * 解锁奖励金币
         */
        reward: number;
        /**
         * 强化石数量
         */
        itemnum: number;
        GetType(): string;
    }
}
declare module Cmd {
    enum CARD_TYPE {
        /**
         * 散牌
         */
        Scattered = 1,
        /**
         * 对10以上
         */
        OnePair = 2,
        /**
         * 两对
         */
        TwoPair = 3,
        /**
         * 三条
         */
        Three = 4,
        /**
         * 顺子
         */
        Straight = 5,
        /**
         * 同花
         */
        Flush = 6,
        /**
         * 葫芦
         */
        FullHouse = 7,
        /**
         * 四条
         */
        Four = 8,
        /**
         * 同花顺
         */
        StraightFlush = 9,
        /**
         * 同花大顺
         */
        RoyalFlush = 10,
        /**
         * 五条
         */
        Five = 11,
    }
    /**
     * 猜大小阶段信息
     */
    class GuessInfo {
        /**
         * 第几轮
         */
        round: number;
        /**
         * 牌ID
         */
        card: number;
        /**
         * 猜大小:1大 2小
         */
        guesstype: number;
        /**
         * 开牌大小:1大 2小
         */
        lottype: number;
        /**
         * 1:赢 2:输 3:平
         */
        lotret: number;
        /**
         * 是否已经结束
         */
        isover: boolean;
        /**
         * 累积奖金
         */
        lotchips: number;
        GetType(): string;
    }
    class LotteryInfo {
        /**
         * 开奖牌型
         */
        cardtype: CARD_TYPE;
        /**
         * 牌型奖金
         */
        lotchips: number;
        /**
         * 金币(彩金玩家选择)
         */
        chips: number[];
        /**
         * 大牌奖金
         */
        rewardchips: number;
        /**
         * 如果cardtype&gt;=2 构成牌型的牌id
         */
        cards: number[];
        GetType(): string;
    }
    /**
     * 翻牌
     */
    class TurntLobbyCmd_C {
        /**
         * 下注额(发牌)
         */
        betchips: number;
        /**
         * 保留的牌(换牌)
         */
        stay: number[];
        GetType(): string;
    }
    class TurnLobbyCmd_S {
        /**
         * 操作类型 1发牌 2换牌开奖
         */
        type: number;
        /**
         * 扑克牌id(发牌五张,换牌换回的牌)
         */
        cards: number[];
        /**
         * 第一轮翻牌后自动保留的牌id
         */
        autostay: number[];
        /**
         * 开奖信息
         */
        lotteryInfo: LotteryInfo;
        GetType(): string;
    }
    /**
     * 取分
     */
    class GetLotchipsLobbyCmd_C {
        GetType(): string;
    }
    class GetLotchipsLobbyCmd_S {
        /**
         * 取分金币
         */
        chips: number;
        GetType(): string;
    }
    /**
     * 猜大小
     */
    class GuessLobbyCmd_C {
        /**
         * 猜大小: 1大 2小
         */
        guesstype: number;
        GetType(): string;
    }
    class GuessLobbyCmd_S {
        guessInfo: GuessInfo;
        GetType(): string;
    }
    /**
     * 奖池
     */
    class GetJackpotLobbyCmd_C {
        GetType(): string;
    }
    class GetJackpotLobbyCmd_S {
        /**
         * 奖池
         */
        jackpot: number;
        GetType(): string;
    }
    /**
     * 挂机
     */
    class HangUpLobbyCmd_C {
        /**
         * 1：挂机 2：取消挂机
         */
        type: number;
        /**
         * 下注额
         */
        betchips: number;
        GetType(): string;
    }
    class HangUpLobbyCmd_S {
        /**
         * 1：挂机 2：取消挂机
         */
        type: number;
        GetType(): string;
    }
    /**
     * 退出
     */
    class ExitSalvoLobbyCmd_C {
        GetType(): string;
    }
}
declare module Cmd {
    /**
     * ---------------------------------大厅设置相关----------------------------//
     *  设置类型
     */
    enum SetType {
        /**
         * 音乐
         */
        Music = 1,
        /**
         * 音效
         */
        Sound = 2,
        /**
         * 排行榜(淘金类型的金币排行榜)
         */
        Rank = 3,
    }
    /**
     * ---------------------------------免费金币界面任务系统相关----------------------------//
     */
    enum TaskStatus {
        /**
         * 任务未开始
         */
        Task_Status_Unstart = 0,
        /**
         * 任务进行中
         */
        Task_Status_Progress = 1,
        /**
         * 已完成
         */
        Task_Status_Complete = 2,
        /**
         * 已领取奖励
         */
        Task_Status_Received = 3,
    }
    /**
     * 用户信息获取
     */
    class UserInfoGetLbyCmd_C {
        /**
         * 用户ID,当为空时，说明是自己的信息
         */
        uid: number;
        GetType(): string;
    }
    class UserInfoGetLbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 仅当不存在时，返回错误描述
         */
        desc: string;
        /**
         * 用户基本信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 客户端类型推送
     */
    class ReportClientTypeLbyCmd_C {
        /**
         * 客户端类型 暂定nil/1 app/小程序
         */
        clientType: number;
        GetType(): string;
    }
    /**
     * 房间数据 用于请求信息同步时 检测玩家是否已经在某个房间中
     */
    class UserRoomInfo {
        /**
         * 返回当前创建的房间号 所对应的游戏id
         */
        gameId: number;
        /**
         * 返回当前创建的房间号 所对应的游戏区id
         */
        zoneId: number;
        /**
         * 房间号
         */
        roomId: number;
        /**
         * 全局唯一的房间id
         */
        globalRoomId: number;
        /**
         * 分享数据
         */
        shareInfo: Cmd.ShareInfo;
        /**
         * 场景 为匹配场则传
         */
        scene: number;
        /**
         * 该房间创建时为几人房 -- 牛牛人数不同ui不一致
         */
        baseUserNbr: number;
        GetType(): string;
    }
    /**
     * 请求邀请明细列表
     */
    class InviteInfo {
        uid: number;
        parent: number;
        headUrl: string;
        nickName: string;
        playNum: number;
        inviteTime: number;
        GetType(): string;
    }
    class PointRankInfo {
        uid: number;
        nickName: string;
        headUrl: string;
        point: number;
        GetType(): string;
    }
    class DayRankInfo {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 具体数值
         */
        point: number;
        /**
         * nil为没有奖励 1有奖 2已领
         */
        reward: number;
        GetType(): string;
    }
    /**
     * 开房红包提现数据 -- 兼容一下好牌网比赛的红包。。 要求提现记录跟红包获取记录混在一起。 也是叼。。。用status区分吧
     */
    class openRecord {
        /**
         * 时间
         */
        time: number;
        /**
         * 兑换码
         */
        CDKEY: string;
        /**
         * 具体金额
         */
        reward: number;
        /**
         * 状态 1/2/3 未兑换／已兑换/获取记录
         */
        status: number;
        GetType(): string;
    }
    /**
     * 获得大厅类型
     */
    class LobbyTypeListLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * TableCreateConfigList的md5
         */
        md5Code: string;
        /**
         * 客户端版本信息
         */
        bundle: string;
        /**
         * 客户端代码md5
         */
        md5Game: string;
        GetType(): string;
    }
    class LobbyTypeListLobbyCmd_S {
        /**
         * 大厅支持类型,西安用,为了建容百人厅和房卡厅
         */
        lobbyTypeList: LobbyType[];
        GetType(): string;
    }
    /**
     * 用户登陆
     */
    class UserInfoSynLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * TableCreateConfigList的md5
         */
        md5Code: string;
        /**
         * 客户端版本信息
         */
        bundle: string;
        /**
         * 客户端代码md5 -- 这个当初用于大厅版本更新的 服务器暂时没用到？
         */
        md5Game: string;
        /**
         * 大厅类型,没有指定就是0
         */
        lobbyType: number;
        /**
         * 平台子Id，用于Monitor数据分析
         */
        subPlatid: number;
        /**
         * 客户端版本号,用来判断是否需要更新
         */
        version: number;
        /**
         * 客户端上传游戏版本列表的md5 用于子游戏的版本更新
         */
        md5GameList: string;
        /**
         * 客户端类型 暂定nil/1 app/小程序
         */
        clientType: number;
        /**
         * 客户端系统语言,cn,ph,tw,hk....
         */
        language: string;
        GetType(): string;
    }
    /**
     * 注销账号
     */
    class DeleteAccountLobbyCmd_CS {
        /**
         * 指定玩家uid,自己的也需要指定,避免风险误操作
         */
        uid: number;
        /**
         * 删除类型,暂时不用
         */
        typ: string;
        GetType(): string;
    }
    /**
     *  创建房间表
     *  如果有区域选择的大厅 两次检验：1 先校验大厅+n个区域
     */
    class CreateConfigListLobbyCmd_S {
        /**
         * old(lobbyGameList、createRoomConfigs) new(lobbyGameList、areaConfigs)
         */
        list: string;
        GetType(): string;
    }
    /**
     * 区域创建房间表 -- 有区域选择的大厅 两次检验：2 再校验区域+n个游戏
     */
    class AreaCreateConfigListLobbyCmd_C {
        /**
         * 区域表格md5
         */
        md5Code: string;
        /**
         * 区域id
         */
        areaId: number;
        GetType(): string;
    }
    /**
     * 区域创建房间表 只针对到指定区域
     */
    class AreaCreateConfigListLobbyCmd_S {
        /**
         * 区域id
         */
        areaId: number;
        /**
         * areaConfig、createRoomConfigs 存在两个字段
         */
        list: string;
        GetType(): string;
    }
    /**
     * 指定游戏创建房间表
     */
    class GameCreateConfigLobbyCmd_C {
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 大厅id
         */
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 指定游戏创建房间表
     */
    class GameCreateConfigLobbyCmd_S {
        resultCode: number;
        /**
         * 指定游戏的玩法表
         */
        createConfig: string;
        GetType(): string;
    }
    /**
     * 大厅类型配置
     */
    class LobbyType {
        /**
         * 大厅类型
         */
        lobbyType: number;
        /**
         * 房间类型RoomType
         */
        roomType: number;
        /**
         * 是否开启
         */
        isOpen: number;
        GetType(): string;
    }
    /**
     * 公告数据
     */
    class BroadInfo {
        /**
         * 标题
         */
        title: string;
        /**
         * 内容
         */
        content: string;
        GetType(): string;
    }
    class UserInfoSynLobbyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        /**
         * 当前是否已经创建了房间 (已改为 房间所有的玩家都可以返回房间了)
         */
        isCreate: boolean;
        /**
         * 玩家是否有可主动回去的房间
         */
        userRoomInfos: UserRoomInfo;
        /**
         * 是否为代理商
         */
        canMarket: boolean;
        /**
         * 是否显示免责声明 1则需要显示
         */
        disclaimer: number;
        /**
         * 当天还剩多少次获取分享奖励的次数 若为空表示当前活动不开启或当天已达到领取上限
         */
        shareTimes: number;
        /**
         * 1表示开启  活动结束时 该字段为空
         */
        openSignIn: number;
        /**
         * 当前第几天
         */
        days: number;
        /**
         * 是否可领取 1可领取 0不可领取
         */
        canGet: number;
        /**
         * 是否展示第一次进入的18个钻面板（贵州）1显示
         */
        showFirst: number;
        /**
         * 大厅默认公告
         */
        defaultMsg: string;
        /**
         * 是否开放积分排行榜 1开放
         */
        showPointRank: number;
        /**
         * 公告扣钻
         */
        noticeFee: number;
        /**
         * 累计充值钻石数
         */
        recharge: number;
        /**
         * 排行榜类型 不传代表当前不开放 2消耗排行榜 3开房次数排行榜
         */
        rankType: number;
        /**
         * 自动弹出老司机
         */
        showRank: number;
        /**
         * 是否显示开房红包
         */
        openReward: number;
        /**
         * 是否显示实名认证 0:不显示 1:显示
         */
        authen: number;
        /**
         * 自动弹出开房红包界面
         */
        showReward: number;
        /**
         * vip等级已经通过userinfo带回去了 所以打开vip界面不再多余请求了 这里直接带回 可领奖励
         */
        vipReward: number[];
        /**
         * 是否显示首充礼包 1 显示
         */
        firstRecharge: number;
        /**
         * 弹窗公告 如果不存在则表示不存弹窗公告
         */
        popupBroad: BroadInfo;
        /**
         * 是否显示限时优惠 1 显示
         */
        limitOffer: number;
        /**
         * 限时活动倒计时剩余时间 根据limitoOffer确定
         */
        limitActTime: number;
        /**
         * 最后一次进入的房间号,匹配号和茶馆用
         */
        lastRoomId: number;
        /**
         * 是否启用头像压缩
         */
        isCompressHeadUrl: boolean;
        /**
         * 启用头像压缩规则 如“  http:\/\/img.bwgame.com.cn\/img\/  ”
         */
        CompressHeadUrlRule: string;
        /**
         * 不填或者0表示弹默认窗,1表示新手引导,2表示三缺一加客服微信引导,
         */
        firstPage: number;
        /**
         * 1表示为代理
         */
        isAgent: number;
        /**
         * 是否显示vip话费券特权活动 1显示
         */
        vipCoupon: number;
        /**
         * 是否有未处理俱乐部的消息 1表示有
         */
        noHandle: number;
        /**
         * 是否开启瑞狗迎春活动 1表示启动
         */
        ausDog: number;
        /**
         * 奖池剩余总量
         */
        allJackPotNum: number;
        /**
         * bashi俱乐部账号
         */
        BSClubAccountId: number;
        /**
         * bashi俱乐部ID
         */
        BSClubId: number;
        /**
         * 三张游戏玩法隐藏功能
         */
        hiddenGame: Hidden_Game[];
        /**
         * 系统设置
         */
        settings: string;
        /**
         * 芝麻斗牌选场界面 进入大厅
         */
        openGameIdList: number[];
        /**
         * 游戏版本json数据 用于子游戏的版本更新
         */
        gameVersionList: string;
        /**
         * 来吧系列 是否显示转盘签到
         */
        isShowTurnTable: number;
        /**
         * 好牌网比赛数据
         */
        kv: Cmd.LobbyKeyValue[];
        /**
         * 每日任务按钮显示标志,不填表示不显示,1表示显示
         */
        dailyTask: number;
        /**
         * 不填或0表示不支持基金模式,其他表示支持,1表示什么都不扣,2表示扣钻石,3表示扣金币
         */
        fundType: number;
        /**
         * 不填或0表示不支持网页充值,1表示支持钻石充值,2表示支持金豆充值,3表示都支持
         */
        rechargeType: number;
        /**
         * 是否推广者 1 是 0 不是
         */
        isPromoters: number;
        /**
         * 免费领钻倒计时
         */
        countDownSec: number;
        /**
         * 收藏 1:已收藏 0:未收藏
         */
        subscribe: number;
        /**
         * 是否月卡用户
         */
        ismcardvalid: boolean;
        /**
         * 桌面启动奖励是否领取
         */
        dtlaunchaward: boolean;
        /**
         * 弹窗图url
         */
        windowImg: string;
        /**
         * 分享图url
         */
        shareImg: string;
        /**
         * 下个限时宝箱时间
         */
        timeLimitBoxTime: number;
        /**
         * 是否显示刮刮乐 -- 当前只有金华三个大厅有
         */
        isShowScratch: number;
        /**
         * 设备操作状态
         */
        deviceOpCheck: number;
        /**
         * 1账号在封停状态
         */
        punish: number;
        /**
         * 更多游戏 需要显示的游戏
         */
        moreGame: number[];
        /**
         * 捕鱼特殊首充礼包可购买倒计时
         */
        countDownSec2: number;
        /**
         * 是否通过openid登录
         */
        loginByOpenId: boolean;
        GetType(): string;
    }
    /**
     * 通知客户端换区
     */
    class NotifyChangeZoneLobbyCmd_S {
        /**
         * 最佳大厅区服id
         */
        bestLobbyZoneId: number;
        GetType(): string;
    }
    /**
     * 用户信息获取
     */
    class UserInfoGetLobbyCmd_C {
        /**
         * 指定玩家uid
         */
        uid: number;
        /**
         * 是否需要获取有无房间归属
         */
        getIsCreate: boolean;
        lobbyId: number;
        GetType(): string;
    }
    class UserInfoGetLobbyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        /**
         * 当前是否已经创建了房间 (已改为 房间所有的玩家都可以返回房间了)
         */
        isCreate: boolean;
        /**
         * 累计充值钻石数
         */
        recharge: number;
        /**
         * vip等级已经通过userinfo带回去了 所以打开vip界面不再多余请求了 这里直接带回 可领奖励
         */
        vipReward: number[];
        /**
         * 告知前端是否存在官方充值存在 绑定代理商返钻 1表示存在 -- 定义在这里 而不是在玩家请求信息同步那里的原因是 需要等代理商系统回调才能获取到该数据
         */
        bindRechargeRet: number;
        /**
         * 是否显示首充礼包 1 显示 2018.06.28
         */
        firstRecharge: number;
        /**
         * 好牌网比赛数据
         */
        kv: Cmd.LobbyKeyValue[];
        /**
         * 如果为断线重连推送的则赋值1
         */
        isReconnet: number;
        /**
         * 好牌网场次数据
         */
        sceneInfos: Cmd.SceneInfo[];
        /**
         * 下个限时宝箱时间
         */
        timeLimitBoxTime: number;
        GetType(): string;
    }
    /**
     * 查找指定玩家 与UserInfoGetLobbyCmd_C区分一下 只用于查找返回数据给前端 不需要前端更新信息
     */
    class UserInfoSearchLobbyCmd_C {
        /**
         * 玩家ID
         */
        uid: number;
        GetType(): string;
    }
    class UserInfoSearchLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示玩家不存在
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 战绩信息
         */
        gameRecord: CoinGameRecord;
        GetType(): string;
    }
    class UserInfoModifyRequestLobyCmd_C {
        headUrl: string;
        nickName: string;
        gender: string;
        /**
         * 修改个性签名
         */
        signature: string;
        /**
         * 操作，0或空表示不限制,1表示限制
         */
        checkOp: number;
        GetType(): string;
    }
    class UserInfoModifyReturnLobyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 分享请求
     */
    class ShareLobbyCmd_C {
        /**
         * 分享请求具体数据需要读表 所以后续需要传lobbyId
         */
        lobbyId: number;
        /**
         * 分享类型,不填或0表示朋友圈,1表示群分享
         */
        shareType: number;
        /**
         * 分享内容,目前是matchId
         */
        shareId: number;
        /**
         * 第二类分享类型：不填或0兼容以前老的协议，1表示漳州金币场分享送金币活动
         */
        shareType2: number;
        GetType(): string;
    }
    class ShareLobbyCmd_S {
        resultCode: number;
        /**
         * 活动时间内 每天第一次分享成功后 钻石余额
         */
        remainder: number;
        /**
         * 剩余次数
         */
        shareTimes: number;
        /**
         * 第二类分享类型：不填或0兼容以前老的协议，1表示漳州金币场分享送金币活动
         */
        shareType2: number;
        /**
         * 奖励数量
         */
        rewardNbr: number;
        GetType(): string;
    }
    /**
     * 进入修改上级代理界面(丹东需要显示一下）
     */
    class GetParentLobbyCmd_C {
        GetType(): string;
    }
    class GetParentLobbyCmd_S {
        parent: number;
        GetType(): string;
    }
    /**
     * 修改上级代理
     */
    class ChangeParentCmd_C {
        /**
         * 上级代理
         */
        parent: number;
        GetType(): string;
    }
    class ChangeParentCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 已阅免责声明
     */
    class ReadDisclaimerLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 已阅弹窗公告
     */
    class ReadPopubBroadLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 获取自己的推广二维码
     */
    class GetExtendsion2DCodeCmd_C {
        GetType(): string;
    }
    class GetExtendsion2DCodeCmd_S {
        codeUrl: string;
        GetType(): string;
    }
    /**
     * 招募代理
     */
    class RecruitAgentCmd_CS {
        /**
         * 手机号码
         */
        mobilePhone: number;
        /**
         * 微信联系方式
         */
        wechat: string;
        /**
         * 返回码 存在返回码则是有误
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取推广员数据
     */
    class GetInviteListCmd_CS {
        inviteList: InviteInfo[];
        codeUrl: string;
        inviteAllNum: number;
        playAllNum: number;
        myself: InviteInfo;
        /**
         * 是否可以领取砖石
         */
        canGet: number;
        /**
         * 已领
         */
        alreadyRecv: number;
        /**
         * 待领
         */
        notRecv: number;
        GetType(): string;
    }
    /**
     * 领取推广员奖励
     */
    class GetInviteRewardCmd_C {
        GetType(): string;
    }
    class GetInviteRewardCmd_S {
        resultCode: number;
        /**
         * 获取奖励后当前砖石余额
         */
        diamond: number;
        alreadyRecv: number;
        notRecv: number;
        GetType(): string;
    }
    /**
     * 领取签到奖励(麻将钻石场 正常签到领取钻石流程)
     */
    class GetRegisterRewardCmd_C {
        /**
         * 大厅id 暂时只有贵州可领取
         */
        lobbyId: number;
        GetType(): string;
    }
    class GetRegisterRewardCmd_S {
        resultCode: number;
        /**
         * 获取奖励后当前砖石余额
         */
        diamond: number;
        GetType(): string;
    }
    /**
     * 积分排行榜 （贵州）
     */
    class GetDayPointRankCmd_C {
        /**
         * 1今天，2昨天
         */
        day: number;
        GetType(): string;
    }
    /**
     * 积分排行榜 （贵州）
     */
    class GetDayPointRankCmd_S {
        resultCode: number;
        /**
         * 1今天，2昨天
         */
        day: number;
        /**
         * 排行数据
         */
        infos: PointRankInfo[];
        GetType(): string;
    }
    /**
     * 发送喇叭
     */
    class SendSuonaLobbyCmd_C {
        /**
         * 内容
         */
        content: string;
        GetType(): string;
    }
    class SendSuonaLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 系统弹框消息,目前用来控制版本,其他地方也可以用
     */
    class MessageBoxLobbyCmd_S {
        /**
         * 弹窗类型,1表示重启系统框
         */
        type: number;
        /**
         * 弹框内容
         */
        desc: string;
        /**
         * 标题
         */
        title: string;
        /**
         * 按钮,不填默认就是确定
         */
        btn1: string;
        /**
         * 按钮,不填就没有
         */
        btn2: string;
        /**
         * 按钮,不填就没有
         */
        btn3: string;
        /**
         * 链接,如果有,点确定就弹外部链接
         */
        url: string;
        GetType(): string;
    }
    /**
     * 钻石换房卡（江西客家）
     */
    class ExchangeCardByDiamondLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 兑换房卡数
         */
        card: number;
        GetType(): string;
    }
    /**
     * 钻石 房卡变动 都有专用的接口发送 但是存在冗余 钻石房卡同时变化时 都会推送个人信息刷新
     */
    class ExchangeCardByDiamondLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 进入房间前请求一下当前房间有谁在 (金华大厅)
     */
    class GetRoomUserLobbyCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        GetType(): string;
    }
    class GetRoomUserLobbyCmd_S {
        /**
         * 如果为空表示 正常返回 客户端读取desc数据进行显示
         */
        resultCode: number;
        desc: string;
        /**
         * 原样返回
         */
        roomId: number;
        GetType(): string;
    }
    /**
     * 获取每日排行榜数据
     */
    class GetDayRankCmd_C {
        /**
         * 1今天，2昨天
         */
        day: number;
        /**
         * 不传默认可兼容以前的1积分排行榜  2开房钻石消耗排行榜 3开房次数排行榜（暂未实现）
         */
        type: number;
        /**
         * 大厅id（兼容老的前端 默认不传时 默认奖励数据为{60,30,20,20,20}）
         */
        lobbyId: number;
        GetType(): string;
    }
    class GetDayRankCmd_S {
        resultCode: number;
        /**
         * 1今天，2昨天
         */
        day: number;
        /**
         * 排行数据
         */
        infos: DayRankInfo[];
        /**
         * 玩家自身数据
         */
        userInfo: DayRankInfo;
        GetType(): string;
    }
    /**
     * 领取每日排行榜奖励
     */
    class GetDayRankRewardCmd_C {
        /**
         * 2开房消耗排行榜奖励 3开房次数排行榜奖励（暂未实现）
         */
        type: number;
        /**
         * 大厅id （兼容老的前端 默认不传时 默认奖励数据为{60,30,20,20,20}）
         */
        lobbyId: number;
        GetType(): string;
    }
    class GetDayRankRewardCmd_S {
        resultCode: number;
        /**
         * 第几名
         */
        rank: number;
        /**
         * 获取奖励砖石
         */
        diamond: number;
        GetType(): string;
    }
    /**
     * 处罚提示前端 1警告，2禁言，3自言自语，4关禁闭，5踢下线，6封号 暂时只处理了 5 6
     */
    class PunishUserCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 取款请求
     */
    class BankWithdrawCmd_C {
        /**
         * 取款数量
         */
        num: number;
        /**
         * 密码
         */
        passwd: string;
        GetType(): string;
    }
    /**
     * 存款请求
     */
    class BankDepositCmd_C {
        /**
         * 存款数量
         */
        num: number;
        GetType(): string;
    }
    /**
     * 余款数量更新
     */
    class BankMoneyUpdate_S {
        /**
         * 身上钱数
         */
        bodyHave: number;
        /**
         * 剩款
         */
        bankHave: number;
        GetType(): string;
    }
    /**
     * 修改密码请求
     */
    class ChangePasswordCmd_C {
        /**
         * 旧密码
         */
        passwdOld: string;
        /**
         * 新密码
         */
        passwdNew: string;
        GetType(): string;
    }
    /**
     * -------------------------------------------------------------------------------------//
     * 微信红包开始
     * -------------------------------------------------------------------------------------//
     *  查看当前微信红包奖励
     */
    class GetRedPackRewardInfoLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 返回当前微信红包奖励
     */
    class GetRedPackRewardInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 待提取金额
         */
        num: number;
        /**
         * 距离可提取还有多少
         */
        distance: number;
        /**
         * 剩余时间
         */
        surplusTime: number;
        /**
         * 今日开奖情况
         */
        infos: RedPackInfo[];
        /**
         * 活动开始时间(这两个时间传了 有没有用 前端自己决定)
         */
        startTime: number;
        /**
         * 活动结束时间
         */
        endTime: number;
        /**
         * 已提取金额
         */
        recvnum: number;
        GetType(): string;
    }
    /**
     * 检测是否可提取微信红包到公众号
     */
    class CheckOpenRedPackLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        GetType(): string;
    }
    class CheckOpenRedPackLobbyCmd_S {
        /**
         * 检测通过 该字段为nil
         */
        resultCode: number;
        codeUrl: string;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 提取微信红包到公众号(兼容企业付款)
     */
    class OpenRedPackLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 红包提取类型 nil/1/2 不传默认老的开房红包模式/瑞狗迎春/好彩跑得快提取到企业付款
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 提取微信红包到公众号返回
     */
    class OpenRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余
         */
        surplus: number;
        /**
         * 当前提取数据
         */
        info: openRecord;
        codeUrl: string;
        distance: number;
        /**
         * 红包提取类型 nil/1 不传默认老的开房红包模式/瑞狗迎春
         */
        typ: number;
        /**
         * 已提取总额 好彩跑得快（小程序用）
         */
        drawAll: number;
        GetType(): string;
    }
    /**
     * 提取微信红包失败给单独回个东西 让弹框
     */
    class OpenRedPackFailLobbyCmd_S {
        /**
         * 兑换码
         */
        CDKEY: number;
        GetType(): string;
    }
    /**
     * 查看提现详情
     */
    class GetOpenRedPackRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetOpenRedPackRecordLobbyCmd_S {
        infos: openRecord[];
        GetType(): string;
    }
    /**
     * 大厅下微信红包雨
     */
    class GrabRedPackLobbyCmd_Brd {
        /**
         * 红包id
         */
        packid: number;
        GetType(): string;
    }
    /**
     * 抢微信红包雨
     */
    class GetGrabRedPackLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 红包id
         */
        packid: number;
        GetType(): string;
    }
    /**
     * 获取微信电话
     */
    class WechatLobbyCmd_CS {
        /**
         * 姓名
         */
        name: string;
        /**
         * 手机号码
         */
        mobile: string;
        /**
         * 微信联系方式
         */
        wechat: string;
        GetType(): string;
    }
    /**
     * 实名认证
     */
    class AuthenticationLobbyCmd_C {
        /**
         * 姓名
         */
        name: string;
        /**
         * 身份证号码
         */
        cardID: string;
        GetType(): string;
    }
    class AuthenticationLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    class AuthenticationLobbyCmd_CS {
        /**
         * 姓名
         */
        name: string;
        /**
         * 身份证号码
         */
        cardID: string;
        /**
         * 手机号
         */
        mobilePhone: string;
        /**
         * 支付宝账号
         */
        alipay: string;
        /**
         * 邀请码
         */
        inviteCode: string;
        /**
         * 添加、编辑， 0 获取
         */
        typ: number;
        resultCode: number;
        GetType(): string;
    }
    /**
     * 比赛场报名
     */
    class EntryMatchLobbyCmd_C {
        lobbyId: number;
        /**
         * 报名场次
         */
        playId: number;
        GetType(): string;
    }
    class EntryMatchLobbyCmd_S {
        resultCode: number;
        lobbyId: number;
        playId: number;
        /**
         * 报名人数
         */
        enrollment: number;
        /**
         * 总需人数
         */
        totalCount: number;
        GetType(): string;
    }
    /**
     * 推送比赛场的报名人数给当前报名等待的人
     */
    class EntryMatchUserCountLobbyCmd_Brd {
        playId: number;
        /**
         * 报名人数
         */
        enrollment: number;
        /**
         * 总需人数
         */
        totalCount: number;
        GetType(): string;
    }
    /**
     * 退赛
     */
    class QuitMatchLobbyCmd_C {
        lobbyId: number;
        playId: number;
        GetType(): string;
    }
    class QuitMatchLobbyCmd_S {
        resultCode: number;
        enrollment: number;
        totalCount: number;
        GetType(): string;
    }
    /**
     * 获取报名条件
     */
    class GetEnrollConditionLobbyCmd_C {
        playId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetEnrollConditionLobbyCmd_S {
        resultCode: number;
        /**
         * 开始时间
         */
        st: string;
        /**
         * 结束时间
         */
        et: string;
        enrollment: number;
        totalCount: number;
        /**
         * 是否已经报名，前端用于判断报名界面的显示 1已报名  2未报名
         */
        isEnroll: number;
        GetType(): string;
    }
    /**
     * 比赛场战绩与奖励
     */
    class MatchLotteryLobbyCmd_Brd {
        /**
         * 战绩类型 1中途淘汰，2等待晋级，3比赛结束最终奖励
         */
        rType: number;
        rank: number;
        round: number;
        point: number;
        GetType(): string;
    }
    /**
     * 等待晋级页面数据刷新
     */
    class WaitMatchPromotionInfoLobbyCmd_Brd {
        playId: number;
        /**
         * 剩余晋级数量
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 获取符合比赛场符合报名条件的人数
     */
    class JoinMatch {
        playId: number;
        userCount: number;
        /**
         * 是否可点击
         */
        click: boolean;
        GetType(): string;
    }
    class GetJoinMatchUserCountCmd_C {
        playIdSet: number[];
        GetType(): string;
    }
    class GetJoinMatchUserCountCmd_S {
        resultCode: number;
        joinMatch: JoinMatch[];
        GetType(): string;
    }
    /**
     * 比赛场异常补偿弹窗
     */
    class SendMatchAbnormalLobbyCmd_Brd {
        /**
         * 赔偿信息
         */
        compensation: string;
        GetType(): string;
    }
    /**
     * 符合比赛场报名条件人的排行信息
     */
    class JoinMatchRank {
        nickname: string;
        /**
         * 夺冠次数
         */
        crownnum: number;
        GetType(): string;
    }
    class GetJoinMatchRankLobbyCmd_C {
        playId: number;
        GetType(): string;
    }
    class GetJoinMatchRankLobbyCmd_S {
        joinMatchRank: JoinMatchRank[];
        /**
         * 可报名多少人
         */
        enrollment: number;
        /**
         * 总需多少人
         */
        totalCount: number;
        /**
         * 当前时间
         */
        curTime: string;
        GetType(): string;
    }
    /**
     * 百人场 进入某个游戏
     */
    class EnterHundredGameLobbyCmd_C {
        gameId: number;
        /**
         * 是否是体验场 1是
         */
        isLearn: number;
        /**
         * 测试服允许前端指定区服id
         */
        preZoneId: number;
        GetType(): string;
    }
    class EnterHundredGameLobbyCmd_S {
        resultCode: number;
        gameId: number;
        zoneId: number;
        /**
         * 是否是体验场 1是
         */
        isLearn: number;
        GetType(): string;
    }
    /**
     * -------------------------------------------------------------------------------------//
     *  每日签到活动(麻将金币场引入的 二号签到流程 - -#)
     * -------------------------------------------------------------------------------------//
     */
    class ContinueSignInfo {
        id: number;
        /**
         * 连续领取天数
         */
        continueDay: number;
        /**
         * 是否已领取
         */
        bReceived: boolean;
        /**
         * 是否可领取
         */
        bCouldReceive: boolean;
        GetType(): string;
    }
    /**
     * 用户签到信息获取
     */
    class UserSignInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class UserSignInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 本周已签到日期(周一至周日 分别为 1 -- 7)
         */
        signWeek: number[];
        /**
         * 连续签到数据
         */
        continue: ContinueSignInfo[];
        /**
         * 今日是否已领取
         */
        bTodayReceived: boolean;
        continueDay: number;
        /**
         * 未领取的本周签到(周一至周日 分别为 1 -- 7) 空值表示没有未领取
         */
        noSignWeek: number[];
        /**
         * 当天可领取的每周签到(周一至周日 分别为 1 -- 7) 空值表示没有可领取
         */
        signWeekDay: number;
        GetType(): string;
    }
    /**
     * 用户今日签到
     */
    class UserSignTodayLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class UserSignTodayLobbyCmd_S {
        resultCode: number;
        curWeek: number;
        GetType(): string;
    }
    /**
     * 用户领取累计签到奖励
     */
    class UserSignContinueLobbyCmd_C {
        lobbyId: number;
        /**
         * 累计签到id
         */
        continueSignId: number;
        GetType(): string;
    }
    class UserSignContinueLobbyCmd_S {
        resultCode: number;
        /**
         * 累计签到id
         */
        continueSignId: number;
        GetType(): string;
    }
    /**
     * -------------------------------------------------------------------------------------//
     *  金币场排行榜(麻将金币场引入的 二号排行榜 跟麻将排行榜不混在一起 - -#)
     * -------------------------------------------------------------------------------------//
     */
    class UserRankInfo {
        uid: number;
        headUrl: string;
        gender: string;
        nickName: string;
        signature: string;
        /**
         * 玩家 总共筹码
         */
        allChips: number;
        /**
         * 玩家 当天赢取筹码
         */
        winChips: number;
        /**
         * 玩家 总充值
         */
        allRecharge: number;
        /**
         * 玩家 魅力 （暂时先不用就行了 不理它）
         */
        charm: number;
        /**
         * 玩家 自身排名
         */
        rank: number;
        /**
         * 玩家 vip等级
         */
        vip: number;
        /**
         * 玩家 魅力值
         */
        userCp: number;
        /**
         * 玩家 头衔
         */
        title: string;
        /**
         * 正在使用的个人形象 2017.11.15好彩真人需求
         */
        personalImage: Cmd.PersonalImage[];
        /**
         * 玩家游戏盈利金币
         */
        dailyWinChips: number;
        /**
         * 周魅力值
         */
        weekUserCp: number;
        /**
         * 玩家周游戏盈利金币
         */
        weekWinChips: number;
        /**
         * 货币类型 1 钻石 2 金币
         */
        rType: number;
        GetType(): string;
    }
    /**
     * 获取排行榜信息
     */
    class GetListRankCmd_C {
        /**
         * 不填或者1表示钻石,2表示金豆
         */
        rType: number;
        /**
         * 第几次请求 一次请求获取20个数据
         */
        index: number;
        GetType(): string;
    }
    /**
     * 获取排行榜信息回复
     */
    class GetListRankCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 是否首次进入排行榜（如果在设置中设置过是否参加排行榜则 也算）
         */
        isFirst: boolean;
        /**
         * 金币排行榜
         */
        allChipsRank: UserRankInfo[];
        /**
         * 我的金币排行信息
         */
        myAllChipsRank: UserRankInfo;
        /**
         * 大赢家排行榜
         */
        winChipsRank: UserRankInfo[];
        /**
         * 我的大赢家排行信息
         */
        myWinChipsRank: UserRankInfo;
        /**
         * 充值排行榜
         */
        allRechargeRankList: UserRankInfo[];
        /**
         * 我的充值排行榜
         */
        myAllRechargeRank: UserRankInfo;
        index: number;
        /**
         * 昨日充值排行榜
         */
        allYesterdayRechargeList: UserRankInfo[];
        /**
         * 我的昨日充值排行榜
         */
        myYesterdayRechargeRank: UserRankInfo;
        /**
         * 更新时间
         */
        updatetime: number;
        GetType(): string;
    }
    /**
     * 获取大赢家排行榜奖励
     */
    class GetWinChipsRankRewardCmd_C {
        GetType(): string;
    }
    /**
     * 获取大赢家排行榜奖励回复
     */
    class GetWinChipsRankRewardCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 领取多少筹码
         */
        chips: number;
        /**
         * 当前剩余多少筹码
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 魅力值排行榜
     */
    class GetUserCpRankListLobbyCmd_C {
        GetType(): string;
    }
    class GetUserCpRankListLobbyCmd_S {
        allUserCpRank: UserRankInfo[];
        /**
         * 自己的排名，为空则表示未上榜
         */
        myRank: number;
        GetType(): string;
    }
    /**
     * 好彩真人金币排行榜(无数个排行榜)
     */
    class GetCoinLobbyRankListLobbyCmd_C {
        /**
         * 1财富总榜 2充值总榜 3魅力值周榜 4魅力值总榜 5游戏盈利榜 6银鲨榜 7金鲨榜
         */
        rType: number;
        /**
         * 如果查询的是游戏盈利榜则需要传对应的游戏id过来
         */
        gameId: number;
        GetType(): string;
    }
    class GetCoinLobbyRankListLobbyCmd_S {
        resultCode: number;
        rType: number;
        /**
         * 如果查询的是游戏盈利榜则需要传对应的游戏id过来
         */
        gameId: number;
        rankInfo: UserRankInfo[];
        /**
         * 自己的排名，为空则表示未上榜
         */
        myRank: number;
        /**
         * 差多少上榜
         */
        distance: number;
        /**
         * 更新时间
         */
        updatetime: number;
        GetType(): string;
    }
    /**
     * 芝麻斗牌 排行榜(新加一个 不用兼容以前的)
     */
    class GetRankListLobbyCmd_C {
        /**
         * 1 金币 2 钻石 3 金猪 4 银猪 5 钻石核弹
         */
        rType: number;
        /**
         * 前端是否已有数据 1:有 0:没有
         */
        bData: number;
        GetType(): string;
    }
    class GetRankListLobbyCmd_S {
        resultCode: number;
        rType: number;
        rankInfo: UserRankInfo[];
        myRank: number;
        myChips: number;
        GetType(): string;
    }
    /**
     * 大厅设置
     */
    class GameSetLobbyCmd_C {
        /**
         * 设置哪一项
         */
        setType: SetType;
        /**
         * 开 或 关
         */
        status: boolean;
        GetType(): string;
    }
    class GameSetLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 获取当前设置
     */
    class GetGameSetLobbyCmd_C {
        GetType(): string;
    }
    class GetGameSetLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 音乐设置
         */
        music: boolean;
        /**
         * 音效设置
         */
        sound: boolean;
        /**
         * 排行榜设置
         */
        rank: boolean;
        GetType(): string;
    }
    /**
     * 领取vip奖励
     */
    class GetVipRewardLobbyCmd_C {
        lobbyId: number;
        /**
         * 领取制定档次
         */
        level: number;
        GetType(): string;
    }
    class GetVipRewardLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 领取制定档次
         */
        level: number;
        GetType(): string;
    }
    /**
     * ---------------------------------商城购买相关----------------------------//
     */
    class BuyGoodsLobbyCmd_C {
        shopId: number;
        shopNbr: number;
        GetType(): string;
    }
    class BuyGoodsLobbyCmd_S {
        resultCode: number;
        shopId: number;
        shopNbr: number;
        GetType(): string;
    }
    class TaskItem {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 任务状态
         */
        taskStatus: TaskStatus;
        /**
         * 子任务已完成数量
         */
        subTaskCompletedNbr: number;
        /**
         * 子任务总数量
         */
        subTaskAllNbr: number;
        GetType(): string;
    }
    class DaysTaskItem {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 任务状态
         */
        taskStatus: TaskStatus;
        /**
         * 当前完成进度
         */
        current: number;
        /**
         * 已领取次数
         */
        recv: number;
        /**
         * 剩余领取次数
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 进入免费金币界面
     */
    class IntoFreeGoldLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class IntoFreeGoldLobbyCmd_S {
        resultCode: number;
        taskInfo: DaysTaskItem[];
        /**
         * 引入金币场系统后 新增的 其他类型任务
         */
        otherTaskInfo: DaysTaskItem[];
        /**
         * 成就任务，属于一次性任务
         */
        onceTaskInfo: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 领取指定任务奖励
     */
    class GetDaysTaskRewardLobbyCmd_C {
        taskId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetDaysTaskRewardLobbyCmd_S {
        resultCode: number;
        taskId: number;
        /**
         * 后续任务
         */
        followTasks: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 服务器推送任务状态更新
     */
    class UpdateDaysTaskLobbyCmd_S {
        /**
         * 更新任务
         */
        taskInfo: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 向前端发送破产补助弹窗
     */
    class SendBankruptcyLobbyCmd_Brd {
        /**
         * 已经领取过多少次破产补助  总次数、金额等 前端自己读表
         */
        bankruptcy: number;
        GetType(): string;
    }
    /**
     * 游戏任务进度 例如：1/10
     */
    class GetGameTaskScheduleLobbyCmd_C {
        /**
         * 游戏id
         */
        gameId: number;
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 每更新一次服务器会主动推送_S给客户端
     */
    class GetGameTaskScheduleLobbyCmd_S {
        resultCode: number;
        gameId: number;
        /**
         * 前面的值 例如：1/10
         */
        pre: number;
        /**
         * 后面的值 例如：1/10
         */
        back: number;
        /**
         * 1为可领取状态，前端用来展示光圈 2为所有的任务奖励都已经领取
         */
        receive: number;
        taskId: number;
        GetType(): string;
    }
    /**
     * 获取任务列表
     */
    class GetGameTaskListLobbyCmd_C {
        gameId: number;
        lobbyId: number;
        /**
         * 场次ID
         */
        sceneId: number;
        GetType(): string;
    }
    class GetGameTaskListLobbyCmd_S {
        resultCode: number;
        gameId: number;
        gameTaskInfo: DaysTaskItem[];
        /**
         * 场次ID
         */
        sceneId: number;
        GetType(): string;
    }
    /**
     * 领取指定游戏任务奖励
     */
    class GetGameTaskRewardLobbyCmd_C {
        taskId: number;
        gameId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetGameTaskRewardLobbyCmd_S {
        resultCode: number;
        taskId: number;
        gameId: number;
        goods: Cmd.Goods[];
        /**
         * 描述，三张大厅使用
         */
        desc: string;
        /**
         * 后续任务
         */
        followTasks: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 新金币场首充
     */
    class FirstRechargeInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 新金币场首充弹窗
     */
    class FirstRechargeInfoLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 商城id
         */
        shopId: number;
        /**
         * 是否可以领取 1 可以领取
         */
        receive: number;
        GetType(): string;
    }
    /**
     * 领取首充礼包
     */
    class FirstRecharge {
        /**
         * 1 金币  2钻石  (暂时只有金币)
         */
        awardType: number;
        /**
         * 奖励数量
         */
        awardNum: number;
        GetType(): string;
    }
    class ReceiveFirstRechargeLobbyCmd_C {
        GetType(): string;
    }
    class ReceiveFirstRechargeLobbyCmd_S {
        resultCode: number;
        award: FirstRecharge[];
        GetType(): string;
    }
    /**
     * 限时优惠活动
     */
    class LimitOfferChipsLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 限时优惠活动的弹窗
     */
    class LimitOfferChipsLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 对应的档位id
         */
        limitId: number;
        /**
         * 限时活动倒计时剩余时间
         */
        limitActTime: number;
        GetType(): string;
    }
    /**
     * 兑换限时优惠的金币
     */
    class GetLimitOfferChipsLobbyCmd_C {
        /**
         * 对应的档位id
         */
        limitId: number;
        /**
         * 对应的优惠id
         */
        shopId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetLimitOfferChipsLobbyCmd_S {
        resultCode: number;
        shopId: number;
        GetType(): string;
    }
    /**
     * 幸运翻翻翻资格
     */
    class GetLuckTurnCardInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetLuckTurnCardInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 0拥有免费资格(免费抽奖) 1当前已使用(翻牌需要消耗货币) 2暂未拥有(不允许参与翻牌)
         */
        freeTurn: number;
        /**
         * 当前最大局数
         */
        curRound: number;
        /**
         * 免费条件的局数
         */
        freeRound: number;
        /**
         * 1免费 2钻石
         */
        costType: number;
        /**
         * 消耗钻石数量
         */
        costNum: number;
        GetType(): string;
    }
    /**
     * 幸运翻翻翻的翻牌结果
     */
    class GetLuckTurnCardResultLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetLuckTurnCardResultLobbyCmd_S {
        resultCode: number;
        /**
         * 1金币 2钻石
         */
        awardType: number;
        /**
         * 数量
         */
        awardNum: number;
        /**
         * 0拥有免费资格(免费抽奖) 1当前已使用(翻牌需要消耗货币) 2暂未拥有(不允许参与翻牌)
         */
        freeTurn: number;
        /**
         * 当前最大局数
         */
        curRound: number;
        /**
         * 免费条件的局数
         */
        freeRound: number;
        /**
         * 1免费 2钻石
         */
        costType: number;
        /**
         * 消耗钻石数量
         */
        costNum: number;
        GetType(): string;
    }
    /**
     *  新版幸运翻翻翻
     *  金币奖励集合
     */
    class RewardChips {
        /**
         * chips只有在第一轮或者已领取的时候才会回给客户端
         */
        chips: number;
        /**
         * 是否是最大值 1是
         */
        maxChips: number;
        /**
         * 是否已领取 1是
         */
        recv: number;
        /**
         * 第几张牌
         */
        index: number;
        GetType(): string;
    }
    /**
     * 新版幸运翻翻翻主界面
     */
    class NewLuckTurnCardShowLobbyCmd_C {
        GetType(): string;
    }
    class NewLuckTurnCardShowLobbyCmd_S {
        resultCode: number;
        /**
         * 当前完成局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 翻牌类型 1:免费 2:钻石 3:今天已结束,不可领
         */
        costType: number;
        /**
         * 消耗数量 只有用钻石的时候才存在
         */
        costNum: number;
        /**
         * 幸运翻翻翻的轮数
         */
        luckRound: number;
        /**
         * 金币奖励集合
         */
        reward: RewardChips[];
        GetType(): string;
    }
    /**
     * 新版幸运翻翻翻翻牌
     */
    class NewGetLuckTurnCardRewardLobbyCmd_C {
        /**
         * 第几张牌
         */
        index: number;
        GetType(): string;
    }
    class NewGetLuckTurnCardRewardLobbyCmd_S {
        resultCode: number;
        /**
         * 获得的金币数
         */
        rewardChips: number;
        /**
         * 下面的用于刷新界面
         * 当前完成局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 翻牌类型 1:免费 2:钻石 3:今天已结束,不可领
         */
        costType: number;
        /**
         * 消耗数量 只有用钻石的时候才存在
         */
        costNum: number;
        /**
         * 幸运翻翻翻的轮数
         */
        luckRound: number;
        /**
         * 金币奖励集合
         */
        reward: RewardChips[];
        GetType(): string;
    }
    /**
     * 第三版幸运翻翻翻
     * 对应的翻牌结果
     */
    class TurnReward {
        /**
         * 第几张牌
         */
        index: number;
        /**
         * 状态 0未翻开 1翻开
         */
        status: number;
        /**
         * 翻开后的话费券数量 status为1的时候存在
         */
        reward: number;
        /**
         * 金币翻牌未翻开时展示话费券的最小值和最大值
         * 最小值
         */
        minReward: number;
        /**
         * 最大值
         */
        maxReward: number;
        /**
         * 金币翻牌需要消耗的金币数量
         */
        costChips: number;
        GetType(): string;
    }
    /**
     * 获取对应的界面数据
     */
    class GetLuckTurnCardShowInfoV3LobbyCmd_C {
        lobbyId: number;
        /**
         * 0主界面 1免费抽奖界面 2金币抽奖界面
         */
        sType: number;
        GetType(): string;
    }
    class GetLuckTurnCardShowInfoV3LobbyCmd_S {
        resultCode: number;
        sType: number;
        /**
         * 主界面的话费券展示集合
         */
        couponList: number[];
        /**
         * 免费抽奖当前完成的对局信息
         * 当前局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 免费界面数据
         */
        freeTurn: TurnReward[];
        /**
         * 金币界面数据
         */
        chipsTurn: TurnReward[];
        /**
         * 轮数
         */
        luckRound: number;
        GetType(): string;
    }
    /**
     * 翻牌结果
     */
    class GetLuckTurnCardRewardV3LobbyCmd_C {
        lobbyId: number;
        /**
         * 1免费翻 2金币翻
         */
        opType: number;
        /**
         * 翻第几张牌
         */
        index: number;
        GetType(): string;
    }
    class GetLuckTurnCardRewardV3LobbyCmd_S {
        resultCode: number;
        opType: number;
        reward: TurnReward;
        /**
         * 轮数
         */
        luckRound: number;
        /**
         * 免费翻牌刷新
         * 当前局数
         */
        curRound: number;
        /**
         * 总局数
         */
        totalRound: number;
        GetType(): string;
    }
    /**
     * 好彩金币场的救济金
     */
    class GetReliefPayStatusLobbyCmd_C {
        lobbyId: number;
        /**
         * 操作类型：1 查询 2 领取
         */
        optype: number;
        GetType(): string;
    }
    class GetReliefPayStatusLobbyCmd_S {
        resultCode: number;
        reliefPay: DaysTaskItem;
        /**
         * 操作类型：1 查询 2 领取
         */
        optype: number;
        GetType(): string;
    }
    /**
     * 礼包码兑换功能
     */
    class UserGiftCodeLobbyCmd_C {
        giftCode: string;
        GetType(): string;
    }
    class UserGiftCodeLobbyCmd_S {
        resultCode: number;
        items: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 好彩金币场快速开始按钮
     */
    class QuickStartGameLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class QuickStartGameLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 进入绑定代理商界面 -- 福建新增 这个感觉跟存在自身的parent不是同一个
     */
    class IntoHigherAgentLobbyCmd_C {
        /**
         * 绑定类型 默认为nil 兼容老版本短id  1表示当前请求得是上级代理的真实uid
         */
        bindType: number;
        GetType(): string;
    }
    class IntoHigherAgentLobbyCmd_S {
        /**
         * 查询结果 成功不返回 失败返回错误码
         */
        resultCode: number;
        /**
         * 有则传 无则为nil
         */
        higherAgent: number;
        GetType(): string;
    }
    /**
     * 通过大厅向代理商系统 绑定上级代理(福建新增的一个绑定类型)
     */
    class EnquireBindAgent2LobbyCmd_C {
        higherAgent: number;
        /**
         * 绑定类型 默认为nil 兼容老版本短id  1表示当前输入的上级id为上级玩家uid
         */
        bindType: number;
        GetType(): string;
    }
    class EnquireBindAgent2LobbyCmd_S {
        /**
         * 查询结果 成功不返回 失败返回错误码
         */
        resultCode: number;
        /**
         * 绑定成功后 带回来
         */
        higherAgent: number;
        GetType(): string;
    }
    /**
     * zqb银行相关协议 不共用西安的
     */
    class AccessBankChipsLobbyCmd_C {
        lobbyId: number;
        /**
         * 操作类型 1/2  存、取
         */
        typ: number;
        /**
         * 货币类型 1/2/3 金币、钻石、房卡
         */
        chipsType: number;
        /**
         * 数值
         */
        num: number;
        /**
         * 密码 暂时不需要密码 所以暂无密码修改设定等
         */
        passwd: string;
        GetType(): string;
    }
    class AccessBankChipsLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 修改用户信息(好彩真人有些信息需要特殊处理在这里重新定义下)
     */
    class UserInfoModifyLobbyCmd_C {
        /**
         * 暂时只有昵称特殊处理,后续有其他的再添加
         */
        nickName: string;
        GetType(): string;
    }
    class UserInfoModifyLobbyCmd_S {
        resultCode: number;
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 申请添加好友
     */
    class AddFriendLobbyCmd_C {
        uid: number;
        /**
         * 好友验证信息
         */
        msg: string;
        GetType(): string;
    }
    class AddFriendLobbyCmd_S {
        resultCode: number;
        /**
         * optional UserBaseInfo 	userInfo   = 2; //好友信息
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 删除好友
     */
    class RemoveFriendLobbyCmd_C {
        /**
         * 好友ID
         */
        uid: number;
        GetType(): string;
    }
    class RemoveFriendLobbyCmd_S {
        resultCode: number;
        /**
         * 删除好友ID
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 获取好友列表
     */
    class GetFriendListLobbyCmd_C {
        /**
         * 分页
         */
        index: number;
        GetType(): string;
    }
    class GetFriendListLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示没有数据
         */
        friendList: Cmd.UserBaseInfo[];
        index: number;
        /**
         * 好友数量
         */
        friendNum: number;
        /**
         * 可加好友总量
         */
        totalNum: number;
        GetType(): string;
    }
    /**
     * 好友申请列表
     */
    class GetFriendApplyListLobbyCmd_C {
        /**
         * 分页
         */
        index: number;
        GetType(): string;
    }
    class GetFriendApplyListLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示没有数据
         */
        applyList: Cmd.UserBaseInfo[];
        index: number;
        /**
         * 有验证信息申请
         */
        applyUser: GetFriendApplyListLobbyCmd_S.ApplyUser[];
        GetType(): string;
    }
    module GetFriendApplyListLobbyCmd_S {
        class ApplyUser {
            user: Cmd.UserBaseInfo;
            /**
             * 好友验证信息
             */
            msg: string;
            /**
             * 0: 没有操作过, 1: 同意，2:拒绝
             */
            state: number;
            GetType(): string;
        }
    }
    /**
     * 同意，拒绝好友申请
     */
    class DealFriendApplyListLobbyCmd_C {
        /**
         * 1:同意，2:拒绝，3:全部同意，4:全部拒绝,  5:删除
         */
        type: number;
        uid: number;
        GetType(): string;
    }
    class DealFriendApplyListLobbyCmd_S {
        resultCode: number;
        type: number;
        uid: number;
        GetType(): string;
    }
    /**
     * 查找特定玩家(因为存在机器人的情况所有不能用UserInfoGetLobbyCmd_C UserInfoGetLobbyCmd_S的协议)
     */
    class SearchUserLobbyCmd_C {
        /**
         * 玩家ID
         */
        uid: number;
        /**
         * 1 获取指定好友信息 2 获取好友信息和金币场战绩信息
         */
        type: number;
        GetType(): string;
    }
    class SearchUserLobbyCmd_S {
        resultCode: number;
        /**
         * 为空则表示玩家不存在
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 金币场战绩信息  //本来打算让前端自己去将userinfo带到具体的信息面板，前端不好处理，这里将根据type在重新返回下
         */
        gameRecord: CoinGameRecord[];
        type: number;
        GetType(): string;
    }
    /**
     * 查找好友界面
     */
    class SearchFriendsListLobbyCmd_C {
        /**
         * 刷新次数
         */
        refurbish: number;
        GetType(): string;
    }
    class SearchFriendsListLobbyCmd_S {
        /**
         * 刷新次数
         */
        refurbish: number;
        friendList: Cmd.UserBaseInfo[];
        GetType(): string;
    }
    /**
     * 好友聊天
     */
    class FriendChatLobbyCmd_C {
        chatInfo: Cmd.ChatInfo;
        GetType(): string;
    }
    /**
     * 发送和接收者都用这一条消息推送
     */
    class FriendChatLobbyCmd_S {
        resultCode: number;
        chatInfo: Cmd.ChatInfo;
        GetType(): string;
    }
    /**
     * 好友聊天历史记录
     */
    class FriendChatRecordLobbyCmd_C {
        uid: number;
        GetType(): string;
    }
    class FriendChatRecordLobbyCmd_S {
        resultCode: number;
        uid: number;
        /**
         * 聊天历史记录
         */
        records: Cmd.ChatInfo[];
        GetType(): string;
    }
    /**
     * 消息红点功能
     */
    class RedPoint {
        msgType: Cmd.MsgType;
        msgNum: number;
        clubId: number;
        GetType(): string;
    }
    class ShowRedPointLobbyCmd_S {
        redPoint: RedPoint[];
        GetType(): string;
    }
    /**
     * 移除红点请求
     */
    class RemoveRedPointLobbyCmd_CS {
        redPoint: RedPoint[];
        GetType(): string;
    }
    /**
     * 获取验证码当前认证状态
     */
    class GetIdentifyingCodeStateLobbyCmd_CS {
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    /**
     * 获取验证码
     */
    class GetIdentifyingCodeLobbyCmd_C {
        /**
         * 手机号
         */
        phoneNumber: number;
        /**
         * 1:绑定 2:解除绑定
         */
        opType: number;
        GetType(): string;
    }
    class GetIdentifyingCodeLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 绑定手机
     */
    class BindingMobilePhoneLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        /**
         * 1:绑定 2:解除绑定
         */
        opType: number;
        GetType(): string;
    }
    class BindingMobilePhoneLobbyCmd_S {
        resultCode: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    /**
     * 获取红包信息
     */
    class GetRedPackInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetRedPackInfoLobbyCmd_S {
        /**
         * 红包
         */
        redpackSet: RedPack[];
        /**
         * 剩余次数
         */
        surplus: number;
        /**
         * 1:手机号未绑定 2:未到开奖时间 3:活动已结束 4:次数已用完
         */
        resultCode: number;
        /**
         * 距离下一次领取的剩余时间
         */
        surplustime: number;
        /**
         * 活动时间
         */
        activitytime: string;
        GetType(): string;
    }
    /**
     * 抢红包
     */
    class GrabRedPackLobbyCmd_C {
        /**
         * 幸运词
         */
        luckyword: string;
        GetType(): string;
    }
    class GrabRedPackLobbyCmd_S {
        /**
         * 中奖红包
         */
        redpack: RedPack;
        /**
         * 剩余次数
         */
        surplus: number;
        GetType(): string;
    }
    /**
     * 累计奖励
     */
    class GetMyRedPackRewardLobbyCmd_C {
        GetType(): string;
    }
    class GetMyRedPackRewardLobbyCmd_S {
        uid: number;
        /**
         * 累计现金
         */
        totalMoney: number;
        /**
         * 累计金币
         */
        totalChips: number;
        /**
         * 奖励明细
         */
        recordSet: RedPack[];
        /**
         * 是否已兑换 1:已兑 0:未兑
         */
        recv: number;
        GetType(): string;
    }
    /**
     * 兑换
     */
    class ExchangeRedPackLobbyCmd_C {
        /**
         * 微信
         */
        wechat: string;
        GetType(): string;
    }
    class ExchangeRedPackLobbyCmd_S {
        /**
         * 1:活动未结束 2:没有现金红包 3:已兑换
         */
        resultCode: number;
        GetType(): string;
    }
    class RedPack {
        /**
         * 现金
         */
        money: number;
        /**
         * 金币
         */
        chips: number;
        /**
         * 日期
         */
        date: string;
        GetType(): string;
    }
    /**
     * 获取金币场战绩(由于这个数据量的问题,不放在userBaseInfo里面，需要前端根据需求去自行请求)
     */
    class CoinGameRecord {
        gameId: number;
        /**
         * 胜率
         */
        winPercent: number;
        /**
         * 总局数
         */
        totalRound: number;
        /**
         * 连胜局数
         */
        winStreak: number;
        /**
         * 单局最多赢取金币
         */
        winChips: number;
        /**
         * 单局最大输掉金币
         */
        loseChips: number;
        /**
         * 今日胜场数
         */
        todayWin: number;
        /**
         * 比赛前三名局数
         */
        topThree: number;
        /**
         * 淘汰人数
         */
        eliminateNum: number;
        /**
         * 累积奖金
         */
        drawAll: number;
        /**
         * 闯关局数
         */
        rushRound: number;
        GetType(): string;
    }
    class GetCoinGameRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetCoinGameRecordLobbyCmd_S {
        gameRecord: CoinGameRecord[];
        GetType(): string;
    }
    /**
     * 获取礼品券
     */
    class GetGiftVoucherLobbyCmd_C {
        GetType(): string;
    }
    class GetGiftVoucherLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 礼品券
         */
        giftVoucher: number;
        GetType(): string;
    }
    /**
     * 兑换礼品券记录个人信息
     */
    class ExchangeGiftVoucherRecordUserInfoLobby_C {
        /**
         * 真实姓名
         */
        realName: string;
        /**
         * 手机号码
         */
        phoneNumber: string;
        /**
         * 商品ID //2017.11.15之后的礼品券兑换实物就可以只传商品id
         */
        shopId: number;
        lobbyId: number;
        GetType(): string;
    }
    class ExchangeGiftVoucherRecordUserInfoLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 商品ID //2017.11.15之后的礼品券兑换实物就可以只传商品id
         */
        shopId: number;
        GetType(): string;
    }
    /**
     * 获取兑换记录
     */
    class ExchangeRecord {
        /**
         * 商品Id,对应上面协议ExchangeGiftVoucherRecordUserInfoLobby_C的shopId
         */
        shopId: number;
        /**
         * 礼品券数量
         */
        coupon: number;
        /**
         * 兑换时间
         */
        timestamp: number;
        /**
         * 兑换状态 0:未兑换 1:已兑换
         */
        state: number;
        GetType(): string;
    }
    class GetExchangeRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetExchangeRecordLobbyCmd_S {
        /**
         * 为空则表示没有兑换记录
         */
        record: ExchangeRecord[];
        GetType(): string;
    }
    /**
     * 获取收货地址
     */
    class GetShippingAddressLobby_C {
        GetType(): string;
    }
    class GetShippingAddressLobby_S {
        resultCode: number;
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        GetType(): string;
    }
    /**
     * 填写或修改收货地址
     */
    class ChangeShippingAddressLobby_C {
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        GetType(): string;
    }
    class ChangeShippingAddressLobby_S {
        resultCode: number;
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        GetType(): string;
    }
    /**
     * 请求转盘信息
     */
    class GetInfoTurnTableCmd_C {
        /**
         * 1:请求抽奖方式 2:请求抽奖结果
         */
        opType: number;
        GetType(): string;
    }
    /**
     * 转盘信息回复
     */
    class GetInfoTurnTableCmd_S {
        /**
         * 1:免费抽奖 2:视频抽奖 3:分享抽奖
         */
        type: number;
        /**
         * 转中哪一个
         */
        turnId: number;
        /**
         * 剩余次数
         */
        remainder: number;
        /**
         * 连续登陆天数 如果为0表示已解锁
         */
        continueDay: number;
        /**
         * 第二个转盘转中哪一个
         */
        turnId2: number;
        GetType(): string;
    }
    /**
     * 领取神秘宝箱奖励
     */
    class GetCumulativeRewordTurnTableCmd_C {
        GetType(): string;
    }
    /**
     * 领取神秘宝箱奖励回复
     */
    class GetCumulativeRewordTurnTableCmd_S {
        /**
         * 回复
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 抽中的哪一个
         */
        getId: number;
        /**
         * 获得的奖励
         */
        rewardNum: number;
        GetType(): string;
    }
    /**
     * 好彩大厅VIP系统
     */
    class GetUserVipInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetUserVipInfoLobbyCmd_S {
        resultCode: number;
        /**
         * vip等级
         */
        vipLevel: number;
        /**
         * vip点数
         */
        vipPoint: number;
        /**
         * vip未领取奖励
         */
        vipReward: number[];
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 退出面板
     */
    class QuitGameInfo {
        /**
         * 根据不同的type去取对应的数据
         */
        type: QuitGameInfo.QuitType;
        /**
         * 明日签到获取奖励
         */
        signChips: number;
        /**
         * 幸运翻翻翻剩余局数 和 costDiamond不同时存在
         */
        turnRound: number;
        /**
         * 幸运翻翻翻消耗钻石 和 round不同时存在
         */
        turncostDiamond: number;
        /**
         * 充值6/30 为空的话则表明6&amp;30任务都已经完成
         */
        recharge: number;
        GetType(): string;
    }
    module QuitGameInfo {
        enum QuitType {
            /**
             * 幸运翻翻翻 turnRound/turncostDiamond
             */
            TurnCard = 1,
            /**
             * 每日签到 signChips
             */
            DaySign = 2,
            /**
             * 每日充值 recharge
             */
            Recharge = 3,
        }
    }
    class QuitGameShowLobbyCmd_C {
        GetType(): string;
    }
    class QuitGameShowLobbyCmd_S {
        quitGameInfo: QuitGameInfo[];
        GetType(): string;
    }
    /**
     * 获取累计红包金额
     */
    class GetTotalRedPackMoneyLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 当累计金额发生变化时，服务器会主动推送
     */
    class GetTotalRedPackMoneyLobbyCmd_S {
        totalMoney: number;
        GetType(): string;
    }
    /**
     * 新用户红包界面
     */
    class GetNewUserRedPackShowLobbyCmd_C {
        GetType(): string;
    }
    class GetNewUserRedPackShowLobbyCmd_S {
        resultCode: number;
        /**
         * 待领取红包集合[1,2,3,4,5,6,7]
         */
        waitRecvSet: number[];
        /**
         * 已领取红包集合[1,2,3,4,5,6,7]
         */
        recvSet: number[];
        /**
         * 已过期红包集合[1,2,3,4,5,6,7]
         */
        timeOutSet: number[];
        /**
         * 今天可领取天数
         */
        bToday: number;
        GetType(): string;
    }
    /**
     * 领取新手红包
     */
    class ExchangeNewUserRedPackLobbyCmd_C {
        recvDay: number;
        GetType(): string;
    }
    class ExchangeNewUserRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 用于去更新界面数据
         */
        recvDay: number;
        /**
         * 现金
         */
        cash: number;
        /**
         * 话费券
         */
        coupon: number;
        /**
         * 对应道具（2018.05.14）
         */
        goods: Cmd.Goods;
        GetType(): string;
    }
    /**
     * 话费券兑换红包界面
     */
    class CCRedPack {
        id: number;
        /**
         * 满足条件
         */
        condition: number;
        /**
         * 状态 0:未完成 1:可兑换 2:已兑换
         */
        status: number;
        /**
         * 现金
         */
        cash: number;
        GetType(): string;
    }
    class GetCCRedPackShowLobbyCmd_C {
        GetType(): string;
    }
    class GetCCRedPackShowLobbyCmd_S {
        resultCode: number;
        redPack: CCRedPack[];
        GetType(): string;
    }
    /**
     * 话费券兑换红包
     */
    class ExchangeCCRedPackLobbyCmd_C {
        /**
         * 兑换的id
         */
        id: number;
        GetType(): string;
    }
    class ExchangeCCRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 刷新各个红包状态
         */
        redPack: CCRedPack[];
        GetType(): string;
    }
    /**
     * 返利红包(领取话费券)
     */
    class RechargeRedPack {
        id: number;
        /**
         * 状态 0:未完成 1:可领取 2:已领取
         */
        status: number;
        /**
         * 满足条件
         */
        condition: number;
        /**
         * 话费券
         */
        coupon: number;
        /**
         * 对应道具（2018.05.14）
         */
        goods: Cmd.Goods;
        GetType(): string;
    }
    /**
     * 返利红包界面
     */
    class GetRechargeRedPackShowLobbyCmd_C {
        GetType(): string;
    }
    class GetRechargeRedPackShowLobbyCmd_S {
        resultCode: number;
        redPack: RechargeRedPack[];
        GetType(): string;
    }
    /**
     * 兑换返利红包
     */
    class ExchangeRechargeRedPackLobbyCmd_C {
        id: number;
        GetType(): string;
    }
    class ExchangeRechargeRedPackLobbyCmd_S {
        resultCode: number;
        /**
         * 刷新界面
         */
        redPack: RechargeRedPack[];
        GetType(): string;
    }
    /**
     * 暴击红包界面
     */
    class GetCriticalStrikeLobbyCmd_C {
        GetType(): string;
    }
    class CCInfo {
        /**
         * 获取时间
         */
        time: number;
        /**
         * 红包金额
         */
        value: number;
        /**
         * 游戏id 客户端根据id去显示游戏名称(服务器同服所以游戏名称无法确定)
         */
        gameId: number;
        GetType(): string;
    }
    class GetCriticalStrikeLobbyCmd_S {
        /**
         * 客户端要进行判空操作，如果不回复这个值就认为没有数据
         */
        info: CCInfo[];
        GetType(): string;
    }
    /**
     * 红包提现
     */
    class RedPackInfo {
        /**
         * 文字描述
         */
        stringType: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 具体金额
         */
        reward: number;
        money: number;
        /**
         * 好彩红包获取方式  1新手红包 2话费券兑换
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 玩家获得红包明细
     */
    class GetUserGetRedPackInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetUserGetRedPackInfoLobbyCmd_S {
        redPackInfo: RedPackInfo[];
        GetType(): string;
    }
    /**
     * 提现记录
     */
    class DrawCash {
        money: number;
        timestamp: number;
        /**
         * 1:已兑换
         */
        status: number;
        GetType(): string;
    }
    class GetDrawCashRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetDrawCashRecordLobbyCmd_S {
        resultCode: number;
        records: DrawCash[];
        GetType(): string;
    }
    /**
     * 红包提现
     */
    class RedPackDrawCashLobbyCmd_C {
        GetType(): string;
    }
    class RedPackDrawCashLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     *  好彩游戏抢红包活动
     *  发红包广播
     */
    class GameRedPackInfo {
        /**
         * 红包id
         */
        rid: string;
        /**
         * 发包人uid
         */
        uid: number;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 红包数量
         */
        totalCount: number;
        /**
         * 已领取数量
         */
        recvCount: number;
        /**
         * 发送时间
         */
        sendTime: number;
        GetType(): string;
    }
    class SendHaoCaiGameRedPackLobbyCmd_Brd {
        redPackInfo: GameRedPackInfo;
        GetType(): string;
    }
    /**
     * 领红包
     */
    class RecvGameRedPackLobbyCmd_C {
        rid: string;
        GetType(): string;
    }
    class RecvRedPackInfo {
        /**
         * 红包金额
         */
        value: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 是否手气最佳 1是
         */
        luck: number;
        /**
         * 领取时间
         */
        recvTime: number;
        GetType(): string;
    }
    class RecvGameRedPackLobbyCmd_S {
        resultCode: number;
        redPackInfo: GameRedPackInfo;
        /**
         * 个人领取
         */
        personal: RecvRedPackInfo;
        /**
         * 领取列表
         */
        recvList: RecvRedPackInfo[];
        GetType(): string;
    }
    /**
     * 获取拥有的所有时效性道具
     */
    class GetTimeGoodsLobbyCmd_C {
        /**
         * 0获取所有 1头像框 2月卡周卡...
         */
        timeType: number;
        /**
         * 获取指定uid拥有的时效性道具,不传默认为自己
         */
        uid: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetTimeGoodsLobbyCmd_S {
        resultCode: number;
        timeType: number;
        /**
         * 玩家拥有的时效性道具
         */
        timeGoods: Cmd.TimeGoods[];
        /**
         * type为0/2存在 玩家累计待领取的时效性金币数量(周卡/月卡...)
         */
        timeChips: number;
        /**
         * 获取指定uid拥有的时效性道具,不传默认为自己
         */
        uid: number;
        headUrl: number;
        vip: number;
        GetType(): string;
    }
    /**
     * 领取累计待领取的时效性金币
     */
    class RevTimeChipsLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class RevTimeChipsLobbyCmd_S {
        resultCode: number;
        /**
         * chips为空则表示没有领取到金币
         */
        chips: number;
        /**
         * 如果道具数量跟有效时间发生变化则推送下面三条数据
         */
        timeType: number;
        /**
         * 玩家拥有的时效性道具
         */
        timeGoods: Cmd.TimeGoods[];
        timeChips: number;
        GetType(): string;
    }
    /**
     * 购买头像框，周卡/月卡等时效性道具(用钻石购买，不支持其他支付方式)
     */
    class BuyTimeGoodsLobbyCmd_C {
        timeType: number;
        /**
         * 2018.03.15 弃用
         */
        goodsId: number;
        goodsNbr: number;
        lobbyId: number;
        /**
         * 2018.03.15 购买全部用shopId,上面的goodsId弃用(字段暂时不删除)
         */
        shopId: number;
        GetType(): string;
    }
    class BuyTimeGoodsLobbyCmd_S {
        resultCode: number;
        timeType: number;
        /**
         * 玩家拥有的时效性道具
         */
        timeGoods: Cmd.TimeGoods[];
        /**
         * 玩家累计待领取的时效性金币数量(周卡/月卡...)
         */
        timeChips: number;
        GetType(): string;
    }
    /**
     * 个人形象道具的使用
     */
    class ChangePersonalImageLobbyCmd_C {
        personalImage: Cmd.PersonalImage;
        GetType(): string;
    }
    class ChangePersonalImageLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取弹窗公告
     */
    class GetPopupBroadListLobbyCmd_C {
        GetType(): string;
    }
    class PopupList {
        id: number;
        /**
         * 标题
         */
        title: string;
        /**
         * 内容
         */
        content: string;
        /**
         * 0未读 1已读
         */
        status: number;
        endTime: number;
        /**
         * 扩展参数
         */
        extparam: string;
        GetType(): string;
    }
    module PopupList {
        class Extparamdesc {
            /**
             * （跑马灯 9，活动公告 11，普通公告 6，维护公告 3）
             */
            btype: number;
            /**
             * （立即发布生效 0，单次立即生效 1，每次登陆生效 2，首次登陆生效 3 ，每次加载生效 4）
             */
            bactime: number;
            /**
             * （所有游戏 0，保单类游戏 1，非保单类游戏 2，大厅 3，指定游戏 gameid）
             */
            blocation: number;
            /**
             * （可以关闭 0，不可关闭 1）
             */
            bcanclose: number;
            /**
             * （gm 0，玩家 1, 机器人 2）
             */
            bpublisher: number;
            GetType(): string;
        }
    }
    class GetPopupBroadListLobbyCmd_S {
        popupList: PopupList[];
        GetType(): string;
    }
    /**
     * 已读弹窗公告(如果公告的状态status为0未读状态才去调用这条消息)
     */
    class ReadPopBroadLobbyCmd_C {
        id: number;
        GetType(): string;
    }
    class ReadPopBroadLobbyCmd_S {
        resultCode: number;
        id: number;
        GetType(): string;
    }
    /**
     *  好彩捕鱼电玩城vip话费券活动
     *  显示界面
     */
    class GetVipCouponShowLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetVipCouponShowLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余领取次数 等于0则表示不能领取
         */
        recvNum: number;
        GetType(): string;
    }
    /**
     * 获取话费券
     */
    class GetVipCouponRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetVipCouponRewardLobbyCmd_S {
        resultCode: number;
        /**
         * 获取到的话费券数量
         */
        coupon: number;
        /**
         * 剩余领取次数 等于0则表示不能领取
         */
        recvNum: number;
        GetType(): string;
    }
    /**
     * 百宝箱奖励
     */
    class TreasureBoxLottery {
        /**
         * 奖励类型 0普通道具(金币、钻石、话费券等) 1红包现金奖励
         */
        lType: number;
        /**
         * 普通道具使用 商品id
         */
        goodsId: number;
        /**
         * 普通道具使用 商品数量
         */
        goodsNum: number;
        /**
         * 红包现金使用 现金金额
         */
        rmb: number;
        GetType(): string;
    }
    /**
     * 百宝箱每日任务
     */
    class TreasureBoxTask {
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 对应的子游戏id
         */
        gameId: number;
        /**
         * 任务描述
         */
        taskDesc: string;
        /**
         * 任务状态 0进行中 1待领取 2已领取
         */
        taskStatus: number;
        /**
         * 当前进度
         */
        current: number;
        /**
         * 总进度
         */
        total: number;
        /**
         * 任务奖励
         */
        lottery: TreasureBoxLottery;
        GetType(): string;
    }
    /**
     * 获取百宝箱界面数据
     */
    class GetTreasureBoxShowInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTreasureBoxShowInfoLobbyCmd_S {
        resultCode: number;
        task: TreasureBoxTask[];
        /**
         * 完成任务的累计天数
         */
        taskDays: number;
        /**
         * 剩余抽奖次数
         */
        lotteryNum: number;
        /**
         * 滚动跑马灯
         */
        msg: string[];
        GetType(): string;
    }
    /**
     * 领取百宝箱任务奖励
     */
    class GetTreasureBoxTaskLotteryLobbyCmd_C {
        taskId: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetTreasureBoxTaskLotteryLobbyCmd_S {
        resultCode: number;
        /**
         * 这里只回复请求领取的对应taskId的任务用于刷新(物品奖励也在这个里面)，其他任务不回复
         */
        task: TreasureBoxTask;
        /**
         * 刷新下完成任务的累计天数
         */
        taskDays: number;
        /**
         * 刷新下剩余抽奖次数
         */
        lotteryNum: number;
        GetType(): string;
    }
    /**
     * 百宝箱转动抽奖
     */
    class TurnTreasureBoxLotteryLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class TurnTreasureBoxLotteryLobbyCmd_S {
        resultCode: number;
        lottery: TreasureBoxLottery;
        /**
         * 刷新下剩余抽奖次数
         */
        lotteryNum: number;
        /**
         * 滚动跑马灯
         */
        msg: string;
        GetType(): string;
    }
    /**
     *  在线奖励
     *  获取在线奖励状态和倒计时时间
     */
    class GetOnlineTimeStatusLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetOnlineTimeStatusLobbyCmd_S {
        resultCode: number;
        /**
         * 0倒计时中 1待领取 2当天奖励已结束
         */
        status: number;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 领取在线奖励
     */
    class GetOnlineTimeRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetOnlineTimeRewardLobbyCmd_S {
        resultCode: number;
        reward: Cmd.Goods[];
        /**
         * 0倒计时中 1待领取 2当天奖励已结束
         */
        status: number;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 获取当前大厅在线总人数（包括机器人）
     */
    class GetOnlineUserNumLobbyCmd_C {
        GetType(): string;
    }
    class GameUsers {
        gameId: number;
        userNum: number;
        GetType(): string;
    }
    class GetOnlineUserNumLobbyCmd_S {
        /**
         * 总人数
         */
        onlineNum: number;
        /**
         * 各个游戏人数(客户端根据界面上的游戏去对应添加，如果没有传对应游戏的人数则客户端默认为0)
         */
        gameUsers: GameUsers[];
        GetType(): string;
    }
    /**
     *  明日礼包
     *  界面显示
     */
    class GetTomorrowGiftBagShowLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTomorrowGiftBagShowLobbyCmd_S {
        resultCode: number;
        /**
         * 状态 1今天可领取 2明天可领取
         */
        status: number;
        /**
         * 可领取金币的后三位
         */
        tail: string;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 礼包领取
     */
    class GetTomorrowGiftBagRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetTomorrowGiftBagRewardLobbyCmd_S {
        resultCode: number;
        chips: number;
        /**
         * 用于领取成功后刷新页面
         */
        status: number;
        tail: string;
        /**
         * 倒计时剩余时间
         */
        remainderTime: number;
        GetType(): string;
    }
    /**
     * 世界聊天
     */
    class WorldChatBySuonaLobbyCmd_C {
        content: string;
        GetType(): string;
    }
    class WorldChatBySuonaLobbyCmd_S {
        resultCode: number;
        /**
         * 聊天框提示语
         */
        markWords: string;
        GetType(): string;
    }
    class WorldChat {
        /**
         * 0系统公告 1玩家世界聊天 2只在百人场显示 3只在麻将等匹配场 4只在大厅显示(2/3/4表示XX玩家在哪赢了多少金币之类的荣耀信息或者单独的公告信息)
         */
        chatTyp: number;
        /**
         * 内容
         */
        content: string;
        /**
         * 用户基本信息(1的时候会存在里面用到的只有vip和nickname)
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 时间戳
         */
        time: number;
        GetType(): string;
    }
    class WorldChatBySuonaLobbyCmd_Brd {
        chat: WorldChat;
        GetType(): string;
    }
    /**
     * 获取世界聊天记录
     */
    class GetWorldChatRecordLobbyCmd_C {
        GetType(): string;
    }
    class GetWorldChatRecordLobbyCmd_S {
        chat: WorldChat[];
        /**
         * 聊天框提示语
         */
        markWords: string;
        GetType(): string;
    }
    /**
     * 代理商发送喇叭
     */
    class AgentSendSuonaLobbyCmd_C {
        /**
         * 喇叭消息
         */
        msg: string;
        GetType(): string;
    }
    class AgentSendSuonaLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 邮件附件
     */
    class Attachment {
        /**
         * 附件商品id
         */
        itemid: number;
        /**
         * 对应的商品数量
         */
        itemnum: number;
        GetType(): string;
    }
    class MailInfo {
        /**
         * 该邮件id 期望是 每一个邮件会有一个唯一id
         */
        id: number;
        /**
         * 标题
         */
        subject: string;
        /**
         * 内容
         */
        content: string;
        /**
         * 钻石数
         */
        diamond: number;
        /**
         * 状态
         */
        state: MailInfo.State;
        /**
         * 时间戳
         */
        stamp: number;
        /**
         * 附件商品
         */
        attachment: Attachment[];
        /**
         * 发送者
         */
        sendName: string;
        /**
         * 兑奖码
         */
        cdkey: string;
        /**
         * 邮寄地址,兑奖码用
         */
        addr: Cmd.DeliverAddr;
        /**
         * 金币数
         */
        chips: number;
        /**
         * 内容概要
         */
        outline: string;
        /**
         * 标题id
         */
        subjectId: number;
        /**
         * 内容id
         */
        contentId: number;
        titleId: number;
        GetType(): string;
    }
    module MailInfo {
        enum State {
            /**
             * 未读
             */
            UnRead = 1,
            /**
             * 已读,但还有未领取的东西
             */
            ReadHasItem = 2,
            /**
             * 已读,且没有需要领取的东西
             */
            ReadOver = 3,
        }
    }
    /**
     * 存在新邮件广播
     */
    class NewMailCmd_Brd {
        mail: MailInfo;
        GetType(): string;
    }
    /**
     *  C-&gt;S 获取邮件列表请求
     *  S-&gt;C 邮件列表更新
     */
    class GetListMailCmd_CS {
        /**
         * 具体邮件
         */
        mailList: MailInfo[];
        /**
         * uid查看某人邮件,飞车用
         */
        uid: number;
        /**
         * matchId,匹配号id,飞车用
         */
        matchId: number;
        /**
         * roomId,查看某人某房间邮件,飞车用
         */
        roomId: number;
        /**
         * 昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     *  C-&gt;S 查看指定邮件请求
     *  S-&gt;C 查看完成指定邮件通知
     */
    class ReadMailCmd_CS {
        /**
         * 查看指定邮件
         */
        ids: number[];
        /**
         * uid查看某人邮件,飞车用
         */
        uid: number;
        /**
         * matchId,匹配号id,飞车用
         */
        matchId: number;
        /**
         * roomId,查看某人某房间邮件,飞车用
         */
        roomId: number;
        /**
         * 昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     *  C-&gt;S 获取邮件的东西请求
     *  S-&gt;C 已获取邮件东西通知
     */
    class GetItemMailCmd_CS {
        ids: number[];
        /**
         * 获取后得到的钻石数
         */
        diamond: number;
        GetType(): string;
    }
    /**
     *  C-&gt;S 删除指定邮件请求
     *  S-&gt;C 删除指定邮件通知
     */
    class DeleteMailCmd_CS {
        /**
         * 删除指定邮件
         */
        ids: number[];
        GetType(): string;
    }
    /**
     * 获取邮件列表
     */
    class GetListMailCmd_C {
        /**
         * 分页
         */
        index: number;
        /**
         * 请求类型，1：初始化请求，2：刷新请求.默认为1
         */
        type: number;
        /**
         * 邮件类型，0：系统 1：好友 不传值或者其他的默认为全部(2018.09.04小程序添加使用)
         */
        mailtype: number;
        GetType(): string;
    }
    /**
     * 获取邮件列表
     */
    class GetListMailCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 具体邮件：为空则表示没有邮件了，前端也不需要继续分页滑动
         */
        mailInfo: MailInfo[];
        /**
         * 分页
         */
        index: number;
        /**
         * 原样返回
         */
        type: number;
        /**
         * 邮件类型，0：系统 1：好友 不传值或者其他的默认为全部(2018.09.04小程序添加使用)
         */
        mailtype: number;
        GetType(): string;
    }
    /**
     * 查看指定邮件
     */
    class ReadMailCmd_C {
        /**
         * 查看指定邮件
         */
        id: number;
        GetType(): string;
    }
    /**
     * 查看指定邮件
     */
    class ReadMailCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 具体邮件,前端刷新
         */
        mailInfo: MailInfo;
        GetType(): string;
    }
    /**
     * 删除指定邮件
     */
    class DeleteMailCmd_C {
        /**
         * 删除指定邮件
         */
        ids: number[];
        GetType(): string;
    }
    /**
     * 删除指定邮件
     */
    class DeleteMailCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 将删除指定邮件的id返回
         */
        ids: number[];
        GetType(): string;
    }
    /**
     * 领取指定邮件内的奖励
     */
    class GetMailRewardCmd_C {
        /**
         * 邮件id
         */
        id: number;
        GetType(): string;
    }
    class GetMailRewardCmd_S {
        resultCode: number;
        /**
         * 具体邮件,前端刷新
         */
        mailInfo: MailInfo;
        GetType(): string;
    }
    /**
     * 邮件批量操作
     */
    class BulkOperationMailCmd_C {
        /**
         * 1 全部处理  2 全部删除
         */
        opType: number;
        /**
         * 待处理的邮件id列表
         */
        ids: number[];
        GetType(): string;
    }
    class BulkOperationMailCmd_S {
        resultCode: number;
        opType: number;
        /**
         * 附件商品
         */
        attachment: Attachment[];
        GetType(): string;
    }
    /**
     * 用户反馈功能
     */
    class UserFeedBackLobbyCmd_C {
        /**
         * 反馈内容
         */
        feedback: string;
        /**
         * 图片url集合
         */
        feedbackUrl: string[];
        /**
         * 联系方式
         */
        contactInfo: string;
        lobbyId: number;
        GetType(): string;
    }
    class UserFeedBackLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 修改鱼币
     */
    class UserFishcoinsChangeLobbyCmd_C {
        uid: number;
        /**
         * 变化量
         */
        change: number;
        GetType(): string;
    }
    /**
     * ClientErrorLogToServer
     */
    class ClientErrorLogToServerLobbyCmd_C {
        /**
         * uid
         */
        gameid: number;
        /**
         * uid
         */
        zoneid: number;
        /**
         * 图片url集合
         */
        log: string;
        GetType(): string;
    }
    /**
     * 申请提现
     */
    class CashWithdrawalLobbyCmd_C {
        /**
         * 取现数额
         */
        num: number;
        GetType(): string;
    }
    /**
     * 提现回复
     */
    class CashWithdrawalLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 查看提现记录
     */
    class GetCashWithdrawalRecordLobbyCmd_C {
        GetType(): string;
    }
    class CashWithdrawalRecord {
        time: number;
        num: number;
        /**
         * 提现结果 0/1/2 处理中、成功、失败
         */
        status: number;
        GetType(): string;
    }
    /**
     * 提现记录回复
     */
    class GetCashWithdrawalRecordLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 记录
         */
        records: CashWithdrawalRecord[];
        GetType(): string;
    }
    /**
     * 顺序弹窗
     */
    class SequentialPopupsLobbyCmd_S {
        /**
         * 1红包乐翻天 2签到面板 3首充 4新手红包 5多弹窗公告
         */
        popId: number[];
        GetType(): string;
    }
    /**
     * 运营活动 摇一摇
     * 摇一摇结果数据
     */
    class ShakeShopInfo {
        /**
         * 摇一摇对应的结果id
         */
        shakeId: number;
        /**
         * 倒计时时间
         */
        remainderTime: number;
        /**
         * 获得的金币总额
         */
        totalChips: number;
        GetType(): string;
    }
    /**
     * 打开摇一摇界面
     */
    class GetShakeBaseInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetShakeBaseInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 1:可以免费摇 2:需要消耗金币摇 3:摇过后选择购买界面 4:不可以摇一摇
         */
        type: number;
        /**
         * 剩余免费次数
         */
        freeCount: number;
        /**
         * 免费次数用完后需要消耗的金币数量
         */
        costChips: number;
        shake: ShakeShopInfo;
        GetType(): string;
    }
    /**
     * 放弃摇一摇机会(再来一次)
     */
    class AbandonShakeLobbyCmd_C {
        GetType(): string;
    }
    class AbandonShakeLobbyCmd_S {
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取摇一摇结果
     */
    class GetShakeResultLobbyCmd_C {
        GetType(): string;
    }
    class GetShakeResultLobbyCmd_S {
        resultCode: number;
        shake: ShakeShopInfo;
        GetType(): string;
    }
    /**
     * 运营活动 瑞狗迎春
     * 打开瑞狗迎春界面
     */
    class GetAuspiciousDogInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetAuspiciousDogInfoLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 开始时间
         */
        beginTime: number;
        /**
         * 结束时间
         */
        endTime: number;
        /**
         * 待提现金额
         */
        getNum: number;
        /**
         * 当前游戏局数
         */
        curGameNbr: number;
        /**
         * 已抽奖次数
         */
        lotteryTime: number;
        /**
         * 1表示已经领取过了(前三个任务的状态)
         */
        taskState: number[];
        /**
         * 幸运玩家记录
         */
        luckRecords: AuspiciousDogRecord[];
        /**
         * 当前场景id
         */
        scene: number;
        GetType(): string;
    }
    class AuspiciousDogRecord {
        /**
         * 时间
         */
        time: number;
        /**
         * 昵称
         */
        nickName: number;
        /**
         * 物品ID(如果为0表示为元吧)
         */
        goodId: number;
        /**
         * 物品数量
         */
        goodNbr: number;
        /**
         * 模板id
         */
        template: number;
        GetType(): string;
    }
    /**
     * 获取瑞狗迎春奖励记录(只保留最新20条数据)
     */
    class GetAuspiciousDogRecordsLobbyCmd_C {
        GetType(): string;
    }
    class GetAuspiciousDogRecordsLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 活动获奖记录
         */
        records: AuspiciousDogRecord[];
        /**
         * 提现记录
         */
        withdrawalRecords: openRecord[];
        GetType(): string;
    }
    /**
     * 领取奖励
     */
    class GetAuspiciousDogRewardsLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 任务id
         */
        taskId: number;
        GetType(): string;
    }
    class GetAuspiciousDogRewardsLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 任务id
         */
        taskId: number;
        /**
         * 奖励数据
         */
        rewards: AuspiciousDogRecord[];
        GetType(): string;
    }
    /**
     * 三张大厅游客绑定账户, 获取验证码
     */
    class GetGuestBindAccountIdentifyCodeLobbyCmd_C {
        /**
         * 手机号码
         */
        phoneNumber: number;
        /**
         * 修改手机号
         */
        modifyPhone: boolean;
        /**
         * 重置密码
         */
        resetPasswd: boolean;
        GetType(): string;
    }
    class GetGuestBindAccountIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 三张大厅游客绑定账户
     */
    class GuestBindAccountLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        GetType(): string;
    }
    /**
     * 绑定手机操作返回
     */
    class GuestBindAccountLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 操作类型
         */
        opType: number;
        /**
         * 电话号
         */
        mobile: number;
        GetType(): string;
    }
    /**
     * 三张大厅校验手机验证码
     */
    class VerifyPhoneCodeLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class VerifyPhoneCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅游客修改账户手机号
     */
    class GuestModifyAccountPhoneLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class GuestModifyAccountPhoneLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅游客重置账户密码
     */
    class GuestResetAccountPasswdLobbyCmd_C {
        /**
         * 验证码
         */
        code: number;
        /**
         * 密码
         */
        password: string;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    class GuestResetAccountPasswdLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 玩家修改昵称, 成就任务
     */
    class ChangeUserNickName_C {
        /**
         * 玩家昵称
         */
        nickName: string;
        GetType(): string;
    }
    /**
     * 修改昵称返回
     */
    class ChangeUserNickName_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 错误描述
         */
        desc: string;
        /**
         * 用户信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 玩家上传图像，成就任务
     */
    class ChangeUserHeadUrl_C {
        /**
         * 玩家图像
         */
        headUrl: string;
        GetType(): string;
    }
    /**
     * 上传图像返回
     */
    class ChangeUserHeadUrl_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 错误描述
         */
        desc: string;
        /**
         * 用户信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 修改签名
     */
    class ChangeUserSignature_C {
        /**
         * 签名
         */
        signature: string;
        GetType(): string;
    }
    class ChangeUserSignature_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 用户信息
         */
        userInfo: Cmd.UserBaseInfo;
        GetType(): string;
    }
    /**
     * 赠送金币时查找玩家昵称
     */
    class GetUserNickNameLobby_C {
        /**
         * 玩家ID
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 查找昵称回复
     */
    class GetUserNickNameLobby_S {
        /**
         * 昵称
         */
        nickName: string;
        resultCode: number;
        desc: string;
        /**
         * 是否在白名单中
         */
        isInWhiteList: boolean;
        GetType(): string;
    }
    /**
     * 赠送金币
     */
    class ExchangeCoinLobby_C {
        /**
         * 赠送给其他玩家ID
         */
        toUid: number;
        /**
         * 赠送金币数量
         */
        coin: number;
        /**
         * 货币类型 1/2 钻石、金币 如果为nil 默认为2金币 兼容老代码
         */
        coinType: number;
        /**
         * 1:请求检查 2: 请求确认
         */
        type: number;
        id: number;
        GetType(): string;
    }
    /**
     * 赠送金币回复
     */
    class ExchangeCoinLobby_S {
        /**
         * 错误码
         */
        resultCode: number;
        /**
         * 描述 ==
         */
        desc: string;
        /**
         * 检测时 返回玩家信息
         */
        userInfo: Cmd.UserBaseInfo;
        /**
         * 赠送金币数量
         */
        coin: number;
        /**
         * 货币类型
         */
        coinType: number;
        /**
         * 1:请求检查 2: 请求确认
         */
        type: number;
        GetType(): string;
    }
    /**
     * 获取赠送金币记录
     */
    class GetExchangeCoinRecordLobby_C {
        /**
         * 货币类型 1/2 钻石、金币 如果为nil 默认为2金币 兼容老代码
         */
        coinType: number;
        /**
         * 请求页数
         */
        curPage: number;
        GetType(): string;
    }
    /**
     * 赠送记录
     */
    class ExchangeCoinRecord {
        /**
         * ID
         */
        uid: number;
        /**
         * 赠送金币数量
         */
        coin: number;
        /**
         * 赠送时间戳
         */
        timestamp: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 1:给被人赠送 2:别人给自己赠送 ==
         */
        type: number;
        GetType(): string;
    }
    /**
     * 获取赠送金币记录返回
     */
    class GetExchangeCoinRecordLobby_S {
        /**
         * 赠送记录
         */
        record: ExchangeCoinRecord[];
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述 ==
         */
        desc: number;
        /**
         * 请求页数
         */
        curPage: number;
        GetType(): string;
    }
    /**
     * 获取摇钱树
     */
    class GetMoneyTreeDataLobby_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 获取摇钱树返回
     */
    class GetMoneyTreeDataLobby_S {
        resultCode: number;
        /**
         * 摇钱树的等级
         */
        level: number;
        /**
         * 生成金币数量
         */
        produce: number;
        /**
         * 是否可领取
         */
        receive: number;
        GetType(): string;
    }
    /**
     * 领取摇钱树生成的金币
     */
    class GetMoneyTreeGoldLobby_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 领取摇钱树金币返回
     */
    class GetMoneyTreeGoldLobby_S {
        /**
         * 返回
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 获取公告
     */
    class GetBroadcastInfoLobby_C {
        GetType(): string;
    }
    class BroadCastInfo {
        /**
         * 公告ID
         */
        taskId: number;
        /**
         * 公告标题
         */
        title: string;
        /**
         * 公告内容
         */
        content: string;
        /**
         * 公告简介
         */
        desc: string;
        /**
         * 公告状态
         */
        state: BroadCastInfo.State;
        GetType(): string;
    }
    module BroadCastInfo {
        enum State {
            /**
             * 已读
             */
            Read = 1,
            /**
             * 未读
             */
            UnRead = 2,
        }
    }
    /**
     * 获取公告返回
     */
    class GetBroadCastInfoLobby_S {
        /**
         * 公告信息
         */
        broad: BroadCastInfo[];
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 读取公告
     */
    class ReadBroadCastLobby_C {
        /**
         * 公告ID
         */
        taskId: number;
        GetType(): string;
    }
    /**
     * 读取公告返回
     */
    class ReadBroadCastLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 公告内容
         */
        content: string;
        /**
         * 公告标题
         */
        title: string;
        GetType(): string;
    }
    /**
     * 大厅获取时时彩状态
     */
    class GetEveryColorStatusLobby_C {
        GetType(): string;
    }
    /**
     * 大厅获取时时彩状态返回
     */
    class GetEveryColorStatusLobby_S {
        /**
         * 状态 1:下注 2:结算
         */
        status: number;
        /**
         * 剩余时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 玩家下注
     */
    class UserBetChipsLobby_C {
        /**
         * 下注id(1,2~8，从单到双...到豹子,1为单数，2位双数...)
         */
        betId: number;
        /**
         * 下注量
         */
        chips: number;
        GetType(): string;
    }
    /**
     * 玩家下注返回
     */
    class UserBetChipsLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 所有下注信息
         */
        allBetInfo: number[];
        /**
         * 自己下注信息
         */
        ownBetInfo: number[];
        GetType(): string;
    }
    /**
     * 玩家自动跟注
     */
    class UserAutoFollowLobby_C {
        /**
         * 是否跟注
         */
        follow: boolean;
        /**
         * 跟注次数
         */
        number: number;
        GetType(): string;
    }
    /**
     * 玩家自动跟注返回
     */
    class UserAutoFollowLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 返回跟注次数
         */
        number: number;
        GetType(): string;
    }
    /**
     * 玩家是否可以自动跟注
     */
    class UserCanAutoFollowLobby_S {
        /**
         * 是否跟注
         */
        follow: boolean;
        GetType(): string;
    }
    /**
     * 通知玩家赢金币
     */
    class NoticeUserWinChipsLobby_S {
        /**
         * 玩家赢金币
         */
        winChips: number;
        GetType(): string;
    }
    /**
     * 大厅获取时时彩信息
     */
    class GetEveryColorInfoLobby_C {
        GetType(): string;
    }
    /**
     * 简易玩家信息
     */
    class ShortUserInfo {
        /**
         * 玩家Id
         */
        uid: number;
        /**
         * 玩家昵称
         */
        nickName: string;
        /**
         * 玩家图像
         */
        headUrl: string;
        /**
         * 玩家vip等级
         */
        vip: number;
        /**
         * 玩家赢取金币
         */
        winChips: number;
        GetType(): string;
    }
    /**
     * 大厅获取时时彩信息返回
     */
    class GetEveryColorInfoLobby_S {
        /**
         * 奖池总额
         */
        pond: number;
        /**
         * 剩余时间
         */
        remainderTime: number;
        /**
         * 当前状态
         */
        status: number;
        /**
         * 上轮豹子时间
         */
        leopardTime: number;
        /**
         * 所有人下注信息
         */
        allBetInfo: number[];
        /**
         * 玩家自己下注信息
         */
        ownBetInfo: number[];
        /**
         * 牌型走势图
         */
        cardTypeTrend: number[];
        /**
         * 单双走势图
         */
        singleDoubleTrend: number[];
        /**
         * 结算开牌
         */
        openOutCard: number[];
        /**
         * 牌型
         */
        openCardType: number;
        /**
         * 单双
         */
        singleDoubleType: number;
        /**
         * 自动跟注
         */
        autoFollow: boolean;
        /**
         * 剩余跟注次数
         */
        remainder: number;
        /**
         * 上轮大赢家
         */
        winner: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 大奖记录
     */
    class GetBigRewardRecordLobby_C {
        GetType(): string;
    }
    /**
     * 记录信息
     */
    class RecordInfo {
        /**
         * 记录时间
         */
        timestamp: number;
        /**
         * 玩家信息
         */
        userInfo: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 大奖记录返回
     */
    class GetBigRewardRecordLobby_S {
        /**
         * 大奖记录
         */
        record: RecordInfo[];
        GetType(): string;
    }
    /**
     * 排行榜
     */
    class GetEveryColorRankInfoLobby_C {
        GetType(): string;
    }
    /**
     * 玩家排行信息
     */
    class SscRankInfo {
        /**
         * 排行
         */
        rank: number;
        /**
         * 玩家信息
         */
        userInfo: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 玩家排行信息返回
     */
    class GetEveryColorRankInfoLobby_S {
        /**
         * 所有排行
         */
        allRankInfo: SscRankInfo[];
        /**
         * 我的排行
         */
        myRankInfo: SscRankInfo[];
        /**
         * 昨日所有排行
         */
        yesterdayRankInfo: SscRankInfo[];
        /**
         * 昨日我的排行
         */
        yesterdayMyRankInfo: SscRankInfo[];
        GetType(): string;
    }
    /**
     * 时时彩下注量广播
     */
    class EveryColorBetChipsLobby_Brd {
        /**
         * 所有下注信息
         */
        allBetInfo: number[];
        GetType(): string;
    }
    /**
     * 时时彩下注状态广播
     */
    class EveryColorBetStatusLobby_Brd {
        /**
         * 状态 1 下注 2 结算
         */
        status: number;
        /**
         * 每个状态所需时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 时时彩结算状态广播
     */
    class EveryColorLotteryStatusLobby_Brd {
        /**
         * 状态 1 下注 2 结算
         */
        status: number;
        /**
         * 每个状态所需时间
         */
        time: number;
        /**
         * 牌型
         */
        openCardType: number;
        /**
         * 单双
         */
        singleDoubleType: number;
        /**
         * 结算时发牌
         */
        openOutCard: number[];
        /**
         * 奖池金额
         */
        pond: number;
        /**
         * 上轮豹子时间
         */
        leopardTime: number;
        /**
         * 上轮大赢家
         */
        winner: ShortUserInfo;
        GetType(): string;
    }
    /**
     * 时时彩玩家打开面板或者关闭面板
     */
    class EveryColorPanelStatusLobby_C {
        /**
         * 状态 1 打开 2 关闭
         */
        status: number;
        GetType(): string;
    }
    class EveryColorPanelStatusLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 登陆天数信息
     */
    class ContinueDay {
        /**
         * 登陆天数
         */
        day: number;
        /**
         * 状态 1 未领取 2 已领取 3 已失效
         */
        status: number;
        /**
         * 奖励金币
         */
        coin: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 玩家连续登陆信息
     */
    class ContinueLoginDaysInfoLobby_S {
        /**
         * 登陆天数信息
         */
        continue: ContinueDay[];
        GetType(): string;
    }
    /**
     * 领取连续登陆天数奖励
     */
    class GetContinueLoginDaysRewardLobby_C {
        GetType(): string;
    }
    /**
     * 领取连续登陆奖励返回
     */
    class GetContinueLoginDaysRewardLobby_S {
        /**
         * 奖励
         */
        reward: ContinueDay;
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 取消领取登陆奖励
     */
    class CancelGetContinueDayRewardLobby_C {
        GetType(): string;
    }
    /**
     * 取消返回
     */
    class CancelGetContinueDayRewardLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 获取标准场和百人场人数
     */
    class GetGameCurrentPlayerNumberLobby_C {
        GetType(): string;
    }
    /**
     * 获取人数返回
     */
    class GetGameCurrentPlayerNumberLobby_S {
        /**
         * 标准场
         */
        stand: number;
        /**
         * 百人场
         */
        hundred: number;
        /**
         * 森林舞会
         */
        slwh: number;
        /**
         * 各场次人数
         */
        scene: number[];
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 大厅所有游戏在线人数
     */
    class AllGamePlayerOnlineNumberLobby_CS {
        onlineNumDataList: AllGamePlayerOnlineNumberLobby_CS.OnlineNumData[];
        GetType(): string;
    }
    module AllGamePlayerOnlineNumberLobby_CS {
        class OnlineNumData {
            /**
             * 游戏Id
             */
            gameId: number;
            /**
             * 在线人数
             */
            onlineNum: number;
            GetType(): string;
        }
    }
    /**
     * 三张大厅的非顺序弹窗
     */
    class PushPopUpWindowsLobby_S {
        /**
         * 弹窗类型 1 账户创建 2 未读公告
         */
        type: number;
        /**
         * 账户创建金币数量
         */
        chips: number;
        /**
         * 未读公告则附带上公告Id
         */
        broadId: number;
        GetType(): string;
    }
    /**
     * 获取大厅急速夺宝信息
     */
    class GetSnatchTreasureInfoLobby_C {
        GetType(): string;
    }
    /**
     * 玩家下注信息
     */
    class OwnBetInfo {
        /**
         * 玩家下注量
         */
        betChips: number;
        /**
         * 奖池编号 1,2
         */
        number: number;
        /**
         * 玩家下注概率
         */
        probability: string;
        GetType(): string;
    }
    /**
     * 玩家中奖信息
     */
    class WinnerInfo {
        /**
         * 玩家vip
         */
        vip: number;
        /**
         * 玩家昵称
         */
        nickname: string;
        /**
         * 玩家头像
         */
        headurl: string;
        /**
         * 中奖概率
         */
        probability: string;
        /**
         * 中奖金币
         */
        rewardNum: number;
        GetType(): string;
    }
    /**
     * 获取大厅急速夺宝信息返回
     */
    class GetSnatchTreasureInfoLobby_S {
        /**
         * 1号奖池总额
         */
        pondOne: number;
        /**
         * 2号奖池总额
         */
        pondTwo: number;
        /**
         * 玩家下注信息
         */
        ownBetInfo: OwnBetInfo[];
        /**
         * 1号奖池中奖信息
         */
        winnerOne: WinnerInfo;
        /**
         * 2号奖池中奖信息
         */
        winnerTwo: WinnerInfo;
        /**
         * 夺宝的状态 1下注 2结算
         */
        status: number;
        /**
         * 夺宝剩余的时间
         */
        time: number;
        /**
         * 1号奖池玩家信息
         */
        mulWinnerOne: WinnerInfo[];
        /**
         * 2号奖池玩家信息
         */
        mulWinnerTwo: WinnerInfo[];
        /**
         * 玩家中奖数额
         */
        rewardNum: number[];
        GetType(): string;
    }
    /**
     * 获取急速夺宝排行榜信息
     */
    class GetSnatchTreasureRankInfoLobby_C {
        GetType(): string;
    }
    /**
     * 获取急速夺宝排行榜信息
     */
    class GetSnatchTreasureRankInfoLobby_S {
        /**
         * 所有排行
         */
        allRankInfo: SscRankInfo[];
        /**
         * 我的排行
         */
        myRankInfo: SscRankInfo[];
        /**
         * 昨日所有排行
         */
        yesterdayRankInfo: SscRankInfo[];
        /**
         * 昨日我的排行
         */
        yesterdayMyRankInfo: SscRankInfo[];
        GetType(): string;
    }
    /**
     * 急速夺宝下注量广播
     */
    class SnatchTreasureBetChipsLobby_Brd {
        /**
         * 1号奖池下注量
         */
        oneBetChips: number;
        /**
         * 1号奖池变化量
         */
        oneDiffNum: number;
        /**
         * 2号奖池下注量
         */
        twoBetChips: number;
        /**
         * 2号奖池变化量
         */
        twoDiffNum: number;
        GetType(): string;
    }
    /**
     * 急速夺宝下注状态广播
     */
    class SnatchTreasureBetStatusLobby_Brd {
        /**
         * 状态 1 下注 2 开奖
         */
        status: number;
        /**
         * 状态时间
         */
        time: number;
        GetType(): string;
    }
    /**
     * 急速夺宝开奖状态广播
     */
    class SnatchTreasureLotteryStatusLobby_Brd {
        /**
         * 状态
         */
        status: number;
        /**
         * 时间
         */
        time: number;
        /**
         * 1号奖池中奖信息
         */
        winnerOne: WinnerInfo[];
        /**
         * 2号奖池中奖信息
         */
        winnerTwo: WinnerInfo[];
        GetType(): string;
    }
    /**
     * 急速夺宝玩家下注
     */
    class SnatchTreasureUserBetChipsLobby_C {
        /**
         * 下注奖池编号 1:1号奖池 2:2号奖池
         */
        number: number;
        /**
         * 下注量
         */
        chips: number;
        GetType(): string;
    }
    /**
     * 急速夺宝玩家下注返回
     */
    class SnatchTreasureUserBetChipsLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 奖池编号
         */
        number: number;
        /**
         * 本次下注奖池的总量
         */
        pondBetChips: number;
        /**
         * 玩家下注该奖池总量
         */
        ownBetChips: number;
        /**
         * 玩家本次下注量
         */
        ownDiffNum: number;
        /**
         * 本次下注的中奖概率
         */
        probability: string;
        GetType(): string;
    }
    /**
     * 急速夺宝玩家概率变化
     */
    class SnatchTreasureUserProbabilityLobby_S {
        /**
         * 玩家1号奖池概率
         */
        oneProbability: string;
        /**
         * 玩家2号奖池概率
         */
        twoProbability: string;
        GetType(): string;
    }
    /**
     * 急速夺宝中奖玩家通知
     */
    class SnatchTreasureWinnerNoticeLobby_S {
        /**
         * 两个奖池中奖数量
         */
        rewardNum: number[];
        GetType(): string;
    }
    /**
     * 急速夺宝我的下注记录
     */
    class GetSnatchTreasureOwnBetRecordLobby_C {
        GetType(): string;
    }
    /**
     * 下注记录信息
     */
    class OwnBetRecordInfo {
        /**
         * 本局是否中奖
         */
        isWin: boolean;
        /**
         * 下注时间戳
         */
        timestamp: number;
        /**
         * 该奖池编号
         */
        number: number;
        /**
         * 该奖池玩家下注额
         */
        ownBetChips: number;
        /**
         * 该奖池下注总额
         */
        pondBetChips: number;
        /**
         * 该玩家概率
         */
        probability: string;
        GetType(): string;
    }
    /**
     * 急速夺宝我的下注记录返回
     */
    class GetSnatchTreasureOwnBetRecordLobby_S {
        /**
         * 玩家下注记录
         */
        record: OwnBetRecordInfo[];
        GetType(): string;
    }
    /**
     * 急速夺宝打开面板或关闭面板
     */
    class SnatchTreasurePanelStatusLobby_C {
        /**
         * 状态 1 打开 2 关闭
         */
        status: number;
        GetType(): string;
    }
    class SnatchTreasurePanelStatusLobby_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 三张大厅玩法隐藏功能
     */
    class Hidden_Game {
        /**
         * 是否隐藏
         */
        value: boolean;
        /**
         * 游戏类型
         */
        type: Hidden_Game.Hidden_Game_Type;
        GetType(): string;
    }
    module Hidden_Game {
        enum Hidden_Game_Type {
            /**
             * 标准场
             */
            Game_Stand = 9053000,
            /**
             * 百人场
             */
            Game_Hundred = 9053001,
            /**
             * 森林舞会
             */
            Game_SenLinWuHui = 9053002,
            /**
             * 时时彩
             */
            Game_EveryColor = 9053003,
            /**
             * 急速夺宝
             */
            Game_SnatchTreasure = 9053004,
            /**
             * 赠送金币
             */
            Game_ExchangeCoin = 9053005,
            /**
             * 摇钱树
             */
            Game_MoneyTree = 9053006,
            /**
             * 龙虎斗
             */
            Game_LongHu = 9053007,
            /**
             * 至尊
             */
            Game_ZhiZun = 9053008,
            /**
             * 海王捕鱼
             */
            Game_Fish = 9053009,
            /**
             * 广播按钮
             */
            Game_BroadCast = 9053010,
        }
    }
    /**
     * 简单推送
     */
    class IsSimpleAgentLobby_S {
        /**
         * 0/1 否、是
         */
        state: number;
        GetType(): string;
    }
    /**
     * ---------------------------------奖池回馈活动开始----------------------------//
     *  请求获取奖池奖励内容
     */
    class JackpotItemListLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 奖池物品列表
     */
    class JackpotItem {
        /**
         * 商品ID
         */
        id: number;
        /**
         * 商品名称
         */
        name: string;
        icon: number;
        /**
         * 奖励数量
         */
        rewardNum: number;
        /**
         * 今日总组数
         */
        allNum: number;
        /**
         * 今日剩余组数
         */
        leftNum: number;
        GetType(): string;
    }
    class JackpotItemListLobbyCmd_S {
        /**
         * 商品列表
         */
        list: JackpotItem[];
        /**
         * 当前奖池总奖金
         */
        curNum: number;
        /**
         * 我的奖池贡献度,每10个贡献度可以抽一次奖
         */
        myJackpot: number;
        GetType(): string;
    }
    /**
     * 刷新奖池
     */
    class JackpotNumLobbyCmd_S {
        /**
         * 当前奖池总奖金
         */
        num: number;
        GetType(): string;
    }
    /**
     * 请求获奖排行榜
     */
    class JackpotOrderLobbyCmd_C {
        /**
         * 当前奖池总奖金
         */
        page: number;
        GetType(): string;
    }
    /**
     * 奖池物品列表
     */
    class JackpotRewardUser {
        uid: number;
        /**
         * nickName
         */
        name: string;
        /**
         * 奖励数量
         */
        rewardNum: number;
        GetType(): string;
    }
    /**
     * 请求获奖排行榜返回
     */
    class JackpotOrderLobbyCmd_S {
        /**
         * 当前奖池总奖金
         */
        page: number;
        /**
         * 获奖列表
         */
        list: JackpotRewardUser[];
        GetType(): string;
    }
    /**
     * 请求抽奖
     */
    class GetJackpotItemLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 请求抽奖返回
     */
    class GetJackpotItemLobbyCmd_S {
        /**
         * 奖品id
         */
        id: number;
        /**
         * 剩余奖品数量
         */
        leftNum: number;
        /**
         * 当前奖池总奖金
         */
        curNum: number;
        /**
         * 我的奖池贡献度,每10个贡献度可以抽一次奖
         */
        myJackpot: number;
        GetType(): string;
    }
    /**
     * ---------------------------------积分商城购买----------------------------//
     *  获取积分商城物品列表
     */
    class ShopPointListLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 积分商城物品列表
     */
    class ShopPointItem {
        /**
         * 物品ID
         */
        id: number;
        /**
         * 商品名称
         */
        name: string;
        icon: number;
        /**
         * 1表示钻石,2表示积分
         */
        moneyType: number;
        /**
         * 花费
         */
        cost: number;
        /**
         * 数量
         */
        number: number;
        /**
         * 是否显示,(购买)
         */
        open: number;
        /**
         * 显示栏目
         */
        displayColumn: number[];
        /**
         * 上市日期,仅供客户端展示
         */
        Date: string;
        /**
         * 抽奖类型1表示钻石,2表示积分
         */
        luckyType: number;
        /**
         * 抽奖消耗
         */
        luckyCost: number;
        /**
         * 抽奖获得概率
         */
        luckyProb: number;
        /**
         * 奖品类型 1钻石 2积分 3物品  4金豆
         */
        rewardType: number;
        GetType(): string;
    }
    /**
     * 返回积分商城物品列表
     */
    class ShopPointListLobbyCmd_S {
        /**
         * 商品列表
         */
        list: ShopPointItem[];
        /**
         * 剩余转盘次数
         */
        turntable: number;
        GetType(): string;
    }
    /**
     * 购买一个积分商品
     */
    class BuyShopPointItemLobbyCmd_C {
        /**
         * 需要带上大厅id
         */
        lobbyId: number;
        /**
         * 物品ID
         */
        goodId: number;
        GetType(): string;
    }
    /**
     * 单笔订单
     */
    class LobbyOrderItem {
        /**
         * 订单号
         */
        orderId: number;
        /**
         * 购买时间
         */
        time: number;
        /**
         * 商品ID
         */
        goodsId: number;
        /**
         * 数量
         */
        num: number;
        /**
         * 订单状态 0：购买成功，1：购买失败 其余的以后再加
         */
        orderState: number;
        GetType(): string;
    }
    /**
     * 请求查看所有购买订单
     */
    class RequestOrderListLobbyCmd_C {
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 请求的页数
         */
        pageNum: number;
        GetType(): string;
    }
    /**
     * 返回订单列表
     */
    class ReturnOrderListLobbyCmd_S {
        /**
         * 订单列表
         */
        orderList: LobbyOrderItem[];
        /**
         * 当前的页数
         */
        curPageNum: number;
        /**
         * 总的页数
         */
        totalPageNum: number;
        GetType(): string;
    }
    /**
     * 用钻石钻石金币
     */
    class RedeemGoldByDiamondLobbyCmd_C {
        /**
         * 钻石数量,返回Cmd.UserInfoGetLobbyCmd_S
         */
        num: number;
        GetType(): string;
    }
    /**
     * ---------------------------------商城兑换码----------------------------//
     *  请求兑换一个商品
     */
    class RedeemItemShopPointLobbyCmd_C {
        /**
         * 邮寄地址
         */
        addr: Cmd.DeliverAddr;
        /**
         * 兑换码
         */
        cdkey: string;
        GetType(): string;
    }
    /**
     * 通知消息
     */
    class Notification {
        /**
         * 消息id
         */
        id: number;
        /**
         * 类型
         */
        typ: Notification.Type;
        /**
         * 名称
         */
        name: string;
        /**
         * 留言
         */
        msg: string;
        /**
         * 头像
         */
        headurl: string;
        uid: number;
        GetType(): string;
    }
    module Notification {
        enum Type {
            AddFriend = 1,
        }
    }
    /**
     *  C-&gt;S 消息更新请求
     *  S-&gt;C 消息更新通知
     */
    class NotificationUpdateLobbyCmd_CS {
        op: Cmd.UpdateOperator;
        rows: Notification[];
        GetType(): string;
    }
    /**
     * 增加带入
     */
    class AddBringLobbyCmd_C {
        num: number;
        matchId: number;
        GetType(): string;
    }
    /**
     * 带出金钱
     */
    class TakeoutBringLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 系统设置
     */
    class SystemSettingsLobbyCmd_CS {
        /**
         * 自定义设置内容
         */
        settings: string;
        GetType(): string;
    }
    /**
     * ---------------------------------账号绑定其他登录方式----------------------------//
     *  获取手机验证码
     */
    class GetBindAccountIdentifyCodeLobbyCmd_C {
        /**
         * 手机号码
         */
        phoneNumber: number;
        /**
         * 操作类型 1/2/3  绑定/换绑/修改密码 4 修改保险箱密码
         */
        opType: number;
        /**
         * 手机号
         */
        phonenumber: string;
        GetType(): string;
    }
    class GetBindAccountIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 账号绑定其他登录方式
     */
    class BindAccountLobbyCmd_C {
        /**
         * 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑
         */
        opType: number;
        /**
         * 平台id 129/手机
         */
        platId: number;
        /**
         * 平台账号 如果为绑定手机号 则填手机号
         */
        platAccount: string;
        /**
         * 各种第三方的验证码
         */
        code: string;
        /**
         * 其他登录为账号密码登录的需要同时带上密码
         */
        passwd: string;
        /**
         * 如果为换绑 则这为老手机验证码 -- 暂时不用吧。还是使用二步流程
         */
        oldCode: string;
        GetType(): string;
    }
    class BindAccountLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 密码
         */
        password: string;
        /**
         * 手机号
         */
        phoneNumber: number;
        GetType(): string;
    }
    /**
     * 验证指定验证码
     */
    class VerifyIdentifyCodeLobbyCmd_C {
        /**
         * 平台id 129/手机
         */
        platId: number;
        /**
         * 平台账号 如果为绑定手机号 则填手机号
         */
        platAccount: string;
        /**
         * 各种第三方的验证码
         */
        code: string;
        GetType(): string;
    }
    class VerifyIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * ---------------------------------游客绑定邮箱----------------------------//
     *  获取手机验证码
     */
    class GetGuestBindEmailIdentifyCodeLobbyCmd_C {
        /**
         * 邮箱
         */
        email: string;
        /**
         * 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 -- 暂时没用到
         */
        opType: number;
        GetType(): string;
    }
    class GetGuestBindEmailIdentifyCodeLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 游客绑定邮件
     */
    class GuestBindEmailLobbyCmd_C {
        /**
         * 操作类型 1/2/3/4  绑定/换绑/修改密码/解绑 -- 暂时只处理1、3
         */
        opType: number;
        /**
         * 平台账号 如果为绑定邮箱 则填邮箱
         */
        platAccount: string;
        /**
         * 邮件验证码
         */
        code: string;
        /**
         * 密码
         */
        passwd: string;
        /**
         * 旧密码
         */
        oldPasswd: string;
        GetType(): string;
    }
    class GuestBindEmailLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 防沉迷提示弹窗(好彩金币场yy渠道需求2018.06.08)
     */
    class AntiAddictionLobbyCmd_S {
        GetType(): string;
    }
    /**
     *  好彩金币系列代理商公告
     *  代理商分享页面信息
     */
    class GetAgentShareInfoLobbyCmd_C {
        GetType(): string;
    }
    class GetAgentShareInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余红包数量
         */
        redpackNum: number;
        /**
         * 红包金额
         */
        redpackChips: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        GetType(): string;
    }
    /**
     * 代理商设置分享数据
     */
    class SetAgentShareInfoLobbyCmd_C {
        /**
         * 红包数量
         */
        redpackNum: number;
        /**
         * 红包金额
         */
        redpackChips: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        GetType(): string;
    }
    class SetAgentShareInfoLobbyCmd_S {
        resultCode: number;
        /**
         * 剩余红包数量
         */
        redpackNum: number;
        /**
         * 红包金额
         */
        redpackChips: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        GetType(): string;
    }
    /**
     * 代理商设置公告通知所有下级播跑马灯
     */
    class NotifyAgentChildsBroadInfoLobby_Brd {
        /**
         * 0只播跑马灯 1需要弹窗和跑马灯
         */
        optype: number;
        /**
         * 公告内容
         */
        broadInfo: string;
        /**
         * 红包金额（如果该值存在则在***弹窗面板***上会有一个红包)
         * 服务器会直接默认到账，但是不会通知前端刷新
         * 前端自己在玩家点击领取或者关闭按钮的时候弹个领取特效然后请求下刷新数据同步金币数量
         * 注意不要弹两次特效（点击了领取按钮弹了特效后再点击关闭按钮就不要弹特效了）
         */
        redpackChips: number;
        GetType(): string;
    }
    /**
     * 大四喜大厅：查询玩家游戏记录
     */
    class GameRecords {
        /**
         * 游戏时间
         */
        timestamp: number;
        /**
         * 牌局Id,如果没传值得话，前端显示个“-”吧
         */
        roundId: number;
        /**
         * 投注金额
         */
        betChips: number;
        /**
         * 中奖金额
         */
        lotteryChips: number;
        /**
         * 输赢
         */
        profitChips: number;
        /**
         * 游戏Id
         */
        gameId: number;
        /**
         * 有效投注
         */
        vailidBet: number;
        GetType(): string;
    }
    class FindUserGameRecordsLobbyCmd_C {
        /**
         * 不传或者传0默认为查找全部
         */
        gameId: number;
        /**
         * 开始时间戳
         */
        sttime: number;
        /**
         * 结束时间戳
         */
        endtime: number;
        GetType(): string;
    }
    class FindUserGameRecordsLobbyCmd_S {
        /**
         * 如果没传则表示没有记录
         */
        records: GameRecords[];
        GetType(): string;
    }
    /**
     * 玩家赠送金币信息
     */
    class GetUserGiftCoinInfoLobbyCmd_CS {
        /**
         * 客服微信号
         */
        weChat: string;
        /**
         * 赠送下限
         */
        minLimit: number;
        /**
         * 赠送上限
         */
        maxLimit: number;
        /**
         * 可赠送数量，为空则不限制，仅普通玩家间有效
         */
        canGiftNum: number;
        GetType(): string;
    }
    /**
     * 历史数据更新（大厅）
     */
    class HistoryUpdateLobbyCmd_CS {
        /**
         * 游戏Id
         */
        gameId: number;
        /**
         * 房间等级列表
         */
        levelList: number[];
        /**
         * 历史数据列表
         */
        historyList: Cmd.History[];
        /**
         * 时间戳
         */
        timestamp: number;
        /**
         * jackpot时间戳
         */
        lastUpdateTime: number;
        /**
         * 时间间隔
         */
        interval: number;
        GetType(): string;
    }
    /**
     * 玩家游戏历史数据更新（大厅）
     */
    class UserGameHistoryUpdateLobbyCmd_CS {
        /**
         * 游戏Id
         */
        gameId: number;
        /**
         * 房间等级
         */
        level: number;
        /**
         * 起始下标
         */
        beginIndex: number;
        /**
         * 结束下标
         */
        endIndex: number;
        /**
         * 历史记录最大条目数
         */
        maxLen: number;
        /**
         * 历史数据列表
         */
        history: Cmd.History;
        GetType(): string;
    }
    /**
     * 同步推广员邮件信息
     */
    class SyncPromotersMailInfoLobbyCmd_CS {
        /**
         * 1 设置推广员身份 2 取消推广员身份
         */
        optype: number;
        /**
         * 邮件标题 不填充为获取邮件信息
         */
        title: string;
        /**
         * 邮件内容
         */
        content: string;
        GetType(): string;
    }
    class MahjongPoint {
        /**
         * 角色ID
         */
        charid: number;
        /**
         * 昵称
         */
        name: string;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 输赢积分
         */
        point: number;
        GetType(): string;
    }
    /**
     * 获取分享信息（新版分享 里面存有链接）
     */
    class GetNewShareInfoLobbyCmd_CS {
        /**
         * 需要带上大厅id
         */
        globalRoomId: number;
        /**
         * 结果
         */
        resultCode: number;
        /**
         * 结束时间
         */
        endTime: number;
        /**
         * 实际玩了几局
         */
        realNum: number;
        /**
         * 积分情况
         */
        rdata: MahjongPoint[];
        /**
         * 链接地址
         */
        url: string;
        /**
         * 操作类型：1 查询 2 领取 3 接受邀请
         */
        optype: number;
        GetType(): string;
    }
    /**
     * ---------------------------------西安房卡每日抽奖任务----------------------------//
     *  每日任务
     */
    class DailyTask {
        /**
         * 任务id
         */
        id: number;
        /**
         * 任务状态,nil表示未接,0表示已完成,其他数字表示进度,比如1/1表示可完成,需要完成次数需要从任务表里读取
         */
        state: number;
        GetType(): string;
    }
    /**
     * 请求每日任务
     */
    class RequestDailyTaskLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 返回每日任务
     */
    class ReturnDailyTaskLobbyCmd_S {
        /**
         * 每日任务
         */
        daily: DailyTask[];
        /**
         * 剩余抽奖次数
         */
        leftNum: number;
        GetType(): string;
    }
    /**
     * 获取新手奖励信息
     */
    class GetNoviceInfodLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetNoviceInfodLobbyCmd_S {
        resultCode: number;
        noviceInfo: NoviceItem[];
        remainDay: number;
        GetType(): string;
    }
    /**
     * 领取新手奖励
     */
    class GetNoviceRewarddLobbyCmd_C {
        lobbyId: number;
        /**
         * 1:普通领取 2:双倍领取
         */
        typ: number;
        GetType(): string;
    }
    class GetNoviceRewarddLobbyCmd_S {
        resultCode: number;
        day: number;
        GetType(): string;
    }
    class NoviceItem {
        day: number;
        /**
         * 1:未领 2:已领 3:当前可领
         */
        status: number;
        goodId: number;
        goodNbr: number;
        GetType(): string;
    }
    /**
     * 小程序分享活动相关
     */
    class InviteInfoLitteGame {
        /**
         * 当前状态 1：等待邀请(这时候不会有昵称和头像信息) 2：已邀请等待领取奖励 3：已邀请奖励已领取
         */
        status: number;
        uid: number;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 头像
         */
        headUrl: string;
        /**
         * 对应道具
         */
        goods: Cmd.Goods;
        id: number;
        GetType(): string;
    }
    /**
     *  分享有奖（邀请有礼）
     *  获取界面信息
     */
    class GetInviteInfoLittleGameLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetInviteInfoLittleGameLobbyCmd_S {
        resultCode: number;
        info: InviteInfoLitteGame[];
        /**
         * 奖励领取状态 1：未邀请不可领 2：可领 3：今日已领取完(前端根据这个数值判断按钮是否可点或者一些弹窗处理)
         */
        rewardStatus: number;
        GetType(): string;
    }
    /**
     * 领取奖励
     */
    class GetInviteRewardLittleGameLobbyCmd_C {
        lobbyId: number;
        id: number;
        GetType(): string;
    }
    class GetInviteRewardLittleGameLobbyCmd_S {
        resultCode: number;
        /**
         * 对应道具
         */
        goods: Cmd.Goods[];
        /**
         * 这里的数据量很小，我们就直接将所有的信息回复过去，前端刷新就直接替换
         */
        info: InviteInfoLitteGame[];
        /**
         * 奖励领取状态 1：未邀请不可领 2：可领 3：今日已领取完(前端根据这个数值判断按钮是否可点或者一些弹窗处理)
         */
        rewardStatus: number;
        GetType(): string;
    }
    /**
     *  苹果领钻石（只针对苹果用户开放需要前端做一下显示处理）
     *  获取分享信息
     */
    class GetIosInviteInfoLittleGameLobbyCmd_C {
        /**
         * 第几页 数据分页一次给20条
         */
        index: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetIosInviteInfoLittleGameLobbyCmd_S {
        /**
         * 已经分享的群数量
         */
        yet: number;
        /**
         * 总共可分享的群数量
         */
        total: number;
        /**
         * 分页
         */
        index: number;
        /**
         * 数据
         */
        info: InviteInfoLitteGame[];
        GetType(): string;
    }
    class GetIosInviteRewardLittleGameLobbyCmd_C {
        uid: number;
        lobbyId: number;
        GetType(): string;
    }
    class GetIosInviteRewardLittleGameLobbyCmd_S {
        resultCode: number;
        /**
         * 这块的数据量可能会过多我们不回复所有的数据过去，这里只回复领取对应的值，前端自行去根据uid刷新领取状态
         */
        single: InviteInfoLitteGame;
        GetType(): string;
    }
    /**
     * 钻石不足时获取钻石界面提示
     */
    class GetDiamondInterfaceTips_C {
        /**
         * 1:安卓 2:ios
         */
        typ: number;
        GetType(): string;
    }
    class GetDiamondInterfaceTips_S {
        /**
         * 1:分享有礼 2:每日任务 3:免费钻石赛 4:商城(安卓) 5:领钻石(ios)
         */
        tips: number[];
        GetType(): string;
    }
    /**
     * 话费券兑换提示
     */
    class ExchangeGiftVoucherTips_S {
        /**
         * 1:不足 2:已足 3:清除提示
         */
        typ: number;
        GetType(): string;
    }
    /**
     * 请求兑换话费信息
     */
    class GetExchangeGiftVoucherInfo_C {
        GetType(): string;
    }
    class GetExchangeGiftVoucherInfo_S {
        infos: GoodsItem[];
        /**
         * 已提取总额
         */
        drawAll: number;
        GetType(): string;
    }
    class GoodsItem {
        /**
         * 商品id
         */
        goodsId: number;
        /**
         * 剩余次数
         */
        remainder: number;
        GetType(): string;
    }
    /**
     * 免费领钻
     */
    class GetFreeDiamondLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 获取月卡信息
     */
    class GetMonthCardInfoLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    class GetMonthCardInfoLobbyCmd_S {
        /**
         * 0:未开通 1:可领 2:已领
         */
        state: number;
        /**
         * 剩余天数
         */
        remainDay: number;
        /**
         * 总奖励
         */
        totalRewards: Cmd.RewardItem[];
        /**
         * 立即发放奖励
         */
        onceRewards: Cmd.RewardItem[];
        /**
         * 每日可领奖励
         */
        dailyRewards: Cmd.RewardItem[];
        /**
         * 持续可领天数
         */
        totalDay: number;
        /**
         * 价格(分)
         */
        price: number;
        /**
         * 商品id
         */
        shopId: number;
        /**
         * 首次购买赠送
         */
        firstGifts: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 领取月卡奖励
     */
    class GetMonthCardRewardLobbyCmd_C {
        lobbyId: number;
        GetType(): string;
    }
    /**
     * 保险箱
     */
    class OperationSafeBoxLobbyCmd_CS {
        /**
         * 操作类型：1 设置密码 2 重置密码 3 找回密码 4 存钱 5 取钱 6 获取保险箱数据
         */
        optype: number;
        /**
         * 手机号（获取时填充说明设置过密码了）
         */
        phoneNumber: string;
        /**
         * 验证码
         */
        code: string;
        /**
         * 密码
         */
        password: string;
        /**
         * 新密码，仅用于重置密码操作
         */
        passwordNew: string;
        /**
         * 操作货币类型：1 钻石 2 金币 3 红包
         */
        currencyType: number;
        /**
         * 操作货币数量
         */
        currencyNum: number;
        /**
         * 获取时用
         */
        currencyNumList: number[];
        GetType(): string;
    }
    /**
     * 请求弹窗活动
     */
    class PopUpNewsLobbyCmd_C {
        GetType(): string;
    }
    class PopUpNews {
        /**
         * matchId,匹配号id
         */
        id: number;
        /**
         * matchName,匹配号id
         */
        name: number;
        GetType(): string;
    }
    /**
     * 请求弹窗活动返回
     */
    class PopUpNewsLobbyCmd_S {
        list: PopUpNews[];
        GetType(): string;
    }
    /**
     * 背包信息
     */
    class BackpackInfo {
        /**
         * 物品ID
         */
        goodId: number;
        /**
         * 物品数量
         */
        number: number;
        /**
         * 剩余时间
         */
        lefttime: number;
        GetType(): string;
    }
    /**
     * 请求背包列表
     */
    class BackpackInfoRequestBackpackCmd_C {
        GetType(): string;
    }
    class BackpackInfoReturnBackpackCmd_S {
        resultCode: number;
        desc: string;
        backpackList: BackpackInfo[];
        GetType(): string;
    }
    /**
     * 请求使用物品
     */
    class BackpackExchangeRequestBackpackCmd_C {
        /**
         * 将要使用的物品信息
         */
        backpackInfo: BackpackInfo;
        /**
         * 使用话费物品的手机号
         */
        cellPhoneNumber: string;
        /**
         * 公告内容
         */
        content: string;
        GetType(): string;
    }
    class BackpackExchangeReturnBackpackCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 剩余数量
         */
        surplus: number;
        /**
         * 更新物品信息
         */
        backpackInfo: BackpackInfo;
        GetType(): string;
    }
    /**
     * 请求赠送物品
     */
    class BackpackPresentRequestBackpackCmd_C {
        /**
         * 奖要赠送的物品信息
         */
        backpackInfo: BackpackInfo;
        /**
         * 目标uid
         */
        uid: number;
        GetType(): string;
    }
    class BackpackPresentReturnBackpackCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 更新物品信息
         */
        backpackInfo: BackpackInfo;
        GetType(): string;
    }
    /**
     * 获取公众号关注信息
     */
    class GetAttentionRewardCmd_C {
        lobbyId: number;
        /**
         * 操作类型：1关注  2查询 3领取
         */
        optype: number;
        GetType(): string;
    }
    class GetAttentionRewardCmd_S {
        resultCode: number;
        opType: number;
        /**
         * 0:未关注 1:可领 2:已领
         */
        state: number;
        /**
         * 关注公众号获取的奖励
         */
        items: Cmd.RewardItem[];
        GetType(): string;
    }
    /**
     * 钻石兑换奖励
     */
    class ExchangeRewardLobbyCmd_C {
        /**
         * 大厅id
         */
        lobbyId: number;
        /**
         * 兑换id(道具兑换表中的ID)
         */
        itemId: number;
        /**
         * 手机号
         */
        mobilePhone: string;
        /**
         * 邮箱
         */
        email: string;
        /**
         * 钻石数
         */
        diamond: number;
        GetType(): string;
    }
    class ExchangeRewardLobbyCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 兑换id(道具兑换表中的ID)
         */
        itemId: number;
        GetType(): string;
    }
    /**
     * 领取限时宝箱奖励
     */
    class GetTimeLimitBoxRewardLobbyCmd_C {
        GetType(): string;
    }
    class GetTimeLimitBoxRewardLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 如果领取成功则发送下个宝箱的时间长度 如果领取成功但是没有下个宝箱了 则该字段为nil
         */
        nextTime: number;
        GetType(): string;
    }
    /**
     * 进入刮刮乐界面
     */
    class IntoScratchTicketLobbyCmd_C {
        GetType(): string;
    }
    class IntoScratchTicketLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 如果有值 表示已经刮过哪几个档次的了
         */
        recvId: number[];
        /**
         * 当前局数
         */
        curRoomNbr: number;
        /**
         * 当前可刮的所有档次结果
         */
        rewardNbr: number[];
        GetType(): string;
    }
    /**
     * 离开刮刮乐界面
     */
    class ExitScratchTicketLobbyCmd_C {
        GetType(): string;
    }
    /**
     * 领取奖励
     */
    class GetScratchTicketRewardLobbyCmd_C {
        /**
         * 即将刮的是第几个
         */
        recvId: number;
        GetType(): string;
    }
    class GetScratchTicketRewardLobbyCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 如果有值 表示已经刮的第几个档次的了
         */
        recvId: number;
        /**
         * 当前奖励数
         */
        rewardNbr: number;
        GetType(): string;
    }
    /**
     * 大奖励广播一下
     */
    class ScratchTicketRewardLobbyCmd_Brd {
        /**
         * 广播内容
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 游客绑定第三方账号
     */
    class GuestSwitchToThirdPartyLobbyCmd_CS {
        /**
         * 操作类型 1 -- 暂只支持绑定
         */
        optype: number;
        /**
         * 平台用户信息
         */
        platinfo: Cmd.PlatInfo;
        /**
         * 0代表成功，1代表失败
         */
        ret: number;
        /**
         * 错误描述
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 请求获取跳转登录token  -- Tips：最终跳转到目标登录服的 platid应为:1000 plataccount为:当前游戏服gameid .. &quot;_&quot; .. 当前游戏服玩家uid
     */
    class RequestForwardLoginTokenLobbyCmd_CS {
        /**
         * 目标登录服地址
         */
        url: string;
        /**
         * 目标gameid
         */
        gameid: number;
        /**
         * 目标zoneid
         */
        zoneid: number;
        /**
         * 0代表成功，1代表失败
         */
        ret: number;
        /**
         * 错误描述
         */
        desc: string;
        /**
         * 跳转登录token
         */
        forwardtoken: string;
        GetType(): string;
    }
    /**
     * 银行卡信息
     */
    class BankCardInfo {
        /**
         * 银行卡ID, 暂时不用
         */
        id: number;
        /**
         * 银行名称
         */
        name: string;
        /**
         * 支行名称
         */
        branch: string;
        /**
         * 省份
         */
        province: string;
        /**
         * 城市
         */
        city: string;
        /**
         * 开户名
         */
        username: string;
        /**
         * 卡号
         */
        cardno: string;
        /**
         * 银行卡在支付宝的索引, 暂时不用
         */
        cardindex: string;
        GetType(): string;
    }
    /**
     * 提现订单信息
     */
    class DrawCashOrderInfo {
        /**
         * 银行卡信息
         */
        bankCard: BankCardInfo;
        /**
         * 订单创建时间
         */
        timestamp: number;
        /**
         * 游戏服订单号
         */
        gameOrder: string;
        /**
         * 支付服订单号
         */
        platOrder: string;
        /**
         * 金额
         */
        amount: number;
        /**
         * 状态 0 处理中 1 失败 2 成功
         */
        state: number;
        /**
         * 状态描述
         */
        stateDesc: string;
        GetType(): string;
    }
    /**
     * 获取提现订单历史
     */
    class RequestDrawCashOrderHistory_CS {
        /**
         * 一页显示数量
         */
        perPage: number;
        /**
         * 当前页数
         */
        curPage: number;
        /**
         * 最大页数
         */
        maxPage: number;
        /**
         * 订单历史
         */
        orderList: DrawCashOrderInfo[];
        GetType(): string;
    }
    /**
     * 赠送记录信息
     */
    class GiftHistoryInfo {
        /**
         * 赠送方的uid
         */
        fromUid: number;
        /**
         * 接收玩家的uid
         */
        toUid: number;
        /**
         * 赠送时间
         */
        timestamp: number;
        /**
         * 赠送的金币数量
         */
        sendCoin: number;
        /**
         * 赠送后我的金币数量
         */
        myCoin: number;
        /**
         * 赠送方玩家的昵称
         */
        fromNickname: string;
        /**
         * 接收玩家的昵称
         */
        toNickname: string;
        GetType(): string;
    }
    /**
     * 获取赠送历史
     */
    class RequestGiftHistory_CS {
        /**
         * 一页显示数量
         */
        perPage: number;
        /**
         * 当前页数
         */
        curPage: number;
        /**
         * 最大页数
         */
        maxPage: number;
        /**
         * 赠送历史
         */
        historyList: GiftHistoryInfo[];
        GetType(): string;
    }
    /**
     * 新人福利任务
     */
    class RequestOnceTaskLobbyCmd_C {
        GetType(): string;
    }
    class RequestOnceTaskLobbyCmd_S {
        resultCode: number;
        /**
         * 福卡福利
         */
        fktasks: DaysTaskItem[];
        /**
         * 强化石福利
         */
        qhtasks: DaysTaskItem[];
        /**
         * 金币福利
         */
        chiptasks: DaysTaskItem[];
        /**
         * 钻石福利
         */
        diamondtasks: DaysTaskItem[];
        GetType(): string;
    }
    /**
     * 领取奖励
     */
    class GetOnceRewardLobbyCmd_C {
        taskId: number;
        GetType(): string;
    }
    class GetOnceRewardLobbyCmd_S {
        resultCode: number;
        taskId: number;
        GetType(): string;
    }
}
declare module Cmd {
    /**
     * 麻将类型
     */
    enum MahjongType {
        MahjongType_None = 0,
        /**
         * 双人麻将
         */
        MahjongType_Two = 1,
        /**
         * 四人麻将
         */
        MahjongType_Four = 2,
    }
    enum MahjongCardType {
        MahjongCardType_None = 0,
        /**
         * 万
         */
        MahjongCardType_Million = 1,
        /**
         * 条
         */
        MahjongCardType_strip = 2,
        /**
         * 筒
         */
        MahjongCardType_pie = 3,
        /**
         * 东南西北中发白
         */
        MahjongCardType_Other = 4,
        /**
         * 花
         */
        MahjongCardType_flower = 5,
    }
    enum MahjongCardOtherType {
        MahjongCardOtherType_None = 0,
        /**
         * 东
         */
        MahjongCardOtherType_East = 1,
        /**
         * 南
         */
        MahjongCardOtherType_South = 2,
        /**
         * 西
         */
        MahjongCardOtherType_West = 3,
        /**
         * 北
         */
        MahjongCardOtherType_North = 4,
        /**
         * 中
         */
        MahjongCardOtherType_Mid = 5,
        /**
         * 发
         */
        MahjongCardOtherType_Rich = 6,
        /**
         * 白
         */
        MahjongCardOtherType_White = 7,
    }
    enum MahjongOpCardType {
        MahjongOpCardType_None = 0,
        /**
         * 胡牌
         */
        MahjongOpCardType_Win = 1,
        /**
         * 杠牌
         */
        MahjongOpCardType_Bar = 2,
        /**
         * 补牌 --3,4,5为预留字段
         */
        MahjongOpCardType_Supply = 3,
        /**
         * 碰牌
         */
        MahjongOpCardType_Touch = 6,
        /**
         * 吃顺
         */
        MahjongOpCardType_Eat = 7,
        /**
         * MahjongOpCardType_Send				= 8;	// 摸牌
         *  不操作
         */
        MahjongOpCardType_Undo = 9,
        /**
         * 听牌
         */
        MahjongOpCardType_Listen = 10,
        /**
         * 三金倒(大连打宝消息)
         */
        MahjongOpCardType_ThreeGold = 11,
        /**
         * 天胡
         */
        MahjongOpCardType_SkyWin = 12,
        /**
         * 抢金
         */
        MahjongOpCardType_GrabGold = 13,
        /**
         * 游金
         */
        MahjongOpCardType_GoldSwim = 14,
        /**
         * 双游
         */
        MahjongOpCardType_DoubleSwim = 15,
        /**
         * 三游
         */
        MahjongOpCardType_ThreeSwim = 16,
        /**
         * 八花
         */
        MahjongOpCardType_EightFlower = 17,
        /**
         * 抢杠和
         */
        MahjongOpCardType_BarOtherWin = 18,
        /**
         * 四金倒
         */
        MahjongOpCardType_FourGold = 19,
        /**
         * 五金倒
         */
        MahjongOpCardType_FiveGold = 20,
        /**
         * 六金倒
         */
        MahjongOpCardType_SixGold = 21,
        /**
         * 长沙麻将
         *  起手小胡
         */
        MahjongOpCardType_startSmallWin = 22,
        /**
         *  遵义麻将
         *  原缺
         */
        MahjongOpCardType_OriginalLack = 23,
        /**
         * 定缺
         */
        MahjongOpCardType_EnsureLack = 24,
        /**
         *  金华麻将
         *  敲响
         */
        MahjongOpCardType_Knock = 25,
        /**
         *  二人金币
         *  加倍
         */
        MahjongOpCardType_Double = 26,
        /**
         *  漳州麻将
         *  四游
         */
        MahjongOpCardType_FourSwim = 27,
        /**
         * 五游
         */
        MahjongOpCardType_FiveSwim = 28,
        /**
         * 六游
         */
        MahjongOpCardType_SixSwim = 29,
        /**
         * 抢杠
         */
        MahjongOpCardType_BarOther = 101,
        /**
         * 自杠
         */
        MahjongOpCardType_BarSelf = 102,
        /**
         * 碰杠
         */
        MahjongOpCardType_BarTouch = 103,
        /**
         *  古田麻将
         *  原金杠
         */
        MahjongOpCardType_YuanJinBar = 104,
        /**
         * 杂金杠
         */
        MahjongOpCardType_ZaJinBar = 105,
        /**
         * 长沙麻将
         * 抢补
         */
        MahjongOpCardType_SupplyOther = 202,
        /**
         * 自补
         */
        MahjongOpCardType_SupplySelf = 203,
        /**
         * 碰补
         */
        MahjongOpCardType_SupplyTouch = 204,
        /**
         * 杠胡
         */
        MahjongOpCardType_BarWin = 205,
        /**
         * 宁德麻将
         *  金坎
         */
        MahjongOpCardType_JinKan = 110,
        /**
         * 四川麻将
         *  换牌操作
         */
        MahjongOpCardType_changgeCard = 120,
        /**
         * 海南麻将吃三道吃四道动画
         *  吃三道
         */
        MahjongOpCardType_EatThree = 130,
        /**
         * 吃四道
         */
        MahjongOpCardType_EatFour = 131,
        /**
         * 首张被跟
         */
        MahjongOpCardType_FollowBanker = 132,
        /**
         * 首张被杠
         */
        MahjongOpCardType_BarFirst = 133,
        /**
         * 宽甸麻将
         * 报夹
         */
        MahjongOpCardType_baojia = 33,
        /**
         * 报吊
         */
        MahjongOpCardType_baotdiao = 34,
        /**
         * 站立报听
         */
        MahjongOpCardType_zhanlibaoting = 35,
        /**
         * 站立报夹
         */
        MahjongOpCardType_zhanlibaojia = 36,
        /**
         * 站立报吊
         */
        MahjongOpCardType_zhanlibaodiao = 37,
        /**
         * 凤城麻将
         * 摇宝
         */
        MahjongOpCardType_yaobao = 50,
        /**
         * 跟宝
         */
        MahjongOpCardType_genbao = 51,
        /**
         * 放风
         */
        MahjongOpCardType_windCard = 52,
        /**
         * 沈阳麻将
         * 东南西旋风杠
         */
        MahjongOpCardType_DNXBXuanFengBar = 106,
        /**
         * 中发白旋风杠
         */
        MahjongOpCardType_ZFBXuanFengBar = 107,
        /**
         * 过蛋
         */
        MahjongOpCardType_PassEggs = 108,
        /**
         * 任丘麻将
         * 中发白箭
         */
        MahjongOpCardType_Jian = 55,
        /**
         * 风
         */
        MahjongOpCardType_Feng = 56,
        /**
         * 正常偎牌
         */
        MahjongOpCardType_NestleNormal = 57,
        /**
         * 臭偎
         */
        MahjongOpCardType_NestleSmell = 58,
        /**
         * 自提 （盖三亮一）
         */
        MahjongOpCardType_LiftSelf = 59,
        /**
         * 坎提 （全暗）
         */
        MahjongOpCardType_LiftPit = 60,
        /**
         * 偎提 （盖三亮一）
         */
        MahjongOpCardType_LiftNestle = 61,
        /**
         * 偎跑 （全亮）
         */
        MahjongOpCardType_RunNestle = 62,
        /**
         * 碰跑 （全亮）
         */
        MahjongOpCardType_RunTouch = 63,
        /**
         * 坎跑 （全亮）
         */
        MahjongOpCardType_RunPit = 64,
        /**
         *  螺丝胡
         *  胡(走),1表示胡继续
         */
        MahjongOpCardType_WinGo = 65,
        /**
         * 红拐弯比牌
         */
        MahjongOpCardType_Compare = 66,
        /**
         * 红拐弯等胡
         */
        MahjongOpCardType_WaitWin = 67,
        /**
         * 红拐弯枪胡
         */
        MahjongOpCardType_GradWin = 68,
        /**
         * 红拐弯枪胡(主动)
         */
        MahjongOpCardType_GradWinSrlf = 69,
    }
    /**
     * 番型
     */
    enum MahjongMultiType {
        /**
         * 跟牌
         */
        MahjongMultiType_FollowCard = 1,
        /**
         * 花杠
         */
        MahjongMultiType_FlowerBar = 2,
        /**
         * 明杠
         */
        MahjongMultiType_BrightBar = 3,
        /**
         * 暗杠
         */
        MahjongMultiType_DarkBar = 4,
        /**
         * 自摸
         */
        MahjongMultiType_WinSelf = 5,
        /**
         * 抢杠胡
         */
        MahjongMultiType_GrabBarWin = 6,
        /**
         * 抢金
         */
        MahjongMultiType_GrabGold = 7,
        /**
         * 天胡
         */
        MahjongMultiType_SkyWin = 8,
        /**
         * 游金
         */
        MahjongMultiType_GoldSwim = 9,
        /**
         * 双游
         */
        MahjongMultiType_DoubleSwim = 10,
        /**
         * 三游
         */
        MahjongMultiType_ThreeSwim = 11,
        /**
         * 三金倒
         */
        MahjongMultiType_ThreeGold = 12,
        /**
         * 四金倒
         */
        MahjongMultiType_FourGold = 13,
        /**
         * 五金倒
         */
        MahjongMultiType_FiveGold = 14,
        /**
         * 六金倒
         */
        MahjongMultiType_SixGold = 15,
        /**
         * 十三幺
         */
        MahjongMultiType_Thirteen = 16,
        /**
         * 八花
         */
        MahjongMultiType_Flowers = 17,
    }
    /**
     * 宁德麻将番型
     */
    enum NingDeMultiType {
        /**
         * 鸡胡
         */
        NingDeMultiType_ComminWin = 1,
        /**
         * 自摸
         */
        NingDeMultiType_SelfWin = 2,
        /**
         * 抢金
         */
        NingDeMultiType_GrabGold = 3,
        /**
         * 天胡
         */
        NingDeMultiType_SkyWin = 4,
        /**
         * 三金倒
         */
        NingDeMultiType_ThreeGold = 5,
        /**
         * 金雀
         */
        NingDeMultiType_GoldBird = 6,
        /**
         * 金龙
         */
        NingDeMultiType_GoldDragon = 7,
        /**
         * 单调
         */
        NingDeMultiType_SingleWin = 8,
        /**
         * 清一色
         */
        NingDeMultiType_SingleColor = 9,
        /**
         * 补红中
         */
        NingDeMultiType_BuHongZhong = 10,
        /**
         * 基础分
         */
        NingDeMultiType_Base = 11,
        /**
         * 明杠
         */
        NingDeMultiType_MingGang = 12,
        /**
         * 暗杠
         */
        NingDeMultiType_AnGang = 13,
        /**
         * 金牌
         */
        NingDeMultiType_GoldCard = 14,
    }
    /**
     * 捉鸡麻将番型
     */
    enum ZhuoJiMultiType {
        /**
         * 平胡
         */
        ZhuoJiMultiType_CommonWin = 1,
        /**
         * 杠上开花
         */
        ZhuoJiMultiType_BarWin = 2,
        /**
         * 大对子
         */
        ZhuoJiMultiType_BigCoupleWin = 3,
        /**
         * 清一色
         */
        ZhuoJiMultiType_UniformColorWin = 4,
        /**
         * 七对
         */
        ZhuoJiMultiType_SevenCoupleWin = 5,
        /**
         * 龙七对
         */
        ZhuoJiMultiType_DragonSevenCoupleWin = 6,
        /**
         * 清七对
         */
        ZhuoJiMultiType_UniformColorSevenCoupleWin = 7,
        /**
         * 清大对
         */
        ZhuoJiMultiType_UniformColorBigCoupleWin = 8,
        /**
         * 清龙背
         */
        ZhuoJiMultiType_UniformColorDungeonWin = 9,
        /**
         * 单吊
         */
        ZhuoJiMultiType_OneHandCardWin = 10,
        /**
         * 清单吊
         */
        ZhuoJiMultiType_UniformColorOneHandCardWin = 11,
        /**
         * 自摸
         */
        ZhuoJiMultiType_BySelfWin = 12,
        /**
         * 热杠
         */
        ZhuoJiMultiType_HotCannonWin = 13,
        /**
         * 抢杠胡
         */
        ZhuoJiMultiType_GrabBarWin = 14,
        /**
         * 硬报
         */
        ZhuoJiMultiType_HardCallWin = 15,
        /**
         * 软报
         */
        ZhuoJiMultiType_SoftCallWin = 16,
        /**
         * 杀报
         */
        ZhuoJiMultiType_KillCallWin = 17,
        /**
         * 冲锋鸡
         */
        ZhuoJiMultiType_RushChicken = 18,
        /**
         * 责任鸡
         */
        ZhuoJiMultiType_ResponseChicken = 19,
    }
    /**
     * 玩法
     */
    enum MahjongPlayType {
        /**
         * 半自摸
         */
        MahjongPlayType_Half = 11,
        /**
         * 全自摸
         */
        MahjongPlayType_Full = 12,
    }
    enum MahjongWinCardType {
        MahjongWinCardType_None = 0,
        /**
         * 自摸
         */
        MahjongWinCardType_Self = 1,
        /**
         * 胡牌
         */
        MahjongWinCardType_Shoot = 2,
        /**
         * 放炮
         */
        MahjongWinCardType_WinOther = 3,
    }
    enum MultiType {
        /**
         * 明杠
         */
        MahjongMulti_BrightBar = 1,
        /**
         * 暗杠
         */
        MahjongMulti_DarkBar = 2,
        /**
         * 自摸
         */
        MahjongMulti_selfWin = 3,
        /**
         * 抢杠和
         */
        MahjongMulti_grabBarWin = 4,
        /**
         * 杠上开花
         */
        MahjongMulti_flowerBarWin = 5,
        /**
         * 无鬼
         */
        MahjongMulti_NoGoldCard = 6,
        /**
         * 中马
         */
        MahjongMulti_Horse = 7,
        /**
         * 七对
         */
        MahjongMulti_SevenPairs = 8,
    }
    enum RoomPro {
        /**
         * 离线
         */
        RoomPro_0 = 0,
        /**
         * 房间局数
         */
        RoomPro_1 = 1,
        /**
         * 游戏玩法
         */
        RoomPro_2 = 2,
        /**
         * 人数模式
         */
        RoomPro_3 = 3,
        /**
         * 支付模式
         */
        RoomPro_4 = 4,
        /**
         * 游金倍数
         */
        RoomPro_5 = 5,
        /**
         * 支持托管
         */
        RoomPro_6 = 6,
    }
    /**
     * 两个骰子随机数
     */
    class DiceObj {
        /**
         * 第一个随机数
         */
        one: number;
        /**
         * 第二个随机数
         */
        two: number;
        GetType(): string;
    }
    /**
     * 杠碰结构
     */
    class CardOpObj {
        /**
         * MahjongOpCardType
         */
        type: number;
        thisId: number;
        /**
         * 被杠或被碰的玩家
         */
        fromUid: number;
        GetType(): string;
    }
    /**
     * 摸牌结构
     */
    class CardSendObj {
        thisId: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * 补牌结构
     */
    class FlowerCardObj {
        GetType(): string;
    }
    /**
     * 扎鸟结构
     */
    class BirdObj {
        uid: number;
        thisId: number;
        isHit: number;
        GetType(): string;
    }
    /**
     * 胡牌结构  -- 扎鸟前发
     */
    class WinCardObj {
        uid: number;
        opType: number;
        winType: number;
        GetType(): string;
    }
    /**
     * 玩家牌结构
     */
    class UserCardObj {
        uid: number;
        /**
         * 手牌
         */
        handCardSet: number[];
        /**
         * 已出牌
         */
        outCardSet: number[];
        /**
         * 花牌
         */
        flowerCardSet: number[];
        /**
         * 吃牌
         */
        eatSet: EatCardObj[];
        /**
         * 杠牌
         */
        barSet: BarCardObj[];
        /**
         * 碰牌
         */
        touchSet: TouchCardObj[];
        /**
         * 听牌对象集合
         */
        listenSet: ListenCardObj[];
        /**
         * 重连时发玩家的分值
         */
        totalPoints: number;
        /**
         * 玩家是否亮牌的标志 0不亮，1亮
         */
        showFlag: number;
        /**
         * 暗下的牌
         */
        triCardSet: number[];
        /**
         * 危牌
         */
        dangerCardSet: number[];
        /**
         * 胡牌列表,胡多次时用
         */
        winSet: WinCardObjNew[];
        /**
         * 血流血战
         *  血流血战下发玩家已经胡过的牌
         */
        winCardSet: number[];
        /**
         * 放风的牌
         */
        windCardSet: WindCardObj[];
        /**
         * 玩家字牌牌堆
         */
        userZiCard: UserZiCardObj[];
        /**
         * 结算展示偎牌
         */
        nestleCardSet: UserZiCardObj[];
        GetType(): string;
    }
    class MultiDetail {
        /**
         * 番数类型
         */
        multiType: MultiType;
        /**
         * 该番型输赢
         */
        reward: number;
        /**
         * 1：自摸，2：点炮，3：接炮，4：其他
         */
        type: number;
        /**
         * 漳浦麻将发送多个胡牌番型
         */
        multiSet: number[];
        GetType(): string;
    }
    class RewardObj {
        uid: number;
        nickname: string;
        /**
         * 每局总输赢
         */
        totalReward: number;
        /**
         * 花牌数量
         */
        flowerCardNum: number;
        /**
         * 番型输赢明细
         */
        multiDetailSet: MultiDetail[];
        /**
         * 玩家手牌
         */
        userCard: UserCardObj;
        /**
         * 赢牌类型 0:没赢,1:自摸 2:捡炮 3:放炮 4:金币场破产,5:扎杠胡,6:
         */
        winType: number;
        /**
         * 每局结算后的分数
         */
        points: number;
        /**
         * 动画效果 0:没有
         */
        animation: number;
        /**
         * 是否包赔	0:不是 1:是
         */
        fullPay: number;
        /**
         * 总番数,鸡平胡
         */
        totalMulti: number;
        /**
         * 番型集合,鸡平胡
         */
        multiSet: number[];
        /**
         * 是否爆胡 0:不是 1:是,鸡平胡
         */
        bomb: number;
        /**
         * 花牌数量,龙岩用
         */
        flowerBarNum: number;
        /**
         * 长沙麻将
         * 胡牌thisId
         */
        cardSet: number[];
        /**
         * 扎鸟thisId
         */
        birdSet: BirdObj[];
        /**
         * 卡五星
         */
        multiPiao: number;
        multiBar: number;
        /**
         * 输赢钻石倍率
         */
        betMulti: number;
        /**
         * 输赢类型,1表示钻石,2表示金币
         */
        betType: number;
        /**
         * 玩家中马的数量
         */
        winHorse: number;
        /**
         * 摸通时所有的胡牌列表
         */
        winCardList: WinCardObjNew[];
        /**
         * 好彩真人
         *  礼品券
         */
        giftVoucher: number;
        /**
         * 中心五
         *  特殊分
         */
        specialpoints: number;
        /**
         * 马牌
         */
        horseSet: HorseObj[];
        /**
         * 结算后的金币数
         */
        diamond: number;
        /**
         * 领取福卡进度(微信二人麻将)
         */
        extraBonus: number;
        /**
         * 领取福卡方式 1:看视频领取 2:分享领取 3:直接领取
         */
        type: number;
        GetType(): string;
    }
    /**
     * 字牌牌堆结构
     */
    class UserZiCardObj {
        /**
         * 类型
         */
        type: number;
        /**
         * 牌型分数
         */
        point: number;
        /**
         * 牌列表
         */
        cardList: number[];
        fromUid: number;
        GetType(): string;
    }
    class ChipsObj {
        uid: number;
        /**
         * 剩余筹码
         */
        remainder: number;
        GetType(): string;
    }
    class PointsObj {
        uid: number;
        points: number;
        GetType(): string;
    }
    class ListenCardObj {
        /**
         * 听哪一张
         */
        thisId: number;
        /**
         * 番数
         */
        multi: number;
        /**
         * 剩余张数
         */
        remainNum: number;
        /**
         * 剩余张数,简写省流量
         */
        num: number;
        GetType(): string;
    }
    class ListenObj {
        listenCardSet: ListenCardObj[];
        /**
         * 简写省流量
         */
        lc: ListenCardObj[];
        GetType(): string;
    }
    class UserListenObj {
        uid: number;
        listenCardSet: ListenCardObj[];
        /**
         * 简写省流量
         */
        lc: ListenCardObj[];
        GetType(): string;
    }
    class UserOpObj {
        /**
         * 操作者玩家id
         */
        opId: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * +
     */
    class MultiObj {
        /**
         * 番数类型
         */
        multiType: number;
        /**
         * 番数值
         */
        multi: number;
        GetType(): string;
    }
    /**
     * +
     */
    class PropInfo {
        /**
         * 类型 1 购买自用 2 购买送人
         */
        purchaseType: number;
        /**
         * 道具Id
         */
        propId: number;
        /**
         * 购买玩家Id
         */
        sendId: number;
        /**
         * 接收玩家Id 送人时才有值
         */
        revcId: number;
        GetType(): string;
    }
    /**
     * +
     */
    class UserGifts {
        uid: number;
        charm: number;
        nickname: string;
        GetType(): string;
    }
    /**
     * +
     */
    class UserProp {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 玩家积分
         */
        points: number;
        /**
         * vip卡有效期
         */
        vipCardEffect: number;
        /**
         * 双倍卡有效期
         */
        doubleCardEffect: number;
        GetType(): string;
    }
    /**
     * 出牌结构
     */
    class CardOutObj {
        thisId: number;
        /**
         * 是否被其他玩家吃碰杠
         */
        isOp: boolean;
        GetType(): string;
    }
    /**
     * 进入房间
     */
    class EnterMahjongCmd_C {
        roomId: number;
        /**
         * 全局唯一房间id
         */
        globalRoomId: number;
        /**
         * 游戏id
         */
        gameId: number;
        /**
         * 子游戏类型
         */
        subGameType: number;
        /**
         * 初始化手牌id,测试用
         */
        handCardInitId: number;
        /**
         * 播放录像主角id,如果指定则播放录像
         */
        recordUid: number;
        /**
         * 机器人id,可以选择不同的智商
         */
        robotId: number;
        /**
         * 启用机器人数量
         */
        robotNum: number;
        GetType(): string;
    }
    /**
     * 海南麻将动画提示
     */
    class DZHNShowMsgCartoon_S {
        /**
         * 动画id
         */
        cartoonid: number;
        uid: number;
        GetType(): string;
    }
    class EnterMahjongCmd_S {
        resultCode: number;
        desc: string;
        roomState: Cmd.RoomState;
        /**
         * 房主uid
         */
        ownerId: number;
        /**
         *  2.5D
         *  牌墙
         */
        greatWall: GreatWall[];
        GetType(): string;
    }
    class LackInfo {
        uid: number;
        cardType: number;
        GetType(): string;
    }
    class ReConnectMahjongCmd_S {
        /**
         * 自己的手牌
         */
        userCard: UserCardObj;
        /**
         * 其他人手牌,机器人用
         */
        otherCard: UserCardObj[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 当前是第几局
         */
        curGameNbr: number;
        /**
         * 进入房间id
         */
        roomId: number;
        /**
         * 庄家id
         */
        bankerId: number;
        /**
         * 东家id
         */
        eastUid: number;
        /**
         * 翻出的金牌
         */
        goldCardSet: number[];
        /**
         * 圈风
         */
        circle: number;
        /**
         * 门风
         */
        gate: number;
        /**
         * 玩家缺牌数据
         */
        lackInfos: LackInfo[];
        /**
         * 听牌玩家uid
         */
        listenUidSet: number[];
        /**
         * 金华  底分
         */
        betPoint: number;
        /**
         * 宁波 翻牌 连庄次数
         */
        displayCardSet: number[];
        bankerNum: number;
        /**
         * 梅州
         */
        horseUid: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 四川 胡牌的玩家
         */
        winUser: number[];
        /**
         * 0 无金牌 1展示的牌是金牌并且有3张  2展示的牌是金牌 不删除 3展示牌的下一张是金牌 并且只有三张
         */
        goldType: number;
        /**
         * 听牌集合
         */
        winCardSet: ListenCardObj[];
        /**
         *  丽水
         *  打出去的所有牌 不区分玩家
         */
        allOutCard: number[];
        /**
         *  古田麻将
         * 古田麻将随机花牌数据
         */
        rfc: number;
        /**
         * 古田麻将裂开翻金数量
         */
        num: number;
        /**
         * 古田麻将翻金类型
         */
        turnType: number;
        /**
         * 古田麻将打牌方向
         */
        direction: number;
        /**
         *  中心五
         *  当前角
         */
        curJiao: number;
        /**
         * 当前角第几局
         */
        curNbr: number;
        /**
         * 2.5D
         *  起始风位
         */
        getCardDirection: number;
        /**
         * 起始摞数
         */
        startLuo: number;
        /**
         * 顺序摸牌张数
         */
        bGetNum: number;
        /**
         * 逆序摸牌张数
         */
        eGetNum: number;
        /**
         *  拉米
         *  出牌区的牌
         */
        allHalfCard: CardLine[];
        /**
         * 废牌区的牌
         */
        allDisCard: number[];
        /**
         * 整牌区的牌
         */
        allCompCard: CardLine[];
        /**
         * 顾乡恩施
         *  痞癞杠信息
         */
        piGoldBarMes: PiGoldBarMes[];
        /**
         * 文安麻将
         * 拉庄
         */
        laZhuangMes: LaZhuangMes[];
        /**
         * 爬坡次数,新疆杠后
         */
        climb: number;
        /**
         * 三铺玩家uid
         */
        SanpuUserSet: number[];
        GetType(): string;
    }
    class PiGoldBarMes {
        uid: number;
        /**
         * 杠倍数
         */
        barMul: number;
        /**
         * 痞杠数
         */
        piBarCount: number;
        /**
         * 癞杠数
         */
        goldBarCount: number;
        /**
         * 打痞1，打癞2
         */
        isOutGold: number;
        GetType(): string;
    }
    class LaZhuangMes {
        uid: number;
        /**
         * 拉庄分
         */
        point: number;
        GetType(): string;
    }
    class CardLine {
        /**
         * 牌
         */
        thisId: number[];
        /**
         * 行号
         */
        pos: number;
        GetType(): string;
    }
    /**
     * 广播玩家进入房间
     */
    class EnterMahjongCmd_Brd {
        userInfo: Cmd.UserBaseInfo;
        /**
         * 是否第一次进
         */
        isFirst: boolean;
        /**
         * 谁的牌,放录像用,录像播放时是庄家id
         */
        ownerid: number;
        /**
         * 是否已听牌,1表示已听牌
         */
        listened: number;
        GetType(): string;
    }
    /**
     * Echo应答,服务器探测玩家是否活着
     */
    class ServerEchoMahjongCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     * Echo应答,客户端探测服务器
     */
    class ClientEchoMahjongCmd_SC {
        /**
         * echo标志
         */
        id: number;
        /**
         * echo描述,原封不动返回
         */
        desc: string;
        GetType(): string;
    }
    /**
     * 在线状态
     */
    class OnlineStateMahjongCmd_Brd {
        uid: number;
        /**
         * 在线状态0断线,1在线,2离开,3,网络差OnlineState
         */
        state: number;
        /**
         * 状态变化后的秒数
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 离开房间
     */
    class LeaveMahjongCmd_C {
        /**
         * 离开状态 0 返回大厅 1 暂时离开 2 断线
         */
        state: number;
        GetType(): string;
    }
    class LeaveMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播玩家离开房间
     */
    class LeaveMahjongCmd_Brd {
        resultCode: number;
        desc: string;
        uid: number;
        state: number;
        GetType(): string;
    }
    /**
     * 加底注
     */
    class AddBasePoint_C {
        /**
         * 加注的分数 0表示不加
         */
        point: number;
        GetType(): string;
    }
    /**
     * 玩家加注广播,有时间发来表示通知开始加注
     */
    class AddBasePoint_Brd {
        /**
         * 已下注玩家列表
         */
        userOpList: MultiPointSet[];
        /**
         * 操作时间（整个加注阶段的时间）
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 加注结构
     */
    class MultiPointSet {
        /**
         * 加注的玩家id
         */
        uid: number;
        /**
         * 加注的分数 0表示不加
         */
        point: number;
        GetType(): string;
    }
    /**
     * 请求准备
     */
    class ReadyStartMahjongCmd_C {
        /**
         * 判断是准备还是取消准备
         */
        type: number;
        /**
         * 单局飘分
         */
        multiPiao: number;
        /**
         * 1表示重新洗牌
         */
        shuffle: number;
        /**
         * 1:匹配场能挑战更高场次 闯关模式(2:复活 3:重新报名)
         */
        challenge: number;
        GetType(): string;
    }
    /**
     * 取消准备
     */
    class CancelReadyMahjongCmd_Brd {
        /**
         * 取消准备玩家ID
         */
        uid: number;
        GetType(): string;
    }
    class ReadyStartMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播准备
     */
    class ReadyStartMahjongCmd_Brd {
        uid: number;
        /**
         * 所有已准备的玩家uid
         */
        readyUserSet: number[];
        /**
         * 单局飘分
         */
        multiPiao: number;
        GetType(): string;
    }
    /**
     * 开局广播
     */
    class StartMahjongCmd_Brd {
        /**
         * 当前是第几局
         */
        curGameNbr: number;
        /**
         * 无大厅状态时用
         */
        roomId: number;
        /**
         * 圈风
         */
        circle: number;
        /**
         * 门风
         */
        gate: number;
        /**
         * 金华
         *  连庄次数
         */
        bankerNum: number;
        /**
         * 本局底分
         */
        betPoint: number;
        /**
         * 南京麻将，这局是不是有比下胡：0，不是；1，是
         */
        is_double: number;
        /**
         * 中心五 当前第几角
         */
        curJiao: number;
        /**
         * 中心五 本角第几局
         */
        curNbr: number;
        /**
         * 中心五 是否重新开始一角 1:是
         */
        restart: number;
        /**
         * 爬坡次数,新疆杠后
         */
        climb: number;
        GetType(): string;
    }
    class GreatWall {
        /**
         * 风位
         */
        direction: number;
        /**
         * 牌的总数
         */
        cardNum: number;
        GetType(): string;
    }
    /**
     * 定庄打筛子
     */
    class SetBankerMahjongCmd_Brd {
        dice: DiceObj;
        /**
         * 庄家id
         */
        bankerId: number;
        /**
         * 东家id
         */
        eastUid: number;
        /**
         * 定庄倒计时
         */
        sec: number;
        /**
         * 梅州
         */
        horseUid: number;
        /**
         * 倍率
         */
        multi: number;
        lastdice: DiceObj;
        /**
         *  2.5D 麻将
         *  牌墙
         */
        greatWall: GreatWall[];
        /**
         * 开始抓拍的风位
         */
        getCardDirection: number;
        /**
         * 开始的摞数
         */
        startLuo: number;
        GetType(): string;
    }
    /**
     * 开局拉庄
     */
    class SetLaZhuangMahjongCmd_Brd {
        uids: number[];
        /**
         * 拉庄标记
         */
        laZhuang: boolean;
        /**
         * 拉庄倒计时
         */
        sec: number;
        GetType(): string;
    }
    class LaZhuangMahjongCmd_Brd {
        uid: number;
        /**
         * 拉庄分
         */
        point: number;
        GetType(): string;
    }
    class LaZhuangMahjongCmd_C {
        /**
         * 拉庄分
         */
        point: number;
        GetType(): string;
    }
    /**
     * 开局发牌
     */
    class SelfCardMahjongCmd_S {
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 自己的手牌
         */
        userCard: UserCardObj;
        /**
         * 其他人手牌,机器人用
         */
        otherCard: UserCardObj[];
        /**
         * 庄家第一张牌倒计时
         */
        sec: number;
        /**
         * 庄家第十四张牌,只有庄加有
         */
        bankerThisId: number;
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 南京麻将用开局花杠
         */
        flbarUser: number[];
        /**
         * 洗牌者id
         */
        shuffleUid: number;
        GetType(): string;
    }
    /**
     * 原缺通知
     */
    class OriginalLackOpCmd_S {
        GetType(): string;
    }
    /**
     * 原缺等待时间
     */
    class OriginalLackOpTimeCmd_Brd {
        sec: number;
        GetType(): string;
    }
    /**
     * 原缺操作
     */
    class OriginalLackOpCmd_C {
        GetType(): string;
    }
    /**
     * 原缺操作广播
     */
    class OriginalLackOpCmd_Brd {
        uid: number;
        cardSet: number[];
        GetType(): string;
    }
    /**
     * 定缺通知
     */
    class EnsureLackOpCmd_S {
        /**
         * 万条筒
         */
        cardType: number;
        sec: number;
        /**
         * 庄家id
         */
        bankerId: number;
        /**
         * 发给谁的，录像使用
         */
        ownerid: number;
        GetType(): string;
    }
    /**
     * 定缺操作
     */
    class EnsureLackOpCmd_C {
        /**
         * 万条筒
         */
        cardType: number;
        GetType(): string;
    }
    /**
     * 定缺操作广播
     */
    class EnsureLackOpCmd_Brd {
        uid: number;
        cardType: number;
        GetType(): string;
    }
    /**
     * 补花
     */
    class FlowerMahjongCmd_Brd {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 补给玩家手中的花牌,显示给所有玩家
         */
        flowerSet: number[];
        /**
         * 补给自己的牌,只会发给自己
         */
        myCardSet: number[];
        /**
         * 补牌后牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 2.5D是否是开局补花: 是 1  否 0
         */
        startRound: number;
        GetType(): string;
    }
    /**
     * 翻金
     */
    class TurnGoldMahjongCmd_Brd {
        /**
         * 翻出的金牌
         */
        cardSet: number[];
        /**
         * 翻金后牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 宁波 翻牌
         */
        displayCardSet: number[];
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 0 无金牌 1展示的牌是金牌并且有3张  2展示的牌是金牌 不删除 3展示牌的下一张是金牌 并且只有三张
         */
        goldType: number;
        /**
         *  古田麻将 随机花牌
         *  翻出来的随机花牌
         */
        randomFlowerCard: number;
        /**
         * 玩家uid
         */
        uid: number;
        /**
         *  2.5D
         * 翻金的数量
         */
        cardNum: number;
        GetType(): string;
    }
    /**
     * 摸牌（字牌）
     */
    class SendZiCardCmd_S {
        thisId: number;
        uid: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        /**
         * 打完之后可以听牌集合
         */
        listenSet: number[];
        /**
         * 听牌数量
         */
        listenObjSet: ListenObj[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        /**
         * 摸牌类型(2:庄家起手模拟发牌  10:吃碰后模拟发牌)
         */
        getCardType: number;
        /**
         * 吃牌列表
         */
        eatSet: EatCardObj[];
        /**
         * 抢胡牌列表
         */
        grabWinCardSet: number[];
        /**
         * 摸牌时更新一下听牌列表
         */
        winCardSet: ListenCardObj[];
        GetType(): string;
    }
    /**
     * 摸牌
     */
    class SendCardMahjongCmd_S {
        thisId: number;
        /**
         * MahjongOpCardType
         */
        opType: number[];
        /**
         * 是否杠后牌摸
         */
        isBar: number;
        /**
         * 打完之后可以听牌集合
         */
        listenSet: number[];
        /**
         * 听牌数量
         */
        listenObjSet: ListenObj[];
        /**
         * 可杠的牌id
         */
        barSet: number[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        goldOutCardSet: number[];
        /**
         * 可补张的牌id
         */
        supplySet: number[];
        triCard: number[];
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 打完之后可以听牌集合,简写省流量
         */
        ls: number[];
        /**
         * 听牌数量,简写省流量
         */
        los: ListenObj[];
        /**
         * 是否重置听牌信息
         */
        resetListen: number;
        /**
         * 厦门麻将有大牌模式下发跟牌数据
         */
        fcs: FollowCardSet;
        /**
         * 云霄麻将 听牌后的暗杠玩家可选择暗杠或明杠的牌id
         */
        darkBarSet: number[];
        /**
         * 摸牌类型(2:庄家起手模拟发牌  10:吃碰后模拟发牌)
         */
        getCardType: number;
        /**
         * 可叠加的风牌
         */
        windSet: number[];
        /**
         * 可换混的牌
         */
        replaceWindSet: number[];
        /**
         * 可亮中发白的牌组
         */
        showCardSet: number[];
        /**
         * 顧鄉恩施麻將第一個杠牌的人標誌
         */
        firstDoBar: number;
        /**
         * 金坎牌集
         */
        jinkanSet: number[];
        GetType(): string;
    }
    /**
     * 刷新指定玩家手牌
     */
    class RefreshUserCards_S {
        /**
         * 带刷新的玩家的牌
         */
        userCard: UserCardObj;
        GetType(): string;
    }
    /**
     * 叠加（换混）牌协议
     */
    class SuperPosition_CS {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 叠加牌的ID（如果inCardId存在该值表示需要换出的牌）
         */
        cardId: number;
        /**
         * 操作列表 MahjongOpCardType
         */
        opType: number[];
        /**
         * 操作后返回的风牌结构
         */
        windCardSet: WindCardObj;
        /**
         * 需要换入牌的ID
         */
        inCardId: number;
        /**
         * 操作时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 放风放喜堆结构
     */
    class WindCardObj {
        /**
         * 当前这堆牌的index（方便换混叠加）
         */
        index: number;
        /**
         * 玩家放风的牌
         */
        cardSet: number[];
        GetType(): string;
    }
    /**
     * 放风推荐牌
     */
    class WindCardThree {
        thisIdList: number[];
        GetType(): string;
    }
    /**
     * 放风
     */
    class SendWindMahjongCmd_CS {
        /**
         * 放风玩家uid
         */
        uid: number;
        /**
         * C:玩家是否放风false表示不放 S：玩家是否能放风true表示能放
         */
        state: boolean;
        /**
         * 玩家放的牌
         */
        cardList: WindCardObj;
        /**
         * 操作时间
         */
        sec: number;
        /**
         * 放风推荐牌
         */
        list: WindCardThree[];
        GetType(): string;
    }
    /**
     * 跟牌集合
     */
    class FollowCardSet {
        cardThisId: number[];
        GetType(): string;
    }
    /**
     * 大连打宝消息
     */
    class DaBaoMahjongCmd_C {
        /**
         * listenSet下标,
         */
        index: number;
        /**
         * listenSet的thisId,为了建容,0表示获取所有听牌列表
         */
        thisId: number;
        GetType(): string;
    }
    /**
     * 请求听牌提示,不能每次发,太浪费流量了
     */
    class ListenObjMahjongCmd_C {
        /**
         * listenSet下标,
         */
        index: number;
        /**
         * listenSet的thisId,为了建容,0表示获取所有听牌列表
         */
        thisId: number;
        GetType(): string;
    }
    class ListenObjMahjongCmd_S {
        /**
         * listenSet下标
         */
        index: number;
        /**
         * listenSet的thisId,为了建容
         */
        thisId: number;
        /**
         * 听牌数量,简写省流量
         */
        los: ListenObj;
        resultCode: number;
        GetType(): string;
    }
    class ListenObjThisId {
        thisId: number;
        /**
         * 听牌数量,简写省流量
         */
        los: ListenObj;
        GetType(): string;
    }
    class AllListenObjMahjongCmd_S {
        /**
         * 所有听牌数量,简写省流量
         */
        list: ListenObjThisId[];
        GetType(): string;
    }
    /**
     * 广播摸牌信息
     */
    class SendCardMahjongCmd_Brd {
        /**
         * 出牌者id
         */
        uid: number;
        /**
         * 出牌倒计时
         */
        sec: number;
        /**
         * 流局
         */
        isWin: number;
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * GM指令调试用,release版本不会发
         */
        thisId: number;
        /**
         * 是否起牌
         */
        stand: number;
        /**
         * 是否是开局四川换牌后的模拟发牌
         */
        isSichuan: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        /**
         * 出牌者座位id,用来换算uid,优化消息流量用
         */
        sid: number;
        /**
         * 摸牌类型(2:庄家起手模拟发牌  10:吃碰后模拟发牌  1:杠后摸牌)
         */
        getCardType: number;
        GetType(): string;
    }
    /**
     * 放弃一个操作
     */
    class CancelOpTypeMahjongCmd_CS {
        /**
         * 需要放弃的关键操作,加个日志,有玩家纠结时查日志用,只用来存录像
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * 请求出牌
     */
    class OutCardMahjongCmd_C {
        thisId: number;
        /**
         * 是否天听
         */
        isSkyListen: boolean;
        /**
         * 1请求听牌,MahjongOpCardType_Listen
         */
        listen: number;
        GetType(): string;
    }
    class OutCardMahjongCmd_S {
        thisId: number;
        winCardSet: ListenCardObj[];
        resultCode: number;
        desc: string;
        ws: ListenCardObj[];
        /**
         * 是否重置听牌信息
         */
        resetListen: number;
        GetType(): string;
    }
    /**
     * 字牌出牌完成消息(字牌用)
     */
    class OutCardSuccessCmd_Brd {
        /**
         * 出牌的id
         */
        thisId: number;
        uid: number;
        GetType(): string;
    }
    /**
     * 广播出牌内容
     */
    class OutCardMahjongCmd_Brd {
        /**
         * 出牌者id
         */
        uid: number;
        /**
         * 时间倒数
         */
        sec: number;
        thisId: number;
        /**
         * 错做类型集合
         */
        opType: number[];
        /**
         * 错做类型集合
         */
        eatSet: EatCardObj[];
        /**
         * 是否跟牌
         */
        isFollow: number;
        /**
         * 牌的类型,比如捉鸡牌
         */
        cardType: number;
        /**
         * 刷新其他玩家的听牌剩余张数
         */
        winCardSet: ListenCardObj[];
        /**
         * 是否有人可操作 1:有
         */
        isOp: number;
        /**
         * 出牌者座位id,用来换算uid,优化消息流量用
         */
        sid: number;
        /**
         * 游金值
         */
        isSwimGold: number;
        /**
         * 打痞1，打癩2
         */
        isOutGold: number;
        GetType(): string;
    }
    /**
     * GM指令,发所有牌堆给玩家
     */
    class HeapCardGmMahjongCmd_C {
        GetType(): string;
    }
    class KeyValueObj {
        id: number;
        value: string;
        GetType(): string;
    }
    /**
     * GM指令,发所有牌堆给玩家
     */
    class HeapCardGmMahjongCmd_S {
        /**
         * 牌堆剩余牌
         */
        cardSet: number[];
        /**
         * 牌型选择按钮
         */
        cardButton: KeyValueObj[];
        GetType(): string;
    }
    /**
     * GM指令,请求换一张牌
     */
    class ChangeCardGmMahjongCmd_C {
        /**
         * 旧牌
         */
        oldCardId: number;
        /**
         * 新牌,如果自己是操作者时发0,新牌通过摸牌消息发
         */
        newCardId: number;
        /**
         * 牌型ID
         */
        cardButtonId: number;
        GetType(): string;
    }
    /**
     * GM指令,请求换一张牌
     */
    class ChangeCardGmMahjongCmd_S {
        /**
         * 旧牌
         */
        oldCardId: number;
        /**
         * 新牌,如果自己是操作者时发0,新牌通过摸牌消息发
         */
        newCardId: number;
        winCardSet: ListenCardObj[];
        /**
         * 如果自己是操作者,就删除牌,否则就是换牌,
         */
        needDelete: number;
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        GetType(): string;
    }
    /**
     * 撤回一张牌,回放用
     */
    class RecallOneCardMahjongCmd_S {
        uid: number;
        /**
         * 撤回的牌
         */
        thisId: number;
        GetType(): string;
    }
    class RecallEatCardMahjongCmd_Brd {
        msg: EatCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallTouchCardMahjongCmd_Brd {
        msg: TouchCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallBarCardMahjongCmd_Brd {
        msg: BarCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallSupplyCardMahjongCmd_Brd {
        msg: SupplyCardMahjongCmd_Brd;
        GetType(): string;
    }
    class RecallWinCardMahjongCmd_Brd {
        msg: WinCardMahjongCmd_Brd;
        GetType(): string;
    }
    class HaveSanPuSuccessCmd_Brd {
        /**
         * 三铺者id
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 四川开局换牌用
     */
    class exChangeCardMahjongCmd_S {
        /**
         * 开局换牌时候数量少于3个的花色
         */
        disType: number[];
        /**
         * 时间
         */
        opcount: number;
        /**
         * 庄家id 防止此协议重连报错
         */
        bankerId: number;
        /**
         * 买牌标识: 0:未买牌; 1:买牌
         */
        bcs: number;
        /**
         * 是否可选不同花色 1:可以 0:不可以
         */
        isSame: number;
        /**
         * 发给谁的，录像使用
         */
        ownerid: number;
        GetType(): string;
    }
    /**
     * 四川开局换牌用
     */
    class exChangeCardMahjongCmd_C {
        /**
         * 开局换牌需要更换的牌
         */
        cardId: number[];
        GetType(): string;
    }
    /**
     * 四川开局换牌用
     */
    class exChangeCardMahjongCmd_Brd {
        /**
         * 已经换牌的玩家
         */
        userId: number;
        /**
         * 如果没有手动操作，系统自动挑选3张牌
         */
        cardId: number[];
        GetType(): string;
    }
    /**
     * 万州麻将买牌广播
     */
    class BuyCardMahjongCmd_Brd {
        /**
         * 买牌时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 玩家请求买牌
     */
    class UserBuyCardMahjongCmd_C {
        /**
         * 是否买牌标示，0:取消; 1:买牌
         */
        state: number;
        GetType(): string;
    }
    /**
     * 取消操作牌
     */
    class CancelOpMahjongCmd_C {
        /**
         * 取消操作台里的第一个操作
         */
        firstType: number;
        GetType(): string;
    }
    class CancelOpMahjongCmd_S {
        /**
         * 兼容金华 用于区分敲响和胡 2:取消敲响
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 请求胡牌
     */
    class WinMahjongCmd_C {
        GetType(): string;
    }
    /**
     * 胡牌广播
     */
    class WinCardMahjongCmd_Brd {
        /**
         * 其他人手牌 目前来说只要手牌handCardSet
         */
        otherCard: UserCardObj[];
        /**
         * 胡牌的玩家
         */
        winTypeSet: WinCardObj[];
        /**
         * 这里加一个放炮玩家id,方便显示放炮动画
         */
        shootId: number;
        GetType(): string;
    }
    /**
     * 扎鸟广播
     */
    class BirdMahjongCmd_Brd {
        birdSet: BirdObj[];
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        GetType(): string;
    }
    class WinMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class WinPointObj {
        uid: number;
        point: number;
        GetType(): string;
    }
    /**
     * 多次胡牌的过程中广播
     */
    class WinMahjongCmd_Brd {
        /**
         * 胡牌人id
         */
        uid: number;
        /**
         * 不填表示自摸
         */
        thisId: number;
        /**
         * 不填表示自摸
         */
        shootId: number;
        /**
         * 胡牌动画,不填就是默认
         */
        animation: number;
        /**
         * 中途结算每个人的分数情况
         */
        pointSet: WinPointObj[];
        GetType(): string;
    }
    class HorseObj {
        thisId: number;
        /**
         * 0:没中 1:中马
         */
        bWin: number;
        GetType(): string;
    }
    class WinCardObjNew {
        /**
         * 不填表示自摸
         */
        shootId: number;
        thisId: number;
        GetType(): string;
    }
    /**
     * 广播胡牌结果
     */
    class WinRetMahjongCmd_Brd {
        rewardSet: RewardObj[];
        /**
         * 胡牌 牌id
         */
        thisId: number;
        /**
         * 马牌 凤城麻将宝牌
         */
        horseSet: HorseObj[];
        /**
         * 中马数
         */
        winHorse: number;
        /**
         * 放炮 uid
         */
        shootId: number;
        /**
         * 中马玩家uid
         */
        winHorseId: number;
        /**
         * 长沙麻将
         */
        isWin: number;
        /**
         * 梅州
         */
        horseUid: number;
        /**
         * 宝牌	  凤城麻将
         */
        baoCardThisId: number;
        /**
         * 扎鸟thisId
         */
        birdSet: BirdObj[];
        /**
         * 牌堆剩余牌
         */
        leftCard: number[];
        /**
         * 洗牌者id
         */
        shuffleUid: number;
        /**
         * 不填或者0表示免费,填了就是消耗几个钻
         */
        shuffleCost: number;
        GetType(): string;
    }
    class ChickenStruct {
        uid: number;
        /**
         * 我的分（倒赔或赢）
         */
        myself_grade: number;
        /**
         * 别人对我的影响分（赔或赢）
         */
        others_grade: number;
        /**
         * 冲锋鸡
         */
        rush_chicken: number;
        /**
         * 责任鸡
         */
        response_chicken: number;
        /**
         * 上鸡baseid
         */
        up_baseid: number;
        /**
         * 下鸡baseid
         */
        down_baseid: number;
        /**
         * 上鸡
         */
        up_chicken: number;
        /**
         * 下鸡
         */
        down_chicken: number;
        /**
         * 闷豆
         */
        dark: number;
        /**
         * 明豆
         */
        light: number;
        /**
         * 爬坡豆
         */
        climb: number;
        /**
         * 是否听牌
         */
        is_listen: boolean;
        /**
         * 查缺分数
         */
        lack: number;
        /**
         * 原缺
         */
        originalLack: number;
        /**
         * 冲锋乌骨鸡
         */
        rush_black_chicken: number;
        /**
         * 责任乌骨鸡
         */
        response_black_chicken: number;
        /**
         * 普通乌骨鸡
         */
        normal_black_chicken: number;
        /**
         * 上鸡鸡牌数量
         */
        up_chicken_num: number;
        /**
         * 下鸡鸡牌数量
         */
        down_chicken_num: number;
        /**
         * 点明豆数量
         */
        sub_light: number;
        /**
         * 本鸡
         */
        self_chicken: number;
        GetType(): string;
    }
    /**
     * 抓鸡
     */
    class CashChickenCmd_Brd {
        chicken_card_id: number;
        rewardSet: RewardObj[];
        chickenSet: ChickenStruct[];
        /**
         * 兼容
         */
        cid: number;
        /**
         * 兼容
         */
        rs: RewardObj[];
        /**
         * 兼容
         */
        cs: ChickenStruct[];
        GetType(): string;
    }
    /**
     * 天听000000000000000000
     */
    class SkyListenCmd_S {
        sec: number;
        GetType(): string;
    }
    /**
     * 只在开局天听使用
     */
    class SkyListenCmd_C {
        GetType(): string;
    }
    class SkyListenCmd_Brd {
        uid: number;
        GetType(): string;
    }
    /**
     * 请求杠牌
     */
    class BarCardMahjongCmd_C {
        thisId: number;
        /**
         * 1请求听牌,MahjongOpCardType_Listen
         */
        listen: number;
        /**
         * 云霄麻将 暗杠选择暗杠还是明杠 1:明杠 2:暗杠
         */
        typ: number;
        /**
         * 云南麻将 杠牌选择金牌数量
         */
        goldnum: number;
        GetType(): string;
    }
    /**
     * 请求选牌
     */
    class PickCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class PickCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class BarCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class TwoBarCardMahjongCmd_Brd {
        /**
         * 云南麻将杠牌牌堆
         */
        uid: number[];
        GetType(): string;
    }
    class PickBarCardMahjongCmd_S {
        uid: number;
        GetType(): string;
    }
    class SendNoDiamondCmd_S {
        uid: number;
        GetType(): string;
    }
    /**
     * 任丘  请求风,箭
     */
    class FengCardMahjongCmd_C {
        thisId: number;
        /**
         * 1请求听牌,MahjongOpCardType_Listen
         */
        listen: number;
        /**
         * 云霄麻将 暗杠选择暗杠还是明杠 1:明杠 2:暗杠
         */
        typ: number;
        /**
         * 1风2箭
         */
        tag: number;
        GetType(): string;
    }
    class FengCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 杠牌堆结构
     */
    class BarCardObj {
        /**
         * 碰牌的玩家
         */
        uid: number;
        /**
         * 碰牌后的三张thisid
         */
        thisId: number;
        /**
         * 碰牌后的三张thisid
         */
        cardSet: number[];
        /**
         * 被碰的玩家
         */
        fromUid: number;
        /**
         * 杠的类型MahjongOpCardType_BarOther
         */
        barType: number;
        /**
         * 虚拟操作,优先级问题
         */
        fake: number;
        GetType(): string;
    }
    /**
     * 长沙麻将杠牌结构
     */
    class BarDealCardObj {
        thisId: number;
        /**
         * 是否胡这张牌
         */
        isHu: number;
        GetType(): string;
    }
    /**
     * 广播提牌
     */
    class LiftCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: BarCardObj[];
        /**
         * 只在碰杠时 是否可抢杠胡 分别发送 1:可胡 0:不可胡
         */
        canWin: number;
        thisId: number;
        /**
         * 类型
         */
        card_type: number;
        /**
         * 录像使用的ownerid
         */
        ownerid: number;
        /**
         * 在亮中发白时候可以被抢碰 1:可以碰 2:不可碰
         */
        canTouch: number;
        GetType(): string;
    }
    /**
     * 广播杠牌
     */
    class BarCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: BarCardObj;
        /**
         * 只在碰杠时 是否可抢杠胡 分别发送 1:可胡 0:不可胡
         */
        canWin: number;
        thisId: number;
        /**
         * 类型
         */
        card_type: number;
        /**
         * 录像使用的ownerid
         */
        ownerid: number;
        /**
         * 在亮中发白时候可以被抢碰 1:可以碰 2:不可碰
         */
        canTouch: number;
        GetType(): string;
    }
    /**
     * 开杠打筛子
     */
    class BarDiceMahjongCmd_Brd {
        dice: DiceObj;
        /**
         * 开杠uid
         */
        barUid: number;
        GetType(): string;
    }
    /**
     * 开杠发牌 --- 其他人看到自己摸了两张牌
     */
    class BarDealCardMahjongCmd_Brd {
        uid: number;
        /**
         * 牌堆剩余牌数
         */
        heapCardNum: number;
        /**
         * 杠牌出牌倒计时
         */
        sec: number;
        /**
         * GM指令调试用,release版本不会发
         */
        cardSet: number[];
        /**
         * 牌堆剩余牌数,简写省流量
         */
        hn: number;
        GetType(): string;
    }
    class BarDealCardMahjongCmd_S {
        /**
         * 牌信息
         */
        cardSet: BarDealCardObj[];
        /**
         * 可以进行的操作
         */
        opType: number[];
        GetType(): string;
    }
    /**
     * 开杠玩家操作
     */
    class BarOpMahjongCmd_C {
        opType: number;
        GetType(): string;
    }
    /**
     * 海底漫游 轮转广播
     */
    class SeaRoamTurnMahjongCmd_Brd {
        uid: number;
        sec: number;
        GetType(): string;
    }
    /**
     * 海底漫游操作请求
     */
    class SeaRoamMahjongCmd_C {
        opType: number;
        GetType(): string;
    }
    /**
     * 海底牌广播
     */
    class SeaFloorCardMahjongCmd_Brd {
        uid: number;
        thisId: number;
        /**
         * 多加了一张漫游牌
         */
        thisId2: number;
        GetType(): string;
    }
    /**
     * 开杠打牌广播
     */
    class BarOutCardMahjongCmd_Brd {
        oneThisId: number;
        twoThisId: number;
        /**
         * 可以进行的操作
         */
        opType: number[];
        barSet: number[];
        supplySet: number[];
        touchSet: number[];
        eatSet: EatCardObj[];
        uid: number;
        sec: number;
        threeThisId: number;
        fourThisId: number;
        GetType(): string;
    }
    /**
     * 比牌牌堆
     */
    class CompareCardObj {
        one: number;
        two: number;
        /**
         * 比掉的牌的id(先弃用)
         */
        thisId: number;
        /**
         * 比牌组合列表
         */
        compareGroup: CompareCardObj[];
        GetType(): string;
    }
    /**
     * 碰牌堆结构
     */
    class EatCardObj {
        /**
         * 碰牌的玩家
         */
        uid: number;
        /**
         * 碰牌后的三张thisid
         */
        thisId: number;
        one: number;
        two: number;
        /**
         * 被碰的玩家
         */
        fromUid: number;
        /**
         * 虚拟操作,优先级问题
         */
        fake: number;
        /**
         * 比牌牌堆
         */
        compareSet: CompareCardObj[];
        /**
         * 比牌用到的thisIds集合
         */
        thisIds: number[];
        GetType(): string;
    }
    /**
     * 比牌请求
     */
    class CompareCardCmd_C {
        /**
         * 比牌
         */
        obj: EatCardObj;
        GetType(): string;
    }
    /**
     * 比牌请求返回
     */
    class CompareCardCmd_Brd {
        /**
         * 直接返回吃牌的结构吧
         */
        obj: EatCardObj;
        GetType(): string;
    }
    /**
     * 请求吃牌
     */
    class EatCardMahjongCmd_C {
        one: number;
        two: number;
        /**
         * 特殊情况使用,不安全,目前长沙麻将杠用
         */
        thisId: number;
        GetType(): string;
    }
    class EatCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    class EatCardMahjongCmd_Brd {
        obj: EatCardObj;
        GetType(): string;
    }
    /**
     * 碰牌堆结构
     */
    class TouchCardObj {
        /**
         * 碰牌的玩家
         */
        uid: number;
        /**
         * 碰牌后的三张thisid
         */
        thisId: number;
        /**
         * 碰牌后的三张thisid
         */
        cardSet: number[];
        /**
         * 被碰的玩家
         */
        fromUid: number;
        /**
         * 虚拟操作,优先级问题
         */
        fake: number;
        GetType(): string;
    }
    /**
     * 请求碰牌
     */
    class TouchCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class TouchCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播碰牌
     */
    class TouchCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: TouchCardObj;
        /**
         * 类型
         */
        card_type: number;
        GetType(): string;
    }
    /**
     * 请求听牌
     */
    class ListenCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class ListenCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        /**
         * 玩家听牌对象集合
         */
        listenCard: ListenCardObj[];
        GetType(): string;
    }
    /**
     * 广播听牌
     */
    class ListenCardMahjongCmd_Brd {
        uid: number;
        thisId: number;
        GetType(): string;
    }
    /**
     * 广播金坎
     */
    class JinkanCardMahjongCmd_Brd {
        uid: number;
        jinkancard: number[];
        GetType(): string;
    }
    /**
     * 广播凑拍
     */
    class CollectCardMahjongCmd_Brd {
        uid: number;
        GetType(): string;
    }
    /**
     * 请求亮牌
     */
    class ShowCardMahjongCmd_S {
        listenSet: number[];
        listenObjSet: ListenObj[];
        GetType(): string;
    }
    class ShowCardMahjongCmd_C {
        /**
         * 请求亮牌玩家要胡的牌，危险的牌
         */
        triCard: number[];
        GetType(): string;
    }
    class ShowCardMahjongCmd_Brd {
        uid: number;
        handCardSet: number[];
        listenSet: number[];
        /**
         * 1:扣牌
         */
        fall: number;
        GetType(): string;
    }
    /**
     * 请求漂分
     */
    class ReqPiaoMahjongCmd_C {
        multiPiao: number;
        GetType(): string;
    }
    class ReqPiaoMahjongCmd_S {
        /**
         * 海南麻将返回上局嘎的值
         */
        multiPiao: number;
        GetType(): string;
    }
    class ReqPiaoMahjongCmd_Brd {
        /**
         * 漂0/1/2分  兼容海南麻将0~5
         */
        multiPiao: number;
        uid: number;
        GetType(): string;
    }
    class StartPiaoMahjongCmd_Brd {
        sec: number;
        /**
         * 兼容丹东漂分选项
         */
        multiPiao: number;
        GetType(): string;
    }
    /**
     * 结束漂分广播
     */
    class EndPiaoMahjongCmd_Brd {
        GetType(): string;
    }
    /**
     * 托管
     */
    class HostMahjongCmd_C {
        /**
         * 0,不托管,1,拿啥打啥型,2,能吃吃,能碰碰,检查基础牌型型
         */
        hostType: number;
        GetType(): string;
    }
    class HostMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 托管广播
     */
    class HostMahjongCmd_Brd {
        uid: number;
        /**
         * 0,不托管,1,拿啥打啥型,2,能吃吃,能碰碰,检查基础牌型型
         */
        hostType: number;
        /**
         * 托管时是否需要显示取消托管 1:不需要
         */
        showType: number;
        GetType(): string;
    }
    /**
     * 超时等待广播
     */
    class TimeOutWaitMahjongCmd_Brd {
        /**
         * 超时玩家uid
         */
        uid: number;
        /**
         * 超时玩家昵称
         */
        nickname: string;
        /**
         * 超时解散倒计时
         */
        leftsec: number;
        /**
         * 超时解散倒计时结束后超时的时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 刷新玩家筹码广播
     */
    class RefreshChipsMahjongCmd_Brd {
        chipsSet: ChipsObj[];
        GetType(): string;
    }
    class RefreshPointsMahjongCmd_Brd {
        pointSet: PointsObj[];
        /**
         * 血流定义刮风或者下雨: 1 刮风, 2 下雨
         */
        wind_or_rain: number;
        /**
         * 所胡的牌
         */
        win_card: number;
        GetType(): string;
    }
    /**
     * 刷新玩家听牌集合
     */
    class RefreshListenCardSetMahjongCmd_S {
        resultCode: number;
        desc: string;
        userListenCardSet: UserListenObj[];
        winCardSet: ListenCardObj[];
        GetType(): string;
    }
    /**
     * 请求踢人
     */
    class KickMahjongCmd_C {
        /**
         * 踢人玩家
         */
        uid: number;
        /**
         * 被踢玩家
         */
        kickUid: number;
        GetType(): string;
    }
    class KickMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 踢人广播
     */
    class KickMahjongCmd_Brd {
        /**
         * 被踢玩家
         */
        uid: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 送礼
     */
    class SendGiftMahjongCmd_C {
        /**
         * 礼物内容
         */
        gift: Cmd.GiftsInfo;
        GetType(): string;
    }
    class SendGiftMahjongCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class SendGiftMahjongCmd_Brd {
        /**
         * 送礼玩家
         */
        gift: Cmd.GiftsInfo;
        /**
         * 玩家剩余钻石
         */
        diamond: number[];
        GetType(): string;
    }
    class UserRecord {
        uid: number;
        headurl: string;
        nickname: string;
        /**
         * 胡牌次数
         */
        win: number;
        /**
         * 中马次数
         */
        horse: number;
        /**
         * 花单吊次数
         */
        singleFlowerHang: number;
        /**
         * 花单花次数
         */
        doubleFlowerHang: number;
        /**
         * 总成绩
         */
        totalScore: number;
        /**
         * 是否房主 1:是 0:不是
         */
        isOwner: boolean;
        /**
         * 是否大赢家 1:是 0:不是
         */
        isWinner: number;
        /**
         * 玩家总缺分
         */
        lack: number;
        /**
         * 房主小费
         */
        tip: number;
        /**
         * 开杠次数,鸡平胡
         */
        bar: number;
        /**
         * 放炮次数,鸡平胡
         */
        fangpao: number;
        /**
         * 最大番数,鸡平胡
         */
        maxMulti: number;
        /**
         * 自摸次数
         */
        selfWin: number;
        /**
         * 长沙麻将
         *  开杠次数
         */
        barNum: number;
        /**
         * 中鸟次数
         */
        birdNum: number;
        /**
         * 放炮次数
         */
        shootNum: number;
        /**
         * 卡五星
         */
        showCardNum: number;
        fangpaoNum: number;
        /**
         * 宁德麻将
         *  平胡次数
         */
        normalWinNum: number;
        /**
         * 自摸次数
         */
        zimoWinNum: number;
        /**
         * 特殊胡牌次数
         */
        SpecialWinNum: number;
        /**
         * 起手小胡次数
         */
        startWinNum: number;
        /**
         * 胡牌次数,WHJ兼容用,估计会干掉
         */
        winNum: number;
        /**
         * 单游次数,WHJ兼容用,估计会干掉
         */
        singleNum: number;
        /**
         * 双游次数,WHJ兼容用,估计会干掉
         */
        doubleNum: number;
        /**
         * 三游次数,WHJ兼容用,估计会干掉
         */
        threeNum: number;
        /**
         * 开杠次数,WHJ兼容用,估计会干掉
         */
        BarNum: number;
        /**
         * 宁德麻将
         * 每个玩家每局输赢分数
         */
        perSorce: number[];
        /**
         * 四川
         *  接炮次数
         */
        jiepao: number;
        /**
         * 点炮次数
         */
        dianpao: number;
        /**
         * 暗杠次数
         */
        bar_self: number;
        /**
         * 明杠次数
         */
        bar_other: number;
        /**
         * 查大叫次数
         */
        chadajiao: number;
        /**
         * 红包
         */
        redpack: number;
        /**
         * 承包分
         */
        chengbaofen: number;
        /**
         * 未听牌
         */
        nolisten: number;
        /**
         * 基本分
         */
        basicpoint: number;
        /**
         * 特殊分
         */
        specialpoint: number;
        /**
         * 每角明细
         */
        jiaoSet: JiaoObj[];
        /**
         * 恩施
         * 痞杠
         */
        pi_bar: number;
        /**
         * 癞杠
         */
        gold_bar: number;
        /**
         * 扎杠胡次数
         */
        zhaWinNum: number;
        /**
         * 抢杠胡次数
         */
        grabBarWinNum: number;
        /**
         * 瑞金
         *  飞的次数
         */
        feiNum: number;
        /**
         * 四宝次数
         */
        baoNum: number;
        GetType(): string;
    }
    class JiaoObj {
        basicpoint: number;
        specialpoint: number;
        /**
         * 每角枯桶
         */
        kutong: number;
        GetType(): string;
    }
    /**
     * 总成绩
     */
    class FinalScoreMahjongCmd_C {
        /**
         * 房间id
         */
        roomId: number;
        GetType(): string;
    }
    class FinalScoreMahjongCmd_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        GetType(): string;
    }
    class FinalScoreMahjongCmd_Brd {
        /**
         * 房间id
         */
        roomId: number;
        /**
         * 总成绩数据
         */
        recordInfo: UserRecord[];
        /**
         * 1:解散房间	2:正常结束  3:本角结算
         */
        state: number;
        /**
         * 解散原因
         */
        reason: string;
        /**
         * 如果是匹配号房间,显示出匹配号
         */
        matchId: number;
        /**
         * 闯关排名
         */
        rank: number;
        /**
         * 闯关奖励
         */
        prize: Cmd.RewardItem[];
        /**
         * 失败复活消耗
         */
        cost: Cmd.RewardItem;
        /**
         * 金蛋
         */
        goldEgg: number;
        /**
         * 领取奖励类型1:看视频领取 2:分享领取 3:直接领取
         */
        type: number;
        /**
         * 复活方式 1:视频复活 2:分享复活 3:直接复活
         */
        reviveType: number;
        GetType(): string;
    }
    /**
     * 开局操作集
     */
    class StartNewRoundOpCmd_S {
        opType: number[];
        /**
         * 庄家开局可杠
         */
        barSet: number[];
        GetType(): string;
    }
    /**
     * 起手小胡等待时间
     */
    class StartNewRoundOpTimeCmd_Brd {
        sec: number;
        GetType(): string;
    }
    /**
     * 开局请求操作
     */
    class StartNewRoundOpCmd_C {
        /**
         * MahjongOpCardType
         */
        opType: number;
        /**
         * 中途四喜需要把id发上来
         */
        thisId: number;
        GetType(): string;
    }
    /**
     * 开局操作广播
     */
    class StartNewRoundOpCmd_Brd {
        uid: number;
        cardSet: number[];
        winType: number[];
        GetType(): string;
    }
    class StartNewRoundOp_Brd {
        GetType(): string;
    }
    /**
     * 请求补张
     */
    class SupplyCardMahjongCmd_C {
        thisId: number;
        GetType(): string;
    }
    class SupplyCardMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 广播补张
     */
    class SupplyCardMahjongCmd_Brd {
        /**
         * 碰牌的玩家
         */
        obj: BarCardObj;
        /**
         * 只在碰杠时 是否可抢杠胡 分别发送 1:可胡 0:不可胡
         */
        canWin: number;
        GetType(): string;
    }
    /**
     * 获取牌堆剩余牌数
     */
    class GetHeapCard_C {
        GetType(): string;
    }
    class GetHeapCard_S {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 信息
         */
        desc: string;
        /**
         * 万
         */
        wanCardSet: number[];
        /**
         * 条
         */
        tiaoCardSet: number[];
        /**
         * 筒
         */
        tongCardSet: number[];
        /**
         * 字
         */
        ziCardSet: number[];
        /**
         * 花
         */
        flowerCardSet: number[];
        GetType(): string;
    }
    /**
     * ping值广播
     */
    class SetPingTimeNullUserPmd_Brd {
        pingmsec: number;
        accid: number;
        GetType(): string;
    }
    class SetSameIpWarn_S {
        sameSet: string[];
        GetType(): string;
    }
    class SysMessageMahjongCmd_S {
        desc: string;
        /**
         * 消息级别和位置相关
         */
        pos: number;
        GetType(): string;
    }
    class ChangePointMahjongCmd_Brd {
        uid: number;
        /**
         * 剩余量
         */
        points: number;
        remainder: number;
        /**
         * 原因,0表示单局结算,1表示跟牌结算,2表示杠后结算
         */
        reason: number;
        GetType(): string;
    }
    /**
     * 换桌,同一房间换,名字没起好
     */
    class ChangeRoomMahjongCmd_C {
        roomId: number;
        GetType(): string;
    }
    class ChangeRoomMahjongCmd_S {
        resultCode: number;
        desc: string;
        GetType(): string;
    }
    /**
     * 宽甸麻将 二人麻将 大邑麻将
     */
    class PlayButtonMahjongCmd_S {
        resultCode: number;
        /**
         * 牌的列表
         */
        CardSet: number[];
        /**
         * 类型 1是报胡 2是请胡
         */
        playButton: number;
        GetType(): string;
    }
    class PlayButtonMahjongCmd_C {
        /**
         * 0表示没点任何按钮 1 报夹 2报吊 3 站立报听 4站立报夹 5站立报吊 6听 888取消
         */
        playButton: number;
        GetType(): string;
    }
    class PlayButtonMahjongCmd_Brd {
        uid: number;
        /**
         * 0表示没点任何按钮 1 报夹 2报吊 3 站立报听 4站立报夹 5站立报吊 6听
         */
        playButton: number;
        /**
         * 是否断线重连后发的广播 1是
         */
        isReconnet: number;
        GetType(): string;
    }
    /**
     * 请求加倍
     */
    class DoubleMahjongCmd_C {
        GetType(): string;
    }
    class DoubleMahjongCmd_S {
        resultCode: number;
        /**
         * 加倍数
         */
        multiple: number;
        GetType(): string;
    }
    class DoubleMahjongCmd_Brd {
        uid: number;
        /**
         * 是否需要蒙牌 0是不需要，1为需要
         */
        isMask: number;
        GetType(): string;
    }
    class CheckMoneyMahjongCmd_S {
        /**
         * 1:输赢达到上限 2:金币不足
         */
        code: number;
        GetType(): string;
    }
    /**
     * 金币场游戏中充值广播
     */
    class ChargeGoldCoinMahjongCmd_Brd {
        /**
         * 所有需要充值的玩家id
         */
        uid: number[];
        /**
         * 充值操作时间
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 取消充值金币操作
     */
    class CancelChargeGoldCoinMahjongCmd_C {
        GetType(): string;
    }
    /**
     * 对局流水信息
     */
    class GameWaterMahjongCmd_S {
        /**
         * 番型输赢明细
         */
        multiDetailSet: MultiDetail[];
        GetType(): string;
    }
    /**
     * 血战血流 认输广播
     */
    class GameLoserUidMahjongCmd_Brd {
        loseruidSet: number[];
        /**
         * 充值成功为0 失败为1
         */
        ChargeState: number;
        GetType(): string;
    }
    class PointDetail {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 牌
         */
        CardThisId: number[];
        /**
         * 对应的分数
         */
        point: number;
        /**
         * 类型 0-无精 1-冲关 2-霸王
         */
        pointType: number[];
        GetType(): string;
    }
    class XiaGoldDetail {
        /**
         * 下精明细
         */
        pointDetail: PointDetail[];
        /**
         * 算分的牌
         */
        ShowCard: number[];
        /**
         * 玩法类型 0-埋雷 1-上下翻精 2-照镜子 3-回头一笑 4-同一首歌
         */
        Type: number;
        GetType(): string;
    }
    /**
     * 南昌麻将 下精算分广播
     */
    class XiaGoldCardPointMahjongCmd_Brd {
        /**
         * 所有玩家下精分明细
         */
        xiaGoldDetail: XiaGoldDetail[];
        /**
         * 玩法类型 0-埋雷 1-上下翻精 2-照镜子 3-回头一笑 4-同一首歌
         */
        Type: number;
        GetType(): string;
    }
    /**
     * 开始抓花广播
     */
    class StartSelectCardMahjong_Brd {
        /**
         * 所有抓花的牌
         */
        afcs: number[];
        /**
         * 抓花的玩家
         */
        uid: number;
        /**
         * 抓花时间
         */
        sec: number;
        /**
         * 可以抓多少张
         */
        limit: number;
        /**
         * 胡牌信息
         */
        rewardSet: RewardObj[];
        GetType(): string;
    }
    /**
     * 请求抓花
     */
    class SelectCardMahjong_C {
        /**
         * 选择的牌的thisid
         */
        thisid: number;
        GetType(): string;
    }
    /**
     * 抓花广播
     */
    class SelectCardMahjong_Brd {
        /**
         * 选择的牌的thisid
         */
        thisid: number;
        /**
         * 抓花输赢: 0,输; 1,赢
         */
        win: number;
        GetType(): string;
    }
    /**
     * 万州麻将的换牌数据
     */
    class ChangeCardDataMahjong_S {
        /**
         * 换给的玩家uid
         */
        giveuid: number;
        /**
         * 牌
         */
        giveCardThisId: number[];
        /**
         * 换到的牌的玩家uid
         */
        getuid: number;
        /**
         * 牌
         */
        getCardThisId: number[];
        /**
         * 谁的牌,放录像用
         */
        ownerid: number;
        GetType(): string;
    }
    /**
     * 万州麻将的买牌广播
     */
    class BuyCardMahjong_Brd {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 0是没点买牌,1是点了买牌
         */
        buy: number;
        GetType(): string;
    }
    /**
     * 万州麻将的已胡玩家数据广播
     */
    class WinSeatCardDataMahjong_Brd {
        /**
         * 玩家uid
         */
        uid: number;
        /**
         * 赢的牌的id
         */
        wincardId: number;
        GetType(): string;
    }
    /**
     * 扣牌消息
     */
    class KouCardMahjongCmd_CS {
        /**
         * 需要进行扣牌处理的牌列表
         */
        cardList: number[];
        /**
         * 是否需要进行扣牌 true 需要 false 不需要
         */
        needKou: boolean;
        /**
         * 是否要进行扣牌
         */
        yesOrNo: boolean;
        GetType(): string;
    }
    /**
     * 扣牌
     */
    class WaitKouSeatMahjongCmd_S {
        /**
         * 等待扣牌玩家列表
         */
        waitUid: number[];
        GetType(): string;
    }
    class OtherKouCardMahjongCmd_Brd {
        /**
         * 所有人的扣牌信息
         */
        KouCards: KouCardInfo[];
        GetType(): string;
    }
    class KouCardInfo {
        /**
         * 当前玩家的uid
         */
        uid: number;
        /**
         * 信息类型 （0-不扣牌 1-扣牌通知） 2-显示更新
         */
        infoType: number;
        /**
         * 扣牌数量
         */
        kouCount: number;
        GetType(): string;
    }
    /**
     * 通知玩家选择翻金方式
     */
    class StartChoiseTurnGoldType_Brd {
        sec: number;
        /**
         * 断线重连是添加骰子数据
         */
        dice: DiceObj;
        GetType(): string;
    }
    /**
     * 选择翻金方式
     */
    class ChoiseTurnGoldType_C {
        /**
         * 1:向上    2:向下    3:开裂    4:染色
         */
        turnType: number;
        /**
         * 裂开数量
         */
        num: number;
        /**
         * 1:正向   2:反向
         */
        direction: number;
        GetType(): string;
    }
    /**
     * 广播翻金方式
     */
    class ChoiseTurnGoldType_Brd {
        turnType: number;
        /**
         * 裂开数量
         */
        num: number;
        /**
         * 1:正向   2:反向
         */
        direction: number;
        GetType(): string;
    }
    /**
     * 过蛋
     */
    class ShowBarCardPassTheEgg_CS {
        /**
         * 过蛋玩家id
         */
        uid: number;
        /**
         * 过蛋牌thisid
         */
        thisId: number;
        eggScore: number;
        GetType(): string;
    }
    class RoundScore {
        /**
         * 玩家id
         */
        uid: number;
        /**
         * 对局中的分数
         */
        score: number[];
        GetType(): string;
    }
    /**
     * 请求战绩流水
     */
    class ShowRoundScore_C {
        GetType(): string;
    }
    /**
     * 返回战绩流水
     */
    class ShowRoundScore_S {
        /**
         * 对局信息 重连才会推送
         */
        rs: RoundScore[];
        GetType(): string;
    }
    class ServiceChargeMahjongCmd_Brd {
        /**
         * 类型 1 金币 2钻石
         */
        ret: number;
        /**
         * 费用
         */
        score: number[];
        GetType(): string;
    }
    class SelfActiveMahjong_C {
        /**
         * 玩家id 非必要
         */
        uid: number;
        GetType(): string;
    }
    /**
     * 玩家牌型报警
     */
    class CardTypeWarnMahjong_Brd {
        /**
         * 报警玩家的uid
         */
        uid: number;
        GetType(): string;
    }
    class NestleCardMahjongCmd_Brd {
        /**
         * 偎牌的玩家
         */
        uid: number;
        thisId: number;
        /**
         * 偎牌后的三张thisid
         */
        cardSet: number[];
        /**
         * 偎牌的类型
         */
        nestleType: number;
        GetType(): string;
    }
    /**
     * 胡息分数刷新通知
     */
    class UpdateHuXiCmd_Brd {
        /**
         * 刷新的玩家
         */
        uid: number;
        /**
         * 玩家的胡息
         */
        point: number;
        GetType(): string;
    }
    /**
     * 应答螺丝胡胡2收走
     */
    class WinGoMahjongCmd_C {
        /**
         * 不填或者0表示继续,1表示走
         */
        op: number;
        GetType(): string;
    }
    /**
     * 应答螺丝胡胡2收走
     */
    class WinGoMahjongCmd_Brd {
        /**
         * 选择了操作的玩家,如果是uid是自己,则需要做出选择
         */
        uid: number;
        /**
         * 不填或者0表示继续,1表示走
         */
        op: number;
        /**
         * 剩余操作时间,不填表示已经操作过,填了就没用了
         */
        sec: number;
        GetType(): string;
    }
    /**
     * 字牌等胡请求
     */
    class WaitWinZiCardCmd_CS {
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 字牌抢胡请求
     */
    class GrabWinZiCardCmd_C {
        /**
         * 抢胡的牌
         */
        thisId: number;
        /**
         * 主动抢胡 1表示主动抢
         */
        actionGrab: number;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: gameList.xlsx SHEET: gameList
     */
    class gameList {
        id: number;
        gameId: number;
        gameDoc: string;
        gameName: string;
        gameDes: string;
        gameTag: string;
        gameTheme: string;
        gameResConfigUrl: string;
        gameResRoot: string;
        preLoad: string;
        gameCodeUrl: string;
        gameIconUrl: string;
        gameIconUrl_gxpj: string;
        gameIconUrl_hpw: string;
        gameShareUrl: string;
        markIconUrl: string;
        selectScene: number;
        /**
         * 包大小
         */
        gameSize: string;
        stageScaleMode: string;
        wxgame: boolean;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: 大厅每日任务.xlsx SHEET: task
     */
    class LobbyTaskConfig {
        /**
         * 序列
         */
        id: number;
        /**
         * 任务标题
         */
        taskTitle: string;
        /**
         * 跳转类型
         */
        skipType: number;
        /**
         * 任务描述
         */
        taskDesc: string;
        /**
         * 前置任务
         */
        preTask: number[];
        /**
         * 任务类型
         */
        taskType: number;
        /**
         * 是否显示进度条
         */
        progressType: number;
        /**
         * 游戏ID
         */
        gameId: number[];
        /**
         * 前置参数
         */
        frontTaskCondition: number[];
        /**
         * 任务参数
         */
        taskCondition: number;
        /**
         * 领取次数
         */
        rewardNum: number;
        /**
         * 场次ID
         */
        seasonID: number[];
        /**
         * 渠道ID
         */
        channelID: number[];
        /**
         * 图标
         */
        taskIcon: string;
        /**
         * 奖励
         */
        taskReward: LobbyTaskConfig.TaskRewardItem[];
        /**
         * 是否显示
         */
        isOnList: number;
        /**
         * 成就任务类型
         */
        noReset: number;
        /**
         * 房间类型
         */
        sceneidid: number;
        /**
         * 房间类型
         */
        sceneid: number;
        /**
         * 任务分类
         */
        rewardType: number;
        GetType(): string;
    }
    module LobbyTaskConfig {
        class TaskRewardItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
declare module table {
    /**
     * FILE: a弹窗.xlsx SHEET: 弹窗 KEY: ID
     */
    class TableAd {
        ID: number;
        /**
         * 关闭类型
         */
        closeType: number;
        /**
         * 类名
         */
        className: string;
        /**
         * 资源组
         */
        groupName: string;
        /**
         * 参数
         */
        param: string;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a各渠道修改.xlsx SHEET: 渠道
     */
    class TableChannelModify {
        /**
         * 平台ID
         */
        channelId: number;
        /**
         * 渠道名称
         */
        channelName: string;
        /**
         * 红包话费兑换
         */
        rewardExchange: number;
        /**
         * 每日礼包
         */
        dayGift: number;
        /**
         * 邀请新玩家
         */
        inviteNewUser: number;
        /**
         * 屏蔽
         */
        screenType: number[];
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a各渠道修改.xlsx SHEET: 类型
     */
    class TableChannelType {
        ID: number;
        /**
         * 系统
         */
        systemType: string;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a房卡-创建房间选项.xlsx SHEET: 金币及百人场配置
     */
    class TableCoinHundredConfig {
        /**
         * 序号
         */
        id: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 金币钻石
         */
        coinorDiamond: number;
        /**
         * 离场
         */
        leaveCarry: number;
        /**
         * 抽水类型
         */
        tipsType: number;
        /**
         * 游戏名称
         */
        GameName: string;
        /**
         * 房间序号
         */
        roomType: number;
        /**
         * 房间名称
         */
        roomName: string;
        /**
         * 金币底注
         */
        lowestBetChips: number;
        /**
         * 最低携带
         */
        lowestCarry: number;
        /**
         * 最高携带
         */
        highestCarry: number;
        /**
         * 送红包局数
         */
        giftRound: number;
        /**
         * 获奖次数
         */
        giftLimit: number;
        /**
         * 送红包金额
         */
        giftNumber: number;
        /**
         * 分值上限
         */
        maxBet: number;
        /**
         * 金币场抽水
         */
        coinGameCost: number;
        /**
         * 人数
         */
        userNum: number;
        /**
         * 图片名
         */
        imageName: string;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: 关键资源表.xlsx SHEET: 关键资源表
     */
    class TableCoreResources {
        /**
         * 资源名
         */
        resName: string;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a房卡-创建房间选项.xlsx SHEET: 单个麻将设置 KEY: gameId
     */
    class TableCreateConfigList {
        /**
         * 序列
         */
        id: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 类型
         */
        type: number;
        /**
         * 无时间选项
         */
        timeLimit: number;
        /**
         * 游戏名称
         */
        gameName: string;
        /**
         * 人数
         */
        baseUserNbr: number[];
        /**
         * 人数选择
         */
        userNbr: TableCreateConfigList.UserNbrItem[];
        /**
         * 玩法选择
         */
        playType: TableCreateConfigList.PlayTypeItem[];
        /**
         * 默认玩法选择
         */
        defaltPlayType: number[];
        /**
         * 底注设置
         */
        basebetConfig: number[];
        /**
         * 局数选择
         */
        gameNbr: TableCreateConfigList.GameNbrItem[];
        /**
         * 收费模式
         */
        payType: TableCreateConfigList.PayTypeItem[];
        /**
         * 房主小费
         */
        hostTip: TableCreateConfigList.HostTipItem[];
        /**
         * 可中途加入
         */
        halfJoin: number;
        /**
         * 底分
         */
        basePoint: TableCreateConfigList.BasePointItem[];
        /**
         * 时间选择
         */
        outTime: TableCreateConfigList.OutTimeItem[];
        /**
         * 是否开启
         */
        open: number;
        /**
         * 游戏分享标题
         */
        gameshareTitle: string;
        /**
         * 游戏分享内容
         */
        gameshareContent: string;
        /**
         * 游戏分享内容不要房号
         */
        gameshareContentnoroomnum: number;
        /**
         * 创建面板版号展示
         */
        banhaoTab: string;
        GetType(): string;
    }
    module TableCreateConfigList {
        class UserNbrItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class PlayTypeItem {
            label: string;
            idArr: number[];
        }
    }
    module TableCreateConfigList {
        class GameNbrItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class PayTypeItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class HostTipItem {
            value: number;
            label: string;
            tipValue: number;
        }
    }
    module TableCreateConfigList {
        class BasePointItem {
            value: number;
            label: string;
        }
    }
    module TableCreateConfigList {
        class OutTimeItem {
            value: number;
            label: string;
        }
    }
}
declare module Cmd {
    /**
     * 转账
     */
    class ExchangeItem {
        /**
         * id	1代码钻石,2代表房卡, 3金币
         */
        id: number;
        chips: number;
        GetType(): string;
    }
    /**
     * 交易key生成
     */
    class ExchangeKeyGet_CS {
        /**
         * 交易所需信息
         */
        exchangeInfo: ExchangeItem;
        /**
         * 生成的KEY
         */
        exchangeKey: string;
        /**
         * 剩余的筹码
         */
        remainderChips: number;
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    /**
     * 领取交易筹码
     */
    class ExchangeChipsReceive_CS {
        /**
         * 领取key
         */
        exchangeKey: string;
        /**
         * 交易所需信息
         */
        exchangeInfo: ExchangeItem;
        /**
         * 剩余的筹码
         */
        remainderChips: number;
        /**
         * 返回码
         */
        resultCode: number;
        GetType(): string;
    }
    class RedPaperInfo {
        /**
         * 交易所需信息
         */
        exchangeInfo: ExchangeItem;
        /**
         * 领取key
         */
        exchangeKey: string;
        /**
         * 领取结果 0/1表示未领，已领
         */
        bOk: number;
        /**
         * 发送红包的名字
         */
        sendUserName: string;
        /**
         * 领取红包的名字
         */
        recvUserName: string;
        /**
         * 领取红包的时间
         */
        recvTime: string;
        GetType(): string;
    }
    /**
     * 收发红包
     */
    class ExchangeRecordGet_CS {
        /**
         * 返回码
         */
        resultCode: number;
        /**
         * 发出去的红包
         */
        sendRecord: RedPaperInfo[];
        /**
         * 收到的红包
         */
        receiveRecord: RedPaperInfo[];
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a炮.xlsx SHEET: 炮倍
     */
    class TableFishGun {
        ID: number;
        /**
         * 名称
         */
        gunName: string;
        /**
         * 倍率
         */
        gunTime: number;
        /**
         * 解锁消耗钻石
         */
        unlockDiamon: number;
        /**
         * 解锁奖励金币
         */
        unlockGold: number;
        /**
         * 所属场次
         */
        playType: number[];
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a炮.xlsx SHEET: 炮型
     */
    class TableFishGunType {
        ID: number;
        /**
         * 名称
         */
        gunName: string;
        /**
         * 攻速
         */
        gunSpeed: number;
        /**
         * 解锁条件
         */
        unlockType: number;
        /**
         * 解锁描述
         */
        unlockDescribe: string;
        /**
         * 狂暴攻速
         */
        crazySpeed: number;
        /**
         * 攻速值
         */
        speedNumber: number;
        /**
         * 锁定攻速
         */
        lockingSpeed: number;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a捕鱼选场.xlsx SHEET: Sheet1
     */
    class TableFishPlay {
        /**
         * 场次id
         */
        playType: number;
        /**
         * 场次名称
         */
        playName: string;
        /**
         * 解锁倍数
         */
        unlockTime: number;
        /**
         * 奖励产出
         */
        rewardNumber: number[];
        /**
         * 拥有鱼类
         */
        fishType: number[];
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: aVIP.xlsx SHEET: data
     */
    class TableFishVIP {
        /**
         * vip等级
         */
        vipLv: number;
        /**
         * 充值额度
         */
        recharge: number;
        /**
         * 在线转盘次数
         */
        turnNumber: number;
        /**
         * 救济金额度
         */
        richNumber: number;
        /**
         * 救济金次数
         */
        richTime: number;
        /**
         * 购买冰冻
         */
        isIce: number;
        /**
         * 购买锁定
         */
        isLocking: number;
        /**
         * 购买狂暴
         */
        isCall: number;
        /**
         * 购买核弹
         */
        isBomb: number;
        /**
         * 核弹赠送数量
         */
        sendBomb: number;
        /**
         * 专属奖励
         */
        vipReward: TableFishVIP.VipRewardItem[];
        /**
         * 购买额外赠送
         */
        rechargeGift: number;
        /**
         * 解锁炮台ID
         */
        unlockCannon: number;
        /**
         * 特权描述
         */
        des: string;
        GetType(): string;
    }
    module TableFishVIP {
        class VipRewardItem {
            goodsId: number;
            count: number;
        }
    }
}
declare module table {
    /**
     * FILE: 游戏每日任务.xlsx SHEET: task
     */
    class TableGameTaskConfig {
        /**
         * 序列
         */
        id: number;
        /**
         * 任务标题
         */
        taskTitle: string;
        /**
         * 任务描述
         */
        taskDesc: string;
        /**
         * 任务类型
         */
        taskType: number;
        /**
         * 是否显示进度条
         */
        progressType: number;
        /**
         * 游戏ID
         */
        gameId: number[];
        /**
         * 任务参数
         */
        taskCondition: number;
        /**
         * 前置任务
         */
        preTask: number[];
        /**
         * 暴击局数
         */
        criticalNum: number;
        /**
         * 场次ID
         */
        seasonID: number[];
        /**
         * 领取次数
         */
        rewardNum: number;
        /**
         * 领取消耗钻石
         */
        getpaidDiamond: number;
        /**
         * 图标
         */
        taskIcon: string;
        /**
         * 奖励
         */
        taskReward: TableGameTaskConfig.TaskRewardItem[];
        /**
         * 是否显示
         */
        isOnList: number;
        /**
         * 房间类型
         */
        sceneid: number;
        GetType(): string;
    }
    module TableGameTaskConfig {
        class TaskRewardItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
declare module table {
    /**
     * FILE: a金猪闯关.xlsx SHEET: 金猪闯关
     */
    class TableGoldPig {
        /**
         * 闯关类型
         */
        goldpigType: number;
        /**
         * 关数
         */
        goldpigNumber: number;
        /**
         * 闯关名称
         */
        goldpigName: string;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 游戏人数
         */
        gameUserNbr: number;
        /**
         * 排名奖励
         */
        RankReward: TableGoldPig.RankRewardItem[][];
        /**
         * 晋级人数
         */
        riseRank: number[];
        /**
         * 报名费用
         */
        goldpigCost: TableGoldPig.GoldpigCostItem[];
        /**
         * 开局人数
         */
        MatchPlayerNumber: number;
        GetType(): string;
    }
    module TableGoldPig {
        class RankRewardItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableGoldPig {
        class GoldpigCostItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
declare module table {
    /**
     * FILE: a房卡-道具.xlsx SHEET: 道具
     */
    class TableGoodsConfig {
        /**
         * 序号
         */
        id: number;
        /**
         * ID
         */
        goodId: number;
        /**
         * 物品名称
         */
        goodName: string;
        /**
         * 物品类型
         */
        goodType: number;
        /**
         * 物品介绍
         */
        goodDesc: string;
        /**
         * 物品icon
         */
        goodIcon: string;
        /**
         * 显示按钮
         */
        goodBotton: number[];
        /**
         * 说明文字
         */
        goodIntroduction: string;
        /**
         * 显示
         */
        isShow: number;
        /**
         * 礼包配置
         */
        giftGoods: TableGoodsConfig.GiftGoodsItem[];
        /**
         * 每日赠送
         */
        immediateGift: TableGoodsConfig.ImmediateGiftItem[];
        /**
         * 首次赠送
         */
        firstGift: TableGoodsConfig.FirstGiftItem[];
        /**
         * 额外赠送
         */
        otherGift: TableGoodsConfig.OtherGiftItem[];
        /**
         * 多次购买
         */
        moreBuy: TableGoodsConfig.MoreBuyItem[];
        /**
         * 物品展示
         */
        goodsShow: TableGoodsConfig.GoodsShowItem[];
        /**
         * 每日赠送金币
         */
        giveGold: number;
        /**
         * 有效时间
         */
        effectiveTime: number;
        GetType(): string;
    }
    module TableGoodsConfig {
        class GiftGoodsItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableGoodsConfig {
        class ImmediateGiftItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableGoodsConfig {
        class FirstGiftItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableGoodsConfig {
        class OtherGiftItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableGoodsConfig {
        class MoreBuyItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableGoodsConfig {
        class GoodsShowItem {
            goodId: number;
            goodNbr: number;
            goodType: number;
        }
    }
}
declare module table {
    /**
     * FILE: a房卡-创建房间选项.xlsx SHEET: 麻将大厅设置
     */
    class TableLobbyGameList {
        /**
         * 大厅ID
         */
        id: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 是否开启比赛
         */
        openHpMatch: number;
        /**
         * 防作弊游戏
         */
        cheatproofRoom: number[];
        /**
         * 创建面板全屏
         */
        createFullscreen: number;
        /**
         * 创建面板标签
         */
        createTag: number;
        /**
         * 成长任务
         */
        growTask: TableLobbyGameList.GrowTaskItem[];
        /**
         * 2.5D
         */
        twoPointFive: number[];
        /**
         * 返回大厅需要钻石
         */
        lobbyDiamond: number;
        /**
         * 初始金币
         */
        iniGold: number;
        /**
         * 初始钻石
         */
        iniDiamond: number;
        /**
         * 捕鱼新手任务
         */
        fishTask: number[];
        /**
         * 定位开启
         */
        PositioningOpen: number;
        /**
         * 初始房卡
         */
        iniRoomCard: number;
        /**
         * 大厅麻将资源名
         */
        lobbyMahjongSourceName: string;
        /**
         * 充值实名
         */
        chargeRealname: number;
        /**
         * 任务ID
         */
        missionId: number[];
        /**
         * 新手七日
         */
        newSevenday: TableLobbyGameList.NewSevendayItem[];
        /**
         * 是否开启金币分享
         */
        openShareCoin: number;
        /**
         * 破产补助
         */
        brokeRelieve: TableLobbyGameList.BrokeRelieveItem[];
        /**
         * 百人场
         */
        hundredList: number[];
        /**
         * 练习场类型
         */
        exerciseType: number;
        /**
         * 金币场
         */
        coinList: TableLobbyGameList.CoinListItem[];
        /**
         * 游戏任务
         */
        gameTask: TableLobbyGameList.GameTaskItem[];
        /**
         * 游戏选择
         */
        mahjongList: number[];
        /**
         * 小程序游戏
         */
        applets: number[];
        /**
         * 练习场场次数据
         */
        exerciseList: TableLobbyGameList.ExerciseListItem[];
        /**
         * 商品
         */
        shopList: number[];
        /**
         * 微信商品
         */
        wechatshopList: number[];
        /**
         * 首充礼包
         */
        firstCharge: number[];
        /**
         * 单次首充
         */
        fishCharge: number[];
        /**
         * 领取方式
         */
        payment: number;
        /**
         * 礼物
         */
        giftList: number[];
        /**
         * 练习场场次展示
         */
        exerciseLabelList: TableLobbyGameList.ExerciseLabelListItem[];
        /**
         * 大厅签到
         */
        sign: number[];
        /**
         * 分享送钻
         */
        share: number[];
        /**
         * 分享标题
         */
        shareTitle: string;
        /**
         * 小程序话费兑换
         */
        newshopList: number[];
        /**
         * 小程序渠道包兑换话费
         */
        channelExchange: number[];
        /**
         * 小程序话费兑换钻石
         */
        diamondshopList: number[];
        /**
         * 小程序月卡
         */
        monthCard: number[];
        /**
         * 游戏内分享
         */
        gameShare: number[];
        /**
         * 小程序分享送钻
         */
        newShare: TableLobbyGameList.NewShareItem[];
        /**
         * 小程序分享大礼包
         */
        newSharegift: TableLobbyGameList.NewSharegiftItem[];
        /**
         * 小程序分享内容
         */
        newshareContent: string[];
        /**
         * 小程序分享图
         */
        newsharepicture: string[];
        /**
         * 新链接
         */
        newLink: string;
        /**
         * 小程序收藏奖励
         */
        subscribeAward: TableLobbyGameList.SubscribeAwardItem[];
        /**
         * 不要练习场
         */
        noPractice: number;
        /**
         * 托管模式
         */
        autoMode: number;
        /**
         * 礼物付费
         */
        giftCost: number;
        /**
         * 复制分享
         */
        copyShare: number;
        /**
         * 公众号启动奖励
         */
        subscriptionStart: TableLobbyGameList.SubscriptionStartItem[];
        /**
         * 分享头
         */
        shareFirst: string;
        /**
         * 分享内容
         */
        shareContent: string;
        /**
         * 初始物品
         */
        iniItem: TableLobbyGameList.IniItemItem[];
        /**
         * 授权奖励
         */
        gaveAward: TableLobbyGameList.GaveAwardItem[];
        GetType(): string;
    }
    module TableLobbyGameList {
        class GrowTaskItem {
            day: number;
            reward: number;
            task: number[];
        }
    }
    module TableLobbyGameList {
        class NewSevendayItem {
            day: number;
            gift: number[];
        }
    }
    module TableLobbyGameList {
        class BrokeRelieveItem {
            time: number;
            goodId: number[];
        }
    }
    module TableLobbyGameList {
        class CoinListItem {
            gameId: number;
            sceneId: number[];
        }
    }
    module TableLobbyGameList {
        class GameTaskItem {
            gameId: number;
            taskId: number[];
        }
    }
    module TableLobbyGameList {
        class ExerciseListItem {
            id: number;
            bet: number;
            type: number;
            minLimit: number;
            maxLimit: number;
            cost: number;
        }
    }
    module TableLobbyGameList {
        class ExerciseLabelListItem {
            id: number;
            name: string;
            bet: string;
            limit: string;
        }
    }
    module TableLobbyGameList {
        class NewShareItem {
            goodId: number;
            goodNumber: number;
        }
    }
    module TableLobbyGameList {
        class NewSharegiftItem {
            goodId: number;
            goodNumber: number;
        }
    }
    module TableLobbyGameList {
        class SubscribeAwardItem {
            goodId: number;
            goodNumber: number;
        }
    }
    module TableLobbyGameList {
        class SubscriptionStartItem {
            goodId: number;
            goodNumber: number;
        }
    }
    module TableLobbyGameList {
        class IniItemItem {
            goodId: number;
            goodNumber: number;
        }
    }
    module TableLobbyGameList {
        class GaveAwardItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
declare module table {
    /**
     * FILE: 周边系统.xlsx SHEET: 好彩转盘 KEY: lobbyId
     */
    class TableluckyTurntable {
        /**
         * 序号
         */
        id: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 签到奖励
         */
        signReward: TableluckyTurntable.SignRewardItem[];
        /**
         * 翻倍转盘
         */
        timeReward: TableluckyTurntable.TimeRewardItem[];
        /**
         * 在线转盘需时
         */
        needTime: number[];
        /**
         * 在线转盘
         */
        onlineReward: TableluckyTurntable.OnlineRewardItem[];
        GetType(): string;
    }
    module TableluckyTurntable {
        class SignRewardItem {
            goodsId: number;
            count: number;
        }
    }
    module TableluckyTurntable {
        class TimeRewardItem {
            time: number;
        }
    }
    module TableluckyTurntable {
        class OnlineRewardItem {
            goodsId: number;
            count: number;
        }
    }
}
declare module table {
    /**
     * FILE: a房卡-好牌网比赛奖励.xlsx SHEET: 奖励
     */
    class TableMatchReward {
        /**
         * 比赛ID
         */
        HaoPaiSceneId: number;
        /**
         * 比赛名称
         */
        HaoPaiMatchName: string;
        /**
         * 比赛类型
         */
        HaoPaiMatchType: number;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 游戏人数
         */
        gameUserNbr: number;
        /**
         * 解锁人数
         */
        unlockNumber: number;
        /**
         * 排名奖励
         */
        RankReward: TableMatchReward.RankRewardItem[][];
        /**
         * 比赛总奖励
         */
        matchName: number;
        /**
         * 解锁钻石数
         */
        unlockdiamond: number;
        /**
         * 晋级人数
         */
        riseRank: number[];
        /**
         * 主要奖励名次
         */
        mainrewardRank: number;
        /**
         * 开启日期
         */
        week: number[];
        /**
         * 报名费用
         */
        HaoPaiMatchCost: TableMatchReward.HaoPaiMatchCostItem[];
        /**
         * 开局人数
         */
        MatchPlayerNumber: number;
        GetType(): string;
    }
    module TableMatchReward {
        class RankRewardItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableMatchReward {
        class HaoPaiMatchCostItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
declare module table {
    /**
     * FILE: a更多游戏.xlsx SHEET: 更多游戏 KEY: ID
     */
    class TableMoreGame {
        ID: number;
        /**
         * 是否开启
         */
        closeType: number;
        /**
         * 游戏名字
         */
        gameName: string;
        appId: string;
        path: string;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a房卡-玩法配置.xlsx SHEET: 玩法配置 KEY: id
     */
    class TablePlayTypeList {
        id: number;
        /**
         * 描述
         */
        desc: string;
        /**
         * 分类
         */
        playType: number;
        /**
         * 玩法类型描述
         */
        playTypedesc: string;
        /**
         * 父类
         */
        parent: number;
        /**
         * 按钮样式
         */
        buttonType: number;
        /**
         * 互斥
         */
        exclude: number[];
        /**
         * 同步
         */
        interact: number[];
        /**
         * 不检测
         */
        nodetect: number[];
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a房卡-房费.xlsx SHEET: 房费
     */
    class TableRoomCostConfig {
        /**
         * 序号
         */
        id: number;
        /**
         * 人数
         */
        usernbr: number;
        /**
         * 局数
         */
        gamenbr: number;
        /**
         * 开房费用
         */
        diamondcost: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * 游戏ID
         */
        gameId: number[];
        /**
         * 均摊费用
         */
        averdiamondcost: number;
        GetType(): string;
    }
}
declare module table {
    /**
     * FILE: a福卡闯关.xlsx SHEET: 福卡闯关
     */
    class TableRoundConfig {
        /**
         * 闯关类型
         */
        roundType: number;
        /**
         * 关数
         */
        roundNumber: number;
        /**
         * 闯关名称
         */
        roundName: string;
        /**
         * 游戏ID
         */
        gameId: number;
        /**
         * 是否可复活
         */
        reviveType: number;
        /**
         * 最大福卡数
         */
        mostfukaNumber: number;
        /**
         * 总关数
         */
        totalroundNuber: number;
        /**
         * 复活费用
         */
        reviveCost: TableRoundConfig.ReviveCostItem[];
        /**
         * 报名限制
         */
        roundLimit: TableRoundConfig.RoundLimitItem[];
        /**
         * 游戏人数
         */
        gameUserNbr: number;
        /**
         * 奖励
         */
        roundReward: TableRoundConfig.RoundRewardItem[][];
        /**
         * 报名费用
         */
        roundCost: TableRoundConfig.RoundCostItem[];
        /**
         * 非月卡金蛋
         */
        normalGoldenEgg: TableRoundConfig.NormalGoldenEggItem[];
        /**
         * 月卡金蛋
         */
        monthCardGoldenEgg: TableRoundConfig.MonthCardGoldenEggItem[];
        /**
         * 大奖金蛋
         */
        valuableGoldenEgg: TableRoundConfig.ValuableGoldenEggItem[];
        /**
         * 大奖次数
         */
        goldenEggNum: number;
        GetType(): string;
    }
    module TableRoundConfig {
        class ReviveCostItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableRoundConfig {
        class RoundLimitItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableRoundConfig {
        class RoundRewardItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableRoundConfig {
        class RoundCostItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableRoundConfig {
        class NormalGoldenEggItem {
            goodId: number;
            rangeNbr: number[];
        }
    }
    module TableRoundConfig {
        class MonthCardGoldenEggItem {
            goodId: number;
            rangeNbr: number[];
        }
    }
    module TableRoundConfig {
        class ValuableGoldenEggItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
declare module table {
    /**
     * FILE: a房卡-道具.xlsx SHEET: 商城
     */
    class TableShopConfig {
        /**
         * 序号
         */
        shopId: number;
        /**
         * 商城类型
         */
        shopType: number;
        /**
         * 物品名称
         */
        shopName: string;
        /**
         * 物品
         */
        shopGoods: TableShopConfig.ShopGoodsItem;
        /**
         * 售价类别
         */
        priceType: number;
        /**
         * 售价
         */
        price: number;
        /**
         * 首充奖励
         */
        firstShopGoods: TableShopConfig.FirstShopGoodsItem;
        /**
         * 是否上架
         */
        onShelve: number;
        iconId: number;
        /**
         * 是否在商城显示
         */
        isShow: number;
        /**
         * 购买次数
         */
        buyNbr: number;
        iapppayId: number;
        payPlatId: number;
        GetType(): string;
    }
    module TableShopConfig {
        /**
         * 物品
         */
        class ShopGoodsItem {
            goodId: number;
            goodNbr: number;
        }
    }
    module TableShopConfig {
        /**
         * 首充奖励
         */
        class FirstShopGoodsItem {
            goodId: number;
            goodNbr: number;
        }
    }
}
