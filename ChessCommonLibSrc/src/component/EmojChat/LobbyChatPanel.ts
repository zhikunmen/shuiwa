
module chessCommonLib {
    /**大厅聊天面板 */
    export class LobbyChatPanel extends eui.Component {

        private chatSend: eui.Button;
        private chatClose: eui.Button;
        private sendClock: eui.Label;
        private hornNum: eui.Label;

        private chatFaceIcon: eui.Image;
        private chatContentLable: eui.EditableText;

        private chatFacePanel: chessCommonLib.LobbyChatFaceComponent;

        public loadingTip: egret.tween.TweenGroup;
        private loading_img: eui.Image;
        private sendDisable: eui.Image;
        private hornIcon: eui.Image;
        private send_word: eui.Image;

        private chatScroll: eui.Scroller;
        private chatList: eui.List;

        private isTour: boolean = false;


        private arrCol: eui.ArrayCollection;

        private chatData: any[];
        /**控制按钮上倒计时 */
        private _countTime: egret.Timer;
        private counTime: number;
        private tempTimer: number;
        private tempTimer2: number;

        private touchMask: eui.Rect;
    

        constructor() {
            super();
            this.once(eui.UIEvent.COMPLETE, this.uiCompHandler, this);
            this.skinName = "chessCommonLib.LobbyChatPanelSkin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
        }

        private uiCompHandler() {
            this.chatFacePanel = new chessCommonLib.LobbyChatFaceComponent();
            this.chatFacePanel.touchEnabled = true;
            this.chatFacePanel.x = 178;
            this.chatFacePanel.y = 194;

            this.addChild(this.chatFacePanel);
            this.chatFacePanel.visible = false;
            this.touchMask.touchEnabled = false;
            this.init();
        }

        protected init() {
            this.chatContentLable.text = "";
            // this.chatContentLable.maxChars = 60;
            // this.chatContentLable.restrict = "^\(\)\r\n"
            this.chatContentLable.restrict = "^\r\n"
            this.chatData = [];
            this.chatList.useVirtualLayout = false;
            this.chatList.itemRenderer = chessCommonLib.LobbyChatListItem;
            this.arrCol = new eui.ArrayCollection(this.chatData);

            this.chatList.dataProvider = this.arrCol;
            // this.isInGame();
            this.chatScroll.visible = false;
            this.cartonControl(true);


            this.tempTimer2 = egret.setTimeout(() => {
                this.getChatData();
            }, this, 200)
            this.addEvent();
            this.arrCol.removeAll();
            this.arrCol.refresh();
        }

        private isInGame() {
            if (uniLib.Global.isInGame) {
                this.hornIcon.visible = false;
                this.hornNum.visible = false;
            }
        }
        /**每次弹出调用 */
        public initView() {
            // this.chatData = [];
            this.chatScroll.visible = true;
            // this.getChatData();
            this.visible = true;

            // this.tempTimer = egret.setTimeout(() => {
            //     // this.chatScroll.visible = true;
            //     // this.cartonControl(false);
            // }, this, 200)
            this.BtnHandle();
        }

        protected addEvent() {
            this.touchMask.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatFaceIcon.addEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatClose.addEventListener(egret.TouchEvent.TOUCH_TAP, this.chatCloseHander, this);
            this.chatSend.addEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChatMsg, this);
            this.chatContentLable.addEventListener(egret.Event.CHANGE, this.onChang, this);
            this.chatContentLable.addEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            ChatEventDispatcher.instance.addEventListener(ChatEventConsts.SEND_SMILEY, this.showFaceText, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.CHAT_INIT, this.initData, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG, this.onGetSZchatInfo, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_INGAME, this.onGetSZchatInfo, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF, this.onGetSZchatInfoself, this);
            uniLib.Global.addEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF_FAIL, this.selfFail, this);


        }
        protected removeEvent() {
            this.chatContentLable.removeEventListener(eui.UIEvent.FOCUS_OUT, this.hidephonevc, this);
            this.touchMask.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatFaceIcon.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.showFacePanel, this);
            this.chatClose.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.chatCloseHander, this);
            this.chatSend.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.sendChatMsg, this);
            this.chatContentLable.removeEventListener(egret.Event.CHANGE, this.onChang, this);
            ChatEventDispatcher.instance.removeEventListener(ChatEventConsts.SEND_SMILEY, this.showFaceText, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.CHAT_INIT, this.initData, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG, this.onGetSZchatInfo, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_INGAME, this.onGetSZchatInfo, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF, this.onGetSZchatInfoself, this);
            uniLib.Global.removeEventListener(chessCommonLib.ChatEventConsts.WORLD_MSG_SELF_FAIL, this.selfFail, this);

        }

        /**初始化请求聊天信息 */
        public getChatData() {
            this.cartonControl(true);
            this.chatScroll.visible = false;
            //这里监听list的item都构建完成，添加到list上。
            this.chatList.once(egret.Event.ADDED, this.showRender, this)

            this.tempTimer = egret.setTimeout(() => {
                let req: Cmd.GetCommonChatInfoLobby_C = new Cmd.GetCommonChatInfoLobby_C();
                let socket = eval(chessCommonLib.CommonVariable.getInstance().socketName[0]);
                socket.NetMgr.tcpSend(req);
                // 游戏内初始化两次，分别建立向大厅和向游戏服务器的socket
                if (uniLib.Global.isInGame&&chessCommonLib.CommonVariable.getInstance().socketName[1]) {
                    let reqLobby: Cmd.GetCommonChatInfoLobby_C = new Cmd.GetCommonChatInfoLobby_C();
                    let socketLobby = eval(chessCommonLib.CommonVariable.getInstance().socketName[1]);
                    socketLobby.NetMgr.tcpSend(reqLobby);
                }
            }, this, 0);

        }
        /**初始化数据 */
        private initData(e: uniLib.ZqEvent) {
            var rev: Cmd.GetCommonChatInfoLobby_S = e.param;
            var data = rev.info;
            this.chatContentLable.prompt = "请在此输入内容，总长度不超过40个字~";
            if (rev.horn) {
                this.hornNum.text = "×" + rev.horn;
                if (rev.horn == 0) {
                    this.chatContentLable.prompt = "你没有喇叭，无法发布世界消息。请您先购买喇叭~！";
                }
            }

            if (rev.state && rev.state == 1 && !uniLib.Global.isInGame) {
                this.chatContentLable.prompt = "你是游客，无法发言，请绑定手机号！";
                this.isTour = true;
            }
            else {
                this.isTour = false;
            }
            if (Array.isArray(data)) {
                for (let i = 0; i < data.length; i++) {
                    if (data[i].type == void 0) { data[i].type = 0 }
                    if (data[i].timestamp == void 0) { data[i].timestamp = 0 }
                    chessCommonLib.CommonVariable.add({
                        "nickName": data[i].nickName,
                        "vip": data[i].vipLevel,
                        "content": (data[i].chatInfo).toString(),
                        "type": (data[i].type).toString(),
                        "timestamp": (data[i].timestamp).toString(),
                    }, this.chatData)
                }
            }
            this.sortByTimestamp();
            //这里push一个空数据，为了兼容测量不准确的问题，因为游戏内初始化聊天会初始化两次，所以弹出一次大厅的

            this.arrCol.removeAll();
            this.arrCol.replaceAll(this.chatData);
            // this.chatScroll.visible = false;
            this.chatList.validateNow();
            if (this.chatScroll.viewport.contentHeight > 453) {
                this.chatScroll.viewport.scrollV = this.chatScroll.viewport.contentHeight - this.chatScroll.height;
            }

        }

        private showRender() {
            console.error(" 将要更新和呈现显示列表时调度。");
            this.cartonControl(false);
            if (this.chatScroll)
                this.chatScroll.visible = true;
        }

        /**点击发送 */
        private sendChatMsg() {
            console.error("点击发送", this.chatContentLable.text);
            if (this.chatContentLable.text == "") {
                uniLib.TipsUtils.showTipsDownToUp("请输入聊天内容");
                return;
            }
            if (CommonVariable.getInstance().isForbidden) {
                this.showFailToast();
                return;
            }
            let req: Cmd.LobbyCommonChatLobby_C = new Cmd.LobbyCommonChatLobby_C();
            req.chatInfo = this.chatContentLable.text;
            let socket = eval(chessCommonLib.CommonVariable.getInstance().socketName[0]);
            socket.NetMgr.tcpSend(req);
        }

        /**新的聊天信息自己 */
        private onGetSZchatInfoself(e: uniLib.ZqEvent) {

            this.showRender();
            var chatself: Cmd.LobbyCommonChatLobby_S = e.param;
            this.chatContentLable.text = "";
            this.counTime = chatself.remainder;
            if (this.counTime > 1000) {
                this.counTime = parseInt((this.counTime / 1000) + "")
            }
            if (this.counTime == void 0) {
                this.counTime = 10
            }

            this.timerComFunc();

            if (chatself.horn) {
                this.hornNum.text = "×" + chatself.horn;
                if (chatself.horn == 0) {
                    this.chatContentLable.prompt = "你没有喇叭，无法发布世界消息。请您先购买喇叭~！";
                }
            }

            if (this._countTime) {
                this._countTime.stop();
            }
            else {
                this._countTime = new egret.Timer(1000, this.counTime + 1);
                this._countTime.addEventListener(egret.TimerEvent.TIMER, this.onTimer, this);
                this._countTime.addEventListener(egret.TimerEvent.TIMER_COMPLETE, this.timerComFunc, this);
            }
            this._countTime.start();
            this.chatSend.skin["sendDisable"].visible = true;
            this.chatSend.touchEnabled = false;
            this.chatSend.skin["sendClock"].visible = true;

        }
        /**自己返回失败 */
        private selfFail() {
            this.showFailToast();
            CommonVariable.getInstance().isForbidden = true;
        }
        /**控制按钮上倒计时 */
        private onTimer(): void {
            if (this.counTime < 0) {
                this.timerComFunc();
            }

            this.chatSend.skin["send_word"].visible = false;
            this.chatSend.skin["sendClock"].text = "" + this.counTime;
            this.counTime--;
        }
        /**控制按钮上倒计时 */
        private timerComFunc() {
            if (this._countTime) {
                this._countTime.stop();
                this._countTime.reset();
                this.chatSend.skin["sendDisable"].visible = false;
                this.chatSend.skin["sendClock"].visible = false;
                this.chatSend.skin["sendClock"].text = "";
                this.chatSend.touchEnabled = true;
                this.chatSend.skin["send_word"].visible = true;

            }
        }

        /**新加的聊天信息 */

        private onGetSZchatInfo(e: uniLib.ZqEvent) {
            this.chatScroll.visible = true;
            var chat: Cmd.CommonChatInfo = e.param;
            if (chat.type == void 0) { chat.type = 0; }
            // this.layoutRefresh(2);
            chessCommonLib.CommonVariable.add({
                "nickName": chat.nickName,
                "vip": chat.vipLevel,
                "content": chat.chatInfo,
                "type": (chat.type).toString(),
            }, this.chatData)

            this.arrCol.refresh();
            // this.layoutRefresh(1);
            this.chatList.validateNow();
            if (this.chatScroll.viewport.contentHeight > 453) {
                this.chatScroll.viewport.scrollV = this.chatScroll.viewport.contentHeight - this.chatScroll.height; //减去数值是因为空白消息存在的误差？
            }
        }

        /**空白消息 ,为了解决eui布局测量误差   1：添加一条空白信息 2:移除最上面的空白信息*/
        private layoutRefresh(num: number) {
            if (num === 1) {
                chessCommonLib.CommonVariable.add({
                    "nickName": "",
                    "vip": -1,
                    "content": "",
                }, this.chatData)

                // this.chatList.validateNow();
                this.arrCol.refresh();
            }
            else if (num === 2) {
                this.chatData.pop();
            }
        }

        /**显示表情面板 */
        private showFacePanel() {
            this.chatFacePanel.visible = !this.chatFacePanel.visible;
            this.touchMask.touchEnabled = !this.touchMask.touchEnabled;
        }

        private showFaceText(event: egret.Event) {
            if (chessCommonLib.CommonVariable.getStrRealLength(this.chatContentLable.text) >= 80) {
                return;
            }
            this.chatContentLable.text = this.chatContentLable.text + "(" + event.data + ")";
            this.BtnHandle();
        }

        private onChang(e: egret.Event) {
            this.chatContentLable.text = chessCommonLib.CommonVariable.handleString(this.chatContentLable.text, 80);
            //有输入
            this.BtnHandle();
            // if (this.chatContentLable.text.indexOf("(") != -1 ||
            //     this.chatContentLable.text.indexOf(")") != -1) {
            //     // uniLib.TipsUtils.showTipsDownToUp("字符串非法");
            //     let text1 = this.chatContentLable.text.replace(/\(/g, "").replace(/\)/g, "");
            //     // this.chatContentLable.text = text1;
            // }

        }

        /**当输入框内容为空，置灰发布按钮 */
        private BtnHandle() {
            if (this._countTime && this._countTime.running) return;
            if (this.chatContentLable.text && this.chatContentLable.text.length > 0 && !this.isTour) {
                this.chatSend.skin["sendDisable"].visible = false;
                this.chatSend.skin["send_wordDisable"].visible = false;
                this.chatSend.skin["send_word"].visible = true;
                this.chatSend.touchEnabled = true;
            }
            else {
                this.chatSend.skin["sendDisable"].visible = true;
                this.chatSend.skin["send_wordDisable"].visible = true;
                this.chatSend.skin["send_word"].visible = false;
                this.chatSend.touchEnabled = false;


            }
            this.chatList.validateNow();
            egret.setTimeout(() => {
                if (this.chatScroll.viewport.contentHeight > 453) {
                    this.chatScroll.viewport.scrollV = this.chatScroll.viewport.contentHeight - this.chatScroll.height;
                }
            }, this, 200)

        }
        /**根据时间戳排序 */
        private sortByTimestamp() {
            var compare = function (x, y) {//比较函数
                if (x.timestamp < y.timestamp) {
                    return -1;
                } else if (x.timestamp > y.timestamp) {
                    return 1;
                } else {
                    return 0;
                }
            }
            this.chatData.sort(compare)

        }
        /**控制未加载前缓动动画 */
        private cartonControl(boo) {
            if (boo) {
                uniLib.DisplayUtils.playTweenGroup(this.loadingTip, true);
                this.loading_img.visible = true;
            }
            else {
                uniLib.DisplayUtils.stopTweenGroup(this.loadingTip);
                this.loading_img.visible = false;

            }
        }

        /**关闭当前面板 */
        public chatCloseHander() {
            //这个事件是为了让游戏内自己的弹窗类控制
            this.dispatchEventWith("close");
            uniLib.PopUpMgr.removePopUp(this);
            this.visible = false;
            console.error("关闭当前面板");
            // this.removeEvent();
        }

        public destroy() {

            console.error("关闭当前面板-destroy111");
            if (this._countTime) {
                // this._countTime.stop();
            }
            if (this.chatContentLable.text != "") {

            }
            if (this.tempTimer) {
                egret.clearTimeout(this.tempTimer);
            }
            if (this.tempTimer2) {
                egret.clearTimeout(this.tempTimer2);
            }

        }
        private hidephonevc() {
            try {
                uniLib.ZQGameSdk.hideVk();
            }
            catch (e) {

            }
        }
        /**显示错误提示 */
        private showFailToast() {
            window["dynamicCode"] = `SZLobby.LobbyPopupManager.showMildWarnShow("你已经被禁言，请联系客服");`;
            window['eval'].call(window, window["dynamicCode"]);
        }

        /***这个负责彻底销毁调用 */
        public dispose() {
            uniLib.PopUpMgr.removePopUp(this);
            this.removeEvent();
            this.chatData = [];
            if (this._countTime) {
                this._countTime.stop();
            }
            if (this.tempTimer) {
                egret.clearTimeout(this.tempTimer);
            }
            if (this.tempTimer2) {
                egret.clearTimeout(this.tempTimer2);
            }
            this.arrCol.removeAll();
            uniLib.DisplayUtils.removeAllChildren(this);
            uniLib.DisplayUtils.removeFromParent(this);

        }

    }

}