module reward {
    export class TaskItem2 extends eui.ItemRenderer {

        public progress_img: eui.Image;
        public progress_mask: eui.Rect;
        public good_icon: eui.Image;
        public good_content: eui.Label;
        private good_gress:eui.Label
        private reward_icon:eui.Image;
        private reward_num:eui.Label;
        public go_btn: eui.WxButton;
        public rev_btn: eui.WxButton;
        private skipType:number = 0;

        constructor() {
            super();
            this.skinName = "TaskItem2Skin";
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.progress_img.mask = this.progress_mask;
            this.rev_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }

        private onTouchHandler(evt: egret.TouchEvent): void {
            if (evt.target == this.rev_btn) {
                this.go_btn.currentState = "disabled";
                this.go_btn.visible = true;
                this.go_btn.touchEnabled = false;
                this.rev_btn.visible = false;
                
                var req: Cmd.GetOnceRewardLobbyCmd_C = new Cmd.GetOnceRewardLobbyCmd_C();
                req.taskId = this.data.taskId;
                NetMgr.tcpSend(req);

                wxgame.Global.instance.aldSendEvent("周边系统", "每日任务: " + this.data.taskID + "领取");
            }
            else if (evt.target == this.go_btn) {
                if(this.skipType >0)
                    LobbyModuleMgr.getInstance().openPanelBySkipType(this.skipType);
            }
        }


        protected dataChanged() {
            super.dataChanged();
            var info: Cmd.DaysTaskItem = this.data;
            let task: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            let contentStr = task.taskDesc;
            this.skipType = task.skipType;
            contentStr = contentStr.replace(new RegExp("%a", "gm"), task.taskCondition + "")
            this.good_content.text = contentStr ;
            this.good_gress.text =  info.current + "/" + task.taskCondition;
            if(task.frontTaskCondition && task.frontTaskCondition.length>0)
                this.good_icon.source = "fish_common_json.fish_" + task.frontTaskCondition[0];
            else 
                this.good_icon.source = "fish_common_json.fish_0";
            this.good_icon.x = 76 - this.good_icon.width/2;
            this.progress_mask.width = 286 * (info.current / task.taskCondition);
            if (task.taskReward) {
                let goodConfig = ConfigMgr.getInstance().getGoodCfgById(task.taskReward[0].goodId);
                this.reward_num.text = "x"+task.taskReward[0].goodNbr;
                this.reward_icon.source = "game_prop_json.bag_daoju_"+task.taskReward[0].goodId;
                commonConfirm.ResUtil.limitImageSize(this.reward_icon,50);
            }
            if (info.taskStatus <= Cmd.TaskStatus.Task_Status_Progress) {
                this.go_btn.visible = this.skipType>0 && !uniLib.Global.isInGame;
                this.go_btn.currentState = "";
                this.rev_btn.visible = false;
            }else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                this.go_btn.visible = false;
                this.rev_btn.visible = true;
            }
            else if (info.taskStatus == Cmd.TaskStatus.Task_Status_Received) {
                this.rev_btn.visible = false;
                this.go_btn.visible = true;
                this.go_btn.currentState = "disabled";
                this.go_btn.touchEnabled = false;
            }
        }

        public destroy(): void {
            this.rev_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
            this.go_btn.removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
        }
    }
}