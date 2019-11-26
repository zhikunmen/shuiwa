module gamedismiss {
    export class GameDismissPanel extends commonpanel.LobbyBaseEuiPanel {
        private yesBtn: uniLib.EuiButton;
        private noBtn: uniLib.EuiButton;
        private _timer: egret.Timer;
        private _startTime: number;
        private _totalTime: number;
        private info: egret.TextField;
        private _userList: Array<number>;
        private _timeTxt: egret.TextField;
        private _colorArr: Array<number> = [0xff7200, 0x119300, 0xff0c00];
        /**0 解散房间 1 切换房间人数 */
        private _dissGame: number;
        public constructor() {
            super("chaguan_gps_title_png", 1009, 622);
            this.skinName = "GameDismissSkin";
        }
        protected createChildren() {
            super.createChildren();
            // this.addEvent();
        }

        // private addEvent() {
        //     this.noBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefuse, this);
        //     this.yesBtn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgreeHandler, this);

        //     this.noBtn.setBtnText("拒  绝");
        //     this.yesBtn.setBtnText("同  意");
        // }
        // private initPanel(): void {
        //     this.touchEnabled = true;

        //     this.info = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.LEFT, "", 32, 50, 50, 500);
        //     this.info.lineSpacing = 10;
        //     this.addChild(this.info);
        //     for (var i = 0; i < 4; i++) {
        //         this["_userName" + i] = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.LEFT, "", 32, 137, 193 + 53 * i, 222);
        //         this.addChild(this["_userName" + i]);
        //         this["_status" + i] = ResUtil.createTextFeild(0x3e3e49, egret.HorizontalAlign.CENTER, "", 32, 328, 193 + 53 * i, 150);
        //         this.addChild(this["_status" + i]);
        //     }
        //     this._timeTxt = ResUtil.createTextFeild(0xDB4508, egret.HorizontalAlign.RIGHT, "", 25, 540, 40, 50);
        //     this.addChild(this._timeTxt);
        // }
        // private stopTimer(): void {
        //     if (this._timer) {
        //         this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        //         this._timer.stop();
        //         this._timer = null;
        //     }
        // }
        // private timerHandle(evt: egret.Timer): void {
        //     var data: Date = new Date();
        //     var now: number = data.getTime();
        //     var num: number = this._totalTime - (now - this._startTime) / 1000;
        //     if (num > 0) {
        //         this._timeTxt.text = Math.floor(this._totalTime - (now - this._startTime) / 1000).toString();
        //     } else {
        //         this.dispatchEventWith(UIEventConsts.CLOSE);
        //     }
        // }
        // public setData(vo: any): void {
        //     this.initPanel();
        //     this._dissGame = 1;
        //     //暂时用等待时间来判断是解散房间还是修改房间人数。   修改房间人数 目前是没有等待时间
        //     if (vo.waitTime) {
        //         this._dissGame = 0;
        //         this._totalTime = vo.waitTime;
        //         this.stopTimer();
        //         var data: Date = new Date();
        //         this._startTime = data.getTime();
        //         this._timer = new egret.Timer(200, 0);
        //         this._timer.addEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        //         this._timer.start();
        //         this._timeTxt.text = this._totalTime.toString();
        //     }
        //     var user: UserVo = RoomInfo.getInstance().getUserVoByUid(vo.uid);
        //     if (user) {
        //         var str: string = DataCache.langObj.uiTxt.DismissPanel.info;
        //         var arr: Array<string> = str.split("#");
        //         if (!vo.waitTime) {
        //             var msg: string = arr[0] + user.nickName + "\n申请将房间人数设置为" + pdk_bsc.RoomInfo.getInstance().userList.length;
        //         } else {
        //             var msg: string = arr[0] + user.nickName + arr[1];
        //         }
        //         this.info.text = msg;
        //     }
        //     var userList: Array<UserVo> = RoomInfo.getInstance().userList;
        //     this._userList = [];
        //     var index: number = 0;
        //     for (var i = 0; i < userList.length; i++) {
        //         if (userList[i]) {
        //             this["_userName" + index].text = userList[i].nickName;
        //             this["_status" + index].text = DataCache.langObj.uiTxt.DismissPanel.status0;
        //             this["_status" + index].textColor = this._colorArr[0];
        //             this._userList.push(userList[i].uid);
        //             if (userList[i].uid == vo.uid) {
        //                 this["_status" + index].textColor = this._colorArr[1];
        //                 this["_status" + index].text = DataCache.langObj.uiTxt.DismissPanel.status1;
        //             }
        //             index++;
        //         }
        //     }
        //     if (vo.uid == uniLib.UserInfo.uid) {
        //         this.enableBtns();
        //     }
        // }

        // private enableBtns(): void {
        //     if (this.yesBtn) {
        //         this.yesBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onAgreeHandler, this);
        //     }
        //     if (this.noBtn) {
        //         this.noBtn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onRefuse, this);
        //     }
        // }
        // public updateStatus(status: number, uid: number): void {
        //     if (status == 0) {
        //         status = 2;
        //     }
        //     var index: number = this._userList.indexOf(uid);
        //     if (index >= 0) {
        //         this["_status" + index].text = DataCache.langObj.uiTxt.DismissPanel["status" + status];
        //         this["_status" + index].textColor = this._colorArr[status];
        //     }
        // }
        // private onAgreeHandler(evt: egret.Event): void {
        //     if (this._dissGame == 0) {
        //         this.dispatchEventWith(UIEventConsts.DISMISS_BACK, false, 1);
        //     } else {
        //         this.dispatchEventWith(UIEventConsts.AGREE_CHANGE_USERNUM, false, 1);
        //     }
        // }
        // private onRefuse(evt: egret.Event): void {
        //     if (this._dissGame == 0) {
        //         this.dispatchEventWith(UIEventConsts.DISMISS_BACK, false, 0);
        //     } else {
        //         this.dispatchEventWith(UIEventConsts.AGREE_CHANGE_USERNUM, false, 0);
        //     }
        // }
        // public destory() {
        //     this.enableBtns();
        //     if (this.yesBtn) {
        //         this.yesBtn.dispose();
        //         uniLib.DisplayUtils.removeAllChildren(this.yesBtn);
        //         uniLib.DisplayUtils.removeFromParent(this.yesBtn);
        //     }
        //     this.yesBtn = null;
        //     if (this.noBtn) {
        //         this.noBtn.dispose();
        //         uniLib.DisplayUtils.removeAllChildren(this.noBtn);
        //         uniLib.DisplayUtils.removeFromParent(this.noBtn);
        //     }
        //     this.noBtn = null;
        //     if (this._timer) {
        //         this._timer.removeEventListener(egret.TimerEvent.TIMER, this.timerHandle, this);
        //         this._timer.stop();
        //     }
        //     this._timer = null;
        //     uniLib.DisplayUtils.removeAllChildren(this);
        //     uniLib.DisplayUtils.removeFromParent(this);
        //     this.info = null;
        //     this._timeTxt = null;
        //     this._userList = null;
        // }
    }
}