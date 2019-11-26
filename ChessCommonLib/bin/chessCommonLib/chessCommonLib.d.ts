/*!
 * chessCommonLib - d.ts for Description
 * @licence chessCommonLib - v0.1.0 (2018-12-11)
 * qq:93749937 | Licence: helojo
 */
/**
 * 通用头像组件
 */
declare module chessCommonLib {
    class Head extends eui.Component implements eui.UIComponent {
        static PersonalImageAble: boolean;
        static DefaultHead: string;
        static DefaultIcon: boolean;
        static DefaulVip: boolean;
        static DefaulInfoBg: boolean;
        protected _headUrl: string;
        protected _frame: string;
        protected _vipAnim: string;
        protected avar_img: eui.Image;
        protected avarFrame_img: eui.Image;
        protected gift_icon: eui.Image;
        protected info_bg: eui.Image;
        protected anim: dragonBones.Movie;
        private static DefaultWH;
        constructor(skin?: string, w?: number, h?: number);
        protected partAdded(partName: string, instance: any): void;
        headUrl: string;
        frame: string;
        setVipAnim(resName: string, playName?: string, x?: number, y?: number): void;
        setHeadFrame(level: number, personInfo?: Cmd.PersonalImage[]): void;
        vipLevel: number;
        private headScale;
        protected childrenCreated(): void;
        destroy(): void;
    }
}

declare module chessCommonLib {
    /**
    * 初始化库
    * @method commonLib.init
    * @param param {any} 初始化参数
    */
    function init(param?: initOptions, callBack?: Function, thisObj?: any): void;
    function onExiteGame(e: uniLib.ZqEvent): void;
}

/**eui组件的父类 */
declare module chessCommonLib {
    class BaseEuiPanel extends eui.Component {
        /**
         * @param title 标题资源
         * @param width 宽度 不设置则用默认的
         * @param height 高度 不设置则用默认的
         * @param skin 自己设置的底板 不用大厅的底板
         */
        private _commonPanel;
        constructor(title?: string, width?: number, height?: number, skin?: string);
        protected childrenCreated(): void;
        protected initUI(): void;
        /**事件监听 */
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
    }
}

declare module chessCommonLib {
    class CommonPanel extends eui.Component {
        static exml: string;
        /**标题 */
        private _title;
        /**关闭按钮 */
        private _closeBtn;
        private _titleStr;
        private _width;
        private _height;
        constructor(title?: string, width?: number, height?: number, skin?: string);
        protected childrenCreated(): void;
        protected initUI(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        protected destroy(): void;
        protected btnClick(evt: egret.TouchEvent): void;
        static setDefaultSkin(skin: any): void;
    }
}

declare module chessCommonLib {
    class SysMsgImportant extends eui.Component {
        private _msgTxt;
        private _noticeArr;
        private _msgContain;
        private _noticePanel;
        private _vipIcon;
        private _worldchat;
        private _buffer;
        private _defaultMsg;
        private _loop;
        _isHundred: boolean;
        private _isDestroy;
        constructor(isHundred?: boolean);
        protected childrenCreated(): void;
        initUI(): void;
        private removeListen();
        private clickHandle(evt);
        setDefaultMsg(msg: string): void;
        setLoop(value: boolean): void;
        private noticeTest();
        private startScroll();
        private scrollNext();
        private scrollEnd();
        private onNoticeCome(e);
        private operateText(notice);
        destroy(): void;
        createTextFeild(): egret.TextField;
    }
}

declare module chessCommonLib {
    class SysMsgMc extends eui.Component {
        private _msgTxt;
        private _noticeArr;
        private _msgContain;
        private _noticePanel;
        private _vipIcon;
        private _worldchat;
        private _buffer;
        private _defaultMsg;
        private _loop;
        private _isDestroy;
        _isHundred: boolean;
        static isShowWorldChat: boolean;
        constructor(isHundred?: boolean);
        protected childrenCreated(): void;
        initUI(): void;
        private removeListen();
        private clickHandle(evt);
        setDefaultMsg(msg: string): void;
        setLoop(value: boolean): void;
        private noticeTest();
        private startScroll();
        private scrollNext();
        private scrollEnd();
        private onNoticeCome(e);
        private operateText(notice);
        destroy(): void;
        createTextFeild(): egret.TextField;
    }
}

/**
 * @author garr
 */
declare module chessCommonLib {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    class chatComponent extends egret.Sprite {
        private str;
        private offsetX;
        private offsetY;
        private Nickname;
        private preStr;
        private emoj;
        /**表情数组 */
        private emojArr;
        /**是否换行 */
        private isMutiLine;
        /**是否是换行，通过一个测试的textWidth判断 */
        private testLable;
        /**存储文本数组 */
        private textArr;
        /**存储整个内容数组 */
        private contentArr;
        private _MaxWidth;
        private _height;
        private _nickName;
        /**当前行所占用宽度 */
        private inlineWidth;
        private data;
        constructor(data: any);
        private init();
        /**
         * @param length 一行的宽度，需要显示指定,不指定默认720
         */
        showContent(length?: number): egret.Sprite;
        /**传入分割好的字符串数组和图片表情数组
         * 根据分割规则，字符串数组每个元素和图片表情数组是通过插入合并
         * eg 字符串数组：[1,3,5]
         *    图片表情数组 [2,4,6]
         *    合并产生完成内容 [1,2,3,4,5,6]
         */
        private formatTxt(strArr, emojArr);
        private toNumber(data);
        private sliceArray(array);
        /**获取对应的内容 */
        private getContent(data);
        /**获取资源名 */
        private getRes(index);
        private getColor(str);
        /**获取颜色的高阶版，由服务器控制颜色输出
         * 格式为<1>
         */
        private getHighOderColor(str);
    }
}

/**
 *
 * @author
 *
 */
declare module chessCommonLib {
    class ChatEventConsts {
        constructor();
        static SEND_SMILEY: string;
        /**聊天信息初始化 */
        static CHAT_INIT: string;
        /**新的世界聊天信息广播 */
        static WORLD_MSG: string;
        /**新的聊天信息广播游戏内 */
        static WORLD_MSG_INGAME: string;
        /**新的世界聊天信息对自己 */
        static WORLD_MSG_SELF: string;
        /**新的世界聊天信息对自己失败 */
        static WORLD_MSG_SELF_FAIL: string;
    }
    class ZhiMaEventConsts {
        constructor();
        /**获取个人信息 */
        static GET_USERINFO: string;
        /**送礼 */
        static SEND_GIFT_NOTICE: string;
        /**语音 */
        static VOICE_NOTICE: string;
        /**录音时间到 */
        static RECORD_TIME_OUT: string;
        /**发送录音 */
        static SEND_RECORD: string;
    }
}

/**
 *
 * @author
 *
 */
declare module chessCommonLib {
    class ChatEventDispatcher extends egret.EventDispatcher {
        constructor();
        private static _instance;
        static readonly instance: ChatEventDispatcher;
    }
}

declare module chessCommonLib {
    class CommonVariable {
        private static instance;
        ExmlMap: any;
        /**用于管理需要显示红点的按钮的偏移距离 */
        PositionMap: any;
        /**传入需要的socketName数组，游戏一般需要同
         * 时传入uniLib和大厅模块名，大厅一般只需要传入对应的module名
         * 按照[0]是游戏内，[1]是大厅socket的顺序，
         * 当是大厅，则[0]是大厅，[1]不需要
        */
        socketName: string[];
        /**用于存储聊天信息，目前用于三张 */
        chatInfo: Cmd.CommonChatInfo;
        /**是否显示急速夺宝 */
        showTreasure: boolean;
        /**否显示时时彩 */
        showSsc: boolean;
        /**下注限制的判断 */
        betLimit: boolean;
        /**个人信息 由大厅初始化*/
        selfUserInfo: any;
        /**是否被禁言 */
        isForbidden: boolean;
        constructor();
        static getInstance(): CommonVariable;
        private init();
        /**
         * 字符串长度处理
         * @param {string}
         */
        static handleString(str: string, len?: number): string;
        /**
         * 获取字符串实际长度
         * @param {string}
         */
        static getStrRealLength(str: string): number;
        /**数组的push重写 */
        static add(data: any, arr: Array<any>): void;
        /**下注时候判断是否能够下注
    * @param userInfo  用户信息
    * @param callBack  不能下注时候的回调
    * originPlatId  是原始微信登陆后再绑定手机号的情况
    *
    */
        betHandle(userInfo: any, callBack: any): Promise<{}>;
    }
}

/**
 * @author
 */
declare module chessCommonLib {
    class LobbyChatFaceComponent extends eui.Component {
        private page1Point1;
        private page1Point2;
        private page2Point1;
        private page2Point2;
        scroll: eui.Scroller;
        private sTime;
        private startX;
        private movX;
        private isMove;
        private page;
        private timeBo;
        private jianTime;
        private pagWidth;
        private maxPag;
        private faceList;
        private faceList1;
        private arrCol1;
        private arrCol2;
        constructor();
        private init();
        private moveStar(timeStamp);
        private onTouchEnd(e);
        private onTouchBegin(e);
        private onScrollEnd();
        private bo;
        private test();
        private MovePanel();
        /**下方小圆点控制 */
        private pointHandle(page);
    }
}

declare module chessCommonLib {
    /**进入标准场的界面 */
    class LobbyChatFaceItem extends eui.ItemRenderer {
        private faceIcon;
        private faceid;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        /**显示详情 */
        private showDetail();
    }
}

/**
 * @author garr
 *   /**
   *━━━━━━神兽出没━━━━━━
   *     ┏┓　　　┏┓
   * 　 ┏┛┻━━━┛┻┓  + +
   *
   *  　┃　　　　　　　┃
   *  　┃　　　━　　　┃ ++ + + +
   * 　  ████━████ ┃+
   *    ┃　　　　　　　┃
   *    ┃　　　┻　　　┃
   *    ┃　　　　　　┃
   * 　  ┗━┓　　　┏━┛  Code is far away from bug with the animal protecting
   *       ┃　　　┃    神兽保佑,代码无bug
   *       ┃　　　┃
   *       ┃　　　┃
   *       ┃　　　┗━━━┓
   * 　　　 ┃　　　　　　　┣┓
   *       ┃　　　　　　　┏┛
   *       ┗┓┓┏━┳┓┏┛
   *       　┃┫┫　┃┫┫
   *         ┗┻┛　┗┻┛
 */
declare module chessCommonLib {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    class LobbyChatListItem extends eui.ItemRenderer {
        private chat_lb;
        private name_lb;
        private vipIcon;
        private str;
        private offsetX;
        private offsetY;
        private Nickname;
        private preStr;
        private emoj;
        /**表情数组 */
        private emojArr;
        /**是否换行 */
        private isMutiLine;
        /**是否是换行，通过一个测试的textWidth判断 */
        private testLable;
        /**存储文本数组 */
        private textArr;
        /**存储整个内容数组 */
        private contentArr;
        private _MaxWidth;
        private _height;
        private _nickName;
        /**当前行所占用宽度 */
        private inlineWidth;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        /**传入分割好的字符串数组和图片表情数组
         * 根据分割规则，字符串数组每个元素和图片表情数组是通过插入合并
         * eg 字符串数组：[1,3,5]
         *    图片表情数组 [2,4,6]
         *    合并产生完成内容 [1,2,3,4,5,6]
         */
        private formatTxt(strArr, emojArr);
        private toNumber(data);
        private sliceArray(array);
        /**获取对应的内容 */
        private getContent(data);
        /**获取资源名 */
        private getRes(index);
        private getColor(str);
        /**获取颜色的高阶版，由服务器控制颜色输出，后期可以配表扩充
         * 格式为<1>
         */
        private getHighOderColor(str);
    }
}

declare module chessCommonLib {
    /**排行榜单个item
     * 主要过程
     * 1，通过formatTxt提取计算图文排版，得出每一行计算后要显示的内容，
     * 2.根据每一行显示的内容数组，创建对象，进行显示
     * 3.用chat_lb控制排版显示
     */
    class LobbyChatListItemTemp extends eui.ItemRenderer {
        private chat_lb;
        private name_lb;
        private vipIcon;
        private str;
        private offsetX;
        private offsetY;
        private Nickname;
        private preStr;
        private emoj;
        /**表情数组 */
        private emojArr;
        /**是否换行 */
        private isMutiLine;
        /**是否是换行，通过一个测试的textWidth判断 */
        private testLable;
        /**存储文本数组 */
        private textArr;
        /**存储整个内容数组 */
        private contentArr;
        private _MaxWidth;
        private _height;
        /**当前行所占用宽度 */
        private inlineWidth;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
        private formatTxt(strArr, emojArr);
        private toNumber(data);
        private sliceArray(array, size);
        /**获取对应的内容 */
        private getContent(data);
    }
}

declare module chessCommonLib {
    /**大厅聊天面板 */
    class LobbyChatPanel extends eui.Component {
        private chatSend;
        private chatClose;
        private sendClock;
        private hornNum;
        private chatFaceIcon;
        private chatContentLable;
        private chatFacePanel;
        loadingTip: egret.tween.TweenGroup;
        private loading_img;
        private sendDisable;
        private hornIcon;
        private send_word;
        private chatScroll;
        private chatList;
        private isTour;
        private arrCol;
        private chatData;
        /**控制按钮上倒计时 */
        private _countTime;
        private counTime;
        private tempTimer;
        private tempTimer2;
        private touchMask;
        constructor();
        protected childrenCreated(): void;
        private uiCompHandler();
        protected init(): void;
        private isInGame();
        /**每次弹出调用 */
        initView(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**初始化请求聊天信息 */
        getChatData(): void;
        /**初始化数据 */
        private initData(e);
        private showRender();
        /**点击发送 */
        private sendChatMsg();
        /**新的聊天信息自己 */
        private onGetSZchatInfoself(e);
        /**自己返回失败 */
        private selfFail();
        /**控制按钮上倒计时 */
        private onTimer();
        /**控制按钮上倒计时 */
        private timerComFunc();
        /**新加的聊天信息 */
        private onGetSZchatInfo(e);
        /**空白消息 ,为了解决eui布局测量误差   1：添加一条空白信息 2:移除最上面的空白信息*/
        private layoutRefresh(num);
        /**显示表情面板 */
        private showFacePanel();
        private showFaceText(event);
        private onChang(e);
        /**当输入框内容为空，置灰发布按钮 */
        private BtnHandle();
        /**根据时间戳排序 */
        private sortByTimestamp();
        /**控制未加载前缓动动画 */
        private cartonControl(boo);
        /**关闭当前面板 */
        chatCloseHander(): void;
        destroy(): void;
        private hidephonevc();
        /**显示错误提示 */
        private showFailToast();
        /***这个负责彻底销毁调用 */
        dispose(): void;
    }
}

declare module Cmd {
    /**
 * 聊天信息初始化
 */
    function OnGetCommonChatInfoLobby_S(rev: Cmd.GetCommonChatInfoLobby_S): void;
    /**
 * 聊天返回只对自己
 */
    function OnLobbyCommonChatLobby_S(rev: Cmd.LobbyCommonChatLobby_S): void;
    /**
     * 聊天返回广播
     */
    function OnLobbyCommonChatLobby_Brd(rev: Cmd.LobbyCommonChatLobby_Brd): void;
}

/**
 *
 * @author
 *
 */
declare module chessCommonLib {
    class ChatImageItem extends egret.Sprite {
        private content;
        private labeTxt;
        constructor(name: string);
        private createBitmap(name);
        destory(): void;
    }
}

/**
 *
 * @author  garr
 *这个是用来进行布局计算的类，不承担显示对象的指责，大幅度减少性能消耗
 */
declare module chessCommonLib {
    class ChatWordCalculateItem {
        private content;
        private labeTxt;
        private _width;
        private isSpecil;
        text1: string;
        text: string;
        constructor(content: any, isSpecil?: boolean);
        readonly width: number;
        private createTextLabel(ale, size);
        destory(): void;
    }
}

/**
 *
 * @author
 *
 */
declare module chessCommonLib {
    class ChatWordItem extends eui.Component {
        private content;
        private labeTxt;
        constructor(content: any, isSpecil?: boolean);
        private createTextLabel(ale, size);
        destory(): void;
    }
}


declare module chessCommonLib {
    class ChatList extends eui.Component {
        private chatType_btn;
        private labelDisplay;
        private send_bt;
        private chat_scr;
        private chat_etxt;
        private chat_lst;
        private _data;
        private _chatBtns;
        private _chatDropBtns;
        /**
         * 选择按钮组
         */
        private chat_select_grp;
        /**
         * 喇叭按钮
         */
        labaDrop_btn: eui.Button;
        /**
         * 房间按钮
         */
        roomDrop_btn: eui.Button;
        labaType_btn: eui.Button;
        roomType_btn: eui.Button;
        private _currentChatType;
        /**
         * 喇叭数量
         */
        private _hornNum;
        constructor();
        protected childrenCreated(): void;
        private chatListItemRendererFunc(item);
        private showChatTypeSelectGrp(page);
        private hideChatTypeSelectGrp();
        currentChatType: Cmd.CHAT_TYPE;
        /**
         * 更新用户列表
         */
        update(): void;
        reset(): void;
        addEvents(): void;
        private onShowDropHandle(e);
        private onTouchChatTypeHandle(e);
        /**
         * 更新喇叭数量,这么写只是为了移除事件监听
         */
        sethornNum(e: uniLib.ZqEvent): void;
        /**
         * 更新喇叭数量
         */
        hornNum: number;
        /**
         * 获取到聊天信息
         */
        private onGetChatInfo(e);
        private onSendHandler(e);
        private onVoiceHandle(e);
        private onVoiceEndHandle(e);
        data: Cmd.UI_CommonChat_Brd[];
        private refreshView();
        private changeChatType();
        /**
         * 滚动到底部
         */
        private scroll2Bottom();
        private onChang(e);
        destroy(): void;
    }
}

declare module chessCommonLib {
    class ChatListItemRenderer extends eui.ItemRenderer {
        private avar_img;
        private vip_img;
        private name_txt;
        private time_txt;
        private chat_txt;
        constructor();
        protected childrenCreated(): void;
        private showUserinfoPanel();
        private removeListen();
        protected dataChanged(): void;
        private changeTimeToStr;
        private getNumStr;
    }
}

declare module chessCommonLib {
    /**
     * 聊天LIST喇叭ITEM
     */
    class ChatListLabaItemRenderer extends eui.ItemRenderer {
        private notice_lb;
        private chat_laba_vip_img;
        constructor();
        protected childrenCreated(): void;
        protected dataChanged(): void;
    }
}

declare module chessCommonLib {
    class ChatUserEvent {
        /**
         * 聊天信息事件
         */
        static CHAT_INFO: string;
        /**
     * 喇叭数量改变
     */
        static HORN_CHANGE: string;
        /**
         * 从舞台移动到边上
         */
        static MOVE_LEFT: string;
        /**
         * 从边上移动舞台
         */
        static MOVE_RIGHT: string;
        /**
         * 无座玩家总数
         */
        static CHAT_USER_COUNT: string;
        /**
         * 座位人数改变
         */
        static SEATNUM_CHANGE: string;
    }
}

declare module chessCommonLib {
    class ChatUserView extends eui.Component {
        /**
         * 聊天按钮
         */
        private chat_btn;
        /**
         * 无座玩家按钮
         */
        private noseat_btn;
        private mess_count;
        private chatAnim;
        /**
         * 按钮组
         */
        private btns;
        /**
         * 选中的按钮
         */
        private _curentBtn;
        /**
         * 正在显示的页
         */
        private _currentView;
        /**
         * 无座玩家UI
         */
        private _userList;
        /**
         * 聊天UI
         */
        private _chatListView;
        /**
         * 当前显示页的枚举值
         */
        private _currentPage;
        private _userListSkin;
        /** */
        private bg_layer;
        private _isMove;
        /**
         * @description    参数列表
         * @param {number} defaultPage默认打开页面，1聊天，2：无座列表
         * @param {string} skin面板皮肤。
         * @param {string} chatSkin聊天面板皮肤。
         * @param {string} userListSkin无座列表面板皮肤。
         */
        constructor(defaultPage?: CHAT_PAGE, skinType?: number);
        protected childrenCreated(): void;
        private getUserList();
        onChatReady(page: CHAT_PAGE): void;
        private onGetChatInfo(e);
        private onUserCount(e);
        private onChatBtnHandler(evt);
        /**
         * 设置喇叭数量
         */
        hornNum: number;
        /**点击空白聊天框隐藏 */
        private onTouch(evt);
        /**点击按钮移动到舞台 */
        private onClick(evt);
        /**点击空白聊天框隐藏 */
        private moveLeft(evt);
        /**点击按钮移动到舞台 */
        private moveRight(evt);
        destroy(): void;
    }
    enum CHAT_PAGE {
        /**
         * 聊天
         */
        CHAT = 1,
        /**
         * 无座玩家
         */
        NOSEAT = 2,
    }
}
declare module Cmd {
    /**
     * 发送聊天返回
     */
    function OnUI_CommonChat_S(rev: Cmd.UI_CommonChat_S): void;
    /**
     * 聊天消息
     */
    function OnUI_CommonChat_Brd(rev: Cmd.UI_CommonChat_Brd): void;
    function OnUI_VoiceChat_S(rev: Cmd.UI_VoiceChat_S): void;
    function OnUI_VoiceChat_Brd(rev: Cmd.UI_VoiceChat_Brd): void;
}

declare module chessCommonLib {
    class ChatVo {
        constructor();
        chatType: Cmd.CHAT_TYPE;
        data: any;
    }
}

declare module chessCommonLib {
    class UserItemRenderer extends eui.ItemRenderer {
        private vip_img;
        private avar_img;
        private frame_img;
        private name_lb;
        private gold_lb;
        constructor();
        protected childrenCreated(): void;
        private showUserinfoPanel();
        private removeListen();
        protected dataChanged(): void;
    }
}

declare module chessCommonLib {
    class UserList extends eui.Component {
        private noseat_lst;
        private _data;
        private loading_img;
        loadingTip: egret.tween.TweenGroup;
        constructor();
        protected childrenCreated(): void;
        data: Cmd.RoomUserInfo[];
        private refreshView();
        /**
         * 更新用户列表
         */
        update(): void;
        reset(): void;
        private getUserList();
        destroy(): void;
    }
}

/**
 * 百人头像组件(暂时只是把头像公共显示统一，后续需要统一头像vo信息)
 */
declare module chessCommonLib {
    class BrSeat extends eui.Component implements eui.UIComponent {
        /**
         * 昵称文本框
         */
        nickName_lbl: eui.Label;
        /**
         * 筹码文本框
         */
        chips_lbl: eui.BitmapLabel;
        /**
         * 文字背景
         */
        lb_bg_img: eui.Image;
        /**
         * 空座位时
         */
        empty_bg: eui.Image;
        head: chessCommonLib.Head;
        static CHIPCHANCE: boolean;
        private DEFAULT_BG;
        constructor(skin?: string, w?: number, h?: number);
        protected childrenCreated(): void;
        stand(): void;
        sit(vo: BrSeatVo): void;
        updateSeat(vo: BrSeatVo): void;
        nickName: string;
        chips: number;
        setHeadFrame(level: number, personInfo?: Cmd.PersonalImage[]): void;
    }
}

declare module chessCommonLib {
    class BrSeatVo extends uniLib.Reflect {
        constructor(obj?: any);
        /**
         * 用户ID
         */
        uid: number;
        /**
         * 头像URL
         */
        headUrl: string;
        /**
         * 昵称
         */
        nickName: string;
        /**
         * 筹码
         */
        remainder: number;
        /**
         * vip等级
         */
        vipLevel: number;
        /**
         * 十二生肖动画
         */
        personalImage: Cmd.PersonalImage[];
    }
}

declare module chessCommonLib {
    class GameTaskButton extends eui.Component {
        game_task: eui.Button;
        private progress_text;
        private light_rotate;
        gameId: number;
        constructor(gameid?: number);
        private addEvents();
        private onRemoveFromStage(evt);
        private removeEvents();
        private onTouchHandle(e);
        private onEventHandler(evt);
        protected childrenCreated(): void;
        private startRoate();
        private stopRoate();
        destroy(): void;
    }
}

declare module chessCommonLib {
    class ShiShiCaiButton extends eui.Component {
        private _ratote;
        private _timer;
        private timer;
        private _data;
        constructor();
        protected childrenCreated(): void;
        private addEvent();
        private onRemoveFromStage(evt);
        private removeEvent();
        private touchHandle();
        private getSscStatus(evt);
        /**
         * 更新时间
         */
        private runTime();
        destroy(): void;
    }
}

declare module chessCommonLib {
    class AutoChipChoicePanel extends eui.Component {
        private chipClose;
        private chip_1;
        private chip_2;
        private chip_5;
        private chip_10;
        private chip_50;
        private chip_100;
        private chip_250;
        private chip_500;
        private chip_1000;
        private chip_2000;
        private chip_5000;
        private chip_10000;
        private fiveChipValueArray;
        private confirmBtn;
        isFirstEnterGame: boolean;
        closeFun: Function;
        constructor();
        protected childrenCreated(): void;
        protected init(): void;
        protected addEvent(): void;
        protected removeEvent(): void;
        /**关闭当前面板 */
        private chipCloseHander(evt);
        private chipOnChange(evt);
        private confirmBtnClick(evt);
        private removeObjectFromArray(chipNum);
        destory(): void;
    }
}

/**
 * 统一风格面板
 */
declare module chessCommonLib {
    class Panel {
        constructor();
    }
}

declare module chessCommonLib {
    class TabBar extends eui.TabBar implements eui.UIComponent {
        private _menuCollection;
        private _containerOrThis;
        private _index;
        private _currentPage;
        private _items;
        constructor();
        setdata(menuArray: any, containerOrThis?: any, index?: number): void;
        private onMenuItemTap(e);
        private showItem(vo);
        itemsSkin: any;
        protected childrenCreated(): void;
        destroy(): void;
    }
    class TabBarVO {
        /**
         * 排序
         */
        index: number;
        /**
         * 显示文本
         */
        label: string;
        /**
         * 类或函数
         */
        cls: any;
        func: any;
        skin: TabBarLst;
    }
    /**
     * tabBar
     */
    enum TabBarLst {
        FIRST = 0,
        LAST = 1,
    }
}

declare module chessCommonLib {
    class TabBarItemCenter extends eui.ItemRenderer {
        labelDisplay: eui.Label;
        blabelDisplay: eui.BitmapLabel;
        constructor();
        dataChanged(): void;
    }
}

declare module chessCommonLib {
    class TabBarItemLeft extends eui.ItemRenderer {
        labelDisplay: eui.Label;
        blabelDisplay: eui.BitmapLabel;
        constructor();
        dataChanged(): void;
    }
}

declare module chessCommonLib {
    class TabBarItemRight extends eui.ItemRenderer {
        labelDisplay: eui.Label;
        blabelDisplay: eui.BitmapLabel;
        constructor();
        dataChanged(): void;
    }
}

declare module Cmd {
    /**
    * 个人信息数据返回
    */
    function OnGetPersonalPanel_S(rev: Cmd.GetPersonalPanel_S): void;
    /**
     * 礼物广播
     */
    function OnSendGiftRoomCmd_Brd(rev: Cmd.SendGiftRoomCmd_Brd): void;
    /**
     * 礼物失败返回
     */
    function OnSendGiftRoomCmd_S(rev: Cmd.SendGiftRoomCmd_S): void;
    function OnVoiceChat_Brd(rev: Cmd.VoiceChat_Brd): void;
}

declare module chessCommonLib {
    /**
     * 动画 聊天
     */
    class zm_ChatPanel extends BaseEuiPanel {
        private _root;
        private _content;
        private sendBtn;
        private textField;
        private chatScroller;
        private chatGroup;
        private faceScroller;
        private faceGroup;
        private _ShortTalkArr;
        constructor(ShortTalkArr: string[]);
        protected initUI(): void;
        onChatGroupTap(e: egret.TouchEvent): void;
        onFaceGroupTap(e: egret.TouchEvent): void;
        private onTouchTap(e);
        private sendClickHandler(e);
        destroy(): void;
    }
}

declare module chessCommonLib {
    class zm_GiftAnItem extends egret.DisplayObjectContainer {
        private _giftId;
        private _effectMc;
        constructor();
        initUI(): void;
        giftId: number;
        private onAnimationEvent();
        private index;
        play(): void;
        destory(): void;
    }
}

declare module chessCommonLib {
    class zm_HelpPanel extends BaseEuiPanel {
        private _titleTxt;
        private _typeTxt;
        private _contentTxt;
        private _typetext;
        private _contenttext;
        private _titletext;
        constructor(titletxt: string, typetxt: string, contentTxt: string);
        protected childrenCreated(): void;
        protected initUI(): void;
        private loadTable();
        destory(): void;
    }
}

declare namespace chessCommonLib {
    type zm_SetPanelEvtDate = {
        index?: number;
        resName?: string;
        evtType: string;
    };
    enum zm_SetPanelBtnType {
        BtnMusic = 0,
        BtnSound = 1,
        BtnLocalSound = 2,
    }
    class zm_SetPanel extends BaseEuiPanel {
        static SetPanelEvtOccur: string;
        private static BgResName;
        private static LocalSoundStatus;
        static SetPanelEvtTypeMusicOff: string;
        static SetPanelEvtTypeMusicOn: string;
        static SetPanelEvtTypeSoundOff: string;
        static SetPanelEvtTypeSoundOn: string;
        static SetPanelEvtTypeLocalSoundOff: string;
        static SetPanelEvtTypeLocalSoundOn: string;
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
        constructor(bgResArr: string[]);
        protected createChildren(): void;
        private onComplete();
        protected initUI(): void;
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

declare module chessCommonLib {
    class zm_UserInfoPanel extends BaseEuiPanel {
        private _uid;
        private _head_img;
        private _head;
        private _ip_lbl;
        private _id_lbl;
        private _gps_lbl;
        private _bean_lbl;
        private _name_lbl;
        private _diamond_lbl;
        private _gender_img;
        private _giftId;
        private _gift_group;
        private _data;
        constructor(uid: number);
        protected childrenCreated(): void;
        protected initUI(): void;
        private loadTable();
        protected addEvent(): void;
        protected removeEvent(): void;
        private showUserInfo(data);
        private sendGiftHandle(evt);
        destory(): void;
    }
    class zm_GiftItem extends eui.ItemRenderer {
        private _gift_img;
        private _gift_name;
        constructor();
        protected dataChanged(): void;
        destory(): void;
    }
}

declare module chessCommonLib {
    class zm_VoiceChat extends egret.DisplayObjectContainer {
        private _startBtn;
        private _recording;
        private _voiceArr;
        private _curPosY;
        private _soundValue;
        constructor(normal: string, down: string, x: number, y: number);
        private initUI(normal, down, x, y);
        getWidth(): number;
        getHeight(): number;
        private recordEvent(evt);
        private startRecord(evt);
        private _isCancel;
        private checkCancel(evt);
        private stopRecord(evt?);
        private onRecordBack(obj);
        private getContainer();
        destory(): void;
    }
    class VoiceMc extends egret.DisplayObjectContainer {
        private _soundIcon;
        private _bg;
        private _timer;
        private _soundTime;
        private _startTime;
        private _timeTxt;
        private _ifFlip;
        constructor();
        private initUI();
        private onTimer(evt);
        private stopTimer();
        flip(): void;
        setData(vo: VoiceDataVo): void;
        private playEndBack(obj);
        destory(): void;
    }
    class RecordingMc extends egret.DisplayObjectContainer {
        private _moving;
        private _time;
        private _startTimer;
        private _startTime;
        private _maxTime;
        private _msTime;
        constructor();
        private initUI();
        startTimer(): void;
        stopTimer(): number;
        private onTimer(evt);
        dispose(): void;
    }
    class VoiceDataVo {
        url: string;
        nickName: string;
        time: number;
        uid: number;
        status: number;
        text: string;
        constructor();
    }
}

declare module chessCommonLib {
    /**
     * 公共组
     */
    class GrpConsts {
        /**
         * VIP资源组
         */
        static CHESS_COMMON_VIP: string;
        /**
         * 头像组
         */
        static CHESS_COMMON_HEAD: string;
        /**
         * head
         */
        static CHESS_COMMON_TEST: string;
        /**
         * chat
         */
        static CHESS_COMMON_CHAT: string;
        /**
         * chat3
         */
        static CHESS_COMMON_CHAT3: string;
        /**
         * 礼物音效
         */
        static CHESS_COMMON_GIFT_SOUND: string;
        /**
        * VIP等级动画
        */
        static CHESS_COMMON_ANIM_VIP: string;
        /**
         * 其他资源
         */
        static CHESS_COMMON_OTHER: string;
        /**
         * 三张
         */
        static CHESS_COMMON_SANZHANG: string;
        static CHESS_COMMON_ZHIMA: string;
        static CHESS_COMMON_ZHANGZHOU: string;
        static CHESS_COMMON_ZHIMA_MAHJONG_RESULT: string;
        /**
         * 表情聊天
         */
        static CHESS_COMMON_EMOJCHAT: string;
        /**
         * 礼物动画
         */
        static CHESS_COMMON_GIFT_EFFECT: string;
        constructor();
    }
}

declare module chessCommonLib {
    /**
     * 公共模块
     */
    class CommonModelEvent {
        /**
         * 用户信息模块
         */
        static USERINFO: string;
        /**
         * 商城
         */
        static SHOP: string;
        /**
         * 福利
         */
        static FULI: string;
        /**
         * 活动
         */
        static ACTIVITY: string;
        /**
         * 任务
         */
        static TASK: string;
        /**
         * 保险箱
         */
        static SAFEBOX: string;
        /**
         * 邮件
         */
        static MAIL: string;
        /**
         * VIP
         */
        static VIP: string;
        /**
         * 公告牌
         */
        static NOTICE: string;
        /**
         * 聊天
         */
        static CHAT: string;
        /**
         * 救济金
         */
        static FREECHIP: string;
        /**
         * 红包
         */
        static REDPACKAGE: string;
        /**
         * 好友
         */
        static FRIEND: string;
        /**
         * 排行榜
         */
        static RANK: string;
        /**
         *请求游戏进度数据
         */
        static REQUEST_TASK_SCHEDULE: string;
        /**
         *返回游戏进度数据
         */
        static RESPOND_TASK_SCHEDULE: string;
        /**
         *请求时时彩信息
         */
        static REQUEST_SHISHICAI_INFO: string;
        /**
         *返回时时彩信息
         */
        static RESPOND_SHISHICAI_INFO: string;
        /**
         * 广告牌点击
         */
        static SYSMSG_CLICK: string;
        /**
         * 对局流水
         */
        static GAME_WATER: string;
        /**
         * 游戏帮助
         */
        static GAME_HELP: string;
        /**
         * 时时彩
         */
        static SSC: string;
        /**
         *喜从天降活动广播
         */
        static SUPRISE_GIFT_CMD_BRD: string;
        /**
         *喜从天降充值成功
         */
        static SUPRISE_GIFT_RECHARGED: string;
        /**
         *打开福袋暴击红包
         */
        static BAOJI_REDPACK: string;
        /**
         *打开无座玩家面板
         */
        static NO_SEAT_USER: string;
        /**
         *游戏调用大厅设置
         */
        static GAME_SETTING: string;
        /**
         *游戏记录  两个参数{gameId:175,skin:0}
         * skin 0:默认皮肤  1：绿色  2：蓝色  3紫色
         */
        static GAME_RECORD: string;
    }
}

declare module chessCommonLib {
    class ConfigMgr {
        constructor();
        private static _instance;
        static getInstance(): ConfigMgr;
        private loginData;
        /**
         * 获取登录配置
         */
        getLoginCfg(tag?: string): any;
        sign: any;
        /**道具表 */
        goods: any;
        /**商城物品 */
        shop: any;
        /**每日任务 充值任务等 */
        task: any;
        /**游戏配置列表 */
        lobbyGameList: any;
        /**游戏列表 */
        gameList: any;
        /**限时活动 */
        limit: any;
        /**幸运翻翻翻 */
        luck: any;
        /**游戏玩法列表 */
        playTypeList: any;
        headMc: any;
        /**
         * vip配置
         */
        vip: any;
        private _tableInited;
        /**游戏内周边功能显示控制 */
        gameOptions: gameOptions;
        tableInited(): boolean;
        /**
         * 初始化配置
         */
        initTables(): void;
        /**获取玩法列表 */
        getPlayTypeDes: (id: number) => string;
        /**所有玩法id 转换desc  这个传入的参数就是玩法列表，目前的使用方法是
         * chessCommonLib.ConfigMgr.getInstance().getPlayTypeByList(game.RoomInfo.getInstance().playTypeList);
         * 其中game是mahjongClientLib里面的
         * @author garr
         * 2018-5-28
        */
        getPlayTypeByList(playTypeList: number[]): string;
        /**
         * 通过签到ID获取任务配置
         */
        getSignCfgById(lobbyId: number): table.TableSignIn;
        /**
         * 通过任务ID获取任务配置
         */
        getTaskCfgById(taskId: number): table.LobbyTaskConfig;
        /**
         * 通过shopID获取商城配置
         */
        getShopCfgById(shopId: number): table.TableShopConfig;
        /**
         * 通过goodId获取物品配置
         */
        getGoodCfgById(goodId: number): table.TableGoodsConfig;
        /**
         * 通过goodId获取限时优惠配置
         */
        getLimitCfgById(limitId: number): table.TableLimitOfferConfig;
        /**
         * 通过gameId获取游戏列表配置
         */
        getGameListCfgById(gameId: number): table.TableLobbyGameList;
        /**
         * 通过游戏ID获得游戏配置项
         */
        getGameCfgById(gameId: number): table.gameList;
        /**
         * 通过vip等级获得vip
         */
        getVipByLevel(level?: number): table.TableVip;
        /**
         * 通过id获取头像动画
         */
        getheadMcById(id?: number): table.headMc;
        getNameColor(level: number): number;
        /**
         * 获取gamelist配置
         */
        getGameListCfg(remoteBack?: Function, thisObj?: any): table.gameList;
    }
}

declare module chessCommonLib {
    /**
     * 公用模块
     */
    class ModuleMgr {
        constructor();
        private static _instance;
        private _loadingCls;
        skinType: number;
        isFullScreen: boolean;
        static getInstance(): ModuleMgr;
        /**
         * 打开确认框
         */
        showConfirm(info: string, title?: string, oktxt?: string, okFunc?: Function, caltxt?: string, calFunc?: Function, thisObj?: any, cotainer?: egret.DisplayObjectContainer): void;
    }
}

declare module chessCommonLib {
    /**
     * 轻提示
     */
    class PublicTipMgr {
        private static instance;
        constructor();
        static getInstance(): PublicTipMgr;
        /**
         * 房费提示
         */
        private _tipsPanel;
        showTipsShow(msg: string): void;
        destory(): void;
        private getContainer();
        private showList;
        showMildWarnShow(msg: string): void;
        private removeStage(evt);
    }
    class MildAlertVC extends egret.Sprite {
        private _bg;
        private _text;
        constructor();
        private initUI();
        /**
         *
         * @param message
         *
         */
        setText(message: string): void;
        private showDelay();
        destory(): void;
    }
}

declare module chessCommonLib {
    class UserInfoMgr {
        private static _data;
        /**
         * 用户ID
         */
        static uid: number;
        /**
         * 用户ID
         */
        static nickName: string;
        /**
         * 所属平台ID
         */
        static platId: number;
        /**
         * 用户ID
         */
        static subPlatId: string;
        /**
         * 用户筹码
         */
        private static _chips;
        /**
         * 金币  ---  捕鱼大厅金币<捕鱼大厅专用>
         */
        private static _goldChips;
        /**
         * 体验币 ---  捕鱼大厅体验币<捕鱼大厅专用>
         */
        private static _freeChips;
        /**
         * 用户头像地址
         */
        private static _headUrl;
        /**
         * 性别
         */
        static gender: string;
        /**
         * email
         */
        static email: string;
        /**
        * 个性签名
        */
        static signature: string;
        /**
        * 奖券数量
        */
        static _giftCoupon: number;
        /**
         * 用户等级
         */
        static level: number;
        /**
        * 在线礼包时间 为-1时没有礼包可领
        */
        private static _ol_Time;
        /**
         * 聊天计时
        */
        private static _isClick;
        /**
        * 银行存款
        */
        static _bankChips: number;
        static sumRecharge: number;
        static total_ol_Time: number;
        /**
        * 房卡
        */
        static _fangka: number;
        /**
         * 钻石
         */
        static _diamond: number;
        /**
        * 在线礼包时间
        */
        /**
        * 在线礼包时间
        */
        static ol_Time: number;
        static fangka: number;
        static isClick: boolean;
        static diamond: number;
        /**
         * 是否显示滑动： 0:不显示; 1：右滑; 2：左滑
         */
        static slipStatus: number;
        static readonly data: Cmd.UserBaseInfo;
        static init(info: any, initGold?: boolean): void;
        /**
         * VIP等级
         */
        static vipLevel: number;
        static chips: number;
        /**捕鱼大厅金币 */
        /**捕鱼大厅金币 */
        static goldChips: number;
        /**
         * 体验币
         */
        /**
         * 体验币
         */
        static freeChips: number;
        /**
         * 头像
         */
        /**
        * 头像
        */
        static headUrl: string;
        /**
         * 第三方平台积分余额
         */
        private static _platPoint;
        static platPoint: number;
        static bankChips: number;
        static nickname: string;
        /**
        *获取奖券数量
        */
        static giftCoupon: number;
    }
}

declare module chessCommonLib {
    class gameOptions {
        /**
        * 左侧滑动聊天
        */
        leftChat: boolean;
        /**
        * 广告跑马灯
        */
        notice: boolean;
        /**
        * 商城购买
        */
        market: boolean;
        /**
         * 游戏任务
         */
        task: boolean;
        /**
        * 银行（保险箱）
        */
        bank: boolean;
        /**
        * 排行榜
        */
        rank: boolean;
        /**
        * 时时彩
        */
        ssc: boolean;
        /**
        * 福袋
        */
        fupack: boolean;
        /**
        * 个人信息面板
        */
        user: boolean;
        /**
         * 喇叭 屏蔽房间和大厅的和喇叭相关的东西
         */
        horn: boolean;
        /**
        *  麻将分享按钮
        */
        share: boolean;
        /**
       *  大厅模式，true 可以退回到大厅的，false 不能退回到大厅
       */
        lobbyMode: boolean;
    }
}

declare module chessCommonLib {
    class initOptions {
        /**
         * 资源配置URL
         */
        resConfig: string;
        /**
         * 皮肤配置
         */
        thmConfig: string;
        /**
         * 资源根目录
         */
        resRoot: string;
        gameEui: string;
        /**
         * 启用远程资源模式 默认为true
         */
        remoteMode: boolean;
        /**
        * 是否全屏
        */
        static isFullScreen: boolean;
        static fullScreen(): void;
    }
}

declare module table {
    /**
     * FILE: Vip资源表.xlsx SHEET: Sheet1
     */
    class TableVip {
        id: number;
        /**
         * 大厅ID
         */
        lobbyId: number;
        /**
         * VIP等级
         */
        level: number;
        /**
         * 头像框
         */
        head_frame: string;
        /**
         * 大ICON
         */
        icon_big: string;
        /**
         * 小ICON
         */
        icon_small: string;
        /**
         * 昵称颜色
         */
        nickNameColor: string;
        /**
         * 头像动画ID
         */
        head_mc: number;
        GetType(): string;
    }
}

declare module table {
    /**
     * FILE: 头像框动画表.xlsx SHEET: Sheet1
     */
    class headMc {
        id: number;
        /**
         * 头像动画
         */
        head_mc: string[];
        GetType(): string;
    }
}

declare module chessCommonLib {
    class FashionDataUtils {
        constructor();
        /**
         * 获取个性头像Id
         */
        static getPersonHeadMcId(personInfo: Cmd.PersonalImage[]): number;
        /**
         * 获取VIP设置等级
         */
        static getPersonVipLevel(personInfo: Cmd.PersonalImage[]): number;
    }
}

declare module chessCommonLib {
    class LoadGameTipUtil {
        private static _loadingCls;
        static fastGameId: number;
        static gameScaleY: number;
        static offsetX: number;
        static ExitTipText: string;
        /**显示退出和取消按钮文字显示 */
        static showExitConfrimTxt: boolean;
        private static _positionDic;
        /**
         * 设置loadingUI
         */
        static loadingCls: any;
        /**
         * 游戏加载按钮注册响应事件
         * @param ui
         * @param gameId
         * @param x
         * @param y
         * @param loadend  显示对象或者回调处理函数
         */
        static reg(ui: egret.DisplayObjectContainer, gameId?: number, x?: number, y?: number, loadend?: any, thisObj?: any): void;
        private static _loadingGameId;
        static readonly loadingGameId: number;
        static loadGameById(ui: egret.DisplayObjectContainer, gameId: number, loadend?: any, x?: number, y?: number, d?: number): void;
        static isLoadingOther(): boolean;
        /**
         * 加载游戏
         */
        static loadGame(gameId: number, succ: Function, fail: Function, process: Function, thisObj: any): void;
        private static _currentLoadGame;
        private static onTouchHandle(e);
        private static onProcess(per);
        private static onLoadGame();
        private static onLoadFail();
        static destroy(): void;
    }
    /**
     * 加载位置
     */
    class LoadGameVo {
        ui: egret.DisplayObjectContainer;
        position: egret.Point;
        gameId: number;
        loadend: any;
        thisObj: any;
    }
}

declare module chessCommonLib {
    class LoadPanelTipMgr {
        private static _instance;
        static getInstance(): LoadPanelTipMgr;
        private _loadPanelVo;
        loadRes(resouceId?: string, succ?: Function, needH5Load?: boolean): void;
        private onResourceProgress(per);
        private onResourceLoadComplete(evt);
        private onResourceLoadError(evt);
        isLoading(): boolean;
    }
}

declare module chessCommonLib {
    class NumberUtil {
        constructor();
        /**货币规格 */
        static numberFormat(num: any): string;
        /**
         * 格式化数字
         */
        static numFormat2(num: number): string;
        /**获取JavaScript类型 */
        static getType(o: any): any;
    }
}

declare module chessCommonLib {
    class ResLoadUitl {
        static Enable: boolean;
        private static isLoad;
        static load(grp: string[]): void;
        private static removeEvent();
        private static onUniLibResLoadComplete(event);
        static hasLoad(): boolean;
        private static onUniLibResLoadError(event);
    }
}

declare module chessCommonLib {
    class SendGiftUtils {
        constructor();
        /**
         * 发送礼物     giftId礼物编号      receivePos终点位置      sendPos起始位置
         */
        static sendGift(giftId: number, receivePos: egret.Point, sendPos: egret.Point, container?: egret.DisplayObjectContainer, animationName?: string): void;
    }
}
