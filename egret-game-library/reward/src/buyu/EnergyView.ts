module reward {
    export class EnergyView extends eui.Component {

        private reward_contain: eui.Group;
        private energy_total: eui.Label;
        private energy_pro: eui.Image;

        private items:EnergyItem[];
        private taskInfo: Cmd.DaysTaskItem[];
        private maxValue:number = 0;

        public constructor() {
            super();
            this.skinName = "EnergyViewSkin"
        }

        protected childrenCreated(): void {
            super.childrenCreated();
            this.initData();
        }

        private initData(): void {
            uniLib.Global.addEventListener(CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            uniLib.Global.addEventListener(reward.CmdConstant.UPDATE_DAYS_TASK_LOBBY, this.onUpdateDaysTask,this);
        }

        private onDailyTask(evt: uniLib.ZqEvent): void {
            var curData: Cmd.IntoFreeGoldLobbyCmd_S = evt.param;
            this.taskInfo = curData.taskInfo;
            if(this.taskInfo == null || !(this.taskInfo instanceof Array))
                return;
            this.items = [];
            let currentMax:number= 0
            for(var i:number=0;i<this.taskInfo.length;i++){
                var item :EnergyItem = new EnergyItem(this.taskInfo[i],i+1);
                this.reward_contain.addChild(item);
                item.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                this.items.push(item);
                if(this.maxValue < item.condition)
                    this.maxValue = item.condition;
                if(currentMax < this.taskInfo[i].current)
                    currentMax = this.taskInfo[i].current;
            }
            this.maxValue = this.maxValue+5;
            this.updateProgress(currentMax);
            for(var j:number=0;j<this.items.length;j++){
                this.items[j].x = (this.items[j].condition/this.maxValue)*550;
                this.items[j].y = 25;
            }
        }

        private onUpdateDaysTask(e:uniLib.ZqEvent):void{
            let rewardData: Cmd.UpdateDaysTaskLobbyCmd_S = e.param;
            this.taskInfo = rewardData.taskInfo;
            let currentMax:number= 0
            for(var j:number=0;j<this.taskInfo.length;j++){
                for(var i:number=0;i<this.items.length;i++){
                    if(this.items[i].taskId == this.taskInfo[j].taskId){
                        this.items[i].setRewardState(this.taskInfo[j].taskStatus);
                    }
                }
                if(currentMax < this.taskInfo[j].current)
                    currentMax = this.taskInfo[j].current;
            }
            this.updateProgress(currentMax);
        }

        private updateProgress(current:number):void{
            this.energy_total.text = current == null? "0":current+"";
            if(current>this.maxValue)
                current = this.maxValue;
            this.energy_pro.width = (current/this.maxValue)*550;

        }

        private onTouchHandler(evt:egret.TouchEvent):void{
            var index:number = this.items.indexOf(evt.target);
            if(index>-1){
                if(this.items[index].taskStatus == Cmd.TaskStatus.Task_Status_Complete){
                    var req: Cmd.GetDaysTaskRewardLobbyCmd_C = new Cmd.GetDaysTaskRewardLobbyCmd_C();
                    req.lobbyId = NetMgr.getLoginCfg().lobbyId;
                    req.taskId = this.taskInfo[index].taskId;
                    NetMgr.tcpSend(req);

                    this.taskInfo[index].taskStatus = Cmd.TaskStatus.Task_Status_Received;
                    this.items[index].setRewardState(Cmd.TaskStatus.Task_Status_Received);
                }else{
                    LoadPanelTipMgr.getInstance().loadRes(RewardConsts.ACTIVE_BOX, () => {
                        let task: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(this.items[index].taskId);
                        uniLib.PopUpMgr.addPopUp(ActiveBoxPanel, null, true, true, 0, uniLib.PopUpEffect.CENTER,0,0,task.taskReward);
                    });
                }
            }
        }

        public destroy(): void {
            if(this.items){
                for(var j:number=0;j<this.items.length;j++){
                    this.items[j].removeEventListener(egret.TouchEvent.TOUCH_TAP, this.onTouchHandler, this);
                }
                this.items = null;
            }
             uniLib.Global.removeEventListener(reward.CmdConstant.UPDATE_DAYS_TASK_LOBBY, this.onUpdateDaysTask,this);
            uniLib.Global.removeEventListener(CmdConstant.INTOFREEGOLD, this.onDailyTask, this);
            this.removeChildren();
        }
    }

    export class EnergyItem extends egret.DisplayObjectContainer{

        private gift:egret.Bitmap;
        private txt:egret.BitmapText
        private _index:number;
        public condition:number;
        public taskId:number;
        public taskStatus:number;

        public constructor(info:Cmd.DaysTaskItem,index:number) {
            super();
            this.initUI(info,index);
            this.touchEnabled = true;
        }

        private initUI(info:Cmd.DaysTaskItem,index:number):void{
            this._index = index;
            this.taskId = info.taskId;
            this.taskStatus = info.taskStatus;
            this.gift = new egret.Bitmap();
            this.gift.texture = RES.getRes("energy_json.gift_"+this._index);
            this.gift.anchorOffsetX = this.gift.width>>1;
            this.gift.anchorOffsetY = 20;
            this.addChild(this.gift);

            this.txt = new egret.BitmapText();
            this.txt.font = RES.getRes("energy_progress_fnt");
            let task: table.LobbyTaskConfig = ConfigMgr.getInstance().getTaskCfgById(info.taskId);
            this.condition = task.taskCondition;
            this.txt.text = task.taskCondition + "";
            this.addChild(this.txt);
            this.txt.y = 40;
            this.txt.x = -this.txt.width>>1;

            this.setRewardState(info.taskStatus);
        }

        public setRewardState(taskStatus: Cmd.TaskStatus):void{
            egret.Tween.removeTweens(this.gift);
            this.gift.rotation = 0;
            this.taskStatus = taskStatus;
            if (taskStatus == Cmd.TaskStatus.Task_Status_Unstart) {
                this.gift.texture = RES.getRes("energy_json.gift_"+this._index);
            }else if (taskStatus == Cmd.TaskStatus.Task_Status_Complete) {
                this.gift.texture = RES.getRes("energy_json.gift_"+this._index);
                egret.Tween.get(this.gift,{loop:true}).to({rotation:15},100).to({rotation:0},100).to({rotation:-15},100).to({rotation:0},100).wait(400);
            }
            else if (taskStatus == Cmd.TaskStatus.Task_Status_Received) {
                this.gift.texture = RES.getRes("energy_json.gift_100");
            }//任务进行中 暂时不显示按钮
            else if (taskStatus == Cmd.TaskStatus.Task_Status_Progress) {
               this.gift.texture = RES.getRes("energy_json.gift_"+this._index);
            }
        }

        public destroy(): void {
            if(this.gift){
                egret.Tween.removeTweens(this.gift);
                this.gift = null;
            }
        }

    }
}