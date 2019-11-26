module guide {
    /**
     * 新手七日成长任务
     */
    export class GuideTaskPanel extends eui.Component {

        public light_img: eui.Image;
        public exchange_btn: eui.WxButton;
        public task_lst: eui.List;
        public day_lst: eui.List;
        public reward_lbl: eui.Label;
        public giftCount_lbl: eui.Label;
        public pro_lbl: eui.Label;
        public proBg_img: eui.Image;
        public pro_img: eui.Image;

        private _selectIndex: number;
        private _taskCollArr: eui.ArrayCollection;
        private _info: Cmd.GetGrowTaskInfoHpMatchCmd_S;

        public constructor(info?: Cmd.GetGrowTaskInfoHpMatchCmd_S) {
            super();
            this._info = info;
            this.skinName = "GuideTaskPanelSkin";
        }

        public childrenCreated(): void {
            super.childrenCreated();

            if (uniLib.Global.isInGame) {
                this.proBg_img.visible = true;
                this.pro_img.visible = true;
                this.pro_img.width = uniLib.UserInfo.giftCoupon >= 500 ? 240 : Math.floor((uniLib.UserInfo.giftCoupon / 500) * 240);
            }

            uniLib.Global.addEventListener(guide.GuideConsts.GUIDE_TASK_DATA, this.onUpdate, this);
            this.exchange_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.light_img.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.addEventListener(GuideConsts.CLOSE_GUIDE_TASK, this.close, this);
            this.task_lst.itemRenderer = GuideTaskItem;
            this._taskCollArr = new eui.ArrayCollection();
            this.task_lst.dataProvider = this._taskCollArr;
            this.day_lst.addEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            this.day_lst.itemRenderer = GuideTaskBtn;

            if (this._info) {
                this.setData(this._info);
            }
            else {
                NetMgr.tcpSend(new Cmd.GetGrowTaskInfoHpMatchCmd_C());
            }
        }

        private setData(info: Cmd.GetGrowTaskInfoHpMatchCmd_S) {
            this.giftCount_lbl.text = info.rewards + "福卡";
            this.day_lst.selectedIndex = info.day - 1;
            this._selectIndex = this.day_lst.selectedIndex;
            if (info.open == 0) {
                this.light_img.visible = false;
                this.pro_lbl.text = `进度:${info.current}/${info.taskInfos.length}`;
            }
            else if (info.open == 1) {
                this.light_img.visible = true;
                this.pro_lbl.text = "可领取";
                egret.Tween.get(this.light_img, { loop: true }).to({ rotation: 360 }, 1000);
            }
            else if (info.open == 2) {
                this.light_img.visible = false;
                this.pro_lbl.text = "已领取";
            }
            this.reward_lbl.text = info.dayInfos[info.day - 1].reward + "福卡";
            this.day_lst.dataProvider = new eui.ArrayCollection(info.dayInfos);
            info.taskInfos.forEach((value, index) => { value["index"] = index });
            this._taskCollArr.source = info.taskInfos;
            this._taskCollArr.refresh();
        }

        private onItemTap(evt: eui.ItemTapEvent) {
            let info: Cmd.DayItem = this.day_lst.selectedItem;
            if (info.day < this._info.day) {
                return;
            }
            else if (info.day == this._info.day) {
                if (this._info.open == 0) {
                    this.pro_lbl.text = `进度:${this._info.current}/${this._info.taskInfos.length}`;
                }
                else if (this._info.open == 1) {
                    this.pro_lbl.text = "可领取";
                }
                else if (this._info.open == 2) {
                    this.pro_lbl.text = "已领取";
                }
                this.reward_lbl.text = info.reward + "福卡";
                this._info.taskInfos.forEach((value, index) => { value["index"] = index });
                this._taskCollArr.source = this._info.taskInfos;
                this._taskCollArr.refresh();
            }
            else if (info.day > this._info.day) {
                this.pro_lbl.text = `第${info.day}天解锁`;
                this.reward_lbl.text = info.reward + "福卡";
                let config = ConfigMgr.getInstance().getTaskCfgByDay(info.day);
                let arr = [];
                config.forEach((value, index) => {
                    let a = new Cmd.GrowItem();
                    a.taskId = value.id;
                    a.status = 4;
                    a["index"] = index;
                    arr.push(a);
                });
                this._taskCollArr.source = arr;
                this._taskCollArr.refresh();
            }
            let child = <GuideTaskBtn>this.day_lst.getChildAt(this._selectIndex);
            child.setBg(4);
            this._selectIndex = this.day_lst.selectedIndex;
            child = <GuideTaskBtn>this.day_lst.getChildAt(this._selectIndex);
            child.setBg(3);
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this.exchange_btn) {
                uniLib.PopUpMgr.removePopUp(this);
                LobbyModuleMgr.getInstance().showLobbyActivePanel(1);
            }
            else if (evt.target == this.light_img) {
                let req = new Cmd.GetGrowTaskRewardHpMatchCmd_C();
                req.type = 2;
                NetMgr.tcpSend(req);
            }
        }

        private onUpdate(evt: uniLib.ZqEvent) {
            this._info = evt.param;
            this.setData(evt.param);
        }

        private close() {
            uniLib.PopUpMgr.removePopUp(this);
        }

        public destroy(): void {
            this._info = null;
            this._taskCollArr = null;
            this._selectIndex = null;
            egret.Tween.removeTweens(this.light_img);
            this.day_lst.removeEventListener(eui.ItemTapEvent.ITEM_TAP, this.onItemTap, this);
            uniLib.Global.removeEventListener(guide.GuideConsts.GUIDE_TASK_DATA, this.onUpdate, this);
            this.exchange_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.light_img.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.light_img = null;
            this.removeEventListener(GuideConsts.CLOSE_GUIDE_TASK, this.close, this);
            this.removeChildren();
        }
    }

    class GuideTaskItem extends eui.ItemRenderer {

        public bg_img: eui.Image;
        public finish_btn: eui.WxButton;
        public got_btn: eui.WxButton;
        public icon_img: eui.Image;
        public desc_lbl: eui.Label;
        public num_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "GuideTaskItemSkin";
            this.once(egret.Event.REMOVED_FROM_STAGE, this.destroy, this);
        }

        protected childrenCreated() {
            super.childrenCreated();
            this.got_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.finish_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }

        private onTouch(evt: egret.TouchEvent) {
            if (evt.target == this.got_btn) {
                let config: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(this.data.taskId);
                LobbyModuleMgr.getInstance().openPanelBySkipType(config.skipType);
                this.dispatchEventWith(GuideConsts.CLOSE_GUIDE_TASK, true);
            }
            else if (evt.target == this.finish_btn) {
                let req = new Cmd.GetGrowTaskRewardHpMatchCmd_C();
                req.type = 1;
                req.taskId = this.data.taskId;
                NetMgr.tcpSend(req);
            }
        }

        private getFreeReward() {
            let req = new Cmd.GetFreeDiamondLobbyCmd_C();
            NetMgr.tcpSend(req);
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.GrowItem = this.data;
            let config: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            let str = "";
            info.current != undefined && info.current != null && (str = `<font>(${info.current}/${config.taskCondition})</font>`);
            this.desc_lbl.textFlow = (new egret.HtmlTextParser).parser(config.taskDesc.indexOf("%a") == -1 ? config.taskDesc + str : config.taskDesc.replace("%a", config.taskCondition + "") + str);
            this.bg_img.source = info["index"] % 2 ? "guide_task_json.lb_cz_task_bg_2" : "guide_task_json.lb_cz_task_bg_1";
            this.icon_img.source = "guide_task_json." + config.taskIcon;
            this.num_lbl.text = config.taskReward[0].goodNbr + "";
            if (info.status == 1) {
                this.got_btn.visible = !uniLib.Global.isInGame;
                this.finish_btn.visible = false;
            }
            else if (info.status == 2) {
                this.got_btn.visible = false;
                this.finish_btn.enabled = true;
                this.finish_btn.visible = true;
            }
            else if (info.status == 3) {
                this.got_btn.visible = false;
                this.finish_btn.visible = true;
                this.finish_btn.enabled = false;
            }
            else if (info.status == 4) {
                this.got_btn.visible = false;
                this.finish_btn.visible = false;
            }
        }

        public destroy() {
            this.got_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
            this.finish_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouch, this);
        }
    }

    class GuideTaskBtn extends eui.ItemRenderer {

        public bg_img: eui.Image;
        public day_lbl: eui.Label;
        public reward_lbl: eui.Label;

        constructor() {
            super();
            this.skinName = "GuideTaskBtnSkin";
        }

        public dataChanged() {
            super.dataChanged();
            let info: Cmd.DayItem = this.data;
            this.reward_lbl.text = info.reward + "福卡";
            if (info.status == 1) {
                this.bg_img.source = "guide_task_json.lb_cz_day_3";
                this.day_lbl.text = "未完成";
                this.day_lbl.textColor = 0x8c8b8b;
                this.day_lbl.bold = false;
            }
            else if (info.status == 2) {
                this.bg_img.source = "guide_task_json.lb_cz_day_3";
                this.day_lbl.text = `已领取`;
                this.day_lbl.textColor = 0x8c8b8b;
                this.day_lbl.bold = false;
            }
            else if (info.status == 3) {
                this.bg_img.source = "guide_task_json.lb_cz_day_1";
                this.day_lbl.text = `第${info.day}天`;
                this.day_lbl.textColor = 0xff0f0f;
                this.day_lbl.bold = true;
            }
            else if (info.status == 4) {
                this.bg_img.source = "guide_task_json.lb_cz_day_2";
                this.day_lbl.text = `第${info.day}天`;
                this.day_lbl.textColor = 0xbb6927;
                this.day_lbl.bold = false;
            }
        }

        public setBg(status) {
            if (status == 3) {
                this.bg_img.source = "guide_task_json.lb_cz_day_1";
            }
            else if (status == 4) {
                this.bg_img.source = "guide_task_json.lb_cz_day_2";
            }
        }
    }
}